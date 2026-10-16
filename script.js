/* Keep the footer current without changing the rest of the static page. */
document.querySelector('#year').textContent = new Date().getFullYear();

/* Enhance ordinary image links with a keyboard-accessible native dialog. */
const dialog = document.querySelector('#certificate-dialog');
const fullImage = document.querySelector('#certificate-full');
const originalLink = document.querySelector('#certificate-original');
if (typeof dialog.showModal === 'function') {
  document.querySelectorAll('[data-certificate]').forEach((link) => {
    link.addEventListener('click', (event) => {
      // Preserve normal browser behavior for opening a link in another tab.
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      fullImage.src = link.href;
      fullImage.alt = link.querySelector('img').alt;
      originalLink.href = link.href;
      dialog.showModal();
    });
  });
  // Clicking outside the modal content closes it, as does the native Escape key.
  dialog.addEventListener('click', (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
}

/* Pause decorative animation while the hero is offscreen or the tab is hidden. */
const hero = document.querySelector('.hero');
let heroVisible = true;
function updateMotion() {
  hero.classList.toggle('motion-paused', !heroVisible || document.hidden);
}
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    updateMotion();
  });
  observer.observe(hero);
}
document.addEventListener('visibilitychange', updateMotion);
updateMotion();
