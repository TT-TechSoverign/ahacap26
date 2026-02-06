import asyncio
import os
import sys
from dotenv import load_dotenv

# Define Path to API
API_PATH = os.path.join(os.getcwd(), 'apps', 'api')
sys.path.append(API_PATH)

# Load Server Env
load_dotenv(os.path.join(API_PATH, '.env'))

# Import Email Service
try:
    from services.email import send_order_confirmation
except ImportError:
    print("Failed to import email service. Ensure you are running this from the project root.")
    sys.exit(1)

async def test_realistic_email():
    print("🚀 Triggering Realistic Email Test...")

    # Real Product Data from seed
    items = [
        {
            "description": "LG Dual Inverter 10,000 BTU (LW1022IVSM)",
            "quantity": 1,
            "amount_total": 62500,  # $625.00
            "currency": "usd"
        },
        {
            "description": "GE RAB26A Wall Case",
            "quantity": 1,
            "amount_total": 22500,  # $225.00
            "currency": "usd"
        },
        {
             "description": "Delivery Fee (Oahu)",
             "quantity": 1,
             "amount_total": 5000, # $50.00
             "currency": "usd"
        }
    ]

    # Calculate Total
    total_cents = sum(item['amount_total'] for item in items)
    
    # Mock Order ID
    order_id = "ORD-TEST-REAL-808"
    
    # Target Email (Admin)
    target_email = os.getenv("ADMIN_EMAIL", "irasmussenjobs@gmail.com")
    
    print(f"📧 Sending Order {order_id} to {target_email}...")
    print(f"💰 Total Value: ${total_cents/100:.2f}")

    try:
        await send_order_confirmation(
            target_email, 
            order_id, 
            total_cents, 
            fulfillment_mode="delivery", 
            items=items
        )
        print("✅ Email dispatched successfully!")
    except Exception as e:
        print(f"❌ Failed to send email: {e}")

if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(test_realistic_email())
