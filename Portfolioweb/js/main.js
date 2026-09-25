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

  // Smooth lerp update loop
  function updateMouseCoords() {
    AppState.mouse.x += (AppState.mouse.targetX - AppState.mouse.x) * 0.08;
    AppState.mouse.y += (AppState.mouse.targetY - AppState.mouse.y) * 0.08;
    requestAnimationFrame(updateMouseCoords);
  }
  requestAnimationFrame(updateMouseCoords);
}

import { initHeroAsciiBurst } from './ascii-burst.js';
import { initStickyBrandLogo } from './sticky-logo.js';
import { initTechSolarSystem } from './tech-solar.js';

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
  initTechSolarSystem();

  AppState.isInitialized = true;
}

// Ensure DOM is fully ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}

