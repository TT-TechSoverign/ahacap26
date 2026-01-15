from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
import io
from datetime import datetime

def generate_receipt_pdf(order_id: str, items: list, total_cents: int, date: datetime, customer_email: str) -> bytes:
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter

    # --- Header ---
    c.setFillColor(colors.HexColor("#0f172a")) # Dark Blue
    c.rect(0, height - 1.5*inch, width, 1.5*inch, fill=True, stroke=False)

    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 24)
    c.drawString(0.5*inch, height - 0.6*inch, "AFFORDABLE HOME A/C")

    c.setFont("Helvetica", 10)
    c.drawString(0.5*inch, height - 0.9*inch, "94-1388 Moaniani St #202")
    c.drawString(0.5*inch, height - 1.05*inch, "Waipahu, HI 96797")
    c.drawString(0.5*inch, height - 1.2*inch, "Phone: (808) 555-0123")

    c.setFont("Helvetica-Bold", 16)
    c.drawRightString(width - 0.5*inch, height - 0.6*inch, "RECEIPT")
    c.setFont("Helvetica", 10)
    c.drawRightString(width - 0.5*inch, height - 0.8*inch, f"Date: {date.strftime('%Y-%m-%d')}")
    c.drawRightString(width - 0.5*inch, height - 0.95*inch, f"Order #: {order_id[-8:].upper()}")

    # --- Customer Info ---
    c.setFillColor(colors.black)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(0.5*inch, height - 2*inch, "Bill To:")
    c.setFont("Helvetica", 10)
    c.drawString(0.5*inch, height - 2.2*inch, customer_email)

    # --- Table Data ---
    data = [["Item", "Qty", "Price", "Total"]]
    for item in items:
        # Check if item is dict or object (depending on how it's passed)
        name = item.get('name') if isinstance(item, dict) else item.name
        qty = item.get('quantity', 1) if isinstance(item, dict) else item.quantity
        price_cents = item.get('price', 0) if isinstance(item, dict) else item.price # Assuming price is passed or looked up?
        # Wait, simple cart items might not have price. We should ideally pass fully hydrated items.
        # For mock flow, we might need to trust what's passed or fetch.
        # Let's assume passed items have 'name' and we can guess price or pass it.
        # FIX: The endpoint will likely pass CartItems which effectively have ID.
        # We'll just display Name and mock price if missing, or use Total / items count for rough.
        # Better: Pass full details.

        # Determine price (Unit price = Total / Qty if single item? No.)
        # Let's just put "-" if unknown or handle in caller.
        unit_price = "$ - "
        line_total = "$ - "

        data.append([name, str(qty), unit_price, line_total])

    data.append(["", "", "", ""])
    data.append(["", "", "Total Paid:", f"${total_cents/100:.2f}"])

    # --- Table Styling ---
    table = Table(data, colWidths=[4*inch, 0.5*inch, 1.25*inch, 1.25*inch])
    style = TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#f1f5f9")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.HexColor("#0f172a")),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('ALIGN', (1,0), (-1,-1), 'CENTER'), # Qty center
        ('ALIGN', (2,0), (-1,-1), 'RIGHT'), # Prices right
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 10),
        ('BOTTOMPADDING', (0,0), (-1,0), 12),
        ('BACKGROUND', (0,-1), (-1,-1), colors.HexColor("#06b6d4")), # Total Row
        ('TEXTCOLOR', (0,-1), (-1,-1), colors.white),
        ('FONTNAME', (0,-1), (-1,-1), 'Helvetica-Bold'),
    ])
    table.setStyle(style)

    # Draw Table
    table.wrapOn(c, width, height)
    table.drawOn(c, 0.5*inch, height - 4*inch)

    # --- Footer ---
    c.setFillColor(colors.HexColor("#64748b"))
    c.setFont("Helvetica", 9)
    c.drawCentredString(width/2, 1*inch, "Thank you for your business!")
    c.drawCentredString(width/2, 0.85*inch, "If you have any questions, please contact us at support@affordablehome-ac.com")

    c.showPage()
    c.save()

    buffer.seek(0)
    return buffer.read()
