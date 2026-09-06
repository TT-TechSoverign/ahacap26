from database import AsyncSessionLocal
from typing import AsyncGenerator, Optional
from sqlalchemy.ext.asyncio import AsyncSession
import hmac
import hashlib
import os
import time
from fastapi import Request, HTTPException, status

SECRET_KEY = os.getenv("JWT_SECRET")
database_url = os.getenv("DATABASE_URL", "")
is_prod_or_staging = "db:" in database_url or "staging-db:" in database_url or "prod-db:" in database_url

if not SECRET_KEY:
    if is_prod_or_staging:
        raise RuntimeError("CRITICAL STARTUP ERROR: JWT_SECRET environment variable is missing on staging/production!")
    else:
        SECRET_KEY = "super-secret-key-change-me"

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session

def create_signed_token(data: str) -> str:
    expiry = int(time.time()) + 86400  # 24 hours
    payload = f"{data}:{expiry}"
    signature = hmac.new(SECRET_KEY.encode(), payload.encode(), hashlib.sha256).hexdigest()
    return f"{payload}.{signature}"

def decode_signed_token_role(token: str) -> Optional[str]:
    try:
        if not token:
            return None
        parts = token.rsplit(".", 1)
        if len(parts) != 2:
            return None
        payload, signature = parts
        expected_signature = hmac.new(SECRET_KEY.encode(), payload.encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(signature, expected_signature):
            return None
        
        # Check expiry
        data, expiry_str = payload.rsplit(":", 1)
        expiry = int(expiry_str)
        if time.time() > expiry:
            return None
        return data  # Returns "admin", "dev_os_master:irasmussenjobs@gmail.com", etc.
    except Exception:
        return None

def verify_signed_token(token: str) -> bool:
    role = decode_signed_token_role(token)
    return role is not None

async def verify_admin_token(request: Request):
    auth_header = request.headers.get("Authorization")
    token = None
    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header.split(" ")[1]
    
    if not token:
        token = request.cookies.get("admin_session")
        if token and token.startswith("Bearer "):
            token = token.split(" ")[1]
            
    if not token or decode_signed_token_role(token) != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized access"
        )
    return True

async def verify_dev_os_session(request: Request):
    auth_header = request.headers.get("Authorization")
    token = None
    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header.split(" ")[1]
    
    if not token:
        token = request.cookies.get("dev_os_session")
        if token and token.startswith("Bearer "):
            token = token.split(" ")[1]
        elif token:
            token = token.strip()
            
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Dev OS Master Authentication Required"
        )
        
    role_data = decode_signed_token_role(token)
    if not role_data or (role_data != "dev_os_master:irasmussenjobs@gmail.com" and role_data != "admin"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized: Dev OS Master credentials required"
        )
    return role_data
