# Master Swarm Architecture & Catalog (v4.0 Sovereign Edition)
================================================================

Affordable Home AC (AHAC) — Autonomous Agent Fleet & Analytics Swarm Architecture.
This document provides the authoritative, exhaustive taxonomy of the entire project
from repository root to all component files, folders, Sub-Masters, agents, and SOPs.

---

## 1. Project Directory & File System Taxonomy (Root to Leaf)

Every file and directory across this monorepo operates under the governance of the Sovereign Master Engine and its 10 Sub-Master domains:

```
ahacws26/ (Project Root)
├── AGENTS.md                                  # Sovereign Agent & Swarm Registry (10 Sub-Masters, 40 Agents)
├── GEMINI.md                                  # Sovereign Master Projects Brain Constitution (v2.6.0-SOVEREIGN)
├── agent_catalog.md                           # This document: Master Catalog & Swarm Taxonomy
├── docker-compose.prod.yml                    # Production blue/green container orchestration
├── docker-compose.yml                         # Local staging & development container topology
├── pnpm-workspace.yaml                        # Monorepo package manager boundaries
├── package.json                               # Workspace scripts & shared toolchain
│
├── _analytics_data/                           # Google Search Console & GA4 Ingestion Data Layer
│   ├── August-SEO-Report-09012026/            # GSC August 2026 performance export (Queries, Pages, Chart)
│   ├── July-SEO-Report-08022026/              # GSC July 2026 performance export
│   ├── June-SEO-Report-07012026/              # GSC June 2026 performance export
│   ├── Coverage-Drilldown-20260501/           # Google index coverage & crawl diagnostics
│   ├── Queries.csv                            # Aggregated 1,000-query opportunity dataset
│   ├── Pages.csv                              # Aggregated route impression & CTR dataset
│   └── Reports_snapshot (2).csv               # Historical keyword rank & search volume telemetry
│
├── apps/
│   ├── api/                                   # Core FastAPI Backend & Intelligence Services
│   │   ├── Dockerfile                         # Python 3.12 Alpine multi-stage hardened runner
│   │   ├── main.py                            # ASGI entrypoint, middleware, and route mounting
│   │   ├── database.py                        # Async SQLAlchemy session factory & asyncpg connection pool
│   │   ├── models.py                          # PostgreSQL relational schema (Leads, Orders, Products, Audit)
│   │   ├── schemas.py                         # Pydantic V2 serialization & validation contracts
│   │   ├── dependencies.py                    # SHA-256 HMAC tokens & Dev OS session validators
│   │   ├── cache.py                           # Redis TCP client & circular telemetry buffer
│   │   ├── routers/
│   │   │   ├── dev_os.py                      # Sovereign Master Cockpit API & 40 Agent Runners
│   │   │   ├── dev_os_sops.py                 # 50 Standard Operating Procedures (SOPs) Registry
│   │   │   ├── checkout.py                    # Stripe payment intent & session checkout endpoints
│   │   │   ├── webhooks.py                    # Stripe webhook listener & stock reservation guard
│   │   │   ├── leads.py                       # CRM intake & Oahu appointment dispatching
│   │   │   └── products.py                    # Storefront product catalog & inventory feed
│   │   └── services/
│   │       ├── analytics_swarm.py             # GSC/GA4 parser & Continuous CRO recommendation engine
│   │       ├── reporting_engine.py            # Autonomous 3rd-grade Executive Reporting Engine (.docx/.html/.md)
│   │       ├── email.py                       # Dark-mode transactional email dispatch (Admin & Customer)
│   │       ├── pdf.py                         # PDF receipt & pre-approved rebate form generator
│   │       └── reconciliation.py              # Stripe-to-Postgres order reconciliation worker
│   │
│   ├── dev-os/                                # Dev OS Autonomous Operations Cockpit (Standalone Next.js)
│   │   ├── Dockerfile                         # Node.js 18 runner (capping memory to 384MB)
│   │   ├── app/
│   │   │   ├── page.tsx                       # Master Cockpit UI, 10 Sub-Master clusters, Analytics Radar
│   │   │   ├── LiveSwarmVisualizer.tsx        # Real-time 40-Agent & 3-Stage Deployment Pipeline Visualizer
│   │   │   ├── MonthlyReportsHub.tsx          # Executive Analytics & Monthly Reports Cockpit (Key R)
│   │   │   ├── layout.tsx                     # Zero-telemetry isolated layout
│   │   │   ├── robots.ts                      # Strict noindex/nofollow exclusion for search crawlers
│   │   │   └── sopsData.ts                    # 50 Visual SOP dossiers & agent instruction data
│   │   └── public/                            # Static cockpit assets
│   │
│   └── web/                                   # Customer-Facing Storefront & Conversion Surfaces (116 Routes)
│       ├── Dockerfile                         # Next.js 14 App Router production runner
│       ├── app/
│       │   ├── page.tsx                       # High-converting homepage & live stock-synced featured inventory
│       │   ├── shop/
│       │   │   ├── page.tsx                   # 16-Model Storefront, Room Sizer, Plug Filter & 16/16 Spec PDFs
│       │   │   └── window-ac-plug-guide/      # 115V vs 230V visual plug guide (NEMA 5-15P vs 6-20P)
│       │   ├── clean-vs-replace-window-ac/    # 3-step decision tool, HECO comparison, $45 rebate form
│       │   ├── window-ac-installation/        # Jalousie bracket mounting, zero-deposit intake form
│       │   ├── mini-split-estimate/           # Multi-zone sizing wizard, $0 Free In-Home Estimate
│       │   ├── reviews/                       # 142 Verified 5-Star Oahu Reviews Pavilion
│       │   ├── mini_split_ac/                 # Mini split overview (0% Hawaii Energy rebate honesty)
│       │   ├── mini_split_ac_maintenance/     # Mini split clinical chemical flush & mold remediation
│       │   ├── service-areas/                 # 22 Oahu city landing pages with localized JSON-LD
│       │   ├── contact/                       # "By Appointment First" customer booking intake
│       │   ├── checkout/                      # Direct Stripe checkout bridge
│       │   └── sitemap.ts                     # XML Sitemap generator for all 116 indexed routes
│       ├── components/                        # Tree-shaken UI components (Lucide React, Tailwind CSS)
│       │   ├── MiniSplitEstimator.tsx         # Multi-step zone calculator & panel load intake
│       │   ├── ReviewsPavilion.tsx            # 3-column full-width verified Oahu reviews showcase
│       │   ├── BackToTop.tsx                  # Floating navigation anchor
│       │   └── NavbarV2.tsx                   # Unified island header navigation
│       └── public/
│           └── assets/he-rebate-form/         # Pre-approved Hawaii Energy $45 Window AC Application PDF
│
├── scripts/                                   # Master CLI Tools & Security Scanners
│   ├── dev-os.ps1                             # Sovereign CLI control bridge (40 agents, 10 Sub-Masters, reports)
│   ├── scan-secrets.ps1                       # Automated pre-commit & pre-deploy cybersecurity scanner
│   ├── verify-build.ps1                       # Local cross-package compilation check
│   └── sync_local.ps1                         # Workstation-to-VPS deployment synchronizer
│
└── docs/                                      # Enterprise Documentation & Architecture Blueprints
    ├── ANALYTICS_SWARM_ARCHITECTURE.md        # Complete GSC + GA4 Continuous CRO Swarm Specification
    ├── API.md                                 # Backend OpenAPI reference & route contracts
    └── adr/                                   # Architectural Decision Records (ADRs)
```

