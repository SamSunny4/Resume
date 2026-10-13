/**
 * 3D CYLINDRICAL CREDENTIALS MATRIX ENGINE (WebGL / Three.js)
 * -----------------------------------------------------------
 * True curved cylindrical drum carousel matching reference mockup:
 *   - Continuous 3D CylinderGeometry with physically curved card meshes
 *   - 4-5 cards visible across the front arc with authentic curvature
 *   - Illuminated warm amber top rail with 40 glowing stardust beads
 *   - Illuminated cool cyan bottom rail with 40 glowing stardust beads
 *   - Smoked glass cylindrical drum ribbon
 *   - Dark glossy studio mirror floor reflections
 *   - Interactive drag-to-spin, momentum physics, hover time-dilation & lightbox
 */

// ── Verified Certificates with Authentic Analyzed Logos & Telemetry ──
export const CERTIFICATES = [
  {
    id: 'energya-hackathon',
    title: 'Eneryia Hackathon Finalist',
    subtitle: 'SHRESHTA \'25 TECHNO-CULTURAL CONCLAVE',
    org: 'MITS Kochi · NBA Accredited',
    issuerTag: 'Muthoot Group · Indivara',
    code: 'ENR-HACK-2025-V7',
    date: 'FEB 15, 2025',
    accent: '#FF9900',
    badge: '⚡ ENERGYA',
    score: 'Active Participant',
    image: 'assets/certificates/Eneryahackathon.png',
    logos: [
      { name: 'mits', label: 'MITS' },
      { name: 'nba', label: 'NBA' }
    ]
  },
  {
    id: 'nptel-ml',
    title: 'Machine Learning (Elite 92%)',
    subtitle: 'NPTEL ONLINE CERTIFICATION · TOP 2% TOPPER',
    org: 'Indian Institute of Technology Kharagpur',
    issuerTag: 'IIT Kharagpur · SWAYAM · MoE',
    code: 'NPTEL26CS119S255301233',
    date: 'JUL-SEP 2026',
    accent: '#10B981',
    badge: '🥇 TOP 2% · 92%',
    score: 'Score: 92% (Top 2% Topper)',
    image: 'assets/certificates/Nptelmachinelearning.png',
    logos: [
      { name: 'iit-kharagpur', label: 'IIT Kharagpur' },
      { name: 'nptel', label: 'NPTEL' },
      { name: 'swayam', label: 'SWAYAM' }
    ]
  },
  {
    id: 'mern-stack',
    title: 'End-to-End MERN Lifecycle',
    subtitle: 'REACT · NODE.JS · MONGODB · EXPRESS · GIT',
    org: 'Zero Pixels Technologies Pvt Ltd',
    issuerTag: 'Full-Stack Product Lifecycle',
    code: 'ZEROPIXELS-MERN-2026',
    date: 'JUL 10, 2026',
    accent: '#38BDF8',
    badge: '🛠️ FULL-STACK',
    score: 'Course Complete',
    image: 'assets/certificates/mernstack.jpg',
    logos: [
      { name: 'zeropixels', label: 'Zero Pixels' },
      { name: 'react', label: 'React' },
      { name: 'nodejs', label: 'Node.js' }
    ]
  },
  {
    id: 'nptel',
    title: 'Python for Data Science',
    subtitle: 'ELITE NPTEL ONLINE CERTIFICATION (73%)',
    org: 'Indian Institute of Technology Madras',
    issuerTag: 'IIT Madras · SWAYAM · MoE',
    code: 'NPTEL25CS104S335000600',
    date: 'JUL-AUG 2025',
    accent: '#A855F7',
    badge: '📜 ELITE 73%',
    score: 'Score: 73% (Elite)',
    image: 'assets/certificates/nptel.png',
    logos: [
      { name: 'iit-madras', label: 'IIT Madras' },
      { name: 'nptel', label: 'NPTEL' },
      { name: 'swayam', label: 'SWAYAM' }
    ]
  },
  {
    id: 'national-hackathon',
    title: 'National AI 2nd Prize',
    subtitle: 'AI SAMASYA HACKATHON · TEAM BEYOND VISION',
    org: 'Muthoot Institute of Technology & Science',
    issuerTag: 'IHRD & Govt of Kerala',
    code: 'MITS-AI-2026-02',
    date: 'JAN 18, 2026',
    accent: '#D2FF00',
    badge: '🥈 2ND PLACE',
    score: 'National Second',
    image: 'assets/certificates/nationalhackathon.jpg',
    logos: [
      { name: 'edu-ai', label: 'edu@ai 3.0' },
      { name: 'ihrd', label: 'IHRD Kerala' },
      { name: 'mits', label: 'MITS' }
    ]
  },
  {
    id: 'isro-hackathon',
    title: 'Bharatiya Antariksh Hackathon',
    subtitle: 'NATIONAL SPACE INNOVATION CHALLENGE',
    org: 'ISRO & Hack2Skill',
    issuerTag: 'Indian Space Research Organisation',
    code: '2025H2S06BAH25-P05177',
    date: 'AUG 2025',
    accent: '#00F0FF',
    badge: '🚀 ISRO',
    score: 'Verified Participant',
    image: 'assets/certificates/isrohackathon.png',
    logos: [
      { name: 'isro', label: 'ISRO' },
      { name: 'hack2skill', label: 'Hack2Skill' }
    ]
  },
  {
    id: 'program-rep',
    title: 'Program Representative CS(AI)',
    subtitle: 'COLLEGE UNION STUDENT LEADERSHIP COUNCIL',
    org: 'MITS Kochi (Autonomous)',
    issuerTag: 'College Union 2025–2026',
    code: 'MITS-UNION-REP-CSAI',
    date: '2025–2026',
    accent: '#EC4899',
    badge: '🎓 LEADERSHIP',
    score: 'Appreciation Award',
    image: 'assets/certificates/programrep.jpg',
    logos: [
      { name: 'mits', label: 'MITS' },
      { name: 'union', label: 'College Union' }
    ]
  },
  {
    id: 'industry-immersion',
    title: 'Industrial Immersion Program',
    subtitle: 'MARIAPPS MARINE SOLUTIONS · SMARTCITY KOCHI',
    org: 'MariApps Marine Solutions Pvt Ltd',
    issuerTag: 'Enterprise Systems & Operations',
    code: 'MARIAPPS-IND-2026-ENG',
    date: 'JAN 30, 2026',
    accent: '#F59E0B',
    badge: '🏭 INDUSTRY',
    score: 'Participation Award',
    image: 'assets/certificates/industryvisit.jpeg',
    logos: [
      { name: 'mariapps', label: 'MariApps' },
      { name: 'mits', label: 'MITS' }
    ]
  },
  {
    id: 'linguaskill',
    title: 'Cambridge Linguaskill C1/B2',
    subtitle: 'INTERNATIONAL ENGLISH LANGUAGE PROFICIENCY',
    org: 'Cambridge Assessment English',
    issuerTag: 'University of Cambridge',
    code: 'CAM-LINGUA-EN-88',
    date: '2024',
    accent: '#22C55E',
    badge: '🌐 CAMBRIDGE',
    score: 'C1/B2 Proficient',
    image: 'assets/certificates/liguaskill.PDF',
    logos: [
      { name: 'cambridge', label: 'Cambridge' }
    ]
  },
];

