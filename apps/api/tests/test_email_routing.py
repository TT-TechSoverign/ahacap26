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
    assert "ahacsplitdivision@gmail.com" not in recipients

def test_ceo_shield_when_staging_environment():
    """Ensure CEO is 100% excluded when IS_STAGING is True."""
    with patch.object(email_module, "IS_STAGING", True):
        recipients, bcc, is_shielded = get_admin_notification_recipients(is_test=False)
        assert is_shielded is True
        assert recipients == [DEV_TEST_EMAIL]
        assert bcc == []
        assert "brian@affordablehome-ac.com" not in recipients

def test_production_routing_includes_admins():
    """Ensure production real orders include primary admin emails."""
    with patch.object(email_module, "IS_STAGING", False):
        recipients, bcc, is_shielded = get_admin_notification_recipients(is_test=False)
        assert is_shielded is False
        assert "brian@affordablehome-ac.com" in recipients
        assert "ahacsplitdivision@gmail.com" in recipients
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
