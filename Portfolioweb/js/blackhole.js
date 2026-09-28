/**
 * REALISTIC GREEN BLACK HOLE & GRAVITATIONAL REFRACTION CONTACT ENGINE
 * --------------------------------------------------------------------
 * Author: Sam Sunny Portfolio
 * Stack: Vanilla ES6 Modules + 3D Keplerian Mechanics + SVG Gravitational Refraction
 * Description:
 *   - Monumental Realistic Black Hole (Event Horizon, Photon Ring, Lensed Accretion Disk).
 *   - Accretion disk and gravitational lensing aura glow in incandescent GREEN (Lime / Emerald / Cyan-Green).
 *   - 05 Contact Telemetry Nodes (GitHub, LinkedIn, Email, Call, Resume) revolve in 3D orbit around the black hole.
 *   - When passing behind the black hole (z < 0), nodes are subject to REALISTIC GRAVITATIONAL REFRACTION:
 *       1. Gravitational Deflection: light paths bent outward along spacetime curvature.
 *       2. Tangential Shearing: Einstein arc elongation along the photon ring.
 *       3. Refraction Distortion: SVG displacement map filter with green-shifted chromatic aberration.
 *       4. Shadow Occlusion: pitch-black event horizon core eclipses nodes passing directly behind it.
 *   - Hovering any node engages Gravitational Time-Dilation (smooth standstill) for effortless interaction.
 *   - 1-click clipboard copy for Email and Phone with live HUD toast notification.
 */

