from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, Request
from sqlalchemy.ext.asyncio import AsyncSession
from cache import check_rate_limit
from sqlalchemy.future import select
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import models
from database import get_db
from services import email as email_service
import logging

# Configure Logger
logger = logging.getLogger("api.leads")

router = APIRouter()

# Pydantic Model for Incoming Lead with flexible intake
class LeadCreate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    customer_name: Optional[str] = None
    full_name: Optional[str] = None
    email: Optional[str] = None
    phone: str
    address: Optional[str] = "Oahu, HI"
    city: Optional[str] = None
    zip: Optional[str] = None
    service_type: Optional[str] = None
    service: Optional[str] = None
    urgency: Optional[str] = "standard"
    notes: Optional[str] = None
    is_test: Optional[bool] = False

@router.post("", status_code=201, include_in_schema=False)
@router.post("/", status_code=201)
async def create_lead(
    lead_data: LeadCreate, 
    background_tasks: BackgroundTasks,
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    try:
        email_addr = (lead_data.email or "").strip() or "office@affordablehome-ac.com"
        
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

        # Check rate limit (bypass for master test account)
        ip = request.client.host if request.client else "unknown"
        if email_addr.lower() != "irasmussenjobs@gmail.com":
            if not await check_rate_limit(ip, "leads", limit=10, period=3600):
                raise HTTPException(status_code=429, detail="Too many inquiries. Please try again later.")

        # 1. Create DB Model
        new_lead = models.Lead(
            first_name=first,
            last_name=last,
            email=email_addr,
            phone=lead_data.phone.strip(),
            address=addr,
            city=lead_data.city or "Oahu",
            zip=lead_data.zip or "",
            service_type=svc,
            urgency=urgency_val,
            notes=lead_data.notes or "No additional notes provided.",
            status=models.LeadStatus.NEW,
            created_at=datetime.utcnow()
        )
        
        # 2. Save to DB
        db.add(new_lead)
        await db.commit()
        await db.refresh(new_lead)
        
        logger.info(f"Lead Created: {new_lead.id} | {new_lead.email} | Service: {new_lead.service_type}")

        # 3. Queue Email Notification
        background_tasks.add_task(
            email_service.send_inquiry_notification,
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
