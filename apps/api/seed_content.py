import asyncio
import os
import json
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select
from database import Base
import models
from datetime import datetime

# Use environment variable if available (Docker), else localhost (Local)
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://user:password@localhost:5432/ahac_db")

engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

async def seed_content():
    # 1. Read JSON
    with open("content_seed.json", "r", encoding="utf-8") as f:
        content_data = json.load(f)
    
    # We will store the entire content blob under a special global path
    GLOBAL_PATH = "/global"
    
    # Convert back to string for storage (since our model matches what saves)
    json_str = json.dumps(content_data)

    async with AsyncSessionLocal() as session:
        print(f"Checking for existing content at {GLOBAL_PATH}...")
        
        # Check if exists
        result = await session.execute(select(models.ContentPage).where(models.ContentPage.path == GLOBAL_PATH))
        page = result.scalars().first()

        if page:
            print("Updating existing global content...")
            page.data = json_str
            page.draft_data = json_str # Ensure draft is synced
            page.updated_at = datetime.utcnow()
        else:
            print("Creating new global content record...")
            page = models.ContentPage(
                path=GLOBAL_PATH,
                data=json_str,
                draft_data=json_str,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            session.add(page)
        
        await session.commit()
        print("Content Seeding Complete.")

if __name__ == "__main__":
    asyncio.run(seed_content())
