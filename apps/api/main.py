
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

from fastapi import FastAPI, HTTPException, Request, BackgroundTasks, Depends, Query
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

from fastapi.responses import JSONResponse
import traceback
from fastapi import Request

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    error_msg = str(exc)
    tb = traceback.format_exc()
    print(f"GLOBAL ERROR: {error_msg}\n{tb}")
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error", "detail": error_msg, "traceback": tb}
    )

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
async def fire_ga4_purchase_event(order_id, ga_client_id, ga_session_id, items_data, amount_total, amount_tax=0, amount_shipping=0):
    measurement_id = os.getenv("GA4_MEASUREMENT_ID")
    api_secret = os.getenv("GA4_API_SECRET")
    
    if not measurement_id or not api_secret or not ga_client_id:
        print("DEBUG: Skipping GA4 event. Missing env vars or client_id.")
        return
        
    url = f"https://www.google-analytics.com/mp/collect?measurement_id={measurement_id}&api_secret={api_secret}"
    
    # Exclude tax and shipping from true revenue
    true_revenue = (amount_total - amount_tax - amount_shipping) / 100.0
    tax_dollars = amount_tax / 100.0
    shipping_dollars = amount_shipping / 100.0

    ga_items = []
    for item in items_data:
        desc = item.get("description", "")
        # Filter out tax and shipping line items from the product array
        if "Tax" in desc or "Delivery" in desc:
            continue
            
        ga_items.append({
            "item_id": str(item.get("product_id")) if item.get("product_id") else "UNKNOWN",
            "item_name": desc,
            "price": (item.get("amount_total", 0) / 100.0) / (item.get("quantity") or 1) if item.get("quantity") else 0,
            "quantity": item.get("quantity", 1)
        })

    payload = {
        "client_id": ga_client_id,
        "events": [{
            "name": "purchase",
            "params": {
                "currency": "USD",
                "transaction_id": order_id,
                "value": true_revenue,
                "tax": tax_dollars,
                "shipping": shipping_dollars,
                "items": ga_items,
                "session_id": ga_session_id
            }
        }]
    }

    try:
        import aiohttp
        async with aiohttp.ClientSession() as session:
            async with session.post(url, json=payload) as response:
                print(f"GA4 Measurement Protocol Response: {response.status}")
    except Exception as e:
        print(f"GA4 MP Error: {e}")

