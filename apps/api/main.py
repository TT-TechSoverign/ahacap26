
from datetime import datetime
from dotenv import load_dotenv
import os
import sentry_sdk

# 0. Load Env Support
load_dotenv()
print(f"DEBUG: STARTUP MAIN.PY. STRIPE_KEY_LEN={len(os.getenv('STRIPE_SECRET_KEY', ''))}")

# 0.5 Sentry Initialization
if os.getenv("SENTRY_DSN"):
    sentry_sdk.init(
        dsn=os.getenv("SENTRY_DSN"),
        # Set traces_sample_rate to 1.0 to capture 100%
        # of transactions for performance monitoring.
        traces_sample_rate=1.0,
        # Set profiles_sample_rate to 1.0 to profile 100%
        # of sampled transactions.
        profiles_sample_rate=1.0,
    )
    print("DEBUG: Senty Initialized.")
else:
    print("DEBUG: Sentry DSN not found. Skipping Sentry init.")

from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import insert, update
from contextlib import asynccontextmanager
from pydantic import BaseModel
from typing import List, Dict, Optional
import csv
import asyncio
import random
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

# Local Imports
from database import engine, Base, get_db, AsyncSessionLocal
import models
from domain import orders, catalog, cart, payments
from cache import init_redis, close_redis, cache_response, invalidate_cache
from middleware import LogSanitizerMiddleware, ChaosMiddleware, HeaderMiddleware

# --- LIFESPAN (Startup/Shutdown) ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    # 0. Init Redis
    await init_redis()

    # 1. Initialize Tables
    print("DEBUG: Creating Tables...")
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)

        # 2. Seed Data if Empty
        async with AsyncSessionLocal() as session:
            result = await session.execute(select(models.Product))
            existing_product = result.scalars().first()

            if not existing_product:
                print("Database empty. Seeding from inventory.csv...")
                file_path = os.path.join(os.path.dirname(__file__), "inventory.csv")
                try:
                    products_to_add = []
                    with open(file_path, mode='r') as csvfile:
                        reader = csv.DictReader(csvfile)
                        for row in reader:
                            products_to_add.append({
                                "id": int(row['id']),
                                "name": row['name'],
                                "price": int(row['price']),
                                "category": row['category'],
                                "stock": int(row['stock']),
                                "image_url": row.get('image_url'),
                                "btu": int(row['btu']) if row.get('btu') else None,
                                "voltage": row.get('voltage'),
                                "coverage": row.get('coverage'),
                                "performance_specs": row.get('performance_specs'),
                                "key_spec": row.get('key_spec'),
                                "noise_level": row.get('noise_level'),
                                "dehumidification": row.get('dehumidification')
                            })

                    if products_to_add:
                        await session.execute(insert(models.Product), products_to_add)
                        await session.commit()
                        print(f"Seeded {len(products_to_add)} products.")
                except FileNotFoundError:
                    print("Warning: inventory.csv not found. Skipping seed.")
    except Exception as e:
        print(f"WARNING: Database connection failed: {e}")
        print("Running in NO-DB Mode. Only Mock Endpoints will work.")

    print("DEBUG: Startup Complete.")
    yield
    # Shutdown
    await close_redis()
    await engine.dispose()

app = FastAPI(lifespan=lifespan)

# --- SECURITY & MIDDLEWARE ---
allowed_origins_raw = os.getenv("ALLOWED_ORIGINS", "*")
origins = allowed_origins_raw.split(",") if allowed_origins_raw != "*" else ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(LogSanitizerMiddleware)
app.add_middleware(ChaosMiddleware)
app.add_middleware(HeaderMiddleware)

# --- ROUTES ---

@app.get("/api/v1/health")
async def health_check():
    return {"status": "ok"}

