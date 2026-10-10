/**
 * CREDENTIALS MÖBIUS INFINITY RING ENGINE
 * --------------------------------------------------
 * Author: Sam Sunny Portfolio
 * Description:
 *   - 08 verified honors & credentials cards flow along a 3D lemniscate
 *     (figure-8 / Möbius strip) path with depth-sorted rendering.
 *   - Glowing circuit-trace path rendered on dual canvases (back/front)
 *     with animated energy pulses traveling along the ring.
 *   - Holographic card borders with glassmorphic styling.
 *   - Cards scale up and brighten when in front, dim and shrink when behind.
 *   - Path visually crosses over itself at center (Möbius illusion).
 *   - Gyro-reactive parallax tilt on mobile devices.
 *   - Interactive touch/drag momentum to manually revolve the ring.
 *   - Gravitational Time-Dilation on card hover (ring smoothly halts).
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

// ── Möbius Ring Configuration ──────────────────────────────────────────
const MOBIUS = {
  radiusX:      480,     // Horizontal extent of lemniscate (px, desktop)
  radiusY:      155,     // Vertical extent of lemniscate
  depthScale:   220,     // Z-depth scale for perspective projection
  baseSpeed:    0.0032,  // Auto-rotation angular velocity (rad/frame)
  pathSamples:  300,     // Number of samples for canvas path rendering
  pulseCount:   5,       // Number of energy pulses flowing on path
  pulseSpeed:   0.006,   // Energy pulse angular velocity
};


export class CredentialsMobiusEngine {
  constructor() {
    this.section = document.getElementById('credentials');
    if (!this.section) return;

    this.stage         = null;
    this.canvasBack    = null;
    this.canvasFront   = null;
    this.ctxBack       = null;
    this.ctxFront      = null;
    this.cardContainer = null;

    this.cards       = [];
    this.animId      = null;
    this.time        = 0;
    this.isInViewport = true;
    this.isTriggered = false;

    // ── Rotation State ──
    this.autoAngle    = 0;       // Continuous auto-rotation accumulator
    this.manualAngle  = 0;       // Accumulated manual drag offset
    this.dragVelocity = 0;       // Inertial drag velocity
    this.isDragging   = false;
    this.touchStartX  = 0;

    // ── Speed Control (Time-Dilation) ──
    this.speedFactor       = 1.0;
    this.targetSpeedFactor = 1.0;

    // ── 3D Camera Parallax ──
    this.camRotX       = 0;
    this.camRotY       = 0;
    this.targetCamRotX = 0;
    this.targetCamRotY = 0;

    // ── Energy Pulses ──
    this.pulses = [];
    for (let i = 0; i < MOBIUS.pulseCount; i++) {
      this.pulses.push({ t: (i / MOBIUS.pulseCount) * Math.PI * 2 });
    }

    // ── Stage Dimensions ──
    this.stageWidth  = 1200;
    this.stageHeight = 620;
    this.scaleRatio  = 1.0;

    // ── Interaction State ──
    this.hoveredCard = null;

    // ── Lightbox References ──
    this.lightbox          = null;
    this.lightboxImg       = null;
    this.lightboxPdfNotice = null;
    this.lightboxTitle     = null;
    this.lightboxBadge     = null;
    this.lightboxOrg       = null;
    this.lightboxBackdrop  = null;
    this.lightboxClose     = null;

    // ── Bind Methods ──
    this.animate       = this.animate.bind(this);
    this.onResize      = this.onResize.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);

    this.init();
  }

  /* ================================================================
   *  INITIALIZATION
   * ================================================================ */

  init() {
    this.buildDOM();
    this.onResize();
    this.setupListeners();
    this.setupIntersectionObserver();
    this.animId = requestAnimationFrame(this.animate);
  }

  /* ================================================================
   *  LEMNISCATE MATH
   *  Lemniscate of Bernoulli parametric equations produce a figure-8.
   *  z = sin(t) creates the 3D crossing (Möbius illusion):
   *    - At t≈π/2  the path crosses at center going FORWARD  (z>0)
   *    - At t≈3π/2 the path crosses at center going BACKWARD (z<0)
   * ================================================================ */

  lemniscatePoint(t) {
    const sinT  = Math.sin(t);
    const cosT  = Math.cos(t);
    const denom = 1 + sinT * sinT;
    return {
      x: cosT / denom,
      y: (sinT * cosT) / denom,
      z: sinT,  // Depth axis — creates the crossing illusion
    };
  }

  /**
   * Apply camera rotation (parallax) and perspective projection.
   * Returns screen coordinates, depth, and scale factor.
   */
  project(normPt) {
    const rx = MOBIUS.radiusX * this.scaleRatio;
    const ry = MOBIUS.radiusY * this.scaleRatio;
    const dz = MOBIUS.depthScale * this.scaleRatio;

    let x = normPt.x * rx;
    let y = normPt.y * ry;
    let z = normPt.z * dz;

    // Camera Yaw (left-right tilt)
    const cosY = Math.cos(this.camRotY);
    const sinY = Math.sin(this.camRotY);
    const x1 = x * cosY + z * sinY;
    const z1 = -x * sinY + z * cosY;

    // Camera Pitch (up-down tilt)
    const cosX = Math.cos(this.camRotX);
    const sinX = Math.sin(this.camRotX);
    const y1 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;

    // Perspective Projection
    const fov         = 900;
    const perspective = fov / (fov - z2);

    return {
      screenX: x1 * perspective,
      screenY: y1 * perspective,
      depth:   z2,
      scale:   Math.max(0.58, Math.min(1.28, perspective)),
      rawZ:    normPt.z,
    };
  }

  /* ================================================================
   *  DOM CONSTRUCTION
   * ================================================================ */

  buildDOM() {
    this.section.innerHTML = `
      <div class="mobius-stage-wrapper" id="mobius-stage-wrapper">
        <!-- Ambient Singularity Glow -->
        <div class="mobius-singularity" aria-hidden="true"></div>

        <!-- Header -->
        <div class="mobius-header">
          <span class="font-mono text-lime mobius-header-badge">// VERIFIED CREDENTIALS &amp; AWARDS</span>
          <h2 class="mobius-title font-display">CREDENTIALS MATRIX</h2>
          <p class="font-mono text-muted mobius-header-sub">08 VERIFIED ARTIFACTS IN MÖBIUS ORBIT · CLICK TO INSPECT</p>
        </div>

        <!-- 3D Möbius Ring Viewport -->
        <div class="mobius-stage" id="mobius-stage">
          <canvas id="mobius-canvas-back"  class="mobius-canvas mobius-canvas-back"></canvas>
          <div    id="mobius-cards-container" class="mobius-cards-container"></div>
          <canvas id="mobius-canvas-front" class="mobius-canvas mobius-canvas-front"></canvas>
        </div>

        <!-- Navigation HUD -->
        <div class="stage-nav-hud">
          <button id="cred-return-projects-btn" class="stage-nav-btn font-mono" title="Return to flagship projects">⤾ RETURN TO PROJECTS</button>
          <a href="#contact" class="stage-nav-btn font-mono text-lime" id="cred-to-contact-btn" title="Proceed to Contact">INITIATE CONTACT PROTOCOL ↓</a>
        </div>
      </div>

      <!-- High-Resolution Lightbox Modal -->
      <div class="mobius-lightbox" id="mobius-lightbox" aria-hidden="true">
        <div class="mobius-lightbox-backdrop" id="mobius-lightbox-backdrop"></div>
        <div class="mobius-lightbox-content" id="mobius-lightbox-content">
          <div class="mobius-lightbox-header font-mono">
            <span class="mobius-lightbox-badge" id="mobius-lightbox-badge"></span>
            <h3 class="mobius-lightbox-title font-display" id="mobius-lightbox-title">Certificate</h3>
          </div>
          <div class="mobius-lightbox-media-wrap" id="mobius-lightbox-media-wrap">
            <img src="" alt="" class="mobius-lightbox-img" id="mobius-lightbox-img" />
            <div class="mobius-lightbox-pdf-notice" id="mobius-lightbox-pdf-notice" style="display: none;">
              <span class="font-mono text-lime" style="font-size: 1.1rem; display: block; margin-bottom: 0.8rem;">📄 VERIFIED PDF DOCUMENT</span>
              <a href="#" target="_blank" id="mobius-lightbox-pdf-link" class="btn-primary" style="font-size: 0.78rem;">OPEN OFFICIAL PDF CREDENTIAL ↗</a>
            </div>
          </div>
          <div class="mobius-lightbox-footer">
            <span class="mobius-lightbox-org font-mono text-muted" id="mobius-lightbox-org">Verification Telemetry</span>
            <button class="mobius-lightbox-close font-mono" id="mobius-lightbox-close">✕ CLOSE [ESC]</button>
          </div>
        </div>
      </div>
    `;

    // ── Cache DOM References ──
    this.stage          = document.getElementById('mobius-stage');
    this.canvasBack     = document.getElementById('mobius-canvas-back');
    this.canvasFront    = document.getElementById('mobius-canvas-front');
    this.ctxBack        = this.canvasBack ? this.canvasBack.getContext('2d') : null;
    this.ctxFront       = this.canvasFront ? this.canvasFront.getContext('2d') : null;
    this.cardContainer  = document.getElementById('mobius-cards-container');

    this.lightbox          = document.getElementById('mobius-lightbox');
    this.lightboxImg       = document.getElementById('mobius-lightbox-img');
    this.lightboxPdfNotice = document.getElementById('mobius-lightbox-pdf-notice');
    this.lightboxTitle     = document.getElementById('mobius-lightbox-title');
    this.lightboxBadge     = document.getElementById('mobius-lightbox-badge');
    this.lightboxOrg       = document.getElementById('mobius-lightbox-org');
    this.lightboxBackdrop  = document.getElementById('mobius-lightbox-backdrop');
    this.lightboxClose     = document.getElementById('mobius-lightbox-close');

    // ── Build Orbiting Cards ──
    this.buildCards();

    // ── Setup Navigation Buttons ──
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

    // ── Setup Lightbox ──
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
      el.className = 'mobius-card';
      el.dataset.id = cert.id;
      el.style.setProperty('--card-accent', cert.accent);
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', `${cert.title} — ${cert.subtitle}`);

      const isPDF = cert.image.toLowerCase().endsWith('.pdf');

      el.innerHTML = `
        <div class="mobius-card-holo" aria-hidden="true"></div>
        <div class="mobius-card-inner">
          <div class="mobius-card-badge font-mono">${cert.badge}</div>
          ${!isPDF ? `
            <div class="mobius-card-thumb">
              <img src="${cert.image}" alt="${cert.title}" loading="lazy" />
              <div class="mobius-card-inspect font-mono">INSPECT ↗</div>
            </div>
          ` : `
            <div class="mobius-card-thumb mobius-card-thumb-pdf">
              <div class="mobius-card-pdf font-mono">📄 VIEW PDF ↗</div>
            </div>
          `}
          <div class="mobius-card-info">
            <h3 class="mobius-card-title font-display">${cert.title}</h3>
            <p class="mobius-card-subtitle font-mono">${cert.subtitle}</p>
            <p class="mobius-card-org font-mono">${cert.org}</p>
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
        depth:  0,
        scale:  1,
        rawZ:   0,
      };

      // Hover — Gravitational Time-Dilation
      el.addEventListener('pointerenter', () => this.handleCardHover(card));
      el.addEventListener('pointerleave', () => this.handleCardLeave(card));
      el.addEventListener('focus', () => this.handleCardHover(card));
      el.addEventListener('blur', () => this.handleCardLeave(card));

      // Click — Open Lightbox
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openLightbox(cert);
      });

      this.cardContainer.appendChild(el);
      this.cards.push(card);
    });
  }

  /* ================================================================
   *  EVENT LISTENERS
   * ================================================================ */

  setupListeners() {
    window.addEventListener('resize', this.onResize, { passive: true });
    window.addEventListener('mousemove', this.onPointerMove, { passive: true });

    if (!this.stage) return;

    // ── Touch & Mouse Drag to Rotate ──
    const startDrag = (clientX) => {
      this.isDragging   = true;
      this.touchStartX  = clientX;
      this.dragVelocity = 0;
    };

    const moveDrag = (clientX) => {
      if (!this.isDragging) return;
      const delta = clientX - this.touchStartX;
      this.dragVelocity = delta * 0.004;
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
      if (e.target.closest('.stage-nav-btn, .mobius-lightbox-close, .mobius-card')) return;
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
      { rootMargin: '120px 0px 120px 0px', threshold: 0.02 }
    );
    if (this.section) observer.observe(this.section);
  }

  /* ================================================================
   *  INTERACTION HANDLERS
   * ================================================================ */

  handleCardHover(card) {
    this.hoveredCard = card;
    card.el.classList.add('is-hovered');
    this.targetSpeedFactor = 0.05;  // Gravitational time-dilation
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
    this.targetCamRotY =  nx * 0.18;
    this.targetCamRotX = -ny * 0.12;
  }

  onResize() {
    if (!this.stage) return;
    const rect = this.stage.getBoundingClientRect();
    this.stageWidth  = rect.width  || window.innerWidth;
    this.stageHeight = rect.height || (window.innerHeight * 0.65);

    const w = window.innerWidth;
    if (w < 480) {
      this.scaleRatio = 0.40;
    } else if (w < 600) {
      this.scaleRatio = 0.50;
    } else if (w < 900) {
      this.scaleRatio = 0.68;
    } else if (w < 1200) {
      this.scaleRatio = 0.84;
    } else {
      this.scaleRatio = Math.min(1.10, Math.max(0.90, w / 1440));
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    [this.canvasBack, this.canvasFront].forEach((canvas) => {
      if (!canvas) return;
      canvas.width  = Math.floor(this.stageWidth * dpr);
      canvas.height = Math.floor(this.stageHeight * dpr);
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
  }

  /* ================================================================
   *  TRIGGER (called by zoom system when credentials section appears)
   * ================================================================ */

  trigger(forceImmediate = false) {
    this.isTriggered  = true;
    this.isInViewport = true;
    this.onResize();
    this.speedFactor = forceImmediate ? 1.6 : 1.35;
  }

  /* ================================================================
   *  MAIN RENDER LOOP
   * ================================================================ */

  animate(timestamp) {
    this.time = timestamp || performance.now();

    // Visibility check (avoid rendering when hidden)
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

    // ── Lerp Camera Parallax ──
    // Blend mobile gyroscope if active
    if (window.AppState?.gyro?.active) {
      this.targetCamRotY =  window.AppState.gyro.x * 0.35;
      this.targetCamRotX = -window.AppState.gyro.y * 0.26;

      // Gyro tilt impulse — tilting the phone briskly imparts inertia to the ring
      const gyroVelX = window.AppState.gyro.velX || 0;
      if (Math.abs(gyroVelX) > 0.008 && !this.isDragging) {
        this.manualAngle += gyroVelX * 0.08;
      }
    }
    this.camRotX += (this.targetCamRotX - this.camRotX) * 0.06;
    this.camRotY += (this.targetCamRotY - this.camRotY) * 0.06;

    // ── Lerp Speed Factor ──
    this.speedFactor += (this.targetSpeedFactor - this.speedFactor) * 0.08;

    // ── Auto-rotation ──
    this.autoAngle += MOBIUS.baseSpeed * this.speedFactor;

    // ── Inertial Drag Decay ──
    if (!this.isDragging && Math.abs(this.dragVelocity) > 0.00005) {
      this.manualAngle += this.dragVelocity;
      this.dragVelocity *= 0.94;
    }

    const totalAngle = this.autoAngle + this.manualAngle;
    const cx = this.stageWidth / 2;
    const cy = this.stageHeight / 2;

    // ── Update Card Positions ──
    this.cards.forEach((card) => {
      const effectiveT = card.theta + totalAngle;
      const normPt     = this.lemniscatePoint(effectiveT);
      const proj       = this.project(normPt);

      card.projX = proj.screenX;
      card.projY = proj.screenY;
      card.depth = proj.depth;
      card.scale = proj.scale;
      card.rawZ  = proj.rawZ;

      const isHovered = (this.hoveredCard === card);
      const finalScale = isHovered ? proj.scale * 1.12 : proj.scale;

      // Depth-based z-index: back cards 5-20, front cards 35-60, hovered 999
      const zIndex = isHovered ? 999 : Math.round(30 + (proj.depth / 8));

      // Depth-based opacity: bright in front, dim behind
      const depthNorm   = (proj.rawZ + 1) / 2; // 0 (back) → 1 (front)
      const depthOpacity = isHovered ? 1.0 : (0.35 + 0.65 * Math.pow(depthNorm, 1.2));

      // Apply transforms
      card.el.style.transform = `translate3d(${proj.screenX.toFixed(1)}px, ${proj.screenY.toFixed(1)}px, 0) translate(-50%, -50%) scale(${finalScale.toFixed(3)})`;
      card.el.style.zIndex    = zIndex;
      card.el.style.opacity   = Math.min(1.0, depthOpacity).toFixed(3);

      // Subtle blur on far-back cards
      const blurAmount = proj.rawZ < -0.5 ? (((-proj.rawZ) - 0.5) * 3.0).toFixed(1) : 0;
      card.el.style.filter = blurAmount > 0 ? `blur(${blurAmount}px)` : 'none';
    });

    // ── Update Energy Pulses ──
    this.pulses.forEach((pulse) => {
      pulse.t += MOBIUS.pulseSpeed * this.speedFactor;
    });

    // ── Render Canvas Path ──
    this.renderCanvas(cx, cy, totalAngle);

    this.animId = requestAnimationFrame(this.animate);
  }

  /* ================================================================
   *  CANVAS RENDERING — Circuit Trace Path & Energy Pulses
   * ================================================================ */

  renderCanvas(cx, cy, totalAngle) {
    const w = this.stageWidth;
    const h = this.stageHeight;

    if (this.ctxBack)  this.ctxBack.clearRect(0, 0, w, h);
    if (this.ctxFront) this.ctxFront.clearRect(0, 0, w, h);

    const samples = MOBIUS.pathSamples;
    const step    = (Math.PI * 2) / samples;

    // ── Pre-compute all path points ──
    const points = [];
    for (let i = 0; i <= samples; i++) {
      const t    = i * step;
      const norm = this.lemniscatePoint(t + totalAngle);
      const proj = this.project(norm);
      points.push({
        sx: cx + proj.screenX,
        sy: cy + proj.screenY,
        depth: proj.depth,
        rawZ:  proj.rawZ,
        t:     t,
      });
    }

    // ── Draw Path (depth-sorted: back first, front second) ──
    this.drawPathLayer(this.ctxBack,  points, false); // Back segments (z < 0)
    this.drawPathLayer(this.ctxFront, points, true);  // Front segments (z >= 0)

    // ── Draw Energy Pulses ──
    this.drawPulses(cx, cy, totalAngle);

    // ── Draw Node Markers at Card Positions ──
    this.drawNodeMarkers(cx, cy);
  }

  /**
   * Draw path segments for either back (z<0) or front (z>=0) layer.
   * Multi-pass rendering for glow effect.
   */
  drawPathLayer(ctx, points, isFront) {
    if (!ctx) return;

    const len = points.length;

    // Pass 1: Outer soft glow
    ctx.save();
    ctx.lineCap  = 'round';
    ctx.lineJoin = 'round';

    for (let i = 1; i < len; i++) {
      const prev = points[i - 1];
      const curr = points[i];

      // Only draw segments matching this layer's depth
      const segFront = (curr.rawZ >= -0.08);
      if (segFront !== isFront) continue;

      // Depth-based appearance
      const depthNorm = (curr.rawZ + 1) / 2; // 0=back, 1=front
      const lineWidth = isFront
        ? 1.2 + depthNorm * 2.5
        : 0.6 + depthNorm * 1.2;
      const alpha = isFront
        ? 0.08 + depthNorm * 0.22
        : 0.03 + depthNorm * 0.08;

      ctx.beginPath();
      ctx.moveTo(prev.sx, prev.sy);
      ctx.lineTo(curr.sx, curr.sy);
      ctx.strokeStyle = '#D2FF00';
      ctx.globalAlpha = alpha;
      ctx.lineWidth   = lineWidth * 2.5; // Outer glow
      ctx.shadowColor = '#D2FF00';
      ctx.shadowBlur  = isFront ? 12 : 4;
      ctx.stroke();
    }
    ctx.restore();

    // Pass 2: Inner crisp core line
    ctx.save();
    ctx.lineCap  = 'round';
    ctx.lineJoin = 'round';

    for (let i = 1; i < len; i++) {
      const prev = points[i - 1];
      const curr = points[i];

      const segFront = (curr.rawZ >= -0.08);
      if (segFront !== isFront) continue;

      const depthNorm = (curr.rawZ + 1) / 2;
      const lineWidth = isFront
        ? 0.6 + depthNorm * 1.2
        : 0.3 + depthNorm * 0.5;
      const alpha = isFront
        ? 0.15 + depthNorm * 0.45
        : 0.04 + depthNorm * 0.12;

      ctx.beginPath();
      ctx.moveTo(prev.sx, prev.sy);
      ctx.lineTo(curr.sx, curr.sy);
      ctx.strokeStyle = '#EEFFAA';
      ctx.globalAlpha = alpha;
      ctx.lineWidth   = lineWidth;
      ctx.shadowColor = '#D2FF00';
      ctx.shadowBlur  = isFront ? 6 : 2;
      ctx.stroke();
    }
    ctx.restore();

    // Pass 3: Dashed circuit detail line (front only)
    if (isFront) {
      ctx.save();
      ctx.lineCap    = 'round';
      ctx.setLineDash([3, 18]);
      ctx.lineDashOffset = -this.time * 0.02; // Animated dash flow

      for (let i = 1; i < len; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        if (curr.rawZ < 0.15) continue; // Only on strongly front segments

        const depthNorm = (curr.rawZ + 1) / 2;

        ctx.beginPath();
        ctx.moveTo(prev.sx, prev.sy);
        ctx.lineTo(curr.sx, curr.sy);
        ctx.strokeStyle = '#FFFFFF';
        ctx.globalAlpha = 0.08 + depthNorm * 0.15;
        ctx.lineWidth   = 0.5;
        ctx.shadowBlur  = 0;
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.restore();
    }
  }

  /**
   * Draw animated energy pulses traveling along the lemniscate.
   */
  drawPulses(cx, cy, totalAngle) {
    this.pulses.forEach((pulse) => {
      const trailLen = 18;
      const trailStep = 0.025;

      for (let i = trailLen; i >= 0; i--) {
        const sampleT = pulse.t - i * trailStep;
        const norm    = this.lemniscatePoint(sampleT + totalAngle);
        const proj    = this.project(norm);

        const sx = cx + proj.screenX;
        const sy = cy + proj.screenY;

        // Pick canvas based on depth
        const ctx = proj.rawZ >= -0.08 ? this.ctxFront : this.ctxBack;
        if (!ctx) continue;

        const progress = 1 - (i / trailLen); // 0 at tail, 1 at head
        const size     = (0.5 + progress * 3.0) * Math.max(0.7, proj.scale);
        const alpha    = Math.pow(progress, 1.8) * (proj.rawZ >= 0 ? 0.9 : 0.35);

        ctx.save();
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle   = '#D2FF00';
        ctx.globalAlpha = alpha;
        ctx.shadowColor = '#D2FF00';
        ctx.shadowBlur  = progress > 0.8 ? 14 : 4;
        ctx.fill();
        ctx.restore();
      }
    });
  }

  /**
   * Draw small glowing dots at each card's current position on the path.
   */
  drawNodeMarkers(cx, cy) {
    this.cards.forEach((card) => {
      const sx  = cx + card.projX;
      const sy  = cy + card.projY;
      const ctx = card.rawZ >= -0.08 ? this.ctxFront : this.ctxBack;
      if (!ctx) return;

      const depthNorm = (card.rawZ + 1) / 2;
      const size      = (2.5 + depthNorm * 3) * this.scaleRatio;
      const alpha     = 0.15 + depthNorm * 0.5;

      ctx.save();
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fillStyle   = card.cert.accent;
      ctx.globalAlpha = alpha;
      ctx.shadowColor = card.cert.accent;
      ctx.shadowBlur  = 10;
      ctx.fill();
      ctx.restore();
    });
  }

  /* ================================================================
   *  LIGHTBOX
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
        this.lightboxPdfNotice.style.display     = 'flex';
        this.lightboxPdfNotice.style.flexDirection = 'column';
        this.lightboxPdfNotice.style.alignItems    = 'center';
        this.lightboxPdfNotice.style.padding       = '3rem 2rem';
        const pdfLink = document.getElementById('mobius-lightbox-pdf-link');
        if (pdfLink) pdfLink.href = cert.image;
      }
    }

    if (this.lightboxTitle) this.lightboxTitle.textContent = cert.title;
    if (this.lightboxBadge) {
      this.lightboxBadge.textContent    = cert.badge;
      this.lightboxBadge.style.color       = cert.accent;
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

  /* ================================================================
   *  CLEANUP
   * ================================================================ */

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onPointerMove);
  }
}

/* ================================================================
 *  PUBLIC INITIALIZER (maintains same export interface)
 * ================================================================ */

export function initCredentialsStones() {
  return new CredentialsMobiusEngine();
}
