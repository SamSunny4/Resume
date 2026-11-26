import { PROJECT_NODES } from './projects.js';

/**
 * Full-Environment Three.js 3D Neural Constellation / Knowledge Graph
 * -------------------------------------------------------------------
 * Unified Three.js 3D space scene paired with the #work-feature bottom dock:
 *   - Compact floating title pills on idle nodes, expanded highlight plaques on focus/hover
 *   - Pruned synaptic constellation (top-2 strongest links per node, razor-thin idle filaments)
 *   - Neutral cool-white three-point lighting preserving each project's true accent color
 *   - Shortest-angle spherical camera fly-to framing and clamped orbit controls
 *   - Graceful 2D projected canvas fallback when WebGL is unavailable
 */

const GRAPH_META = {
  leadis: {
    group: 'AI & vision',
    label: 'Applied AI · 2nd Prize',
    headline: 'Multimodal developmental screening pipeline.',
    pos: [0.0, 0.75, 2.45],
    scale: 1.25,
    sharedTags: ['Next.js', 'Python', 'MediaPipe', 'Tailwind', 'Camera'],
  },
  sharedash: {
    group: 'Systems',
    label: 'Multipath Transfer',
    headline: '78–107 MB/s USB + Wi-Fi Direct P2P engine.',
    pos: [-3.95, -0.65, -1.15],
    scale: 1.25,
    sharedTags: ['Desktop', 'Rust', 'Networking'],
  },
  keybase: {
    group: 'Systems',
    label: 'Desktop Software',
    headline: 'Commercial retail key & records platform.',
    pos: [-3.25, 1.65, 1.45],
    scale: 1.0,
    sharedTags: ['Desktop', 'PyInstaller', 'Camera', 'Java'],
  },
  lateloggy: {
    group: 'Web',
    label: 'Campus Operations',
    headline: 'Dynamic anti-screenshot QR verification pass.',
    pos: [2.25, -0.65, 2.05],
    scale: 1.0,
    sharedTags: ['Next.js', 'Tailwind', 'Cloud DB', 'Web'],
  },
  infogrid: {
    group: 'Web',
    label: 'Digital Signage CMS',
    headline: '43" vertical lab display & Cloudflare R2 CMS.',
    pos: [3.3, 1.75, 1.05],
    scale: 1.0,
    sharedTags: ['Next.js', 'Web', 'Cloud DB'],
  },
  fitman: {
    group: 'AI & vision',
    label: 'Computer Vision',
    headline: '60fps 33-landmark skeletal biomechanics tracker.',
    pos: [-1.15, 2.05, -1.85],
    scale: 0.95,
    sharedTags: ['Python', 'MediaPipe', 'Camera'],
  },
  rainiest: {
    group: 'Web',
    label: 'Civic Weather Radar',
    headline: '14 Kerala districts rainfall & leave monitor.',
    pos: [4.1, -0.4, -1.55],
    scale: 0.92,
    sharedTags: ['Next.js', 'Tailwind', 'Canvas/3D', 'Web'],
  },
  'threed-s': {
    group: 'Systems',
    label: '3D Spatial Engine',
    headline: 'Point-cloud & hardware shader reconstruction.',
    pos: [1.55, 1.45, -3.25],
    scale: 0.9,
    sharedTags: ['Canvas/3D', 'Desktop'],
  },
  fakepaste: {
    group: 'Systems',
    label: 'Windows Utility',
    headline: 'Human-rhythm keystroke injection desktop tool.',
    pos: [-1.85, -0.95, -2.05],
    scale: 0.9,
    sharedTags: ['Python', 'PyInstaller', 'Desktop'],
  },
};

const ORDER = ['leadis', 'sharedash', 'keybase', 'lateloggy', 'infogrid', 'fitman', 'rainiest', 'threed-s', 'fakepaste'];
const MIN_RADIUS = 5.8;
const MAX_RADIUS = 16.5;
const MIN_PHI = 0.65;
const MAX_PHI = 2.35;

const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/**
 * Prune candidate synaptic pairs by shared-tag count descending and cap each
 * project to its top `maxPerNode` strongest connections (~9–12 clean lines total).
 */
function buildSynapticEdges(projects, maxPerNode = 2) {
  const candidates = [];
  for (let i = 0; i < projects.length; i++) {
    for (let j = i + 1; j < projects.length; j++) {
      const a = projects[i];
      const b = projects[j];
      const shared = GRAPH_META[a.id].sharedTags.filter((tag) => GRAPH_META[b.id].sharedTags.includes(tag));
      if (shared.length > 0) {
        candidates.push({
          aIndex: i,
          bIndex: j,
          aId: a.id,
          bId: b.id,
          shared,
          strength: shared.length,
        });
      }
    }
  }

  candidates.sort((a, b) => b.strength - a.strength || a.aIndex - b.aIndex || a.bIndex - b.bIndex);

  const selected = [];
  const selectedKeys = new Set();
  const degree = new Array(projects.length).fill(0);

  for (const edge of candidates) {
    if (degree[edge.aIndex] < maxPerNode && degree[edge.bIndex] < maxPerNode) {
      selected.push(edge);
      selectedKeys.add(`${edge.aIndex}-${edge.bIndex}`);
      degree[edge.aIndex]++;
      degree[edge.bIndex]++;
    }
  }

  // Ensure every node keeps at least one connection if its strongest neighbors hit cap first
  for (let i = 0; i < projects.length; i++) {
    if (degree[i] > 0) continue;
    const fallback = candidates.find(
      (e) => (e.aIndex === i || e.bIndex === i) && !selectedKeys.has(`${e.aIndex}-${e.bIndex}`)
    );
    if (fallback) {
      selected.push(fallback);
      selectedKeys.add(`${fallback.aIndex}-${fallback.bIndex}`);
      degree[fallback.aIndex]++;
      degree[fallback.bIndex]++;
    }
  }

  return selected;
}

