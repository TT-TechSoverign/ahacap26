from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import update
from pydantic import BaseModel
from typing import Optional, Dict, Any
import models
from database import get_db
from datetime import datetime

router = APIRouter()

class ContentPayload(BaseModel):
    data: Dict[str, Any]

@router.get("/{path:path}")
async def get_content(path: str, draft: bool = False, db: AsyncSession = Depends(get_db)):
    """
    Get content for a specific path.
    If draft=True, return draft_data, else return published data.
    """
    # Normalize path (ensure leading slash)
    if not path.startswith("/"):
        path = "/" + path
    
    result = await db.execute(select(models.ContentPage).where(models.ContentPage.path == path))
    page = result.scalars().first()

    if not page:
        # Return empty structure if not found (Puck expects data)
        return {"data": {}, "path": path}

    import json
    
    # If asking for draft, favor draft_data, fallback to published
    if draft:
        return {"data": json.loads(page.draft_data) if page.draft_data else (json.loads(page.data) if page.data else {}), "path": path}
    
    # If asking for published
    return {"data": json.loads(page.data) if page.data else {}, "path": path}

@router.post("/{path:path}")
async def save_draft(path: str, payload: ContentPayload, db: AsyncSession = Depends(get_db)):
    """
    Save content to draft_data.
    """
    if not path.startswith("/"):
        path = "/" + path

    # Using repr to store JSON as string (simple approach for now, usually use json.dumps)
    # But since the models definition used String, we need to serialize.
    # Note: eval() in get is dangerous in prod, but for internal CMS JSON it's acceptable for MVPs. 
    # Better to use json.loads/dumps. I will use json.
    
    import json
    data_str = json.dumps(payload.data)

    result = await db.execute(select(models.ContentPage).where(models.ContentPage.path == path))
    page = result.scalars().first()

    if page:
        page.draft_data = data_str
        page.updated_at = datetime.utcnow()
    else:
        page = models.ContentPage(path=path, draft_data=data_str)
        db.add(page)
    
    await db.commit()
    return {"status": "saved", "path": path}

@router.put("/{path:path}/publish")
async def publish_content(path: str, db: AsyncSession = Depends(get_db)):
    """
    Promote draft_data to data.
    """
    if not path.startswith("/"):
        path = "/" + path

    result = await db.execute(select(models.ContentPage).where(models.ContentPage.path == path))
    page = result.scalars().first()

    if not page or not page.draft_data:
        raise HTTPException(status_code=404, detail="No draft to publish")

    page.data = page.draft_data
    page.updated_at = datetime.utcnow()
    
    await db.commit()
    return {"status": "published", "path": path}
