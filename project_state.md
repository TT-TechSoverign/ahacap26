# Project State Report: Affordable Home A/C (AHAC)

**Last Updated**: September 22, 2026  
**Current Epoch**: `EPOCH 12 (September 21–22, 2026)`  
**Branch**: `main` (Production Synchronized)  
**Host**: Hostinger VPS (`31.220.53.132`) • Docker Production Stack

---

## 1. Executive Summary

Affordable Home A/C is an enterprise-grade, high-velocity e-commerce and HVAC service booking platform serving the island of Oahu, Hawaii. The platform operates on a **By-Appointment-First** architecture with zero upfront checkout payment barriers for physical service leads, backed by an autonomous **26-Agent Sovereign Fleet** and **Master Projects Brain v2.6.0**.

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
  - Live Neural Swarm visualizer with 3-stage deployment verification pipeline.
  - Multi-worker Redis synchronization across all 4 Uvicorn ASGI processes.
  - Symmetrical desktop and mobile navigation headers; mobile layout collision fixes.
  - Aloha EmailComposerModal with direct SMTP dispatch & dev BCC audit trail.
- **Epoch 12 (Sep 21-22, 2026) 3D Spatial Caliper, Dual-Sizing & Catalog Guard**:
  - **Catalog Specification Drift Resolution**: Root-caused developmental drift on 12,000 BTU LG Dual Inverter (`LW1222IVSM`) and across all 16 models. Corrected to real manufacturer ground truth: 12,000 BTU, 15.0 CEER, 3.8 Pts/Hr dehumidification, 15.0" H x 23.63" W x 28.78" D, Min Window Opening 16.0" H x 27"–39" W, 85 lbs net (96 lbs shipping), Slide In-Out chassis.
  - **Dual-Sizing Architecture**: Paired AHAM Factory Certified baseline (`Up to 550 sq. ft.`) with Island Microclimate Calibration™ (`250–380 sq. ft.`) for Hawaii single-wall redwood & jalousie louver air infiltration.
  - **Blender 4.1 3D Spatial Cutaways**: Automated pipeline rendering isometric window cutaway passes with PIL dimension caliper overlays and Hawaii fit certainty badge (`lw1222ivsm-window-fit-cutaway.webp`, `compact-window-fit-cutaway.webp`, `heavy-duty-window-fit-cutaway.webp`).
  - **Pre-Purchase Confidence Checklist & Media Switcher**: 3-point pre-purchase fit verification (window opening clearance, NEMA 5-15P vs 6-20P electrical matching, chassis slide-out handling safety).
  - **Responsive Horizontal Mobile Filter Track**: 44px min touch targets, `snap-x` horizontal scroll track, and zero CLS verified.
  - **26-Agent Sovereign Fleet Expansion**: Registered `agent_catalog_auditor` (Agent #25) and `agent_spatial_visualizer` (Agent #26) in `dev_os.py`, `dev_os_sops.py`, `AGENTS.md`, and `GEMINI.md`.
  - **Database Migration**: Added 10 specification columns via `ALTER TABLE products` and re-seeded all 16 models into live PostgreSQL.
  - **Swarm Verification**: Executed 3-stage deployment verification returning `OVERALL: VERIFIED_CLEAN` across all 26 agents.

---

## 4. Current Status: All Systems Operational

- **Fleet Health**: All 26 specialized agents report `[ACTIVE]` with synchronized execution timestamps.
- **Deployment Swarm**: 3-stage verification pipeline returns `OVERALL: VERIFIED_CLEAN` with 0 specification drift.
- **Perimeter Security**: 0 open inbound ports on local workstation; secret scanner reports 0 leaked tokens.
- **Storefront Performance**: 18.4 kB page route, zero CLS, and instant WebP asset delivery on `www.affordablehome-ac.com`.
