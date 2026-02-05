
import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
from database import Base, get_db
import models

from sqlalchemy import text
from database import Base, get_db, AsyncSessionLocal, engine
import models


import json
import os

def load_products():
    json_path = os.path.join(os.path.dirname(__file__), 'content', 'products_seed.json')
    with open(json_path, 'r') as f:
        return json.load(f)

async def seed():
    async with AsyncSessionLocal() as session:
        print("Dropping and recreating products table...")
        await session.execute(text("DROP TABLE IF EXISTS products CASCADE"))
        await session.commit()
    
    # Re-import to ensure Base has updated models
    from database import engine, Base
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        print("Seeding new products...")
        products = load_products()
        for p in products:
            new_product = models.Product(**p)
            session.add(new_product)

        await session.commit()
        print("Done!")


if __name__ == "__main__":
    asyncio.run(seed())
