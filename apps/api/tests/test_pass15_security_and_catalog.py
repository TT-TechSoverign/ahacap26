import os
import pytest
from types import SimpleNamespace
from unittest.mock import AsyncMock, MagicMock, patch
from fastapi import HTTPException
from starlette.requests import Request

try:
    import models
    import dependencies
    from routers.catalog import serialize_product_seed_dict
    from services import reconciliation
except ImportError:
    from apps.api import models
    from apps.api import dependencies
    from apps.api.routers.catalog import serialize_product_seed_dict
    from apps.api.services import reconciliation


def _make_dummy_product(**overrides):
    defaults = {
        "id": 4,
        "name": "LG 12,000 BTU Dual Inverter Smart Wi-Fi Window Air Conditioner",
        "price": 745.0,
        "category": "window",
        "subcategory": "dual_inverter",
        "stock": 14,
        "image_url": "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "btu": 12000,
        "voltage": "115V / 15A",
        "coverage": "Up to 550 sq. ft.",
        "performance_specs": "CEER 14.7 | R-32 Dual Inverter",
        "key_spec": "LW1222IVSM",
        "noise_level": "44 dBA (Sleep Mode)",
        "dehumidification": "3.8 pts/hr",
        "dimensions": '23.62" W x 15.00" H x 22.20" D',
        "weight": "86 lbs",
        "shipping_weight": "96 lbs",
        "min_window_width": '27"',
        "max_window_width": '39"',
        "min_window_height": '16"',
        "chassis_type": "Slide-Out Chassis",
        "ceer_rating": "14.7 CEER",
        "dry_air_flow_cfm": "282 CFM",
        "coverage_aham": "Up to 550 sq. ft.",
        "coverage_oahu": "250–380 sq. ft.",
        "sizing_notes": "Calibrated for Oahu single-wall redwood & jalousie airflow.",
        "warranty": "1-Year Parts & Labor Manufacturer Warranty",
        "promo_price": 699.0,
        "discount_percent": 6,
    }
    defaults.update(overrides)
    return SimpleNamespace(**defaults)


def test_serialize_product_seed_dict_preserves_all_28_columns():
    """Stock deductions and catalog updates must preserve all 28 ORM columns (including Dual-Sizing & Caliper specs)."""
    expected_columns = {c.name for c in models.Product.__table__.columns}
    prod = _make_dummy_product(stock=13)
    serialized = serialize_product_seed_dict(prod)

    assert set(serialized.keys()) == expected_columns
    assert serialized["stock"] == 13
    assert serialized["coverage_aham"] == "Up to 550 sq. ft."
    assert serialized["coverage_oahu"] == "250–380 sq. ft."
    assert serialized["min_window_width"] == '27"'
    assert serialized["ceer_rating"] == "14.7 CEER"
    assert serialized["promo_price"] == 699.0
    assert serialized["discount_percent"] == 6


@pytest.mark.asyncio
async def test_verify_dev_os_session_rejects_admin_pin_and_storefront_admin_token():
    """4-digit storefront ADMIN_PIN and storefront 'admin' tokens must never escalate into Dev OS root."""
    master_secret = "M" * 48
    storefront_pin = "1234"
    storefront_token = dependencies.create_signed_token("admin")
    master_token = dependencies.create_signed_token(f"dev_os_master:{dependencies.MASTER_EMAIL_DEFAULT}")

    with patch.dict(os.environ, {"DEV_OS_MASTER_PASSWORD": master_secret, "ADMIN_PIN": storefront_pin}), \
         patch.object(dependencies, "check_rate_limit", AsyncMock(return_value=True)):
        # 1. 4-digit ADMIN_PIN on X-Dev-OS-Key MUST fail with 401
        pin_req = Request({
            "type": "http",
            "method": "GET",
            "path": "/api/v1/dev-os/orders",
            "headers": [(b"x-dev-os-key", storefront_pin.encode())],
        })
        with pytest.raises(HTTPException) as exc_pin:
            await dependencies.verify_dev_os_session(pin_req)
        assert exc_pin.value.status_code == 401

        # 2. Storefront 'admin' Bearer token MUST fail with 401 on Dev OS endpoints
        admin_tok_req = Request({
            "type": "http",
            "method": "GET",
            "path": "/api/v1/dev-os/orders",
            "headers": [(b"authorization", f"Bearer {storefront_token}".encode())],
        })
        with pytest.raises(HTTPException) as exc_tok:
            await dependencies.verify_dev_os_session(admin_tok_req)
        assert exc_tok.value.status_code == 401

        # 3. 48-char DEV_OS_MASTER_PASSWORD on X-Dev-OS-Key MUST succeed
        valid_key_req = Request({
            "type": "http",
            "method": "GET",
            "path": "/api/v1/dev-os/orders",
            "headers": [(b"x-dev-os-key", master_secret.encode())],
        })
        assert await dependencies.verify_dev_os_session(valid_key_req) == f"dev_os_master:{dependencies.MASTER_EMAIL_DEFAULT}"

        # 4. Signed dev_os_master Bearer token MUST succeed
        valid_tok_req = Request({
            "type": "http",
            "method": "GET",
            "path": "/api/v1/dev-os/orders",
            "headers": [(b"authorization", f"Bearer {master_token}".encode())],
        })
        assert await dependencies.verify_dev_os_session(valid_tok_req) == f"dev_os_master:{dependencies.MASTER_EMAIL_DEFAULT}"


