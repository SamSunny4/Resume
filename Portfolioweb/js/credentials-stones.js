/**
 * CREDENTIALS INFINITY STONES ORBITAL MATRIX ENGINE
 * --------------------------------------------------
 * Author: Sam Sunny Portfolio
 * Description:
 *   - 08 verified honors & credentials cards revolve in 3D celestial orbits
 *     around the Credentials Core (Tidally locked spinning).
 *   - All certificate cards remain strictly FRONT-FACING to the camera (billboarded),
 *     guaranteeing crystal-clear legibility without angular 3D distortion.
 *   - Dual Canvas Dynamic Comet Trail Engine: each orbiting certificate card emits
 *     a slight, luminous celestial trailing ribbon and fine stardust sparks in its
 *     unique accent color, depth-sorted with back and front canvases.
 *   - Dynamic directional motion aura on DOM cards via CSS variables (--trail-vx, --trail-vy).
 *   - Gravitational Time-Dilation on card hover (orbit smoothly halts for inspection).
 *   - Interactive touch/drag momentum to manually revolve the orbital carousel.
 *   - Modal Lightbox with full-resolution certificate inspection.
 */

export const CERTIFICATES = [
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
    id: 'industry-immersion',
    title: 'Industrial Immersion',
    subtitle: 'Academic & Industry Program',
    org: 'MITS Kochi · 2024-2025',
    accent: '#F59E0B',
    image: 'assets/certificates/industryvisit.jpeg',
    badge: '🏭 INDUSTRY',
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

// Celestial Orbital Configuration for 8 Credentials Stones
const CRED_ORBIT = {
  radiusX: 430,
  radiusY: 195,
  tiltX: 0.32,   // ~18.3 deg pitch
  tiltY: -0.12,  // ~ -6.9 deg yaw
  tiltZ: 0.04,   // ~ 2.3 deg roll
  baseSpeed: 0.0055, // Majestic, smooth continuous orbital revolution
  wobbleAmp: 14,     // Subtle vertical harmonic float
};

export class CredentialsStonesEngine {
  constructor() {
    this.section = document.getElementById('credentials');
    if (!this.section) return;

    this.stage = null;
    this.canvasBack = null;
    this.canvasFront = null;
    this.ctxBack = null;
    this.ctxFront = null;
    this.orbitContainer = null;

    this.cards = [];
    this.sparks = [];
    this.hoveredCard = null;
    this.animId = null;
    this.time = 0;
    this.isInViewport = true;
    this.isTriggered = false;

    // Time-dilation speed factor (1.0 = normal, ~0.05 on card hover)
    this.speedFactor = 1.0;
    this.targetSpeedFactor = 1.0;

    // Canvas & Stage dimensions
    this.stageWidth = 1200;
    this.stageHeight = 620;
    this.scaleRatio = 1.0;

    // 3D Camera Parallax
    this.camRotX = 0;
    this.camRotY = 0;
    this.targetCamRotX = 0;
    this.targetCamRotY = 0;

    // Lightbox modal references
    this.lightbox = null;
    this.lightboxImg = null;
    this.lightboxPdfNotice = null;
    this.lightboxTitle = null;
    this.lightboxBadge = null;
    this.lightboxOrg = null;
    this.lightboxBackdrop = null;
    this.lightboxClose = null;

    // Touch & Mouse dragging support with smooth momentum
    this.isDragging = false;
    this.touchStartX = 0;
    this.dragVelocity = 0;
    this.manualOrbitOffset = 0;

    // Bind methods
    this.animate = this.animate.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);

    this.init();
  }

  init() {
    this.buildDOM();
    this.onResize();
    this.setupListeners();
    this.setupIntersectionObserver();

    // Start 60fps / 120fps render loop
    this.animId = requestAnimationFrame(this.animate);
  }

  buildDOM() {
    this.section.innerHTML = `
      <div class="credentials-stage-wrapper" id="credentials-stage-wrapper">
        <!-- Celestial Singularity Core Atmosphere Glow -->
        <div class="credentials-singularity" aria-hidden="true"></div>

        <!-- Cosmic Header -->
        <div class="cred-stones-header">
          <span class="font-mono text-lime cred-header-badge">// CELESTIAL HONORS · VERIFIED CREDENTIALS &amp; AWARDS</span>
          <h2 class="cred-stones-title font-display">CREDENTIALS MATRIX</h2>
          <p class="font-mono text-muted cred-header-sub">08 TIDALLY LOCKED ARTIFACT STONES IN SYNCHRONOUS ORBIT · CLICK TO INSPECT</p>
        </div>

        <!-- 3D Orbital Viewport Stage -->
        <div class="cred-stones-stage" id="cred-stones-stage">
          <!-- Background Dynamic Comet Trails Canvas (Behind Center Core & Back Cards) -->
          <canvas id="cred-trails-canvas-back" class="cred-trails-canvas cred-trails-canvas-back"></canvas>

          <!-- Central Celestial Core Marker -->
          <div class="cred-orbit-center" aria-hidden="true"></div>

          <!-- Orbiting Cards Container (Front-Facing Billboarded Cards) -->
          <div class="cred-orbit-container" id="cred-orbit-container"></div>

          <!-- Foreground Dynamic Comet Trails Canvas (Over Center Core, Under Front Cards) -->
          <canvas id="cred-trails-canvas-front" class="cred-trails-canvas cred-trails-canvas-front"></canvas>
        </div>

        <!-- Quick Jump Navigation HUD -->
        <div class="stage-nav-hud">
          <button id="cred-return-projects-btn" class="stage-nav-btn font-mono" title="Return to flagship projects">⤾ RETURN TO PROJECTS</button>
          <a href="#contact" class="stage-nav-btn font-mono text-lime" id="cred-to-contact-btn" title="Descend to Black Hole Singularity at end of website">DESCEND TO EVENT HORIZON: CONTACT SINGULARITY ↓</a>
        </div>
      </div>

      <!-- High-Resolution Lightbox Modal -->
      <div class="cred-stones-lightbox" id="cred-lightbox" aria-hidden="true">
        <div class="cred-lightbox-backdrop" id="cred-lightbox-backdrop"></div>
        <div class="cred-lightbox-content" id="cred-lightbox-content">
          <div class="cred-lightbox-header font-mono">
            <span class="cred-lightbox-badge" id="cred-lightbox-badge">🥈 NATIONAL 2ND</span>
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
            <span class="cred-lightbox-org font-mono text-muted" id="cred-lightbox-org">Verification Telemetry</span>
            <button class="cred-lightbox-close font-mono" id="cred-lightbox-close">✕ CLOSE [ESC]</button>
          </div>
        </div>
      </div>
    `;

    this.stage = document.getElementById('cred-stones-stage');
    this.canvasBack = document.getElementById('cred-trails-canvas-back');
    this.canvasFront = document.getElementById('cred-trails-canvas-front');
    this.ctxBack = this.canvasBack ? this.canvasBack.getContext('2d') : null;
    this.ctxFront = this.canvasFront ? this.canvasFront.getContext('2d') : null;
    this.orbitContainer = document.getElementById('cred-orbit-container');

    this.lightbox = document.getElementById('cred-lightbox');
    this.lightboxImg = document.getElementById('cred-lightbox-img');
    this.lightboxPdfNotice = document.getElementById('cred-lightbox-pdf-notice');
    this.lightboxTitle = document.getElementById('cred-lightbox-title');
    this.lightboxBadge = document.getElementById('cred-lightbox-badge');
    this.lightboxOrg = document.getElementById('cred-lightbox-org');
    this.lightboxBackdrop = document.getElementById('cred-lightbox-backdrop');
    this.lightboxClose = document.getElementById('cred-lightbox-close');

    // Build the 8 Orbiting Front-Facing Certificate Cards
    this.cards = [];
    const totalCerts = CERTIFICATES.length;

    CERTIFICATES.forEach((cert, index) => {
      const el = document.createElement('div');
      el.className = 'cred-stone-card';
      el.dataset.id = cert.id;
      el.style.setProperty('--stone-accent', cert.accent);
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', `${cert.title} — ${cert.subtitle}`);

      const isPDF = cert.image.toLowerCase().endsWith('.pdf');

      el.innerHTML = `
        <div class="stone-card-inner">
          <div class="stone-card-badge font-mono">${cert.badge}</div>
          ${!isPDF ? `
            <div class="stone-card-thumb">
              <img src="${cert.image}" alt="${cert.title}" loading="lazy" />
              <div class="stone-card-overlay font-mono">ENLARGE ↗</div>
            </div>
          ` : `
            <div class="stone-card-thumb stone-card-thumb-pdf">
              <div class="stone-pdf-placeholder font-mono">📄 VIEW PDF ↗</div>
            </div>
          `}
          <div class="stone-card-info">
            <h3 class="stone-card-title font-display">${cert.title}</h3>
            <p class="stone-card-subtitle font-mono">${cert.subtitle}</p>
            <p class="stone-card-org font-mono">${cert.org}</p>
          </div>
        </div>
      `;

      // Orbital phase evenly spaced around 360 degrees (tidally locked spinning)
      const basePhase = (index / totalCerts) * (Math.PI * 2);

      const card = {
        el,
        cert,
        index,
        theta: basePhase,
        speed: CRED_ORBIT.baseSpeed,
        trail: [], // Ring buffer of recent projected positions for comet tail
        projX: 0,
        projY: 0,
        projZ: 0,
        scale: 1,
        isFront: true,
        prevScreenX: undefined,
        prevScreenY: undefined,
      };

      // Card hover & focus listeners for Gravitational Time-Dilation
      el.addEventListener('pointerenter', () => this.handleCardHover(card));
      el.addEventListener('pointerleave', () => this.handleCardLeave(card));
      el.addEventListener('focus', () => this.handleCardHover(card));
      el.addEventListener('blur', () => this.handleCardLeave(card));

      // Click for inspection
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openLightbox(cert);
      });

      this.orbitContainer.appendChild(el);
      this.cards.push(card);
    });

    // Return to Projects button
    const returnProjectsBtn = document.getElementById('cred-return-projects-btn');
    if (returnProjectsBtn) {
      returnProjectsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.AppState?.techSolar) window.AppState.techSolar.triggerProjectsZoom();
        else if (window.AppState?.projectSolar) window.AppState.projectSolar.triggerProjectsZoom();
      });
    }

    // Direct descend to Contact button
    const toContactBtn = document.getElementById('cred-to-contact-btn');
    if (toContactBtn) {
      toContactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          if (window.AppState?.lenis) {
            window.AppState.lenis.scrollTo(contactSection, { duration: 1.8 });
          } else {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    }

    // Lightbox modal listeners
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

  setupListeners() {
    window.addEventListener('resize', this.onResize, { passive: true });
    window.addEventListener('mousemove', this.onPointerMove, { passive: true });

    // Touch and mouse dragging to rotate the orbit interactively
    if (this.stage) {
      const startDrag = (clientX) => {
        this.isDragging = true;
        this.touchStartX = clientX;
        this.dragVelocity = 0;
      };

      const moveDrag = (clientX) => {
        if (!this.isDragging) return;
        const deltaX = clientX - this.touchStartX;
        this.dragVelocity = deltaX * 0.0035;
        this.manualOrbitOffset += this.dragVelocity;
        this.touchStartX = clientX;
      };

      const endDrag = () => {
        this.isDragging = false;
      };

      this.stage.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) startDrag(e.touches[0].clientX);
      }, { passive: true });

      this.stage.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) moveDrag(e.touches[0].clientX);
      }, { passive: true });

      this.stage.addEventListener('touchend', endDrag, { passive: true });
      this.stage.addEventListener('touchcancel', endDrag, { passive: true });

      this.stage.addEventListener('mousedown', (e) => {
        if (e.target.closest('.stage-nav-btn, .cred-lightbox-close, .cred-stone-card')) return;
        startDrag(e.clientX);
      });

      window.addEventListener('mousemove', (e) => {
        if (this.isDragging) moveDrag(e.clientX);
      }, { passive: true });

      window.addEventListener('mouseup', endDrag, { passive: true });
    }
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isInViewport = entry.isIntersecting;
        });
      },
      { rootMargin: '120px 0px 120px 0px', threshold: 0.02 }
    );

    if (this.section) {
      observer.observe(this.section);
    }
  }

  handleCardHover(card) {
    this.hoveredCard = card;
    card.el.classList.add('is-hovered');
    // Gravitational Time-Dilation: smoothly slow orbit down for effortless clicking & inspection
    this.targetSpeedFactor = 0.05;
  }

  handleCardLeave(card) {
    if (this.hoveredCard === card) {
      this.hoveredCard = null;
    }
    card.el.classList.remove('is-hovered');
    this.targetSpeedFactor = 1.0;
  }

  onPointerMove(e) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / cx));
    const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / cy));

    this.targetCamRotY = nx * 0.22;
    this.targetCamRotX = -ny * 0.14;
  }

  onResize() {
    if (!this.stage) return;
    const rect = this.stage.getBoundingClientRect();
    this.stageWidth = rect.width || window.innerWidth;
    this.stageHeight = rect.height || (window.innerHeight * 0.65);

    const w = window.innerWidth;
    if (w < 600) {
      this.scaleRatio = 0.50;
    } else if (w < 900) {
      this.scaleRatio = 0.70;
    } else if (w < 1200) {
      this.scaleRatio = 0.86;
    } else {
      this.scaleRatio = Math.min(1.10, Math.max(0.92, w / 1440));
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    [this.canvasBack, this.canvasFront].forEach((canvas) => {
      if (!canvas) return;
      canvas.width = Math.floor(this.stageWidth * dpr);
      canvas.height = Math.floor(this.stageHeight * dpr);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    });
  }

  /**
   * 3D Rotation Math & Camera Perspective Projection Engine
   */
  project3D(x0, y0, z0, orbit, camX, camY) {
    // 1. Tilt X (pitch)
    const y1 = y0 * Math.cos(orbit.tiltX) - z0 * Math.sin(orbit.tiltX);
    const z1 = y0 * Math.sin(orbit.tiltX) + z0 * Math.cos(orbit.tiltX);
    const x1 = x0;

    // 2. Tilt Y (yaw)
    const x2 = x1 * Math.cos(orbit.tiltY) + z1 * Math.sin(orbit.tiltY);
    const z2 = -x1 * Math.sin(orbit.tiltY) + z1 * Math.cos(orbit.tiltY);
    const y2 = y1;

    // 3. Tilt Z (roll)
    const x3 = x2 * Math.cos(orbit.tiltZ) - y2 * Math.sin(orbit.tiltZ);
    const y3 = x2 * Math.sin(orbit.tiltZ) + y2 * Math.cos(orbit.tiltZ);
    const z3 = z2;

    // 4. Camera Parallax
    const cy = y3 * Math.cos(camX) - z3 * Math.sin(camX);
    const cz1 = y3 * Math.sin(camX) + z3 * Math.cos(camX);
    const cx = x3 * Math.cos(camY) + cz1 * Math.sin(camY);
    const cz2 = -x3 * Math.sin(camY) + cz1 * Math.cos(camY);

    // 5. Physically accurate Perspective projection:
    // cz2 > 0 is CLOSER to camera (larger scale, foreground)
    // cz2 < 0 is FARTHER from camera (smaller scale, background)
    const fov = 950;
    const perspective = fov / (fov - cz2);

    return {
      screenX: cx * perspective,
      screenY: cy * perspective,
      depthZ: cz2,
      scale: Math.max(0.78, Math.min(1.18, perspective)),
      isFront: cz2 >= 0,
    };
  }

  trigger(forceImmediate = false) {
    this.isTriggered = true;
    this.isInViewport = true;
    this.onResize();
    this.speedFactor = forceImmediate ? 1.6 : 1.35; // Brief surge upon entering via hyperspace
  }

  /**
   * Main Render Loop
   */
  animate(timestamp) {
    this.time = timestamp || performance.now();

    // Check layer visibility without layout thrashing (avoid getComputedStyle)
    const layer = this.section ? this.section.closest('.credentials-space-layer') : null;
    const isLayerHidden = layer && (layer.style.visibility === 'hidden' || (layer.style.opacity !== '' && parseFloat(layer.style.opacity) < 0.02));
    const p = window.AppState?.techSolar?.zoomProgress ?? 0;
    const isAway = (p > 0 && p < 0.60);

    if (isLayerHidden || isAway) {
      // Idle pause when offscreen
      this.animId = requestAnimationFrame(this.animate);
      return;
    }

    // Lerp camera parallax and time-dilation speed
    this.camRotX += (this.targetCamRotX - this.camRotX) * 0.06;
    this.camRotY += (this.targetCamRotY - this.camRotY) * 0.06;
    this.speedFactor += (this.targetSpeedFactor - this.speedFactor) * 0.08;

    // Smooth inertial decay for manual drag
    if (!this.isDragging && Math.abs(this.dragVelocity) > 0.0001) {
      this.manualOrbitOffset += this.dragVelocity;
      this.dragVelocity *= 0.94;
    }

    const cx = this.stageWidth / 2;
    const cy = this.stageHeight / 2;
    const rx = CRED_ORBIT.radiusX * this.scaleRatio;
    const ry = CRED_ORBIT.radiusY * this.scaleRatio;

    // 1. Update 3D Positions for the 8 Cards (ALWAYS FRONT-FACING TO CAMERA)
    this.cards.forEach((card) => {
      // Advance orbital angle
      if (card !== this.hoveredCard) {
        card.theta += card.speed * this.speedFactor;
      }
      const effectiveTheta = card.theta + this.manualOrbitOffset;

      const x0 = Math.cos(effectiveTheta) * rx;
      const y0 = Math.sin(effectiveTheta) * ry;
      const z0 = CRED_ORBIT.wobbleAmp * this.scaleRatio * Math.sin(2 * effectiveTheta + this.time * 0.0012);

      const proj = this.project3D(x0, y0, z0, CRED_ORBIT, this.camRotX, this.camRotY);
      card.projX = proj.screenX;
      card.projY = proj.screenY;
      card.projZ = proj.depthZ;
      card.scale = proj.scale;
      card.isFront = proj.isFront;

      const isHovered = (this.hoveredCard === card);
      const finalScale = isHovered ? proj.scale * 1.15 : proj.scale;
      // Stacking order: back cards 10-25, front cards 40-75, hovered card 999
      const zIndex = isHovered ? 999 : Math.round(45 + (proj.depthZ / 4));

      // CRITICAL REQUIREMENT: "all cirtificate cards revolve front facing"
      // Pure translate3d with NO rotateX/Y/Z ensures every card is always strictly perpendicular to the camera
      card.el.style.transform = `translate3d(${proj.screenX.toFixed(1)}px, ${proj.screenY.toFixed(1)}px, 0) translate(-50%, -50%) scale(${finalScale.toFixed(3)})`;
      card.el.style.zIndex = zIndex;

      // Depth opacity creates rich atmospheric depth: front cards 1.0, back cards ~0.76
      const depthOpacity = isHovered ? 1.0 : (0.76 + 0.24 * Math.max(0, Math.min(1, (proj.depthZ + 120) / 240)));
      card.el.style.opacity = Math.min(1.0, depthOpacity).toFixed(3);

      // Record projected screen position for luminous comet trail
      const screenPosX = cx + proj.screenX;
      const screenPosY = cy + proj.screenY;

      // Dynamic directional motion trail on DOM card
      if (card.prevScreenX !== undefined) {
        const vx = screenPosX - card.prevScreenX;
        const vy = screenPosY - card.prevScreenY;
        const vLen = Math.hypot(vx, vy);
        if (vLen > 0.05) {
          const normX = vx / vLen;
          const normY = vy / vLen;
          card.el.style.setProperty('--trail-vx', `${(-normX * 8).toFixed(1)}px`);
          card.el.style.setProperty('--trail-vy', `${(-normY * 8).toFixed(1)}px`);
        }
      }
      card.prevScreenX = screenPosX;
      card.prevScreenY = screenPosY;

      // Add point to trail history
      card.trail.push({
        x: screenPosX,
        y: screenPosY,
        depthZ: proj.depthZ,
        scale: proj.scale,
        isFront: proj.isFront,
      });

      // Keep last 22 history points for a sleek, refined "slight trailing" comet tail
      if (card.trail.length > 22) {
        card.trail.shift();
      }

      // Emit slight stardust spark particles along the trail
      if (this.speedFactor > 0.15 && Math.random() < 0.38) {
        const pLen = card.trail.length;
        if (pLen >= 2) {
          const prevP = card.trail[pLen - 2];
          const currP = card.trail[pLen - 1];
          const moveAngle = Math.atan2(currP.y - prevP.y, currP.x - prevP.x);

          this.sparks.push({
            x: screenPosX + (Math.random() - 0.5) * 8,
            y: screenPosY + (Math.random() - 0.5) * 8,
            vx: -Math.cos(moveAngle) * (Math.random() * 1.2 + 0.3) + (Math.random() - 0.5) * 0.5,
            vy: -Math.sin(moveAngle) * (Math.random() * 1.2 + 0.3) + (Math.random() - 0.5) * 0.5,
            color: card.cert.accent,
            size: Math.random() * 1.6 + 0.6,
            alpha: 0.85,
            decay: Math.random() * 0.028 + 0.022,
            isFront: proj.isFront,
          });
        }
      }
    });

    // 2. Render Canvas Trails and Stardust Sparks (Dual Canvas Architecture)
    this.renderTrailsCanvas(cx, cy, rx, ry);

    this.animId = requestAnimationFrame(this.animate);
  }

  /**
   * Render Luminous Comet Tails and Celestial Stardust Sparks across Back & Front Canvases
   */
  renderTrailsCanvas(cx, cy, rx, ry) {
    const w = this.stageWidth;
    const h = this.stageHeight;

    if (this.ctxBack) this.ctxBack.clearRect(0, 0, w, h);
    if (this.ctxFront) this.ctxFront.clearRect(0, 0, w, h);

    // 1. Subtle, ethereal orbital guide ring (on back canvas)
    if (this.ctxBack) {
      const ctx = this.ctxBack;
      ctx.save();
      ctx.beginPath();
      const ringSteps = 72;
      for (let s = 0; s <= ringSteps; s++) {
        const angle = (s / ringSteps) * Math.PI * 2 + this.manualOrbitOffset;
        const x0 = Math.cos(angle) * rx;
        const y0 = Math.sin(angle) * ry;
        const z0 = 0;
        const p = this.project3D(x0, y0, z0, CRED_ORBIT, this.camRotX, this.camRotY);
        const px = cx + p.screenX;
        const py = cy + p.screenY;
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(210, 255, 0, 0.07)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 14]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    // 2. Render Comet Trail Ribbons behind each card (depth-sorted)
    this.cards.forEach((card) => {
      const targetCtx = card.isFront ? this.ctxFront : this.ctxBack;
      if (!targetCtx) return;
      this.drawTrailRibbon(targetCtx, card);
    });

    // 3. Render and update Stardust Sparks (depth-sorted)
    for (let s = this.sparks.length - 1; s >= 0; s--) {
      const spark = this.sparks[s];
      spark.x += spark.vx;
      spark.y += spark.vy;
      spark.alpha -= spark.decay;

      if (spark.alpha <= 0.02) {
        this.sparks.splice(s, 1);
        continue;
      }

      const ctx = spark.isFront ? this.ctxFront : this.ctxBack;
      if (!ctx) continue;

      ctx.save();
      ctx.beginPath();
      ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
      ctx.fillStyle = spark.color;
      ctx.globalAlpha = Math.max(0, spark.alpha);
      ctx.shadowColor = spark.color;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    }
  }

  /**
   * Draw a sleek, tapered luminous comet ribbon trailing behind an orbiting card
   */
  drawTrailRibbon(ctx, card) {
    const trail = card.trail;
    const len = trail.length;
    if (len < 3) return;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const accent = card.cert.accent;
    const isHovered = (this.hoveredCard === card);

    // Outer soft glow pass
    for (let i = 1; i < len; i++) {
      const pPrev = trail[i - 1];
      const pCurr = trail[i];
      const progress = i / (len - 1); // 0 at tail tip, 1 at card head

      // Smooth ease for elegant tapering
      const width = Math.max(0.8, (0.4 + Math.pow(progress, 1.8) * 5.0) * this.scaleRatio);
      const alpha = Math.pow(progress, 1.3) * (card.isFront ? 0.35 : 0.20) * (isHovered ? 0.25 : 1.0);

      ctx.beginPath();
      ctx.moveTo(pPrev.x, pPrev.y);
      ctx.lineTo(pCurr.x, pCurr.y);
      ctx.strokeStyle = accent;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = width * 1.8;
      ctx.shadowColor = accent;
      ctx.shadowBlur = 10 * progress;
      ctx.stroke();
    }

    // Inner crisp filament pass
    for (let i = 1; i < len; i++) {
      const pPrev = trail[i - 1];
      const pCurr = trail[i];
      const progress = i / (len - 1);

      const width = Math.max(0.6, (0.3 + Math.pow(progress, 1.5) * 2.4) * this.scaleRatio);
      const alpha = Math.pow(progress, 1.2) * (card.isFront ? 0.65 : 0.40) * (isHovered ? 0.30 : 1.0);

      ctx.beginPath();
      ctx.moveTo(pPrev.x, pPrev.y);
      ctx.lineTo(pCurr.x, pCurr.y);
      ctx.strokeStyle = '#FFFFFF';
      ctx.globalAlpha = alpha * 0.7;
      ctx.lineWidth = width;
      ctx.shadowColor = accent;
      ctx.shadowBlur = 4;
      ctx.stroke();
    }

    ctx.restore();
  }

  openLightbox(cert) {
    if (!this.lightbox) return;

    const isPDF = cert.image.toLowerCase().endsWith('.pdf');

    if (this.lightboxImg && this.lightboxPdfNotice) {
      if (!isPDF) {
        this.lightboxImg.src = cert.image;
        this.lightboxImg.alt = cert.title;
        this.lightboxImg.style.display = 'block';
        this.lightboxPdfNotice.style.display = 'none';
      } else {
        this.lightboxImg.style.display = 'none';
        this.lightboxPdfNotice.style.display = 'flex';
        this.lightboxPdfNotice.style.flexDirection = 'column';
        this.lightboxPdfNotice.style.alignItems = 'center';
        this.lightboxPdfNotice.style.padding = '3rem 2rem';
        const pdfLink = document.getElementById('cred-lightbox-pdf-link');
        if (pdfLink) pdfLink.href = cert.image;
      }
    }

    if (this.lightboxTitle) this.lightboxTitle.textContent = cert.title;
    if (this.lightboxBadge) {
      this.lightboxBadge.textContent = cert.badge;
      this.lightboxBadge.style.color = cert.accent;
      this.lightboxBadge.style.borderColor = cert.accent;
    }
    if (this.lightboxOrg) this.lightboxOrg.textContent = `${cert.subtitle} · ${cert.org}`;
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
  return new CredentialsStonesEngine();
}
