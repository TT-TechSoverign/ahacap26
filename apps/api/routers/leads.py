from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, Request
from sqlalchemy.ext.asyncio import AsyncSession
import cache as cache_module
from cache import check_rate_limit
from sqlalchemy.future import select
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import models
from database import get_db
from dependencies import get_client_ip
from services import email as email_service
import hmac
import logging
import os
import re
import time

# Configure Logger
logger = logging.getLogger("api.leads")

DEFAULT_OFFICE_EMAIL = "@".join(("office", "affordablehome-ac.com"))

# In-memory deduplication cache: {dedup_key: (lead_id, timestamp)}
RECENT_LEAD_SUBMISSIONS = {}

router = APIRouter()

# Pydantic Model for Incoming Lead with flexible intake & strict length bounds
class LeadCreate(BaseModel):
    first_name: Optional[str] = Field(default=None, max_length=120)
    last_name: Optional[str] = Field(default=None, max_length=120)
    customer_name: Optional[str] = Field(default=None, max_length=200)
    full_name: Optional[str] = Field(default=None, max_length=200)
    email: Optional[str] = Field(default=None, max_length=254)
    phone: str = Field(..., min_length=7, max_length=40)
    address: Optional[str] = Field(default="Oahu, HI", max_length=300)
    city: Optional[str] = Field(default=None, max_length=120)
    zip: Optional[str] = Field(default=None, max_length=20)
    service_type: Optional[str] = Field(default=None, max_length=200)
    service: Optional[str] = Field(default=None, max_length=200)
    urgency: Optional[str] = Field(default="standard", max_length=50)
    notes: Optional[str] = Field(default=None, max_length=4000)
    website_url: Optional[str] = Field(default=None, max_length=200)  # Invisible bot honeypot

@router.post("", status_code=201, include_in_schema=False)
@router.post("/", status_code=201)
async def create_lead(
    lead_data: LeadCreate, 
    background_tasks: BackgroundTasks,
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    try:
        ip = get_client_ip(request)

        # Honeypot bot trap: silent 201 decoy without DB write or SMTP dispatch
        if lead_data.website_url and lead_data.website_url.strip():
            logger.warning(f"🛡️ [HONEYPOT SHIELD] Bot lead submission discarded from {ip}")
            return {"status": "success", "lead_id": 0, "message": "Inquiry received."}

        raw_email = (lead_data.email or "").strip()
        validated_email = email_service.sanitize_email_addr(raw_email) if raw_email else ""
        email_addr = validated_email or DEFAULT_OFFICE_EMAIL
        
        # Parse names gracefully
        first = (lead_data.first_name or "").strip()
        last = (lead_data.last_name or "").strip()
        raw_full = (lead_data.customer_name or lead_data.full_name or "").strip()
        
        if not first and raw_full:
            parts = raw_full.split(maxsplit=1)
            first = parts[0]
            last = parts[1] if len(parts) > 1 else "Customer"
        elif not first:
            first = "Valued"
            last = last or "Customer"
        elif not last:
            last = "Customer"

        svc = (lead_data.service_type or lead_data.service or "Window AC Installation").strip()
        urgency_val = (lead_data.urgency or "standard").strip().lower()
        addr = (lead_data.address or "").strip() or "Oahu, HI"

        # 0. Rapid Submission Deduplication Guard (60s window across all Uvicorn workers via Redis + local fallback)
        clean_phone = re.sub(r'\D', '', lead_data.phone or "")
        dedup_key = f"{clean_phone}:{svc.lower()}"
        redis_dedup_key = f"lead_dedup:{dedup_key}"
        now_ts = time.time()

        if clean_phone and cache_module.redis_client:
            try:
                existing_redis_lead_id = await cache_module.redis_client.get(redis_dedup_key)
                if existing_redis_lead_id:
                    logger.warning(f"🛡️ [DEDUPLICATION SHIELD] Redis cross-worker duplicate lead within 60s from {ip}. Returning Lead ID {existing_redis_lead_id}.")
                    return {"status": "success", "lead_id": int(existing_redis_lead_id), "message": "Inquiry already received (deduplicated)."}
            except Exception:
                pass
        
        # Prune old cache entries
        for k in list(RECENT_LEAD_SUBMISSIONS.keys()):
            if now_ts - RECENT_LEAD_SUBMISSIONS[k][1] > 300:
                RECENT_LEAD_SUBMISSIONS.pop(k, None)

        if clean_phone and dedup_key in RECENT_LEAD_SUBMISSIONS:
            prev_id, prev_ts = RECENT_LEAD_SUBMISSIONS[dedup_key]
            if now_ts - prev_ts < 60:
                logger.warning(f"🛡️ [DEDUPLICATION SHIELD] Duplicate lead submission within 60s from {ip}. Returning existing Lead ID {prev_id}.")
                return {"status": "success", "lead_id": prev_id, "message": "Inquiry already received (deduplicated)."}

        # Rate limit check (only bypassed via authenticated X-Dev-OS-Key header, never by unauthenticated email string!)
        dev_key_hdr = (request.headers.get("X-Dev-OS-Key") or "").strip()
        expected_dev_pwd = os.getenv("DEV_OS_MASTER_PASSWORD", "").strip()
        is_authenticated_master = bool(dev_key_hdr and expected_dev_pwd and hmac.compare_digest(dev_key_hdr, expected_dev_pwd))
        if not is_authenticated_master:
            if not await check_rate_limit(ip, "leads", limit=10, period=3600):
                raise HTTPException(status_code=429, detail="Too many inquiries. Please try again later.")

        # 1. Create DB Model
        new_lead = models.Lead(
            first_name=first[:120],
            last_name=last[:120],
            email=email_addr,
            phone=lead_data.phone.strip()[:40],
            address=addr[:300],
            city=(lead_data.city or "Oahu")[:120],
            zip=(lead_data.zip or "")[:20],
            service_type=svc[:200],
            urgency=urgency_val[:50],
            notes=(lead_data.notes or "No additional notes provided.")[:4000],
            status=models.LeadStatus.NEW,
            created_at=datetime.utcnow()
        )
        
        # 2. Save to DB
        db.add(new_lead)
        await db.commit()
        await db.refresh(new_lead)
        
        if clean_phone:
            RECENT_LEAD_SUBMISSIONS[dedup_key] = (new_lead.id, now_ts)
            if cache_module.redis_client:
                try:
                    await cache_module.redis_client.setex(redis_dedup_key, 60, str(new_lead.id))
                except Exception:
                    pass
        
        logger.info(f"Lead Created: {new_lead.id} | {email_service.mask_email(new_lead.email)} | Service: {new_lead.service_type}")

        # 3. Queue Staff Inquiry Notification & Customer Appointment Confirmation
        background_tasks.add_task(
            email_service.send_inquiry_notification,
            lead=new_lead
        )
        if validated_email and validated_email.lower() != DEFAULT_OFFICE_EMAIL:
            background_tasks.add_task(
                email_service.send_customer_appointment_confirmation,
                lead=new_lead
            )

        return {"status": "success", "lead_id": new_lead.id, "message": "Inquiry received."}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating lead: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Failed to process inquiry.")
