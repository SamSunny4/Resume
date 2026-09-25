/**
 * =====================================================================
 * PROJECT SOLAR SYSTEM ENGINE (project-solar.js)
 * =====================================================================
 * 3D Celestial Solar System for Flagship Projects:
 * - 6 Verified Production Planetary Worlds in Keplerian Multi-Plane Orbits
 * - Mathematical Euler rotation matrices + 3D perspective projection
 * - Depth-sorted orbiting badges (< 0 behind monumental title, >= 0 over title)
 * - Dynamic mouse proximity time-dilation (smooth deceleration when cursor nears planets)
 * - Holographic near-pointer telemetry tooltip
 * - Interactive Cybernetic HUD modal with deep architecture telemetry & specs
 * - Canvas orbital rings with travelling photon energy packets & targeting lasers
 * - Zero external build dependencies (Pure Vanilla ES6 Module)
 * =====================================================================
 */

export const PROJECT_NODES = [
  {
    id: 'keybase',
    name: 'KeyBase',
    badge: 'COMMERCIAL DEPLOYMENT',
    category: 'ENTERPRISE DESKTOP SYSTEM',
    desc: 'Enterprise key duplication & records management system running live in commercial retail operations. Built with Java Swing and embedded H2 database with live webcam capture.',
    icon: 'assets/keybase-icon.png',
    color: '#00F0FF',
    ringIndex: 0,
    orbitPhase: 0,
    speedFactor: 1.0,
    tech: ['Java 17', 'Java Swing', 'H2 Embedded', 'Webcam API', 'Windows x64'],
    github: 'https://github.com/SamSunny4/KeyBase',
    stats: ['COMMERCIAL RETAIL DEPLOYMENT', 'PORTABLE JRE BUNDLE', 'EMBEDDED H2 DATABASE', 'HARDWARE WEBCAM PIPELINE'],
  },
  {
    id: 'leadis',
    name: 'Leadis / AiSam',
    badge: '🥈 NATIONAL 2ND PRIZE',
    category: 'APPLIED AI & COMPUTER VISION',
    desc: 'Award-winning AI-assisted developmental screening platform combining MediaPipe pose estimation with multimodal risk assessment and Flask ML backend.',
    icon: 'assets/leadis-logo.svg',
    color: '#D2FF00',
    ringIndex: 0,
    orbitPhase: Math.PI,
    speedFactor: 1.0,
    tech: ['Next.js', 'MediaPipe', 'Python', 'Flask ML', 'Tailwind'],
    github: 'https://github.com/SamSunny4/Leadis',
    stats: ['NATIONAL AI 2ND PRIZE', '33-POINT POSE ESTIMATION', 'MULTIMODAL RISK SCORING', 'FLASK ML API'],
  },
  {
    id: 'infogrid',
    name: 'InfoGrid',
    badge: 'HARDWARE CMS DEPLOY',
    category: 'DIGITAL SIGNAGE CMS',
    desc: 'Full-stack digital signage solution engineered for 43-inch vertical laboratory screens with real-time news, events, poster carousels, and QR routing.',
    icon: 'assets/tech-icons/nextjs.svg',
    color: '#A855F7',
    ringIndex: 1,
    orbitPhase: 0.6,
    speedFactor: 0.98,
    tech: ['TypeScript', 'Next.js 16', 'MongoDB Atlas', 'Cloudflare R2', 'REST API'],
    github: 'https://github.com/SamSunny4/InfoGrid',
    stats: ['43" VERTICAL LAB SCREEN', 'MONGODB ATLAS REALTIME', 'CLOUDFLARE R2 ASSETS', 'FULL CRUD ADMIN PANEL'],
  },
  {
    id: 'rainiest',
    name: 'Rainiest',
    badge: 'LIVE CIVIC PRODUCTION',
    category: 'CIVIC WEATHER INTELLIGENCE',
    desc: 'Public dashboard monitoring rainfall status and District Collector education leave declarations across all 14 Kerala districts with HTML5 canvas weather simulation.',
    icon: 'assets/tech-icons/react.svg',
    color: '#38BDF8',
    ringIndex: 1,
    orbitPhase: 0.6 + Math.PI,
    speedFactor: 1.02,
    tech: ['Next.js 15', 'React 19', 'HTML5 Canvas', 'Tailwind', 'Vercel'],
    github: 'https://github.com/SamSunny4/Rainiest',
    stats: ['14 KERALA DISTRICTS', 'REALTIME LEAVE RADAR', 'CANVAS WEATHER SIMULATION', 'PUBLIC FACEBOOK API'],
  },
  {
    id: 'fitman',
    name: 'Fitman Biomechanics',
    badge: 'CV RESEARCH PIPELINE',
    category: 'COMPUTER VISION & HEALTH',
    desc: 'Real-time exercise posture and biomechanics tracking pipeline evaluating repetition accuracy, joint angles, and kinetic posture using OpenCV and MediaPipe.',
    icon: 'assets/tech-icons/mediapipe.svg',
    color: '#FF9900',
    ringIndex: 2,
    orbitPhase: 1.3,
    speedFactor: 1.05,
    tech: ['Python', 'OpenCV', 'MediaPipe', 'PyTorch', 'FastAPI'],
    github: 'https://github.com/SamSunny4',
    stats: ['33 3D POSE LANDMARKS', 'REAL-TIME KINEMATICS', 'JOINT ANGLE GEOMETRY', 'LOW-LATENCY 60FPS'],
  },
  {
    id: 'threed-s',
    name: '3DS Spatial Engine',
    badge: '3D GRAPHICS PIPELINE',
    category: '3D SPATIAL COMPUTATION',
    desc: 'Spatial reconstruction engine processing 3D coordinates, depth meshes, and camera point clouds for real-time visualization.',
    icon: 'assets/tech-icons/c.svg',
    color: '#EC4899',
    ringIndex: 2,
    orbitPhase: 1.3 + Math.PI,
    speedFactor: 0.95,
    tech: ['C++', 'WebGL', 'Linear Algebra', 'Shader Pipeline'],
    github: 'https://github.com/SamSunny4',
    stats: ['POINT CLOUD RECONSTRUCTION', 'PERSPECTIVE MATRICES', 'HARDWARE SHADER PIPELINE', 'DEPTH MESHES'],
  },
];

