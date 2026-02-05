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

            # --- PRODUCT SCHEMA UPDATES ---
            # Add new product columns
            product_cols = [
                ("image_url", "VARCHAR"),
                ("btu", "INTEGER"),
                ("voltage", "VARCHAR"),
                ("coverage", "VARCHAR"),
                ("performance_specs", "VARCHAR"),
                ("key_spec", "VARCHAR"),
                ("noise_level", "VARCHAR"),
                ("dehumidification", "VARCHAR")
            ]

            for col_name, col_type in product_cols:
                try:
                    await conn.execute(text(f"ALTER TABLE products ADD COLUMN IF NOT EXISTS {col_name} {col_type};"))
                    logger.info(f"Verified column: products.{col_name}")
                except Exception as e:
                    # SQLite might complain about syntax or something, but usually fine.
                    # Postgres supports IF NOT EXISTS in newer versions.
                    # Detailed catch to avoid stopping on one failure
                    logger.warning(f"Note on {col_name}: {e}")

            # --- PRODUCT SCHEMA UPDATES ---
            # Add new product columns
            product_cols = [
                ("image_url", "VARCHAR"),
                ("btu", "INTEGER"),
                ("voltage", "VARCHAR"),
                ("coverage", "VARCHAR"),
                ("performance_specs", "VARCHAR"),
                ("key_spec", "VARCHAR"),
                ("noise_level", "VARCHAR"),
                ("dehumidification", "VARCHAR")
            ]

            for col_name, col_type in product_cols:
                try:
                    await conn.execute(text(f"ALTER TABLE products ADD COLUMN IF NOT EXISTS {col_name} {col_type};"))
                    logger.info(f"Verified column: products.{col_name}")
                except Exception as e:
                    # SQLite might complain about syntax or something, but usually fine.
                    # Postgres supports IF NOT EXISTS in newer versions.
                    # Detailed catch to avoid stopping on one failure
                    logger.warning(f"Note on {col_name}: {e}")

        except Exception as e:
            logger.error(f"Error updating schema: {e}")

if __name__ == "__main__":
    asyncio.run(fix_schema())
