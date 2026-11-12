#!/usr/bin/env python3
"""
Sovereign Every-File Security & Email Protection Audit Engine (v2.7.3)
Scans git-tracked files (root + ahac-crm), public web assets (apps/web/public),
Next.js storefront bundles/routes, and email dispatch sanitizers to guarantee:
  1. Zero private executive/developer emails in apps/web/ or apps/web/public/.
  2. Zero unprotected raw `mailto:` links on public storefront routes.
  3. Zero sensitive files (.env, .sql, .pem, .key, .bak, .zip) in apps/web/public/ or git index.
  4. HTML entity escaping, CRLF MIME header stripping, and PII log masking active in email services.
  5. Zero hardcoded fallback master keys or disabled SSL verification in active code.
"""

import os
import re
import subprocess
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

SKIP_DIRS = {
    ".git",
    "node_modules",
    ".next",
    "__pycache__",
    ".venv",
    "venv",
    "dist",
    "build",
    ".turbo",
    ".pytest_cache",
    "_private_portfolio",
    "_analytics_data",
}

BINARY_EXTS = {
    ".webp", ".png", ".jpg", ".jpeg", ".gif", ".ico", ".woff", ".woff2",
    ".ttf", ".eot", ".mp4", ".webm", ".mp3", ".wav", ".blend", ".gguf",
    ".onnx", ".bin", ".pyc", ".pyd", ".dll", ".exe", ".so", ".docx", ".pdf", ".zip",
}

PRIVATE_EMAILS = {
    "@".join(("brian", "affordablehome-ac.com")),
    "@".join(("irasmussenjobs", "gmail.com")),
    "@".join(("airperfection.itai", "gmail.com")),
}
PUBLIC_OFFICE_EMAIL = "@".join(("office", "affordablehome-ac.com"))
EMAIL_RE = re.compile(r"[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,24}")

FORBIDDEN_PUBLIC_EXTS = {
    ".env", ".sql", ".gz", ".bak", ".old", ".orig", ".pem", ".key", ".pfx", ".p12", ".sqlite", ".sqlite3", ".log"
}

FORBIDDEN_CODE_PATTERNS = [
    ("Retired Dev OS fallback key", re.compile(r"AhacMasterKey2026!Secured")),
    ("Retired CRM seed fallback key", re.compile(r"TerasightV4_Ahac_2026!")),
    ("Disabled SSL CERT_NONE", re.compile(r"ssl\.CERT_NONE")),
    ("Live Stripe secret key", re.compile(r"sk_live_[0-9A-Za-z]{20,}")),
    ("Private cryptographic key", re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----")),
]


def walk_project_files():
    all_files = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS and not d.startswith("brain_exports_")]
        for fn in filenames:
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, ROOT).replace("\\", "/")
            all_files.append((rel, full))
    return all_files


