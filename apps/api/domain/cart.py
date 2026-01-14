from fastapi import HTTPException

def validate_cart_service(cart_data):
    """
    Domain logic for validating a cart.
    - Enforces "Local Pickup Only" rule for Window ACs.
    """
    for item in cart_data.items:
        if item.category == "WINDOW_AC" and cart_data.shipping_method != "PICKUP_AIEA":
            raise HTTPException(
                status_code=400,
                detail=f"Logistics Violation: {item.name} is 'Local Pickup Only' (Aiea, HI)."
            )
    return {"status": "valid", "message": "Cart adheres to logistics rules."}

async def calculate_cart_total(items: list, db) -> int:
    """
    Calculates total price (in cents) by verifying against DB.
    Returns: total_cents
    """
    from sqlalchemy.future import select
    import models

    total_cents = 0

    # Extract IDs
    product_ids = [item.product_id for item in items]

    # Batch Query
    query = select(models.Product).where(models.Product.id.in_(product_ids))
    result = await db.execute(query)
    products = result.scalars().all()
    product_map = {p.id: p for p in products}

    for item in items:
        product = product_map.get(item.product_id)
        if not product:
            raise HTTPException(status_code=400, detail=f"Product ID {item.product_id} not found.")

        # Validation: Ensure item price hasn't drifted (optional, but good for audits)
        # Here we just blindly trust the DB as the source of truth

        # Calculate: Price * Qty. Assuming product.price is in WHOLE DOLLARS based on earlier views?
        # Let's double check models.py.
        # "price = Column(Integer)" - usually implies cents or dollars.
        # In inventory.csv (implied from main.py seed logic), let's assume it's dollars for now based on standard simple int cols,
        # OR cents.
        # Wait, the frontend `totalAmount` was `Math.round(totalAmount * 100)`.
        # In `CartDrawer`, `{item.price.toLocaleString()}` suggests dollars.
        # So DB stores Dollars.

        db_price_cents = product.price * 100
        total_cents += db_price_cents * item.quantity

    return total_cents
