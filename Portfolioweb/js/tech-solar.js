/**
 * TECH STACK 3D SOLAR SYSTEM ORBITAL & SPACE WARP ZOOM ENGINE
 * Author: Sam Sunny Portfolio
 * Description: 
 *   - Scroll-driven 3D cosmic zoom transition from Hero into the Tech Stack universe.
 *   - As user scrolls from Hero, camera flies through space (hyperspace star streaks, Hero zooms past camera),
 *     and the 3D Solar System Tech Stack blooms in from deep space.
 *   - 28 planetary tech nodes revolve in chaotic 3D orbits BOTH BEHIND AND OVER the monumental 3D text.
 *   - Hovering any node displays rich details in a floating holographic HUD tooltip right near the pointer!
 */

// 28 Verified Tech Stack Nodes with authentic project context
export const TECH_NODES = [
  // --- RING 0: AI & COMPUTER VISION CORE (Inner Fast Track) ---
  {
    id: 'python',
    name: 'Python 3.12',
    category: 'ai',
    categoryLabel: 'AI & VISION CORE',
    desc: 'Deep learning pipelines, MediaPipe landmark engineering, and algorithmic system architecture.',
    icon: 'assets/tech-icons/python.svg',
    color: '#387EB8',
    ringIndex: 0,
    orbitPhase: 0,
    speedFactor: 1.15,
  },
  {
    id: 'mediapipe',
    name: 'MediaPipe Vision',
    category: 'ai',
    categoryLabel: 'COMPUTER VISION',
    desc: 'Real-time 33-point pose estimation and kinematic angle tracking in Leadis / AiSam (National 2nd Prize).',
    icon: 'assets/tech-icons/mediapipe.svg',
    color: '#00F0FF',
    ringIndex: 0,
    orbitPhase: Math.PI * 0.5,
    speedFactor: 1.05,
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'ai',
    categoryLabel: 'ASYNC AI SERVICES',
    desc: 'High-throughput asynchronous REST microservices for low-latency AI model inference.',
    icon: 'assets/tech-icons/fastapi.svg',
    color: '#059669',
    ringIndex: 0,
    orbitPhase: Math.PI,
    speedFactor: 1.1,
  },
  {
    id: 'flask',
    name: 'Flask',
    category: 'ai',
    categoryLabel: 'BACKEND SERVICES',
    desc: 'Lightweight web microservices and local diagnostic interfaces for embedded telemetry.',
    icon: 'assets/tech-icons/flask.svg',
    color: '#D2FF00',
    ringIndex: 0,
    orbitPhase: Math.PI * 1.5,
    speedFactor: 0.95,
  },

  // --- RING 1: SYSTEMS, LOW-LEVEL & ENTERPRISE ARCHITECTURE ---
  {
    id: 'cs',
    name: 'C# (.NET 8)',
    category: 'systems',
    categoryLabel: 'ENTERPRISE ARCHITECTURE',
    desc: 'Core architecture of KeyBase commercial software running live in business retail operations.',
    icon: 'assets/tech-icons/cs.svg',
    color: '#A179DC',
    ringIndex: 1,
    orbitPhase: 0.2,
    speedFactor: 1.0,
  },
  {
    id: 'dotnet',
    name: '.NET Core Runtime',
    category: 'systems',
    categoryLabel: 'SYSTEMS RUNTIME',
    desc: 'High-performance multi-threaded business logic, asynchronous I/O, and secure desktop services.',
    icon: 'assets/tech-icons/dotnet.svg',
    color: '#512BD4',
    ringIndex: 1,
    orbitPhase: 0.2 + (Math.PI * 2 / 6),
    speedFactor: 0.95,
  },
  {
    id: 'c',
    name: 'C Language',
    category: 'systems',
    categoryLabel: 'LOW-LEVEL COMPUTING',
    desc: 'Memory-constrained low-level data structures, hardware interfacing, and performance kernels.',
    icon: 'assets/tech-icons/c.svg',
    color: '#659AD2',
    ringIndex: 1,
    orbitPhase: 0.2 + (Math.PI * 4 / 6),
    speedFactor: 1.05,
  },
  {
    id: 'rust',
    name: 'Rust Systems',
    category: 'systems',
    categoryLabel: 'SAFE CONCURRENCY',
    desc: 'Memory-safe systems programming, concurrency patterns, and high-performance utilities.',
    icon: 'assets/tech-icons/rust.svg',
    color: '#DEA584',
    ringIndex: 1,
    orbitPhase: 0.2 + (Math.PI * 6 / 6),
    speedFactor: 1.08,
  },
  {
    id: 'java',
    name: 'Java Platform',
    category: 'systems',
    categoryLabel: 'OBJECT SYSTEMS',
    desc: 'Robust enterprise patterns, OOP modular abstractions, and cross-platform runtime engineering.',
    icon: 'assets/tech-icons/java.svg',
    color: '#F89820',
    ringIndex: 1,
    orbitPhase: 0.2 + (Math.PI * 8 / 6),
    speedFactor: 0.92,
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    category: 'systems',
    categoryLabel: 'MODERN MOBILE/JVM',
    desc: 'Modern expressive mobile architecture and coroutine-based asynchronous event handling.',
    icon: 'assets/tech-icons/kotlin.svg',
    color: '#7F52FF',
    ringIndex: 1,
    orbitPhase: 0.2 + (Math.PI * 10 / 6),
    speedFactor: 1.02,
  },

  // --- RING 2: MODERN WEB & INTERACTIVE UI ---
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'web',
    categoryLabel: 'TYPE SYSTEMS',
    desc: 'Strict type contracts, scalable frontend abstractions, and complex reactive state models.',
    icon: 'assets/tech-icons/typescript.svg',
    color: '#3178C6',
    ringIndex: 2,
    orbitPhase: 0.5,
    speedFactor: 1.05,
  },
  {
    id: 'javascript',
    name: 'JavaScript ES6+',
    category: 'web',
    categoryLabel: 'CORE WEB ENGINE',
    desc: 'High-speed DOM manipulation, WebGL canvases, real-time audio/sensor pipelines, and animation.',
    icon: 'assets/tech-icons/javascript.svg',
    color: '#F7DF1E',
    ringIndex: 2,
    orbitPhase: 0.5 + (Math.PI * 2 / 5),
    speedFactor: 1.0,
  },
  {
    id: 'react',
    name: 'React Ecosystem',
    category: 'web',
    categoryLabel: 'REACTIVE UI',
    desc: 'Component architecture, custom hooks, virtual DOM optimization, and interactive client apps.',
    icon: 'assets/tech-icons/react.svg',
    color: '#00D8FF',
    ringIndex: 2,
    orbitPhase: 0.5 + (Math.PI * 4 / 5),
    speedFactor: 0.96,
  },
  {
    id: 'nextjs',
    name: 'Next.js 14',
    category: 'web',
    categoryLabel: 'FULL-STACK FRAMEWORK',
    desc: 'Server-side rendering, App Router edge computing, dynamic caching, and zero-bundle UI.',
    icon: 'assets/tech-icons/nextjs.svg',
    color: '#FFFFFF',
    ringIndex: 2,
    orbitPhase: 0.5 + (Math.PI * 6 / 5),
    speedFactor: 1.08,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'web',
    categoryLabel: 'TOKEN STYLING',
    desc: 'Design tokens, responsive layouts, micro-animations, and fluid visual architectures.',
    icon: 'assets/tech-icons/tailwind.svg',
    color: '#38BDF8',
    ringIndex: 2,
    orbitPhase: 0.5 + (Math.PI * 8 / 5),
    speedFactor: 0.94,
  },

  // --- RING 3: CLOUD, DATA ARCHITECTURE & DEVOPS ---
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'cloud',
    categoryLabel: 'RELATIONAL DATABASE',
    desc: 'ACID-compliant relational design, indexing strategies, complex joins, and query optimization.',
    icon: 'assets/tech-icons/postgres.svg',
    color: '#336791',
    ringIndex: 3,
    orbitPhase: 0.1,
    speedFactor: 0.98,
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'cloud',
    categoryLabel: 'NOSQL DOCUMENT STORE',
    desc: 'Flexible schema documents, aggregation pipelines, and high-velocity distributed persistence.',
    icon: 'assets/tech-icons/mongodb.svg',
    color: '#47A248',
    ringIndex: 3,
    orbitPhase: 0.1 + (Math.PI * 2 / 7),
    speedFactor: 1.04,
  },
  {
    id: 'sqlite',
    name: 'SQLite Engine',
    category: 'cloud',
    categoryLabel: 'EMBEDDED STORAGE',
    desc: 'Zero-configuration embedded ACID storage powering KeyBase local retail records.',
    icon: 'assets/tech-icons/sqlite.svg',
    color: '#003B57',
    ringIndex: 3,
    orbitPhase: 0.1 + (Math.PI * 4 / 7),
    speedFactor: 1.0,
  },
  {
    id: 'neo4j',
    name: 'Neo4j Graph DB',
    category: 'cloud',
    categoryLabel: 'GRAPH KNOWLEDGE',
    desc: 'Cypher query graph traversal, entity relationship graphs, and semantic network pipelines.',
    icon: 'assets/tech-icons/neo4j.svg',
    color: '#018BFF',
    ringIndex: 3,
    orbitPhase: 0.1 + (Math.PI * 6 / 7),
    speedFactor: 0.95,
  },
  {
    id: 'docker',
    name: 'Docker Containers',
    category: 'cloud',
    categoryLabel: 'CONTAINERIZATION',
    desc: 'Multi-stage container builds, microservice orchestration, and reproducible runtime environments.',
    icon: 'assets/tech-icons/docker.svg',
    color: '#2496ED',
    ringIndex: 3,
    orbitPhase: 0.1 + (Math.PI * 8 / 7),
    speedFactor: 1.02,
  },
  {
    id: 'linux',
    name: 'Linux / POSIX',
    category: 'cloud',
    categoryLabel: 'OPERATING SYSTEM',
    desc: 'Shell scripting, daemon management, system performance profiling, and server administration.',
    icon: 'assets/tech-icons/linux.svg',
    color: '#FCC624',
    ringIndex: 3,
    orbitPhase: 0.1 + (Math.PI * 10 / 7),
    speedFactor: 0.93,
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare Edge',
    category: 'cloud',
    categoryLabel: 'EDGE INFRASTRUCTURE',
    desc: 'Edge caching, DNS management, WebSockets, and global distributed routing.',
    icon: 'assets/tech-icons/cloudflare.svg',
    color: '#F38020',
    ringIndex: 3,
    orbitPhase: 0.1 + (Math.PI * 12 / 7),
    speedFactor: 1.06,
  },

  // --- RING 4: HARDWARE PROTOCOLS, PLATFORMS & COMETS (Chaotic Polar Orbit) ---
  {
    id: 'git',
    name: 'Git SCM',
    category: 'protocols',
    categoryLabel: 'VERSION CONTROL',
    desc: 'Branching strategies, atomic commit architecture, rebase hygiene, and CI/CD triggers.',
    icon: 'assets/tech-icons/git.svg',
    color: '#F05032',
    ringIndex: 4,
    orbitPhase: 0.8,
    speedFactor: 1.12,
  },
  {
    id: 'android',
    name: 'Android Native',
    category: 'protocols',
    categoryLabel: 'MOBILE PLATFORM',
    desc: 'Native sensor APIs, background camera capture, Bluetooth permissions, and Android SDK.',
    icon: 'assets/tech-icons/android.svg',
    color: '#3DDC84',
    ringIndex: 4,
    orbitPhase: 0.8 + (Math.PI * 2 / 6),
    speedFactor: 0.97,
  },
  {
    id: 'windows',
    name: 'Windows Win32',
    category: 'protocols',
    categoryLabel: 'DESKTOP OS',
    desc: 'Win32 APIs, retail receipt printer drivers, hardware key readers, and registry services.',
    icon: 'assets/tech-icons/windows.svg',
    color: '#0078D6',
    ringIndex: 4,
    orbitPhase: 0.8 + (Math.PI * 4 / 6),
    speedFactor: 1.04,
  },
  {
    id: 'ble',
    name: 'Bluetooth Low Energy',
    category: 'protocols',
    categoryLabel: 'HARDWARE PROTOCOL',
    desc: 'GATT services, characteristic subscriptions, RSSI distance calculations, and IoT telemetry.',
    icon: 'assets/tech-icons/ble.svg',
    color: '#0082FC',
    ringIndex: 4,
    orbitPhase: 0.8 + (Math.PI * 6 / 6),
    speedFactor: 1.08,
  },
  {
    id: 'wifi',
    name: 'Wi-Fi Direct / Sockets',
    category: 'protocols',
    categoryLabel: 'NETWORKING',
    desc: 'Low-latency peer-to-peer device interconnectivity and raw TCP/UDP socket synchronization.',
    icon: 'assets/tech-icons/wifi.svg',
    color: '#D2FF00',
    ringIndex: 4,
    orbitPhase: 0.8 + (Math.PI * 8 / 6),
    speedFactor: 0.95,
  },
  {
    id: 'swing',
    name: 'Java Swing GUI',
    category: 'protocols',
    categoryLabel: 'DESKTOP UI',
    desc: 'Custom UI component rendering, graphics 2D painting, and legacy desktop architectures.',
    icon: 'assets/tech-icons/swing.svg',
    color: '#E76F00',
    ringIndex: 4,
    orbitPhase: 0.8 + (Math.PI * 10 / 6),
    speedFactor: 1.01,
  },
];

