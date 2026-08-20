"""Site-wide structural checks for responsive and usable HTML pages."""

from html.parser import HTMLParser
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.hash_links = []
        self.viewport = False
        self.h1_count = 0
        self.main_count = 0

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if identifier := attributes.get("id"):
            self.ids.add(identifier)
        if tag == "meta" and attributes.get("name", "").lower() == "viewport":
            self.viewport = "width=device-width" in attributes.get("content", "").lower()
        if tag == "h1":
            self.h1_count += 1
        if tag == "main":
            self.main_count += 1
        href = attributes.get("href", "")
        if tag == "a" and href.startswith("#") and len(href) > 1:
            # Store shortcuts are handled as JavaScript-backed catalogue filters.
            if "data-shop-shortcut" not in attributes:
                self.hash_links.append(href[1:])


class SiteStructureTest(unittest.TestCase):
    def test_every_page_has_mobile_and_content_structure(self):
        errors = []
        pages = sorted(ROOT.rglob("*.html"))
        self.assertGreater(len(pages), 100)

        for page in pages:
            parser = PageParser()
            parser.feed(page.read_text(encoding="utf-8"))
            relative = page.relative_to(ROOT)
            if not parser.viewport:
                errors.append(f"{relative}: missing width=device-width viewport")
            if parser.h1_count != 1:
                errors.append(f"{relative}: expected one h1, found {parser.h1_count}")
            if parser.main_count != 1:
                errors.append(f"{relative}: expected one main, found {parser.main_count}")
            for target in parser.hash_links:
                if target not in parser.ids:
                    errors.append(f"{relative}: broken same-page link #{target}")

        self.assertEqual([], errors, "\n" + "\n".join(errors))


if __name__ == "__main__":
    unittest.main()
