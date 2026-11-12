try:
    from services.stripe_telemetry import (
        normalize_ga4_identifiers,
        compute_ga4_purchase_breakdown,
        extract_stripe_customer_info,
    )
except ImportError:
    from apps.api.services.stripe_telemetry import (
        normalize_ga4_identifiers,
        compute_ga4_purchase_breakdown,
        extract_stripe_customer_info,
    )


def test_normalize_ga4_identifiers_strips_cookie_prefixes():
    cid, sid = normalize_ga4_identifiers(
        "GA1.1.123456789.1700000000", "GS1.1.1700000555.2.1.1700000999.0.0.0"
    )
    assert cid == "123456789.1700000000"
    assert sid == "1700000555"


def test_normalize_ga4_identifiers_supports_gs2_format_and_clean_ids():
    cid, sid = normalize_ga4_identifiers(
        "987654321.1760000000", "GS2.1.s1760000888$o3$g1$t1760000999$j60$l0$h0"
    )
    assert cid == "987654321.1760000000"
    assert sid == "1760000888"


def test_compute_ga4_purchase_breakdown_extracts_custom_tax_and_delivery():
    # $745 LW1222IVSM + $50 Oahu Delivery + 4.712% HI GET ($37.46) = $832.46 (83246 cents)
    items_data = [
        {
            "product_id": 4,
            "description": "LG 12,000 BTU DUAL Inverter Smart Window AC (LW1222IVSM)",
            "quantity": 1,
            "amount_total": 74500,
        },
        {
            "product_id": None,
            "description": "Oahu Island-Wide Delivery",
            "quantity": 1,
            "amount_total": 5000,
        },
        {
            "product_id": None,
            "description": "Hawaii State Tax (4.712%)",
            "quantity": 1,
            "amount_total": 3746,
        },
    ]
    revenue, tax, shipping, ga_items = compute_ga4_purchase_breakdown(
        items_data, amount_total=83246, amount_tax=0, amount_shipping=0
    )
    assert revenue == 745.00
    assert tax == 37.46
    assert shipping == 50.00
    assert len(ga_items) == 1
    assert ga_items[0]["item_id"] == "4"
    assert ga_items[0]["price"] == 745.00
    assert ga_items[0]["quantity"] == 1


def test_extract_stripe_customer_info_prefers_shipping_for_delivery():
    session_obj = {
        "customer_details": {
            "name": "Keanu Billing",
            "email": "keanu@example.com",
            "phone": "+18085551234",
            "address": {
                "line1": "PO Box 999",
                "city": "Honolulu",
                "state": "HI",
                "postal_code": "96801",
                "country": "US",
            },
        },
        "shipping_details": {
            "name": "Keanu Delivery",
            "address": {
                "line1": "94-200 Farrington Hwy",
                "city": "Waipahu",
                "state": "HI",
                "postal_code": "96797",
                "country": "US",
            },
        },
    }

    delivery_info = extract_stripe_customer_info(session_obj, fulfillment_mode="delivery")
    assert delivery_info["name"] == "Keanu Delivery"
    assert delivery_info["address"]["line1"] == "94-200 Farrington Hwy"
    assert delivery_info["address"]["city"] == "Waipahu"

    pickup_info = extract_stripe_customer_info(session_obj, fulfillment_mode="pickup")
    assert pickup_info["name"] == "Keanu Billing"
    assert pickup_info["address"]["line1"] == "PO Box 999"
