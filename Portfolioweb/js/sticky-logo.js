/**
 * STICKY BRAND LOGO (Scroll-Triggered)
 * Reveals assets/Samlogo.png when the hero section scrolls away from the viewport.
 */
export function initStickyBrandLogo() {
  const brandContainer = document.getElementById('sticky-header-brand');
  const heroSection = document.getElementById('hero');
  if (!brandContainer || !heroSection) return;

  const checkVisibility = () => {
    // When user scrolls down more than 40% of viewport height (hero zooms into space), reveal sticky logo
    const isHeroScrolledAway = window.scrollY > (window.innerHeight * 0.38);
    if (isHeroScrolledAway) {
      brandContainer.classList.add('is-visible');
    } else {
      brandContainer.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', checkVisibility, { passive: true });
  window.addEventListener('resize', checkVisibility, { passive: true });
  checkVisibility();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStickyBrandLogo);
  } else {
    initStickyBrandLogo();
  }
}
