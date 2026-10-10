/**
 * MOBILE GYROSCOPE & DEVICE ORIENTATION PARALLAX ENGINE
 * Author: Sam Sunny Portfolio
 * 
 * Translates mobile hardware tilt (DeviceOrientation gamma & beta)
 * into smooth, low-pass filtered 3D parallax coordinates for mobile viewports.
 * Strictly active on mobile/touch devices; completely idle on desktop.
 */

export class GyroParallaxManager {
  constructor() {
    this.isActive = false;
    this.hasSensor = false;
    this.isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    // Calibrated resting viewing angles (handheld phone tilt ~35-40 deg from vertical)
    this.RESTING_BETA = 38.0;
    this.BETA_RANGE = 35.0;   // +/- 35 deg pitch range
    this.GAMMA_RANGE = 30.0;  // +/- 30 deg roll/yaw range

    // Target and smoothed coordinates (-1.0 to +1.0)
    this.targetX = 0;
    this.targetY = 0;
    this.currentX = 0;
    this.currentY = 0;

    // Smoothing factor (exponential moving average / lerp)
    this.smoothing = 0.12;

    this.onDeviceOrientation = this.onDeviceOrientation.bind(this);
    this.requestPermissionOnFirstTouch = this.requestPermissionOnFirstTouch.bind(this);
    this.updateLoop = this.updateLoop.bind(this);

    // State exposed globally on window.AppState
    if (!window.AppState) window.AppState = {};
    window.AppState.gyro = {
      x: 0,
      y: 0,
      active: false,
      hasSensor: false
    };

    if (this.isTouchDevice) {
      this.init();
    }
  }

  init() {
    // Check if DeviceOrientation requires permission (iOS 13+)
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      // Must be requested upon a user gesture (first touch/tap)
      window.addEventListener('touchstart', this.requestPermissionOnFirstTouch, { once: true, passive: true });
      window.addEventListener('click', this.requestPermissionOnFirstTouch, { once: true, passive: true });
    } else if (typeof window.DeviceOrientationEvent !== 'undefined') {
      // Standard browsers (Android Chrome, etc.)
      this.attachOrientationListener();
    }

    // Start 60fps smoothing RAF loop
    requestAnimationFrame(this.updateLoop);
  }

  requestPermissionOnFirstTouch() {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(response => {
          if (response === 'granted') {
            this.attachOrientationListener();
          }
        })
        .catch(err => {
          console.warn('[Gyro] iOS DeviceOrientation permission error or denied:', err);
        });
    }
  }

  attachOrientationListener() {
    window.addEventListener('deviceorientation', this.onDeviceOrientation, { passive: true });
  }

  onDeviceOrientation(e) {
    if (e.gamma === null || e.beta === null) return;

    this.hasSensor = true;
    this.isActive = true;
    window.AppState.gyro.hasSensor = true;
    window.AppState.gyro.active = true;

    // Gamma: Left-to-right roll (-90 to +90 deg)
    // Clamp to +/- GAMMA_RANGE and normalize to -1.0 -> +1.0
    const clampedGamma = Math.max(-this.GAMMA_RANGE, Math.min(this.GAMMA_RANGE, e.gamma));
    this.targetX = clampedGamma / this.GAMMA_RANGE;

    // Beta: Front-to-back pitch (-180 to +180 deg)
    // Normalize relative to natural resting handheld viewing angle (~38 deg)
    const deltaBeta = e.beta - this.RESTING_BETA;
    const clampedBeta = Math.max(-this.BETA_RANGE, Math.min(this.BETA_RANGE, deltaBeta));
    this.targetY = clampedBeta / this.BETA_RANGE;
  }

  updateLoop() {
    if (this.isActive) {
      // Apply low-pass filter (lerp) to cancel sensor noise/micro-jitter
      this.currentX += (this.targetX - this.currentX) * this.smoothing;
      this.currentY += (this.targetY - this.currentY) * this.smoothing;

      window.AppState.gyro.x = this.currentX;
      window.AppState.gyro.y = this.currentY;
    }

    requestAnimationFrame(this.updateLoop);
  }
}

export function initGyroParallax() {
  return new GyroParallaxManager();
}