export const CONTACT_NODES = [
  {
    id: 'github',
    title: 'GitHub',
    handle: '@SamSunny4',
    desc: 'Production repositories, AI models & systems architecture',
    href: 'https://github.com/SamSunny4',
    target: '_blank',
    badge: 'CODE REPO',
    accent: '#00FF88', // Radioactive Neon Green
    iconSvg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
    orbitPhase: 0,
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    handle: 'in/sam-sunny',
    desc: 'Professional network, leadership & enterprise connections',
    href: 'https://www.linkedin.com/in/sam-sunny-36b4772bb/',
    target: '_blank',
    badge: 'NETWORK',
    accent: '#38BDF8', // Cyan-Green
    iconSvg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>`,
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
    iconSvg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    orbitPhase: (Math.PI * 2) * 0.40,
    isCopyable: true,
    copyValue: 'samsunnymodern12@gmail.com',
  },
  {
    id: 'call',
    title: 'Voice Telemetry',
    handle: '+91 // INITIATE CALL',
    desc: 'Direct voice communications & emergency protocol',
    href: 'tel:+918848419770',
    badge: 'VOICE LINK',
    accent: '#10B981', // Emerald
    iconSvg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
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
    iconSvg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    orbitPhase: (Math.PI * 2) * 0.80,
  },
];

// Relativistic Orbital Configuration around Black Hole
const BH_ORBIT = {
  radiusX: 380,
  radiusY: 215,
  tiltX: 0.44,   // 25 deg pitch
  tiltY: -0.28,  // -16 deg yaw
  tiltZ: 0.12,   // 7 deg roll
  baseSpeed: 0.016, // Hypnotic relativistic angular velocity
  horizonRadius: 95, // Event horizon shadow radius (px)
  einsteinRadius: 135, // Photon ring caustic radius (px)
  lensingInfluence: 320, // Outer limit of gravitational deflection
};

export class BlackHoleContactEngine {
  constructor() {
    this.section = document.getElementById('contact');
    this.viewport = document.getElementById('blackhole-viewport');
    this.container = document.getElementById('bh-orbit-container');
    this.toast = document.getElementById('bh-clipboard-toast');

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

    // Camera 3D Parallax
    this.camRotX = 0;
    this.camRotY = 0;
    this.targetCamRotX = 0;
    this.targetCamRotY = 0;

    // Toast Timer
    this.toastTimer = null;

    // Bind methods
    this.animate = this.animate.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);

    this.init();
  }

  init() {
    this.buildNodesDOM();
    this.onResize();
    this.setupListeners();
    this.setupIntersectionObserver();

    // Start 60fps render loop
    this.animId = requestAnimationFrame(this.animate);
    console.log(`[BlackHole] Green Singularity Engine active with ${CONTACT_NODES.length} relativistic contact nodes.`);
  }

  buildNodesDOM() {
    if (!this.container) {
      this.container = document.getElementById('bh-orbit-container');
    }
    if (!this.container) return;

    this.container.innerHTML = '';
    this.nodes = [];

    CONTACT_NODES.forEach((item, index) => {
      const el = document.createElement('a');
      el.className = 'bh-contact-node';
      el.href = item.href;
      if (item.target) el.target = item.target;
      el.dataset.id = item.id;
      el.style.setProperty('--node-accent', item.accent);
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', `${item.title}: ${item.handle}`);

      el.innerHTML = `
        <div class="bh-node-card">
          <div class="bh-node-badge-row">
            <div class="bh-node-icon" style="color: ${item.accent}">
              ${item.iconSvg}
            </div>
            <span class="bh-node-badge font-mono">${item.badge}</span>
          </div>
          <div class="bh-node-info">
            <h4 class="bh-node-title font-display">${item.title}</h4>
            <p class="bh-node-handle font-mono">${item.handle}</p>
          </div>
          <div class="bh-node-footer font-mono">
            <span>${item.isCopyable ? 'CLICK TO COPY ⧉' : 'TRANSMIT PROTOCOL ↗'}</span>
          </div>
        </div>
      `;

      // Hover / Focus: Engages Gravitational Time-Dilation
      el.addEventListener('pointerenter', () => this.handleNodeHover(item, el));
      el.addEventListener('pointerleave', () => this.handleNodeLeave());
      el.addEventListener('focus', () => this.handleNodeHover(item, el));
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

  handleNodeHover(item, el) {
    this.hoveredNode = el;
    el.classList.add('is-hovered');

    // Gravitational Time-Dilation: smoothly halt orbit so user can inspect / click
    this.targetSpeedFactor = 0.02;
  }

  handleNodeLeave() {
    if (this.hoveredNode) {
      this.hoveredNode.classList.remove('is-hovered');
      this.hoveredNode = null;
    }
    this.targetSpeedFactor = 1.0;
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
      this.scaleRatio = 0.52;
    } else if (w < 900) {
      this.scaleRatio = 0.70;
    } else if (w < 1200) {
      this.scaleRatio = 0.86;
    } else {
      this.scaleRatio = Math.min(1.10, Math.max(0.92, w / 1440));
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
      scale: Math.max(0.62, Math.min(1.22, perspective)),
      isFront: cz2 > -15,
    };
  }

  animate() {
    // Smooth lerp camera parallax
    this.camRotX += (this.targetCamRotX - this.camRotX) * 0.06;
    this.camRotY += (this.targetCamRotY - this.camRotY) * 0.06;

    // Smooth lerp gravitational time dilation
    this.speedFactor += (this.targetSpeedFactor - this.speedFactor) * 0.08;

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
        node.el.style.transform = `translate3d(${proj.x.toFixed(1)}px, ${proj.y.toFixed(1)}px, ${proj.z.toFixed(1)}px) translate(-50%, -50%) scale(1.18)`;
        node.el.style.filter = 'drop-shadow(0 0 28px rgba(0, 255, 136, 0.65))';
        node.el.style.opacity = '1.0';
      } else if (proj.isFront) {
        // IN FRONT OF BLACK HOLE:
        // Positioned above the shadow core and accretion disk (z-index: 35)
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

        node.el.style.zIndex = '10'; // Behind shadow core (z-index: 20)
        node.el.style.transform = `translate3d(${defX.toFixed(1)}px, ${defY.toFixed(1)}px, ${proj.z.toFixed(1)}px) translate(-50%, -50%) scale(${(proj.scale * 0.86 * tangentialStretch).toFixed(3)}) skewX(${shearDeg}deg)`;

        // SVG Gravitational Refraction filter with green-shifted chromatic aberration
        node.el.style.filter = 'url(#bh-refraction-filter) blur(1.2px) brightness(0.72)';
        node.el.style.opacity = isBehindShadow ? '0.06' : (0.42 + (r / R_lens) * 0.38).toFixed(2);
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
