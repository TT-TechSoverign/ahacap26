from pathlib import Path
import os
import re

# Paths
BASE_DIR = Path(os.getcwd())
MAIN_API_PATH = BASE_DIR / "apps" / "api" / "main.py"

# New process_stripe_event Logic
NEW_FUNCTION = r'''async def process_stripe_event(event: dict):
    stripe_pid = None
    metadata = {}
    receipt_email = None
    amount_received = 0
    items_data = []
    
    # New Data Containers
    customer_info = {}
    payment_info = {"brand": "Credit Card", "last4": ""}

    try:
        obj = event['data']['object']
        
        # Determine Source
        if event['type'] == 'payment_intent.succeeded':
            stripe_pid = obj['id']
            receipt_email = obj.get('receipt_email')
            amount_received = obj.get('amount_received')
            metadata = obj.get('metadata', {})
            
        elif event['type'] == 'checkout.session.completed':
            stripe_pid = obj.get('payment_intent')
            # Extract main email
            receipt_email = obj.get('customer_details', {}).get('email')
            amount_received = obj.get('amount_total')
            metadata = obj.get('metadata', {})
            
            # --- Extract Expanded Customer/Billing Info ---
            cust = obj.get('customer_details', {})
            customer_info = {
                "name": cust.get('name', 'Valued Customer'),
                "email": cust.get('email', receipt_email),
                "phone": cust.get('phone', ''),
                "address": cust.get('address', {}) 
            }
            
            # Retrieve line items
            try:
                line_items = stripe.checkout.Session.list_line_items(obj['id'], limit=100)
                for item in line_items.data:
                    items_data.append({
                        "description": item.description,
                        "quantity": item.quantity,
                        "amount_total": item.amount_total,
                        "currency": item.currency
                    })
            except Exception as e:
                print(f"Error fetching line items: {e}")

        # --- Extract Payment Method Info (Brand/Last4) ---
        if stripe_pid:
            try:
                # Expand payment_method to get card details
                pi = stripe.PaymentIntent.retrieve(stripe_pid, expand=['payment_method'])
                if pi.payment_method:
                    # Check if it's a dict (expanded) or string (ID) - retrieve expanding ensures it's dict usually
                    pm = pi.payment_method
                    if isinstance(pm, dict) and pm.get('card'):
                        card = pm.get('card')
                        payment_info = {
                            "brand": card.get('brand', 'Card').title(),
                            "last4": card.get('last4', '****')
                        }
            except Exception as e:
                print(f"Error fetching Payment Method details: {e}")


        if stripe_pid:
            fulfillment_mode = metadata.get('fulfillment_mode', 'pickup')
            print(f"Processing Payment Success: {stripe_pid} | Mode: {fulfillment_mode}")

            async with AsyncSessionLocal() as session:
                result = await session.execute(select(models.Order).where(models.Order.stripe_pid == stripe_pid))
                order = result.scalars().first()

                # --- AUTO-CREATE LOGIC ---
                if not order:
                    print(f"Order not found for PID: {stripe_pid}. Generating new order record...")
                    new_order_id = f"ORD-{stripe_pid[-6:].upper()}"
                    order = models.Order(
                        id=new_order_id,
                        stripe_pid=stripe_pid,
                        total_cents=amount_received or 0,
                        customer_email=receipt_email,
                        status=models.OrderStatus.PAID,
                        items_json=json.dumps(items_data) if items_data else None,
                        created_at=datetime.utcnow()
                    )
                    session.add(order)
                    await session.commit()
                    print(f"Created/Recovered Order {new_order_id} from Webhook.")

                if order.status != models.OrderStatus.PAID:
                    order.status = models.OrderStatus.PAID
                    if items_data and not order.items_json:
                        order.items_json = json.dumps(items_data)
                    await session.commit()
                    print(f"Order {order.id} marked as PAID.")

                target_email = order.customer_email or receipt_email
                if target_email:
                    print(f"Dispatching email to {target_email}...")
                    
                    # Call updated service with new args
                    await email_service.send_order_confirmation(
                        target_email, 
                        order.id, 
                        order.total_cents, 
                        fulfillment_mode=fulfillment_mode,
                        items=items_data,
                        customer_info=customer_info,
                        payment_info=payment_info
                    )
                else:
                    print("No email found for order confirmation.")
    except Exception as e:
        print(f"CRITICAL: Webhook Processing Error: {e}")
        import traceback
        traceback.print_exc()
'''

def update_main_api():
    content = MAIN_API_PATH.read_text(encoding="utf-8")
    
    # Regex to replace the entire async def process_stripe_event(event: dict): ... block
    # We look for the function start and match until @app.post or EOF
    
    # Note: Regex replacement for multi-line python functions is tricky. 
    # Since we know the file structure:
    # It starts at: async def process_stripe_event(event: dict):
    # It ends before: @app.post("/api/webhooks/stripe")
    
    start_marker = "async def process_stripe_event(event: dict):"
    end_marker = '@app.post("/api/webhooks/stripe")'
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)
    
    if start_idx == -1 or end_idx == -1:
        print("❌ Could not locate function boundaries.")
        return

    # Keep imports/header (before start)
    header = content[:start_idx]
    # Keep router registration (from end marker onwards)
    footer = content[end_idx:]
    
    # Construct new file
    new_content = header + NEW_FUNCTION + "\n\n" + footer
    
    MAIN_API_PATH.write_text(new_content, encoding="utf-8")
    print(f"✅ Updated {MAIN_API_PATH} with Expanded Webhook Logic.")

if __name__ == "__main__":
    update_main_api()
