/**
 * INTERACTIVE 2D TOPOGRAPHIC CONTOUR BACKGROUND ENGINE
 * (ULTRA-MINIMAL, CLEAN, MONOCHROMATIC)
 * 
 * Architecture:
 * - Exact Edge-Graph Marching Squares (zero disjoint segment gaps)
 * - 2-Pass Chaikin Subdivision & Midpoint Quadratic Splines for vector-grade silky curves
 * - Harmonic low-frequency multi-scale elevation field (smooth rounded hills, zero pinch creases)
 * - Ultra-subtle monochromatic palette — dim lime tones that recede behind content
 * - Very few, widely-spaced contour lines (4-5 levels) for maximum spaciousness
 * - Gentle interactive cursor deflection & ripple shockwaves
 */

// 2D Simplex Noise Engine (Self-contained, zero-dependency, high-performance)
class SimplexNoise2D {
  constructor(seed = Math.random()) {
    this.F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
    this.G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
    
    this.p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) this.p[i] = i;
    
    // Seeded shuffle
    let s = (seed * 10000) % 1;
    for (let i = 255; i > 0; i--) {
      s = (s * 9301 + 49297) % 233280;
      const j = Math.floor((s / 233280) * (i + 1));
      const tmp = this.p[i];
      this.p[i] = this.p[j];
      this.p[j] = tmp;
    }
    
    this.perm = new Uint8Array(512);
    this.permMod12 = new Uint8Array(512);
    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
      this.permMod12[i] = this.perm[i] % 12;
    }
    
    this.grad3 = [
      [1, 1], [-1, 1], [1, -1], [-1, -1],
      [1, 0], [-1, 0], [1, 0], [-1, 0],
      [0, 1], [0, -1], [0, 1], [0, -1]
    ];
  }

  noise(xin, yin) {
    let n0 = 0, n1 = 0, n2 = 0;
    const s = (xin + yin) * this.F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * this.G2;
    const X0 = i - t, Y0 = j - t;
    const x0 = xin - X0, y0 = yin - Y0;

    let i1 = 0, j1 = 0;
    if (x0 > y0) { i1 = 1; j1 = 0; } else { i1 = 0; j1 = 1; }

    const x1 = x0 - i1 + this.G2, y1 = y0 - j1 + this.G2;
    const x2 = x0 - 1.0 + 2.0 * this.G2, y2 = y0 - 1.0 + 2.0 * this.G2;

    const ii = i & 255, jj = j & 255;

    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 > 0) {
      t0 *= t0;
      const gi0 = this.permMod12[ii + this.perm[jj]];
      n0 = t0 * t0 * (this.grad3[gi0][0] * x0 + this.grad3[gi0][1] * y0);
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 > 0) {
      t1 *= t1;
      const gi1 = this.permMod12[ii + i1 + this.perm[jj + j1]];
      n1 = t1 * t1 * (this.grad3[gi1][0] * x1 + this.grad3[gi1][1] * y1);
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 > 0) {
      t2 *= t2;
      const gi2 = this.permMod12[ii + 1 + this.perm[jj + 1]];
      n2 = t2 * t2 * (this.grad3[gi2][0] * x2 + this.grad3[gi2][1] * y2);
    }

    return 70.0 * (n0 + n1 + n2);
  }
}

export class TopoBackground {
  constructor(options = {}) {
    this.container = options.container || document.getElementById('hero-topo-container') || document.getElementById('hero-space-layer');
    this.canvas = options.canvas || null;
    this.theme = options.theme || 'cyber-light'; // 'cyber-light', 'lime-mint', 'ice-cyan', 'ethereal-pearl'
    this.cellSize = options.cellSize || 25; // Optimized cell density: silky curves with ~40% fewer evaluations
    this.lineLevelsCount = options.lineLevelsCount || 5; // Very few lines for maximum cleanliness
    
    // Performance & simulation state
    this.ctx = null;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.cols = 0;
    this.rows = 0;
    this.grid = null;
    this.levels = [];
    this.simplex = new SimplexNoise2D(0.55);
    this.pointsMap = new Map();
    this.adjMap = new Map();
    this.visitedSet = new Set();

    // Dynamic Time & Ambient Drift
    this.time = 0;
    this.speed = options.speed || 0.00018; // Very slow, meditative ambient drift
    this.animId = null;
    this.isRunning = false;

    // Mouse Interaction Physics
    this.mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      radius: options.mouseRadius || 280, // Moderate radius
      strength: options.mouseStrength || 0.35, // Very gentle — avoids dense contour clusters
      isActive: false
    };

