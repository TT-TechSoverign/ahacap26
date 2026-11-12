#!/usr/bin/env python3
"""
AHAC Sovereign Live SEO, Feed, Schema & DOM Forensic Crawler
============================================================
Audits all canonical URLs in /sitemap.xml plus /merchant-feed.xml,
/product-reviews-feed.xml, and /api/v1/products against Google Search
Essentials, Merchant Center, and Structured Data Guidelines.

Exits 0 (VERIFIED_CLEAN) when zero issues exist; exits 1 otherwise.
"""

import argparse
import concurrent.futures
import html as html_lib
import json
import re
import ssl
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

QUALIFYING_REBATE_IDS = {1, 2, 3, 4, 5, 6, 7, 15}


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def main() -> int:
    parser = argparse.ArgumentParser(description="Live SEO, XML Feed & Structured Data Forensic Crawler")
    parser.add_argument("--base-url", default="https://www.affordablehome-ac.com", help="Target storefront origin")
    args = parser.parse_args()
    base = args.base_url.rstrip("/")

    ctx = ssl.create_default_context()
    no_redir_opener = urllib.request.build_opener(NoRedirect, urllib.request.HTTPSHandler(context=ctx))

    def fetch(url: str, allow_redirect: bool = True, timeout: int = 20):
        req = urllib.request.Request(url, headers={"User-Agent": "AHAC-Sovereign-Audit/2.8.0"})
        if allow_redirect:
            with urllib.request.urlopen(req, context=ctx, timeout=timeout) as resp:
                return resp.status, dict(resp.headers), resp.read().decode("utf-8", errors="replace")
        with no_redir_opener.open(req, timeout=timeout) as resp:
            return resp.status, dict(resp.headers), resp.read().decode("utf-8", errors="replace")

    feed_issues = []

    # 1. Live API products + Merchant XML + Product Reviews XML + Sitemap XML
    _, _, api_raw = fetch(f"{base}/api/v1/products")
    api_products = {int(p["id"]): p for p in json.loads(api_raw)}
    in_stock_ids = sorted([pid for pid, p in api_products.items() if (p.get("stock") or 0) > 0])
    oos_ids = sorted([pid for pid, p in api_products.items() if (p.get("stock") or 0) <= 0])
    print(f"[API PRODUCTS] Total={len(api_products)}, InStock({len(in_stock_ids)})={in_stock_ids}, OOS({len(oos_ids)})={oos_ids}")

    _, _, merchant_xml = fetch(f"{base}/merchant-feed.xml")
    m_root = ET.fromstring(merchant_xml)
    ns_g = {"g": "http://base.google.com/ns/1.0"}
    feed_items = {}
    for item in m_root.findall(".//item"):
        gid = int(item.findtext("g:id", default="0", namespaces=ns_g))
        feed_items[gid] = {
            "availability": item.findtext("g:availability", default="", namespaces=ns_g),
            "price": item.findtext("g:price", default="", namespaces=ns_g),
            "sale_price": item.findtext("g:sale_price", default="", namespaces=ns_g),
            "link": item.findtext("link", default=""),
            "canonical_link": item.findtext("g:canonical_link", default="", namespaces=ns_g),
            "raw_xml": ET.tostring(item, encoding="unicode"),
        }
    print(f"[MERCHANT FEED] Items={len(feed_items)}")
    if len(feed_items) != 16:
        feed_issues.append(f"Expected 16 items in /merchant-feed.xml, got {len(feed_items)}")

    for pid, p in api_products.items():
        fi = feed_items.get(pid)
        if not fi:
            feed_issues.append(f"Missing ID {pid} in /merchant-feed.xml")
            continue
        exp_avail = "in_stock" if (p.get("stock") or 0) > 0 else "out_of_stock"
        norm_avail = fi["availability"].replace(" ", "_")
        if norm_avail != exp_avail:
            feed_issues.append(f"Availability mismatch ID {pid}: API stock={p.get('stock')} vs Feed={fi['availability']}")
        base_price = float(p.get("price") or 0)
        promo_price = p.get("promo_price")
        if promo_price and float(promo_price) < base_price:
            if f"{base_price:.2f} USD" != fi["price"] or f"{float(promo_price):.2f} USD" != fi["sale_price"]:
                feed_issues.append(f"Promo price mismatch ID {pid}: API={base_price}/{promo_price} vs Feed={fi['price']}/{fi['sale_price']}")
        else:
            if f"{base_price:.2f} USD" != fi["price"]:
                feed_issues.append(f"Price mismatch ID {pid}: API={base_price} vs Feed={fi['price']}")
        if pid not in QUALIFYING_REBATE_IDS and "$45" in fi["raw_xml"]:
            feed_issues.append(f"Non-qualifying ID {pid} falsely claims $45 rebate in /merchant-feed.xml")

    _, _, rev_xml = fetch(f"{base}/product-reviews-feed.xml")
    r_root = ET.fromstring(rev_xml)
    rev_nodes = r_root.findall(".//review")
    print(f"[REVIEWS FEED] Total <review> nodes={len(rev_nodes)}")
    if len(rev_nodes) < 140:
        feed_issues.append(f"Expected >= 140 reviews in /product-reviews-feed.xml, got {len(rev_nodes)}")

    _, _, sm_xml = fetch(f"{base}/sitemap.xml")
    sm_root = ET.fromstring(sm_xml)
    ns_sm = {
        "sm": "http://www.sitemaps.org/schemas/sitemap/0.9",
        "image": "http://www.google.com/schemas/sitemap-image/1.1",
    }
    sitemap_urls = []
    sitemap_no_images = []
    for u_el in sm_root.findall("sm:url", ns_sm):
        loc = u_el.findtext("sm:loc", default="", namespaces=ns_sm)
        imgs = u_el.findall("image:image", ns_sm)
        sitemap_urls.append(loc)
        if not imgs:
            sitemap_no_images.append(loc)

    canonical_set = set(sitemap_urls)
    print(f"[SITEMAP.XML] URLs={len(sitemap_urls)}, Unique={len(canonical_set)}, Missing <image:image>={len(sitemap_no_images)}")
    if len(sitemap_urls) != len(canonical_set):
        feed_issues.append(f"Duplicate URLs in /sitemap.xml: {len(sitemap_urls)} vs {len(canonical_set)}")
    if sitemap_no_images:
        feed_issues.append(f"{len(sitemap_no_images)} sitemap URLs missing <image:image>: {sitemap_no_images[:3]}")

    # 2. Crawl all canonical URLs concurrently with NoRedirect
    def audit_url(url: str):
        issues = []
        path = urllib.parse.urlparse(url).path or "/"
        try:
            status, _, body = fetch(url, allow_redirect=False)
        except urllib.error.HTTPError as e:
            return {"url": url, "path": path, "issues": [f"HTTP {e.code} Location={e.headers.get('Location')}"], "anchors": set(), "links": [], "images": set()}
        except Exception as e:
            return {"url": url, "path": path, "issues": [f"EXC {e}"], "anchors": set(), "links": [], "images": set()}

        if status != 200:
            issues.append(f"Non-200 status: {status}")

        can_m = re.search(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"', body) or re.search(r'<link[^>]+href="([^"]+)"[^>]+rel="canonical"', body)
        can_href = can_m.group(1) if can_m else ""
        if can_href != url:
            issues.append(f"Canonical mismatch: expected {url}, got {can_href}")

        title_m = re.search(r"<title>(.*?)</title>", body, re.S)
        title = html_lib.unescape(title_m.group(1).strip()) if title_m else ""
        if not title:
            issues.append("Missing <title>")
        elif len(title) > 78:
            issues.append(f"Long <title> ({len(title)} chars): {title}")
        elif "Affordable Home A/C | Affordable Home A/C" in title:
            issues.append(f"Double brand suffix in <title>: {title}")

        def get_meta(attr: str, name: str) -> str:
            m = re.search(rf'<meta[^>]+{attr}="{re.escape(name)}"[^>]+content="([^"]*)"', body) or re.search(rf'<meta[^>]+content="([^"]*)"[^>]+{attr}="{re.escape(name)}"', body)
            return html_lib.unescape(m.group(1).strip()) if m else ""

        desc = get_meta("name", "description")
        og_title = get_meta("property", "og:title")
        tw_title = get_meta("name", "twitter:title")
        og_desc = get_meta("property", "og:description")
        tw_desc = get_meta("name", "twitter:description")
        og_img = get_meta("property", "og:image")

        if not desc:
            issues.append("Missing meta description")
        elif len(desc) < 120 or len(desc) > 164:
            issues.append(f"Out-of-range meta description ({len(desc)} chars): {desc}")

        if og_title and og_title != title:
            issues.append(f"og:title != <title>: '{og_title}' vs '{title}'")
        if tw_title and tw_title != title:
            issues.append(f"twitter:title != <title>: '{tw_title}' vs '{title}'")
        if og_desc and og_desc != desc:
            issues.append("og:description != description")
        if tw_desc and tw_desc != desc:
            issues.append("twitter:description != description")
        if not og_img or "logo-new.png" in og_img:
            issues.append(f"Weak/missing og:image: {og_img}")

        h1s = re.findall(r"<h1\b[^>]*>(.*?)</h1>", body, re.S)
        if len(h1s) != 1:
            issues.append(f"H1 count={len(h1s)}")
        if "<main" not in body:
            issues.append("Missing <main> landmark")
        if "<table" not in body:
            issues.append("Missing semantic <table>")
        if "mailto:" in body.lower():
            issues.append("Raw mailto: found in SSR HTML")

        scripts = re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', body, re.S)
        if not scripts:
            issues.append("Zero JSON-LD blocks")

        all_nodes = []

        def collect_nodes(obj):
            if isinstance(obj, dict):
                all_nodes.append(obj)
                for v in obj.values():
                    collect_nodes(v)
            elif isinstance(obj, list):
                for it in obj:
                    collect_nodes(it)

        for idx, s in enumerate(scripts):
            try:
                collect_nodes(json.loads(s))
            except Exception as e:
                issues.append(f"Invalid JSON-LD block #{idx}: {e}")

        def has_type(node, t: str) -> bool:
            nt = node.get("@type")
            return nt == t or (isinstance(nt, list) and t in nt)

        prod_nodes = [n for n in all_nodes if has_type(n, "Product")]
        agg_nodes = [n for n in all_nodes if has_type(n, "AggregateRating")]
        faq_nodes = [n for n in all_nodes if has_type(n, "FAQPage")]
        bc_nodes = [n for n in all_nodes if has_type(n, "BreadcrumbList")]
        itemlist_nodes = [n for n in all_nodes if has_type(n, "ItemList")]

        pdp_pid = next((pid for pid, fi in feed_items.items() if urllib.parse.urlparse(fi["canonical_link"] or fi["link"]).path == path), None)
        if pdp_pid is not None:
            if len(prod_nodes) != 1:
                issues.append(f"PDP Product node count={len(prod_nodes)}")
            else:
                matched_p = api_products[pdp_pid]
                offers = prod_nodes[0].get("offers", {})
                if isinstance(offers, list):
                    offers = offers[0] if offers else {}
                s_avail = offers.get("availability", "")
                exp_schema_avail = "https://schema.org/InStock" if (matched_p.get("stock") or 0) > 0 else "https://schema.org/OutOfStock"
                if s_avail != exp_schema_avail:
                    issues.append(f"PDP Schema availability mismatch: live stock={matched_p.get('stock')} but schema={s_avail}")
                active_price = matched_p.get("promo_price") if matched_p.get("promo_price") else matched_p.get("price")
                if float(offers.get("price", 0)) != float(active_price):
                    issues.append(f"PDP Schema price mismatch: live={active_price} vs schema={offers.get('price')}")
        else:
            if len(prod_nodes) != 0:
                issues.append(f"Non-PDP has {len(prod_nodes)} Product schema nodes")

        if len(agg_nodes) != 1:
            issues.append(f"AggregateRating count={len(agg_nodes)}")
        if len(faq_nodes) != 1:
            issues.append(f"FAQPage count={len(faq_nodes)}")
        if path != "/" and len(bc_nodes) != 1:
            issues.append(f"BreadcrumbList count={len(bc_nodes)}")

        for bc in bc_nodes:
            for li in bc.get("itemListElement", []):
                it_url = li.get("item") if isinstance(li.get("item"), str) else (li.get("item", {}) or {}).get("@id", "")
                if it_url and it_url not in canonical_set:
                    issues.append(f"Non-canonical Breadcrumb item URL: {it_url}")

        for il in itemlist_nodes:
            for li in il.get("itemListElement", []):
                u = li.get("url") or (li.get("item", {}) if isinstance(li.get("item"), dict) else {}).get("url")
                if u and u not in canonical_set:
                    issues.append(f"Non-canonical ItemList URL: {u}")

        no_scripts = re.sub(r"<(script|style)\b[^>]*>.*?</\1>", " ", body, flags=re.S | re.I)
        no_comments = re.sub(r"<!--.*?-->", "", no_scripts, flags=re.S)
        plain_text = html_lib.unescape(re.sub(r"<[^>]+>", " ", no_comments))
        plain_norm = re.sub(r"\s+", " ", plain_text)
        for fn in faq_nodes:
            for q_obj in fn.get("mainEntity", []):
                q_name = re.sub(r"\s+", " ", html_lib.unescape(q_obj.get("name", "")).strip())
                if q_name and q_name[:45] not in plain_norm:
                    issues.append(f"FAQ question not visible in SSR HTML: '{q_name[:60]}'")

        dom_ids = set(re.findall(r'\bid="([^"]+)"', body))
        hrefs = re.findall(r'<a\b[^>]+href="([^"]+)"', body)
        imgs = set()
        if og_img:
            imgs.add(og_img)
        for n in all_nodes:
            im = n.get("image")
            if isinstance(im, str) and im.startswith("http"):
                imgs.add(im)
            elif isinstance(im, list):
                for x in im:
                    if isinstance(x, str) and x.startswith("http"):
                        imgs.add(x)
                    elif isinstance(x, dict) and isinstance(x.get("url"), str):
                        imgs.add(x["url"])

        return {"url": url, "path": path, "issues": issues, "anchors": dom_ids, "links": hrefs, "images": imgs}

    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as ex:
        results = list(ex.map(audit_url, sitemap_urls))

    by_path = {r["path"]: r for r in results}
    total_page_issues = sum(len(r["issues"]) for r in results)

    print(f"\n=== PER-PAGE AUDIT FINDINGS ACROSS {len(sitemap_urls)} LIVE URLS ===")
    for r in sorted(results, key=lambda x: x["path"]):
        if r["issues"]:
            print(f"  {r['path']}:")
            for iss in r["issues"]:
                print(f"    - {iss}")
    if total_page_issues == 0:
        print("  ZERO per-page schema/meta/DOM issues!")

    bad_links = {}
    bad_anchors = {}
    all_schema_imgs = set()
    for r in results:
        all_schema_imgs.update(r["images"])
        for h in r["links"]:
            if h.startswith(("mailto:", "tel:", "sms:", "javascript:")):
                continue
            if h.startswith("http") and not h.startswith(base):
                continue
            parsed = urllib.parse.urlparse(h)
            target_path = parsed.path or r["path"]
            frag = parsed.fragment
            query = parsed.query
            if target_path.startswith("/assets/") or target_path in ("/checkout", "/merchant-feed.xml", "/product-reviews-feed.xml", "/llms.txt", "/sitemap.xml"):
                continue
            full_can = f"{base}{target_path}" if target_path != "/" else base
            if full_can not in canonical_set:
                bad_links.setdefault((target_path, query), set()).add(r["path"])
            elif frag:
                target_r = by_path.get(target_path)
                if target_r and frag not in target_r["anchors"]:
                    bad_anchors.setdefault(f"{target_path}#{frag}", set()).add(r["path"])
            if query and target_path == "/shop":
                bad_links.setdefault((target_path, f"?{query}"), set()).add(r["path"])

    print("\n=== INTERNAL NON-CANONICAL / REDIRECTING / ?SHOP LINKS ===")
    if not bad_links:
        print("  ZERO non-canonical internal links!")
    else:
        for (tp, q), srcs in sorted(bad_links.items()):
            print(f"  Link '{tp}{('?' + q) if q else ''}' found on {len(srcs)} pages (e.g. {sorted(srcs)[:4]})")

    print(f"\n=== BROKEN #ANCHOR TARGETS ACROSS {len(sitemap_urls)} PAGES ===")
    if not bad_anchors:
        print("  ZERO broken #anchor targets!")
    else:
        for anc, srcs in sorted(bad_anchors.items()):
            print(f"  Missing anchor '{anc}' linked from {len(srcs)} pages (e.g. {sorted(srcs)[:4]})")

    def check_img(u: str):
        req = urllib.request.Request(u, method="HEAD", headers={"User-Agent": "AHAC-Sovereign-Audit/2.8.0"})
        try:
            with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
                return u, resp.status
        except Exception as e:
            return u, str(e)

    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as ex:
        bad_imgs = [(u, st) for u, st in ex.map(check_img, sorted(all_schema_imgs)) if st != 200]

    print(f"\n=== SCHEMA & OG IMAGE HEAD CHECK ({len(all_schema_imgs)} unique URLs) ===")
    if not bad_imgs:
        print("  100% 200 OK!")
    else:
        for u, st in bad_imgs:
            print(f"  [BAD IMG] {u} -> {st}")

    if feed_issues:
        print("\n=== FEED ISSUES ===")
        for fi_msg in feed_issues:
            print(f"  - {fi_msg}")

    any_failure = bool(feed_issues or total_page_issues or bad_links or bad_anchors or bad_imgs)
    print("\n==================================================================")
    if any_failure:
        print("  [FAILED] Live SEO/Feed/Schema Audit detected issues above.")
        print("==================================================================")
        return 1
    print(f"  [VERIFIED_CLEAN] {len(sitemap_urls)} URLs, 16 Merchant SKUs, {len(rev_nodes)} Reviews & {len(all_schema_imgs)} Images 100% Clean!")
    print("==================================================================")
    return 0


if __name__ == "__main__":
    sys.exit(main())
