const findCheckoutStatus = (trigger) => trigger?.closest('.checkout-card, .product-detail-info, .cart-drawer')?.querySelector('[data-checkout-status]') || document.querySelector('[data-checkout-status]');

const setCheckoutStatus = (message, type = 'info', trigger = null) => {
  const checkoutStatus = findCheckoutStatus(trigger);
  if (!checkoutStatus) return;
  checkoutStatus.textContent = message;
  checkoutStatus.dataset.type = type;
};

const requestCheckoutSession = async (endpoint, payload) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json().catch(() => ({}))
    : {};
  if (!response.ok) {
    // Keep the actionable status/code in developer tools without logging the
    // cart, Stripe URL, request body, or any other customer data.
    console.error('Stripe Checkout endpoint failed.', {
      endpoint,
      status: response.status,
      code: typeof data.code === 'string' ? data.code : 'UNSTRUCTURED_RESPONSE',
      error: typeof data.error === 'string' ? data.error : 'Strežnik ni vrnil JSON odgovora.',
      requestId: typeof data.requestId === 'string' ? data.requestId : '',
    });
  }
  return { response, data };
};

const createCheckoutSession = async (payload) => {
  let result;
  try {
    // The production bindings and secrets belong to the Pages project, so its
    // Function is the canonical same-origin checkout endpoint.
    result = await requestCheckoutSession('/checkout-api', payload);
  } catch (error) {
    // The Pages Function can be temporarily unavailable even while the routed
    // Worker is healthy. Treat transport failures like a missing route.
    result = { response: null, data: {}, transportError: error };
  }

  // This production setup has the secrets on Pages while /api/* points at a
  // separate Worker. A missing Pages Function is returned by
  // static hosting as 404/405 (rather than a network error), so those responses
  // must also use the Pages Function. Never retry ambiguous gateway or Stripe
  // errors: doing so could create two Checkout Sessions for one click.
  const shouldUsePagesFallback = !result.response
    || [404, 405].includes(result.response.status)
    || (result.response.status === 503 && result.data.code === 'CHECKOUT_NOT_CONFIGURED');
  if (shouldUsePagesFallback) {
    const primaryResult = result;
    try {
      const fallbackResult = await requestCheckoutSession('/api/checkout', payload);
      if (fallbackResult.response.ok && fallbackResult.data.url) return fallbackResult.data.url;
      // A static host commonly returns an HTML 404 for the optional Pages
      // Function. In that case preserve the Worker's structured error: it
      // explains the actual missing binding instead of replacing it with a
      // generic fallback failure. A structured Pages error remains preferable
      // when the Worker route itself was missing or unreachable.
      const fallbackHasUsefulError = Boolean(fallbackResult.data?.error);
      const primaryHasUsefulError = Boolean(primaryResult.response && primaryResult.data?.error);
      result = fallbackHasUsefulError || !primaryHasUsefulError ? fallbackResult : primaryResult;
    } catch (error) {
      if (!primaryResult.response) throw new Error('Plačilnega sistema ni mogoče doseči. Poskusite znova čez nekaj trenutkov.');
      result = primaryResult;
    }
  }

  const { response, data } = result;
  if (!response.ok || !data.url) throw new Error(data.error || 'Stripe plačilo trenutno ni na voljo. Poskusite znova.');
  return data.url;
};

window.dzCheckout = {
  createSession: createCheckoutSession,
  setStatus: setCheckoutStatus,
};

document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-checkout]');
  if (!button) return;
  const sku = String(button.dataset.sku || '').trim();
  if (!sku) return setCheckoutStatus('Ta postavka še nima nastavljene varne šifre za spletno plačilo.', 'error', button);
  button.disabled = true;
  setCheckoutStatus('Pripravljamo varno Stripe Checkout plačilno stran...', 'info', button);
  try {
    const url = await createCheckoutSession({ sku, quantity: 1 });
    window.location.href = url;
  } catch (error) {
    setCheckoutStatus(error.message, 'error', button);
    button.disabled = false;
  }
});