@pytest.mark.asyncio
async def test_verify_dev_os_session_rate_limits_repeated_bad_keys():
    """Repeated invalid X-Dev-OS-Key attempts must return HTTP 429 once Redis rate limit triggers."""
    with patch.dict(os.environ, {"DEV_OS_MASTER_PASSWORD": "S" * 48}), \
         patch.object(dependencies, "check_rate_limit", AsyncMock(return_value=False)):
        bad_req = Request({
            "type": "http",
            "method": "GET",
            "path": "/api/v1/dev-os/orders",
            "headers": [(b"x-dev-os-key", b"wrong-key"), (b"x-real-ip", b"203.0.113.42")],
        })
        with pytest.raises(HTTPException) as exc_rl:
            await dependencies.verify_dev_os_session(bad_req)
        assert exc_rl.value.status_code == 429


@pytest.mark.asyncio
async def test_reconcile_unrecorded_orders_passes_extracted_info_and_preserves_28_fields():
    """Ensure reconciliation emails customer_info=extracted_info (no NameError on 'cust') and persists all 28 product fields."""
    fake_session_dict = {
        "id": "cs_live_test_reconcile_99",
        "payment_status": "paid",
        "payment_intent": "pi_test_reconcile_99",
        "amount_total": 78010,
        "metadata": {
            "source": "web_checkout_v2",
            "fulfillment_mode": "delivery",
            "customer_phone": "(808) 555-0177",
        },
        "customer_details": {
            "name": "Kaimana P.",
            "email": "kaimana@example.com",
            "phone": "(808) 555-0177",
            "address": {"line1": "456 Kamehameha Hwy", "city": "Pearl City", "state": "HI", "postal_code": "96782"},
        },
        "shipping_details": {
            "name": "Kaimana P.",
            "address": {"line1": "789 Farrington Hwy", "city": "Waipahu", "state": "HI", "postal_code": "96797"},
        },
    }

    class FakeStripeSession:
        id = fake_session_dict["id"]
        payment_status = fake_session_dict["payment_status"]
        payment_intent = fake_session_dict["payment_intent"]
        amount_total = fake_session_dict["amount_total"]
        metadata = fake_session_dict["metadata"]
        customer_details = fake_session_dict["customer_details"]
        shipping_details = fake_session_dict["shipping_details"]

        def to_dict(self):
            return fake_session_dict

    dummy_prod = _make_dummy_product(id=4, stock=10)

    mock_db = AsyncMock()
    mock_db.add = MagicMock()
    first_exec = MagicMock()
    first_scalars = MagicMock()
    first_scalars.first.return_value = None
    first_exec.scalars.return_value = first_scalars

    second_exec = MagicMock()
    second_exec.scalar_one_or_none.return_value = dummy_prod
    mock_db.execute = AsyncMock(side_effect=[first_exec, second_exec])

    mock_ctx = AsyncMock()
    mock_ctx.__aenter__.return_value = mock_db
    mock_ctx.__aexit__.return_value = False

    persisted_payloads = []
    sent_confirmations = []

    async def fake_send_order_confirmation(to_email, order_id, total_cents, fulfillment_mode="pickup", items=None, customer_info=None, payment_info=None):
        sent_confirmations.append({
            "to_email": to_email,
            "order_id": order_id,
            "fulfillment_mode": fulfillment_mode,
            "customer_info": customer_info,
        })

    fake_line_item = {
        "description": "LG Dual Inverter 12,000 BTU (LW1222IVSM)",
        "quantity": 1,
        "amount_total": 74500,
        "price": {"unit_amount": 74500, "product_data": {"metadata": {"product_id": "4"}}},
    }

    with patch.dict(os.environ, {"STRIPE_SECRET_KEY": "sk_test_dummy"}), \
         patch.object(reconciliation, "AsyncSessionLocal", return_value=mock_ctx), \
         patch("stripe.checkout.Session.list", return_value=SimpleNamespace(data=[FakeStripeSession()])), \
         patch("stripe.checkout.Session.list_line_items", return_value=SimpleNamespace(data=[fake_line_item])), \
         patch("stripe.PaymentIntent.retrieve", side_effect=Exception("offline mock")), \
         patch.object(reconciliation, "persist_product_changes", side_effect=lambda d: persisted_payloads.append(d)), \
         patch.object(reconciliation.email_service, "send_order_confirmation", side_effect=fake_send_order_confirmation):
        res = await reconciliation.reconcile_unrecorded_stripe_orders(limit=5)

    assert res["status"] == "success"
    assert res["recovered_count"] == 1
    assert dummy_prod.stock == 9
    assert len(persisted_payloads) == 1
    assert persisted_payloads[0]["coverage_oahu"] == "250–380 sq. ft."
    assert persisted_payloads[0]["min_window_width"] == '27"'
    assert len(sent_confirmations) == 1
    assert sent_confirmations[0]["customer_info"]["address"]["city"] == "Waipahu"


def test_fix_db_schema_covers_all_28_product_columns():
    """fix_db_schema.py must maintain 100% parity with models.Product so staging/restored DBs never miss Dual-Sizing columns."""
    fix_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "fix_db_schema.py")
    with open(fix_path, "r", encoding="utf-8") as f:
        src = f.read()

    base_create_cols = {"id", "name", "price", "category", "stock"}
    orm_cols = {c.name for c in models.Product.__table__.columns}
    for col in orm_cols - base_create_cols:
        assert f'("{col}"' in src, f"Column '{col}' missing from fix_db_schema.py!"