// Cache for preloaded SVG brand logos
const LOGO_CACHE = new Map();

function preloadLogo(logoName) {
  if (LOGO_CACHE.has(logoName)) return LOGO_CACHE.get(logoName);
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = `assets/credential-logos/${logoName}.svg`;
  LOGO_CACHE.set(logoName, img);
  return img;
}

// Preload all logos
CERTIFICATES.forEach(cert => {
  cert.logos.forEach(l => preloadLogo(l.name));
});

export class CredentialsMobiusEngine {
  constructor() {
    this.section = document.getElementById('credentials');
    if (!this.section) return;

    this.container       = null;
    this.canvas          = null;
    this.scene           = null;
    this.camera          = null;
    this.renderer        = null;
    this.cylinderMaster  = null;
    this.drumGroup       = null;
    this.reflectionGroup = null;
    this.cardMeshes      = [];
    this.cardTextures    = [];

    this.raycaster       = null;
    this.pointer         = null;
    this.animId          = null;
    this.isInViewport    = true;
    this.isTriggered     = false;

    // Cylinder Dimensions (responsive)
    this.radius          = 560; // Cylinder radius in 3D units
    this.height          = 230; // Cylinder height in 3D units

    // Continuous Spin & Inertia Physics
    this.baseSpeed         = 0.0022;
    this.speedFactor       = 1.0;
    this.targetSpeedFactor = 1.0;
    this.cylinderAngle     = 0;
    this.dragVelocity      = 0;
    this.isDragging        = false;
    this.hasDragged        = false;
    this.dragStartX        = 0;
    this.lastPointerX      = 0;

    // Parallax Tilt
    this.camTiltX       = 0;
    this.camTiltY       = 0;
    this.targetCamTiltX = 0;
    this.targetCamTiltY = 0;

    this.hoveredMesh    = null;

    // Lightbox references
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
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp   = this.onPointerUp.bind(this);

    this.init();
  }

