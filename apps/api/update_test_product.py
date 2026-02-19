
import asyncio
import os
import sys
from sqlalchemy import select
from sqlalchemy.orm import selectinload

# Add parent dir to sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

from database import AsyncSessionLocal
import models

async def update_product():
    print("SEARCHING for product 'TESTLIVE'...")
    async with AsyncSessionLocal() as session:
        # Case insensitive search just in case
        stmt = select(models.Product).where(models.Product.name.ilike("TESTLIVE"))
        result = await session.execute(stmt)
        product = result.scalars().first()

        if not product:
            print("❌ Product 'TESTLIVE' not found!")
            # List recent products to help debug
            print("Listing last 5 products:")
            stmt_all = select(models.Product).order_by(models.Product.id.desc()).limit(5)
            res_all = await session.execute(stmt_all)
            for p in res_all.scalars():
                print(f" - ID: {p.id} | Name: {p.name} | Subcat: {p.subcategory}")
            return

        print(f"✅ Found Product: ID={product.id}, Name='{product.name}', Current Subcategory='{product.subcategory}'")
        
        # Update
        product.subcategory = "casement"
        # ensure category is valid too if needed, but shop filters by subcategory
        # product.category = "WINDOW_AC" 
        
        await session.commit()
        print(f"🚀 UPDATED Product {product.id} subcategory to 'casement'.")

if __name__ == "__main__":
    if os.name == 'nt':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(update_product())