---

## 2. Sovereign Master & 10 Category Sub-Masters Hierarchy

```mermaid
graph TD
    Master[Sovereign Master Engine<br/>dev_os.py / scripts/dev-os.ps1 / apps/dev-os]
    
    Sub1[Sub-Master 01: Infrastructure<br/>submaster_infrastructure]
    Sub2[Sub-Master 02: Security & Compliance<br/>submaster_security_compliance]
    Sub3[Sub-Master 03: Commerce & Telemetry<br/>submaster_commerce_telemetry]
    Sub4[Sub-Master 04: Growth & Grounding<br/>submaster_growth_grounding]
    Sub5[Sub-Master 05: CRM Operations<br/>submaster_crm_operations]
    Sub6[Sub-Master 06: Deployment Quality<br/>submaster_deployment_quality]
    Sub7[Sub-Master 07: SERP Acquisition<br/>submaster_serp_acquisition]
    Sub8[Sub-Master 08: Conversion Velocity<br/>submaster_conversion_velocity]
    Sub9[Sub-Master 09: Creative AI Studio<br/>submaster_creative_studio]
    Sub10[Sub-Master 10: Executive Reporting<br/>submaster_executive_reporting]

    Master --> Sub1
    Master --> Sub2
    Master --> Sub3
    Master --> Sub4
    Master --> Sub5
    Master --> Sub6
    Master --> Sub7
    Master --> Sub8
    Master --> Sub9
    Master --> Sub10

    Sub1 --> A1[agent_host_sentinel]
    Sub1 --> A2[agent_container_sentinel]
    Sub1 --> A3[agent_db_guardian]
    Sub1 --> A4[agent_storage_sentinel]

    Sub2 --> A5[agent_security_shield]
    Sub2 --> A6[agent_commit_sentinel]
    Sub2 --> A7[agent_compliance_auditor]
    Sub2 --> A8[agent_perimeter_auditor]

    Sub3 --> A9[agent_funnel_telemetry]
    Sub3 --> A10[agent_cro_optimizer]
    Sub3 --> A11[agent_revenue_reconciler]
    Sub3 --> A12[agent_catalog_auditor]

    Sub4 --> A13[agent_seo_metadata]
    Sub4 --> A14[agent_oahu_grounding]
    Sub4 --> A15[agent_market_research]
    Sub4 --> A16[agent_heco_rebate_strategist]
    Sub4 --> A17[agent_gsc_ga4_analytics]
    Sub4 --> A18[agent_schema_metadata_engine]
    Sub4 --> A19[agent_high_intent_planner]

    Sub5 --> A20[agent_crm_dispatch]
    Sub5 --> A21[agent_customer_lifecycle]
    Sub5 --> A22[agent_intake_triage]

    Sub6 --> A23[agent_deployment_guardian]
    Sub6 --> A24[agent_build_qa]
    Sub6 --> A25[agent_regression_sentinel]
    Sub6 --> A26[agent_spatial_visualizer]

    Sub7 --> A27[agent_serp_intent_harvester]
    Sub7 --> A28[agent_ctr_title_craftsman]
    Sub7 --> A29[agent_merchant_feed_sentinel]

    Sub8 --> A30[agent_mobile_checkout_sentinel]
    Sub8 --> A31[agent_trust_authority_grounder]
    Sub8 --> A32[agent_zero_friction_navigator]
    Sub8 --> A33[agent_speed_core_vital_sentinel]

    Sub9 --> A34[agent_comfyui_bridge]
    Sub9 --> A35[agent_avatar_portrait_crafter]
    Sub9 --> A36[agent_trust_medallion_forge]
    Sub9 --> A37[agent_asset_optimizer_sentinel]

    Sub10 --> A38[agent_report_ingestor]
    Sub10 --> A39[agent_narrative_crafter]
    Sub10 --> A40[agent_document_forge]
```

