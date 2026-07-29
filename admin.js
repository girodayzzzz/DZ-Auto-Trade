const form = document.querySelector('[data-product-form]');
const categoryForm = document.querySelector('[data-category-form]');
const originalSkuField = document.querySelector('[data-original-sku]');
const originalCategoryIdField = document.querySelector('[data-original-category-id]');
const formTitle = document.querySelector('[data-form-title]');
const statusBox = document.querySelector('[data-admin-status]');
const productList = document.querySelector('[data-admin-product-list]');
const categoryList = document.querySelector('[data-admin-category-list]');
const resetButton = document.querySelector('[data-reset-form]');
const resetCategoryButton = document.querySelector('[data-reset-category]');
const refreshButton = document.querySelector('[data-refresh-products]');
const categorySelect = document.querySelector('[data-category-select]');
const adminSearch = document.querySelector('[data-admin-search]');
const productStat = document.querySelector('[data-stat-products]');
const categoryStat = document.querySelector('[data-stat-categories]');
const featuredStat = document.querySelector('[data-stat-featured]');
const imageInput = document.querySelector('[data-image-input]');
const imagePreview = document.querySelector('[data-image-preview]');
const orderList = document.querySelector('[data-admin-order-list]');
const refreshOrdersButton = document.querySelector('[data-refresh-orders]');

const defaultCategories = [
  { id: 'avto-deli', label: 'Avto deli', description: 'Filtri, zavore, brisalci in potrošni deli' },
  { id: 'cistila', label: 'Čistila', description: 'Izdelki za nego notranjosti in zunanjosti' },
  { id: 'orodja', label: 'Orodja', description: 'Ročno orodje, diagnostika in delavnica' },
];
let categories = [...defaultCategories];
let products = [];
let searchTerm = '';
let orders = [];

const setStatus = (message, type = 'info') => {
  if (!statusBox) return;
  statusBox.textContent = message;
  statusBox.dataset.type = type;
};

const escapeHtml = (value = '') =>
  String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');

const slugify = (value = '') =>
  String(value).toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const categoryLabel = (id) => categories.find((category) => category.id === id)?.label || id || 'Kategorija';
const formatCurrency = (cents = 0, currency = 'EUR') => new Intl.NumberFormat('sl-SI', { style: 'currency', currency: String(currency || 'EUR').toUpperCase() }).format(Number(cents || 0) / 100);
const formatDate = (value = '') => value ? new Intl.DateTimeFormat('sl-SI', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—';


const renderImagePreview = (value = '') => {
  if (!imagePreview) return;
  const image = String(value || '').trim();
  imagePreview.innerHTML = image
    ? `<img src="${escapeHtml(image)}" alt="Predogled slike izdelka" /><span>Slika je pripravljena.</span>`
    : '<span>Predogled slike</span>';
};

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result));
    reader.addEventListener('error', () => reject(new Error('Slike ni bilo mogoče prebrati.')));
    reader.readAsDataURL(file);
  });

const handleImagePaste = async (event) => {
  const imageFile = [...(event.clipboardData?.files || [])].find((file) => file.type.startsWith('image/'));
  if (!imageFile || !imageInput) return;
  event.preventDefault();
  if (imageFile.size > 900_000) {
    setStatus('Slika je prevelika za direktno lepljenje. Raje jo naložite na hosting/CDN in prilepite URL.', 'error');
    return;
  }
  try {
    imageInput.value = await fileToDataUrl(imageFile);
    renderImagePreview(imageInput.value);
    setStatus('Slika je prilepljena v obrazec. Za večje slike priporočamo URL/CDN.', 'success');
  } catch (error) {
    setStatus(error.message, 'error');
  }
};

const normalizeCategory = (category) => {
  const label = String(category.label || '').trim();
  return {
    id: slugify(category.id || label),
    label,
    description: String(category.description || '').trim(),
  };
};

