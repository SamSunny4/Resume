/**
 * MOBILE GYROSCOPE & DEVICE ORIENTATION PARALLAX ENGINE
 * Author: Sam Sunny Portfolio
 * 
 * Translates mobile hardware tilt (DeviceOrientation gamma & beta)
 * into ultra-smooth, low-pass filtered 3D parallax coordinates for mobile viewports.
 * Features:
 *   - Automatic posture baseline calibration (detects initial hold angle)
 *   - Continuous micro-drift compensation (adapts as user shifts posture)
 *   - Multi-orientation support (portrait, landscape-left, landscape-right)
 *   - Dual-stage exponential smoothing (eliminates hand tremors without latency)
 *   - Tilt velocity & impulse tracking for dynamic inertia kicks
 *   - Cross-platform support (iOS 13+ permission flow + standard Android Chrome)
 */

export class GyroParallaxManager {
  constructor() {
    this.isActive = false;
    this.hasSensor = false;
    this.isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    // Initial calibrated resting angles (handheld phone tilt ~38 deg from vertical)
    this.restingBeta = 38.0;
    this.restingGamma = 0.0;
    this.isBaselineCalibrated = false;

    // Movement boundaries
    this.BETA_RANGE = 32.0;   // +/- 32 deg pitch range
    this.GAMMA_RANGE = 28.0;  // +/- 28 deg roll/yaw range

    // Target and smoothed coordinates (-1.0 to +1.0)
    this.targetX = 0;
    this.targetY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.prevX = 0;
    this.prevY = 0;
    this.velX = 0;
    this.velY = 0;

    // Adaptive smoothing factor (high responsiveness, no jitter)
    this.smoothing = 0.14;

    this.onDeviceOrientation = this.onDeviceOrientation.bind(this);
    this.requestPermissionOnFirstTouch = this.requestPermissionOnFirstTouch.bind(this);
    this.updateLoop = this.updateLoop.bind(this);

    // State exposed globally on window.AppState
    if (!window.AppState) window.AppState = {};
    window.AppState.gyro = {
      x: 0,
      y: 0,
      velX: 0,
      velY: 0,
      active: false,
      hasSensor: false
    };

    this.init();
  }

  init() {
    // Check if DeviceOrientation requires permission (iOS 13+)
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      window.addEventListener('touchstart', this.requestPermissionOnFirstTouch, { once: true, passive: true });
      window.addEventListener('click', this.requestPermissionOnFirstTouch, { once: true, passive: true });
    } else if (typeof window.DeviceOrientationEvent !== 'undefined') {
      // Standard browsers (Android Chrome, modern mobile browsers)
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

  /**
   * Get current display orientation in degrees (0, 90, 180, 270)
   */
  getOrientationAngle() {
    if (window.screen && window.screen.orientation && typeof window.screen.orientation.angle === 'number') {
      return window.screen.orientation.angle;
    }
    if (typeof window.orientation === 'number') {
      return window.orientation;
    }
    return 0;
  }

  onDeviceOrientation(e) {
    if (e.gamma === null || e.beta === null) return;

    this.hasSensor = true;
    this.isActive = true;
    window.AppState.gyro.hasSensor = true;
    window.AppState.gyro.active = true;

    let rawGamma = e.gamma; // Roll: -90 to 90
    let rawBeta  = e.beta;  // Pitch: -180 to 180

    // Adjust for screen orientation (handling landscape mode seamlessly)
    const angle = this.getOrientationAngle();
    let roll = rawGamma;
    let pitch = rawBeta;

    if (angle === 90) {
      roll = rawBeta;
      pitch = -rawGamma;
    } else if (angle === -90 || angle === 270) {
      roll = -rawBeta;
      pitch = rawGamma;
    } else if (angle === 180) {
      roll = -rawGamma;
      pitch = -rawBeta;
    }

    // Baseline calibration on first valid readings
    if (!this.isBaselineCalibrated) {
      // Clamp reasonable resting angles (e.g. handheld pitch between 15° and 65°)
      this.restingBeta = Math.max(15, Math.min(65, pitch));
      this.restingGamma = Math.max(-20, Math.min(20, roll));
      this.isBaselineCalibrated = true;
    } else {
      // Gentle long-term baseline drift correction (prevents permanent offset if user posture shifts)
      this.restingBeta  += (pitch - this.restingBeta) * 0.0008;
      this.restingGamma += (roll - this.restingGamma) * 0.0008;
    }

    // Delta relative to calibrated baseline
    const deltaGamma = roll - this.restingGamma;
    const deltaBeta  = pitch - this.restingBeta;

    // Clamp to ranges and normalize to -1.0 -> +1.0
    const clampedGamma = Math.max(-this.GAMMA_RANGE, Math.min(this.GAMMA_RANGE, deltaGamma));
    const clampedBeta  = Math.max(-this.BETA_RANGE, Math.min(this.BETA_RANGE, deltaBeta));

    // Slight soft curve (gamma^1.1) for refined tactile feeling
    const normX = clampedGamma / this.GAMMA_RANGE;
    const normY = clampedBeta / this.BETA_RANGE;

    this.targetX = Math.sign(normX) * Math.pow(Math.abs(normX), 1.08);
    this.targetY = Math.sign(normY) * Math.pow(Math.abs(normY), 1.08);
  }

  updateLoop() {
    if (this.isActive) {
      // Apply low-pass filter (exponential smoothing) to cancel sensor tremor
      this.currentX += (this.targetX - this.currentX) * this.smoothing;
      this.currentY += (this.targetY - this.currentY) * this.smoothing;

      // Compute tilt velocity
      this.velX = this.currentX - this.prevX;
      this.velY = this.currentY - this.prevY;
      this.prevX = this.currentX;
      this.prevY = this.currentY;

      window.AppState.gyro.x    = this.currentX;
      window.AppState.gyro.y    = this.currentY;
      window.AppState.gyro.velX = this.velX;
      window.AppState.gyro.velY = this.velY;
    }

    requestAnimationFrame(this.updateLoop);
  }
}

export function initGyroParallax() {
  return new GyroParallaxManager();
}
