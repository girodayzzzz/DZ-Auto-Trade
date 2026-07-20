(() => {
  const SITE_URL = 'https://dzautotrade.si';
  const SITE_NAME = 'DZ Auto Trade';
  const LOGO_URL = `${SITE_URL}/assets/logo.svg`;
  const DEFAULT_DESCRIPTION = 'DZ Auto Trade je slovenska spletna trgovina za avto dele, detailing izdelke, orodja, vozila in storitve čiščenja vozil.';
  const PUBLIC_PAGES = new Set([
    '/', '/index.html', '/trgovina.html', '/product.html', '/avto-trznica.html', '/storitve.html',
    '/posredniska-prodaja.html', '/prevozi-transport.html', '/notranje-ciscenje.html', '/zunanje-ciscenje.html',
    '/globinsko-ciscenje.html', '/poliranje-zascita.html', '/vodic-za-nakup.html', '/dostava-placila.html',
    '/pogosta-vprasanja.html', '/o-nas.html', '/kontakt.html', '/splosni-pogoji.html', '/politika-zasebnosti.html',
    '/politika-piskotkov.html', '/vracila-reklamacije.html'
  ]);

  const getPath = () => window.location.pathname.replace(/\/+/g, '/') || '/';
  const isPublicPage = () => PUBLIC_PAGES.has(getPath());
  const canonicalUrl = () => `${SITE_URL}${getPath() === '/index.html' ? '/' : getPath()}`;

  const upsertMeta = (selector, attrs) => {
    let tag = document.head.querySelector(selector);
    if (!tag) {
      tag = document.createElement('meta');
      document.head.appendChild(tag);
    }
    Object.entries(attrs).forEach(([key, value]) => tag.setAttribute(key, value));
    return tag;
  };

  const upsertLink = (rel, href) => {
    let tag = document.head.querySelector(`link[rel="${rel}"]`);
    if (!tag) {
      tag = document.createElement('link');
      tag.setAttribute('rel', rel);
      document.head.appendChild(tag);
    }
    tag.setAttribute('href', href);
  };

  const upsertJsonLd = (id, data) => {
    let tag = document.getElementById(id);
    if (!tag) {
      tag = document.createElement('script');
      tag.type = 'application/ld+json';
      tag.id = id;
      document.head.appendChild(tag);
    }
    tag.textContent = JSON.stringify(data);
  };

  const getDescription = () => document.querySelector('meta[name="description"]')?.content || DEFAULT_DESCRIPTION;

  const applyPageSeo = ({ title = document.title, description = getDescription(), url = canonicalUrl(), image = LOGO_URL, type = 'website' } = {}) => {
    if (!isPublicPage()) return;
    document.title = title;
    upsertLink('canonical', url);
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'sl_SI' });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
  };

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': ['AutoPartsStore', 'LocalBusiness'],
    '@id': `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: LOGO_URL,
    image: LOGO_URL,
    email: 'dzautotrade@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Spodnji Ključarovci 15A',
      postalCode: '2274',
      addressLocality: 'Velika Nedelja',
      addressCountry: 'SI'
    },
    sameAs: ['https://www.facebook.com/Dzautotrade', 'https://www.instagram.com/dzautotrade/'],
    areaServed: { '@type': 'Country', name: 'Slovenia' },
    description: DEFAULT_DESCRIPTION
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: 'sl-SI',
    publisher: { '@id': `${SITE_URL}/#business` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/trgovina.html?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  applyPageSeo();
  if (isPublicPage()) {
    upsertJsonLd('dz-business-schema', businessSchema);
    upsertJsonLd('dz-website-schema', websiteSchema);
  }

  window.dzApplySeo = applyPageSeo;
  window.dzSeoConfig = { SITE_URL, SITE_NAME, LOGO_URL };
})();
