import asyncio
import os
import json
from dotenv import load_dotenv
load_dotenv()
from sqlalchemy import text
from database import AsyncSessionLocal, engine, Base
import models

def load_products():
    # Use absolute path relative to this script
    json_path = os.path.join(os.path.dirname(__file__), 'content', 'products_seed.json')
    print(f"Loading products from {json_path}")
    with open(json_path, 'r') as f:
        return json.load(f)

async def seed(cleanup: bool = False, force: bool = False, reset_stock: bool = False):
    print("🌱 Checking Product Seeding Status...")
    
    # 3. Insert/Update Data (Upsert)
    async with AsyncSessionLocal() as session:
        existing_runtime_state = {}
        try:
            res = await session.execute(
                text("SELECT id, stock, price, promo_price, discount_percent FROM products")
            )
            for row in res.fetchall():
                existing_runtime_state[row[0]] = {
                    "stock": row[1],
                    "price": row[2],
                    "promo_price": row[3],
                    "discount_percent": row[4],
                }
        except Exception:
            pass

        if not force and len(existing_runtime_state) > 0:
            print(f"   ℹ️  Products already exist in database ({len(existing_runtime_state)} found). Skipping seeding to preserve runtime modifications.")
            return

        # Only truncate if explicitly resetting stock AND cleanup is requested
        if cleanup and reset_stock:
            print("   🗑️  Clearing existing products (--reset-stock active)...")
            await session.execute(text("TRUNCATE TABLE products RESTART IDENTITY CASCADE"))
            existing_runtime_state = {}
        else:
            print("   ℹ️  Preserving existing database stock & pricing during catalog upsert...")
        
        products = load_products()
        print(f"   Seeding {len(products)} products from JSON...")
        
        for p in products:
            p_copy = dict(p)
            pid = p_copy.get("id")
            if not reset_stock and pid in existing_runtime_state:
                runtime = existing_runtime_state[pid]
                if runtime["stock"] is not None:
                    p_copy["stock"] = runtime["stock"]
                if runtime["price"] is not None:
                    p_copy["price"] = runtime["price"]
                if runtime["promo_price"] is not None:
                    p_copy["promo_price"] = runtime["promo_price"]
                if runtime["discount_percent"] is not None:
                    p_copy["discount_percent"] = runtime["discount_percent"]

            model_instance = models.Product(**p_copy)
            await session.merge(model_instance)

        await session.commit()
        print("✅ Seeding Complete! (Upsert Performed, Live Stock Preserved)")

if __name__ == "__main__":
    import sys
    force = "--force" in sys.argv
    reset_stock = "--reset-stock" in sys.argv
    if os.name == 'nt':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(seed(cleanup=reset_stock, force=force, reset_stock=reset_stock))
