from fastapi import APIRouter, Depends, Query
import schemas
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional, List
from dependencies import get_db
from domain import catalog
import json
import os

def persist_product_changes(product_data, action='update'):
    """
    Updates the products_seed.json file with the new product data.
    action: 'update' (create/update) or 'delete'
    """
    # Robust path resolution for Docker (/app/content) vs Local
    base_dir = os.path.dirname(os.path.dirname(__file__))
    json_path = os.path.join(base_dir, 'content', 'products_seed.json')
    
    try:
        if not os.path.exists(json_path):
             print(f"WARNING: Seed file not found at {json_path}. Skipping persistence.")
             return

        with open(json_path, 'r') as f:
            products = json.load(f)
        
        if action == 'delete':
            products = [p for p in products if p['id'] != product_data['id']]
        else:
            # Update or Append
            # Check if exists
            existing_index = next((index for (index, d) in enumerate(products) if d["id"] == product_data['id']), None)
            if existing_index is not None:
                products[existing_index] = product_data
            else:
                products.append(product_data)
        
        with open(json_path, 'w') as f:
            json.dump(products, f, indent=4)
            
    except Exception as e:
        # Catch-all to prevent 500 errors if file IO fails (e.g. permissions)
        print(f"CRITICAL ERROR: Failed to persist product changes to JSON: {e}")
        # explicit pass to prevent bubbling up
        pass


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
    new_product = await catalog.create_product_service(db, product.dict())
    
    # Persist to seed file
    # FIX: Use jsonable_encoder because new_product is a SQLAlchemy object, not Pydantic
    persist_product_changes(jsonable_encoder(new_product))
    
    return new_product

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
        
    # Persist to seed file
    # FIX: Use jsonable_encoder because updated_product is a SQLAlchemy object, not Pydantic
    persist_product_changes(jsonable_encoder(updated_product))
    
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

    # Persist deletion
    persist_product_changes({'id': product_id}, action='delete')
    
    return {"status": "success"}
