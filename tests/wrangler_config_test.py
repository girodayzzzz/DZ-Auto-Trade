"""Deployment configuration regression checks."""

from pathlib import Path
import tomllib


ROOT = Path(__file__).resolve().parents[1]


def test_dashboard_runtime_bindings_survive_deployments() -> None:
    config = tomllib.loads((ROOT / "wrangler.toml").read_text(encoding="utf-8"))

    assert config.get("keep_vars") is True, (
        "Wrangler deployments must preserve dashboard-managed variables and secrets"
    )
    kept_bindings = config.get("unsafe", {}).get("metadata", {}).get("keep_bindings", [])
    assert {"kv_namespace", "plain_text", "secret_text"}.issubset(kept_bindings), (
        "Wrangler deployments must retain dashboard-managed KV, variables, and secrets"
    )


def test_protected_worker_identity_and_secrets_stay_dashboard_managed() -> None:
    config = tomllib.loads((ROOT / "wrangler.toml").read_text(encoding="utf-8"))

    assert config.get("name") == "dz-auto-trade-products"
    assert config.get("main") == "cloudflare-worker.js"
    assert "vars" not in config, "Worker variables and secrets must remain dashboard-managed"
    assert "kv_namespaces" not in config, "PRODUCTS_KV must remain dashboard-managed"

    routes = config.get("routes", [])
    assert routes == [
        {"pattern": "dzautotrade.si/api/*", "zone_name": "dzautotrade.si"},
        {"pattern": "www.dzautotrade.si/api/*", "zone_name": "dzautotrade.si"},
    ]
