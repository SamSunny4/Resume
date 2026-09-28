/**
 * CREDENTIALS INFINITY STONES ENGINE
 * ----------------------------------
 * Certificate cards fly in from offscreen at high velocity,
 * decelerate with spring-damped easing, and settle into a gentle
 * orbital float — like infinity stones assembling around a gauntlet.
 *
 * Each card has:
 * - A random entry vector (angle + speed)
 * - Spring-physics deceleration to its target grid position
 * - Subtle idle floating drift once settled
 * - Glassmorphism HUD styling with accent glow
 */

const CERTIFICATES = [
  {
    id: 'national-hackathon',
    title: 'National AI 2nd Prize',
    subtitle: 'AI SAMASYA Hackathon',
    org: 'MITS Kochi · Jan 2026',
    accent: '#D2FF00',
    image: 'assets/certificates/nationalhackathon.jpg',
    badge: '🥈 NATIONAL 2ND',
  },
  {
    id: 'isro-hackathon',
    title: 'Bharatiya Antariksh Hackathon',
    subtitle: 'ISRO Space Challenge',
    org: 'ISRO · Hack2Skill 2025',
    accent: '#00F0FF',
    image: 'assets/certificates/isrohackathon.png',
    badge: '🚀 ISRO',
  },
  {
    id: 'nptel',
    title: 'NPTEL Certification',
    subtitle: 'Advanced Computing',
    org: 'IIT · NPTEL Platform',
    accent: '#A855F7',
    image: 'assets/certificates/nptel.png',
    badge: '📜 CERTIFIED',
  },
  {
    id: 'energya-hackathon',
    title: 'Energya Hackathon',
    subtitle: 'Innovation Challenge',
    org: 'Energya · 2025',
    accent: '#FF9900',
    image: 'assets/certificates/Eneryahackathon.png',
    badge: '⚡ HACKATHON',
  },
  {
    id: 'mern-stack',
    title: 'MERN Stack Certification',
    subtitle: 'Full-Stack Development',
    org: 'Professional Training',
    accent: '#38BDF8',
    image: 'assets/certificates/mernstack.jpg',
    badge: '🛠️ FULL-STACK',
  },
  {
    id: 'program-rep',
    title: 'Program Representative',
    subtitle: 'College Union CS(AI)',
    org: 'MITS Kochi · 2025-2026',
    accent: '#EC4899',
    image: 'assets/certificates/programrep.jpg',
    badge: '🎓 LEADERSHIP',
  },
  {
    id: 'linguaskill',
    title: 'Cambridge Linguaskill',
    subtitle: 'English Proficiency',
    org: 'Cambridge Assessment',
    accent: '#22C55E',
    image: 'assets/certificates/liguaskill.PDF',
    badge: '🌐 LANGUAGE',
  },
];

export class CredentialsStonesEngine {
  constructor() {
    this.section = document.getElementById('credentials');
    if (!this.section) return;

    this.container = null;
    this.cards = [];
    this.isTriggered = false;
    this.isSettled = false;
    this.animId = null;
    this.time = 0;

    this.init();
  }

  init() {
    this.buildDOM();
    this.animate = this.animate.bind(this);
  }

