from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel
from typing import Dict, Any, Optional
import models
from database import get_db
import json
from datetime import datetime

router = APIRouter()

class ScheduleUpdate(BaseModel):
    mini_split_label: str
    window_ac_label: str
    mini_split_estimate_date: str
    mini_split_install_date: str
    window_ac_estimate_date: str
    window_ac_install_date: str
    general_availability_range: Optional[str] = ""

@router.patch("/schedule")
async def update_schedule(
    schedule: ScheduleUpdate,
    db: AsyncSession = Depends(get_db)
):
    """
    Update the 'footer_schedule' section of the global content (path='/').
    Updates both draft and published data to ensure immediate visibility.
    """
    path = "/"
    
    # 1. Fetch current content
    result = await db.execute(select(models.ContentPage).where(models.ContentPage.path == path))
    page = result.scalars().first()

    current_data = {}
    if page and page.data:
        try:
            current_data = json.loads(page.data)
        except json.JSONDecodeError:
            print("WARNING: ContentPage JSON Corrupt! Resetting to empty.")
            current_data = {}
    
    # Ensure footer_schedule exists
    if 'footer_schedule' not in current_data:
        current_data['footer_schedule'] = {}

    # 2. Update footer_schedule
    # We update the dictionary fields with the new user input, rather than destroying existing keys or corrupting format
    for k, v in schedule.dict(exclude_unset=True).items():
        current_data['footer_schedule'][k] = v

    # 3. Save back (Draft + Publish for immediate effect as per user expectation)
    updated_json = json.dumps(current_data)
    
    if page:
        page.data = updated_json
        page.draft_data = updated_json
        from datetime import timezone
        page.updated_at = datetime.now(timezone.utc).replace(tzinfo=None)
    else:
        page = models.ContentPage(
            path=path,
            data=updated_json,
            draft_data=updated_json
        )
        db.add(page)

    await db.commit()
    await db.refresh(page)

    return {"status": "success", "schedule": schedule.dict()}

# --- ADMIN ORDERS & LEADS ---

class OrderUpdate(BaseModel):
    status: str

class LeadUpdate(BaseModel):
    status: str
    notes: Optional[str] = None

@router.get("/orders")
async def get_all_orders(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Order).order_by(models.Order.created_at.desc()))
    return result.scalars().all()

@router.put("/orders/{order_id}")
async def update_order_status(order_id: str, payload: OrderUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Order).where(models.Order.id == order_id))
    order = result.scalars().first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    order.status = payload.status
    await db.commit()
    return {"status": "success"}

@router.get("/leads")
async def get_all_leads(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Lead).order_by(models.Lead.created_at.desc()))
    return result.scalars().all()

@router.put("/leads/{lead_id}")
async def update_lead_status(lead_id: int, payload: LeadUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Lead).where(models.Lead.id == lead_id))
    lead = result.scalars().first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    lead.status = payload.status
    if payload.notes is not None:
        lead.notes = payload.notes
        
    await db.commit()
    return {"status": "success"}