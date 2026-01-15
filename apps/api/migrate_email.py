
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
import os

# Use the same default as run_dev.ps1 or rely on env
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://user:password@localhost:5432/ahac_db")

async def migrate():
    print(f"Connecting to DB...")
    engine = create_async_engine(DATABASE_URL)

    async with engine.begin() as conn:
        try:
            print("Adding customer_email to orders table...")
            await conn.execute(text("ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_email VARCHAR;"))
            print("Migration successful.")
        except Exception as e:
            print(f"Migration error: {e}")

    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(migrate())
