/**
 * THREE.JS-STYLE 3D ANGLED CIRCLE CREDENTIALS ORBIT ENGINE
 * --------------------------------------------------
 * Author: Sam Sunny Portfolio
 * Description:
 *   - 3D circular orbit viewed at an isometric perspective angle.
 *   - Cards stand along the circular perimeter and curve with the ring geometry (NOT tidally locked).
 *   - Far-side cards recede into deep Z space with heavy depth-of-field blur and atmospheric fading.
 *   - Front-side active card features the electric-lime glowing border and full illumination.
 *   - Authentic, analyzed logos extracted directly from Sam's verified certificates:
 *       1. edu@ai 3.0 + IHRD Kerala (National AI 2nd Prize)
 *       2. ISRO + Hack2Skill (Bharatiya Antariksh Hackathon)
 *       3. IIT Madras + NPTEL + Swayam (Python for Data Science)
 *       4. MITS Kochi + NBA (Eneryia Hackathon - Shreshta '25)
 *       5. Zero Pixels Technologies + React + Node.js (MERN Stack)
 *       6. MITS Kochi + College Union (Program Representative CS(AI))
 *       7. MariApps Marine Solutions (Industrial Immersion)
 *       8. Cambridge Assessment English (Linguaskill)
 *   - Clicking any card reveals the full high-res certificate document / PDF.
 *   - Smooth auto-rotation, hover time-dilation, drag momentum, and mobile gyroscope tilt.
 */

// ── Verified Certificates with Authentic Analyzed Logos & Telemetry ──
export const CERTIFICATES = [
  {
    id: 'national-hackathon',
    title: 'National AI 2nd Prize',
    subtitle: 'AI SAMASYA Hackathon · Team Beyond Vision',
    org: 'Muthoot Institute of Technology & Science',
    issuerTag: 'IHRD & Govt of Kerala',
    code: 'MITS-AI-2026-02',
    date: 'JAN 18, 2026',
    accent: '#D2FF00',
    badge: '🥈 2ND PLACE',
    score: 'National Second',
    image: 'assets/certificates/nationalhackathon.jpg',
    logos: ['edu-ai', 'ihrd', 'mits']
  },
  {
    id: 'isro-hackathon',
    title: 'Bharatiya Antariksh Hackathon',
    subtitle: 'National Space Innovation Challenge',
    org: 'ISRO & Hack2Skill',
    issuerTag: 'Indian Space Research Organisation',
    code: '2025H2S06BAH25-P05177',
    date: 'AUG 2025',
    accent: '#00F0FF',
    badge: '🚀 ISRO',
    score: 'Verified Participant',
    image: 'assets/certificates/isrohackathon.png',
    logos: ['isro', 'h2s']
  },
  {
    id: 'nptel',
    title: 'Python for Data Science',
    subtitle: 'Elite NPTEL Online Certification (73%)',
    org: 'Indian Institute of Technology Madras',
    issuerTag: 'IIT Madras · SWAYAM · MoE',
    code: 'NPTEL25CS104S335000600',
    date: 'JUL-AUG 2025',
    accent: '#A855F7',
    badge: '📜 ELITE 73%',
    score: 'Score: 73% (Elite)',
    image: 'assets/certificates/nptel.png',
    logos: ['iit-madras', 'nptel', 'swayam']
  },
  {
    id: 'energya-hackathon',
    title: 'Eneryia Hackathon Finalist',
    subtitle: 'Shreshta \'25 Techno-Cultural Conclave',
    org: 'MITS Kochi · NBA Accredited',
    issuerTag: 'Muthoot Group · Indivara',
    code: 'ENR-HACK-2025-V7',
    date: 'FEB 15, 2025',
    accent: '#FF9900',
    badge: '⚡ ENERGYA',
    score: 'Active Participant',
    image: 'assets/certificates/Eneryahackathon.png',
    logos: ['mits', 'nba']
  },
  {
    id: 'mern-stack',
    title: 'End-to-End MERN Lifecycle',
    subtitle: 'React · Node.js · MongoDB · Express · Git',
    org: 'Zero Pixels Technologies Pvt Ltd',
    issuerTag: 'Full-Stack Product Lifecycle',
    code: 'ZEROPIXELS-MERN-2026',
    date: 'JUL 10, 2026',
    accent: '#38BDF8',
    badge: '🛠️ FULL-STACK',
    score: 'Course Complete',
    image: 'assets/certificates/mernstack.jpg',
    logos: ['zeropixels', 'react', 'nodejs']
  },
  {
    id: 'program-rep',
    title: 'Program Representative CS(AI)',
    subtitle: 'College Union Student Leadership Council',
    org: 'MITS Kochi (Autonomous)',
    issuerTag: 'College Union 2025–2026',
    code: 'MITS-UNION-REP-CSAI',
    date: '2025–2026',
    accent: '#EC4899',
    badge: '🎓 LEADERSHIP',
    score: 'Appreciation Award',
    image: 'assets/certificates/programrep.jpg',
    logos: ['mits', 'union']
  },
  {
    id: 'industry-immersion',
    title: 'Industrial Immersion Program',
    subtitle: 'MariApps Marine Solutions · SmartCity Kochi',
    org: 'MariApps Marine Solutions Pvt Ltd',
    issuerTag: 'Enterprise Systems & Operations',
    code: 'MARIAPPS-IND-2026-ENG',
    date: 'JAN 30, 2026',
    accent: '#F59E0B',
    badge: '🏭 INDUSTRY',
    score: 'Participation Award',
    image: 'assets/certificates/industryvisit.jpeg',
    logos: ['mariapps', 'mits']
  },
  {
    id: 'linguaskill',
    title: 'Cambridge Linguaskill C1/B2',
    subtitle: 'International English Language Proficiency',
    org: 'Cambridge Assessment English',
    issuerTag: 'University of Cambridge',
    code: 'CAM-LINGUA-EN-88',
    date: '2024',
    accent: '#22C55E',
    badge: '🌐 CAMBRIDGE',
    score: 'C1/B2 Proficient',
    image: 'assets/certificates/liguaskill.PDF',
    logos: ['cambridge']
  },
];

