/**
 * ASCII BLOCK BURST & RETURN ENGINE
 * Monolithic 2-row Unicode Block Typography for "SAM" and "SUNNY"
 * Physics-based interactive particle burst on mouse pointer proximity and click,
 * with elastic spring-damping return.
 * Replaces the continuous font shuffle loop.
 * 
 * Aesthetic Reference:
 * ▄▀█ █▀▀ █▀ ▀█▀ █░█ █▀▀ ▀█▀ █ █▀▀
 * █▀█ ██▄ ▄█ ░█░ █▀█ ██▄ ░█░ █ █▄▄
 */

// 2-line Unicode Block Art definitions for SAM and SUNNY
export const SAM_ASCII = [
  '█▀  ▄▀█  █▀▄▀█',
  '▄█  █▀█  █░▀░█'
];

export const SUNNY_ASCII = [
  '█▀  █░█  █▄░█  █▄░█  █░█',
  '▄█  █▄█  █░▀█  █░▀█  ░█░'
];

class AsciiBurstEngine {
  constructor(container) {
    this.container = container;
    this.particles = [];
    this.animFrameId = null;
    this.isSimulating = false;
    this.mouseX = -9999;
    this.mouseY = -9999;
    this.hasMoved = false;

    // Physics parameters
    this.PROXIMITY_RADIUS = 135; // Pixel radius around mouse
    this.BURST_FORCE = 42;       // Impulse power on proximity
    this.CLICK_RADIUS = 340;     // Click shockwave radius
    this.CLICK_FORCE = 85;       // Click shockwave power
    this.SPRING_K = 0.082;       // Spring tension returning to origin
    this.DAMPING = 0.80;         // Friction damping coefficient

    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerClick = this.onPointerClick.bind(this);
    this.onResize = this.onResize.bind(this);
    this.animate = this.animate.bind(this);

    this.init();
  }

  init() {
    if (!this.container) return;

    // Build the interactive DOM structure
    this.buildDOM();

    // Cache initial bounds
    this.updateBounds();

    // Attach listeners
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    this.container.addEventListener('click', this.onPointerClick);
    window.addEventListener('resize', this.onResize, { passive: true });
    window.addEventListener('scroll', () => {
      if (window.scrollY < 30) this.updateBounds();
    }, { passive: true });
  }

  buildDOM() {
    this.container.innerHTML = '';
    this.particles = [];

    const nameWrapper = document.createElement('div');
    nameWrapper.className = 'ascii-name-block';
    nameWrapper.setAttribute('aria-label', 'SAM SUNNY');

    // 1. Build SAM
    const samGroup = document.createElement('div');
    samGroup.className = 'ascii-word-group ascii-word-sam';
    samGroup.setAttribute('aria-hidden', 'true');
    this.renderAsciiWord(samGroup, SAM_ASCII, 'sam');
    nameWrapper.appendChild(samGroup);

    // 2. Build SUNNY
    const sunnyGroup = document.createElement('div');
    sunnyGroup.className = 'ascii-word-group ascii-word-sunny';
    sunnyGroup.setAttribute('aria-hidden', 'true');
    this.renderAsciiWord(sunnyGroup, SUNNY_ASCII, 'sunny');
    nameWrapper.appendChild(sunnyGroup);

    this.container.appendChild(nameWrapper);
  }

  renderAsciiWord(groupElement, rows, wordId) {
    rows.forEach((rowText, rowIndex) => {
      const rowDiv = document.createElement('div');
      rowDiv.className = `ascii-row ascii-row-${rowIndex + 1}`;

      for (let i = 0; i < rowText.length; i++) {
        const char = rowText[i];
        const span = document.createElement('span');
        span.className = 'ascii-cell';
        span.dataset.char = char;

        if (char === ' ') {
          span.classList.add('ascii-space');
          span.innerHTML = '&nbsp;';
        } else {
          span.textContent = char;

          // Register in particle physics list
          this.particles.push({
            el: span,
            char: char,
            word: wordId,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            rot: 0,
            vrot: 0,
            cx: 0,
            cy: 0,
            isMoving: false
          });
        }
        rowDiv.appendChild(span);
      }
      groupElement.appendChild(rowDiv);
    });
  }

  updateBounds() {
    this.particles.forEach(p => {
      const r = p.el.getBoundingClientRect();
      p.cx = r.left + r.width / 2;
      p.cy = r.top + r.height / 2;
    });
  }

