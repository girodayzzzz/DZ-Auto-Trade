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
  const data = await response.json().catch(() => ({}));
  return { response, data };
};

const createCheckoutSession = async (payload) => {
  let result;
  try {
    result = await requestCheckoutSession('/api/checkout', payload);
  } catch (error) {
    // A route or Worker deployment can be temporarily unavailable even while
    // the Pages Function is healthy. Treat transport failures like a missing
    // Worker configuration and try the independent Pages endpoint.
    result = { response: null, data: {}, transportError: error };
  }

  // A frequent Cloudflare setup has the secrets on Pages while /api/* points
  // at a separate Worker without them. A missing Worker route is returned by
  // static hosting as 404/405 (rather than a network error), so those responses
  // must also use the Pages Function. Never retry ambiguous gateway or Stripe
  // errors: doing so could create two Checkout Sessions for one click.
  const shouldUsePagesFallback = !result.response
    || [404, 405].includes(result.response.status)
    || (result.response.status === 503 && result.data.code === 'CHECKOUT_NOT_CONFIGURED');
  if (shouldUsePagesFallback) {
    try {
      const pagesResult = await requestCheckoutSession('/checkout-api', payload);
      if (pagesResult.response.ok && pagesResult.data.url) return pagesResult.data.url;
      // Always retain the fallback response. Keeping the original transport
      // placeholder here could otherwise cause a null-response TypeError.
      result = pagesResult;
    } catch (error) {
      if (!result.response) throw new Error('Plačilnega sistema ni mogoče doseči. Poskusite znova čez nekaj trenutkov.');
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
