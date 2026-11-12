import asyncio
import json
import os
import subprocess
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import AsyncMock, MagicMock, patch

from routers.dev_os import (
    BrainSyncRequest,
    MASTER_BRAIN_STATE,
    run_agent_catalog_auditor,
    sync_brain_state,
)
from routers.dev_os_sops import AGENT_SOPS

REPO_ROOT = Path(__file__).resolve().parents[3]
API_ROOT = REPO_ROOT / "apps" / "api"
DEV_OS_APP = REPO_ROOT / "apps" / "dev-os" / "app"
CRM_BACKEND = REPO_ROOT / "ahac-crm" / "backend"


def test_master_brain_v2_8_0_and_60_synapses():
    assert MASTER_BRAIN_STATE["brain_version"] == "2.8.0-SOVEREIGN"
    synapse_ids = {s["id"] for s in MASTER_BRAIN_STATE["synapses"]}
    assert len(synapse_ids) == 60
    assert "syn_live_seo_feed_crawler" in synapse_ids
    assert "syn_workspace_skills_hub" in synapse_ids

    dev_os_src = (API_ROOT / "routers" / "dev_os.py").read_text(encoding="utf-8")
    assert "import aiohttp" in dev_os_src
    assert "def _utcnow_naive()" in dev_os_src
    assert dev_os_src.count('"v2.8.0-EPOCH-21"') >= 40
    assert dev_os_src.count('"2.8.0-NOV12-OMNISCIENT-SWARM"') >= 40


def test_50_sop_1_to_1_parity_and_zero_raw_private_emails():
    sops_ts_path = DEV_OS_APP / "sopsData.ts"
    sops_ts_raw = sops_ts_path.read_text(encoding="utf-8")

    marker = "export const SOVEREIGN_SOPS: Record<string, SopDossier> = "
    assert marker in sops_ts_raw
    json_part = sops_ts_raw.split(marker, 1)[1].strip()
    if json_part.endswith(";"):
        json_part = json_part[:-1]

    frontend_sops = json.loads(json_part)
    assert len(frontend_sops) == 50
    assert frontend_sops == AGENT_SOPS, "sopsData.ts must match dev_os_sops.py 1:1 across all 50 SOPs"

    sops_py_raw = (API_ROOT / "routers" / "dev_os_sops.py").read_text(encoding="utf-8")
    ceo_addr = "brian@" + "affordablehome-ac.com"
    dev_addr = "irasmussenjobs@" + "gmail.com"
    assert ceo_addr not in sops_py_raw
    assert dev_addr not in sops_py_raw
    assert ceo_addr not in sops_ts_raw
    assert dev_addr not in sops_ts_raw


def test_5_workspace_skills_and_zero_truncation_governance_rules():
    expected_skills = [
        "ahac-sovereign-swarm",
        "ahac-cybersecurity-and-email-shield",
        "ahac-google-seo-merchant-and-cro",
        "ahac-monthly-executive-billing-and-seo",
        "ahac-brand-creative-and-storyboard-studio",
    ]
    skills_root = REPO_ROOT / ".agents" / "skills"
    for skill_name in expected_skills:
        skill_md = skills_root / skill_name / "SKILL.md"
        assert skill_md.exists(), f"Missing workspace skill: {skill_md}"
        txt = skill_md.read_text(encoding="utf-8")
        assert txt.startswith("---"), f"Invalid YAML frontmatter in {skill_md}"
        assert f"name: {skill_name}" in txt
        assert "description:" in txt

    gemini_path = REPO_ROOT / "GEMINI.md"
    agents_path = REPO_ROOT / "AGENTS.md"
    gemini_bytes = gemini_path.read_bytes()
    agents_bytes = agents_path.read_bytes()

    # Antigravity rule cap is 23,724 bytes; keep well under 23,500 bytes so 0 bytes ever truncate
    assert len(gemini_bytes) < 23500, f"GEMINI.md too large ({len(gemini_bytes)} bytes)"
    assert len(agents_bytes) < 23500, f"AGENTS.md too large ({len(agents_bytes)} bytes)"

    gemini_txt = gemini_bytes.decode("utf-8")
    agents_txt = agents_bytes.decode("utf-8")
    assert "TRACKER" in gemini_txt
    assert "2.8.0-SOVEREIGN" in gemini_txt
    assert "2.8.0-SOVEREIGN" in agents_txt
    for skill_name in expected_skills:
        assert skill_name in gemini_txt
        assert skill_name in agents_txt


