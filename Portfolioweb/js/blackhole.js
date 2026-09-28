/**
 * REALISTIC GREEN BLACK HOLE & GRAVITATIONAL REFRACTION CONTACT ENGINE
 * --------------------------------------------------------------------
 * Author: Sam Sunny Portfolio
 * Stack: WebGL (General Relativity Raymarching) + 3D Keplerian Mechanics + SVG Refraction
 * Description:
 *   - Ultra-Realistic Black Hole rendered in raw WebGL:
 *       1. Curved spacetime geodesic raymarching (Schwarzschild / Kerr metric).
 *       2. Warped accretion disk (upper & lower lensed arcs) glowing incandescent GREEN.
 *       3. Relativistic Doppler beaming & Keplerian differential rotation.
 *       4. Razor-sharp Einstein photon ring caustics and pitch-black event horizon shadow.
 *   - 05 Contact Telemetry Nodes (GitHub, LinkedIn, Email, Call, Resume) in 3D orbit:
 *       1. Pure borderless icons only (NO text labels on nodes, matching Tech Stack).
 *       2. Real-time gravitational deflection, Einstein ring elongation, and shadow occlusion when behind (z < 0).
 *       3. Floating holographic HUD tooltip near cursor on hover.
 *       4. Relativistic gravitational time-dilation (smooth standstill on hover).
 *       5. 1-click clipboard copy for Email and Phone with live HUD toast.
 */

