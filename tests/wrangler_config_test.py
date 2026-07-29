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
    assert config.get("observability", {}).get("enabled") is True
    assert config.get("observability", {}).get("head_sampling_rate") == 1


def test_checkout_worker_is_deployed_after_main_changes() -> None:
    workflow = (ROOT / ".github/workflows/deploy-worker.yml").read_text(encoding="utf-8")

    assert "cloudflare/wrangler-action@v3" in workflow
    assert "CLOUDFLARE_API_TOKEN" in workflow
    assert "CLOUDFLARE_ACCOUNT_ID" in workflow
    assert "command: deploy --keep-vars" in workflow
    assert "node tests/checkout_worker.test.mjs" in workflow
    assert "https://dzautotrade.si/api/checkout-health?verify=stripe" in workflow
    assert "https://www.dzautotrade.si/api/checkout-health?verify=stripe" in workflow
    assert "!health.checkoutReady || !health.stripeConnection?.ok" in workflow
    assert "STRIPE_SECRET_KEY" not in workflow
    assert "STRIPE_WEBHOOK_SECRET" not in workflow
    assert "secrets: |" not in workflow


def test_pages_checkout_fallback_reuses_existing_worker_route() -> None:
    source = (ROOT / "functions/checkout-api.js").read_text(encoding="utf-8")

    assert "import worker from '../cloudflare-worker.js'" in source
    assert "url.pathname = '/api/checkout'" in source
    assert "worker.fetch(new Request(url, request), env)" in source