---

## 3. The Complete 40 Specialized Agents Roster

| # | Agent Identifier | Sub-Master Category | Primary Focus & Domain | Associated SOP(s) |
|---|---|---|---|---|
| 01 | `agent_host_sentinel` | Infrastructure | Hostinger VPS CPU, RAM, Disk, UFW Firewall, SSL | `SOP-INF-01` |
| 02 | `agent_container_sentinel` | Infrastructure | 7 Production Containers (Storefront, API, DB, Redis, Dev OS, CRM) | `SOP-INF-02` |
| 03 | `agent_db_guardian` | Infrastructure | PostgreSQL 16 asyncpg pool & 14-day backup snapshots | `SOP-INF-03` |
| 04 | `agent_storage_sentinel` | Infrastructure | 10MBx3 Docker log caps, tmp file hygiene, DB pruning | `SOP-INF-04` |
| 05 | `agent_security_shield` | Security & Compliance | SHA-256 HMAC tokens, loopback bindings, bundle hygiene | `SOP-SEC-01` |
| 06 | `agent_commit_sentinel` | Security & Compliance | Pre-commit secret scanning (`scan-secrets.ps1`) & branch hygiene | `SOP-SEC-02` |
| 07 | `agent_compliance_auditor` | Security & Compliance | Rolling 14-day audit log retention & PII redaction | `SOP-SEC-03` |
| 08 | `agent_perimeter_auditor` | Security & Compliance | Zero-inbound workstation perimeter & outbound-only sync | `SOP-SEC-04` |
| 09 | `agent_funnel_telemetry` | Commerce & Telemetry | Real-time micro-conversion beacon ingestion across 4 funnels | `SOP-COM-01` |
| 10 | `agent_cro_optimizer` | Commerce & Telemetry | Zero-upfront booking velocity, Waipahu pickup, mobile CRO | `SOP-COM-02` |
| 11 | `agent_revenue_reconciler` | Commerce & Telemetry | Stripe order reconciliation, 4.712% Oahu GET tax, invoice balance guards | `SOP-COM-03` |
| 12 | `agent_catalog_auditor` | Commerce & Telemetry | 16/16 model spec drift, 16/16 factory PDFs, live DB stock sync | `SOP-COM-04` |
| 13 | `agent_seo_metadata` | Growth & Grounding | 116-route XML sitemap, canonical URLs, robots.txt, SERP tags | `SOP-GRO-01` |
| 14 | `agent_oahu_grounding` | Growth & Grounding | HECO ~44.2¢/kWh rates, $0 Free In-Home Estimates, CT-36775 | `SOP-GRO-02` |
| 15 | `agent_market_research` | Growth & Grounding | Island competitor benchmarks & Waipahu warehouse pickup edge | `SOP-GRO-03` |
| 16 | `agent_heco_rebate_strategist`| Growth & Grounding | HECO ~44.2¢/kWh ROI & $45 Hawaii Energy window AC rebate PDF | `SOP-GRO-04` |
| 17 | `agent_gsc_ga4_analytics` | Growth & Grounding | GSC query clustering, CTR gaps, GA4 stage drop-off telemetry | `SOP-GRO-05` |
| 18 | `agent_schema_metadata_engine`| Growth & Grounding | JSON-LD schema audits (Product, FAQPage, HVACBusiness, HowTo) | `SOP-GRO-06` |
| 19 | `agent_high_intent_planner` | Growth & Grounding | 116-route high-intent SEO footprint & cross-funnel bridges | `SOP-GRO-07` |
| 20 | `agent_crm_dispatch` | CRM Operations | "By Appointment First" lead intake & Waipahu pickup dispatch | `SOP-CRM-01` |
| 21 | `agent_customer_lifecycle` | CRM Operations | Annual window AC / biannual mini-split salt-air recall triggers | `SOP-CRM-02` |
| 22 | `agent_intake_triage` | CRM Operations | Mini-split diagnostic/flush vs Window AC clean-vs-replace triage | `SOP-CRM-03` |
| 23 | `agent_deployment_guardian` | Deployment Quality | Blue/green container rebuilds, zero-downtime Nginx reload | `SOP-DEP-01` |
| 24 | `agent_build_qa` | Deployment Quality | 116 Next.js routes compilation, TypeScript strictness, link checks | `SOP-DEP-02` |
| 25 | `agent_regression_sentinel` | Deployment Quality | By-Appointment-First non-regression & drop-cloth mandate | `SOP-DEP-03` |
| 26 | `agent_spatial_visualizer` | Deployment Quality | Blender 4.1 headless raytracing & 16/16 caliper cutaway assets | `SOP-DEP-04` |
| 27 | `agent_serp_intent_harvester`| SERP Acquisition | Oahu search query analytics & click-to-impression gap harvesting | `SOP-SERP-01` |
| 28 | `agent_ctr_title_craftsman` | SERP Acquisition | Click-optimized title tags, price anchors ($0 Estimate), hotlines | `SOP-SERP-02` |
| 29 | `agent_merchant_feed_sentinel`| SERP Acquisition | Google Merchant XML feed & Product schema (`validFrom`) | `SOP-SERP-03` |
| 30 | `agent_mobile_checkout_sentinel`| Conversion Velocity | 1-tap Apple Pay/Google Pay/Link verification on mobile | `SOP-VEL-01` |
| 31 | `agent_trust_authority_grounder`| Conversion Velocity | Waipahu inventory proof, 1-year warranty, CT-36775 badge | `SOP-VEL-02` |
| 32 | `agent_zero_friction_navigator` | Conversion Velocity | Zero checkout dead-ends, smooth filter resets, hotline bridge | `SOP-VEL-03` |
| 33 | `agent_speed_core_vital_sentinel`| Conversion Velocity | Mobile Core Web Vitals (LCP < 2s, CLS = 0), zero-cache | `SOP-VEL-04` |
| 34 | `agent_comfyui_bridge` | Creative AI Studio | Local RTX 4090 (24GB VRAM) ComfyUI Studio API bridge | `SOP-CRE-01` |
| 35 | `agent_avatar_portrait_crafter`| Creative AI Studio | Oahu homeowner & technician portrait matrix synthesis | `SOP-CRE-02` |
| 36 | `agent_trust_medallion_forge` | Creative AI Studio | 3D golden review medallions & CT-36775 trust shields | `SOP-CRE-03` |
| 37 | `agent_asset_optimizer_sentinel`| Creative AI Studio | Sub-80KB WebP optimization, zero CLS & Polynesian SVG fallbacks | `SOP-CRE-04` |
| 38 | `agent_report_ingestor` | Executive Reporting | GSC ZIP archive & GA4 CSV ingestion (native Python `csv`) | `SOP-REP-01` |
| 39 | `agent_narrative_crafter` | Executive Reporting | 3rd-grade reading level executive summary, Big Wins & Action Plan | `SOP-REP-02` |
| 40 | `agent_document_forge` | Executive Reporting | Multi-format report compiler (`.docx`, `.html`, `.md`) | `SOP-REP-03` |