export const CONTACT_NODES = [
  {
    id: 'github',
    title: 'GitHub',
    handle: '@SamSunny4',
    desc: 'Production repositories, AI models & systems architecture',
    href: 'https://github.com/SamSunny4',
    target: '_blank',
    badge: 'CODE REPOSITORY',
    accent: '#00FF88', // Radioactive Neon Green
    iconSvg: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
    orbitPhase: 0,
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    handle: 'in/sam-sunny',
    desc: 'Professional network, leadership & enterprise connections',
    href: 'https://www.linkedin.com/in/sam-sunny-36b4772bb/',
    target: '_blank',
    badge: 'NETWORK NEXUS',
    accent: '#38BDF8', // Cyan-Green
    iconSvg: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>`,
    orbitPhase: (Math.PI * 2) * 0.20,
  },
  {
    id: 'email',
    title: 'Direct Transmission',
    handle: 'samsunnymodern12@gmail.com',
    desc: 'High-priority inquiries & engineering collaboration',
    href: 'mailto:samsunnymodern12@gmail.com',
    badge: 'EMAIL PROTOCOL',
    accent: '#D2FF00', // Electric Lime
    iconSvg: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    orbitPhase: (Math.PI * 2) * 0.40,
    isCopyable: true,
    copyValue: 'samsunnymodern12@gmail.com',
  },
  {
    id: 'call',
    title: 'Voice Telemetry',
    handle: '+91 8848419770',
    desc: 'Direct voice communications & emergency protocol',
    href: 'tel:+918848419770',
    badge: 'VOICE LINK',
    accent: '#10B981', // Emerald
    iconSvg: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    orbitPhase: (Math.PI * 2) * 0.60,
    isCopyable: true,
    copyValue: '+918848419770',
  },
  {
    id: 'resume',
    title: 'Curriculum Vitae',
    handle: 'Sam_Sunny_Resume.pdf',
    desc: 'Verified production credentials & technical experience',
    href: 'assets/Sam_Sunny_Resume.pdf',
    target: '_blank',
    badge: 'VERIFIED PDF',
    accent: '#A7F3D0', // Pale Mint
    iconSvg: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    orbitPhase: (Math.PI * 2) * 0.80,
  },
];

// Relativistic Orbital Configuration around Black Hole
const BH_ORBIT = {
  radiusX: 370,
  radiusY: 210,
  tiltX: 0.44,   // 25 deg pitch
  tiltY: -0.28,  // -16 deg yaw
  tiltZ: 0.12,   // 7 deg roll
  baseSpeed: 0.016, // Relativistic angular velocity
  horizonRadius: 90, // Event horizon shadow radius (px)
  einsteinRadius: 135, // Photon ring caustic radius (px)
  lensingInfluence: 310, // Outer limit of gravitational deflection
};

// GLSL Shaders for Ultra-Realistic Kerr/Schwarzschild Black Hole
const VERTEX_SHADER_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SRC = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// High quality 2D hash
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// Value noise
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Fractional Brownian Motion for turbulent swirling plasma
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.55;
  mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p = rot * p * 2.05;
    a *= 0.5;
  }
  return v;
}

// Accretion disk sample at 3D position p with ray velocity v
vec4 sampleDisk(vec3 p, vec3 v, float t) {
  float r = length(p.xz);
  float r_isco = 0.90;
  float r_out = 3.60;
  
  if (r < r_isco || r > r_out) {
    return vec4(0.0);
  }
  
  float phi = atan(p.z, p.x);
  // Differential Keplerian rotation: inner plasma spins much faster
  float omega = 1.7 / (r * sqrt(r));
  float rotPhi = phi - omega * t * 0.85;
  
  // Turbulent swirling plasma streamers
  vec2 uvDisk = vec2(r * 3.8 - t * 0.22, rotPhi * 3.2 + r * 1.6);
  float turb = fbm(uvDisk);
  float turb2 = fbm(uvDisk * 2.1 + vec2(t * 0.18, -t * 0.12));
  float plasma = turb * 0.62 + turb2 * 0.38;
  
  // Radial density profile
  float radialMask = smoothstep(r_isco, r_isco + 0.32, r) * smoothstep(r_out, r_out - 0.70, r);
  float density = radialMask * (0.35 + 1.4 * plasma);
  
  // Relativistic Doppler Beaming
  vec3 vel = normalize(vec3(-p.z, 0.0, p.x));
  float beta = clamp(0.55 / sqrt(r), 0.05, 0.72); // Fraction of speed of light
  float cosTheta = dot(vel, -normalize(v));
  float gamma = 1.0 / sqrt(1.0 - beta * beta);
  float doppler = 1.0 / (gamma * (1.0 - beta * cosTheta));
  doppler = clamp(doppler, 0.25, 2.85);
  float boost = pow(doppler, 2.6);
  
  // Incandescent Green Palette
  vec3 colCaustic = vec3(0.95, 1.0, 0.92);  // Blinding white-lime
  vec3 colHot     = vec3(0.0, 1.0, 0.55);   // Electric neon green
  vec3 colMid     = vec3(0.03, 0.82, 0.45); // Deep emerald
  vec3 colDark    = vec3(0.01, 0.35, 0.18); // Dark viridian
  
  float temp = clamp((r_out - r) / (r_out - r_isco) * 1.1 + (boost - 1.0) * 0.45, 0.0, 1.0);
  vec3 baseCol = mix(colDark, colMid, smoothstep(0.0, 0.45, temp));
  baseCol = mix(baseCol, colHot, smoothstep(0.45, 0.82, temp));
  baseCol = mix(baseCol, colCaustic, smoothstep(0.82, 1.0, temp));
  
  vec3 finalRgb = baseCol * boost * 1.55;
  float alpha = clamp(density * 0.88, 0.0, 0.95);
  
  return vec4(finalRgb, alpha);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  
  // Interactive camera orientation with mouse parallax
  float camPitch = 0.35 + u_mouse.y * 0.22;
  float camYaw = u_mouse.x * 0.32;
  float camDist = 4.3;
  
  vec3 ro = vec3(
    camDist * sin(camYaw) * cos(camPitch),
    camDist * sin(camPitch),
    camDist * cos(camYaw) * cos(camPitch)
  );
  vec3 ta = vec3(0.0, 0.0, 0.0);
  
  vec3 fwd = normalize(ta - ro);
  vec3 right = normalize(cross(fwd, vec3(0.0, 1.0, 0.0)));
  vec3 up = cross(right, fwd);
  
  vec3 rd = normalize(uv.x * right + uv.y * up + 1.85 * fwd);
  
  // General Relativity Schwarzschild Raymarching
  vec3 p = ro;
  float dt = 0.12;
  vec3 v = rd * dt;
  float r_s = 0.72; // Event horizon radius
  
  vec3 accumColor = vec3(0.0);
  float accumAlpha = 0.0;
  float closestDist = 999.0;
  bool swallowed = false;
  
  for (int i = 0; i < 48; i++) {
    float r = length(p);
    if (r < closestDist) closestDist = r;
    
    // Ray plunged into event horizon
    if (r < r_s) {
      swallowed = true;
      break;
    }
    
    // Check crossing of equatorial accretion disk (y = 0)
    vec3 pNext = p + v;
    if (p.y * pNext.y <= 0.0 && abs(v.y) > 0.0001) {
      float tHit = -p.y / v.y;
      vec3 pDisk = p + v * tHit;
      vec4 sample = sampleDisk(pDisk, v, u_time);
      if (sample.a > 0.01) {
        accumColor += (1.0 - accumAlpha) * sample.rgb * sample.a;
        accumAlpha += (1.0 - accumAlpha) * sample.a;
        if (accumAlpha > 0.96) break;
      }
    }
    
    // Schwarzschild Geodesic Acceleration
    // a = -1.5 * r_s * (p x v)^2 / r^5 * p
    vec3 h = cross(p, v);
    float h2 = dot(h, h);
    float r5 = r * r * r * r * r;
    vec3 a = -1.5 * r_s * (h2 / max(r5, 0.001)) * p;
    
    v += a;
    p += v;
    
    // Escape condition
    if (r > 8.0 && dot(p, v) > 0.0) {
      break;
    }
  }
  
  // Event Horizon Shadow: completely pitch-black void inside the horizon
  if (swallowed) {
    accumColor = vec3(0.0);
    accumAlpha = 1.0;
  } else {
    // Einstein Photon Ring Caustic (razor-thin light loop boundary at photon sphere)
    float caustic = smoothstep(r_s * 1.08, r_s * 1.015, closestDist) * 3.4;
    accumColor += vec3(0.85, 1.0, 0.88) * caustic;
    
    // Gravitational Lensing Aura / Green Atmospheric Glow
    float rScreen = length(uv);
    float halo = 0.075 / (0.28 + rScreen * rScreen * 3.8);
    accumColor += vec3(0.0, 1.0, 0.55) * halo;
    
    // Deep Space Starfield with Gravitational Lensing Distortion
    vec3 escDir = normalize(v);
    float starGrid = sin(escDir.x * 90.0) * sin(escDir.y * 90.0) * sin(escDir.z * 90.0);
    float stars = smoothstep(0.965, 0.998, starGrid) * 0.75;
    accumColor += (1.0 - accumAlpha) * vec3(0.65, 0.95, 0.8) * stars;
  }
  
  // Tone Mapping & Gamma Correction
  vec3 finalColor = accumColor / (1.0 + accumColor);
  finalColor = pow(finalColor, vec3(0.9));
  
  // Canvas Edge Fade
  float rEdge = length(uv);
  float edgeFade = smoothstep(0.98, 0.75, rEdge);
  float outAlpha = clamp(length(finalColor) * 2.2 + (swallowed ? 1.0 : 0.0), 0.0, 1.0) * edgeFade;
  
  gl_FragColor = vec4(finalColor, outAlpha);
}
`;

export class BlackHoleContactEngine {
  constructor() {
    this.section = document.getElementById('contact');
    this.viewport = document.getElementById('blackhole-viewport');
    this.canvas = document.getElementById('bh-webgl-canvas');
    this.container = document.getElementById('bh-orbit-container');
    this.toast = document.getElementById('bh-clipboard-toast');

    // Holographic Floating Near-Pointer Tooltip
    this.tooltip = document.getElementById('bh-cursor-tooltip');
    this.tooltipIconWrap = document.getElementById('bh-tooltip-icon-wrap');
    this.tooltipBadge = document.getElementById('bh-tooltip-badge');
    this.tooltipTitle = document.getElementById('bh-tooltip-title');
    this.tooltipHandle = document.getElementById('bh-tooltip-handle');
    this.tooltipDesc = document.getElementById('bh-tooltip-desc');
    this.tooltipAction = document.getElementById('bh-tooltip-action');

    if (!this.section || !this.viewport) return;

    this.nodes = [];
    this.hoveredNode = null;
    this.animId = null;
    this.time = 0;
    this.scaleRatio = 1.0;
    this.isInViewport = false;

    // Relativistic Gravitational Time-Dilation
    this.speedFactor = 1.0;
    this.targetSpeedFactor = 1.0;

    // Camera 3D Parallax & Mouse
    this.camRotX = 0;
    this.camRotY = 0;
    this.targetCamRotX = 0;
    this.targetCamRotY = 0;
    this.pointerClientX = -9999;
    this.pointerClientY = -9999;
    this.tooltipCurrentX = -9999;
    this.tooltipCurrentY = -9999;
    this.isTooltipActive = false;

    // Toast Timer
    this.toastTimer = null;

    // Bind methods
    this.animate = this.animate.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);

    this.init();
  }

  init() {
    this.initWebGL();
    this.buildNodesDOM();
    this.onResize();
    this.setupListeners();
    this.setupIntersectionObserver();

    // Start 60fps render loop
    this.animId = requestAnimationFrame(this.animate);
    console.log(`[BlackHole] Ultra-Realistic Green Kerr Singularity Engine active with ${CONTACT_NODES.length} borderless icon nodes.`);
  }

  /**
   * Initialize WebGL General Relativity Raymarching Shader
   */
  initWebGL() {
    if (!this.canvas) return;

    const gl = this.canvas.getContext('webgl', { alpha: true, antialias: true }) ||
               this.canvas.getContext('experimental-webgl', { alpha: true, antialias: true });
    
    if (!gl) {
      console.warn('[BlackHole] WebGL not supported on this device. Fallback mode active.');
      return;
    }

    this.gl = gl;

    // Compile Vertex Shader
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, VERTEX_SHADER_SRC);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      console.error('[BlackHole] VS compile error:', gl.getShaderInfoLog(vs));
      return;
    }

    // Compile Fragment Shader
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, FRAGMENT_SHADER_SRC);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.error('[BlackHole] FS compile error:', gl.getShaderInfoLog(fs));
      return;
    }

    // Link Program
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('[BlackHole] Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    this.glProgram = program;
    gl.useProgram(program);

    // Full-screen Quad Buffer
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Uniform Locations
    this.uResolution = gl.getUniformLocation(program, 'u_resolution');
    this.uTime = gl.getUniformLocation(program, 'u_time');
    this.uMouse = gl.getUniformLocation(program, 'u_mouse');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  }

  /**
   * Build Orbiting Contact Nodes DOM (Icons ONLY, No Text, matching Tech Stack)
   */
  buildNodesDOM() {
    if (!this.container) {
      this.container = document.getElementById('bh-orbit-container');
    }
    if (!this.container) return;

    this.container.innerHTML = '';
    this.nodes = [];

    CONTACT_NODES.forEach((item) => {
      const el = document.createElement('a');
      el.className = 'bh-contact-node';
      el.href = item.href;
      if (item.target) el.target = item.target;
      el.dataset.id = item.id;
      el.style.setProperty('--node-accent', item.accent);
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', `${item.title}: ${item.handle}`);

      // Pure Borderless Floating Icon Badge (Matching Tech Stack's .solar-node-badge)
      el.innerHTML = `
        <div class="bh-node-badge" style="--node-accent: ${item.accent}">
          <div class="bh-node-icon" style="color: ${item.accent}">
            ${item.iconSvg}
          </div>
        </div>
      `;

      // Hover / Focus: Engages Gravitational Time-Dilation & Near-Pointer HUD Tooltip
      el.addEventListener('pointerenter', (e) => this.handleNodeHover(item, el, e));
      el.addEventListener('pointerleave', () => this.handleNodeLeave());
      el.addEventListener('focus', (e) => this.handleNodeHover(item, el, e));
      el.addEventListener('blur', () => this.handleNodeLeave());

      // 1-Click Copy handling for Email & Phone
      if (item.isCopyable) {
        el.addEventListener('click', (e) => {
          if (item.copyValue) {
            e.preventDefault();
            navigator.clipboard.writeText(item.copyValue).then(() => {
              this.showToast(`COPIED: ${item.copyValue}`);
            }).catch(() => {
              window.location.href = item.href;
            });
          }
        });
      }

      this.container.appendChild(el);

      this.nodes.push({
        meta: item,
        el,
        theta: item.orbitPhase,
        projX: 0,
        projY: 0,
        projZ: 0,
        scale: 1,
        isFront: false,
      });
    });

    // Quick-action bar listeners
    const copyEmailBtn = document.getElementById('bh-copy-email-btn');
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText('samsunnymodern12@gmail.com').then(() => {
          this.showToast('EMAIL COPIED: samsunnymodern12@gmail.com');
        });
      });
    }

    const returnHeroBtn = document.getElementById('bh-return-hero-btn');
    if (returnHeroBtn) {
      returnHeroBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.AppState?.lenis) {
          window.AppState.lenis.scrollTo(0, { duration: 2.2 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
  }

  setupListeners() {
    window.addEventListener('resize', this.onResize, { passive: true });
    window.addEventListener('mousemove', this.onPointerMove, { passive: true });
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isInViewport = entry.isIntersecting;
        });
      },
      { rootMargin: '120px 0px 120px 0px', threshold: 0.05 }
    );
    if (this.section) {
      observer.observe(this.section);
    }
  }

  handleNodeHover(node, el, e) {
    this.hoveredNode = el;
    el.classList.add('is-hovered');

    // Gravitational Time-Dilation: smoothly halt orbit so user can inspect / click
    this.targetSpeedFactor = 0.02;

    if (this.tooltip) {
      if (this.tooltipIconWrap) {
        this.tooltipIconWrap.innerHTML = node.iconSvg;
        this.tooltipIconWrap.style.color = node.accent;
      }
      if (this.tooltipBadge) {
        this.tooltipBadge.textContent = node.badge;
        this.tooltipBadge.style.color = node.accent;
      }
      if (this.tooltipTitle) {
        this.tooltipTitle.textContent = node.title;
      }
      if (this.tooltipHandle) {
        this.tooltipHandle.textContent = node.handle;
      }
      if (this.tooltipDesc) {
        this.tooltipDesc.textContent = node.desc;
      }
      if (this.tooltipAction) {
        this.tooltipAction.textContent = node.isCopyable ? 'CLICK TO COPY ⧉' : 'TRANSMIT PROTOCOL ↗';
      }

      this.tooltip.style.setProperty('--tooltip-accent', node.accent);

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
      this.hoveredNode.classList.remove('is-hovered');
      this.hoveredNode = null;
    }
    this.targetSpeedFactor = 1.0;

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

    // Viewport edge collision safety
    if (targetX + tooltipWidth > window.innerWidth - 16) {
      targetX = this.pointerClientX - tooltipWidth - 18;
    }
    if (targetY + tooltipHeight > window.innerHeight - 16) {
      targetY = this.pointerClientY - tooltipHeight - 12;
    }
    if (targetX < 16) targetX = 16;
    if (targetY < 16) targetY = 16;

    // Smooth inertia lerp
    this.tooltipCurrentX += (targetX - this.tooltipCurrentX) * 0.22;
    this.tooltipCurrentY += (targetY - this.tooltipCurrentY) * 0.22;

    this.tooltip.style.transform = `translate3d(${Math.round(this.tooltipCurrentX)}px, ${Math.round(this.tooltipCurrentY)}px, 0)`;
  }

  showToast(message) {
    if (!this.toast) return;
    this.toast.textContent = `✓ ${message}`;
    this.toast.classList.add('is-active');

    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.toast.classList.remove('is-active');
    }, 2800);
  }

  onPointerMove(e) {
    this.pointerClientX = e.clientX;
    this.pointerClientY = e.clientY;

    if (!this.isInViewport) return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / cx));
    const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / cy));

    this.targetCamRotY = nx * 0.32; // Parallax yaw
    this.targetCamRotX = -ny * 0.22; // Parallax pitch
  }

  onResize() {
    const w = window.innerWidth;
    if (w < 600) {
      this.scaleRatio = 0.55;
    } else if (w < 900) {
      this.scaleRatio = 0.72;
    } else if (w < 1200) {
      this.scaleRatio = 0.88;
    } else {
      this.scaleRatio = Math.min(1.10, Math.max(0.92, w / 1440));
    }

    // Resize WebGL Canvas
    if (this.canvas && this.viewport) {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = this.viewport.getBoundingClientRect();
      const cw = Math.floor(rect.width * dpr);
      const ch = Math.floor(rect.height * dpr);

      if (this.canvas.width !== cw || this.canvas.height !== ch) {
        this.canvas.width = cw;
        this.canvas.height = ch;
        if (this.gl) {
          this.gl.viewport(0, 0, cw, ch);
        }
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

    // 2. Camera Parallax
    const cy = y3 * Math.cos(camX) - z3 * Math.sin(camX);
    const cz1 = y3 * Math.sin(camX) + z3 * Math.cos(camX);
    const cx = x3 * Math.cos(camY) + cz1 * Math.sin(camY);
    const cz2 = -x3 * Math.sin(camY) + cz1 * Math.cos(camY);

    const fov = 1000;
    const perspective = fov / (fov + cz2);

    return {
      x: cx * perspective,
      y: cy * perspective,
      z: cz2,
      scale: Math.max(0.65, Math.min(1.22, perspective)),
      isFront: cz2 > -12,
    };
  }

  animate(timestamp) {
    // Smooth lerp camera parallax
    this.camRotX += (this.targetCamRotX - this.camRotX) * 0.06;
    this.camRotY += (this.targetCamRotY - this.camRotY) * 0.06;

    // Smooth lerp gravitational time dilation
    this.speedFactor += (this.targetSpeedFactor - this.speedFactor) * 0.08;

    this.time = timestamp * 0.001;

    // WebGL Shader Render
    if (this.gl && this.glProgram && this.isInViewport) {
      this.gl.useProgram(this.glProgram);
      this.gl.uniform2f(this.uResolution, this.canvas.width, this.canvas.height);
      this.gl.uniform1f(this.uTime, this.time);
      this.gl.uniform2f(this.uMouse, this.camRotY, this.camRotX);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }

    // Update Tooltip dynamic floating position
    this.updateTooltipPosition();

    const rx = BH_ORBIT.radiusX * this.scaleRatio;
    const ry = BH_ORBIT.radiusY * this.scaleRatio;
    const R_h = BH_ORBIT.horizonRadius * this.scaleRatio;
    const R_e = BH_ORBIT.einsteinRadius * this.scaleRatio;
    const R_lens = BH_ORBIT.lensingInfluence * this.scaleRatio;

    // Update each contact node's 3D orbit & gravitational refraction
    this.nodes.forEach((node) => {
      const isHovered = (this.hoveredNode === node.el);

      if (!isHovered) {
        node.theta += BH_ORBIT.baseSpeed * this.speedFactor;
      }

      const x0 = Math.cos(node.theta) * rx;
      const y0 = Math.sin(node.theta) * ry;
      const z0 = 0;

      const proj = this.project3D(x0, y0, z0, BH_ORBIT, this.camRotX, this.camRotY);
      node.projX = proj.x;
      node.projY = proj.y;
      node.projZ = proj.z;
      node.scale = proj.scale;
      node.isFront = proj.isFront;

      const r = Math.sqrt(proj.x * proj.x + proj.y * proj.y);

      if (isHovered) {
        // Hover lock: elevated, luminous, unrefracted focus
        node.el.style.zIndex = '999';
        node.el.style.transform = `translate3d(${proj.x.toFixed(1)}px, ${proj.y.toFixed(1)}px, ${proj.z.toFixed(1)}px) translate(-50%, -50%) scale(1.25)`;
        node.el.style.filter = 'drop-shadow(0 0 28px rgba(0, 255, 136, 0.75))';
        node.el.style.opacity = '1.0';
      } else if (proj.isFront) {
        // IN FRONT OF BLACK HOLE:
        // Positioned above the WebGL black hole canvas (z-index: 35)
        node.el.style.zIndex = '35';
        node.el.style.transform = `translate3d(${proj.x.toFixed(1)}px, ${proj.y.toFixed(1)}px, ${proj.z.toFixed(1)}px) translate(-50%, -50%) scale(${proj.scale.toFixed(3)})`;
        node.el.style.filter = 'drop-shadow(0 0 16px rgba(0, 255, 136, 0.35))';
        node.el.style.opacity = '1.0';
        node.el.classList.add('is-front');
        node.el.classList.remove('is-refracted');
      } else {
        // BEHIND BLACK HOLE:
        // SUBJECT TO ASTROPHYSICAL GRAVITATIONAL REFRACTION & LENSING:
        // 1. Spacetime curvature deflection: pushes apparent light rays outward away from horizon
        let defX = proj.x;
        let defY = proj.y;
        if (r < R_lens && r > 2) {
          const deflection = Math.pow(R_e / Math.max(r, R_h * 0.90), 1.5) * 16 * this.scaleRatio;
          defX += (proj.x / r) * deflection;
          defY += (proj.y / r) * deflection;
        }

        // 2. Tangential arc elongation (Einstein ring shear)
        const angle = Math.atan2(defY, defX);
        const shearDeg = (Math.sin(angle * 2) * 6).toFixed(1);
        const tangentialStretch = 1.0 + Math.min(0.35, (R_e / Math.max(r, R_h)) * 0.28);

        // 3. Occlusion by Event Horizon Shadow
        // If directly behind the pitch-black core, it is eclipsed
        const isBehindShadow = (r < R_h * 0.85);

        node.el.style.zIndex = '8'; // Behind shadow core and accretion disk
        node.el.style.transform = `translate3d(${defX.toFixed(1)}px, ${defY.toFixed(1)}px, ${proj.z.toFixed(1)}px) translate(-50%, -50%) scale(${(proj.scale * 0.86 * tangentialStretch).toFixed(3)}) skewX(${shearDeg}deg)`;

        // SVG Gravitational Refraction filter with green-shifted chromatic aberration
        node.el.style.filter = 'url(#bh-refraction-filter) blur(1.2px) brightness(0.72)';
        node.el.style.opacity = isBehindShadow ? '0.04' : (0.38 + (r / R_lens) * 0.42).toFixed(2);
        node.el.classList.remove('is-front');
        node.el.classList.add('is-refracted');
      }
    });

    this.animId = requestAnimationFrame(this.animate);
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onPointerMove);
  }
}

export function initBlackHoleContact() {
  return new BlackHoleContactEngine();
}
