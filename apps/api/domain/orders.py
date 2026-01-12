from fastapi import HTTPException
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
import os

# Assuming models is in the parent directory (apps/api)
# When run from main.py, sys.path includes apps/api, so 'models' is top-level.
# But for relative imports within package structure:
import models
from .discounts import apply_discount

async def create_order_service(order_data, db: AsyncSession):
    """
    Domain logic for creating an order.
    - Validates logistics.
    - Checks stock.
    - Calculates total with optional discount.
    """
    # 1. Validate "Local Pickup Only"
    for item in order_data.items:
        if item.category == "WINDOW_AC" and order_data.shipping_method != "PICKUP_AIEA":
             raise HTTPException(status_code=400, detail=f"Logistics Error: {item.name} is Pickup Only.")

    # 2. Check Stock & Calculate Total
    total_amount = 0
    for item in order_data.items:
        result = await db.execute(select(models.Product).where(models.Product.id == item.product_id))
        product = result.scalar_one_or_none()

        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.name} not found.")

        if product.stock < item.quantity:
             raise HTTPException(status_code=400, detail=f"Insufficient stock for {item.name}. Only {product.stock} left.")

        total_amount += product.price * item.quantity

    # 3. Apply Discount
    final_total = apply_discount(total_amount, order_data.discount_code)

    # 4. Simulate success
    return {
        "order_id": f"ORD-{os.urandom(4).hex()}",
        "status": "confirmed",
        "total": final_total,
        "original_total": total_amount,
        "discount_applied": final_total < total_amount,
        "message": "Order placed successfully. Please proceed to warehouse for pickup."
    }
