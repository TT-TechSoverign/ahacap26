---
name: ahac-sovereign-swarm
description: >-
  Use this skill whenever the user says "Convene all", asks to check or run the 40-agent Sovereign Swarm,
  deploy updates to the production Hostinger VPS (31.220.53.132), run the 3-stage live verification pipeline
  (verify-live), sync session memory with Master Projects Brain v2.7.0-SOVEREIGN, or execute codebase
  maintenance and security audits.
---

# AHAC Sovereign Swarm & Deployment Runbook (`v2.7.3-NOV11-EMAIL-FORTRESS`)

## 1. Mandatory Handshake & Identity Protocol (`TRACKER`)
- Every new conversation or `"Convene all"` response **MUST** begin prominently with **`TRACKER`**.
- Confirm connection to **Master Projects Brain v2.7.0-SOVEREIGN (`EPOCH 21` / `v2.7.3-NOV11-EMAIL-FORTRESS`)** across all **10 Category Sub-Masters, 40 Specialized Agents, 50 SOP Dossiers, 58 Neural Synapses, and 4 Workspace Skills**.
- Read [`project_state.md`](../../project_state.md), [`GEMINI.md`](../../GEMINI.md), and [`AGENTS.md`](../../AGENTS.md) before modifying code.

## 2. CLI Bridge Commands (`.\scripts\dev-os.ps1`)
`.\scripts\dev-os.ps1` loads `DEV_OS_MASTER_PASSWORD` dynamically from the process environment or untracked local `.env` (zero hardcoded secrets) and queries the live production API over HTTPS (`https://www.affordablehome-ac.com/api/v1/dev-os`):
```powershell
# Query 40-agent lifecycle & Master Brain state
powershell -File .\scripts\dev-os.ps1 status
powershell -File .\scripts\dev-os.ps1 brain

# Trigger individual agent, sub-master, or full 40-agent fleet
powershell -File .\scripts\dev-os.ps1 run-agent <agent_id>
powershell -File .\scripts\dev-os.ps1 run-submaster <submaster_id>
powershell -File .\scripts\dev-os.ps1 run-fleet

# Execute 3-Stage Live Deployment Verification Swarm
powershell -File .\scripts\dev-os.ps1 verify-live

# Execute Full 6-Stage Secret Scanner + Forensic Email & Codebase Security Audit
powershell -File .\scripts\dev-os.ps1 security-sweep

# Sync session milestones into Redis & PostgreSQL Master Brain
powershell -File .\scripts\dev-os.ps1 session-sync "<Session Summary>"
```

## 3. Local Pre-Deploy Verification Gatekeepers
Always run these four checks locally before pushing or deploying:
1. **Storefront & Dev OS TypeScript Verification (`118` canonical indexed sitemap URLs: `102` static/city + `16` product PDPs)**:
   ```powershell
   cd apps/web; npx tsc --noEmit
   cd apps/dev-os; npx tsc --noEmit
   ```
2. **Backend Pytest Suite (`apps/api/tests`)**:
   ```powershell
   .\apps\api\.venv\Scripts\python.exe -m pytest apps/api/tests -q
   ```
3. **Full Security & Email Fortress Sweep (`scan-secrets.ps1` + `security-email-audit.py`)**:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\scripts\dev-os.ps1 security-sweep
   ```
- **Untracked Vault Rule**: Keep `_private_portfolio/`, `_analytics_data/`, and `.env` 100% untracked in Git. Never stage or commit them.

## 4. Zero-Downtime Production VPS Deployment (`31.220.53.132`)
- **Main Monorepo Path on VPS**: `/root/ahacap26` (uses `docker-compose.prod.yml`; service names: `prod-web`, `prod-api`, `prod-dev-os`, `prod-db`, `prod-redis`).
- **CRM Repository Path on VPS**: `/var/www/ahac-crm` (uses `docker-compose.crm.yml`; service names: `crm-frontend`, `crm-api`).
- **Standard Deploy Sequence** (use `--force-recreate` whenever `.env` secrets are rotated so running containers reload environment variables):
  ```powershell
  ssh root@31.220.53.132 "cd /root/ahacap26 && git fetch origin main && git reset --hard origin/main && docker compose -f docker-compose.prod.yml up -d --build --force-recreate prod-api prod-web prod-dev-os && cd /var/www/ahac-crm && git fetch origin main && git reset --hard origin/main && docker compose -f docker-compose.crm.yml up -d --build --force-recreate crm-api crm-frontend"
  ```
- Immediately after container recreation, run `powershell -File .\scripts\dev-os.ps1 verify-live` and confirm `overall_status: "VERIFIED_CLEAN"`.
