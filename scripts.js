const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.nav-link');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const wrapper = toggle.closest('.nav-dropdown');
    const isOpen = wrapper?.classList.toggle('open') ?? false;
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((l) => l.classList.remove('active'));
    link.classList.add('active');

    if (nav?.classList.contains('open')) {
      nav.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

const productGrid = document.querySelector('[data-product-grid]');
const featuredGrid = document.querySelector('[data-featured-products]');
const filterButtons = document.querySelectorAll('[data-filter]');
const productCount = document.querySelector('[data-product-count]');
const productSearch = document.querySelector('[data-product-search]');
const productSort = document.querySelector('[data-product-sort]');
let currentProducts = Array.isArray(window.products) ? window.products : [];
let activeFilter = 'all';

const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const parsePrice = (price) => Number(price?.replace(/[^0-9,]/g, '').replace(',', '.') ?? 0);

const normalizeProduct = (product) => ({
  name: product.name ?? '',
  category: product.category ?? 'avto-deli',
  categoryLabel: product.categoryLabel ?? 'Avto deli',
  description: product.description ?? '',
  price: product.price ?? 'Po povpraševanju',
  badge: product.badge ?? 'Novo',
  sku: product.sku ?? '',
  availability: product.availability ?? 'Po naročilu',
  delivery: product.delivery ?? 'Po dogovoru',
  featured: Boolean(product.featured),
  searchTerms: product.searchTerms ?? '',
  image: product.image ?? '',
  theme: product.theme ?? 'linear-gradient(135deg, #1d4ed8, #0f172a)',
});

const loadProducts = async () => {
  try {
    const response = await fetch('/api/products', {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) throw new Error('Product API unavailable');

    const data = await response.json();
    if (!Array.isArray(data.products)) throw new Error('Invalid product API response');

    currentProducts = data.products.map(normalizeProduct);
  } catch (error) {
    console.info('Using bundled fallback products.', error);
    currentProducts = currentProducts.map(normalizeProduct);
  }
};

const createInquiryUrl = (product) => {
  const params = new URLSearchParams({
    izdelek: product.name,
    kategorija: product.categoryLabel,
    sku: product.sku,
  });

  return `kontakt.html?${params.toString()}`;
};

const productMatchesSearch = (product, query) => {
  if (!query) return true;

  const searchable = [product.name, product.description, product.badge, product.sku, product.searchTerms].join(' ').toLowerCase();
  return searchable.includes(query.toLowerCase());
};

const getVisibleProducts = () => {
  const query = productSearch?.value.trim() ?? '';
  const sort = productSort?.value ?? 'featured';
  const filtered = currentProducts.filter((product) => {
    const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
    return matchesCategory && productMatchesSearch(product, query);
  });

  return filtered.sort((a, b) => {
    if (sort === 'price-asc') return parsePrice(a.price) - parsePrice(b.price);
    if (sort === 'price-desc') return parsePrice(b.price) - parsePrice(a.price);
    if (sort === 'name') return a.name.localeCompare(b.name, 'sl');
    return Number(b.featured) - Number(a.featured);
  });
};

const renderProductCard = (product) => `
  <article class="product-card" id="${escapeHtml(product.category)}">
    <div class="product-image" style="--product-bg: ${escapeHtml(product.theme)}">
      <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" />
    </div>
    <div class="product-body">
      <div class="product-meta"><span class="badge">${escapeHtml(product.categoryLabel)}</span><span class="badge">${escapeHtml(product.badge)}</span></div>
      <h3>${escapeHtml(product.name)}</h3>
      <p>${escapeHtml(product.description)}</p>
      <dl class="product-details">
        <div><dt>Šifra</dt><dd>${escapeHtml(product.sku)}</dd></div>
        <div><dt>Zaloga</dt><dd>${escapeHtml(product.availability)}</dd></div>
        <div><dt>Dobava</dt><dd>${escapeHtml(product.delivery)}</dd></div>
      </dl>
      <strong class="product-price">${escapeHtml(product.price)}</strong>
      <a class="shop-btn" href="${createInquiryUrl(product)}" data-product-name="${escapeHtml(product.name)}">Pošlji povpraševanje</a>
    </div>
  </article>
`;

const renderProducts = () => {
  if (!productGrid) return;

  const visibleProducts = getVisibleProducts();
  productGrid.innerHTML = visibleProducts.length
    ? visibleProducts.map(renderProductCard).join('')
    : '<div class="empty-state"><h3>Ni najdenih izdelkov</h3><p>Poskusite z drugim iskalnim izrazom ali nam pošljite povpraševanje.</p><a class="btn-secondary" href="kontakt.html">Pošlji povpraševanje</a></div>';

  if (productCount) {
    productCount.textContent = `${visibleProducts.length} izdelkov`;
  }
};

const renderFeaturedProducts = () => {
  if (!featuredGrid) return;

  const featuredProducts = currentProducts.filter((product) => product.featured).slice(0, 4);
  featuredGrid.innerHTML = featuredProducts.map(renderProductCard).join('');
};

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    renderProducts();
  });
});

productSearch?.addEventListener('input', renderProducts);
productSort?.addEventListener('change', renderProducts);

const messageField = document.querySelector('#message');
const topicField = document.querySelector('#topic');
const selectedProductCard = document.querySelector('[data-selected-product]');
const productFromQuery = new URLSearchParams(window.location.search).get('izdelek');
const categoryFromQuery = new URLSearchParams(window.location.search).get('kategorija');
const skuFromQuery = new URLSearchParams(window.location.search).get('sku');

if (messageField && productFromQuery) {
  messageField.value = `Pozdravljeni, zanima me izdelek: ${productFromQuery}${skuFromQuery ? ` (${skuFromQuery})` : ''}. Prosim za več informacij.`;
}

if (topicField && categoryFromQuery) {
  topicField.value = categoryFromQuery;
}

if (selectedProductCard && productFromQuery) {
  selectedProductCard.hidden = false;
  selectedProductCard.textContent = `Izbran izdelek: ${productFromQuery}${skuFromQuery ? ` • ${skuFromQuery}` : ''}`;
}

loadProducts().then(() => {
  renderProducts();
  renderFeaturedProducts();
});