*(Strict Anti-Upsell Protocol: No accessory upsells, add-on modals, or bundle friction permitted in checkout).*

---

## 4. Master Index of the 50 Standard Operating Procedures (SOPs)
*(10 Sub-Master Protocols + 40 Specialized Agent Protocols across `apps/api/routers/dev_os_sops.py` & `apps/dev-os/app/sopsData.ts`)*

- **Domain 1: Infrastructure (`5 SOPs`)** — `submaster_infrastructure`, `agent_host_sentinel`, `agent_container_sentinel`, `agent_db_guardian`, `agent_storage_sentinel`
- **Domain 2: Security (`5 SOPs`)** — `submaster_security_compliance`, `agent_security_shield`, `agent_commit_sentinel`, `agent_compliance_auditor`, `agent_perimeter_auditor`
- **Domain 3: Commerce (`5 SOPs`)** — `submaster_commerce_telemetry`, `agent_funnel_telemetry`, `agent_cro_optimizer`, `agent_revenue_reconciler`, `agent_catalog_auditor`
- **Domain 4: Growth (`8 SOPs`)** — `submaster_growth_grounding`, `agent_seo_metadata`, `agent_oahu_grounding`, `agent_market_research`, `agent_heco_rebate_strategist`, `agent_gsc_ga4_analytics`, `agent_schema_metadata_engine`, `agent_high_intent_planner`
- **Domain 5: Operations (`4 SOPs`)** — `submaster_crm_operations`, `agent_crm_dispatch`, `agent_customer_lifecycle`, `agent_intake_triage`
- **Domain 6: Deployment (`5 SOPs`)** — `submaster_deployment_quality`, `agent_deployment_guardian`, `agent_build_qa`, `agent_regression_sentinel`, `agent_spatial_visualizer`
- **Domain 7: SERP Acquisition (`4 SOPs`)** — `submaster_serp_acquisition`, `agent_serp_intent_harvester`, `agent_ctr_title_craftsman`, `agent_merchant_feed_sentinel`
- **Domain 8: Conversion (`5 SOPs`)** — `submaster_conversion_velocity`, `agent_mobile_checkout_sentinel`, `agent_trust_authority_grounder`, `agent_zero_friction_navigator`, `agent_speed_core_vital_sentinel`
- **Domain 9: Creative Studio (`5 SOPs`)** — `submaster_creative_studio`, `agent_comfyui_bridge`, `agent_avatar_portrait_crafter`, `agent_trust_medallion_forge`, `agent_asset_optimizer_sentinel`
- **Domain 10: Executive Reporting (`4 SOPs`)** — `submaster_executive_reporting`, `agent_report_ingestor`, `agent_narrative_crafter`, `agent_document_forge`

