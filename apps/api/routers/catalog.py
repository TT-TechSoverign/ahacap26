from fastapi import APIRouter, Depends, Query, Request
from fastapi.encoders import jsonable_encoder
import schemas
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional, List
from dependencies import get_db, verify_admin_token, get_client_ip
from domain import catalog
from cache import check_rate_limit
import json
import os
import tempfile
import threading

_SEED_WRITE_LOCK = threading.Lock()
NON_NULLABLE_PRODUCT_FIELDS = {"name", "price", "category", "stock"}


def _trigger_frontend_revalidation_async():
    def _run():
        try:
            import urllib.request
            frontend_url = os.environ.get("FRONTEND_INTERNAL_URL", "http://prod-web:3000").rstrip("/")
            hook_url = f"{frontend_url}/api/revalidate"
            revalidate_secret = os.environ.get("REVALIDATE_SECRET", "").strip()
            if not revalidate_secret:
                return
            for route_path in ("/shop", "/", "/sitemap"):
                req = urllib.request.Request(
                    hook_url,
                    data=json.dumps({"secret": revalidate_secret, "path": route_path}).encode("utf-8"),
                    headers={"Content-Type": "application/json"},
                )
                with urllib.request.urlopen(req, timeout=3) as response:
                    response.read()
        except Exception as e:
            print(f"WARNING: Failed to trigger Next.js cache revalidation: {type(e).__name__}")

    threading.Thread(target=_run, daemon=True).start()


def serialize_product_seed_dict(p_obj) -> dict:
    """
    Canonical 28-field serializer for Product ORM objects to products_seed.json.
    Preserves Dual-Sizing (AHAM + Oahu), Spatial Caliper dimensions, and promo pricing
    during both admin edits and Stripe stock deductions while avoiding Pydantic/Alpine panics.
    """
    return {
        "id": p_obj.id,
        "name": p_obj.name,
        "price": p_obj.price,
        "category": p_obj.category,
        "subcategory": p_obj.subcategory,
        "stock": p_obj.stock,
        "image_url": p_obj.image_url,
        "btu": p_obj.btu,
        "voltage": p_obj.voltage,
        "coverage": p_obj.coverage,
        "performance_specs": p_obj.performance_specs,
        "key_spec": p_obj.key_spec,
        "noise_level": p_obj.noise_level,
        "dehumidification": p_obj.dehumidification,
        "dimensions": p_obj.dimensions,
        "weight": p_obj.weight,
        "shipping_weight": p_obj.shipping_weight,
        "min_window_width": p_obj.min_window_width,
        "max_window_width": p_obj.max_window_width,
        "min_window_height": p_obj.min_window_height,
        "chassis_type": p_obj.chassis_type,
        "ceer_rating": p_obj.ceer_rating,
        "dry_air_flow_cfm": p_obj.dry_air_flow_cfm,
        "coverage_aham": p_obj.coverage_aham,
        "coverage_oahu": p_obj.coverage_oahu,
        "sizing_notes": p_obj.sizing_notes,
        "warranty": p_obj.warranty,
        "promo_price": p_obj.promo_price,
        "discount_percent": p_obj.discount_percent,
    }

def persist_product_changes(product_data, action='update'):
    """
    Atomically updates the products_seed.json file with the new product data.
    action: 'update' (create/update) or 'delete'
    """
    base_dir = os.path.dirname(os.path.dirname(__file__))
    json_path = os.path.join(base_dir, 'content', 'products_seed.json')
    
    try:
        with _SEED_WRITE_LOCK:
            if not os.path.exists(json_path):
                print(f"WARNING: Seed file not found at {json_path}. Skipping persistence.")
                return

            with open(json_path, 'r', encoding='utf-8') as f:
                products = json.load(f)
            
            if action == 'delete':
                products = [p for p in products if p['id'] != product_data['id']]
            else:
                existing_index = next((index for (index, d) in enumerate(products) if d["id"] == product_data['id']), None)
                if existing_index is not None:
                    products[existing_index] = product_data
                else:
                    products.append(product_data)
            
            seed_dir = os.path.dirname(json_path)
            tmp_path = None
            try:
                with tempfile.NamedTemporaryFile('w', dir=seed_dir, delete=False, encoding='utf-8', suffix='.tmp') as tf:
                    json.dump(products, tf, indent=4)
                    tf.flush()
                    os.fsync(tf.fileno())
                    tmp_path = tf.name
                os.replace(tmp_path, json_path)
            finally:
                if tmp_path and os.path.exists(tmp_path):
                    try:
                        os.remove(tmp_path)
                    except OSError:
                        pass
            
    except Exception as e:
        print(f"CRITICAL ERROR: Failed to persist product changes to JSON: {e}")

    _trigger_frontend_revalidation_async()


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
    request: Request,
    validation_request: schemas.InventoryValidationRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Validates multiple products' inventory and returns canonical pricing.
    Bypasses caching to ensure real-time accuracy.
    """
    ip = get_client_ip(request)
    if not await check_rate_limit(ip, "inventory_validate", limit=60, period=60):
        from fastapi import HTTPException
        raise HTTPException(status_code=429, detail="Too many validation requests. Please try again later.")

    items_data = [item.model_dump() for item in validation_request.items]
    return await catalog.validate_inventory_service(db, items_data)

@router.post("", dependencies=[Depends(verify_admin_token)])
async def create_product(
    request: Request,
    product: schemas.ProductCreate,
    db: AsyncSession = Depends(get_db)
):
    raw_data = product.model_dump()
    new_product = await catalog.create_product_service(db, raw_data)
    product_dict = serialize_product_seed_dict(new_product)
    persist_product_changes(product_dict)
    
    try:
        from routers.dev_os import log_dev_os_audit
        await log_dev_os_audit(db, action="CATALOG_PRODUCT_CREATE", details={"product_id": new_product.id, "name": new_product.name}, ip=get_client_ip(request))
    except Exception:
        pass

    return product_dict

@router.put("/{product_id}", dependencies=[Depends(verify_admin_token)])
async def update_product(
    product_id: int,
    product_update: schemas.ProductUpdate,
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    from fastapi import HTTPException
    try:
        raw_updates = product_update.model_dump(exclude_unset=True)
        update_data = {
            k: v for k, v in raw_updates.items()
            if not (k in NON_NULLABLE_PRODUCT_FIELDS and v is None)
        }
        
        updated_product = await catalog.update_product_service(db, product_id, update_data)
        if not updated_product:
            raise HTTPException(status_code=404, detail="Product not found")
            
        product_dict = serialize_product_seed_dict(updated_product)
        persist_product_changes(product_dict)
        
        try:
            from routers.dev_os import log_dev_os_audit
            await log_dev_os_audit(db, action="CATALOG_PRODUCT_UPDATE", details={"product_id": updated_product.id, "name": updated_product.name}, ip=get_client_ip(request))
        except Exception:
            pass

        return product_dict
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"CRITICAL API FAILURE IN UPDATE_PRODUCT: {e}")
        raise HTTPException(status_code=500, detail="Internal server error updating product")

@router.delete("/{product_id}", dependencies=[Depends(verify_admin_token)])
async def delete_product(
    product_id: int,
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    success = await catalog.delete_product_service(db, product_id)
    if not success:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Product not found")

    # Persist deletion
    persist_product_changes({'id': product_id}, action='delete')
    
    try:
        from routers.dev_os import log_dev_os_audit
        await log_dev_os_audit(db, action="CATALOG_PRODUCT_DELETE", details={"product_id": product_id}, ip=get_client_ip(request))
    except Exception:
        pass

    return {"status": "success"}
