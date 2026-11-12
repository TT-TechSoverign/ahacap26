import re
from typing import Optional, Tuple, List, Dict, Any


def normalize_ga4_identifiers(
    ga_client_id: Optional[str], ga_session_id: Optional[str]
) -> Tuple[Optional[str], Optional[str]]:
    """
    Normalizes raw _ga / _ga_* cookie strings or pre-extracted IDs into GA4 MP format:
    - client_id: '<random>.<timestamp>' (strips 'GA1.1.' or 'GA1.2.')
    - session_id: numeric string '<sid>' (strips 'GS1.1.<sid>...' or 'GS2.1.s<sid>$...')
    """
    norm_cid = ga_client_id.strip() if ga_client_id else None
    if norm_cid and norm_cid.startswith("GA"):
        parts = norm_cid.split(".")
        if len(parts) >= 4:
            norm_cid = ".".join(parts[-2:])

    norm_sid = ga_session_id.strip() if ga_session_id else None
    if norm_sid:
        if norm_sid.startswith("GS2."):
            m = re.search(r"(?:^|\.)s(\d+)(?:\$|\.)", norm_sid)
            if m:
                norm_sid = m.group(1)
        elif norm_sid.startswith("GS1."):
            parts = norm_sid.split(".")
            if len(parts) >= 3:
                norm_sid = parts[2]
    return norm_cid, norm_sid


def compute_ga4_purchase_breakdown(
    items_data: List[Dict[str, Any]],
    amount_total: int,
    amount_tax: int = 0,
    amount_shipping: int = 0,
) -> Tuple[float, float, float, List[Dict[str, Any]]]:
    """
    Computes exact GA4 Measurement Protocol purchase revenue, tax, shipping, and items.
    Extracts custom Hawaii State Tax (4.712%) and Oahu Island-Wide Delivery ($50) line items
    when Stripe Checkout total_details reports 0.
    """
    inferred_tax = 0
    inferred_shipping = 0
    ga_items: List[Dict[str, Any]] = []

    for item in items_data or []:
        desc = item.get("description") or ""
        line_cents = int(item.get("amount_total") or 0)
        if "Tax" in desc:
            inferred_tax += line_cents
            continue
        if "Delivery" in desc:
            inferred_shipping += line_cents
            continue

        qty = int(item.get("quantity") or 1) or 1
        ga_items.append(
            {
                "item_id": str(item.get("product_id")) if item.get("product_id") else "UNKNOWN",
                "item_name": desc,
                "price": round((line_cents / 100.0) / qty, 2),
                "quantity": qty,
            }
        )

    effective_tax = amount_tax if amount_tax and amount_tax > 0 else inferred_tax
    effective_shipping = amount_shipping if amount_shipping and amount_shipping > 0 else inferred_shipping
    true_revenue = round(
        max(0, (amount_total or 0) - effective_tax - effective_shipping) / 100.0, 2
    )
    tax_dollars = round(effective_tax / 100.0, 2)
    shipping_dollars = round(effective_shipping / 100.0, 2)
    return true_revenue, tax_dollars, shipping_dollars, ga_items


def extract_stripe_customer_info(
    obj: Dict[str, Any],
    fallback_email: Optional[str] = None,
    fulfillment_mode: str = "pickup",
) -> Dict[str, Any]:
    """
    Extracts customer contact and fulfillment address from a Stripe Checkout Session dict.
    Prefers shipping_details.address (or collected_information.shipping_details.address)
    when fulfillment_mode == 'delivery' so Oahu delivery dispatch receives the street address
    rather than the card billing address.
    """
    cust = obj.get("customer_details") or {}
    shipping = (
        obj.get("shipping_details")
        or (obj.get("collected_information") or {}).get("shipping_details")
        or {}
    )
    shipping_addr = shipping.get("address") or {}
    billing_addr = cust.get("address") or {}
    has_shipping_street = bool(
        shipping_addr.get("line1")
        or shipping_addr.get("city")
        or shipping_addr.get("postal_code")
    )

    if (fulfillment_mode == "delivery" and has_shipping_street) or (
        not billing_addr and has_shipping_street
    ):
        chosen_addr = shipping_addr
    else:
        chosen_addr = billing_addr or shipping_addr

    chosen_name = (
        (shipping.get("name") if fulfillment_mode == "delivery" and shipping.get("name") else None)
        or cust.get("name")
        or shipping.get("name")
        or "Valued Customer"
    )
    return {
        "name": chosen_name,
        "email": cust.get("email") or fallback_email,
        "phone": cust.get("phone") or "",
        "address": chosen_addr or {},
    }
