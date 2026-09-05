from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel
from typing import Dict, Any, Optional
import models
from database import get_db
from dependencies import verify_admin_token
import json
import os
from datetime import datetime

router = APIRouter(dependencies=[Depends(verify_admin_token)])

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

@router.post("/orders/reconcile")
async def trigger_order_reconciliation():
    """
    Manually triggers Stripe order reconciliation to check recent Stripe sessions
    and automatically recover any missing orders into the database.
    """
    from services.reconciliation import reconcile_unrecorded_stripe_orders
    return await reconcile_unrecorded_stripe_orders(limit=30)

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

@router.get("/orders/backfill")
async def backfill_historical_orders(
    db: AsyncSession = Depends(get_db)
):
    import stripe
    import json
    
    stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
    
    result = await db.execute(select(models.Order).where(
        (models.Order.items_json.is_(None)) | 
        (models.Order.customer_name == "") | 
        (models.Order.customer_name.is_(None))
    ))
    orders = result.scalars().all()
    
    count = 0
    errors = []
    
    if not orders:
         return {"status": "success", "message": "No legacy orders found missing customer data."}

    for order in orders:
         if not order.stripe_pid:
             continue
         try:
             sessions = stripe.checkout.Session.list(payment_intent=order.stripe_pid, limit=1)
             if not sessions.data:
                 continue
                 
             session = sessions.data[0]
             cust = session.customer_details or {}
             order.customer_name = cust.get('name', 'Valued Customer')
             order.customer_email = cust.get('email', order.customer_email)
             order.customer_phone = cust.get('phone', '')
             if cust.get('address'):
                 order.customer_address = json.dumps(cust.get('address'))
                 
             line_items_res = stripe.checkout.Session.list_line_items(session.id, limit=100)
             items_data = []
             for item in line_items_res.data:
                 items_data.append({
                     'description': item.description,
                     'name': item.description,
                     'quantity': item.quantity,
                     'amount_total': item.amount_total,
                     'price': item.amount_total / max(1, item.quantity),
                     'currency': item.currency
                 })
                 
             if items_data:
                 order.items_json = json.dumps(items_data)
                 
             count += 1
         except Exception as e:
             errors.append(f"Failed Order {order.id}: {str(e)}")
             
    await db.commit()
    
    return {
        "status": "success", 
        "updated_rows": count,
        "errors": errors
    }

@router.get("/verify")
async def verify_admin_get():
    return {"status": "authorized"}

@router.post("/verify")
async def verify_admin_post():
    return {"status": "authorized"}