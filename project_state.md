# Project State Report: Affordable Home A/C (AHAC)

**Last Updated**: October 20, 2026  
**Current Epoch**: `EPOCH 21 (October 20, 2026)`  
**Branch**: `main` (Production Synchronized)  
**Host**: Hostinger VPS (`31.220.53.132`) • Docker Production Stack

---

## 1. Executive Summary

Affordable Home A/C is an enterprise-grade, high-velocity e-commerce and Window AC service booking platform serving the island of Oahu, Hawaii. The platform is **100% consolidated around LG & GE Window Air Conditioners ($395 to $1,200) and on-site Window AC Cleaning & Installation**, operating on a **By-Appointment-First** architecture with zero upfront checkout payment barriers for physical service leads, backed by an autonomous **40-Agent Sovereign Fleet (10 Sub-Masters, 50 SOPs, 55 Neural Synapses)** and **Master Projects Brain v2.7.0-SOVEREIGN**.

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
- **Epoch 21 (October 20, 2026) Swarm Omniscience v2.7.0, 3-Row Navbar Viewport Armor, Shop `#rebate` Restoration & `/admin` Command Deck Isolation**:
  - **3-Row Fixed `NavbarV2` Viewport Clearance Across All 74 `page.tsx` Files**:
    - Upgraded top padding across `/` (`pt-[88px] md:pt-[176px]`), all 72 content/shop/city `page.tsx` routes (`md:pt-[180px]`), and `/admin` (`pt-20 md:pt-[192px]`) so zero page content or hero badges are ever occluded by the 3-row fixed `NavbarV2`.
  - **Storefront `/admin` Command Menu Revamp & Isolation**:
    - Relocated `/admin` Command Menu below `NavbarV2` (`sticky top-[72px] md:top-[168px]`) with 4 scroll-synced storefront tabs (`orders`, `products`, `availability`, `security`), 4-column KPI strip, always-visible product `Edit`/`Delete` buttons, and strict removal of internal `CRM Portal` and `Dev OS` links.
  - **`Shop Window AC` Dropdown Armor & `$45` Hawaii Energy Rebate (`#rebate`) Restoration**:
    - Replaced invalid Tailwind `bg-[#0a0f18]/98` opacity syntax on the `Shop Window AC` dropdown in `NavbarV2.tsx` with a solid `bg-[#060a12]` `z-[120]` surface and added the `$45 Hawaii Energy Rebates` (`/shop#rebate`) quick-jump link.
    - Restored `"rebate"` (`<RebateSection />`) to `shop.sections` and `shop.sectionOrder` across `ShopClient.tsx` (both default and filtered views), `content.json`, `content_seed.json`, and live PostgreSQL `content_pages` (`path='shop'`).
  - **Full Swarm Knowledge & Intelligence Upgrade (`v2.7.0-SOVEREIGN`)**:
    - Upgraded `MASTER_BRAIN_STATE` (`2.7.0-SOVEREIGN`, `55` neural synapses), all `10` Category Sub-Masters (`SUBMASTER_REGISTRY`), all `40` Specialized Agents (`AGENT_REGISTRY` & live `run_agent_*` diagnostic functions with `epoch_intelligence: "v2.7.0-EPOCH-21"`), and all `50` SOP dossiers (`apps/api/routers/dev_os_sops.py` & `apps/dev-os/app/sopsData.ts`) with live runtime verification of all Epoch 20–21 mandates.
  - **Google Helpful Content / Anti-AI-Spam E-E-A-T Armor, Entity Action Graph & Zero-404 Canonical Link Audit**:
    - Upgraded root `layout.tsx`, `shop/layout.tsx`, `ac-cleaning-oahu/layout.tsx`, and all 22 `service-areas/[city]/page.tsx` routes with `["HVACBusiness", "Store"]` entity graphs, `OrderAction` (`https://www.affordablehome-ac.com/shop`), `ReserveAction` (`https://www.affordablehome-ac.com/ac-cleaning-oahu` & `/window-ac-installation`), `foundingDate: "2005"`, `slogan: "Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005"`, and `$0 Free In-Home Estimate` offer catalogs (purging fabricated flat-rate package prices from `ac-cleaning-oahu/layout.tsx` and `layout.tsx`).
    - Replaced the duplicate FAQ block in `LocalizedSEOBody.tsx` with a First-Hand Oahu Engineering & Microclimate Dual-Sizing Matrix (`AHAM vs. Single-Wall Redwood Sq. Ft.`, exact `LG LW8022IVSM`, `LW1222IVSM`, `LW1822IVSM`, and `GE AJCQ12AXXWA` model recommendations, and HECO `~44.2¢/kWh` savings math) plus direct CTAs to `/shop` and `/ac-cleaning-oahu`.
    - Upgraded `/llms.txt` with explicit AI & Search Engine Routing Directives instructing Google AI Overviews, ChatGPT, Perplexity, and Gemini to direct all Oahu Window AC buyers to `/shop` and all Window AC cleaning inquiries to `/ac-cleaning-oahu`.
    - Fixed 7 non-canonical internal `href` links in `NavbarV2.tsx`, `LocalizedSEOBody.tsx`, `shop/page.tsx`, and `lg-dual-inverter-8000-btu-oahu/page.tsx` (`0` broken/non-canonical internal links across `apps/web`), and added 301 permanent redirects for all 6 alias paths in `middleware.ts`.
    - Built and deployed `<OahuEEATAuthorityBar />` (`apps/web/components/OahuEEATAuthorityBar.tsx`) across 67 informational, symptom, cleaning, sizing, and housing-architecture routes, injecting `TechArticle` JSON-LD (`author`, `reviewedBy`, `OrderAction`, `ReserveAction`) and visible "Who, How & Why" first-hand Oahu field verification (`Brian, Chris, Makoa & Omar — Est. 2005`, `4.9★` across `142` reviews, Waipahu Warehouse `94-150 Leoleo St. #203`).
    - Upgraded all 65 FAQ-bearing `page.tsx` routes from conditional React DOM unmounting (`openFaq === idx &&` with `useState(null)`) to always-rendered SSR HTML DOM (`block`/`hidden` classes with `useState(0)`), guaranteeing 100% of `FAQPage` JSON-LD answers are present in initial server-rendered HTML for `Googlebot` and AI crawlers.
    - Deduplicated `FAQPage` and `BreadcrumbList` JSON-LD scripts in `ac-cleaning-oahu/layout.tsx`, `ac-repair-oahu/layout.tsx`, `clean-vs-replace-window-ac/layout.tsx`, and `window-ac-installation/layout.tsx`, and purged all remaining contradictory `$175` diagnostic strings across 19 symptom/repair routes (`0` occurrences remaining) in favor of `$0 Free Clean-vs-Replace Assessment`.