def test_zero_deprecated_datetime_utcnow_in_production_backends():
    skip_dirs = {".venv", "venv", "__pycache__", "node_modules", "tests"}
    utcnow_token = "datetime." + "utcnow"

    for root_dir in (API_ROOT, CRM_BACKEND):
        for root, dirs, files in os.walk(root_dir):
            dirs[:] = [d for d in dirs if d not in skip_dirs]
            for fn in files:
                if fn.endswith(".py"):
                    fp = Path(root) / fn
                    src = fp.read_text(encoding="utf-8")
                    assert utcnow_token not in src, f"Deprecated {utcnow_token} found in {fp}"


def test_gitignore_tracks_audit_scripts_while_protecting_secrets():
    for tracked_script in ("scripts/live-seo-feed-audit.py", "scripts/verify-service-grounding.ps1"):
        assert (REPO_ROOT / tracked_script).exists(), f"Missing {tracked_script}"
        res = subprocess.run(
            ["git", "check-ignore", "-q", tracked_script],
            cwd=str(REPO_ROOT),
            check=False,
        )
        assert res.returncode == 1, f"{tracked_script} must NOT be gitignored"

    for ignored_path in (".env", "_private_portfolio/probe.txt", "_analytics_data/probe.csv"):
        res = subprocess.run(
            ["git", "check-ignore", "-q", ignored_path],
            cwd=str(REPO_ROOT),
            check=False,
        )
        assert res.returncode == 0, f"{ignored_path} MUST be gitignored"


def test_catalog_auditor_promo_logic_and_brain_sync_ui_compat():
    def _make_db(promo_override_4=695.0):
        rows = [
            (
                idx,
                745.0 if idx == 4 else (395.0 if idx == 11 else (1200.0 if idx == 15 else 650.0)),
                5 if idx <= 12 else 0,
                promo_override_4 if idx == 4 else None,
                6 if (idx == 4 and promo_override_4 is not None and promo_override_4 < 745.0) else 0,
            )
            for idx in range(1, 17)
        ]
        exec_res = MagicMock()
        exec_res.fetchall.return_value = rows
        db = MagicMock()
        db.execute = AsyncMock(return_value=exec_res)
        db.commit = AsyncMock()
        return db

    res_valid = asyncio.run(run_agent_catalog_auditor(_make_db(695.0)))
    assert res_valid["zero_promo_drift"] is True
    assert res_valid["status"] == "CATALOG_AUDITED"

    res_invalid = asyncio.run(run_agent_catalog_auditor(_make_db(745.0)))
    assert res_invalid["zero_promo_drift"] is False
    assert res_invalid["status"] == "DRIFT_FLAGGED"

    # Verify LiveSwarmVisualizer {directive, source} payload compatibility
    orig_directives = list(MASTER_BRAIN_STATE["active_directives"])
    orig_thoughts = list(MASTER_BRAIN_STATE["recent_thoughts"])
    try:
        fake_req = SimpleNamespace(headers={}, client=SimpleNamespace(host="127.0.0.1"))
        fake_db = MagicMock()
        fake_db.execute = AsyncMock()
        fake_db.commit = AsyncMock()
        sync_res = asyncio.run(
            sync_brain_state(
                BrainSyncRequest(directive="Pass 19 UI Compatibility Probe", source="dev_os_swarm_hud"),
                fake_req,
                fake_db,
            )
        )
        assert sync_res["status"] == "synchronized"
        assert "Pass 19 UI Compatibility Probe" in MASTER_BRAIN_STATE["active_directives"]
    finally:
        MASTER_BRAIN_STATE["active_directives"] = orig_directives
        MASTER_BRAIN_STATE["recent_thoughts"] = orig_thoughts
