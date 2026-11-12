from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import update
from pydantic import BaseModel
from typing import Optional, Dict, Any
import models
from database import get_db
from dependencies import verify_admin_token, get_client_ip
from datetime import datetime, timezone

router = APIRouter()

class ContentPayload(BaseModel):
    data: Dict[str, Any]

@router.get("")
@router.get("/")
@router.get("/{path:path}")
async def get_content(request: Request, path: str = "/", draft: bool = False, db: AsyncSession = Depends(get_db)):
    """
    Get content for a specific path.
    If draft=True, require admin authentication and return draft_data, else return published data.
    """
    if ".." in path or "\x00" in path or len(path) > 256:
        raise HTTPException(status_code=400, detail="Invalid content path")

    if draft:
        await verify_admin_token(request)

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

@router.post("/{path:path}", dependencies=[Depends(verify_admin_token)])
async def save_draft(path: str, payload: ContentPayload, request: Request, db: AsyncSession = Depends(get_db)):
    """
    Save content to draft_data.
    """
    if ".." in path or "\x00" in path or len(path) > 256:
        raise HTTPException(status_code=400, detail="Invalid content path")
    if not path.startswith("/"):
        path = "/" + path

    import json
    data_str = json.dumps(payload.data)
    if len(data_str) > 2 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Content payload exceeds 2MB limit")

    result = await db.execute(select(models.ContentPage).where(models.ContentPage.path == path))
    page = result.scalars().first()

    if page:
        page.draft_data = data_str
        page.updated_at = datetime.now(timezone.utc).replace(tzinfo=None)
    else:
        page = models.ContentPage(path=path, draft_data=data_str)
        db.add(page)
    
    await db.commit()
    try:
        from routers.dev_os import log_dev_os_audit
        await log_dev_os_audit(db, action="CONTENT_DRAFT_SAVED", details={"path": path}, ip=get_client_ip(request))
    except Exception:
        pass
    return {"status": "saved", "path": path}

@router.put("/publish", dependencies=[Depends(verify_admin_token)])
@router.put("/{path:path}/publish", dependencies=[Depends(verify_admin_token)])
async def publish_content(request: Request, path: str = "/", db: AsyncSession = Depends(get_db)):
    """
    Promote draft_data to data.
    """
    if ".." in path or "\x00" in path or len(path) > 256:
        raise HTTPException(status_code=400, detail="Invalid content path")
    if not path.startswith("/"):
        path = "/" + path

    result = await db.execute(select(models.ContentPage).where(models.ContentPage.path == path))
    page = result.scalars().first()

    if not page or not page.draft_data:
        raise HTTPException(status_code=404, detail="No draft to publish")

    page.data = page.draft_data
    page.updated_at = datetime.now(timezone.utc).replace(tzinfo=None)
    
    await db.commit()
    try:
        from routers.dev_os import log_dev_os_audit
        await log_dev_os_audit(db, action="CONTENT_PUBLISHED", details={"path": path}, ip=get_client_ip(request))
    except Exception:
        pass
    return {"status": "published", "path": path}
