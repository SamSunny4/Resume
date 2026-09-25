/**
 * UNIFIED CONTINUOUS FONT SHUFFLE ENGINE
 * Continuously cycles typography across both "SAM" and "SUNNY" lines in lockstep
 * Starts immediately before the entrance transition and loops continuously.
 * Author: Sam Sunny Portfolio
 */

// Curated typography presets with calibrated tracking to maintain shape stability
export const UNIFIED_FONTS = [
  {
    name: 'Syne',
    family: "'Syne', sans-serif",
    weight: '800',
    style: 'normal',
    spacing: '-0.045em'
  },
  {
    name: 'Space Grotesk',
    family: "'Space Grotesk', sans-serif",
    weight: '700',
    style: 'normal',
    spacing: '-0.03em'
  },
  {
    name: 'Instrument Serif',
    family: "'Instrument Serif', Georgia, serif",
    weight: '400',
    style: 'italic',
    spacing: '0.01em'
  },
  {
    name: 'JetBrains Mono',
    family: "'JetBrains Mono', monospace",
    weight: '700',
    style: 'normal',
    spacing: '-0.05em'
  },
  {
    name: 'Plus Jakarta Sans',
    family: "'Plus Jakarta Sans', sans-serif",
    weight: '800',
    style: 'normal',
    spacing: '-0.03em'
  }
];

let shuffleInterval = null;
let currentIndex = 0;

/**
 * Apply font preset across target container so both lines update in lockstep
 */
export function applyFontPreset(element, preset) {
  if (!element) return;
  element.style.fontFamily = preset.family;
  element.style.fontWeight = preset.weight;
  element.style.fontStyle = preset.style || 'normal';
  element.style.letterSpacing = preset.spacing;
}

/**
 * Start continuous looping font shuffle
 * @param {HTMLElement} targetElement 
 * @param {number} speedMs
 */
export function startContinuousFontLoop(targetElement, speedMs = 450) {
  if (!targetElement) return;

  // Clear any existing loop
  if (shuffleInterval) {
    clearInterval(shuffleInterval);
  }

  // Apply initial font immediately (at 0ms)
  applyFontPreset(targetElement, UNIFIED_FONTS[currentIndex]);
  targetElement.classList.add('is-shuffling');

  // Continuous loop
  shuffleInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % UNIFIED_FONTS.length;
    const preset = UNIFIED_FONTS[currentIndex];
    applyFontPreset(targetElement, preset);
  }, speedMs);
}

let isInitialized = false;

/**
 * Initialize Font Shuffle immediately upon script execution
 */
export function initHeroFontShuffle() {
  if (isInitialized) return;
  const container = document.getElementById('shuffle-hero-name');
  if (!container) return;
  isInitialized = true;

  // 1. START IMMEDIATELY (0ms delay) before/during the entrance reveal
  startContinuousFontLoop(container, 450);

  // 2. Interactive hover acceleration: temporarily faster shuffle on mouse hover
  container.addEventListener('mouseenter', () => {
    startContinuousFontLoop(container, 150); // fast burst
  });

  container.addEventListener('mouseleave', () => {
    startContinuousFontLoop(container, 450); // resume steady loop
  });
}

// Auto-trigger if container is already in DOM
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroFontShuffle);
  } else {
    initHeroFontShuffle();
  }
}