const normalizeProduct = (product) => {
  const category = product.category || categories[0]?.id || 'avto-deli';
  return {
    name: product.name?.trim() ?? '',
    category,
    categoryLabel: categoryLabel(category),
    description: product.description?.trim() ?? '',
    price: product.price?.trim() ?? 'Po povpraševanju',
    badge: product.badge?.trim() ?? 'Novo',
    sku: product.sku?.trim() ?? '',
    availability: product.availability?.trim() ?? 'Po naročilu',
    delivery: product.delivery?.trim() ?? 'Po dogovoru',
    brand: product.brand?.trim() ?? '',
    compatibility: product.compatibility?.trim() ?? '',
    orderNote: product.orderNote?.trim() ?? '',
    regularPrice: product.regularPrice?.trim() ?? '',
    supplierPrice: product.supplierPrice?.trim() ?? '',
    shippingNote: product.shippingNote?.trim() ?? '',
    purchaseUrl: product.purchaseUrl?.trim() ?? '',
    checkoutEnabled: Number(product.checkoutAmount || 0) >= 50,
    cartEnabled: Number(product.checkoutAmount || 0) >= 50,
    checkoutAmount: Number(product.checkoutAmount || 0),
    featured: Boolean(product.featured),
    searchTerms: product.searchTerms?.trim() ?? '',
    image: product.image?.trim() ?? '',
    imageAlt: product.imageAlt?.trim() ?? '',
    theme: product.theme?.trim() || 'linear-gradient(135deg, #1d4ed8, #0f172a)',
  };
};

const hasBundledProducts = () => Array.isArray(window.products) && window.products.length > 0;

const loadBundledCatalog = () => {
  categories = [...defaultCategories];
  products = hasBundledProducts() ? window.products.map(normalizeProduct) : [];
  renderCategoryOptions();
  renderCategories();
  renderProducts();
  updateStats();
};

const apiRequest = async (url, options = {}) => {
  const response = await fetch(url, { headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...options.headers }, ...options });
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json().catch(() => ({})) : {};
  if (!contentType.includes('application/json')) throw new Error('API ni vrnil JSON odgovora. Preverite Cloudflare Access in Worker.');
  if (!response.ok) throw new Error(data.error || 'Zahteva ni uspela.');
  return data;
};

const renderCategoryOptions = () => {
  categorySelect.innerHTML = categories.map((category) => `<option value="${escapeHtml(category.id)}">${escapeHtml(category.label)}</option>`).join('');
};

const updateStats = () => {
  productStat.textContent = products.length;
  categoryStat.textContent = categories.length;
  featuredStat.textContent = products.filter((product) => product.featured).length;
};

const loadProducts = async () => {
  setStatus('Nalaganje kataloga...');
  try {
    const data = await apiRequest('/api/products');
    categories = Array.isArray(data.categories) && data.categories.length ? data.categories.map(normalizeCategory) : [...defaultCategories];
    products = Array.isArray(data.products) ? data.products.map(normalizeProduct) : [];
    renderCategoryOptions();
    renderCategories();
    renderProducts();
    updateStats();
    setStatus(`Naloženih ${products.length} izdelkov v ${categories.length} kategorijah.`, 'success');
  } catch (error) {
    loadBundledCatalog();
    const message = products.length
      ? `Prikazan je lokalni katalog (${products.length} izdelkov). Shranjevanje zahteva delujoč /api/products.`
      : `${error.message} Lokalni katalog je prazen.`;
    setStatus(message, products.length ? 'warning' : 'error');
  }
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
  form.elements.brand.value = product.brand;
  form.elements.compatibility.value = product.compatibility;
  form.elements.orderNote.value = product.orderNote;
  form.elements.regularPrice.value = product.regularPrice;
  form.elements.supplierPrice.value = product.supplierPrice;
  form.elements.shippingNote.value = product.shippingNote;
  form.elements.purchaseUrl.value = product.purchaseUrl;
  form.elements.checkoutAmount.value = product.checkoutAmount || '';
  form.elements.searchTerms.value = product.searchTerms;
  form.elements.image.value = product.image;
  renderImagePreview(product.image);
  form.elements.imageAlt.value = product.imageAlt;
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
  renderImagePreview('');
  formTitle.textContent = 'Dodaj nov izdelek';
};

