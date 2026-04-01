
from datetime import datetime
from dotenv import load_dotenv
import os
import sentry_sdk
import stripe
import logging
import logging
import sys
import json

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
    # 0. Verify SMTP (Defensive)
    try:
        smtp_check = email_service.verify_connection()
        if asyncio.iscoroutine(smtp_check):
            asyncio.create_task(smtp_check)
        else:
            print(f"DEBUG: SMTP Check ran synchronously (Returned: {type(smtp_check)})")
    except Exception as e:
        print(f"WARNING: SMTP Check Failed entirely: {e}")

    print("DEBUG: Creating Tables & Checking Schema...")
    
    # Run Schema Fixes
    from fix_db_schema import fix_schema
    await fix_schema()

    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    except Exception as e:
        print(f"WARNING: Database connection failed: {e}")
    print("DEBUG: Startup Complete.")
    
    # Verify Email
    email_service.verify_connection()

    # 3. Auto-Seed (If Empty)
    try:
        async with AsyncSessionLocal() as session:
            result = await session.execute(select(models.Product))
            first_product = result.scalars().first()
            
            if not first_product:
                print("⚠️  Database Empty! Seeding Initial Products...")
                # IMPORTANT: Close this session first to release any locks before seeding
                await session.commit() 
                
                import seed_products
                # cleanup=False prevents TRUNCATE, avoiding Deadlocks
                await seed_products.seed(cleanup=False)
                
                # Also seed content pages if empty
                import seed_content
                await seed_content.seed_content()
            else:
                print("✅ Products found. Skipping Seed.")
    except Exception as e:
        print(f"WARNING: Product Seed Check Failed: {e}")

    yield
    await close_redis()
    await engine.dispose()

app = FastAPI(lifespan=lifespan)

# --- MIDDLEWARE ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",                 # Local frontend
        "http://staging.affordablehome-ac.com",  # Staging frontend
        "https://staging.affordablehome-ac.com", # Staging frontend HTTPS
        "http://affordablehome-ac.com",          # Live frontend
        "https://affordablehome-ac.com"          # Live frontend HTTPS
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
)
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

from routers import khon2
app.include_router(khon2.router, prefix="/api/v1/khon2-portal", tags=["KHON2 Portal"])

from routers import admin
app.include_router(admin.router, prefix="/api/v1/admin", tags=["Admin"])

from routers import leads
app.include_router(leads.router, prefix="/api/v1/leads", tags=["Leads"])

# --- WEBHOOKS ---
async def process_stripe_event(event: dict):
    stripe_pid = None
    metadata = {}
    receipt_email = None
    amount_received = 0
    items_data = []
    
    # New Data Containers
    customer_info = {}
    payment_info = {"brand": "Credit Card", "last4": ""}

    try:
        obj = event['data']['object']
        
        # Determine Source
        if event['type'] == 'payment_intent.succeeded':
            stripe_pid = obj['id']
            receipt_email = obj.get('receipt_email')
            amount_received = obj.get('amount_received')
            metadata = obj.get('metadata', {})
            
        elif event['type'] == 'checkout.session.completed':
            stripe_pid = obj.get('payment_intent')
            # Extract main email
            receipt_email = obj.get('customer_details', {}).get('email')
            amount_received = obj.get('amount_total')
            metadata = obj.get('metadata', {})
            
            # --- Extract Expanded Customer/Billing Info ---
            cust = obj.get('customer_details', {})
            customer_info = {
                "name": cust.get('name', 'Valued Customer'),
                "email": cust.get('email', receipt_email),
                "phone": cust.get('phone', ''),
                "address": cust.get('address', {}) 
            }
            
            # Retrieve line items
            try:
                line_items = stripe.checkout.Session.list_line_items(obj['id'], limit=100)
                for item in line_items.data:
                    items_data.append({
                        "description": item.description,
                        "quantity": item.quantity,
                        "amount_total": item.amount_total,
                        "currency": item.currency
                    })
            except Exception as e:
                print(f"Error fetching line items: {e}")

        # --- Extract Payment Method Info (Brand/Last4) ---
        if stripe_pid:
            try:
                # Expand payment_method to get card details
                pi = stripe.PaymentIntent.retrieve(stripe_pid, expand=['payment_method'])
                if pi.payment_method:
                    # Check if it's a dict (expanded) or string (ID) - retrieve expanding ensures it's dict usually
                    pm = pi.payment_method
                    if isinstance(pm, dict) and pm.get('card'):
                        card = pm.get('card')
                        payment_info = {
                            "brand": card.get('brand', 'Card').title(),
                            "last4": card.get('last4', '****')
                        }
            except Exception as e:
                print(f"Error fetching Payment Method details: {e}")


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
                        customer_email=customer_info.get('email', receipt_email),
                        customer_name=customer_info.get('name', ''),
                        customer_phone=customer_info.get('phone', ''),
                        customer_address=json.dumps(customer_info.get('address', {})),
                        status=models.OrderStatus.PAID,
                        items_json=json.dumps(items_data) if items_data else None,
                        created_at=datetime.utcnow()
                    )
                    session.add(order)
                    await session.commit()
                    print(f"Created/Recovered Order {new_order_id} from Webhook.")

                if order.status != models.OrderStatus.PAID:
                    order.status = models.OrderStatus.PAID
                    if items_data and not order.items_json:
                        order.items_json = json.dumps(items_data)
                    
                    # Update email and customer details if missing (crucial for PaymentIntent -> CheckoutSession race conditions)
                    # When checkout.session.completed fires, it has the rich data. We update the model.
                    if event['type'] == 'checkout.session.completed':
                        order.customer_email = customer_info.get('email', order.customer_email)
                        order.customer_name = customer_info.get('name', order.customer_name)
                        order.customer_phone = customer_info.get('phone', order.customer_phone)
                        order.customer_address = json.dumps(customer_info.get('address', {}))
                        
                    await session.commit()
                    print(f"Order {order.id} marked as PAID with comprehensive details.")

                # ONLY send confirmation email on Checkout Session completion (contains items & customer info)
                if event['type'] == 'checkout.session.completed':
                    target_email = order.customer_email or receipt_email
                    if target_email:
                        print(f"Dispatching email to {target_email} via Checkout Session...")
                        
                        # Call updated service with new args
                        await email_service.send_order_confirmation(
                            target_email, 
                            order.id, 
                            order.total_cents, 
                            fulfillment_mode=fulfillment_mode,
                            items=items_data,
                            customer_info=customer_info,
                            payment_info=payment_info
                        )
                    else:
                        print("No email found for order confirmation.")
                else:
                     print(f"Skipping email dispatch for {event['type']} (Wait for checkout.session.completed)")
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

    background_tasks.add_task(process_stripe_event, event)
    return {"status": "success"}

# --- MAINTENANCE ---
from seed_products import seed
@app.post("/api/v1/maintenance/seed_products")
async def seed_products_endpoint(background_tasks: BackgroundTasks):
    background_tasks.add_task(seed)
    return {"status": "seeding_started"}

@app.get("/api/v1/health")
async def health_check():
    return {"status": "ok"}
