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
    
    if is_delivery:
        mode_title = "ISLAND-WIDE DELIVERY"
        instructions_title = "Delivery Fulfillment"
        instructions_text = (
            "Professional delivery is available for standard residential zones. "
            "A logistics coordinator will contact you within 24 business hours to schedule your specific delivery window."
        )
        warning_text = "Note: We do not deliver to Waialua, North Shore, Kahuku, Waianae, Nanakuli, Waikiki, or Waimanalo."
        map_display = "none" # Hide map for delivery orders
    else:
        # Pickup Default
        mode_title = "WAIPAHU SHOP PICKUP"
        instructions_title = "Scheduling/Pick Up Instructions"
        instructions_text = (
            "Once your order is processed, an Affordable Home A/C Representative will contact you to schedule a specific pick up date and time."
        )
        warning_text = "Note: As our facility is an active distribution hub, unscheduled arrivals cannot be accommodated."
        map_display = "block"

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
            <td colspan="3" style="padding: 24px; text-align: center; color: #94a3b8; font-style: italic;">
                Order details not available.
            </td>
        </tr>
        """

    # --- Premium 10/10 Layout with Map & Disclaimers ---
    html_body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f1f5f9; }}
            .container {{ max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 1px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); }}
            
            /* Premium Header */
            .header {{ background-color: #0a0e14; padding: 40px 20px; text-align: center; border-bottom: 1px solid #1e293b; }}
            .brand-text {{ color: #ffffff; font-size: 20px; font-weight: 900; letter-spacing: 0.15em; text-transform: uppercase; margin: 0; }}
            .brand-sub {{ color: #06b6d4; font-size: 10px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; margin-top: 8px; display: block; }}
            
            /* Content Area */
            .content {{ padding: 40px 32px; background-color: #ffffff; }}
            
            /* Typography */
            h1 {{ color: #0f172a; font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: -0.025em; margin: 0 0 8px 0; }}
            .order-badge {{ display: inline-block; background-color: #ecfeff; color: #0891b2; padding: 6px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 24px; }}
            
            /* Table */
            th {{ font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-weight: 700; padding-bottom: 12px; }}
            
            /* Footer */
            .footer {{ background-color: #0a0e14; padding: 40px 20px; text-align: center; border-top: 1px solid #1e293b; color: #94a3b8; }}
            .footer-link {{ color: #64748b; text-decoration: none; font-size: 12px; transition: color 0.2s; }}
            .footer-link:hover {{ color: #ffffff; }}
            
            /* Disclaimer Box */
            .disclaimer-box {{ border: 1px solid #7f1d1d; background-color: #450a0a; color: #fecaca; padding: 20px; text-align: center; margin-bottom: 30px; border-radius: 4px; }}
        </style>
    </head>
    <body>
        <div style="height: 40px;"></div>
        <div class="container">
            <!-- 1. Header (Text Logo) -->
            <div class="header">
                <h1 class="brand-text">Affordable Home A/C</h1>
                <span class="brand-sub">The Evolution of Cool</span>
            </div>

            <!-- 2. Main Body -->
            <div class="content">
                <div style="text-align: center;">
                    <h1>Order Confirmed</h1>
                    <span class="order-badge">Ref: #{order_id}</span>
                </div>

                <!-- Line Items -->
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
                    <thead>
                        <tr style="border-bottom: 2px solid #f1f5f9;">
                            <th style="text-align: left;">Item</th>
                            <th style="text-align: center;">Qty</th>
                            <th style="text-align: right;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows_html}
                    </tbody>
                </table>

                <!-- Info Cards -->
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 24px; margin-bottom: 24px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding-bottom: 16px; vertical-align: top;">
                                <p style="margin: 0; color: #94a3b8; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;">Method</p>
                                <p style="margin: 4px 0 0 0; color: #0f172a; font-weight: 600;">{mode_title}</p>
                            </td>
                            <td style="padding-bottom: 16px; text-align: right; vertical-align: top;">
                                <p style="margin: 0; color: #94a3b8; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;">Total Paid</p>
                                <p style="margin: 4px 0 0 0; color: #06b6d4; font-weight: 700; font-size: 18px;">${(total_cents/100):.2f}</p>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border-top: 1px solid #e2e8f0; padding-top: 16px;">
                                <p style="margin: 0; color: #94a3b8; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;">{instructions_title}</p>
                                <p style="margin: 8px 0 0 0; color: #334155; font-size: 13px; line-height: 1.6;">{instructions_text}</p>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- 3. Directions & Map (Hidden on Delivery) -->
                <div style="display: {map_display}; margin-bottom: 32px;">
                    <h3 style="color: #0f172a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 800; margin-bottom: 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Directions to Warehouse</h3>
                    
                    <p style="color: #475569; font-size: 13px; line-height: 1.6; margin-bottom: 16px;">
                        Arrive at Waipahu Commercial Center. Enter one-way drive in lane and continue towards the back warehouses. Make a left and continue down towards end of driveway. Destination is on right with roll up door #203.
                    </p>

                    <!-- MAP IMAGE: Expecting 'map.png' in public folder, encoded here similarly if we had it. 
                         Using placeholder block for user to inject logic or external image logic.
                         For now, we link to the google map. -->
                    
                    <a href="https://www.google.com/maps/search/?api=1&query=Waipahu+Commercial+Center+94-150+Leoleo+St+%23203+Waipahu+HI+96797" target="_blank" style="display: block; background-color: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 4px; padding: 20px; text-align: center; text-decoration: none; color: #64748b; font-size: 12px;">
                        <span style="display: block; font-size: 24px; margin-bottom: 8px;">🗺️</span>
                         (Click to Open Map)<br/>
                         *Please upload 'map.png' to server to display inline map*
                    </a>
                </div>

                <div style="margin-top: 24px; text-align: center;">
                     <p style="color: #f59e0b; font-size: 12px; font-weight: 500; background-color: #fffbeb; padding: 12px; border-radius: 4px; display: inline-block;">
                        {warning_text}
                    </p>
                </div>
            </div>

            <!-- 4. Premium Footer with Disclaimers -->
            <div class="footer">
                
                <!-- Disclaimer Box -->
                <div class="disclaimer-box">
                     <p style="margin: 0 0 8px 0; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; font-size: 12px; color: #f87171;">All Sales Final</p>
                     <p style="margin: 0; font-size: 11px; color: #fecaca;">No Refunds • No Exchanges</p>
                     <p style="margin: 8px 0 0 0; font-size: 10px; color: #fca5a5; padding-top: 8px; border-top: 1px solid #7f1d1d;">All warranty claims & defective units must be processed directly through the manufacturer.</p>
                </div>

                <p style="color: #ffffff; font-weight: 700; margin: 0 0 4px 0; letter-spacing: 0.05em;">WAIPAHU COMMERCIAL CENTER</p>
                <p style="margin: 0 0 16px 0; font-size: 13px; color: #94a3b8;">94-150 Leoleo St. #203, Waipahu, HI 96797</p>
                
                <div style="margin-bottom: 24px;">
                    <a href="tel:8084881111" class="footer-link" style="color: #06b6d4; font-weight: 600;">(808) 488-1111</a>
                    <span style="color: #1e293b; margin: 0 10px;">|</span>
                    <a href="mailto:office@affordablehome-ac.com" class="footer-link">office@affordablehome-ac.com</a>
                </div>

                <div style="border-top: 1px solid #1e293b; margin: 0 auto; width: 60%;"></div>
                
                <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #475569; font-weight: 700; margin-top: 20px; display: block;">
                    LIC# CT-36775 <span style="color: #06b6d4; margin: 0 8px;">•</span> Licensed <span style="color: #1e293b;">|</span> Insured <span style="color: #1e293b;">|</span> Bonded
                </span>
                
                <p style="margin-top: 12px; font-size: 11px; color: #334155;">
                    &copy; {datetime.now().year} Affordable Home A/C. All rights reserved.
                </p>
            </div>
        </div>
        <div style="height: 40px;"></div>
    </body>
    </html>
    """
    
    # Run synchronous SMTP code in thread pool
    await asyncio.get_event_loop().run_in_executor(executor, send_raw_email, to_email, subject, html_body)

