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
    
    # 3. Insert/Update Data (Upsert)
    async with AsyncSessionLocal() as session:
        products = load_products()
        print(f"   Seeding/Updating {len(products)} products from JSON...")
        
        for p in products:
            # Create instance from dict
            model_instance = models.Product(**p)
            # Use merge to update if ID exists, or insert if not
            await session.merge(model_instance)

        await session.commit()
        print("✅ Seeding Complete! (Upsert Performed)")

if __name__ == "__main__":
    if os.name == 'nt':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(seed())
