import asyncio
import json
import os
import re
from types import SimpleNamespace
from unittest.mock import AsyncMock, MagicMock

import pytest

from domain.catalog import validate_inventory_service
from routers.dev_os import MASTER_BRAIN_STATE, router as dev_os_router
from routers.snippets import SnippetPayload, create_snippet

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
API_ROOT = os.path.join(REPO_ROOT, "apps", "api")
WEB_ROOT = os.path.join(REPO_ROOT, "apps", "web")
WEB_APP = os.path.join(WEB_ROOT, "app")
DEV_OS_APP = os.path.join(REPO_ROOT, "apps", "dev-os", "app")
CRM_ROOT = os.path.join(REPO_ROOT, "ahac-crm")


def test_snippets_post_upserts_existing_snippet_name():
    existing_obj = SimpleNamespace(id=7, name="hero_banner", data='{"title":"Old"}')

    scalars_mock = MagicMock()
    scalars_mock.first.return_value = existing_obj
    exec_result = MagicMock()
    exec_result.scalars.return_value = scalars_mock

    db = MagicMock()
    db.execute = AsyncMock(return_value=exec_result)
    db.commit = AsyncMock()
    db.add = MagicMock()

    payload = SnippetPayload(name="hero_banner", data={"title": "Updated Waipahu"})
    resp = asyncio.run(create_snippet(payload=payload, db=db))

    assert resp == {"status": "updated", "id": 7}
    assert json.loads(existing_obj.data) == {"title": "Updated Waipahu"}
    db.add.assert_not_called()
    db.commit.assert_awaited_once()


def test_validate_inventory_service_honors_active_promo_price():
    promo_prod = SimpleNamespace(
        id=4,
        name="LG Dual Inverter 12,000 BTU",
        price=745.0,
        promo_price=695.0,
        stock=10,
    )
    exec_res = MagicMock()
    exec_res.scalar_one_or_none.return_value = promo_prod

    db = MagicMock()
    db.execute = AsyncMock(return_value=exec_res)

    out = asyncio.run(
        validate_inventory_service(db, [{"product_id": 4, "requested_quantity": 2}])
    )
    assert out["valid"] is True
    assert out["results"][0]["price"] == 695.0
    assert out["results"][0]["is_available"] is True


def test_services_matrix_and_products_seed_pass18_ground_truth():
    with open(os.path.join(API_ROOT, "content", "services_matrix.json"), encoding="utf-8") as f:
        smatrix = json.load(f)

    cleaning_svcs = smatrix.get("divisions", {}).get("window_ac_cleaning", {}).get("services", [])
    diag_items = [s for s in cleaning_svcs if s.get("id") == "window-ac-diagnostic"]
    assert len(diag_items) == 1
    assert diag_items[0]["price"] == 0.0
    assert "$175" not in json.dumps(smatrix)

    with open(os.path.join(API_ROOT, "content", "products_seed.json"), encoding="utf-8") as f:
        seed = json.load(f)

    by_id = {p["id"]: p for p in seed}
    assert by_id[8]["min_window_width"] == '22"'
    assert by_id[8]["max_window_width"] == '36"'
    assert by_id[9]["window_width_min_max"] == '29" - 41"'
    assert by_id[10]["window_width_min_max"] == '29" - 41"'


def test_dev_os_perimeter_push_directive_endpoint_and_118_route_parity():
    route_paths = {getattr(r, "path", "") for r in dev_os_router.routes}
    assert "/brain/perimeter/push-directive" in route_paths
    assert len(MASTER_BRAIN_STATE["synapses"]) == 58

    with open(os.path.join(API_ROOT, "routers", "dev_os.py"), encoding="utf-8") as f:
        dev_os_src = f.read()
    retired_literal = "AhacMasterKey" + "2026!Secured"
    assert retired_literal not in dev_os_src

    with open(os.path.join(DEV_OS_APP, "sopsData.ts"), encoding="utf-8") as f:
        sops_ts = f.read()
    assert "101 canonical" not in sops_ts
    assert "74/74" not in sops_ts


