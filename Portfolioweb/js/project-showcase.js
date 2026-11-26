import { PROJECT_NODES } from './projects.js';

/**
 * 3D Interactive Neural Constellation / Knowledge Graph for Selected Work
 * -----------------------------------------------------------------------
 * Renders the 9 flagship projects as rotating faceted 3D cores suspended in space,
 * linked by synaptic filaments wherever projects share technologies or architecture.
 * Falls back gracefully to a 3D-projected 2D canvas if WebGL is unavailable.
 */

const GRAPH_META = {
  keybase: {
    group: 'Systems',
    label: 'Desktop Software',
    headline: 'Commercial retail key & records platform.',
    pos: [-2.65, 1.35, 1.15],
    sharedTags: ['Desktop', 'PyInstaller', 'Camera', 'Java'],
  },
  sharedash: {
    group: 'Systems',
    label: 'Multipath Transfer',
    headline: '78–107 MB/s USB + Wi-Fi Direct P2P engine.',
    pos: [-3.25, -0.85, -0.45],
    sharedTags: ['Desktop', 'Rust', 'Networking'],
  },
  leadis: {
    group: 'AI & vision',
    label: 'Applied AI · 2nd Prize',
    headline: 'Multimodal developmental screening pipeline.',
    pos: [0.05, 0.25, 1.85],
    sharedTags: ['Next.js', 'Python', 'MediaPipe', 'Tailwind', 'Camera'],
  },
  infogrid: {
    group: 'Web',
    label: 'Digital Signage CMS',
    headline: '43" vertical lab display & Cloudflare R2 CMS.',
    pos: [2.55, 1.45, 0.65],
    sharedTags: ['Next.js', 'Web', 'Cloud DB'],
  },
  rainiest: {
    group: 'Web',
    label: 'Civic Weather Radar',
    headline: '14 Kerala districts rainfall & leave monitor.',
    pos: [3.1, -0.35, -1.15],
    sharedTags: ['Next.js', 'Tailwind', 'Canvas/3D', 'Web'],
  },
  lateloggy: {
    group: 'Web',
    label: 'Campus Operations',
    headline: 'Dynamic anti-screenshot QR verification pass.',
    pos: [1.55, -1.65, 1.05],
    sharedTags: ['Next.js', 'Tailwind', 'Cloud DB', 'Web'],
  },
  fitman: {
    group: 'AI & vision',
    label: 'Computer Vision',
    headline: '60fps 33-landmark skeletal biomechanics tracker.',
    pos: [-0.85, 1.95, -1.45],
    sharedTags: ['Python', 'MediaPipe', 'Camera'],
  },
  'threed-s': {
    group: 'Systems',
    label: '3D Spatial Engine',
    headline: 'Point-cloud & hardware shader reconstruction.',
    pos: [1.35, 1.15, -2.35],
    sharedTags: ['Canvas/3D', 'Desktop'],
  },
  fakepaste: {
    group: 'Systems',
    label: 'Windows Utility',
    headline: 'Human-rhythm keystroke injection desktop tool.',
    pos: [-1.45, -1.75, -1.55],
    sharedTags: ['Python', 'PyInstaller', 'Desktop'],
  },
};

const ORDER = ['leadis', 'sharedash', 'keybase', 'lateloggy', 'infogrid', 'fitman', 'rainiest', 'threed-s', 'fakepaste'];

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/**
 * Compute synaptic connections between projects sharing technologies or engineering domains.
 */
