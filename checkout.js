const checkoutStatus = document.querySelector('[data-checkout-status]');

const setCheckoutStatus = (message, type = 'info') => {
  if (!checkoutStatus) return;
  checkoutStatus.textContent = message;
  checkoutStatus.dataset.type = type;
};

const createCheckoutSession = async (payload) => {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.url) throw new Error(data.error || 'Plačilo trenutno ni na voljo. Pošljite povpraševanje.');
  return data.url;
};

document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-checkout]');
  if (!button) return;
  const amount = Number(button.dataset.amount);
  const name = button.dataset.name;
  const type = button.dataset.type || 'order';
  if (!amount || !name) return setCheckoutStatus('Ta postavka še nima nastavljene cene za spletno plačilo.', 'error');
  button.disabled = true;
  setCheckoutStatus('Pripravljamo varno Stripe plačilno stran...', 'info');
  try {
    const url = await createCheckoutSession({ name, amount, type, quantity: 1 });
    window.location.href = url;
  } catch (error) {
    setCheckoutStatus(error.message, 'error');
    button.disabled = false;
  }
});
