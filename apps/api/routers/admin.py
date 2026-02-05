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

    if not page:
        # If no page exists, we can't patch it easily without a base. 
        # But for this system, we assume seed or generic structure exists.
        # Ideally, we should create it if missing, but let's error for safety or create stub.
        # Better: Create stub.
        current_data = {}
    else:
        current_data = json.loads(page.data) if page.data else {}

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
