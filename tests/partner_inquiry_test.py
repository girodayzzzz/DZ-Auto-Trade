from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "partnersko-povprasevanje.html"


class PartnerFormParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.forms = []
        self.fields = {}
        self.options = []
        self.links = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag == "form":
            self.forms.append(attributes)
        if tag in {"input", "select", "textarea"} and attributes.get("name"):
            self.fields[attributes["name"]] = attributes
        if tag == "option":
            self.options.append(attributes)
        if tag == "a" and attributes.get("href"):
            self.links.append(attributes["href"])


def parse_page():
    parser = PartnerFormParser()
    parser.feed(PAGE.read_text(encoding="utf-8"))
    return parser


def test_partner_form_collects_attribution_and_request_details():
    parser = parse_page()

    assert len(parser.forms) == 1
    assert parser.forms[0]["data-formspree-form"] == "partner"
    assert parser.forms[0]["action"] == "https://formspree.io/f/xrpgenne"
    assert parser.forms[0]["method"] == "POST"
    for required_field in (
        "Namen zahteve",
        "Vrsta zahteve",
        "Partnerska koda",
        "Partner",
        "E-pošta partnerja",
        "Stranka",
        "Podrobnosti zahteve",
        "Soglasje partnerja",
    ):
        assert required_field in parser.fields
        assert "required" in parser.fields[required_field]

    partner_code = parser.fields["Partnerska koda"]
    assert partner_code["pattern"] == "[A-Za-z0-9_-]{3,30}"
    assert partner_code["minlength"] == "3"
    assert partner_code["maxlength"] == "30"


def test_contact_page_links_to_partner_form():
    contact = (ROOT / "kontakt.html").read_text(encoding="utf-8")

    assert 'href="partnersko-povprasevanje.html"' in contact
    assert "Partnersko povpraševanje" in contact


def test_partner_page_is_listed_in_sitemap():
    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")

    assert "https://dzautotrade.si/partnersko-povprasevanje.html" in sitemap
