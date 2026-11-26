import { PROJECT_NODES } from './projects.js';

/**
 * Full-Environment Three.js 3D Neural Constellation / Knowledge Graph
 * -------------------------------------------------------------------
 * All 9 project nodes, holographic label plaques, curved 3D synaptic tubes,
 * travelling energy pulses, shared-tech badges, and space dust live directly
 * inside the Three.js 3D scene with smooth 3D camera orbit & fly-to framing.
 */

const GRAPH_META = {
  leadis: {
    group: 'AI & vision',
    label: 'Applied AI · 2nd Prize',
    headline: 'Multimodal developmental screening pipeline.',
    pos: [0.0, 0.55, 2.35],
    sharedTags: ['Next.js', 'Python', 'MediaPipe', 'Tailwind', 'Camera'],
  },
  keybase: {
    group: 'Systems',
    label: 'Desktop Software',
    headline: 'Commercial retail key & records platform.',
    pos: [-3.4, 1.55, 1.35],
    sharedTags: ['Desktop', 'PyInstaller', 'Camera', 'Java'],
  },
  sharedash: {
    group: 'Systems',
    label: 'Multipath Transfer',
    headline: '78–107 MB/s USB + Wi-Fi Direct P2P engine.',
    pos: [-4.1, -0.95, -1.15],
    sharedTags: ['Desktop', 'Rust', 'Networking'],
  },
  infogrid: {
    group: 'Web',
    label: 'Digital Signage CMS',
    headline: '43" vertical lab display & Cloudflare R2 CMS.',
    pos: [3.35, 1.75, 1.05],
    sharedTags: ['Next.js', 'Web', 'Cloud DB'],
  },
  rainiest: {
    group: 'Web',
    label: 'Civic Weather Radar',
    headline: '14 Kerala districts rainfall & leave monitor.',
    pos: [4.15, -0.55, -1.45],
    sharedTags: ['Next.js', 'Tailwind', 'Canvas/3D', 'Web'],
  },
  lateloggy: {
    group: 'Web',
    label: 'Campus Operations',
    headline: 'Dynamic anti-screenshot QR verification pass.',
    pos: [2.15, -0.78, 2.05],
    sharedTags: ['Next.js', 'Tailwind', 'Cloud DB', 'Web'],
  },
  fitman: {
    group: 'AI & vision',
    label: 'Computer Vision',
    headline: '60fps 33-landmark skeletal biomechanics tracker.',
    pos: [-1.15, 2.45, -1.85],
    sharedTags: ['Python', 'MediaPipe', 'Camera'],
  },
  'threed-s': {
    group: 'Systems',
    label: '3D Spatial Engine',
    headline: 'Point-cloud & hardware shader reconstruction.',
    pos: [1.45, 1.35, -3.25],
    sharedTags: ['Canvas/3D', 'Desktop'],
  },
  fakepaste: {
    group: 'Systems',
    label: 'Windows Utility',
    headline: 'Human-rhythm keystroke injection desktop tool.',
    pos: [-1.85, -1.05, -1.95],
    sharedTags: ['Python', 'PyInstaller', 'Desktop'],
  },
};

const ORDER = ['leadis', 'sharedash', 'keybase', 'lateloggy', 'infogrid', 'fitman', 'rainiest', 'threed-s', 'fakepaste'];

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/**
 * Compute unique synaptic links between projects sharing technologies or domains.
 */
function buildSynapticEdges(projects) {
  const edges = [];
  for (let i = 0; i < projects.length; i++) {
    for (let j = i + 1; j < projects.length; j++) {
      const a = projects[i];
      const b = projects[j];
      const shared = GRAPH_META[a.id].sharedTags.filter((tag) => GRAPH_META[b.id].sharedTags.includes(tag));
      if (shared.length > 0) {
        edges.push({
          aIndex: i,
          bIndex: j,
          aId: a.id,
          bId: b.id,
          shared,
          label: shared.slice(0, 2).join(' · '),
        });
      }
    }
  }
  return edges;
}

