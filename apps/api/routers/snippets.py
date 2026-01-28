from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import Column, String, Integer, JSON
from pydantic import BaseModel
from typing import Dict, Any, List
from database import get_db, Base
import models # We need to add Snippet model to models.py first, but can define here for speed if circular import avoided
# Better to put model in models.py. I will create migration script first.

router = APIRouter()

class SnippetPayload(BaseModel):
    name: str
    data: Dict[str, Any] # The component data

# We need to add the model to models.py or define it here if we shift strategy.
# Let's assume we will add it to models.py in next step.
# For now, I will write the router logic assuming models.ContentSnippet exists.

@router.get("/")
async def list_snippets(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.ContentSnippet))
    snippets = result.scalars().all()
    return [{"id": s.id, "name": s.name, "data": eval(s.data)} for s in snippets]

@router.post("/")
async def create_snippet(payload: SnippetPayload, db: AsyncSession = Depends(get_db)):
    import json
    # Check if exists
    # result = await db.execute(select(models.ContentSnippet).where(models.ContentSnippet.name == payload.name))
    # existing = result.scalars().first()
    
    # Simple Append
    new_snippet = models.ContentSnippet(
        name=payload.name,
        data=json.dumps(payload.data)
    )
    db.add(new_snippet)
    await db.commit()
    return {"status": "created", "id": new_snippet.id}