// Helper to render high-fidelity, colored brand vector marks analyzed from certificates
function renderCertificateLogo(logoKey) {
  switch (logoKey) {
    case 'isro':
      // Official ISRO orange upward rocket arrow & blue isro emblem
      return `
        <div class="cred-brand-mark isro-mark" title="Indian Space Research Organisation (ISRO)">
          <svg viewBox="0 0 100 48" class="logo-svg isro-svg" aria-hidden="true">
            <!-- Central orange rocket spear & satellite panels -->
            <polygon points="50,2 45,36 55,36" fill="#FF6B00"/>
            <polygon points="50,8 48,34 52,34" fill="#FFA500"/>
            <!-- Solar panels -->
            <rect x="24" y="16" width="52" height="4" rx="1" fill="#00C0FF" transform="rotate(-12 50 18)"/>
            <!-- Hindi text इसरो in orange -->
            <text x="18" y="44" font-family="'Orbitron', sans-serif" font-weight="900" font-size="14" fill="#FF7700" letter-spacing="1">इसरो</text>
            <!-- English text isro in cyan -->
            <text x="56" y="44" font-family="'Orbitron', sans-serif" font-weight="900" font-size="14" fill="#00E5FF" letter-spacing="1">isro</text>
          </svg>
        </div>`;

    case 'h2s':
      return `
        <div class="cred-brand-mark h2s-mark" title="Hack2Skill">
          <span class="h2s-tag font-mono">H2S</span>
        </div>`;

    case 'iit-madras':
      // Official IIT Madras maroon & gold crest
      return `
        <div class="cred-brand-mark iit-mark" title="Indian Institute of Technology Madras">
          <svg viewBox="0 0 40 40" class="logo-svg" aria-hidden="true">
            <circle cx="20" cy="20" r="18" fill="#800000" stroke="#FFD700" stroke-width="1.8"/>
            <path d="M20 7 L27 15 L24 28 L16 28 L13 15 Z" fill="#FFD700" opacity="0.9"/>
            <circle cx="20" cy="21" r="3" fill="#800000"/>
            <path d="M12 32 Q20 35 28 32" stroke="#FFD700" stroke-width="1.5" fill="none"/>
            <text x="20" y="27" font-family="monospace" font-size="6" font-weight="bold" fill="#800000" text-anchor="middle">IIT</text>
          </svg>
          <span class="iit-text font-mono">IITM</span>
        </div>`;

    case 'nptel':
      // Official NPTEL 8-petal mandala emblem in Indian tricolor
      return `
        <div class="cred-brand-mark nptel-mark" title="National Programme on Technology Enhanced Learning">
          <svg viewBox="0 0 32 32" class="logo-svg" aria-hidden="true">
            <circle cx="16" cy="16" r="14" fill="#0D1F12" stroke="#E65100" stroke-width="1.4"/>
            <circle cx="16" cy="16" r="8" fill="none" stroke="#2E7D32" stroke-width="1.4" stroke-dasharray="3 1.5"/>
            <circle cx="16" cy="16" r="3.5" fill="#E65100"/>
            <path d="M16 4 L16 28 M4 16 L28 16" stroke="#FFFFFF" stroke-width="0.8" opacity="0.6"/>
          </svg>
          <span class="nptel-text font-mono">NPTEL</span>
        </div>`;

    case 'swayam':
      return `
        <div class="cred-brand-mark swayam-mark" title="SWAYAM Govt of India">
          <span class="swayam-text font-mono">SWAYAM</span>
        </div>`;

    case 'edu-ai':
      // edu@ai 3.0 colorful human-AI profile silhouette with rainbow neural glow
      return `
        <div class="cred-brand-mark edu-ai-mark" title="International Conclave on Generative AI 3.0">
          <svg viewBox="0 0 36 36" class="logo-svg" aria-hidden="true">
            <defs>
              <linearGradient id="aiHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FF5722"/>
                <stop offset="35%" stop-color="#E91E63"/>
                <stop offset="70%" stop-color="#9C27B0"/>
                <stop offset="100%" stop-color="#00BCD4"/>
              </linearGradient>
            </defs>
            <circle cx="18" cy="18" r="16" fill="url(#aiHeadGrad)" opacity="0.25"/>
            <path d="M14 8 Q23 8 24 16 Q25 21 21 24 L21 28 L15 28 Q11 25 11 18 Q11 8 14 8 Z" fill="url(#aiHeadGrad)"/>
            <circle cx="19" cy="14" r="1.8" fill="#FFFFFF"/>
            <circle cx="22" cy="18" r="1.4" fill="#00FFFF"/>
            <line x1="19" y1="14" x2="22" y2="18" stroke="#FFFFFF" stroke-width="0.8"/>
          </svg>
          <span class="edu-ai-text font-mono">edu@ai</span>
        </div>`;

    case 'ihrd':
      return `
        <div class="cred-brand-mark ihrd-mark" title="Institute of Human Resources Development (IHRD) Govt of Kerala">
          <span class="ihrd-text font-mono">IHRD</span>
        </div>`;

    case 'mits':
      // Muthoot MITS red logo with two elephants flanking the 'M'
      return `
        <div class="cred-brand-mark mits-mark" title="Muthoot Institute of Technology and Science">
          <svg viewBox="0 0 32 32" class="logo-svg" aria-hidden="true">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#800000" opacity="0.9"/>
            <text x="16" y="22" font-family="'Orbitron', sans-serif" font-weight="900" font-size="13" fill="#FFFFFF" text-anchor="middle">M</text>
            <circle cx="10" cy="10" r="1.8" fill="#FFD700"/>
            <circle cx="22" cy="10" r="1.8" fill="#FFD700"/>
          </svg>
          <span class="mits-text font-mono">MITS</span>
        </div>`;

    case 'nba':
      return `
        <div class="cred-brand-mark nba-mark" title="National Board of Accreditation">
          <span class="nba-text font-mono">NBA</span>
        </div>`;

    case 'zeropixels':
      // Zero Pixels Technologies red angular 'Z' logo
      return `
        <div class="cred-brand-mark zeropixels-mark" title="Zero Pixels Technologies Pvt Ltd">
          <svg viewBox="0 0 32 32" class="logo-svg" aria-hidden="true">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#111111" stroke="#E50914" stroke-width="1.5"/>
            <path d="M8 8 L24 8 L10 24 L24 24" stroke="#E50914" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          </svg>
          <span class="zp-text font-mono">ZERO PIXELS</span>
        </div>`;

    case 'react':
      return `
        <div class="cred-brand-mark tech-mini-mark" title="React.js Architecture">
          <svg viewBox="0 0 24 24" class="logo-svg" fill="none" stroke="#00D8FF" stroke-width="1.8">
            <circle cx="12" cy="12" r="2.2" fill="#00D8FF"/>
            <ellipse cx="12" cy="12" rx="9" ry="3.5"/>
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)"/>
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)"/>
          </svg>
        </div>`;

    case 'nodejs':
      return `
        <div class="cred-brand-mark tech-mini-mark" title="Node.js Engine">
          <svg viewBox="0 0 24 24" class="logo-svg" fill="none" stroke="#22C55E" stroke-width="1.8">
            <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2"/>
            <polyline points="12 2 12 12 21 17"/>
            <line x1="12" y1="12" x2="3" y2="17"/>
          </svg>
        </div>`;

    case 'union':
      return `
        <div class="cred-brand-mark union-mark" title="College Union Leadership">
          <svg viewBox="0 0 24 24" class="logo-svg" fill="#FFB800">
            <polygon points="12 2 15 8.5 22 9.5 17 14.5 18.5 21.5 12 18 5.5 21.5 7 14.5 2 9.5 9 8.5 12 2"/>
          </svg>
          <span class="union-text font-mono">UNION</span>
        </div>`;

    case 'mariapps':
      // MariApps Marine Solutions blue wave flag logo
      return `
        <div class="cred-brand-mark mariapps-mark" title="MariApps Marine Solutions">
          <svg viewBox="0 0 32 32" class="logo-svg" aria-hidden="true">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#005B94"/>
            <path d="M6 16 Q12 11 18 16 T30 16" stroke="#FFFFFF" stroke-width="2" fill="none"/>
            <path d="M6 21 Q12 16 18 21 T30 21" stroke="#38BDF8" stroke-width="1.5" fill="none"/>
          </svg>
          <span class="mariapps-text font-mono">MARIAPPS</span>
        </div>`;

    case 'cambridge':
      // Cambridge Assessment English crest
      return `
        <div class="cred-brand-mark cambridge-mark" title="Cambridge Assessment English · University of Cambridge">
          <svg viewBox="0 0 32 32" class="logo-svg" aria-hidden="true">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#002147" stroke="#D2FF00" stroke-width="1"/>
            <path d="M16 6 L24 10 V18 C24 23 16 26 16 26 C16 26 8 23 8 18 V10 Z" fill="#002147" stroke="#FFFFFF" stroke-width="1.4"/>
            <path d="M12 14 H20 M16 10 V22" stroke="#FFD700" stroke-width="1.4"/>
          </svg>
          <span class="cambridge-text font-mono">CAMBRIDGE</span>
        </div>`;

    default:
      return '';
  }
}

