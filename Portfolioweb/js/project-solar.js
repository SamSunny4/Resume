/**
 * =====================================================================
 * LOKI TIMELINE WEAVER 3D ENGINE (project-solar.js)
 * =====================================================================
 * 100% Real-Time Three.js 3D PBR Engine (Zero 2D Wallpapers / Zero Flat Overlays):
 * - Authentic Procedural PBR Textures (Normal Maps, Emissive Sap Veins, Weathered Gold, Basalt Stone)
 * - 3D Citadel Throne Room & Dais (Basalt Stone with Gold Inlays & Spires)
 * - 3D Sculpted Loki (God of Stories): Draped robes, Asgardian bracers, and iconic curved golden horns
 * - 9 Living Organic Timeline Boughs (Branches of Yggdrasil):
 *     * High-res organic curved tubes with procedural bark normal mapping
 *     * Animated emissive sap veins pulsing from Loki's hands to project nodes
 *     * Braided rootlet vines twisting organically around each main bough
 *     * 3D faceted crystal planetary nexus orbs encased in rotating golden astrolabes
 * - True 3D Point Lights casting real specular glints across gold, stone, and glowing vines
 * - Cinematic camera flight along the organic timeline branches on mouse movement
 * - Floating glassmorphic project telemetry HUD card + deep-dive architecture modal
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
    this.travelProgress = 0;
    this.targetTravelProgress = 0;

    this.defaultCamPos = new THREE.Vector3(0, 1.15, 7.6);
    this.defaultLookAt = new THREE.Vector3(0, 0.72, 0);
    this.currentCamPos = this.defaultCamPos.clone();
    this.currentLookAt = this.defaultLookAt.clone();
    this.targetCamPos = this.defaultCamPos.clone();
    this.targetLookAt = this.defaultLookAt.clone();

    // 3D Collections
    this.timelines = [];

    this.initThree();
    this.generateProceduralTextures();
    this.buildCitadelThroneRoom();
    this.buildLokiFigure();
    this.buildLivingTimelineRoots();
    this.buildSelectorHud();
    this.buildHudCard();
    this.setupModalListeners();
    this.setupListeners();
    this.setupIntersectionObserver();

    this.onResize = this.onResize.bind(this);
    this.animate = this.animate.bind(this);
    window.addEventListener('resize', this.onResize, { passive: true });

    requestAnimationFrame(this.animate);
    console.log('[TimelineEngine] True 3D PBR Loki Timeline Engine ignited.');
  }

  /* -----------------------------------------------------------------
   * 1. THREE.JS SCENE, CAMERA & LIGHTING SETUP
   * ----------------------------------------------------------------- */
  initThree() {
    const width = this.stage.clientWidth || window.innerWidth;
    const height = this.stage.clientHeight || window.innerHeight;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x020603, 0.038);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
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
    this.renderer.toneMappingExposure = 1.35;

    // Atmospheric & Specular Lighting
    const ambientLight = new THREE.AmbientLight(0x06140a, 1.4);
    this.scene.add(ambientLight);

    // Blazing Emerald Nexus Light at Loki's hands
    this.nexusLight = new THREE.PointLight(0x00ff66, 6.0, 24);
    this.nexusLight.position.set(0, 0.48, 0.72);
    this.scene.add(this.nexusLight);

    // Warm Golden Throne Light from above
    this.throneLight = new THREE.PointLight(0xffd54f, 2.8, 14);
    this.throneLight.position.set(0, 3.4, -0.4);
    this.scene.add(this.throneLight);

    // Side directional cyan fill
    const dirLight = new THREE.DirectionalLight(0x00f0ff, 0.65);
    dirLight.position.set(3, 7, 4);
    this.scene.add(dirLight);

    // Soft emerald under-light
    const floorLight = new THREE.PointLight(0x00aa44, 2.0, 10);
    floorLight.position.set(0, -1.8, 0.5);
    this.scene.add(floorLight);
  }

  /* -----------------------------------------------------------------
   * 2. PROCEDURAL PBR TEXTURES (BUMP, NORMAL, EMISSIVE SAP, GOLD, STONE)
   * ----------------------------------------------------------------- */
  generateProceduralTextures() {
    // A. Organic Vine / Tree Bark Normal Map (512x512)
    const normalCanvas = document.createElement('canvas');
    normalCanvas.width = 512;
    normalCanvas.height = 512;
    const nCtx = normalCanvas.getContext('2d');
    const nImgData = nCtx.createImageData(512, 512);
    const nData = nImgData.data;

    // Compute fibrous bark heightfield & Sobel normal vectors
    const heightMap = new Float32Array(512 * 512);
    for (let y = 0; y < 512; y++) {
      for (let x = 0; x < 512; x++) {
        const u = x / 512;
        const v = y / 512;
        // Directional fibrous grooves + organic micro-twists
        const grain = Math.sin(u * 50.0 + Math.sin(v * 20.0) * 4.0) * 0.45;
        const fineGrain = Math.sin(u * 120.0) * 0.25;
        const noise = (Math.sin(u * 15.0 + v * 35.0) + Math.cos(u * 30.0 - v * 20.0)) * 0.3;
        heightMap[y * 512 + x] = grain + fineGrain + noise;
      }
    }

    const strength = 3.2;
    for (let y = 0; y < 512; y++) {
      for (let x = 0; x < 512; x++) {
        const xL = (x - 1 + 512) % 512;
        const xR = (x + 1) % 512;
        const yU = (y - 1 + 512) % 512;
        const yD = (y + 1) % 512;

        const dx = (heightMap[y * 512 + xR] - heightMap[y * 512 + xL]) * strength;
        const dy = (heightMap[yD * 512 + x] - heightMap[yU * 512 + x]) * strength;
        const dz = 1.0;

        const len = Math.hypot(dx, dy, dz);
        const nx = -dx / len;
        const ny = -dy / len;
        const nz = dz / len;

        const idx = (y * 512 + x) * 4;
        nData[idx] = Math.floor((nx * 0.5 + 0.5) * 255);
        nData[idx + 1] = Math.floor((ny * 0.5 + 0.5) * 255);
        nData[idx + 2] = Math.floor((nz * 0.5 + 0.5) * 255);
        nData[idx + 3] = 255;
      }
    }
    nCtx.putImageData(nImgData, 0, 0);

    this.vineNormalMap = new THREE.CanvasTexture(normalCanvas);
    this.vineNormalMap.wrapS = THREE.RepeatWrapping;
    this.vineNormalMap.wrapT = THREE.RepeatWrapping;
    this.vineNormalMap.repeat.set(2, 16);

    // B. Emissive Sap Vein Texture (Interior Glowing Capillaries)
    const veinCanvas = document.createElement('canvas');
    veinCanvas.width = 512;
    veinCanvas.height = 512;
    const vCtx = veinCanvas.getContext('2d');
    vCtx.fillStyle = '#010502';
    vCtx.fillRect(0, 0, 512, 512);

    // Draw glowing sap veins running down length of vine
    vCtx.lineWidth = 14;
    vCtx.strokeStyle = 'rgba(0, 255, 102, 0.75)';
    vCtx.shadowColor = '#d2ff00';
    vCtx.shadowBlur = 22;

    for (let i = 0; i < 4; i++) {
      vCtx.beginPath();
      const startX = 60 + i * 110;
      vCtx.moveTo(startX, 0);
      for (let y = 0; y <= 512; y += 40) {
        const offset = Math.sin(y * 0.05 + i * 1.5) * 35;
        vCtx.lineTo(startX + offset, y);
      }
      vCtx.stroke();
    }

    // Core hot-white hairline in veins
    vCtx.lineWidth = 4;
    vCtx.strokeStyle = 'rgba(255, 255, 220, 0.95)';
    vCtx.shadowBlur = 10;
    for (let i = 0; i < 4; i++) {
      vCtx.beginPath();
      const startX = 60 + i * 110;
      vCtx.moveTo(startX, 0);
      for (let y = 0; y <= 512; y += 40) {
        const offset = Math.sin(y * 0.05 + i * 1.5) * 35;
        vCtx.lineTo(startX + offset, y);
      }
      vCtx.stroke();
    }

    this.veinTexture = new THREE.CanvasTexture(veinCanvas);
    this.veinTexture.wrapS = THREE.RepeatWrapping;
    this.veinTexture.wrapT = THREE.RepeatWrapping;
    this.veinTexture.repeat.set(1, 8);

    // C. Weathered Ancient Citadel Gold Texture
    const goldCanvas = document.createElement('canvas');
    goldCanvas.width = 256;
    goldCanvas.height = 256;
    const gCtx = goldCanvas.getContext('2d');
    gCtx.fillStyle = '#c5a045';
    gCtx.fillRect(0, 0, 256, 256);

    // Brushed gold specular scratches
    gCtx.strokeStyle = 'rgba(255, 235, 150, 0.18)';
    gCtx.lineWidth = 1;
    for (let i = 0; i < 160; i++) {
      gCtx.beginPath();
      const y = Math.random() * 256;
      gCtx.moveTo(0, y);
      gCtx.lineTo(256, y + (Math.random() - 0.5) * 12);
      gCtx.stroke();
    }
    // Dark bronze patina in crevices
    gCtx.fillStyle = 'rgba(60, 40, 10, 0.22)';
    for (let i = 0; i < 25; i++) {
      gCtx.fillRect(Math.random() * 256, Math.random() * 256, Math.random() * 40, Math.random() * 40);
    }
    this.goldTexture = new THREE.CanvasTexture(goldCanvas);

    // D. Citadel Basalt Stone Texture
    const stoneCanvas = document.createElement('canvas');
    stoneCanvas.width = 256;
    stoneCanvas.height = 256;
    const sCtx = stoneCanvas.getContext('2d');
    sCtx.fillStyle = '#0a0f0c';
    sCtx.fillRect(0, 0, 256, 256);

    // Stone texture grain
    sCtx.fillStyle = 'rgba(25, 38, 28, 0.4)';
    for (let i = 0; i < 3000; i++) {
      sCtx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }
    // Faint golden crack lines (Kintsugi Citadel Stone)
    sCtx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
    sCtx.lineWidth = 1.2;
    for (let i = 0; i < 6; i++) {
      sCtx.beginPath();
      sCtx.moveTo(Math.random() * 256, 0);
      sCtx.lineTo(Math.random() * 256, 256);
      sCtx.stroke();
    }
    this.stoneTexture = new THREE.CanvasTexture(stoneCanvas);
  }

  /* -----------------------------------------------------------------
   * 3. 3D CITADEL THRONE ROOM & STEPS (REAL PBR GEOMETRY & MATERIALS)
   * ----------------------------------------------------------------- */
  buildCitadelThroneRoom() {
    this.citadelGroup = new THREE.Group();

    // PBR Materials
    this.goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      map: this.goldTexture,
      metalness: 0.92,
      roughness: 0.26,
    });

    this.stoneMaterial = new THREE.MeshStandardMaterial({
      color: 0x111613,
      map: this.stoneTexture,
      metalness: 0.25,
      roughness: 0.68,
    });

    // Tiered Hexagonal Dais Plinths
    for (let i = 0; i < 3; i++) {
      const radius = 2.4 - i * 0.42;
      const height = 0.24;
      const plinth = new THREE.Mesh(
        new THREE.CylinderGeometry(radius, radius + 0.12, height, 6),
        this.stoneMaterial
      );
      plinth.position.y = -1.8 + i * 0.24;
      this.citadelGroup.add(plinth);

      // Inlaid Gold Rim Border
      const goldRim = new THREE.Mesh(
        new THREE.TorusGeometry(radius + 0.02, 0.028, 6, 6),
        this.goldMaterial
      );
      goldRim.rotation.x = Math.PI / 2;
      goldRim.position.y = -1.8 + i * 0.24 + height / 2;
      this.citadelGroup.add(goldRim);
    }

    // Heavy Carved Throne Base & Seat
    const throneSeat = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.85, 1.4),
      this.stoneMaterial
    );
    throneSeat.position.set(0, -0.85, -0.15);
    this.citadelGroup.add(throneSeat);

    // Stone & Gold Armrests
    [-0.82, 0.82].forEach((xSide) => {
      const armrest = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.72, 1.45),
        this.stoneMaterial
      );
      armrest.position.set(xSide, -0.32, -0.15);
      this.citadelGroup.add(armrest);

      const armCap = new THREE.Mesh(
        new THREE.BoxGeometry(0.28, 0.08, 1.5),
        this.goldMaterial
      );
      armCap.position.set(xSide, 0.06, -0.15);
      this.citadelGroup.add(armCap);
    });

    // Majestic High Gothic Asgardian Throne Back
    const backGeo = new THREE.BoxGeometry(1.5, 2.8, 0.3);
    const throneBack = new THREE.Mesh(backGeo, this.stoneMaterial);
    throneBack.position.set(0, 1.05, -0.8);
    this.citadelGroup.add(throneBack);

    // Towering Gold Spires on Throne Back
    [-0.78, 0.78].forEach((xSide) => {
      const spire = new THREE.Mesh(
        new THREE.ConeGeometry(0.18, 1.8, 6),
        this.goldMaterial
      );
      spire.position.set(xSide, 2.55, -0.8);
      this.citadelGroup.add(spire);
    });

    const centerSpire = new THREE.Mesh(
      new THREE.ConeGeometry(0.25, 2.2, 6),
      this.goldMaterial
    );
    centerSpire.position.set(0, 2.85, -0.8);
    this.citadelGroup.add(centerSpire);

    // Intricate Gold Chevron Relief
    const chevronGeo = new THREE.TorusGeometry(0.52, 0.045, 8, 16, Math.PI);
    const chevron = new THREE.Mesh(chevronGeo, this.goldMaterial);
    chevron.position.set(0, 1.35, -0.62);
    chevron.rotation.z = Math.PI;
    this.citadelGroup.add(chevron);

    this.scene.add(this.citadelGroup);
  }

  /* -----------------------------------------------------------------
   * 4. 3D SCULPTED LOKI (GOD OF STORIES WITH THE HORNS)
   * ----------------------------------------------------------------- */
  buildLokiFigure() {
    this.lokiGroup = new THREE.Group();

    const robeMaterial = new THREE.MeshStandardMaterial({
      color: 0x06190e,
      roughness: 0.85,
      metalness: 0.1,
    });

    const tunicMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a2414,
      roughness: 0.65,
      metalness: 0.2,
    });

    // Seated Lower Body & Draped Robe
    const lowerBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 0.7, 1.15),
      robeMaterial
    );
    lowerBody.position.set(0, -0.45, 0.05);
    this.lokiGroup.add(lowerBody);

    // Seated legs draped forward
    const legs = new THREE.Mesh(
      new THREE.CylinderGeometry(0.46, 0.42, 0.88, 16),
      robeMaterial
    );
    legs.rotation.x = Math.PI / 2.3;
    legs.position.set(0, -0.65, 0.55);
    this.lokiGroup.add(legs);

    // Torso in Emerald Tunic
    const torso = new THREE.Mesh(
      new THREE.CylinderGeometry(0.42, 0.46, 0.95, 16),
      tunicMaterial
    );
    torso.position.set(0, 0.32, -0.05);
    this.lokiGroup.add(torso);

    // Golden Cross-Chest Straps
    const strap1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.8, 0.82),
      this.goldMaterial
    );
    strap1.rotation.z = 0.55;
    strap1.position.set(0, 0.35, -0.02);
    this.lokiGroup.add(strap1);

    const strap2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.8, 0.82),
      this.goldMaterial
    );
    strap2.rotation.z = -0.55;
    strap2.position.set(0, 0.35, -0.02);
    this.lokiGroup.add(strap2);

    // Cloak Shoulders
    const capeShoulders = new THREE.Mesh(
      new THREE.BoxGeometry(1.25, 0.3, 0.6),
      robeMaterial
    );
    capeShoulders.position.set(0, 0.74, -0.15);
    this.lokiGroup.add(capeShoulders);

    // Arms reaching forward to clasp the timeline roots
    [-0.38, 0.38].forEach((xSide) => {
      const upperArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.12, 0.55, 12),
        tunicMaterial
      );
      upperArm.rotation.x = Math.PI / 4;
      upperArm.rotation.z = xSide > 0 ? -0.35 : 0.35;
      upperArm.position.set(xSide * 1.05, 0.52, 0.16);
      this.lokiGroup.add(upperArm);

      const forearm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.1, 0.58, 12),
        tunicMaterial
      );
      forearm.rotation.x = Math.PI / 2.2;
      forearm.rotation.y = xSide > 0 ? -0.45 : 0.45;
      forearm.position.set(xSide * 0.55, 0.44, 0.46);
      this.lokiGroup.add(forearm);

      // Gold Vambrace / Bracer
      const bracer = new THREE.Mesh(
        new THREE.CylinderGeometry(0.13, 0.12, 0.28, 12),
        this.goldMaterial
      );
      bracer.rotation.x = Math.PI / 2.2;
      bracer.rotation.y = xSide > 0 ? -0.45 : 0.45;
      bracer.position.set(xSide * 0.38, 0.44, 0.56);
      this.lokiGroup.add(bracer);
    });

    // Hands clasped together gripping the timeline root bundle
    const hands = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 16, 16),
      this.goldMaterial
    );
    hands.position.set(0, 0.46, 0.68);
    this.lokiGroup.add(hands);

    // Head / Hooded Visage in shadows
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x08100a, roughness: 0.7 })
    );
    head.position.set(0, 1.15, -0.05);
    this.lokiGroup.add(head);

    // Brow Circlet Diadem
    const browBand = new THREE.Mesh(
      new THREE.TorusGeometry(0.24, 0.035, 8, 24),
      this.goldMaterial
    );
    browBand.rotation.x = Math.PI / 2.4;
    browBand.position.set(0, 1.22, 0.02);
    this.lokiGroup.add(browBand);

    // THE ICONIC CURVED GOLDEN HORNS (High-detail smooth sweeping tubes)
    [-1, 1].forEach((dir) => {
      const hornCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(dir * 0.16, 1.25, 0.08),
        new THREE.Vector3(dir * 0.48, 1.58, 0.05),
        new THREE.Vector3(dir * 0.72, 2.15, -0.05),
        new THREE.Vector3(dir * 0.56, 2.68, 0.18),
        new THREE.Vector3(dir * 0.28, 2.92, 0.38),
      ]);
      const hornGeo = new THREE.TubeGeometry(hornCurve, 40, 0.062, 16, false);
      const hornMesh = new THREE.Mesh(hornGeo, this.goldMaterial);
      this.lokiGroup.add(hornMesh);
    });

    // Timeline Root Nexus Core at Hands
    const nexusCoreGeo = new THREE.SphereGeometry(0.22, 24, 24);
    const nexusCoreMat = new THREE.MeshBasicMaterial({
      color: 0xf5ffb8,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    this.nexusCore = new THREE.Mesh(nexusCoreGeo, nexusCoreMat);
    this.nexusCore.position.set(0, 0.46, 0.7);
    this.lokiGroup.add(this.nexusCore);

    // Rotating Astrolabe Rings around Nexus
    this.nexusRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(0.38, 0.02, 8, 32),
      new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      })
    );
    this.nexusRing1.position.copy(this.nexusCore.position);
    this.lokiGroup.add(this.nexusRing1);

    this.nexusRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(0.54, 0.016, 8, 32),
      new THREE.MeshBasicMaterial({
        color: 0xd2ff00,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      })
    );
    this.nexusRing2.position.copy(this.nexusCore.position);
    this.lokiGroup.add(this.nexusRing2);

    this.scene.add(this.lokiGroup);
  }

  /* -----------------------------------------------------------------
   * 5. 9 LIVING TIMELINE BOUGHS (ORGANIC YGGDRASIL ROOTS WITH PBR VEINS)
   * ----------------------------------------------------------------- */
  buildLivingTimelineRoots() {
    this.timelineGroup = new THREE.Group();
    const nexusOrigin = new THREE.Vector3(0, 0.46, 0.7);

    // 9 Spatial Target Vectors in 3D Space (Fanning out 360° around Loki)
    const TARGET_VECTORS = [
      new THREE.Vector3(-4.8, 2.8, 1.8),   // 0. KeyBase (NW High)
      new THREE.Vector3(-1.0, 4.4, 1.2),   // 1. Leadis / AiSam (N Zenith)
      new THREE.Vector3(3.6, 3.4, 1.6),    // 2. InfoGrid (NE High)
      new THREE.Vector3(5.6, 1.1, 1.2),    // 3. Rainiest (E Mid)
      new THREE.Vector3(4.6, -2.2, 2.3),   // 4. Fitman (SE Low)
      new THREE.Vector3(1.6, -3.6, 2.8),   // 5. 3DS Spatial (S Low)
      new THREE.Vector3(-1.8, -3.5, 2.6),  // 6. ShareDash (SSW Low)
      new THREE.Vector3(-4.6, -1.9, 2.1),  // 7. LateLoggy (SW Low)
      new THREE.Vector3(-5.6, 0.7, 1.4),   // 8. FakePaste (W Mid)
    ];

    PROJECT_NODES.forEach((proj, idx) => {
      const endPt = TARGET_VECTORS[idx] || new THREE.Vector3(0, 3, 0);

      // Organic curved 3D trajectory with natural bough curvature
      const midPt1 = new THREE.Vector3(
        nexusOrigin.x * 0.7 + endPt.x * 0.3 + (Math.random() - 0.5) * 0.35,
        nexusOrigin.y * 0.7 + endPt.y * 0.3 + 0.3,
        nexusOrigin.z * 0.7 + endPt.z * 0.3 + 0.25
      );
      const midPt2 = new THREE.Vector3(
        nexusOrigin.x * 0.25 + endPt.x * 0.75 + (Math.random() - 0.5) * 0.4,
        nexusOrigin.y * 0.25 + endPt.y * 0.75 - 0.15,
        nexusOrigin.z * 0.25 + endPt.z * 0.75 + 0.4
      );

      const curve = new THREE.CatmullRomCurve3([
        nexusOrigin.clone(),
        midPt1,
        midPt2,
        endPt.clone(),
      ]);
      curve.curveType = 'centripetal';

      // Clone vein texture per timeline so we can animate independent sap flow
      const timelineVeinTex = this.veinTexture.clone();
      timelineVeinTex.needsUpdate = true;

      // PBR Material for Living Jade Bough
      const boughMaterial = new THREE.MeshStandardMaterial({
        color: 0x072412,
        roughness: 0.34,
        metalness: 0.18,
        normalMap: this.vineNormalMap,
        normalScale: new THREE.Vector2(2.2, 2.2),
        emissive: new THREE.Color(proj.color || '#00FF66'),
        emissiveMap: timelineVeinTex,
        emissiveIntensity: 1.8,
      });

      // Main Organic Bough Tube
      const boughGeo = new THREE.TubeGeometry(curve, 96, 0.052, 12, false);
      const boughMesh = new THREE.Mesh(boughGeo, boughMaterial);
      this.timelineGroup.add(boughMesh);

      // Intertwining Rootlet Vines
      const rootletCurves = this.generateRootletCurves(curve, 2);
      rootletCurves.forEach((rCurve) => {
        const rGeo = new THREE.TubeGeometry(rCurve, 72, 0.022, 8, false);
        const rMesh = new THREE.Mesh(rGeo, boughMaterial);
        this.timelineGroup.add(rMesh);
      });

      // Apex Project World (Faceted Crystal Orb in Golden Astrolabe Armature)
      const orbGroup = new THREE.Group();
      orbGroup.position.copy(endPt);

      // 3D Faceted Icosahedron Crystal
      const crystalGeo = new THREE.IcosahedronGeometry(0.24, 0);
      const crystalMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(proj.color || '#D2FF00'),
        metalness: 0.85,
        roughness: 0.15,
        emissive: new THREE.Color(proj.color || '#D2FF00'),
        emissiveIntensity: 1.4,
      });
      const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
      orbGroup.add(crystalMesh);

      // Rotating Golden Astrolabe Ring
      const astrolabeRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.42, 0.022, 8, 32),
        this.goldMaterial
      );
      orbGroup.add(astrolabeRing);

      this.timelineGroup.add(orbGroup);

      // Store timeline telemetry
      this.timelines.push({
        index: idx,
        project: proj,
        curve: curve,
        material: boughMaterial,
        veinTex: timelineVeinTex,
        orbGroup: orbGroup,
        crystalMesh: crystalMesh,
        astrolabeRing: astrolabeRing,
        endPt: endPt,
      });
    });

    this.scene.add(this.timelineGroup);
  }

  /* -----------------------------------------------------------------
   * Generate Organic Rootlets Twisting Around Main Bough
   * ----------------------------------------------------------------- */
  generateRootletCurves(parentCurve, count = 2) {
    const rootlets = [];
    const pointsCount = 48;
    const twistCycles = 6.0;
    const radius = 0.082;

    for (let b = 0; b < count; b++) {
      const phase = (b * Math.PI * 2) / count;
      const pts = [];

      for (let i = 0; i <= pointsCount; i++) {
        const t = i / pointsCount;
        const pt = parentCurve.getPointAt(t);
        const tangent = parentCurve.getTangentAt(t);

        let up = new THREE.Vector3(0, 1, 0);
        if (Math.abs(tangent.y) > 0.9) up = new THREE.Vector3(1, 0, 0);
        const normal = new THREE.Vector3().crossVectors(tangent, up).normalize();
        const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();

        const angle = t * Math.PI * 2 * twistCycles + phase;
        const offset = normal.clone().multiplyScalar(Math.cos(angle) * radius)
          .add(binormal.clone().multiplyScalar(Math.sin(angle) * radius));

        const taper = Math.min(1.0, t / 0.18);
        pts.push(pt.clone().add(offset.multiplyScalar(taper)));
      }

      rootlets.push(new THREE.CatmullRomCurve3(pts));
    }
    return rootlets;
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
    const centerDeadzone = 0.26;

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
      const travelNorm = Math.min(1.0, (this.mouse.dist - centerDeadzone) / 0.54);
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

    // 1. Animate Loki Nexus Core & Spinning Astrolabe Rings
    if (this.nexusCore) {
      const pulse = 1.0 + Math.sin(this.time * 4.5) * 0.14;
      this.nexusCore.scale.set(pulse, pulse, pulse);
    }
    if (this.nexusRing1) {
      this.nexusRing1.rotation.x = this.time * 1.2;
      this.nexusRing1.rotation.y = this.time * 0.8;
    }
    if (this.nexusRing2) {
      this.nexusRing2.rotation.x = -this.time * 0.9;
      this.nexusRing2.rotation.z = this.time * 1.1;
    }

    // 2. Camera Flight Navigation
    if (this.activeProjectIndex === null || this.travelProgress < 0.05) {
      // --- MODE A: LOKI PANORAMA OVERVIEW ---
      const parallaxX = this.mouse.x * 0.72;
      const parallaxY = this.mouse.y * 0.42;

      this.targetCamPos.set(parallaxX, 1.15 + parallaxY, 7.6);
      this.targetLookAt.set(parallaxX * 0.22, 0.72 + parallaxY * 0.18, 0);

      // Show title
      if (this.centerAnchor) {
        this.centerAnchor.style.opacity = '1';
        this.centerAnchor.style.transform = `translateX(-50%) translate3d(${parallaxX * 18}px, ${-parallaxY * 12}px, 0)`;
      }

      if (this.hudCard) {
        this.hudCard.classList.remove('is-active');
      }
    } else {
      // --- MODE B: CAMERA TRAVELING ALONG SELECTED TIMELINE ---
      const activeTimeline = this.timelines[this.activeProjectIndex];
      const curve = activeTimeline.curve;

      // Sample along curve (from 28% to 75% along curve)
      const t = 0.28 + this.travelProgress * 0.46;
      const curvePoint = curve.getPointAt(t);

      const camOffset = new THREE.Vector3(0.2, 0.32, 1.45);
      this.targetCamPos.copy(curvePoint).add(camOffset);
      this.targetLookAt.copy(activeTimeline.endPt);

      // Fade title when traveling
      if (this.centerAnchor) {
        const titleOpacity = Math.max(0, 1.0 - this.travelProgress * 2.2);
        this.centerAnchor.style.opacity = titleOpacity.toFixed(3);
      }

      // Show project card
      if (this.hudCard) {
        if (this.travelProgress > 0.35) {
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

    // 3. Animate Flowing Sap Veins & Astrolabe Armatures
    this.timelines.forEach((tl, idx) => {
      const isSelected = idx === this.activeProjectIndex;

      // Continuously animate sap flow along texture offset
      tl.veinTex.offset.y -= isSelected ? 0.016 : 0.007;

      // Dynamic emissive intensity
      const targetEmissive = isSelected
        ? 3.2
        : (this.activeProjectIndex === null ? 1.8 : 0.45);
      tl.material.emissiveIntensity += (targetEmissive - tl.material.emissiveIntensity) * 0.1;

      // Spin crystal & astrolabe ring
      if (tl.astrolabeRing) {
        tl.astrolabeRing.rotation.x += isSelected ? 0.035 : 0.012;
        tl.astrolabeRing.rotation.y += isSelected ? 0.045 : 0.016;
        tl.crystalMesh.rotation.y += isSelected ? 0.05 : 0.02;
      }
    });

    // 4. Update Selector Pill Active State
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

    // 5. Render Three.js Scene
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
