/**
 * UNIFIED CONTINUOUS FONT SHUFFLE ENGINE
 * Continuously cycles typography across both "SAM" and "SUNNY" lines in lockstep
 * Starts immediately before the entrance transition and loops continuously.
 * Author: Sam Sunny Portfolio
 */

// Curated typography presets calibrated for balanced cap-height, width footprint, and line spacing
export const UNIFIED_FONTS = [
  {
    name: 'Pixelify Sans (Minecraft)',
    family: "'Pixelify Sans', cursive",
    weight: '700',
    style: 'normal',
    spacing: '-0.02em',
    size: 'clamp(3.8rem, 11vw, 10.5rem)',
    lineHeight: '0.86',
    gap: '0.03em'
  },
  {
    name: 'Oxanium (ROG Gamer)',
    family: "'Oxanium', sans-serif",
    weight: '800',
    style: 'normal',
    spacing: '-0.025em',
    size: 'clamp(3.8rem, 11vw, 10.5rem)',
    lineHeight: '0.86',
    gap: '0.035em'
  },
  {
    name: 'Cinzel Decorative (Fancy Roguelike)',
    family: "'Cinzel Decorative', serif",
    weight: '700',
    style: 'normal',
    spacing: '-0.015em',
    size: 'clamp(3.7rem, 10.7vw, 10.1rem)',
    lineHeight: '0.86',
    gap: '0.025em'
  },
  {
    name: 'Press Start 2P (Retro 8-Bit Roguelike)',
    family: "'Press Start 2P', cursive",
    weight: '400',
    style: 'normal',
    spacing: '-0.035em',
    size: 'clamp(3.15rem, 9.0vw, 8.6rem)',
    lineHeight: '0.82',
    gap: '0.01em'
  },
  {
    name: 'MedievalSharp (Dungeon Roguelike)',
    family: "'MedievalSharp', cursive",
    weight: '400',
    style: 'normal',
    spacing: '-0.02em',
    size: 'clamp(4.15rem, 11.8vw, 11.2rem)',
    lineHeight: '0.84',
    gap: '0.03em'
  },
  {
    name: 'Orbitron (Cyber Mecha HUD)',
    family: "'Orbitron', sans-serif",
    weight: '900',
    style: 'normal',
    spacing: '-0.03em',
    size: 'clamp(3.8rem, 11vw, 10.4rem)',
    lineHeight: '0.86',
    gap: '0.035em'
  },
  {
    name: 'Instrument Serif (Fancy Editorial)',
    family: "'Instrument Serif', Georgia, serif",
    weight: '400',
    style: 'italic',
    spacing: '-0.01em',
    size: 'clamp(3.85rem, 11.1vw, 10.5rem)',
    lineHeight: '0.85',
    gap: '0.03em'
  },
  {
    name: 'Syne (Monumental Brutalist)',
    family: "'Syne', sans-serif",
    weight: '800',
    style: 'normal',
    spacing: '-0.045em',
    size: 'clamp(3.8rem, 11vw, 10.5rem)',
    lineHeight: '0.86',
    gap: '0.035em'
  }
];



if (typeof window !== 'undefined') {
  window.UNIFIED_FONTS = UNIFIED_FONTS;
  window.applyFontPreset = applyFontPreset;
}

let shuffleInterval = null;

let currentIndex = 0;

/**
 * Apply font preset across target container so both lines update in lockstep
 */
export function applyFontPreset(element, preset) {
  if (!element) return;

  const fontColor = preset.color || null;
  const fontSize = preset.size || 'clamp(3.8rem, 11vw, 10.5rem)';
  const lineHeight = preset.lineHeight || '0.86';
  const gap = preset.gap || '0.04em';

  // 1. Set CSS variables on the container
  element.style.setProperty('--shuffle-font-family', preset.family);
  element.style.setProperty('--shuffle-font-weight', preset.weight);
  element.style.setProperty('--shuffle-font-style', preset.style || 'normal');
  element.style.setProperty('--shuffle-letter-spacing', preset.spacing);
  element.style.setProperty('--shuffle-font-size', fontSize);
  element.style.setProperty('--shuffle-line-height', lineHeight);
  element.style.setProperty('--shuffle-gap', gap);

  // 2. Directly enforce inline styles with !important on all descendant lines & words
  const targets = element.querySelectorAll('.hero-name-line, .reveal-word');
  targets.forEach((el) => {
    el.style.setProperty('font-family', preset.family, 'important');
    el.style.setProperty('font-weight', preset.weight, 'important');
    el.style.setProperty('font-style', preset.style || 'normal', 'important');
    el.style.setProperty('letter-spacing', preset.spacing, 'important');
    el.style.setProperty('font-size', fontSize, 'important');
    el.style.setProperty('line-height', lineHeight, 'important');
  });

  const lineSam = element.querySelector('.hero-line-sam');
  if (lineSam) {
    lineSam.style.setProperty('margin-bottom', gap, 'important');
  }
}



let isPaused = false;

/**
 * Start continuous looping font shuffle
 * @param {HTMLElement} targetElement 
 * @param {number} speedMs
 */
export function startContinuousFontLoop(targetElement, speedMs = 450) {
  if (!targetElement || isPaused) return;

  // Clear any existing loop
  if (shuffleInterval) {
    clearInterval(shuffleInterval);
  }

  // Apply initial font immediately (at 0ms)
  applyFontPreset(targetElement, UNIFIED_FONTS[currentIndex]);
  targetElement.classList.add('is-shuffling');

  // Continuous loop
  shuffleInterval = setInterval(() => {
    if (isPaused) return;
    currentIndex = (currentIndex + 1) % UNIFIED_FONTS.length;
    const preset = UNIFIED_FONTS[currentIndex];
    applyFontPreset(targetElement, preset);
  }, speedMs);
}

/**
 * Stop / Pause continuous looping font shuffle
 */
export function stopContinuousFontLoop() {
  pauseShuffle();
}

export function pauseShuffle() {
  isPaused = true;
  if (shuffleInterval) {
    clearInterval(shuffleInterval);
    shuffleInterval = null;
  }
}

export function resumeShuffle(targetElement, speedMs = 450) {
  isPaused = false;
  const el = targetElement || document.getElementById('shuffle-hero-name');
  startContinuousFontLoop(el, speedMs);
}

export function showFont(index) {
  pauseShuffle();
  const el = document.getElementById('shuffle-hero-name');
  if (el && UNIFIED_FONTS[index]) {
    currentIndex = index;
    applyFontPreset(el, UNIFIED_FONTS[index]);
  }
  return UNIFIED_FONTS[index] ? UNIFIED_FONTS[index].name : null;
}

if (typeof window !== 'undefined') {
  window.UNIFIED_FONTS = UNIFIED_FONTS;
  window.applyFontPreset = applyFontPreset;
  window.startContinuousFontLoop = startContinuousFontLoop;
  window.stopContinuousFontLoop = stopContinuousFontLoop;
  window.pauseShuffle = pauseShuffle;
  window.resumeShuffle = resumeShuffle;
  window.showFont = showFont;
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
    if (!isPaused) startContinuousFontLoop(container, 150); // fast burst
  });

  container.addEventListener('mouseleave', () => {
    if (!isPaused) startContinuousFontLoop(container, 450); // resume steady loop
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
