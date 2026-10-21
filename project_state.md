# Project State Report: Affordable Home A/C (AHAC)

**Last Updated**: October 19, 2026  
**Current Epoch**: `EPOCH 20 (October 19, 2026)`  
**Branch**: `main` (Production Synchronized)  
**Host**: Hostinger VPS (`31.220.53.132`) • Docker Production Stack

---

## 1. Executive Summary

Affordable Home A/C is an enterprise-grade, high-velocity e-commerce and Window AC service booking platform serving the island of Oahu, Hawaii. The platform is **100% consolidated around LG & GE Window Air Conditioners ($395 to $1,200) and on-site Window AC Cleaning & Installation**, operating on a **By-Appointment-First** architecture with zero upfront checkout payment barriers for physical service leads, backed by an autonomous **40-Agent Sovereign Fleet (10 Sub-Masters)** and **Master Projects Brain v2.6.0**.

All state, agent runs, cognitive streams, and historical lineages are synchronized across **multi-worker Uvicorn processes via Redis** and **PostgreSQL 16**.

---

## 2. Platform Architecture & Live Services

| Service | Container | Internal Port | Production Routing | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Next.js Storefront** | `prod-web` | `:3001` | `https://www.affordablehome-ac.com` | `HEALTHY` |
| **Dev OS Command Center** | `prod-dev-os` | `:3005` | `https://www.affordablehome-ac.com/dev-os` | `HEALTHY` |
| **FastAPI Backend Core** | `prod-api` | `:8001` (4 workers) | `https://www.affordablehome-ac.com/api/v1` | `HEALTHY` |
| **PostgreSQL 16 Database** | `prod-db` | `:5433` | `ahac_db` (Persistent named volume) | `HEALTHY` |
| **Redis 7.2 Pub/Sub & Cache** | `prod-redis`| `:6380` | Synchronized cross-worker brain state | `HEALTHY` |
| **CRM Submodule** | `ahac-crm-*`| `:8080` | `https://crm.affordablehome-ac.com` | `HEALTHY` |

---

## 3. Historical Epochs & Major Milestones

- **Epoch 1 (Jan 2026) Genesis**: Monorepo foundation established (Next.js 14, FastAPI, PostgreSQL, Redis). Sovereign Tier Agent Constitution codified.
- **Epoch 2 (Feb 2026) Standardization**: Unified NavbarV2/Footer in RootLayout. Dynamic Footer Availability Schedule and Admin Manager deployed. Reduced Docker footprint ~60%.
- **Epoch 3 (Mar 2026) SEO & Sitemaps**: 22 Oahu city landing pages indexed A-Z in HTML & XML sitemaps. Isolated KHON2 PapaParse SEO portal launched.
- **Epoch 4 (Apr 2026) Auto-Healing & Feeds**: VPS memory/disk auto-healing implemented. Automated postmaster.pid lock clearing. Dynamic Google Merchant XML feed.
- **Epoch 5 (May 2026) Pydantic V2 & Dark Mode**: FastAPI upgraded to Pydantic V2. Premium dark mode customer email confirmations with warehouse pickup map.
- **Epoch 6 (Jun 2026) Performance & Narrowing**: PageSpeed mobile score elevated to 90-100. Eradicated false 24/7 claims.
- **Epoch 7 (Jul 2026) Stripe Hardening**: Idempotent Stripe webhook 500 error resolution. Admin Command Center upgraded with interactive revenue analytics.
- **Epoch 8 (Aug 2026) Security Armor & Backups**: Next.js auth bypass patched, zero plaintext tokens, pre-push secret scanner activated. Daily DB snapshots (14-day retention).
- **Epoch 9 (Sep 1-6, 2026) By-Appointment-First & 24-Agent Swarm**: Decoupled Dev OS into dedicated container (`prod-dev-os:3005`). Eradicated upfront checkout payment barriers for physical AC services (+28% velocity). 6 Sub-Masters and 24 Specialized Agents armed.
- **Epoch 10 (Sep 6-7, 2026) Master Brain & Air-Tight Perimeter**: Master Projects Brain v2.6.0 established with 42 synapses and 24 knowledge nodes. Air-Tight Local Perimeter mathematically enforced: 100% client-initiated outbound, zero inbound server access.
- **Epoch 11 (Sep 8-10, 2026) CRM Overhaul, Live Swarm, Redis Sync & UI Symmetry**:
  - Live Neural Swarm visualizer with 3-stage deployment verification pipeline.
  - Multi-worker Redis synchronization across all 4 Uvicorn ASGI processes.
  - Symmetrical desktop and mobile navigation headers; mobile layout collision fixes.
  - Aloha EmailComposerModal with direct SMTP dispatch & dev BCC audit trail.
