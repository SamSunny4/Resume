/**
 * FLYING TRAITS / ABOUT ME HYPERSPACE ENGINE
 * Author: Sam Sunny Portfolio
 * Description:
 *   - 10 short points about Sam Sunny fly through the stars towards and past the camera
 *     as the user scrolls between the Hero landing page and the Certificates matrix.
 *   - Follows the radial trajectory and trails of the star dots (emerging near the
 *     central vanishing point and streaking radially outward).
 *   - Slanted typography with zero borders, zero background pills, pure monumental text.
 *   - Full 3D camera and pointer parallax responsive to cursor movement and scroll velocity.
 */

export const ABOUT_TRAITS = [
  { text: 'AI/ML Enthusiast', angle: -2.45, radiusFactor: 0.95 },      // Upper left (~ -140 deg)
  { text: 'Software Developer', angle: 0.35, radiusFactor: 1.05 },      // Mid right (~ +20 deg)
  { text: 'Technology Explorer', angle: 2.50, radiusFactor: 0.92 },     // Lower left (~ +143 deg)
  { text: 'Random Researcher', angle: -0.55, radiusFactor: 1.00 },      // Upper right (~ -32 deg)
  { text: 'PC Building Hobbyist', angle: -2.85, radiusFactor: 1.05 },   // Mid left (~ -163 deg)
  { text: 'Curious Problem Solver', angle: 0.72, radiusFactor: 0.95 },  // Lower right (~ +41 deg)
  { text: 'Innovation Enthusiast', angle: -2.00, radiusFactor: 0.90 },  // Upper left-mid (~ -115 deg)
  { text: 'Hackathon Participant', angle: 1.25, radiusFactor: 0.95 },   // Lower right-mid (~ +72 deg)
  { text: 'Creative Thinker', angle: 2.95, radiusFactor: 1.05 },       // Lower left-mid (~ +169 deg)
  { text: 'Tech Experimenter', angle: -1.15, radiusFactor: 0.95 }       // Upper right-mid (~ -66 deg)
];

export class FlyingTraitsEngine {
  constructor() {
    this.layer = document.getElementById('traits-space-layer');
    this.container = document.getElementById('traits-container');
    this.items = [];
    this.isBuilt = false;

    this.init();
  }

  init() {
    if (!this.layer || !this.container) return;
    this.buildDOM();
  }

  buildDOM() {
    this.container.innerHTML = '';
    this.items = [];

    const total = ABOUT_TRAITS.length;
    // Map the 10 traits across the journey interval [0.065 to 0.230]
    const startP = 0.065;
    const endP = 0.230;
    const stepP = (endP - startP) / (total - 1);

    ABOUT_TRAITS.forEach((trait, index) => {
      const el = document.createElement('div');
      el.className = 'trait-item font-display';
      el.dataset.index = index;
      el.setAttribute('role', 'listitem');
      el.setAttribute('aria-label', trait.text);

      // Slanted pure text: NO borders, NO pill boxes, NO badge tags, NO spark icons
      el.innerHTML = `<span class="trait-text">${trait.text}</span>`;

      this.container.appendChild(el);

      this.items.push({
        el,
        meta: trait,
        centerProgress: startP + index * stepP,
        span: 0.046, // Scroll duration over which this trait travels from deep space past camera
        angle: trait.angle,
        radiusFactor: trait.radiusFactor || 1.0
      });
    });

    this.isBuilt = true;
  }

