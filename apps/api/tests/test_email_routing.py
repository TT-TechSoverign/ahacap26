import pytest
from unittest.mock import patch, AsyncMock
try:
    from services import email as email_module
except ImportError:
    from apps.api.services import email as email_module

DEV_TEST_EMAIL = email_module.DEV_TEST_EMAIL
get_admin_notification_recipients = email_module.get_admin_notification_recipients

def test_ceo_shield_when_test_flag_is_true():
    """Ensure CEO is 100% excluded when is_test is True."""
    recipients, bcc, is_shielded = get_admin_notification_recipients(is_test=True)
    assert is_shielded is True
    assert recipients == [DEV_TEST_EMAIL]
    assert bcc == []
    assert "brian@affordablehome-ac.com" not in recipients

def test_ceo_shield_when_staging_environment():
    """Ensure CEO is 100% excluded when IS_STAGING is True."""
    with patch.object(email_module, "IS_STAGING", True):
        recipients, bcc, is_shielded = get_admin_notification_recipients(is_test=False)
        assert is_shielded is True
        assert recipients == [DEV_TEST_EMAIL]
        assert bcc == []
        assert "brian@affordablehome-ac.com" not in recipients

def test_production_routing_includes_admins():
    """Ensure production real orders route to Brian as primary and DEV_TEST_EMAIL on BCC."""
    with patch.object(email_module, "IS_STAGING", False):
        recipients, bcc, is_shielded = get_admin_notification_recipients(is_test=False)
        assert is_shielded is False
        assert recipients == ["brian@affordablehome-ac.com"]
        assert DEV_TEST_EMAIL in bcc

@pytest.mark.asyncio
async def test_inquiry_idempotency():
    """Ensure lead inquiries are marked sent and duplicate checks return True."""
    test_id = "test-lead-uuid-9999"
    assert await email_module.has_inquiry_been_sent(test_id) is False
    await email_module.mark_inquiry_as_sent(test_id)
    assert await email_module.has_inquiry_been_sent(test_id) is True

@pytest.mark.asyncio
async def test_customer_confirmation_routes_to_dev():
    """Ensure customer confirmation strictly routes to DEV_TEST_EMAIL until finalized."""
    class DummyLead:
        id = "dummy-ref-123"
        first_name = "Keanu"
        last_name = "Reeves"
        email = "customer.real@gmail.com"
        phone = "(808) 555-0199"
        service_type = "Window AC Deep Cleaning"
        address = "123 Ala Moana Blvd"
        city = "Honolulu"
        zip = "96815"

    dummy = DummyLead()

    with patch.object(email_module, "HAS_SMTP", True), \
         patch("aiosmtplib.SMTP") as mock_smtp_cls:
        mock_smtp = AsyncMock()
        mock_smtp_cls.return_value.__aenter__.return_value = mock_smtp

        await email_module.send_customer_appointment_confirmation(dummy)

        # Verify send_message was called
        assert mock_smtp.send_message.called
        call_args = mock_smtp.send_message.call_args
        recipients = call_args[1].get("recipients")

        # Crucial: Must be routed strictly to DEV_TEST_EMAIL, NOT the real customer email
        assert recipients == [DEV_TEST_EMAIL]
        assert "customer.real@gmail.com" not in recipients
        assert dummy.email not in recipients


def test_order_qualifies_for_rebate_detection():
    """Qualifying LG Dual Inverters and GE AJCQ12AXXWA trigger $45 rebate CTA; base/sleeve SKUs do not."""
    assert email_module.order_qualifies_for_rebate([
        {"description": "LG Dual Inverter 12,000 BTU (LW1222IVSM)", "quantity": 1, "amount_total": 74500}
    ]) is True
    assert email_module.order_qualifies_for_rebate([
        {"description": "GE 12,000 BTU Built-In R-32 Inverter (AJCQ12AXXWA)", "quantity": 1, "amount_total": 120000}
    ]) is True
    assert email_module.order_qualifies_for_rebate([
        {"description": "LG 8,000 BTU Standard (LW8024RD)", "quantity": 1, "amount_total": 39500},
        {"description": "GE RAB26A Wall Casement", "quantity": 1, "amount_total": 27500},
    ]) is False
    assert email_module.order_qualifies_for_rebate([]) is False