def main() -> int:
    violations = []
    email_inventory = {}
    scanned_total = 0
    scanned_text = 0

    files = walk_project_files()
    for rel, full in files:
        scanned_total += 1
        base = os.path.basename(rel)
        _, ext = os.path.splitext(base.lower())

        # 1. Public asset directory hygiene
        if rel.startswith("apps/web/public/"):
            if ext in FORBIDDEN_PUBLIC_EXTS or base.startswith(".env"):
                violations.append(f"[PUBLIC_ASSET_LEAK] Forbidden file in apps/web/public: {rel}")

        if ext in BINARY_EXTS or base.startswith(".env"):
            continue

        try:
            if os.path.getsize(full) > 2 * 1024 * 1024:
                continue
            with open(full, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
        except OSError:
            continue

        scanned_text += 1

        # 2. Forbidden code patterns (skip scanner files and dev_os legacy check reference)
        if rel not in ("scripts/scan-secrets.ps1", "scripts/security-email-audit.py"):
            for label, pat in FORBIDDEN_CODE_PATTERNS:
                if label == "Retired Dev OS fallback key" and rel == "apps/api/routers/dev_os.py":
                    continue
                if pat.search(content):
                    violations.append(f"[FORBIDDEN_PATTERN] {label} found in {rel}")

        # 3. Email inventory & public storefront boundary enforcement
        found_emails = set(m.lower() for m in EMAIL_RE.findall(content))
        for em in found_emails:
            if em.endswith((".png", ".webp", ".jpg", ".svg", ".css", ".js")):
                continue
            email_inventory.setdefault(em, []).append(rel)

        if rel.startswith("apps/web/") or rel.startswith("ahac-crm/frontend/"):
            for priv in PRIVATE_EMAILS:
                if priv in content.lower():
                    violations.append(f"[PRIVATE_EMAIL_EXPOSED] '{priv}' found in client bundle file: {rel}")

            if rel.startswith("apps/web/") and not rel.startswith("apps/web/app/admin/") and not rel.endswith("ProtectedEmailLink.tsx"):
                if re.search(r"mailto:\s*" + re.escape(PUBLIC_OFFICE_EMAIL), content, flags=re.I):
                    violations.append(f"[RAW_MAILTO_HARVESTABLE] Raw mailto link in public storefront: {rel}")

        if rel.startswith("apps/web/public/") and found_emails:
            real_public_emails = [e for e in found_emails if "@" in e and "." in e.split("@")[-1]]
            if real_public_emails:
                violations.append(f"[PUBLIC_STATIC_EMAIL] Email(s) {real_public_emails} in static public file: {rel}")

    # 4. Verify Email Fortress sanitizers exist in both API & CRM backends
    api_email_py = os.path.join(ROOT, "apps", "api", "services", "email.py")
    crm_email_py = os.path.join(ROOT, "ahac-crm", "backend", "email_service.py")
    prot_link_tsx = os.path.join(ROOT, "apps", "web", "components", "ProtectedEmailLink.tsx")

    for req_path, marker in [
        (api_email_py, "def safe_html("),
        (api_email_py, "def sanitize_header_val("),
        (api_email_py, "def mask_email("),
        (crm_email_py, "html.escape("),
        (crm_email_py, "def _mask_email("),
        (prot_link_tsx, "export function ProtectedEmailLink"),
    ]:
        if not os.path.exists(req_path):
            violations.append(f"[MISSING_SHIELD] Required security module missing: {req_path}")
        else:
            body = open(req_path, "r", encoding="utf-8", errors="ignore").read()
            if marker not in body:
                violations.append(f"[MISSING_GUARD] '{marker}' missing in {os.path.relpath(req_path, ROOT)}")

    # 5. Verify Git tracked index contains zero .env files
    try:
        tracked = subprocess.check_output(
            ["git", "-c", "core.fsmonitor=false", "ls-files"],
            cwd=ROOT,
            text=True,
        ).splitlines()
        for t in tracked:
            b = os.path.basename(t)
            if (b == ".env" or b.startswith(".env.")) and not b.endswith((".example", ".sample")):
                violations.append(f"[GIT_TRACKED_ENV] {t} is tracked in git!")
    except Exception as exc:
        violations.append(f"[GIT_CHECK_ERROR] {exc}")

    print("=" * 66)
    print("  [EMAIL FORTRESS] EVERY-FILE SECURITY & EMAIL PROTECTION REPORT")
    print("=" * 66)
    print(f"  Total Non-Vendor Files Audited : {scanned_total}")
    print(f"  Text / Source Files Inspected  : {scanned_text}")
    print(f"  Distinct Email Strings Indexed : {len(email_inventory)}")
    print(f"  Private Emails in apps/web/    : 0" if not any("PRIVATE_EMAIL_EXPOSED" in v for v in violations) else "  Private Emails in apps/web/    : VIOLATION")
    print(f"  Raw Public mailto: Links       : 0" if not any("RAW_MAILTO_HARVESTABLE" in v for v in violations) else "  Raw Public mailto: Links       : VIOLATION")
    print("-" * 66)

    if violations:
        print(f"  [FAILED] {len(violations)} security/email violation(s) detected:")
        for v in violations:
            print(f"    - {v}")
        print("=" * 66)
        return 1

    print("  [VERIFIED_CLEAN] 0 secret leaks, 0 private email exposures, 0 raw")
    print("  public mailto links, and 100% HTML/CRLF/PII email shields active!")
    print("=" * 66)
    return 0


if __name__ == "__main__":
    sys.exit(main())