# --- MODELS (Pydantic) ---
class ProductSchema(BaseModel):
    id: int
    name: str
    price: int
    category: str
    stock: int
    image_url: Optional[str] = None
    btu: Optional[int] = None
    voltage: Optional[str] = None
    coverage: Optional[str] = None
    performance_specs: Optional[str] = None
    key_spec: Optional[str] = None
    noise_level: Optional[str] = None
    dehumidification: Optional[str] = None

    class Config:
        from_attributes = True

class WarrantySpec(BaseModel):
    parts: str
    compressor: str

class WarrantyMatrix(BaseModel):
    residential: Dict[str, WarrantySpec]
    commercial: Dict[str, WarrantySpec]
    company_workmanship: str

class CartItem(BaseModel):
    product_id: int
    category: str
    name: str
    quantity: int = 1

class OrderRequest(BaseModel):
    items: List[CartItem]
    customer_email: str
    shipping_method: str = "PICKUP_AIEA"
    discount_code: Optional[str] = None

class PaymentIntentRequest(BaseModel):
    items: List[CartItem]
    client_total_cents: int
    currency: str = "usd"
    customer_email: Optional[str] = None

class ProductCreateSchema(BaseModel):
    name: str
    price: int
    category: str
    stock: int
    image_url: Optional[str] = None
    btu: Optional[int] = None
    voltage: Optional[str] = None
    coverage: Optional[str] = None
    performance_specs: Optional[str] = None
    key_spec: Optional[str] = None
    noise_level: Optional[str] = None
    dehumidification: Optional[str] = None

class ProductUpdateSchema(BaseModel):
    name: Optional[str] = None
    price: Optional[int] = None
    category: Optional[str] = None
    stock: Optional[int] = None
    image_url: Optional[str] = None
    btu: Optional[int] = None
    voltage: Optional[str] = None
    coverage: Optional[str] = None
    performance_specs: Optional[str] = None
    key_spec: Optional[str] = None
    noise_level: Optional[str] = None
    dehumidification: Optional[str] = None