// Chaotic Multi-Plane Orbital Geometry Definitions (Bigger, Expansive Orbits & Reduced Glow)
const ORBIT_RINGS = [
  // Ring 0: Inner Core (AI & Vision) — wide clearance around central text
  {
    baseRadiusX: 360,
    baseRadiusY: 210,
    tiltX: 0.36,     // 21 deg pitch
    tiltY: -0.28,    // -16 deg yaw
    tiltZ: 0.10,     // 6 deg roll
    baseSpeed: 0.0150,
    wobbleAmp: 16,
    color: 'rgba(210, 255, 0, 0.14)',
  },
  // Ring 1: Systems & Low-Level — inclined counter-orbit
  {
    baseRadiusX: 520,
    baseRadiusY: 295,
    tiltX: -0.56,    // -32 deg pitch
    tiltY: 0.36,     // 21 deg yaw
    tiltZ: -0.20,
    baseSpeed: -0.0115,
    wobbleAmp: 22,
    color: 'rgba(0, 240, 255, 0.14)',
  },
  // Ring 2: Web & Modern UI — wide tilted plane
  {
    baseRadiusX: 680,
    baseRadiusY: 375,
    tiltX: 0.62,     // 35 deg pitch
    tiltY: -0.32,
    tiltZ: 0.25,
    baseSpeed: 0.0090,
    wobbleAmp: 26,
    color: 'rgba(255, 215, 0, 0.12)',
  },
  // Ring 3: Cloud & Data — deep eccentric outer orbit
  {
    baseRadiusX: 840,
    baseRadiusY: 450,
    tiltX: -0.30,
    tiltY: 0.62,     // 35 deg yaw
    tiltZ: -0.16,
    baseSpeed: -0.0070,
    wobbleAmp: 30,
    color: 'rgba(90, 160, 220, 0.14)',
  },
  // Ring 4: Comets & Protocols — expansive steep polar inclination
  {
    baseRadiusX: 1000,
    baseRadiusY: 420,
    tiltX: 1.15,     // 66 deg steep polar pitch!
    tiltY: -0.48,
    tiltZ: 0.58,
    baseSpeed: 0.0078,
    wobbleAmp: 34,
    color: 'rgba(240, 100, 70, 0.14)',
  },
];

