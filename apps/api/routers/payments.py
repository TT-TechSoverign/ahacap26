from fastapi import APIRouter, HTTPException, Body, Request
from pydantic import BaseModel, Field
from domain import payments
from cache import check_rate_limit
from dependencies import get_client_ip
import logging

logger = logging.getLogger("api.payments")
router = APIRouter()

class PaymentIntentRequest(BaseModel):
    amount: int = Field(..., gt=0, le=50_000_00)
    idempotencyKey: str = Field(..., min_length=8, max_length=128)

@router.post("/create-intent")
async def create_payment_intent(request: Request, payload: PaymentIntentRequest):
    ip = get_client_ip(request)
    if not await check_rate_limit(ip, "payments", limit=10, period=3600):
        raise HTTPException(status_code=429, detail="Too many payment requests. Please try again later.")
        
    try:
        return await payments.create_payment_intent_service(
            amount=payload.amount,
            idempotency_key=payload.idempotencyKey
        )
    except Exception as e:
        logger.error(f"Payment intent initialization failed from {ip}: {e}")
        raise HTTPException(status_code=400, detail="Unable to initialize payment intent. Please verify amount and try again.")
