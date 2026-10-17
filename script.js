/* Keep the footer current without changing the rest of the static page. */
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

/* Enhance ordinary image links with a keyboard-accessible native dialog. */
const dialog = document.querySelector('#certificate-dialog');
let fullImage = document.querySelector('#certificate-full');
const originalLink = document.querySelector('#certificate-original');
if (dialog && typeof dialog.showModal === 'function') {
  // Announce loading and failures without leaving the previous certificate visible.
  const status = document.createElement('p');
  status.setAttribute('role', 'status');
  fullImage.before(status);
  document.querySelectorAll('[data-certificate]').forEach((link) => {
    link.addEventListener('click', (event) => {
      // Preserve normal browser behavior for opening a link in another tab.
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      // A fresh image prevents the browser from painting the previous document.
      const nextImage = new Image();
      nextImage.id = 'certificate-full';
      nextImage.alt = link.querySelector('img').alt;
      nextImage.style.display = 'none';
      fullImage.replaceWith(nextImage);
      fullImage = nextImage;
      status.textContent = 'Loading certificate…';
      originalLink.href = link.href;

      // Ignore late results after closing or switching to another certificate.
      nextImage.onload = () => {
        if (fullImage !== nextImage || !dialog.open) return;
        nextImage.style.display = 'block';
        status.textContent = '';
      };
      nextImage.onerror = () => {
        if (fullImage !== nextImage || !dialog.open) return;
        status.textContent = 'Could not load the certificate. Try the full-size image link below.';
      };
      dialog.showModal();
      nextImage.src = link.href;
    });
  });
  // Release the previous image when the viewer closes.
  dialog.addEventListener('close', () => {
    if (dialog.open) return;
    fullImage.onload = null;
    fullImage.onerror = null;
    fullImage.style.display = 'none';
    fullImage.removeAttribute('src');
    status.textContent = '';
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
  hero?.classList.toggle('motion-paused', !heroVisible || document.hidden);
}
if (hero && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    updateMotion();
  });
  observer.observe(hero);
}
document.addEventListener('visibilitychange', updateMotion);
updateMotion();

/* Reset project disclosures on initial load and restored page visits. */
function closeProjects() {
  document.querySelectorAll(".project").forEach((project) => { project.open = false; });
}
closeProjects();
window.addEventListener("pageshow", closeProjects);
