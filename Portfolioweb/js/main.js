/**
 * PORTFOLIO SYSTEM ARCHITECTURE & RUNTIME
 * Author: Sam Sunny
 * Stack: ES6 Modules + Lenis Smooth Scroll + Three.js Canvas
 */

// Global App State
export const AppState = {
  isInitialized: false,
  lenis: null,
  threeScene: null,
  mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
};
window.AppState = AppState;

/**
 * Initialize Lenis Momentum Smooth Scrolling
 */
export function initSmoothScroll() {
  if (typeof Lenis === 'undefined') {
    console.warn('[System] Lenis library not loaded yet, falling back to native scrolling.');
    return;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
  });

  AppState.lenis = lenis;

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  console.log('[System] Lenis smooth inertia scrolling active.');
}

/**
 * Track Global Normalized Cursor Coordinates for 3D & HUD Parallax
 */
export function initMouseTracking() {
  window.addEventListener('mousemove', (e) => {
    // Normalized coordinates (-1 to +1)
    AppState.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    AppState.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  const portraitCard = document.getElementById('hero-portrait-card');

  let lastTransform = '';

  // Smooth lerp update loop
  function updateMouseCoords() {
    AppState.mouse.x += (AppState.mouse.targetX - AppState.mouse.x) * 0.08;
    AppState.mouse.y += (AppState.mouse.targetY - AppState.mouse.y) * 0.08;

    // Subtle 3D parallax tilt for hero portrait card (only on Landing Page when visible)
    if (portraitCard && window.innerWidth >= 992 && window.scrollY < window.innerHeight * 0.6) {
      const rotY = (AppState.mouse.x * 6.5).toFixed(2);
      const rotX = (-AppState.mouse.y * 6.5).toFixed(2);
      const newTransform = `perspective(1000px) rotateY(${rotY}deg) rotateX(${rotX}deg) translateZ(0)`;
      if (newTransform !== lastTransform) {
        portraitCard.style.transform = newTransform;
        lastTransform = newTransform;
      }
    }

    requestAnimationFrame(updateMouseCoords);
  }
  requestAnimationFrame(updateMouseCoords);
}

import { initHeroAsciiBurst } from './ascii-burst.js';
import { initStickyBrandLogo } from './sticky-logo.js';
import { initTechSolarSystem } from './tech-solar.js';
import { initProjectSolarSystem } from './project-solar.js';
import { initTopoBackground } from './topo-background.js';
import { initCredentialsStones } from './credentials-stones.js';
import { initBlackHoleContact } from './blackhole.js';

/**
 * Main System Bootstrap
 */
function bootstrap() {
  console.log(
    `%c[SAM SUNNY] System Initialized %cApplied AI & Systems Architecture`,
    'background: #D2FF00; color: #000000; font-weight: bold; padding: 4px 8px; border-radius: 2px;',
    'background: #0E1309; color: #E3E8DC; padding: 4px 8px; border-radius: 2px;'
  );

  initSmoothScroll();
  initMouseTracking();
  initHeroAsciiBurst();
  initStickyBrandLogo();

  // Initialize Ultra-Minimal Topographic Background (STRICTLY on Landing Page)
  const heroTopoContainer = document.getElementById('hero-topo-container') || document.getElementById('hero-space-layer');
  const topoBg = initTopoBackground({
    container: heroTopoContainer,
    theme: 'cyber-light',
    cellSize: 28,
    lineLevelsCount: 5,
    speed: 0.00018,
    mouseRadius: 280,
    mouseStrength: 0.35,
    parallaxFactor: 20
  });
  window.AppState.topoBg = topoBg;

  const techSolar = initTechSolarSystem();
  const projectSolar = initProjectSolarSystem();
  window.AppState.techSolar = techSolar;
  window.AppState.projectSolar = projectSolar;

  // Initialize Credentials Infinity Stones Showcase
  const credStones = initCredentialsStones();
  window.AppState.credStones = credStones;

  // Initialize Realistic Green Black Hole Contact Singularity at End of Site
  const blackHole = initBlackHoleContact();
  window.AppState.blackHole = blackHole;

  // ---------------------------------------------------------------
  // SCROLL-SETTLE AUTO-SNAP
  // When user stops scrolling near a phase boundary (Tech Stack or
  // Projects), auto-scroll to the optimal resting position.
  // ---------------------------------------------------------------
  let scrollSettleTimer = null;
  const track = document.getElementById('space-stage-track');

  function getPhaseProgress() {
    if (!track) return -1;
    const rect = track.getBoundingClientRect();
    const maxScroll = track.offsetHeight - window.innerHeight;
    if (maxScroll <= 0) return -1;
    return Math.max(0, Math.min(1, -rect.top / maxScroll));
  }

  function settleToPhase() {
    const p = getPhaseProgress();
    if (p < 0 || !track) return;

    const trackTop = track.offsetTop;
    const maxScroll = track.offsetHeight - window.innerHeight;

    // Phase zones and their ideal resting positions:
    // Hero:        p <= 0.06           → snap to 0.00 (top of hero)
    // Tech:        0.14 < p < 0.38     → snap to 0.28 (centered tech stack)
    // Wormhole 1:  0.38 <= p < 0.48    → snap to closer side (0.28 or 0.60)
    // Projects:    0.48 <= p < 0.70    → snap to 0.60 (centered flagship projects)
    // Hyperspace:  0.70 <= p < 0.80    → snap to closer side (0.60 or 0.88)
    // Credentials: 0.80 <= p <= 1.00   → snap to 0.88 (centered credentials matrix)

    let targetP = null;

    if (p > 0.01 && p <= 0.06) {
      targetP = 0.0;
    } else if (p > 0.14 && p < 0.38) {
      targetP = 0.28;
    } else if (p >= 0.38 && p < 0.48) {
      targetP = p < 0.43 ? 0.28 : 0.60;
    } else if (p >= 0.48 && p < 0.70) {
      targetP = 0.60;
    } else if (p >= 0.70 && p < 0.80) {
      targetP = p < 0.75 ? 0.60 : 0.88;
    } else if (p >= 0.80 && p <= 0.99) {
      targetP = 0.88;
    }

    if (targetP !== null) {
      const targetY = trackTop + maxScroll * targetP;
      const currentScroll = window.scrollY || window.pageYOffset;
      const diff = Math.abs(currentScroll - targetY);

      // Only snap if we're reasonably close but not already at the target
      if (diff > 30 && diff < 800) {
        if (window.AppState && window.AppState.lenis) {
          window.AppState.lenis.scrollTo(targetY, { duration: 0.8 });
        } else {
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      }
    }
  }

  window.addEventListener('scroll', () => {
    if (scrollSettleTimer) clearTimeout(scrollSettleTimer);
    scrollSettleTimer = setTimeout(settleToPhase, 600);
  }, { passive: true });

  // Smooth scroll handler for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#tech-stack') {
        e.preventDefault();
        if (techSolar) techSolar.triggerSpaceZoom();
        return;
      }
      if (targetId === '#projects' || targetId === '#projects-solar') {
        e.preventDefault();
        if (projectSolar) projectSolar.triggerProjectsZoom();
        else if (techSolar) techSolar.triggerProjectsZoom();
        return;
      }
      if (targetId === '#credentials' || targetId === '#credentials-matrix') {
        e.preventDefault();
        if (techSolar) techSolar.triggerCredentialsZoom();
        else if (projectSolar) projectSolar.triggerCredentialsZoom();
        return;
      }
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        if (AppState.lenis) {
          AppState.lenis.scrollTo(targetEl, { duration: 1.2 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  AppState.isInitialized = true;
}

// Ensure DOM is fully ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}