@pytest.mark.asyncio
async def test_order_confirmation_delivery_vs_pickup_html():
    """Delivery orders label 'Deliver To (Oahu)', omit warehouse map CID, and keep Admin copy 1-page clean."""
    captured_calls = []

    def fake_send(to_email, subject, html_body, bcc_email=None, inline_images=None, calendar_invite=None, server=None):
        captured_calls.append({
            "to": to_email,
            "subject": subject,
            "html": html_body,
            "images": inline_images or [],
        })

    with patch.object(email_module, "SMTP_PORT", 587), \
         patch("smtplib.SMTP"), \
         patch.object(email_module, "send_email_with_attachments", side_effect=fake_send):
        await email_module.send_order_confirmation(
            to_email=DEV_TEST_EMAIL,
            order_id="TEST-DELIV-13",
            total_cents=83011,
            fulfillment_mode="delivery",
            items=[{"description": "LG Dual Inverter 12,000 BTU (LW1222IVSM)", "quantity": 1, "amount_total": 74500}],
            customer_info={
                "name": "Leilani K.",
                "email": DEV_TEST_EMAIL,
                "phone": "(808) 555-0144",
                "address": {"line1": "98-1005 Moanalua Rd", "city": "Aiea", "state": "HI", "postal_code": "96701"},
            },
            payment_info={"brand": "Visa", "last4": "4242"},
        )

    assert len(captured_calls) == 2
    client_mail, admin_mail = captured_calls[0], captured_calls[1]

    # Client delivery email checks
    assert "Deliver To (Oahu)" in client_mail["html"]
    assert "Directions to Warehouse" not in client_mail["html"]
    assert "cid:map_img" not in client_mail["html"]
    assert all(img.get("content_id") != "map_img" for img in client_mail["images"])
    assert email_module.REBATE_PDF_URL in client_mail["html"]
    assert email_module.INSTALL_ESTIMATE_URL in client_mail["html"]

    # Admin 1-page print copy checks (no consumer CTA bloat, clear Deliver To label)
    assert "Deliver To (Oahu)" in admin_mail["html"]
    assert email_module.REBATE_PDF_URL not in admin_mail["html"]
    assert email_module.INSTALL_ESTIMATE_URL not in admin_mail["html"]


@pytest.mark.asyncio
async def test_order_confirmation_pickup_non_rebate_html():
    """Pickup orders for non-rebate SKUs show 'Billed To', include warehouse directions, and omit $45 rebate CTA."""
    captured_calls = []

    def fake_send(to_email, subject, html_body, bcc_email=None, inline_images=None, calendar_invite=None, server=None):
        captured_calls.append({"html": html_body, "images": inline_images or []})

    with patch.object(email_module, "SMTP_PORT", 587), \
         patch("smtplib.SMTP"), \
         patch.object(email_module, "send_email_with_attachments", side_effect=fake_send):
        await email_module.send_order_confirmation(
            to_email=DEV_TEST_EMAIL,
            order_id="TEST-PICKUP-13",
            total_cents=41361,
            fulfillment_mode="pickup",
            items=[{"description": "LG 8,000 BTU Standard (LW8024RD)", "quantity": 1, "amount_total": 39500}],
            customer_info={"name": "Makoa T.", "email": DEV_TEST_EMAIL, "phone": "(808) 555-0188"},
            payment_info={"brand": "Mastercard", "last4": "8888"},
        )

    assert len(captured_calls) == 2
    client_mail, admin_mail = captured_calls[0], captured_calls[1]

    assert "Billed To" in client_mail["html"]
    assert "Billed To" in admin_mail["html"]
    assert "Directions to Warehouse" in client_mail["html"]
    assert email_module.REBATE_PDF_URL not in client_mail["html"]
    assert email_module.INSTALL_ESTIMATE_URL in client_mail["html"]


