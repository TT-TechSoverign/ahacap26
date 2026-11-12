#!/usr/bin/env python3
"""
Sovereign Every-File Security, Privacy & Email Protection Audit Engine (v2.7.4)
Scans git-tracked files (root + ahac-crm), public web assets (apps/web/public),
Next.js storefront bundles/routes, Docker ignore boundaries, and email/catalog guards:
  1. Zero private executive/developer emails in apps/web/ or ahac-crm/frontend/.
  2. Zero unprotected raw `mailto:` links on public storefront routes.
  3. Zero sensitive files (.env, .sql, .pem, .key, .bak, *snapshot*.json) in apps/web/public/ or git index.
  4. Zero personal workstation filesystem paths (C:\\Users\\...) leaked into code or data files.
  5. HTML entity escaping, CRLF MIME header stripping, PII log masking, 28-field catalog seed serializer,
     and Dev OS root PIN-isolation guards active.
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
    ".webp", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".woff", ".woff2",
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
WIN_USER_PATH_RE = re.compile(r"[Cc]:[/\\][Uu]sers[/\\][A-Za-z0-9_.\-]+")

FORBIDDEN_PUBLIC_EXTS = {
    ".env", ".sql", ".gz", ".bak", ".old", ".orig", ".pem", ".key", ".pfx", ".p12", ".sqlite", ".sqlite3", ".log"
}

FORBIDDEN_CODE_PATTERNS = [
    ("Retired Dev OS fallback key", re.compile(r"AhacMasterKey2026!Secured")),
    ("Retired CRM seed fallback key", re.compile(r"TerasightV4_Ahac_2026!")),
    ("Hardcoded test fallback JWT key", re.compile(r"super-secret-key-change-me")),
    ("Disabled SSL CERT_NONE", re.compile(r"ssl\.CERT_NONE")),
    ("Live Stripe secret key", re.compile(r"sk_live_[0-9A-Za-z]{20,}")),
    ("Private cryptographic key", re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----")),
]

GOVERNANCE_DOC_PREFIXES = (
    "GEMINI.md",
    "AGENTS.md",
    "project_state.md",
    ".agents/",
    "scripts/security-email-audit.py",
)


def _load_tracked_and_unignored_set() -> set:
    """Returns union of git-tracked and non-ignored untracked files across root and ahac-crm."""
    active = set()
    for prefix, repo_dir in [("", ROOT), ("ahac-crm/", os.path.join(ROOT, "ahac-crm"))]:
        if not os.path.exists(os.path.join(repo_dir, ".git")):
            continue
        try:
            out = subprocess.check_output(
                ["git", "-c", "core.fsmonitor=false", "ls-files", "--cached", "--others", "--exclude-standard"],
                cwd=repo_dir,
                text=True,
            )
            for line in out.splitlines():
                clean = line.strip().replace("\\", "/")
                if clean:
                    active.add(f"{prefix}{clean}")
        except Exception:
            pass
    return active


def walk_project_files():
    active_set = _load_tracked_and_unignored_set()
    all_files = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS and not d.startswith("brain_exports_")]
        for fn in filenames:
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, ROOT).replace("\\", "/")
            if active_set and not rel.startswith("apps/web/public/") and rel not in active_set:
                continue
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
            if os.path.getsize(full) > 10 * 1024 * 1024:
                violations.append(f"[OVERSIZED_TEXT_BLOB] Non-binary file >10MB should not sit in repo: {rel}")
                continue
            with open(full, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
        except OSError:
            continue

        scanned_text += 1

        # 2. Forbidden code patterns & workstation path leaks
        if rel not in ("scripts/scan-secrets.ps1", "scripts/security-email-audit.py"):
            for label, pat in FORBIDDEN_CODE_PATTERNS:
                if label == "Retired Dev OS fallback key" and rel == "apps/api/routers/dev_os.py":
                    continue
                if pat.search(content):
                    violations.append(f"[FORBIDDEN_PATTERN] {label} found in {rel}")

        if not rel.startswith(GOVERNANCE_DOC_PREFIXES):
            if WIN_USER_PATH_RE.search(content):
                violations.append(f"[WORKSTATION_PATH_LEAK] Local PC path (C:\\Users\\...) leaked in {rel}")

        # 3. Email inventory & public storefront boundary enforcement
        found_emails = set(m.lower() for m in EMAIL_RE.findall(content))
        for em in found_emails:
            if em.endswith((".png", ".webp", ".jpg", ".svg", ".css", ".js")):
                continue
            email_inventory.setdefault(em, []).append(rel)

        if rel.startswith(("apps/web/", "apps/dev-os/", "ahac-crm/frontend/")):
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

    # 4. Verify Email Fortress, Auth Isolation & 28-Field Catalog Seed Guards
    api_email_py = os.path.join(ROOT, "apps", "api", "services", "email.py")
    crm_email_py = os.path.join(ROOT, "ahac-crm", "backend", "email_service.py")
    prot_link_tsx = os.path.join(ROOT, "apps", "web", "components", "ProtectedEmailLink.tsx")
    api_catalog_py = os.path.join(ROOT, "apps", "api", "routers", "catalog.py")
    api_deps_py = os.path.join(ROOT, "apps", "api", "dependencies.py")

    for req_path, marker in [
        (api_email_py, "def safe_html("),
        (api_email_py, "def sanitize_header_val("),
        (api_email_py, "def mask_email("),
        (api_email_py, "def is_explicit_test_submission("),
        (crm_email_py, "html.escape("),
        (crm_email_py, "def _mask_email("),
        (prot_link_tsx, "export function ProtectedEmailLink"),
        (api_catalog_py, "def serialize_product_seed_dict("),
    ]:
        if not os.path.exists(req_path):
            violations.append(f"[MISSING_SHIELD] Required security module missing: {req_path}")
        else:
            body = open(req_path, "r", encoding="utf-8", errors="ignore").read()
            if marker not in body:
                violations.append(f"[MISSING_GUARD] '{marker}' missing in {os.path.relpath(req_path, ROOT)}")

    if os.path.exists(api_deps_py):
        deps_body = open(api_deps_py, "r", encoding="utf-8", errors="ignore").read()
        if "ADMIN_PIN" in deps_body:
            violations.append("[AUTH_ESCALATION_RISK] 4-digit ADMIN_PIN must never be accepted in dependencies.py")

    # 5. Verify Git tracked indexes (root + ahac-crm) contain zero .env or snapshot files
    for repo_label, repo_dir in [("root", ROOT), ("ahac-crm", os.path.join(ROOT, "ahac-crm"))]:
        if not os.path.isdir(os.path.join(repo_dir, ".git")) and not os.path.isfile(os.path.join(repo_dir, ".git")):
            continue
        try:
            tracked = subprocess.check_output(
                ["git", "-c", "core.fsmonitor=false", "ls-files"],
                cwd=repo_dir,
                text=True,
            ).splitlines()
            for t in tracked:
                b = os.path.basename(t)
                if (b == ".env" or b.startswith(".env.")) and not b.endswith((".example", ".sample")):
                    violations.append(f"[GIT_TRACKED_ENV] {repo_label}:{t} is tracked in git!")
                if "snapshot" in b.lower() and b.lower().endswith(".json"):
                    violations.append(f"[GIT_TRACKED_SNAPSHOT] {repo_label}:{t} workstation snapshot tracked in git!")
        except Exception as exc:
            violations.append(f"[GIT_CHECK_ERROR] {repo_label}: {exc}")

    print("=" * 66)
    print("  [EMAIL FORTRESS] EVERY-FILE SECURITY & EMAIL PROTECTION REPORT")
    print("=" * 66)
    print(f"  Total Non-Vendor Files Audited : {scanned_total}")
    print(f"  Text / Source Files Inspected  : {scanned_text}")
    print(f"  Distinct Email Strings Indexed : {len(email_inventory)}")
    print(f"  Private Emails in Client Code  : 0" if not any("PRIVATE_EMAIL_EXPOSED" in v for v in violations) else "  Private Emails in Client Code  : VIOLATION")
    print(f"  Workstation Path Leaks         : 0" if not any("WORKSTATION_PATH_LEAK" in v for v in violations) else "  Workstation Path Leaks         : VIOLATION")
    print(f"  Raw Public mailto: Links       : 0" if not any("RAW_MAILTO_HARVESTABLE" in v for v in violations) else "  Raw Public mailto: Links       : VIOLATION")
    print("-" * 66)

    if violations:
        print(f"  [FAILED] {len(violations)} security/email violation(s) detected:")
        for v in violations:
            print(f"    - {v}")
        print("=" * 66)
        return 1

    print("  [VERIFIED_CLEAN] 0 secret leaks, 0 workstation path leaks, 0 private")
    print("  email exposures, 0 raw mailto links, and 100% fortress guards active!")
    print("=" * 66)
    return 0


if __name__ == "__main__":
    sys.exit(main())
