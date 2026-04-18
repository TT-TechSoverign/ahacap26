
import sys
import os
import asyncio
import logging

# Add parent dir to sys.path to find 'services'
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Mock setup if run standalone
from dotenv import load_dotenv
load_dotenv()

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("test_email")

try:
    from services import email
except ImportError:
    # Try alternate import path if run from root
    try:
        from apps.api.services import email
    except ImportError:
        logger.error("Could not import email service. Run this from one level above 'apps' or inside 'apps/api'")
        sys.exit(1)

async def main():
    print("--- STARTING EMAIL DIAGNOSTIC ---")
    
    # 1. Check Env Vars
    print("\n[1] Checking Environment Variables...")
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASSWORD")
    smtp_port = os.getenv("SMTP_PORT")
    print(f"SMTP_USER: {smtp_user if smtp_user else 'MISSING'}")
    print(f"SMTP_PASSWORD: {'******' if smtp_pass else 'MISSING'}")
    print(f"SMTP_PORT: {smtp_port if smtp_port else 'DEFAULT (465)'}")

    if not smtp_user or not smtp_pass:
        print("❌ CRITICAL: SMTP_USER or SMTP_PASSWORD missing in .env")
        return

    # 2. Test Connection
    print("\n[2] Testing SMTP Connection (verify_connection)...")
    try:
        await email.verify_connection()
    except Exception as e:
        print(f"❌ verify_connection FAILED: {e}")
        return

    # 3. Test Sending Actual Email
    target_email = os.getenv("ADMIN_EMAIL", "test@example.com") # Default to admin or safe dummy
    print(f"\n[3] Attempting to send test email to {target_email}...")
    
    try:
        # Mocking order data
        await email.send_order_confirmation(
            to_email=target_email,
            order_id="TEST-ORDER-123",
            total_cents=1000,
            fulfillment_mode="pickup",
            items=[{"description": "Test Widget", "quantity": 1, "amount_total": 1000, "currency": "usd"}],
            customer_info={"name": "Test User", "email": target_email},
            payment_info={"brand": "Visa", "last4": "4242"}
        )
        print(f"✅ Test Email Sent Successfully to {target_email}")
    except Exception as e:
        print(f"❌ Send Email FAILED: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())
