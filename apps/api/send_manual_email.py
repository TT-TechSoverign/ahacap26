import asyncio
import os
from dotenv import load_dotenv
import json

# Ensure we are in apps/api 
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from services import email as email_service

async def manual_send():
    load_dotenv()
    
    target_email = "dtmasaki6@gmail.com"
    order_id = "ORD-DNMK0AA"
    total_cents = 56544
    fulfillment_mode = "pickup"
    
    items_data = [
        {"description": "LG Dual Invertor 6,000 BTU (LW6023IVSM)", "quantity": 1, "amount_total": 54000, "currency": "usd"},
        {"description": "Hawaii State Tax (4.712%)", "quantity": 1, "amount_total": 2544, "currency": "usd"}
    ]
    
    customer_info = {
        "name": "Dave T Masaki",
        "email": target_email,
        "phone": "(808) 216-5211",
        "address": {"city": "Pearl City", "line1": "2278 Aupaka St", "postal_code": "96782", "state": "HI", "country": "US"}
    }
    
    payment_info = {
        "brand": "Credit Card",
        "last4": "7126"
    }
    
    print(f"Triggering email dispatch for {order_id} to {target_email}...")
    await email_service.send_order_confirmation(
        target_email,
        order_id,
        total_cents,
        fulfillment_mode=fulfillment_mode,
        items=items_data,
        customer_info=customer_info,
        payment_info=payment_info
    )
    print("Email artificially triggered.")

if __name__ == "__main__":
    asyncio.run(manual_send())
