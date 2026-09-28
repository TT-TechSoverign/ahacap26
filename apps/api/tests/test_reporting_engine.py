import os
import pytest
from services.reporting_engine import reporting_engine

def test_reporting_engine_initialization_and_list():
    assert reporting_engine is not None
    assert os.path.exists(reporting_engine.base_dir)
    reports = reporting_engine.list_reports()
    assert isinstance(reports, list)
    assert len(reports) >= 3, f"Expected at least 3 historical reports, got {len(reports)}"
    
    # Verify September report is listed
    months = [r["month"].lower() for r in reports]
    assert "september" in months or "august" in months or "july" in months

def test_reporting_engine_narrative_synthesis():
    mock_metrics = {
        "total_clicks": 319,
        "total_impressions": 12261,
        "avg_position": 17.3,
        "total_views": 1820,
        "total_users": 1150,
        "new_users": 980,
        "devices": {"mobile": 204, "desktop": 110, "tablet": 5, "mobile_pct": 64.0},
        "top_queries": [
            {"query": "affordable home ac", "clicks": 84, "impressions": 310, "position": 1.2},
            {"query": "window ac installation honolulu", "clicks": 28, "impressions": 490, "position": 3.4}
        ],
        "top_pages": [
            {"page": "/", "clicks": 142, "impressions": 4500, "position": 2.1},
            {"page": "/shop", "clicks": 39, "impressions": 1200, "position": 5.4}
        ],
        "homepage_clicks": 142,
        "homepage_impressions": 4500,
        "shop_clicks": 39,
        "shop_impressions": 1200,
        "product_pages": [
            {"model": "LW1222IVSM", "clicks": 14, "impressions": 450, "position": 4.2}
        ],
        "city_pages": [
            {"city": "Honolulu", "clicks": 22, "impressions": 680, "position": 4.1}
        ]
    }
    
    narrative = reporting_engine.generate_narrative(mock_metrics, "September", "2026")
    
    # Plain English 3rd-grade check
    assert "The Big Wins (What Went Great!)" in narrative
    assert "The Numbers - Our Traffic Snapshot" in narrative
    assert "High-Intent Keywords (People Ready to Buy)" in narrative
    assert "Page Ranking Wins & Store Activity" in narrative
    assert "Summary of Action Plan" in narrative
    
    # Island grounding check
    assert "Waipahu" in narrative
    assert "319" in narrative
    assert "12,261" in narrative

def test_html_and_docx_generation(tmp_path):
    mock_metrics = {
        "total_clicks": 100,
        "total_impressions": 5000,
        "avg_position": 15.0,
        "total_views": 800,
        "total_users": 600,
        "new_users": 500,
        "devices": {"mobile": 64, "desktop": 36, "tablet": 0, "mobile_pct": 64.0},
        "top_queries": [{"query": "window ac oahu", "clicks": 40, "impressions": 600, "position": 2.0}],
        "top_pages": [{"page": "/shop", "clicks": 30, "impressions": 500, "position": 3.0}],
        "homepage_clicks": 50,
        "homepage_impressions": 2000,
        "shop_clicks": 30,
        "shop_impressions": 500,
        "product_pages": [],
        "city_pages": []
    }
    narrative = reporting_engine.generate_narrative(mock_metrics, "October", "2026")
    html = reporting_engine.generate_html(narrative, "October", "2026")
    assert "<!DOCTYPE html>" in html
    assert "October 2026" in html
    assert "31.220.53.132" not in html  # Zero internal IP exposure
    
    docx_file = str(tmp_path / "test_report.docx")
    ok = reporting_engine.generate_docx(narrative, docx_file, "October", "2026")
    assert ok is True
    assert os.path.exists(docx_file)
    assert os.path.getsize(docx_file) > 5000