export const PROJECT_RINGS = [
  // Ring 0: Inner Flagships (KeyBase & Leadis)
  {
    baseRadiusX: 420,
    baseRadiusY: 230,
    tiltX: 0.38,
    tiltY: -0.25,
    tiltZ: 0.08,
    baseSpeed: 0.0090,
    wobbleAmp: 18,
    color: 'rgba(0, 240, 255, 0.16)',
  },
  // Ring 1: Web & Civic Data Systems (InfoGrid & Rainiest)
  {
    baseRadiusX: 620,
    baseRadiusY: 340,
    tiltX: -0.45,
    tiltY: 0.32,
    tiltZ: -0.15,
    baseSpeed: -0.0068,
    wobbleAmp: 24,
    color: 'rgba(168, 85, 247, 0.15)',
  },
  // Ring 2: Vision & Spatial Graphics (Fitman & 3DS)
  {
    baseRadiusX: 820,
    baseRadiusY: 410,
    tiltX: 0.65,
    tiltY: -0.35,
    tiltZ: 0.22,
    baseSpeed: 0.0055,
    wobbleAmp: 30,
    color: 'rgba(255, 153, 0, 0.15)',
  },
];

export class ProjectSolarSystem {
  constructor() {
    this.track = document.getElementById('space-stage-track');
    this.stage = document.getElementById('projects-stage');
    this.projectsLayer = document.getElementById('projects-space-layer');
    this.container = document.getElementById('projects-orbits-container');
    this.centerText = document.getElementById('projects-center-text');
    this.canvas = document.getElementById('projects-canvas');

    // Interactive Project Deep-Dive Modal Elements
    this.projectModal = document.getElementById('project-detail-modal');
    this.modalTitle = document.getElementById('modal-title');
    this.modalStatus = document.getElementById('modal-status');
    this.modalDesc = document.getElementById('modal-desc');
    this.modalIcon = document.getElementById('modal-icon');
    this.modalTechChips = document.getElementById('modal-tech-chips');
    this.modalStatsList = document.getElementById('modal-stats-list');
    this.modalRepoLink = document.getElementById('modal-repo-link');
    this.modalCloseBtn = document.getElementById('modal-close-btn');
    this.modalDismissBtn = document.getElementById('modal-dismiss-btn');
    this.modalBackdrop = document.getElementById('project-modal-backdrop');

    // Quick Jump Navigation Buttons
    this.returnTechBtn = document.getElementById('return-tech-btn');
    this.heroProjectsBtn = document.getElementById('hero-projects-btn');

    // Near-Pointer Floating Tooltip (shared HUD)
    this.tooltip = document.getElementById('solar-cursor-tooltip');
    this.tooltipIcon = document.getElementById('tooltip-icon');
    this.tooltipTitle = document.getElementById('tooltip-title');
    this.tooltipCategory = document.getElementById('tooltip-category');
    this.tooltipDesc = document.getElementById('tooltip-desc');
    this.tooltipFooter = document.getElementById('tooltip-footer');

    if (!this.stage || !this.container) {
      console.warn('[ProjectSolar] Projects stage or container not found in DOM.');
      return;
    }

    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.projectNodes = [];
    this.hoveredProject = null;
    this.activeModalProject = null;
    this.time = 0;
    this.isInViewport = true;
    this.scaleRatio = 1.0;
    this.stageWidth = 1200;
    this.stageHeight = 700;

    // Camera 3D Parallax angles (lerped)
    this.camRotX = 0;
    this.camRotY = 0;
    this.targetCamRotX = 0;
    this.targetCamRotY = 0;

    // Pointer Coordinates for Tooltip & Parallax
    this.pointerClientX = -9999;
    this.pointerClientY = -9999;
    this.tooltipCurrentX = -9999;
    this.tooltipCurrentY = -9999;
    this.isTooltipActive = false;

    // Space Zoom State
    this.zoomProgress = 0;
    this.targetZoomProgress = 0;

    // Dynamic Mouse Proximity Orbit Speed Dilation
    this.projectsDilation = 1.0;
    this.targetProjectsDilation = 1.0;

    // Bind methods
    this.animate = this.animate.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.triggerProjectsZoom = this.triggerProjectsZoom.bind(this);
    this.triggerTechZoom = this.triggerTechZoom.bind(this);
    this.openProjectModal = this.openProjectModal.bind(this);
    this.closeProjectModal = this.closeProjectModal.bind(this);

    this.init();
  }