export class TechSolarSystem {
  constructor() {
    this.stage = document.getElementById('solar-stage');
    this.container = document.getElementById('solar-orbits-container');
    this.canvas = document.getElementById('solar-canvas');
    this.centerText = document.getElementById('solar-center-text');
    
    // Space Warp Zoom Stage Track & Layers
    this.track = document.getElementById('space-stage-track');
    this.heroLayer = document.getElementById('hero-space-layer');
    this.techLayer = document.getElementById('tech-space-layer');

    // Near-Pointer Floating Tooltip
    this.tooltip = document.getElementById('solar-cursor-tooltip');
    this.tooltipIcon = document.getElementById('tooltip-icon');
    this.tooltipTitle = document.getElementById('tooltip-title');
    this.tooltipCategory = document.getElementById('tooltip-category');
    this.tooltipDesc = document.getElementById('tooltip-desc');
    this.tooltipFooter = document.getElementById('tooltip-footer');

    if (!this.stage || !this.container) {
      console.warn('[Solar] Solar stage or container not found in DOM.');
      return;
    }

    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.nodes = [];
    this.hoveredNode = null;
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

    // Space Zoom & Warp Travel State
    this.zoomProgress = 0;
    this.targetZoomProgress = 0;
    this.warpSpeed = 0;

    // Drifting 3D Stardust background particles
    this.stardust = this.generateStardust(65);

    // Dynamic Mouse Proximity Orbit Speed Dilation
    this.orbitDilation = 1.0;
    this.targetOrbitDilation = 1.0;

    // Bind methods
    this.animate = this.animate.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.triggerSpaceZoom = this.triggerSpaceZoom.bind(this);

    this.init();
  }

