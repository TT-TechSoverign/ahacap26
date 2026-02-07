from pathlib import Path
import base64
import os

# Paths
BASE_DIR = Path(os.getcwd())
EMAIL_SERVICE_PATH = BASE_DIR / "apps" / "api" / "services" / "email.py"
LOGO_PATH = BASE_DIR / "apps" / "web" / "public" / "assets" / "ahac-logo-email-600x400.png"
MAP_PATH = BASE_DIR / "apps" / "web" / "public" / "assets" / "ahac-map-email-600x300.png"

def get_b64(path):
    if not path.exists():
        print(f"❌ Error: File not found at {path}")
        return None
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

# Encode Assets
logo_b64 = get_b64(LOGO_PATH)
map_b64 = get_b64(MAP_PATH)

if not logo_b64 or not map_b64:
    print("❌ Critical Asset Missing")
    exit(1)

# --- Python Code with Embeds ---
EMAIL_CONTENT_TEMPLATE = f'''
import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

# Logger Config
logger = logging.getLogger(__name__)

# Environment Variables
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 465
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "office@affordablehome-ac.com")

LOGO_B64 = "{logo_b64}"
MAP_B64 = "{map_b64}"

# Global Thread Pool for non-blocking SMTP
from concurrent.futures import ThreadPoolExecutor
executor = ThreadPoolExecutor()

def send_raw_email(to_email, subject, html_body):
    """Synchronous SMTP sending function (to be run in thread)."""
    try:
        msg = MIMEMultipart()
        msg['From'] = f"Affordable Home A/C <{{SMTP_USER}}>"
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.add_header('Bcc', ADMIN_EMAIL) # Always BCC Admin

        msg.attach(MIMEText(html_body, 'html'))

        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
            server.login(SMTP_USER, SMTP_PASSWORD)
            # Send to both Customer and Admin
            recipients = [to_email, ADMIN_EMAIL]
            server.sendmail(SMTP_USER, recipients, msg.as_string())
            print(f"✅ Email sent to {{to_email}} (BCC: {{ADMIN_EMAIL}})")
    except Exception as e:
        logger.error(f"Failed to send email: {{e}}")
        print(f"❌ SMTP Error: {{e}}")

def verify_connection():
    """Checks if SMTP credentials are valid on startup."""
    try:
        print(f"DEBUG: Verifying SMTP Connection to {{SMTP_SERVER}}:{{SMTP_PORT}}...")
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
            server.login(SMTP_USER, SMTP_PASSWORD)
            print("✅ SMTP Connection Verified Successfully")
    except Exception as e:
        print(f"❌ SMTP Connection FAILED: {{e}}")


async def send_order_confirmation(to_email: str, order_id: str, total_cents: int, fulfillment_mode: str = "pickup", items: list = None, customer_info: dict = None, payment_info: dict = None):
    subject = f"Order Confirmation #{{order_id}} - Affordable Home A/C"
    
    # Defaults
    if not items: items = []
    if not customer_info: customer_info = {{}}
    if not payment_info: payment_info = {{}}

    # Customer Data Extraction
    c_name = customer_info.get('name', 'Valued Customer')
    c_email = customer_info.get('email', to_email)
    c_phone = customer_info.get('phone', 'N/A')
    
    addr = customer_info.get('address', {{}})
    if addr:
        line1 = addr.get('line1', '')
        line2 = addr.get('line2', '')
        city = addr.get('city', '')
        state = addr.get('state', '')
        zip_code = addr.get('postal_code', '')
        c_address_html = f"{{line1}}<br>"
        if line2: c_address_html += f"{{line2}}<br>"
        c_address_html += f"{{city}}, {{state}} {{zip_code}}"
    else:
        c_address_html = "Address not provided"

    # Payment Data Extraction
    p_brand = payment_info.get('brand', 'Card')
    p_last4 = payment_info.get('last4', '****')
    if p_last4:
        payment_method_text = f"{{p_brand}} ending in {{p_last4}}"
    else:
        payment_method_text = "Credit Card"

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
                <td style="padding: 16px 8px; color: #334155;">{{name}}</td>
                <td style="padding: 16px 8px; text-align: center; color: #64748b;">{{qty}}</td>
                <td style="padding: 16px 8px; text-align: right; color: #0f172a; font-weight: 500;">${{amount:,.2f}}</td>
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
            body {{{{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f1f5f9; }}}}
            .container {{{{ max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 1px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); }}}}
            
            /* Premium Header */
            .header {{{{ background-color: #0a0e14; padding: 0 0; text-align: center; border-bottom: 1px solid #1e293b; }}}}
            
            /* Content Area */
            .content {{{{ padding: 40px 32px; background-color: #ffffff; }}}}
            
            /* Typography */
            h1 {{{{ color: #0f172a; font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: -0.025em; margin: 0 0 8px 0; }}}}
            h2 {{{{ color: #334155; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 24px 0 12px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }}}}
            .order-badge {{{{ display: inline-block; background-color: #ecfeff; color: #0891b2; padding: 6px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 24px; }}}}
            
            /* Table */
            th {{{{ font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-weight: 700; padding-bottom: 12px; }}}}
            
            /* Footer */
            .footer {{{{ background-color: #0a0e14; padding: 40px 20px; text-align: center; border-top: 1px solid #1e293b; color: #94a3b8; }}}}
            .footer-link {{{{ color: #64748b; text-decoration: none; font-size: 12px; transition: color 0.2s; }}}}
            .footer-link:hover {{{{ color: #ffffff; }}}}
            
            /* Disclaimer Box */
            .disclaimer-box {{{{ border: 1px solid #7f1d1d; background-color: #450a0a; color: #fecaca; padding: 20px; text-align: center; margin-bottom: 30px; border-radius: 4px; }}}}
            
            .map-container {{{{ display: {{map_display}}; margin-bottom: 32px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }}}}

            /* Customer Info Grid */
            .info-grid {{{{ display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }}}}
            .info-item p.label {{{{ font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin: 0 0 4px 0; font-weight: 700; }}}}
            .info-item p.value {{{{ font-size: 13px; color: #334155; margin: 0; line-height: 1.4; }}}}
            
        </style>
    </head>
    <body>
        <div style="height: 40px;"></div>
        <div class="container">
            <!-- 1. Header -->
            <div class="header">
                 <img src="data:image/png;base64,{{LOGO_B64}}" style="width: 100%; height: auto; display: block;" alt="Affordable Home A/C" />
            </div>

            <!-- 2. Main Body -->
            <div class="content">
                <div style="text-align: center;">
                    <h1>Order Confirmed</h1>
                    <span class="order-badge">Ref: #{{order_id}}</span>
                </div>

                <!-- Customer Information -->
                <h2>Customer Information</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <p class="label">Billed To</p>
                        <p class="value">
                            <strong>{{c_name}}</strong><br>
                            {{c_address_html}}
                        </p>
                    </div>
                    <div class="info-item">
                        <p class="label">Contact</p>
                        <p class="value">
                            {{c_email}}<br>
                            {{c_phone}}
                        </p>
                    </div>
                </div>

                <!-- Line Items -->
                <h2>Order Details</h2>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
                    <thead>
                        <tr style="border-bottom: 2px solid #f1f5f9;">
                            <th style="text-align: left;">Item</th>
                            <th style="text-align: center;">Qty</th>
                            <th style="text-align: right;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {{rows_html}}
                    </tbody>
                </table>

                <!-- Summary Cards -->
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 24px; margin-bottom: 24px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding-bottom: 16px; valign: top;">
                                <p style="margin: 0; color: #94a3b8; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;">Payment Method</p>
                                <p style="margin: 4px 0 0 0; color: #0f172a; font-weight: 600;">{{payment_method_text}}</p>
                            </td>
                            <td style="padding-bottom: 16px; text-align: right; vertical-align: top;">
                                <p style="margin: 0; color: #94a3b8; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;">Total Paid</p>
                                <p style="margin: 4px 0 0 0; color: #06b6d4; font-weight: 700; font-size: 18px;">${{(total_cents/100):.2f}}</p>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border-top: 1px solid #e2e8f0; padding-top: 16px;">
                                <p style="margin: 0; color: #94a3b8; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;">{{instructions_title}}</p>
                                <p style="margin: 8px 0 0 0; color: #334155; font-size: 13px; line-height: 1.6;">{{instructions_text}}</p>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- 3. Directions & Map (Hidden on Delivery) -->
                <div class="map-container">
                    <h3 style="color: #0f172a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 800; margin-bottom: 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Directions to Warehouse</h3>
                    
                    <p style="color: #475569; font-size: 13px; line-height: 1.6; margin-bottom: 16px;">
                        Arrive at Waipahu Commercial Center. Enter one-way drive in lane and continue towards the back warehouses. Make a left and continue down towards end of driveway. Destination is on right with roll up door #203.
                    </p>

                    <!-- EMBEDDED MAP IMAGE -->
                    <a href="https://www.google.com/maps/search/?api=1&query=Waipahu+Commercial+Center+94-150+Leoleo+St+%23203+Waipahu+HI+96797" target="_blank" style="display: block;">
                         <img src="data:image/png;base64,{{MAP_B64}}" style="width: 100%; height: auto; display: block;" alt="Map to Waipahu Warehouse" />
                    </a>
                </div>

                <div style="margin-top: 24px; text-align: center;">
                     <p style="color: #f59e0b; font-size: 12px; font-weight: 500; background-color: #fffbeb; padding: 12px; border-radius: 4px; display: inline-block;">
                        {{warning_text}}
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
                    &copy; {{datetime.now().year}} Affordable Home A/C. All rights reserved.
                </p>
            </div>
        </div>
        <div style="height: 40px;"></div>
    </body>
    </html>
    """
    
    # Run synchronous SMTP code in thread pool
    await asyncio.get_event_loop().run_in_executor(executor, send_raw_email, to_email, subject, html_body)
'''

# Write to file
EMAIL_SERVICE_PATH.write_text(EMAIL_CONTENT_TEMPLATE, encoding="utf-8")
print(f"✅ Re-generated email.py with Customer Info Support.")
