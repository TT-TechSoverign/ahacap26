"""
Sovereign Tier Standard Operating Procedures (SOPs) Matrix
Defines the authoritative operational protocols, execution steps, token efficiency policies,
and Oahu local grounding for all 21 Specialized Agents and 6 Category Sub-Masters.
"""

from typing import Dict, Any

AGENT_SOPS: Dict[str, Dict[str, Any]] = {
    # =========================================================================
    # 6 CATEGORY SUB-MASTERS
    # =========================================================================
    "submaster_infrastructure": {
        "id": "submaster_infrastructure",
        "code": "SOP-SUB-01",
        "title": "Infrastructure & Storage Sub-Master",
        "domain": "Infrastructure",
        "supervisor": "Sovereign Master Orchestrator",
        "mandate": "Supervise VPS bare-metal host health, Docker container lifecycle, PostgreSQL 16 connection pools, and zero-disk-bloat retention policies.",
        "token_efficiency_policy": "Zero background polling loops. Invoked strictly on-demand by client CLI or Dev OS UI. Emits compact JSON summaries (< 400 bytes).",
        "oahu_grounding": "Hostinger VPS loopback network isolation, zero external port exposures, localized database vacuuming.",
        "inputs": ["VPS host resource counters", "Docker socket container states", "PostgreSQL connection pool metrics", "Docker log file sizes"],
        "execution_steps": [
            {"step": 1, "title": "Host Resource Ingest", "description": "Trigger agent_host_sentinel to capture CPU, RAM, and NVMe disk headroom.", "verification": "Disk usage < 80%, RAM headroom > 500MB."},
            {"step": 2, "title": "Container Topology Audit", "description": "Trigger agent_container_sentinel to verify all 5 core containers (prod-api, prod-dev-os, prod-web, prod-db, prod-redis).", "verification": "All containers reported UP and bound to 127.0.0.1."},
            {"step": 3, "title": "PostgreSQL Health Probe", "description": "Trigger agent_db_guardian to test connection pool roundtrip and verify schema integrity.", "verification": "Latency < 5ms, 0 connection leaks."},
            {"step": 4, "title": "Storage Hygiene Check", "description": "Trigger agent_storage_sentinel to confirm Docker log caps (10m x 3) and 14-day audit pruning.", "verification": "0.00% storage leak risk confirmed."}
        ],
        "outputs": ["Unified infrastructure health matrix", "Disk saturation metrics", "Container lifecycle map"],
        "contingency_protocol": "On container crash or memory breach, execute graceful restart via Docker restart-policy and alert Sovereign Master via Dev OS audit log."
    },
    "submaster_security_compliance": {
        "id": "submaster_security_compliance",
        "code": "SOP-SUB-02",
        "title": "Cybersecurity & Compliance Sub-Master",
        "domain": "Security",
        "supervisor": "Sovereign Master Orchestrator",
        "mandate": "Enforce zero-trust architecture, SHA-256 HMAC authentication, air-tight local perimeter isolation, and pre-push secret scrubbing.",
        "token_efficiency_policy": "Event-driven execution. Telemetry sanitized of all PII before streaming. No autonomous outbound network calls.",
        "oahu_grounding": "Hawaii CT-36775 compliance protection, customer PII masking, air-tight local workstation isolation (server has 0 inbound reach).",
        "inputs": ["Active session tokens", "Git pre-push audit logs", "Audit table record counts", "Nginx reverse proxy logs"],
        "execution_steps": [
            {"step": 1, "title": "HMAC Session Verification", "description": "Verify SHA-256 HMAC signature and role whitelist for Dev OS operator.", "verification": "Token valid, email matches irasmussenjobs@gmail.com."},
            {"step": 2, "title": "Loopback Shield Audit", "description": "Trigger agent_security_shield to confirm internal microservice ports (3005, 8001, 5433, 6380, 3001) are bound to 127.0.0.1.", "verification": "Zero exposed management ports."},
            {"step": 3, "title": "Pre-Push Secret Scrubbing", "description": "Trigger agent_commit_sentinel to scan staged diffs and recent commits for API keys or private certificates.", "verification": "Zero leaked secrets detected."},
            {"step": 4, "title": "Air-Tight Perimeter Verification", "description": "Trigger agent_perimeter_auditor to mathematically verify server has zero inbound reach into the local development workstation.", "verification": "Zero inbound holes; 100% outbound-only client sync."}
        ],
        "outputs": ["Security posture grade (ARMORED)", "Leaked secret count (0)", "Perimeter state (AIR_TIGHT_OUTBOUND_ONLY)"],
        "contingency_protocol": "Immediate token invalidation and IP rate-limiting on unauthorized login attempts; push quarantine on leaked credential detection."
    },
    "submaster_commerce_telemetry": {
        "id": "submaster_commerce_telemetry",
        "code": "SOP-SUB-03",
        "title": "Commerce & Appointment Telemetry Sub-Master",
        "domain": "Commerce",
        "supervisor": "Sovereign Master Orchestrator",
        "mandate": "Supervise conversion funnels, schedule booking completion velocity, zero-barrier intake, and Stripe revenue reconciliation.",
        "token_efficiency_policy": "Aggregates client-side micro-telemetry into compact rolling ring buffer (max 500 entries) with zero recurring cron loops.",
        "oahu_grounding": "By-Appointment-First conversion architecture; zero upfront credit card barrier for diagnostic visits across Oahu neighborhoods.",
        "inputs": ["Funnel telemetry ring buffer", "Stripe order ledger", "PostgreSQL appointment records", "Conversion drop-off events"],
        "execution_steps": [
            {"step": 1, "title": "Funnel Progression Analysis", "description": "Trigger agent_funnel_telemetry to compute step-by-step conversion drop-offs (Landing -> Service Select -> Booking Form -> Confirmed).", "verification": "Drop-off rate within expected parameters."},
            {"step": 2, "title": "CRO Heuristic Verification", "description": "Trigger agent_cro_optimizer to inspect mobile CTA visibility, form field counts, and flat-rate pricing anchors.", "verification": "Form fields <= 4, tap-to-call visible."},
            {"step": 3, "title": "Revenue & Webhook Reconciliation", "description": "Trigger agent_revenue_reconciler to cross-verify Stripe charge records against PostgreSQL database orders.", "verification": "Zero unrecorded transactions or orphaned webhooks."}
        ],
        "outputs": ["Conversion velocity index", "Funnel conversion percentages", "Reconciled revenue ledger"],
        "contingency_protocol": "Flag funnel drop-offs > 30% for CRO review; trigger Stripe reconciliation engine for any webhook mismatch."
    },
    "submaster_growth_grounding": {
        "id": "submaster_growth_grounding",
        "code": "SOP-SUB-04",
        "title": "Growth & Oahu Grounding Sub-Master",
        "domain": "Growth",
        "supervisor": "Sovereign Master Orchestrator",
        "mandate": "Ground all copy, pricing, technical recommendations, and SEO in Oahu geography, microclimates, and HECO energy economics.",
        "token_efficiency_policy": "Static knowledge graph queries with zero runtime AI hallucination; cached geographic centroids.",
        "oahu_grounding": "22 Oahu municipalities, Leeward/Ewa heat profiles, Windward humidity/mold challenges, HECO 44.2¢/kWh residential tariff.",
        "inputs": ["22 Oahu city landing page routes", "HECO residential rate tariff", "Hawaii Energy rebate schedules", "Competitor pricing benchmarks"],
        "execution_steps": [
            {"step": 1, "title": "Regional SEO Audit", "description": "Trigger agent_seo_metadata to audit meta tags, schema.org JSON-LD, and canonical routes across 22 Oahu city pages.", "verification": "All 22 city pages validated with CT-36775 license schema."},
            {"step": 2, "title": "Microclimate Grounding", "description": "Trigger agent_oahu_grounding to align cooling recommendations with Leeward, Windward, and Central Oahu solar-gain profiles.", "verification": "Accurate BTU sizing and salt-air corrosion notes."},
            {"step": 3, "title": "Market Competitive Analysis", "description": "Trigger agent_market_research to benchmark island contractor rates against AHAC flat-rate pricing.", "verification": "AHAC $175 basic / $275 teardown price moat intact."},
            {"step": 4, "title": "HECO Rebate Modeling", "description": "Trigger agent_heco_rebate_strategist to compute customer electricity savings ($424/yr) and Hawaii Energy cash rebates ($150-$500).", "verification": "Payback period calculated at ~9.4 months."}
        ],
        "outputs": ["SEO coverage matrix", "Oahu microclimate cooling matrix", "Hawaii Energy rebate calculators", "Competitor pricing index"],
        "contingency_protocol": "Automatically suggest metadata updates and copy adjustments when SERP algorithms or HECO utility rates change."
    },
    "submaster_crm_operations": {
        "id": "submaster_crm_operations",
        "code": "SOP-SUB-05",
        "title": "Customer Operations & CRM Sub-Master",
        "domain": "Operations",
        "supervisor": "Sovereign Master Orchestrator",
        "mandate": "Manage service request intake, technician dispatch queues, Waipahu bench repair triage, and customer lifecycle maintenance reminders.",
        "token_efficiency_policy": "Direct SQL queries on indexed leads table; on-demand execution without pollers.",
        "oahu_grounding": "Waipahu central repair facility (94-1388 Moaniani St), 24-48 hour drop-off turnaround, Oahu salt-air equipment degradation cycles.",
        "inputs": ["PostgreSQL leads table records", "Technician availability calendar", "Equipment service histories", "Customer failure reports"],
        "execution_steps": [
            {"step": 1, "title": "Dispatch Queue Ingest", "description": "Trigger agent_crm_dispatch to inspect new lead records and calculate dispatch workload.", "verification": "All new leads flagged for By-Appointment-First phone contact."},
            {"step": 2, "title": "Symptom & Intake Triage", "description": "Trigger agent_intake_triage to categorize incoming issues (mold, refrigerant freeze, drain leak) and route between Waipahu shop and field van.", "verification": "Portable/window units routed to shop; mini-splits to field dispatch."},
            {"step": 3, "title": "Lifecycle Maintenance Schedule", "description": "Trigger agent_customer_lifecycle to generate 6-month and 12-month proactive coil flush and sanitization reminders.", "verification": "Recall schedule updated based on Oahu coastal proximity."}
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
        "mandate": "Guarantee zero-downtime blue/green rollouts, Next.js production build verification, drop-cloth workmanship standards, and non-regression guardrails.",
        "token_efficiency_policy": "Multi-stage pipeline running strictly during deployment sequences; zero background daemon overhead.",
        "oahu_grounding": "Hawaii CT-36775 licensed workmanship protection, zero-downtime for live Oahu customers (www.affordablehome-ac.com).",
        "inputs": ["Next.js build manifests", "TypeScript compiler outputs", "Git branch state", "Docker compose configurations"],
        "execution_steps": [
            {"step": 1, "title": "Pre-Deploy Guardrails", "description": "Trigger agent_deployment_guardian to verify clean git working tree and Nginx reload syntax check.", "verification": "Branch is main, nginx -t returns syntax ok."},
            {"step": 2, "title": "Build Compilation Verification", "description": "Trigger agent_build_qa to confirm TypeScript zero-error compile and 44 static/dynamic Next.js routes.", "verification": "Build exits code 0 with zero broken internal links."},
            {"step": 3, "title": "Non-Regression Audit", "description": "Trigger agent_regression_sentinel to verify By-Appointment-First gate, zero-upfront card checkout, and drop-cloth legal clauses.", "verification": "100% compliant with zero customer deception."}
        ],
        "outputs": ["3-Stage verification certificate", "Compilation status", "Zero-dead-link audit report"],
        "contingency_protocol": "Instant rollback to previous container image if health probe fails within 30 seconds of deployment."
    },

    # =========================================================================
    # 21 SPECIALIZED PRODUCTION AGENTS
    # =========================================================================

    # --- Infrastructure & Storage (4 Agents) ---
    "agent_host_sentinel": {
        "id": "agent_host_sentinel",
        "code": "SOP-INF-01",
        "title": "Host Infrastructure Sentinel",
        "domain": "Infrastructure",
        "supervisor": "submaster_infrastructure",
        "mandate": "Monitor VPS bare-metal host health including CPU utilization, RAM consumption, and NVMe disk headroom.",
        "token_efficiency_policy": "On-demand execution; reads native /proc and disk stats synchronously in < 2ms without subprocess overhead.",
        "oahu_grounding": "Hostinger VPS (31.220.53.132) located on low-latency Pacific backbone serving Oahu traffic.",
        "inputs": ["Host OS resource counters (/proc/stat, /proc/meminfo)", "Root filesystem disk usage"],
        "execution_steps": [
            {"step": 1, "title": "CPU & Memory Read", "description": "Query host memory availability and compute load percentage.", "verification": "Memory available > 500MB."},
            {"step": 2, "title": "Disk Headroom Audit", "description": "Verify NVMe storage usage against 85% safety threshold.", "verification": "Disk usage < 80% healthy."},
            {"step": 3, "title": "Uptime & Load Averaging", "description": "Capture system uptime and 1-minute load average.", "verification": "Load average < 2.0 per core."}
        ],
        "outputs": ["Host health grade (HEALTHY)", "CPU/RAM/Disk metric snapshot", "Uptime verification"],
        "contingency_protocol": "If disk usage exceeds 85%, trigger immediate storage prune and notify Sovereign Master via Dev OS audit log."
    },
    "agent_container_sentinel": {
        "id": "agent_container_sentinel",
        "code": "SOP-INF-02",
        "title": "Docker Container Sentinel",
        "domain": "Infrastructure",
        "supervisor": "submaster_infrastructure",
        "mandate": "Supervise state, uptime, and loopback port bindings for the 5 core production containers.",
        "token_efficiency_policy": "Direct docker socket or loopback HTTP status checks; zero continuous polling loops.",
        "oahu_grounding": "Isolates container network to 127.0.0.1, preventing any unauthorized internet exposure on Oahu servers.",
        "inputs": ["Docker engine container states", "Loopback port bindings (3005, 8001, 5433, 6380, 3001)"],
        "execution_steps": [
            {"step": 1, "title": "Container State Ingest", "description": "Check operational status of prod-api, prod-dev-os, prod-web, prod-db, prod-redis.", "verification": "All 5 containers in UP status."},
            {"step": 2, "title": "Port Binding Verification", "description": "Verify every exposed container port is strictly bound to 127.0.0.1.", "verification": "Zero external 0.0.0.0 bindings."},
            {"step": 3, "title": "Restart Count Audit", "description": "Verify container restart counts are 0, confirming runtime stability.", "verification": "Restart count == 0."}
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
        "mandate": "Maintain PostgreSQL 16 connection pool health, query latency, and database transaction integrity.",
        "token_efficiency_policy": "Executes lightweight async ping query (SELECT 1) and indexed count scans; completes in < 5ms.",
        "oahu_grounding": "Protects Oahu customer appointment records, lead pipelines, and service history logs.",
        "inputs": ["AsyncSession connection pool", "Table row counters (leads, orders, dev_os_audit_log)"],
        "execution_steps": [
            {"step": 1, "title": "Connection Roundtrip Test", "description": "Execute async query on PostgreSQL engine to measure latency.", "verification": "Roundtrip latency < 10ms."},
            {"step": 2, "title": "Table Integrity Scan", "description": "Verify core tables exist and are readable without lock contention.", "verification": "Zero lock deadlocks."},
            {"step": 3, "title": "Audit Table Volume Audit", "description": "Count rows in dev_os_audit_log and confirm rolling 14-day retention rule.", "verification": "Row count within safe storage bounds."}
        ],
        "outputs": ["Database health status (HEALTHY)", "Latency metric (ms)", "Active connection pool state"],
        "contingency_protocol": "On connection pool exhaustion, clear stale connections and verify PostgreSQL postmaster.pid lock status."
    },
    "agent_storage_sentinel": {
        "id": "agent_storage_sentinel",
        "code": "SOP-INF-04",
        "title": "Storage Hygiene & Retention Sentinel",
        "domain": "Infrastructure",
        "supervisor": "submaster_infrastructure",
        "mandate": "Enforce strict disk hygiene, Docker log caps, Redis in-memory limits, and temporary file clearing.",
        "token_efficiency_policy": "Reads filesystem and Docker log configuration synchronously; 0Hz idle CPU burn.",
        "oahu_grounding": "Guarantees server will never experience disk saturation (ENOSPC) during heavy Oahu traffic spikes.",
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
        "mandate": "Enforce zero-trust network boundaries, loopback binding, client bundle sanitization, and HMAC master authentication.",
        "token_efficiency_policy": "Synchronous validation on-demand; zero background CPU or network overhead.",
        "oahu_grounding": "Ensures Dev OS and internal administration routes cannot be reached or indexed across the public internet.",
        "inputs": ["Listening socket map", "Client JavaScript bundles", "Master authentication credentials"],
        "execution_steps": [
            {"step": 1, "title": "Loopback Enforcement Scan", "description": "Audit listening ports to verify internal services are restricted to 127.0.0.1.", "verification": "All internal ports bound to loopback."},
            {"step": 2, "title": "Client Bundle Secret Audit", "description": "Inspect public Next.js bundles to ensure zero private keys, DB passwords, or internal tokens are exposed.", "verification": "Client bundles 100% sanitized."},
            {"step": 3, "title": "Master Auth Gate Check", "description": "Verify only irasmussenjobs@gmail.com is authorized with SHA-256 HMAC token validation.", "verification": "Master auth gate enforced."}
        ],
        "outputs": ["Security status (ARMORED)", "Public bundle sanitization report", "Authentication gate status"],
        "contingency_protocol": "Immediately revoke compromised session tokens and block originating IP if unauthorized access attempts are detected."
    },
    "agent_commit_sentinel": {
        "id": "agent_commit_sentinel",
        "code": "SOP-SEC-02",
        "title": "Git Pre-Push Commit Sentinel",
        "domain": "Security",
        "supervisor": "submaster_security_compliance",
        "mandate": "Prevent credential leakage, API secrets, and unvetted code from reaching remote or public git repositories.",
        "token_efficiency_policy": "Executes pre-push script check; consumes 0 tokens by performing regex pattern analysis locally.",
        "oahu_grounding": "Protects proprietary Oahu customer phone numbers, addresses, and payment keys from repository exposure.",
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
        "mandate": "Verify audit trail immutability, customer PII masking, and professional contractor licensing compliance.",
        "token_efficiency_policy": "Runs single SQL aggregation query on dev_os_audit_log; completes in < 3ms.",
        "oahu_grounding": "Hawaii professional contractor standards (CT-36775) and state data privacy regulations.",
        "inputs": ["dev_os_audit_log table", "Customer PII fields in database"],
        "execution_steps": [
            {"step": 1, "title": "Audit Log Integrity Check", "description": "Count audit log entries and verify sequential timestamp monotonicity.", "verification": "Audit records intact and sequential."},
            {"step": 2, "title": "PII Masking Verification", "description": "Ensure customer phone numbers and emails are masked (e.g. 808-***-1234) in public logs.", "verification": "PII masking active across all streams."},
            {"step": 3, "title": "Retention Rule Check", "description": "Confirm 14-day rolling prune query executes without dropping current audit records.", "verification": "Retention window verified."}
        ],
        "outputs": ["Compliance status (COMPLIANT)", "Retained audit records count", "PII masking status"],
        "contingency_protocol": "Flag audit log gaps or unmasked PII immediately for database sanitation."
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

    # --- Commerce & Telemetry (3 Agents) ---
    "agent_funnel_telemetry": {
        "id": "agent_funnel_telemetry",
        "code": "SOP-COM-01",
        "title": "Conversion Funnel Telemetry Agent",
        "domain": "Commerce",
        "supervisor": "submaster_commerce_telemetry",
        "mandate": "Track real-time visitor progression through the 4 core funnel steps with zero recurring polling overhead.",
        "token_efficiency_policy": "Reads in-memory ring buffer (capped at 500 events); outputs compact aggregated conversion ratios.",
        "oahu_grounding": "Oahu homeowner service booking funnels (A/C Diagnostic, Teardown Cleaning, Mini-Split Repair).",
        "inputs": ["TELEMETRY_BUFFER events", "Funnel step transition timestamps"],
        "execution_steps": [
            {"step": 1, "title": "Event Ingestion & Deduplication", "description": "Process client telemetry events from in-memory ring buffer.", "verification": "Buffer length within max capacity (500)."},
            {"step": 2, "title": "Funnel Velocity Calculation", "description": "Calculate conversion rates across Landing -> Select -> Form -> Success.", "verification": "Conversion velocity > 3.0%."},
            {"step": 3, "title": "Zero-Barrier Check", "description": "Confirm no funnel step demands credit card payment before appointment booking.", "verification": "Zero payment traps detected."}
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
        "mandate": "Audit mobile UX heuristics, call-to-action prominence, booking form simplicity, and pricing anchors.",
        "token_efficiency_policy": "Static heuristic evaluation; completes on-demand with zero runtime LLM calls.",
        "oahu_grounding": "Optimized for Oahu mobile users searching for emergency A/C cooling during high heat and trade-wind lulls.",
        "inputs": ["Booking form component schema", "Mobile viewport layout metrics", "Pricing display strings"],
        "execution_steps": [
            {"step": 1, "title": "Form Friction Audit", "description": "Verify booking form requires at most 4 fields (Name, Phone, Service, Zip).", "verification": "Friction score optimal (4 fields)."},
            {"step": 2, "title": "Tap-to-Call Prominence", "description": "Verify click-to-call (808) 723-5595 button is visible on mobile viewport.", "verification": "Phone CTA immediately accessible."},
            {"step": 3, "title": "Value Anchor Verification", "description": "Confirm $175 basic / $275 teardown flat pricing is clearly stated upfront.", "verification": "Pricing anchors visible before submit."}
        ],
        "outputs": ["CRO status (OPTIMIZED)", "Form friction score", "Mobile UX compliance check"],
        "contingency_protocol": "Recommend UI simplifications if form abandonment exceeds 40%."
    },
    "agent_revenue_reconciler": {
        "id": "agent_revenue_reconciler",
        "code": "SOP-COM-03",
        "title": "Stripe Revenue & Webhook Reconciler",
        "domain": "Commerce",
        "supervisor": "submaster_commerce_telemetry",
        "mandate": "Reconcile Stripe payment charges, webhook events, and PostgreSQL database order records with zero discrepancy.",
        "token_efficiency_policy": "Executes reconciliation query only on-demand or during deployment verification; zero background polling.",
        "oahu_grounding": "Financial reconciliation for Oahu parts purchases, filter kits, and warehouse pick-up orders.",
        "inputs": ["Stripe API charges ledger", "PostgreSQL orders table", "Webhook delivery logs"],
        "execution_steps": [
            {"step": 1, "title": "Unrecorded Charge Scan", "description": "Query Stripe API for recent successful charges and compare with database orders.", "verification": "Zero unrecorded payments found."},
            {"step": 2, "title": "Webhook Idempotency Check", "description": "Verify webhook events are processed idempotently without duplicate charges.", "verification": "Idempotency keys verified."},
            {"step": 3, "title": "Net Revenue Summary", "description": "Calculate verified gross volume, dispute count (0), and settlement status.", "verification": "Disputes == 0."}
        ],
        "outputs": ["Reconciliation status (RECONCILED)", "Unrecorded orders count (0)", "Verified transaction volume"],
        "contingency_protocol": "Automatically create missing database order records if unrecorded Stripe charge is detected."
    },

    # --- Growth & Oahu Grounding (4 Agents) ---
    "agent_seo_metadata": {
        "id": "agent_seo_metadata",
        "code": "SOP-GRO-01",
        "title": "SEO & Oahu City Landing Page Sentinel",
        "domain": "Growth",
        "supervisor": "submaster_growth_grounding",
        "mandate": "Verify search engine indexing, semantic JSON-LD structured data, and regional keyword dominance across all 22 Oahu city routes.",
        "token_efficiency_policy": "Reads sitemap and metadata definitions synchronously; zero external web crawling tokens consumed.",
        "oahu_grounding": "22 Oahu cities including Honolulu, Pearl City, Kapolei, Kailua, Kaneohe, Mililani, Ewa Beach, and Waipahu.",
        "inputs": ["sitemap.ts route manifest", "City landing page metadata definitions", "Schema.org local business markup"],
        "execution_steps": [
            {"step": 1, "title": "City Route Coverage Audit", "description": "Verify all 22 Oahu city landing pages exist in sitemap.xml.", "verification": "22/22 city routes active."},
            {"step": 2, "title": "Schema.org JSON-LD Verification", "description": "Verify LocalBusiness schema contains contractor license CT-36775 and telephone (808) 723-5595.", "verification": "Schema valid with license number."},
            {"step": 3, "title": "Robots & Anti-Crawling Audit", "description": "Verify robots.ts disallows /dev-os, /admin, and internal APIs while allowing public city pages.", "verification": "Dev OS strictly protected; public pages indexed."}
        ],
        "outputs": ["SEO status (ACTIVE_OPTIMIZING)", "Indexed city routes count (22)", "License schema verification"],
        "contingency_protocol": "Regenerate sitemap and update canonical headers if route indexing discrepancies are detected."
    },
    "agent_oahu_grounding": {
        "id": "agent_oahu_grounding",
        "code": "SOP-GRO-02",
        "title": "Oahu Microclimate & Technical Grounding Agent",
        "domain": "Growth",
        "supervisor": "submaster_growth_grounding",
        "mandate": "Ground cooling load sizing, salt-air corrosion protection, and service recommendations in Oahu island geography.",
        "token_efficiency_policy": "Static geographic lookup table; completes in < 1ms with zero runtime computation waste.",
        "oahu_grounding": "Oahu trade-wind patterns, salt spray zones (Ewa Beach, Kailua), and high-humidity valleys (Manoa, Kaneohe).",
        "inputs": ["Oahu microclimate zone map", "Trade-wind humidity models", "Coastal corrosion distance index"],
        "execution_steps": [
            {"step": 1, "title": "Microclimate Profile Matching", "description": "Map customer location to Leeward (high heat), Windward (high humidity/mold), or Central/Valley.", "verification": "Accurate climate zone identified."},
            {"step": 2, "title": "Corrosion Protection Advisory", "description": "Attach Blue-Fin / Gold-Fin coil protection recommendations for coastal properties.", "verification": "Corrosion guidelines attached."},
            {"step": 3, "title": "Pricing Transparency Anchor", "description": "Attach island flat pricing ($175 basic / $275 teardown / $50 delivery) to recommendation copy.", "verification": "Transparent pricing confirmed."}
        ],
        "outputs": ["Grounding status (GROUNDED)", "Microclimate specifications", "Regional cooling recommendations"],
        "contingency_protocol": "Default to Leeward high-capacity cooling specifications if location data is ambiguous."
    },
    "agent_market_research": {
        "id": "agent_market_research",
        "code": "SOP-GRO-03",
        "title": "Oahu HVAC Market & Competitor Intelligence Agent",
        "domain": "Growth",
        "supervisor": "submaster_growth_grounding",
        "mandate": "Monitor competitor pricing, contractor backlogs, and island supply chain availability to maintain AHAC's competitive edge.",
        "token_efficiency_policy": "Curated benchmark data structure; 0Hz background query overhead.",
        "oahu_grounding": "Oahu contractor market ($250-$350/hr truck rolls) and big-box store delivery delays (2-3 weeks).",
        "inputs": ["Island HVAC contractor rate surveys", "Big-box retailer stock availability", "AHAC warehouse inventory"],
        "execution_steps": [
            {"step": 1, "title": "Contractor Rate Benchmarking", "description": "Compare AHAC flat rates ($175 / $275) against standard island contractor hourly fees.", "verification": "AHAC maintains 40-50% value advantage."},
            {"step": 2, "title": "Inventory Availability Audit", "description": "Verify Waipahu warehouse has in-stock units ready for immediate island delivery.", "verification": "Zero multi-week shipping delays."},
            {"step": 3, "title": "Value Proposition Synthesis", "description": "Update marketing anchors highlighting local warehouse stock and licensed workmanship.", "verification": "Marketing copy aligned with competitive moats."}
        ],
        "outputs": ["Market status (MONITORED)", "Competitor price benchmark", "Value proposition moats"],
        "contingency_protocol": "Adjust landing page headline emphasis if competitor promotions or inventory supply shifts."
    },
    "agent_heco_rebate_strategist": {
        "id": "agent_heco_rebate_strategist",
        "code": "SOP-GRO-04",
        "title": "Hawaii Energy Rebate & HECO Economics Strategist",
        "domain": "Growth",
        "supervisor": "submaster_growth_grounding",
        "mandate": "Model Hawaiian Electric (HECO) utility economics and calculate Hawaii Energy cash rebates ($150-$500) to prove customer ROI.",
        "token_efficiency_policy": "Deterministic mathematical formulas; executed synchronously in < 1ms with zero token waste.",
        "oahu_grounding": "Hawaiian Electric (HECO) residential baseline tariff (44.2¢/kWh) — highest electricity rates in the nation.",
        "inputs": ["HECO residential electric tariff", "Hawaii Energy Clean Energy rebate tiers", "SEER2 efficiency curves"],
        "execution_steps": [
            {"step": 1, "title": "Power Consumption Modeling", "description": "Calculate annual kilowatt-hour load for baseline 10 SEER vs 18+ SEER2 inverter mini-split on Oahu.", "verification": "Annual consumption modeled at ~3,200 kWh/yr."},
            {"step": 2, "title": "Rebate Tier Qualification", "description": "Determine eligibility for Hawaii Energy $150 (SEER2 >= 16) and $350 (SEER2 >= 18) instant cash rebates.", "verification": "Rebate tiers verified active."},
            {"step": 3, "title": "Payback Period Computation", "description": "Compute annual electricity savings ($424.32/yr) and payback period (~9.4 months).", "verification": "Payback period calculated and verified."}
        ],
        "outputs": ["Rebate status (REBATE_GROUNDED)", "Electricity savings estimate ($424/yr)", "Instant cash rebate schedule ($150-$500)"],
        "contingency_protocol": "Recalculate savings model when HECO announces fuel surcharge adjustments or tariff changes."
    },

    # --- Customer Operations & CRM (3 Agents) ---
    "agent_crm_dispatch": {
        "id": "agent_crm_dispatch",
        "code": "SOP-CRM-01",
        "title": "CRM Dispatch & Technician Queue Agent",
        "domain": "Operations",
        "supervisor": "submaster_crm_operations",
        "mandate": "Manage incoming service requests, technician dispatch queues, and ensure strictly By-Appointment-First customer contact.",
        "token_efficiency_policy": "Direct SQLAlchemy query on leads table with status index; execution time < 5ms.",
        "oahu_grounding": "Oahu-wide technician dispatch covering Honolulu, Leeward, Central, and Windward zones.",
        "inputs": ["PostgreSQL leads table", "Lead status enum (NEW, SCHEDULED, COMPLETED)"],
        "execution_steps": [
            {"step": 1, "title": "New Lead Ingest", "description": "Query leads table for all records with status == NEW.", "verification": "Pending count calculated."},
            {"step": 2, "title": "By-Appointment-First Gate Check", "description": "Verify all customer records require phone scheduling contact before any payment or truck roll.", "verification": "Zero unauthorized truck rolls."},
            {"step": 3, "title": "Waipahu Teardown Queue", "description": "Track bench repair units at Waipahu warehouse for 24-48 hr turnaround.", "verification": "Turnaround time maintained <= 48 hrs."}
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
        "mandate": "Track equipment service intervals, schedule seasonal maintenance recalls, and manage warranty compliance.",
        "token_efficiency_policy": "Scheduled date range queries on completed leads; zero continuous CPU burn.",
        "oahu_grounding": "Oahu salt air causes severe coil biofilm and mold growth within 6-12 months without proactive flushing.",
        "inputs": ["Completed service records", "Equipment installation dates", "Customer feedback scores"],
        "execution_steps": [
            {"step": 1, "title": "Service Interval Calculation", "description": "Identify customers reaching 6 months (mini-split coil flush) or 12 months (window AC teardown).", "verification": "Recall list compiled."},
            {"step": 2, "title": "Customer Satisfaction Tracking", "description": "Calculate customer satisfaction rate from completed service reviews.", "verification": "Satisfaction rate >= 98.0%."},
            {"step": 3, "title": "Warranty Protection Check", "description": "Verify CT-36775 workmanship warranty coverage active on all eligible jobs.", "verification": "Warranty records verified."}
        ],
        "outputs": ["Lifecycle status (TRACKING)", "Maintenance recall intervals", "Customer satisfaction rate"],
        "contingency_protocol": "Trigger automated follow-up check if any service review indicates customer dissatisfaction."
    },
    "agent_intake_triage": {
        "id": "agent_intake_triage",
        "code": "SOP-CRM-03",
        "title": "HVAC Symptom & Intake Triage Agent",
        "domain": "Operations",
        "supervisor": "submaster_crm_operations",
        "mandate": "Triage incoming service requests by reported symptom to route between Waipahu Warehouse Bench Teardown vs Field Van Dispatch.",
        "token_efficiency_policy": "In-memory string keyword categorization on incoming lead notes; completed in < 2ms.",
        "oahu_grounding": "Waipahu central facility (94-1388 Moaniani St) handles drop-off teardown and coil immersion, saving customers on-site labor fees.",
        "inputs": ["Lead notes and symptom descriptions", "Service type selections (mini-split vs portable/window)"],
        "execution_steps": [
            {"step": 1, "title": "Symptom Keyword Analysis", "description": "Scan lead notes for mold/odor, evaporator icing/freeze, water leakage, or total cooling failure.", "verification": "Symptom breakdown populated."},
            {"step": 2, "title": "Service Routing Determination", "description": "Route window/portable units to Waipahu Warehouse Teardown ($275 flat); route mini-splits to field dispatch.", "verification": "Appropriate service path assigned."},
            {"step": 3, "title": "Emergency Priority Check", "description": "Flag severe heat vulnerability or medical necessity for expedited dispatch.", "verification": "High-priority flags honored."}
        ],
        "outputs": ["Triage status (TRIAGE_ACTIVE)", "Symptom breakdown counts", "Routing recommendations"],
        "contingency_protocol": "Escalate urgent cooling failure requests directly to master dispatch queue."
    },

    # --- Deployment & Quality Swarm (3 Agents) ---
    "agent_deployment_guardian": {
        "id": "agent_deployment_guardian",
        "code": "SOP-DEP-01",
        "title": "Zero-Downtime Deployment Guardian",
        "domain": "Deployment",
        "supervisor": "submaster_deployment_quality",
        "mandate": "Coordinate blue/green container rebuilds, Nginx configuration validation, and zero-downtime production rollouts.",
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
        "title": "Next.js Production Build & TypeScript QA Agent",
        "domain": "Deployment",
        "supervisor": "submaster_deployment_quality",
        "mandate": "Verify Next.js production compilation, TypeScript zero-error typing, and link integrity across apps/web and apps/dev-os.",
        "token_efficiency_policy": "Runs compiler checks synchronously during build; zero runtime token burn.",
        "oahu_grounding": "Prevents client-side crashes on low-bandwidth mobile connections across Oahu rural regions.",
        "inputs": ["TypeScript compiler output (tsc)", "Next.js production build logs", "Route manifest (44 pages)"],
        "execution_steps": [
            {"step": 1, "title": "TypeScript Strict Compile", "description": "Run TypeScript compiler to verify zero type mismatches or unhandled exceptions.", "verification": "0 type errors."},
            {"step": 2, "title": "Next.js Route Compilation", "description": "Verify all 44 static and dynamic routes compile cleanly into optimized bundles.", "verification": "44 routes compiled."},
            {"step": 3, "title": "Dev OS Standalone Verification", "description": "Verify apps/dev-os compiles with basePath /dev-os without asset 404s.", "verification": "Dev OS bundle verified."}
        ],
        "outputs": ["Build QA status (VERIFIED)", "Compiled routes count (44)", "TypeScript strict check"],
        "contingency_protocol": "Reject build and prevent deployment if any TypeScript error or compilation warning is emitted."
    },
    "agent_regression_sentinel": {
        "id": "agent_regression_sentinel",
        "code": "SOP-DEP-03",
        "title": "Non-Regression & Deception Guard Sentinel",
        "domain": "Deployment",
        "supervisor": "submaster_deployment_quality",
        "mandate": "Enforce By-Appointment-First rule, zero credit card checkout gates, drop-cloth legal protection, and anti-deception standards.",
        "token_efficiency_policy": "Static pattern verification across UI components and legal templates; 0Hz idle token cost.",
        "oahu_grounding": "Hawaii CT-36775 contractor integrity; guarantees honest pricing and zero bait-and-switch claims on Oahu.",
        "inputs": ["Checkout form component code", "Service agreement disclaimer text", "Footer licensing notices"],
        "execution_steps": [
            {"step": 1, "title": "By-Appointment-First Audit", "description": "Verify service booking funnel requires zero credit card input prior to scheduling contact.", "verification": "100% zero-card booking verified."},
            {"step": 2, "title": "Drop-Cloth Legal Clause Check", "description": "Verify service agreements include plastic sheeting and drop-cloth standards to protect against drywall dispute liability.", "verification": "Drop-cloth clause verified in contract text."},
            {"step": 3, "title": "Licensing & Anti-Deception Audit", "description": "Verify CT-36775 license is visible and zero false '24/7' or 'Free Diagnostic' claims exist.", "verification": "Licensing verified, zero deceptive claims."}
        ],
        "outputs": ["Regression status (NON_REGRESSION_VERIFIED)", "By-Appointment-First status (ENFORCED)", "Drop-cloth legal protection (ACTIVE)"],
        "contingency_protocol": "Immediately flag any PR or commit that introduces upfront credit card requirements for service scheduling."
    }
}