class LeadSchema(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    phone: str
    address: str
    city: str
    zip: str
    service_type: str
    urgency: str
    notes: Optional[str] = None
    status: str
    created_at: datetime
    class Config:
        from_attributes = True

class LeadUpdateSchema(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

class LeadCreateSchema(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    address: str
    city: str
    zip: str
    service_type: str
    urgency: str
    notes: Optional[str] = None

class OrderSchema(BaseModel):
    id: str
    status: str
    total_cents: int
    customer_email: Optional[str] = None
    items_json: Optional[str] = None
    created_at: datetime
    class Config:
        from_attributes = True

class OrderUpdateSchema(BaseModel):
    status: str

# --- API ENDPOINTS ---

@app.post("/api/v1/orders")
async def create_order(order: OrderRequest, db: AsyncSession = Depends(get_db)):
    return await orders.create_order_service(order, db)

@app.post("/api/v1/cart/validate")
async def validate_cart(cart_request: OrderRequest):
    return cart.validate_cart_service(cart_request)

@app.post("/api/v1/payments/create-intent")
async def create_payment_intent(
    request: PaymentIntentRequest,
    db: AsyncSession = Depends(get_db),
    idempotency_key: Optional[str] = Header(None)
):
    print(f"DEBUG: create_payment_intent hit. Email={request.customer_email}")
    # 1. Total
    server_total_cents = await cart.calculate_cart_total(request.items, db)

    # 2. Check
    if server_total_cents != request.client_total_cents:
        raise HTTPException(status_code=400, detail="Price mismatch detected. Please refresh cart.")

    # 3. Order Init
    existing_order = None
    if idempotency_key:
        result = await db.execute(select(models.Order).where(models.Order.idempotency_key == idempotency_key))
        existing_order = result.scalars().first()

    if existing_order:
        if existing_order.status == models.OrderStatus.PAID:
            pass
        elif existing_order.status != models.OrderStatus.AWAIT_PAYMENT:
            raise HTTPException(status_code=409, detail=f"Invalid State Transition from {existing_order.status}")

        if request.customer_email and existing_order.customer_email != request.customer_email:
             existing_order.customer_email = request.customer_email
             await db.commit()
    else:
        from uuid import uuid4
        import json
        items_serialized = json.dumps([i.dict() for i in request.items])
        new_order = models.Order(
            id=str(uuid4()),
            status=models.OrderStatus.AWAIT_PAYMENT,
            total_cents=server_total_cents,
            idempotency_key=idempotency_key,
            customer_email=request.customer_email,
            items_json=items_serialized
        )
        db.add(new_order)
        await db.commit()

    # 4. Stripe Intent
    result = await payments.create_payment_intent_service(server_total_cents, request.currency, idempotency_key)

    # 5. Update Order
    if not existing_order or not existing_order.stripe_pid:
        stmt = (
            models.update(models.Order)
            .where(models.Order.idempotency_key == idempotency_key)
            .values(stripe_pid=result['id'])
        )
        await db.execute(stmt)
        await db.commit()

    return result

# --- WEBHOOKS ---
from fastapi import Request, BackgroundTasks
from services import email as email_service

async def process_stripe_event(event: dict):
    if event['type'] == 'payment_intent.succeeded':
        intent = event['data']['object']
        stripe_pid = intent['id']
        amount_received = intent['amount_received']
        receipt_email = intent.get('receipt_email')

        print(f"Processing Payment Success: {stripe_pid}")

        async with AsyncSessionLocal() as session:
            try:
                result = await session.execute(
                    select(models.Order).where(models.Order.stripe_pid == stripe_pid)
                )
                order = result.scalars().first()

                if order:
                    if order.status != models.OrderStatus.PAID:
                        order.status = models.OrderStatus.PAID
                        await session.commit()
                        print(f"Order {order.id} marked as PAID.")

                    target_email = order.customer_email or receipt_email
                    if target_email:
                        print(f"Dispatching email to {target_email}...")
                        await email_service.send_order_confirmation(
                            target_email,
                            order.id,
                            order.total_cents
                        )
                    else:
                        print("No email found for order confirmation.")
                else:
                    print(f"Order not found for PID: {stripe_pid}")
            except Exception as e:
                print(f"Webhook Processing Error: {e}")

@app.post("/api/webhooks/stripe")
async def stripe_webhook(request: Request, background_tasks: BackgroundTasks):
    payload = await request.body()
    sig_header = request.headers.get("Stripe-Signature")
    webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")

    background_tasks.add_task(process_stripe_event, event)
    return {"status": "success"}

# --- DEBUG ENDPOINTS (MOCK FLOW) ---
from services import pdf as pdf_service
from datetime import datetime

class SimulatePaymentRequest(BaseModel):
    items: List[CartItem]
    customer_email: str
    total_cents: int

@app.post("/api/v1/debug/simulate-payment")
async def simulate_payment(request: SimulatePaymentRequest, background_tasks: BackgroundTasks):
    """
    Generates a PDF receipt and sends real emails to Customer + Owner.
    Does NOT charge card, but creates records.
    """
    print(f"DEBUG: Simulating Payment for {request.customer_email}")

    # 1. Generate Dummy Order ID
    import uuid
    order_id = str(uuid.uuid4())

    # 2. Generate PDF
    # Convert CartItems to dicts for simple PDF generator if needed, or pass as is if PDF supports it.
    # We kept PDF simple.
    pdf_bytes = pdf_service.generate_receipt_pdf(
        order_id,
        [item.dict() for item in request.items],
        request.total_cents,
        datetime.now(),
        request.customer_email
    )

    # 3. Send Email (Background)
    # targeting: authentic customer email + owner + mock copy
    background_tasks.add_task(
        email_service.send_order_confirmation,
        request.customer_email,
        order_id,
        request.total_cents,
        pdf_bytes
    )

    return {"status": "success", "order_id": order_id}

# --- ADMIN ROUTES ---

@app.get("/api/v1/admin/orders", response_model=List[OrderSchema])
async def get_admin_orders(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Order).order_by(models.Order.created_at.desc()))
    return result.scalars().all()

@app.put("/api/v1/admin/orders/{order_id}", response_model=OrderSchema)
async def update_order(order_id: str, order_data: OrderUpdateSchema, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Order).where(models.Order.id == order_id))
    order = result.scalars().first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    order.status = order_data.status
    await db.commit()
    await db.refresh(order)
    return order

@app.get("/api/v1/admin/leads", response_model=List[LeadSchema])
async def get_admin_leads(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Lead).order_by(models.Lead.created_at.desc()))
    return result.scalars().all()

