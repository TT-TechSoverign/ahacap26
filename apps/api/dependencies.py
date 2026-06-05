from database import AsyncSessionLocal
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession
import hmac
import hashlib
import os
import time
from fastapi import Request, HTTPException, status

SECRET_KEY = os.getenv("JWT_SECRET", "super-secret-key-change-me")

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session

def create_signed_token(data: str) -> str:
    expiry = int(time.time()) + 86400  # 24 hours
    payload = f"{data}:{expiry}"
    signature = hmac.new(SECRET_KEY.encode(), payload.encode(), hashlib.sha256).hexdigest()
    return f"{payload}.{signature}"

def verify_signed_token(token: str) -> bool:
    try:
        if not token:
            return False
        parts = token.rsplit(".", 1)
        if len(parts) != 2:
            return False
        payload, signature = parts
        expected_signature = hmac.new(SECRET_KEY.encode(), payload.encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(signature, expected_signature):
            return False
        
        # Check expiry
        data, expiry_str = payload.rsplit(":", 1)
        expiry = int(expiry_str)
        if time.time() > expiry:
            return False
        return True
    except Exception:
        return False

async def verify_admin_token(request: Request):
    auth_header = request.headers.get("Authorization")
    token = None
    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header.split(" ")[1]
    
    if not token:
        token = request.cookies.get("admin_session")
        if token and token.startswith("Bearer "):
            token = token.split(" ")[1]
            
    if not token or not verify_signed_token(token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized access"
        )
    return True
