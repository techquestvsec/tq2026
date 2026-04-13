/* shared.js — star canvas + back-to-top, used on every page */

document.addEventListener('DOMContentLoaded', () => {

  /* ── STARS (removed: canvas star animation was too heavy for low-end devices) ── */

  /* ── BACK TO TOP ── */
  const topBtn = document.getElementById('topBtn');
  if (topBtn) {
    window.addEventListener('scroll', () => {
      topBtn.classList.toggle('show', scrollY > 400);
    });
    topBtn.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── ACTIVE NAV LINK ── */
  const path = location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});
