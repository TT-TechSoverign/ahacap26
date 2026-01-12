def apply_discount(total: int, code: str = None) -> int:
    """
    Apply discount based on code.
    - CALOHA: 10% off
    """
    if code == "CALOHA":
        return int(total * 0.90)
    return total
