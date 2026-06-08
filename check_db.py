import asyncio
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'apps', 'api'))

from apps.api.database import AsyncSessionLocal
from apps.api.models import Product
from sqlalchemy import select

async def check():
    async with AsyncSessionLocal() as session:
        r = await session.execute(select(Product).where(Product.id == 7))
        p = r.scalar()
        if p:
            print('Dimensions:', getattr(p, 'dimensions', None))
            print('Weight:', getattr(p, 'weight', None))
        else:
            print("Product 7 not found.")

if __name__ == "__main__":
    if os.name == 'nt':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(check())
