from fastapi import APIRouter, Depends, Query
from fastapi.encoders import jsonable_encoder
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

    try:
        import urllib.request
        import urllib.parse
        
        # Determine internal host. Standard Docker network is 'http://web:3000'
        # Fallback to localhost if running outside Docker
        frontend_url = os.environ.get("FRONTEND_INTERNAL_URL", "http://web:3000")
        hook_url = f"{frontend_url}/api/revalidate"
        
        req = urllib.request.Request(
            hook_url, 
            data=json.dumps({"secret": "internal_ahac_revalidate_777", "path": "/shop"}).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        with urllib.request.urlopen(req, timeout=3) as response:
             print(f"DEBUG: Next.js Shop Revalidation Triggered: {response.getcode()}")
    except Exception as e:
        print(f"WARNING: Failed to trigger Next.js cache revalidation: {e}")


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

@router.post("/validate", response_model=schemas.InventoryValidationResponse)
async def validate_inventory(
    validation_request: schemas.InventoryValidationRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Validates multiple products' inventory and returns canonical pricing.
    Bypasses caching to ensure real-time accuracy.
    """
    items_data = [item.dict() for item in validation_request.items]
    return await catalog.validate_inventory_service(db, items_data)

@router.post("", response_model=schemas.Product)
async def create_product(
    product: schemas.ProductCreate,
    db: AsyncSession = Depends(get_db)
):
    new_product = await catalog.create_product_service(db, product.dict())
    
    # Persist to seed file
    # FIX: Explicitly convert ORM -> Pydantic -> Dict to guarantee JSON serializability
    product_pydantic = schemas.Product.from_orm(new_product)
    persist_product_changes(product_pydantic.dict())
    
    return new_product

@router.put("/{product_id}", response_model=schemas.Product)
async def update_product(
    product_id: int,
    product_update: schemas.ProductUpdate,
    db: AsyncSession = Depends(get_db)
):
    try:
        print(f"DEBUG: Receiving Update for {product_id}: {product_update.dict()}")
        
        # Filter out None values to allow partial updates
        update_data = {k: v for k, v in product_update.dict().items() if v is not None}
        
        updated_product = await catalog.update_product_service(db, product_id, update_data)
        if not updated_product:
            from fastapi import HTTPException
            raise HTTPException(status_code=404, detail="Product not found")
            
        print(f"DEBUG: DB Update Success. Persisting to JSON...")
        
        # Persist to seed file
        # FIX: Explicitly convert ORM -> Pydantic -> Dict to guarantee JSON serializability
        # This prevents any recursive loop or relationship loading issues with jsonable_encoder
        product_pydantic = schemas.Product.from_orm(updated_product)
        persist_product_changes(product_pydantic.dict())
        
        return updated_product
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"CRITICAL API FAILURE IN UPDATE_PRODUCT: {e}")
        from fastapi import HTTPException
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

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
