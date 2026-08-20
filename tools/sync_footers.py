#!/usr/bin/env python3
"""Synchronize the canonical footer across every static HTML page that has one."""

from pathlib import Path

from site_footer import FOOTER_PATTERN, apply_footer


ROOT = Path(__file__).resolve().parents[1]


def main() -> None:
    updated = 0
    for path in ROOT.rglob("*.html"):
        document = path.read_text(encoding="utf-8")
        if not FOOTER_PATTERN.search(document):
            continue
        synchronized = apply_footer(document)
        if synchronized != document:
            path.write_text(synchronized, encoding="utf-8")
            updated += 1
    print(f"Synchronized {updated} footer(s).")


if __name__ == "__main__":
    main()
