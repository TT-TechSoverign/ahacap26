from database import engine, Base
from models import ContentPage
import asyncio

async def create_tables():
    async with engine.begin() as conn:
        print("Creating content_pages table...")
        await conn.run_sync(Base.metadata.create_all)
        print("Tables created.")

if __name__ == "__main__":
    asyncio.run(create_tables())
