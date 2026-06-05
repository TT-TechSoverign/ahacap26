from fastapi import APIRouter, HTTPException, Body, Request
from pydantic import BaseModel
from domain import payments
from cache import check_rate_limit

router = APIRouter()

class PaymentIntentRequest(BaseModel):
    amount: int
    idempotencyKey: str

@router.post("/create-intent")
async def create_payment_intent(request: Request, payload: PaymentIntentRequest):
    ip = request.client.host if request.client else "unknown"
    if not await check_rate_limit(ip, "payments", limit=10, period=3600):
        raise HTTPException(status_code=429, detail="Too many payment requests. Please try again later.")
        
    try:
        return await payments.create_payment_intent_service(
            amount=payload.amount,
            idempotency_key=payload.idempotencyKey
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
