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

async def get_product_by_id_service(db: AsyncSession, product_id: int):
    query = select(models.Product).where(models.Product.id == product_id)
    result = await db.execute(query)
    return result.scalar_one_or_none()

async def create_product_service(db: AsyncSession, product_data: dict):
    new_product = models.Product(**product_data)
    db.add(new_product)
    await db.commit()
    await db.refresh(new_product)
    return new_product

async def update_product_service(db: AsyncSession, product_id: int, product_data: dict):
    query = select(models.Product).where(models.Product.id == product_id)
    result = await db.execute(query)
    product = result.scalar_one_or_none()

    if product:
        for key, value in product_data.items():
            setattr(product, key, value)
        await db.commit()
        await db.refresh(product)

    return product

async def delete_product_service(db: AsyncSession, product_id: int):
    query = select(models.Product).where(models.Product.id == product_id)
    result = await db.execute(query)
    product = result.scalar_one_or_none()

    if product:
        await db.delete(product)
        await db.commit()
        return True
    return False

async def validate_inventory_service(db: AsyncSession, validation_items: List[dict]):
    """
    Validates multiple products' inventory and returns canonical pricing.
    """
    results = []
    all_valid = True
    for item in validation_items:
        query = select(models.Product).where(models.Product.id == item['product_id'])
        result = await db.execute(query)
        product = result.scalar_one_or_none()
        
        if not product:
            results.append({
                "product_id": item['product_id'],
                "name": "Unknown Product",
                "price": 0,
                "requested_quantity": item['requested_quantity'],
                "available_stock": 0,
                "is_available": False
            })
            all_valid = False
            continue
            
        is_available = product.stock >= item['requested_quantity']
        if not is_available:
            all_valid = False
            
        import time
        import os
        # 1785578399 seconds represents July 31st, 2026 23:59:59 HST
        is_promo_active = (time.time() <= 1785578399) and (os.environ.get("PROMO_ENABLED", "true").lower() == "true")
        price = product.promo_price if (is_promo_active and product.promo_price is not None and product.promo_price > 0) else product.price
        results.append({
            "product_id": product.id,
            "name": product.name,
            "price": price,
            "requested_quantity": item['requested_quantity'],
            "available_stock": product.stock,
            "is_available": is_available
        })
        
    return {"valid": all_valid, "results": results}