    // Parallax Camera offset
    this.parallax = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      factor: options.parallaxFactor || 30
    };

    // Click Shockwave Ripples
    this.ripples = [];

    // Fewer, broader, gentler peaks — precomputed squared radius & inverse factors
    this.peaks = [
      { x: 0.22, y: 0.30, vx: 0.00002, vy: 0.00001, radius: 0.50, height: 0.28 },
      { x: 0.75, y: 0.35, vx: -0.00002, vy: -0.00001, radius: 0.48, height: -0.25 },
      { x: 0.45, y: 0.72, vx: 0.00001, vy: -0.00002, radius: 0.52, height: 0.22 }
    ].map(p => ({
      ...p,
      radSq28: p.radius * p.radius * 2.8,
      inv2RadSq: 1 / (2 * p.radius * p.radius)
    }));

    this.mouseCutoff = this.mouse.radius * this.mouse.radius * 2.8;
    this.inv2MouseRadSq = 1 / (2 * this.mouse.radius * this.mouse.radius);

    // Bind event handlers
    this.onResize = this.onResize.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onClick = this.onClick.bind(this);
    this.animate = this.animate.bind(this);

    this.init();
  }

  init() {
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'topo-background-canvas';
      this.canvas.className = 'topo-background-canvas';
      this.canvas.style.position = 'absolute';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.zIndex = '0';
      this.canvas.style.display = 'block';

      if (this.container) {
        this.container.appendChild(this.canvas);
      } else {
        const heroLayer = document.getElementById('hero-topo-container') || document.getElementById('hero-space-layer');
        if (heroLayer) {
          heroLayer.appendChild(this.canvas);
        } else {
          document.body.prepend(this.canvas);
        }
      }
    }

    this.ctx = this.canvas.getContext('2d', { alpha: false });

    this.updateDimensions();
    this.setupElevationLevels();

    window.addEventListener('resize', this.onResize, { passive: true });
    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.onMouseMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
      }
    }, { passive: true });
    window.addEventListener('mouseleave', this.onMouseLeave, { passive: true });
    window.addEventListener('click', this.onClick, { passive: true });

    this.isRunning = true;
    this.animId = requestAnimationFrame(this.animate);
  }

  setupElevationLevels() {
    this.levels = [];
    const minL = -0.30;
    const maxL = 0.40;
    const count = this.lineLevelsCount; // 4-5 levels for ultra-clean spaciousness

    for (let i = 0; i < count; i++) {
      const val = minL + ((maxL - minL) * i) / (count - 1);
      // Subtle depth hierarchy — one slightly brighter "index" line
      const isIndex = (i === Math.floor(count / 2));
      this.levels.push({
        val: val,
        isIndex: isIndex,
        lineWidth: isIndex ? 1.4 : 0.95,
        alpha: isIndex ? 0.65 : 0.42
      });
    }
  }

  updateDimensions() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);

    this.cols = Math.ceil(this.width / this.cellSize) + 1;
    this.rows = Math.ceil(this.height / this.cellSize) + 1;
    this.grid = new Float32Array((this.cols + 1) * (this.rows + 1));
  }

  onResize() {
    this.updateDimensions();
  }

  onMouseMove(e) {
    this.mouse.targetX = e.clientX;
    this.mouse.targetY = e.clientY;
    this.mouse.isActive = true;

    const normX = (e.clientX / this.width) * 2 - 1;
    const normY = (e.clientY / this.height) * 2 - 1;
    this.parallax.targetX = normX * this.parallax.factor;
    this.parallax.targetY = normY * this.parallax.factor;
  }

  onMouseLeave() {
    this.mouse.isActive = false;
    this.mouse.targetX = -9999;
    this.mouse.targetY = -9999;
    this.parallax.targetX = 0;
    this.parallax.targetY = 0;
  }

  onClick(e) {
    if (this.ripples.length > 3) this.ripples.shift();
    this.ripples.push({
      x: e.clientX,
      y: e.clientY,
      radius: 6,
      maxRadius: Math.max(this.width, this.height) * 0.35,
      speed: 4.0,
      amplitude: 0.25,
      decay: 0.960
    });
  }

  /**
   * Pure low-frequency harmonic elevation field
   * Produces silky-smooth, fluid, rounded topographic curves without any sharp V-creases
   */
  evaluateElevation(px, py, t) {
    const wx = px + this.parallax.x;
    const wy = py + this.parallax.y;

    // Harmonic low-frequency octaves (broad, fluid, sensual curves)
    const n1 = this.simplex.noise(wx * 0.00078 + t * 0.02, wy * 0.00078 + t * 0.016) * 0.72;
    const n2 = this.simplex.noise(wx * 0.00155 - t * 0.014, wy * 0.00155 + t * 0.016) * 0.32;

    let h = n1 + n2;

    // Balanced drifting peaks across left, center, and right
    const normX = px / this.width;
    const normY = py / this.height;
    for (let k = 0; k < this.peaks.length; k++) {
      const p = this.peaks[k];
      const dx = normX - p.x;
      const dy = normY - p.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < p.radSq28) {
        h += p.height * Math.exp(-distSq * p.inv2RadSq);
      }
    }

    // Wide, soft Gaussian mouse deflection
    if (this.mouse.isActive || this.mouse.x > -1000) {
      const dx = px - this.mouse.x;
      const dy = py - this.mouse.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < this.mouseCutoff) {
        const mouseFactor = Math.exp(-distSq * this.inv2MouseRadSq);
        h += this.mouse.strength * mouseFactor;
      }
    }

    // Ripples
    for (let r = 0; r < this.ripples.length; r++) {
      const rip = this.ripples[r];
      const dx = px - rip.x;
      const dy = py - rip.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const diff = dist - rip.radius;
      if (Math.abs(diff) < 90) {
        const wave = Math.cos((diff / 90) * Math.PI) * rip.amplitude;
        h += wave;
      }
    }

    return h;
  }

  /**
   * Main Render Loop
   */
  animate() {
    if (!this.isRunning) return;

    // Topographic background is strictly for the landing page.
    // When user scrolls into deep space (p > 0.18) or down the page, pause heavy marching squares computation.
    const p = window.AppState?.techSolar?.zoomProgress ?? 0;
    if (p > 0.18 || window.scrollY > window.innerHeight * 0.85) {
      this.animId = requestAnimationFrame(this.animate);
      return;
    }

    this.time += this.speed;

    // Smooth lerp for mouse coordinates
    if (this.mouse.isActive) {
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;
    } else {
      this.mouse.x += (-9999 - this.mouse.x) * 0.04;
      this.mouse.y += (-9999 - this.mouse.y) * 0.04;
    }

    // Smooth lerp for parallax
    this.parallax.x += (this.parallax.targetX - this.parallax.x) * 0.05;
    this.parallax.y += (this.parallax.targetY - this.parallax.y) * 0.05;

    // Drifting landforms
    for (let k = 0; k < this.peaks.length; k++) {
      const p = this.peaks[k];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0.08 || p.x > 0.92) p.vx = -p.vx;
      if (p.y < 0.08 || p.y > 0.92) p.vy = -p.vy;
    }

    // Ripples
    for (let r = this.ripples.length - 1; r >= 0; r--) {
      const rip = this.ripples[r];
      rip.radius += rip.speed;
      rip.amplitude *= rip.decay;
      if (rip.radius > rip.maxRadius || rip.amplitude < 0.02) {
        this.ripples.splice(r, 1);
      }
    }

    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const dpr = this.dpr;
    const cellSize = this.cellSize;
    const cols = this.cols;
    const rows = this.rows;

    ctx.save();
    ctx.scale(dpr, dpr);

    // 1. Pure dark canvas — clean and uncluttered
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, w, h);

    // 2. Dot matrix removed for cleanliness

    // 3. Compute 2D Scalar Elevation Grid
    for (let j = 0; j <= rows; j++) {
      const py = j * cellSize;
      for (let i = 0; i <= cols; i++) {
        const px = i * cellSize;
        this.grid[j * (cols + 1) + i] = this.evaluateElevation(px, py, this.time);
      }
    }

    // 4. Luminous Light Gradient
    const lineGradient = this.createLineGradient(ctx, w, h);

    // 5. Extract Contours via Exact Edge-Graph Marching Squares + Spline Smoothing
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowBlur = 0; // Disable CPU raster blur filter for max 60fps throughput

    for (let l = 0; l < this.levels.length; l++) {
      const lvl = this.levels[l];
      const polylines = this.extractContourPolylines(lvl.val, cols, rows, cellSize);

      if (polylines.length > 0) {
        ctx.strokeStyle = lineGradient;

        // High-performance dual-pass stroke: outer luminous aura + inner crisp core
        // Replaces heavy CPU/GPU raster shadowBlur with instant hardware vector passes
        const outerWidth = lvl.lineWidth * (lvl.isIndex ? 2.6 : 2.0);
        const outerAlpha = lvl.alpha * (lvl.isIndex ? 0.38 : 0.22);

        // Pass 1: Soft luminous outer halo
        ctx.lineWidth = outerWidth;
        ctx.globalAlpha = outerAlpha;
        this.renderSmoothedPolylines(ctx, polylines);

        // Pass 2: Crisp inner core filament
        ctx.lineWidth = lvl.lineWidth;
        ctx.globalAlpha = lvl.alpha;
        this.renderSmoothedPolylines(ctx, polylines);
      }
    }

    ctx.restore();

    this.animId = requestAnimationFrame(this.animate);
  }

  /**
   * Exact Edge-Graph Marching Squares:
   * Uses unique grid edge indices to connect contour segments into 100% continuous,
   * gap-free open polylines and closed loops.
   */
  extractContourPolylines(targetL, cols, rows, cellSize) {
    const hOffset = (rows + 1) * cols;
    const grid = this.grid;

    // Edge indexing functions
    const hEdge = (i, j) => j * cols + i;
    const vEdge = (i, j) => hOffset + j * (cols + 1) + i;

    const points = this.pointsMap;
    const adj = this.adjMap;
    const visited = this.visitedSet;
    points.clear();
    adj.clear();
    visited.clear();

    const addPoint = (edgeId, x, y) => {
      if (!points.has(edgeId)) points.set(edgeId, { x, y });
    };

    const addEdge = (ea, eb) => {
      let a = adj.get(ea);
      if (!a) { a = []; adj.set(ea, a); }
      a.push(eb);

      let b = adj.get(eb);
      if (!b) { b = []; adj.set(eb, b); }
      b.push(ea);
    };

    // March across all grid cells
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const v0 = grid[j * (cols + 1) + i];
        const v1 = grid[j * (cols + 1) + (i + 1)];
        const v2 = grid[(j + 1) * (cols + 1) + (i + 1)];
        const v3 = grid[(j + 1) * (cols + 1) + i];

        const state = (v0 >= targetL ? 8 : 0) |
                      (v1 >= targetL ? 4 : 0) |
                      (v2 >= targetL ? 2 : 0) |
                      (v3 >= targetL ? 1 : 0);

        if (state === 0 || state === 15) continue;

        const e0 = hEdge(i, j);         // top
        const e1 = vEdge(i + 1, j);     // right
        const e2 = hEdge(i, j + 1);     // bottom
        const e3 = vEdge(i, j);         // left

        // Compute edge intersections with linear interpolation
        if ((v0 >= targetL) !== (v1 >= targetL)) {
          const t = (targetL - v0) / (v1 - v0);
          addPoint(e0, (i + t) * cellSize, j * cellSize);
        }
        if ((v1 >= targetL) !== (v2 >= targetL)) {
          const t = (targetL - v1) / (v2 - v1);
          addPoint(e1, (i + 1) * cellSize, (j + t) * cellSize);
        }
        if ((v3 >= targetL) !== (v2 >= targetL)) {
          const t = (targetL - v3) / (v2 - v3);
          addPoint(e2, (i + t) * cellSize, (j + 1) * cellSize);
        }
        if ((v0 >= targetL) !== (v3 >= targetL)) {
          const t = (targetL - v0) / (v3 - v0);
          addPoint(e3, i * cellSize, (j + t) * cellSize);
        }

        switch (state) {
          case 1:
          case 14:
            addEdge(e3, e2);
            break;
          case 2:
          case 13:
            addEdge(e2, e1);
            break;
          case 3:
          case 12:
            addEdge(e3, e1);
            break;
          case 4:
          case 11:
            addEdge(e0, e1);
            break;
          case 6:
          case 9:
            addEdge(e0, e2);
            break;
          case 7:
          case 8:
            addEdge(e0, e3);
            break;
          case 5: {
            const vc = (v0 + v1 + v2 + v3) * 0.25;
            if (vc >= targetL) {
              addEdge(e0, e3);
              addEdge(e1, e2);
            } else {
              addEdge(e0, e1);
              addEdge(e3, e2);
            }
            break;
          }
          case 10: {
            const vc = (v0 + v1 + v2 + v3) * 0.25;
            if (vc >= targetL) {
              addEdge(e0, e1);
              addEdge(e3, e2);
            } else {
              addEdge(e0, e3);
              addEdge(e1, e2);
            }
            break;
          }
        }
      }
    }

    const polylines = [];

    // 1. Trace open paths (starting at boundary/terminal nodes with degree 1)
    for (const [node, neighbors] of adj.entries()) {
      if (neighbors.length === 1 && !visited.has(node)) {
        const poly = [points.get(node)];
        visited.add(node);
        let curr = neighbors[0];
        let prev = node;

        while (curr !== undefined) {
          visited.add(curr);
          poly.push(points.get(curr));
          const nexts = adj.get(curr);
          const next = nexts[0] === prev ? nexts[1] : nexts[0];
          prev = curr;
          curr = next;
        }
        if (poly.length >= 2) {
          polylines.push({ points: poly, isClosed: false });
        }
      }
    }

    // 2. Trace closed cycles (all remaining unvisited nodes form simple loops)
    for (const [node, neighbors] of adj.entries()) {
      if (!visited.has(node)) {
        const poly = [points.get(node)];
        visited.add(node);
        let curr = neighbors[0];
        let prev = node;

        while (curr !== undefined && curr !== node) {
          visited.add(curr);
          poly.push(points.get(curr));
          const nexts = adj.get(curr);
          const next = nexts[0] === prev ? nexts[1] : nexts[0];
          prev = curr;
          curr = next;
        }
        if (poly.length >= 3) {
          polylines.push({ points: poly, isClosed: true });
        }
      }
    }

    return polylines;
  }

  /**
   * 2-Pass Chaikin corner-cutting subdivision:
   * Smooths polyline vertices before spline rendering to eliminate any angle kinks
   */
  chaikinSmooth(pts, isClosed, iterations = 2) {
    let curr = pts;
    for (let it = 0; it < iterations; it++) {
      const len = curr.length;
      if (len < 3) return curr;

      const smoothed = [];
      if (isClosed) {
        for (let i = 0; i < len; i++) {
          const p0 = curr[i];
          const p1 = curr[(i + 1) % len];
          smoothed.push({ x: 0.75 * p0.x + 0.25 * p1.x, y: 0.75 * p0.y + 0.25 * p1.y });
          smoothed.push({ x: 0.25 * p0.x + 0.75 * p1.x, y: 0.25 * p0.y + 0.75 * p1.y });
        }
      } else {
        smoothed.push(curr[0]);
        for (let i = 0; i < len - 1; i++) {
          const p0 = curr[i];
          const p1 = curr[i + 1];
          smoothed.push({ x: 0.75 * p0.x + 0.25 * p1.x, y: 0.75 * p0.y + 0.25 * p1.y });
          smoothed.push({ x: 0.25 * p0.x + 0.75 * p1.x, y: 0.25 * p0.y + 0.75 * p1.y });
        }
        smoothed.push(curr[len - 1]);
      }
      curr = smoothed;
    }
    return curr;
  }

  /**
   * Renders polylines using Midpoint Quadratic Splines
   * Produces silky, organic, continuous contour curves
   */
  renderSmoothedPolylines(ctx, polylines) {
    ctx.beginPath();

    for (let k = 0; k < polylines.length; k++) {
      const item = polylines[k];
      // 1-pass Chaikin smoothing (combined with midpoint splines for silky smooth curves with half the points)
      const pts = this.chaikinSmooth(item.points, item.isClosed, 1);
      const len = pts.length;

      if (item.isClosed) {
        // Continuous closed loop with midpoint Bezier spline
        const p0 = pts[0];
        const p1 = pts[1];
        ctx.moveTo((p0.x + p1.x) * 0.5, (p0.y + p1.y) * 0.5);

        for (let p = 1; p <= len; p++) {
          const curr = pts[p % len];
          const next = pts[(p + 1) % len];
          const xc = (curr.x + next.x) * 0.5;
          const yc = (curr.y + next.y) * 0.5;
          ctx.quadraticCurveTo(curr.x, curr.y, xc, yc);
        }
        ctx.closePath();
      } else {
        // Continuous open path
        if (len === 2) {
          ctx.moveTo(pts[0].x, pts[0].y);
          ctx.lineTo(pts[1].x, pts[1].y);
        } else {
          ctx.moveTo(pts[0].x, pts[0].y);
          for (let p = 1; p < len - 1; p++) {
            const xc = (pts[p].x + pts[p + 1].x) * 0.5;
            const yc = (pts[p].y + pts[p + 1].y) * 0.5;
            ctx.quadraticCurveTo(pts[p].x, pts[p].y, xc, yc);
          }
          ctx.lineTo(pts[len - 1].x, pts[len - 1].y);
        }
      }
    }

    ctx.stroke();
  }

  /**
   * Delicate, airy matrix coordinate dots
   */
  renderCoordinateDots(ctx, w, h) {
    const spacing = this.dotSpacing;
    const numX = Math.ceil(w / spacing);
    const numY = Math.ceil(h / spacing);

    ctx.fillStyle = 'rgba(134, 255, 200, 0.12)';
    ctx.shadowBlur = 0;

    for (let j = 0; j <= numY; j++) {
      const y = j * spacing;
      for (let i = 0; i <= numX; i++) {
        const x = i * spacing;

        let dotAlpha = 0.11;
        let dotRadius = 0.85;

        if (this.mouse.isActive || this.mouse.x > -1000) {
          const dx = x - this.mouse.x;
          const dy = y - this.mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 48400) {
            const factor = 1 - Math.sqrt(distSq) / 220;
            dotAlpha = 0.11 + factor * 0.32;
            dotRadius = 0.85 + factor * 0.7;
          }
        }

        ctx.globalAlpha = dotAlpha;
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  /**
   * Ultra-subtle, monochromatic color gradients
   * Designed to recede behind content — not compete with it
   */
  createLineGradient(ctx, w, h) {
    let grad;
    switch (this.theme) {
      case 'ice-cyan': {
        grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0.0, 'rgba(180, 220, 230, 0.5)');
        grad.addColorStop(0.50, 'rgba(120, 200, 220, 0.4)');
        grad.addColorStop(1.0, 'rgba(80, 180, 200, 0.35)');
        break;
      }
      case 'lime-mint': {
        grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0.0, 'rgba(200, 240, 140, 0.45)');
        grad.addColorStop(0.50, 'rgba(140, 220, 160, 0.35)');
        grad.addColorStop(1.0, 'rgba(100, 200, 150, 0.3)');
        break;
      }
      case 'ethereal-pearl': {
        grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0.0, 'rgba(255, 255, 255, 0.25)');
        grad.addColorStop(0.50, 'rgba(220, 235, 240, 0.2)');
        grad.addColorStop(1.0, 'rgba(180, 210, 220, 0.15)');
        break;
      }
      case 'cyber-light':
      case 'cyber':
      default: {
        // Monochromatic luminous lime — weaves elegantly behind hero content
        grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0.0, 'rgba(210, 255, 0, 0.75)');   // Radiant lime
        grad.addColorStop(0.35, 'rgba(180, 240, 60, 0.60)');  // Warm lime
        grad.addColorStop(0.70, 'rgba(130, 220, 90, 0.45)');  // Sage emerald
        grad.addColorStop(1.0, 'rgba(90, 200, 130, 0.35)');   // Deep emerald
        break;
      }
    }
    return grad;
  }

  setTheme(newTheme) {
    this.theme = newTheme;
  }

  setLineCount(count) {
    this.lineLevelsCount = Math.max(4, Math.min(14, count));
    this.setupElevationLevels();
  }

  destroy() {
    this.isRunning = false;
    if (this.animId) cancelAnimationFrame(this.animId);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseleave', this.onMouseLeave);
    window.removeEventListener('click', this.onClick);
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// Auto-initialize helper
export function initTopoBackground(options = {}) {
  const container = options.container || document.getElementById('hero-topo-container') || document.getElementById('hero-space-layer');
  return new TopoBackground({ container, ...options });
}
