import importlib.util
import io
import os
import sys
import tempfile
import zipfile
from types import SimpleNamespace
from unittest.mock import AsyncMock, MagicMock, patch

import pytest

try:
    import dependencies
    from domain.catalog import validate_inventory_service
    from services import email as email_service
    from services.reporting_engine import ReportingEngine, _safe_md_text
except ImportError:
    from apps.api import dependencies
    from apps.api.domain.catalog import validate_inventory_service
    from apps.api.services import email as email_service
    from apps.api.services.reporting_engine import ReportingEngine, _safe_md_text


REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
CRM_BACKEND_DIR = os.path.join(REPO_ROOT, "ahac-crm", "backend")


def _load_crm_module(module_name: str, filename: str):
    path = os.path.join(CRM_BACKEND_DIR, filename)
    spec = importlib.util.spec_from_file_location(module_name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def test_is_explicit_test_submission_allows_real_customers_with_test_substrings():
    """Real customers writing 'hottest', 'quietest', 'test the outlet', or named 'Testerman' must reach CEO Brian."""
    with patch.object(email_service, "IS_STAGING", False):
        assert (
            email_service.is_explicit_test_submission(
                email="keanu.aloha@gmail.com",
                name="John Testerman",
                notes="My upstairs bedroom is the hottest room in Ewa Beach; looking for your quietest latest LG unit. Please test the outlet voltage.",
                order_id="ORD-98412",
                explicit_flag=False,
            )
            is False
        )
        assert (
            email_service.is_explicit_test_submission(
                email="malia@hawaii.rr.com",
                name="Malia Contest",
                notes="Fastest pickup in Waipahu for 12,000 BTU Dual Inverter",
                order_id="cs_live_a1B2c3D4",
                explicit_flag=False,
            )
            is False
        )


def test_is_explicit_test_submission_blocks_genuine_qa_and_staging_probes():
    """Explicit E2E markers, @example.com/@test.com domains, TEST-* order IDs, and DEV_TEST_EMAIL stay shielded."""
    with patch.object(email_service, "IS_STAGING", False):
        assert email_service.is_explicit_test_submission(email=email_service.DEV_TEST_EMAIL, name="Real Name") is True
        assert email_service.is_explicit_test_submission(email="buyer@example.com", name="Buyer") is True
        assert email_service.is_explicit_test_submission(email="test@yahoo.com", name="Buyer") is True
        assert email_service.is_explicit_test_submission(email="real@gmail.com", name="Test Lead") is True
        assert email_service.is_explicit_test_submission(email="real@gmail.com", name="E2E") is True
        assert (
            email_service.is_explicit_test_submission(
                email="real@gmail.com", name="Keanu", notes="[E2E-TEST] automated verification"
            )
            is True
        )
        assert (
            email_service.is_explicit_test_submission(
                email="real@gmail.com", name="Keanu", order_id="TEST-ORDER-001"
            )
            is True
        )
        assert email_service.is_explicit_test_submission(email="real@gmail.com", explicit_flag=True) is True


@pytest.mark.asyncio
async def test_validate_inventory_service_aggregates_duplicate_product_ids():
    """Duplicate product_id lines in a single payload cannot bypass available stock ceilings."""
    mock_product = SimpleNamespace(id=4, name="LG 12,000 BTU Dual Inverter", price=745.0, stock=4)
    scalar_result = MagicMock()
    scalar_result.scalar_one_or_none.return_value = mock_product
    db = AsyncMock()
    db.execute.return_value = scalar_result

    over_limit = await validate_inventory_service(
        db,
        [
            {"product_id": 4, "requested_quantity": 3},
            {"product_id": 4, "requested_quantity": 3},
        ],
    )
    assert over_limit["valid"] is False
    assert all(r["is_available"] is False for r in over_limit["results"])

    within_limit = await validate_inventory_service(
        db,
        [
            {"product_id": 4, "requested_quantity": 2},
            {"product_id": 4, "requested_quantity": 2},
        ],
    )
    assert within_limit["valid"] is True
    assert all(r["is_available"] is True for r in within_limit["results"])


def test_reporting_engine_zip_slip_rejection_and_markdown_sanitization():
    """ReportingEngine.extract_zip blocks '../' traversal and _safe_md_text neutralizes HTML/table injection."""
    with tempfile.TemporaryDirectory() as tmpdir:
        engine = ReportingEngine(analytics_base_dir=tmpdir)
        bad_zip = os.path.join(tmpdir, "malicious.zip")
        with zipfile.ZipFile(bad_zip, "w") as zf:
            zf.writestr("../escaped.csv", "Query,Clicks\nhack,1\n")

        extract_dir = os.path.join(tmpdir, "out")
        with pytest.raises(ValueError):
            engine.extract_zip(bad_zip, extract_dir)
        assert not os.path.exists(os.path.join(tmpdir, "escaped.csv"))

    escaped = _safe_md_text('<img src=x onerror=alert(1)> | `cmd`')
    assert "<img" not in escaped
    assert "|" not in escaped
    assert "`" not in escaped


def test_is_deployed_env_fails_closed_by_default(monkeypatch):
    """Unknown/unset ENVIRONMENT and DATABASE_URL must fail closed (True) so secrets are never auto-forged on a server."""
    monkeypatch.delenv("ENVIRONMENT", raising=False)
    monkeypatch.delenv("DATABASE_URL", raising=False)
    assert dependencies.is_deployed_env() is True

    monkeypatch.setenv("ENVIRONMENT", "production")
    assert dependencies.is_deployed_env() is True

    monkeypatch.setenv("ENVIRONMENT", "staging")
    assert dependencies.is_deployed_env() is True

    monkeypatch.setenv("ENVIRONMENT", "test")
    assert dependencies.is_deployed_env() is False

    monkeypatch.delenv("ENVIRONMENT", raising=False)
    monkeypatch.setenv("DATABASE_URL", "sqlite+aiosqlite:///:memory:")
    assert dependencies.is_deployed_env() is False


def test_crm_auth_domain_separation_and_csrf_binding(monkeypatch):
    """CRM session tokens require crm_v1: domain prefix, reject bare 'admin' strings, and bind CSRF via HMAC."""
    monkeypatch.setenv("CRM_JWT_SECRET", "unit-test-crm-jwt-secret-48-chars-minimum-value!!")
    monkeypatch.setenv("JWT_SECRET", "unit-test-legacy-fernet-seed-secret-value-123456")
    crm_auth = _load_crm_module("crm_auth_pass16", "auth.py")

    token = crm_auth.create_user_token({"id": "1", "email": "office@affordablehome-ac.com", "role": "client_owner"})
    claims = crm_auth.decode_signed_token(token)
    assert claims is not None
    assert claims["email"] == "office@affordablehome-ac.com"

    csrf = crm_auth.create_csrf_token(token)
    assert csrf != token
    assert crm_auth.verify_csrf_token(token, csrf) is True
    assert crm_auth.verify_csrf_token(token, "forged-csrf") is False

    # Forge a raw legacy non-prefixed "admin:<expiry>:<sig>" token and verify rejection
    import hashlib
    import hmac
    import time

    exp = int(time.time()) + 3600
    raw_payload = f"admin:{exp}"
    sig = hmac.new(crm_auth.SECRET_KEY.encode(), raw_payload.encode(), hashlib.sha256).hexdigest()
    assert crm_auth.decode_signed_token(f"{raw_payload}:{sig}") is None


def test_crm_pdf_generator_escapes_ampersands_and_xml_tags():
    """CRM invoice PDF generator must safely escape '&' and '<img ...>' in line items and customer fields."""
    pytest.importorskip("reportlab")
    crm_pdf = _load_crm_module("crm_pdf_pass16", "pdf_generator.py")
    pdf_bytes = crm_pdf.generate_invoice_receipt_pdf(
        invoice={
            "invoice_number": "INV-2026-1111",
            "status": "SENT",
            "total_amount": 495.00,
            "notes": 'Floor drop-cloth protection & <img src="http://169.254.169.254/latest/meta-data/"> check',
            "items": [
                {
                    "description": "Deep Window A/C Coil & Antimicrobial Pan Cleaning <script>alert(1)</script>",
                    "quantity": 1,
                    "unit_price": 495.00,
                }
            ],
        },
        customer={
            "name": "Keanu & Malia Testerman <b>VIP</b>",
            "email": "keanu@gmail.com",
            "phone": "(808) 488-1111",
            "address": "94-150 Leoleo St. #203 & Suite B, Waipahu, HI 96797",
        },
    )
    assert pdf_bytes.startswith(b"%PDF-")
    assert len(pdf_bytes) > 1000