  init() {
    this.buildProjectNodesDOM();
    this.onResize();
    this.setupListeners();
    this.setupModalListeners();
    this.setupIntersectionObserver();

    // Start 60fps / 120fps render loop
    requestAnimationFrame(this.animate);
    console.log(`[ProjectSolar] Initialized with ${PROJECT_NODES.length} flagship project planetary worlds.`);
  }

  buildProjectNodesDOM() {
    if (!this.container) return;
    this.container.innerHTML = '';
    this.projectNodes = [];

    const ringBuckets = {};
    PROJECT_NODES.forEach((proj) => {
      const rIdx = Math.max(0, Math.min(PROJECT_RINGS.length - 1, proj.ringIndex ?? 0));
      if (!ringBuckets[rIdx]) ringBuckets[rIdx] = [];
      ringBuckets[rIdx].push(proj);
    });

    Object.keys(ringBuckets).forEach((rKey) => {
      const ringIndex = parseInt(rKey, 10);
      const ring = PROJECT_RINGS[ringIndex];
      const ringNodes = ringBuckets[ringIndex];
      const totalInRing = ringNodes.length;

      ringNodes.forEach((proj, itemIndex) => {
        const initialTheta = (itemIndex / totalInRing) * Math.PI * 2 + (proj.orbitPhase ?? 0);

        const el = document.createElement('div');
        el.className = 'project-node';
        el.dataset.id = proj.id;
        el.setAttribute('role', 'button');
        el.setAttribute('tabindex', '0');
        el.setAttribute('aria-label', `${proj.name}: ${proj.category}`);

        el.innerHTML = `
          <div class="project-node-badge" style="--proj-accent: ${proj.color}">
            <div class="project-badge-header">
              <div class="project-badge-icon-wrap">
                <img src="${proj.icon}" alt="${proj.name}" class="project-badge-icon" onerror="this.src='assets/Samlogo.png';" />
              </div>
              <span class="project-badge-status font-mono">${proj.badge}</span>
            </div>
            <div class="project-badge-body">
              <h3 class="project-badge-title font-display">${proj.name}</h3>
              <p class="project-badge-sub font-mono">${proj.category}</p>
            </div>
          </div>
        `;

        el.addEventListener('pointerenter', () => this.handleProjectHover(proj, el));
        el.addEventListener('pointerleave', () => this.handleProjectLeave());
        el.addEventListener('focus', () => this.handleProjectHover(proj, el));
        el.addEventListener('blur', () => this.handleProjectLeave());
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          this.openProjectModal(proj);
        });
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.openProjectModal(proj);
          }
        });

