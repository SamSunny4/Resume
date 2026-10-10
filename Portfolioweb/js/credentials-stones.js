/**
 * 3D ROUND CREDENTIALS ORBIT ENGINE
 * --------------------------------------------------
 * Author: Sam Sunny Portfolio
 * Description:
 *   - Sleek 3D Round Orbit Carousel inspired by obsidian-glass certification cards.
 *   - No central green lines — clean starry cosmos void.
 *   - Displays clean certificate info, verified brand pills, credentials IDs,
 *     and gold/lime rosette seals directly on the card face.
 *   - True 3D round orbit curvature with tangent-curved card orientation.
 *   - Front active card highlighted with radiant electric-lime neon contour.
 *   - Clicking any card opens the high-resolution lightbox revealing the full document.
 *   - Smooth continuous auto-rotation with time-dilation on hover.
 *   - Touch / drag inertia and mobile gyroscope 3D parallax tilt.
 */

export const CERTIFICATES = [
  {
    id: 'national-hackathon',
    title: 'National AI 2nd Prize',
    subtitle: 'AI SAMASYA Hackathon · Beyond Vision',
    org: 'MITS Kochi & IHRD',
    code: 'MITS-AI-2026-02',
    date: 'JAN 2026',
    accent: '#D2FF00',
    badge: '🥈 2ND PRIZE',
    image: 'assets/certificates/nationalhackathon.jpg',
    brands: [
      { name: 'MITS', icon: 'shield', color: '#D2FF00' },
      { name: 'IHRD', icon: 'cpu', color: '#00F0FF' }
    ]
  },
  {
    id: 'isro-hackathon',
    title: 'Bharatiya Antariksh Hackathon',
    subtitle: 'Space Challenge · National Finalist',
    org: 'ISRO & Hack2Skill',
    code: '2025H2S06BAH25-P05177',
    date: 'AUG 2025',
    accent: '#00F0FF',
    badge: '🚀 ISRO',
    image: 'assets/certificates/isrohackathon.png',
    brands: [
      { name: 'ISRO', icon: 'rocket', color: '#FF9900' },
      { name: 'H2S', icon: 'orbit', color: '#00F0FF' }
    ]
  },
  {
    id: 'nptel',
    title: 'NPTEL Advanced Computing',
    subtitle: 'Elite Academic Certification',
    org: 'IIT Madras & NPTEL Swayam',
    code: 'NPTEL25CS-AI892',
    date: '2025',
    accent: '#A855F7',
    badge: '📜 IIT ELITE',
    image: 'assets/certificates/nptel.png',
    brands: [
      { name: 'IIT', icon: 'award', color: '#A855F7' },
      { name: 'NPTEL', icon: 'check', color: '#D2FF00' }
    ]
  },
  {
    id: 'energya-hackathon',
    title: 'Energya Hackathon Finalist',
    subtitle: 'Clean Energy & Applied Computing',
    org: 'Energya Innovation Platform',
    code: 'ENR-HACK-2025-V7',
    date: '2025',
    accent: '#FF9900',
    badge: '⚡ ENERGYA',
    image: 'assets/certificates/Eneryahackathon.png',
    brands: [
      { name: 'ENERGYA', icon: 'bolt', color: '#FF9900' },
      { name: 'INNO', icon: 'spark', color: '#D2FF00' }
    ]
  },
  {
    id: 'mern-stack',
    title: 'Full-Stack MERN Architecture',
    subtitle: 'React · Node.js · MongoDB · Express',
    org: 'Professional Certification Program',
    code: 'MERN-DEV-FS-9421',
    date: '2025',
    accent: '#38BDF8',
    badge: '🛠️ FULL-STACK',
    image: 'assets/certificates/mernstack.jpg',
    brands: [
      { name: 'React', icon: 'atom', color: '#38BDF8' },
      { name: 'Node.js', icon: 'code', color: '#22C55E' }
    ]
  },
  {
    id: 'program-rep',
    title: 'Program Representative CS(AI)',
    subtitle: 'College Union Student Leadership',
    org: 'MITS Kochi · College Union',
    code: 'MITS-UNION-REP-CSAI',
    date: '2025–2026',
    accent: '#EC4899',
    badge: '🎓 LEADERSHIP',
    image: 'assets/certificates/programrep.jpg',
    brands: [
      { name: 'MITS', icon: 'shield', color: '#EC4899' },
      { name: 'Union', icon: 'star', color: '#F59E0B' }
    ]
  },
  {
    id: 'industry-immersion',
    title: 'Industrial Immersion Program',
    subtitle: 'Enterprise Systems & Applied Exposure',
    org: 'Academic & Industry Program',
    code: 'IND-IMM-2024-ENG',
    date: '2024–2025',
    accent: '#F59E0B',
    badge: '🏭 INDUSTRY',
    image: 'assets/certificates/industryvisit.jpeg',
    brands: [
      { name: 'Industry', icon: 'gear', color: '#F59E0B' },
      { name: 'Systems', icon: 'server', color: '#00F0FF' }
    ]
  },
  {
    id: 'linguaskill',
    title: 'Cambridge Linguaskill C1/B2',
    subtitle: 'International English Proficiency',
    org: 'Cambridge Assessment English',
    code: 'CAM-LINGUA-EN-88',
    date: '2024',
    accent: '#22C55E',
    badge: '🌐 CAMBRIDGE',
    image: 'assets/certificates/liguaskill.PDF',
    brands: [
      { name: 'Cambridge', icon: 'globe', color: '#22C55E' },
      { name: 'English', icon: 'award', color: '#38BDF8' }
    ]
  },
];

