const formspreeEndpoints = window.FORMSPREE_ENDPOINTS || {};
const formspreeForms = document.querySelectorAll('[data-formspree-form]');

const setFormspreeStatus = (form, message, type = 'info') => {
  const status = form.querySelector('[data-formspree-status]');
  if (!status) return;
  status.textContent = message;
  status.hidden = !message;
  status.dataset.type = type;
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
  if (status) status.hidden = true;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      setFormspreeStatus(form, 'Prosimo, izpolnite obvezna polja in preverite pravilnost vnosa.', 'error');
      return;
    }
    const submitButton = form.querySelector('[type="submit"]');
    submitButton?.setAttribute('disabled', 'true');
    setFormspreeStatus(form, 'Pošiljamo sporočilo...', 'info');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Sporočila ni bilo mogoče poslati.');
      form.reset();
      setFormspreeStatus(form, 'Hvala! Sporočilo je poslano. Odgovorili bomo v najkrajšem možnem času.', 'success');
    } catch (error) {
      setFormspreeStatus(form, `${error.message} Če se težava ponovi, pišite na dzautotrade@gmail.com.`, 'error');
    } finally {
      submitButton?.removeAttribute('disabled');
    }
  });
});
