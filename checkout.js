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
  let result = await requestCheckoutSession('/api/checkout', payload);

  // A frequent Cloudflare setup has the secrets on Pages while /api/* points
  // at a separate Worker without them. Retry through the Pages Function in
  // that one configuration case; never retry validation or Stripe errors.
  if (result.response.status === 503 && result.data.code === 'CHECKOUT_NOT_CONFIGURED') {
    const pagesResult = await requestCheckoutSession('/checkout-api', payload);
    if (pagesResult.response.ok && pagesResult.data.url) return pagesResult.data.url;
    if (pagesResult.data?.error) result = pagesResult;
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
