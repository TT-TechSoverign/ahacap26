---
name: ahac-cybersecurity-and-email-shield
description: >-
  Use this skill whenever auditing or modifying email templates, contact/lead intake routes, public storefront
  email links, Git/public repository hygiene, Nginx headers, DNS authentication (SPF, DKIM, DMARC), API rate
  limiting, secret rotation, or running security sweeps across Affordable Home A/C and ahac-crm.
---

# AHAC Cybersecurity & 6-Layer Email Fortress Protocol (`v2.7.3-NOV11-EMAIL-FORTRESS`)

## 1. Private vs. Public Email Architecture
- **Public Storefront Contact Email**: `office@affordablehome-ac.com`
  - **NEVER** render as a raw `<a href="mailto:office@affordablehome-ac.com">` or contiguous `user@domain` text inside SSR HTML (`apps/web/app/` or `apps/web/components/`).
  - **ALWAYS** render via [`<ProtectedEmailLink />`](../../apps/web/components/ProtectedEmailLink.tsx), which outputs fragmented zero-CLS `<span>` segments in initial HTML (invisible to regex spam harvesters) and hydrates a clickable `mailto:` link + GA4 `click_to_email` telemetry on the client.
  - Note: Structured JSON-LD business contact metadata may reference `office@affordablehome-ac.com` where required by Google Merchant / LocalBusiness schemas, while interactive DOM links must use `<ProtectedEmailLink />`.
- **Private Executive Admin Recipient**: `brian@affordablehome-ac.com`
  - Allowed **only** in server-side backend dispatch (`apps/api/`, `ahac-crm/backend/`) and governance docs.
  - **NEVER** expose in `apps/web/`, `apps/web/public/`, or `NEXT_PUBLIC_*` client bundles.
- **Private Developer Audit / Staging Shield Recipient**: `irasmussenjobs@gmail.com`
  - Receives BCC copies on production notifications and acts as the **exclusive** recipient when `IS_STAGING=True` or `is_test=True` (CEO Email Shield — `brian@affordablehome-ac.com` is 100% excluded from staging/test noise).
  - **NEVER** expose in `apps/web/`, `apps/web/public/`, or `NEXT_PUBLIC_*` client bundles, and **NEVER** grant unauthenticated rate-limit bypasses based on user-supplied email addresses (`X-Dev-OS-Key` HMAC verification is mandatory).

## 2. 6-Layer Backend Email Fortress (`apps/api/services/email.py` & `ahac-crm/backend/email_service.py`)
Whenever building or editing any email template, SMTP sender, or webhook handler:
1. **HTML / XSS / Phishing Escaping (`safe_html`)**: Wrap **every** user-controlled or Stripe/form-supplied field (`first_name`, `last_name`, `name`, `email`, `phone`, `address`, `city`, `zip`, `service_type`, `notes`, `description`, `order_id`) in `safe_html(...)` (`html.escape(..., quote=True)`).
2. **SMTP / MIME CRLF Header Stripping (`sanitize_header_val` & `sanitize_email_addr`)**: Strip `\r`, `\n`, and `\x00` from `Subject`, `To`, `From`, `Bcc`, and `Reply-To`, and validate recipient addresses against `_STRICT_SINGLE_EMAIL_RE`.
3. **Safe `tel:` Href Sanitization (`sanitize_phone_href`)**: Strip everything except `[0-9+\-() ]` before interpolating phone numbers into `href="tel:..."`.
4. **PII Log Redaction (`mask_email`)**: Never print raw customer or executive emails in application logs (`ke***@gmail.com`). Never dump raw request headers, cookies, or `Stripe-Signature` headers to stdout.
5. **Fallback Loop Prevention**: When a lead submits without an email address and defaults to `office@affordablehome-ac.com`, skip customer auto-responder confirmation to prevent self-mailing loops while still dispatching the internal admin alert.
6. **CSV Formula Neutralization (`sanitize_csv_cell`)**: Prefix any exported CSV cell starting with `=`, `+`, `-`, `@`, or `\t` with a leading single quote (`'`) so spreadsheet exports in `/admin` cannot execute formulas.

## 3. Perimeter, Proxy & Secret Guardrails
- **Zero Hardcoded Fallbacks**: Never commit fallback passwords or static JWT keys in Python, TypeScript, PowerShell, or Docker Compose files. Generate ephemeral random fallbacks via `secrets.token_urlsafe(48)` only for non-production test processes and load production secrets strictly from `chmod 600` `.env` files.
- **Trusted Real Client IP (`get_client_ip`)**: Nginx `location /api/v1/` must pass `proxy_set_header X-Real-IP $remote_addr;` so Redis rate limiters (`leads`, `admin/login`, `dev-os/auth/login`, `dev-os/analytics/event`) key on the true visitor IP rather than Docker bridge `172.18.0.1` or spoofed `X-Forwarded-For` headers.
- **API Docs Disabled in Production**: Keep `docs_url=None`, `redoc_url=None`, and `openapi_url=None` on both `prod-api` and `ahac-crm-api` outside local development.
- **Database Backup Vault Permissions**: Keep `/var/backups/ahac_db` at `chmod 700`, `*.sql.gz` snapshots at `chmod 600`, and `umask 077` in `/etc/cron.daily/backup-ahac-db`.

## 4. Mandatory Security & Email Verification Commands
Run the unified 2-tier sweep before every commit and deployment:
```powershell
# Runs 6-Stage scan-secrets.ps1 + Every-File Python security-email-audit.py
powershell -ExecutionPolicy Bypass -File .\scripts\dev-os.ps1 security-sweep

# Run Email Fortress & CEO Shield unit tests
.\apps\api\.venv\Scripts\python.exe -m pytest apps/api/tests/test_email_routing.py -q
```
Both commands **MUST** exit `0` (`VERIFIED_CLEAN`) before any `git push` or VPS deployment.