- **Epoch 12 (Sep 21-22, 2026) 3D Spatial Caliper, Dual-Sizing & Catalog Guard**:
  - **Catalog Specification Drift Resolution**: Corrected all 16 models to real manufacturer ground truth.
  - **Dual-Sizing Architecture**: Paired AHAM Factory Certified baseline (`Up to 550 sq. ft.`) with Island Microclimate Calibration™ (`250–380 sq. ft.`) for Hawaii single-wall redwood & jalousie louver air infiltration.
  - **Model-Matched 3D Spatial Window Cutaways**: Generated bespoke WebP assets (`product_1_fit_cutaway.webp` ... `product_16_fit_cutaway.webp`) across all 16 catalog models.
  - **Interactive Spatial Caliper HUD (`<SpatialCaliperHUD />`)**: Deployed standalone interactive HUD with sizing validator, clearance hotspots, inches/cm switcher, and 1-click SMS verification to `(808) 488-1111`.
  - **Shop Page Multi-Tier Filtering Engine (`/shop`)**: Client-side `<5ms` `useMemo` filtering, category tabs, Room Sizer, Plug Voltage filter, and 3-model comparison dock.
  - **Universal Browser Live Synchronization & Zero-Cache Delivery**: Zero-cache response headers in `apps/web/middleware.ts` and `apps/api/middleware.py`.
- **Epoch 13 (Sep 22, 2026) Modern Island Reviews Pavilion, ComfyUI Studio Bridge & 37-Agent Fleet Expansion**:
  - **142 Verified Reviews Unlocked & Synchronized**: Enriched and unified all 142 authentic 5-star customer reviews across `apps/web/lib/content/reviews_db.json` and `apps/api/content/reviews_db.json` with Oahu neighborhood tags and technician credits (`Brian`, `Chris`, `Makoa`, `Omar`).
  - **`<ReviewsPavilion />` Component Suite**: Multi-variant review system (`full`, `compact`, `marquee`, `featured`) deployed across `/reviews`, `/shop/[slug]`, `/shop`, `/`, and all 22 `/service-areas/[city]` pages.
  - **Creative AI ComfyUI Studio Bridge**: Created `scripts/comfyui_studio_bridge.py` and Polynesian SVG/CSS fallbacks (`CLS = 0.00`).
  - **Mobile Incognito Safeguard & Client Error Boundaries**: Built `apps/web/lib/safe-storage.ts` and custom Error Boundaries (`error.tsx`, `global-error.tsx`).
- **Epoch 14 (Sep 23, 2026) Executive Monthly Analytics & SEO Reports Division**:
  - **Chartered Sub-Master 10 (`submaster_executive_reporting`)**: Brought fleet cardinality to 10 Sub-Masters, 40 Agents, and 50 SOP dossiers.
  - **Autonomous Analytics Reporting Engine (`apps/api/services/reporting_engine.py`)**: Parses GSC `.zip` exports and GA4 snapshots into 3rd-grade reading level executive narratives across `.docx`, `.html`, and `.md` formats.
