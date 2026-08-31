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
        "Kontakt stranke",
        "Način nadaljnje komunikacije",
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


def test_partner_dropdown_options_have_explicit_contrast():
    styles = (ROOT / "styles.css").read_text(encoding="utf-8")

    assert ".partner-inquiry-form select option" in styles
    assert 'select option[value=""]' in styles
    assert "color-scheme: dark" in styles
    assert "background: #0f172a" in styles


def test_partner_form_has_request_specific_required_fields():
    parser = parse_page()

    expected_fields = {
        "Znamka vozila",
        "Model vozila",
        "Letnik vozila",
        "Motor vozila",
        "VIN",
        "Iskani rezervni del",
        "Kraj prevzema",
        "Kraj dostave",
        "Predmet prevoza",
        "Termin transporta",
        "Vozilo za prodajo",
        "Prevoženi kilometri",
        "Stanje vozila",
        "Želena prodajna cena",
        "Iskana znamka in model",
        "Želeni letnik",
        "Želeni motor",
        "Proračun za vozilo",
        "Izdelek ali povezava",
        "Količina izdelka",
        "Podrobnosti zahteve",
    }
    assert expected_fields <= parser.fields.keys()
    for field_name in expected_fields:
        assert "required" in parser.fields[field_name]
        assert "disabled" in parser.fields[field_name]


def test_partner_request_script_only_enables_selected_field_group():
    script = (ROOT / "scripts.js").read_text(encoding="utf-8")

    assert "fieldset.dataset.requestFields === selectedType" in script
    assert "field.disabled = !isActive" in script
