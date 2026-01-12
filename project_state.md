# Project State Report

**Last Updated:** 2026-01-11
**Current Branch:** `refactor/core-cleanup` (simulated)

## 1. Accomplished
- **Architecture**: Refactored monolithic `main.py` into modular `apps/api/domain/` layer.
- **Security**: Hardened entire stack.
    - **API**: Fixed critical CVEs in `aiohttp` and `urllib3` (Pinned versions).
    - **Web**: Reduced vulnerabilities via `pnpm audit --fix`.
- **Features**: Implemented "Discount Code" feature (`CALOHA` = 10% off) using TDD.
- **Quality**: Enforced Prettier/ESLint in VS Code and confirmed Build Stability (Docker).

## 2. Broken / WIP
- **API Tests**: `integration_test.py` passes, but full test suite automation pipeline is not yet set up (Manual execution required).
- **Web Vulnerabilities**: 7 moderate/low issues remain in frontend dependencies (transitive).

## 3. Next Steps
- **Cloud Deployment**: Containerize and push to registry.
- **CI/CD**: Automate `pytest` and `pnpm audit` on commit.
- **Frontend Integration**: Connect "Discount Code" input in `apps/web` to the new API field.
