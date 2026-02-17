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
    # We explicitly update the node.
    current_data['footer_schedule'] = schedule.dict()

    # 3. Save back (Draft + Publish for immediate effect as per user expectation)
    updated_json = json.dumps(current_data)
    
    if page:
        page.data = updated_json
        page.draft_data = updated_json
        page.updated_at = datetime.utcnow()
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