  async init() {
    this.buildDOM();

    // Ensure THREE is available (globally or imported)
    if (!window.THREE) {
      try {
        const threeMod = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
        window.THREE = threeMod;
      } catch (err) {
        console.warn('Three.js failed to load, falling back to window.THREE', err);
      }
    }

    if (!window.THREE) {
      console.error('Three.js unavailable for 3D curved cylinder');
      return;
    }

    this.initThree();
    this.buildScene();
    this.setupListeners();
    this.setupIntersectionObserver();
    this.onResize();

    this.animId = requestAnimationFrame(this.animate);
  }

  buildDOM() {
    this.section.innerHTML = `
      <div class="cylinder-stage-wrap" id="orbit3d-wrapper">
        <!-- Section Header -->
        <div class="cylinder-header">
          <span class="font-mono text-lime cylinder-tag">// VERIFIED CREDENTIALS &amp; AWARDS</span>
          <h2 class="cylinder-title font-display">CREDENTIALS MATRIX</h2>
          <p class="font-mono text-muted cylinder-sub">09 VERIFIED ARTIFACTS ON 3D SPINNING DRUM · DRAG TO SPIN · CLICK TO INSPECT</p>
        </div>

        <!-- 3D Curved WebGL Canvas Viewport Stage -->
        <div class="cylinder-viewport" id="orbit3d-stage" role="region" aria-label="3D Credentials Curved Spinning Cylinder">
          <div class="cylinder-glow-backdrop" aria-hidden="true"></div>
          <canvas id="cylinder-webgl-canvas" class="cylinder-webgl-canvas"></canvas>
        </div>

        <!-- Navigation HUD -->
        <div class="stage-nav-hud">
          <button id="cred-return-projects-btn" class="stage-nav-btn font-mono" title="Return to flagship projects">⤾ RETURN TO PROJECTS</button>
          <button id="cred-to-contact-btn" class="stage-nav-btn font-mono text-lime" title="Zoom warp to Contact">WARP TO TRANSMISSION MATRIX ↯</button>
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

    this.container = document.getElementById('orbit3d-stage');
    this.canvas    = document.getElementById('cylinder-webgl-canvas');

    this.lightbox          = document.getElementById('orbit3d-lightbox');
    this.lightboxImg       = document.getElementById('orbit3d-lightbox-img');
    this.lightboxPdfNotice = document.getElementById('orbit3d-lightbox-pdf-notice');
    this.lightboxTitle     = document.getElementById('orbit3d-lightbox-title');
    this.lightboxBadge     = document.getElementById('orbit3d-lightbox-badge');
    this.lightboxOrg       = document.getElementById('orbit3d-lightbox-org');
    this.lightboxCode      = document.getElementById('orbit3d-lightbox-code');
    this.lightboxBackdrop  = document.getElementById('orbit3d-lightbox-backdrop');
    this.lightboxClose     = document.getElementById('orbit3d-lightbox-close');

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
        if (window.AppState?.techSolar) {
          window.AppState.techSolar.triggerContactZoom();
        } else {
          const cs = document.getElementById('contact');
          if (cs) cs.scrollIntoView({ behavior: 'smooth' });
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

  initThree() {
    const THREE = window.THREE;
    const rect = this.container.getBoundingClientRect();
    const width = Math.max(320, rect.width || window.innerWidth);
    const height = Math.max(380, rect.height || 540);

    this.scene = new THREE.Scene();

    // Camera at isometric eye-level perspective looking down into drum
    this.camera = new THREE.PerspectiveCamera(36, width / height, 10, 5000);
    this.camera.position.set(0, 125, 980);
    this.camera.lookAt(0, -15, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.raycaster = new THREE.Raycaster();
    this.pointer   = new THREE.Vector2();

    // Studio Ambient & Emissive Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.90);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.25);
    dirLight.position.set(0, 700, 1100);
    this.scene.add(dirLight);

    // Amber bloom light (illuminates top rail & card top bevels)
    const amberLight = new THREE.PointLight(0xff9900, 3.8, 1400);
    amberLight.position.set(0, this.height / 2 + 70, 0);
    this.scene.add(amberLight);

    // Cyan bloom light (illuminates bottom rail & floor reflection)
    const cyanLight = new THREE.PointLight(0x00f0ff, 3.8, 1400);
    cyanLight.position.set(0, -this.height / 2 - 50, 0);
    this.scene.add(cyanLight);
  }

  buildScene() {
    const THREE = window.THREE;

    // Master Cylinder Group with -8.5° elevation pitch for top-down isometric view
    this.cylinderMaster = new THREE.Group();
    this.cylinderMaster.rotation.x = -0.145; // ~8.5° pitch
    this.scene.add(this.cylinderMaster);

    // Rotating Drum Container
    this.drumGroup = new THREE.Group();
    this.cylinderMaster.add(this.drumGroup);

    const total = CERTIFICATES.length;
    const cardArc = (32.8 * Math.PI) / 180; // Angular span of each curved card (~32.8°)
    const R = this.radius;
    const H = this.height;

    // ── 1. Physically Curved 3D Cylinder Cards ──
    CERTIFICATES.forEach((cert, index) => {
      // Cylinder geometry: radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength
      // Centered at theta = 0 so it points directly outward (+Z)
      const geo = new THREE.CylinderGeometry(
        R,
        R,
        H,
        36, // 36 radial segments for buttery-smooth curvature!
        1,
        true,
        -cardArc / 2,
        cardArc
      );

      const texture = this.createCardTexture(cert);
      this.cardTextures.push(texture);

      const mat = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        roughness: 0.28,
        metalness: 0.12,
        side: THREE.DoubleSide
      });

      const mesh = new THREE.Mesh(geo, mat);

      // Distribute evenly around 360° circle: 9 cards * 40° = 360°
      const angle = (index / total) * Math.PI * 2;
      mesh.rotation.y = -angle;

      mesh.userData = {
        cert,
        index,
        baseAngle: angle,
        material: mat
      };

      this.cardMeshes.push(mesh);
      this.drumGroup.add(mesh);
    });

    // ── 2. Top Illuminated Warm Amber Laser Rail + Stardust Beads ──
    const topRailGeo = new THREE.TorusGeometry(R, 2.6, 16, 120);
    const topRailMat = new THREE.MeshStandardMaterial({
      color: 0xffaa00,
      emissive: 0xff8800,
      emissiveIntensity: 2.2,
      roughness: 0.15
    });
    const topRail = new THREE.Mesh(topRailGeo, topRailMat);
    topRail.rotation.x = Math.PI / 2;
    topRail.position.y = H / 2 + 1.5;
    this.drumGroup.add(topRail);

    // 40 Glowing Amber Beads
    const beadCount = 40;
    const beadGeo = new THREE.SphereGeometry(2.6, 8, 8);
    const topBeadMat = new THREE.MeshBasicMaterial({ color: 0xfff6dd });

    for (let i = 0; i < beadCount; i++) {
      const bAngle = (i / beadCount) * Math.PI * 2;
      const bead = new THREE.Mesh(beadGeo, topBeadMat);
      bead.position.set(
        Math.sin(bAngle) * R,
        H / 2 + 1.5,
        Math.cos(bAngle) * R
      );
      this.drumGroup.add(bead);
    }

    // ── 3. Bottom Illuminated Cool Cyan Laser Rail + Stardust Beads ──
    const bottomRailGeo = new THREE.TorusGeometry(R, 2.6, 16, 120);
    const bottomRailMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00b8ff,
      emissiveIntensity: 2.2,
      roughness: 0.15
    });
    const bottomRail = new THREE.Mesh(bottomRailGeo, bottomRailMat);
    bottomRail.rotation.x = Math.PI / 2;
    bottomRail.position.y = -H / 2 - 1.5;
    this.drumGroup.add(bottomRail);

    // 40 Glowing Cyan Beads
    const bottomBeadMat = new THREE.MeshBasicMaterial({ color: 0xe0ffff });
    for (let i = 0; i < beadCount; i++) {
      const bAngle = (i / beadCount) * Math.PI * 2;
      const bead = new THREE.Mesh(beadGeo, bottomBeadMat);
      bead.position.set(
        Math.sin(bAngle) * R,
        -H / 2 - 1.5,
        Math.cos(bAngle) * R
      );
      this.drumGroup.add(bead);
    }

    // ── 4. Smoked Glass Cylindrical Drum Ribbon ──
    const drumBodyGeo = new THREE.CylinderGeometry(R - 0.8, R - 0.8, H + 5, 64, 1, true);
    const drumBodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x040a0e,
      transparent: true,
      opacity: 0.38,
      roughness: 0.35,
      metalness: 0.2,
      side: THREE.DoubleSide
    });
    const drumBody = new THREE.Mesh(drumBodyGeo, drumBodyMat);
    this.drumGroup.add(drumBody);

    // ── 5. Glossy Reflective Studio Floor ──
    // Inverted reflection of cylinder drum
    this.reflectionGroup = this.drumGroup.clone(true);
    this.reflectionGroup.scale.y = -1;
    this.reflectionGroup.position.y = -H - 32;

    this.reflectionGroup.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.transparent = true;
        child.material.opacity = child.material.opacity * 0.32;
      }
    });
    this.cylinderMaster.add(this.reflectionGroup);

    // Dark Mirror Floor Disc with Specular Cyan/Amber Falloff
    const floorGeo = new THREE.PlaneGeometry(3200, 3200);
    const floorTexture = this.createFloorTexture();
    const floorMat = new THREE.MeshBasicMaterial({
      map: floorTexture,
      transparent: true,
      opacity: 0.95,
      depthWrite: false
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -H / 2 - 18;
    this.cylinderMaster.add(floorMesh);
  }

  // Generates high-resolution 1024x640 card texture matching reference mockup
  createCardTexture(cert) {
    const THREE = window.THREE;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');

    const render = () => {
      ctx.clearRect(0, 0, 1024, 640);

      // Card Background Rounded Rectangle
      const x = 16, y = 16, w = 992, h = 608, r = 44;
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.clip();

      // Deep Obsidian Graphite Glass Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 1024, 640);
      bgGrad.addColorStop(0, '#121b20');
      bgGrad.addColorStop(0.5, '#0a1114');
      bgGrad.addColorStop(1, '#05090b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(x, y, w, h);

      // Curved Inset Edge Shadows (lateral cylindrical lighting curvature)
      const leftShadow = ctx.createLinearGradient(x, 0, x + 140, 0);
      leftShadow.addColorStop(0, 'rgba(0, 0, 0, 0.75)');
      leftShadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = leftShadow;
      ctx.fillRect(x, y, 140, h);

      const rightShadow = ctx.createLinearGradient(x + w - 140, 0, x + w, 0);
      rightShadow.addColorStop(0, 'rgba(0, 0, 0, 0)');
      rightShadow.addColorStop(1, 'rgba(0, 0, 0, 0.75)');
      ctx.fillStyle = rightShadow;
      ctx.fillRect(x + w - 140, y, 140, h);

      // Top Amber Rim Highlight
      const topRim = ctx.createLinearGradient(0, y, 0, y + 25);
      topRim.addColorStop(0, 'rgba(255, 170, 0, 0.45)');
      topRim.addColorStop(1, 'rgba(255, 170, 0, 0)');
      ctx.fillStyle = topRim;
      ctx.fillRect(x, y, w, 25);

      // Bottom Cyan Rim Highlight
      const bottomRim = ctx.createLinearGradient(0, y + h - 25, 0, y + h);
      bottomRim.addColorStop(0, 'rgba(0, 240, 255, 0)');
      bottomRim.addColorStop(1, 'rgba(0, 240, 255, 0.45)');
      ctx.fillStyle = bottomRim;
      ctx.fillRect(x, y + h - 25, w, 25);

      ctx.restore();

      // Outer Stroke Border
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.restore();

      // ── TOP ROW: Brand Logos & Status Tag ──
      let curX = 60;
      const topY = 65;

      cert.logos.forEach(logo => {
        const cachedImg = LOGO_CACHE.get(logo.name);
        const pillW = (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) ? 90 : 80;
        const pillH = 46;

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(curX, topY, pillW, pillH, 12);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.72)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.lineWidth = 2;
        ctx.stroke();

        if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
          ctx.drawImage(cachedImg, curX + 10, topY + 8, pillW - 20, pillH - 16);
        } else {
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 18px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(logo.label || logo.name, curX + pillW / 2, topY + pillH / 2);
        }
        ctx.restore();

        curX += pillW + 14;
      });

      // Accent Status Pill (Right)
      ctx.save();
      ctx.font = 'bold 20px monospace';
      const badgeText = cert.badge;
      const badgeTextW = ctx.measureText(badgeText).width;
      const badgePillW = badgeTextW + 36;
      const badgePillX = 964 - badgePillW;

      ctx.beginPath();
      ctx.roundRect(badgePillX, topY, badgePillW, 46, 12);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      ctx.fill();
      ctx.strokeStyle = cert.accent;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = cert.accent;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(badgeText, badgePillX + badgePillW / 2, topY + 23);
      ctx.restore();

      // ── TITLE & SUBTITLE ──
      ctx.save();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 46px "Syne", -apple-system, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      let titleText = cert.title;
      if (ctx.measureText(titleText).width > 880) {
        while (ctx.measureText(titleText + '...').width > 880 && titleText.length > 5) {
          titleText = titleText.slice(0, -1);
        }
        titleText += '...';
      }
      ctx.fillText(titleText, 60, 160);

      ctx.fillStyle = cert.accent;
      ctx.font = 'bold 22px monospace';
      let subText = cert.subtitle;
      if (ctx.measureText(subText).width > 880) {
        while (ctx.measureText(subText + '...').width > 880 && subText.length > 5) {
          subText = subText.slice(0, -1);
        }
        subText += '...';
      }
      ctx.fillText(subText, 60, 230);
      ctx.restore();

      // ── MIDDLE ROW: Shield Score & Circular Checkmark Seal ──
      // Divider Line
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(60, 305);
      ctx.lineTo(964, 305);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Shield Icon
      ctx.save();
      const sX = 60, sY = 340;
      ctx.fillStyle = cert.accent;
      ctx.strokeStyle = cert.accent;
      ctx.lineWidth = 3;

      // Draw SVG Shield
      ctx.beginPath();
      ctx.moveTo(sX + 16, sY);
      ctx.lineTo(sX + 32, sY + 8);
      ctx.lineTo(sX + 32, sY + 26);
      ctx.bezierCurveTo(sX + 32, sY + 38, sX + 16, sY + 46, sX + 16, sY + 48);
      ctx.bezierCurveTo(sX + 16, sY + 46, sX, sY + 38, sX, sY + 26);
      ctx.lineTo(sX, sY + 8);
      ctx.closePath();
      ctx.globalAlpha = 0.25;
      ctx.fill();
      ctx.globalAlpha = 1.0;
      ctx.stroke();

      // Checkmark inside shield
      ctx.beginPath();
      ctx.moveTo(sX + 8, sY + 24);
      ctx.lineTo(sX + 14, sY + 30);
      ctx.lineTo(sX + 24, sY + 18);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3.5;
      ctx.stroke();
      ctx.restore();

      // Score text & issuer
      ctx.save();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 28px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(cert.score, 110, 335);

      ctx.fillStyle = '#8E9EA4';
      ctx.font = '20px monospace';
      ctx.fillText(cert.issuerTag, 110, 375);
      ctx.restore();

      // Glowing Circular Seal Badge Stamp (Right)
      ctx.save();
      const sealX = 910, sealY = 365, sealR = 36;
      ctx.strokeStyle = cert.accent;

      // Outer dashed circle
      ctx.beginPath();
      ctx.arc(sealX, sealY, sealR, 0, Math.PI * 2);
      ctx.setLineDash([6, 4]);
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Inner solid circle
      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.arc(sealX, sealY, sealR - 8, 0, Math.PI * 2);
      ctx.lineWidth = 2.5;
      ctx.fillStyle = cert.accent;
      ctx.globalAlpha = 0.2;
      ctx.fill();
      ctx.globalAlpha = 1.0;
      ctx.stroke();

      // Seal Checkmark
      ctx.beginPath();
      ctx.moveTo(sealX - 12, sealY);
      ctx.lineTo(sealX - 4, sealY + 8);
      ctx.lineTo(sealX + 12, sealY - 8);
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
      ctx.restore();

      // ── BOTTOM ROW: Telemetry ID & Date ──
      ctx.save();
      ctx.fillStyle = '#7B8C92';
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`ID: ${cert.code}`, 60, 580);

      ctx.fillStyle = '#6C7D83';
      ctx.textAlign = 'right';
      ctx.fillText(cert.date, 964, 580);
      ctx.restore();
    };

    render();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = this.renderer ? this.renderer.capabilities.getMaxAnisotropy() : 8;
    texture.needsUpdate = true;

    // If logo SVGs load asynchronously, repaint texture
    cert.logos.forEach(logo => {
      const img = LOGO_CACHE.get(logo.name);
      if (img && !img.complete) {
        img.onload = () => {
          render();
          texture.needsUpdate = true;
        };
      }
    });

    return texture;
  }

  // Dark studio floor mirror texture with radial cyan/amber specular falloff
  createFloorTexture() {
    const THREE = window.THREE;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(512, 512, 10, 512, 512, 512);
    grad.addColorStop(0, 'rgba(0, 240, 255, 0.14)');
    grad.addColorStop(0.25, 'rgba(255, 170, 0, 0.05)');
    grad.addColorStop(0.50, 'rgba(5, 10, 14, 0.88)');
    grad.addColorStop(0.70, 'rgba(2, 4, 6, 0.98)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 1)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  setupListeners() {
    window.addEventListener('resize', this.onResize, { passive: true });
    window.addEventListener('mousemove', this.onPointerMove, { passive: true });

    if (!this.canvas) return;

    this.canvas.addEventListener('pointerdown', this.onPointerDown);
    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
  }

  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window) || !this.section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isInViewport = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(this.section);
  }

  onPointerDown(e) {
    this.isDragging   = true;
    this.hasDragged   = false;
    this.dragStartX   = e.clientX;
    this.lastPointerX = e.clientX;
    this.dragVelocity = 0;
  }

  onPointerMove(e) {
    // Parallax Tilt
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    this.targetCamTiltX = Math.max(-1, Math.min(1, (e.clientX - cx) / cx));
    this.targetCamTiltY = Math.max(-1, Math.min(1, (e.clientY - cy) / cy));

    if (this.isDragging) {
      const deltaX = e.clientX - this.lastPointerX;
      if (Math.abs(e.clientX - this.dragStartX) > 6) {
        this.hasDragged = true;
      }
      this.dragVelocity = deltaX * 0.0032;
      this.cylinderAngle -= this.dragVelocity;
      this.lastPointerX = e.clientX;
      return;
    }

    // Raycast for Hover Time-Dilation & Inspect Highlights
    if (!this.canvas || !this.camera || !this.raycaster) return;

    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.cardMeshes);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      this.hoveredMesh = hit;
      this.targetSpeedFactor = 0.04; // Smoothly slows cylinder down for reading
      this.canvas.style.cursor = 'pointer';

      // Subtle emissive glow on hovered mesh
      this.cardMeshes.forEach(m => {
        if (m === hit) {
          m.material.emissive = new window.THREE.Color(0x334455);
          m.material.emissiveIntensity = 0.45;
        } else {
          m.material.emissive = new window.THREE.Color(0x000000);
          m.material.emissiveIntensity = 0;
        }
      });
    } else {
      this.hoveredMesh = null;
      this.targetSpeedFactor = 1.0;
      this.canvas.style.cursor = 'grab';

      this.cardMeshes.forEach(m => {
        m.material.emissive = new window.THREE.Color(0x000000);
        m.material.emissiveIntensity = 0;
      });
    }
  }

  onPointerUp(e) {
    if (!this.isDragging) return;
    this.isDragging = false;

    // If it was a quick click (no drag), open Lightbox
    if (!this.hasDragged && this.canvas && this.camera && this.raycaster) {
      const rect = this.canvas.getBoundingClientRect();
      this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.pointer, this.camera);
      const intersects = this.raycaster.intersectObjects(this.cardMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData && hit.userData.cert) {
          this.openLightbox(hit.userData.cert);
        }
      }
    }
  }

  onResize() {
    if (!this.container || !this.camera || !this.renderer) return;

    const rect = this.container.getBoundingClientRect();
    const width = Math.max(320, rect.width || window.innerWidth);
    const height = Math.max(380, rect.height || 540);

    this.camera.aspect = width / height;

    if (width < 480) {
      this.camera.position.z = 1450;
      this.camera.position.y = 185;
    } else if (width < 768) {
      this.camera.position.z = 1250;
      this.camera.position.y = 160;
    } else if (width < 1024) {
      this.camera.position.z = 1100;
      this.camera.position.y = 140;
    } else {
      this.camera.position.z = 980;
      this.camera.position.y = 125;
    }

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  trigger(forceImmediate = false) {
    this.isTriggered  = true;
    this.isInViewport = true;
    this.onResize();
    this.speedFactor  = forceImmediate ? 1.5 : 1.3;
  }

  animate() {
    const layer = this.section ? this.section.closest('.credentials-space-layer') : null;
    const isLayerHidden = layer && (
      layer.style.visibility === 'hidden' ||
      (layer.style.opacity !== '' && parseFloat(layer.style.opacity) < 0.02)
    );
    const p = window.AppState?.techSolar?.zoomProgress ?? 0;
    const isAway = (p > 0 && (p < 0.62 || p > 0.94));

    if (document.hidden || isLayerHidden || isAway || !this.isInViewport) {
      this.animId = requestAnimationFrame(this.animate);
      return;
    }

    // Parallax Camera Interpolation
    if (window.AppState?.gyro?.active) {
      this.targetCamTiltX =  window.AppState.gyro.x;
      this.targetCamTiltY = -window.AppState.gyro.y;
    }

    this.camTiltX += (this.targetCamTiltX - this.camTiltX) * 0.05;
    this.camTiltY += (this.targetCamTiltY - this.camTiltY) * 0.05;

    if (this.camera) {
      this.camera.position.x = this.camTiltX * 70;
      this.camera.lookAt(0, -10, 0);
    }

    // Speed-Dilation & Continuous Rotation
    this.speedFactor += (this.targetSpeedFactor - this.speedFactor) * 0.08;
    this.cylinderAngle += this.baseSpeed * this.speedFactor;

    if (!this.isDragging && Math.abs(this.dragVelocity) > 0.00005) {
      this.cylinderAngle += this.dragVelocity;
      this.dragVelocity *= 0.94;
    }

    // Update 3D Drum and Mirror Reflection
    if (this.drumGroup) {
      this.drumGroup.rotation.y = this.cylinderAngle;
    }
    if (this.reflectionGroup) {
      this.reflectionGroup.rotation.y = this.cylinderAngle;
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }

    this.animId = requestAnimationFrame(this.animate);
  }

  /* ================================================================
   *  LIGHTBOX: CLICK TO REVEAL FULL RESOLUTION CERTIFICATE
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
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
    if (this.renderer) this.renderer.dispose();
  }
}

export function initCredentialsStones() {
  return new CredentialsMobiusEngine();
}
