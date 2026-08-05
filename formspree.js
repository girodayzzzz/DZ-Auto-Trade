const formspreeEndpoints = window.FORMSPREE_ENDPOINTS || {};
const formspreeForms = document.querySelectorAll('[data-formspree-form]');

const setFormspreeStatus = (form, message, type = 'info') => {
  const status = form.querySelector('[data-formspree-status]');
  if (!status) return;
  status.textContent = message;
  status.hidden = !message;
  status.dataset.type = type;
  if (message) status.focus?.({ preventScroll: false });
};

const getFormspreeEndpoint = (form) => {
  const key = form.dataset.formspreeForm;
  const configuredEndpoint = formspreeEndpoints[key];
  const inlineEndpoint = form.dataset.formspreeEndpoint;
  return configuredEndpoint || inlineEndpoint || '';
};

formspreeForms.forEach((form) => {
  const endpoint = getFormspreeEndpoint(form);
  if (!endpoint) {
    const status = form.querySelector('[data-formspree-status]');
    if (status) status.hidden = true;
    return;
  }

  form.action = endpoint;
  form.method = 'POST';
  const status = form.querySelector('[data-formspree-status]');
  if (status) {
    status.hidden = true;
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.setAttribute('tabindex', '-1');
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      setFormspreeStatus(form, 'Prosimo, izpolnite obvezna polja in preverite pravilnost vnosa.', 'error');
      return;
    }
    const submitButton = form.querySelector('[type="submit"]');
    const submitLabel = submitButton?.textContent;
    submitButton?.setAttribute('disabled', 'true');
    if (submitButton) submitButton.textContent = 'Pošiljamo...';
    setFormspreeStatus(form, 'Pošiljamo obrazec...', 'info');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Sporočila ni bilo mogoče poslati.');
      form.reset();
      setFormspreeStatus(form, 'Hvala, obrazec je bil uspešno poslan. Odgovorili bomo v najkrajšem možnem času.', 'success');
    } catch (error) {
      setFormspreeStatus(form, `${error.message} Če se težava ponovi, pišite na dzautotrade@gmail.com.`, 'error');
    } finally {
      submitButton?.removeAttribute('disabled');
      if (submitButton && submitLabel) submitButton.textContent = submitLabel;
    }
  });
});
