import sys
import os
import asyncio
from dotenv import load_dotenv

# Load env vars
load_dotenv(".env")

from database import engine, AsyncSessionLocal
from models import Order
from sqlalchemy import select

async def main():
    async with AsyncSessionLocal() as db:
        res = await db.execute(select(Order).order_by(Order.created_at.desc()).limit(5))
        orders = res.scalars().all()
        for o in orders:
            print(f"ID: {o.id}")
            print(f"  Name: {o.customer_name}")
            print(f"  Email: {o.customer_email}")
            print(f"  Items: {o.items_json}")
            print("---")
            
if __name__ == "__main__":
    asyncio.run(main())
