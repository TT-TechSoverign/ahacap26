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
        existing_by_key_spec = {}
        existing_by_id = {}
        try:
            res = await session.execute(
                text("SELECT id, key_spec, stock, price, promo_price, discount_percent FROM products")
            )
            for row in res.fetchall():
                state = {
                    "id": row[0],
                    "key_spec": row[1],
                    "stock": row[2],
                    "price": row[3],
                    "promo_price": row[4],
                    "discount_percent": row[5],
                }
                existing_by_id[row[0]] = state
                if row[1]:
                    existing_by_key_spec[str(row[1]).strip().upper()] = state
        except Exception:
            pass

        if not force and len(existing_by_id) > 0:
            print(f"   ℹ️  Products already exist in database ({len(existing_by_id)} found). Skipping seeding to preserve runtime modifications.")
            return

        # Only truncate if explicitly resetting stock AND cleanup is requested
        if cleanup and reset_stock:
            print("   🗑️  Clearing existing products (--reset-stock active)...")
            await session.execute(text("TRUNCATE TABLE products RESTART IDENTITY CASCADE"))
            existing_by_key_spec = {}
            existing_by_id = {}
        else:
            print("   ℹ️  Preserving existing database stock & pricing by key_spec during catalog upsert...")
        
        products = load_products()
        print(f"   Seeding {len(products)} products from JSON...")
        valid_columns = {c.name for c in models.Product.__table__.columns}
        
        for p in products:
            p_copy = dict(p)
            pid = p_copy.get("id")
            kspec = str(p_copy.get("key_spec") or "").strip().upper()
            runtime = None
            if not reset_stock:
                if kspec and kspec in existing_by_key_spec:
                    runtime = existing_by_key_spec[kspec]
                elif pid in existing_by_id and str(existing_by_id[pid].get("key_spec") or "").strip().upper() == kspec:
                    runtime = existing_by_id[pid]
            if runtime:
                if runtime["stock"] is not None:
                    p_copy["stock"] = runtime["stock"]
                if runtime["price"] is not None:
                    p_copy["price"] = runtime["price"]
                p_copy["promo_price"] = p.get("promo_price")
                p_copy["discount_percent"] = p.get("discount_percent")

            filtered_p = {k: v for k, v in p_copy.items() if k in valid_columns}
            model_instance = models.Product(**filtered_p)
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
