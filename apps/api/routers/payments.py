from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from domain import payments

router = APIRouter()

class PaymentIntentRequest(BaseModel):
    amount: int
    idempotencyKey: str

@router.post("/create-intent")
async def create_payment_intent(payload: PaymentIntentRequest):
    try:
        return await payments.create_payment_intent_service(
            amount=payload.amount,
            idempotency_key=payload.idempotencyKey
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
