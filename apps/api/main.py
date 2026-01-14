from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import insert, update
from contextlib import asynccontextmanager
from pydantic import BaseModel
from typing import List, Dict, Optional
import csv
import os

from database import engine, Base, get_db, AsyncSessionLocal
import models
# [NEW] Domain Imports
from domain import orders, catalog, cart, payments
from cache import init_redis, close_redis, cache_response
import asyncio
import random
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

# --- LIFESPAN (Startup/Shutdown) ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    # 0. Init Redis
    await init_redis()

    # 1. Initialize Tables
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
                            "stock": int(row['stock'])
                        })

                if products_to_add:
                    await session.execute(insert(models.Product), products_to_add)
                    await session.commit()
                    print(f"Seeded {len(products_to_add)} products.")
            except FileNotFoundError:
                print("Warning: inventory.csv not found. Skipping seed.")

    yield
    # Shutdown logic (dispose engine)
    await close_redis()
    await engine.dispose()

app = FastAPI(lifespan=lifespan)

# --- SECURITY ---
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
from middleware import LogSanitizerMiddleware, ChaosMiddleware, HeaderMiddleware

# ...

app = FastAPI(lifespan=lifespan)

# --- SECURITY & MIDDLEWARE ---
origins = ["*"]
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

@app.post("/api/v1/orders")
async def create_order(order: OrderRequest, db: AsyncSession = Depends(get_db)):
    # Delegate to Domain Layer
    return await orders.create_order_service(order, db)

@app.post("/api/v1/cart/validate")
async def validate_cart(cart_request: OrderRequest):
    # Delegate to Domain Layer
    return cart.validate_cart_service(cart_request) # Wait, module is 'cart', function is 'validate_cart_service'
    # Correction: 'cart' variable shadows module name 'cart'. Renaming variable in function sig to avoid conflict?
    # Or import as 'cart_domain'

class PaymentIntentRequest(BaseModel):
    items: List[CartItem]
    client_total_cents: int
    currency: str = "usd"

from fastapi import Header

@app.post("/api/v1/payments/create-intent")
async def create_payment_intent(
    request: PaymentIntentRequest,
    db: AsyncSession = Depends(get_db),
    idempotency_key: Optional[str] = Header(None)
):
    # 1. Calculate Server-Side Total
    server_total_cents = await cart.calculate_cart_total(request.items, db)

    # 2. Hard Fail on Mismatch (Price Guardian)
    if server_total_cents != request.client_total_cents:
        print(f"PriceMismatch: Client({request.client_total_cents}) != Server({server_total_cents})")
        raise HTTPException(status_code=400, detail="Price mismatch detected. Please refresh cart.")

    # 3. State Machine: Initialize Order in AWAIT_PAYMENT
    # Idempotency Check (DB Level)
    existing_order = None
    if idempotency_key:
        result = await db.execute(select(models.Order).where(models.Order.idempotency_key == idempotency_key))
        existing_order = result.scalars().first()

    if existing_order:
        # Strict Transition Check
        if existing_order.status == models.OrderStatus.PAID:
             # If already paid, client should ideally not be here, but getting the same intent is safe as Stripe won't double charge
             pass
        elif existing_order.status != models.OrderStatus.AWAIT_PAYMENT:
            raise HTTPException(status_code=409, detail=f"Invalid State Transition from {existing_order.status}")

        # Make sure amount hasn't changed?
        if existing_order.total_cents != server_total_cents:
             raise HTTPException(status_code=400, detail="Order modified. Please restart checkout.")
    else:
        # Create New Order
        from uuid import uuid4
        new_order = models.Order(
            id=str(uuid4()),
            status=models.OrderStatus.AWAIT_PAYMENT,
            total_cents=server_total_cents,
            idempotency_key=idempotency_key
        )
        db.add(new_order)
        await db.commit()

    # 4. Create/Retrieve Intent (Pass Idempotency Key to Stripe)
    result = await payments.create_payment_intent_service(server_total_cents, request.currency, idempotency_key)

    # Update Order with Stripe PID if new
    if not existing_order or not existing_order.stripe_pid:
        # We need to fetch order again if it was just created? No, we have the object if we kept it in scope?
        # Actually sqlalchemy async session requires refresh usually.
        # Let's just update strictly if we just created it.
        # Simplest: Update by idempotency key
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

async def process_stripe_event(event: dict):
    """
    Background Task to process Stripe events asynchronously.
    Updates DB Order status to PAID.
    """
    if event['type'] == 'payment_intent.succeeded':
        intent = event['data']['object']
        stripe_pid = intent['id']
        amount_received = intent['amount_received']

        print(f"Processing Payment Success: {stripe_pid}")

        # New DB Session for Background Task
        async with AsyncSessionLocal() as session:
            try:
                # Find Order
                result = await session.execute(
                    select(models.Order).where(models.Order.stripe_pid == stripe_pid)
                )
                order = result.scalars().first()

                if order:
                    if order.status != models.OrderStatus.PAID:
                        # Verify Amount (Optional paranoid check)
                        if order.total_cents == amount_received:
                            order.status = models.OrderStatus.PAID
                            await session.commit()
                            print(f"Order {order.id} marked as PAID.")
                        else:
                            print("Warning: Amount mismatch in webhook.")
                    else:
                         print("Order already PAID.")
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
    except ValueError as e:
        # Invalid payload
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        raise HTTPException(status_code=400, detail="Invalid signature")

    # Async Processing (@EventBuffer)
    background_tasks.add_task(process_stripe_event, event)

    return {"status": "success"}

@app.get("/api/v1/products", response_model=List[ProductSchema])
@cache_response(ttl=60, key_prefix="products")
async def get_products(
    q: Optional[str] = None,
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    db: AsyncSession = Depends(get_db)
):
    # Delegate to Domain Layer
    return await catalog.get_products_service(db, q, category, min_price, max_price)


@app.get("/api/v1/products/{product_id}", response_model=ProductSchema)
async def get_product(product_id: int, db: AsyncSession = Depends(get_db)):
    query = select(models.Product).where(models.Product.id == product_id)
    result = await db.execute(query)
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

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
