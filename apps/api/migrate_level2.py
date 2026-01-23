
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql+asyncpg://user:password@localhost:5432/ahac_db")

async def migrate():
    engine = create_async_engine(DATABASE_URL, echo=True)
    async with engine.begin() as conn:
        print("Adding 'status' to leads table...")
        try:
            await conn.execute(text("ALTER TABLE leads ADD COLUMN IF NOT EXISTS status VARCHAR DEFAULT 'NEW'"))
        except Exception as e:
            print(f"Error adding status to leads: {e}")

        print("Adding 'items_json' to orders table...")
        try:
            await conn.execute(text("ALTER TABLE orders ADD COLUMN IF NOT EXISTS items_json VARCHAR"))
        except Exception as e:
            print(f"Error adding items_json to orders: {e}")
            
    print("Migration complete!")
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(migrate())
