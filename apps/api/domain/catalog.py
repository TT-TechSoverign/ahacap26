from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional, List
import models

async def get_products_service(
    db: AsyncSession,
    q: Optional[str] = None,
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None
):
    """
    Domain logic for retrieving products with filters.
    """
    query = select(models.Product)

    if q:
        query = query.where(models.Product.name.ilike(f"%{q}%"))
    if category:
        query = query.where(models.Product.category == category)
    if min_price is not None:
        query = query.where(models.Product.price >= min_price)
    if max_price is not None:
        query = query.where(models.Product.price <= max_price)

    result = await db.execute(query.order_by(models.Product.id))
    return result.scalars().all()