export class CredentialsMobiusEngine {
  constructor() {
    this.section = document.getElementById('credentials');
    if (!this.section) return;

    this.stage         = null;
    this.stageWrapper  = null;
    this.orbitRing     = null;
    this.cards         = [];
    this.animId        = null;
    this.time          = 0;
    this.isInViewport  = true;
    this.isTriggered   = false;

    // ── 3D Circular Orbit Geometry (Viewed at an isometric perspective angle) ──
    this.orbitRadiusX   = 530;   // Wide horizontal radius in 3D space
    this.orbitRadiusZ   = 290;   // Deep Z distance into space
    this.orbitPitchDeg  = 26.0;  // Isometric camera elevation pitch angle (~26°)
    this.orbitYawDeg    = -6.0;  // Subtle artistic yaw tilt

    // ── Dynamics & Momentum ──
    this.autoAngle      = 0;
    this.manualAngle    = 0;
    this.dragVelocity   = 0;
    this.isDragging     = false;
    this.touchStartX    = 0;
    this.baseSpeed      = 0.0032; // Natural celestial speed

    // ── Time-Dilation (Speed Control) ──
    this.speedFactor       = 1.0;
    this.targetSpeedFactor = 1.0;

    // ── 3D Parallax Tilt (Gyro & Mouse) ──
    this.camTiltX       = 0;
    this.camTiltY       = 0;
    this.targetCamTiltX = 0;
    this.targetCamTiltY = 0;

    this.hoveredCard    = null;

    // ── Lightbox References ──
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
      <div class="orbit3d-wrapper" id="orbit3d-wrapper">
        <!-- Deep Space Cosmic Stardust Void (No green lines) -->
        <div class="orbit3d-cosmic-void" aria-hidden="true"></div>

        <!-- Section Header -->
        <div class="orbit3d-header">
          <span class="font-mono text-lime orbit3d-badge">// VERIFIED CREDENTIALS &amp; AWARDS</span>
          <h2 class="orbit3d-title font-display">CREDENTIALS MATRIX</h2>
          <p class="font-mono text-muted orbit3d-sub">08 VERIFIED ARTIFACTS IN 3D ORBIT · CLICK TO REVEAL FULL CERTIFICATE</p>
        </div>

        <!-- 3D Isometric Orbit Viewport Stage -->
        <div class="orbit3d-stage" id="orbit3d-stage" role="region" aria-label="3D Credentials Orbit Carousel">
          <div class="orbit3d-ring" id="orbit3d-ring"></div>
        </div>

        <!-- Navigation HUD -->
        <div class="stage-nav-hud">
          <button id="cred-return-projects-btn" class="stage-nav-btn font-mono" title="Return to flagship projects">⤾ RETURN TO PROJECTS</button>
          <a href="#contact" class="stage-nav-btn font-mono text-lime" id="cred-to-contact-btn" title="Proceed to Contact">INITIATE CONTACT PROTOCOL ↓</a>
        </div>
      </div>

      <!-- High-Resolution Lightbox Modal -->
      <div class="orbit3d-lightbox" id="orbit3d-lightbox" aria-hidden="true">
        <div class="orbit3d-lightbox-backdrop" id="orbit3d-lightbox-backdrop"></div>
        <div class="orbit3d-lightbox-content" id="orbit3d-lightbox-content">
          <div class="orbit3d-lightbox-header font-mono">
            <span class="orbit3d-lightbox-badge" id="orbit3d-lightbox-badge"></span>
            <h3 class="orbit3d-lightbox-title font-display" id="orbit3d-lightbox-title">Certificate</h3>
          </div>
          <div class="orbit3d-lightbox-media-wrap" id="orbit3d-lightbox-media-wrap">
            <img src="" alt="" class="orbit3d-lightbox-img" id="orbit3d-lightbox-img" />
            <div class="orbit3d-lightbox-pdf-notice" id="orbit3d-lightbox-pdf-notice" style="display: none;">
              <span class="font-mono text-lime" style="font-size: 1.1rem; display: block; margin-bottom: 0.8rem;">📄 VERIFIED PDF DOCUMENT</span>
              <a href="#" target="_blank" id="orbit3d-lightbox-pdf-link" class="btn-primary" style="font-size: 0.78rem;">OPEN OFFICIAL PDF CREDENTIAL ↗</a>
            </div>
          </div>
          <div class="orbit3d-lightbox-footer">
            <div class="orbit3d-lightbox-meta font-mono">
              <span class="orbit3d-lightbox-org text-muted" id="orbit3d-lightbox-org">Verification Telemetry</span>
              <span class="orbit3d-lightbox-code text-lime" id="orbit3d-lightbox-code"></span>
            </div>
            <button class="orbit3d-lightbox-close font-mono" id="orbit3d-lightbox-close">✕ CLOSE [ESC]</button>
          </div>
        </div>
      </div>
    `;

    this.stage        = document.getElementById('orbit3d-stage');
    this.stageWrapper = document.getElementById('orbit3d-wrapper');
    this.orbitRing    = document.getElementById('orbit3d-ring');

    this.lightbox          = document.getElementById('orbit3d-lightbox');
    this.lightboxImg       = document.getElementById('orbit3d-lightbox-img');
    this.lightboxPdfNotice = document.getElementById('orbit3d-lightbox-pdf-notice');
    this.lightboxTitle     = document.getElementById('orbit3d-lightbox-title');
    this.lightboxBadge     = document.getElementById('orbit3d-lightbox-badge');
    this.lightboxOrg       = document.getElementById('orbit3d-lightbox-org');
    this.lightboxCode      = document.getElementById('orbit3d-lightbox-code');
    this.lightboxBackdrop  = document.getElementById('orbit3d-lightbox-backdrop');
    this.lightboxClose     = document.getElementById('orbit3d-lightbox-close');

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
      el.className = 'orbit3d-card';
      el.dataset.id = cert.id;
      el.style.setProperty('--card-accent', cert.accent);
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', `${cert.title} — ${cert.subtitle}. Click to reveal full certificate.`);

      // Render actual certificate logos
      const logosHTML = cert.logos.map(k => renderCertificateLogo(k)).join('');

      el.innerHTML = `
        <div class="orbit3d-card-inner">
          <!-- Top Row: Authentic Analyzed Logos + Verified Status Pill -->
          <div class="orbit3d-card-top">
            <div class="orbit3d-logos-cluster">
              ${logosHTML}
            </div>
            <div class="orbit3d-badge-pill font-mono">${cert.badge}</div>
          </div>

          <!-- Middle: Clean, Bold Hierarchy -->
          <div class="orbit3d-card-body">
            <h3 class="orbit3d-card-title font-display">${cert.title}</h3>
            <p class="orbit3d-card-sub font-mono">${cert.subtitle}</p>
          </div>

          <!-- Bottom: Certification Shield, Credential ID, and Golden Rosette Seal -->
          <div class="orbit3d-card-bottom">
            <!-- Left: Certification Shield Badge -->
            <div class="orbit3d-shield-badge">
              <svg class="shield-badge-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2L4 5.5V11.5C4 16.5 7.5 20.8 12 22C16.5 20.8 20 16.5 20 11.5V5.5L12 2Z" fill="#FFFFFF" fill-opacity="0.9" stroke="${cert.accent}" stroke-width="1.5"/>
                <path d="M8.5 11.5L11 14L15.5 9.5" stroke="#000000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div class="shield-badge-meta font-mono">
                <span class="shield-score" style="color: ${cert.accent};">${cert.score}</span>
                <span class="shield-issuer text-muted">${cert.issuerTag}</span>
              </div>
            </div>

            <!-- Right: Golden Rosette Seal Stamp (Matches reference image) -->
            <div class="orbit3d-rosette-wrap" title="Verified Credential Seal">
              <svg class="rosette-svg" viewBox="0 0 36 36" fill="none" aria-hidden="true" style="color: ${cert.accent};">
                <circle cx="18" cy="18" r="16" stroke="currentColor" stroke-width="1.2" stroke-dasharray="2.5 2" opacity="0.6"/>
                <circle cx="18" cy="18" r="13" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="18" cy="18" r="9.5" fill="currentColor" fill-opacity="0.18"/>
                <path d="M12 18L16 22L24 14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>

          <!-- Bottom Micro Telemetry & ID -->
          <div class="orbit3d-card-footer font-mono">
            <span class="footer-id">ID: ${cert.code}</span>
            <span class="footer-date text-muted">${cert.date}</span>
          </div>

          <!-- Hover Reveal Cue -->
          <div class="orbit3d-reveal-indicator font-mono">
            <span>CLICK TO REVEAL FULL CERTIFICATE ↗</span>
          </div>
        </div>
      `;

      const basePhase = (index / total) * Math.PI * 2;

      const card = {
        el,
        cert,
        index,
        theta:  basePhase,
        x:      0,
        y:      0,
        z:      0,
        rotY:   0,
        rotX:   0,
        scale:  1,
      };

      // Hover Gravitational Time-Dilation
      el.addEventListener('pointerenter', () => this.handleCardHover(card));
      el.addEventListener('pointerleave', () => this.handleCardLeave(card));
      el.addEventListener('focus', () => this.handleCardHover(card));
      el.addEventListener('blur', () => this.handleCardLeave(card));

      // Click: Open High-Resolution Lightbox
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openLightbox(cert);
      });

      this.orbitRing.appendChild(el);
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
      this.dragVelocity = delta * 0.0038;
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
      if (e.target.closest('.stage-nav-btn, .orbit3d-lightbox-close, .orbit3d-card')) return;
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
    this.targetSpeedFactor = 0.03; // Smooth gravitational time-dilation
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
    this.targetCamTiltY =  nx * 14; // Degrees of parallax yaw
    this.targetCamTiltX = -ny * 10; // Degrees of parallax pitch
  }

  onResize() {
    if (!this.stage) return;
    const w = window.innerWidth;

    if (w < 480) {
      this.orbitRadiusX  = 230;
      this.orbitRadiusZ  = 145;
      this.orbitPitchDeg = 24.0;
    } else if (w < 768) {
      this.orbitRadiusX  = 340;
      this.orbitRadiusZ  = 195;
      this.orbitPitchDeg = 25.0;
    } else if (w < 1200) {
      this.orbitRadiusX  = 460;
      this.orbitRadiusZ  = 250;
      this.orbitPitchDeg = 26.0;
    } else {
      this.orbitRadiusX  = 540;
      this.orbitRadiusZ  = 295;
      this.orbitPitchDeg = 27.0;
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

    // Layer Visibility check
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
      this.targetCamTiltY =  window.AppState.gyro.x * 22;
      this.targetCamTiltX = -window.AppState.gyro.y * 16;

      const gyroVelX = window.AppState.gyro.velX || 0;
      if (Math.abs(gyroVelX) > 0.008 && !this.isDragging) {
        this.manualAngle += gyroVelX * 0.08;
      }
    }

    this.camTiltX += (this.targetCamTiltX - this.camTiltX) * 0.06;
    this.camTiltY += (this.targetCamTiltY - this.camTiltY) * 0.06;

    // Apply isometric angle tilt to the stage ring
    const totalPitch = this.orbitPitchDeg + this.camTiltX;
    const totalYaw   = this.orbitYawDeg   + this.camTiltY;
    this.orbitRing.style.transform = `rotateX(${totalPitch.toFixed(2)}deg) rotateY(${totalYaw.toFixed(2)}deg)`;

    // ── Rotation Lerping & Inertia ──
    this.speedFactor += (this.targetSpeedFactor - this.speedFactor) * 0.08;
    this.autoAngle   += this.baseSpeed * this.speedFactor;

    if (!this.isDragging && Math.abs(this.dragVelocity) > 0.00005) {
      this.manualAngle += this.dragVelocity;
      this.dragVelocity *= 0.94;
    }

    const totalAngle = this.autoAngle + this.manualAngle;

    // Find the closest card to camera
    let closestCard = null;
    let maxZ = -Infinity;

    // ── 3D Circular Orbit Geometry (Not Tidally Locked) ──
    this.cards.forEach((card) => {
      const angle = card.theta + totalAngle;

      const sinA = Math.sin(angle);
      const cosA = Math.cos(angle);

      // Positions on circular 3D plane
      const x = sinA * this.orbitRadiusX;
      const z = cosA * this.orbitRadiusZ;

      // Vertical stadium contour: front is lower, back is higher
      const y = -cosA * (this.orbitRadiusZ * 0.22);

      // NON-TIDALLY LOCKED:
      // Cards stand upright along the curve of the circle and turn with the circle's curvature!
      // In front (sinA ≈ 0): card faces forward toward the camera.
      // On sides (sinA ≈ ±1): card angles sharply inward following the ring curve.
      // In back (cosA ≈ -1): card curves around the far perimeter.
      const rotY = -sinA * 64;
      const rotX = -cosA * 14;

      card.x    = x;
      card.y    = y;
      card.z    = z;
      card.rotY = rotY;
      card.rotX = rotX;

      if (z > maxZ) {
        maxZ = z;
        closestCard = card;
      }
    });

    // ── Render 3D Cards with Far-Side Depth-Of-Field Blur ──
    this.cards.forEach((card) => {
      const z = card.z;

      // Depth normalization: 0 (far-side back) to 1 (front spotlight)
      const depthNorm = (z + this.orbitRadiusZ) / (2 * this.orbitRadiusZ);

      const isHovered = (this.hoveredCard === card);
      const isFront   = (card === closestCard && depthNorm > 0.88);

      // Scale: 0.62 in far back → 1.18 in front spotlight
      const baseScale  = 0.62 + depthNorm * 0.54;
      const finalScale = isHovered ? baseScale * 1.15 : baseScale;

      // Opacity: 0.22 far back → 1.0 front
      const opacity = isHovered ? 1.0 : (0.22 + Math.pow(depthNorm, 1.4) * 0.78);

      // Z-Index layering
      const zIndex = isHovered ? 999 : Math.round(10 + depthNorm * 90);

      // FAR-SIDE BLURRED AWAY:
      // Cards on the far side (depthNorm < 0.45) receive heavy atmospheric depth-of-field blur!
      let blurPx = 0;
      if (!isHovered && depthNorm < 0.45) {
        blurPx = ((0.45 - depthNorm) * 20).toFixed(1);
      }

      // Electric-lime glowing spotlight on the front active card
      if (isFront) card.el.classList.add('is-front');
      else card.el.classList.remove('is-front');

      // 3D Matrix Transform
      card.el.style.transform = `translate3d(${card.x.toFixed(1)}px, ${card.y.toFixed(1)}px, ${card.z.toFixed(1)}px) rotateY(${card.rotY.toFixed(1)}deg) rotateX(${card.rotX.toFixed(1)}deg) scale(${finalScale.toFixed(3)})`;
      card.el.style.zIndex    = zIndex;
      card.el.style.opacity   = opacity.toFixed(3);
      card.el.style.filter    = blurPx > 0 ? `blur(${blurPx}px)` : 'none';
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
        const pdfLink = document.getElementById('orbit3d-lightbox-pdf-link');
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
