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
    c.drawString(0.5*inch, height - 0.9*inch, "94-150 Leoleo St. #203")
    c.drawString(0.5*inch, height - 1.05*inch, "Waipahu, HI 96797")
    c.drawString(0.5*inch, height - 1.2*inch, "Phone: (808) 488-1111 • Waipahu Warehouse Direct")

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
        name = (item.get('name') or item.get('description') or 'AC Unit') if isinstance(item, dict) else getattr(item, 'name', 'AC Unit')
        qty = int((item.get('quantity', 1) if isinstance(item, dict) else getattr(item, 'quantity', 1)) or 1)
        raw_price = item.get('price') if isinstance(item, dict) else getattr(item, 'price', None)
        amount_total = item.get('amount_total') if isinstance(item, dict) else getattr(item, 'amount_total', None)

        if amount_total is not None and amount_total > 0:
            line_val = float(amount_total) / 100.0
            unit_val = line_val / max(1, qty)
            unit_price = f"${unit_val:,.2f}"
            line_total = f"${line_val:,.2f}"
        elif raw_price is not None and raw_price > 0:
            unit_val = float(raw_price)
            line_val = unit_val * qty
            unit_price = f"${unit_val:,.2f}"
            line_total = f"${line_val:,.2f}"
        else:
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
    c.drawCentredString(width/2, 1*inch, "Thank you for your business! • Waipahu Warehouse Direct • Insured Oahu Cooling Specialists")
    c.drawCentredString(width/2, 0.85*inch, "Questions? Contact Waipahu Dispatch at (808) 488-1111 or office@affordablehome-ac.com")

    c.showPage()
    c.save()

    buffer.seek(0)
    return buffer.read()
