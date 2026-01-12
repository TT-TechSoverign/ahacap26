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