---

## 5. Analytics Swarm Architecture (GSC + GA4 + Continuous CRO Loop)

```
[ GSC Query Data ]              [ GA4 Telemetry ]
_analytics_data/Queries.csv     analytics_swarm_service
         │                               │
         ▼                               ▼
  ┌──────────────────────────────────────────────┐
  │  Ingestion & Clustering Layer               │
  │  apps/api/services/analytics_swarm.py        │
  └──────────────────────┬───────────────────────┘
                         │
                         ▼
  ┌──────────────────────────────────────────────┐
  │  Autonomous Analytics Agent Fleet            │
  │  - agent_gsc_ga4_analytics                   │
  │  - agent_schema_metadata_engine              │
  │  - agent_high_intent_planner                 │
  └──────────────────────┬───────────────────────┘
                         │
         ┌───────────────┴───────────────┐
         ▼                               ▼
  ┌────────────────────────┐   ┌────────────────────────┐
  │  Continuous CRO Stream │   │  JSON-LD Schemas       │
  │  - REC-01: Plug Filter │   │  - FAQPage             │
  │  - REC-02: Clean/Repl  │   │  - HVACBusiness        │
  │  - REC-03: Install Form│   │  - HowTo               │
  │  - REC-04: Panel Calc  │   │  - Product / Offers    │
  └───────────┬────────────┘   └───────────┬────────────┘
              │                            │
              ▼                            ▼
  ┌─────────────────────────────────────────────────────┐
  │  Edge Conversion Surfaces (apps/web/app/)           │
  │  - /clean-vs-replace-window-ac                     │
  │  - /window-ac-installation                         │
  │  - /shop/window-ac-plug-guide                      │
  │  - /mini-split-estimate                            │
  │  - /shop (Interactive Room Sizer & Plug Filter)    │
  └─────────────────────────────────────────────────────┘
```

