import asyncio
import os
import sys

# Ensure apps/api is in sys path because email.py is inside apps/api/services
api_dir = os.path.join(os.getcwd(), 'apps', 'api')
sys.path.append(api_dir)

# Override environment variables for testing if needed
# os.environ["SMTP_USER"] = "..."
# os.environ["SMTP_PASSWORD"] = "..."

from services.email import send_order_confirmation

async def test_email():
    print("Sending order confirmation test...")
    await send_order_confirmation(
        to_email="testclient@example.com",
        order_id="TEST-99999",
        total_cents=150000,
        fulfillment_mode="pickup",
        items=[
            {"description": "Test Unit A", "quantity": 1, "amount_total": 50000},
            {"description": "Test Unit B", "quantity": 2, "amount_total": 100000}
        ],
        customer_info={
            "name": "Test User",
            "email": "testclient@example.com",
            "phone": "808-111-2222",
            "address": {
                "line1": "123 Test St",
                "city": "Honolulu",
                "state": "HI",
                "postal_code": "96814"
            }
        },
        payment_info={
            "brand": "Visa",
            "last4": "4242"
        }
    )
    print("Done sending.")

if __name__ == "__main__":
    asyncio.run(test_email())
