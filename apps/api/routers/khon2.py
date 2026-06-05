from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Dict, Any
import json
import os
import logging
from dependencies import verify_admin_token

router = APIRouter()
logger = logging.getLogger("khon2")

# We store the KHON2 drafts completely isolated from the main DB/Puck content
# Using the same robust file-based JSON pattern for simplicity & speed.
DRAFT_FILE_PATH = os.path.join(os.path.dirname(__file__), "..", "content", "khon2_seo_drafts.json")

class Khon2DraftPayload(BaseModel):
    # Expecting the exact structure of CSVData[] from the frontend
    # [{filename: string, data: any[]}]
    data: List[Dict[str, Any]]

@router.get("/drafts")
async def get_khon2_drafts():
    """
    Returns the current state of the globally saved KHON2 drafts.
    """
    if not os.path.exists(DRAFT_FILE_PATH):
        return {"data": []}
    
    try:
        with open(DRAFT_FILE_PATH, "r", encoding="utf-8") as f:
            draft_data = json.load(f)
            return {"data": draft_data}
    except Exception as e:
        logger.error(f"Failed to read KHON2 drafts: {e}")
        return {"data": []}

@router.post("/save", dependencies=[Depends(verify_admin_token)])
async def save_khon2_drafts(payload: Khon2DraftPayload):
    """
    Saves the entire KHON2 portal state to a persistent JSON file.
    This overwrites the existing file to represent the absolute latest state globally across all users.
    """
    try:
        os.makedirs(os.path.dirname(DRAFT_FILE_PATH), exist_ok=True)
        
        with open(DRAFT_FILE_PATH, "w", encoding="utf-8") as f:
            json.dump(payload.data, f, indent=4)
        
        return {"status": "success", "message": "Global drafts saved successfully."}
    except Exception as e:
        logger.error(f"Failed to save KHON2 drafts: {e}")
        raise HTTPException(status_code=500, detail="Failed to save drafts to persistent storage.")
