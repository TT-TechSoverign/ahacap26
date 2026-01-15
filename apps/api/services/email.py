import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging
from concurrent.futures import ThreadPoolExecutor
import asyncio

# Gmail SMTP Config (since user provided Gmail credentials)
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 465 # SSL
SMTP_USER = os.getenv("SMTP_USER", "noreply@affordablehome-ac.com")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

logger = logging.getLogger("uvicorn.error")

executor = ThreadPoolExecutor(max_workers=3)

from email.mime.application import MIMEApplication

def _send_sync(to_email: str, subject: str, html_content: str, attachment: dict = None):
    if not SMTP_PASSWORD:
        logger.warning(f"SMTP_PASSWORD not set. Mock email to {to_email}")
        return

    msg = MIMEMultipart()
    msg["From"] = f"Affordable Home A/C <{SMTP_USER}>"
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(html_content, "html"))

    if attachment:
         part = MIMEApplication(attachment['content'], Name=attachment['filename'])
         part['Content-Disposition'] = f'attachment; filename="{attachment["filename"]}"'
         msg.attach(part)

    try:
        print(f"DEBUG: Connecting to SMTP {SMTP_SERVER}...")
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(SMTP_USER, to_email, msg.as_string())
        print(f"DEBUG: Email sent successfully to {to_email}")
        logger.info(f"Email sent to {to_email}")
    except Exception as e:
        print(f"DEBUG: SMTP Failed: {e}")
        logger.error(f"Failed to send email to {to_email}: {e}")

async def send_order_confirmation(to_email: str, order_id: str, total_cents: int, pdf_bytes: bytes = None):
    """
    Sends order confirmation email asynchronously (Thread Pool).
    sends to:
    1. Customer (to_email)
    2. Owner (airperfection.itai@gmail.com)
    3. Mock Customer (nativehawaiian808@gmail.com)
    """
    subject = f"Order Confirmation #{order_id[-8:].upper()}"

    # Simple HTML Template
    html = f"""
    <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
        <h1 style="color: #00AEEF; text-transform: uppercase;">Order Confirmed</h1>
        <p>Aloha,</p>
        <p>Thank you for your order with Affordable Home A/C. We have received your payment.</p>

        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #666;">ORDER ID</p>
            <p style="margin: 5px 0 0; font-weight: bold; font-size: 18px;">{order_id}</p>
        </div>

        <p><strong>Total Paid:</strong> ${total_cents / 100:.2f}</p>

        <h3>Next Steps</h3>
        <p> Please visit our warehouse in Waipahu for pickup. Bring this email and your ID.</p>
        <p><strong>Address:</strong><br/>
        94-1388 Moaniani St #202<br/>
        Waipahu, HI 96797</p>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="font-size: 12px; color: #999;">If you have any questions, reply to this email.</p>
    </div>
    """

    attachment = None
    if pdf_bytes:
        attachment = {
            "filename": f"Receipt_{order_id[-8:].upper()}.pdf",
            "content": pdf_bytes
        }

    loop = asyncio.get_event_loop()

    # 1. Send to Customer
    await loop.run_in_executor(executor, _send_sync, to_email, subject, html, attachment)

    # 2. Send to Owner
    await loop.run_in_executor(executor, _send_sync, "airperfection.itai@gmail.com", f"[NEW ORDER] {subject}", html, attachment)

    # 3. Send to Mock Customer
    await loop.run_in_executor(executor, _send_sync, "nativehawaiian808@gmail.com", f"[MOCK COPY] {subject}", html, attachment)
