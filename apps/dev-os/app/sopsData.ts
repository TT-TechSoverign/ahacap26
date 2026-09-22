export interface SopStep {
    step: number;
    title: string;
    description: string;
    verification: string;
}

export interface SopDossier {
    id: string;
    code: string;
    title: string;
    domain: string;
    supervisor: string;
    mandate: string;
    token_efficiency_policy: string;
    oahu_grounding: string;
    inputs: string[];
    execution_steps: SopStep[];
    outputs: string[];
    contingency_protocol: string;
}

export const SOVEREIGN_SOPS: Record<string, SopDossier> = {
    "submaster_infrastructure": {
        "id": "submaster_infrastructure",
        "code": "SOP-SUB-01",
        "title": "Infrastructure & Storage Sub-Master",
        "domain": "Infrastructure",
        "supervisor": "Sovereign Master Orchestrator",
        "mandate": "Supervise VPS bare-metal host health, Docker container lifecycle, PostgreSQL 16 connection pools, and zero-disk-bloat retention policies.",
        "token_efficiency_policy": "Zero background polling loops. Invoked strictly on-demand by client CLI or Dev OS UI. Emits compact JSON summaries (< 400 bytes).",
        "oahu_grounding": "Hostinger VPS loopback network isolation, zero external port exposures, localized database vacuuming.",
        "inputs": [
            "VPS host resource counters",
            "Docker socket container states",
            "PostgreSQL connection pool metrics",
            "Docker log file sizes"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Host Resource Ingest",
                "description": "Trigger agent_host_sentinel to capture CPU, RAM, and NVMe disk headroom.",
                "verification": "Disk usage < 80%, RAM headroom > 500MB."
            },
            {
                "step": 2,
                "title": "Container Topology Audit",
                "description": "Trigger agent_container_sentinel to verify all 5 core containers (prod-api, prod-dev-os, prod-web, prod-db, prod-redis).",
                "verification": "All containers reported UP and bound to 127.0.0.1."
            },
            {
                "step": 3,
                "title": "PostgreSQL Health Probe",
                "description": "Trigger agent_db_guardian to test connection pool roundtrip and verify schema integrity.",
                "verification": "Latency < 5ms, 0 connection leaks."
            },
            {
                "step": 4,
                "title": "Storage Hygiene Check",
                "description": "Trigger agent_storage_sentinel to confirm Docker log caps (10m x 3) and 14-day audit pruning.",
                "verification": "0.00% storage leak risk confirmed."
            }
        ],
        "outputs": [
            "Unified infrastructure health matrix",
            "Disk saturation metrics",
            "Container lifecycle map"
        ],
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
        "inputs": [
            "Active session tokens",
            "Git pre-push audit logs",
            "Audit table record counts",
            "Nginx reverse proxy logs"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "HMAC Session Verification",
                "description": "Verify SHA-256 HMAC signature and role whitelist for Dev OS operator.",
                "verification": "Token valid, email matches irasmussenjobs@gmail.com."
            },
            {
                "step": 2,
                "title": "Loopback Shield Audit",
                "description": "Trigger agent_security_shield to confirm internal microservice ports (3005, 8001, 5433, 6380, 3001) are bound to 127.0.0.1.",
                "verification": "Zero exposed management ports."
            },
            {
                "step": 3,
                "title": "Pre-Push Secret Scrubbing",
                "description": "Trigger agent_commit_sentinel to scan staged diffs and recent commits for API keys or private certificates.",
                "verification": "Zero leaked secrets detected."
            },
            {
                "step": 4,
                "title": "Air-Tight Perimeter Verification",
                "description": "Trigger agent_perimeter_auditor to mathematically verify server has zero inbound reach into the local development workstation.",
                "verification": "Zero inbound holes; 100% outbound-only client sync."
            }
        ],
        "outputs": [
            "Security posture grade (ARMORED)",
            "Leaked secret count (0)",
            "Perimeter state (AIR_TIGHT_OUTBOUND_ONLY)"
        ],
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
        "inputs": [
            "Funnel telemetry ring buffer",
            "Stripe order ledger",
            "PostgreSQL appointment records",
            "Conversion drop-off events"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Funnel Progression Analysis",
                "description": "Trigger agent_funnel_telemetry to compute step-by-step conversion drop-offs (Landing -> Service Select -> Booking Form -> Confirmed).",
                "verification": "Drop-off rate within expected parameters."
            },
            {
                "step": 2,
                "title": "CRO Heuristic Verification",
                "description": "Trigger agent_cro_optimizer to inspect mobile CTA visibility, form field counts, and flat-rate pricing anchors.",
                "verification": "Form fields <= 4, tap-to-call visible."
            },
            {
                "step": 3,
                "title": "Revenue & Webhook Reconciliation",
                "description": "Trigger agent_revenue_reconciler to cross-verify Stripe charge records against PostgreSQL database orders.",
                "verification": "Zero unrecorded transactions or orphaned webhooks."
            }
        ],
        "outputs": [
            "Conversion velocity index",
            "Funnel conversion percentages",
            "Reconciled revenue ledger"
        ],
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
        "oahu_grounding": "22 Oahu municipalities, Leeward/Ewa heat profiles, Windward humidity/mold challenges, HECO 44.2\u00a2/kWh residential tariff.",
        "inputs": [
            "22 Oahu city landing page routes",
            "HECO residential rate tariff",
            "Hawaii Energy rebate schedules",
            "Competitor pricing benchmarks"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Regional SEO Audit",
                "description": "Trigger agent_seo_metadata to audit meta tags, schema.org JSON-LD, and canonical routes across 22 Oahu city pages.",
                "verification": "All 22 city pages validated with CT-36775 license schema."
            },
            {
                "step": 2,
                "title": "Microclimate Grounding",
                "description": "Trigger agent_oahu_grounding to align cooling recommendations with Leeward, Windward, and Central Oahu solar-gain profiles.",
                "verification": "Accurate BTU sizing and salt-air corrosion notes."
            },
            {
                "step": 3,
                "title": "Market Competitive Analysis",
                "description": "Trigger agent_market_research to benchmark island contractor rates against AHAC flat-rate pricing.",
                "verification": "AHAC $175 basic / $275 teardown price moat intact."
            },
            {
                "step": 4,
                "title": "HECO Rebate Modeling",
                "description": "Trigger agent_heco_rebate_strategist to compute customer electricity savings ($424/yr) and Hawaii Energy cash rebates ($150-$500).",
                "verification": "Payback period calculated at ~9.4 months."
            }
        ],
        "outputs": [
            "SEO coverage matrix",
            "Oahu microclimate cooling matrix",
            "Hawaii Energy rebate calculators",
            "Competitor pricing index"
        ],
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
        "inputs": [
            "PostgreSQL leads table records",
            "Technician availability calendar",
            "Equipment service histories",
            "Customer failure reports"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Dispatch Queue Ingest",
                "description": "Trigger agent_crm_dispatch to inspect new lead records and calculate dispatch workload.",
                "verification": "All new leads flagged for By-Appointment-First phone contact."
            },
            {
                "step": 2,
                "title": "Symptom & Intake Triage",
                "description": "Trigger agent_intake_triage to categorize incoming issues (mold, refrigerant freeze, drain leak) and route between Waipahu shop and field van.",
                "verification": "Portable/window units routed to shop; mini-splits to field dispatch."
            },
            {
                "step": 3,
                "title": "Lifecycle Maintenance Schedule",
                "description": "Trigger agent_customer_lifecycle to generate 6-month and 12-month proactive coil flush and sanitization reminders.",
                "verification": "Recall schedule updated based on Oahu coastal proximity."
            }
        ],
        "outputs": [
            "Triage queue distribution",
            "Pending dispatch count",
            "Customer satisfaction score",
            "Recall calendar"
        ],
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
        "inputs": [
            "Next.js build manifests",
            "TypeScript compiler outputs",
            "Git branch state",
            "Docker compose configurations"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Pre-Deploy Guardrails",
                "description": "Trigger agent_deployment_guardian to verify clean git working tree and Nginx reload syntax check.",
                "verification": "Branch is main, nginx -t returns syntax ok."
            },
            {
                "step": 2,
                "title": "Build Compilation Verification",
                "description": "Trigger agent_build_qa to confirm TypeScript zero-error compile and 44 static/dynamic Next.js routes.",
                "verification": "Build exits code 0 with zero broken internal links."
            },
            {
                "step": 3,
                "title": "Non-Regression Audit",
                "description": "Trigger agent_regression_sentinel to verify By-Appointment-First gate, zero-upfront card checkout, and drop-cloth legal clauses.",
                "verification": "100% compliant with zero customer deception."
            }
        ],
        "outputs": [
            "3-Stage verification certificate",
            "Compilation status",
            "Zero-dead-link audit report"
        ],
        "contingency_protocol": "Instant rollback to previous container image if health probe fails within 30 seconds of deployment."
    },
    "agent_host_sentinel": {
        "id": "agent_host_sentinel",
        "code": "SOP-INF-01",
        "title": "Host Infrastructure Sentinel",
        "domain": "Infrastructure",
        "supervisor": "submaster_infrastructure",
        "mandate": "Monitor VPS bare-metal host health including CPU utilization, RAM consumption, and NVMe disk headroom.",
        "token_efficiency_policy": "On-demand execution; reads native /proc and disk stats synchronously in < 2ms without subprocess overhead.",
        "oahu_grounding": "Hostinger VPS (31.220.53.132) located on low-latency Pacific backbone serving Oahu traffic.",
        "inputs": [
            "Host OS resource counters (/proc/stat, /proc/meminfo)",
            "Root filesystem disk usage"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "CPU & Memory Read",
                "description": "Query host memory availability and compute load percentage.",
                "verification": "Memory available > 500MB."
            },
            {
                "step": 2,
                "title": "Disk Headroom Audit",
                "description": "Verify NVMe storage usage against 85% safety threshold.",
                "verification": "Disk usage < 80% healthy."
            },
            {
                "step": 3,
                "title": "Uptime & Load Averaging",
                "description": "Capture system uptime and 1-minute load average.",
                "verification": "Load average < 2.0 per core."
            }
        ],
        "outputs": [
            "Host health grade (HEALTHY)",
            "CPU/RAM/Disk metric snapshot",
            "Uptime verification"
        ],
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
        "inputs": [
            "Docker engine container states",
            "Loopback port bindings (3005, 8001, 5433, 6380, 3001)"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Container State Ingest",
                "description": "Check operational status of prod-api, prod-dev-os, prod-web, prod-db, prod-redis.",
                "verification": "All 5 containers in UP status."
            },
            {
                "step": 2,
                "title": "Port Binding Verification",
                "description": "Verify every exposed container port is strictly bound to 127.0.0.1.",
                "verification": "Zero external 0.0.0.0 bindings."
            },
            {
                "step": 3,
                "title": "Restart Count Audit",
                "description": "Verify container restart counts are 0, confirming runtime stability.",
                "verification": "Restart count == 0."
            }
        ],
        "outputs": [
            "Container operational matrix",
            "Loopback enforcement status",
            "Process health report"
        ],
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
        "inputs": [
            "AsyncSession connection pool",
            "Table row counters (leads, orders, dev_os_audit_log)"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Connection Roundtrip Test",
                "description": "Execute async query on PostgreSQL engine to measure latency.",
                "verification": "Roundtrip latency < 10ms."
            },
            {
                "step": 2,
                "title": "Table Integrity Scan",
                "description": "Verify core tables exist and are readable without lock contention.",
                "verification": "Zero lock deadlocks."
            },
            {
                "step": 3,
                "title": "Audit Table Volume Audit",
                "description": "Count rows in dev_os_audit_log and confirm rolling 14-day retention rule.",
                "verification": "Row count within safe storage bounds."
            }
        ],
        "outputs": [
            "Database health status (HEALTHY)",
            "Latency metric (ms)",
            "Active connection pool state"
        ],
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
        "inputs": [
            "Docker logging configuration (max-size 10m)",
            "Redis memory buffer size",
            "/tmp folder volume"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Docker Log Cap Verification",
                "description": "Verify docker-compose.prod.yml enforces max-size: 10m and max-file: 3.",
                "verification": "Log caps confirmed active."
            },
            {
                "step": 2,
                "title": "Redis Buffer Capacity Check",
                "description": "Verify in-memory circular buffer is capped at 500 events.",
                "verification": "Buffer length <= 500."
            },
            {
                "step": 3,
                "title": "Build Cache & Temp Cleanup",
                "description": "Inspect /tmp and Docker builder cache for orphaned assets.",
                "verification": "0 orphaned build artifacts detected."
            }
        ],
        "outputs": [
            "Storage hygiene status (HEALTHY)",
            "Storage leak risk (0.00%)",
            "Cache retention status"
        ],
        "contingency_protocol": "Execute automated log truncation and temporary file prune if storage consumption exceeds baseline thresholds."
    },
    "agent_security_shield": {
        "id": "agent_security_shield",
        "code": "SOP-SEC-01",
        "title": "Zero-Trust Security Shield",
        "domain": "Security",
        "supervisor": "submaster_security_compliance",
        "mandate": "Enforce zero-trust network boundaries, loopback binding, client bundle sanitization, and HMAC master authentication.",
        "token_efficiency_policy": "Synchronous validation on-demand; zero background CPU or network overhead.",
        "oahu_grounding": "Ensures Dev OS and internal administration routes cannot be reached or indexed across the public internet.",
        "inputs": [
            "Listening socket map",
            "Client JavaScript bundles",
            "Master authentication credentials"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Loopback Enforcement Scan",
                "description": "Audit listening ports to verify internal services are restricted to 127.0.0.1.",
                "verification": "All internal ports bound to loopback."
            },
            {
                "step": 2,
                "title": "Client Bundle Secret Audit",
                "description": "Inspect public Next.js bundles to ensure zero private keys, DB passwords, or internal tokens are exposed.",
                "verification": "Client bundles 100% sanitized."
            },
            {
                "step": 3,
                "title": "Master Auth Gate Check",
                "description": "Verify only irasmussenjobs@gmail.com is authorized with SHA-256 HMAC token validation.",
                "verification": "Master auth gate enforced."
            }
        ],
        "outputs": [
            "Security status (ARMORED)",
            "Public bundle sanitization report",
            "Authentication gate status"
        ],
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
        "inputs": [
            "Git commit history (last 10 commits)",
            "Staged git diffs",
            "scan-secrets.ps1 patterns"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Recent Commits Inspection",
                "description": "Scan recent commits for high-entropy strings, private keys, and API tokens.",
                "verification": "Zero leaked secrets detected."
            },
            {
                "step": 2,
                "title": "Environment File Audit",
                "description": "Verify all .env files and local secrets are strictly included in .gitignore.",
                "verification": ".env files ignored."
            },
            {
                "step": 3,
                "title": "Pre-Push Validation",
                "description": "Run scripts/scan-secrets.ps1 to verify full working tree compliance.",
                "verification": "Scanner returns exit code 0."
            }
        ],
        "outputs": [
            "Commit audit grade (SECURED)",
            "Leaked secrets count (0)",
            "Ignored env file verification"
        ],
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
        "inputs": [
            "dev_os_audit_log table",
            "Customer PII fields in database"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Audit Log Integrity Check",
                "description": "Count audit log entries and verify sequential timestamp monotonicity.",
                "verification": "Audit records intact and sequential."
            },
            {
                "step": 2,
                "title": "PII Masking Verification",
                "description": "Ensure customer phone numbers and emails are masked (e.g. 808-***-1234) in public logs.",
                "verification": "PII masking active across all streams."
            },
            {
                "step": 3,
                "title": "Retention Rule Check",
                "description": "Confirm 14-day rolling prune query executes without dropping current audit records.",
                "verification": "Retention window verified."
            }
        ],
        "outputs": [
            "Compliance status (COMPLIANT)",
            "Retained audit records count",
            "PII masking status"
        ],
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
        "inputs": [
            "Workstation listening socket table",
            "Server firewall rules",
            "Dev OS sync endpoint configuration"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Inbound Blocking Verification",
                "description": "Confirm local workstation exposes 0 inbound ports to the server or public network.",
                "verification": "Zero inbound listening ports."
            },
            {
                "step": 2,
                "title": "Outbound-Only Sync Audit",
                "description": "Verify all Master Brain synchronization is strictly client-initiated HTTPS push/pull.",
                "verification": "Server initiates 0 connections to client."
            },
            {
                "step": 3,
                "title": "Loopback Server Isolation",
                "description": "Verify all management daemons on the VPS are bound strictly to 127.0.0.1.",
                "verification": "100% loopback isolation confirmed."
            }
        ],
        "outputs": [
            "Perimeter status (ARMORED_AIRTIGHT)",
            "Inbound ports (0)",
            "Sync architecture (OUTBOUND_ONLY)"
        ],
        "contingency_protocol": "Immediately kill any process attempting reverse inbound connection from remote to local."
    },
    "agent_funnel_telemetry": {
        "id": "agent_funnel_telemetry",
        "code": "SOP-COM-01",
        "title": "Conversion Funnel Telemetry Agent",
        "domain": "Commerce",
        "supervisor": "submaster_commerce_telemetry",
        "mandate": "Track real-time visitor progression through the 4 core funnel steps with zero recurring polling overhead.",
        "token_efficiency_policy": "Reads in-memory ring buffer (capped at 500 events); outputs compact aggregated conversion ratios.",
        "oahu_grounding": "Oahu homeowner service booking funnels (A/C Diagnostic, Teardown Cleaning, Mini-Split Repair).",
        "inputs": [
            "TELEMETRY_BUFFER events",
            "Funnel step transition timestamps"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Event Ingestion & Deduplication",
                "description": "Process client telemetry events from in-memory ring buffer.",
                "verification": "Buffer length within max capacity (500)."
            },
            {
                "step": 2,
                "title": "Funnel Velocity Calculation",
                "description": "Calculate conversion rates across Landing -> Select -> Form -> Success.",
                "verification": "Conversion velocity > 3.0%."
            },
            {
                "step": 3,
                "title": "Zero-Barrier Check",
                "description": "Confirm no funnel step demands credit card payment before appointment booking.",
                "verification": "Zero payment traps detected."
            }
        ],
        "outputs": [
            "Funnel telemetry status (STREAMING)",
            "Step conversion ratios",
            "Drop-off analytics"
        ],
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
        "inputs": [
            "Booking form component schema",
            "Mobile viewport layout metrics",
            "Pricing display strings"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Form Friction Audit",
                "description": "Verify booking form requires at most 4 fields (Name, Phone, Service, Zip).",
                "verification": "Friction score optimal (4 fields)."
            },
            {
                "step": 2,
                "title": "Tap-to-Call Prominence",
                "description": "Verify click-to-call (808) 723-5595 button is visible on mobile viewport.",
                "verification": "Phone CTA immediately accessible."
            },
            {
                "step": 3,
                "title": "Value Anchor Verification",
                "description": "Confirm $175 basic / $275 teardown flat pricing is clearly stated upfront.",
                "verification": "Pricing anchors visible before submit."
            }
        ],
        "outputs": [
            "CRO status (OPTIMIZED)",
            "Form friction score",
            "Mobile UX compliance check"
        ],
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
        "inputs": [
            "Stripe API charges ledger",
            "PostgreSQL orders table",
            "Webhook delivery logs"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Unrecorded Charge Scan",
                "description": "Query Stripe API for recent successful charges and compare with database orders.",
                "verification": "Zero unrecorded payments found."
            },
            {
                "step": 2,
                "title": "Webhook Idempotency Check",
                "description": "Verify webhook events are processed idempotently without duplicate charges.",
                "verification": "Idempotency keys verified."
            },
            {
                "step": 3,
                "title": "Net Revenue Summary",
                "description": "Calculate verified gross volume, dispute count (0), and settlement status.",
                "verification": "Disputes == 0."
            }
        ],
        "outputs": [
            "Reconciliation status (RECONCILED)",
            "Unrecorded orders count (0)",
            "Verified transaction volume"
        ],
        "contingency_protocol": "Automatically create missing database order records if unrecorded Stripe charge is detected."
    },
    "agent_seo_metadata": {
        "id": "agent_seo_metadata",
        "code": "SOP-GRO-01",
        "title": "SEO & Oahu City Landing Page Sentinel",
        "domain": "Growth",
        "supervisor": "submaster_growth_grounding",
        "mandate": "Verify search engine indexing, semantic JSON-LD structured data, and regional keyword dominance across all 22 Oahu city routes.",
        "token_efficiency_policy": "Reads sitemap and metadata definitions synchronously; zero external web crawling tokens consumed.",
        "oahu_grounding": "22 Oahu cities including Honolulu, Pearl City, Kapolei, Kailua, Kaneohe, Mililani, Ewa Beach, and Waipahu.",
        "inputs": [
            "sitemap.ts route manifest",
            "City landing page metadata definitions",
            "Schema.org local business markup"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "City Route Coverage Audit",
                "description": "Verify all 22 Oahu city landing pages exist in sitemap.xml.",
                "verification": "22/22 city routes active."
            },
            {
                "step": 2,
                "title": "Schema.org JSON-LD Verification",
                "description": "Verify LocalBusiness schema contains contractor license CT-36775 and telephone (808) 723-5595.",
                "verification": "Schema valid with license number."
            },
            {
                "step": 3,
                "title": "Robots & Anti-Crawling Audit",
                "description": "Verify robots.ts disallows /dev-os, /admin, and internal APIs while allowing public city pages.",
                "verification": "Dev OS strictly protected; public pages indexed."
            }
        ],
        "outputs": [
            "SEO status (ACTIVE_OPTIMIZING)",
            "Indexed city routes count (22)",
            "License schema verification"
        ],
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
        "inputs": [
            "Oahu microclimate zone map",
            "Trade-wind humidity models",
            "Coastal corrosion distance index"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Microclimate Profile Matching",
                "description": "Map customer location to Leeward (high heat), Windward (high humidity/mold), or Central/Valley.",
                "verification": "Accurate climate zone identified."
            },
            {
                "step": 2,
                "title": "Corrosion Protection Advisory",
                "description": "Attach Blue-Fin / Gold-Fin coil protection recommendations for coastal properties.",
                "verification": "Corrosion guidelines attached."
            },
            {
                "step": 3,
                "title": "Pricing Transparency Anchor",
                "description": "Attach island flat pricing ($175 basic / $275 teardown / $50 delivery) to recommendation copy.",
                "verification": "Transparent pricing confirmed."
            }
        ],
        "outputs": [
            "Grounding status (GROUNDED)",
            "Microclimate specifications",
            "Regional cooling recommendations"
        ],
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
        "inputs": [
            "Island HVAC contractor rate surveys",
            "Big-box retailer stock availability",
            "AHAC warehouse inventory"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Contractor Rate Benchmarking",
                "description": "Compare AHAC flat rates ($175 / $275) against standard island contractor hourly fees.",
                "verification": "AHAC maintains 40-50% value advantage."
            },
            {
                "step": 2,
                "title": "Inventory Availability Audit",
                "description": "Verify Waipahu warehouse has in-stock units ready for immediate island delivery.",
                "verification": "Zero multi-week shipping delays."
            },
            {
                "step": 3,
                "title": "Value Proposition Synthesis",
                "description": "Update marketing anchors highlighting local warehouse stock and licensed workmanship.",
                "verification": "Marketing copy aligned with competitive moats."
            }
        ],
        "outputs": [
            "Market status (MONITORED)",
            "Competitor price benchmark",
            "Value proposition moats"
        ],
        "contingency_protocol": "Adjust landing page headline emphasis if competitor promotions or inventory supply shifts."
    },
    "agent_heco_rebate_strategist": {
        "id": "agent_heco_rebate_strategist",
        "code": "SOP-GRO-04",
        "title": "Hawaii Energy Rebate & HECO Economics Strategist",
        "domain": "Growth",
        "supervisor": "submaster_growth_grounding",
        "mandate": "Model Hawaiian Electric (HECO 44.2\u00a2/kWh) utility economics and verify AHAC's official $45 Hawaii Energy Rebate Form for Window ACs (Zero mini split rebate participation).",
        "token_efficiency_policy": "Deterministic mathematical formulas; executed synchronously in < 1ms with zero token waste.",
        "oahu_grounding": "Hawaiian Electric (HECO) residential baseline tariff (44.2\u00a2/kWh) \u2014 highest electricity rates in the nation.",
        "inputs": [
            "HECO residential electric tariff",
            "Hawaii Energy Window AC rebate application PDF",
            "SEER2 efficiency curves"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Power Consumption Modeling",
                "description": "Calculate annual kilowatt-hour load for baseline 10 SEER vs 18+ SEER2 inverter units on Oahu.",
                "verification": "Annual consumption modeled at ~3,200 kWh/yr."
            },
            {
                "step": 2,
                "title": "Rebate Policy Enforcement",
                "description": "Verify zero rebate claims on Mini Split division (straight CT-36775 contractor pricing) and verify official AHAC $45 rebate form availability for Window ACs.",
                "verification": "Mini split zero-rebate enforced; Window AC $45 form verified."
            },
            {
                "step": 3,
                "title": "Payback Period Computation",
                "description": "Compute annual electricity savings ($424.32/yr) and payback period (~9.4 months) under HECO 44.2\u00a2/kWh rate.",
                "verification": "Payback period calculated and verified."
            }
        ],
        "outputs": [
            "Rebate status (REBATE_GROUNDED)",
            "Electricity savings estimate ($424/yr)",
            "Window AC $45 AHAC Form (ACTIVE)",
            "Mini Split Rebate Policy (HONEST_ZERO_REBATE)"
        ],
        "contingency_protocol": "Recalculate savings model when HECO announces fuel surcharge adjustments or tariff changes."
    },
    "agent_gsc_ga4_analytics": {
        "id": "agent_gsc_ga4_analytics",
        "code": "SOP-GRO-05",
        "title": "Search Console & GA4 Performance Analytics Sentinel",
        "domain": "Growth",
        "supervisor": "submaster_growth_grounding",
        "mandate": "Ingest and analyze Google Search Console query impressions and GA4 funnel telemetry to detect high-impression / low-CTR bottlenecks.",
        "token_efficiency_policy": "On-demand execution with cached aggregation; executes in < 4ms without external polling overhead.",
        "oahu_grounding": "Tracks localized Oahu search queries across Honolulu, Waipahu, Kailua, Kapolei, Ewa Beach, and Mililani.",
        "inputs": [
            "Google Search Console query performance data",
            "GA4 user session telemetry",
            "Funnel stage drop-off logs"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "GSC Query Cluster Audit",
                "description": "Scan Search Console impressions for high-volume keywords with CTR < 3.0% (e.g., window ac installation oahu, ac mold cleaning).",
                "verification": "High-impression opportunity queries identified."
            },
            {
                "step": 2,
                "title": "GA4 Funnel Drop-off Analysis",
                "description": "Track session progression from landing page to product view, lead wizard, and Stripe checkout.",
                "verification": "Stage drop-off rates quantified."
            },
            {
                "step": 3,
                "title": "Opportunity Matrix Generation",
                "description": "Correlate search impressions with conversion barriers to recommend targeted landing pages and copy adjustments.",
                "verification": "Analytics opportunity report compiled."
            }
        ],
        "outputs": [
            "GSC query cluster report",
            "GA4 funnel efficiency index",
            "Underperforming route alerts"
        ],
        "contingency_protocol": "Alert growth sub-master when any high-volume query cluster experiences > 20% CTR drop."
    },
    "agent_schema_metadata_engine": {
        "id": "agent_schema_metadata_engine",
        "code": "SOP-GRO-06",
        "title": "Structured Data Schema & Dynamic SERP Enhancer",
        "domain": "Growth",
        "supervisor": "submaster_growth_grounding",
        "mandate": "Generate, validate, and update Google Rich Results compliant JSON-LD schemas and dynamic metadata to boost organic search CTR.",
        "token_efficiency_policy": "Deterministic schema generation using static templates; executes in < 2ms with zero runtime LLM overhead.",
        "oahu_grounding": "Embeds Hawaii CT-36775 license, Waipahu warehouse geographic coordinates, and GET tax compliance across all schemas.",
        "inputs": [
            "Route metadata registry",
            "Product catalog pricing/stock",
            "Customer FAQ dataset",
            "CT-36775 licensing data"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Schema Integrity Audit",
                "description": "Validate existing JSON-LD schemas (Product, LocalBusiness, FAQPage, HowTo) for zero schema.org errors.",
                "verification": "100% valid schema markup across all routes."
            },
            {
                "step": 2,
                "title": "SERP Rich Snippet Injection",
                "description": "Ensure dynamic prices ($504-$1025), stock availability, and CT-36775 license appear in structured output.",
                "verification": "Rich snippet attributes verified."
            },
            {
                "step": 3,
                "title": "Metadata Optimization",
                "description": "Generate high-CTR title tags and meta descriptions tailored to high-impression search keywords.",
                "verification": "SERP metadata optimized."
            }
        ],
        "outputs": [
            "Schema catalog status (VALID)",
            "Rich snippet coverage rate",
            "Dynamic metadata templates"
        ],
        "contingency_protocol": "Flag and automatically repair any invalid JSON-LD schema markup upon route deployment."
    },
    "agent_high_intent_planner": {
        "id": "agent_high_intent_planner",
        "code": "SOP-GRO-07",
        "title": "High-Intent SEO & CRO Planning Sentinel",
        "domain": "Growth",
        "supervisor": "submaster_growth_grounding",
        "mandate": "Supervise high-intent landing page roadmaps, cross-funnel bridges, and stream continuous CRO recommendations to hold conversion rates steady.",
        "token_efficiency_policy": "On-demand execution with memory-mapped recommendation catalog; completes in < 3ms.",
        "oahu_grounding": "Bridges Oahu search intents: Waipahu bench teardowns ($275), LG Dual Inverter warehouse inventory, and CT-36775 licensed installations.",
        "inputs": [
            "GSC opportunity queries",
            "Shop inventory ledger (including 18k and 23.5k stock)",
            "Lead dispatch logs"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "High-Intent Page Roadmap Review",
                "description": "Audit production status of high-intent conversion pages (/clean-vs-replace, /installation, /plug-guide, /estimate).",
                "verification": "All active pages tracked in catalog."
            },
            {
                "step": 2,
                "title": "Cross-Funnel Bridge Verification",
                "description": "Verify that maintenance pages offer unit replacements, shop pages offer installation, and contact pages offer equipment.",
                "verification": "Cross-funnel CTAs verified active."
            },
            {
                "step": 3,
                "title": "Continuous CRO Recommendation Stream",
                "description": "Generate prioritized UI, content, and CTA adjustments based on real-time funnel telemetry to stream conversion gains.",
                "verification": "Active recommendations published to Dev OS."
            }
        ],
        "outputs": [
            "High-intent page roadmap (12 routes)",
            "Cross-funnel bridge status (ACTIVE)",
            "Streaming CRO recommendations"
        ],
        "contingency_protocol": "Immediately flag any disconnected commercial touchpoint or unaddressed high-volume search query."
    },
    "agent_crm_dispatch": {
        "id": "agent_crm_dispatch",
        "code": "SOP-CRM-01",
        "title": "CRM Dispatch & Technician Queue Agent",
        "domain": "Operations",
        "supervisor": "submaster_crm_operations",
        "mandate": "Manage incoming service requests, technician dispatch queues, and ensure strictly By-Appointment-First customer contact.",
        "token_efficiency_policy": "Direct SQLAlchemy query on leads table with status index; execution time < 5ms.",
        "oahu_grounding": "Oahu-wide technician dispatch covering Honolulu, Leeward, Central, and Windward zones.",
        "inputs": [
            "PostgreSQL leads table",
            "Lead status enum (NEW, SCHEDULED, COMPLETED)"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "New Lead Ingest",
                "description": "Query leads table for all records with status == NEW.",
                "verification": "Pending count calculated."
            },
            {
                "step": 2,
                "title": "By-Appointment-First Gate Check",
                "description": "Verify all customer records require phone scheduling contact before any payment or truck roll.",
                "verification": "Zero unauthorized truck rolls."
            },
            {
                "step": 3,
                "title": "Waipahu Teardown Queue",
                "description": "Track bench repair units at Waipahu warehouse for 24-48 hr turnaround.",
                "verification": "Turnaround time maintained <= 48 hrs."
            }
        ],
        "outputs": [
            "Dispatch status (DISPATCH_READY)",
            "Pending scheduling count",
            "Turnaround metric"
        ],
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
        "inputs": [
            "Completed service records",
            "Equipment installation dates",
            "Customer feedback scores"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Service Interval Calculation",
                "description": "Identify customers reaching 6 months (mini-split coil flush) or 12 months (window AC teardown).",
                "verification": "Recall list compiled."
            },
            {
                "step": 2,
                "title": "Customer Satisfaction Tracking",
                "description": "Calculate customer satisfaction rate from completed service reviews.",
                "verification": "Satisfaction rate >= 98.0%."
            },
            {
                "step": 3,
                "title": "Warranty Protection Check",
                "description": "Verify CT-36775 workmanship warranty coverage active on all eligible jobs.",
                "verification": "Warranty records verified."
            }
        ],
        "outputs": [
            "Lifecycle status (TRACKING)",
            "Maintenance recall intervals",
            "Customer satisfaction rate"
        ],
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
        "inputs": [
            "Lead notes and symptom descriptions",
            "Service type selections (mini-split vs portable/window)"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Symptom Keyword Analysis",
                "description": "Scan lead notes for mold/odor, evaporator icing/freeze, water leakage, or total cooling failure.",
                "verification": "Symptom breakdown populated."
            },
            {
                "step": 2,
                "title": "Service Routing Determination",
                "description": "Route window/portable units to Waipahu Warehouse Teardown ($275 flat); route mini-splits to field dispatch.",
                "verification": "Appropriate service path assigned."
            },
            {
                "step": 3,
                "title": "Emergency Priority Check",
                "description": "Flag severe heat vulnerability or medical necessity for expedited dispatch.",
                "verification": "High-priority flags honored."
            }
        ],
        "outputs": [
            "Triage status (TRIAGE_ACTIVE)",
            "Symptom breakdown counts",
            "Routing recommendations"
        ],
        "contingency_protocol": "Escalate urgent cooling failure requests directly to master dispatch queue."
    },
    "agent_deployment_guardian": {
        "id": "agent_deployment_guardian",
        "code": "SOP-DEP-01",
        "title": "Zero-Downtime Deployment Guardian",
        "domain": "Deployment",
        "supervisor": "submaster_deployment_quality",
        "mandate": "Coordinate blue/green container rebuilds, Nginx configuration validation, and zero-downtime production rollouts.",
        "token_efficiency_policy": "Triggered only during deployment sequences; zero background polling or idle daemon overhead.",
        "oahu_grounding": "Guarantees zero downtime for Oahu homeowners visiting www.affordablehome-ac.com at all hours.",
        "inputs": [
            "Git branch status (main)",
            "docker-compose.prod.yml configuration",
            "Nginx syntax test results"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Git Branch & Working Tree Check",
                "description": "Verify git branch is main and working tree is clean before deployment.",
                "verification": "Branch == main, clean working tree."
            },
            {
                "step": 2,
                "title": "Zero-Downtime Rebuild",
                "description": "Execute targeted container build with up -d --no-deps to ensure live site never drops.",
                "verification": "Containers rebuilt with 0s downtime."
            },
            {
                "step": 3,
                "title": "Nginx Reverse Proxy Test",
                "description": "Execute nginx -t syntax verification before issuing reload.",
                "verification": "Syntax ok, reload successful."
            }
        ],
        "outputs": [
            "Deployment status (SYNCED)",
            "Zero-downtime protocol verification",
            "Git branch confirmation"
        ],
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
        "inputs": [
            "TypeScript compiler output (tsc)",
            "Next.js production build logs",
            "Route manifest (44 pages)"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "TypeScript Strict Compile",
                "description": "Run TypeScript compiler to verify zero type mismatches or unhandled exceptions.",
                "verification": "0 type errors."
            },
            {
                "step": 2,
                "title": "Next.js Route Compilation",
                "description": "Verify all 44 static and dynamic routes compile cleanly into optimized bundles.",
                "verification": "44 routes compiled."
            },
            {
                "step": 3,
                "title": "Dev OS Standalone Verification",
                "description": "Verify apps/dev-os compiles with basePath /dev-os without asset 404s.",
                "verification": "Dev OS bundle verified."
            }
        ],
        "outputs": [
            "Build QA status (VERIFIED)",
            "Compiled routes count (44)",
            "TypeScript strict check"
        ],
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
        "inputs": [
            "Checkout form component code",
            "Service agreement disclaimer text",
            "Footer licensing notices"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "By-Appointment-First Audit",
                "description": "Verify service booking funnel requires zero credit card input prior to scheduling contact.",
                "verification": "100% zero-card booking verified."
            },
            {
                "step": 2,
                "title": "Drop-Cloth Legal Clause Check",
                "description": "Verify service agreements include plastic sheeting and drop-cloth standards to protect against drywall dispute liability.",
                "verification": "Drop-cloth clause verified in contract text."
            },
            {
                "step": 3,
                "title": "Licensing & Anti-Deception Audit",
                "description": "Verify CT-36775 license is visible and zero false '24/7' or 'Free Diagnostic' claims exist.",
                "verification": "Licensing verified, zero deceptive claims."
            }
        ],
        "outputs": [
            "Regression status (NON_REGRESSION_VERIFIED)",
            "By-Appointment-First status (ENFORCED)",
            "Drop-cloth legal protection (ACTIVE)"
        ],
        "contingency_protocol": "Immediately flag any PR or commit that introduces upfront credit card requirements for service scheduling."
    },
    "agent_catalog_auditor": {
        "id": "agent_catalog_auditor",
        "code": "SOP-COM-04",
        "title": "Catalog & Specification Integrity Sentinel",
        "domain": "Commerce",
        "supervisor": "submaster_commerce_telemetry",
        "mandate": "Audit all 16 warehouse catalog products against factory spec sheets, ensuring zero specification drift and mathematical alignment between AHAM and Island Microclimate Dual Sizing.",
        "token_efficiency_policy": "Zero external API calls. Runs in-memory audit against products_seed.json and PostgreSQL catalog with sub-5ms execution time.",
        "oahu_grounding": "Protects Oahu homeowners from purchasing undersized AC units for single-wall redwood homes or mismatched window opening dimensions.",
        "inputs": [
            "products_seed.json",
            "PostgreSQL products table",
            "Factory PDF specification sheets"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Dual-Sizing Verification",
                "description": "Verify every model has both certified AHAM square footage and Oahu Island single-wall calibrated square footage.",
                "verification": "Dual-coverage present on all 16 models."
            },
            {
                "step": 2,
                "title": "Window Opening Caliper Check",
                "description": "Verify minimum window height and width spans match factory specifications (e.g. LW1222IVSM 16.0\" H x 27\"-39\" W).",
                "verification": "Window dimensions match engineering drawings."
            },
            {
                "step": 3,
                "title": "Chassis & Weight Verification",
                "description": "Verify chassis architecture (Slide In-Out vs Top-Mount Fixed) and exact net/shipping weights.",
                "verification": "Weight and chassis type verified."
            },
            {
                "step": 4,
                "title": "Target Model Audit",
                "description": "Verify LW1222IVSM reflects 12,000 BTU, 550 sq. ft. AHAM, 250-380 sq. ft. Island, and 85 lbs net weight.",
                "verification": "LW1222IVSM verified with zero drift."
            }
        ],
        "outputs": [
            "Catalog audit status (CATALOG_AUDITED)",
            "Models verified (16)",
            "Target model verification (VERIFIED)"
        ],
        "contingency_protocol": "Immediately flag drift and trigger automated catalog reseed via /dev-os/catalog/migrate-and-reseed."
    },
    "agent_spatial_visualizer": {
        "id": "agent_spatial_visualizer",
        "code": "SOP-DEP-04",
        "title": "3D Spatial Caliper & Cutaway Engine",
        "domain": "Deployment",
        "supervisor": "submaster_deployment_quality",
        "mandate": "Supervise 3D architectural spatial cutaway generation, vector HUD caliper compositing, and architectural fit recommendations for all window AC units.",
        "token_efficiency_policy": "High-velocity client rendering; authentic model photography synthesized with architectural cutaways and vector HUD; outputs optimized WebP (< 95KB).",
        "oahu_grounding": "Visualizes window sill and jalousie frame fit directly for Hawaii homeowners, eliminating dimension ambiguity prior to dispatch.",
        "inputs": [
            "Architectural 3D cutaway passes",
            "Product caliper dimension coordinates",
            "Production asset directory"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Cutaway Asset Check",
                "description": "Verify existence of all 16 product_{id}_fit_cutaway.webp assets and legacy aliases.",
                "verification": "All 16 assets exist with size < 130KB."
            },
            {
                "step": 2,
                "title": "Caliper Overlay Integrity",
                "description": "Verify caliper boundary offsets, dimension leader lines, and typography compliance.",
                "verification": "0 graphic clipping, high-DPI contrast."
            },
            {
                "step": 3,
                "title": "Spatial Fit Resolution",
                "description": "Verify 1600x1000 WebP asset resolution and responsive image scaling on mobile.",
                "verification": "Zero CLS, responsive srcset verified."
            }
        ],
        "outputs": [
            "Spatial engine status (SPATIAL_VERIFIED)",
            "Rendered cutaway count (3)",
            "Caliper accuracy (CONFIRMED)"
        ],
        "contingency_protocol": "Trigger local python scripts/generate_window_3d_render.py and scripts/apply_caliper_overlay.py if asset checksum fails."
    },
    "submaster_serp_acquisition": {
        "id": "submaster_serp_acquisition",
        "code": "SOP-SUB-07",
        "title": "SERP & Intent Acquisition Sub-Master",
        "domain": "SERP Acquisition",
        "supervisor": "Sovereign Master Orchestrator",
        "mandate": "Supervise search query intent harvesting across 22 Oahu city pages, click-through-rate title tag optimization, and Google Merchant Center XML feed syndication.",
        "token_efficiency_policy": "Zero background polling loops. Invoked strictly on-demand by client CLI or Dev OS UI. Emits compact JSON summaries (< 400 bytes).",
        "oahu_grounding": "Oahu search intent harvesting (Honolulu, Ewa Beach, Kailua, Waipahu, Kapolei), localized $0 estimate price anchoring, and Hawaii Contractor License CT-36775 SERP trust badges.",
        "inputs": [
            "Google Search Console query logs",
            "Next.js page metadata",
            "Google Merchant XML feeds",
            "Canonical URL graph"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "High-Intent Query Clustering",
                "description": "Trigger agent_serp_intent_harvester to identify high-converting Oahu queries with impressions but low CTR.",
                "verification": "Query intent taxonomy categorized (Repair, Warehouse Pickup, Sizing)."
            },
            {
                "step": 2,
                "title": "CTR Title Tag Optimization",
                "description": "Trigger agent_ctr_title_craftsman to enforce click-magnetic title patterns with phone hotline and $0 estimate hooks.",
                "verification": "22 city pages enforce ${city} AC Repair & In-Stock Window ACs | $0 Estimate | (808) 488-1111."
            },
            {
                "step": 3,
                "title": "Merchant Feed Audit",
                "description": "Trigger agent_merchant_feed_sentinel to validate XML feed and rich snippet schemas.",
                "verification": "Google Merchant feed valid with validFrom anchors and zero duplicate reviews."
            }
        ],
        "outputs": [
            "SERP acquisition matrix",
            "CTR improvement roadmap",
            "Merchant feed health report"
        ],
        "contingency_protocol": "Auto-correct canonical tag conflicts and title tag formatting on detected SERP crawl penalties."
    },
    "submaster_conversion_velocity": {
        "id": "submaster_conversion_velocity",
        "code": "SOP-SUB-08",
        "title": "Frictionless Conversion Velocity Sub-Master",
        "domain": "Conversion",
        "supervisor": "Sovereign Master Orchestrator",
        "mandate": "Enforce frictionless checkout flow, 1-tap mobile wallet availability (Apple Pay, Google Pay, Link), Waipahu warehouse trust grounding, and strict anti-upsell mandate.",
        "token_efficiency_policy": "On-demand client invocation. Evaluates checkout pipeline and Lighthouse web vitals metrics in < 10ms memory audits.",
        "oahu_grounding": "Oahu customer trust defense: eliminates mainland shipping anxiety via Waipahu warehouse pickup proof, 1-year local warranty, and transparent GET tax.",
        "inputs": [
            "Stripe checkout session config",
            "Checkout page UI DOM",
            "Core Web Vitals telemetry",
            "Phone bridge tap logs"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Mobile Wallet Pipeline Check",
                "description": "Trigger agent_mobile_checkout_sentinel to confirm Apple Pay, Google Pay, and Stripe Link are unrestricted.",
                "verification": "payment_method_types is dynamic; card-only restriction removed."
            },
            {
                "step": 2,
                "title": "Trust & Reassurance Grounding",
                "description": "Trigger agent_trust_authority_grounder to verify warehouse proof card and 1-year warranty replace intimidating refund warnings.",
                "verification": "High-trust card active; intimidating blood-red banners purged."
            },
            {
                "step": 3,
                "title": "Zero-Friction & Anti-Upsell Audit",
                "description": "Trigger agent_zero_friction_navigator to enforce zero checkout friction, instant filter resets, and direct phone bridges.",
                "verification": "Zero upsells, zero checkout dead-ends, 1-tap phone hotline active."
            },
            {
                "step": 4,
                "title": "Core Web Vitals Verification",
                "description": "Trigger agent_speed_core_vital_sentinel to audit mobile page speed and zero CLS delivery.",
                "verification": "Mobile response < 100ms, CLS = 0.00, zero-cache headers active."
            }
        ],
        "outputs": [
            "Mobile checkout velocity score",
            "Trust armor index",
            "Core Web Vitals status"
        ],
        "contingency_protocol": "Immediately purge any checkout blocker, modal pop-up, or payment restriction that decreases checkout completion speed."
    },
    "agent_serp_intent_harvester": {
        "id": "agent_serp_intent_harvester",
        "code": "SOP-SERP-01",
        "title": "SERP Intent Harvester Sentinel",
        "domain": "SERP Acquisition",
        "supervisor": "submaster_serp_acquisition",
        "mandate": "Harvest and cluster high-intent Oahu search queries across repair, emergency replacement, warehouse pickup, and mini-split sizing keywords.",
        "token_efficiency_policy": "In-memory query clustering against historical Search Console cache. Zero external network requests.",
        "oahu_grounding": "Captures local microclimate queries ('kailua ac rust', 'ewa beach window ac sizing', 'honolulu emergency ac repair').",
        "inputs": [
            "GSC query logs",
            "Search query cluster index"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Cluster Analysis",
                "description": "Cluster queries by intent: transactional purchase, local warehouse pickup, or diagnostic repair.",
                "verification": "High-intent queries segmented with > 1,500 monthly impressions."
            },
            {
                "step": 2,
                "title": "CTR Gap Detection",
                "description": "Identify queries ranking in top 5 with CTR below 3.5%.",
                "verification": "Target queries flagged for title craftsman optimization."
            }
        ],
        "outputs": [
            "Top query clusters",
            "Identified CTR gaps",
            "Intent harvesting status (HARVESTING_ACTIVE)"
        ],
        "contingency_protocol": "Recommend targeted title adjustments to submaster_serp_acquisition."
    },
    "agent_ctr_title_craftsman": {
        "id": "agent_ctr_title_craftsman",
        "code": "SOP-SERP-02",
        "title": "CTR Title Tag Craftsman Sentinel",
        "domain": "SERP Acquisition",
        "supervisor": "submaster_serp_acquisition",
        "mandate": "Formulate and audit click-optimized title tags, price anchors ($0 Estimate), and phone hotlines ((808) 488-1111) across all Oahu routes.",
        "token_efficiency_policy": "Deterministic title syntax parsing. Zero external tokens consumed.",
        "oahu_grounding": "Embeds Waipahu local stock availability and Honolulu phone bridge directly into Google SERP blue link snippets.",
        "inputs": [
            "apps/web/app page metadata",
            "City page route templates"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "City Template Title Audit",
                "description": "Verify all 22 city pages format title as ${city} AC Repair & In-Stock Window ACs | $0 Estimate | (808) 488-1111.",
                "verification": "All 22 city templates match conversion title standard."
            },
            {
                "step": 2,
                "title": "Canonical Link Integrity",
                "description": "Verify zero root canonical override on subpages.",
                "verification": "Root layout alternates canonical purged."
            }
        ],
        "outputs": [
            "Title tag compliance (100%)",
            "Title craftsman status (TITLES_CRAFTED)"
        ],
        "contingency_protocol": "Auto-correct malformed title templates."
    },
    "agent_merchant_feed_sentinel": {
        "id": "agent_merchant_feed_sentinel",
        "code": "SOP-SERP-03",
        "title": "Google Merchant Feed Sentinel",
        "domain": "SERP Acquisition",
        "supervisor": "submaster_serp_acquisition",
        "mandate": "Audit Google Merchant Center XML feed and Product JSON-LD schema for validFrom, priceValidUntil, and aggregateRating deduplication.",
        "token_efficiency_policy": "Sub-millisecond XML/JSON schema inspection. Zero external calls.",
        "oahu_grounding": "Ensures all 16 Waipahu in-stock window AC models display clean 4.9-star rich snippets and transparent Oahu pricing on Google Shopping.",
        "inputs": [
            "apps/web/app/api/google-feed/route.ts",
            "apps/web/app/shop/[slug]/layout.tsx"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Merchant XML Validation",
                "description": "Verify XML feed renders valid RSS 2.0 with g:price and g:availability.",
                "verification": "16 products syndicating to Google Merchant Center."
            },
            {
                "step": 2,
                "title": "Schema Deduplication Audit",
                "description": "Verify zero duplicate aggregateRating blocks across city and shop layouts.",
                "verification": "Clean single aggregateRating per product/service."
            }
        ],
        "outputs": [
            "Merchant feed status (MERCHANT_FEED_VERIFIED)",
            "Audited products (16)"
        ],
        "contingency_protocol": "Filter malformed schema nodes prior to build compilation."
    },
    "agent_mobile_checkout_sentinel": {
        "id": "agent_mobile_checkout_sentinel",
        "code": "SOP-CONV-01",
        "title": "Mobile Checkout Sentinel",
        "domain": "Conversion",
        "supervisor": "submaster_conversion_velocity",
        "mandate": "Validate 1-tap mobile wallet availability (Apple Pay, Google Pay, Stripe Link) and prevent checkout payment gateway restrictions.",
        "token_efficiency_policy": "In-memory inspection of Stripe checkout session creation parameters; 0Hz idle cost.",
        "oahu_grounding": "Enables Oahu mobile shoppers on LTE/5G to complete unit purchases in under 15 seconds without typing credit cards manually.",
        "inputs": [
            "apps/web/app/create-checkout-session/route.ts",
            "apps/web/app/api/checkout/route.ts"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Payment Method Options Audit",
                "description": "Verify payment_method_types is dynamic or includes card, link, apple_pay, google_pay.",
                "verification": "Restricted ['card'] array absent."
            },
            {
                "step": 2,
                "title": "Origin Fallback Audit",
                "description": "Verify origin fallback correctly resolves to https://www.affordablehome-ac.com.",
                "verification": "Localhost fallback replaced."
            }
        ],
        "outputs": [
            "Mobile checkout status (MOBILE_WALLETS_ARMORED)",
            "Supported wallets (Apple Pay, Google Pay, Link)"
        ],
        "contingency_protocol": "Restore dynamic payment method configurations immediately upon restriction detection."
    },
    "agent_trust_authority_grounder": {
        "id": "agent_trust_authority_grounder",
        "code": "SOP-CONV-02",
        "title": "Trust Authority Grounder Sentinel",
        "domain": "Conversion",
        "supervisor": "submaster_conversion_velocity",
        "mandate": "Embed Waipahu warehouse proof, 1-year manufacturer warranty, and Hawaii Contractor License CT-36775 badge in high-friction conversion steps.",
        "token_efficiency_policy": "Static inspection of checkout page UI tree and warranty trust cards.",
        "oahu_grounding": "Replaces hostile 'All Sales Final / No Refunds' warning with reassuring Waipahu warehouse pickup and warranty reassurance.",
        "inputs": [
            "apps/web/app/checkout/page.tsx"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Hostile Warning Audit",
                "description": "Confirm all intimidating red 'All Sales Final' banners have been purged.",
                "verification": "Hostile banner absent."
            },
            {
                "step": 2,
                "title": "Warehouse Reassurance Card Check",
                "description": "Confirm presence of Waipahu Warehouse Verified badge and 1-Year Warranty reassurance card.",
                "verification": "Reassurance card verified in checkout DOM."
            }
        ],
        "outputs": [
            "Trust grounding status (TRUST_GROUNDED)",
            "Trust card active (Waipahu Warehouse Verified)"
        ],
        "contingency_protocol": "Revert to high-trust reassurance layout if any checkout template regresses."
    },
    "agent_zero_friction_navigator": {
        "id": "agent_zero_friction_navigator",
        "code": "SOP-CONV-03",
        "title": "Zero-Friction Navigator Sentinel",
        "domain": "Conversion",
        "supervisor": "submaster_conversion_velocity",
        "mandate": "Enforce strict anti-upsell mandate, eliminate checkout dead-ends, maintain instant filter resets, and provide 1-tap phone bridges.",
        "token_efficiency_policy": "Zero token overhead. Performs code pattern scan for modal popups, accessory upsells, and bundle checkboxes.",
        "oahu_grounding": "Protects Oahu shoppers from mainland-style aggressive sales tactics; ensures clean, direct, respectful checkout experience.",
        "inputs": [
            "apps/web/app/checkout/page.tsx",
            "apps/web/app/shop/ShopClient.tsx"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Anti-Upsell Audit",
                "description": "Scan checkout pipeline for upsell modals, warranty add-ons, or accessory bundle checkboxes.",
                "verification": "0 upsell components found."
            },
            {
                "step": 2,
                "title": "Dispatch Phone Bridge Check",
                "description": "Verify (808) 488-1111 phone bridge is clickable with tel: URI.",
                "verification": "1-tap phone bridge verified."
            }
        ],
        "outputs": [
            "Friction status (FRICTION_ZERO)",
            "Anti-upsell compliance (100% ENFORCED)"
        ],
        "contingency_protocol": "Block any pull request introducing checkout modals or accessory add-ons."
    },
    "agent_speed_core_vital_sentinel": {
        "id": "agent_speed_core_vital_sentinel",
        "code": "SOP-CONV-04",
        "title": "Speed & Core Web Vitals Sentinel",
        "domain": "Conversion",
        "supervisor": "submaster_conversion_velocity",
        "mandate": "Enforce mobile sub-100ms TTFB, zero Cumulative Layout Shift (CLS = 0.00), and universal zero-cache headers for dynamic routes.",
        "token_efficiency_policy": "Headers and bundle size analyzer; sub-5ms in-memory inspection.",
        "oahu_grounding": "Optimizes page delivery across Hawaii cellular networks (Docomo, T-Mobile, AT&T, Verizon on Oahu).",
        "inputs": [
            "Nginx response headers",
            "Next.js cache-control headers",
            "apps/web build traces"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Cache-Control Audit",
                "description": "Verify shop and checkout routes emit no-cache, no-store, must-revalidate.",
                "verification": "Universal zero-cache headers active."
            },
            {
                "step": 2,
                "title": "CLS Layout Verification",
                "description": "Verify images and cutaways have fixed aspect-ratio boxes preventing layout shift.",
                "verification": "CLS verified at 0.00."
            }
        ],
        "outputs": [
            "Core Web Vitals status (VITALS_OPTIMAL)",
            "LCP target (< 2.0s)",
            "CLS (0.00)"
        ],
        "contingency_protocol": "Alert Sovereign Master on any asset addition causing layout shift or bundle bloat."
    },
    "submaster_creative_studio": {
        "id": "submaster_creative_studio",
        "code": "SOP-SUB-09",
        "title": "Creative AI & Spatial Media Studio Sub-Master",
        "domain": "Creative Studio",
        "supervisor": "Sovereign Master Orchestrator",
        "mandate": "Supervise local workstation ComfyUI orchestration on RTX 4090, Oahu customer portrait matrices, 3D golden review medallions, and sub-80KB WebP production pipelines.",
        "token_efficiency_policy": "Triggered on-demand via scripts/comfyui_studio_bridge.py or Dev OS. Zero persistent daemon GPU idle waste. Enforces SVG/CSS offline fallback.",
        "oahu_grounding": "Grounds customer portraits in authentic Hawaii demographics, casual aloha attire, natural trade-wind indoor lighting, and Waipahu warehouse trust.",
        "inputs": [
            "RTX 4090 VRAM headroom",
            "ComfyUI /system_stats endpoint",
            "D:\\Studio\\v266 workflow definitions",
            "Review metadata database"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "GPU & Bridge Probe",
                "description": "Trigger agent_comfyui_bridge to verify RTX 4090 (24GB VRAM) and ComfyUI server port 8188.",
                "verification": "VRAM free > 16GB, bridge armed."
            },
            {
                "step": 2,
                "title": "Demographic Matrix Formulation",
                "description": "Trigger agent_avatar_portrait_crafter to synthesize non-stereotyped Oahu resident prompt matrices.",
                "verification": "Prompts match authentic island residential contexts."
            },
            {
                "step": 3,
                "title": "Trust Medallion Forging",
                "description": "Trigger agent_trust_medallion_forge to forge 3D golden review medallions and CT-36775 shields.",
                "verification": "Golden medallions rendered in SVG and WebP."
            },
            {
                "step": 4,
                "title": "Asset Optimization & CLS Guard",
                "description": "Trigger agent_asset_optimizer_sentinel to compress WebP assets (< 80KB) and verify zero-CLS layout boxes.",
                "verification": "WebP sizes < 80KB, CLS impact = 0.00."
            }
        ],
        "outputs": [
            "Creative studio status (STUDIO_ARMED)",
            "Hardware report",
            "Optimized review assets"
        ],
        "contingency_protocol": "If ComfyUI server is offline, deploy high-aesthetic Polynesian SVG/CSS gradient avatars so storefront renders without broken images."
    },
    "agent_comfyui_bridge": {
        "id": "agent_comfyui_bridge",
        "code": "SOP-STU-01",
        "title": "ComfyUI Studio Bridge Sentinel",
        "domain": "Creative Studio",
        "supervisor": "submaster_creative_studio",
        "mandate": "Audit workstation RTX 4090 GPU VRAM headroom and interface with local ComfyUI instance on D:\\Studio\\v266\\App\\ComfyUI.",
        "token_efficiency_policy": "Zero token waste; queries local nvidia-smi and HTTP loopback on port 8188 strictly on demand.",
        "oahu_grounding": "Coordinates workstation raytracing and diffusion models without placing load on live Hostinger VPS storefront.",
        "inputs": [
            "nvidia-smi stdout",
            "http://127.0.0.1:8188/system_stats",
            "scripts/comfyui_studio_bridge.py"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "VRAM Headroom Audit",
                "description": "Query nvidia-smi for total and free VRAM on RTX 4090.",
                "verification": "VRAM free > 16,000 MB."
            },
            {
                "step": 2,
                "title": "Studio Directory Verification",
                "description": "Confirm D:\\Studio\\v266\\App\\ComfyUI directory and models exist.",
                "verification": "Studio directory verified."
            }
        ],
        "outputs": [
            "Bridge status (STUDIO_BRIDGE_ARMED)",
            "VRAM stats",
            "GPU model"
        ],
        "contingency_protocol": "Log warning and route to SVG fallback generation if ComfyUI loopback is unreachable."
    },
    "agent_avatar_portrait_crafter": {
        "id": "agent_avatar_portrait_crafter",
        "code": "SOP-STU-02",
        "title": "Oahu Avatar Portrait Crafter",
        "domain": "Creative Studio",
        "supervisor": "submaster_creative_studio",
        "mandate": "Formulate demographic prompt matrices for authentic Oahu customer avatars reflecting genuine local homeowners in Kailua, Waipahu, Honolulu, and Ewa Beach.",
        "token_efficiency_policy": "In-memory prompt matrix generation; zero runtime GPU polling.",
        "oahu_grounding": "Grounds imagery in authentic island residential settings: lanais, jalousie window backgrounds, aloha shirts, and clean indoor AC splits.",
        "inputs": [
            "OAHU_AVATAR_PROMPTS matrix",
            "Customer review neighborhood distributions"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Demographic Archetype Audit",
                "description": "Verify coverage across Oahu communities (Windward, Leeward, Central, Metro).",
                "verification": "4 distinct regional archetypes active."
            },
            {
                "step": 2,
                "title": "Negative Prompt Shielding",
                "description": "Ensure negative prompt matrix strips uncanny artifacts, oversaturated colors, and artificial skin.",
                "verification": "Negative prompt verified."
            }
        ],
        "outputs": [
            "Portrait matrix status (PORTRAIT_MATRIX_ACTIVE)",
            "Active archetypes count (4)"
        ],
        "contingency_protocol": "Fall back to Polynesian geometric gradient avatars if generation fails QC."
    },
    "agent_trust_medallion_forge": {
        "id": "agent_trust_medallion_forge",
        "code": "SOP-STU-03",
        "title": "Trust Medallion Forge Sentinel",
        "domain": "Creative Studio",
        "supervisor": "submaster_creative_studio",
        "mandate": "Forge 3D golden review medallions, Waipahu Warehouse Verified badges, and CT-36775 contractor shields.",
        "token_efficiency_policy": "Vector SVG and pre-rendered WebP assets; 0Hz runtime CPU cost.",
        "oahu_grounding": "Embeds Waipahu local warehouse proof and Hawaii CT-36775 license directly into trust assets.",
        "inputs": [
            "apps/web/public/assets/reviews/trust_medallion_gold.svg",
            "CT-36775 license registry"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "Medallion Vector Verification",
                "description": "Verify gold medallion SVG renders with gold gradient and CT-36775 engraving.",
                "verification": "trust_medallion_gold.svg verified."
            },
            {
                "step": 2,
                "title": "Resolution Scaling Audit",
                "description": "Confirm vector scalability without raster pixelation on high-DPI mobile screens.",
                "verification": "Scalable SVG verified."
            }
        ],
        "outputs": [
            "Medallions status (MEDALLIONS_FORGED)",
            "Available badge formats (SVG, WebP)"
        ],
        "contingency_protocol": "Regenerate medallion vector from scripts/comfyui_studio_bridge.py --generate-fallbacks if asset missing."
    },
    "agent_asset_optimizer_sentinel": {
        "id": "agent_asset_optimizer_sentinel",
        "code": "SOP-STU-04",
        "title": "Asset Optimizer & CLS Sentinel",
        "domain": "Creative Studio",
        "supervisor": "submaster_creative_studio",
        "mandate": "Enforce strict WebP compression under 80KB, zero Cumulative Layout Shift (CLS = 0.00), and offline SVG fallback resilience.",
        "token_efficiency_policy": "File size and layout inspector; sub-2ms disk check.",
        "oahu_grounding": "Guarantees rapid initial page loads on Oahu LTE cellular networks without layout jumping.",
        "inputs": [
            "apps/web/public/assets/reviews/*",
            "ReviewsPavilion aspect-ratio wrappers"
        ],
        "execution_steps": [
            {
                "step": 1,
                "title": "File Weight Audit",
                "description": "Check that all review avatars and badges are under 80KB.",
                "verification": "All review assets < 80KB."
            },
            {
                "step": 2,
                "title": "Fallback Asset Verification",
                "description": "Verify all 6 Polynesian SVG fallback avatars exist in public assets.",
                "verification": "6/6 SVG fallbacks verified."
            }
        ],
        "outputs": [
            "Asset optimization status (ASSETS_OPTIMIZED)",
            "CLS impact (0.00)",
            "Fallback state (ACTIVE)"
        ],
        "contingency_protocol": "Auto-generate fallback SVGs if any raster image exceeds 80KB or fails to load."
    }
};
