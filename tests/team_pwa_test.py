import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_single_role_aware_pwa():
    page = (ROOT / "dz-app.html").read_text(encoding="utf-8")
    manifest = json.loads((ROOT / "dz-auto-trade.webmanifest").read_text(encoding="utf-8"))
    assert manifest["name"] == "DZ Auto Trade"
    assert manifest["start_url"] == "/dz-app.html"
    assert manifest["icons"] == [{"src": "/assets/Logodzautotrade.si.png", "sizes": "1254x1254", "type": "image/png", "purpose": "any"}]
    assert 'href="/dz-auto-trade.webmanifest"' in page
    assert "data-mode=" not in page
    assert 'href="/trgovina.html"' in page
    assert 'href="/api/team/login"' in page
    assert 'id="team-workspace" class="hidden"' in page
    assert not (ROOT / "dz-admin.html").exists()
    assert not (ROOT / "dz-izvajalec.html").exists()


def test_private_data_is_not_cached():
    worker = (ROOT / "team-sw.js").read_text(encoding="utf-8")
    assert "u.pathname.startsWith('/api/')" in worker
    assert "dz-app.html" not in worker
    assert "'/team.css','/team-app.js'" in worker


def test_public_entry_does_not_eagerly_request_team_data():
    script = (ROOT / "team-app.js").read_text(encoding="utf-8")
    assert "if (location.hash === '#ekipa') loadTeamWorkspace();" in script
    assert "if ('serviceWorker' in navigator)" in script
