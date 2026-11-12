from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Connection URL (Must be provided via env vars)
# DATABASE_URL should be set in .env or Docker environment
DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set.")

SQL_ECHO = os.environ.get("SQL_ECHO", "false").strip().lower() == "true"
engine = create_async_engine(DATABASE_URL, echo=SQL_ECHO)

AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

Base = declarative_base()

# Dependency for FastAPI
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
