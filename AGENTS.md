# SOVEREIGN AGENT & SWARM REGISTRY (AGENTS.md)

> **Master Projects Brain Version**: `2.7.0-SOVEREIGN` • **Active Epoch**: `EPOCH 21 (October 20, 2026)`  
> **Swarm Topology**: `10 Category Sub-Masters` • `40 Specialized Satellite Agents` • `50 SOP Dossiers` • `55 Neural Synapses`

This document defines the agent architecture, roles, execution protocols, and operational guardrails for all AI agents and subagents operating within the Affordable Home A/C codebase.

---

## 1. SOVEREIGN MASTER & FLEET STRUCTURE

- **Sovereign Master (`2.7.0-SOVEREIGN`)**: Central cognitive intelligence overseeing all autonomous operations, cross-session learning (`TRACKER` protocol), and 55 neural synapses.
- **Category Sub-Masters (10)**: Autonomous domain supervisors governing specific functional areas.
- **Specialized Satellite Agents (40)**: On-demand diagnostic and execution units (0% background idle CPU burn; multi-worker Redis pub/sub synchronized across 4 Uvicorn processes).
- **Core Operational Mandates**:
  - **100% LG & GE Window AC & Window AC Cleaning Focus**: `101` canonical routes (`85` static/city + `16` product routes), 301 permanent redirects for all 9 retired legacy routes, and `16` catalog models (`$395` to `$1,200`, including `LW1222IVSM` and `GE AJCQ12AXXWA` R-32 Variable Speed Inverter).
  - **By-Appointment-First Mandate**: Zero upfront payment barriers for Window AC service, cleaning, or installation estimates (`$0 Free In-Home Estimate`).
  - **3-Row Fixed `NavbarV2` Viewport & Dropdown Armor**: Mandatory top-padding clearance (`pt-[88px] md:pt-[176px]` on `/`, `md:pt-[180px]` on 72 content/shop/city pages, `pt-20 md:pt-[192px]` on `/admin`) and solid `bg-[#060a12]` `z-[120]` dropdown surface armor.
  - **Mandatory Shop `#rebate` & Isolated `/admin` Command Deck**: `"rebate"` (`<RebateSection />`) enforced in `ShopClient.tsx`, `content.json`, and PostgreSQL `content_pages`; `/admin` Command Menu isolated below `NavbarV2` with 4 storefront tabs and zero internal `Dev OS` or `CRM Portal` links.
  - **Strict Anti-Upsell Mandate**: No accessory upsells, add-on modals, or bundle friction in checkout.

```
                                                     [ MASTER PROJECTS BRAIN v2.7.0 ]
                                                            (55 Neural Synapses)
                                                                      |
    +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
    |               |               |               |               |               |               |               |               |               |               |
[Infrastructure] [Cybersecurity] [Commerce]      [Growth & SEO]  [Customer & CRM] [Deployment QA] [SERP Acq.]     [Conversion]    [Creative Studio] [Exec Reporting]
  (4 Agents)      (4 Agents)     (4 Agents)        (7 Agents)      (3 Agents)       (4 Agents)     (3 Agents)       (4 Agents)       (4 Agents)       (3 Agents)
```

---

## 2. SUB-MASTER & 40-AGENT SPECIFICATIONS (`v2.7.0-EPOCH-21`)

### Sub-Master 1: Infrastructure & Storage (`submaster_infrastructure`)
- **Scope**: Bare-metal VPS health (`31.220.53.132`), 7-container Docker lifecycle, PostgreSQL 16 connection pools & `content_pages` JSONB parity (including mandatory `shop` `#rebate`), and zero-disk-bloat retention policies.
- **Agents**:
  - `agent_host_sentinel`: Monitors VPS CPU, RAM headroom, NVMe disk saturation (< 80%), UFW firewall, and Let's Encrypt SSL certificates.
  - `agent_container_sentinel`: Supervises all 7 core containers (`prod-api`, `prod-dev-os`, `prod-web`, `prod-db`, `prod-redis`, `ahac-crm-web`, `ahac-crm-api`), `127.0.0.1` loopback bindings, and 4 Uvicorn workers.
  - `agent_db_guardian`: Validates PostgreSQL 16 connection pool latency (< 5ms), daily backup snapshots, 16-model catalog row integrity, and live `content_pages` `shop` `#rebate` JSONB synchronization.
  - `agent_storage_sentinel`: Enforces Docker log caps (`10m` x `3`), Redis 500-event ring buffer limits, and 14-day rolling audit pruning (`0.00%` storage leak risk).