  buildDOM() {
    // Build celestial stage inside credentials layer
    this.section.innerHTML = `
      <div class="credentials-stage-wrapper" id="credentials-stage">
        <!-- Celestial Singularity Core -->
        <div class="credentials-singularity" aria-hidden="true"></div>

        <!-- Cosmic Header -->
        <div class="cred-stones-header">
          <span class="font-mono text-lime" style="font-size: var(--font-size-xs); letter-spacing: 0.14em;">// CELESTIAL HONORS · VERIFIED CREDENTIALS &amp; AWARDS</span>
          <h2 class="cred-stones-title font-display">CREDENTIALS MATRIX</h2>
          <p class="font-mono text-muted" style="font-size: 0.72rem; margin-top: 0.25rem; letter-spacing: 0.05em;">07 ARTIFACT STONES ASSEMBLED VIA SPACE JOURNEY · CLICK TO INSPECT</p>
        </div>

        <!-- Floating Stones Stage -->
        <div class="cred-stones-stage" id="cred-stones-stage">
          <div class="cred-stones-grid" id="cred-stones-grid"></div>
        </div>

        <!-- Navigation HUD -->
        <div class="stage-nav-hud">
          <button id="cred-return-projects-btn" class="stage-nav-btn font-mono" title="Return to flagship projects">⤾ RETURN TO PROJECTS</button>
          <a href="#contact" class="stage-nav-btn font-mono text-lime" title="Proceed to communication protocol">INITIATE CONTACT PROTOCOL ↓</a>
        </div>
      </div>

      <!-- Lightbox Modal -->
      <div class="cred-stones-lightbox" id="cred-lightbox" aria-hidden="true">
        <div class="cred-lightbox-backdrop" id="cred-lightbox-backdrop"></div>
        <div class="cred-lightbox-content" id="cred-lightbox-content">
          <img src="" alt="" class="cred-lightbox-img" id="cred-lightbox-img" />
          <button class="cred-lightbox-close font-mono" id="cred-lightbox-close">✕ CLOSE</button>
        </div>
      </div>
    `;

    this.container = document.getElementById('cred-stones-grid');
    this.lightbox = document.getElementById('cred-lightbox');
    this.lightboxImg = document.getElementById('cred-lightbox-img');
    this.lightboxBackdrop = document.getElementById('cred-lightbox-backdrop');
    this.lightboxClose = document.getElementById('cred-lightbox-close');

    // Return to Projects button
    const returnProjectsBtn = document.getElementById('cred-return-projects-btn');
    if (returnProjectsBtn) {
      returnProjectsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.AppState?.techSolar) window.AppState.techSolar.triggerProjectsZoom();
        else if (window.AppState?.projectSolar) window.AppState.projectSolar.triggerProjectsZoom();
      });
    }

    // Lightbox events
    if (this.lightboxClose) {
      this.lightboxClose.addEventListener('click', () => this.closeLightbox());
    }
    if (this.lightboxBackdrop) {
      this.lightboxBackdrop.addEventListener('click', () => this.closeLightbox());
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.lightbox?.classList.contains('is-open')) {
        this.closeLightbox();
      }
    });

    // Build card elements
    const gridEl = this.container;
    const stageRect = document.getElementById('cred-stones-stage');

    CERTIFICATES.forEach((cert, index) => {
      const el = document.createElement('div');
      el.className = 'cred-stone-card';
      el.dataset.id = cert.id;
      el.style.setProperty('--stone-accent', cert.accent);

      // Determine if image is viewable (not PDF)
      const isPDF = cert.image.toLowerCase().endsWith('.pdf');

      el.innerHTML = `
        <div class="stone-card-inner">
          <div class="stone-card-badge font-mono">${cert.badge}</div>
          ${!isPDF ? `<div class="stone-card-thumb">
            <img src="${cert.image}" alt="${cert.title}" loading="lazy" />
          </div>` : `<div class="stone-card-thumb stone-card-thumb-pdf">
            <div class="stone-pdf-placeholder font-mono">📄 PDF</div>
          </div>`}
          <div class="stone-card-info">
            <h3 class="stone-card-title font-display">${cert.title}</h3>
            <p class="stone-card-subtitle font-mono">${cert.subtitle}</p>
            <p class="stone-card-org font-mono">${cert.org}</p>
          </div>
        </div>
      `;

      // Click to open lightbox (or new tab for PDF)
      el.style.cursor = 'pointer';
      if (!isPDF) {
        el.addEventListener('click', () => this.openLightbox(cert));
      } else {
        el.addEventListener('click', () => window.open(cert.image, '_blank'));
      }

      gridEl.appendChild(el);

      // Random entry vector — each card flies from a random direction
      const entryAngle = (index / CERTIFICATES.length) * Math.PI * 2 + (Math.random() - 0.5) * 0.8;
      const entryDistance = 1200 + Math.random() * 800;
      const entryDelay = index * 120; // stagger

      this.cards.push({
        el,
        cert,
        index,
        // Physics state
        currentX: Math.cos(entryAngle) * entryDistance,
        currentY: Math.sin(entryAngle) * entryDistance,
        currentRotate: (Math.random() - 0.5) * 180,
        currentScale: 0.3 + Math.random() * 0.3,
        currentOpacity: 0,
        // Target = grid position (0,0 relative — CSS handles layout)
        targetX: 0,
        targetY: 0,
        targetRotate: 0,
        targetScale: 1,
        targetOpacity: 1,
        // Velocities
        vx: 0,
        vy: 0,
        vr: 0,
        vs: 0,
        vo: 0,
        // Spring constants (slightly varied per card for organic feel)
        spring: 0.035 + Math.random() * 0.025,
        damping: 0.82 + Math.random() * 0.06,
        // Timing
        delay: entryDelay,
        elapsed: 0,
        isActive: false,
        isSettled: false,
        // Idle float
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 0.008 + Math.random() * 0.006,
        floatAmpX: 3 + Math.random() * 4,
        floatAmpY: 2 + Math.random() * 3,
      });
    });
  }

  trigger(forceReset = false) {
    if (this.isTriggered && !forceReset) return;
    this.isTriggered = true;
    this.isSettled = false;
    this.time = 0;

    // Reset physics vectors if re-triggered or starting fresh
    this.cards.forEach((card, index) => {
      const entryAngle = (index / CERTIFICATES.length) * Math.PI * 2 + (Math.random() - 0.5) * 0.8;
      const entryDistance = 1200 + Math.random() * 800;
      card.currentX = Math.cos(entryAngle) * entryDistance;
      card.currentY = Math.sin(entryAngle) * entryDistance;
      card.currentRotate = (Math.random() - 0.5) * 180;
      card.currentScale = 0.3 + Math.random() * 0.3;
      card.currentOpacity = 0;
      card.vx = 0;
      card.vy = 0;
      card.vr = 0;
      card.vs = 0;
      card.vo = 0;
      card.elapsed = 0;
      card.isActive = false;
      card.isSettled = false;
      card.el.style.willChange = 'transform, opacity';
      card.el.classList.remove('is-settled');
      card.el.classList.add('is-entering');
    });

    if (this.animId) cancelAnimationFrame(this.animId);
    this.animId = requestAnimationFrame(this.animate);
  }

  animate() {
    this.time += 16.67; // ~60fps frame time
    let allSettled = true;

    this.cards.forEach((card) => {
      // Check delay
      if (this.time < card.delay) {
        // Still waiting — keep offscreen
        card.el.style.transform = `translate3d(${card.currentX}px, ${card.currentY}px, 0) rotate(${card.currentRotate}deg) scale(${card.currentScale})`;
        card.el.style.opacity = '0';
        allSettled = false;
        return;
      }

      if (!card.isActive) {
        card.isActive = true;
        card.elapsed = 0;
      }

      card.elapsed += 16.67;

      if (!card.isSettled) {
        // Spring physics: F = -k * x, v += F, v *= damping, x += v
        const dx = card.targetX - card.currentX;
        const dy = card.targetY - card.currentY;
        const dr = card.targetRotate - card.currentRotate;
        const ds = card.targetScale - card.currentScale;
        const dop = card.targetOpacity - card.currentOpacity;

        card.vx += dx * card.spring;
        card.vy += dy * card.spring;
        card.vr += dr * card.spring * 1.5;
        card.vs += ds * card.spring * 1.2;
        card.vo += dop * 0.08;

        card.vx *= card.damping;
        card.vy *= card.damping;
        card.vr *= card.damping;
        card.vs *= card.damping * 0.95;
        card.vo *= 0.88;

        card.currentX += card.vx;
        card.currentY += card.vy;
        card.currentRotate += card.vr;
        card.currentScale += card.vs;
        card.currentOpacity += card.vo;

        // Check if settled (all velocities near zero)
        const totalV = Math.abs(card.vx) + Math.abs(card.vy) + Math.abs(card.vr) + Math.abs(card.vs * 100);
        if (totalV < 0.15 && card.elapsed > 600) {
          card.isSettled = true;
          card.currentX = card.targetX;
          card.currentY = card.targetY;
          card.currentRotate = card.targetRotate;
          card.currentScale = card.targetScale;
          card.currentOpacity = card.targetOpacity;
          card.el.style.willChange = 'auto';
          card.el.classList.remove('is-entering');
          card.el.classList.add('is-settled');
        } else {
          allSettled = false;
        }
      }

      // Idle float after settling
      let floatX = 0;
      let floatY = 0;
      if (card.isSettled) {
        floatX = Math.sin(this.time * 0.001 * card.floatSpeed * 60 + card.floatPhase) * card.floatAmpX;
        floatY = Math.cos(this.time * 0.001 * card.floatSpeed * 60 + card.floatPhase * 1.3) * card.floatAmpY;
      }

      const finalX = card.currentX + floatX;
      const finalY = card.currentY + floatY;
      const finalOpacity = Math.min(1, Math.max(0, card.currentOpacity));

      card.el.style.transform = `translate3d(${finalX.toFixed(1)}px, ${finalY.toFixed(1)}px, 0) rotate(${card.currentRotate.toFixed(1)}deg) scale(${card.currentScale.toFixed(3)})`;
      card.el.style.opacity = finalOpacity.toFixed(3);
    });

    if (allSettled && !this.isSettled) {
      this.isSettled = true;
    }

    // Keep animating for idle float
    this.animId = requestAnimationFrame(this.animate);
  }

  openLightbox(cert) {
    if (!this.lightbox || !this.lightboxImg) return;
    this.lightboxImg.src = cert.image;
    this.lightboxImg.alt = cert.title;
    this.lightbox.classList.add('is-open');
    this.lightbox.setAttribute('aria-hidden', 'false');
  }

  closeLightbox() {
    if (!this.lightbox) return;
    this.lightbox.classList.remove('is-open');
    this.lightbox.setAttribute('aria-hidden', 'true');
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}

export function initCredentialsStones() {
  return new CredentialsStonesEngine();
}
