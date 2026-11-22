/**
 * =====================================================================
 * LOKI TIMELINE WEAVER 3D ENGINE (project-solar.js) - CINEMATIC EDITION
 * =====================================================================
 * Cinematic Ultra-Realistic Multiverse Timeline Experience:
 * - High-definition layered cinematic throne & Loki figure (God of Stories)
 * - 3D Timeline Nexus at Loki's hands casting volumetric emerald radiance
 * - Fibrous glowing plasma streams (thousands of soft additive photon motes)
 * - Multi-filament organic lightning threads weaving around each timeline
 * - Deep cosmic void with atmospheric mist, ambient Yggdrasil tree fan
 * - Smooth camera flight along timeline strands into deep space on mouse move
 * - Floating glassmorphic project telemetry card + deep-dive modal
 * =====================================================================
 */

import { PROJECT_NODES, PROJECT_RINGS } from './projects.js';
export { PROJECT_NODES, PROJECT_RINGS };

export class ProjectTimelineEngine {
  constructor() {
    this.stage = document.getElementById('projects-stage');
    this.projectsLayer = document.getElementById('projects-space-layer');
    this.canvas = document.getElementById('projects-canvas');
    this.centerText = document.getElementById('projects-center-text');
    this.centerAnchor = document.getElementById('projects-center-anchor');
    this.track = document.getElementById('space-stage-track');

    // Interactive Project Deep-Dive Modal Elements
    this.projectModal = document.getElementById('project-detail-modal');
    this.modalTitle = document.getElementById('modal-title');
    this.modalStatus = document.getElementById('modal-status');
    this.modalCategory = document.getElementById('modal-category');
    this.modalDesc = document.getElementById('modal-desc');
    this.modalIcon = document.getElementById('modal-icon');
    this.modalTechChips = document.getElementById('modal-tech-chips');
    this.modalStatsList = document.getElementById('modal-stats-list');
    this.modalRepoLink = document.getElementById('modal-repo-link');
    this.modalCloseBtn = document.getElementById('modal-close-btn');
    this.modalDismissBtn = document.getElementById('modal-dismiss-btn');
    this.modalBackdrop = document.getElementById('project-modal-backdrop');

    // Navigation Buttons
    this.returnTechBtn = document.getElementById('return-tech-btn');
    this.projectsToContactBtn = document.getElementById('projects-to-contact-btn');

    // Floating HUD Card & Selector elements
    this.hudCard = document.getElementById('timeline-project-card');
    this.selectorHud = document.getElementById('timeline-selector-hud');

    if (!this.stage || !this.canvas) {
      console.warn('[TimelineEngine] Projects stage or canvas not found in DOM.');
      return;
    }

    if (typeof THREE === 'undefined') {
      console.error('[TimelineEngine] Three.js is not loaded globally.');
      return;
    }

    this.isInViewport = true;
    this.time = 0;
    this.zoomProgress = 0;

    // Mouse coordinates (-1 to 1 normalized)
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0, dist: 0 };
    this.pointerClientX = -9999;
    this.pointerClientY = -9999;

    // Camera Flight State
    this.activeProjectIndex = null;
    this.targetActiveIndex = null;
    this.travelProgress = 0; // 0 = centered on Loki, 1 = deep on timeline
    this.targetTravelProgress = 0;

    this.defaultCamPos = new THREE.Vector3(0, 0.75, 6.2);
    this.defaultLookAt = new THREE.Vector3(0, 0.25, 0);
    this.currentCamPos = this.defaultCamPos.clone();
    this.currentLookAt = this.defaultLookAt.clone();
    this.targetCamPos = this.defaultCamPos.clone();
    this.targetLookAt = this.defaultLookAt.clone();

    // 3D Collections
    this.timelines = [];
    this.backgroundFilaments = [];

    this.initThree();
    this.createGlowTexture();
    this.buildCinematicHeroBackdrop();
    this.buildTimelines();
    this.buildAmbientYggdrasilFan();
    this.buildSelectorHud();
    this.buildHudCard();
    this.setupModalListeners();
    this.setupListeners();
    this.setupIntersectionObserver();

    this.onResize = this.onResize.bind(this);
    this.animate = this.animate.bind(this);
    window.addEventListener('resize', this.onResize, { passive: true });