@app.put("/api/v1/admin/leads/{lead_id}", response_model=LeadSchema)
async def update_lead(lead_id: int, lead_data: LeadUpdateSchema, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Lead).where(models.Lead.id == lead_id))
    lead = result.scalars().first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    if lead_data.status:
        lead.status = lead_data.status
    if lead_data.notes is not None:
        lead.notes = lead_data.notes
        
    await db.commit()
    await db.refresh(lead)
    return lead

# --- LEAD ROUTES ---

@app.post("/api/v1/leads", response_model=LeadSchema)
async def create_lead(lead: LeadCreateSchema, db: AsyncSession = Depends(get_db)):
    new_lead = models.Lead(**lead.dict())
    db.add(new_lead)
    await db.commit()
    await db.refresh(new_lead)
    return new_lead

# --- PRODUCT ROUTES ---

@app.get("/api/v1/products", response_model=List[ProductSchema])
@cache_response(ttl=60, key_prefix="products")
async def get_products(
    q: Optional[str] = None,
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    db: AsyncSession = Depends(get_db)
):
    return await catalog.get_products_service(db, q, category, min_price, max_price)

@app.get("/api/v1/products/{product_id}", response_model=ProductSchema)
async def get_product(product_id: int, db: AsyncSession = Depends(get_db)):
    query = select(models.Product).where(models.Product.id == product_id)
    result = await db.execute(query)
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.post("/api/v1/products", response_model=ProductSchema)
async def create_product(product: ProductCreateSchema, db: AsyncSession = Depends(get_db)):
    result = await catalog.create_product_service(db, product.dict())
    await invalidate_cache("products:*")
    return result

@app.put("/api/v1/products/{product_id}", response_model=ProductSchema)
async def update_product(product_id: int, product: ProductUpdateSchema, db: AsyncSession = Depends(get_db)):
    updated_product = await catalog.update_product_service(db, product_id, product.dict(exclude_unset=True))
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    await invalidate_cache("products:*")
    return updated_product

@app.delete("/api/v1/products/{product_id}")
async def delete_product(product_id: int, db: AsyncSession = Depends(get_db)):
    success = await catalog.delete_product_service(db, product_id)
    if not success:
        raise HTTPException(status_code=404, detail="Product not found")
    await invalidate_cache("products:*")
    return {"status": "success", "message": "Product deleted"}

@app.get("/api/v1/warranties", response_model=WarrantyMatrix)
async def get_warranties():
    return WarrantyMatrix(
        residential={
            "Fujitsu": WarrantySpec(parts="12 Years", compressor="12 Years"),
            "Daikin": WarrantySpec(parts="12 Years", compressor="12 Years"),
            "Carrier": WarrantySpec(parts="10 Years", compressor="10 Years"),
            "Mitsubishi": WarrantySpec(parts="5 Years", compressor="7 Years"),
        },
        commercial={
            "Fujitsu": WarrantySpec(parts="10 Years", compressor="10 Years"),
            "Daikin": WarrantySpec(parts="10 Years", compressor="10 Years"),
        },
        company_workmanship="1 Year on all installs"
    )
