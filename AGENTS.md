# SOVEREIGN AGENT & SWARM REGISTRY (AGENTS.md)

This document defines the agent architecture, roles, execution protocols, and operational guardrails for all AI agents and subagents operating within the Affordable Home A/C codebase.

---

## 1. SOVEREIGN MASTER & FLEET STRUCTURE

- **Sovereign Master**: Central cognitive intelligence overseeing all autonomous operations.
- **Category Sub-Masters (8)**: Autonomous domain supervisors governing specific functional areas.
- **Specialized Satellite Agents (33)**: On-demand diagnostic and execution units.
- **Strict Anti-Upsell Mandate**: No accessory upsells, add-on modals, or bundle friction in checkout.

```
                                        [ MASTER PROJECTS BRAIN ]
                                                    |
    +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
    |               |               |               |               |               |               |               |               |
[Infrastructure] [Cybersecurity] [Commerce]      [Growth & SEO]  [Customer & CRM] [Deployment QA] [SERP Acq.]     [Conversion]
  (4 Agents)      (4 Agents)     (4 Agents)        (7 Agents)      (3 Agents)       (4 Agents)     (3 Agents)       (4 Agents)
```

---

## 2. SUB-MASTER SPECIFICATIONS

### Sub-Master 1: Infrastructure & Storage (`submaster_infrastructure`)
- **Scope**: Host health, container orchestration, database persistence, log rotation.
- **Agents**:
  - `agent_host_sentinel`: Disk, RAM, UFW firewall, Let's Encrypt SSL.
  - `agent_container_sentinel`: Docker container lifecycle and health checks.
  - `agent_db_guardian`: PostgreSQL schema validation, migrations, and daily backup snapshots.
  - `agent_storage_sentinel`: Docker log cap enforcement (10m x 3), disk headroom monitoring.

### Sub-Master 2: Cybersecurity & Compliance (`submaster_security_compliance`)
- **Scope**: Secret detection, git commit auditing, audit trail logging, local perimeter defense, staging CEO notification shield.
- **Agents**:
  - `agent_security_shield`: Scans diffs and commits for exposed tokens, API keys, and credentials.
  - `agent_commit_sentinel`: Enforces conventional commit standards and branch hygiene.
  - `agent_compliance_auditor`: Manages immutable audit logs and 14-day rolling prune in PostgreSQL.
  - `agent_perimeter_auditor`: Mathematically validates 0 inbound workstation reach (outbound pull/push).

### Sub-Master 3: Commerce & Telemetry (`submaster_commerce_telemetry`)
- **Scope**: Funnel tracking, appointment velocity, Stripe payments, Hawaii GET tax, catalog specifications.
- **Agents**:
  - `agent_funnel_telemetry`: Ingests micro-conversion events across all 4 appointment funnels.
  - `agent_cro_optimizer`: Analyzes zero-upfront payment velocity and mobile thumb-zone layout.
  - `agent_revenue_reconciler`: Reconciles Stripe charges, customer receipts, and 4.712% Oahu GET tax.
  - `agent_catalog_auditor`: Audits all 16 catalog models for AHAM & Island dual-coverage compliance and zero spec drift.

### Sub-Master 4: Growth & Market Grounding (`submaster_growth_grounding`)
- **Scope**: Search engine visibility, 22-city Oahu coverage, climate economics, HECO rates.
- **Agents**:
  - `agent_seo_metadata`: Audits HTML/XML sitemaps, canonical tags, and city landing pages.
  - `agent_oahu_grounding`: Calibrates power consumption against HECO ~44.2¢/kWh residential rates.
  - `agent_market_research`: Tracks Honolulu competitor pricing and Waipahu pickup advantages.
  - `agent_heco_rebate_strategist`: Anchors Hawaii Energy mini-split energy rebate messaging.
  - `agent_gsc_ga4_analytics`: Monitors real-time Google Search Console & GA4 telemetry.
  - `agent_schema_metadata_engine`: Validates JSON-LD rich snippets (Product, FAQ, LocalBusiness).
  - `agent_high_intent_planner`: Optimizes high-converting service area pathways.