### Sub-Master 2: Cybersecurity & Compliance (`submaster_security_compliance`)
- **Scope**: Zero-trust HMAC authentication, pre-push secret detection, immutable audit trails, air-tight local perimeter defense (`0` inbound workstation reach), storefront `/admin` Command Deck isolation, and CEO Email Shield routing.
- **Agents**:
  - `agent_security_shield`: Enforces loopback port isolation, SHA-256 HMAC master authentication, client bundle sanitization, and verifies zero internal `CRM Portal` or `Dev OS` links exist in the storefront `/admin` Command Menu.
  - `agent_commit_sentinel`: Scans git diffs and commits via `scripts/scan-secrets.ps1` for exposed API keys, Stripe `sk_live` tokens, and credentials.
  - `agent_compliance_auditor`: Manages 14-day rolling PostgreSQL audit logs, PII masking, floor drop-cloth legal grounding, and verifies production notifications route to `brian@affordablehome-ac.com` with `irasmussenjobs@gmail.com` on BCC (and exclusively to `irasmussenjobs@gmail.com` in staging/test).
  - `agent_perimeter_auditor`: Mathematically validates `0` inbound server-to-workstation reach (100% client-initiated outbound HTTPS pull/push).

### Sub-Master 3: Commerce & Telemetry (`submaster_commerce_telemetry`)
- **Scope**: 4-funnel Window AC telemetry, appointment velocity, live homepage & warehouse stock synchronization, Stripe payments & 4.712% Oahu GET tax, CRM multi-stage invoice guardrails, and 16-model catalog specification fidelity.
- **Agents**:
  - `agent_funnel_telemetry`: Ingests micro-conversion events across all 4 dedicated Window AC funnels (Warehouse Pickup/Delivery, Window AC Installation, Window AC Cleaning, Clean-vs-Replace Assessment).
  - `agent_cro_optimizer`: Audits zero-upfront payment velocity, mobile thumb-zone layout, always-visible product `Edit`/`Delete` buttons in `/admin`, and live `/api/v1/products` (`cache: 'no-store'`) stock synchronization across `HomeFeaturedInventory` and `WarehouseInventoryGrid`.
  - `agent_revenue_reconciler`: Reconciles Stripe charges, customer receipts, 4.712% Oahu GET tax, and CRM multi-stage invoice `depositPaidCents` vs `balanceDueCents` fresh Stripe Checkout Session guardrails.
  - `agent_catalog_auditor`: Audits all 16 LG & GE catalog models (`$395`–`$1,200`), verifying `LW1222IVSM` & `GE AJCQ12AXXWA` R-32 Inverter specs, AHAM + Island Dual-Sizing, 16/16 factory PDFs, 16/16 2x Retina WebP mobile spec viewers, and non-destructive `stock`/price preservation during reseeds.

### Sub-Master 4: Growth & Market Grounding (`submaster_growth_grounding`)
- **Scope**: Search engine visibility across `101` canonical Window AC routes, 301 permanent redirects for retired legacy routes, 22-city Oahu coverage, HECO `44.2¢/kWh` energy economics, and mandatory Shop `#rebate` (`$45` Hawaii Energy Rebate) architecture.
- **Agents**:
  - `agent_seo_metadata`: Audits HTML/XML sitemaps, canonical tags, 22 Oahu city landing pages across `101` canonical routes, and 301 permanent redirects for all 9 retired mini-split/central AC routes.
  - `agent_oahu_grounding`: Calibrates single-wall redwood & jalousie heat-load sizing, coastal salt-air protection, HECO `~44.2¢/kWh` rates, and grounds dedicated 208/230V electrical work to licensed electrical subcontractors.
  - `agent_market_research`: Benchmarks Waipahu warehouse-direct pricing (`$395`–`$1,200`) and `$0 Free In-Home Estimate` advantages while enforcing respectful brand reframing (zero competitor bashing or barge fearmongering) and homepage comparison visual checkmarks.
  - `agent_heco_rebate_strategist`: Anchors `$45` Hawaii Energy Window AC rebate messaging (`$424.32/yr` HECO savings) and verifies `"rebate"` (`<RebateSection />`) is active in `ShopClient.tsx`, `content.json`, PostgreSQL `content_pages`, and `NavbarV2` (`/shop#rebate`).
  - `agent_gsc_ga4_analytics`: Monitors Google Search Console & GA4 telemetry across all 101 canonical Window AC routes.
  - `agent_schema_metadata_engine`: Validates JSON-LD rich snippets (`Product`, `HVACBusiness`, `LocalBusiness`, `FAQPage`, `AggregateRating` `4.9★` across `142` reviews) grounded in `Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005`.
  - `agent_high_intent_planner`: Optimizes high-converting Window AC topical silos (including `/shop/ge-built-in-wall-ac-oahu`, `/clean-vs-replace-window-ac`, `/window-ac-installation`, `/ac-cleaning-oahu`) and cross-funnel bridges.

