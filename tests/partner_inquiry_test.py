from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PRIVATE_PATHS = ("/dz-app.html", "/admin-panel.html", "/android-app.html")


def test_partner_inquiry_form_is_removed_from_the_public_site():
    assert not (ROOT / "partnersko-povprasevanje.html").exists()
    assert "partnersko-povprasevanje.html" not in (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    assert "partner:" not in (ROOT / "formspree-config.js").read_text(encoding="utf-8")

    for page in ROOT.rglob("*.html"):
        assert "partnersko-povprasevanje.html" not in page.read_text(encoding="utf-8"), page

    public_pages = (ROOT / "index.html", ROOT / "kontakt.html")
    for page in public_pages:
        content = page.read_text(encoding="utf-8")
        assert "android-app.html" not in content, page
        assert "dz-app.html" not in content, page


def test_private_team_surfaces_are_not_discoverable_by_search_or_navigation():
    robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
    for path in PRIVATE_PATHS:
        assert f"Disallow: {path}" in robots

    team = (ROOT / "dz-app.html").read_text(encoding="utf-8")
    android = (ROOT / "android-app.html").read_text(encoding="utf-8")
    assert 'name="robots" content="noindex,nofollow"' in team
    assert 'name="robots" content="noindex,nofollow,noarchive"' in android
    assert 'href="/index.html"' not in android


def test_access_setup_requires_authentication_for_every_private_surface():
    guide = (ROOT / "SECURITY_ACCESS.md").read_text(encoding="utf-8")
    for path in (*PRIVATE_PATHS, "/api/team/*", "/api/admin/*"):
        assert f"`https://dzautotrade.si{path}`" in guide
    assert "ni pa varnostni mehanizem" in guide
    assert "Allow everyone" in guide
