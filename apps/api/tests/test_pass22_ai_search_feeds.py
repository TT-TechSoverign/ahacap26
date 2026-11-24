import asyncio
import subprocess
from pathlib import Path

from routers.dev_os import MASTER_BRAIN_STATE, run_agent_merchant_feed_sentinel

REPO_ROOT = Path(__file__).resolve().parents[3]
WEB_ROOT = REPO_ROOT / "apps" / "web"
WEB_APP = WEB_ROOT / "app"


def test_openai_agentic_feed_and_llms_full_endpoints_exist_and_rewritten():
    openai_route = WEB_APP / "api" / "openai-feed" / "route.ts"
    llms_full_route = WEB_APP / "llms-full.txt" / "route.ts"
    llms_index_route = WEB_APP / "llms.txt" / "route.ts"

    assert openai_route.exists(), "Missing /api/openai-feed/route.ts"
    assert llms_full_route.exists(), "Missing /llms-full.txt/route.ts"
    assert llms_index_route.exists(), "Missing /llms.txt/route.ts"

    ign = subprocess.run(
        ["git", "check-ignore", "-q", "apps/web/app/llms-full.txt/route.ts"],
        cwd=str(REPO_ROOT),
        check=False,
    )
    assert ign.returncode == 1, "apps/web/app/llms-full.txt/route.ts must NOT be gitignored"

    openai_src = openai_route.read_text(encoding="utf-8")
    for req_field in (
        "item_id:",
        "title:",
        "description:",
        "url:",
        "brand,",
        "seller_name:",
        "image_url:",
        "availability,",
        "price:",
        "inventory_quantity:",
        "QUALIFYING_REBATE_IDS = new Set<number>([1, 2, 3, 4, 5, 6, 7, 15])",
        "application/x-ndjson",
    ):
        assert req_field in openai_src, f"Missing '{req_field}' in openai-feed/route.ts"

    next_cfg = (WEB_ROOT / "next.config.js").read_text(encoding="utf-8")
    assert "'/openai-product-feed.json'" in next_cfg
    assert "'/openai-product-feed.jsonl'" in next_cfg
    assert "'/ai-catalog.json'" in next_cfg

    llms_txt = llms_index_route.read_text(encoding="utf-8")
    assert "/llms-full.txt" in llms_txt
    assert "/openai-product-feed.json" in llms_txt
    assert "/shop/in-stock-lg-window-ac-oahu" in llms_txt
    assert "/shop/lg-vs-ge-window-ac-hawaii" in llms_txt


def test_robots_allowlist_and_head_discovery_for_2026_ai_crawlers():
    robots_src = (WEB_APP / "robots.ts").read_text(encoding="utf-8")
    for bot in (
        "Google-Extended",
        "OAI-SearchBot",
        "ChatGPT-User",
        "PerplexityBot",
        "Perplexity-User",
        "ClaudeBot",
        "Claude-SearchBot",
        "Claude-User",
        "Applebot-Extended",
        "bingbot",
        "DuckAssistBot",
    ):
        assert f"'{bot}'" in robots_src, f"Missing AI crawler '{bot}' in robots.ts"

    for feed_path in ("'/llms-full.txt'", "'/openai-product-feed.json'", "'/openai-product-feed.jsonl'"):
        assert feed_path in robots_src, f"Missing {feed_path} in robots.ts allowlist"

    layout_src = (WEB_APP / "layout.tsx").read_text(encoding="utf-8")
    assert 'href="/llms-full.txt"' in layout_src
    assert 'href="/openai-product-feed.json"' in layout_src


def test_pdp_schema_inventory_level_and_ai_attribution_telemetry():
    pdp_layout = (WEB_APP / "shop" / "[slug]" / "layout.tsx").read_text(encoding="utf-8")
    assert '"inventoryLevel"' in pdp_layout
    assert '"latitude": 21.3868' in pdp_layout
    assert '"On-Island Oahu Availability"' in pdp_layout

    tracking_src = (WEB_ROOT / "lib" / "tracking.ts").read_text(encoding="utf-8")
    assert "detectAndPersistAiSearchSource" in tracking_src
    assert "ai_discovery_source" in tracking_src

    mf_res = asyncio.run(run_agent_merchant_feed_sentinel())
    assert mf_res["status"] == "MERCHANT_FEED_VERIFIED"
    assert "/openai-product-feed.json" in mf_res["feed_endpoints"]
    assert "/llms-full.txt" in mf_res["feed_endpoints"]
    assert len(MASTER_BRAIN_STATE["synapses"]) == 62
