/**
 * STICKY BRAND LOGO (Scroll-Triggered)
 * Reveals assets/Samlogo.png when the hero section scrolls away from the viewport.
 */
export function initStickyBrandLogo() {
  const brandContainer = document.getElementById('sticky-header-brand');
  const heroSection = document.getElementById('hero');
  if (!brandContainer || !heroSection) return;

  const checkVisibility = () => {
    const heroRect = heroSection.getBoundingClientRect();
    // When hero bottom has scrolled above 35% of the viewport height, reveal sticky logo
    const isHeroScrolledAway = heroRect.bottom < (window.innerHeight * 0.35);
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