/**
 * Soft radial sprite texture for halos, starfield dust, and travelling pulses.
 */
function createGlowCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(64, 64, 2, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.28, 'rgba(255, 255, 255, 0.72)');
  grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.16)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  return canvas;
}

/**
 * Draw a plaque texture for Three.js:
 *  - Inactive: compact translucent title pill (index + project name only)
 *  - Active/Hovered: expanded highlight pill with icon, category, and glowing border
 */
function renderPlaqueCanvas(project, index, isExpanded, iconImg) {
  const w = 512;
  const h = 128;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  if (!isExpanded) {
    // Compact floating title pill centered in canvas
    ctx.font = '700 28px "Syne", "Plus Jakarta Sans", sans-serif';
    const titleWidth = ctx.measureText(project.name).width;
    const idxText = String(index + 1).padStart(2, '0');
    const pillW = clamp(Math.ceil(titleWidth + 132), 230, w - 16);
    const pillH = 74;
    const x = (w - pillW) / 2;
    const y = (h - pillH) / 2;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, y, pillW, pillH, 37);
    ctx.fillStyle = 'rgba(8, 12, 10, 0.76)';
    ctx.fill();
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.stroke();

    // Accent dot
    ctx.fillStyle = project.color;
    ctx.beginPath();
    ctx.arc(x + 30, h / 2, 6, 0, Math.PI * 2);
    ctx.fill();

    // Index
    ctx.font = '700 20px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(227, 232, 220, 0.55)';
    ctx.textBaseline = 'middle';
    ctx.fillText(idxText, x + 48, h / 2 + 1);

    // Project name
    ctx.font = '700 28px "Syne", "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#F2F5EC';
    ctx.fillText(project.name, x + 90, h / 2 + 1, pillW - 112);
    ctx.restore();
    return canvas;
  }

  // Expanded highlight plaque for active / hovered node
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(8, 8, w - 16, h - 16, 26);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, 'rgba(15, 23, 16, 0.94)');
  bg.addColorStop(1, 'rgba(6, 10, 8, 0.96)');
  ctx.fillStyle = bg;
  ctx.fill();

  ctx.lineWidth = 3;
  ctx.strokeStyle = project.color;
  ctx.stroke();
  ctx.restore();

  // Icon badge
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(24, 26, 76, 76, 16);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fill();
  ctx.strokeStyle = project.color;
  ctx.lineWidth = 1.4;
  ctx.stroke();
  if (iconImg && iconImg.complete && iconImg.naturalWidth > 0) {
    ctx.drawImage(iconImg, 36, 38, 52, 52);
  }
  ctx.restore();

  // Category & Title
  const meta = GRAPH_META[project.id];
  ctx.save();
  ctx.font = '700 17px "JetBrains Mono", monospace';
  ctx.fillStyle = project.color;
  ctx.textBaseline = 'top';
  ctx.fillText(`${String(index + 1).padStart(2, '0')} // ${meta.label.toUpperCase()}`, 116, 28);

  ctx.font = '800 32px "Syne", "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(project.name, 116, 58, 372);
  ctx.restore();

  return canvas;
}

/**
 * Draw a compact 3D edge shared-tech label texture for Three.js sprites.
 */
function renderEdgeLabelCanvas(text, accentColor) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.font = '700 21px "JetBrains Mono", monospace';
  const tw = clamp(ctx.measureText(text).width + 34, 88, 224);
  const x = (256 - tw) / 2;

  ctx.beginPath();
  ctx.roundRect(x, 10, tw, 44, 22);
  ctx.fillStyle = 'rgba(7, 11, 8, 0.92)';
  ctx.fill();
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#E3E8DC';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 128, 32, tw - 16);
  return canvas;
}

class ProjectConstellationEngine {
  constructor() {
    this.root = document.getElementById('project-explorer');
    this.layerEl = document.getElementById('projects-space-layer');
    this.viewport = document.getElementById('constellation-viewport');
    this.canvasHost = document.getElementById('constellation-canvas-host');
    this.dock = document.getElementById('work-feature');
    this.counter = this.root?.querySelector('.work-count');
    this.announcement = this.root?.querySelector('.work-announcement');
    this.dialog = document.getElementById('work-dialog');

    if (!this.root || !this.viewport || !this.canvasHost || !this.dock) return;

    this.projects = ORDER.map((id) => PROJECT_NODES.find((p) => p.id === id)).filter(Boolean);
    this.edges = buildSynapticEdges(this.projects, 2);
    this.category = 'All work';
    this.activeId = this.projects[0].id;
    this.hoveredId = null;
    this.opener = null;

    // Spherical camera orbit & smooth fly-to state
    this.baseRadius = 9.4;
    this.camTheta = 0.0;
    this.camPhi = 1.42;
    this.camRadius = 9.4;
    this.targetTheta = 0.0;
    this.targetPhi = 1.42;
    this.targetRadius = 9.4;
    this.lookAtCurrent = null;
    this.lookAtTarget = null;
    this.thetaVel = 0;
    this.phiVel = 0;

    this.isDragging = false;
    this.hasMoved = false;
    this.startX = 0;
    this.startY = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.time = 0;
    this.wasVisible = false;
    this.rafId = null;
    this.isDestroyed = false;

    this.useCanvas2D = false;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.composer = null;
    this.worldGroup = null;
    this.starField = null;
    this.nodeVisuals = [];
    this.edgeVisuals = [];
    this.pulseVisuals = [];
    this.raycaster = null;
    this.pointerNdc = null;
    this.canvas2d = null;
    this.ctx2d = null;
    this.iconCache = new Map();
    this.maxAnisotropy = 1;

    this.animate = this.animate.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);