const fillCategoryForm = (category) => {
  categoryForm.elements.label.value = category.label;
  categoryForm.elements.id.value = category.id;
  categoryForm.elements.description.value = category.description;
  originalCategoryIdField.value = category.id;
};

const resetCategoryForm = () => {
  categoryForm.reset();
  originalCategoryIdField.value = '';
};

const deleteProduct = async (sku) => {
  if (!window.confirm(`Izbrišem izdelek ${sku}?`)) return;
  setStatus('Brisanje izdelka...');
  await apiRequest(`/api/admin/products/${encodeURIComponent(sku)}`, { method: 'DELETE' });
  resetForm();
  await loadProducts();
  setStatus('Izdelek je izbrisan.', 'success');
};

const deleteCategory = async (id) => {
  if (products.some((product) => product.category === id)) {
    setStatus('Kategorije ni mogoče izbrisati, ker vsebuje izdelke. Najprej premaknite ali izbrišite izdelke.', 'error');
    return;
  }
  if (!window.confirm(`Izbrišem kategorijo ${categoryLabel(id)}?`)) return;
  await apiRequest(`/api/admin/categories/${encodeURIComponent(id)}`, { method: 'DELETE' });
  resetCategoryForm();
  await loadProducts();
  setStatus('Kategorija je izbrisana.', 'success');
};


const renderOrders = () => {
  if (!orderList) return;
  orderList.innerHTML = orders.length ? orders.map((order) => {
    const lines = Array.isArray(order.lineItems) ? order.lineItems.filter((line) => line.type !== 'shipping') : [];
    const items = lines.map((line) => `${escapeHtml(line.quantity || 1)}× ${escapeHtml(line.name || line.sku || 'Postavka')}`).join('<br />') || 'Ni postavk';
    const statusLabel = order.status === 'paid' ? 'Plačano' : 'V postopku';
    return `<article class="admin-order-item"><div><strong>${escapeHtml(order.id || 'Naročilo')}</strong><span>${statusLabel} • ${formatCurrency(order.totalCents, order.currency)} • ${formatDate(order.paidAt || order.createdAt)}</span><span>${escapeHtml(order.customerName || '')}${order.customerEmail ? ` • ${escapeHtml(order.customerEmail)}` : ''}${order.customerPhone ? ` • ${escapeHtml(order.customerPhone)}` : ''}</span><p>${items}</p></div></article>`;
  }).join('') : '<p class="form-note">Ni shranjenih naročil. Ko kupec začne Stripe Checkout, bo tukaj nastal zapis.</p>';
};

const loadOrders = async () => {
  if (!orderList) return;
  try {
    orderList.innerHTML = '<p class="form-note">Nalaganje naročil...</p>';
    const data = await apiRequest('/api/admin/orders');
    orders = Array.isArray(data.orders) ? data.orders : [];
    renderOrders();
  } catch (error) {
    orderList.innerHTML = `<p class="form-note">${escapeHtml(error.message)} Za ogled naročil zaščitite /api/admin/* s Cloudflare Access.</p>`;
  }
};

const renderCategories = () => {
  categoryList.innerHTML = categories.map((category) => `<article class="admin-category-item"><div><strong>${escapeHtml(category.label)}</strong><span>${escapeHtml(category.id)}${category.description ? ` • ${escapeHtml(category.description)}` : ''}</span></div><div class="admin-item-actions"><button class="btn-secondary" type="button" data-edit-category="${escapeHtml(category.id)}">Uredi</button><button class="btn-secondary danger-btn" type="button" data-delete-category="${escapeHtml(category.id)}">Izbriši</button></div></article>`).join('');
};