  /**
   * Update all 10 traits:
   * - Emerges from deep space near the central vanishing point
   * - Follows the radial trajectory vector of the star dots outward
   * - Slanted monumental typography with dynamic perspective scaling
   * - Cursor / gyro 3D parallax displacement and tilt
   */
  update(zoomProgress, camRotX = 0, camRotY = 0) {
    if (!this.isBuilt || !this.layer) return;

    // Active travel window
    if (zoomProgress < 0.040 || zoomProgress > 0.275) {
      this.layer.style.visibility = 'hidden';
      this.layer.style.opacity = '0';
      this.layer.style.pointerEvents = 'none';
      return;
    }

    this.layer.style.visibility = 'visible';

    // Layer-level subtle fade-in / fade-out at edges of the travel window
    let layerAlpha = 1.0;
    if (zoomProgress < 0.065) {
      layerAlpha = Math.min(1.0, (zoomProgress - 0.040) / 0.025);
    } else if (zoomProgress > 0.235) {
      layerAlpha = Math.max(0.0, 1.0 - (zoomProgress - 0.235) / 0.035);
    }
    this.layer.style.opacity = layerAlpha.toFixed(3);

    const isMobile = window.innerWidth <= 768;
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    // Base elliptical radius of the focal orbit
    const baseRadiusX = isMobile ? winW * 0.38 : winW * 0.44;
    const baseRadiusY = isMobile ? winH * 0.35 : winH * 0.38;

    this.items.forEach(item => {
      // Normalized distance from this trait's focal point:
      // u < 0: approaching from deep space vanishing point
      // u = 0: exactly in focal plane (monumental, clear, centered in quadrant)
      // u > 0: rushing past camera towards perimeter and out of view
      const u = (zoomProgress - item.centerProgress) / item.span;

      // Far out of visibility threshold
      if (u < -1.15 || u > 1.15) {
        item.el.style.display = 'none';
        return;
      }

      item.el.style.display = 'inline-block';

      let normR = 0;      // Radial distance from center vanishing point (0 -> 1 -> >2)
      let scale = 1.0;
      let opacity = 1.0;
      let blurPx = 0;
      let skewBonus = 0;

      if (u <= 0) {
        // Emerging from deep vanishing point towards camera (u: -1.15 -> 0.0)
        // t goes from 0.0 (deep space) to 1.0 (focal plane)
        const t = Math.max(0, 1.0 + u);
        const radialEase = Math.pow(t, 1.7); // Accelerates outward along star dot streak
        normR = 0.04 + radialEase * 0.96;    // Starts at 4% from center, expands to 100%

        // Exponential perspective scale
        scale = 0.12 + Math.pow(t, 1.5) * 0.98; // 0.12 -> 1.10
        opacity = Math.min(1.0, t * 1.4);

        // Cosmic depth blur dissolves as it enters focal plane
        blurPx = (1.0 - t) * 12.0;
        skewBonus = (1.0 - t) * -2;
      } else {
        // Rushing past camera into foreground (u: 0.0 -> 1.15)
        const t = Math.min(1.0, u);
        // Radial distance accelerates out past the screen edges
        normR = 1.00 + Math.pow(t, 1.4) * 1.35; // 1.00 -> 2.35

        // Scale zooms past the viewer
        scale = 1.10 + Math.pow(t, 1.6) * 2.30; // 1.10 -> 3.40
        opacity = Math.max(0, 1.0 - Math.pow(t, 1.2) * 1.5);

        // High-velocity motion blur as it whips past
        blurPx = t * 14.0;
        skewBonus = t * -4;
      }

      // Radial position along star trail vector
      const rX = baseRadiusX * item.radiusFactor;
      const rY = baseRadiusY * item.radiusFactor;
      const posX = Math.cos(item.angle) * (normR * rX);
      const posY = Math.sin(item.angle) * (normR * rY);

      // Depth-dependent cursor / gyro parallax displacement
      // Items deeper in space shift differently than items close to the camera
      const parallaxMult = isMobile ? 38 : (75 + normR * 65);
      const finalX = posX + camRotY * parallaxMult;
      const finalY = posY - camRotX * parallaxMult;

      // 3D camera tilt parallax (pitch & yaw)
      const rotX = -camRotX * (isMobile ? 12 : 20);
      const rotY = camRotY * (isMobile ? 14 : 24);

      // Slanted text angle: baseline -12deg skew plus dynamic velocity slant
      const skewX = -12 + skewBonus;

      const transformStr = `translate3d(calc(-50% + ${finalX.toFixed(1)}px), calc(-50% + ${finalY.toFixed(1)}px), 0) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) skewX(${skewX.toFixed(1)}deg) scale(${scale.toFixed(3)})`;

      item.el.style.transform = transformStr;
      item.el.style.opacity = (opacity * layerAlpha).toFixed(3);
      item.el.style.filter = blurPx > 0.4 ? `blur(${blurPx.toFixed(1)}px)` : 'none';
      item.el.style.zIndex = Math.round(50 + scale * 15);
    });
  }
}

export function initFlyingTraits() {
  const layer = document.getElementById('traits-space-layer');
  if (layer) {
    return new FlyingTraitsEngine();
  }
  return null;
}
