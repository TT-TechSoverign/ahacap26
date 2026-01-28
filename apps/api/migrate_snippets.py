from database import engine, Base
import models
import asyncio

async def init_models():
    async with engine.begin() as conn:
        print("Creating ContentSnippet table...")
        await conn.run_sync(Base.metadata.create_all)
        print("Done.")

if __name__ == "__main__":
    asyncio.run(init_models())
