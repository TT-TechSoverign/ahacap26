---
name: ahac-monthly-executive-billing-and-seo
description: >-
  Use this skill when the user asks to generate monthly invoice line items, retainer descriptions,
  or executive billing emails for CEO Brian Borges (Affordable Home A/C), or when ingesting Google Search Console
  and GA4 data in _analytics_data to compile monthly CEO SEO & Traffic Reports (.docx, .html, .md).
---

# AHAC Monthly Executive Billing, Retainer Line Items & CEO SEO Reports Runbook

## 1. Critical Rule: 100% Plain-English Executive Language for CEO Brian Borges
When generating invoice line items, descriptions, or emails for **Brian Borges (`brian@affordablehome-ac.com`, Affordable Home A/C, 94-150 Leoleo St #203, Waipahu, HI 96797)**:
- **ZERO Coding or Technical Jargon**: Never include file names (`page.tsx`, `robots.ts`), React component tags (`<WindowAcQuickShop />`, `NavbarV2`), hex codes (`#060a12`), or framework jargon (`SSR`, `JSON-LD`, `Node.js`, `FastAPI`, `PostgreSQL`, `no-store`) in Brian's invoice or email.
- **100% Business & Sales Framing**: Frame every bullet around **LG & GE Window A/C unit sales ($395–$1,200)**, **Window A/C Cleaning & Installation bookings ($0 Free In-Home Estimate)**, **Google Search clicks/impressions at $0 Ad Spend**, **live Waipahu warehouse stock accuracy**, **easy mobile checkout**, and **24/7 website uptime & security**.

## 2. Exact 5-Row Monthly Retainer Invoice Template (`ITAI RASMUSSEN` -> `Brian Borges`)
Every 1st/2nd of the month, format the retainer invoice into these **exact 5 line items**:

1. **Line Item 1 (`QTY: 1` | `RATE: $1,500.00` | `AMOUNT: $1,500.00`)**:
   - **Title**: `Monthly Retainer - (Infrastructure, SEO Maintenance) - <MONTH> <YEAR>`
   - **Description**: One concise, plain-English paragraph summarizing the past month's website management, Google search growth, online store updates, and 24/7 security.
2. **Line Item 2 (`QTY: 1` | `RATE: $0.00` | `AMOUNT: $0.00`)**:
   - **Title**: `Search Engine & Local SEO`
   - **Description**:
     - `<Previous Month> Accomplishments & Delivered Wins:` (4 bullet points starting with `• Title: Description`)
     - `Target Goals for <Current Month> (Next Month Execution):` (3 bullet points starting with `• Title: Description`)
3. **Line Item 3 (`QTY: 1` | `RATE: $0.00` | `AMOUNT: $0.00`)**:
   - **Title**: `Infrastructure Security, Upkeep & Zero-Downtime Reliability`
   - **Description**:
     - `<Previous Month> Accomplishments & Delivered Upgrades:` (4 bullet points)
     - `<Current Month> Ongoing Upkeep & Execution Goals:` (3 bullet points)
4. **Line Item 4 (`QTY: 1` | `RATE: $0.00` | `AMOUNT: $0.00`)**:
   - **Title**: `Conversion Rate Optimization & Administrative Ecosystem Upgrades`
   - **Description**:
     - `<Previous Month> Accomplishments & Delivered Upgrades:` (4 bullet points)
     - `<Current Month> Ongoing Upkeep & Execution Goals:` (3 bullet points)
5. **Line Item 5 (`QTY: 1` | `RATE: $0.00` | `AMOUNT: $0.00`)**:
   - **Title**: `Data Analytics, Conversion Tracking & Stripe Reconciliation`
   - **Description**:
     - `<Previous Month> Accomplishments & Delivered Upgrades:` (4 bullet points)
     - `<Current Month> Ongoing Upkeep & Execution Goals:` (3 bullet points)
- **Standard Retainer Totals**: Subtotal `$1,500.00` + Hawaii GET (`4.71%`: `$70.65`) = **`$1,570.65` Total** (plus any `Straight - On-Site` field hours at `$60.00/hr` if applicable).

## 3. Matching Executive Gmail Template for Brian
- **Subject**: `<Previous Month> <Year> SEO Report & Invoice #<InvoiceNo> (<Current Month> <Year> Retainer)`
- **Body**:
  - Greeting (`Hi Brian,`)
  - Opening sentence stating the Invoice #, retainer amount (`$1,500.00` / `$1,570.65` with Hawaii GET), and attached Monthly SEO & Website Performance Report.
  - 3 crisp, plain-English bullet points summarizing: (1) Window A/C store & catalog improvements, (2) Verified Google Search & shopper traffic growth at `$0` ad spend, and (3) Live Waipahu inventory, security, and checkout reliability.
  - Closing (`Please let me know if you have any questions or when you'd like to catch up in person.` / `Mahalo, Itai Rasmussen • 808-597-7502 • irasmussenjobs@gmail.com`).

## 4. Generating Monthly CEO SEO Reports (`ReportingEngine`)
- Raw GSC & GA4 exports live in `_analytics_data/<MonthYear>/`.
- Generate `.docx`, `.html`, and `.md` reports via `ReportingEngine` (`apps/api/services/reporting_engine.py`) or `powershell -File .\scripts\dev-os.ps1 report-generate <Month> [Year]` (auto-accepts both `October 2026` and `October2026`).
