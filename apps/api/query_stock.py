import asyncio
import os
import sys
from dotenv import load_dotenv

# Ensure we can import from the app directory
sys.path.append('/app')
load_dotenv(".env")

from sqlalchemy.future import select
from database import AsyncSessionLocal
import models

async def main():
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(models.Product).order_by(models.Product.id))
        products = result.scalars().all()
        print("Product stock levels:")
        for p in products:
            print(f"ID: {p.id} | Name: {p.name} | Stock: {p.stock} | Price: {p.price} | Category: {p.category}")
            
if __name__ == "__main__":
    asyncio.run(main())
