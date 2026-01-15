
import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
from database import Base, get_db
import models

# Use localhost for host connection
DATABASE_URL = "postgresql+asyncpg://user:password@localhost:5432/ahac_db"

engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

products = [
    # GE Series (Legacy/Reference)
    {"id": 1, "name": "GE 8,000 BTU Window AC", "price": 329, "category": "WINDOW_AC", "stock": 10},
    {"id": 2, "name": "GE 10,000 BTU Window AC", "price": 399, "category": "WINDOW_AC", "stock": 10},
    {"id": 3, "name": "GE 12,000 BTU Window AC", "price": 469, "category": "WINDOW_AC", "stock": 10},

    # LG Dual Inverter (Premium)
    {"id": 4, "name": "LG Dual Inverter 6,000 BTU (LW6023IVSM)", "price": 540, "category": "WINDOW_AC", "stock": 30},
    {"id": 5, "name": "LG Dual Inverter 8,000 BTU (LW8022IVSM)", "price": 575, "category": "WINDOW_AC", "stock": 50},
    {"id": 6, "name": "LG Dual Inverter 10,000 BTU (LW1022IVSM)", "price": 625, "category": "WINDOW_AC", "stock": 50},
    {"id": 7, "name": "LG Dual Inverter 12,000 BTU (LW1222IVSM)", "price": 700, "category": "WINDOW_AC", "stock": 50},
    {"id": 8, "name": "LG Dual Inverter 15,000 BTU (LW1522IVSM)", "price": 750, "category": "WINDOW_AC", "stock": 50},
    {"id": 9, "name": "LG Dual Inverter 18,000 BTU (LW1822IVSM)", "price": 875, "category": "WINDOW_AC", "stock": 30},
    {"id": 10, "name": "LG Dual Inverter 24,000 BTU (LW2422IVSM)", "price": 975, "category": "WINDOW_AC", "stock": 20},

    # LG Smart Inverter / High Efficiency
    {"id": 11, "name": "LG Smart 8,000 BTU (LW8023HRSM)", "price": 650, "category": "WINDOW_AC", "stock": 40},
    {"id": 12, "name": "LG Smart 18,000 BTU (LW1823HRSM)", "price": 875, "category": "WINDOW_AC", "stock": 25},
    {"id": 13, "name": "LG Smart 24,000 BTU (LW2423HRSM)", "price": 975, "category": "WINDOW_AC", "stock": 20},

    # Standard / Slide-Out (New Additions from List)
    {"id": 14, "name": "LG 8,000 BTU (LW8024RD)", "price": 395, "category": "WINDOW_AC", "stock": 20},
    {"id": 15, "name": "LG 10,000 BTU (LW1017ERSM1)", "price": 525, "category": "WINDOW_AC", "stock": 20},
    {"id": 16, "name": "LG 12,000 BTU (LW1217ERSM1)", "price": 600, "category": "WINDOW_AC", "stock": 20},
]

async def seed():
    async with AsyncSessionLocal() as session:
        print("Clearing existing products...")
        await session.execute(text("DELETE FROM products"))
        await session.commit()

        print("Seeding new products...")
        for p in products:
            new_product = models.Product(**p)
            session.add(new_product)

        await session.commit()
        print("Done!")

if __name__ == "__main__":
    asyncio.run(seed())
