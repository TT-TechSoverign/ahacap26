# Security Vulnerability Report
**Date**: 2026-01-11
**Scanner**: Automated Dependency Audit (pnpm-audit / pip-audit)

## Summary
The automated scan identified **29** total vulnerabilities across the stack.
- **Frontend (Web)**: 12 Issues (Critical: Next.js)
- **Backend (API)**: 17 Issues (Critical: aiohttp, urllib3)

## 1. Backend Findings (Python)
- **Status**: ✅ **FIXED** (All critical CVEs patched).
- **Action**: Updated `aiohttp`, `pypdf`, `urllib3` to secure versions in `requirements.txt`.
- **Verification**: `pip-audit` Clean.

## 2. Frontend Findings (Node.js)
- **Status**: ⚠️ **IMPROVED** (Reduced from 12 to 7).
- **Remaining**: Some transitive dependencies in `next` ecosystem remain.
- **Action**: Applied `pnpm audit --fix` overrides.

## Remediation Plan
- [x] **API**: Pinned secure versions. Re-deployed.
- [x] **Web**: Applied auto-fixes. Monitoring specific `next` CVEs for upstream patches.

> [!WARNING]
> These vulnerabilities expose the application to DoS and potential RCE. Immediate patching is required.