    this.init();
  }

  init() {
    this.preloadIcons();
    this.initEngine();
    this.bindEvents();
    this.selectProject(this.activeId, true);
    this.startLoop();
  }

  preloadIcons() {
    this.projects.forEach((proj, idx) => {
      const img = new Image();
      img.onload = () => this.refreshPlaqueTexture(idx);
      img.src = proj.icon;
      this.iconCache.set(proj.id, img);
    });
  }

  configureTexture(tex, isColor = true) {
    if (!tex || !window.THREE) return tex;
    if (isColor) tex.colorSpace = window.THREE.SRGBColorSpace;
    tex.minFilter = window.THREE.LinearMipmapLinearFilter;
    tex.magFilter = window.THREE.LinearFilter;
    tex.anisotropy = this.maxAnisotropy;
    return tex;
  }

  refreshPlaqueTexture(idx) {
    const node = this.nodeVisuals[idx];
    if (!node || !window.THREE) return;
    const proj = this.projects[idx];
    const iconImg = this.iconCache.get(proj.id);

    const defTex = this.configureTexture(new window.THREE.CanvasTexture(renderPlaqueCanvas(proj, idx, false, iconImg)));
    const actTex = this.configureTexture(new window.THREE.CanvasTexture(renderPlaqueCanvas(proj, idx, true, iconImg)));

    node.defPlaqueTex?.dispose();
    node.actPlaqueTex?.dispose();
    node.defPlaqueTex = defTex;
    node.actPlaqueTex = actTex;
    const focusId = this.hoveredId || this.activeId;
    node.plaqueMat.map = proj.id === focusId ? actTex : defTex;
    node.plaqueMat.needsUpdate = true;
  }

  initEngine() {
    const THREE = window.THREE;
    if (THREE) {
      try {
        this.initThree(THREE);
        if (this.renderer) return;
      } catch (err) {
        console.warn('[Constellation] Three.js WebGL unavailable, using 2D projected fallback:', err);
      }
    }
    this.initCanvas2DFallback();
  }

  initThree(THREE) {
    const width = Math.max(300, this.viewport.clientWidth || window.innerWidth || 1280);
    const height = Math.max(300, this.viewport.clientHeight || window.innerHeight || 720);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x030503, 0.022);

    this.camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 120);
    this.lookAtCurrent = new THREE.Vector3(0, -0.55, 0);
    this.lookAtTarget = new THREE.Vector3(0, -0.55, 0);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.maxAnisotropy = Math.max(1, this.renderer.capabilities.getMaxAnisotropy());
    this.updateCameraRadius(width, height);

    this.canvasHost.innerHTML = '';
    this.renderer.domElement.className = 'constellation-webgl-canvas';
    this.canvasHost.appendChild(this.renderer.domElement);

    // Optional selective bloom when Three.js post-processing addons are available on the page
    this.setupSelectiveBloom(THREE, width, height);

    // Neutral cool-white three-point lighting so each project's color stays vibrant and accurate
    this.scene.add(new THREE.AmbientLight(0xf2f7ff, 0.72));
    const keyLight = new THREE.DirectionalLight(0xf2f7ff, 1.35);
    keyLight.position.set(6, 9, 8);
    this.scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf2f7ff, 0.6);
    fillLight.position.set(-7, 2, 6);
    this.scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xf2f7ff, 0.95);
    rimLight.position.set(-5, -6, -7);
    this.scene.add(rimLight);

    this.worldGroup = new THREE.Group();
    this.scene.add(this.worldGroup);

    const glowTex = this.configureTexture(new THREE.CanvasTexture(createGlowCanvas()), false);

    // Background Starfield placed well outside the camera's orbit shell (r = 18..46)
    const starCount = 340;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 18 + Math.random() * 28;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.cos(phi);
      starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      map: glowTex,
      color: 0xcfd8dc,
      size: 0.22,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.starField = new THREE.Points(starGeo, starMat);
    this.worldGroup.add(this.starField);

    // Subtle neutral orbital reference rings
    [4.6, 6.4].forEach((r, idx) => {
      const envRingGeo = new THREE.TorusGeometry(r, 0.006, 8, 96);
      const envRingMat = new THREE.MeshBasicMaterial({
        color: 0x94a39b,
        transparent: true,
        opacity: 0.09,
      });
      const envRing = new THREE.Mesh(envRingGeo, envRingMat);
      envRing.rotation.x = Math.PI * (idx === 0 ? 0.44 : -0.38);
      envRing.rotation.y = idx * 0.45;
      this.worldGroup.add(envRing);
    });

    // Build 9 3D crystal nodes & billboarded holographic plaques
    const coreGeo = new THREE.IcosahedronGeometry(0.3, 0);
    const cageGeo = new THREE.OctahedronGeometry(0.47, 0);
    const ringGeo = new THREE.TorusGeometry(0.62, 0.015, 12, 48);
    const plaqueGeo = new THREE.PlaneGeometry(1.42, 0.355);

    this.nodeVisuals = this.projects.map((proj, index) => {
      const meta = GRAPH_META[proj.id];
      const [px, py, pz] = meta.pos;
      const baseScale = meta.scale || 1.0;

      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(px, py, pz);
      nodeGroup.scale.setScalar(baseScale);

      const accent = new THREE.Color(proj.color);
      const coreMat = new THREE.MeshStandardMaterial({
        color: accent,
        emissive: accent,
        emissiveIntensity: 0.42,
        roughness: 0.24,
        metalness: 0.62,
        flatShading: true,
        transparent: true,
        opacity: 0.96,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.userData = { projectId: proj.id };

      // Wireframe cage & orbital focus ring remain hidden on idle stars, fading in on hover/select
      const cageMat = new THREE.MeshBasicMaterial({
        color: accent,
        wireframe: true,
        transparent: true,
        opacity: 0,
      });
      const cageMesh = new THREE.Mesh(cageGeo, cageMat);
      cageMesh.visible = false;

      const ringMat = new THREE.MeshBasicMaterial({
        color: accent,
        transparent: true,
        opacity: 0,
      });
      const focusRing = new THREE.Mesh(ringGeo, ringMat);
      focusRing.rotation.x = Math.PI * 0.35 + index * 0.25;
      focusRing.visible = false;

      // Tight additive halo around core
      const haloMat = new THREE.SpriteMaterial({
        map: glowTex,
        color: accent,
        transparent: true,
        opacity: 0.38,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const haloSprite = new THREE.Sprite(haloMat);
      haloSprite.scale.set(1.25, 1.25, 1);

      const iconImg = this.iconCache.get(proj.id);
      const defPlaqueTex = this.configureTexture(
        new THREE.CanvasTexture(renderPlaqueCanvas(proj, index, false, iconImg))
      );
      const actPlaqueTex = this.configureTexture(
        new THREE.CanvasTexture(renderPlaqueCanvas(proj, index, true, iconImg))
      );

      const plaqueMat = new THREE.MeshBasicMaterial({
        map: proj.id === this.activeId ? actPlaqueTex : defPlaqueTex,
        transparent: true,
        depthWrite: false,
        side: THREE.FrontSide,
      });
      const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMat);
      plaqueMesh.position.set(0, -0.62, 0.25);
      plaqueMesh.userData = { projectId: proj.id };

      nodeGroup.add(haloSprite, coreMesh, cageMesh, focusRing, plaqueMesh);
      this.worldGroup.add(nodeGroup);

      return {
        id: proj.id,
        basePos: new THREE.Vector3(px, py, pz),
        baseScale,
        group: nodeGroup,
        coreMesh,
        cageMesh,
        focusRing,
        haloSprite,
        plaqueMesh,
        coreMat,
        cageMat,
        ringMat,
        haloMat,
        plaqueMat,
        defPlaqueTex,
        actPlaqueTex,
        spinSpeed: 0.008 + (index % 4) * 0.0025,
        phase: index * 0.9,
      };
    });

    // Build pruned 3D curved Catmull-Rom synaptic tubes + mid-edge sprites + travelling pulses
    this.edgeVisuals = [];
    this.pulseVisuals = [];

    this.edges.forEach((edge, idx) => {
      const start = this.nodeVisuals[edge.aIndex].basePos;
      const end = this.nodeVisuals[edge.bIndex].basePos;
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const outward = mid.lengthSq() > 0.001 ? mid.clone().normalize().multiplyScalar(0.5) : new THREE.Vector3(0, 0.5, 0);
      mid.add(outward);

      const curve = new THREE.CatmullRomCurve3([start.clone(), mid, end.clone()]);
      const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.005, 6, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: 0x62705d,
        transparent: true,
        opacity: 0.08,
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      this.worldGroup.add(tubeMesh);

      const labelTex = this.configureTexture(
        new THREE.CanvasTexture(renderEdgeLabelCanvas(edge.shared[0], '#D2FF00'))
      );
      const labelMat = new THREE.SpriteMaterial({
        map: labelTex,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const labelSprite = new THREE.Sprite(labelMat);
      labelSprite.position.copy(curve.getPoint(0.5));
      labelSprite.scale.set(1.05, 0.26, 1);
      labelSprite.visible = false;
      this.worldGroup.add(labelSprite);

      this.edgeVisuals.push({
        edge,
        curve,
        tubeMesh,
        tubeGeo,
        tubeMat,
        labelSprite,
        labelMat,
        labelTex,
      });

      const pulseMat = new THREE.SpriteMaterial({
        map: glowTex,
        color: 0xd2ff00,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const pulseSprite = new THREE.Sprite(pulseMat);
      pulseSprite.scale.set(0.26, 0.26, 1);
      pulseSprite.visible = false;
      this.worldGroup.add(pulseSprite);

      this.pulseVisuals.push({
        edge,
        curve,
        sprite: pulseSprite,
        pulseMat,
        t: (idx * 0.29) % 1,
        speed: 0.0052 + (idx % 3) * 0.0016,
      });
    });

    this.raycaster = new THREE.Raycaster();
    this.pointerNdc = new THREE.Vector2();
  }

  setupSelectiveBloom(THREE, width, height) {
    if (
      typeof THREE.EffectComposer === 'function' &&
      typeof THREE.RenderPass === 'function' &&
      typeof THREE.UnrealBloomPass === 'function' &&
      typeof THREE.OutputPass === 'function'
    ) {
      const composer = new THREE.EffectComposer(this.renderer);
      composer.addPass(new THREE.RenderPass(this.scene, this.camera));
      const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(width, height), 0.45, 0.4, 1.1);
      composer.addPass(bloomPass);
      composer.addPass(new THREE.OutputPass());
      this.composer = composer;
    }
  }

  initCanvas2DFallback() {
    this.useCanvas2D = true;
    this.canvasHost.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.className = 'constellation-webgl-canvas';
    this.canvasHost.appendChild(canvas);
    this.canvas2d = canvas;
    this.ctx2d = canvas.getContext('2d');
    this.onResize();
  }

  updateCameraRadius(width, height) {
    const aspect = width / Math.max(1, height);
    if (this.camera) {
      this.camera.aspect = aspect;
      this.camera.updateProjectionMatrix();
    }
    this.baseRadius = clamp(aspect < 0.85 ? 14.2 : aspect < 1.25 ? 10.8 : 9.6, MIN_RADIUS, MAX_RADIUS);
    if (!this.isDragging) {
      this.targetRadius = clamp(this.baseRadius, MIN_RADIUS, MAX_RADIUS);
    }
  }

  getConnectedProjectIds(projectId) {
    const connected = new Map();
    this.edges.forEach((edge) => {
      if (edge.aId === projectId) connected.set(edge.bId, edge.shared);
      else if (edge.bId === projectId) connected.set(edge.aId, edge.shared);
    });
    return connected;
  }

  isProjectVisibleInFilter(projectId) {
    return this.category === 'All work' || GRAPH_META[projectId].group === this.category;
  }

  updatePlaqueHighlights() {
    const focusId = this.hoveredId || this.activeId;
    this.nodeVisuals.forEach((node) => {
      const nextMap = node.id === focusId ? node.actPlaqueTex : node.defPlaqueTex;
      if (node.plaqueMat.map !== nextMap) {
        node.plaqueMat.map = nextMap;
        node.plaqueMat.needsUpdate = true;
      }
    });
  }

  selectProject(id, flyCamera = true) {
    const project = this.projects.find((p) => p.id === id);
    if (!project) return;
    this.activeId = id;
    this.updatePlaqueHighlights();

    if (flyCamera) {
      const [px, py, pz] = GRAPH_META[id].pos;
      const desiredTheta = Math.atan2(px, pz || 0.001);
      const delta = Math.atan2(Math.sin(desiredTheta - this.camTheta), Math.cos(desiredTheta - this.camTheta));
      this.targetTheta = this.camTheta + delta;

      const horiz = Math.hypot(px, pz) || 1;
      const desiredPhi = Math.PI / 2 - Math.atan2(py, horiz) * 0.55;
      this.targetPhi = clamp(desiredPhi, MIN_PHI, MAX_PHI);
      this.targetRadius = clamp((this.baseRadius || 9.6) * 0.88, MIN_RADIUS, MAX_RADIUS);

      if (this.lookAtTarget && window.THREE) {
        this.lookAtTarget.set(px * 0.25, py * 0.2 - 0.65, pz * 0.25);
      }
    }

    this.renderDock(project);
    this.updateCounterUI();

    if (this.announcement) {
      this.announcement.textContent = `${project.name} selected`;
    }
  }

  renderDock(project) {
    const meta = GRAPH_META[project.id];
    const index = this.projects.findIndex((p) => p.id === project.id);
    const connected = this.getConnectedProjectIds(project.id);
    const linkedChips = Array.from(connected.entries())
      .slice(0, 3)
      .map(([otherId, shared]) => {
        const other = this.projects.find((p) => p.id === otherId);
        if (!other) return '';
        return `<button type="button" class="dock-link-chip" data-jump-project="${other.id}" style="--chip-accent:${escapeHtml(other.color)}">${escapeHtml(other.name)} <span>${escapeHtml(shared[0])}</span></button>`;
      })
      .join('');

    this.dock.style.setProperty('--work-accent', project.color);
    this.dock.innerHTML = `
      <div class="dock-main">
        <div class="dock-identity">
          <div class="dock-icon-wrap"><img src="${escapeHtml(project.icon)}" alt="" width="24" height="24"></div>
          <div class="dock-text">
            <div class="dock-meta-line">
              <span class="work-status"><i></i>${escapeHtml(project.badge)}</span>
              <span class="work-position font-mono">${String(index + 1).padStart(2, '0')} / ${String(this.projects.length).padStart(2, '0')}</span>
            </div>
            <h3>${escapeHtml(project.name)}</h3>
            <p class="dock-headline">${escapeHtml(meta.headline)}</p>
          </div>
        </div>
        <div class="dock-links-wrap">${linkedChips}</div>
        <div class="dock-actions">
          <button type="button" class="work-primary" data-details>Full specs ↗</button>
          <a class="work-repo" href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer">Source ↗</a>
          <div class="work-stepper">
            <button type="button" data-step="-1" aria-label="Previous project">←</button>
            <button type="button" data-step="1" aria-label="Next project">→</button>
          </div>
        </div>
      </div>
    `;
  }

  updateCounterUI() {
    const visible = this.projects.filter((p) => this.isProjectVisibleInFilter(p.id));
    if (this.counter) {
      this.counter.textContent = `${String(visible.length).padStart(2, '0')} NODES`;
    }
  }

  stepProject(delta) {
    const visible = this.projects.filter((p) => this.isProjectVisibleInFilter(p.id));
    if (!visible.length) return;
    const idx = visible.findIndex((p) => p.id === this.activeId);
    const next = visible[(Math.max(0, idx) + delta + visible.length) % visible.length];
    this.selectProject(next.id, true);
  }

  openDetails() {
    const project = this.projects.find((p) => p.id === this.activeId);
    if (!project || !this.dialog) return;
    const meta = GRAPH_META[project.id];
    this.opener = document.activeElement;
    this.dialog.style.setProperty('--work-accent', project.color);
    this.dialog.querySelector('.work-dialog-content').innerHTML = `
      <span class="work-eyebrow">${escapeHtml(meta.label)} / PROJECT NOTES</span>
      <h2 id="work-dialog-title">${escapeHtml(project.name)}</h2>
      <p class="work-dialog-headline">${escapeHtml(meta.headline)}</p>
      <p class="work-dialog-description">${escapeHtml(project.desc)}</p>
      <h3>Built with</h3>
      <ul class="work-stack">${project.tech.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul>
      <h3>Inside the project</h3>
      <ul class="work-capabilities">${project.stats.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul>
      <a href="${escapeHtml(project.github)}" class="work-primary" target="_blank" rel="noopener noreferrer">View repository ↗</a>
    `;
    this.dialog.showModal();
    window.AppState?.lenis?.stop();
    document.body.classList.add('work-dialog-open');
  }

  bindEvents() {
    this.viewport.style.touchAction = 'pan-y';
    this.viewport.addEventListener('pointerdown', this.onPointerDown, { passive: true });
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    window.addEventListener('pointerup', this.onPointerUp, { passive: true });
    window.addEventListener('pointercancel', this.onPointerUp, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });

    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(this.viewport);

    this.root.addEventListener('click', (event) => {
      const filter = event.target.closest('[data-work-filter]');
      if (filter) {
        this.category = filter.dataset.workFilter;
        this.root.querySelectorAll('[data-work-filter]').forEach((btn) =>
          btn.setAttribute('aria-pressed', String(btn === filter))
        );
        if (!this.isProjectVisibleInFilter(this.activeId)) {
          const first = this.projects.find((p) => this.isProjectVisibleInFilter(p.id));
          if (first) this.selectProject(first.id, true);
        } else {
          this.updateCounterUI();
        }
        return;
      }

      const jump = event.target.closest('[data-jump-project]');
      if (jump) {
        this.selectProject(jump.dataset.jumpProject, true);
        return;
      }

      const step = event.target.closest('[data-step]');
      if (step) {
        this.stepProject(Number(step.dataset.step));
        return;
      }

      if (event.target.closest('[data-details]')) {
        this.openDetails();
      }
    });

    if (this.dialog) {
      this.dialog.querySelector('[data-close-work]')?.addEventListener('click', () => this.dialog.close());
      this.dialog.addEventListener('click', (event) => {
        if (event.target === this.dialog) this.dialog.close();
      });
      this.dialog.addEventListener('close', () => {
        document.body.classList.remove('work-dialog-open');
        window.AppState?.lenis?.start();
        if (this.opener?.isConnected) this.opener.focus({ preventScroll: true });
      });
    }
  }

  getRaycastHit(clientX, clientY) {
    if (this.useCanvas2D || !this.raycaster || !this.camera || !this.renderer) return null;
    const rect = this.renderer.domElement.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return null;
    if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) return null;

    this.pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointerNdc, this.camera);

    const targets = [];
    this.nodeVisuals.forEach((n) => {
      if (this.isProjectVisibleInFilter(n.id)) {
        targets.push(n.coreMesh, n.plaqueMesh);
      }
    });
    const hits = this.raycaster.intersectObjects(targets, false);
    return hits.length > 0 ? hits[0].object.userData.projectId : null;
  }

  onPointerDown(e) {
    if (e.target.closest('.constellation-header, .constellation-bottom-hud')) return;
    this.isDragging = true;
    this.hasMoved = false;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this.thetaVel = 0;
    this.phiVel = 0;
    this.viewport.classList.add('is-grabbing');
  }

  onPointerMove(e) {
    if (this.isDragging) {
      if (e.pointerType === 'touch' && !this.hasMoved) {
        const totalDx = Math.abs(e.clientX - this.startX);
        const totalDy = Math.abs(e.clientY - this.startY);
        if (totalDy > totalDx && totalDy > 7) {
          this.isDragging = false;
          this.viewport.classList.remove('is-grabbing');
          return;
        }
      }

      const dx = e.clientX - this.lastX;
      const dy = e.clientY - this.lastY;
      if (Math.hypot(e.clientX - this.startX, e.clientY - this.startY) > 5) {
        this.hasMoved = true;
      }
      this.lastX = e.clientX;
      this.lastY = e.clientY;

      this.targetTheta -= dx * 0.0068;
      this.targetPhi = clamp(this.targetPhi - dy * 0.0052, MIN_PHI, MAX_PHI);
      this.thetaVel = -dx * 0.0022;
      this.phiVel = -dy * 0.0016;
      return;
    }

    if (e.target.closest('.constellation-header, .constellation-bottom-hud')) {
      if (this.hoveredId) {
        this.hoveredId = null;
        this.updatePlaqueHighlights();
      }
      this.viewport.style.cursor = 'default';
      return;
    }

    const hitId = this.getRaycastHit(e.clientX, e.clientY);
    if (hitId !== this.hoveredId) {
      this.hoveredId = hitId;
      this.updatePlaqueHighlights();
    }
    this.viewport.style.cursor = hitId ? 'pointer' : 'grab';
  }

  onPointerUp(e) {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.viewport.classList.remove('is-grabbing');

    if (!this.hasMoved) {
      const hitId = this.getRaycastHit(e.clientX, e.clientY);
      if (hitId) {
        if (hitId === this.activeId) {
          this.openDetails();
        } else {
          this.selectProject(hitId, true);
        }
        return;
      }
    }
  }

  onResize() {
    const width = Math.max(280, this.viewport.clientWidth || window.innerWidth || 1280);
    const height = Math.max(240, this.viewport.clientHeight || window.innerHeight || 720);

    if (this.useCanvas2D && this.canvas2d && this.ctx2d) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas2d.width = Math.round(width * dpr);
      this.canvas2d.height = Math.round(height * dpr);
      this.ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      return;
    }

    if (this.renderer && this.camera) {
      this.updateCameraRadius(width, height);
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      if (this.composer) {
        this.composer.setSize(width, height);
      }
    }
  }

  isLayerVisible() {
    if (document.hidden) return false;
    if (!this.layerEl) return true;
    return this.layerEl.style.visibility !== 'hidden' && parseFloat(this.layerEl.style.opacity || '1') > 0.01;
  }

  startLoop() {
    if (!this.rafId) {
      this.rafId = requestAnimationFrame(this.animate);
    }
  }

  animate() {
    if (this.isDestroyed) return;
    this.rafId = requestAnimationFrame(this.animate);

    const visible = this.isLayerVisible();
    if (!visible) {
      this.wasVisible = false;
      return;
    }
    if (!this.wasVisible) {
      this.wasVisible = true;
      this.onResize();
    }

    this.time += 0.016;

    // Apply smooth drag inertia when released, or subtle idle orbit when undisturbed
    if (!this.isDragging) {
      if (Math.abs(this.thetaVel) > 0.0001 || Math.abs(this.phiVel) > 0.0001) {
        this.targetTheta += this.thetaVel;
        this.targetPhi = clamp(this.targetPhi + this.phiVel, MIN_PHI, MAX_PHI);
        this.thetaVel *= 0.91;
        this.phiVel *= 0.91;
      } else if (!this.hoveredId) {
        this.targetTheta += 0.0012;
      }
    }

    this.camTheta += (this.targetTheta - this.camTheta) * 0.08;
    this.camPhi = clamp(this.camPhi + (this.targetPhi - this.camPhi) * 0.08, MIN_PHI, MAX_PHI);
    this.camRadius = clamp(this.camRadius + (this.targetRadius - this.camRadius) * 0.08, MIN_RADIUS, MAX_RADIUS);

    const focusId = this.hoveredId || this.activeId;
    const connectedMap = this.getConnectedProjectIds(focusId);

    if (this.useCanvas2D) {
      this.renderCanvas2D(focusId, connectedMap);
    } else if (this.renderer && this.scene && this.camera) {
      this.renderThree(focusId, connectedMap);
    }
  }

  renderThree(focusId, connectedMap) {
    this.camera.position.set(
      this.camRadius * Math.sin(this.camPhi) * Math.sin(this.camTheta),
      this.camRadius * Math.cos(this.camPhi),
      this.camRadius * Math.sin(this.camPhi) * Math.cos(this.camTheta)
    );
    if (this.lookAtCurrent && this.lookAtTarget) {
      this.lookAtCurrent.lerp(this.lookAtTarget, 0.08);
      this.camera.lookAt(this.lookAtCurrent);
    } else {
      this.camera.lookAt(0, -0.55, 0);
    }

    if (this.starField) {
      this.starField.rotation.y += 0.0003;
    }

    const activeEmissive = this.composer ? 1.65 : 0.95;

    this.nodeVisuals.forEach((n) => {
      const inFilter = this.isProjectVisibleInFilter(n.id);
      const isFocus = n.id === focusId;
      const isConnected = connectedMap.has(n.id);

      const bob = Math.sin(this.time * 1.4 + n.phase) * 0.08;
      n.group.position.set(n.basePos.x, n.basePos.y + bob, n.basePos.z);

      const targetScale = n.baseScale * (!inFilter ? 0.65 : isFocus ? 1.24 : isConnected ? 1.06 : 0.94);
      const curScale = n.group.scale.x + (targetScale - n.group.scale.x) * 0.12;
      n.group.scale.setScalar(curScale);

      const rotBoost = isFocus ? 2.1 : 1.0;
      n.coreMesh.rotation.y += n.spinSpeed * rotBoost;
      n.coreMesh.rotation.x += n.spinSpeed * 0.65 * rotBoost;
      n.cageMesh.rotation.y -= n.spinSpeed * 1.25;
      n.cageMesh.rotation.z += n.spinSpeed * 0.75;
      n.focusRing.rotation.z += 0.018;

      n.coreMat.opacity = inFilter ? (isFocus || isConnected ? 1.0 : 0.84) : 0.12;
      n.coreMat.emissiveIntensity += ((isFocus ? activeEmissive : isConnected ? 0.56 : 0.36) - n.coreMat.emissiveIntensity) * 0.12;

      // Idle stars hide cage & focus ring; smoothly fade in only when hovered or selected
      const targetCageOp = inFilter && isFocus ? 0.68 : 0;
      n.cageMat.opacity += (targetCageOp - n.cageMat.opacity) * 0.14;
      n.cageMesh.visible = n.cageMat.opacity > 0.015;

      const targetRingOp = inFilter && isFocus ? 0.88 : 0;
      n.ringMat.opacity += (targetRingOp - n.ringMat.opacity) * 0.14;
      n.focusRing.visible = n.ringMat.opacity > 0.015;

      n.haloMat.opacity = inFilter ? (isFocus ? 0.72 : isConnected ? 0.44 : 0.28) : 0.05;

      // Billboard plaque to face camera cleanly and adjust scale/fade by Z-depth distance
      const dirToCam = this.camera.position.clone().sub(n.group.position);
      const dist = dirToCam.length();
      dirToCam.normalize();

      n.plaqueMesh.quaternion.copy(this.camera.quaternion);
      n.plaqueMesh.position.set(dirToCam.x * 0.32, -0.62 + dirToCam.y * 0.08, dirToCam.z * 0.32);

      const depthFactor = clamp(1.38 - dist * 0.048, 0.72, 1.06);
      const targetPlaqueScale = (isFocus ? 1.18 : depthFactor) / Math.max(0.8, curScale);
      const curPlaqueScale = n.plaqueMesh.scale.x + (targetPlaqueScale - n.plaqueMesh.scale.x) * 0.14;
      n.plaqueMesh.scale.set(curPlaqueScale, curPlaqueScale, 1);

      const depthAlpha = clamp(1.42 - dist * 0.068, 0.36, 0.92);
      n.plaqueMat.opacity = !inFilter ? 0.12 : isFocus ? 1.0 : isConnected ? Math.max(0.75, depthAlpha) : depthAlpha;
    });

    // Update synaptic tubes, mid-edge sprites & travelling pulses (focused connections only)
    const focusColor = new window.THREE.Color(this.projects.find((p) => p.id === focusId)?.color || '#D2FF00');
    const dimColor = new window.THREE.Color(0x52604f);

    this.edgeVisuals.forEach((ev) => {
      const touchesFocus = ev.edge.aId === focusId || ev.edge.bId === focusId;
      const bothVisible = this.isProjectVisibleInFilter(ev.edge.aId) && this.isProjectVisibleInFilter(ev.edge.bId);
      ev.tubeMat.color.copy(touchesFocus && bothVisible ? focusColor : dimColor);
      ev.tubeMat.opacity = !bothVisible ? 0.04 : touchesFocus ? 0.75 : 0.08;

      const showLabel = bothVisible && touchesFocus;
      ev.labelSprite.visible = showLabel;
      ev.labelMat.opacity = showLabel ? 0.94 : 0;
    });

    this.pulseVisuals.forEach((p) => {
      const touchesFocus = p.edge.aId === focusId || p.edge.bId === focusId;
      const bothVisible = this.isProjectVisibleInFilter(p.edge.aId) && this.isProjectVisibleInFilter(p.edge.bId);
      const activePulse = bothVisible && touchesFocus;
      p.sprite.visible = activePulse;
      if (!activePulse) return;

      p.t = (p.t + p.speed) % 1;
      p.curve.getPointAt(p.t, p.sprite.position);
      p.pulseMat.color.copy(focusColor);
      p.pulseMat.opacity = 0.96;
    });

    if (this.composer) {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  /**
   * 2D Canvas 3D-projected fallback when WebGL is disabled or unavailable.
   */
  renderCanvas2D(focusId, connectedMap) {
    const ctx = this.ctx2d;
    if (!ctx) return;
    const width = this.viewport.clientWidth || window.innerWidth || 1280;
    const height = this.viewport.clientHeight || window.innerHeight || 720;
    ctx.clearRect(0, 0, width, height);

    const cosY = Math.cos(this.camTheta);
    const sinY = Math.sin(this.camTheta);
    const pitch = this.camPhi - Math.PI / 2;
    const cosX = Math.cos(pitch);
    const sinX = Math.sin(pitch);
    const fov = Math.min(width, height) * 0.85;
    const camDist = this.camRadius;

    const projected = this.projects.map((proj, idx) => {
      const [bx, by, bz] = GRAPH_META[proj.id].pos;
      const bobY = by + Math.sin(this.time * 1.4 + idx * 0.9) * 0.08;
      const x1 = bx * cosY - bz * sinY;
      const z1 = bx * sinY + bz * cosY;
      const y2 = bobY * cosX - z1 * sinX;
      const z2 = bobY * sinX + z1 * cosX;
      const scale = fov / Math.max(2, camDist - z2);
      return { proj, sx: width / 2 + x1 * scale, sy: height / 2 - y2 * scale, z: z2, scale };
    });

    this.edges.forEach((edge) => {
      const a = projected[edge.aIndex];
      const b = projected[edge.bIndex];
      const touchesFocus = edge.aId === focusId || edge.bId === focusId;
      const bothVisible = this.isProjectVisibleInFilter(edge.aId) && this.isProjectVisibleInFilter(edge.bId);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(a.sx, a.sy);
      ctx.lineTo(b.sx, b.sy);
      ctx.strokeStyle = touchesFocus ? (this.projects.find((p) => p.id === focusId)?.color || '#D2FF00') : '#5d6b58';
      ctx.globalAlpha = !bothVisible ? 0.04 : touchesFocus ? 0.75 : 0.08;
      ctx.lineWidth = touchesFocus ? 1.5 : 0.8;
      ctx.stroke();
      ctx.restore();
    });

    projected
      .slice()
      .sort((a, b) => a.z - b.z)
      .forEach(({ proj, sx, sy, z }) => {
        const inFilter = this.isProjectVisibleInFilter(proj.id);
        const isFocus = proj.id === focusId;
        const isConnected = connectedMap.has(proj.id);
        const depth = clamp((z + 5) / 8, 0.6, 1.15);
        const r = (isFocus ? 17 : isConnected ? 13 : 11) * (GRAPH_META[proj.id].scale || 1) * depth;

        ctx.save();
        ctx.globalAlpha = !inFilter ? 0.12 : isFocus ? 1 : isConnected ? 0.85 : 0.62;
        ctx.fillStyle = proj.color;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = `${isFocus ? '700 13px' : '600 11px'} "Syne", sans-serif`;
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.fillText(proj.name, sx, sy + r + 16);
        ctx.restore();
      });
  }

  destroy() {
    this.isDestroyed = true;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.viewport?.removeEventListener('pointerdown', this.onPointerDown);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
    window.removeEventListener('pointercancel', this.onPointerUp);
    window.removeEventListener('resize', this.onResize);
    this.resizeObserver?.disconnect();

    this.nodeVisuals.forEach((n) => {
      n.defPlaqueTex?.dispose();
      n.actPlaqueTex?.dispose();
      n.plaqueMat?.dispose();
      n.coreMat?.dispose();
      n.cageMat?.dispose();
      n.ringMat?.dispose();
      n.haloMat?.dispose();
    });
    this.edgeVisuals.forEach((ev) => {
      ev.tubeGeo?.dispose();
      ev.labelTex?.dispose();
      ev.labelMat?.dispose();
      ev.tubeMat?.dispose();
    });
    this.pulseVisuals.forEach((p) => {
      p.pulseMat?.dispose();
    });

    if (this.composer) {
      this.composer.dispose?.();
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}

export function initProjectShowcase() {
  const engine = new ProjectConstellationEngine();
  return {
    engine,
    triggerProjectsZoom: () => window.AppState?.techSolar?.triggerProjectsZoom(),
  };
}
