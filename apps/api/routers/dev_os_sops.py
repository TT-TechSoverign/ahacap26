"""
Sovereign Tier Standard Operating Procedures (SOPs) Matrix — v2.7.0-SOVEREIGN (EPOCH 21)
Defines the authoritative operational protocols, execution steps, token efficiency policies,
and Oahu local grounding for all 40 Specialized Agents and 10 Category Sub-Masters.
"""

from typing import Dict, Any

AGENT_SOPS: Dict[str, Dict[str, Any]] = {
    # =========================================================================
    # 10 CATEGORY SUB-MASTERS
    # =========================================================================
    "submaster_infrastructure": {
        "id": "submaster_infrastructure",
        "code": "SOP-SUB-01",
        "title": "Infrastructure & Storage Sub-Master",
        "domain": "Infrastructure",
        "supervisor": "Sovereign Master Orchestrator",
        "mandate": "Supervise VPS bare-metal host health, Docker 7-container lifecycle, PostgreSQL 16 connection pools, live content_pages JSONB parity (including mandatory shop #rebate section), and zero-disk-bloat retention policies.",
        "token_efficiency_policy": "Zero background polling loops. Invoked strictly on-demand by client CLI or Dev OS UI. Emits compact JSON summaries (< 400 bytes).",
        "oahu_grounding": "Hostinger VPS (31.220.53.132) loopback network isolation, zero external port exposures, localized PostgreSQL vacuuming, and 14-day automated backups.",
        "inputs": ["VPS host resource counters", "Docker socket container states", "PostgreSQL connection pool & content_pages JSONB rows", "Docker log file sizes"],
        "execution_steps": [
            {"step": 1, "title": "Host Resource Ingest", "description": "Trigger agent_host_sentinel to capture CPU, RAM, NVMe disk headroom, UFW firewall, and SSL validity.", "verification": "Disk usage < 80%, RAM headroom > 500MB."},
            {"step": 2, "title": "Container Topology Audit", "description": "Trigger agent_container_sentinel to verify all 7 core containers (prod-api, prod-dev-os, prod-web, prod-db, prod-redis, ahac-crm-web, ahac-crm-api) and 4 Uvicorn workers.", "verification": "All 7 containers UP and bound strictly to 127.0.0.1."},
            {"step": 3, "title": "PostgreSQL & Content Parity Probe", "description": "Trigger agent_db_guardian to test connection pool roundtrip, verify 16 catalog rows, and confirm content_pages 'shop' row includes 'rebate' in sections and sectionOrder.", "verification": "Latency < 5ms, 0 connection leaks, shop #rebate synced in DB."},
            {"step": 4, "title": "Storage Hygiene Check", "description": "Trigger agent_storage_sentinel to confirm Docker log caps (10m x 3), Redis 500-event ring buffer, and 14-day audit pruning.", "verification": "0.00% storage leak risk confirmed."}
        ],
        "outputs": ["Unified infrastructure health matrix", "Database content_pages parity verification", "Container lifecycle map"],
        "contingency_protocol": "On container crash, memory breach, or DB content_pages drift, execute graceful restart or JSONB sync and alert Sovereign Master via Dev OS audit log."
    },
    "submaster_security_compliance": {
        "id": "submaster_security_compliance",
        "code": "SOP-SUB-02",
        "title": "Cybersecurity & Compliance Sub-Master",
        "domain": "Security",
        "supervisor": "Sovereign Master Orchestrator",
        "mandate": "Enforce zero-trust architecture, SHA-256 HMAC authentication, air-tight local perimeter isolation, pre-push secret scrubbing, storefront /admin Command Deck isolation (zero internal Dev OS or CRM links), and CEO Email Shield routing.",
        "token_efficiency_policy": "Event-driven execution. Telemetry sanitized of all PII before streaming. No autonomous outbound network calls.",
        "oahu_grounding": "Hawaii business compliance protection (Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005), customer PII masking, production admin routing to brian@affordablehome-ac.com with irasmussenjobs@gmail.com BCC, and air-tight local workstation isolation.",
        "inputs": ["Active session tokens", "Git pre-push audit logs", "Storefront /admin DOM & email routing config", "Audit table record counts"],
        "execution_steps": [
            {"step": 1, "title": "HMAC Session & Admin Isolation Audit", "description": "Trigger agent_security_shield to verify SHA-256 HMAC signature, loopback port bindings, and confirm /admin Command Menu contains zero internal Dev OS or CRM links.", "verification": "Zero exposed management ports; /admin isolated to 4 storefront tabs."},
            {"step": 2, "title": "Pre-Push Secret Scrubbing", "description": "Trigger agent_commit_sentinel to scan staged diffs and recent commits for API keys, Stripe sk_live tokens, or private certificates.", "verification": "Zero leaked secrets detected."},
            {"step": 3, "title": "CEO Email Shield & PII Compliance", "description": "Trigger agent_compliance_auditor to verify production notifications route to brian@affordablehome-ac.com with irasmussenjobs@gmail.com BCC (and staging shield exclusively to irasmussenjobs@gmail.com).", "verification": "Email routing & PII masking 100% compliant."},
            {"step": 4, "title": "Air-Tight Perimeter Verification", "description": "Trigger agent_perimeter_auditor to mathematically verify server has zero inbound reach into the local development workstation.", "verification": "Zero inbound holes; 100% outbound-only client sync."}
        ],
        "outputs": ["Security posture grade (ARMORED)", "Admin isolation & CEO email shield status", "Perimeter state (AIR_TIGHT_OUTBOUND_ONLY)"],
        "contingency_protocol": "Immediate token invalidation and IP rate-limiting on unauthorized login attempts; push quarantine on leaked credential or internal link exposure."
    },
    "submaster_commerce_telemetry": {
        "id": "submaster_commerce_telemetry",
        "code": "SOP-SUB-03",
        "title": "Commerce & Appointment Telemetry Sub-Master",
        "domain": "Commerce",
        "supervisor": "Sovereign Master Orchestrator",
        "mandate": "Supervise conversion funnels, schedule booking completion velocity, zero-barrier intake, Stripe revenue & 4.712% Oahu GET reconciliation, CRM multi-stage invoice guardrails, and 16-model LG & GE catalog specification fidelity.",
        "token_efficiency_policy": "Aggregates client-side micro-telemetry into compact rolling ring buffer (max 500 entries) with zero recurring cron loops.",
        "oahu_grounding": "By-Appointment-First conversion architecture; zero upfront credit card barrier for service visits; live Waipahu warehouse stock synchronization ($395–$1,200); 4.712% Oahu GET tax.",
        "inputs": ["Funnel telemetry ring buffer", "Stripe order & CRM invoice ledgers", "products_seed.json & PostgreSQL products table", "Factory PDF spec sheets"],
        "execution_steps": [
            {"step": 1, "title": "Funnel Progression Analysis", "description": "Trigger agent_funnel_telemetry to compute conversion across the 4 Window AC funnels (Sales/Pickup, Installation, Cleaning, Clean-vs-Replace).", "verification": "Zero upfront payment barriers; conversion velocity > 3.0%."},
            {"step": 2, "title": "CRO & Live Stock Heuristic Check", "description": "Trigger agent_cro_optimizer to verify <= 4 form fields, mobile tap-to-call, and live /api/v1/products stock sync on HomeFeaturedInventory and WarehouseInventoryGrid.", "verification": "Stock = 0 immediately disables Add Unit and displays Out of Stock."},
            {"step": 3, "title": "Revenue & CRM Multi-Stage Invoice Reconciliation", "description": "Trigger agent_revenue_reconciler to cross-verify Stripe charges, 4.712% GET tax, and CRM Deposit Paid vs Balance Due fresh Checkout Session guardrails.", "verification": "Zero unrecorded transactions; stale Stripe sessions invalidated on balance change."},
            {"step": 4, "title": "16-Model Catalog & Spec Auditor", "description": "Trigger agent_catalog_auditor to verify all 16 LG & GE models (including LW1222IVSM & GE AJCQ12AXXWA R-32 inverter), Dual-Sizing coverage, 16/16 factory PDFs, and 2x Retina WebP viewers.", "verification": "16/16 models verified with zero spec drift."}
        ],
        "outputs": ["Conversion velocity index", "Reconciled Stripe & CRM invoice ledger", "16-model catalog audit certificate"],
        "contingency_protocol": "Flag funnel drop-offs > 30%; trigger Stripe reconciliation or non-destructive catalog migrate-and-reseed if spec drift is detected."
    },
    "submaster_growth_grounding": {
        "id": "submaster_growth_grounding",
        "code": "SOP-SUB-04",
        "title": "Growth & Oahu Grounding Sub-Master",
        "domain": "Growth",
        "supervisor": "Sovereign Master Orchestrator",
        "mandate": "Ground all copy, pricing, technical recommendations, and SEO across all 101 canonical Window AC routes, 22 Oahu city pages, HECO 44.2¢/kWh energy economics, and mandatory Shop #rebate ($45 Hawaii Energy Rebate) architecture.",
        "token_efficiency_policy": "Static knowledge graph queries with zero runtime AI hallucination; cached geographic centroids.",
        "oahu_grounding": "22 Oahu municipalities, Leeward/Ewa heat profiles, Windward humidity/mold challenges, HECO 44.2¢/kWh residential tariff, and $45 Hawaii Energy Window AC Rebate.",
        "inputs": ["101 canonical routes & 22 city pages", "HECO 44.2¢/kWh tariff", "content.json & PostgreSQL content_pages shop #rebate config", "GSC/GA4 telemetry"],
        "execution_steps": [
            {"step": 1, "title": "101-Route Canonical & 301 Redirect Audit", "description": "Trigger agent_seo_metadata to verify 101 canonical routes (85 static/city + 16 product) and 301 permanent redirects for all 9 retired mini-split/central AC routes.", "verification": "101 routes active; 0 legacy non-window AC routes indexed."},
            {"step": 2, "title": "Microclimate & Subcontractor Grounding", "description": "Trigger agent_oahu_grounding to align cooling recommendations with Oahu microclimates and verify 208/230V electrical work is grounded to licensed electrical subcontractors.", "verification": "Single-wall redwood BTU calibration & subcontractor grounding verified."},
            {"step": 3, "title": "Market & Rebate Section Verification", "description": "Trigger agent_market_research and agent_heco_rebate_strategist to confirm Waipahu warehouse pricing ($395-$1,200) and verify #rebate (<RebateSection />) is active on /shop and in NavbarV2.", "verification": "shop.sections.rebate and sectionOrder verified in code and DB."},
            {"step": 4, "title": "GSC/GA4, Schema & High-Intent Pathways", "description": "Trigger agent_gsc_ga4_analytics, agent_schema_metadata_engine, and agent_high_intent_planner to validate JSON-LD schemas and high-intent pathways (including /shop/ge-built-in-wall-ac-oahu).", "verification": "100% valid schemas and cross-funnel bridges."}
        ],
        "outputs": ["101-route SEO coverage matrix", "Oahu microclimate cooling matrix", "Shop #rebate & $45 Hawaii Energy Rebate verification"],
        "contingency_protocol": "Automatically restore shop #rebate section or 301 redirect rules if any route or content_pages regression occurs."
    },
    "submaster_crm_operations": {
        "id": "submaster_crm_operations",
        "code": "SOP-SUB-05",
        "title": "Customer Operations & CRM Sub-Master",
        "domain": "Operations",
        "supervisor": "Sovereign Master Orchestrator",
        "mandate": "Manage service request intake, technician dispatch queues, Waipahu same-day warehouse pickup, normalized Window AC crm_products catalog, and customer lifecycle maintenance reminders.",
        "token_efficiency_policy": "Direct SQL queries on indexed leads table; on-demand execution without pollers.",
        "oahu_grounding": "Waipahu central warehouse facility (94-150 Leoleo St #203), same-day pickup for factory-sealed LG & GE inventory, and Oahu salt-air coil sanitization cycles.",
        "inputs": ["PostgreSQL leads table records", "CRM crm_products catalog", "Equipment service histories", "Customer failure reports"],
        "execution_steps": [
            {"step": 1, "title": "Dispatch Queue & Email Routing Ingest", "description": "Trigger agent_crm_dispatch to inspect new lead records, enforce By-Appointment-First contact, and confirm brian@affordablehome-ac.com primary dispatch notifications.", "verification": "All new leads flagged for phone contact before truck roll."},
            {"step": 2, "title": "Window AC Symptom & Intake Triage", "description": "Trigger agent_intake_triage to categorize incoming Window AC issues (mold, coil corrosion, drain leak, warm air) and route between Waipahu warehouse replacement vs cleaning/installation.", "verification": "100% Window AC & Window AC Cleaning routing enforced."},
            {"step": 3, "title": "Lifecycle Maintenance Schedule", "description": "Trigger agent_customer_lifecycle to generate 6-month and 12-month proactive Window AC coil sanitization and antimicrobial pan treatment recalls.", "verification": "Recall schedule updated based on Oahu coastal proximity."}
        ],
        "outputs": ["Triage queue distribution", "Pending dispatch count", "Customer satisfaction score", "Recall calendar"],
        "contingency_protocol": "High-priority dispatch escalation for senior or vulnerable households experiencing total cooling failure during Kona trade-wind lulls."
    },
    "submaster_deployment_quality": {
        "id": "submaster_deployment_quality",
        "code": "SOP-SUB-06",
        "title": "Deployment & Quality Swarm Sub-Master",
        "domain": "Deployment",
        "supervisor": "Sovereign Master Orchestrator",
        "mandate": "Guarantee zero-downtime blue/green rollouts, Next.js production build verification across 101 canonical routes, 3-row fixed NavbarV2 viewport clearance across all 74 page.tsx templates, solid dropdown surface armor, and 3D spatial caliper cutaway integrity.",
        "token_efficiency_policy": "Multi-stage pipeline running strictly during deployment sequences; zero background daemon overhead.",
        "oahu_grounding": "Insured Oahu cooling specialist workmanship protection (floor drop-cloth mandate), zero-downtime for live Oahu customers (www.affordablehome-ac.com).",
        "inputs": ["Next.js build manifests (74 page.tsx files)", "NavbarV2.tsx & admin/page.tsx", "3D cutaway & Retina WebP spec assets", "Docker compose configurations"],
        "execution_steps": [
            {"step": 1, "title": "Pre-Deploy Guardrails", "description": "Trigger agent_deployment_guardian to verify clean git working tree, main branch alignment, and Nginx reload syntax check.", "verification": "Branch is main, nginx -t returns syntax ok."},
            {"step": 2, "title": "101-Route Build & Viewport Clearance QA", "description": "Trigger agent_build_qa to confirm zero TypeScript errors, 101 canonical routes, and 3-row fixed NavbarV2 top-padding clearance (pt-[88px] md:pt-[176px]..[192px]) across all 74 page.tsx files.", "verification": "Build exits code 0; 0 header overlap regressions across 74 page.tsx files."},
            {"step": 3, "title": "Non-Regression, Dropdown & Admin Deck Audit", "description": "Trigger agent_regression_sentinel to verify By-Appointment-First gate, drop-cloth clause, solid bg-[#060a12] z-[120] Shop Window AC dropdown, and isolated /admin Command Deck.", "verification": "100% compliant with zero UI bleed-through or upfront pay gates."},
            {"step": 4, "title": "3D Spatial Cutaway & Retina Spec Audit", "description": "Trigger agent_spatial_visualizer to verify 16 isometric fit cutaways, 16 factory PDFs, and 16 2x Retina WebP mobile spec sheet images.", "verification": "48/48 spatial & engineering assets verified."}
        ],
        "outputs": ["3-Stage verification certificate", "74/74 viewport clearance report", "Spatial & Retina spec asset report"],
        "contingency_protocol": "Instant rollback to previous container image if health probe or viewport/regression check fails within 30 seconds of deployment."
    },
    "submaster_serp_acquisition": {
        "id": "submaster_serp_acquisition",
        "code": "SOP-SUB-07",
        "title": "SERP & Intent Acquisition Sub-Master",
        "domain": "SERP Acquisition",
        "supervisor": "Sovereign Master Orchestrator",
        "mandate": "Supervise 100% Window AC & Window AC Cleaning search query intent harvesting across 22 Oahu city pages and topical silos, click-through-rate title tag optimization, and 16-model Google Merchant Center XML feed syndication.",
        "token_efficiency_policy": "Zero background polling loops. Invoked strictly on-demand by client CLI or Dev OS UI. Emits compact JSON summaries (< 400 bytes).",
        "oahu_grounding": "Oahu search intent harvesting (Honolulu, Ewa Beach, Kailua, Waipahu, Kapolei), localized $0 Free In-Home Estimate price anchoring, and Waipahu Warehouse Direct SERP trust badges.",
        "inputs": ["Google Search Console query logs", "Next.js page metadata across 101 canonical routes", "Google Merchant XML feed (16 LG & GE models)"],
        "execution_steps": [
            {"step": 1, "title": "Window AC Query Clustering", "description": "Trigger agent_serp_intent_harvester to identify high-converting Oahu Window AC & cleaning queries (including 26\" through-the-wall sleeves and jalousie mounts) with zero legacy mini-split drift.", "verification": "Query intent taxonomy 100% Window AC focused."},
            {"step": 2, "title": "CTR Title Tag Optimization", "description": "Trigger agent_ctr_title_craftsman to enforce click-magnetic title patterns with phone hotline and $0 Estimate hooks across all 22 city pages and topical silos.", "verification": "22 city pages enforce ${city} Window AC Sales, Installation & Cleaning | $0 Estimate | (808) 488-1111."},
            {"step": 3, "title": "16-Model Merchant Feed Audit", "description": "Trigger agent_merchant_feed_sentinel to validate XML feed and Product rich snippet schemas (including GE AJCQ12AXXWA R-32 inverter).", "verification": "16 LG & GE models syndicating cleanly with validFrom anchors."}
        ],
        "outputs": ["SERP acquisition matrix", "CTR improvement roadmap", "16-model Merchant feed health report"],
        "contingency_protocol": "Auto-correct canonical tag conflicts and title tag formatting on detected SERP crawl penalties."
    },
    "submaster_conversion_velocity": {
        "id": "submaster_conversion_velocity",
        "code": "SOP-SUB-08",
        "title": "Frictionless Conversion Velocity Sub-Master",
        "domain": "Conversion",
        "supervisor": "Sovereign Master Orchestrator",
        "mandate": "Enforce frictionless checkout flow, 1-tap mobile wallet availability (Apple Pay, Google Pay, Link), Waipahu warehouse trust grounding, solid dropdown & horizontal pill navigation ergonomics, and sub-100ms Core Web Vitals.",
        "token_efficiency_policy": "On-demand client invocation. Evaluates checkout pipeline and Lighthouse web vitals metrics in < 10ms memory audits.",
        "oahu_grounding": "Oahu customer trust defense: eliminates mainland shipping anxiety via Waipahu warehouse pickup proof, 1-year local warranty, Insured Oahu Cooling Specialists • Est. 2005 badges, and transparent 4.712% GET tax.",
        "inputs": ["Stripe checkout & CRM invoice session configs", "NavbarV2 & ShopClient DOM", "globals.css scrollbar utilities", "Core Web Vitals telemetry"],
        "execution_steps": [
            {"step": 1, "title": "Mobile Wallet & CRM Fresh Session Check", "description": "Trigger agent_mobile_checkout_sentinel to confirm Apple Pay, Google Pay, and Stripe Link are active on both storefront checkout and CRM multi-stage invoices.", "verification": "Dynamic payment methods active; stale CRM sessions auto-regenerated on balance change."},
            {"step": 2, "title": "Trust & Reassurance Grounding", "description": "Trigger agent_trust_authority_grounder to verify Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005 badges across checkout, footer, and schemas.", "verification": "High-trust card active; zero legacy license or hostile banner regressions."},
            {"step": 3, "title": "Zero-Friction Navigation & Dropdown Armor", "description": "Trigger agent_zero_friction_navigator to verify zero upsells, solid bg-[#060a12] z-[120] Shop Window AC dropdown, and .scrollbar-none horizontal filter tracks.", "verification": "Zero upsells, zero dropdown transparency bleed, 1-tap phone hotline active."},
            {"step": 4, "title": "Core Web Vitals & Viewport Clearance", "description": "Trigger agent_speed_core_vital_sentinel to audit mobile page speed, zero CLS, and 3-row NavbarV2 top-padding clearance across all 74 page.tsx routes.", "verification": "Mobile response < 100ms, CLS = 0.00, 74/74 pages clear fixed header."}
        ],
        "outputs": ["Mobile checkout velocity score", "Trust & navigation armor index", "Core Web Vitals & viewport clearance status"],
        "contingency_protocol": "Immediately purge any checkout blocker, modal pop-up, dropdown opacity regression, or payment restriction."
    },
    "submaster_creative_studio": {
        "id": "submaster_creative_studio",
        "code": "SOP-SUB-09",
        "title": "Creative AI & Spatial Media Studio Sub-Master",
        "domain": "Creative Studio",
        "supervisor": "Sovereign Master Orchestrator",
        "mandate": "Supervise local workstation ComfyUI orchestration on RTX 4090, Oahu customer portrait matrices, 3D golden review medallions, 3-column full-width ReviewsPavilion layout integrity, and sub-80KB WebP production pipelines.",
        "token_efficiency_policy": "Triggered on-demand via scripts/comfyui_studio_bridge.py or Dev OS. Zero persistent daemon GPU idle waste. Enforces SVG/CSS offline fallback.",
        "oahu_grounding": "Grounds customer portraits and 142 verified 5-star reviews in authentic Hawaii demographics, technician spotlight filters (Brian, Chris, Makoa, Omar), and Waipahu warehouse trust.",
        "inputs": ["RTX 4090 VRAM headroom", "ComfyUI /system_stats endpoint", "reviews_db.json (142 reviews) & ReviewsPavilion.tsx", "public/assets/reviews/*"],
        "execution_steps": [
            {"step": 1, "title": "GPU & Bridge Probe", "description": "Trigger agent_comfyui_bridge to verify RTX 4090 (24GB VRAM) and ComfyUI server port 8188.", "verification": "VRAM free > 16GB or offline SVG fallback armed."},
            {"step": 2, "title": "Demographic Matrix & 142-Review Audit", "description": "Trigger agent_avatar_portrait_crafter to verify Oahu resident prompt matrices and 100% Window AC & Window AC Cleaning tagging across all 142 reviews.", "verification": "142/142 reviews verified with zero legacy mini-split tags."},
            {"step": 3, "title": "Trust Medallion Forging", "description": "Trigger agent_trust_medallion_forge to forge 3D golden review medallions and Waipahu Warehouse Direct • Est. 2005 shields.", "verification": "Golden medallions rendered in SVG and WebP."},
            {"step": 4, "title": "Asset Optimization & ReviewsPavilion Grid Check", "description": "Trigger agent_asset_optimizer_sentinel to verify WebP assets (< 80KB), 16 Retina spec WebPs, and md:w-full md:max-w-none h-full 3-column desktop grid in ReviewsPavilion.", "verification": "WebP sizes < 80KB, CLS impact = 0.00, 3-column grid intact."}
        ],
        "outputs": ["Creative studio status (STUDIO_ARMED)", "142-review Window AC parity report", "Optimized review & Retina spec assets"],
        "contingency_protocol": "If ComfyUI server is offline, deploy high-aesthetic Polynesian SVG/CSS gradient avatars so storefront renders without broken images."
    },
    "submaster_executive_reporting": {
        "id": "submaster_executive_reporting",
        "code": "SOP-SUB-10",
        "title": "Executive Analytics & Monthly Reporting Sub-Master",
        "domain": "Executive Reporting",
        "supervisor": "Sovereign Master Orchestrator",
        "mandate": "Supervise automated ingestion of Search Console archives and GA4 telemetry via native Python csv, synthesis of 100% Window AC & Window AC Cleaning 3rd-grade executive narratives, and multi-format publishing across Word (.docx), HTML (.html), and Markdown (.md).",
        "token_efficiency_policy": "Deterministic native Python csv parsing and python-docx compilation; completes in < 1.5s with zero pandas bloat or background compute overhead.",
        "oahu_grounding": "Translates Oahu municipal Window AC search distributions, CTR moats, and Waipahu warehouse pickup demand into plain-English business intelligence for CEO Brian.",
        "inputs": ["Search Console archives (Chart.csv, Queries.csv, Pages.csv, Devices.csv)", "GA4 traffic exports", "ReportingEngine (apps/api/services/reporting_engine.py)"],
        "execution_steps": [
            {"step": 1, "title": "Native CSV Ingestion & Normalization", "description": "Trigger agent_report_ingestor to parse Search Console and GA4 datasets using zero-dependency native Python csv.", "verification": "Clicks, impressions, query ranks, and device distributions extracted cleanly."},
            {"step": 2, "title": "100% Window AC 3rd-Grade Synthesis", "description": "Trigger agent_narrative_crafter to synthesize Big Wins, Window AC keyword tables, and action plans while filtering out retired mini-split/ductless queries.", "verification": "Narrative generated in 3rd-grade executive language with 100% Window AC focus."},
            {"step": 3, "title": "Multi-Format Artifact Publishing", "description": "Trigger agent_document_forge to compile publication-ready .docx (via python-docx), stylized .html, and source .md files across all monthly folders.", "verification": "All 3 artifact formats compiled and verified in _analytics_data."}
        ],
        "outputs": ["Executive report suite (.docx, .html, .md)", "Monthly KPI matrix", "100% Window AC search performance index"],
        "contingency_protocol": "If Search Console archive lacks GA4 files, estimate pageviews and users using verified historical click-through multipliers."
    },

    # =========================================================================
    # 40 SPECIALIZED PRODUCTION AGENTS
    # =========================================================================

    # --- Infrastructure & Storage (4 Agents) ---
    "agent_host_sentinel": {
        "id": "agent_host_sentinel",
        "code": "SOP-INF-01",
        "title": "Host Infrastructure Sentinel",
        "domain": "Infrastructure",
        "supervisor": "submaster_infrastructure",
        "mandate": "Monitor VPS bare-metal host health including CPU utilization, RAM consumption, NVMe disk headroom, UFW firewall, and Let's Encrypt SSL certificates.",
        "token_efficiency_policy": "On-demand execution; reads native /proc and disk stats synchronously in < 2ms without subprocess overhead.",
        "oahu_grounding": "Hostinger VPS (31.220.53.132) located on low-latency Pacific backbone serving Oahu traffic.",
        "inputs": ["Host OS resource counters (/proc/stat, /proc/meminfo)", "Root filesystem disk usage", "UFW & SSL state"],
        "execution_steps": [
            {"step": 1, "title": "CPU & Memory Read", "description": "Query host memory availability and compute load percentage.", "verification": "Memory available > 500MB."},
            {"step": 2, "title": "Disk Headroom Audit", "description": "Verify NVMe storage usage against 85% safety threshold.", "verification": "Disk usage < 80% healthy."},
            {"step": 3, "title": "Uptime & Firewall Check", "description": "Capture system uptime, 1-minute load average, and UFW/SSL protection state.", "verification": "Load average < 2.0 per core, SSL valid."}
        ],
        "outputs": ["Host health grade (HEALTHY)", "CPU/RAM/Disk metric snapshot", "Uptime & SSL verification"],
        "contingency_protocol": "If disk usage exceeds 85%, trigger immediate storage prune and notify Sovereign Master via Dev OS audit log."
    },
    "agent_container_sentinel": {
        "id": "agent_container_sentinel",
        "code": "SOP-INF-02",
        "title": "Docker Container Sentinel",
        "domain": "Infrastructure",
        "supervisor": "submaster_infrastructure",
        "mandate": "Supervise state, uptime, 4-worker Uvicorn concurrency, and loopback port bindings for the 7 core production containers.",
        "token_efficiency_policy": "Direct docker socket or loopback HTTP status checks; zero continuous polling loops.",
        "oahu_grounding": "Isolates container network to 127.0.0.1, preventing any unauthorized internet exposure on Oahu servers.",
        "inputs": ["Docker engine container states", "Loopback port bindings (3005, 8001, 5433, 6380, 3001, 8080)"],
        "execution_steps": [
            {"step": 1, "title": "Container State Ingest", "description": "Check operational status of prod-api, prod-dev-os, prod-web, prod-db, prod-redis, ahac-crm-web, ahac-crm-api.", "verification": "All 7 containers in UP status."},
            {"step": 2, "title": "Port Binding Verification", "description": "Verify every exposed container port is strictly bound to 127.0.0.1.", "verification": "Zero external 0.0.0.0 management bindings."},
            {"step": 3, "title": "Restart & Worker Audit", "description": "Verify container restart counts are 0 and prod-api runs 4 Uvicorn workers synced via Redis.", "verification": "Restart count == 0, 4 workers active."}
        ],
        "outputs": ["Container operational matrix", "Loopback enforcement status", "Process health report"],
        "contingency_protocol": "If any container fails health check, trigger Docker Compose restart for affected container and log audit incident."
    },
    "agent_db_guardian": {
        "id": "agent_db_guardian",
        "code": "SOP-INF-03",
        "title": "PostgreSQL Database Guardian",
        "domain": "Infrastructure",
        "supervisor": "submaster_infrastructure",
        "mandate": "Maintain PostgreSQL 16 connection pool health, query latency, 16-model catalog stock preservation, and live content_pages JSONB parity (including mandatory shop #rebate section).",
        "token_efficiency_policy": "Executes lightweight async ping query and indexed count/JSONB scans; completes in < 5ms.",
        "oahu_grounding": "Protects Oahu customer appointment records, live Waipahu warehouse stock counts, and dynamic page content in PostgreSQL.",
        "inputs": ["AsyncSession connection pool", "Table row counters (leads, orders, products, content_pages, dev_os_audit_log)"],
        "execution_steps": [
            {"step": 1, "title": "Connection Roundtrip Test", "description": "Execute async query on PostgreSQL engine to measure latency.", "verification": "Roundtrip latency < 10ms."},
            {"step": 2, "title": "Catalog & Content Pages Parity Scan", "description": "Verify 16 product rows exist with preserved runtime stock and confirm content_pages 'shop' row includes 'rebate' in sections and sectionOrder.", "verification": "16 products active; shop #rebate synced in PostgreSQL."},
            {"step": 3, "title": "Audit Table Volume Audit", "description": "Count rows in dev_os_audit_log and confirm rolling 14-day retention rule and daily backup snapshot.", "verification": "Row count within safe storage bounds."}
        ],
        "outputs": ["Database health status (HEALTHY)", "Shop #rebate DB parity status", "Active connection pool state"],
        "contingency_protocol": "On connection pool exhaustion or content_pages drift, clear stale connections and synchronize content_pages JSONB from content.json."
    },
    "agent_storage_sentinel": {
        "id": "agent_storage_sentinel",
        "code": "SOP-INF-04",
        "title": "Storage Hygiene & Retention Sentinel",
        "domain": "Infrastructure",
        "supervisor": "submaster_infrastructure",
        "mandate": "Enforce strict disk hygiene, Docker log caps (10m x 3), Redis in-memory limits (500 events), and temporary file clearing.",
        "token_efficiency_policy": "Reads filesystem and Docker log configuration synchronously; 0Hz idle CPU burn.",
        "oahu_grounding": "Guarantees server will never experience disk saturation (ENOSPC) during heavy Oahu summer cooling traffic spikes.",
        "inputs": ["Docker logging configuration (max-size 10m)", "Redis memory buffer size", "/tmp folder volume"],
        "execution_steps": [
            {"step": 1, "title": "Docker Log Cap Verification", "description": "Verify docker-compose.prod.yml enforces max-size: 10m and max-file: 3.", "verification": "Log caps confirmed active."},
            {"step": 2, "title": "Redis Buffer Capacity Check", "description": "Verify in-memory circular buffer is capped at 500 events.", "verification": "Buffer length <= 500."},
            {"step": 3, "title": "Build Cache & Temp Cleanup", "description": "Inspect /tmp and Docker builder cache for orphaned assets.", "verification": "0 orphaned build artifacts detected."}
        ],
        "outputs": ["Storage hygiene status (HEALTHY)", "Storage leak risk (0.00%)", "Cache retention status"],
        "contingency_protocol": "Execute automated log truncation and temporary file prune if storage consumption exceeds baseline thresholds."
    },

    # --- Cybersecurity & Compliance (4 Agents) ---
    "agent_security_shield": {
        "id": "agent_security_shield",
        "code": "SOP-SEC-01",
        "title": "Zero-Trust Security Shield",
        "domain": "Security",
        "supervisor": "submaster_security_compliance",
        "mandate": "Enforce zero-trust network boundaries, loopback binding, client bundle sanitization, HMAC master authentication, and storefront /admin Command Deck isolation (zero internal Dev OS or CRM links).",
        "token_efficiency_policy": "Synchronous validation on-demand; zero background CPU or network overhead.",
        "oahu_grounding": "Ensures Dev OS and CRM links are completely absent from the storefront /admin Command Center bar while keeping internal services isolated.",
        "inputs": ["Listening socket map", "apps/web/app/admin/page.tsx", "Master authentication credentials"],
        "execution_steps": [
            {"step": 1, "title": "Loopback Enforcement Scan", "description": "Audit listening ports to verify internal services are restricted to 127.0.0.1.", "verification": "All internal ports bound to loopback."},
            {"step": 2, "title": "Storefront /admin Isolation Audit", "description": "Inspect apps/web/app/admin/page.tsx to confirm zero internal 'CRM Portal' or 'Dev OS' links exist in the Command Menu bar.", "verification": "Storefront /admin 100% isolated to 4 storefront tabs."},
            {"step": 3, "title": "Master Auth Gate Check", "description": "Verify only irasmussenjobs@gmail.com is authorized for Dev OS with SHA-256 HMAC token validation.", "verification": "Master auth gate enforced."}
        ],
        "outputs": ["Security status (ARMORED)", "Admin Command Deck isolation status", "Authentication gate status"],
        "contingency_protocol": "Immediately revoke compromised session tokens and strip any internal administrative links from storefront templates."
    },
    "agent_commit_sentinel": {
        "id": "agent_commit_sentinel",
        "code": "SOP-SEC-02",
        "title": "Git Pre-Push Commit Sentinel",
        "domain": "Security",
        "supervisor": "submaster_security_compliance",
        "mandate": "Prevent credential leakage, API secrets, and unvetted code from reaching remote or public git repositories.",
        "token_efficiency_policy": "Executes pre-push script check; consumes 0 tokens by performing regex pattern analysis locally.",
        "oahu_grounding": "Protects proprietary Oahu customer phone numbers, addresses, and Stripe payment keys from repository exposure.",
        "inputs": ["Git commit history (last 10 commits)", "Staged git diffs", "scan-secrets.ps1 patterns"],
        "execution_steps": [
            {"step": 1, "title": "Recent Commits Inspection", "description": "Scan recent commits for high-entropy strings, private keys, and API tokens.", "verification": "Zero leaked secrets detected."},
            {"step": 2, "title": "Environment File Audit", "description": "Verify all .env files and local secrets are strictly included in .gitignore.", "verification": ".env files ignored."},
            {"step": 3, "title": "Pre-Push Validation", "description": "Run scripts/scan-secrets.ps1 to verify full working tree compliance.", "verification": "Scanner returns exit code 0."}
        ],
        "outputs": ["Commit audit grade (SECURED)", "Leaked secrets count (0)", "Ignored env file verification"],
        "contingency_protocol": "Block git push immediately if a secret pattern matches; rewrite history or purge credentials before allowing push."
    },
    "agent_compliance_auditor": {
        "id": "agent_compliance_auditor",
        "code": "SOP-SEC-03",
        "title": "Regulatory & Audit Compliance Auditor",
        "domain": "Security",
        "supervisor": "submaster_security_compliance",
        "mandate": "Verify audit trail immutability, customer PII masking, production admin email routing to brian@affordablehome-ac.com with irasmussenjobs@gmail.com BCC, staging CEO Email Shield, and Hawaii business compliance.",
        "token_efficiency_policy": "Runs single SQL aggregation query on dev_os_audit_log and inspects email routing config; completes in < 3ms.",
        "oahu_grounding": "Hawaii business standards (Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005), floor drop-cloth mandate, and CEO email routing.",
        "inputs": ["dev_os_audit_log table", "apps/api/services/email.py", "Customer PII fields in database"],
        "execution_steps": [
            {"step": 1, "title": "Audit Log Integrity Check", "description": "Count audit log entries and verify sequential timestamp monotonicity and 14-day retention.", "verification": "Audit records intact and sequential."},
            {"step": 2, "title": "CEO Email Routing & Staging Shield Check", "description": "Verify production notifications route to brian@affordablehome-ac.com with irasmussenjobs@gmail.com BCC, and non-production routes exclusively to irasmussenjobs@gmail.com.", "verification": "Email routing & staging shield verified."},
            {"step": 3, "title": "PII Masking & Legal Grounding Check", "description": "Ensure customer phone numbers and emails are masked in logs and zero false drywall or legacy license claims exist.", "verification": "PII masking and legal grounding active."}
        ],
        "outputs": ["Compliance status (COMPLIANT)", "CEO email routing verification", "PII masking status"],
        "contingency_protocol": "Flag audit log gaps, unmasked PII, or email routing drift immediately for sanitation."
    },
    "agent_perimeter_auditor": {
        "id": "agent_perimeter_auditor",
        "code": "SOP-SEC-04",
        "title": "Air-Tight Local Perimeter Auditor",
        "domain": "Security",
        "supervisor": "submaster_security_compliance",
        "mandate": "Mathematically verify that the remote VPS has ZERO inbound accessibility to the local workstation environment.",
        "token_efficiency_policy": "Static network topology audit and socket verification; completed on-demand with zero token waste.",
        "oahu_grounding": "Strict one-way perimeter: workstation commands server; server possesses 0 reverse tunnels or listeners into operator machine.",
        "inputs": ["Workstation listening socket table", "Server firewall rules", "Dev OS sync endpoint configuration"],
        "execution_steps": [
            {"step": 1, "title": "Inbound Blocking Verification", "description": "Confirm local workstation exposes 0 inbound ports to the server or public network.", "verification": "Zero inbound listening ports."},
            {"step": 2, "title": "Outbound-Only Sync Audit", "description": "Verify all Master Brain synchronization is strictly client-initiated HTTPS push/pull.", "verification": "Server initiates 0 connections to client."},
            {"step": 3, "title": "Loopback Server Isolation", "description": "Verify all management daemons on the VPS are bound strictly to 127.0.0.1.", "verification": "100% loopback isolation confirmed."}
        ],
        "outputs": ["Perimeter status (ARMORED_AIRTIGHT)", "Inbound ports (0)", "Sync architecture (OUTBOUND_ONLY)"],
        "contingency_protocol": "Immediately kill any process attempting reverse inbound connection from remote to local."
    },

    # --- Commerce & Telemetry (4 Agents) ---
    "agent_funnel_telemetry": {
        "id": "agent_funnel_telemetry",
        "code": "SOP-COM-01",
        "title": "Conversion Funnel Telemetry Agent",
        "domain": "Commerce",
        "supervisor": "submaster_commerce_telemetry",
        "mandate": "Track real-time visitor progression through the 4 dedicated Window AC funnels (Warehouse Pickup/Delivery, Window AC Installation, Window AC Cleaning, Clean-vs-Replace Assessment) with zero recurring polling overhead.",
        "token_efficiency_policy": "Reads in-memory ring buffer (capped at 500 events); outputs compact aggregated conversion ratios.",
        "oahu_grounding": "Oahu homeowner service booking funnels dedicated 100% to LG & GE Window ACs and Window AC Cleaning.",
        "inputs": ["TELEMETRY_BUFFER events", "Funnel step transition timestamps"],
        "execution_steps": [
            {"step": 1, "title": "Event Ingestion & Deduplication", "description": "Process client telemetry events from in-memory ring buffer.", "verification": "Buffer length within max capacity (500)."},
            {"step": 2, "title": "Funnel Velocity Calculation", "description": "Calculate conversion rates across Landing -> Select -> Form -> Success.", "verification": "Conversion velocity > 3.0%."},
            {"step": 3, "title": "Zero-Barrier Check", "description": "Confirm no service/cleaning/estimate funnel step demands credit card payment before appointment booking.", "verification": "Zero payment traps detected."}
        ],
        "outputs": ["Funnel telemetry status (STREAMING)", "Step conversion ratios", "Drop-off analytics"],
        "contingency_protocol": "Alert CRO Sub-Master if conversion drops below 2.0% over a rolling 100-visitor window."
    },
    "agent_cro_optimizer": {
        "id": "agent_cro_optimizer",
        "code": "SOP-COM-02",
        "title": "Conversion Rate & Mobile UX Optimizer",
        "domain": "Commerce",
        "supervisor": "submaster_commerce_telemetry",
        "mandate": "Audit mobile UX heuristics, call-to-action prominence, booking form simplicity, live /api/v1/products stock synchronization on HomeFeaturedInventory & WarehouseInventoryGrid, and always-visible product Edit/Delete controls in /admin.",
        "token_efficiency_policy": "Static heuristic evaluation; completes on-demand with zero runtime LLM calls.",
        "oahu_grounding": "Optimized for Oahu mobile users searching for immediate Window AC cooling during high heat and trade-wind lulls.",
        "inputs": ["Booking form component schema", "HomeFeaturedInventory.tsx & WarehouseInventoryGrid.tsx", "apps/web/app/admin/page.tsx"],
        "execution_steps": [
            {"step": 1, "title": "Form Friction & Tap-to-Call Audit", "description": "Verify booking form requires <= 4 fields and click-to-call (808) 488-1111 button is visible on mobile.", "verification": "Friction score optimal (4 fields); phone CTA visible."},
            {"step": 2, "title": "Live Stock Synchronization Check", "description": "Verify HomeFeaturedInventory and WarehouseInventoryGrid fetch live /api/v1/products (cache: 'no-store') so stock = 0 disables Add Unit and shows Out of Stock.", "verification": "Live stock sync active on homepage and warehouse grid."},
            {"step": 3, "title": "Value Anchor & Admin UX Check", "description": "Confirm $0 Free In-Home Estimate and $45 Hawaii Energy Rebate anchors are visible, and /admin product cards have always-visible Edit/Delete buttons.", "verification": "Pricing anchors and admin action buttons verified."}
        ],
        "outputs": ["CRO status (OPTIMIZED)", "Live stock sync verification", "Mobile UX compliance check"],
        "contingency_protocol": "Recommend UI simplifications if form abandonment exceeds 40% or restore live stock fetch if static fallback regresses."
    },
    "agent_revenue_reconciler": {
        "id": "agent_revenue_reconciler",
        "code": "SOP-COM-03",
        "title": "Stripe Revenue & Webhook Reconciler",
        "domain": "Commerce",
        "supervisor": "submaster_commerce_telemetry",
        "mandate": "Reconcile Stripe payment charges, webhook events, 4.712% Oahu GET tax, PostgreSQL database order records, and CRM multi-stage invoice payment links (Deposit Paid vs Balance Due fresh Checkout Sessions).",
        "token_efficiency_policy": "Executes reconciliation query only on-demand or during deployment verification; zero background polling.",
        "oahu_grounding": "Financial reconciliation for Oahu window AC purchases, Waipahu warehouse pick-up orders, and multi-stage CRM installation/cleaning invoices.",
        "inputs": ["Stripe API charges ledger", "PostgreSQL orders table", "ahac-crm invoice checkout route"],
        "execution_steps": [
            {"step": 1, "title": "Unrecorded Charge & GET Tax Scan", "description": "Query Stripe API for recent successful charges, verify 4.712% Oahu GET tax, and compare with database orders.", "verification": "Zero unrecorded payments found."},
            {"step": 2, "title": "CRM Multi-Stage Invoice Guardrail Check", "description": "Verify CRM invoices track depositPaidCents vs balanceDueCents and create a fresh Stripe Checkout Session whenever payable balance changes.", "verification": "Stale Stripe session reuse prevented; dynamic payment methods enabled."},
            {"step": 3, "title": "Webhook Idempotency & Net Revenue Summary", "description": "Verify webhook events are processed idempotently and calculate verified gross volume and dispute count (0).", "verification": "Disputes == 0, idempotency verified."}
        ],
        "outputs": ["Reconciliation status (RECONCILED)", "CRM multi-stage invoice guardrail status", "Verified transaction volume"],
        "contingency_protocol": "Automatically create missing database order records or regenerate stale Stripe Checkout sessions if discrepancy is detected."
    },
    "agent_catalog_auditor": {
        "id": "agent_catalog_auditor",
        "code": "SOP-COM-04",
        "title": "Catalog & Specification Integrity Sentinel",
        "domain": "Commerce",
        "supervisor": "submaster_commerce_telemetry",
        "mandate": "Audit all 16 warehouse catalog products (LG Dual Inverter, LG Universal Fit, GE Built-In Through-the-Wall including AJCQ12AXXWA R-32 inverter, and GE Standard Window ACs) against factory spec sheets, verifying Dual-Sizing, 16/16 factory PDFs, 2x Retina WebP viewers, and non-destructive stock/price preservation.",
        "token_efficiency_policy": "Zero external API calls. Runs in-memory audit against products_seed.json, factory PDFs, and Retina WebP assets in < 5ms.",
        "oahu_grounding": "Protects Oahu homeowners from purchasing undersized AC units for single-wall redwood homes or mismatched window/wall sleeve dimensions.",
        "inputs": ["products_seed.json", "PostgreSQL products table", "public/specs/*.pdf (16 PDFs)", "public/assets/spec-sheets/*.webp (16 Retina WebPs)"],
        "execution_steps": [
            {"step": 1, "title": "Dual-Sizing & 16-Model Verification", "description": "Verify all 16 models ($395–$1,200) carry both AHAM Factory Certified sq. ft. and Oahu Island Microclimate Calibration sq. ft.", "verification": "Dual-coverage present on all 16 models."},
            {"step": 2, "title": "Target Flagship Audit (LW1222IVSM & AJCQ12AXXWA)", "description": "Verify LW1222IVSM (12,000 BTU, 550 sq. ft. AHAM, 250-380 sq. ft. Island, 85 lbs) and GE AJCQ12AXXWA (12,000 BTU R-32 Variable Speed Inverter, 230/208V, 13.6 CEER, 26\" wall sleeve).", "verification": "Both flagship models verified with zero spec drift across seed, DB, and CRM."},
            {"step": 3, "title": "16/16 Factory PDF & Retina WebP Check", "description": "Confirm all 16 factory PDF spec sheets and 16 2x Retina WebP mobile spec viewer images exist on disk.", "verification": "16/16 PDFs and 16/16 Retina WebPs verified."},
            {"step": 4, "title": "Non-Destructive Reseed Guardrail Check", "description": "Verify migrate_and_reseed_catalog preserves live PostgreSQL stock, price, promo_price, and discount_percent.", "verification": "Runtime stock & pricing preservation active."}
        ],
        "outputs": ["Catalog audit status (CATALOG_AUDITED)", "Models verified (16/16)", "Flagship & PDF/WebP verification (VERIFIED)"],
        "contingency_protocol": "Immediately flag drift and trigger non-destructive catalog reseed via /dev-os/catalog/migrate-and-reseed."
    },

    # --- Growth & Oahu Grounding (7 Agents) ---
    "agent_seo_metadata": {
        "id": "agent_seo_metadata",
        "code": "SOP-GRO-01",
        "title": "SEO & Oahu City Landing Page Sentinel",
        "domain": "Growth",
        "supervisor": "submaster_growth_grounding",
        "mandate": "Verify search engine indexing, semantic JSON-LD structured data, 101 canonical Window AC routes (85 static/city + 16 product), and 301 permanent redirects for all 9 retired mini-split/central AC routes.",
        "token_efficiency_policy": "Reads sitemap, middleware, and metadata definitions synchronously; zero external web crawling tokens consumed.",
        "oahu_grounding": "22 Oahu cities (Honolulu, Pearl City, Kapolei, Kailua, Kaneohe, Mililani, Ewa Beach, Waipahu, etc.) plus dedicated Window AC topical silos.",
        "inputs": ["sitemap.ts route manifest (101 routes)", "middleware.ts & next.config.js 301 redirects", "22 City landing page metadata definitions"],
        "execution_steps": [
            {"step": 1, "title": "101-Route & 22-City Coverage Audit", "description": "Verify all 101 canonical routes (including /shop/ge-built-in-wall-ac-oahu and 22 city pages) exist in sitemap.ts.", "verification": "101 canonical routes and 22/22 city routes active."},
            {"step": 2, "title": "301 Redirect & Legacy Purge Check", "description": "Confirm all 9 retired mini-split/ductless/central AC routes 301-redirect permanently to /shop or /ac-cleaning-oahu.", "verification": "9/9 retired routes 301-redirected; zero legacy pages in sitemap."},
            {"step": 3, "title": "Robots & Anti-Crawling Audit", "description": "Verify robots.ts disallows /dev-os, /admin, and internal APIs while allowing all 101 public canonical routes.", "verification": "Dev OS & /admin strictly protected; 101 public pages indexed."}
        ],
        "outputs": ["SEO status (ACTIVE_OPTIMIZING)", "Canonical routes count (101)", "301 redirect enforcement status"],
        "contingency_protocol": "Regenerate sitemap and enforce 301 redirect rules if any route indexing discrepancy is detected."
    },
    "agent_oahu_grounding": {
        "id": "agent_oahu_grounding",
        "code": "SOP-GRO-02",
        "title": "Oahu Microclimate & Technical Grounding Agent",
        "domain": "Growth",
        "supervisor": "submaster_growth_grounding",
        "mandate": "Ground Window AC load sizing, single-wall redwood & jalousie louver heat-load calibration, salt-air corrosion protection, and licensed electrical subcontractor grounding (for 208/230V circuits) in Oahu island geography.",
        "token_efficiency_policy": "Static geographic lookup table; completes in < 1ms with zero runtime computation waste.",
        "oahu_grounding": "Oahu trade-wind patterns, salt spray zones (Ewa Beach, Kailua), high-humidity valleys (Manoa, Kaneohe), and HECO 44.2¢/kWh rates.",
        "inputs": ["Oahu microclimate zone map", "Trade-wind humidity models", "Electrical subcontractor & pricing grounding rules"],
        "execution_steps": [
            {"step": 1, "title": "Microclimate Profile Matching", "description": "Map customer location to Leeward (high heat), Windward (high humidity/mold), or Central/Valley for Dual-Sizing calibration.", "verification": "Accurate climate zone and single-wall BTU calibration identified."},
            {"step": 2, "title": "Corrosion & Subcontractor Advisory", "description": "Attach corrosion protection notes for coastal properties and ground any dedicated 208/230V circuit work to licensed electrical subcontractors.", "verification": "Corrosion and subcontractor guidelines attached."},
            {"step": 3, "title": "Upfront Pricing Anchor", "description": "Attach transparent island pricing ($0 Free In-Home Estimate / $395-$1,200 inventory / $50 delivery) with zero fabricated package fees.", "verification": "Upfront pricing confirmed."}
        ],
        "outputs": ["Grounding status (GROUNDED)", "Microclimate specifications", "Subcontractor & pricing compliance"],
        "contingency_protocol": "Default to Leeward high-capacity cooling specifications if location data is ambiguous."
    },
    "agent_market_research": {
        "id": "agent_market_research",
        "code": "SOP-GRO-03",
        "title": "Oahu HVAC Market & Competitor Intelligence Agent",
        "domain": "Growth",
        "supervisor": "submaster_growth_grounding",
        "mandate": "Benchmark AHAC's Waipahu warehouse-direct LG & GE inventory ($395–$1,200) and $0 Free In-Home Estimate against island retail pricing while enforcing respectful brand reframing (zero competitor bashing or barge fearmongering).",
        "token_efficiency_policy": "Curated benchmark data structure; 0Hz background query overhead.",
        "oahu_grounding": "Waipahu central warehouse (94-150 Leoleo St. #203) same-day pickup advantage and homepage visual comparison checkmarks.",
        "inputs": ["Island AC service rate benchmarks", "Waipahu warehouse inventory ledger", "Homepage comparison matrix"],
        "execution_steps": [
            {"step": 1, "title": "Rate & Warehouse Advantage Benchmarking", "description": "Verify AHAC direct warehouse pricing ($395-$1,200) and $0 Free In-Home Estimate value moat.", "verification": "AHAC value advantage verified."},
            {"step": 2, "title": "Brand Reframing & Anti-Bashing Audit", "description": "Confirm zero competitor bashing by name, zero barge fearmongering, and zero buzzwords exist in marketing copy.", "verification": "100% professional trade terminology enforced."},
            {"step": 3, "title": "Visual Comparison Matrix Check", "description": "Verify homepage comparison table renders emerald checkmarks and responsive mobile card stacks.", "verification": "Comparison visual hierarchy intact."}
        ],
        "outputs": ["Market status (MONITORED)", "Waipahu warehouse price benchmark", "Brand reframing compliance"],
        "contingency_protocol": "Purge any sensational copy or unverified competitor claims immediately."
    },
    "agent_heco_rebate_strategist": {
        "id": "agent_heco_rebate_strategist",
        "code": "SOP-GRO-04",
        "title": "Hawaii Energy Rebate & HECO Economics Strategist",
        "domain": "Growth",
        "supervisor": "submaster_growth_grounding",
        "mandate": "Model Hawaiian Electric (HECO 44.2¢/kWh) utility economics, verify AHAC's official $45 Hawaii Energy Rebate Form for Window ACs, and guarantee the #rebate (<RebateSection />) section is active on /shop (in ShopClient.tsx, content.json, and PostgreSQL content_pages) and linked in NavbarV2.",
        "token_efficiency_policy": "Deterministic mathematical formulas and JSON/DOM checks; executed synchronously in < 2ms with zero token waste.",
        "oahu_grounding": "Hawaiian Electric (HECO) residential baseline tariff (44.2¢/kWh) and $45 Hawaii Energy Window AC instant/mail-in rebate.",
        "inputs": ["HECO 44.2¢/kWh tariff", "apps/web/lib/content/content.json", "apps/web/app/shop/ShopClient.tsx", "apps/web/components/NavbarV2.tsx"],
        "execution_steps": [
            {"step": 1, "title": "Power Consumption & Savings Modeling", "description": "Calculate annual kilowatt-hour savings ($424.32/yr) and ~9.4-month payback for LG Dual Inverter & GE R-32 Inverter window units under HECO 44.2¢/kWh rates.", "verification": "Annual savings and payback modeled accurately."},
            {"step": 2, "title": "Shop #rebate Section & DB Parity Audit", "description": "Verify 'rebate' exists in content.json shop.sections and shop.sectionOrder, and <RebateSection /> renders in ShopClient.tsx across both default and filtered views.", "verification": "Shop #rebate section 100% active in code and DB."},
            {"step": 3, "title": "NavbarV2 Rebate Anchor Verification", "description": "Verify '$45 Hawaii Energy Rebates' link (/shop#rebate) is present in the Shop Window AC dropdown in NavbarV2.", "verification": "NavbarV2 #rebate quick-jump link verified."}
        ],
        "outputs": ["Rebate status (REBATE_GROUNDED)", "Electricity savings estimate ($424/yr)", "Shop #rebate & NavbarV2 anchor status (ACTIVE)"],
        "contingency_protocol": "Immediately restore 'rebate' to shop.sections and sectionOrder in both content.json and PostgreSQL content_pages if missing."
    },
    "agent_gsc_ga4_analytics": {
        "id": "agent_gsc_ga4_analytics",
        "code": "SOP-GRO-05",
        "title": "Search Console & GA4 Performance Analytics Sentinel",
        "domain": "Growth",
        "supervisor": "submaster_growth_grounding",
        "mandate": "Ingest and analyze Google Search Console query impressions and GA4 funnel telemetry across all 101 canonical Window AC routes to detect high-impression / low-CTR bottlenecks.",
        "token_efficiency_policy": "On-demand execution with cached aggregation; executes in < 4ms without external polling overhead.",
        "oahu_grounding": "Tracks localized Oahu Window AC search queries across Honolulu, Waipahu, Kailua, Kapolei, Ewa Beach, and Mililani.",
        "inputs": ["Google Search Console query performance data", "GA4 user session telemetry", "Funnel stage drop-off logs"],
        "execution_steps": [
            {"step": 1, "title": "GSC Window AC Query Cluster Audit", "description": "Scan Search Console impressions for high-volume Window AC & cleaning keywords with CTR < 3.0%.", "verification": "High-impression Window AC opportunity queries identified."},
            {"step": 2, "title": "GA4 Funnel Drop-off Analysis", "description": "Track session progression from landing page to product view, lead wizard, and Stripe checkout.", "verification": "Stage drop-off rates quantified."},
            {"step": 3, "title": "Opportunity Matrix Generation", "description": "Correlate search impressions with conversion barriers across all 101 canonical routes.", "verification": "Analytics opportunity report compiled."}
        ],
        "outputs": ["GSC query cluster report", "GA4 funnel efficiency index", "Underperforming route alerts"],
        "contingency_protocol": "Alert growth sub-master when any high-volume Window AC query cluster experiences > 20% CTR drop."
    },
    "agent_schema_metadata_engine": {
        "id": "agent_schema_metadata_engine",
        "code": "SOP-GRO-06",
        "title": "Structured Data Schema & Dynamic SERP Enhancer",
        "domain": "Growth",
        "supervisor": "submaster_growth_grounding",
        "mandate": "Generate, validate, and update Google Rich Results compliant JSON-LD schemas (Product, HVACBusiness, LocalBusiness, FAQPage, AggregateRating 4.9★ across 142 reviews) across all 101 canonical routes.",
        "token_efficiency_policy": "Deterministic schema generation using static templates; executes in < 2ms with zero runtime LLM overhead.",
        "oahu_grounding": "Embeds Waipahu warehouse coordinates, Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005 trust grounding, and GET tax compliance.",
        "inputs": ["Route metadata registry (101 routes)", "Product catalog pricing/stock ($395-$1,200)", "reviews_db.json (142 reviews)"],
        "execution_steps": [
            {"step": 1, "title": "Schema Integrity Audit", "description": "Validate JSON-LD schemas (Product, HVACBusiness, LocalBusiness, FAQPage) for zero schema.org errors and zero legacy non-window AC services.", "verification": "100% valid schema markup across all 101 routes."},
            {"step": 2, "title": "SERP Rich Snippet Injection", "description": "Ensure dynamic prices ($395-$1,200), stock availability, 4.9★ AggregateRating (142 reviews), and Waipahu warehouse details appear in structured output.", "verification": "Rich snippet attributes verified."},
            {"step": 3, "title": "Trust String Grounding Check", "description": "Confirm all schemas use 'Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005' with zero legacy license strings.", "verification": "Trust grounding 100% aligned."}
        ],
        "outputs": ["Schema catalog status (SCHEMA_OPTIMIZED)", "Rich snippet coverage rate (100%)", "Dynamic metadata templates"],
        "contingency_protocol": "Flag and automatically repair any invalid JSON-LD schema markup upon route deployment."
    },
    "agent_high_intent_planner": {
        "id": "agent_high_intent_planner",
        "code": "SOP-GRO-07",
        "title": "High-Intent SEO & CRO Planning Sentinel",
        "domain": "Growth",
        "supervisor": "submaster_growth_grounding",
        "mandate": "Supervise high-intent Window AC landing page roadmaps (including /shop/ge-built-in-wall-ac-oahu, /clean-vs-replace-window-ac, /window-ac-installation, /ac-cleaning-oahu), cross-funnel bridges, and stream continuous CRO recommendations.",
        "token_efficiency_policy": "On-demand execution with memory-mapped recommendation catalog; completes in < 3ms.",
        "oahu_grounding": "Bridges Oahu search intents: clean-vs-replace assessments, LG Dual Inverter & GE 26\" through-the-wall sleeve replacements, and Window AC cleaning.",
        "inputs": ["GSC opportunity queries", "Shop inventory ledger (16 LG & GE models)", "High-intent topical silo routes"],
        "execution_steps": [
            {"step": 1, "title": "High-Intent Page Roadmap Review", "description": "Audit production status of high-intent conversion pages including /shop/ge-built-in-wall-ac-oahu, /clean-vs-replace-window-ac, /window-ac-installation, and /shop/window-ac-plug-guide.", "verification": "All active Window AC topical silos tracked in catalog."},
            {"step": 2, "title": "Cross-Funnel Bridge Verification", "description": "Verify that cleaning pages offer unit replacements, shop pages offer installation & #rebate, and sleeve guides link directly to GE AJCQ models.", "verification": "Cross-funnel CTAs verified active."},
            {"step": 3, "title": "Continuous CRO Recommendation Stream", "description": "Generate prioritized UI, content, and CTA adjustments based on real-time funnel telemetry.", "verification": "Active recommendations published to Dev OS."}
        ],
        "outputs": ["High-intent page roadmap", "Cross-funnel bridge status (ACTIVE)", "Streaming CRO recommendations"],
        "contingency_protocol": "Immediately flag any disconnected commercial touchpoint or unaddressed high-volume Window AC search query."
    },

    # --- Customer Operations & CRM (3 Agents) ---
    "agent_crm_dispatch": {
        "id": "agent_crm_dispatch",
        "code": "SOP-CRM-01",
        "title": "CRM Dispatch & Technician Queue Agent",
        "domain": "Operations",
        "supervisor": "submaster_crm_operations",
        "mandate": "Manage incoming Window AC service requests, technician dispatch queues, Waipahu warehouse pickup staging, and By-Appointment-First customer contact with brian@affordablehome-ac.com primary notifications.",
        "token_efficiency_policy": "Direct SQLAlchemy query on leads table with status index; execution time < 5ms.",
        "oahu_grounding": "Oahu-wide technician dispatch covering Honolulu, Leeward, Central, and Windward zones from Waipahu headquarters.",
        "inputs": ["PostgreSQL leads table", "Lead status enum (NEW, SCHEDULED, COMPLETED)", "Email dispatch routing config"],
        "execution_steps": [
            {"step": 1, "title": "New Lead Ingest", "description": "Query leads table for all records with status == NEW.", "verification": "Pending count calculated."},
            {"step": 2, "title": "By-Appointment-First Gate Check", "description": "Verify all customer records require phone scheduling contact before any payment or truck roll.", "verification": "Zero unauthorized truck rolls."},
            {"step": 3, "title": "Waipahu Warehouse Pickup & Email Audit", "description": "Track customer pickup orders at Waipahu warehouse (94-150 Leoleo St #203) and confirm dispatch alerts route to brian@affordablehome-ac.com with irasmussenjobs@gmail.com BCC.", "verification": "Same-day pickup staging and email routing maintained."}
        ],
        "outputs": ["Dispatch status (DISPATCH_READY)", "Pending scheduling count", "Turnaround metric"],
        "contingency_protocol": "Notify dispatch manager if new leads remain uncontacted for more than 2 hours during operating hours."
    },
    "agent_customer_lifecycle": {
        "id": "agent_customer_lifecycle",
        "code": "SOP-CRM-02",
        "title": "Customer Lifecycle & Maintenance Recall Agent",
        "domain": "Operations",
        "supervisor": "submaster_crm_operations",
        "mandate": "Track Window AC service intervals, schedule 6-month and 12-month seasonal Window AC coil cleaning & antimicrobial pan treatment recalls, and manage 1-year warranty compliance.",
        "token_efficiency_policy": "Scheduled date range queries on completed leads; zero continuous CPU burn.",
        "oahu_grounding": "Oahu salt air and humidity cause coil biofilm and drain pan clogging within 6-12 months without proactive Window AC cleaning.",
        "inputs": ["Completed Window AC service records", "Equipment installation dates", "Customer feedback scores (142 verified reviews)"],
        "execution_steps": [
            {"step": 1, "title": "Service Interval Calculation", "description": "Identify customers reaching 6 months (coastal Window AC coil cleaning) or 12 months (annual filter, pan & corrosion check).", "verification": "Recall list compiled."},
            {"step": 2, "title": "Customer Satisfaction Tracking", "description": "Calculate customer satisfaction rate from completed Window AC service reviews (4.9★ across 142 reviews).", "verification": "Satisfaction rate >= 98.0%."},
            {"step": 3, "title": "Warranty Protection Check", "description": "Verify 1-year manufacturer and workmanship warranty coverage active on all eligible Window AC jobs.", "verification": "Warranty records verified."}
        ],
        "outputs": ["Lifecycle status (TRACKING)", "Maintenance recall intervals", "Customer satisfaction rate"],
        "contingency_protocol": "Trigger automated follow-up check if any service review indicates customer dissatisfaction."
    },
    "agent_intake_triage": {
        "id": "agent_intake_triage",
        "code": "SOP-CRM-03",
        "title": "Window AC Symptom & Intake Triage Agent",
        "domain": "Operations",
        "supervisor": "submaster_crm_operations",
        "mandate": "Triage incoming Window AC service requests by reported symptom (musty odor, warm air, ice buildup, blinking filter light, noisy compressor, 26\" wall sleeve rust) to route between Waipahu Warehouse Direct Replacement vs Window AC Cleaning & Installation Dispatch.",
        "token_efficiency_policy": "In-memory string keyword categorization on incoming lead notes; completed in < 2ms.",
        "oahu_grounding": "Waipahu central warehouse (94-150 Leoleo St #203) stocks factory-sealed LG & GE replacement units ($395-$1,200) and normalized crm_products.",
        "inputs": ["Lead notes and Window AC symptom descriptions", "Service type selections (Window AC cleaning, installation, sleeve replacement, or clean-vs-replace)"],
        "execution_steps": [
            {"step": 1, "title": "Window AC Symptom Keyword Analysis", "description": "Scan lead notes for mold/odor, evaporator icing/freeze, condensate drain pan overflow, or compressor failure.", "verification": "Symptom breakdown populated."},
            {"step": 2, "title": "Clean-vs-Replace Routing Determination", "description": "Route rusted/failed window or wall-sleeve units to Clean-vs-Replace Assessment & Waipahu Warehouse Direct inventory; route viable units to Window AC cleaning dispatch.", "verification": "Appropriate Window AC service path assigned."},
            {"step": 3, "title": "Emergency Priority Check", "description": "Flag severe heat vulnerability or medical necessity for expedited dispatch.", "verification": "High-priority flags honored."}
        ],
        "outputs": ["Triage status (TRIAGE_READY)", "Symptom breakdown counts", "Routing recommendations"],
        "contingency_protocol": "Escalate urgent cooling failure requests directly to master dispatch queue."
    },

    # --- Deployment & Quality Swarm (4 Agents) ---
    "agent_deployment_guardian": {
        "id": "agent_deployment_guardian",
        "code": "SOP-DEP-01",
        "title": "Zero-Downtime Deployment Guardian",
        "domain": "Deployment",
        "supervisor": "submaster_deployment_quality",
        "mandate": "Coordinate blue/green container rebuilds, Nginx configuration validation, and zero-downtime production rollouts across prod-web, prod-api, prod-dev-os, and ahac-crm.",
        "token_efficiency_policy": "Triggered only during deployment sequences; zero background polling or idle daemon overhead.",
        "oahu_grounding": "Guarantees zero downtime for Oahu homeowners visiting www.affordablehome-ac.com at all hours.",
        "inputs": ["Git branch status (main)", "docker-compose.prod.yml configuration", "Nginx syntax test results"],
        "execution_steps": [
            {"step": 1, "title": "Git Branch & Working Tree Check", "description": "Verify git branch is main and working tree is clean before deployment.", "verification": "Branch == main, clean working tree."},
            {"step": 2, "title": "Zero-Downtime Rebuild", "description": "Execute targeted container build with up -d --no-deps to ensure live site never drops.", "verification": "Containers rebuilt with 0s downtime."},
            {"step": 3, "title": "Nginx Reverse Proxy Test", "description": "Execute nginx -t syntax verification before issuing reload.", "verification": "Syntax ok, reload successful."}
        ],
        "outputs": ["Deployment status (SYNCED)", "Zero-downtime protocol verification", "Git branch confirmation"],
        "contingency_protocol": "Instantly abort deployment and roll back container if health probe fails within 30 seconds."
    },
    "agent_build_qa": {
        "id": "agent_build_qa",
        "code": "SOP-DEP-02",
        "title": "Next.js Production Build, TypeScript & Viewport QA Agent",
        "domain": "Deployment",
        "supervisor": "submaster_deployment_quality",
        "mandate": "Verify Next.js production compilation across all 101 canonical routes, TypeScript zero-error typing across apps/web and apps/dev-os, and 3-row fixed NavbarV2 top-padding clearance across all 74 page.tsx files.",
        "token_efficiency_policy": "Runs compiler and AST/padding checks synchronously during build/verification; zero runtime token burn.",
        "oahu_grounding": "Prevents client-side crashes and fixed-header overlap on mobile and desktop viewports across Oahu.",
        "inputs": ["TypeScript compiler output (tsc)", "Next.js route manifest (101 routes)", "All 74 apps/web/app/**/page.tsx files"],
        "execution_steps": [
            {"step": 1, "title": "TypeScript Strict Compile", "description": "Verify zero TypeScript errors across apps/web and apps/dev-os.", "verification": "0 type errors."},
            {"step": 2, "title": "101-Route Next.js Compilation", "description": "Verify all 101 canonical static, city, and product routes compile cleanly into optimized bundles.", "verification": "101 canonical routes compiled."},
            {"step": 3, "title": "3-Row NavbarV2 Viewport Clearance Audit", "description": "Verify all 74 page.tsx files enforce 3-row fixed header clearance (pt-[88px] md:pt-[176px] on /, md:pt-[180px] on 72 routes, pt-20 md:pt-[192px] on /admin) with zero cramped md:pt-20..40 overlaps.", "verification": "74/74 page.tsx routes clear fixed NavbarV2."}
        ],
        "outputs": ["Build QA status (VERIFIED)", "Compiled routes count (101)", "Viewport clearance audit (74/74 pages)"],
        "contingency_protocol": "Reject build and prevent deployment if any TypeScript error or fixed-header padding regression is detected."
    },
    "agent_regression_sentinel": {
        "id": "agent_regression_sentinel",
        "code": "SOP-DEP-03",
        "title": "Non-Regression, Dropdown Armor & Deception Guard Sentinel",
        "domain": "Deployment",
        "supervisor": "submaster_deployment_quality",
        "mandate": "Enforce By-Appointment-First rule, zero credit card service checkout gates, floor drop-cloth legal protection, 100% Window AC focus, solid bg-[#060a12] z-[120] Shop Window AC dropdown armor, and isolated /admin Command Deck.",
        "token_efficiency_policy": "Static pattern verification across UI components and legal templates; 0Hz idle token cost.",
        "oahu_grounding": "Insured Oahu cooling specialist integrity; guarantees honest pricing, crystal-clear navigation menus, and zero bait-and-switch claims on Oahu.",
        "inputs": ["NavbarV2.tsx", "apps/web/app/admin/page.tsx", "apps/web/app/shop/ShopClient.tsx", "Service agreement disclaimer text"],
        "execution_steps": [
            {"step": 1, "title": "By-Appointment-First & Drop-Cloth Audit", "description": "Verify service booking funnel requires zero credit card input prior to scheduling contact and includes floor drop-cloth workmanship protection.", "verification": "100% zero-card service booking and drop-cloth clause verified."},
            {"step": 2, "title": "NavbarV2 Dropdown & Shop #rebate Check", "description": "Confirm Shop Window AC dropdown uses solid bg-[#060a12] at z-[120] (zero /98 opacity bleed-through) and links to /shop#rebate.", "verification": "Dropdown opaque armor and #rebate link verified."},
            {"step": 3, "title": "Admin Command Deck Isolation Audit", "description": "Verify /admin Command Menu is positioned below NavbarV2 (pt-20 md:pt-[192px], sticky top-[72px] md:top-[168px]) with zero Dev OS or CRM links.", "verification": "/admin Command Deck isolated and unoccluded."}
        ],
        "outputs": ["Regression status (NON_REGRESSIVE)", "Dropdown & Admin UI armor (ACTIVE)", "Drop-cloth legal protection (ACTIVE)"],
        "contingency_protocol": "Immediately block any commit that reintroduces upfront service pay gates, transparent dropdown bleed, or internal links in /admin."
    },
    "agent_spatial_visualizer": {
        "id": "agent_spatial_visualizer",
        "code": "SOP-DEP-04",
        "title": "3D Spatial Caliper & Cutaway Engine",
        "domain": "Deployment",
        "supervisor": "submaster_deployment_quality",
        "mandate": "Supervise 3D architectural spatial cutaway generation (16 fit cutaways), vector HUD caliper compositing, 16 factory PDF spec sheets, and 16 2x Retina WebP mobile spec sheet viewers for all LG & GE window and wall-sleeve AC units.",
        "token_efficiency_policy": "High-velocity client rendering; authentic model photography synthesized with architectural cutaways and vector HUD; outputs optimized WebP.",
        "oahu_grounding": "Visualizes standard window sill, jalousie frame, and 26\" through-the-wall sleeve fit directly for Hawaii homeowners, eliminating dimension ambiguity prior to dispatch.",
        "inputs": ["public/assets/products/cutaways/*.webp (16 cutaways)", "public/specs/*.pdf (16 PDFs)", "public/assets/spec-sheets/*.webp (16 Retina WebPs)"],
        "execution_steps": [
            {"step": 1, "title": "16/16 Cutaway Asset Check", "description": "Verify existence of all 16 product_{id}_fit_cutaway.webp assets.", "verification": "All 16 cutaway assets exist with size < 130KB."},
            {"step": 2, "title": "16/16 Factory PDF & Retina WebP Check", "description": "Verify all 16 factory PDF spec sheets and 16 2x Retina WebP mobile spec viewer assets (including GE AJCQ12AXXWA).", "verification": "16/16 PDFs and 16/16 Retina WebPs verified."},
            {"step": 3, "title": "Spatial Fit Resolution & Zero CLS", "description": "Verify aspect-ratio containers and high-DPI contrast on mobile and desktop product modals.", "verification": "Zero CLS, responsive rendering verified."}
        ],
        "outputs": ["Spatial engine status (SPATIAL_VERIFIED)", "Rendered cutaway count (16/16)", "Factory PDF & Retina WebP count (16/16)"],
        "contingency_protocol": "Trigger local python scripts/generate_window_3d_render.py and scripts/apply_caliper_overlay.py if asset checksum fails."
    },

    # --- SERP & Intent Acquisition (3 Agents) ---
    "agent_serp_intent_harvester": {
        "id": "agent_serp_intent_harvester",
        "code": "SOP-SERP-01",
        "title": "SERP Intent Harvester Sentinel",
        "domain": "SERP Acquisition",
        "supervisor": "submaster_serp_acquisition",
        "mandate": "Harvest and cluster high-intent Oahu search queries across LG & GE Window AC sales, Waipahu warehouse pickup, Window AC cleaning, jalousie installation, and 26\" through-the-wall sleeve replacements.",
        "token_efficiency_policy": "In-memory query clustering against historical Search Console cache. Zero external network requests.",
        "oahu_grounding": "Captures local microclimate queries ('kailua window ac cleaning', 'ewa beach lg dual inverter', 'oahu 26 inch wall sleeve ac replacement').",
        "inputs": ["GSC query logs", "Search query cluster index (101 canonical routes)"],
        "execution_steps": [
            {"step": 1, "title": "Window AC Cluster Analysis", "description": "Cluster queries by intent: Waipahu warehouse purchase, 26\" wall sleeve replacement, jalousie installation, or Window AC mold cleaning.", "verification": "High-intent Window AC queries segmented with > 1,500 monthly impressions."},
            {"step": 2, "title": "CTR Gap & Legacy Drift Detection", "description": "Identify queries ranking in top 5 with CTR below 3.5% and confirm zero retired mini-split/ductless keyword targeting.", "verification": "Target Window AC queries flagged for title craftsman optimization."}
        ],
        "outputs": ["Top Window AC query clusters", "Identified CTR gaps", "Intent harvesting status (HARVESTING_ACTIVE)"],
        "contingency_protocol": "Recommend targeted title adjustments to submaster_serp_acquisition."
    },
    "agent_ctr_title_craftsman": {
        "id": "agent_ctr_title_craftsman",
        "code": "SOP-SERP-02",
        "title": "CTR Title Tag Craftsman Sentinel",
        "domain": "SERP Acquisition",
        "supervisor": "submaster_serp_acquisition",
        "mandate": "Formulate and audit click-optimized Window AC title tags, price anchors ($0 Free In-Home Estimate, $395–$1,200), and phone hotlines ((808) 488-1111) across all 101 canonical Oahu routes.",
        "token_efficiency_policy": "Deterministic title syntax parsing. Zero external tokens consumed.",
        "oahu_grounding": "Embeds Waipahu local stock availability and Honolulu phone bridge directly into Google SERP blue link snippets.",
        "inputs": ["apps/web/app page metadata (101 routes)", "22 City page route templates"],
        "execution_steps": [
            {"step": 1, "title": "City Template Title Audit", "description": "Verify all 22 city pages format title as ${city} Window AC Sales, Installation & Cleaning | $0 Estimate | (808) 488-1111.", "verification": "All 22 city templates match Window AC conversion title standard."},
            {"step": 2, "title": "Canonical Link & Legacy Purge Integrity", "description": "Verify zero root canonical override on subpages and zero mini-split/ductless terms in any title or meta description.", "verification": "101 canonical routes 100% Window AC aligned."}
        ],
        "outputs": ["Title tag compliance (100%)", "Title craftsman status (TITLES_CRAFTED)"],
        "contingency_protocol": "Auto-correct malformed title templates."
    },
    "agent_merchant_feed_sentinel": {
        "id": "agent_merchant_feed_sentinel",
        "code": "SOP-SERP-03",
        "title": "Google Merchant Feed Sentinel",
        "domain": "SERP Acquisition",
        "supervisor": "submaster_serp_acquisition",
        "mandate": "Audit Google Merchant Center XML feed and Product JSON-LD schema for all 16 LG & GE Window AC models (including GE AJCQ12AXXWA R-32 inverter), verifying validFrom, priceValidUntil, and aggregateRating deduplication.",
        "token_efficiency_policy": "Sub-millisecond XML/JSON schema inspection. Zero external calls.",
        "oahu_grounding": "Ensures all 16 Waipahu warehouse window & wall-sleeve AC models display clean 4.9-star rich snippets and transparent Oahu pricing ($395–$1,200) on Google Shopping.",
        "inputs": ["apps/web/app/api/google-feed/route.ts", "apps/web/app/shop/[slug]/layout.tsx", "products_seed.json"],
        "execution_steps": [
            {"step": 1, "title": "16-Model Merchant XML Validation", "description": "Verify XML feed renders valid RSS 2.0 with g:price, g:availability, and updated GE AJCQ12AXXWA SKU.", "verification": "16 LG & GE products syndicating to Google Merchant Center."},
            {"step": 2, "title": "Schema Deduplication Audit", "description": "Verify zero duplicate aggregateRating blocks across city and shop layouts.", "verification": "Clean single aggregateRating per product/service."}
        ],
        "outputs": ["Merchant feed status (MERCHANT_FEED_VERIFIED)", "Audited products (16)"],
        "contingency_protocol": "Filter malformed schema nodes prior to build compilation."
    },

    # --- Frictionless Conversion Velocity (4 Agents) ---
    "agent_mobile_checkout_sentinel": {
        "id": "agent_mobile_checkout_sentinel",
        "code": "SOP-CONV-01",
        "title": "Mobile Checkout Sentinel",
        "domain": "Conversion",
        "supervisor": "submaster_conversion_velocity",
        "mandate": "Validate 1-tap mobile wallet availability (Apple Pay, Google Pay, Stripe Link) across storefront checkout and CRM multi-stage invoice checkout sessions.",
        "token_efficiency_policy": "In-memory inspection of Stripe checkout session creation parameters; 0Hz idle cost.",
        "oahu_grounding": "Enables Oahu mobile shoppers on LTE/5G to complete unit purchases or pay invoice deposits/balances in under 15 seconds without typing credit cards manually.",
        "inputs": ["apps/web/app/create-checkout-session/route.ts", "apps/web/app/api/checkout/route.ts", "ahac-crm invoice checkout route"],
        "execution_steps": [
            {"step": 1, "title": "Dynamic Payment Method Audit", "description": "Verify payment_method_types is omitted/dynamic so Apple Pay, Google Pay, and Link render automatically.", "verification": "Restricted ['card'] array absent across storefront and CRM."},
            {"step": 2, "title": "Origin & Fresh Session Audit", "description": "Verify origin fallback resolves to https://www.affordablehome-ac.com and CRM invoices create fresh sessions when balance changes.", "verification": "Production origin and fresh session guardrails verified."}
        ],
        "outputs": ["Mobile checkout status (MOBILE_WALLETS_ARMORED)", "Supported wallets (Apple Pay, Google Pay, Link)"],
        "contingency_protocol": "Restore dynamic payment method configurations immediately upon restriction detection."
    },
    "agent_trust_authority_grounder": {
        "id": "agent_trust_authority_grounder",
        "code": "SOP-CONV-02",
        "title": "Trust Authority Grounder Sentinel",
        "domain": "Conversion",
        "supervisor": "submaster_conversion_velocity",
        "mandate": "Embed 'Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005', 1-year manufacturer warranty, and floor drop-cloth protection across checkout, footer, and schemas with zero legacy license strings.",
        "token_efficiency_policy": "Static inspection of checkout page UI tree, Footer, and warranty trust cards.",
        "oahu_grounding": "Replaces hostile 'All Sales Final / No Refunds' warnings and legacy license claims with reassuring Waipahu warehouse pickup and insured specialist proof.",
        "inputs": ["apps/web/app/checkout/page.tsx", "apps/web/components/Footer.tsx"],
        "execution_steps": [
            {"step": 1, "title": "Hostile Warning & Legacy License Audit", "description": "Confirm all intimidating red 'All Sales Final' banners and legacy license strings have been purged.", "verification": "Hostile banners and legacy license strings absent."},
            {"step": 2, "title": "Warehouse & Insured Specialist Card Check", "description": "Confirm presence of Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005 and 1-Year Warranty reassurance card.", "verification": "Reassurance card verified in checkout and footer DOM."}
        ],
        "outputs": ["Trust grounding status (TRUST_GROUNDED)", "Trust badge active (Waipahu Warehouse Direct • Est. 2005)"],
        "contingency_protocol": "Revert to high-trust reassurance layout if any checkout or footer template regresses."
    },
    "agent_zero_friction_navigator": {
        "id": "agent_zero_friction_navigator",
        "code": "SOP-CONV-03",
        "title": "Zero-Friction Navigator Sentinel",
        "domain": "Conversion",
        "supervisor": "submaster_conversion_velocity",
        "mandate": "Enforce strict anti-upsell mandate, eliminate checkout dead-ends, maintain solid bg-[#060a12] z-[120] Shop Window AC dropdown armor, enforce .scrollbar-none horizontal filter tracks, and provide 1-tap phone bridges.",
        "token_efficiency_policy": "Zero token overhead. Performs code pattern scan for modal popups, dropdown opacity classes, and scrollbar utilities.",
        "oahu_grounding": "Protects Oahu shoppers from aggressive sales tactics and visual dropdown bleed-through; ensures clean, high-contrast navigation.",
        "inputs": ["apps/web/app/checkout/page.tsx", "apps/web/components/NavbarV2.tsx", "apps/web/app/globals.css"],
        "execution_steps": [
            {"step": 1, "title": "Anti-Upsell Audit", "description": "Scan checkout pipeline for upsell modals, warranty add-ons, or accessory bundle checkboxes.", "verification": "0 upsell components found."},
            {"step": 2, "title": "Dropdown Opaque Surface & Scrollbar Check", "description": "Verify NavbarV2 dropdown uses solid bg-[#060a12] z-[120] (zero /98 opacity bleed) and globals.css defines .scrollbar-none / .no-scrollbar.", "verification": "Opaque dropdown armor and scrollbar-none utilities verified."},
            {"step": 3, "title": "Dispatch Phone Bridge Check", "description": "Verify (808) 488-1111 phone bridge is clickable with tel: URI.", "verification": "1-tap phone bridge verified."}
        ],
        "outputs": ["Friction status (FRICTION_ZERO)", "Anti-upsell & Dropdown Armor compliance (100% ENFORCED)"],
        "contingency_protocol": "Block any pull request introducing checkout modals, accessory add-ons, or transparent dropdown menus."
    },
    "agent_speed_core_vital_sentinel": {
        "id": "agent_speed_core_vital_sentinel",
        "code": "SOP-CONV-04",
        "title": "Speed & Core Web Vitals Sentinel",
        "domain": "Conversion",
        "supervisor": "submaster_conversion_velocity",
        "mandate": "Enforce mobile sub-100ms TTFB, zero Cumulative Layout Shift (CLS = 0.00), universal zero-cache headers for dynamic routes, and 3-row fixed NavbarV2 viewport clearance across all 74 page.tsx routes.",
        "token_efficiency_policy": "Headers, padding, and bundle size analyzer; sub-5ms in-memory inspection.",
        "oahu_grounding": "Optimizes page delivery and prevents top-nav overlap across Hawaii cellular networks and desktop monitors.",
        "inputs": ["Nginx response headers", "Next.js cache-control headers", "74 apps/web/app/**/page.tsx files"],
        "execution_steps": [
            {"step": 1, "title": "Cache-Control & Live API Audit", "description": "Verify shop, checkout, and /api/v1/products emit no-cache, no-store, must-revalidate.", "verification": "Universal zero-cache headers active."},
            {"step": 2, "title": "CLS & 3-Row Navbar Clearance Verification", "description": "Verify images have fixed aspect-ratio boxes and all 74 page.tsx routes enforce pt-[88px] md:pt-[176px]..[192px] clearance below the 3-row fixed NavbarV2.", "verification": "CLS verified at 0.00; 74/74 pages clear fixed header."}
        ],
        "outputs": ["Core Web Vitals status (VITALS_OPTIMAL)", "LCP target (< 2.0s)", "CLS (0.00) & 74/74 Viewport Clearance"],
        "contingency_protocol": "Alert Sovereign Master on any asset addition or top-padding regression causing layout shift or header overlap."
    },

    # --- Creative AI & Spatial Media Studio (4 Agents) ---
    "agent_comfyui_bridge": {
        "id": "agent_comfyui_bridge",
        "code": "SOP-STU-01",
        "title": "ComfyUI Studio Bridge Sentinel",
        "domain": "Creative Studio",
        "supervisor": "submaster_creative_studio",
        "mandate": "Audit workstation RTX 4090 GPU VRAM headroom and interface with local ComfyUI instance on D:\\Studio\\v266\\App\\ComfyUI with zero-broken-image SVG fallback protection.",
        "token_efficiency_policy": "Zero token waste; queries local nvidia-smi and HTTP loopback on port 8188 strictly on demand.",
        "oahu_grounding": "Coordinates workstation raytracing and diffusion models without placing load on live Hostinger VPS storefront.",
        "inputs": ["nvidia-smi stdout", "http://127.0.0.1:8188/system_stats", "scripts/comfyui_studio_bridge.py"],
        "execution_steps": [
            {"step": 1, "title": "VRAM Headroom Audit", "description": "Query nvidia-smi for total and free VRAM on RTX 4090.", "verification": "VRAM free > 16,000 MB or offline fallback active."},
            {"step": 2, "title": "Studio Directory & Fallback Verification", "description": "Confirm D:\\Studio\\v266\\App\\ComfyUI directory or Polynesian SVG fallback avatars exist.", "verification": "Studio bridge and offline fallbacks verified."}
        ],
        "outputs": ["Bridge status (STUDIO_BRIDGE_ARMED)", "VRAM stats", "GPU model"],
        "contingency_protocol": "Log warning and route to SVG fallback generation if ComfyUI loopback is unreachable."
    },
    "agent_avatar_portrait_crafter": {
        "id": "agent_avatar_portrait_crafter",
        "code": "SOP-STU-02",
        "title": "Oahu Avatar Portrait Crafter",
        "domain": "Creative Studio",
        "supervisor": "submaster_creative_studio",
        "mandate": "Formulate demographic prompt matrices for authentic Oahu customer avatars and audit all 142 verified customer reviews across apps/web and apps/api for 100% Window AC & Window AC Cleaning service tag purity.",
        "token_efficiency_policy": "In-memory prompt matrix and JSON review audit; zero runtime GPU polling.",
        "oahu_grounding": "Grounds imagery and 142 customer reviews in authentic island residential settings: lanais, jalousie windows, technician aloha spotlights (Brian, Chris, Makoa, Omar), and whisper-quiet LG & GE window units.",
        "inputs": ["OAHU_AVATAR_PROMPTS matrix", "apps/web/lib/content/reviews_db.json", "apps/api/content/reviews_db.json"],
        "execution_steps": [
            {"step": 1, "title": "Demographic Archetype Audit", "description": "Verify coverage across Oahu communities (Windward, Leeward, Central, Metro).", "verification": "4 distinct regional archetypes active."},
            {"step": 2, "title": "142-Review Window AC Tag Purity Audit", "description": "Verify all 142 reviews across web and API databases carry strictly Window AC & Window AC Cleaning service tags (zero mini-split tags).", "verification": "142/142 reviews 100% Window AC aligned."}
        ],
        "outputs": ["Portrait matrix status (PORTRAIT_MATRIX_ACTIVE)", "Verified reviews count (142/142)"],
        "contingency_protocol": "Fall back to Polynesian geometric gradient avatars if generation fails QC; strip any non-window AC review tag immediately."
    },
    "agent_trust_medallion_forge": {
        "id": "agent_trust_medallion_forge",
        "code": "SOP-STU-03",
        "title": "Trust Medallion Forge Sentinel",
        "domain": "Creative Studio",
        "supervisor": "submaster_creative_studio",
        "mandate": "Forge 3D golden review medallions and Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005 shields.",
        "token_efficiency_policy": "Vector SVG and pre-rendered WebP assets; 0Hz runtime CPU cost.",
        "oahu_grounding": "Embeds Waipahu local warehouse proof and Est. 2005 heritage directly into trust assets.",
        "inputs": ["apps/web/public/assets/reviews/trust_medallion_gold.svg", "Waipahu warehouse verification details"],
        "execution_steps": [
            {"step": 1, "title": "Medallion Vector Verification", "description": "Verify gold medallion SVG renders with gold gradient and Waipahu Warehouse Direct engraving.", "verification": "trust_medallion_gold.svg verified."},
            {"step": 2, "title": "Resolution Scaling Audit", "description": "Confirm vector scalability without raster pixelation on high-DPI mobile screens.", "verification": "Scalable SVG verified."}
        ],
        "outputs": ["Medallions status (MEDALLIONS_FORGED)", "Available badge formats (SVG, WebP)"],
        "contingency_protocol": "Regenerate medallion vector from scripts/comfyui_studio_bridge.py --generate-fallbacks if asset missing."
    },
    "agent_asset_optimizer_sentinel": {
        "id": "agent_asset_optimizer_sentinel",
        "code": "SOP-STU-04",
        "title": "Asset Optimizer & CLS Sentinel",
        "domain": "Creative Studio",
        "supervisor": "submaster_creative_studio",
        "mandate": "Enforce strict WebP compression under 80KB for review avatars, verify all 16 2x Retina WebP spec sheet images, guarantee zero CLS (0.00), and verify full-width 3-column desktop card layout (md:w-full md:max-w-none h-full) in ReviewsPavilion.",
        "token_efficiency_policy": "File size and layout inspector; sub-2ms disk check.",
        "oahu_grounding": "Guarantees rapid initial page loads on Oahu LTE cellular networks and balanced 3-column review grids on desktop.",
        "inputs": ["apps/web/public/assets/reviews/*", "apps/web/public/assets/spec-sheets/*.webp", "apps/web/components/ReviewsPavilion.tsx"],
        "execution_steps": [
            {"step": 1, "title": "File Weight & SVG Fallback Audit", "description": "Check that review avatars/badges are under 80KB and all 6 Polynesian SVG fallbacks exist.", "verification": "All review assets < 80KB; 6/6 SVG fallbacks verified."},
            {"step": 2, "title": "16 Retina Spec WebP & ReviewsPavilion Grid Check", "description": "Confirm all 16 2x Retina WebP spec sheets exist and ReviewsPavilion cards enforce md:w-full md:max-w-none h-full.", "verification": "16/16 Retina WebPs and 3-column desktop grid verified."}
        ],
        "outputs": ["Asset optimization status (ASSETS_OPTIMIZED)", "CLS impact (0.00)", "ReviewsPavilion 3-column grid (VERIFIED)"],
        "contingency_protocol": "Auto-generate fallback SVGs if any raster image exceeds 80KB or fails to load."
    },

    # --- Executive Analytics & Monthly Reporting (3 Agents) ---
    "agent_report_ingestor": {
        "id": "agent_report_ingestor",
        "code": "SOP-REP-01",
        "title": "Raw Analytics Ingestion Sentinel",
        "domain": "Executive Reporting",
        "supervisor": "submaster_executive_reporting",
        "mandate": "Ingest and normalize raw Google Search Console zip archives, individual CSV exports, and GA4 telemetry snapshots using zero-dependency native Python csv.",
        "token_efficiency_policy": "Zero token overhead; high-throughput in-memory native Python csv parsing with zero pandas dependency.",
        "oahu_grounding": "Extracts Oahu regional Window AC traffic clusters (Honolulu, Aiea, Kapolei, Pearl City, Waipahu) and mobile device usage shares.",
        "inputs": ["Uploaded .zip or CSV directory", "Chart.csv", "Queries.csv", "Pages.csv", "Devices.csv"],
        "execution_steps": [
            {"step": 1, "title": "Archive Unpacking & Discovery", "description": "Detect and extract uploaded Search Console archives into isolated staging.", "verification": "Performance-on-Search directory verified."},
            {"step": 2, "title": "Native CSV Metric Normalization", "description": "Calculate total search clicks, impressions, average SERP position, and mobile click percentage using native Python csv.", "verification": "Core metric schema populated cleanly without pandas."}
        ],
        "outputs": ["Ingestion status (INGESTION_ARMED)", "Normalized metrics dictionary", "Extracted queries & pages lists"],
        "contingency_protocol": "Prioritize Performance-on-Search CSV files over Breadcrumbs or Merchant Listing audit charts."
    },
    "agent_narrative_crafter": {
        "id": "agent_narrative_crafter",
        "code": "SOP-REP-02",
        "title": "Executive 3rd-Grade Synthesis Engine",
        "domain": "Executive Reporting",
        "supervisor": "submaster_executive_reporting",
        "mandate": "Transform complex search rankings and technical web metrics into clear, straightforward 3rd-grade reading level executive summaries focused 100% on LG & GE Window ACs and Window AC Cleaning.",
        "token_efficiency_policy": "Templated heuristic narrative synthesis with dynamic data injection; zero LLM token consumption.",
        "oahu_grounding": "Highlights Oahu homeowner buyer intent, Waipahu warehouse pickup demand, $45 Hawaii Energy Rebate traction, and island Window AC cooling relevance while filtering out retired mini-split/ductless queries.",
        "inputs": ["Normalized metrics dictionary", "High-intent Window AC keyword rankings", "Month/Year parameters"],
        "execution_steps": [
            {"step": 1, "title": "Big Wins & Window AC Keyword Extraction", "description": "Isolate peak CTR records, shop catalog growth, and Page 1 Google Window AC product breakthroughs while excluding legacy mini-split queries.", "verification": "Top 5 commercial achievements formulated with 100% Window AC purity."},
            {"step": 2, "title": "Executive Action Plan Formulation", "description": "Formulate 3 high-impact next steps with plain-English problem and fix explanations.", "verification": "Action plan structured without technical jargon or billing bloat."}
        ],
        "outputs": ["Narrative status (NARRATIVE_SYNTHESIZED)", "Executive report markdown source", "100% Window AC keyword table"],
        "contingency_protocol": "Default to core Oahu branded CTR highlights if no secondary keyword breakthroughs occurred."
    },
    "agent_document_forge": {
        "id": "agent_document_forge",
        "code": "SOP-REP-03",
        "title": "Multi-Format Document Compiler",
        "domain": "Executive Reporting",
        "supervisor": "submaster_executive_reporting",
        "mandate": "Compile and publish executive reports simultaneously into publication-ready Word (.docx via python-docx>=1.1.2), stylized presentation (.html), and Markdown (.md) across all monthly report folders.",
        "token_efficiency_policy": "Native python-docx and HTML/Markdown rendering; compiles all 3 formats in < 500ms.",
        "oahu_grounding": "Applies professional Polynesian executive styling, corporate blue headers, and clean print layouts for CEO Brian.",
        "inputs": ["Executive markdown narrative", "Output directory path (_analytics_data)", "python-docx engine"],
        "execution_steps": [
            {"step": 1, "title": "Word Document Compilation", "description": "Generate Microsoft Word (.docx) document with custom cell shading (#D5E8F0) and 1-inch margins.", "verification": ".docx file created and verified."},
            {"step": 2, "title": "HTML Presentation Rendering", "description": "Compile standalone responsive HTML document with print-ready CSS.", "verification": ".html file created and verified."},
            {"step": 3, "title": "Directory Archival", "description": "Save all compiled artifacts into standardized monthly directories (_analytics_data/August2026, September2026, etc.).", "verification": "3/3 artifacts persisted per monthly folder."}
        ],
        "outputs": ["Forge status (FORGE_OPERATIONAL)", "Compiled .docx artifact", "Compiled .html & .md documents"],
        "contingency_protocol": "Fall back to HTML and Markdown output if python-docx library is unavailable in runtime environment."
    }
}
