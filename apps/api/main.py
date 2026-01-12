from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import insert
from contextlib import asynccontextmanager
from pydantic import BaseModel
from typing import List, Dict, Optional
import csv
import os

from database import engine, Base, get_db, AsyncSessionLocal
import models
# [NEW] Domain Imports
from domain import orders, catalog, cart

# --- LIFESPAN (Startup/Shutdown) ---
@asynccontextmanager
async def lifespan(app: FastAPI):
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

@app.get("/api/v1/products", response_model=List[ProductSchema])
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
