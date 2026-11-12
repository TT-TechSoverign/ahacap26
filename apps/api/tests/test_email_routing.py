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