def test_safe_html_escapes_xss_phishing_and_tracking_pixels():
    """Ensure safe_html neutralizes <script>, <img onerror=...>, and phishing <a href=...> tags."""
    payload = '<script>alert(1)</script><img src="x" onerror="fetch(1)"><a href="https://evil.example">Click</a>'
    escaped = email_module.safe_html(payload)
    assert "<script>" not in escaped
    assert "<img" not in escaped
    assert "<a " not in escaped
    assert "&lt;script&gt;" in escaped
    assert "&quot;https://evil.example&quot;" in escaped
    assert email_module.safe_html(None) == ""


def test_sanitize_header_val_strips_crlf_bcc_injection():
    """Ensure CR/LF/NUL SMTP header injection attempts cannot inject extra Bcc headers."""
    injected = "Inquiry\r\nBcc: attacker@evil.example\nX-Injected: 1\x00"
    cleaned = email_module.sanitize_header_val(injected)
    assert "\r" not in cleaned
    assert "\n" not in cleaned
    assert "\x00" not in cleaned
    assert email_module.sanitize_email_addr("valid.user@gmail.com\r\nBcc:a@b.com") == ""
    assert email_module.sanitize_email_addr("valid.user@gmail.com") == "valid.user@gmail.com"


def test_mask_email_redacts_pii_preserving_domain():
    """Ensure mask_email hides local-part PII while keeping domain diagnostic context."""
    masked = email_module.mask_email("keanu.reeves@gmail.com")
    assert "keanu.reeves" not in masked
    assert "@gmail.com" in masked
    masked_list = email_module.mask_email(["brian@affordablehome-ac.com", "irasmussenjobs@gmail.com"])
    assert "brian@" not in masked_list
    assert "irasmussenjobs@" not in masked_list
    assert "@affordablehome-ac.com" in masked_list


def test_sanitize_csv_cell_neutralizes_formula_injection():
    """Ensure spreadsheet formula triggers (=, +, -, @, tab) are prefixed with a literal quote."""
    try:
        from routers.admin import sanitize_csv_cell
    except ImportError:
        from apps.api.routers.admin import sanitize_csv_cell

    assert sanitize_csv_cell("=CMD|' /C calc'!A0") == "'=CMD|' /C calc'!A0"
    assert sanitize_csv_cell("+SUM(A1:A2)") == "'+SUM(A1:A2)"
    assert sanitize_csv_cell("-1+2") == "'-1+2"
    assert sanitize_csv_cell("@HYPERLINK(\"https://evil\")") == "'@HYPERLINK(\"https://evil\")"
    assert sanitize_csv_cell("\t=1+1") == "'\t=1+1"
    assert sanitize_csv_cell("Leilani K.\r\nHonolulu") == "Leilani K.  Honolulu"
    assert sanitize_csv_cell(None) == ""


@pytest.mark.asyncio
async def test_get_content_draft_requires_admin_auth():
    """Ensure unauthenticated draft=True requests on /api/v1/content raise HTTP 401."""
    from fastapi import HTTPException
    from starlette.requests import Request
    try:
        from routers.content import get_content
    except ImportError:
        from apps.api.routers.content import get_content

    scope = {
        "type": "http",
        "method": "GET",
        "path": "/api/v1/content/shop",
        "headers": [],
        "query_string": b"draft=true",
    }
    req = Request(scope)
    mock_db = AsyncMock()

    with pytest.raises(HTTPException) as exc_info:
        await get_content(request=req, path="shop", draft=True, db=mock_db)
    assert exc_info.value.status_code == 401