### Sub-Master 5: Customer Operations & CRM (`submaster_crm_operations`)
- **Scope**: Intake dispatch, By-Appointment-First lead qualification, Waipahu warehouse pickup staging, normalized Window AC `crm_products`, and seasonal Window AC cleaning lifecycle recalls.
- **Agents**:
  - `agent_crm_dispatch`: Triages incoming appointment leads, enforces By-Appointment-First phone contact, tracks Waipahu warehouse pickup orders, and verifies dispatch notifications route to `brian@affordablehome-ac.com` with `irasmussenjobs@gmail.com` BCC.
  - `agent_customer_lifecycle`: Automates 6-month and 12-month post-service Window AC coil cleaning & antimicrobial pan treatment reminders and tracks 1-year warranty compliance.
  - `agent_intake_triage`: Analyzes Window AC symptom reports (musty odor, warm air, ice buildup, blinking filter light, 26" wall sleeve rust) to route between Waipahu Warehouse Direct Replacement and Window AC Cleaning/Installation dispatch.

### Sub-Master 6: Deployment & Quality Swarm (`submaster_deployment_quality`)
- **Scope**: Pre-flight checks, 101-route build QA, 3-row fixed `NavbarV2` viewport clearance across all 74 `page.tsx` routes, solid dropdown & `/admin` UI armor, and 3D spatial caliper graphics.
- **Agents**:
  - `agent_deployment_guardian`: Coordinates zero-downtime Docker deployments and Nginx syntax checks on Hostinger VPS.
  - `agent_build_qa`: Verifies zero-error TypeScript compilation, Next.js static/dynamic bundling across `101` canonical routes, and 3-row fixed `NavbarV2` top-padding clearance (`pt-[88px] md:pt-[176px]..[192px]`) across all 74 `page.tsx` files.
  - `agent_regression_sentinel`: Validates By-Appointment-First rules, floor drop-cloth clauses, solid `bg-[#060a12]` `z-[120]` `Shop Window AC` dropdown armor (zero `/98` opacity bleed-through), and isolated `/admin` Command Menu positioning (`sticky top-[72px] md:top-[168px]`).
  - `agent_spatial_visualizer`: Supervises Blender 4.1 headless raytracing, PIL caliper overlays, 16 isometric fit cutaways (`product_{id}_fit_cutaway.webp`), 16 factory PDF spec sheets, and 16 2x Retina WebP mobile spec sheet viewers.

### Sub-Master 7: SERP & Intent Acquisition (`submaster_serp_acquisition`)
- **Scope**: 100% Window AC & Window AC Cleaning search query intent harvesting, SERP snippet CTR optimization, and 16-model Google Merchant feeds.
- **Agents**:
  - `agent_serp_intent_harvester`: Analyzes high-intent Oahu Window AC, 26" wall sleeve, jalousie installation, and mold cleaning search queries across 22 city pages with zero legacy mini-split drift.
  - `agent_ctr_title_craftsman`: Formulates click-optimized Window AC title tags (`${city} Window AC Sales, Installation & Cleaning | $0 Estimate | (808) 488-1111`), price anchors, and phone hotlines.
  - `agent_merchant_feed_sentinel`: Audits Google Merchant XML feed and Product JSON-LD schema (`validFrom`, `priceValidUntil`, single `aggregateRating`) across all 16 LG & GE models (including `AJCQ12AXXWA`).

### Sub-Master 8: Frictionless Conversion Velocity (`submaster_conversion_velocity`)
- **Scope**: Mobile checkout unblocking, 1-tap mobile wallets across storefront & CRM invoices, buyer reassurance, solid dropdown & horizontal pill navigation ergonomics, and Core Web Vitals.
- **Agents**:
  - `agent_mobile_checkout_sentinel`: Validates 1-tap Apple Pay, Google Pay, and Stripe Link via Dynamic Payment Methods across storefront checkout and CRM multi-stage invoice sessions.
  - `agent_trust_authority_grounder`: Embeds `Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005`, 1-year manufacturer warranty, and floor drop-cloth reassurance across checkout and footers with zero legacy license strings.
  - `agent_zero_friction_navigator`: Ensures zero checkout dead-ends, strict anti-upsell compliance, solid `bg-[#060a12]` `z-[120]` `Shop Window AC` dropdown armor, `.scrollbar-none` / `.no-scrollbar` horizontal pill tracks, and 1-tap phone bridges.
  - `agent_speed_core_vital_sentinel`: Enforces mobile sub-100ms response, zero CLS (`0.00`), universal zero-cache headers on dynamic routes, and 74/74 `page.tsx` fixed-header viewport clearance.

### Sub-Master 9: Creative AI & Spatial Media Studio (`submaster_creative_studio`)
- **Scope**: Local ComfyUI RTX 4090 orchestration, Oahu customer portrait matrices, 142-review Window AC purity, 3D review medallions, 3-column `ReviewsPavilion` desktop grid, and sub-80KB WebP optimization.
- **Agents**:
  - `agent_comfyui_bridge`: Manages workstation RTX 4090 GPU (24GB VRAM) and ComfyUI API queue at `127.0.0.1:8188` with zero-broken-image SVG fallback protection.
  - `agent_avatar_portrait_crafter`: Synthesizes demographic prompt matrices for authentic Oahu homeowner portraits and verifies all 142 customer reviews across `apps/web` and `apps/api` carry 100% Window AC & Window AC Cleaning service tags.
  - `agent_trust_medallion_forge`: Generates 3D golden review medallions, Waipahu warehouse proof, and `Est. 2005` shields.
  - `agent_asset_optimizer_sentinel`: Post-processes outputs (< 80KB WebP, zero CLS bounds), verifies 16 2x Retina WebP spec sheets, and enforces full-width 3-column desktop card alignment (`md:w-full md:max-w-none h-full`) in `ReviewsPavilion`.

### Sub-Master 10: Executive Analytics & Monthly Intelligence (`submaster_executive_reporting`)
- **Scope**: Zero-dependency native Python `csv` analytics ingestion, 100% Window AC 3rd-grade executive SEO synthesis, publication-ready multi-format document compiling (`.docx`, `.html`, `.md`), and zero-billing pure intelligence.
- **Agents**:
  - `agent_report_ingestor`: Ingests Search Console ZIP archives and GA4 snapshots using native Python `csv` (zero `pandas` dependency) and normalizes queries and clicks.
  - `agent_narrative_crafter`: Crafts plain-English, 3rd-grade reading level executive summaries, Big Wins, and Action Plans focused 100% on LG & GE Window ACs and Window AC Cleaning.
  - `agent_document_forge`: Compiles publication-ready Word documents (`.docx` via `python-docx>=1.1.2`), styled HTML presentations (`.html`), and source Markdown (`.md`) across `_analytics_data`.

---

## 3. CLI BRIDGE EXECUTION CHEATSHEET

The local PowerShell CLI bridge (`.\scripts\dev-os.ps1`) allows immediate interaction with the server fleet:

```powershell
# Fleet Health & Tree
.\scripts\dev-os.ps1 status                  # Query all 40 agents' lifecycle and last run
.\scripts\dev-os.ps1 tree                    # Display hierarchical agent tree (10 Sub-Masters, 40 Agents)
.\scripts\dev-os.ps1 inspect <agent_id>      # Deep inspect an individual agent synapse

# On-Demand Execution
.\scripts\dev-os.ps1 run-agent <agent_id>    # Trigger a single satellite agent (40 available)
.\scripts\dev-os.ps1 run-submaster <id>      # Execute an entire category sub-master suite (10 available)
.\scripts\dev-os.ps1 run-fleet               # Sequentially execute all 40 agents

# Executive Monthly Analytics & SEO Reports
.\scripts\dev-os.ps1 report-list             # List all monthly executive reports (.docx, .html, .md)
.\scripts\dev-os.ps1 report-generate <month> # Synthesize 3rd-grade executive report

# Master Brain & Continuous Learning
.\scripts\dev-os.ps1 brain                   # Query Master Brain v2.7.0 status & live cognitive thoughts
.\scripts\dev-os.ps1 brain-sync "Directive"  # Push strategic directive to Master Brain
.\scripts\dev-os.ps1 session-sync "Summary"  # Push session learnings and milestones
.\scripts\dev-os.ps1 inject-history          # Re-energize brain with all 21 chronological epochs

# Deployment Swarm & Security
.\scripts\dev-os.ps1 verify-live             # Execute 3-stage live deployment swarm check
.\scripts\dev-os.ps1 scan-secrets            # Run local git repository secret scanner
```