const renderProducts = () => {
  const filteredProducts = products.filter((product) => `${product.name} ${product.sku} ${product.categoryLabel} ${product.searchTerms}`.toLowerCase().includes(searchTerm));
  productList.innerHTML = filteredProducts.length ? categories.map((category) => {
    const group = filteredProducts.filter((product) => product.category === category.id);
    if (!group.length) return '';
    return `<section class="admin-product-group"><h3>${escapeHtml(category.label)} <span>${group.length}</span></h3>${group.map((product) => `<article class="admin-product-item"><div><strong>${escapeHtml(product.name)}</strong><span>${escapeHtml(product.sku)} • ${escapeHtml(product.price)}${product.regularPrice ? ` • Redna ${escapeHtml(product.regularPrice)}` : ''}${product.supplierPrice ? ` • Dobavna ${escapeHtml(product.supplierPrice)}` : ''} • ${product.checkoutEnabled ? `Stripe ${(product.checkoutAmount / 100).toFixed(2)} €` : 'Povpraševanje'} • ${escapeHtml(product.availability)}</span></div><div class="admin-item-actions"><button class="btn-secondary" type="button" data-edit-sku="${escapeHtml(product.sku)}">Uredi</button><button class="btn-secondary danger-btn" type="button" data-delete-sku="${escapeHtml(product.sku)}">Izbriši</button></div></article>`).join('')}</section>`;
  }).join('') : '<p class="form-note">Ni izdelkov. Dodajte prvi izdelek v obrazcu.</p>';
};

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const product = normalizeProduct({
    ...Object.fromEntries(formData.entries()),
    featured: formData.get('featured') === 'on',
    checkoutEnabled: true,
    cartEnabled: true,
  });
  if (!product.name || !product.sku) return setStatus('Naziv in SKU sta obvezna.', 'error');
  try {
    setStatus('Shranjevanje izdelka...');
    await apiRequest('/api/admin/products', { method: 'POST', body: JSON.stringify({ product, originalSku: originalSkuField.value || product.sku }) });
    resetForm();
    await loadProducts();
    setStatus('Izdelek je shranjen.', 'success');
  } catch (error) { setStatus(error.message, 'error'); }
});

categoryForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const category = normalizeCategory(Object.fromEntries(new FormData(categoryForm).entries()));
  if (!category.id || !category.label) return setStatus('Ime in ID kategorije sta obvezna.', 'error');
  try {
    setStatus('Shranjevanje kategorije...');
    await apiRequest('/api/admin/categories', { method: 'POST', body: JSON.stringify({ category, originalId: originalCategoryIdField.value || category.id }) });
    resetCategoryForm();
    await loadProducts();
    setStatus('Kategorija je shranjena.', 'success');
  } catch (error) { setStatus(error.message, 'error'); }
});

productList?.addEventListener('click', (event) => {
  const editSku = event.target.closest('[data-edit-sku]')?.dataset.editSku;
  const deleteSku = event.target.closest('[data-delete-sku]')?.dataset.deleteSku;
  if (editSku) fillForm(products.find((item) => item.sku === editSku));
  if (deleteSku) deleteProduct(deleteSku).catch((error) => setStatus(error.message, 'error'));
});

categoryList?.addEventListener('click', (event) => {
  const editId = event.target.closest('[data-edit-category]')?.dataset.editCategory;
  const deleteId = event.target.closest('[data-delete-category]')?.dataset.deleteCategory;
  if (editId) fillCategoryForm(categories.find((item) => item.id === editId));
  if (deleteId) deleteCategory(deleteId).catch((error) => setStatus(error.message, 'error'));
});

adminSearch?.addEventListener('input', (event) => { searchTerm = event.target.value.toLowerCase().trim(); renderProducts(); });
imageInput?.addEventListener('input', () => renderImagePreview(imageInput.value));
imageInput?.addEventListener('paste', (event) => handleImagePaste(event));
resetButton?.addEventListener('click', resetForm);
resetCategoryButton?.addEventListener('click', resetCategoryForm);
refreshButton?.addEventListener('click', () => loadProducts().catch((error) => setStatus(error.message, 'error')));
refreshOrdersButton?.addEventListener('click', () => loadOrders());
loadProducts().catch((error) => setStatus(error.message, 'error'));
loadOrders();
