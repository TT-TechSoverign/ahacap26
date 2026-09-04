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

# Pydantic Model for Incoming Lead
class LeadCreate(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    address: str
    city: Optional[str] = None
    zip: Optional[str] = None
    service_type: str
    urgency: str
    notes: Optional[str] = None



@router.post("", status_code=201, include_in_schema=False)
@router.post("/", status_code=201)
async def create_lead(
    lead_data: LeadCreate, 
    background_tasks: BackgroundTasks,
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    try:
        ip = request.client.host if request.client else "unknown"
        if not await check_rate_limit(ip, "leads", limit=5, period=3600):
            raise HTTPException(status_code=429, detail="Too many inquiries. Please try again later.")

        # 1. Create DB Model
        new_lead = models.Lead(
            first_name=lead_data.first_name,
            last_name=lead_data.last_name,
            email=lead_data.email,
            phone=lead_data.phone,
            address=lead_data.address,
            city=lead_data.city,
            zip=lead_data.zip,
            service_type=lead_data.service_type,
            urgency=lead_data.urgency,
            notes=lead_data.notes,
            status=models.LeadStatus.NEW,
            created_at=datetime.utcnow()
        )
        
        # 2. Save to DB
        db.add(new_lead)
        await db.commit()
        await db.refresh(new_lead)
        
        logger.info(f"Lead Created: {new_lead.id} | {new_lead.email}")

        # 3. Queue Email Notification
        background_tasks.add_task(
            email_service.send_inquiry_notification,
            lead=new_lead
        )

        return {"status": "success", "lead_id": new_lead.id, "message": "Inquiry received."}

    except Exception as e:
        logger.error(f"Error creating lead: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Failed to process inquiry.")