---

## 4. Current Status & Cross-Session Handshake (`TRACKER`)

- **New-Chat Handshake Codeword**: **`TRACKER`** (Confirmed active in `GEMINI.md` and Master Projects Brain v2.7.0-SOVEREIGN).
- **Fleet Health**: All 40 specialized agents report `[ACTIVE]` (`All Healthy: True`, `epoch_intelligence: "v2.7.0-EPOCH-21"`) across 10 Sub-Masters (`50` SOPs, `55` Neural Synapses).
- **Deployment Swarm**: 3-stage verification pipeline returns `OVERALL: VERIFIED_CLEAN` with 0 specification drift across all 16 catalog models (`13` in stock, `208` physical units, `$395` to `$1,200`), 16/16 factory PDF spec sheets, 16/16 2x Retina WebP mobile spec viewers, 74/74 `page.tsx` fixed-header viewport clearance, and active Shop `#rebate` in code + PostgreSQL.
- **Production Alignment**: `prod-web` (`:3001`), `prod-dev-os` (`:3005`), `prod-api` (`:8001`), `prod-db` (`:5433`), `prod-redis` (`:6380`), `ahac-crm-api`, and `ahac-crm-web` (`:8080`) operate with zero-cache headers, unified 16-model catalog IDs (`1–16`), `101` canonical routes, live Google Merchant XML feed, `<WindowAcQuickShop />` across city/silo/symptom pages, `/llms.txt`, `/api/indexnow`, and Dynamic Payment Methods Stripe checkout.
- **Perimeter Security**: 0 open inbound ports on local workstation; secret scanner reports 0 leaked tokens.
- **Storefront Performance**: Next.js production build and TypeScript compiler (`npx tsc --noEmit` in `apps/web` and `apps/dev-os`, plus `15/15` pytest tests in `apps/api`) verified with 0 errors, sub-80KB WebP/SVG assets, Apple Pay/Google Pay enabled checkout, and GSC canonical armor deployed.

