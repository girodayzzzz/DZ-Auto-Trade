"""Deployment configuration regression checks."""

from pathlib import Path
import tomllib


ROOT = Path(__file__).resolve().parents[1]


def test_dashboard_kv_bindings_survive_deployments() -> None:
    config = tomllib.loads((ROOT / "wrangler.toml").read_text(encoding="utf-8"))

    kept_bindings = config.get("unsafe", {}).get("metadata", {}).get("keep_bindings", [])
    assert "kv_namespace" in kept_bindings, (
        "Wrangler deployments must retain the dashboard-managed PRODUCTS_KV binding"
    )
