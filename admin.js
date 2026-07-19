const form = document.querySelector('[data-product-form]');
const originalSkuField = document.querySelector('[data-original-sku]');
const formTitle = document.querySelector('[data-form-title]');
const statusBox = document.querySelector('[data-admin-status]');
const productList = document.querySelector('[data-admin-product-list]');
const resetButton = document.querySelector('[data-reset-form]');
const refreshButton = document.querySelector('[data-refresh-products]');
const categoryLabels = {
  'avto-deli': 'Avto deli',
  cistila: 'Čistila',
  orodja: 'Orodja',
};
let products = [];

const setStatus = (message, type = 'info') => {
  if (!statusBox) return;
  statusBox.textContent = message;
  statusBox.dataset.type = type;
};

const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const normalizeProduct = (product) => ({
  name: product.name?.trim() ?? '',
  category: product.category ?? 'avto-deli',
  categoryLabel: categoryLabels[product.category] ?? product.categoryLabel ?? 'Avto deli',
  description: product.description?.trim() ?? '',
  price: product.price?.trim() ?? 'Po povpraševanju',
  badge: product.badge?.trim() ?? 'Novo',
  sku: product.sku?.trim() ?? '',
  availability: product.availability?.trim() ?? 'Po naročilu',
  delivery: product.delivery?.trim() ?? 'Po dogovoru',
  featured: Boolean(product.featured),
  searchTerms: product.searchTerms?.trim() ?? '',
  image: product.image?.trim() ?? '',
  theme: product.theme?.trim() || 'linear-gradient(135deg, #1d4ed8, #0f172a)',
});

const apiRequest = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json().catch(() => ({})) : {};

  if (!contentType.includes('application/json')) {
    throw new Error('API ni vrnil JSON odgovora. Preverite, ali ste prijavljeni v Cloudflare Access in ali je Worker pravilno nameščen.');
  }

  if (!response.ok) {
    throw new Error(data.error || 'Zahteva ni uspela. Preverite Cloudflare Worker in Access pravila.');
  }

  return data;
};

const loadProducts = async () => {
  setStatus('Nalaganje izdelkov...');
  const data = await apiRequest('/api/products');
  products = Array.isArray(data.products) ? data.products.map(normalizeProduct) : [];
  renderProducts();
  setStatus(`Naloženih ${products.length} izdelkov.`, 'success');
};

const productFromForm = () => {
  const formData = new FormData(form);
  return normalizeProduct({
    name: formData.get('name'),
    category: formData.get('category'),
    description: formData.get('description'),
    price: formData.get('price'),
    badge: formData.get('badge'),
    sku: formData.get('sku'),
    availability: formData.get('availability'),
    delivery: formData.get('delivery'),
    featured: formData.get('featured') === 'on',
    searchTerms: formData.get('searchTerms'),
    image: formData.get('image'),
    theme: formData.get('theme'),
  });
};

const fillForm = (product) => {
  form.elements.name.value = product.name;
  form.elements.category.value = product.category;
  form.elements.badge.value = product.badge;
  form.elements.price.value = product.price;
  form.elements.sku.value = product.sku;
  form.elements.availability.value = product.availability;
  form.elements.delivery.value = product.delivery;
  form.elements.description.value = product.description;
  form.elements.searchTerms.value = product.searchTerms;
  form.elements.image.value = product.image;
  form.elements.theme.value = product.theme;
  form.elements.featured.checked = product.featured;
  originalSkuField.value = product.sku;
  formTitle.textContent = `Uredi ${product.name}`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const resetForm = () => {
  form.reset();
  originalSkuField.value = '';
  form.elements.theme.value = 'linear-gradient(135deg, #1d4ed8, #0f172a)';
  formTitle.textContent = 'Dodaj nov izdelek';
};

const deleteProduct = async (sku) => {
  if (!window.confirm(`Izbrišem izdelek ${sku}?`)) return;
  setStatus('Brisanje izdelka...');
  await apiRequest(`/api/admin/products/${encodeURIComponent(sku)}`, { method: 'DELETE' });
  resetForm();
  await loadProducts();
  setStatus('Izdelek je izbrisan.', 'success');
};

const renderProducts = () => {
  if (!productList) return;

  productList.innerHTML = products.length
    ? products
        .map(
          (product) => `
            <article class="admin-product-item">
              <div>
                <strong>${escapeHtml(product.name)}</strong>
                <span>${escapeHtml(product.sku)} • ${escapeHtml(product.categoryLabel)} • ${escapeHtml(product.price)}</span>
              </div>
              <div class="admin-item-actions">
                <button class="btn-secondary" type="button" data-edit-sku="${escapeHtml(product.sku)}">Uredi</button>
                <button class="btn-secondary danger-btn" type="button" data-delete-sku="${escapeHtml(product.sku)}">Izbriši</button>
              </div>
            </article>
          `,
        )
        .join('')
    : '<p class="form-note">Ni izdelkov. Dodajte prvi izdelek v obrazcu.</p>';
};

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const product = productFromForm();

  if (!product.name || !product.sku) {
    setStatus('Naziv in SKU sta obvezna.', 'error');
    return;
  }

  setStatus('Shranjevanje izdelka...');

  try {
    await apiRequest('/api/admin/products', {
      method: 'POST',
      body: JSON.stringify({ product, originalSku: originalSkuField.value || product.sku }),
    });
    resetForm();
    await loadProducts();
    setStatus('Izdelek je shranjen.', 'success');
  } catch (error) {
    setStatus(error.message, 'error');
  }
});

productList?.addEventListener('click', (event) => {
  const editSku = event.target.closest('[data-edit-sku]')?.dataset.editSku;
  const deleteSku = event.target.closest('[data-delete-sku]')?.dataset.deleteSku;

  if (editSku) {
    const product = products.find((item) => item.sku === editSku);
    if (product) fillForm(product);
  }

  if (deleteSku) {
    deleteProduct(deleteSku).catch((error) => setStatus(error.message, 'error'));
  }
});

resetButton?.addEventListener('click', resetForm);
refreshButton?.addEventListener('click', () => loadProducts().catch((error) => setStatus(error.message, 'error')));

loadProducts().catch((error) => setStatus(error.message, 'error'));
