---
name: ahac-sovereign-swarm
description: >-
  Use this skill whenever the user says "Convene all", asks to check or run the 40-agent Sovereign Swarm,
  deploy updates to the production Hostinger VPS (31.220.53.132), run the 3-stage live verification pipeline
  (verify-live), sync session memory with Master Projects Brain v2.8.0-SOVEREIGN, or execute codebase
  maintenance, gatekeepers, and security audits.
---

# AHAC Sovereign Swarm & Deployment Runbook (`v2.8.0-NOV12-OMNISCIENT-SWARM`)

## 1. Mandatory Handshake & Identity Protocol (`TRACKER`)
- Every new conversation or `"Convene all"` response **MUST** begin prominently with **`TRACKER`**.
- Confirm connection to **Master Projects Brain v2.8.0-SOVEREIGN (`EPOCH 21` / `v2.8.0-NOV12-OMNISCIENT-SWARM`)** across all **10 Category Sub-Masters, 40 Specialized Agents, 50 SOP Dossiers (100% 1:1 API/UI parity), 60 Neural Synapses, and 5 Workspace Skills**.
- Read [`project_state.md`](../../project_state.md), [`GEMINI.md`](../../GEMINI.md), and [`AGENTS.md`](../../AGENTS.md) before modifying code.

## 2. CLI Bridge Commands (`.\scripts\dev-os.ps1`)
`.\scripts\dev-os.ps1` loads `DEV_OS_MASTER_PASSWORD` dynamically from the process environment or untracked local `.env` (zero hardcoded secrets) and queries the live production API over HTTPS (`https://www.affordablehome-ac.com/api/v1/dev-os`):
```powershell
# Query 40-agent lifecycle & Master Brain v2.8.0 state
powershell -File .\scripts\dev-os.ps1 status
powershell -File .\scripts\dev-os.ps1 brain

# Trigger individual agent, sub-master, or full 40-agent fleet
powershell -File .\scripts\dev-os.ps1 run-agent <agent_id>
powershell -File .\scripts\dev-os.ps1 run-submaster <submaster_id>
powershell -File .\scripts\dev-os.ps1 run-fleet

# Execute 3-Stage Live Deployment Verification + Live 118-URL Google SEO/Feed Crawl
powershell -File .\scripts\dev-os.ps1 verify-live
powershell -File .\scripts\dev-os.ps1 live-crawl
powershell -File .\scripts\dev-os.ps1 grounding-audit
powershell -File .\scripts\dev-os.ps1 indexnow

# Execute All 6 Local Pre-Deploy Gatekeepers or Security Sweep
powershell -File .\scripts\dev-os.ps1 gatekeepers
powershell -File .\scripts\dev-os.ps1 security-sweep

# Energize 21-Epoch History & Sync Session Milestones into Master Brain
powershell -File .\scripts\dev-os.ps1 inject-history
powershell -File .\scripts\dev-os.ps1 session-sync "<Session Summary>"
```

## 3. Local 6-Gatekeeper Pre-Deploy Verification (`.\scripts\dev-os.ps1 gatekeepers`)
Always run all **6** checks locally (`powershell -ExecutionPolicy Bypass -File .\scripts\dev-os.ps1 gatekeepers`) before pushing or deploying:
1. **Storefront TypeScript (`apps/web`, `118` canonical routes: `102` static/city + `16` product PDPs)**: `npx tsc --noEmit`
2. **Dev OS TypeScript (`apps/dev-os`, `50` 1:1 SOP dossiers)**: `npx tsc --noEmit`
3. **CRM Frontend TypeScript + Biome (`ahac-crm/frontend`)**: `npx tsc --noEmit` + `npx biome check src/`
4. **Backend Pytest Suite (`apps/api/tests`)**: `.\apps\api\.venv\Scripts\python.exe -m pytest apps/api/tests -q`
5. **Service Grounding Audit (`scripts/verify-service-grounding.ps1`)**: `0` violations across `apps/web`
6. **Full 6-Stage Secret + Every-File Email Fortress Sweep**: `.\scripts\dev-os.ps1 security-sweep`
- **Untracked Vault Rule**: Keep `_private_portfolio/`, `_analytics_data/`, and `.env` 100% untracked in Git. Never stage or commit them.

## 4. Zero-Downtime Production & Staging VPS Deployment (`31.220.53.132`)
- **Main Monorepo Path on VPS**: `/root/ahacap26` (`docker-compose.prod.yml`: `prod-web`, `prod-api`, `prod-dev-os`, `prod-db`, `prod-redis`; `docker-compose.staging.yml` (`name: ahac_staging`): `staging-web`, `staging-api`, `staging-db`, `staging-redis`).
- **CRM Repository Path on VPS**: `/var/www/ahac-crm` (`docker-compose.crm.yml`: `crm-frontend`, `crm-api`, both healthchecked).
- **Standard Deploy Sequence** (use `--force-recreate` whenever `.env` secrets change):
  ```powershell
  ssh root@31.220.53.132 "cd /root/ahacap26 && git fetch origin main && git reset --hard origin/main && docker compose -f docker-compose.prod.yml up -d --build --force-recreate prod-api prod-web prod-dev-os prod-redis && docker compose -f docker-compose.staging.yml up -d --build --force-recreate staging-api staging-web staging-redis && cd /var/www/ahac-crm && git fetch origin main && git reset --hard origin/main && docker compose -f docker-compose.crm.yml up -d --build --force-recreate crm-api crm-frontend"
  ```
- Immediately after deployment, run `.\scripts\dev-os.ps1 live-crawl`, `.\scripts\dev-os.ps1 run-fleet`, and `.\scripts\dev-os.ps1 verify-live`, confirming `OVERALL: VERIFIED_CLEAN`.
