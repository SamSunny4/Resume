/**
 * STICKY BRAND LOGO (Scroll-Triggered)
 * Reveals assets/Samlogo.png when the hero section scrolls away from the viewport.
 */
export function initStickyBrandLogo() {
  const brandContainer = document.getElementById('sticky-header-brand');
  const brandLink = document.querySelector('.sticky-brand-link');
  if (!brandContainer) return;

  const checkVisibility = () => {
    const isAwayFromHero = (window.AppState?.currentSector ?? 0) > 0 || (window.scrollY > window.innerHeight * 0.35);
    if (isAwayFromHero) {
      brandContainer.classList.add('is-visible');
    } else {
      brandContainer.classList.remove('is-visible');
    }
  };

  if (brandLink) {
    brandLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.AppState?.lenis) {
        window.AppState.lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

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