def test_zero_silent_lead_form_catches_and_100_percent_faqpage_dom_parity():
    # 1. Zero catch blocks setting setIsSuccess(true) on network/API failure
    for root, dirs, files in os.walk(WEB_APP):
        dirs[:] = [d for d in dirs if d not in ("node_modules", ".next")]
        for fn in files:
            if fn.endswith(".tsx"):
                fp = os.path.join(root, fn)
                txt = open(fp, encoding="utf-8").read()
                m = re.search(r"catch\s*(?:\([^)]*\))?\s*\{\s*setIsSuccess\(true\)", txt)
                assert m is None, f"Silent false-success catch found in {fp}"

    # 2. ProtectedEmailLink SSR fallback points to /contact (not dead #dispatch-email)
    pel = open(os.path.join(WEB_ROOT, "components", "ProtectedEmailLink.tsx"), encoding="utf-8").read()
    assert "'/contact'" in pel
    assert "#dispatch-email" not in pel

    # 3. Every static FAQPage schema question is rendered visibly in page/component JSX
    comp_dir = os.path.join(WEB_ROOT, "components")
    for root, dirs, files in os.walk(WEB_APP):
        rel = os.path.relpath(root, WEB_APP).replace("\\", "/")
        if "[" in rel:
            continue
        l_fp = os.path.join(root, "layout.tsx")
        p_fp = os.path.join(root, "page.tsx")
        l_txt = open(l_fp, encoding="utf-8").read() if os.path.exists(l_fp) else ""
        p_txt = open(p_fp, encoding="utf-8").read() if os.path.exists(p_fp) else ""
        all_src = l_txt + "\n" + p_txt
        if "FAQPage" not in all_src:
            continue
        q_names = re.findall(r'"@type"\s*:\s*"Question"\s*,\s*"name"\s*:\s*"([^"]+)"', all_src)
        if not q_names:
            continue
        visible_p = re.sub(r"<script[^>]*application/ld\+json[^>]*>.*?</script>", "", p_txt, flags=re.S)
        for m_imp in re.findall(r"from\s+['\"]@/components/([^'\"]+)['\"]", p_txt):
            cfp = os.path.join(comp_dir, m_imp if m_imp.endswith(".tsx") else m_imp + ".tsx")
            if os.path.exists(cfp):
                visible_p += "\n" + open(cfp, encoding="utf-8").read()
        for q in q_names:
            assert q[:32] in visible_p, f"FAQ question '{q}' missing from visible DOM in /{rel}"


def test_crm_auth_fail_closed_and_subcent_deposit_rounding():
    auth_src = open(os.path.join(CRM_ROOT, "backend", "auth.py"), encoding="utf-8").read()
    assert "RuntimeError" in auth_src
    assert 'not auth_header.startswith("Bearer ")' not in auth_src

    crm_main = open(os.path.join(CRM_ROOT, "backend", "main.py"), encoding="utf-8").read()
    assert "(808) 555-0100" not in crm_main
    assert "123 Main St" not in crm_main
    assert "deposit_amount - 0.01" in crm_main
    assert not os.path.exists(
        os.path.join(CRM_ROOT, "frontend", "src", "components", "CustomerList.backup.jsx")
    )


def test_content_seed_parity_and_shop_rebate_lock():
    api_seed = json.load(open(os.path.join(API_ROOT, "content_seed.json"), encoding="utf-8"))
    web_content = json.load(open(os.path.join(REPO_ROOT, "apps", "web", "lib", "content", "content.json"), encoding="utf-8"))
    assert api_seed == web_content, "apps/api/content_seed.json must match apps/web/lib/content/content.json 1:1"
    assert "rebate" in api_seed["shop"]["sections"]
    assert bool(api_seed["shop"].get("rebate"))
    assert "AJCQ12AXXWA" in json.dumps(api_seed["shop"]["rebate"])