  init() {
    this.buildNodesDOM();
    this.onResize();
    this.setupListeners();
    this.setupIntersectionObserver();

    // Start 60fps / 120fps render loop
    requestAnimationFrame(this.animate);
    console.log(`[Solar] 3D Solar System initialized with ${TECH_NODES.length} planetary tech nodes.`);
  }

  generateStardust(count) {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 1600,
        y: (Math.random() - 0.5) * 1000,
        z: Math.random() * 1200 - 400,
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.5 + 0.25,
        speed: Math.random() * 0.6 + 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return stars;
  }

  buildNodesDOM() {
    this.container.innerHTML = '';
    this.nodes = [];

    // Group nodes by ring to dynamically calculate equidistant phase distribution
    const ringBuckets = {};
    TECH_NODES.forEach((tech) => {
      const rIdx = Math.max(0, Math.min(ORBIT_RINGS.length - 1, tech.ringIndex ?? 0));
      if (!ringBuckets[rIdx]) ringBuckets[rIdx] = [];
      ringBuckets[rIdx].push(tech);
    });

    Object.keys(ringBuckets).forEach((rKey) => {
      const ringIndex = parseInt(rKey, 10);
      const ring = ORBIT_RINGS[ringIndex];
      const ringNodes = ringBuckets[ringIndex];
      const totalInRing = ringNodes.length;

      ringNodes.forEach((tech, itemIndex) => {
        // Automatically space nodes evenly around 360 degrees
        const initialTheta = (itemIndex / totalInRing) * Math.PI * 2 + (ringIndex * 0.45);

        const el = document.createElement('div');
        el.className = 'solar-node';
        el.dataset.id = tech.id;
        el.dataset.category = tech.category;
        el.setAttribute('role', 'button');
        el.setAttribute('tabindex', '0');
        el.setAttribute('aria-label', `${tech.name}: ${tech.categoryLabel}`);

        // Monogram fallback if SVG is missing
        const fallbackMonogram = tech.name ? tech.name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 2).toUpperCase() : 'UI';

        el.innerHTML = `
          <div class="solar-node-badge" style="--node-accent: ${tech.color}">
            <img src="${tech.icon}" alt="${tech.name}" class="solar-node-img" loading="lazy" onerror="this.style.display='none'; this.parentElement.insertAdjacentHTML('beforeend', '<span style=\\'font-family: JetBrains Mono, monospace; font-size: 11px; font-weight: 800; color: ${tech.color};\\'>${fallbackMonogram}</span>');" />
          </div>
        `;

        // Hover / Focus interactions
        el.addEventListener('pointerenter', (e) => this.handleNodeHover(tech, el, e));
        el.addEventListener('pointerleave', () => this.handleNodeLeave());
        el.addEventListener('focus', (e) => this.handleNodeHover(tech, el, e));
        el.addEventListener('blur', () => this.handleNodeLeave());

        this.container.appendChild(el);

        this.nodes.push({
          meta: tech,
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

  handleNodeHover(tech, el) {
    this.hoveredNode = tech;
    el.classList.add('is-hovered');

    if (this.tooltip) {
      if (this.tooltipIcon) {
        this.tooltipIcon.src = tech.icon;
        this.tooltipIcon.alt = tech.name;
      }
      if (this.tooltipTitle) {
        this.tooltipTitle.textContent = tech.name;
        this.tooltipTitle.style.color = tech.color;
      }
      if (this.tooltipCategory) {
        this.tooltipCategory.textContent = `// ${tech.categoryLabel}`;
        this.tooltipCategory.style.color = tech.color;
      }
      if (this.tooltipDesc) {
        this.tooltipDesc.textContent = tech.desc;
      }
      if (this.tooltipFooter) {
        this.tooltipFooter.textContent = `ORBIT RING ${tech.ringIndex + 1} • REALTIME 3D SPATIAL`;
      }

      this.tooltip.style.setProperty('--tooltip-accent', tech.color);
      this.tooltip.style.setProperty('--tooltip-glow', `${tech.color}44`);

      // Initialize position if not set
      if (this.pointerClientX > -1000) {
        this.tooltipCurrentX = this.pointerClientX + 18;
        this.tooltipCurrentY = this.pointerClientY + 18;
        this.tooltip.style.transform = `translate3d(${this.tooltipCurrentX}px, ${this.tooltipCurrentY}px, 0)`;
      }

      this.tooltip.classList.add('is-visible');
      this.isTooltipActive = true;
    }
  }

  handleNodeLeave() {
    if (this.hoveredNode) {
      const el = this.container.querySelector(`[data-id="${this.hoveredNode.id}"]`);
      if (el) el.classList.remove('is-hovered');
      this.hoveredNode = null;
    }

    if (this.tooltip) {
      this.tooltip.classList.remove('is-visible');
      this.isTooltipActive = false;
    }
  }

  updateTooltipPosition() {
    if (!this.isTooltipActive || !this.tooltip) return;

    const tooltipWidth = 320;
    const tooltipHeight = 150;
    let targetX = this.pointerClientX + 18;
    let targetY = this.pointerClientY + 18;

    // Prevent clipping right screen edge
    if (targetX + tooltipWidth > window.innerWidth - 16) {
      targetX = this.pointerClientX - tooltipWidth - 18;
    }
    // Prevent clipping bottom screen edge
    if (targetY + tooltipHeight > window.innerHeight - 16) {
      targetY = this.pointerClientY - tooltipHeight - 18;
    }

    // Smooth lerp
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
      this.targetOrbitDilation = 1.0;
    });

    // Smooth space zoom button in hero
    const exploreBtn = document.getElementById('hero-explore-btn');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.triggerSpaceZoom();
      });
    }
  }

  triggerSpaceZoom() {
    if (!this.track) return;
    const trackTop = this.track.offsetTop;
    const maxScroll = this.track.offsetHeight - window.innerHeight;
    const targetY = trackTop + maxScroll * 0.85;

    // Use Lenis if available for cinematic smooth flight
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

    // Normalized mouse (-1 to +1) relative to screen center
    const nx = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth / 2)));
    const ny = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight / 2)));

    this.targetCamRotY = nx * 0.44; // Max ~25 deg yaw
    this.targetCamRotX = -ny * 0.35; // Max ~20 deg pitch
  }

  onScroll() {
    // Scroll event triggers progress update in animation loop
  }

  onResize() {
    if (!this.stage) return;
    this.stageWidth = window.innerWidth;
    this.stageHeight = window.innerHeight;

    // Responsive scaling ratio for wider cosmic orbits
    const widthScale = this.stageWidth / 1500;
    const heightScale = this.stageHeight / 850;
    const uniformScale = Math.min(widthScale, heightScale);

    if (this.stageWidth < 600) {
      this.scaleRatio = Math.max(0.32, uniformScale * 0.90);
    } else if (this.stageWidth < 900) {
      this.scaleRatio = Math.max(0.48, uniformScale * 0.95);
    } else if (this.stageWidth < 1200) {
      this.scaleRatio = Math.max(0.66, uniformScale);
    } else if (this.stageWidth < 1600) {
      this.scaleRatio = Math.max(0.80, uniformScale * 1.02);
    } else {
      this.scaleRatio = Math.min(1.15, Math.max(0.90, uniformScale * 1.05));
    }

    if (this.canvas) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = this.stageWidth * dpr;
      this.canvas.height = this.stageHeight * dpr;
      this.canvas.style.width = `${this.stageWidth}px`;
      this.canvas.style.height = `${this.stageHeight}px`;
      if (this.ctx) {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(dpr, dpr);
      }
    }
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          this.isInViewport = entry.isIntersecting;
        });
      },
      { rootMargin: '100px 0px 100px 0px', threshold: 0.02 }
    );
    if (this.track) {
      observer.observe(this.track);
    }
  }

  /**
   * Continuous Scroll-Driven 3D Space Warp Zoom Engine
   */
  updateSpaceZoom() {
    if (!this.track) return;
    const rect = this.track.getBoundingClientRect();
    const maxScroll = this.track.offsetHeight - window.innerHeight;
    const rawProgress = maxScroll > 0 ? Math.max(0, Math.min(1, -rect.top / maxScroll)) : 0;

    // Smooth lerp progress
    this.targetZoomProgress = rawProgress;
    this.zoomProgress += (this.targetZoomProgress - this.zoomProgress) * 0.12;
    const p = this.zoomProgress;

    // Warp speed intensity based on velocity of progress change
    const deltaP = Math.abs(this.targetZoomProgress - this.zoomProgress);
    const activeZoomWarp = (p > 0.05 && p < 0.75) ? Math.sin((p / 0.75) * Math.PI) * 1.5 : 0;
    this.warpSpeed = Math.max(0, deltaP * 18 + activeZoomWarp);

    // 1. Hero Layer Zoom & Dissolve: p in [0.0, 0.40]
    if (this.heroLayer) {
      const heroP = Math.min(1, Math.max(0, p / 0.40));
      // Camera moves through hero: scales up from 1.0 to 3.2, blurs and fades out
      const heroScale = 1.0 + heroP * 2.2;
      const heroOpacity = Math.max(0, 1.0 - heroP * 1.45);
      const heroBlur = heroP * 18;

      this.heroLayer.style.transform = `scale(${heroScale.toFixed(3)}) translateZ(0)`;
      this.heroLayer.style.opacity = heroOpacity.toFixed(3);
      this.heroLayer.style.filter = heroBlur > 0.4 ? `blur(${heroBlur.toFixed(1)}px)` : 'none';
      this.heroLayer.style.pointerEvents = heroP > 0.15 ? 'none' : 'auto';
      this.heroLayer.style.visibility = heroOpacity <= 0.005 ? 'hidden' : 'visible';
    }

    // 2. Tech Stack Layer Arrival: p in [0.15, 0.85]
    if (this.techLayer) {
      if (p <= 0.15) {
        this.techLayer.style.opacity = '0';
        this.techLayer.style.visibility = 'hidden';
        this.techLayer.style.pointerEvents = 'none';
        this.techLayer.style.transform = 'scale(0.18) translateZ(0)';
      } else {
        this.techLayer.style.visibility = 'visible';
        const techP = Math.min(1, Math.max(0, (p - 0.15) / 0.65));
        // Smooth ease-out curve
        const easedTech = Math.sin((techP * Math.PI) / 2);

        // Scales in from deep space: 0.18 -> 1.0
        const techScale = 0.18 + easedTech * 0.82;
        const techOpacity = Math.min(1, techP * 1.35);
        const techBlur = (1 - easedTech) * 16;

        this.techLayer.style.transform = `scale(${techScale.toFixed(3)}) translateZ(0)`;
        this.techLayer.style.opacity = techOpacity.toFixed(3);
        this.techLayer.style.filter = techBlur > 0.4 ? `blur(${techBlur.toFixed(1)}px)` : 'none';
        this.techLayer.style.pointerEvents = techP > 0.65 ? 'auto' : 'none';
      }
    }
  }

  /**
   * 3D Rotation Math & Camera Projection Engine
   */
  project3D(x0, y0, z0, ring, camX, camY) {
    // 1. Local orbital plane Euler rotation
    const y1 = y0 * Math.cos(ring.tiltX) - z0 * Math.sin(ring.tiltX);
    const z1 = y0 * Math.sin(ring.tiltX) + z0 * Math.cos(ring.tiltX);
    const x1 = x0;

    const x2 = x1 * Math.cos(ring.tiltY) + z1 * Math.sin(ring.tiltY);
    const z2 = -x1 * Math.sin(ring.tiltY) + z1 * Math.cos(ring.tiltY);
    const y2 = y1;

    const x3 = x2 * Math.cos(ring.tiltZ) - y2 * Math.sin(ring.tiltZ);
    const y3 = x2 * Math.sin(ring.tiltZ) + y2 * Math.cos(ring.tiltZ);
    const z3 = z2;

    // 2. Global Camera / Parallax Rotation
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

  /**
   * Render Canvas Background: Hyperspace Warp Stardust & 3D Orbital Rings
   */
  renderCanvas(camX, camY) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.stageWidth;
    const h = this.stageHeight;
    const centerX = w / 2;
    const centerY = h / 2;

    ctx.clearRect(0, 0, w, h);

    const isWarping = this.warpSpeed > 0.35;
    const warpStreakLength = Math.min(140, this.warpSpeed * 32);

    // 1. Draw 3D Stardust with Space Warp Streaks
    this.stardust.forEach(star => {
      // Advance star along Z toward camera
      star.z -= (star.speed + this.warpSpeed * 7);
      if (star.z < -400) star.z += 1200;

      const xCam = star.x * Math.cos(camY) + star.z * Math.sin(camY);
      const zCam1 = -star.x * Math.sin(camY) + star.z * Math.cos(camY);
      const yCam = star.y * Math.cos(camX) - zCam1 * Math.sin(camX);
      const zCam = star.y * Math.sin(camX) + zCam1 * Math.cos(camX);

      const fov = 850;
      const s = fov / (fov - zCam);
      if (s <= 0 || s > 3.5) return;

      const px = centerX + xCam * s;
      const py = centerY + yCam * s;

      if (px >= -60 && px <= w + 60 && py >= -60 && py <= h + 60) {
        const pulse = 0.6 + 0.4 * Math.sin(this.time * star.pulseSpeed + star.phase);
        const starAlpha = Math.min(1, star.alpha * pulse * Math.min(1.2, s));

        if (isWarping) {
          // Draw warp speed streak line backwards into space
          const tailZ = star.z + warpStreakLength;
          const xTail = star.x * Math.cos(camY) + tailZ * Math.sin(camY);
          const zTail1 = -star.x * Math.sin(camY) + tailZ * Math.cos(camY);
          const yTail = star.y * Math.cos(camX) - zTail1 * Math.sin(camX);
          const zTail = star.y * Math.sin(camX) + zTail1 * Math.cos(camX);

          const sTail = fov / (fov - zTail);
          if (sTail > 0) {
            const pTailX = centerX + xTail * sTail;
            const pTailY = centerY + yTail * sTail;

            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(pTailX, pTailY);
            ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(0.85, starAlpha * 1.6)})`;
            ctx.lineWidth = Math.max(1, star.size * s * 0.85);
            ctx.stroke();
          }
        } else {
          // Normal point stardust
          ctx.fillStyle = `rgba(227, 232, 220, ${starAlpha})`;
          ctx.beginPath();
          ctx.arc(px, py, star.size * Math.min(2, s), 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });

    // 2. Draw 3D Orbital Rings (only when Tech Stack is blooming in, zoomProgress > 0.15)
    if (this.zoomProgress > 0.15) {
      const ringAlphaMultiplier = Math.min(1, (this.zoomProgress - 0.15) / 0.5);

      ORBIT_RINGS.forEach((ring) => {
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

        // Draw background segments (faint, behind)
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
        ctx.strokeStyle = ring.color.replace(/[\d\.]+\)$/, `${(0.04 * ringAlphaMultiplier).toFixed(2)})`);
        ctx.setLineDash([3, 5]);
        ctx.stroke();

        // Draw foreground segments (subtle, clean, over)
        ctx.beginPath();
        isDrawing = false;
        for (let i = 0; i < points.length; i++) {
          const pt = points[i];
          if (pt.z >= 0) {
            if (!isDrawing) { ctx.moveTo(pt.x, pt.y); isDrawing = true; }
            else { ctx.lineTo(pt.x, pt.y); }
          } else { isDrawing = false; }
        }
        ctx.strokeStyle = ring.color.replace(/[\d\.]+\)$/, `${(0.11 * ringAlphaMultiplier).toFixed(2)})`);
        ctx.setLineDash([]);
        ctx.stroke();

        // Travelling photon energy packet (crisp dot, zero glow)
        const photonPhase = (this.time * ring.baseSpeed * 2) % (Math.PI * 2);
        const px0 = a * Math.cos(photonPhase);
        const py0 = b * Math.sin(photonPhase);
        const photonProj = this.project3D(px0, py0, 0, ring, camX, camY);
        if (photonProj.depthZ >= 0) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.arc(centerX + photonProj.screenX, centerY + photonProj.screenY, 1.4 * photonProj.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }

    // 3. Laser connection line if node is hovered (subtle technical guide)
    if (this.hoveredNode && this.zoomProgress > 0.5) {
      const activeNode = this.nodes.find(n => n.meta.id === this.hoveredNode.id);
      if (activeNode) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + activeNode.projX, centerY + activeNode.projY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
  }

  /**
   * Main Animation Loop (60-120fps)
   */
  animate() {
    if (this.isInViewport) {
      this.time += 1.0;

      // 1. Process Continuous Space Warp Zoom
      this.updateSpaceZoom();

      // 2. Smooth lerp camera angles (mouse parallax)
      this.camRotX += (this.targetCamRotX - this.camRotX) * 0.07;
      this.camRotY += (this.targetCamRotY - this.camRotY) * 0.07;

      // 3. Update Monumental 3D Center Text Parallax
      if (this.centerText) {
        const textPitch = -this.camRotX * 18;
        const textYaw = this.camRotY * 24;
        this.centerText.style.transform = `perspective(900px) rotateX(${textPitch}deg) rotateY(${textYaw}deg) translateZ(0)`;
      }

      // 4. Update Each Planetary Tech Node in 3D Orbits
      const centerX = this.stageWidth / 2;
      const centerY = this.stageHeight / 2;

      // 4a. Dynamic Mouse Proximity Time-Dilation Engine
      // Mouse far away: full fast orbit speed (dilation = 1.0)
      // Mouse close to logos/center: smoothly slows down to calm inspection drift (~0.15)
      let minMouseDist = 9999;
      if (this.pointerClientX > -1000 && this.pointerClientY > -1000) {
        const distToCenter = Math.hypot(this.pointerClientX - centerX, this.pointerClientY - centerY);

        for (let i = 0; i < this.nodes.length; i++) {
          const n = this.nodes[i];
          const nx = centerX + n.projX;
          const ny = centerY + n.projY;
          const d = Math.hypot(this.pointerClientX - nx, this.pointerClientY - ny);
          if (d < minMouseDist) minMouseDist = d;
        }

        const nodeProximity = Math.max(0, Math.min(1, (minMouseDist - 25) / 220));
        const centerProximity = Math.max(0, Math.min(1, (distToCenter - 60) / 450));
        const proximity = Math.min(nodeProximity, centerProximity);

        this.targetOrbitDilation = 0.15 + 0.85 * Math.pow(proximity, 1.5);

        if (this.hoveredNode) {
          this.targetOrbitDilation = 0.08;
        }
      } else {
        this.targetOrbitDilation = 1.0;
      }

      // Smooth buttery lerp of orbit time dilation
      this.orbitDilation += (this.targetOrbitDilation - this.orbitDilation) * 0.08;

      // Pass 4b: Calculate pure 3D projected orbital positions and apply billboard transforms
      this.nodes.forEach(node => {
        const ring = node.ring;

        // Advance orbital angle (unified baseSpeed * proximity dilation)
        const nodeSpeed = (node.meta.id === this.hoveredNode?.id)
          ? ring.baseSpeed * 0.08
          : ring.baseSpeed * this.orbitDilation;

        node.theta += nodeSpeed;

        // Scaled semi-axes
        const a = ring.baseRadiusX * this.scaleRatio;
        const b = ring.baseRadiusY * this.scaleRatio;

        // Flat elliptical coordinates
        const x0 = a * Math.cos(node.theta);
        const y0 = b * Math.sin(node.theta);

        // Subtle out-of-plane wobble
        const wobbleFreq = 2;
        const wobbleAmp = (ring.wobbleAmp * 0.5) * this.scaleRatio;
        const z0 = wobbleAmp * Math.sin(wobbleFreq * node.theta + this.time * 0.015);

        // 3D Projection through ring Euler matrix & Camera angles
        const proj = this.project3D(x0, y0, z0, ring, this.camRotX, this.camRotY);

        node.projX = proj.screenX;
        node.projY = proj.screenY;
        node.projZ = proj.depthZ;
        node.scale = proj.scale;

        const screenPosX = centerX + proj.screenX;
        const screenPosY = centerY + proj.screenY;

        // Depth sorting relative to text (depthZ = 0)
        const isFront = node.projZ >= 0;
        node.isFront = isFront;

        let zIndex = 50;
        let opacity = 1.0;
        let scale = node.scale;
        let blurPx = 0;
        let brightness = 1.0;

        if (isFront) {
          // Foreground: Passes OVER the text letters!
          zIndex = Math.max(52, Math.min(99, Math.round(55 + node.projZ / 12)));
          scale = node.scale * 1.15;
          opacity = 1.0;
          blurPx = 0;
          brightness = 1.06;

          node.el.classList.add('is-front');
          node.el.classList.remove('is-behind');
        } else {
          // Background: Passes BEHIND the text letters!
          zIndex = Math.max(1, Math.min(48, Math.round(25 + node.projZ / 18)));
          scale = node.scale * 0.78;
          opacity = Math.max(0.42, Math.min(0.85, 0.75 + node.projZ / 700));
          blurPx = Math.min(3.0, Math.abs(node.projZ) / 180);
          brightness = Math.max(0.60, 0.9 + node.projZ / 800);

          node.el.classList.add('is-behind');
          node.el.classList.remove('is-front');
        }

        // Apply hardware-accelerated 3D Transform to the borderless badge
        node.el.style.zIndex = zIndex;
        node.el.style.opacity = opacity;
        node.el.style.transform = `translate3d(${screenPosX.toFixed(1)}px, ${screenPosY.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        node.el.style.filter = blurPx > 0.4 ? `blur(${blurPx.toFixed(1)}px) brightness(${brightness.toFixed(2)})` : `brightness(${brightness.toFixed(2)})`;
      });

      // 5. Draw Canvas Background (Orbits & Stars)
      this.renderCanvas(this.camRotX, this.camRotY);

      // 6. Update Near-Pointer Tooltip
      this.updateTooltipPosition();
    }

    requestAnimationFrame(this.animate);
  }
}

/**
 * Bootstrap the Tech Solar System once DOM is ready
 */
export function initTechSolarSystem() {
  const stage = document.getElementById('solar-stage');
  if (stage) {
    return new TechSolarSystem();
  }
  return null;
}
