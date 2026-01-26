from fastapi import APIRouter, Depends, Query
import schemas
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional, List
from dependencies import get_db
from domain import catalog

router = APIRouter()

@router.get("")
async def get_products(
    q: Optional[str] = None,
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    db: AsyncSession = Depends(get_db)
):
    return await catalog.get_products_service(db, q, category, min_price, max_price)

@router.get("/{product_id}")
async def get_product(
    product_id: int,
    db: AsyncSession = Depends(get_db)
):
    product = await catalog.get_product_by_id_service(db, product_id)
    if not product:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("", response_model=schemas.Product)
async def create_product(
    product: schemas.ProductCreate,
    db: AsyncSession = Depends(get_db)
):
    return await catalog.create_product_service(db, product.dict())

@router.put("/{product_id}", response_model=schemas.Product)
async def update_product(
    product_id: int,
    product_update: schemas.ProductUpdate,
    db: AsyncSession = Depends(get_db)
):
    # Filter out None values to allow partial updates
    update_data = {k: v for k, v in product_update.dict().items() if v is not None}
    
    updated_product = await catalog.update_product_service(db, product_id, update_data)
    if not updated_product:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Product not found")
    return updated_product

@router.delete("/{product_id}")
async def delete_product(
    product_id: int,
    db: AsyncSession = Depends(get_db)
):
    success = await catalog.delete_product_service(db, product_id)
    if not success:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Product not found")
    return {"status": "success"}