  onResize() {
    this.updateBounds();
  }

  onPointerMove(e) {
    // If scrolled past hero during space zoom, skip physics
    if (window.scrollY > window.innerHeight * 0.25) return;

    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    this.hasMoved = true;

    let activatedAny = false;
    const rSq = this.PROXIMITY_RADIUS * this.PROXIMITY_RADIUS;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      // Current center of particle in screen space
      const px = p.cx + p.x;
      const py = p.cy + p.y;
      const dx = px - this.mouseX;
      const dy = py - this.mouseY;
      const distSq = dx * dx + dy * dy;

      if (distSq < rSq && distSq > 0.1) {
        const dist = Math.sqrt(distSq);
        const power = Math.pow(1 - dist / this.PROXIMITY_RADIUS, 1.4) * this.BURST_FORCE;
        const angle = Math.atan2(dy, dx);

        p.vx += Math.cos(angle) * power;
        p.vy += Math.sin(angle) * power;
        p.vrot += (Math.random() - 0.5) * power * 1.5;
        p.isMoving = true;
        activatedAny = true;
      }
    }

    if (activatedAny && !this.isSimulating) {
      this.startSimulation();
    }
  }

  onPointerClick(e) {
    const mx = e.clientX;
    const my = e.clientY;
    const rSq = this.CLICK_RADIUS * this.CLICK_RADIUS;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const px = p.cx + p.x;
      const py = p.cy + p.y;
      const dx = px - mx;
      const dy = py - my;
      const distSq = dx * dx + dy * dy;

      if (distSq < rSq && distSq > 0.1) {
        const dist = Math.sqrt(distSq);
        const power = Math.pow(1 - dist / this.CLICK_RADIUS, 1.1) * this.CLICK_FORCE;
        const angle = Math.atan2(dy, dx);

        p.vx += Math.cos(angle) * power * (0.8 + Math.random() * 0.4);
        p.vy += Math.sin(angle) * power * (0.8 + Math.random() * 0.4);
        p.vrot += (Math.random() - 0.5) * power * 3;
        p.isMoving = true;
      }
    }

    this.startSimulation();
  }

  startSimulation() {
    if (this.isSimulating) return;
    this.isSimulating = true;
    this.animFrameId = requestAnimationFrame(this.animate);
  }

  animate() {
    let stillMoving = false;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      if (!p.isMoving) continue;

      // Spring force toward origin (0, 0)
      const fx = -p.x * this.SPRING_K;
      const fy = -p.y * this.SPRING_K;
      const frot = -p.rot * (this.SPRING_K * 0.85);

      // Integration with friction/damping
      p.vx = (p.vx + fx) * this.DAMPING;
      p.vy = (p.vy + fy) * this.DAMPING;
      p.vrot = (p.vrot + frot) * this.DAMPING;

      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vrot;

      // Settling check
      if (
        Math.abs(p.x) < 0.15 &&
        Math.abs(p.y) < 0.15 &&
        Math.abs(p.vx) < 0.08 &&
        Math.abs(p.vy) < 0.08 &&
        Math.abs(p.rot) < 0.15
      ) {
        p.x = 0;
        p.y = 0;
        p.rot = 0;
        p.vx = 0;
        p.vy = 0;
        p.vrot = 0;
        p.isMoving = false;
        p.el.style.transform = '';
      } else {
        p.el.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0) rotate(${p.rot.toFixed(1)}deg)`;
        stillMoving = true;
      }
    }

    if (stillMoving) {
      this.animFrameId = requestAnimationFrame(this.animate);
    } else {
      this.isSimulating = false;
      this.animFrameId = null;
    }
  }

  destroy() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
    window.removeEventListener('pointermove', this.onPointerMove);
    this.container.removeEventListener('click', this.onPointerClick);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onResize);
  }
}

let activeInstance = null;

/**
 * Initialize ASCII Block Burst Engine on target container
 */
export function initHeroAsciiBurst() {
  const container = document.getElementById('shuffle-hero-name');
  if (!container) return;

  // Clear any existing font shuffle interval from memory
  if (typeof window !== 'undefined' && window.stopContinuousFontLoop) {
    window.stopContinuousFontLoop();
  }

  if (activeInstance) {
    activeInstance.destroy();
  }

  activeInstance = new AsciiBurstEngine(container);
  return activeInstance;
}

// Auto-trigger if container is present
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroAsciiBurst);
  } else {
    initHeroAsciiBurst();
  }
}
