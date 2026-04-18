import asyncio
import sys
import os
import smtplib
from dotenv import load_dotenv

# Path setup
current_dir = os.path.dirname(os.path.abspath(__file__))
api_dir = os.path.join(current_dir, '..', 'apps', 'api')
sys.path.append(api_dir)

load_dotenv(os.path.join(current_dir, '..', '.env'))
load_dotenv(os.path.join(api_dir, '.env'))

from database import AsyncSessionLocal
from sqlalchemy.future import select
import models
import json
from services.email import send_email_with_attachments, SMTP_SERVER, SMTP_PORT, SMTP_USER, SMTP_PASSWORD

async def resend_admin_email_for_order(stripe_pid: str, target_email: str):
    print(f"Manually constructing order details for: {stripe_pid}...")
    
    customer_info = {
        "name": "Geoff Oshiro",
        "email": "geoffoshiro@example.com", # Exact email isn't critical for the admin copy
        "phone": "Customer Phone Not Provided",
        "address": {}
    }
    
    fulfillment_mode = "pickup"
    
    payment_info = {
        "brand": "Card",
        "last4": "****"
    }
    
    items_data = [{
        "description": "Online Order via Web Checkout",
        "quantity": 1,
        "amount_total": 91623,
    }]
    
    order_id = f"ORD-{stripe_pid[-6:].upper()}"
    total_cents = 91623
    customer_email = customer_info["email"]

    # Now to construct HTML:
    from services.email import send_order_confirmation
    import services.email
    
    original_send = services.email.send_email_with_attachments
    
    def mock_send(to_email, subject, html_content, bcc_emails=None, images=None, server=None):
        if "[INTERNAL]" in subject:
            print(f"Sending ADMIN email directly to {target_email} instead of defaults.")
            original_send(target_email, subject, html_content, bcc_emails=None, images=images, server=server)
        else:
            print("Skipping CLIENT email to avoid double-emailing the customer.")
            
    services.email.send_email_with_attachments = mock_send
    
    print(f"Dispatching via modified service for Order {order_id}...")
    await send_order_confirmation(
        to_email=customer_email,
        order_id=order_id,
        total_cents=total_cents,
        fulfillment_mode=fulfillment_mode,
        items=items_data,
        customer_info=customer_info,
        payment_info=payment_info
    )
    print("Done!")

if __name__ == "__main__":
    asyncio.run(resend_admin_email_for_order("pi_3T9eyzRT8Qu92qsY1cWHn7MP", "ahacsplitdivision@gmail.com"))
