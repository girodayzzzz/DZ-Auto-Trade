from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FORM_ENDPOINTS = {
    "contact": "https://formspree.io/f/xwvgbkwn",
    "parts": "https://formspree.io/f/xojglvjj",
    "vehicle-sale": "https://formspree.io/f/mgoglogj",
    "transport": "https://formspree.io/f/xlgqwjro",
    "partner": "https://formspree.io/f/xrpgenne",
}
IGNORED_FORM_FILES = {"admin-panel.html"}


class HtmlAuditParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.forms = []
        self.scripts = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag == "form":
            self.forms.append((self.getpos()[0], attributes))
        elif tag == "script" and attributes.get("src"):
            self.scripts.append(attributes["src"])


def parse_html(path):
    parser = HtmlAuditParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser


def test_marketing_forms_use_configured_formspree_endpoints():
    for path in sorted(ROOT.glob("*.html")):
        if path.name in IGNORED_FORM_FILES:
            continue
        parser = parse_html(path)
        if not parser.forms:
            continue

        source = path.read_text(encoding="utf-8")
        for line, form in parser.forms:
            with pytest_subtest(path.name, line):
                key = form.get("data-formspree-form")
                assert key in FORM_ENDPOINTS
                assert form.get("action") == FORM_ENDPOINTS[key]
                assert form.get("method", "").upper() == "POST"
                assert not form.get("action", "").startswith("mailto:")
                assert "data-formspree-status" in source
                assert "formspree-config.js" in parser.scripts
                assert "formspree.js" in parser.scripts


def test_formspree_config_contains_every_marketing_endpoint():
    config = (ROOT / "formspree-config.js").read_text(encoding="utf-8")
    for key, endpoint in FORM_ENDPOINTS.items():
        assert f"{key}: '{endpoint}'" in config or f"'{key}': '{endpoint}'" in config


def test_formspree_status_messages_are_user_friendly_and_accessible():
    script = (ROOT / "formspree.js").read_text(encoding="utf-8")

    assert "role', 'status'" in script
    assert "aria-live', 'polite'" in script
    assert "tabindex', '-1'" in script
    assert "Pošiljamo obrazec..." in script
    assert "Hvala, obrazec je bil uspešno poslan." in script
    assert "Odgovorili bomo v najkrajšem možnem času." in script
    assert "submitButton.textContent = 'Pošiljamo...'" in script
    assert "submitButton.textContent = submitLabel" in script


class pytest_subtest:
    def __init__(self, *_args):
        self.args = _args

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, tb):
        if exc is not None:
            detail = ":".join(map(str, self.args))
            exc.args = (*exc.args, detail)
        return False
