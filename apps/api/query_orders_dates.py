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
        res = await db.execute(select(Order).order_by(Order.created_at.desc()).limit(15))
        orders = res.scalars().all()
        print("Recent orders in DB:")
        for o in orders:
            print(f"ID: {o.id} | Date: {o.created_at} | Status: {o.status} | Cust: {o.customer_name} ({o.customer_email})")
            
if __name__ == "__main__":
    asyncio.run(main())