async def process_stripe_event(event: dict, payload_data: dict):
    # Two-Way Webhook Filtering (Strategy 2)
    # Skip CRM invoice events early to prevent side-effects on storefront
    try:
        obj = payload_data.get('data', {}).get('object', {})
        metadata = obj.get('metadata', {}) or {}
        if metadata.get('invoice_id') or metadata.get('source') == 'crm':
            print(f"[Storefront API Webhook] Skipping CRM invoice transaction (invoice_id={metadata.get('invoice_id')}, source={metadata.get('source')}).")
            return
    except Exception as e:
        print(f"[Storefront API Webhook Error] Pre-filtering failed: {e}")

    stripe_pid = None
    metadata = {}
    receipt_email = None
    amount_received = 0
    items_data = []
    
    # New Data Containers
    customer_info = {}
    payment_info = {"brand": "Credit Card", "last4": ""}

    try:
        # Parse raw payload as standard dict to safely use .get() and bypass StripeObject wrapper
        obj = payload_data['data']['object']
        
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
            
            # Extract GA4 Pipeline Data
            total_details = obj.get('total_details', {})
            amount_tax = total_details.get('amount_tax', 0)
            amount_shipping = total_details.get('amount_shipping', 0)
            ga_client_id = metadata.get('ga_client_id')
            ga_session_id = metadata.get('ga_session_id')
            
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
                line_items = stripe.checkout.Session.list_line_items(obj['id'], limit=100, expand=['data.price.product'])
                for item_obj in line_items.data:
                    item = item_obj.to_dict() if hasattr(item_obj, 'to_dict') else dict(item_obj)
                    product_id_str = None
                    
                    price = item.get('price') or {}
                    product = price.get('product') or {}
                    if isinstance(product, dict):
                        prod_meta = product.get('metadata') or {}
                        product_id_str = prod_meta.get('product_id')

                    items_data.append({
                        "product_id": int(product_id_str) if product_id_str else None,
                        "description": item.get('description'),
                        "quantity": item.get('quantity'),
                        "amount_total": item.get('amount_total'),
                        "currency": item.get('currency')
                    })
            except Exception as e:
                print(f"Error fetching line items: {e}")

        if stripe_pid:
            try:
                # Expand payment_method to get card details
                pi_obj = stripe.PaymentIntent.retrieve(stripe_pid, expand=['payment_method'])
                pi = pi_obj.to_dict() if hasattr(pi_obj, 'to_dict') else dict(pi_obj)
                
                if pi.get('payment_method'):
                    pm = pi.get('payment_method')
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
                        fulfillment_mode=fulfillment_mode,
                        utm_source=metadata.get('utm_source'),
                        utm_medium=metadata.get('utm_medium'),
                        utm_campaign=metadata.get('utm_campaign'),
                        created_at=datetime.utcnow()
                    )
                    session.add(order)
                    await session.commit()
                    print(f"Created/Recovered Order {new_order_id} from Webhook.")

                # 1. Update Status to PAID if not already set
                if order.status != models.OrderStatus.PAID:
                    order.status = models.OrderStatus.PAID
                    if items_data and not order.items_json:
                        order.items_json = json.dumps(items_data)
                    if not order.utm_source:
                        order.utm_source = metadata.get('utm_source')
                    if not order.utm_medium:
                        order.utm_medium = metadata.get('utm_medium')
                    if not order.utm_campaign:
                        order.utm_campaign = metadata.get('utm_campaign')

                # 2. Enrich, deduct stock, and trigger GA4 on checkout.session.completed (Always runs, avoiding race condition skips)
                if event['type'] == 'checkout.session.completed':
                    order.customer_email = customer_info.get('email', order.customer_email)
                    order.customer_name = customer_info.get('name', order.customer_name)
                    order.customer_phone = customer_info.get('phone', order.customer_phone)
                    order.customer_address = json.dumps(customer_info.get('address', {}))
                    order.fulfillment_mode = fulfillment_mode
                    order.utm_source = metadata.get('utm_source', order.utm_source)
                    order.utm_medium = metadata.get('utm_medium', order.utm_medium)
                    order.utm_campaign = metadata.get('utm_campaign', order.utm_campaign)
                    
                    if items_data and not order.items_json:
                        order.items_json = json.dumps(items_data)
                    
                    # Idempotency lock for stock deduction
                    if not order.inventory_deducted:
                        order.inventory_deducted = True
                        from routers.catalog import persist_product_changes
                        import schemas
                        for item in items_data:
                            p_id = item.get("product_id")
                            qty = item.get("quantity", 0)
                            if p_id and qty > 0:
                                db_product = await session.execute(select(models.Product).where(models.Product.id == p_id))
                                p_obj = db_product.scalar_one_or_none()
                                if p_obj:
                                    p_obj.stock = max(0, p_obj.stock - qty)
                                    p_dict = {
                                        "id": p_obj.id,
                                        "name": p_obj.name,
                                        "price": p_obj.price,
                                        "category": p_obj.category,
                                        "subcategory": p_obj.subcategory,
                                        "stock": p_obj.stock,
                                        "image_url": p_obj.image_url,
                                        "btu": p_obj.btu,
                                        "voltage": p_obj.voltage,
                                        "coverage": p_obj.coverage,
                                        "performance_specs": p_obj.performance_specs,
                                        "key_spec": p_obj.key_spec,
                                        "noise_level": p_obj.noise_level,
                                        "dehumidification": p_obj.dehumidification,
                                        "dimensions": p_obj.dimensions,
                                        "weight": p_obj.weight,
                                        "warranty": p_obj.warranty,
                                        "promo_price": p_obj.promo_price,
                                        "discount_percent": p_obj.discount_percent
                                    }
                                    persist_product_changes(p_dict)
                                    print(f"Deducted {qty} from Product {p_id}. New stock: {p_obj.stock}")

                    # Trigger GA4 Purchase Event async within the Idempotency Lock
                    if ga_client_id:
                        print(f"Triggering GA4 Pipeline for Order {order.id}")
                        asyncio.create_task(
                            fire_ga4_purchase_event(
                                order_id=obj['id'], # Stripe Session ID alignment for GTM deduplication
                                ga_client_id=ga_client_id,
                                ga_session_id=ga_session_id,
                                items_data=items_data,
                                amount_total=amount_received,
                                amount_tax=amount_tax,
                                amount_shipping=amount_shipping
                            )
                        )

                await session.commit()
                print(f"Order {order.id} marked as PAID with comprehensive details.")

                # ONLY send confirmation email on Checkout Session completion (contains items & customer info)
                if event['type'] == 'checkout.session.completed':
                    target_email = order.customer_email or receipt_email
                    if target_email:
                        print(f"Dispatching email to {target_email} via Checkout Session...")
                        
                        # Call updated service with new args
                        try:
                            await email_service.send_order_confirmation(
                                target_email, 
                                order.id, 
                                order.total_cents, 
                                fulfillment_mode=fulfillment_mode,
                                items=items_data,
                                customer_info=customer_info,
                                payment_info=payment_info
                            )
                            print(f"✅ Email Pipeline Completed Successfully for order {order.id}.")
                        except Exception as e:
                            print(f"❌ FATAL: Email Pipeline failed permanently after all retries for order {order.id}: {e}")
                            import traceback
                            traceback.print_exc()
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

    import json
    payload_data = json.loads(payload.decode('utf-8'))
    background_tasks.add_task(process_stripe_event, event, payload_data)
    return {"status": "success"}

# --- MAINTENANCE ---
from seed_products import seed
from dependencies import verify_admin_token

@app.post("/api/v1/maintenance/seed_products", dependencies=[Depends(verify_admin_token)])
async def seed_products_endpoint(background_tasks: BackgroundTasks, force: bool = Query(False)):
    background_tasks.add_task(seed, force=force)
    return {"status": "seeding_started", "force": force}

@app.post("/api/v1/admin/login")
async def admin_login(payload: dict):
    pin = payload.get("pin")
    if not pin:
        raise HTTPException(status_code=400, detail="Missing PIN")
    expected_pin = os.getenv("ADMIN_PIN", "8081")
    if pin != expected_pin:
        raise HTTPException(status_code=401, detail="Invalid PIN")
    from dependencies import create_signed_token
    signed_token = create_signed_token("admin")
    response = JSONResponse(content={"token": f"Bearer {signed_token}"})
    response.set_cookie(
        key="admin_session",
        value=f"Bearer {signed_token}",
        httponly=True,
        samesite="strict",
        secure=True,
        max_age=86400
    )
    return response

@app.post("/api/v1/admin/logout")
async def admin_logout():
    response = JSONResponse(content={"status": "success"})
    response.delete_cookie("admin_session")
    return response

@app.get("/api/v1/health")
async def health_check():
    return {"status": "ok"}