function buildSynapticEdges(projects) {
  const edges = [];
  for (let i = 0; i < projects.length; i++) {
    for (let j = i + 1; j < projects.length; j++) {
      const a = projects[i];
      const b = projects[j];
      const tagsA = GRAPH_META[a.id].sharedTags;
      const tagsB = GRAPH_META[b.id].sharedTags;
      const shared = tagsA.filter((tag) => tagsB.includes(tag));
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
 * Create a soft radial glow texture for Three.js sprites and energy pulses.
 */
function createGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(64, 64, 2, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.25, 'rgba(255, 255, 255, 0.72)');
  grad.addColorStop(0.55, 'rgba(255, 255, 255, 0.18)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  return canvas;
}

class ProjectConstellationEngine {
  constructor() {
    this.root = document.getElementById('project-explorer');
    this.layerEl = document.getElementById('projects-space-layer');
    this.viewport = document.getElementById('constellation-viewport');
    this.canvasHost = document.getElementById('constellation-canvas-host');
    this.pinsLayer = document.getElementById('constellation-pins-layer');
    this.edgeBadge = document.getElementById('constellation-edge-badge');
    this.dossier = document.getElementById('work-feature');
    this.counter = this.root?.querySelector('.work-count');
    this.announcement = this.root?.querySelector('.work-announcement');
    this.dialog = document.getElementById('work-dialog');

    if (!this.root || !this.viewport || !this.canvasHost || !this.pinsLayer || !this.dossier) return;

    this.projects = ORDER.map((id) => PROJECT_NODES.find((p) => p.id === id)).filter(Boolean);
    this.edges = buildSynapticEdges(this.projects);
    this.category = 'All work';
    this.activeId = this.projects[0].id;
    this.hoveredId = null;
    this.opener = null;

    // 3D Orbit & Fly-to camera state
    this.yaw = -0.18;
    this.pitch = 0.16;
    this.targetYaw = -0.18;
    this.targetPitch = 0.16;
    this.yawVel = 0;
    this.pitchVel = 0;
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

    // Three.js & Fallback 2D state
    this.useCanvas2D = false;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.clusterGroup = null;
    this.nodeVisuals = [];
    this.edgeVisuals = [];
    this.pulseVisuals = [];
    this.raycaster = null;
    this.pointerNdc = null;
    this.pinElements = new Map();
    this.ctx2d = null;
    this.canvas2d = null;

    this.animate = this.animate.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);

    this.init();
  }

  init() {
    this.buildPinsDOM();
    this.initEngine();
    this.bindEvents();
    this.selectProject(this.activeId, true);
    this.updateFilterUI();
    this.startLoop();
  }

  buildPinsDOM() {
    this.pinsLayer.innerHTML = '';
    this.pinElements.clear();

    this.projects.forEach((proj, idx) => {
      const meta = GRAPH_META[proj.id];
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'constellation-pin';
      btn.dataset.project = proj.id;
      btn.style.setProperty('--pin-accent', proj.color);
      btn.setAttribute('aria-label', `${proj.name} — ${meta.label}`);

      btn.innerHTML = `
        <span class="pin-dot"></span>
        <span class="pin-chip">
          <img src="${escapeHtml(proj.icon)}" alt="" class="pin-icon" width="16" height="16" loading="lazy">
          <span class="pin-name">${escapeHtml(proj.name)}</span>
          <span class="pin-idx font-mono">${String(idx + 1).padStart(2, '0')}</span>
        </span>
      `;

      btn.addEventListener('pointerenter', () => {
        this.hoveredId = proj.id;
        this.autoOrbit = false;
        this.updateEdgeBadge();
      });
      btn.addEventListener('pointerleave', () => {
        if (this.hoveredId === proj.id) this.hoveredId = null;
        this.autoOrbit = true;
        this.updateEdgeBadge();
      });
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectProject(proj.id, true);
      });

      this.pinsLayer.appendChild(btn);
      this.pinElements.set(proj.id, btn);
    });
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
    const width = Math.max(300, this.viewport.clientWidth || 800);
    const height = Math.max(260, this.viewport.clientHeight || 540);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    this.updateCameraDistance(width, height);

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

    // Subtle cosmic lighting for faceted crystal cores
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const keyLight = new THREE.DirectionalLight(0xd2ff00, 1.35);
    keyLight.position.set(5, 7, 8);
    this.scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00f0ff, 0.95);
    rimLight.position.set(-6, -4, -5);
    this.scene.add(rimLight);

    this.clusterGroup = new THREE.Group();
    this.scene.add(this.clusterGroup);

    const glowTex = new THREE.CanvasTexture(createGlowTexture());
    const coreGeo = new THREE.IcosahedronGeometry(0.28, 0);
    const cageGeo = new THREE.OctahedronGeometry(0.43, 0);
    const ringGeo = new THREE.TorusGeometry(0.56, 0.014, 12, 48);

    // Build 9 3D crystal project nodes
    this.nodeVisuals = this.projects.map((proj, index) => {
      const [px, py, pz] = GRAPH_META[proj.id].pos;
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(px, py, pz);

      const accentColor = new THREE.Color(proj.color);
      const coreMat = new THREE.MeshStandardMaterial({
        color: accentColor,
        emissive: accentColor,
        emissiveIntensity: 0.45,
        roughness: 0.25,
        metalness: 0.65,
        flatShading: true,
        transparent: true,
        opacity: 0.96,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.userData = { projectId: proj.id };

      const cageMat = new THREE.MeshBasicMaterial({
        color: accentColor,
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
      focusRing.rotation.x = Math.PI * 0.35 + index * 0.3;

      const haloMat = new THREE.SpriteMaterial({
        map: glowTex,
        color: accentColor,
        transparent: true,
        opacity: 0.42,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const haloSprite = new THREE.Sprite(haloMat);
      haloSprite.scale.set(1.55, 1.55, 1);

      nodeGroup.add(haloSprite, coreMesh, cageMesh, focusRing);
      this.clusterGroup.add(nodeGroup);

      return {
        id: proj.id,
        basePos: new THREE.Vector3(px, py, pz),
        group: nodeGroup,
        coreMesh,
        cageMesh,
        focusRing,
        haloSprite,
        coreMat,
        cageMat,
        ringMat,
        haloMat,
        spinSpeed: 0.008 + (index % 4) * 0.003,
        phase: index * 0.9,
      };
    });

    // Build synaptic filaments & travelling data pulses
    const pulseTex = glowTex;
    this.edgeVisuals = [];
    this.pulseVisuals = [];

    this.edges.forEach((edge, idx) => {
      const start = this.nodeVisuals[edge.aIndex].basePos;
      const end = this.nodeVisuals[edge.bIndex].basePos;

      const lineGeo = new THREE.BufferGeometry().setFromPoints([start.clone(), end.clone()]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x6c7a65,
        transparent: true,
        opacity: 0.22,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      this.clusterGroup.add(line);
      this.edgeVisuals.push({ edge, line, lineGeo, lineMat });

      // Travelling energy packet sprite along each edge
      const pulseMat = new THREE.SpriteMaterial({
        map: pulseTex,
        color: 0xd2ff00,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(pulseMat);
      sprite.scale.set(0.24, 0.24, 1);
      this.clusterGroup.add(sprite);
      this.pulseVisuals.push({
        edge,
        sprite,
        pulseMat,
        t: (idx * 0.27) % 1,
        speed: 0.0045 + (idx % 3) * 0.0018,
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

  updateCameraDistance(width, height) {
    if (!this.camera) return;
    const aspect = width / Math.max(1, height);
    this.camera.aspect = aspect;
    this.camera.position.set(0, 0, aspect < 1.0 ? 11.4 : aspect < 1.35 ? 9.8 : 8.8);
    this.camera.updateProjectionMatrix();
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

    // Smoothly rotate constellation so selected node faces camera cleanly
    if (flyCamera) {
      const [px, py, pz] = GRAPH_META[id].pos;
      const targetYaw = -Math.atan2(px, pz || 0.001) * 0.55;
      const targetPitch = Math.max(-0.48, Math.min(0.48, Math.atan2(py, 4.5) * 0.55));
      this.targetYaw = targetYaw;
      this.targetPitch = targetPitch;
    }

    this.renderDossier(project);
    this.updateFilterUI();
    this.updateEdgeBadge();

    if (this.announcement) {
      this.announcement.textContent = `${project.name} selected`;
    }
  }

  renderDossier(project) {
    const meta = GRAPH_META[project.id];
    const index = this.projects.findIndex((p) => p.id === project.id);
    const connectedMap = this.getConnectedProjectIds(project.id);
    const linkedChips = Array.from(connectedMap.entries())
      .slice(0, 4)
      .map(([otherId, shared]) => {
        const other = this.projects.find((p) => p.id === otherId);
        if (!other) return '';
        return `<button type="button" class="dossier-link-chip" data-jump-project="${other.id}" style="--chip-accent:${escapeHtml(other.color)}"><span>${escapeHtml(other.name)}</span><small>${escapeHtml(shared[0])}</small></button>`;
      })
      .join('');

    this.dossier.style.setProperty('--work-accent', project.color);
    this.dossier.innerHTML = `
      <div class="dossier-top">
        <span class="work-status"><i></i>${escapeHtml(project.badge)}</span>
        <span class="work-position font-mono">${String(index + 1).padStart(2, '0')} / ${String(this.projects.length).padStart(2, '0')}</span>
      </div>
      <div class="dossier-title-row">
        <div class="dossier-icon-wrap"><img src="${escapeHtml(project.icon)}" alt="" width="28" height="28"></div>
        <div>
          <span class="dossier-cat font-mono">${escapeHtml(meta.label)}</span>
          <h3>${escapeHtml(project.name)}</h3>
        </div>
      </div>
      <p class="work-headline">${escapeHtml(meta.headline)}</p>
      <p class="work-summary">${escapeHtml(project.desc)}</p>
      <ul class="work-stack" aria-label="Technologies">${project.tech.slice(0, 5).map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul>
      ${linkedChips ? `<div class="dossier-links"><span class="dossier-links-label font-mono">// SYNAPTIC LINKS</span><div class="dossier-links-row">${linkedChips}</div></div>` : ''}
      <div class="work-actions">
        <button type="button" class="work-primary" data-details>Full specs <span aria-hidden="true">↗</span></button>
        <a class="work-repo" href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer">Source ↗</a>
        <div class="work-stepper">
          <button type="button" data-step="-1" aria-label="Previous project">←</button>
          <button type="button" data-step="1" aria-label="Next project">→</button>
        </div>
      </div>
    `;
  }

  updateFilterUI() {
    const visibleProjects = this.projects.filter((p) => this.isProjectVisibleInFilter(p.id));
    if (this.counter) {
      this.counter.textContent = `${String(visibleProjects.length).padStart(2, '0')} NODES`;
    }

    const connectedMap = this.getConnectedProjectIds(this.hoveredId || this.activeId);
    const focusId = this.hoveredId || this.activeId;

    this.pinElements.forEach((el, id) => {
      const inFilter = this.isProjectVisibleInFilter(id);
      const isActive = id === this.activeId;
      const isConnected = connectedMap.has(id);
      el.classList.toggle('is-active', isActive);
      el.classList.toggle('is-connected', isConnected && id !== focusId);
      el.classList.toggle('is-dimmed', !inFilter);
      el.setAttribute('aria-pressed', String(isActive));
    });
  }

  updateEdgeBadge() {
    if (!this.edgeBadge) return;
    const focusId = this.hoveredId || this.activeId;
    const focusProject = this.projects.find((p) => p.id === focusId);
    const connected = this.getConnectedProjectIds(focusId);
    if (!focusProject || connected.size === 0) {
      this.edgeBadge.textContent = '';
      return;
    }
    const tags = Array.from(new Set(Array.from(connected.values()).flat())).slice(0, 4).join(' · ');
    this.edgeBadge.textContent = `${focusProject.name.toUpperCase()} — ${connected.size} LINKS (${tags})`;
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
          const firstVisible = this.projects.find((p) => this.isProjectVisibleInFilter(p.id));
          if (firstVisible) this.selectProject(firstVisible.id, true);
        } else {
          this.updateFilterUI();
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

  onPointerDown(e) {
    if (e.target.closest('.constellation-pin')) return;
    this.isDragging = true;
    this.hasMoved = false;
    this.autoOrbit = false;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this.yawVel = 0;
    this.pitchVel = 0;
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

      this.targetYaw += dx * 0.0065;
      this.targetPitch = Math.max(-0.75, Math.min(0.75, this.targetPitch + dy * 0.005));
      this.yawVel = dx * 0.003;
      this.pitchVel = dy * 0.002;
      return;
    }

    // Raycast hover detection on Three.js crystal nodes
    if (!this.useCanvas2D && this.raycaster && this.camera && this.renderer) {
      const rect = this.renderer.domElement.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        if (this.hoveredId && !e.target.closest('.constellation-pin')) {
          this.hoveredId = null;
          this.updateEdgeBadge();
        }
        return;
      }

      this.pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this.raycaster.setFromCamera(this.pointerNdc, this.camera);
      const hits = this.raycaster.intersectObjects(this.nodeVisuals.map((n) => n.coreMesh));
      const hitId = hits.length > 0 ? hits[0].object.userData.projectId : null;

      if (hitId !== this.hoveredId && !e.target.closest('.constellation-pin')) {
        this.hoveredId = hitId;
        this.viewport.style.cursor = hitId ? 'pointer' : 'grab';
        this.updateFilterUI();
        this.updateEdgeBadge();
      }
    }
  }

  onPointerUp(e) {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.autoOrbit = true;
    this.viewport.classList.remove('is-grabbing');

    if (!this.hasMoved && !this.useCanvas2D && this.raycaster && this.camera && this.renderer) {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this.raycaster.setFromCamera(this.pointerNdc, this.camera);
      const hits = this.raycaster.intersectObjects(this.nodeVisuals.map((n) => n.coreMesh));
      if (hits.length > 0) {
        this.selectProject(hits[0].object.userData.projectId, true);
        return;
      }
    }

    this.targetYaw += this.yawVel * 5.5;
    this.targetPitch = Math.max(-0.75, Math.min(0.75, this.targetPitch + this.pitchVel * 4.5));
  }

  onResize() {
    const width = Math.max(280, this.viewport.clientWidth || 800);
    const height = Math.max(240, this.viewport.clientHeight || 540);
    if (this.useCanvas2D && this.canvas2d && this.ctx2d) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas2d.width = Math.round(width * dpr);
      this.canvas2d.height = Math.round(height * dpr);
      this.ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      return;
    }
    if (this.renderer && this.camera) {
      this.updateCameraDistance(width, height);
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
      this.targetYaw += 0.0014;
    }

    this.yaw += (this.targetYaw - this.yaw) * 0.085;
    this.pitch += (this.targetPitch - this.pitch) * 0.085;

    const focusId = this.hoveredId || this.activeId;
    const connectedMap = this.getConnectedProjectIds(focusId);

    if (this.useCanvas2D) {
      this.renderCanvas2D(focusId, connectedMap);
    } else if (this.renderer && this.scene && this.camera && this.clusterGroup) {
      this.renderThree(focusId, connectedMap);
    }
  }

  renderThree(focusId, connectedMap) {
    this.clusterGroup.rotation.y = this.yaw;
    this.clusterGroup.rotation.x = this.pitch;

    const width = this.viewport.clientWidth || 800;
    const height = this.viewport.clientHeight || 540;
    const projVec = new window.THREE.Vector3();

    // Update 3D crystal cores & project screen pins
    this.nodeVisuals.forEach((n, idx) => {
      const proj = this.projects[idx];
      const inFilter = this.isProjectVisibleInFilter(n.id);
      const isFocus = n.id === focusId;
      const isConnected = connectedMap.has(n.id);

      const bob = Math.sin(this.time * 1.4 + n.phase) * 0.08;
      n.group.position.set(n.basePos.x, n.basePos.y + bob, n.basePos.z);

      const targetScale = !inFilter ? 0.58 : isFocus ? 1.38 : isConnected ? 1.12 : 0.92;
      const curScale = n.group.scale.x + (targetScale - n.group.scale.x) * 0.12;
      n.group.scale.setScalar(curScale);

      const rotBoost = isFocus ? 2.1 : 1.0;
      n.coreMesh.rotation.y += n.spinSpeed * rotBoost;
      n.coreMesh.rotation.x += n.spinSpeed * 0.65 * rotBoost;
      n.cageMesh.rotation.y -= n.spinSpeed * 1.3;
      n.cageMesh.rotation.z += n.spinSpeed * 0.8;
      n.focusRing.rotation.z += 0.018;

      n.coreMat.opacity = inFilter ? (isFocus || isConnected ? 1.0 : 0.78) : 0.22;
      n.coreMat.emissiveIntensity = isFocus ? 0.85 : isConnected ? 0.55 : 0.32;
      n.cageMat.opacity = inFilter ? (isFocus ? 0.72 : 0.34) : 0.08;
      n.ringMat.opacity = isFocus && inFilter ? 0.85 : 0;
      n.haloMat.opacity = inFilter ? (isFocus ? 0.78 : isConnected ? 0.45 : 0.26) : 0.06;

      // Project world position into 2D pin coordinates
      n.group.getWorldPosition(projVec);
      const camZ = projVec.z;
      projVec.project(this.camera);

      const sx = (projVec.x * 0.5 + 0.5) * width;
      const sy = (-projVec.y * 0.5 + 0.5) * height;
      const depthNorm = Math.max(0.55, Math.min(1.12, (camZ + 4.0) / 7.2));

      const pin = this.pinElements.get(proj.id);
      if (pin) {
        const pinScale = isFocus ? Math.max(1.0, depthNorm) : depthNorm * 0.92;
        const depthAlpha = !inFilter ? 0.24 : isFocus ? 1.0 : Math.max(0.45, Math.min(0.95, (camZ + 4.4) / 6.8));
        pin.style.transform = `translate3d(${sx.toFixed(1)}px, ${(sy + 26 * pinScale).toFixed(1)}px, 0) translate(-50%, 0) scale(${pinScale.toFixed(3)})`;
        pin.style.opacity = depthAlpha.toFixed(2);
        pin.style.zIndex = String(Math.round((camZ + 10) * 10) + (isFocus ? 200 : 0));
      }
    });

    // Update synaptic edges & travelling data pulses
    const focusColor = new window.THREE.Color(this.projects.find((p) => p.id === focusId)?.color || '#D2FF00');
    const dimColor = new window.THREE.Color(0x4b5748);

    this.edgeVisuals.forEach(({ edge, lineGeo, lineMat }) => {
      const posA = this.nodeVisuals[edge.aIndex].group.position;
      const posB = this.nodeVisuals[edge.bIndex].group.position;
      const attr = lineGeo.attributes.position;
      attr.setXYZ(0, posA.x, posA.y, posA.z);
      attr.setXYZ(1, posB.x, posB.y, posB.z);
      attr.needsUpdate = true;

      const touchesFocus = edge.aId === focusId || edge.bId === focusId;
      const bothVisible = this.isProjectVisibleInFilter(edge.aId) && this.isProjectVisibleInFilter(edge.bId);
      lineMat.color.copy(touchesFocus ? focusColor : dimColor);
      lineMat.opacity = !bothVisible ? 0.05 : touchesFocus ? 0.72 : 0.16;
    });

    this.pulseVisuals.forEach((p) => {
      p.t = (p.t + p.speed) % 1;
      const posA = this.nodeVisuals[p.edge.aIndex].group.position;
      const posB = this.nodeVisuals[p.edge.bIndex].group.position;
      p.sprite.position.lerpVectors(posA, posB, p.t);

      const touchesFocus = p.edge.aId === focusId || p.edge.bId === focusId;
      const bothVisible = this.isProjectVisibleInFilter(p.edge.aId) && this.isProjectVisibleInFilter(p.edge.bId);
      p.pulseMat.color.copy(touchesFocus ? focusColor : dimColor);
      p.pulseMat.opacity = !bothVisible ? 0 : touchesFocus ? 0.92 : 0.25;
    });

    this.renderer.render(this.scene, this.camera);
  }

  /**
   * 2D Canvas 3D-projected fallback when WebGL is disabled or unavailable.
   */
  renderCanvas2D(focusId, connectedMap) {
    const ctx = this.ctx2d;
    if (!ctx) return;
    const width = this.viewport.clientWidth || 800;
    const height = this.viewport.clientHeight || 540;
    ctx.clearRect(0, 0, width, height);

    const cosY = Math.cos(this.yaw);
    const sinY = Math.sin(this.yaw);
    const cosX = Math.cos(this.pitch);
    const sinX = Math.sin(this.pitch);
    const fov = Math.min(width, height) * 0.95;
    const camDist = 8.8;

    const projected = this.projects.map((proj, idx) => {
      const [bx, by, bz] = GRAPH_META[proj.id].pos;
      const bobY = by + Math.sin(this.time * 1.4 + idx * 0.9) * 0.08;
      const x1 = bx * cosY + bz * sinY;
      const z1 = -bx * sinY + bz * cosY;
      const y2 = bobY * cosX - z1 * sinX;
      const z2 = bobY * sinX + z1 * cosX;
      const scale = fov / Math.max(1.5, camDist - z2);
      return {
        proj,
        sx: width / 2 + x1 * scale,
        sy: height / 2 - y2 * scale,
        z: z2,
        scale,
      };
    });

    // Draw synaptic edges
    this.edges.forEach((edge, idx) => {
      const a = projected[edge.aIndex];
      const b = projected[edge.bIndex];
      const touchesFocus = edge.aId === focusId || edge.bId === focusId;
      const bothVisible = this.isProjectVisibleInFilter(edge.aId) && this.isProjectVisibleInFilter(edge.bId);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(a.sx, a.sy);
      ctx.lineTo(b.sx, b.sy);
      ctx.strokeStyle = touchesFocus ? (this.projects.find((p) => p.id === focusId)?.color || '#D2FF00') : '#5d6b58';
      ctx.globalAlpha = !bothVisible ? 0.06 : touchesFocus ? 0.72 : 0.2;
      ctx.lineWidth = touchesFocus ? 1.6 : 1;
      ctx.stroke();

      if (bothVisible && touchesFocus) {
        const pt = ((this.time * 0.45 + idx * 0.27) % 1);
        const px = a.sx + (b.sx - a.sx) * pt;
        const py = a.sy + (b.sy - a.sy) * pt;
        ctx.fillStyle = '#D2FF00';
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    // Draw crystal cores back-to-front & sync HTML pins
    projected
      .slice()
      .sort((a, b) => a.z - b.z)
      .forEach(({ proj, sx, sy, z }) => {
        const inFilter = this.isProjectVisibleInFilter(proj.id);
        const isFocus = proj.id === focusId;
        const isConnected = connectedMap.has(proj.id);
        const depthNorm = Math.max(0.55, Math.min(1.12, (z + 4.0) / 7.2));
        const r = (isFocus ? 17 : isConnected ? 13 : 11) * depthNorm;

        ctx.save();
        ctx.globalAlpha = inFilter ? (isFocus ? 1 : 0.8) : 0.22;
        ctx.fillStyle = proj.color;
        ctx.shadowColor = proj.color;
        ctx.shadowBlur = isFocus ? 22 : 10;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
        if (isFocus) {
          ctx.strokeStyle = '#D2FF00';
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.arc(sx, sy, r + 7, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();

        const pin = this.pinElements.get(proj.id);
        if (pin) {
          const pinScale = isFocus ? Math.max(1.0, depthNorm) : depthNorm * 0.92;
          const depthAlpha = !inFilter ? 0.24 : isFocus ? 1.0 : Math.max(0.45, Math.min(0.95, (z + 4.4) / 6.8));
          pin.style.transform = `translate3d(${sx.toFixed(1)}px, ${(sy + r + 14).toFixed(1)}px, 0) translate(-50%, 0) scale(${pinScale.toFixed(3)})`;
          pin.style.opacity = depthAlpha.toFixed(2);
          pin.style.zIndex = String(Math.round((z + 10) * 10) + (isFocus ? 200 : 0));
        }
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
