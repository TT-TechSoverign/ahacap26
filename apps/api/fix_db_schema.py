import asyncio
from dotenv import load_dotenv
load_dotenv()
from database import engine
from sqlalchemy import text
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("db_fix")

async def fix_schema():
    max_retries = 5
    retry_delay = 5
    
    for attempt in range(max_retries):
        try:
            async with engine.connect() as conn:
                await conn.execute(text("COMMIT")) # Ensure we are not in a failed transaction state
                break
        except Exception as e:
            if attempt < max_retries - 1:
                logger.warning(f"Database connection failed ({e}). Retrying in {retry_delay}s...")
                await asyncio.sleep(retry_delay)
            else:
                logger.error("Max retries reached. Database unavailable.")
                raise e

    async with engine.connect() as conn:
        # We already committed above, just re-establish for the work below
        await conn.execute(text("COMMIT")) 

        
        logger.info("Starting Schema Validation...")
        
        # Detect Dialect
        dialect = conn.dialect.name
        logger.info(f"Detected Database Dialect: {dialect}")

        # Helper to check column existence
        async def check_column(table, column):
            if dialect == 'sqlite':
                # SQLite Introspection
                result = await conn.execute(text(f"PRAGMA table_info({table})"))
                columns = [row.name for row in result.fetchall()]
                return column in columns
            else:
                # Postgres (and others) Introspection
                result = await conn.execute(text(
                    f"SELECT column_name FROM information_schema.columns WHERE table_name='{table}' AND column_name='{column}'"
                ))
                return result.scalar() is not None

        # Helper to add column
        async def add_column(table, column, type_def):
            if not await check_column(table, column):
                logger.info(f"Adding missing column: {table}.{column}")
                try:
                    await conn.execute(text(f"ALTER TABLE {table} ADD COLUMN {column} {type_def}"))
                    await conn.execute(text("COMMIT"))
                except Exception as e:
                    logger.error(f"Failed to add {column}: {e}")
                    await conn.execute(text("ROLLBACK"))
            else:
                logger.info(f"Column exists: {table}.{column}")

        # 1. Orders Table
        await add_column("orders", "items_json", "TEXT")
        await add_column("orders", "customer_email", "VARCHAR")
        await add_column("orders", "customer_name", "VARCHAR")
        await add_column("orders", "customer_phone", "VARCHAR")
        await add_column("orders", "customer_address", "VARCHAR")
        await add_column("orders", "fulfillment_mode", "VARCHAR(50)")
        await add_column("orders", "inventory_deducted", "BOOLEAN")
        await add_column("orders", "idempotency_key", "VARCHAR")
        await add_column("orders", "utm_source", "VARCHAR")
        await add_column("orders", "utm_medium", "VARCHAR")
        await add_column("orders", "utm_campaign", "VARCHAR")

        # 2. Products Table
        product_cols = [
            ("image_url", "VARCHAR"),
            ("btu", "INTEGER"),
            ("voltage", "VARCHAR"),
            ("coverage", "VARCHAR"),
            ("performance_specs", "VARCHAR"),
            ("key_spec", "VARCHAR"),
            ("noise_level", "VARCHAR"),
            ("dehumidification", "VARCHAR"),
            ("dimensions", "VARCHAR"),
            ("weight", "VARCHAR"),
            ("warranty", "VARCHAR"),
            ("promo_price", "INTEGER"),
            ("discount_percent", "INTEGER")
        ]

        for col, dtype in product_cols:
            await add_column("products", col, dtype)

        logger.info("Schema Validation Complete.")

if __name__ == "__main__":
    asyncio.run(fix_schema())
