/* Fà ch'et n'abi — interazioni front-end + GDPR cookie consent */
(function () {
  'use strict';

  // ---------- Navbar scroll ----------
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mobile menu ----------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Year in footer ----------
  document.querySelectorAll('#year').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // ---------- Menu filters ----------
  const filterContainer = document.getElementById('filters');
  const grid = document.getElementById('pizzaGrid');
  if (filterContainer && grid) {
    const cards = Array.from(grid.querySelectorAll('.pizza-card'));
    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      const filter = btn.dataset.filter;
      filterContainer.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      cards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  }

  // ---------- GDPR Cookie Consent ----------
  const CONSENT_COOKIE = 'facn_cookie_consent';
  const CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // 12 mesi

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }
  function setCookie(name, value) {
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = name + '=' + encodeURIComponent(value) +
      '; Max-Age=' + CONSENT_MAX_AGE +
      '; Path=/; SameSite=Lax' + secure;
  }
  function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax';
  }

  const banner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('cookieAccept');
  const rejectBtn = document.getElementById('cookieReject');
  const openPrefs = document.getElementById('openCookiePrefs');
  const resetPrefs = document.getElementById('resetCookiePrefs');

  function showBanner() { if (banner) banner.hidden = false; }
  function hideBanner() { if (banner) banner.hidden = true; }

  if (banner && !getCookie(CONSENT_COOKIE)) {
    // Mostra il banner solo se l'utente non ha già espresso una scelta
    setTimeout(showBanner, 400);
  }
  if (acceptBtn) acceptBtn.addEventListener('click', () => { setCookie(CONSENT_COOKIE, 'accepted'); hideBanner(); });
  if (rejectBtn) rejectBtn.addEventListener('click', () => { setCookie(CONSENT_COOKIE, 'rejected'); hideBanner(); });
  if (openPrefs) openPrefs.addEventListener('click', (e) => { e.preventDefault(); showBanner(); });
  if (resetPrefs) resetPrefs.addEventListener('click', () => {
    deleteCookie(CONSENT_COOKIE);
    showBanner();
  });
})();