// Helper to return mini vector icons for brand pills
function getBrandIconSVG(iconName, color = 'currentColor') {
  switch (iconName) {
    case 'rocket':
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>`;
    case 'shield':
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
    case 'cpu':
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>`;
    case 'orbit':
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-30 12 12)"/></svg>`;
    case 'award':
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`;
    case 'bolt':
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
    case 'spark':
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"/></svg>`;
    case 'atom':
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="9" ry="3.5"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)"/></svg>`;
    case 'code':
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
    case 'star':
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    case 'gear':
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;
    case 'globe':
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
    default:
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>`;
  }
}

export class CredentialsMobiusEngine {
  constructor() {
    this.section = document.getElementById('credentials');
    if (!this.section) return;

    this.stage         = null;
    this.ringContainer = null;
    this.cards         = [];
    this.animId        = null;
    this.time          = 0;
    this.isInViewport  = true;
    this.isTriggered   = false;

    // ── 3D Orbit Dimensions ──
    this.radiusX    = 460;   // Horizontal radius of the round 3D orbit
    this.radiusZ    = 240;   // Depth radius of the round 3D orbit
    this.tiltY      = 35;    // Vertical pitch tilt factor
    this.scaleRatio = 1.0;

    // ── Rotation State ──
    this.autoAngle    = 0;
    this.manualAngle  = 0;
    this.dragVelocity = 0;
    this.isDragging   = false;
    this.touchStartX  = 0;
    this.baseSpeed    = 0.0035;

    // ── Speed Control ──
    this.speedFactor       = 1.0;
    this.targetSpeedFactor = 1.0;

    // ── Parallax Camera Tilt ──
    this.camPitch       = 0;
    this.camYaw         = 0;
    this.targetCamPitch = 0;
    this.targetCamYaw   = 0;

    this.hoveredCard = null;

    // ── Lightbox ──
    this.lightbox          = null;
    this.lightboxImg       = null;
    this.lightboxPdfNotice = null;
    this.lightboxTitle     = null;
    this.lightboxBadge     = null;
    this.lightboxOrg       = null;
    this.lightboxCode      = null;
    this.lightboxBackdrop  = null;
    this.lightboxClose     = null;

    this.animate       = this.animate.bind(this);
    this.onResize      = this.onResize.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);

    this.init();
  }

  init() {
    this.buildDOM();
    this.onResize();
    this.setupListeners();
    this.setupIntersectionObserver();
    this.animId = requestAnimationFrame(this.animate);
  }

  buildDOM() {
    this.section.innerHTML = `
      <div class="cred-round-wrapper" id="cred-round-wrapper">
        <!-- Cosmic Ambient Backdrop (No center green lines) -->
        <div class="cred-ambient-depth" aria-hidden="true"></div>

        <!-- Section Header -->
        <div class="cred-round-header">
          <span class="font-mono text-lime cred-header-badge">// VERIFIED CREDENTIALS &amp; AWARDS</span>
          <h2 class="cred-round-title font-display">CREDENTIALS MATRIX</h2>
          <p class="font-mono text-muted cred-header-sub">08 VERIFIED ARTIFACTS IN 3D ORBIT · CLICK TO REVEAL FULL DOCUMENT</p>
        </div>

        <!-- 3D Round Orbit Stage -->
        <div class="cred-round-stage" id="cred-round-stage" role="region" aria-label="3D Credentials Orbit Carousel">
          <div class="cred-round-ring" id="cred-round-ring"></div>
        </div>

        <!-- Navigation HUD -->
        <div class="stage-nav-hud">
          <button id="cred-return-projects-btn" class="stage-nav-btn font-mono" title="Return to flagship projects">⤾ RETURN TO PROJECTS</button>
          <a href="#contact" class="stage-nav-btn font-mono text-lime" id="cred-to-contact-btn" title="Proceed to Contact">INITIATE CONTACT PROTOCOL ↓</a>
        </div>
      </div>

      <!-- High-Resolution Lightbox Modal -->
      <div class="cred-round-lightbox" id="cred-round-lightbox" aria-hidden="true">
        <div class="cred-lightbox-backdrop" id="cred-lightbox-backdrop"></div>
        <div class="cred-lightbox-content" id="cred-lightbox-content">
          <div class="cred-lightbox-header font-mono">
            <span class="cred-lightbox-badge" id="cred-lightbox-badge"></span>
            <h3 class="cred-lightbox-title font-display" id="cred-lightbox-title">Certificate</h3>
          </div>
          <div class="cred-lightbox-media-wrap" id="cred-lightbox-media-wrap">
            <img src="" alt="" class="cred-lightbox-img" id="cred-lightbox-img" />
            <div class="cred-lightbox-pdf-notice" id="cred-lightbox-pdf-notice" style="display: none;">
              <span class="font-mono text-lime" style="font-size: 1.1rem; display: block; margin-bottom: 0.8rem;">📄 VERIFIED PDF DOCUMENT</span>
              <a href="#" target="_blank" id="cred-lightbox-pdf-link" class="btn-primary" style="font-size: 0.78rem;">OPEN OFFICIAL PDF CREDENTIAL ↗</a>
            </div>
          </div>
          <div class="cred-lightbox-footer">
            <div class="cred-lightbox-meta font-mono">
              <span class="cred-lightbox-org text-muted" id="cred-lightbox-org">Verification Telemetry</span>
              <span class="cred-lightbox-code text-lime" id="cred-lightbox-code"></span>
            </div>
            <button class="cred-lightbox-close font-mono" id="cred-lightbox-close">✕ CLOSE [ESC]</button>
          </div>
        </div>
      </div>
    `;

    this.stage         = document.getElementById('cred-round-stage');
    this.ringContainer = document.getElementById('cred-round-ring');

    this.lightbox          = document.getElementById('cred-round-lightbox');
    this.lightboxImg       = document.getElementById('cred-lightbox-img');
    this.lightboxPdfNotice = document.getElementById('cred-lightbox-pdf-notice');
    this.lightboxTitle     = document.getElementById('cred-lightbox-title');
    this.lightboxBadge     = document.getElementById('cred-lightbox-badge');
    this.lightboxOrg       = document.getElementById('cred-lightbox-org');
    this.lightboxCode      = document.getElementById('cred-lightbox-code');
    this.lightboxBackdrop  = document.getElementById('cred-lightbox-backdrop');
    this.lightboxClose     = document.getElementById('cred-lightbox-close');

    this.buildCards();

    // Navigation Buttons
    const returnBtn = document.getElementById('cred-return-projects-btn');
    if (returnBtn) {
      returnBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.AppState?.techSolar) window.AppState.techSolar.triggerProjectsZoom();
        else if (window.AppState?.projectSolar) window.AppState.projectSolar.triggerProjectsZoom();
      });
    }

    const contactBtn = document.getElementById('cred-to-contact-btn');
    if (contactBtn) {
      contactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const cs = document.getElementById('contact');
        if (cs) {
          if (window.AppState?.lenis) window.AppState.lenis.scrollTo(cs, { duration: 1.8 });
          else cs.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

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
  }

  buildCards() {
    const total = CERTIFICATES.length;

    CERTIFICATES.forEach((cert, index) => {
      const el = document.createElement('div');
      el.className = 'cred-round-card';
      el.dataset.id = cert.id;
      el.style.setProperty('--card-accent', cert.accent);
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', `${cert.title} — ${cert.subtitle}. Click to reveal full certificate.`);

      // Render brand pill badges
      const brandPillsHTML = cert.brands.map(b => `
        <div class="cred-brand-pill" style="border-color: ${b.color}40;">
          ${getBrandIconSVG(b.icon, b.color)}
          <span class="cred-brand-text font-mono" style="color: ${b.color};">${b.name}</span>
        </div>
      `).join('');

      el.innerHTML = `
        <!-- Card Glass Sheen & Holographic Rim -->
        <div class="cred-card-sheen" aria-hidden="true"></div>

        <div class="cred-card-inner">
          <!-- Top Row: Logos & Verified Pill -->
          <div class="cred-card-top">
            <div class="cred-brands-row">
              ${brandPillsHTML}
            </div>
            <div class="cred-badge-pill font-mono">${cert.badge}</div>
          </div>

          <!-- Middle Row: Clean Typography -->
          <div class="cred-card-main">
            <h3 class="cred-card-title font-display">${cert.title}</h3>
            <p class="cred-card-sub font-mono">${cert.subtitle}</p>
          </div>

          <!-- Bottom Row: Verification Shield, ID, and Golden Rosette Seal -->
          <div class="cred-card-bottom">
            <div class="cred-shield-wrap">
              <svg class="cred-shield-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 2L3.5 5V9.5C3.5 14 6.5 17.5 10 18.5C13.5 17.5 16.5 14 16.5 9.5V5L10 2Z" stroke="${cert.accent}" stroke-width="1.4" fill="${cert.accent}" fill-opacity="0.14"/>
                <path d="M7 10L9 12L13 8" stroke="${cert.accent}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div class="cred-meta-block font-mono">
                <span class="cred-meta-id">${cert.code}</span>
                <span class="cred-meta-org">${cert.org}</span>
              </div>
            </div>

            <!-- Golden Rosette Certified Seal Icon -->
            <div class="cred-seal-wrap" title="Cryptographically Verified Credential">
              <svg class="cred-rosette-seal" viewBox="0 0 36 36" fill="none" aria-hidden="true" style="color: ${cert.accent};">
                <circle cx="18" cy="18" r="16" stroke="currentColor" stroke-width="1.2" stroke-dasharray="2 2" opacity="0.5"/>
                <circle cx="18" cy="18" r="13" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="18" cy="18" r="9.5" fill="currentColor" fill-opacity="0.16"/>
                <path d="M12.5 18L16.2 21.7L23.5 14.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>

          <!-- Click to reveal indicator banner -->
          <div class="cred-card-reveal-hint font-mono">
            <span>CLICK TO REVEAL CERTIFICATE ↗</span>
          </div>
        </div>
      `;

      const basePhase = (index / total) * Math.PI * 2;

      const card = {
        el,
        cert,
        index,
        theta:  basePhase,
        projX:  0,
        projY:  0,
        projZ:  0,
        rotY:   0,
        scale:  1,
      };

      // Hover Time-Dilation
      el.addEventListener('pointerenter', () => this.handleCardHover(card));
      el.addEventListener('pointerleave', () => this.handleCardLeave(card));
      el.addEventListener('focus', () => this.handleCardHover(card));
      el.addEventListener('blur', () => this.handleCardLeave(card));

      // Click: Reveal Full Certificate Lightbox
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openLightbox(cert);
      });

      this.ringContainer.appendChild(el);
      this.cards.push(card);
    });
  }

  setupListeners() {
    window.addEventListener('resize', this.onResize, { passive: true });
    window.addEventListener('mousemove', this.onPointerMove, { passive: true });

    if (!this.stage) return;

    const startDrag = (clientX) => {
      this.isDragging   = true;
      this.touchStartX  = clientX;
      this.dragVelocity = 0;
    };

    const moveDrag = (clientX) => {
      if (!this.isDragging) return;
      const delta = clientX - this.touchStartX;
      this.dragVelocity = delta * 0.0035;
      this.manualAngle += this.dragVelocity;
      this.touchStartX  = clientX;
    };

    const endDrag = () => { this.isDragging = false; };

    this.stage.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) startDrag(e.touches[0].clientX);
    }, { passive: true });
    this.stage.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) moveDrag(e.touches[0].clientX);
    }, { passive: true });
    this.stage.addEventListener('touchend', endDrag, { passive: true });
    this.stage.addEventListener('touchcancel', endDrag, { passive: true });

    this.stage.addEventListener('mousedown', (e) => {
      if (e.target.closest('.stage-nav-btn, .cred-lightbox-close, .cred-round-card')) return;
      startDrag(e.clientX);
    });
    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) moveDrag(e.clientX);
    }, { passive: true });
    window.addEventListener('mouseup', endDrag, { passive: true });
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => { this.isInViewport = entry.isIntersecting; });
      },
      { rootMargin: '100px 0px 100px 0px', threshold: 0.02 }
    );
    if (this.section) observer.observe(this.section);
  }

  handleCardHover(card) {
    this.hoveredCard = card;
    card.el.classList.add('is-hovered');
    this.targetSpeedFactor = 0.04; // Smooth time-dilation
  }

  handleCardLeave(card) {
    if (this.hoveredCard === card) this.hoveredCard = null;
    card.el.classList.remove('is-hovered');
    this.targetSpeedFactor = 1.0;
  }

  onPointerMove(e) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / cx));
    const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / cy));
    this.targetCamYaw   =  nx * 0.16;
    this.targetCamPitch = -ny * 0.12;
  }

  onResize() {
    if (!this.stage) return;
    const w = window.innerWidth;

    if (w < 480) {
      this.radiusX    = 210;
      this.radiusZ    = 130;
      this.tiltY      = 18;
      this.scaleRatio = 0.58;
    } else if (w < 768) {
      this.radiusX    = 300;
      this.radiusZ    = 170;
      this.tiltY      = 24;
      this.scaleRatio = 0.72;
    } else if (w < 1100) {
      this.radiusX    = 400;
      this.radiusZ    = 210;
      this.tiltY      = 30;
      this.scaleRatio = 0.88;
    } else {
      this.radiusX    = 480;
      this.radiusZ    = 250;
      this.tiltY      = 38;
      this.scaleRatio = 1.0;
    }
  }

  trigger(forceImmediate = false) {
    this.isTriggered  = true;
    this.isInViewport = true;
    this.onResize();
    this.speedFactor  = forceImmediate ? 1.6 : 1.35;
  }

  animate(timestamp) {
    this.time = timestamp || performance.now();

    // Viewport & Layer Visibility check
    const layer = this.section ? this.section.closest('.credentials-space-layer') : null;
    const isLayerHidden = layer && (
      layer.style.visibility === 'hidden' ||
      (layer.style.opacity !== '' && parseFloat(layer.style.opacity) < 0.02)
    );
    const p = window.AppState?.techSolar?.zoomProgress ?? 0;
    const isAway = (p > 0 && p < 0.60);

    if (isLayerHidden || isAway) {
      this.animId = requestAnimationFrame(this.animate);
      return;
    }

    // ── Parallax Camera Tilt (Gyro + Pointer) ──
    if (window.AppState?.gyro?.active) {
      this.targetCamYaw   =  window.AppState.gyro.x * 0.32;
      this.targetCamPitch = -window.AppState.gyro.y * 0.24;

      // Gyro tilt impulse imparts rotational spin
      const gyroVelX = window.AppState.gyro.velX || 0;
      if (Math.abs(gyroVelX) > 0.008 && !this.isDragging) {
        this.manualAngle += gyroVelX * 0.08;
      }
    }

    this.camYaw   += (this.targetCamYaw   - this.camYaw)   * 0.06;
    this.camPitch += (this.targetCamPitch - this.camPitch) * 0.06;

    // ── Rotation Lerping & Inertia ──
    this.speedFactor += (this.targetSpeedFactor - this.speedFactor) * 0.08;
    this.autoAngle   += this.baseSpeed * this.speedFactor;

    if (!this.isDragging && Math.abs(this.dragVelocity) > 0.00005) {
      this.manualAngle += this.dragVelocity;
      this.dragVelocity *= 0.94;
    }

    const totalAngle = this.autoAngle + this.manualAngle;

    // Find the closest card to the camera to assign .is-front highlight
    let closestCard = null;
    let maxZ = -Infinity;

    // ── Compute 3D Round Orbit Position & Orientation ──
    this.cards.forEach((card) => {
      const angle = card.theta + totalAngle;

      const sinA = Math.sin(angle);
      const cosA = Math.cos(angle);

      // Round 3D Orbit: X is width radius, Z is depth radius
      const x = sinA * this.radiusX;
      const z = cosA * this.radiusZ;

      // Subtle vertical stadium bowl tilt (front is slightly lower, back higher)
      const y = -cosA * this.tiltY + (sinA * this.camPitch * 40);

      // Tangent-aligned 3D rotation: cards curve along the circular perimeter
      // In the front (sinA ≈ 0), card faces forward.
      // On the sides (sinA ≈ ±1), card rotates inwards towards the center like the reference image.
      const rotY = -sinA * 50 + (this.camYaw * 20);
      const rotX = -cosA * 8  + (this.camPitch * 15);

      card.projX = x;
      card.projY = y;
      card.projZ = z;
      card.rotY  = rotY;

      if (z > maxZ) {
        maxZ = z;
        closestCard = card;
      }
    });

    // ── Apply Transforms & Depth-Sorting to Cards ──
    this.cards.forEach((card) => {
      const z = card.projZ;

      // Depth normalization: 0 (far back) to 1 (front)
      const depthNorm = (z + this.radiusZ) / (2 * this.radiusZ);

      // Scale: 0.65 (back) → 1.15 (front)
      const isHovered = (this.hoveredCard === card);
      const baseScale = 0.68 + depthNorm * 0.47;
      const finalScale = isHovered ? baseScale * 1.12 : baseScale;

      // Opacity: 0.38 (far back) → 1.0 (front)
      const opacity = isHovered ? 1.0 : (0.36 + Math.pow(depthNorm, 1.3) * 0.64);

      // Z-Index: cards in front layer above cards in back
      const zIndex = isHovered ? 999 : Math.round(20 + depthNorm * 60);

      // Depth-of-field blur for far-back cards
      const blur = (depthNorm < 0.3) ? ((0.3 - depthNorm) * 4.5).toFixed(1) : 0;

      // Is front highlight
      const isFront = (card === closestCard && depthNorm > 0.85);
      if (isFront) card.el.classList.add('is-front');
      else card.el.classList.remove('is-front');

      // CSS 3D transform
      card.el.style.transform = `translate3d(${card.projX.toFixed(1)}px, ${card.projY.toFixed(1)}px, ${card.projZ.toFixed(1)}px) rotateY(${card.rotY.toFixed(1)}deg) rotateX(${card.projY.toFixed(1) * 0.04}deg) scale(${finalScale.toFixed(3)})`;
      card.el.style.zIndex    = zIndex;
      card.el.style.opacity   = opacity.toFixed(3);
      card.el.style.filter    = blur > 0 ? `blur(${blur}px)` : 'none';
    });

    this.animId = requestAnimationFrame(this.animate);
  }

  /* ================================================================
   *  LIGHTBOX: CLICK TO REVEAL FULL CERTIFICATE
   * ================================================================ */

  openLightbox(cert) {
    if (!this.lightbox) return;

    const isPDF = cert.image.toLowerCase().endsWith('.pdf');

    if (this.lightboxImg && this.lightboxPdfNotice) {
      if (!isPDF) {
        this.lightboxImg.src           = cert.image;
        this.lightboxImg.alt           = cert.title;
        this.lightboxImg.style.display = 'block';
        this.lightboxPdfNotice.style.display = 'none';
      } else {
        this.lightboxImg.style.display = 'none';
        this.lightboxPdfNotice.style.display       = 'flex';
        this.lightboxPdfNotice.style.flexDirection = 'column';
        this.lightboxPdfNotice.style.alignItems    = 'center';
        this.lightboxPdfNotice.style.padding       = '3rem 2rem';
        const pdfLink = document.getElementById('cred-lightbox-pdf-link');
        if (pdfLink) pdfLink.href = cert.image;
      }
    }

    if (this.lightboxTitle) this.lightboxTitle.textContent = cert.title;
    if (this.lightboxBadge) {
      this.lightboxBadge.textContent    = cert.badge;
      this.lightboxBadge.style.color       = cert.accent;
      this.lightboxBadge.style.borderColor = cert.accent;
    }
    if (this.lightboxOrg)  this.lightboxOrg.textContent  = `${cert.subtitle} · ${cert.org}`;
    if (this.lightboxCode) this.lightboxCode.textContent = `ID: ${cert.code}`;

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
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onPointerMove);
  }
}

export function initCredentialsStones() {
  return new CredentialsMobiusEngine();
}