### Sub-Master 5: Customer Operations & CRM (`submaster_crm_operations`)
- **Scope**: Intake dispatch, lead qualification, Waipahu bench testing, customer lifecycle.
- **Agents**:
  - `agent_crm_dispatch`: Triages incoming appointment leads and monitors the dispatch queue.
  - `agent_customer_lifecycle`: Automates post-service follow-up and seasonal maintenance reminders.
  - `agent_intake_triage`: Analyzes HVAC symptom reports (e.g. blinking lights, refrigerant leaks).

### Sub-Master 6: Deployment & Quality Swarm (`submaster_deployment_quality`)
- **Scope**: Pre-flight checks, build QA, zero-downtime container swaps, non-regression verification, 3D spatial graphics.
- **Agents**:
  - `agent_deployment_guardian`: Coordinates zero-downtime Docker deployments on Hostinger VPS.
  - `agent_build_qa`: Verifies TypeScript compilation and Next.js static asset bundling.
  - `agent_regression_sentinel`: Validates By-Appointment-First rules and prevents upfront pay gates.
  - `agent_spatial_visualizer`: Supervise Blender 4.1 headless raytracing, caliper overlays, and 3D window cutaways.

### Sub-Master 7: SERP & Intent Acquisition (`submaster_serp_acquisition`)
- **Scope**: Search query intent harvesting, SERP snippet click-through optimization, Google Merchant feeds.
- **Agents**:
  - `agent_serp_intent_harvester`: Analyzes high-intent Oahu search queries, impressions, and CTR gaps across 22 city pages.
  - `agent_ctr_title_craftsman`: Formulates click-optimized title tags, price anchors ($0 Estimate), and phone hotlines.
  - `agent_merchant_feed_sentinel`: Audits Google Merchant XML feed and Product JSON-LD schema (validFrom, priceValidUntil).

### Sub-Master 8: Frictionless Conversion Velocity (`submaster_conversion_velocity`)
- **Scope**: Mobile checkout unblocking, 1-tap mobile wallets, buyer reassurance, core web vitals.
- **Agents**:
  - `agent_mobile_checkout_sentinel`: Validates 1-tap Apple Pay, Google Pay, and Link availability on mobile devices.
  - `agent_trust_authority_grounder`: Embeds Waipahu warehouse proof, 1-year manufacturer warranty, and CT-36775 badge.
  - `agent_zero_friction_navigator`: Ensures zero checkout dead-ends, instant filter resets, and dispatch phone bridges.
  - `agent_speed_core_vital_sentinel`: Enforces mobile sub-100ms response, zero CLS, and universal zero-cache headers.

---

## 3. CLI BRIDGE EXECUTION CHEATSHEET

The local PowerShell CLI bridge (`.\scripts\dev-os.ps1`) allows immediate interaction with the server fleet:

```powershell
# Fleet Health & Tree
.\scripts\dev-os.ps1 status                  # Query all 33 agents' lifecycle and last run
.\scripts\dev-os.ps1 tree                    # Display hierarchical agent tree
.\scripts\dev-os.ps1 inspect <agent_id>      # Deep inspect an individual agent synapse

# On-Demand Execution
.\scripts\dev-os.ps1 run-agent <agent_id>    # Trigger a single satellite agent
.\scripts\dev-os.ps1 run-submaster <id>      # Execute an entire category sub-master suite
.\scripts\dev-os.ps1 run-fleet               # Sequentially execute all 33 agents

# Master Brain & Continuous Learning
.\scripts\dev-os.ps1 brain                   # Query Master Brain status & live cognitive thoughts
.\scripts\dev-os.ps1 brain-sync "Directive"  # Push strategic directive to Master Brain
.\scripts\dev-os.ps1 session-sync "Summary"  # Push session learnings and milestones
.\scripts\dev-os.ps1 inject-history          # Re-energize brain with all chronological epochs

# Deployment Swarm & Security
.\scripts\dev-os.ps1 verify-live             # Execute 3-stage live deployment swarm check
.\scripts\dev-os.ps1 scan-secrets            # Run local git repository secret scanner
```
