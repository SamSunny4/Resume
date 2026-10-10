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

  // Smooth lerp update loop with delta thresholding
  function updateMouseCoords() {
    if (document.hidden) {
      requestAnimationFrame(updateMouseCoords);
      return;
    }

    const dx = AppState.mouse.targetX - AppState.mouse.x;
    const dy = AppState.mouse.targetY - AppState.mouse.y;
    if (Math.abs(dx) > 0.0001 || Math.abs(dy) > 0.0001) {
      AppState.mouse.x += dx * 0.08;
      AppState.mouse.y += dy * 0.08;
    }

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

import { initQuantumPreloader } from './loader.js';
import { initHeroAsciiBurst } from './ascii-burst.js';
import { initStickyBrandLogo } from './sticky-logo.js';
import { initTechSolarSystem } from './tech-solar.js';
import { initProjectSolarSystem } from './project-solar.js';
import { initTopoBackground } from './topo-background.js';
import { initCredentialsStones } from './credentials-stones.js';
import { initContactSection } from './contact.js';
import { initGyroParallax } from './gyro-parallax.js';

/**
 * Main System Bootstrap
 */
function bootstrap() {
  console.log(
    `%c[SAM SUNNY] System Initialized %cApplied AI & Systems Architecture`,
    'background: #D2FF00; color: #000000; font-weight: bold; padding: 4px 8px; border-radius: 2px;',
    'background: #0E1309; color: #E3E8DC; padding: 4px 8px; border-radius: 2px;'
  );

  // Initialize Quantum Asset Preloader & GPU Cache Warming
  const preloader = initQuantumPreloader(() => {
    console.log('[System] All assets downloaded, pre-decoded & GPU pre-warmed.');
  });
  window.AppState.preloader = preloader;

  initSmoothScroll();
  initMouseTracking();
  initGyroParallax();
  initHeroAsciiBurst();
  initStickyBrandLogo();

  // Tab visibility power-saving: pause animations when tab is in background
  document.addEventListener('visibilitychange', () => {
    const isHidden = document.hidden;
    if (window.AppState.topoBg) window.AppState.topoBg.isRunning = !isHidden;
    if (!isHidden && window.AppState.topoBg && !window.AppState.topoBg.animId) {
      window.AppState.topoBg.animId = requestAnimationFrame(window.AppState.topoBg.animate);
    }
  }, { passive: true });

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

  // Initialize Contact & Transmission Section
  const contactSection = initContactSection();
  window.AppState.contactSection = contactSection;

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

