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
try:
    BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent
    LOGO_PATH = BASE_DIR / "apps" / "web" / "public" / "logo-new.png"
    if LOGO_PATH.exists():
        LOGO_B64 = base64.b64encode(LOGO_PATH.read_bytes()).decode("utf-8")
        logger.info(f"Loaded logo from {LOGO_PATH}")
    else:
        logger.warning(f"Logo not found at {LOGO_PATH}, using fallback.")
        LOGO_B64 = "" 
except Exception as e:
    logger.error(f"Failed to load logo: {e}")
    LOGO_B64 = ""

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


async def send_order_confirmation(to_email: str, order_id: str, total_cents: int, fulfillment_mode: str = "pickup", items: list = []):
    subject = f"Order Confirmation {order_id} - Affordable Home A/C"
    
    # Generate Line Items HTML
    items_html = ""
    if items:
        for item in items:
            desc = item.get('description', 'Item')
            qty = item.get('quantity', 1)
            amt = item.get('amount_total', 0) / 100
            items_html += f"""
            <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px; color: #333;">{desc}</td>
                <td style="padding: 12px; text-align: center; color: #666;">{qty}</td>
                <td style="padding: 12px; text-align: right; color: #333;">${amt:.2f}</td>
            </tr>
            """
    else:
        items_html = """
        <tr><td colspan="3" style="padding: 15px; text-align: center; color: #999;">Order details not available (Legacy order)</td></tr>
        """

    html_body = f"""
    <html>
    <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f1f5f9; padding: 20px;">
        <!-- Header -->
        <div style="background-color: #0f172a; padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0;">
            <img src="data:image/png;base64,{LOGO_B64}" style="width: 180px; height: auto; max-width: 100%;" alt="Affordable Home A/C" />
        </div>
        
        <!-- Main Content -->
        <div style="background-color: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #00bcd4; margin: 0 0 10px 0; font-size: 24px; font-weight: 700;">Order Confirmed!</h2>
                <p style="color: #64748b; margin: 0; font-size: 16px;">Order {order_id}</p>
            </div>

            <!-- Line Items -->
            <div style="background-color: #fff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; margin-bottom: 25px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <thead style="background-color: #f8fafc;">
                        <tr>
                            <th style="padding: 12px; text-align: left; color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 12px;">Item</th>
                            <th style="padding: 12px; text-align: center; color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 12px;">Qty</th>
                            <th style="padding: 12px; text-align: right; color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 12px;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items_html}
                    </tbody>
                </table>
            </div>
            
            <!-- Totals & Fulfillment -->
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <div>
                    <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Fulfillment Method</p>
                    <p style="margin: 5px 0 0 0; color: #0f172a; font-weight: 600; text-transform: capitalize; font-size: 16px;">{fulfillment_mode}</p>
                </div>
                <div style="text-align: right;">
                    <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Total Paid</p>
                    <p style="margin: 5px 0 0 0; color: #00bcd4; font-weight: 700; font-size: 20px;">${(total_cents/100):.2f}</p>
                </div>
            </div>

            <p style="color: #475569; font-size: 15px; line-height: 1.6; text-align: center; margin-bottom: 30px;">
                We have received your order. A logistics coordinator will contact you within <strong>24 business hours</strong> 
                to finalize your {fulfillment_mode} details.
            </p>
            
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
            
            <div style="text-align: center;">
                 <p style="font-size: 12px; color: #94a3b8; margin-bottom: 10px;">
                    Affordable Home A/C - Waipahu Distribution Center<br/>
                    94-150 Leoleo St. #203, Waipahu, HI 96797
                </p>
                <a href="tel:8085550123" style="color: #00bcd4; text-decoration: none; font-weight: 600; font-size: 14px;">(808) 555-0123</a>
            </div>
        </div>
        
        <div style="text-align: center; padding-top: 20px;">
             <p style="color: #cbd5e1; font-size: 11px;">&copy; {datetime.now().year} Affordable Home A/C. All rights reserved.</p>
        </div>
    </body>
    </html>
    """
    
    # Run synchronous SMTP code in thread pool
    await asyncio.get_event_loop().run_in_executor(executor, send_raw_email, to_email, subject, html_body)
