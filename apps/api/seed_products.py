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
    print("🌱 Checking Product Seeding Status...")
    
    # 1. Check if data exists
    async with AsyncSessionLocal() as session:
        try:
            # Check if table exists and has data
            result = await session.execute(text("SELECT count(*) FROM products"))
            count = result.scalar()
            if count and count > 0:
                print(f"✅ Found {count} existing products. Skipping seed to PRESERVE DATA.")
                print("   (To force reset, manually drop the table or use a flag)")
                return
        except Exception as e:
            print(f"   Table check failed (likely doesn't exist): {e}")
            print("   Proceeding to create tables...")

    # 2. Create Tables (Safe, won't overwrite if exists unless dropped)
    print("   Ensuring schema exists...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # 3. Insert Data (Only if we didn't return above)
    async with AsyncSessionLocal() as session:
        products = load_products()
        print(f"   Seeding {len(products)} products from JSON...")
        
        for p in products:
            # Filter out any keys that don't match the model if necessary
            new_product = models.Product(**p)
            session.add(new_product)

        await session.commit()
        print("✅ Seeding Complete!")

if __name__ == "__main__":
    if os.name == 'nt':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(seed())
