
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://user:password@localhost:5432/ahac_db")

async def migrate():
    print(f"Connecting to {DATABASE_URL}...")
    engine = create_async_engine(DATABASE_URL)

    async with engine.begin() as conn:
        try:
            print("Attempting to add image_url column...")
            await conn.execute(text("ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url VARCHAR;"))
            print("Migration successful: Added image_url column.")
        except Exception as e:
            print(f"Migration failed (it might already exist): {e}")

    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(migrate())