/**
 * Soft radial sprite texture for Three.js halos, space dust, and travelling pulses.
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
 * Draw a crisp holographic 3D plaque texture directly on an offscreen canvas for Three.js.
 */
function renderPlaqueCanvas(project, index, isActive, iconImg) {
  const w = 520;
  const h = 148;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  // Frosted dark glass body
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(6, 6, w - 12, h - 12, 24);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, isActive ? 'rgba(18, 28, 16, 0.94)' : 'rgba(10, 14, 11, 0.88)');
  bg.addColorStop(1, 'rgba(6, 9, 7, 0.94)');
  ctx.fillStyle = bg;
  ctx.fill();

  ctx.lineWidth = isActive ? 3.5 : 1.8;
  ctx.strokeStyle = isActive ? project.color : 'rgba(255, 255, 255, 0.22)';
  ctx.stroke();
  ctx.restore();

  // Accent top highlight
  ctx.save();
  const sheen = ctx.createLinearGradient(28, 6, w - 28, 6);
  sheen.addColorStop(0, 'transparent');
  sheen.addColorStop(0.5, isActive ? project.color : 'rgba(255,255,255,0.45)');
  sheen.addColorStop(1, 'transparent');
  ctx.strokeStyle = sheen;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(30, 8);
  ctx.lineTo(w - 30, 8);
  ctx.stroke();
  ctx.restore();

  // Project icon box
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(24, 30, 84, 84, 18);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fill();
  ctx.strokeStyle = isActive ? project.color : 'rgba(255,255,255,0.16)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  if (iconImg && iconImg.complete && iconImg.naturalWidth > 0) {
    ctx.drawImage(iconImg, 38, 44, 56, 56);
  }
  ctx.restore();

  // Index pill + category label
  const meta = GRAPH_META[project.id];
  ctx.save();
  ctx.font = '700 18px "JetBrains Mono", monospace';
  ctx.fillStyle = project.color;
  ctx.textBaseline = 'top';
  ctx.fillText(`${String(index + 1).padStart(2, '0')} // ${meta.label.toUpperCase()}`, 128, 28);

  // Project Title
  ctx.font = '800 34px "Syne", "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(project.name, 128, 56, 368);

  // Bottom tech preview
  ctx.font = '600 17px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(227, 232, 220, 0.68)';
  ctx.fillText(project.tech.slice(0, 3).join(' · '), 128, 102, 368);
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
  ctx.font = '700 22px "JetBrains Mono", monospace';
  const tw = Math.min(220, ctx.measureText(text).width + 32);
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
    this.edges = buildSynapticEdges(this.projects);
    this.category = 'All work';
    this.activeId = this.projects[0].id;
    this.hoveredId = null;
    this.opener = null;

    // 3D Spherical Camera Orbit & Smooth Fly-To state
    this.camTheta = 0.16;
    this.camPhi = 1.42;
    this.camRadius = 9.4;
    this.targetTheta = 0.16;
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
    this.autoOrbit = true;
    this.time = 0;
    this.wasVisible = false;
    this.rafId = null;
    this.isDestroyed = false;

    this.useCanvas2D = false;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
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
      img.onload = () => {
        this.refreshPlaqueTexture(idx);
      };
      img.src = proj.icon;
      this.iconCache.set(proj.id, img);
    });
  }

  refreshPlaqueTexture(idx) {
    const node = this.nodeVisuals[idx];
    if (!node || !window.THREE) return;
    const proj = this.projects[idx];
    const iconImg = this.iconCache.get(proj.id);

    const defTex = new window.THREE.CanvasTexture(renderPlaqueCanvas(proj, idx, false, iconImg));
    defTex.colorSpace = window.THREE.SRGBColorSpace;
    defTex.minFilter = window.THREE.LinearMipmapLinearFilter;

    const actTex = new window.THREE.CanvasTexture(renderPlaqueCanvas(proj, idx, true, iconImg));
    actTex.colorSpace = window.THREE.SRGBColorSpace;
    actTex.minFilter = window.THREE.LinearMipmapLinearFilter;

    node.defPlaqueTex?.dispose();
    node.actPlaqueTex?.dispose();
    node.defPlaqueTex = defTex;
    node.actPlaqueTex = actTex;
    node.plaqueMat.map = proj.id === this.activeId ? actTex : defTex;
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
    this.scene.fog = new THREE.FogExp2(0x030503, 0.042);

    this.camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100);
    this.lookAtCurrent = new THREE.Vector3(0, -0.45, 0);
    this.lookAtTarget = new THREE.Vector3(0, -0.45, 0);
    this.updateCameraRadius(width, height);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0x000000, 0);

    this.canvasHost.innerHTML = '';
    this.renderer.domElement.className = 'constellation-webgl-canvas';
    this.canvasHost.appendChild(this.renderer.domElement);

    // Three-point cosmic lighting
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const keyLight = new THREE.DirectionalLight(0xd2ff00, 1.45);
    keyLight.position.set(6, 9, 8);
    this.scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00f0ff, 1.1);
    rimLight.position.set(-7, -4, -6);
    this.scene.add(rimLight);

    this.worldGroup = new THREE.Group();
    this.scene.add(this.worldGroup);

    const glowTex = new THREE.CanvasTexture(createGlowCanvas());

    // 3D Starfield & Ambient Spatial Dust inside Three.js environment
    const starCount = 320;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 6 + Math.random() * 16;
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
      color: 0xd2ff00,
      size: 0.14,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.starField = new THREE.Points(starGeo, starMat);
    this.worldGroup.add(this.starField);

    // Subtle 3D orbital reference rings in environment
    [4.4, 6.2].forEach((r, idx) => {
      const envRingGeo = new THREE.TorusGeometry(r, 0.008, 8, 96);
      const envRingMat = new THREE.MeshBasicMaterial({
        color: idx === 0 ? 0xd2ff00 : 0x00f0ff,
        transparent: true,
        opacity: 0.12,
      });
      const envRing = new THREE.Mesh(envRingGeo, envRingMat);
      envRing.rotation.x = Math.PI * (idx === 0 ? 0.44 : -0.38);
      envRing.rotation.y = idx * 0.45;
      this.worldGroup.add(envRing);
    });

    // Build 9 3D project crystal nodes + 3D holographic plaque meshes inside Three.js
    const coreGeo = new THREE.IcosahedronGeometry(0.32, 0);
    const cageGeo = new THREE.OctahedronGeometry(0.49, 0);
    const ringGeo = new THREE.TorusGeometry(0.64, 0.015, 12, 48);
    const plaqueGeo = new THREE.PlaneGeometry(1.78, 0.506);

    this.nodeVisuals = this.projects.map((proj, index) => {
      const [px, py, pz] = GRAPH_META[proj.id].pos;
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(px, py, pz);

      const accent = new THREE.Color(proj.color);
      const coreMat = new THREE.MeshStandardMaterial({
        color: accent,
        emissive: accent,
        emissiveIntensity: 0.48,
        roughness: 0.22,
        metalness: 0.68,
        flatShading: true,
        transparent: true,
        opacity: 0.96,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.userData = { projectId: proj.id };

      const cageMat = new THREE.MeshBasicMaterial({
        color: accent,
        wireframe: true,
        transparent: true,
        opacity: 0.36,
      });
      const cageMesh = new THREE.Mesh(cageGeo, cageMat);

      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xd2ff00,
        transparent: true,
        opacity: 0,
      });
      const focusRing = new THREE.Mesh(ringGeo, ringMat);
      focusRing.rotation.x = Math.PI * 0.35 + index * 0.25;

      const haloMat = new THREE.SpriteMaterial({
        map: glowTex,
        color: accent,
        transparent: true,
        opacity: 0.46,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const haloSprite = new THREE.Sprite(haloMat);
      haloSprite.scale.set(1.85, 1.85, 1);

      const iconImg = this.iconCache.get(proj.id);
      const defPlaqueTex = new THREE.CanvasTexture(renderPlaqueCanvas(proj, index, false, iconImg));
      defPlaqueTex.colorSpace = THREE.SRGBColorSpace;
      defPlaqueTex.minFilter = THREE.LinearMipmapLinearFilter;

      const actPlaqueTex = new THREE.CanvasTexture(renderPlaqueCanvas(proj, index, true, iconImg));
      actPlaqueTex.colorSpace = THREE.SRGBColorSpace;
      actPlaqueTex.minFilter = THREE.LinearMipmapLinearFilter;

      const plaqueMat = new THREE.MeshBasicMaterial({
        map: proj.id === this.activeId ? actPlaqueTex : defPlaqueTex,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMat);
      plaqueMesh.position.set(0, -0.78, 0.12);
      plaqueMesh.userData = { projectId: proj.id };

      nodeGroup.add(haloSprite, coreMesh, cageMesh, focusRing, plaqueMesh);
      this.worldGroup.add(nodeGroup);

      return {
        id: proj.id,
        basePos: new THREE.Vector3(px, py, pz),
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
        spinSpeed: 0.008 + (index % 4) * 0.003,
        phase: index * 0.9,
      };
    });

    // Build 3D curved Catmull-Rom synaptic tubes + mid-edge shared-tech sprites + travelling pulses
    this.edgeVisuals = [];
    this.pulseVisuals = [];

    this.edges.forEach((edge, idx) => {
      const start = this.nodeVisuals[edge.aIndex].basePos;
      const end = this.nodeVisuals[edge.bIndex].basePos;
      const mid = start.clone().add(end).multiplyScalar(0.5);
      // Gentle outward radial bow so synaptic filaments curve organically through 3D space
      const outward = mid.clone().normalize().multiplyScalar(0.55);
      mid.add(outward);

      const curve = new THREE.CatmullRomCurve3([start.clone(), mid, end.clone()]);
      const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.014, 6, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: 0x62705d,
        transparent: true,
        opacity: 0.18,
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      this.worldGroup.add(tubeMesh);

      // 3D mid-edge shared-tech tag sprite (shown only when connected to active/hovered node)
      const labelTex = new THREE.CanvasTexture(renderEdgeLabelCanvas(edge.shared[0], '#D2FF00'));
      labelTex.colorSpace = THREE.SRGBColorSpace;
      const labelMat = new THREE.SpriteMaterial({
        map: labelTex,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const labelSprite = new THREE.Sprite(labelMat);
      labelSprite.position.copy(curve.getPoint(0.5));
      labelSprite.scale.set(1.1, 0.275, 1);
      this.worldGroup.add(labelSprite);

      this.edgeVisuals.push({
        edge,
        curve,
        tubeMesh,
        tubeMat,
        labelSprite,
        labelMat,
        labelTex,
      });

      // Travelling energy pulse sprite along the 3D curve
      const pulseMat = new THREE.SpriteMaterial({
        map: glowTex,
        color: 0xd2ff00,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const pulseSprite = new THREE.Sprite(pulseMat);
      pulseSprite.scale.set(0.28, 0.28, 1);
      this.worldGroup.add(pulseSprite);
      this.pulseVisuals.push({
        edge,
        curve,
        sprite: pulseSprite,
        pulseMat,
        t: (idx * 0.29) % 1,
        speed: 0.0042 + (idx % 3) * 0.0016,
      });
    });

    this.raycaster = new THREE.Raycaster();
    this.pointerNdc = new THREE.Vector2();
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
    this.baseRadius = aspect < 0.85 ? 14.2 : aspect < 1.25 ? 10.8 : 9.4;
    if (!this.isDragging) {
      this.targetRadius = this.baseRadius;
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

  selectProject(id, flyCamera = true) {
    const project = this.projects.find((p) => p.id === id);
    if (!project) return;
    this.activeId = id;

    // Update 3D plaque highlight materials
    this.nodeVisuals.forEach((node) => {
      const isAct = node.id === id;
      node.plaqueMat.map = isAct ? node.actPlaqueTex : node.defPlaqueTex;
      node.plaqueMat.needsUpdate = true;
    });

    // Fly the 3D camera smoothly to frame the selected node in front-center of the environment
    if (flyCamera) {
      const [px, py, pz] = GRAPH_META[id].pos;
      const theta = Math.atan2(px, pz || 0.001);
      const horiz = Math.hypot(px, pz) || 1;
      const phi = Math.max(0.95, Math.min(2.05, Math.PI / 2 - Math.atan2(py, horiz) * 0.55));
      this.targetTheta = theta * 0.72;
      this.targetPhi = phi;
      this.targetRadius = (this.baseRadius || 9.4) * 0.88;
      if (this.lookAtTarget && window.THREE) {
        this.lookAtTarget.set(px * 0.25, py * 0.22 - 0.62, pz * 0.25);
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
    this.autoOrbit = false;
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
      this.targetPhi = Math.max(0.75, Math.min(2.25, this.targetPhi - dy * 0.0052));
      this.thetaVel = -dx * 0.003;
      this.phiVel = -dy * 0.0022;
      return;
    }

    if (e.target.closest('.constellation-header, .constellation-bottom-hud')) {
      this.viewport.style.cursor = 'default';
      return;
    }

    const hitId = this.getRaycastHit(e.clientX, e.clientY);
    if (hitId !== this.hoveredId) {
      this.hoveredId = hitId;
    }
    this.viewport.style.cursor = hitId ? 'pointer' : 'grab';
  }

  onPointerUp(e) {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.autoOrbit = true;
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

    this.targetTheta += this.thetaVel * 5.0;
    this.targetPhi = Math.max(0.75, Math.min(2.25, this.targetPhi + this.phiVel * 4.0));
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
    if (this.autoOrbit && !this.isDragging && !this.hoveredId) {
      this.targetTheta += 0.0012;
    }

    this.camTheta += (this.targetTheta - this.camTheta) * 0.075;
    this.camPhi += (this.targetPhi - this.camPhi) * 0.075;
    this.camRadius += (this.targetRadius - this.camRadius) * 0.075;

    const focusId = this.hoveredId || this.activeId;
    const connectedMap = this.getConnectedProjectIds(focusId);

    if (this.useCanvas2D) {
      this.renderCanvas2D(focusId, connectedMap);
    } else if (this.renderer && this.scene && this.camera) {
      this.renderThree(focusId, connectedMap);
    }
  }

  renderThree(focusId, connectedMap) {
    // Update spherical Three.js camera orbit & smooth lookAt flight
    this.camera.position.set(
      this.camRadius * Math.sin(this.camPhi) * Math.sin(this.camTheta),
      this.camRadius * Math.cos(this.camPhi),
      this.camRadius * Math.sin(this.camPhi) * Math.cos(this.camTheta)
    );
    if (this.lookAtCurrent && this.lookAtTarget) {
      this.lookAtCurrent.lerp(this.lookAtTarget, 0.075);
      this.camera.lookAt(this.lookAtCurrent);
    } else {
      this.camera.lookAt(0, -0.25, 0);
    }

    if (this.starField) {
      this.starField.rotation.y += 0.0004;
    }

    // Update 3D crystal cores & billboarded 3D plaques inside Three.js
    this.nodeVisuals.forEach((n) => {
      const inFilter = this.isProjectVisibleInFilter(n.id);
      const isFocus = n.id === focusId;
      const isConnected = connectedMap.has(n.id);

      const bob = Math.sin(this.time * 1.4 + n.phase) * 0.09;
      n.group.position.set(n.basePos.x, n.basePos.y + bob, n.basePos.z);

      const targetScale = !inFilter ? 0.52 : isFocus ? 1.32 : isConnected ? 1.08 : 0.9;
      const curScale = n.group.scale.x + (targetScale - n.group.scale.x) * 0.12;
      n.group.scale.setScalar(curScale);

      const rotBoost = isFocus ? 2.2 : 1.0;
      n.coreMesh.rotation.y += n.spinSpeed * rotBoost;
      n.coreMesh.rotation.x += n.spinSpeed * 0.65 * rotBoost;
      n.cageMesh.rotation.y -= n.spinSpeed * 1.3;
      n.cageMesh.rotation.z += n.spinSpeed * 0.8;
      n.focusRing.rotation.z += 0.018;

      n.coreMat.opacity = inFilter ? (isFocus || isConnected ? 1.0 : 0.78) : 0.16;
      n.coreMat.emissiveIntensity = isFocus ? 0.9 : isConnected ? 0.58 : 0.34;
      n.cageMat.opacity = inFilter ? (isFocus ? 0.76 : 0.34) : 0.06;
      n.ringMat.opacity = isFocus && inFilter ? 0.88 : 0;
      n.haloMat.opacity = inFilter ? (isFocus ? 0.82 : isConnected ? 0.45 : 0.25) : 0.04;

      // Billboard 3D plaque toward camera and offset slightly forward so node edges pass behind it
      const dirToCam = this.camera.position.clone().sub(n.group.position).normalize();
      n.plaqueMesh.position.set(dirToCam.x * 0.38, -0.74 + dirToCam.y * 0.1, dirToCam.z * 0.38);
      n.plaqueMesh.quaternion.copy(this.camera.quaternion);
      n.plaqueMat.opacity = inFilter ? (isFocus ? 1.0 : isConnected ? 0.94 : 0.74) : 0.14;
    });

    // Update 3D curved synaptic tubes, shared-tech sprites & energy pulses
    const focusColor = new window.THREE.Color(this.projects.find((p) => p.id === focusId)?.color || '#D2FF00');
    const dimColor = new window.THREE.Color(0x4b5748);

    this.edgeVisuals.forEach((ev) => {
      const touchesFocus = ev.edge.aId === focusId || ev.edge.bId === focusId;
      const bothVisible = this.isProjectVisibleInFilter(ev.edge.aId) && this.isProjectVisibleInFilter(ev.edge.bId);
      ev.tubeMat.color.copy(touchesFocus ? focusColor : dimColor);
      ev.tubeMat.opacity = !bothVisible ? 0.04 : touchesFocus ? 0.68 : 0.14;
      ev.labelMat.opacity = bothVisible && touchesFocus ? 0.95 : 0;
    });

    this.pulseVisuals.forEach((p) => {
      p.t = (p.t + p.speed) % 1;
      p.curve.getPointAt(p.t, p.sprite.position);
      const touchesFocus = p.edge.aId === focusId || p.edge.bId === focusId;
      const bothVisible = this.isProjectVisibleInFilter(p.edge.aId) && this.isProjectVisibleInFilter(p.edge.bId);
      p.pulseMat.color.copy(touchesFocus ? focusColor : dimColor);
      p.pulseMat.opacity = !bothVisible ? 0 : touchesFocus ? 0.95 : 0.2;
    });

    this.renderer.render(this.scene, this.camera);
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
      ctx.globalAlpha = !bothVisible ? 0.05 : touchesFocus ? 0.72 : 0.18;
      ctx.lineWidth = touchesFocus ? 1.6 : 1;
      ctx.stroke();
      ctx.restore();
    });

    projected
      .slice()
      .sort((a, b) => a.z - b.z)
      .forEach(({ proj, sx, sy, z }) => {
        const inFilter = this.isProjectVisibleInFilter(proj.id);
        const isFocus = proj.id === focusId;
        const depth = Math.max(0.6, Math.min(1.15, (z + 5) / 8));
        const r = (isFocus ? 18 : 12) * depth;

        ctx.save();
        ctx.globalAlpha = inFilter ? (isFocus ? 1 : 0.8) : 0.2;
        ctx.fillStyle = proj.color;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = '700 12px "Syne", sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.fillText(proj.name, sx, sy + r + 18);
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
      ev.labelTex?.dispose();
      ev.labelMat?.dispose();
      ev.tubeMat?.dispose();
    });

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