    requestAnimationFrame(this.animate);
    console.log('[TimelineEngine] Cinematic Loki Multiverse Timeline Engine initialized.');
  }

  /* -----------------------------------------------------------------
   * 1. THREE.JS SCENE, CAMERA & RENDERER SETUP
   * ----------------------------------------------------------------- */
  initThree() {
    const width = this.stage.clientWidth || window.innerWidth;
    const height = this.stage.clientHeight || window.innerHeight;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x020703, 0.042);

    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    this.camera.position.copy(this.defaultCamPos);
    this.camera.lookAt(this.defaultLookAt);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.3;

    // Atmospheric Lighting
    const ambientLight = new THREE.AmbientLight(0x0a1c10, 1.6);
    this.scene.add(ambientLight);

    // Blazing Emerald Nexus Light at Loki's hands
    this.nexusLight = new THREE.PointLight(0x00ff66, 5.0, 26);
    this.nexusLight.position.set(0, 0.15, -1.9);
    this.scene.add(this.nexusLight);

    // Secondary Warm Golden Throne Light
    this.throneGoldLight = new THREE.PointLight(0xffd54f, 2.4, 16);
    this.throneGoldLight.position.set(0, 1.8, -2.5);
    this.scene.add(this.throneGoldLight);

    // Directional cyan fill from upper corner
    const dirLight = new THREE.DirectionalLight(0x00f0ff, 0.45);
    dirLight.position.set(4, 8, 3);
    this.scene.add(dirLight);
  }

  /* -----------------------------------------------------------------
   * 2. SOFT RADIAL GLOW TEXTURE (For authentic optical blooming)
   * ----------------------------------------------------------------- */
  createGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0.0, 'rgba(255, 255, 235, 1.0)');
    grad.addColorStop(0.18, 'rgba(195, 255, 130, 0.9)');
    grad.addColorStop(0.42, 'rgba(0, 255, 102, 0.45)');
    grad.addColorStop(0.72, 'rgba(0, 120, 45, 0.14)');
    grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    this.glowTexture = new THREE.CanvasTexture(canvas);
  }

  /* -----------------------------------------------------------------
   * 3. CINEMATIC LOKI & CITADEL THRONE 3D HERO PLANE
   * ----------------------------------------------------------------- */
  buildCinematicHeroBackdrop() {
    this.heroGroup = new THREE.Group();

    // Load authentic feathered cinematic Loki on throne
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('assets/loki-cinematic-feathered.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearMipmapLinearFilter;

      const aspect = 843 / 561; // 1.502
      const planeH = 7.4;
      const planeW = planeH * aspect;

      const planeGeo = new THREE.PlaneGeometry(planeW, planeH);
      const planeMat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 0.96,
        depthWrite: false,
      });

      this.heroBackdropMesh = new THREE.Mesh(planeGeo, planeMat);
      this.heroBackdropMesh.position.set(0, 0.35, -2.15);
      this.heroGroup.add(this.heroBackdropMesh);
    });

    // 3D Blazing Nexus Core (Exactly at Loki's hands in 3D world space)
    const nexusGeo = new THREE.SphereGeometry(0.18, 20, 20);
    const nexusMat = new THREE.MeshBasicMaterial({
      color: 0xf5ffb8,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    this.nexusMesh = new THREE.Mesh(nexusGeo, nexusMat);
    this.nexusMesh.position.set(0, 0.15, -1.9);
    this.heroGroup.add(this.nexusMesh);

    // Rotating Ethereal Loom Rings
    this.loomRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(0.36, 0.015, 8, 32),
      new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      })
    );
    this.loomRing1.position.copy(this.nexusMesh.position);
    this.heroGroup.add(this.loomRing1);

    this.loomRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(0.54, 0.012, 8, 32),
      new THREE.MeshBasicMaterial({
        color: 0xd2ff00,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
      })
    );
    this.loomRing2.position.copy(this.nexusMesh.position);
    this.heroGroup.add(this.loomRing2);

    this.scene.add(this.heroGroup);
  }

  /* -----------------------------------------------------------------
   * 4. THE 9 PROJECT TIMELINES (FIBROUS PLASMA & ENERGETIC FLOW)
   * ----------------------------------------------------------------- */
  buildTimelines() {
    this.timelineGroup = new THREE.Group();
    // Nexus origin at Loki's hands
    const nexusOrigin = new THREE.Vector3(0, 0.15, -1.9);

    // 9 Spatial Target Vectors (Fanning out 360° into 3D foreground)
    const TARGET_VECTORS = [
      new THREE.Vector3(-4.4, 2.3, 1.4),   // 0. KeyBase (NW High)
      new THREE.Vector3(-0.9, 3.6, 1.0),   // 1. Leadis / AiSam (N Zenith)
      new THREE.Vector3(3.2, 2.8, 1.2),    // 2. InfoGrid (NE High)
      new THREE.Vector3(4.8, 0.8, 0.8),    // 3. Rainiest (E Mid)
      new THREE.Vector3(3.8, -2.1, 1.6),   // 4. Fitman (SE Low)
      new THREE.Vector3(1.3, -3.2, 2.0),   // 5. 3DS Spatial (S Low)
      new THREE.Vector3(-1.5, -3.1, 1.9),  // 6. ShareDash (SSW Low)
      new THREE.Vector3(-3.8, -1.8, 1.5),  // 7. LateLoggy (SW Low)
      new THREE.Vector3(-4.6, 0.5, 1.0),   // 8. FakePaste (W Mid)
    ];

    PROJECT_NODES.forEach((proj, idx) => {
      const endPt = TARGET_VECTORS[idx] || new THREE.Vector3(0, 2.5, 0);

      // Organic curved 3D trajectory
      const midPt1 = new THREE.Vector3(
        nexusOrigin.x * 0.65 + endPt.x * 0.35 + (Math.random() - 0.5) * 0.3,
        nexusOrigin.y * 0.65 + endPt.y * 0.35 + 0.25,
        nexusOrigin.z * 0.65 + endPt.z * 0.35 + 0.4
      );
      const midPt2 = new THREE.Vector3(
        nexusOrigin.x * 0.25 + endPt.x * 0.75 + (Math.random() - 0.5) * 0.4,
        nexusOrigin.y * 0.25 + endPt.y * 0.75 - 0.1,
        nexusOrigin.z * 0.25 + endPt.z * 0.75 + 0.5
      );

      const curve = new THREE.CatmullRomCurve3([
        nexusOrigin.clone(),
        midPt1,
        midPt2,
        endPt.clone(),
      ]);
      curve.curveType = 'centripetal';

      // --- A. Luminous Plasma Core Line (Thin & Blazing, NOT Chunky) ---
      const corePoints = curve.getPoints(90);
      const coreGeo = new THREE.BufferGeometry().setFromPoints(corePoints);
      const coreMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(0xf5ffb8),
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const coreLine = new THREE.Line(coreGeo, coreMat);
      this.timelineGroup.add(coreLine);

      // --- B. Luminous River of Flowing Photon Motes (Reference 2 Plasma Look) ---
      const motesCount = 280; // High-density particle stream
      const motesGeo = new THREE.BufferGeometry();
      const motesPos = new Float32Array(motesCount * 3);
      const motesColors = new Float32Array(motesCount * 3);

      const colorGreen = new THREE.Color(0x00ff66);
      const colorAccent = new THREE.Color(proj.color || '#D2FF00');
      const colorCore = new THREE.Color(0xf5ffc0);

      for (let m = 0; m < motesCount; m++) {
        // Gradient color along strand
        const mixed = colorGreen.clone().lerp(colorAccent, Math.random() * 0.4).lerp(colorCore, Math.random() * 0.3);
        motesColors[m * 3] = mixed.r;
        motesColors[m * 3 + 1] = mixed.g;
        motesColors[m * 3 + 2] = mixed.b;
      }

      motesGeo.setAttribute('position', new THREE.BufferAttribute(motesPos, 3));
      motesGeo.setAttribute('color', new THREE.BufferAttribute(motesColors, 3));

      const motesMat = new THREE.PointsMaterial({
        size: 0.12,
        map: this.glowTexture,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const motesPoints = new THREE.Points(motesGeo, motesMat);
      this.timelineGroup.add(motesPoints);

      // --- C. Fine Ethereal Tendril Threads (Fibrous Plasma Weave) ---
      const tendrilLines = [];
      const tendrilCount = 5;
      for (let tc = 0; tc < tendrilCount; tc++) {
        const tPts = [];
        const phase = (tc * Math.PI * 2) / tendrilCount;
        for (let s = 0; s <= 45; s++) {
          const u = s / 45;
          const pt = curve.getPointAt(u);
          const tangent = curve.getTangentAt(u);
          let up = new THREE.Vector3(0, 1, 0);
          if (Math.abs(tangent.y) > 0.9) up = new THREE.Vector3(1, 0, 0);
          const normal = new THREE.Vector3().crossVectors(tangent, up).normalize();
          const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();

          // Organic wisp offset
          const rad = 0.045 * Math.sin(u * Math.PI);
          const ang = u * Math.PI * 8.0 + phase;
          const offset = normal.clone().multiplyScalar(Math.cos(ang) * rad)
            .add(binormal.clone().multiplyScalar(Math.sin(ang) * rad));

          tPts.push(pt.clone().add(offset));
        }
        const tGeo = new THREE.BufferGeometry().setFromPoints(tPts);
        const tMat = new THREE.LineBasicMaterial({
          color: colorGreen,
          transparent: true,
          opacity: 0.4,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const tLine = new THREE.Line(tGeo, tMat);
        this.timelineGroup.add(tLine);
        tendrilLines.push(tLine);
      }

      // --- D. Project Nexus Orb at Apex ---
      const orbGroup = new THREE.Group();
      orbGroup.position.copy(endPt);

      // Inner glowing core
      const orbMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.20, 16, 16),
        new THREE.MeshBasicMaterial({
          color: colorAccent,
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
        })
      );
      orbGroup.add(orbMesh);

      // Halo Sprite
      const haloMat = new THREE.SpriteMaterial({
        map: this.glowTexture,
        color: colorAccent,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });
      const haloSprite = new THREE.Sprite(haloMat);
      haloSprite.scale.set(0.95, 0.95, 1);
      orbGroup.add(haloSprite);

      // Targeting reticle ring
      const reticleRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.38, 0.015, 8, 24),
        new THREE.MeshBasicMaterial({
          color: 0x00ff88,
          transparent: true,
          opacity: 0.7,
          blending: THREE.AdditiveBlending,
        })
      );
      orbGroup.add(reticleRing);

      this.timelineGroup.add(orbGroup);

      // Store timeline state
      this.timelines.push({
        index: idx,
        project: proj,
        curve: curve,
        coreLine: coreLine,
        coreMat: coreMat,
        motesPoints: motesPoints,
        motesMat: motesMat,
        motesCount: motesCount,
        motesSpeeds: Array.from({ length: motesCount }, () => 0.12 + Math.random() * 0.18),
        motesOffsets: Array.from({ length: motesCount }, (_, i) => i / motesCount),
        tendrilLines: tendrilLines,
        orbGroup: orbGroup,
        reticleRing: reticleRing,
        endPt: endPt,
      });
    });

    this.scene.add(this.timelineGroup);
  }

  /* -----------------------------------------------------------------
   * 5. AMBIENT YGGDRASIL BACKGROUND FAN (Dozens of Ethereal Threads)
   * ----------------------------------------------------------------- */
  buildAmbientYggdrasilFan() {
    this.ambientFanGroup = new THREE.Group();
    const nexusOrigin = new THREE.Vector3(0, 0.15, -1.9);
    const fanCount = 22;

    for (let f = 0; f < fanCount; f++) {
      const angle = (f / fanCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
      const dist = 5.5 + Math.random() * 2.5;
      const endPt = new THREE.Vector3(
        Math.cos(angle) * dist,
        Math.sin(angle) * dist * 0.75 + 0.5,
        -1.5 + (Math.random() - 0.5) * 1.5
      );

      const mid = new THREE.Vector3(
        nexusOrigin.x * 0.5 + endPt.x * 0.5 + (Math.random() - 0.5) * 0.5,
        nexusOrigin.y * 0.5 + endPt.y * 0.5 + 0.3,
        nexusOrigin.z * 0.5 + endPt.z * 0.5
      );

      const curve = new THREE.CatmullRomCurve3([nexusOrigin.clone(), mid, endPt]);
      const pts = curve.getPoints(35);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: 0x00ff66,
        transparent: true,
        opacity: 0.18 + Math.random() * 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const line = new THREE.Line(geo, mat);
      this.ambientFanGroup.add(line);
      this.backgroundFilaments.push({ line, curve, baseOpacity: mat.opacity });
    }

    this.scene.add(this.ambientFanGroup);
  }

  /* -----------------------------------------------------------------
   * 6. QUICK SELECTOR HUD (Pill Navigation for Desktop & Mobile)
   * ----------------------------------------------------------------- */
  buildSelectorHud() {
    if (!this.selectorHud) {
      this.selectorHud = document.createElement('div');
      this.selectorHud.id = 'timeline-selector-hud';
      this.selectorHud.className = 'timeline-selector-hud';
      this.stage.appendChild(this.selectorHud);
    }

    this.selectorHud.innerHTML = '';
    PROJECT_NODES.forEach((proj, idx) => {
      const btn = document.createElement('button');
      btn.className = 'timeline-pill-btn font-mono';
      btn.dataset.index = idx;
      btn.style.setProperty('--pill-accent', proj.color || '#00FF66');
      btn.innerHTML = `
        <span class="timeline-pill-dot"></span>
        <span class="timeline-pill-num">T-0${idx + 1}</span>
        <span class="timeline-pill-name">${proj.name}</span>
      `;

      btn.addEventListener('mouseenter', () => {
        this.selectTimeline(idx);
      });

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectTimeline(idx);
        if (this.activeProjectIndex === idx) {
          this.openProjectModal(proj);
        }
      });

      this.selectorHud.appendChild(btn);
    });
  }

  /* -----------------------------------------------------------------
   * 7. FLOATING PROJECT TELEMETRY CARD (Surfaces along travel path)
   * ----------------------------------------------------------------- */
  buildHudCard() {
    if (!this.hudCard) {
      this.hudCard = document.createElement('div');
      this.hudCard.id = 'timeline-project-card';
      this.hudCard.className = 'timeline-project-card';
      this.stage.appendChild(this.hudCard);
    }

    this.hudCard.innerHTML = `
      <div class="timeline-card-glow" aria-hidden="true"></div>
      <div class="timeline-card-header">
        <div class="timeline-card-icon-wrap" id="tl-card-icon-wrap">
          <img src="" alt="" id="tl-card-icon" class="timeline-card-icon" />
        </div>
        <div>
          <span class="timeline-card-badge font-mono" id="tl-card-badge">// WEAVED TIMELINE</span>
          <h3 class="timeline-card-title font-display" id="tl-card-title">PROJECT NAME</h3>
          <span class="timeline-card-category font-mono" id="tl-card-category">CATEGORY</span>
        </div>
      </div>
      <p class="timeline-card-desc font-sans" id="tl-card-desc"></p>
      <div class="timeline-card-tech-row font-mono" id="tl-card-tech"></div>
      <div class="timeline-card-actions">
        <button class="btn-primary timeline-inspect-btn font-mono" id="tl-card-inspect-btn">
          <span>INSPECT ARCHITECTURE ↗</span>
        </button>
        <a href="#" target="_blank" rel="noopener noreferrer" class="btn-secondary timeline-git-btn font-mono" id="tl-card-git-btn">
          <span>GITHUB</span>
        </a>
      </div>
      <div class="timeline-card-dismiss-hint font-mono">
        <span>CLICK CARD FOR FULL SPECS · MOVE CURSOR TO CENTER TO RESET</span>
      </div>
    `;

    this.tlCardIcon = document.getElementById('tl-card-icon');
    this.tlCardBadge = document.getElementById('tl-card-badge');
    this.tlCardTitle = document.getElementById('tl-card-title');
    this.tlCardCategory = document.getElementById('tl-card-category');
    this.tlCardDesc = document.getElementById('tl-card-desc');
    this.tlCardTech = document.getElementById('tl-card-tech');
    this.tlCardInspectBtn = document.getElementById('tl-card-inspect-btn');
    this.tlCardGitBtn = document.getElementById('tl-card-git-btn');

    if (this.tlCardInspectBtn) {
      this.tlCardInspectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.activeProjectIndex !== null) {
          this.openProjectModal(PROJECT_NODES[this.activeProjectIndex]);
        }
      });
    }

    this.hudCard.addEventListener('click', (e) => {
      if (e.target.closest('#tl-card-git-btn')) return;
      e.stopPropagation();
      if (this.activeProjectIndex !== null) {
        this.openProjectModal(PROJECT_NODES[this.activeProjectIndex]);
      }
    });
  }

  updateHudCard(proj) {
    if (!proj || !this.hudCard) return;

    this.hudCard.style.setProperty('--card-accent', proj.color || '#00FF66');
    this.hudCard.style.setProperty('--card-accent-glow', `${proj.color || '#00FF66'}44`);

    if (this.tlCardIcon) {
      this.tlCardIcon.src = proj.icon;
      this.tlCardIcon.alt = proj.name;
    }
    if (this.tlCardBadge) this.tlCardBadge.textContent = proj.badge;
    if (this.tlCardTitle) this.tlCardTitle.textContent = proj.name;
    if (this.tlCardCategory) this.tlCardCategory.textContent = proj.category;
    if (this.tlCardDesc) this.tlCardDesc.textContent = proj.desc;

    if (this.tlCardTech) {
      this.tlCardTech.innerHTML = (proj.tech || [])
        .slice(0, 4)
        .map((t) => `<span class="timeline-chip">${t}</span>`)
        .join('');
    }

    if (this.tlCardGitBtn) {
      this.tlCardGitBtn.href = proj.github || 'https://github.com/SamSunny4';
    }
  }

  /* -----------------------------------------------------------------
   * 8. TIMELINE SELECTION & CAMERA FLIGHT DISPATCHER
   * ----------------------------------------------------------------- */
  selectTimeline(index) {
    if (index === null || index === undefined) {
      this.targetActiveIndex = null;
      this.targetTravelProgress = 0;
      return;
    }

    this.targetActiveIndex = Math.max(0, Math.min(PROJECT_NODES.length - 1, index));
    this.targetTravelProgress = 1.0;
  }

  /* -----------------------------------------------------------------
   * 9. DEEP-DIVE MODAL SYSTEM
   * ----------------------------------------------------------------- */
  openProjectModal(proj) {
    if (!this.projectModal || !proj) return;
    this.activeModalProject = proj;

    if (this.modalTitle) this.modalTitle.textContent = proj.name;
    if (this.modalStatus) this.modalStatus.textContent = `// ${proj.badge}`;
    if (this.modalCategory) this.modalCategory.textContent = proj.category || '';
    if (this.modalDesc) this.modalDesc.textContent = proj.desc;
    if (this.modalIcon) {
      this.modalIcon.src = proj.icon;
      this.modalIcon.alt = proj.name;
    }

    this.projectModal.style.setProperty('--modal-accent', proj.color || '#00FF66');
    this.projectModal.style.setProperty('--modal-accent-glow', `${proj.color || '#00FF66'}44`);

    if (this.modalTechChips) {
      this.modalTechChips.innerHTML = '';
      (proj.tech || []).forEach((t) => {
        const chip = document.createElement('span');
        chip.className = 'modal-chip';
        chip.textContent = t;
        this.modalTechChips.appendChild(chip);
      });
    }

    if (this.modalStatsList) {
      this.modalStatsList.innerHTML = '';
      (proj.stats || []).forEach((s) => {
        const pill = document.createElement('div');
        pill.className = 'modal-stat-pill';
        pill.textContent = s;
        this.modalStatsList.appendChild(pill);
      });
    }

    if (this.modalRepoLink) {
      this.modalRepoLink.href = proj.github || 'https://github.com/SamSunny4';
    }

    this.projectModal.classList.add('is-open', 'is-active');
    this.projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (window.AppState?.lenis) window.AppState.lenis.stop();
  }

  closeProjectModal() {
    if (!this.projectModal) return;
    this.projectModal.classList.remove('is-open', 'is-active');
    this.projectModal.setAttribute('aria-hidden', 'true');
    this.activeModalProject = null;
    document.body.style.overflow = '';
    if (window.AppState?.lenis) window.AppState.lenis.start();
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
      if (e.key === 'Escape') {
        if (this.projectModal?.classList.contains('is-open')) {
          this.closeProjectModal();
        } else if (this.activeProjectIndex !== null) {
          this.selectTimeline(null);
        }
      }
    });
  }

  /* -----------------------------------------------------------------
   * 10. EVENT LISTENERS & NAVIGATION
   * ----------------------------------------------------------------- */
  setupListeners() {
    window.addEventListener('pointermove', (e) => this.onPointerMove(e), { passive: true });

    this.stage.addEventListener('click', (e) => {
      if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.timeline-pill-btn')) return;

      if (this.activeProjectIndex !== null && this.travelProgress > 0.45) {
        this.openProjectModal(PROJECT_NODES[this.activeProjectIndex]);
      }
    });

    if (this.returnTechBtn) {
      this.returnTechBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.triggerTechZoom();
      });
    }

    if (this.projectsToContactBtn) {
      this.projectsToContactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.triggerContactZoom();
      });
    }
  }

  onPointerMove(e) {
    this.pointerClientX = e.clientX;
    this.pointerClientY = e.clientY;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const nx = (e.clientX / w) * 2 - 1;
    const ny = -(e.clientY / h) * 2 + 1;

    this.mouse.targetX = nx;
    this.mouse.targetY = ny;
    this.mouse.dist = Math.hypot(nx, ny);

    // Center Deadzone: Near center -> Focused on Loki in chair
    // Moving outward: Traveling along nearest timeline strand
    const centerDeadzone = 0.28;

    if (this.mouse.dist < centerDeadzone) {
      this.targetActiveIndex = null;
      this.targetTravelProgress = 0;
    } else {
      const mouseAngle = Math.atan2(ny, nx);
      let closestIdx = 0;
      let minAngleDiff = 999;

      this.timelines.forEach((tl, idx) => {
        const endPt = tl.endPt;
        const tlAngle = Math.atan2(endPt.y, endPt.x);
        let diff = Math.abs(mouseAngle - tlAngle);
        if (diff > Math.PI) diff = Math.PI * 2 - diff;

        if (diff < minAngleDiff) {
          minAngleDiff = diff;
          closestIdx = idx;
        }
      });

      this.targetActiveIndex = closestIdx;
      const travelNorm = Math.min(1.0, (this.mouse.dist - centerDeadzone) / 0.52);
      this.targetTravelProgress = travelNorm;
    }
  }

  onResize() {
    const w = this.stage?.clientWidth || window.innerWidth;
    const h = this.stage?.clientHeight || window.innerHeight;

    if (this.camera && this.renderer) {
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    }
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

  triggerProjectsZoom() {
    if (window.AppState?.techSolar) {
      window.AppState.techSolar.triggerProjectsZoom();
      return;
    }
    if (!this.track) return;
    const trackTop = this.track.offsetTop;
    const maxScroll = this.track.offsetHeight - window.innerHeight;
    const targetY = trackTop + maxScroll * 0.78;
    if (window.AppState?.lenis) {
      window.AppState.lenis.scrollTo(targetY, { duration: 2.2 });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }

  triggerTechZoom() {
    if (window.AppState?.techSolar) {
      window.AppState.techSolar.triggerTechZoom();
    }
  }

  triggerContactZoom() {
    if (window.AppState?.techSolar) {
      window.AppState.techSolar.triggerContactZoom();
    }
  }

  /* -----------------------------------------------------------------
   * 11. MAIN RENDER & ANIMATION LOOP
   * ----------------------------------------------------------------- */
  animate() {
    if (!this.isInViewport || document.hidden) {
      requestAnimationFrame(this.animate);
      return;
    }

    this.time += 0.016;

    // Smooth lerp mouse coords
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

    // Smooth lerp travel progress
    this.travelProgress += (this.targetTravelProgress - this.travelProgress) * 0.075;

    // Active project switching
    if (this.targetActiveIndex !== this.activeProjectIndex) {
      this.activeProjectIndex = this.targetActiveIndex;
      if (this.activeProjectIndex !== null) {
        this.updateHudCard(PROJECT_NODES[this.activeProjectIndex]);
      }
    }

    // 1. Animate Hero Backdrop Parallax & Nexus
    if (this.heroBackdropMesh) {
      this.heroBackdropMesh.position.x = this.mouse.x * 0.35;
      this.heroBackdropMesh.position.y = 0.35 + this.mouse.y * 0.2;
    }
    if (this.nexusMesh) {
      const pulse = 1.0 + Math.sin(this.time * 5.0) * 0.18;
      this.nexusMesh.scale.set(pulse, pulse, pulse);
    }
    if (this.loomRing1) {
      this.loomRing1.rotation.x = this.time * 1.4;
      this.loomRing1.rotation.y = this.time * 0.9;
    }
    if (this.loomRing2) {
      this.loomRing2.rotation.x = -this.time * 1.1;
      this.loomRing2.rotation.z = this.time * 1.3;
    }

    // 2. Camera Flight Navigation
    if (this.activeProjectIndex === null || this.travelProgress < 0.05) {
      // --- MODE A: LOKI CENTER PANORAMA ---
      const parallaxX = this.mouse.x * 0.65;
      const parallaxY = this.mouse.y * 0.35;

      this.targetCamPos.set(parallaxX, 0.75 + parallaxY, 6.2);
      this.targetLookAt.set(parallaxX * 0.25, 0.25 + parallaxY * 0.15, 0);

      // Show title
      if (this.centerAnchor) {
        this.centerAnchor.style.opacity = '1';
        this.centerAnchor.style.transform = `translateX(-50%) translate3d(${parallaxX * 16}px, ${-parallaxY * 12}px, 0)`;
      }

      if (this.hudCard) {
        this.hudCard.classList.remove('is-active');
      }
    } else {
      // --- MODE B: CAMERA SWOOPING ALONG ACTIVE TIMELINE ---
      const activeTimeline = this.timelines[this.activeProjectIndex];
      const curve = activeTimeline.curve;

      // Sample along curve (from 28% to 75% along curve)
      const t = 0.26 + this.travelProgress * 0.48;
      const curvePoint = curve.getPointAt(t);

      const camOffset = new THREE.Vector3(0.18, 0.28, 1.35);
      this.targetCamPos.copy(curvePoint).add(camOffset);
      this.targetLookAt.copy(activeTimeline.endPt);

      // Fade title when traveling
      if (this.centerAnchor) {
        const titleOpacity = Math.max(0, 1.0 - this.travelProgress * 2.2);
        this.centerAnchor.style.opacity = titleOpacity.toFixed(3);
      }

      // Show project card
      if (this.hudCard) {
        if (this.travelProgress > 0.32) {
          this.hudCard.classList.add('is-active');
        } else {
          this.hudCard.classList.remove('is-active');
        }
      }
    }

    // Smooth lerp camera
    this.currentCamPos.lerp(this.targetCamPos, 0.075);
    this.currentLookAt.lerp(this.targetLookAt, 0.075);
    this.camera.position.copy(this.currentCamPos);
    this.camera.lookAt(this.currentLookAt);

    // 3. Update Timelines: Flowing Photons, Tendril Oscillation, Reticles
    this.timelines.forEach((tl, idx) => {
      const isSelected = idx === this.activeProjectIndex;
      const targetOpacity = (this.activeProjectIndex === null)
        ? 0.85
        : (isSelected ? 1.0 : Math.max(0.15, 0.85 - this.travelProgress * 0.7));

      tl.motesMat.opacity += (targetOpacity - tl.motesMat.opacity) * 0.1;
      tl.coreMat.opacity = tl.motesMat.opacity * 0.95;

      // Advance flowing photon motes
      const positions = tl.motesPoints.geometry.attributes.position.array;
      const count = tl.motesCount;
      const speedMult = isSelected ? 0.026 : 0.013;

      for (let m = 0; m < count; m++) {
        tl.motesOffsets[m] = (tl.motesOffsets[m] + tl.motesSpeeds[m] * speedMult) % 1.0;
        const pt = tl.curve.getPointAt(tl.motesOffsets[m]);

        // Add subtle organic plasma wisp jitter
        const jitter = Math.sin(tl.motesOffsets[m] * 20.0 + this.time * 4.0) * 0.025;
        positions[m * 3] = pt.x + jitter;
        positions[m * 3 + 1] = pt.y + jitter;
        positions[m * 3 + 2] = pt.z;
      }
      tl.motesPoints.geometry.attributes.position.needsUpdate = true;

      // Animate Reticle Ring & Apex Orb
      if (tl.reticleRing) {
        tl.reticleRing.rotation.z += isSelected ? 0.038 : 0.012;
        const orbScale = isSelected ? 1.0 + Math.sin(this.time * 6.0) * 0.2 : 1.0;
        tl.orbGroup.scale.set(orbScale, orbScale, orbScale);
      }
    });

    // 4. Update Ambient Yggdrasil Fan Lines
    this.backgroundFilaments.forEach((bg, i) => {
      const flicker = Math.sin(this.time * 2.0 + i) * 0.05;
      bg.line.material.opacity = Math.max(0.08, bg.baseOpacity + flicker);
    });

    // 5. Update Selector Pill Active State
    if (this.selectorHud) {
      const pills = this.selectorHud.querySelectorAll('.timeline-pill-btn');
      pills.forEach((p, idx) => {
        if (idx === this.activeProjectIndex && this.travelProgress > 0.25) {
          p.classList.add('is-active');
        } else {
          p.classList.remove('is-active');
        }
      });
    }

    // 6. Render Three.js Scene
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.animate);
  }
}

// Backwards-compatible export
export class ProjectSolarSystem extends ProjectTimelineEngine {}

export function initProjectSolarSystem() {
  const stage = document.getElementById('projects-stage');
  if (stage) {
    return new ProjectTimelineEngine();
  }
  return null;
}
