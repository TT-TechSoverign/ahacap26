
from datetime import datetime
from dotenv import load_dotenv
import os
import sentry_sdk
import stripe
import logging
import sys

# 0. Load Env Support
load_dotenv()

# Force flush for Docker logs
sys.stdout.reconfigure(line_buffering=True)
logging.basicConfig(level=logging.INFO, stream=sys.stdout)
logger = logging.getLogger("api")

# 0.5 Sentry Initialization
SENTRY_DSN = os.getenv("SENTRY_DSN")
if SENTRY_DSN:
    sentry_sdk.init(dsn=SENTRY_DSN, traces_sample_rate=1.0, profiles_sample_rate=1.0)

from fastapi import FastAPI, HTTPException, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import insert, update
from contextlib import asynccontextmanager
from pydantic import BaseModel
from typing import List, Optional
import csv
import asyncio

# Local Imports
from database import engine, Base, AsyncSessionLocal
import models
from services import email as email_service
from cache import init_redis, close_redis
from middleware import LogSanitizerMiddleware, ChaosMiddleware, HeaderMiddleware
from routers import catalog, payments

# --- LIFESPAN ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_redis()
    print("DEBUG: Creating Tables...")
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    except Exception as e:
        print(f"WARNING: Database connection failed: {e}")
    print("DEBUG: Startup Complete.")
    yield
    await close_redis()
    await engine.dispose()

app = FastAPI(lifespan=lifespan)

# --- MIDDLEWARE ---
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.add_middleware(LogSanitizerMiddleware)
app.add_middleware(ChaosMiddleware)
app.add_middleware(HeaderMiddleware)

# --- ROUTERS ---
app.include_router(catalog.router, prefix="/api/v1/products", tags=["Catalog"])
app.include_router(payments.router, prefix="/api/v1/payments", tags=["Payments"])
from routers import content
app.include_router(content.router, prefix="/api/v1/content", tags=["Content"])
from routers import snippets
app.include_router(snippets.router, prefix="/api/v1/content/snippets", tags=["Snippets"])

# --- WEBHOOKS ---
async def process_stripe_event(event: dict):
    stripe_pid = None
    metadata = {}
    receipt_email = None
    amount_received = 0

    try:
        if event['type'] == 'payment_intent.succeeded':
            obj = event['data']['object']
            stripe_pid = obj['id']
            receipt_email = obj.get('receipt_email')
            amount_received = obj.get('amount_received')
            metadata = obj.get('metadata', {})
            
        elif event['type'] == 'checkout.session.completed':
            obj = event['data']['object']
            stripe_pid = obj.get('payment_intent')
            receipt_email = obj.get('customer_details', {}).get('email')
            amount_received = obj.get('amount_total')
            metadata = obj.get('metadata', {})

        if stripe_pid:
            fulfillment_mode = metadata.get('fulfillment_mode', 'pickup')
            print(f"Processing Payment Success: {stripe_pid} | Mode: {fulfillment_mode}")

            async with AsyncSessionLocal() as session:
                result = await session.execute(select(models.Order).where(models.Order.stripe_pid == stripe_pid))
                order = result.scalars().first()

                # --- AUTO-CREATE LOGIC ---
                if not order:
                    print(f"Order not found for PID: {stripe_pid}. Generating new order record...")
                    new_order_id = f"ORD-{stripe_pid[-6:].upper()}"
                    order = models.Order(
                        id=new_order_id,
                        stripe_pid=stripe_pid,
                        total_cents=amount_received or 0,
                        customer_email=receipt_email,
                        status=models.OrderStatus.PAID,
                        created_at=datetime.utcnow()
                    )
                    session.add(order)
                    await session.commit()
                    print(f"Created/Recovered Order {new_order_id} from Webhook.")

                if order.status != models.OrderStatus.PAID:
                    order.status = models.OrderStatus.PAID
                    await session.commit()
                    print(f"Order {order.id} marked as PAID.")

                target_email = order.customer_email or receipt_email
                if target_email:
                    print(f"Dispatching email to {target_email}...")
                    await email_service.send_order_confirmation(
                        target_email, order.id, order.total_cents, fulfillment_mode=fulfillment_mode
                    )
                else:
                    print("No email found for order confirmation.")
    except Exception as e:
        print(f"CRITICAL: Webhook Processing Error: {e}")
        import traceback
        traceback.print_exc()

@app.post("/api/webhooks/stripe")
async def stripe_webhook(request: Request, background_tasks: BackgroundTasks):
    print("DEBUG: Webhook Endpoint Hit") # Explicit Debug
    payload = await request.body()
    sig_header = request.headers.get("Stripe-Signature")
    
    # Reload env var to be safe (though docker restart fixed it)
    webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
    
    print(f"DEBUG: Sig Header: {sig_header}")
    print(f"DEBUG: Secret Present: {bool(webhook_secret)}")

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, webhook_secret)
        print(f"DEBUG: Event Constructed: {event['type']}")
    except ValueError as e:
        print(f"ERROR: Invalid Payload: {e}")
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError as e:
        print(f"ERROR: Invalid Signature: {e}")
        raise HTTPException(status_code=400, detail="Invalid signature")
    except Exception as e:
        print(f"CRITICAL: Unexpected Webhook Error: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Internal Server Error")

    background_tasks.add_task(process_stripe_event, event)
    return {"status": "success"}

@app.get("/api/v1/health")
async def health_check():
    return {"status": "ok"}
