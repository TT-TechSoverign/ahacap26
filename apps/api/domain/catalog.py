from sqlalchemy.future import select
from sqlalchemy import or_
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

    if q and q.strip():
        q_clean = q.strip()
        q_norm = q_clean.replace(",", "")
        search_clauses = [
            models.Product.name.ilike(f"%{q_clean}%"),
            models.Product.category.ilike(f"%{q_clean}%"),
            models.Product.subcategory.ilike(f"%{q_clean}%"),
            models.Product.voltage.ilike(f"%{q_clean}%"),
            models.Product.coverage.ilike(f"%{q_clean}%"),
            models.Product.coverage_aham.ilike(f"%{q_clean}%"),
            models.Product.coverage_oahu.ilike(f"%{q_clean}%"),
            models.Product.key_spec.ilike(f"%{q_clean}%"),
            models.Product.performance_specs.ilike(f"%{q_clean}%"),
            models.Product.chassis_type.ilike(f"%{q_clean}%"),
        ]
        if q_norm.isdigit():
            search_clauses.append(models.Product.btu == int(q_norm))
        elif q_norm.lower().endswith("k") and q_norm[:-1].isdigit():
            search_clauses.append(models.Product.btu == int(q_norm[:-1]) * 1000)
        query = query.where(or_(*search_clauses))
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
    Validates multiple products' inventory (aggregating duplicate product_id rows) and returns canonical pricing.
    """
    results = []
    all_valid = True

    totals_by_pid = {}
    for item in validation_items:
        pid = item["product_id"]
        qty = int(item["requested_quantity"])
        totals_by_pid[pid] = totals_by_pid.get(pid, 0) + qty

    for item in validation_items:
        pid = item['product_id']
        req_qty = int(item['requested_quantity'])
        if req_qty <= 0:
            all_valid = False
        query = select(models.Product).where(models.Product.id == pid)
        result = await db.execute(query)
        product = result.scalar_one_or_none()
        
        if not product:
            results.append({
                "product_id": pid,
                "name": "Unknown Product",
                "price": 0,
                "requested_quantity": req_qty,
                "available_stock": 0,
                "is_available": False
            })
            all_valid = False
            continue
            
        total_req_for_pid = totals_by_pid.get(product.id, req_qty)
        is_available = req_qty > 0 and product.stock >= total_req_for_pid
        if not is_available:
            all_valid = False
            
        promo_val = getattr(product, "promo_price", None)
        active_price = (
            promo_val
            if promo_val is not None and 0 < promo_val < product.price
            else product.price
        )
        results.append({
            "product_id": product.id,
            "name": product.name,
            "price": active_price,
            "requested_quantity": req_qty,
            "available_stock": product.stock,
            "is_available": is_available
        })
        
    return {"valid": all_valid, "results": results}
