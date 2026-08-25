"""Canonical site footer used by static pages and the product generator."""

from __future__ import annotations

import re


FOOTER = '''<footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="brand"><img class="brand-logo" src="assets/Logodzautotrade.si.png" alt="DZ Auto Trade" width="150" height="52" /></a>
          <p>DZ Auto Trade upravlja DAYZZZZ SPLETNA TRGOVINA, TIBI TOPOLINJAK MUNDA S.P. Ponudba avto delov, čistil, orodja in storitev čiščenja vozil.</p>
          <p class="company-meta">Davčna št.: SI23492783 • Matična št.: 9216316000<br />Spodnji Ključarovci 15A, 2274 Velika Nedelja</p>
          <p class="footer-payment-badge" aria-label="Varno spletno plačilo"><span aria-hidden="true">💳</span> Varna spletna plačila prek Stripe Checkout</p>
          <div class="footer-social" aria-label="DZ Auto Trade družbena omrežja">
            <a href="https://www.facebook.com/Dzautotrade" target="_blank" rel="noopener noreferrer" aria-label="Sledite DZ Auto Trade na Facebooku">
              <span class="footer-social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.75l.41-3.2H13.5V7.76c0-.93.26-1.56 1.59-1.56h1.7V3.34A22.8 22.8 0 0 0 14.31 3c-2.45 0-4.13 1.5-4.13 4.25V9.8H7.41V13h2.77v8h3.32Z"/></svg></span>
              <span class="footer-social-copy"><strong>Facebook</strong><small>@Dzautotrade</small></span>
              <span class="footer-social-arrow" aria-hidden="true">↗</span>
            </a>
            <a href="https://www.instagram.com/dzautotrade/" target="_blank" rel="noopener noreferrer" aria-label="Sledite DZ Auto Trade na Instagramu">
              <span class="footer-social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></span>
              <span class="footer-social-copy"><strong>Instagram</strong><small>@dzautotrade</small></span>
              <span class="footer-social-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <nav class="footer-column footer-shop" aria-labelledby="footer-shop-title">
          <h3 id="footer-shop-title">Trgovina</h3>
          <ul class="footer-links">
            <li><a href="trgovina.html#novi-avto-deli">Avto deli</a></li>
            <li><a href="trgovina.html#cistila">Čistila in nega</a></li>
            <li><a href="trgovina.html#tehnicni-spreji">Tehnični spreji</a></li>
            <li><a href="trgovina.html#poliranje-in-zascita">Poliranje in zaščita</a></li>
            <li><a href="trgovina.html#orodja">Orodja</a></li>
            <li><a href="avto-trznica.html">Avto tržnica</a></li>
          </ul>
        </nav>
        <nav class="footer-column footer-services" aria-labelledby="footer-services-title">
          <h3 id="footer-services-title">Storitve</h3>
          <ul class="footer-links">
            <li><a href="storitve.html">Vse storitve</a></li>
            <li><a href="notranje-ciscenje.html">Notranje čiščenje</a></li>
            <li><a href="globinsko-ciscenje.html">Globinsko čiščenje</a></li>
            <li><a href="zunanje-ciscenje.html">Zunanje čiščenje</a></li>
            <li><a href="poliranje-zascita.html">Poliranje in zaščita</a></li>
            <li><a href="mesecno-ciscenje.html">Mesečno čiščenje</a></li>
            <li><a href="prevozi-transport.html">Prevozi in transport</a></li>
            <li><a href="posredniska-prodaja.html">Posredniška prodaja</a></li>
            <li><a href="iscem-vozilo.html">Iščem vozilo</a></li>
          </ul>
        </nav>
        <nav class="footer-column footer-company" aria-labelledby="footer-company-title">
          <h3 id="footer-company-title">Podjetje</h3>
          <ul class="footer-links">
            <li><a href="o-nas.html">O nas</a></li>
            <li><a href="kontakt.html">Splošni kontakt</a></li>
            <li><a href="avto-deli-povprasevanje.html">Avto deli – povpraševanje</a></li>
            <li><a href="transport-povprasevanje.html">Transport – povpraševanje</a></li>
            <li><a href="prodaja-avta.html">Prodaja vozila</a></li>
            <li><a href="vodic-za-nakup.html">Vodič za nakup</a></li>
            <li><a href="pogosta-vprasanja.html">Pogosta vprašanja</a></li>
          </ul>
        </nav>
        <section class="footer-column footer-legal" aria-labelledby="footer-legal-title">
          <h3 id="footer-legal-title">Pravno in kontakt</h3>
          <ul class="footer-links">
            <li><a href="splosni-pogoji.html">Splošni pogoji</a></li>
            <li><a href="politika-zasebnosti.html">Politika zasebnosti</a></li>
            <li><a href="politika-piskotkov.html">Politika piškotkov</a></li>
            <li><a href="vracila-reklamacije.html">Vračila in reklamacije</a></li>
            <li><a href="dostava-placila.html">Dostava in plačila</a></li>
          </ul>
          <p class="footer-hours"><strong>Delovni čas:</strong> Pon–pet: 8.00–17.00, sobota po dogovoru</p>
          <div class="footer-contact-actions">
            <a href="tel:+38670665050"><span class="footer-contact-label">Pokliči nas</span><span>070 665 050</span></a>
            <a href="mailto:dzautotrade@gmail.com"><span class="footer-contact-label">Pišite nam</span><span>dzautotrade@gmail.com</span></a>
          </div>
        </section>
      </div>
      <div class="container footer-bottom"><span>© 2026 DZ Auto Trade / DAYZZZZ S.P. Vse pravice pridržane.</span><a href="#main-content">Na vrh ↑</a></div>
    </footer>'''


FOOTER_PATTERN = re.compile(r'<footer class="site-footer">.*?</footer>', re.DOTALL)


def apply_footer(document: str) -> str:
    """Replace an existing site footer without changing page-relative paths."""
    return FOOTER_PATTERN.sub(FOOTER, document, count=1)
