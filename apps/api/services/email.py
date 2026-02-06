import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
import logging
from concurrent.futures import ThreadPoolExecutor
import asyncio
import base64
from pathlib import Path
from datetime import datetime

# Gmail SMTP Config
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 465 # SSL
SMTP_USER = os.getenv("SMTP_USER", "office@affordablehome-ac.com") 
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

logger = logging.getLogger("uvicorn.error")

executor = ThreadPoolExecutor(max_workers=3)

# Load Logo Dynamically
# Embedded Logo (Auto-Injected)
LOGO_B64 = "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"

ADMIN_EMAIL = "irasmussenjobs@gmail.com"

def send_raw_email(to_email: str, subject: str, html_body: str):
    try:
        msg = MIMEMultipart()
        msg['From'] = SMTP_USER
        msg['To'] = to_email
        msg['Bcc'] = ADMIN_EMAIL  # AUTO-BCC ADMIN!
        msg['Subject'] = subject

        msg.attach(MIMEText(html_body, 'html'))

        print(f"Connecting to SMTP: {SMTP_SERVER}:{SMTP_PORT}...")
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
            server.login(SMTP_USER, SMTP_PASSWORD)
            # Send to both 'to_email' and 'ADMIN_EMAIL' (BCC handled by SMTP protocol if passed in recipients list)
            recipients = [to_email, ADMIN_EMAIL]
            server.sendmail(SMTP_USER, recipients, msg.as_string())
            print(f"✅ Email sent to {to_email} (BCC: {ADMIN_EMAIL})")
    except Exception as e:
        logger.error(f"Failed to send email: {e}")
        print(f"❌ SMTP Error: {e}")

def verify_connection():
    """Checks if SMTP credentials are valid on startup."""
    try:
        print(f"DEBUG: Verifying SMTP Connection to {SMTP_SERVER}:{SMTP_PORT}...")
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
            server.login(SMTP_USER, SMTP_PASSWORD)
            print("✅ SMTP Connection Verified Successfully")
    except Exception as e:
        print(f"❌ SMTP Connection FAILED: {e}")


async def send_order_confirmation(to_email: str, order_id: str, total_cents: int, fulfillment_mode: str = "pickup", items: list = None):
    subject = f"Order Confirmation #{order_id} - Affordable Home A/C"

    # --- Verification & Content Logic ---
    is_delivery = (fulfillment_mode.lower() == "delivery")
    
    # Text matching apps/web/lib/content/content.json
    if is_delivery:
        mode_title = "ISLAND-WIDE DELIVERY"
        instructions_title = "Delivery Fulfillment"
        instructions_text = (
            "Professional delivery is available for standard residential zones. "
            "A logistics coordinator will contact you within 24 business hours to schedule your specific delivery window."
        )
        warning_text = "Note: We do not deliver to Waialua, North Shore, Kahuku, Waianae, Nanakuli, Waikiki, or Waimanalo."
    else:
        # Pickup Default
        mode_title = "WAIPAHU SHOP PICKUP"
        instructions_title = "Scheduling/Pick Up Instructions"
        instructions_text = (
            "Once your order is processed, an Affordable Home A/C Representative will contact you to schedule a specific pick up date and time."
        )
        warning_text = "Note: As our facility is an active distribution hub, unscheduled arrivals cannot be accommodated."

    # --- Item Rows Generation ---
    rows_html = ""
    if items:
        for item in items:
            name = item.get('description', 'Item')
            qty = item.get('quantity', 1)
            amount = item.get('amount_total', 0) / 100.0
            
            rows_html += f"""
            <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 16px 8px; color: #334155;">{name}</td>
                <td style="padding: 16px 8px; text-align: center; color: #64748b;">{qty}</td>
                <td style="padding: 16px 8px; text-align: right; color: #0f172a; font-weight: 500;">${amount:,.2f}</td>
            </tr>
            """
    else:
        rows_html = """
        <tr>
            <td colspan="3" style="padding: 20px; text-align: center; color: #64748b; font-style: italic;">
                Order details not available.
            </td>
        </tr>
        """

    # --- Enhanced HTML Template ---
    html_body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f1f5f9; }}
            .container {{ max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }}
            .header {{ background-color: #0f172a; padding: 32px 20px; text-align: center; }}
            .content {{ padding: 32px 24px; }}
            .summary-box {{ background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 20px; margin: 24px 0; }}
            .footer {{ background-color: #f8fafc; padding: 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }}
        </style>
    </head>
    <body>
        <div style="height: 24px;"></div>
        <div class="container">
            <!-- Header with Logo -->
            <div class="header">
                <img src="data:image/png;base64,{LOGO_B64}" style="width: 180px; height: auto;" alt="Affordable Home A/C" />
            </div>

            <div class="content">
                <!-- Status Badge -->
                <div style="text-align: center; margin-bottom: 24px;">
                    <h2 style="margin: 0; color: #06b6d4; font-size: 24px; font-weight: 700;">Order Confirmed!</h2>
                    <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 16px; font-weight: 600;">Confirmation #{order_id}</p>
                </div>

                <!-- Line Items Table -->
                <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
                    <thead>
                        <tr style="border-bottom: 2px solid #e2e8f0;">
                            <th style="padding: 8px; text-align: left; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Item</th>
                            <th style="padding: 8px; text-align: center; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Qty</th>
                            <th style="padding: 8px; text-align: right; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows_html}
                    </tbody>
                </table>

                <!-- Detailed Summary / Fulfillment -->
                <div class="summary-box">
                    <div style="margin-bottom: 16px;">
                        <p style="margin: 0; color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Fulfillment Method</p>
                        <p style="margin: 4px 0 0 0; color: #0f172a; font-weight: 600; font-size: 16px;">{mode_title}</p>
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <p style="margin: 0; color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">{instructions_title}</p>
                        <p style="margin: 4px 0 0 0; color: #334155; font-size: 14px; line-height: 1.5;">{instructions_text}</p>
                    </div>

                    <div style="border-top: 1px solid #cbd5e1; padding-top: 12px; margin-top: 12px; display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: #0f172a; font-weight: 700; font-size: 16px;">Total Paid</span>
                        <span style="color: #06b6d4; font-weight: 700; font-size: 20px;">${(total_cents/100):.2f}</span>
                    </div>
                </div>

                <p style="color: #f59e0b; font-size: 13px; text-align: center; margin-top: 16px; background-color: #fffbeb; padding: 10px; border-radius: 4px; border: 1px solid #fcd34d;">
                    {warning_text}
                </p>
            </div>

            <!-- Footer -->
            <div class="footer">
                <p style="margin: 0 0 8px 0; font-weight: 600; color: #64748b;">Affordable Home A/C - Waipahu Distribution Center</p>
                <p style="margin: 0;">94-150 Leoleo St. #203, Waipahu, HI 96797</p>
                <p style="margin: 4px 0 0 0;">(808) 555-0123</p>
            </div>
        </div>
        <div style="height: 24px;"></div>
    </body>
    </html>
    """
    
    # Run synchronous SMTP code in thread pool
    await asyncio.get_event_loop().run_in_executor(executor, send_raw_email, to_email, subject, html_body)

