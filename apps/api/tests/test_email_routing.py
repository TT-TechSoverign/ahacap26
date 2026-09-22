import pytest
from unittest.mock import patch
from apps.api.services.email import get_admin_notification_recipients, DEV_TEST_EMAIL

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
    with patch("apps.api.services.email.IS_STAGING", True):
        recipients, bcc, is_shielded = get_admin_notification_recipients(is_test=False)
        assert is_shielded is True
        assert recipients == [DEV_TEST_EMAIL]
        assert bcc == []
        assert "brian@affordablehome-ac.com" not in recipients

def test_production_routing_includes_admins():
    """Ensure production real orders include primary admin emails."""
    with patch("apps.api.services.email.IS_STAGING", False):
        recipients, bcc, is_shielded = get_admin_notification_recipients(is_test=False)
        assert is_shielded is False
        assert "brian@affordablehome-ac.com" in recipients
        assert "ahacsplitdivision@gmail.com" in recipients
        assert DEV_TEST_EMAIL in bcc
