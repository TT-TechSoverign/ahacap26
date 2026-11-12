import json
import os
import re

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
WEB_ROOT = os.path.join(REPO_ROOT, "apps", "web")
WEB_APP = os.path.join(WEB_ROOT, "app")

PASS17_NEW_ROUTES = [
    "/shop/10000-12000-btu-window-ac-oahu",
    "/shop/lg-cool-and-heat-window-ac-hawaii",
    "/shop/lg-standard-budget-window-ac-oahu",
    "/shop/26-inch-wall-sleeve-ac-dimensions-rab26a-oahu",
    "/window-ac-installation-cost-oahu",
    "/window-ac-electricity-cost-heco-calculator-hawaii",
    "/portable-ac-vs-window-ac-hawaii",
    "/230v-window-ac-outlet-nema-6-15-6-20-oahu",
    "/window-ac-cleaning-vs-repair-cost-oahu",
    "/property-manager-landlord-window-ac-oahu",
    "/window-ac-diagnostic-assessment-oahu",
]


def test_robots_ts_allows_googlebot_to_crawl_noindex_query_consolidations():
    robots_path = os.path.join(WEB_APP, "robots.ts")
    with open(robots_path, encoding="utf-8") as f:
        robots_txt = f.read()

    # Private & RSC endpoints must stay disallowed
    for must_disallow in ("'/admin'", "'/dev-os'", "'/checkout'", "'/*?*_rsc=*'", "'/api/v1/'"):
        assert must_disallow in robots_txt, f"Expected {must_disallow} in robots.ts"

    # User-facing query params handled by middleware X-Robots-Tag: noindex, follow must NOT be blocked in robots.txt
    for forbidden_disallow in (
        "/*?*capacity=*",
        "/*?*category=*",
        "/*?*voltage=*",
        "/*?*mount=*",
        "/*?*sort=*",
        "/*?*q=*",
        "/contact?*",
        "/*?*service=*",
    ):
        assert forbidden_disallow not in robots_txt, (
            f"Google protocol violation: {forbidden_disallow} in robots.ts prevents Googlebot from seeing noindex, follow"
        )


def test_retired_flat_rate_diagnostic_slug_301_redirects_and_directory_purged():
    assert not os.path.exists(os.path.join(WEB_APP, "ac-diagnostic-service-175-flat-rate")), (
        "Legacy /ac-diagnostic-service-175-flat-rate directory should be deleted"
    )
    assert os.path.exists(os.path.join(WEB_APP, "window-ac-diagnostic-assessment-oahu", "page.tsx"))

    with open(os.path.join(WEB_ROOT, "middleware.ts"), encoding="utf-8") as f:
        mw = f.read()
    with open(os.path.join(WEB_ROOT, "next.config.js"), encoding="utf-8") as f:
        nc = f.read()

    assert "'/ac-diagnostic-service-175-flat-rate': '/window-ac-diagnostic-assessment-oahu'" in mw
    assert "'/ac-diagnostic-service-175-flat-rate'" in nc
    assert "'/window-ac-diagnostic-assessment-oahu'" in nc


def test_sitemap_118_canonical_routes_exist_on_disk_and_have_viewport_armor():
    with open(os.path.join(WEB_ROOT, "lib", "content", "content.json"), encoding="utf-8") as f:
        content = json.load(f)

    cities = []
    for reg in content.get("landing_legacy", {}).get("service_areas", {}).get("regions", []):
        for c in reg.get("cities", []):
            cities.append("/service-areas/" + c["name"].lower().replace(" ", "-"))
    assert len(cities) == 22

    with open(os.path.join(WEB_APP, "sitemap.ts"), encoding="utf-8") as f:
        st = f.read()

    m = re.search(r"const highYieldRoutes = \[(.*?)\];", st, re.S)
    assert m is not None
    hy = [
        line.strip().rstrip(",").strip("'\"")
        for line in m.group(1).splitlines()
        if line.strip() and not line.strip().startswith("//")
    ]
    assert len(hy) == 74, f"Expected 74 highYieldRoutes, got {len(hy)}"

    static_and_city = ["", "/shop", "/contact", "/sizing", "/service-areas", "/sitemap"] + hy + cities
    assert len(static_and_city) == 102
    assert len(set(static_and_city)) == 102, "Duplicate route in sitemap.ts!"
    # 102 static/city + 16 dynamic product PDPs = 118 canonical routes
    assert len(static_and_city) + 16 == 118

    for new_route in PASS17_NEW_ROUTES:
        assert new_route in hy, f"Missing {new_route} in sitemap.ts"
        rel_dir = new_route.lstrip("/").replace("/", os.sep)
        page_file = os.path.join(WEB_APP, rel_dir, "page.tsx")
        layout_file = os.path.join(WEB_APP, rel_dir, "layout.tsx")
        assert os.path.exists(page_file), f"Missing {page_file}"
        assert os.path.exists(layout_file), f"Missing {layout_file}"

        with open(page_file, encoding="utf-8") as pf:
            ptxt = pf.read()
        assert "md:pt-[180px]" in ptxt, f"Missing 3-row NavbarV2 desktop clearance in {page_file}"
        assert "mailto:" not in ptxt, f"Raw mailto: forbidden in {page_file}"

        with open(layout_file, encoding="utf-8") as lf:
            ltxt = lf.read()
        assert ltxt.count('"@type": "AggregateRating"') + ltxt.count('"@type":"AggregateRating"') <= 1, (
            f"Duplicate AggregateRating in {layout_file}"
        )


def test_zero_non_pdp_product_jsonld_clones_and_zero_internal_shop_query_links():
    for root, dirs, files in os.walk(WEB_ROOT):
        dirs[:] = [d for d in dirs if d not in ("node_modules", ".next")]
        for fn in files:
            if not fn.endswith((".ts", ".tsx")):
                continue
            full_path = os.path.join(root, fn)
            rel = os.path.relpath(full_path, WEB_ROOT).replace("\\", "/")
            with open(full_path, encoding="utf-8") as f:
                txt = f.read()

            # Product JSON-LD must exist ONLY on canonical PDPs (app/shop/[slug]/*)
            if not rel.startswith("app/shop/[slug]/"):
                assert not re.search(r'"@type"\s*:\s*"Product"', txt), (
                    f"Non-PDP @type: Product JSON-LD cannibalization detected in {rel}"
                )

            # Internal <Link> / <a> navigation must point to canonical hubs, not noindex /shop?capacity= or /shop?category=
            for bad_query in ("/shop?capacity=", "/shop?category="):
                assert bad_query not in txt, f"Internal noindex query link {bad_query} found in {rel}"