### High-Yield Conversion Page Blueprint

1. **`/clean-vs-replace-window-ac`**:
   - **Target Query Cluster**: "clean window ac waipahu", "window ac unit cleaning service", "ac cleaning vs replace".
   - **Conversion Catalysts**: 3-step decision calculator (unit age, coil rot, compressor technology); HECO annual energy cost table; clean-vs-replace comparison guiding customers to factory-sealed LG Dual Inverters with $45 rebate.

2. **`/window-ac-installation`**:
   - **Target Query Cluster**: "window ac installation oahu", "window ac installers near me", "jalousie ac install".
   - **Conversion Catalysts**: Jalousie retrofit bracket diagram; zero upfront deposit intake form; 1-click equipment add-on bundle; Hawaii Contractor License CT-36775 badge.

3. **`/shop/window-ac-plug-guide`**:
   - **Target Query Cluster**: "18000 btu window ac plug type", "230 volt window ac outlet", "nema 6-20p vs 5-15p".
   - **Conversion Catalysts**: Visual plug diagrams (115V NEMA 5-15P vs 230V NEMA 6-20P); unblocks 18k (LW1822IVSM) and 23.5k (LW2422IVSM) inventory; direct Add to Cart buttons with $45 rebate form link.

4. **`/mini-split-estimate`**:
   - **Target Query Cluster**: "mini split cost estimate oahu", "split ac installation near me", "ductless ac honolulu".
   - **Conversion Catalysts**: Strict 0% Hawaii Energy rebate honesty ($0 Free In-Home Estimate, direct CT-36775 contractor pricing); electrical circuit evaluation coordinated with licensed electrical subcontractors; interactive multi-zone sizing wizard (`MiniSplitEstimator`).

---

## 6. Master CLI Orchestration (`scripts/dev-os.ps1`)

The Master CLI Bridge provides immediate command-line execution for the entire swarm:

```powershell
# Run the complete 40-agent fleet audit across all 10 Sub-Masters
.\scripts\dev-os.ps1 run-fleet

# Ingest GSC queries and display GA4 conversion telemetry
.\scripts\dev-os.ps1 analytics

# Stream continuous CRO recommendations and cross-funnel bridges
.\scripts\dev-os.ps1 recommendations

# Review active high-intent conversion pages
.\scripts\dev-os.ps1 high-intent-pages

# Audit JSON-LD structured schemas across all routes
.\scripts\dev-os.ps1 schema-catalog

# Browse the 50 Standard Operating Procedures
.\scripts\dev-os.ps1 sops

# Execute a category Sub-Master suite
.\scripts\dev-os.ps1 run-submaster submaster_growth_grounding
```

---

## 7. Air-Tight Security & Grounding Directives

1. **Loopback Binding**: Host ports 3005, 3001, 8001, 5433, and 6380 are strictly bound to `127.0.0.1`.
2. **Zero Public Access**: Dev OS cockpit is barred by `robots.ts` (`Disallow: /`) and protected by SHA-256 HMAC session cookies.
3. **Outbound Sync Only**: Workstation is 100% air-tight; VPS server possesses zero inbound network connectivity to the local development environment.
4. **Mini Split Rebate Truth**: 0% participation in Hawaii Energy rebates (contractor direct pricing, zero red tape).
5. **Window AC Rebate Truth**: Qualifying Energy Star LG Dual Inverters earn a $45 cash rebate using Affordable Home AC's official pre-approved application form PDF (`/assets/he-rebate-form/Affordable-Home-AC-WINDOW-AC-PURCHASE-APP-V4-12.24.24.pdf`).
