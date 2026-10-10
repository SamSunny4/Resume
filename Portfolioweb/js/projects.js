/**
 * FLAGSHIP PROJECTS & ORBITAL ARCHITECTURE CONFIGURATION
 * =======================================================
 * Dedicated registry for portfolio flagship projects.
 * Rearrange, edit, add, or remove projects easily here without touching
 * the 3D Keplerian celestial render engine in project-solar.js.
 *
 * Each project entry contains:
 * - id: unique slug identifier
 * - name: Display title
 * - badge: Status / award / milestone pill
 * - category: Subsystem or engineering domain
 * - desc: Comprehensive architectural synopsis
 * - icon: Asset icon path (SVG/PNG)
 * - color: Hex accent color for planet glow, reticle & HUD telemetry
 * - ringIndex: Which Keplerian orbital ring it orbits on (0 = inner, 1 = mid, 2 = outer)
 * - orbitPhase: Angular offset in radians around the ring (e.g. 0, Math.PI, 0.6)
 * - speedFactor: Orbital speed modifier
 * - tech: List of architecture & framework tags
 * - github: Source repository URL
 * - stats: List of key system metrics & engineering achievements
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
    github: 'https://github.com/SamSunny4/MovSense',
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
    github: 'https://github.com/SamSunny4/3DS',
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
