import sys
import os
import asyncio
from dotenv import load_dotenv

# Load env vars
load_dotenv(".env")

from database import engine, AsyncSessionLocal
from models import Lead
from sqlalchemy import select

async def main():
    async with AsyncSessionLocal() as db:
        res = await db.execute(select(Lead).order_by(Lead.created_at.desc()).limit(10))
        leads = res.scalars().all()
        print(f"Total leads retrieved: {len(leads)}")
        for l in leads:
            print(f"ID: {l.id} | Name: {l.first_name} {l.last_name} | Urgency: {l.urgency} | Status: {l.status}")
            print("---")
            
if __name__ == "__main__":
    asyncio.run(main())
