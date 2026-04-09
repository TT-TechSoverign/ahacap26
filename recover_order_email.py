import asyncio
import os
import sys
import json
import stripe
from dotenv import load_dotenv

# Define Path to API
API_PATH = os.path.join(os.getcwd(), 'apps', 'api')
sys.path.append(API_PATH)

# Load Server Env
load_dotenv(os.path.join(API_PATH, '.env'))

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

try:
    from services.email import send_order_confirmation
except ImportError:
    print("Failed to import email service. Ensure you are running this from the project root.")
    sys.exit(1)

async def recover_and_send_email(payment_intent_id):
    if not payment_intent_id:
        print("Please provide a valid PaymentIntent ID.")
        return

    print(f"🚀 Recovering exact order details for: {payment_intent_id}")
    try:
        # Search for the associated Checkout Session
        sessions = stripe.checkout.Session.list(payment_intent=payment_intent_id, limit=1)
        if not sessions.data:
            print("❌ No Checkout Session found for this PaymentIntent.")
            return
        
        session = sessions.data[0]
        print(f"✅ Found Checkout Session: {session.id}")
        
        # Retrieve Line Items
        line_items = stripe.checkout.Session.list_line_items(session.id)
        
        items_data = []
        for item in line_items.data:
            items_data.append({
                "description": item.description,
                "quantity": item.quantity,
                "amount_total": item.amount_total,
                "currency": item.currency
            })
            print(f"  - {item.quantity}x {item.description} (${item.amount_total/100:.2f})")
            
        receipt_email = session.customer_details.email
        customer_info = session.customer_details
        total_cents = session.amount_total
        fulfillment_mode = session.metadata.get('fulfillment_mode', 'pickup')
        order_id = f"ORD-{payment_intent_id[-6:].upper()}"
        
        # Determine Card info if possible
        pi = stripe.PaymentIntent.retrieve(payment_intent_id, expand=['payment_method'])
        payment_info = None
        if pi.get('payment_method'):
            pm = pi.payment_method
            if isinstance(pm, dict) and pm.get('card'):
                card = pm.get('card')
                payment_info = {
                    "brand": card.get('brand', 'Card').title(),
                    "last4": card.get('last4', '****')
                }

        print(f"\n📧 Final Destination: {receipt_email}")
        print(f"🛠  Processing artificial dispatch...")
        
        # Fire off our production confirmation email mechanism!
        await send_order_confirmation(
            receipt_email, 
            order_id, 
            total_cents, 
            fulfillment_mode=fulfillment_mode,
            items=items_data,
            customer_info=customer_info,
            payment_info=payment_info
        )
        print("✅ Email dispatched successfully to Customer and Admin!")

    except Exception as e:
        print(f"❌ Failed to recover and send email: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python recover_order_email.py <pi_xyz>")
        sys.exit(1)
        
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(recover_and_send_email(sys.argv[1]))
