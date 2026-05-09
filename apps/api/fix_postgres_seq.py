import asyncio
from database import engine
from sqlalchemy import text
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("pg_fix")

async def fix_sequences():
    async with engine.begin() as conn:
        dialect = conn.dialect.name
        if dialect != 'postgresql':
            logger.info(f"Database is {dialect}, sequence fix not required.")
            return

        logger.info("Fixing products.id sequence...")
        try:
            await conn.execute(text("CREATE SEQUENCE IF NOT EXISTS products_id_seq;"))
            await conn.execute(text("ALTER TABLE products ALTER COLUMN id SET DEFAULT nextval('products_id_seq');"))
            await conn.execute(text("ALTER SEQUENCE products_id_seq OWNED BY products.id;"))
            
            # Sync the sequence to the highest current ID so it doesn't collide
            await conn.execute(text("SELECT setval('products_id_seq', COALESCE((SELECT MAX(id) FROM products), 0) + 1, false);"))
            
            logger.info("Sequence successfully bound to products.id and synchronized!")
        except Exception as e:
            logger.error(f"Failed to fix sequence: {e}")
            
if __name__ == "__main__":
    asyncio.run(fix_sequences())