        this.container.appendChild(el);

        this.projectNodes.push({
          meta: proj,
          ring: ring,
          el: el,
          theta: initialTheta,
          projX: 0,
          projY: 0,
          projZ: 0,
          scale: 1,
          isFront: false,
        });
      });
    });
  }

  handleProjectHover(proj, el) {
    this.hoveredProject = proj;
    el.classList.add('is-hovered');

    if (this.tooltip) {
      if (this.tooltipIcon) {
        this.tooltipIcon.src = proj.icon;
        this.tooltipIcon.alt = proj.name;
      }
      if (this.tooltipTitle) {
        this.tooltipTitle.textContent = proj.name;
        this.tooltipTitle.style.color = proj.color;
      }
      if (this.tooltipCategory) {
        this.tooltipCategory.textContent = `// ${proj.badge}`;
        this.tooltipCategory.style.color = proj.color;
      }
      if (this.tooltipDesc) {
        this.tooltipDesc.textContent = proj.desc;
      }
      if (this.tooltipFooter) {
        this.tooltipFooter.textContent = `CLICK PLANET TO INSPECT TELEMETRY ↗`;
      }

      this.tooltip.style.setProperty('--tooltip-accent', proj.color);
      this.tooltip.style.setProperty('--tooltip-glow', `${proj.color}44`);

      if (this.pointerClientX > -1000) {
        this.tooltipCurrentX = this.pointerClientX + 18;
        this.tooltipCurrentY = this.pointerClientY + 18;
        this.tooltip.style.transform = `translate3d(${this.tooltipCurrentX}px, ${this.tooltipCurrentY}px, 0)`;
      }

      this.tooltip.classList.add('is-visible');
      this.isTooltipActive = true;
    }
  }

  handleProjectLeave() {
    if (this.hoveredProject) {
      const el = this.container?.querySelector(`[data-id="${this.hoveredProject.id}"]`);
      if (el) el.classList.remove('is-hovered');
      this.hoveredProject = null;
    }

    if (this.tooltip) {
      this.tooltip.classList.remove('is-visible');
      this.isTooltipActive = false;
    }
  }

  openProjectModal(proj) {
    if (!this.projectModal || !proj) return;
    this.activeModalProject = proj;

    if (this.modalTitle) this.modalTitle.textContent = proj.name;
    if (this.modalStatus) {
      this.modalStatus.textContent = `// ${proj.badge}`;
      this.modalStatus.style.color = proj.color;
    }
    if (this.modalDesc) this.modalDesc.textContent = proj.desc;
    if (this.modalIcon) {
      this.modalIcon.src = proj.icon;
      this.modalIcon.alt = proj.name;
    }

    if (this.modalTechChips) {
      this.modalTechChips.innerHTML = '';
      (proj.tech || []).forEach(techName => {
        const chip = document.createElement('span');
        chip.className = 'modal-chip';
        chip.textContent = techName;
        this.modalTechChips.appendChild(chip);
      });
    }

    if (this.modalStatsList) {
      this.modalStatsList.innerHTML = '';
      (proj.stats || []).forEach(stat => {
        const pill = document.createElement('div');
        pill.className = 'modal-stat-pill';
        pill.textContent = stat;
        this.modalStatsList.appendChild(pill);
      });
    }

    if (this.modalRepoLink) {
      this.modalRepoLink.href = proj.github || 'https://github.com/SamSunny4';
    }

    this.projectModal.classList.add('is-open');
    this.projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  closeProjectModal() {
    if (!this.projectModal) return;
    this.projectModal.classList.remove('is-open');
    this.projectModal.setAttribute('aria-hidden', 'true');
    this.activeModalProject = null;
    document.body.style.overflow = '';
  }

  setupModalListeners() {
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => this.closeProjectModal());
    }
    if (this.modalDismissBtn) {
      this.modalDismissBtn.addEventListener('click', () => this.closeProjectModal());
    }
    if (this.modalBackdrop) {
      this.modalBackdrop.addEventListener('click', () => this.closeProjectModal());
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.projectModal?.classList.contains('is-open')) {
        this.closeProjectModal();
      }
    });
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isInViewport = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    if (this.track) observer.observe(this.track);
    else if (this.stage) observer.observe(this.stage);
  }

  onResize() {
    const w = this.stage?.clientWidth || window.innerWidth;
    const h = this.stage?.clientHeight || window.innerHeight;
    this.stageWidth = w;
    this.stageHeight = h;

    if (this.canvas) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = w * dpr;
      this.canvas.height = h * dpr;
      this.canvas.style.width = `${w}px`;
      this.canvas.style.height = `${h}px`;
      if (this.ctx) {
        this.ctx.resetTransform();
        this.ctx.scale(dpr, dpr);
      }
    }

    if (w < 600) this.scaleRatio = 0.52;
    else if (w < 900) this.scaleRatio = 0.72;
    else if (w < 1200) this.scaleRatio = 0.88;
    else this.scaleRatio = 1.0;
  }

  updateTooltipPosition() {
    if (!this.tooltip || !this.isTooltipActive) return;

    const tooltipWidth = 320;
    const tooltipHeight = 150;
    let targetX = this.pointerClientX + 18;
    let targetY = this.pointerClientY + 18;

    if (targetX + tooltipWidth > window.innerWidth - 16) {
      targetX = this.pointerClientX - tooltipWidth - 18;
    }
    if (targetY + tooltipHeight > window.innerHeight - 16) {
      targetY = this.pointerClientY - tooltipHeight - 18;
    }

    this.tooltipCurrentX += (targetX - this.tooltipCurrentX) * 0.24;
    this.tooltipCurrentY += (targetY - this.tooltipCurrentY) * 0.24;

    this.tooltip.style.transform = `translate3d(${this.tooltipCurrentX.toFixed(1)}px, ${this.tooltipCurrentY.toFixed(1)}px, 0)`;
  }

  setupListeners() {
    window.addEventListener('resize', this.onResize, { passive: true });
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    window.addEventListener('pointerleave', () => {
      this.pointerClientX = -9999;
      this.pointerClientY = -9999;
      this.targetProjectsDilation = 1.0;
    });

    if (this.returnTechBtn) {
      this.returnTechBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.triggerTechZoom();
      });
    }

    if (this.heroProjectsBtn) {
      this.heroProjectsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.triggerProjectsZoom();
      });
    }
  }

  triggerProjectsZoom() {
    if (!this.track) return;
    const trackTop = this.track.offsetTop;
    const maxScroll = this.track.offsetHeight - window.innerHeight;
    const targetY = trackTop + maxScroll * 0.88;

    if (window.AppState && window.AppState.lenis) {
      window.AppState.lenis.scrollTo(targetY, { duration: 1.8 });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }

  triggerTechZoom() {
    if (!this.track) return;
    const trackTop = this.track.offsetTop;
    const maxScroll = this.track.offsetHeight - window.innerHeight;
    const targetY = trackTop + maxScroll * 0.38;

    if (window.AppState && window.AppState.lenis) {
      window.AppState.lenis.scrollTo(targetY, { duration: 1.4 });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }

  onPointerMove(e) {
    this.pointerClientX = e.clientX;
    this.pointerClientY = e.clientY;

    if (!this.isInViewport) return;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const nx = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth / 2)));
    const ny = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight / 2)));

    this.targetCamRotY = nx * 0.44;
    this.targetCamRotX = -ny * 0.35;
  }

  onScroll() {
    // Progress updated in animation loop
  }

  updateSpaceZoom() {
    if (!this.track) return;
    const trackRect = this.track.getBoundingClientRect();
    const trackTop = trackRect.top;
    const trackH = this.track.offsetHeight;
    const winH = window.innerHeight;
    const maxScroll = trackH - winH;

    if (maxScroll <= 0) return;

    const currentScroll = -trackTop;
    const rawProgress = currentScroll / maxScroll;
    this.targetZoomProgress = Math.max(0, Math.min(1, rawProgress));

    this.zoomProgress += (this.targetZoomProgress - this.zoomProgress) * 0.14;
    const p = this.zoomProgress;

    // Phase 4: Projects Solar System Layer [0.65 -> 1.00]
    if (this.projectsLayer) {
      if (p <= 0.65) {
        this.projectsLayer.style.opacity = '0';
        this.projectsLayer.style.visibility = 'hidden';
        this.projectsLayer.style.pointerEvents = 'none';
        this.projectsLayer.style.transform = 'scale(0.16) translateZ(0)';
      } else {
        this.projectsLayer.style.visibility = 'visible';
        const projP = Math.min(1, Math.max(0, (p - 0.65) / 0.16));
        const easedProj = Math.sin((projP * Math.PI) / 2);

        const projScale = 0.16 + easedProj * 0.84;
        const projOpacity = Math.min(1, projP * 1.35);
        const projBlur = (1 - easedProj) * 18;

        this.projectsLayer.style.transform = `scale(${projScale.toFixed(3)}) translateZ(0)`;
        this.projectsLayer.style.opacity = projOpacity.toFixed(3);
        this.projectsLayer.style.filter = projBlur > 0.4 ? `blur(${projBlur.toFixed(1)}px)` : 'none';
        this.projectsLayer.style.pointerEvents = projP > 0.85 ? 'auto' : 'none';
      }
    }
  }

  project3D(x0, y0, z0, ring, camX, camY) {
    // 1. Orbital Plane Euler rotation
    const y1 = y0 * Math.cos(ring.tiltX) - z0 * Math.sin(ring.tiltX);
    const z1 = y0 * Math.sin(ring.tiltX) + z0 * Math.cos(ring.tiltX);
    const x1 = x0;

    const x2 = x1 * Math.cos(ring.tiltY) + z1 * Math.sin(ring.tiltY);
    const z2 = -x1 * Math.sin(ring.tiltY) + z1 * Math.cos(ring.tiltY);
    const y2 = y1;

    const x3 = x2 * Math.cos(ring.tiltZ) - y2 * Math.sin(ring.tiltZ);
    const y3 = x2 * Math.sin(ring.tiltZ) + y2 * Math.cos(ring.tiltZ);
    const z3 = z2;

    // 2. Camera Parallax Rotation
    const xCam = x3 * Math.cos(camY) + z3 * Math.sin(camY);
    const zCam1 = -x3 * Math.sin(camY) + z3 * Math.cos(camY);

    const yCam = y3 * Math.cos(camX) - zCam1 * Math.sin(camX);
    const zCam = y3 * Math.sin(camX) + zCam1 * Math.cos(camX);

    // 3. Perspective Projection
    const fov = 850;
    const perspectiveScale = fov / (fov - zCam);

    return {
      screenX: xCam * perspectiveScale,
      screenY: yCam * perspectiveScale,
      depthZ: zCam,
      scale: perspectiveScale,
    };
  }

  renderCanvas(camX, camY) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.stageWidth;
    const h = this.stageHeight;
    const centerX = w / 2;
    const centerY = h / 2;

    ctx.clearRect(0, 0, w, h);

    if (this.zoomProgress < 0.58) return;

    const projRingAlphaMultiplier = Math.min(1, Math.max(0, (this.zoomProgress - 0.58) / 0.16));

    // Draw 3D Projects Orbital Rings
    PROJECT_RINGS.forEach((ring) => {
      const a = ring.baseRadiusX * this.scaleRatio;
      const b = ring.baseRadiusY * this.scaleRatio;
      const segments = 90;

      const points = [];
      for (let i = 0; i <= segments; i++) {
        const phi = (i / segments) * Math.PI * 2;
        const x0 = a * Math.cos(phi);
        const y0 = b * Math.sin(phi);
        const p = this.project3D(x0, y0, 0, ring, camX, camY);
        points.push({
          x: centerX + p.screenX,
          y: centerY + p.screenY,
          z: p.depthZ,
        });
      }

      // Background segments (faint, behind)
      ctx.lineWidth = 1;
      ctx.beginPath();
      let isDrawing = false;
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        if (pt.z < 0) {
          if (!isDrawing) { ctx.moveTo(pt.x, pt.y); isDrawing = true; }
          else { ctx.lineTo(pt.x, pt.y); }
        } else { isDrawing = false; }
      }
      ctx.strokeStyle = ring.color.replace(/[\d\.]+\)$/, `${(0.06 * projRingAlphaMultiplier).toFixed(2)})`);
      ctx.setLineDash([3, 5]);
      ctx.stroke();

      // Foreground segments (subtle, clean, over)
      ctx.beginPath();
      isDrawing = false;
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        if (pt.z >= 0) {
          if (!isDrawing) { ctx.moveTo(pt.x, pt.y); isDrawing = true; }
          else { ctx.lineTo(pt.x, pt.y); }
        } else { isDrawing = false; }
      }
      ctx.strokeStyle = ring.color.replace(/[\d\.]+\)$/, `${(0.20 * projRingAlphaMultiplier).toFixed(2)})`);
      ctx.setLineDash([]);
      ctx.stroke();

      // Travelling photon energy packet on project orbit
      const photonPhase = (this.time * ring.baseSpeed * 2.2) % (Math.PI * 2);
      const px0 = a * Math.cos(photonPhase);
      const py0 = b * Math.sin(photonPhase);
      const photonProj = this.project3D(px0, py0, 0, ring, camX, camY);
      if (photonProj.depthZ >= 0) {
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = ring.color;
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(centerX + photonProj.screenX, centerY + photonProj.screenY, 1.8 * photonProj.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    // Laser connection line if project is hovered
    if (this.hoveredProject && this.zoomProgress >= 0.62) {
      const activeProj = this.projectNodes.find(n => n.meta.id === this.hoveredProject.id);
      if (activeProj) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + activeProj.projX, centerY + activeProj.projY);
        ctx.strokeStyle = `${activeProj.meta.color}99`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Target reticle ring at project planet
        ctx.beginPath();
        ctx.arc(centerX + activeProj.projX, centerY + activeProj.projY, 26 * activeProj.scale, 0, Math.PI * 2);
        ctx.strokeStyle = activeProj.meta.color;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  animate() {
    if (this.isInViewport) {
      this.time += 1.0;

      this.updateSpaceZoom();

      // Smooth lerp camera angles (mouse parallax)
      this.camRotX += (this.targetCamRotX - this.camRotX) * 0.07;
      this.camRotY += (this.targetCamRotY - this.camRotY) * 0.07;

      const centerX = this.stageWidth / 2;
      const centerY = this.stageHeight / 2;

      // Update Monumental 3D Projects Title Parallax
      if (this.centerText && this.zoomProgress > 0.58) {
        const projPitch = -this.camRotX * 16;
        const projYaw = this.camRotY * 22;
        this.centerText.style.transform = `perspective(900px) rotateX(${projPitch.toFixed(2)}deg) rotateY(${projYaw.toFixed(2)}deg) translateZ(0)`;
      }

      // Update Project Planetary Worlds in 3D Orbits
      if (this.zoomProgress > 0.60 && this.projectNodes.length > 0) {
        let minProjMouseDist = 9999;
        if (this.pointerClientX > -1000 && this.pointerClientY > -1000) {
          for (let i = 0; i < this.projectNodes.length; i++) {
            const pNode = this.projectNodes[i];
            const pScreenX = centerX + pNode.projX;
            const pScreenY = centerY + pNode.projY;
            const d = Math.hypot(this.pointerClientX - pScreenX, this.pointerClientY - pScreenY);
            if (d < minProjMouseDist) minProjMouseDist = d;
          }

          const projProximity = Math.max(0, Math.min(1, (minProjMouseDist - 30) / 220));
          this.targetProjectsDilation = 0.20 + 0.80 * Math.pow(projProximity, 1.5);

          if (this.hoveredProject) {
            this.targetProjectsDilation = 0.05;
          }
        } else {
          this.targetProjectsDilation = 1.0;
        }

        this.projectsDilation += (this.targetProjectsDilation - this.projectsDilation) * 0.08;

        this.projectNodes.forEach(pNode => {
          const ring = pNode.ring;

          const pSpeed = (pNode.meta.id === this.hoveredProject?.id)
            ? ring.baseSpeed * 0.05
            : ring.baseSpeed * this.projectsDilation;

          pNode.theta += pSpeed;

          const a = ring.baseRadiusX * this.scaleRatio;
          const b = ring.baseRadiusY * this.scaleRatio;

          const x0 = a * Math.cos(pNode.theta);
          const y0 = b * Math.sin(pNode.theta);

          const wobbleAmp = (ring.wobbleAmp * 0.6) * this.scaleRatio;
          const z0 = wobbleAmp * Math.sin(2 * pNode.theta + this.time * 0.012);

          const proj = this.project3D(x0, y0, z0, ring, this.camRotX, this.camRotY);

          pNode.projX = proj.screenX;
          pNode.projY = proj.screenY;
          pNode.projZ = proj.depthZ;
          pNode.scale = proj.scale;

          const screenPosX = centerX + proj.screenX;
          const screenPosY = centerY + proj.screenY;

          const isFront = pNode.projZ >= 0;
          pNode.isFront = isFront;

          let zIndex = 50;
          let opacity = 1.0;
          let scale = pNode.scale;
          let blurPx = 0;
          let brightness = 1.0;

          if (isFront) {
            zIndex = Math.max(52, Math.min(99, Math.round(55 + pNode.projZ / 12)));
            scale = pNode.scale * 1.08;
            opacity = 1.0;
            brightness = 1.05;

            pNode.el.classList.add('is-front');
            pNode.el.classList.remove('is-behind');
          } else {
            zIndex = Math.max(1, Math.min(48, Math.round(25 + pNode.projZ / 18)));
            scale = pNode.scale * 0.82;
            opacity = Math.max(0.48, Math.min(0.88, 0.78 + pNode.projZ / 700));
            blurPx = Math.min(2.5, Math.abs(pNode.projZ) / 200);
            brightness = Math.max(0.65, 0.9 + pNode.projZ / 800);

            pNode.el.classList.add('is-behind');
            pNode.el.classList.remove('is-front');
          }

          pNode.el.style.zIndex = zIndex;
          pNode.el.style.opacity = opacity;
          pNode.el.style.transform = `translate3d(${screenPosX.toFixed(1)}px, ${screenPosY.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
          pNode.el.style.filter = blurPx > 0.4 ? `blur(${blurPx.toFixed(1)}px) brightness(${brightness.toFixed(2)})` : `brightness(${brightness.toFixed(2)})`;
        });
      }

      this.renderCanvas(this.camRotX, this.camRotY);
      this.updateTooltipPosition();
    }

    requestAnimationFrame(this.animate);
  }
}

export function initProjectSolarSystem() {
  const stage = document.getElementById('projects-stage');
  if (stage) {
    return new ProjectSolarSystem();
  }
  return null;
}
