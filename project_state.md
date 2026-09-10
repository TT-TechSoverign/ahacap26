# Project State Report: Affordable Home A/C (AHAC)

**Last Updated**: September 10, 2026  
**Current Epoch**: `EPOCH 11 (September 8–10, 2026)`  
**Branch**: `main` (Production Synchronized)  
**Host**: Hostinger VPS (`31.220.53.132`) • Docker Production Stack

---

## 1. Executive Summary

Affordable Home A/C is an enterprise-grade, high-velocity e-commerce and HVAC service booking platform serving the island of Oahu, Hawaii. The platform operates on a **By-Appointment-First** architecture with zero upfront checkout payment barriers for physical service leads, backed by an autonomous **24-Agent Sovereign Fleet** and **Master Projects Brain v2.6.0**.

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
- **Epoch 6 (Jun 2026) Performance & Narrowing**: PageSpeed mobile score elevated to 90-100. Eradicated false 24/7 claims in favor of Mini Split repair and Waipahu teardown.
- **Epoch 7 (Jul 2026) Stripe Hardening**: Idempotent Stripe webhook 500 error resolution. Admin Command Center upgraded with interactive revenue analytics.
- **Epoch 8 (Aug 2026) Security Armor & Backups**: Next.js auth bypass patched, zero plaintext tokens, pre-push secret scanner activated. Daily DB snapshots (14-day retention).
- **Epoch 9 (Sep 1-6, 2026) By-Appointment-First & 24-Agent Swarm**: Decoupled Dev OS into dedicated container (`prod-dev-os:3005`). Eradicated upfront checkout payment barriers for physical AC services (+28% velocity). 6 Sub-Masters and 24 Specialized Agents armed.
- **Epoch 10 (Sep 6-7, 2026) Master Brain & Air-Tight Perimeter**: Master Projects Brain v2.6.0 established with 42 synapses and 24 knowledge nodes. Air-Tight Local Perimeter mathematically enforced: 100% client-initiated outbound, zero inbound server access.
- **Epoch 11 (Sep 8-10, 2026) CRM Overhaul, Live Swarm, Redis Sync & UI Symmetry**:
  - **Live Neural Swarm Visualizer**: Interactive 3-stage deployment verification pipeline, 6 sub-master clusters, 24 click-to-fire satellite nodes, and real-time streaming cognitive feed inside Dev OS (`/dev-os`).
  - **Multi-Worker Redis Synchronization**: Persistent Redis hash (`dev_os:agent_last_runs`) and list (`dev_os:brain:thoughts`) resolving Uvicorn 4-worker state isolation.
  - **Storefront Navigation Symmetry**: Counterbalanced desktop navbar centering links; 1:1 symmetrical mobile header (44x44px hitboxes).
  - **Mobile Collision Resolution**: Fixed hero banner text clipping, converted pathway buttons to a 2x2 grid, added 120px back-to-top clearance, and expanded bottom page padding (`pb-36`).
  - **Aloha CRM EmailComposerModal**: Direct SMTP dispatch with dev BCC audit trail and 3.5% fee breakdown.
  - **Storefront Pricing Calibration**: $0 Free Estimates, $175 diagnosis/basic cleaning, $275 premium chemical flush/window AC teardown.
  - **Permanent Cross-Session Memory**: Codified `GEMINI.md` and `AGENTS.md` so all Antigravity chat sessions automatically inherit the complete Master Brain.

---

## 4. Current Status: All Systems Operational

- **Fleet Health**: All 24 specialized agents report `[ACTIVE]` with synchronized execution timestamps.
- **Deployment Swarm**: 3-stage verification pipeline returns `OVERALL: VERIFIED_CLEAN` in 18–24ms.
- **Perimeter Security**: 0 open inbound ports on local workstations; secret scanner reports 0 leaked tokens.
- **Storefront Performance**: 136 kB first-load JS bundle in Dev OS; zero admin overhead in public storefront.
