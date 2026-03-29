:root {
  --bg: #0b1220;
  --bg-soft: #111a2d;
  --text: #e6ebf7;
  --muted: #a8b3cc;
  --primary: #4f9cff;
  --primary-2: #76b3ff;
  --card: #131f36;
  --line: #223150;
  --success: #32d583;
  --max-width: 1100px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: var(--text);
  background: radial-gradient(circle at top right, #1b2b4e 0%, var(--bg) 45%);
  line-height: 1.6;
}

.container {
  width: min(var(--max-width), calc(100% - 2rem));
  margin-inline: auto;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(12px);
  background: color-mix(in oklab, var(--bg) 80%, transparent);
  border-bottom: 1px solid var(--line);
}

.nav-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
  gap: 1rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
}

.brand-mark {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--primary), var(--primary-2));
  color: #08101f;
  font-size: 0.9rem;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  text-decoration: none;
  color: var(--muted);
  font-weight: 500;
  padding: 0.45rem 0.7rem;
  border-radius: 8px;
  transition: 0.2s ease;
}

.nav-link:hover,
.nav-link.active {
  color: var(--text);
  background: #1b2a47;
}

.cta-btn,
.btn-primary,
.btn-secondary,
.shop-btn {
  border: none;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}

.cta-btn,
.btn-primary,
.shop-btn {
  background: linear-gradient(135deg, var(--primary), var(--primary-2));
  color: #061022;
  padding: 0.65rem 1rem;
}

.btn-secondary {
  color: var(--text);
  border: 1px solid var(--line);
  padding: 0.6rem 1rem;
  background: transparent;
}

.menu-toggle {
  display: none;
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 0.45rem;
}

.menu-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text);
  margin: 4px 0;
}

.hero {
  padding: 4.8rem 0 3rem;
}

.page-hero {
  padding-bottom: 2rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1.4rem;
  align-items: center;
}

h1,
h2,
h3 {
  margin: 0 0 0.6rem;
  line-height: 1.2;
}

h1 {
  font-size: clamp(2rem, 4vw, 3.3rem);
  max-width: 14ch;
}

.hero-copy {
  color: var(--muted);
  max-width: 58ch;
}

.hero-actions {
  display: flex;
  gap: 0.8rem;
  margin-top: 1.2rem;
}

.hero-card {
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 1.2rem;
  background: linear-gradient(180deg, #14213a, #101a2d);
}

.hero-card ul {
  margin: 0;
  padding-left: 1rem;
}

.section {
  padding: 3.6rem 0;
}

.section.alt {
  background: color-mix(in oklab, var(--bg-soft) 75%, transparent);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.section-head {
  margin-bottom: 1.4rem;
}

.eyebrow {
  margin: 0 0 0.3rem;
  color: var(--success);
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 0.78rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.card {
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 1.1rem;
  background: var(--card);
}

.card p {
  color: var(--muted);
}

.card a {
  color: var(--primary-2);
  text-decoration: none;
  font-weight: 600;
}

.service-list {
  display: grid;
  gap: 1rem;
}

.service-list ul {
  margin: 0;
  padding-left: 1rem;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: center;
}

.site-footer {
  border-top: 1px solid var(--line);
  background: #0a111f;
  padding: 1.6rem 0;
}

.footer-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

@media (max-width: 900px) {
  .hero-grid,
  .card-grid,
  .about-grid {
    grid-template-columns: 1fr;
  }

  .menu-toggle {
    display: block;
  }

  .main-nav {
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    display: none;
    flex-direction: column;
    align-items: flex-start;
    background: #0d1628;
    border-bottom: 1px solid var(--line);
    padding: 0.7rem 1rem 1rem;
  }

  .main-nav.open {
    display: flex;
  }

  .cta-btn {
    display: none;
  }
}
