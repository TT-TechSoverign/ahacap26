import asyncio
import os
import json
from sqlalchemy import text
from database import AsyncSessionLocal, engine, Base
import models

def load_products():
    # Use absolute path relative to this script
    json_path = os.path.join(os.path.dirname(__file__), 'content', 'products_seed.json')
    print(f"Loading products from {json_path}")
    with open(json_path, 'r') as f:
        return json.load(f)

async def seed():
    print("🌱 Starting Product Seeding...")
    
    # 1. Reset Table
    async with AsyncSessionLocal() as session:
        print("   Dropping products table...")
        await session.execute(text("DROP TABLE IF EXISTS products CASCADE"))
        await session.commit()
    
    # 2. Re-create Tables
    print("   Re-creating tables...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # 3. Insert Data
    async with AsyncSessionLocal() as session:
        products = load_products()
        print(f"   Seeding {len(products)} products...")
        
        for p in products:
            # Filter out any keys that don't match the model if necessary, 
            # or ensure JSON matches model exactly.
            # For now, assuming strict match or pydantic ignore.
            new_product = models.Product(**p)
            session.add(new_product)

        await session.commit()
        print("✅ Seeding Complete!")

if __name__ == "__main__":
    if os.name == 'nt':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(seed())
