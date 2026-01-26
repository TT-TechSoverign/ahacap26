import asyncio
from database import engine
from sqlalchemy import text
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("db_fix")

async def fix_schema():
    async with engine.begin() as conn:
        logger.info("Attempting to add 'items_json' column to 'orders' table...")
        try:
            # Add items_json column
            await conn.execute(text("ALTER TABLE orders ADD COLUMN IF NOT EXISTS items_json TEXT;"))
            logger.info("Successfully added 'items_json' column.")
            
            # Add customer_email column if missing (just in case)
            await conn.execute(text("ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_email VARCHAR;"))
            logger.info("Successfully checked 'customer_email' column.")

        except Exception as e:
            logger.error(f"Error updating schema: {e}")

if __name__ == "__main__":
    asyncio.run(fix_schema())