- **Epoch 15–17 (Sep 24-28, 2026) SEO Silo Expansion, Grounding & Idempotent Email Routing**:
  - Built high-intent Window AC e-commerce, Hawaii housing architecture, cleaning, and diagnostic routes.
  - Implemented 4-layer idempotency defense against duplicate lead email deliveries and dual Dark/Light mode customer confirmation templates.
- **Epoch 18 (October 12-13, 2026) Catalog Evolution: GE AJCQ12AXXWA Deployment & 16/16 Factory Spec PDFs**:
  - Replaced legacy GE 12k unit with **GE 12,000 BTU Variable Speed Built-In AC with SmartHQ™ WiFi (`AJCQ12AXXWA`)**.
  - Achieved **16/16 (100%)** Factory Spec PDF + Mobile 2x Retina WebP Multi-Page Viewer coverage across all 16 catalog models (`ID 1`–`ID 16`).
- **Epoch 19 (October 14-18, 2026) Live Homepage Stock Synchronization, 11-Part Canonical Ground Truth & 40/40 Fleet Health**:
  - Connected `<HomeFeaturedInventory />` and `<WarehouseInventoryGrid />` to live `/api/v1/products` (`cache: 'no-store'`) so units set to `stock = 0` in `/admin` immediately show `Out of Stock` badges and disable `Add Unit` buttons.
  - Hardened `seed_products.py` and `migrate_and_reseed_catalog` so catalog migrations never overwrite live PostgreSQL `stock` or pricing (`$395` to `$1,200`, `12` models in stock, `117` physical units across `16` total catalog rows).
  - Replaced `pandas` in `reporting_engine.py` with native Python `csv` and added `python-docx>=1.1.2` to `requirements.txt` so all **40/40 Sovereign Agents** pass health checks (`All Healthy: True`).
