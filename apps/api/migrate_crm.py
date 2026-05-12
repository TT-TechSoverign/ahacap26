import asyncio
import logging
from database import engine, Base
from models import Customer, Equipment, VendorInvoice, AdminUser

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("crm_migrate")

async def migrate_crm():
    logger.info("Initializing CRM Tables...")
    try:
        async with engine.begin() as conn:
            # create_all will create tables that do not exist yet (Customer, Equipment, etc.)
            await conn.run_sync(Base.metadata.create_all)
        logger.info("CRM Tables created successfully.")
    except Exception as e:
        logger.error(f"Failed to create CRM tables: {e}")

if __name__ == "__main__":
    asyncio.run(migrate_crm())
