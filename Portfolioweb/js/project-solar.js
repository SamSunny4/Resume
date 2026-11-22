/**
 * =====================================================================
 * LOKI TIMELINE WEAVER 3D ENGINE (project-solar.js)
 * =====================================================================
 * Inspired by Marvel's Loki (God of Stories / Master of the Multiverse):
 * - Central 3D Loki seated on the End of Time Throne holding 9 radiant timelines
 * - Distinctive Asgardian Golden Curved Horns & Draped Obsidian-Green Robes
 * - Central Timeline Nexus at Loki's hands radiating vibrant emerald energy
 * - 9 Braided Helical Catmull-Rom Timeline Strands (one per flagship project)
 * - Custom GLSL energy pulse shader with traveling waves, corona, & photon motes
 * - Cinematic Camera Navigation:
 *     * Center mouse: Panoramic view of Loki holding all timelines fanning out
 *     * Moving mouse outward: Camera swoops & travels smoothly along that project's strand!
 *     * Active timeline surges with intense emerald-gold light while others gently dim
 *     * Floating Project Telemetry HUD card surfaces with specs & actions
 *     * Click opens the Deep-Dive Architecture Modal with complete telemetry
 * - Quick Timeline Pills for instant mobile/touch navigation
 * - Hardware-accelerated Three.js WebGL runtime with zero external dependencies
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

    // New Floating HUD Card & Selector elements
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

    this.defaultCamPos = new THREE.Vector3(0, 1.25, 7.8);
    this.defaultLookAt = new THREE.Vector3(0, 0.75, 0);
    this.currentCamPos = this.defaultCamPos.clone();
    this.currentLookAt = this.defaultLookAt.clone();
    this.targetCamPos = this.defaultCamPos.clone();
    this.targetLookAt = this.defaultLookAt.clone();

    // Core 3D Collections
    this.timelines = [];
    this.moteSystems = [];
    this.raycaster = new THREE.Raycaster();
    this.mouseVec2 = new THREE.Vector2();

    this.initThree();
    this.buildLokiAndThrone();
    this.buildTimelines();
    this.buildSelectorHud();
    this.buildHudCard();
    this.setupModalListeners();
    this.setupListeners();
    this.setupIntersectionObserver();

    this.onResize = this.onResize.bind(this);
    this.animate = this.animate.bind(this);
    window.addEventListener('resize', this.onResize, { passive: true });

    requestAnimationFrame(this.animate);
    console.log('[TimelineEngine] Loki Multiverse Timeline Engine ignited successfully.');
  }

  /* -----------------------------------------------------------------
   * 1. THREE.JS SCENE, CAMERA & RENDERER SETUP
   * ----------------------------------------------------------------- */
  initThree() {
    const width = this.stage.clientWidth || window.innerWidth;
    const height = this.stage.clientHeight || window.innerHeight;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x020703, 0.038);

    this.camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100);
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
    this.renderer.toneMappingExposure = 1.25;

    // Atmospheric Lights
    const ambientLight = new THREE.AmbientLight(0x0a1f11, 1.4);
    this.scene.add(ambientLight);

    // Warm golden throne rim light
    this.throneLight = new THREE.PointLight(0xd4af37, 2.2, 12);
    this.throneLight.position.set(0, 3.2, -0.6);
    this.scene.add(this.throneLight);

    // Blazing Emerald Nexus Point Light at Loki's hands
    this.nexusLight = new THREE.PointLight(0x00ff66, 4.2, 18);
    this.nexusLight.position.set(0, 0.48, 0.72);
    this.scene.add(this.nexusLight);

    // Overhead cyan fill
    const dirLight = new THREE.DirectionalLight(0x00f0ff, 0.6);
    dirLight.position.set(2, 6, 4);
    this.scene.add(dirLight);

    // Floor Radiance Plane
    const floorGeo = new THREE.PlaneGeometry(24, 24);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0x00220d,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -2.1;
    this.scene.add(floorMesh);
  }

  /* -----------------------------------------------------------------
   * 2. CENTRAL LOKI FIGURE & END OF TIME THRONE
   * ----------------------------------------------------------------- */
  buildLokiAndThrone() {
    this.lokiGroup = new THREE.Group();

    // Materials
    const goldThroneMat = new THREE.MeshStandardMaterial({
      color: 0xc9a039,
      metalness: 0.88,
      roughness: 0.32,
    });
    const obsidianMat = new THREE.MeshStandardMaterial({
      color: 0x0a0f0c,
      metalness: 0.4,
      roughness: 0.6,
    });
    const robeMat = new THREE.MeshStandardMaterial({
      color: 0x06190e,
      roughness: 0.82,
      metalness: 0.15,
    });
    const tunicMat = new THREE.MeshStandardMaterial({
      color: 0x0d2e19,
      roughness: 0.65,
      metalness: 0.25,
    });
    const hornedGoldMat = new THREE.MeshStandardMaterial({
      color: 0xffd942,
      metalness: 0.95,
      roughness: 0.22,
      emissive: 0x4a3a00,
      emissiveIntensity: 0.25,
    });

    // --- A. THE THRONE ---
    // Tiered Circular Plinths
    for (let i = 0; i < 3; i++) {
      const radius = 2.4 - i * 0.45;
      const height = 0.22;
      const plinth = new THREE.Mesh(
        new THREE.CylinderGeometry(radius, radius + 0.1, height, 32),
        obsidianMat
      );
      plinth.position.y = -1.9 + i * 0.22;
      this.lokiGroup.add(plinth);

      // Gold Trim Ring
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius + 0.02, 0.035, 12, 32),
        goldThroneMat
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -1.9 + i * 0.22 + height / 2;
      this.lokiGroup.add(ring);
    }

    // Throne Seat Base & Box
    const seatBase = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.8, 1.4),
      obsidianMat
    );
    seatBase.position.set(0, -0.85, -0.1);
    this.lokiGroup.add(seatBase);

    // Throne Armrests
    [-0.85, 0.85].forEach((xSide) => {
      const armrest = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.7, 1.45),
        obsidianMat
      );
      armrest.position.set(xSide, -0.35, -0.1);
      this.lokiGroup.add(armrest);

      // Gold cap
      const armCap = new THREE.Mesh(
        new THREE.BoxGeometry(0.28, 0.08, 1.5),
        goldThroneMat
      );
      armCap.position.set(xSide, 0.02, -0.1);
      this.lokiGroup.add(armCap);
    });

    // Majestic High Gothic Throne Back
    const backGeo = new THREE.BoxGeometry(1.5, 2.6, 0.28);
    const throneBack = new THREE.Mesh(backGeo, obsidianMat);
    throneBack.position.set(0, 0.9, -0.75);
    this.lokiGroup.add(throneBack);

    // Asgardian Winged Spires on Throne Back
    const spireGeo = new THREE.ConeGeometry(0.18, 1.6, 4);
    [-0.78, 0.78].forEach((xSide) => {
      const spire = new THREE.Mesh(spireGeo, goldThroneMat);
      spire.position.set(xSide, 2.3, -0.75);
      this.lokiGroup.add(spire);
    });
    const centerSpire = new THREE.Mesh(
      new THREE.ConeGeometry(0.24, 2.0, 4),
      goldThroneMat
    );
    centerSpire.position.set(0, 2.6, -0.75);
    this.lokiGroup.add(centerSpire);

    // Gold Chevron Inlays on Throne Back
    const chevronGeo = new THREE.TorusGeometry(0.48, 0.045, 8, 16, Math.PI);
    const chevron = new THREE.Mesh(chevronGeo, goldThroneMat);
    chevron.position.set(0, 1.2, -0.58);
    chevron.rotation.z = Math.PI;
    this.lokiGroup.add(chevron);

    // --- B. SEATED LOKI (GOD OF STORIES) ---
    // Seated Lower Body & Draped Robe
    const lowerBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.05, 0.65, 1.1),
      robeMat
    );
    lowerBody.position.set(0, -0.45, 0.05);
    this.lokiGroup.add(lowerBody);

    // Legs draped forward
    const legs = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.42, 0.85, 16),
      robeMat
    );
    legs.rotation.x = Math.PI / 2.3;
    legs.position.set(0, -0.65, 0.55);
    this.lokiGroup.add(legs);

    // Torso in Emerald Tunic
    const torso = new THREE.Mesh(
      new THREE.CylinderGeometry(0.42, 0.46, 0.95, 16),
      tunicMat
    );
    torso.position.set(0, 0.32, -0.05);
    this.lokiGroup.add(torso);

    // Golden Cross-Chest Straps & Medallion
    const chestStrap1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.8, 0.82),
      goldThroneMat
    );
    chestStrap1.rotation.z = 0.55;
    chestStrap1.position.set(0, 0.35, -0.02);
    this.lokiGroup.add(chestStrap1);

    const chestStrap2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.8, 0.82),
      goldThroneMat
    );
    chestStrap2.rotation.z = -0.55;
    chestStrap2.position.set(0, 0.35, -0.02);
    this.lokiGroup.add(chestStrap2);

    // Cloak Shoulders & Drape
    const capeShoulders = new THREE.Mesh(
      new THREE.BoxGeometry(1.22, 0.3, 0.6),
      robeMat
    );
    capeShoulders.position.set(0, 0.74, -0.15);
    this.lokiGroup.add(capeShoulders);

    // Arms reaching forward to hold the timeline nexus
    [-0.38, 0.38].forEach((xSide) => {
      // Upper arm
      const upperArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.12, 0.55, 12),
        tunicMat
      );
      upperArm.rotation.x = Math.PI / 4;
      upperArm.rotation.z = xSide > 0 ? -0.35 : 0.35;
      upperArm.position.set(xSide * 1.05, 0.52, 0.16);
      this.lokiGroup.add(upperArm);

      // Forearm angled inward toward center chest
      const forearm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.1, 0.58, 12),
        tunicMat
      );
      forearm.rotation.x = Math.PI / 2.2;
      forearm.rotation.y = xSide > 0 ? -0.45 : 0.45;
      forearm.position.set(xSide * 0.55, 0.44, 0.46);
      this.lokiGroup.add(forearm);

      // Golden Vambrace / Bracer
      const bracer = new THREE.Mesh(
        new THREE.CylinderGeometry(0.13, 0.12, 0.28, 12),
        goldThroneMat
      );
      bracer.rotation.x = Math.PI / 2.2;
      bracer.rotation.y = xSide > 0 ? -0.45 : 0.45;
      bracer.position.set(xSide * 0.38, 0.44, 0.56);
      this.lokiGroup.add(bracer);
    });

    // Hands clasped together holding the nexus
    const hands = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 16, 16),
      goldThroneMat
    );
    hands.position.set(0, 0.46, 0.68);
    this.lokiGroup.add(hands);

    // Head / Hooded Visage in shadows
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 16, 16),
      obsidianMat
    );
    head.position.set(0, 1.15, -0.05);
    this.lokiGroup.add(head);

    // Circlet Brow Band
    const browBand = new THREE.Mesh(
      new THREE.TorusGeometry(0.24, 0.035, 8, 24),
      goldThroneMat
    );
    browBand.rotation.x = Math.PI / 2.4;
    browBand.position.set(0, 1.22, 0.02);
    this.lokiGroup.add(browBand);

    // --- C. THE ICONIC GOLDEN CURVED HORNS ---
    [-1, 1].forEach((dir) => {
      const hornCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(dir * 0.16, 1.25, 0.08),
        new THREE.Vector3(dir * 0.45, 1.55, 0.05),
        new THREE.Vector3(dir * 0.68, 2.05, -0.05),
        new THREE.Vector3(dir * 0.52, 2.55, 0.18),
        new THREE.Vector3(dir * 0.28, 2.75, 0.35),
      ]);
      const hornGeo = new THREE.TubeGeometry(hornCurve, 32, 0.065, 12, false);
      const hornMesh = new THREE.Mesh(hornGeo, hornedGoldMat);
      this.lokiGroup.add(hornMesh);
    });

    // --- D. TIMELINE NEXUS (At Hands) ---
    // Pulsing Core Sphere
    const nexusCoreGeo = new THREE.SphereGeometry(0.22, 24, 24);
    const nexusCoreMat = new THREE.MeshBasicMaterial({
      color: 0xe8ff88,
      transparent: true,
      opacity: 0.95,
    });
    this.nexusCore = new THREE.Mesh(nexusCoreGeo, nexusCoreMat);
    this.nexusCore.position.set(0, 0.46, 0.7);
    this.lokiGroup.add(this.nexusCore);

    // Spinning Loom Rings around nexus
    this.nexusRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(0.38, 0.025, 8, 32),
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
      new THREE.TorusGeometry(0.52, 0.02, 8, 32),
      new THREE.MeshBasicMaterial({
        color: 0xd2ff00,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      })
    );
    this.nexusRing2.position.copy(this.nexusCore.position);
    this.lokiGroup.add(this.nexusRing2);

    // --- E. GODHOOD AURA PARTICLES ---
    const auraCount = 1100;
    const auraPositions = new Float32Array(auraCount * 3);
    const auraColors = new Float32Array(auraCount * 3);
    const colGreen = new THREE.Color(0x00ff66);
    const colGold = new THREE.Color(0xffd700);

    for (let i = 0; i < auraCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const rad = 0.4 + Math.random() * 2.8;
      const y = -1.2 + Math.random() * 4.2;
      const z = -0.8 + Math.random() * 2.5;

      auraPositions[i * 3] = Math.cos(theta) * rad;
      auraPositions[i * 3 + 1] = y;
      auraPositions[i * 3 + 2] = Math.sin(theta) * rad * 0.7 + z;

      const mixed = colGreen.clone().lerp(colGold, Math.random());
      auraColors[i * 3] = mixed.r;
      auraColors[i * 3 + 1] = mixed.g;
      auraColors[i * 3 + 2] = mixed.b;
    }

    const auraGeo = new THREE.BufferGeometry();
    auraGeo.setAttribute('position', new THREE.BufferAttribute(auraPositions, 3));
    auraGeo.setAttribute('color', new THREE.BufferAttribute(auraColors, 3));

    const auraMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.auraPoints = new THREE.Points(auraGeo, auraMat);
    this.lokiGroup.add(this.auraPoints);

    this.scene.add(this.lokiGroup);
  }

  /* -----------------------------------------------------------------
   * 3. THE 9 WEAVED PROJECT TIMELINES (BRAIDED GLOWING STRANDS)
   * ----------------------------------------------------------------- */
  buildTimelines() {
    this.timelineGroup = new THREE.Group();
    const nexusOrigin = new THREE.Vector3(0, 0.46, 0.7);

    // 9 Radial Spatial Target Trajectories (Fanning out 360° around Loki)
    const TARGET_VECTORS = [
      new THREE.Vector3(-4.8, 2.7, 1.8),   // 0. KeyBase (NW High)
      new THREE.Vector3(-1.1, 4.4, 1.2),   // 1. Leadis / AiSam (N Zenith)
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

      // Compute natural 3D curve sways
      const midPt1 = new THREE.Vector3(
        nexusOrigin.x * 0.7 + endPt.x * 0.3 + (Math.random() - 0.5) * 0.4,
        nexusOrigin.y * 0.7 + endPt.y * 0.3 + 0.35,
        nexusOrigin.z * 0.7 + endPt.z * 0.3 + 0.2
      );
      const midPt2 = new THREE.Vector3(
        nexusOrigin.x * 0.25 + endPt.x * 0.75 + (Math.random() - 0.5) * 0.5,
        nexusOrigin.y * 0.25 + endPt.y * 0.75 - 0.15,
        nexusOrigin.z * 0.25 + endPt.z * 0.75 + 0.35
      );

      const curve = new THREE.CatmullRomCurve3([
        nexusOrigin.clone(),
        midPt1,
        midPt2,
        endPt.clone(),
      ]);
      curve.curveType = 'centripetal';

      // --- Custom GLSL Pulse Shader for Timeline Strands ---
      const timelineShaderMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 1.0 },
          uBaseColor: { value: new THREE.Color(0x00ff66) },
          uAccentColor: { value: new THREE.Color(proj.color || '#D2FF00') },
          uCoreColor: { value: new THREE.Color(0xfaffb5) },
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform float uIntensity;
          uniform vec3 uBaseColor;
          uniform vec3 uAccentColor;
          uniform vec3 uCoreColor;
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vViewPosition;

          void main() {
            // Flowing energetic pulse travelling outward from Loki's hands
            float wave1 = sin(vUv.x * 24.0 - uTime * 4.8) * 0.5 + 0.5;
            float wave2 = sin(vUv.x * 55.0 - uTime * 11.0) * 0.3 + 0.3;
            float shimmer = sin(vUv.x * 120.0 + uTime * 8.0) * 0.15;

            float pulse = wave1 * 0.65 + wave2 * 0.35 + shimmer;

            // Fresnel rim glow
            vec3 viewDir = normalize(vViewPosition);
            float fresnel = 1.0 - abs(dot(vNormal, viewDir));
            fresnel = pow(fresnel, 1.8);

            // Blend core white-gold -> emerald -> accent color
            vec3 color = mix(uBaseColor, uAccentColor, 0.45);
            color = mix(color, uCoreColor, fresnel * 0.6 + pulse * 0.4);

            float alpha = (0.55 + fresnel * 0.45 + pulse * 0.3) * uIntensity;
            gl_FragColor = vec4(color * (1.1 + pulse * 0.9) * uIntensity, clamp(alpha, 0.0, 1.0));
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });

      // 1. Main Tube Geometry
      const tubeGeo = new THREE.TubeGeometry(curve, 72, 0.048, 8, false);
      const mainTube = new THREE.Mesh(tubeGeo, timelineShaderMat);
      this.timelineGroup.add(mainTube);

      // 2. Braided Helical Sub-Filaments (Like Reference 2)
      const braidCurves = this.generateBraidCurves(curve, 2);
      braidCurves.forEach((bCurve) => {
        const bGeo = new THREE.TubeGeometry(bCurve, 64, 0.022, 6, false);
        const bMesh = new THREE.Mesh(bGeo, timelineShaderMat);
        this.timelineGroup.add(bMesh);
      });

      // 3. Flowing Energy Photon Motes along this strand
      const motesCount = 38;
      const motesGeo = new THREE.BufferGeometry();
      const motesPos = new Float32Array(motesCount * 3);
      motesGeo.setAttribute('position', new THREE.BufferAttribute(motesPos, 3));

      const motesMat = new THREE.PointsMaterial({
        color: new THREE.Color(proj.color || '#D2FF00'),
        size: 0.09,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const motesPoints = new THREE.Points(motesGeo, motesMat);
      this.timelineGroup.add(motesPoints);

      // 4. Project Nexus Orb at Apex
      const orbGroup = new THREE.Group();
      orbGroup.position.copy(endPt);

      const orbMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.24, 20, 20),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(proj.color || '#D2FF00'),
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
        })
      );
      orbGroup.add(orbMesh);

      const reticleRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.42, 0.02, 8, 24),
        new THREE.MeshBasicMaterial({
          color: 0x00ff88,
          transparent: true,
          opacity: 0.7,
          blending: THREE.AdditiveBlending,
        })
      );
      orbGroup.add(reticleRing);

      this.timelineGroup.add(orbGroup);

      // Store timeline telemetry
      this.timelines.push({
        index: idx,
        project: proj,
        curve: curve,
        material: timelineShaderMat,
        motesPoints: motesPoints,
        motesCount: motesCount,
        motesSpeeds: Array.from({ length: motesCount }, () => 0.15 + Math.random() * 0.25),
        motesOffsets: Array.from({ length: motesCount }, (_, i) => i / motesCount),
        orbGroup: orbGroup,
        reticleRing: reticleRing,
        endPt: endPt,
        // Projected 2D screen coords for distance checks
        screenX: 0,
        screenY: 0,
      });
    });

    this.scene.add(this.timelineGroup);
  }

  /* -----------------------------------------------------------------
   * Generate Helical Braided Splines Winding Around Main Curve
   * ----------------------------------------------------------------- */
  generateBraidCurves(parentCurve, count = 2) {
    const braids = [];
    const pointsCount = 48;
    const twistCycles = 7.0; // Number of spirals from Loki to outer apex
    const radius = 0.085;

    for (let b = 0; b < count; b++) {
      const phase = (b * Math.PI * 2) / count;
      const pts = [];

      for (let i = 0; i <= pointsCount; i++) {
        const t = i / pointsCount;
        const pt = parentCurve.getPointAt(t);
        const tangent = parentCurve.getTangentAt(t);

        // Compute local perpendicular plane (Normal & Binormal)
        let up = new THREE.Vector3(0, 1, 0);
        if (Math.abs(tangent.y) > 0.9) up = new THREE.Vector3(1, 0, 0);
        const normal = new THREE.Vector3().crossVectors(tangent, up).normalize();
        const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();

        const angle = t * Math.PI * 2 * twistCycles + phase;
        const offset = normal.clone().multiplyScalar(Math.cos(angle) * radius)
          .add(binormal.clone().multiplyScalar(Math.sin(angle) * radius));

        // Taper down at Loki's hands (t < 0.15) for tight convergence
        const taper = Math.min(1.0, t / 0.15);
        pts.push(pt.clone().add(offset.multiplyScalar(taper)));
      }

      braids.push(new THREE.CatmullRomCurve3(pts));
    }
    return braids;
  }

  /* -----------------------------------------------------------------
   * 4. QUICK SELECTOR HUD (Pill Navigation for Desktop & Mobile)
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
        // On double-click or mobile tap when already active, open modal
        if (this.activeProjectIndex === idx) {
          this.openProjectModal(proj);
        }
      });

      this.selectorHud.appendChild(btn);
    });
  }

  /* -----------------------------------------------------------------
   * 5. FLOATING PROJECT TELEMETRY CARD (Surfaces along travel path)
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
      // Don't trigger if clicked on the git link
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
   * 6. TIMELINE SELECTION & CAMERA FLIGHT DISPATCHER
   * ----------------------------------------------------------------- */
  selectTimeline(index) {
    if (index === null || index === undefined) {
      this.targetActiveIndex = null;
      this.targetTravelProgress = 0;
      return;
    }

    this.targetActiveIndex = Math.max(0, Math.min(PROJECT_NODES.length - 1, index));
    this.targetTravelProgress = 1.0; // Glide camera along strand towards project
  }

  /* -----------------------------------------------------------------
   * 7. DEEP-DIVE MODAL SYSTEM
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
          // Reset to Loki center view
          this.selectTimeline(null);
        }
      }
    });
  }

  /* -----------------------------------------------------------------
   * 8. EVENT LISTENERS & NAVIGATION
   * ----------------------------------------------------------------- */
  setupListeners() {
    window.addEventListener('pointermove', (e) => this.onPointerMove(e), { passive: true });

    // Clicking anywhere on stage while focused on a timeline opens the deep dive
    this.stage.addEventListener('click', (e) => {
      // Don't trigger if clicked on buttons or selector pills
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

    // MOUSE BEHAVIOR:
    // Center deadzone: Within radius 0.26 -> Focused on Loki in chair
    // Outside deadzone: Traveling along nearest timeline strand
    const centerDeadzone = 0.26;

    if (this.mouse.dist < centerDeadzone) {
      this.targetActiveIndex = null;
      this.targetTravelProgress = 0;
    } else {
      // Find nearest project timeline by comparing mouse directional angle
      const mouseAngle = Math.atan2(ny, nx); // [-PI to PI]
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
      // Travel progress scales smoothly from 0.0 to 1.0 as cursor moves towards edge
      const travelNorm = Math.min(1.0, (this.mouse.dist - centerDeadzone) / 0.55);
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
   * 9. MAIN RENDER & ANIMATION LOOP
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

    // Handle Active Project switching
    if (this.targetActiveIndex !== this.activeProjectIndex) {
      this.activeProjectIndex = this.targetActiveIndex;
      if (this.activeProjectIndex !== null) {
        this.updateHudCard(PROJECT_NODES[this.activeProjectIndex]);
      }
    }

    // 1. Animate Loki Nexus Core & Spinning Rings
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

    // 2. Animate Godhood Aura Particle Drift
    if (this.auraPoints) {
      this.auraPoints.rotation.y = this.time * 0.04;
    }

    // 3. Compute Camera Target Vector (Center vs. Timeline Flight)
    if (this.activeProjectIndex === null || this.travelProgress < 0.05) {
      // --- MODE A: LOKI CENTER OVERVIEW ---
      // Subtle parallax sway with cursor
      const parallaxX = this.mouse.x * 0.75;
      const parallaxY = this.mouse.y * 0.45;

      this.targetCamPos.set(parallaxX, 1.25 + parallaxY, 7.8);
      this.targetLookAt.set(parallaxX * 0.25, 0.75 + parallaxY * 0.2, 0);

      // Restore central title visibility
      if (this.centerAnchor) {
        this.centerAnchor.style.opacity = '1';
        this.centerAnchor.style.transform = `translate(-50%, -50%) translate3d(${parallaxX * 22}px, ${-parallaxY * 18}px, 0)`;
      }

      // Hide floating project card
      if (this.hudCard) {
        this.hudCard.classList.remove('is-active');
      }
    } else {
      // --- MODE B: CAMERA TRAVELING ALONG SELECTED TIMELINE ---
      const activeTimeline = this.timelines[this.activeProjectIndex];
      const curve = activeTimeline.curve;

      // Sample along curve based on travel progress (from 30% to 75% along curve)
      const t = 0.28 + this.travelProgress * 0.46;
      const curvePoint = curve.getPointAt(t);

      // Camera offset along travel direction for optimal viewing angle
      const camOffset = new THREE.Vector3(0.2, 0.35, 1.45);
      this.targetCamPos.copy(curvePoint).add(camOffset);

      // Look toward the project's apex node
      this.targetLookAt.copy(activeTimeline.endPt);

      // Fade out central title to give full cinematic focus to the project
      if (this.centerAnchor) {
        const titleOpacity = Math.max(0, 1.0 - this.travelProgress * 2.2);
        this.centerAnchor.style.opacity = titleOpacity.toFixed(3);
      }

      // Reveal floating project card when zoom is deep enough
      if (this.hudCard) {
        if (this.travelProgress > 0.35) {
          this.hudCard.classList.add('is-active');
        } else {
          this.hudCard.classList.remove('is-active');
        }
      }
    }

    // Smooth lerp camera position and lookAt
    this.currentCamPos.lerp(this.targetCamPos, 0.075);
    this.currentLookAt.lerp(this.targetLookAt, 0.075);
    this.camera.position.copy(this.currentCamPos);
    this.camera.lookAt(this.currentLookAt);

    // 4. Update Timelines Shaders, Intensity, and Flowing Photons
    this.timelines.forEach((tl, idx) => {
      // Material uniforms
      tl.material.uniforms.uTime.value = this.time;

      const isSelected = idx === this.activeProjectIndex;
      let targetIntensity = 1.0;

      if (this.activeProjectIndex !== null) {
        // Boost selected timeline; dim others
        targetIntensity = isSelected
          ? 1.0 + this.travelProgress * 1.8
          : Math.max(0.2, 1.0 - this.travelProgress * 0.75);
      }

      const currInt = tl.material.uniforms.uIntensity.value;
      tl.material.uniforms.uIntensity.value += (targetIntensity - currInt) * 0.1;

      // Animate Apex Reticle Ring Spin
      if (tl.reticleRing) {
        tl.reticleRing.rotation.z += isSelected ? 0.035 : 0.012;
        const orbScale = isSelected ? 1.0 + Math.sin(this.time * 6.0) * 0.18 : 1.0;
        tl.orbGroup.scale.set(orbScale, orbScale, orbScale);
      }

      // Animate Flowing Energy Photons along strand
      const positions = tl.motesPoints.geometry.attributes.position.array;
      const count = tl.motesCount;

      for (let m = 0; m < count; m++) {
        // Advance offset along curve
        tl.motesOffsets[m] = (tl.motesOffsets[m] + tl.motesSpeeds[m] * (isSelected ? 0.024 : 0.012)) % 1.0;
        const pt = tl.curve.getPointAt(tl.motesOffsets[m]);

        positions[m * 3] = pt.x;
        positions[m * 3 + 1] = pt.y;
        positions[m * 3 + 2] = pt.z;
      }
      tl.motesPoints.geometry.attributes.position.needsUpdate = true;
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

// Backwards-compatible export for main.js and system bootstrap
export class ProjectSolarSystem extends ProjectTimelineEngine {}

export function initProjectSolarSystem() {
  const stage = document.getElementById('projects-stage');
  if (stage) {
    return new ProjectTimelineEngine();
  }
  return null;
}