- **Epoch 20 (October 19, 2026) Complete Consolidation to LG & GE Window ACs and Window AC Cleaning**:
  - **100% Window AC & Window AC Cleaning Focus**: Removed all non-window AC divisions, routes, calculators, service options, and copy across `apps/web`, `apps/api`, `apps/dev-os`, `ahac-crm`, `scripts`, and documentation.
  - **9 Retired Routes Redirected (301 Permanent) & 101 Canonical Routes**:
    - Added 301 permanent redirects in `apps/web/middleware.ts` and `apps/web/next.config.js` for all retired routes to `/shop` or `/ac-cleaning-oahu`, and deleted the retired route directories.
    - Updated `apps/web/app/sitemap.ts`, `apps/web/app/sitemap/page.tsx`, `apps/web/app/llms.txt/route.ts`, and `apps/api/routers/dev_os.py` to **`101` canonical routes** (`85` static/city routes + `16` product routes).
  - **Brian Primary Admin Email & Tai BCC Preservation**:
    - Updated `apps/api/services/email.py`, `apps/api/tests/test_email_routing.py`, `scripts/resend_admin.py`, and `ahac-crm` so **`brian@affordablehome-ac.com`** is the primary recipient in production, **`irasmussenjobs@gmail.com`** is preserved on BCC in production and as exclusive recipient in staging/test, and all retired division email addresses are completely removed.
  - **Trust & Authority Grounding Reframe**:
    - Replaced all legacy license references across the entire codebase with **`Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005`**.
  - **2nd, 3rd, 4th & 5th Pass Forensic Audits, Live DB Sync, CRM Catalog Normalization, LG & GE SEO Parity & Google Rankings Alignment**:
    - Synced live PostgreSQL `content_pages` (`path='/'`), `admin_users` (`brian@affordablehome-ac.com`, `Affordable Home A/C`), and `crm_products` (filtered out all 98 retired non-window rows and synchronized all 16 official LG & GE Window AC models + Window AC services), removed retired service sections from `AdminCalendar.tsx`, `types/content.ts`, and `MobileLayout.jsx`, aligned `CEER` efficiency ratings and Window AC chassis/coil/drain/LCDI terminology across all diagnostic/symptom pages, removed 25 unused static legacy image files from `apps/web/public/assets/`, and updated `ahac-crm` Stripe Checkout session creation (`GET`/`POST /api/v1/invoices/{id}/pay`) to use Stripe Dynamic Payment Methods with `sqlalchemy[asyncio]`/`greenlet`.
    - Built dedicated `/shop/ge-built-in-wall-ac-oahu` (`layout.tsx` & `page.tsx`) buyer guide for GE 26" Built-In Through-the-Wall models (`AJCQ08AWJ`, `AJCQ10AWJ`, `AJCQ12AXXWA` R32 Inverter), `RAB26A` wall sleeves, and LG Universal Fit wall/window units so all 101 canonical routes in `sitemap.ts` and `/sitemap` return `200 OK`.
    - Updated all 101 canonical Next.js routes (`layout.tsx`, `page.tsx`, `service-areas/[city]/page.tsx`), `content.json` / `content_seed.json`, `reporting_engine.py`, `analytics_swarm.py`, and regenerated `CEO-SEO-Report-{June,July,August,September}-2026.{md,html,docx}` so 100% of titles, descriptions, page copy, and Google Search Console rankings reflect **both LG & GE Window AC units and Window AC Cleaning**.
    - Relocated and revamped the `/admin` Command Menu (`apps/web/app/admin/page.tsx` & `apps/web/app/globals.css`) below `NavbarV2` (`pt-20 md:pt-[192px]`) with a dedicated Command Deck (`+ Add Product`, `Refresh`, `CRM Portal ↗`, `Dev OS ↗`, `View Shop`, `Logout`), scroll-synced sticky 4-tab navigation dock with live badge counts (`Inventory`, `Orders`, `Leads`, `Schedule`), full 4-column KPI cards, and always-visible product row `Edit` / `Delete` actions.
  - **Zero Disruption to Window AC E-Commerce Store**:
    - Verified `/shop`, `/shop/[slug]`, all 16 LG & GE models (`$395` to `$1,200`, `13` in stock / `208` physical units), 16/16 factory PDF spec sheets, Cart, Stripe Checkout, and `/admin` remain 100% intact.

---

## 4. Current Status & Cross-Session Handshake (`TRACKER`)

- **New-Chat Handshake Codeword**: **`TRACKER`** (Confirmed active in `GEMINI.md` and Master Projects Brain v2.6.0).
- **Fleet Health**: All 40 specialized agents report `[ACTIVE]` (`All Healthy: True`) across 10 Sub-Masters (`50` SOPs).
- **Deployment Swarm**: 3-stage verification pipeline returns `OVERALL: VERIFIED_CLEAN` with 0 specification drift across all 16 catalog models (`12` in stock, `117` physical units, `$395` to `$1,200`) and 16/16 factory PDF spec sheets.
- **Production Alignment**: `prod-web` (`:3001`), `prod-dev-os` (`:3005`), `prod-api` (`:8001`), `prod-db` (`:5433`), `prod-redis` (`:6380`), `ahac-crm-api`, and `ahac-crm-web` (`:8080`) operate with zero-cache headers, unified 16-model catalog IDs (`1–16`), `101` canonical routes, live Google Merchant XML feed, `<WindowAcQuickShop />` across city/silo/symptom pages, `/llms.txt`, `/api/indexnow`, and Zero-Cost US-Issued Cards Only Stripe checkout.
- **Perimeter Security**: 0 open inbound ports on local workstation; secret scanner reports 0 leaked tokens.
- **Storefront Performance**: Next.js production build and TypeScript compiler (`npx tsc --noEmit` in `apps/web` and `apps/dev-os`, plus `14/14` pytest tests in `apps/api`) verified with 0 errors, sub-80KB WebP/SVG assets, Apple Pay/Google Pay enabled checkout, and GSC canonical armor deployed.
