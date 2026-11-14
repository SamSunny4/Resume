/**
 * LightPillar — Vanilla ES6 Implementation
 * Based on React Bits <LightPillar /> (WebGL2 Raymarching Engine)
 * Features:
 *   - 3D Volumetric raymarched twisted light strands
 *   - Bicubic filtered composite pass with bloom halo and film grain noise
 *   - Interactive cursor leaning, spinning, and click pulses
 *   - Dynamic intro ignition animation
 *   - Automatic pausing when scrolled out of viewport (zero GPU overhead)
 */

const VERTEX = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const MARCH = `#version 300 es
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uTarget;
uniform vec2 uRot;
uniform vec2 uPillarRot;
uniform vec2 uWave;
uniform float uShift;
uniform float uPillarWidth;
uniform float uPillarHeight;
uniform int uDetail;
uniform vec3 uTopColor;
uniform vec3 uBottomColor;
uniform float uGlowAmount;
uniform float uWidthNorm;
out vec4 outColor;

void main() {
  vec2 vUv = gl_FragCoord.xy / uTarget;
  vec2 uv = (vUv * 2.0 - 1.0) * vec2(uResolution.x / uResolution.y, 1.0);
  uv.x -= uShift;
  uv = vec2(uPillarRot.x * uv.x - uPillarRot.y * uv.y, uPillarRot.y * uv.x + uPillarRot.x * uv.y);

  vec3 ro = vec3(0.0, 0.0, -10.0);
  vec3 rd = normalize(vec3(uv, 1.0));
  vec3 origin = vec3(uRot.x * ro.x - uRot.y * ro.z, ro.y, uRot.y * ro.x + uRot.x * ro.z);
  vec3 dir = vec3(uRot.x * rd.x - uRot.y * rd.z, rd.y, uRot.y * rd.x + uRot.x * rd.z);

  float glow = 0.0;
  float lift = 0.0;
  float t = 0.1;
  for (int i = 0; i < 80; i++) {
    vec3 p = origin + dir * t;
    vec3 q = p;
    q.y = p.y * uPillarHeight + uTime;

    float freq = 1.0;
    float amp = 1.0;
    for (int j = 0; j < 6; j++) {
      if (j >= uDetail) break;
      q.xz = vec2(uWave.y * q.x - uWave.x * q.z, uWave.x * q.x + uWave.y * q.z);
      q += cos(q.zxy * freq - uTime * float(j) * 2.0) * amp;
      freq *= 2.0;
      amp *= 0.5;
    }

    float d = length(cos(q.xz)) - 0.2;
    float bound = length(p.xz) - uPillarWidth;
    float h = max(4.0 - abs(d - bound), 0.0);
    d = max(d, bound) + h * h * 0.015625;
    d = abs(d) * 0.15 + 0.01;

    float weight = 1.0 / d;
    glow += weight;
    lift += clamp((15.0 - p.y) / 30.0, 0.0, 1.0) * weight;

    t += d;
    if (t > 50.0) break;
  }

  vec3 col = tanh((uBottomColor * glow + (uTopColor - uBottomColor) * lift) * uGlowAmount / uWidthNorm);
  float peak = max(col.r, max(col.g, col.b));
  outColor = vec4(col, smoothstep(0.62, 1.0, peak));
}`;

const COMPOSITE = `#version 300 es
precision highp float;
uniform sampler2D uField;
uniform vec2 uFieldSize;
uniform vec2 uView;
uniform vec2 uAspect;
uniform vec2 uPillarRot;
uniform float uShift;
uniform float uIntensity;
uniform float uNoiseIntensity;
uniform float uLightMode;
uniform float uNeutral;
uniform float uBloom;
uniform float uFade;
uniform float uReveal;
uniform float uFlare;
uniform vec4 uPulses[3];
out vec4 outColor;

vec3 tap(vec2 uv) {
  return textureLod(uField, uv, 0.0).rgb;
}

vec3 bicubic(vec2 uv) {
  vec2 position = uv * uFieldSize;
  vec2 center = floor(position - 0.5) + 0.5;
  vec2 f = position - center;
  vec2 w0 = f * (-0.5 + f * (1.0 - 0.5 * f));
  vec2 w1 = 1.0 + f * f * (-2.5 + 1.5 * f);
  vec2 w2 = f * (0.5 + f * (2.0 - 1.5 * f));
  vec2 w3 = f * f * (-0.5 + 0.5 * f);
  vec2 w12 = w1 + w2;
  vec2 t0 = (center - 1.0) / uFieldSize;
  vec2 t3 = (center + 2.0) / uFieldSize;
  vec2 t12 = (center + w2 / w12) / uFieldSize;
  vec3 result = vec3(0.0);
  result += tap(vec2(t0.x, t0.y)) * w0.x * w0.y;
  result += tap(vec2(t12.x, t0.y)) * w12.x * w0.y;
  result += tap(vec2(t3.x, t0.y)) * w3.x * w0.y;
  result += tap(vec2(t0.x, t12.y)) * w0.x * w12.y;
  result += tap(vec2(t12.x, t12.y)) * w12.x * w12.y;
  result += tap(vec2(t3.x, t12.y)) * w3.x * w12.y;
  result += tap(vec2(t0.x, t3.y)) * w0.x * w3.y;
  result += tap(vec2(t12.x, t3.y)) * w12.x * w3.y;
  result += tap(vec2(t3.x, t3.y)) * w3.x * w3.y;
  return max(result, 0.0);
}

float smootherstep01(float t) {
  t = clamp(t, 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uView;
  vec3 col = bicubic(uv);

  if (uBloom > 0.0) {
    vec4 l3 = textureLod(uField, uv, 3.0);
    vec4 l4 = textureLod(uField, uv, 4.0);
    vec4 l5 = textureLod(uField, uv, 5.0);
    vec4 l6 = textureLod(uField, uv, 6.0);
    float halo = l3.a * 0.3 + l4.a * 0.3 + l5.a * 0.25 + l6.a * 0.15;
    vec3 tint = l4.rgb + l5.rgb;
    tint /= max(max(tint.r, max(tint.g, tint.b)), 0.001);
    vec3 glow = clamp(tint * halo * uBloom * 1.1, 0.0, 1.0);
    col = 1.0 - (1.0 - clamp(col, 0.0, 1.0)) * (1.0 - glow);
  }

  vec2 p = (uv * 2.0 - 1.0) * uAspect;
  p.x -= uShift;
  float axis = uPillarRot.y * p.x + uPillarRot.x * p.y;

  float boost = 0.0;
  for (int i = 0; i < 3; i++) {
    vec4 pulse = uPulses[i];
    if (pulse.y <= 0.0) continue;
    float offset = (axis - pulse.x) / 0.24;
    boost += exp(-offset * offset) * pulse.y;
  }
  float head = (axis - uReveal + 0.35) / 0.3;
  boost += exp(-head * head) * uFlare;
  float lum = max(col.r, max(col.g, col.b));
  col += mix(col, vec3(lum), 0.45) * boost * 1.8;

  col -= fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) / 15.0 * uNoiseIntensity;
  vec3 result = clamp(col * uIntensity, 0.0, 1.0);

  float mask = smoothstep(uReveal, uReveal - 0.9, axis);
  float edge = uFade * 0.5;
  if (edge > 0.0) {
    mask *= smootherstep01(uv.x / edge) * smootherstep01((1.0 - uv.x) / edge);
    mask *= smootherstep01(uv.y / edge) * smootherstep01((1.0 - uv.y) / edge);
  }

  if (uLightMode > 0.5) {
    float energy = max(result.r, max(result.g, result.b));
    vec3 hue = result / max(energy, 0.001);
    float coverage = smoothstep(0.025, 0.95, energy);
    hue = pow(clamp(hue, 0.0, 1.0), vec3(1.25));
    vec3 tinted = mix(vec3(1.0), hue, coverage * 0.94 * mask);
    vec3 ink = vec3(1.0) - pow(result, vec3(1.6)) * 0.85 * mask;
    result = mix(tinted, ink, uNeutral);
  } else {
    result *= mask;
  }
  outColor = vec4(result, 1.0);
}`;

const QUALITY = { low: 0.35, medium: 0.5, high: 0.6 };
const INTRO_SECONDS = 2.1;
const PULSE_LIFE = 1.4;
const MIN_SCALE = 0.25;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const easeOut = t => 1 - Math.pow(1 - t, 3);
const ease = t => t * t * t * (t * (t * 6 - 15) + 10);

const compile = (gl, type, source) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  console.warn('[LightPillar] Shader compile error:', gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
};

const link = (gl, fragmentSource) => {
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.bindAttribLocation(program, 0, 'aPosition');
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('[LightPillar] Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  const uniforms = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(program, i);
    if (info) uniforms[info.name.replace(/\[0\]$/, '')] = gl.getUniformLocation(program, info.name);
  }
  return { program, uniforms };
};

export class LightPillar {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) {
      console.warn('[LightPillar] Container element not found.');
      return;
    }

    this.settings = {
      topColor: String(options.topColor || '#008a00'),
      bottomColor: String(options.bottomColor || '#f4ff7b'),
      intensity: Math.max(0, options.intensity ?? 1.0),
      rotationSpeed: options.rotationSpeed ?? 0.3,
      flow: options.flow ?? 1.0,
      interactive: options.interactive ?? true,
      clickPulse: options.clickPulse ?? true,
      glowAmount: Math.max(0, options.glowAmount ?? 0.002),
      bloom: Math.max(0, options.bloom ?? 0.5),
      pillarWidth: Math.max(0.05, options.pillarWidth ?? 3.0),
      pillarHeight: options.pillarHeight ?? 0.4,
      pillarRotation: options.pillarRotation ?? 25,
      twist: options.twist ?? 0.4,
      detail: Math.round(clamp(options.detail ?? 4, 1, 6)),
      noiseIntensity: Math.max(0, options.noiseIntensity ?? 0.5),
      fade: clamp(options.fade ?? 0, 0, 1),
      intro: options.intro ?? true,
      scale: clamp(options.resolution ?? QUALITY[options.quality || 'high'] ?? QUALITY.high, MIN_SCALE, 2),
      mixBlendMode: options.mixBlendMode || 'screen',
      lightMode: options.lightMode ?? false,
      paused: options.paused ?? false
    };

    this.canvas = null;
    this.gl = null;
    this.raf = 0;
    this.visible = true;
    this.isDestroyed = false;

    this.init();
  }

  init() {
    this.container.classList.add('light-pillar-container');
    if (this.settings.mixBlendMode) {
      this.container.style.mixBlendMode = this.settings.mixBlendMode;
    }

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'light-pillar-canvas';
    this.canvas.setAttribute('aria-hidden', 'true');
    this.container.appendChild(this.canvas);

    const gl = this.canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance'
    });

    if (!gl) {
      console.warn('[LightPillar] WebGL2 not supported on this device/browser.');
      return;
    }
    this.gl = gl;

    this.floatTargets = !!gl.getExtension('EXT_color_buffer_float');
    this.marchProgram = link(gl, MARCH);
    this.compositeProgram = link(gl, COMPOSITE);
    if (!this.marchProgram || !this.compositeProgram) return;

    this.buffer = gl.createBuffer();
    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    this.texture = null;
    this.framebuffer = gl.createFramebuffer();
    this.target = { width: 0, height: 0 };

    this.probe = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
    this.colorCache = new Map();

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    this.reduceMotion = reduce;
    this.view = { width: 1, height: 1, ratio: 1 };
    this.pointer = { x: 0, y: 0, inside: false };
    this.pulses = [];
    this.pulseData = new Float32Array(12);
    this.state = {
      clock: 0,
      intro: this.settings.intro && !reduce ? 0 : 1,
      touch: 0,
      spin: 0,
      lean: 0,
      shift: 0,
      governor: 1,
      slow: 0,
      quick: 0
    };
    this.last = 0;

    this.bindEvents();
    this.resize();
    this.wake();
  }

  toRgb(value) {
    if (this.colorCache.has(value)) return this.colorCache.get(value);
    let rgb = [1, 1, 1];
    if (this.probe) {
      this.probe.clearRect(0, 0, 1, 1);
      this.probe.fillStyle = '#ffffff';
      this.probe.fillStyle = value;
      this.probe.fillRect(0, 0, 1, 1);
      const [r, g, b] = this.probe.getImageData(0, 0, 1, 1).data;
      rgb = [r / 255, g / 255, b / 255];
    }
    this.colorCache.set(value, rgb);
    return rgb;
  }

  sizeTarget(width, height) {
    const gl = this.gl;
    if (this.target.width === width && this.target.height === height) return;
    this.target.width = width;
    this.target.height = height;
    if (this.texture) gl.deleteTexture(this.texture);
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    const levels = Math.floor(Math.log2(Math.max(width, height))) + 1;
    gl.texStorage2D(gl.TEXTURE_2D, levels, this.floatTargets ? gl.RGBA16F : gl.RGBA8, width, height);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
  }

  axisAt(x, y, angle) {
    const aspect = this.view.width / this.view.height;
    const px = ((x / this.view.width) * 2 - 1) * aspect - this.state.shift;
    const py = 1 - (y / this.view.height) * 2;
    return Math.sin(angle) * px + Math.cos(angle) * py;
  }

  render() {
    const gl = this.gl;
    if (!gl) return;
    const s = this.settings;
    const scale = Math.max(MIN_SCALE, s.scale * this.state.governor);
    const fieldWidth = Math.max(1, Math.round(this.view.width * scale));
    const fieldHeight = Math.max(1, Math.round(this.view.height * scale));
    this.sizeTarget(fieldWidth, fieldHeight);

    const grow = ease(this.state.intro);
    const rise = easeOut(this.state.intro);
    const tilt = ((s.pillarRotation + this.state.lean) * Math.PI) / 180;
    const angle = this.state.clock * 0.3 + this.state.spin;
    const width = s.pillarWidth * (0.3 + 0.7 * grow);

    gl.bindVertexArray(this.vao);
    const m = this.marchProgram.uniforms;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.viewport(0, 0, this.target.width, this.target.height);
    gl.useProgram(this.marchProgram.program);
    gl.uniform1f(m.uTime, this.state.clock * s.flow);
    gl.uniform2f(m.uResolution, this.view.width, this.view.height);
    gl.uniform2f(m.uTarget, this.target.width, this.target.height);
    gl.uniform2f(m.uRot, Math.cos(angle), Math.sin(angle));
    gl.uniform2f(m.uPillarRot, Math.cos(tilt), Math.sin(tilt));
    gl.uniform2f(m.uWave, Math.sin(s.twist), Math.cos(s.twist));
    gl.uniform1f(m.uShift, this.state.shift);
    gl.uniform1f(m.uPillarWidth, width);
    gl.uniform1f(m.uPillarHeight, s.pillarHeight);
    gl.uniform1i(m.uDetail, s.detail);
    gl.uniform3fv(m.uTopColor, this.toRgb(s.topColor));
    gl.uniform3fv(m.uBottomColor, this.toRgb(s.bottomColor));
    gl.uniform1f(m.uGlowAmount, s.glowAmount);
    gl.uniform1f(m.uWidthNorm, width / 3);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    if (s.bloom > 0) gl.generateMipmap(gl.TEXTURE_2D);

    this.pulseData.fill(0);
    this.pulses.forEach((pulse, index) => {
      this.pulseData.set([pulse.axis + pulse.age * 1.7, Math.exp(-pulse.age / (PULSE_LIFE * 0.45)), 0, 0], index * 4);
    });

    const c = this.compositeProgram.uniforms;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.useProgram(this.compositeProgram.program);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(c.uField, 0);
    gl.uniform2f(c.uFieldSize, this.target.width, this.target.height);
    gl.uniform2f(c.uView, this.canvas.width, this.canvas.height);
    gl.uniform2f(c.uAspect, this.view.width / this.view.height, 1);
    gl.uniform2f(c.uPillarRot, Math.cos(tilt), Math.sin(tilt));
    gl.uniform1f(c.uShift, this.state.shift);
    gl.uniform1f(c.uIntensity, s.intensity * (0.15 + 0.85 * rise) * (1 + 0.12 * this.state.touch));
    gl.uniform1f(c.uNoiseIntensity, s.noiseIntensity);
    gl.uniform1f(c.uLightMode, s.lightMode ? 1 : 0);
    const chroma = rgb => Math.max(...rgb) - Math.min(...rgb);
    const vivid = Math.max(chroma(this.toRgb(s.topColor)), chroma(this.toRgb(s.bottomColor)));
    gl.uniform1f(c.uNeutral, 1 - clamp((vivid - 0.08) / 0.12, 0, 1));
    gl.uniform1f(c.uBloom, s.bloom);
    gl.uniform1f(c.uFade, s.fade);
    const span = this.view.width / this.view.height + 1.2;
    gl.uniform1f(c.uReveal, this.state.intro >= 1 ? 1e4 : -span + rise * (span * 2 + 1.2));
    gl.uniform1f(c.uFlare, this.state.intro >= 1 ? 0 : (1 - rise) * 1.3 * Math.min(1, this.state.intro * 8));
    gl.uniform4fv(c.uPulses, this.pulseData);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  tune(dt) {
    if (dt > 1 / 40) {
      this.state.slow += 1;
      this.state.quick = 0;
    } else if (dt < 1 / 55) {
      this.state.quick += 1;
      this.state.slow = 0;
    }
    if (this.state.slow > 20) {
      this.state.governor = Math.max(0.5, this.state.governor * 0.85);
      this.state.slow = 0;
    } else if (this.state.quick > 180 && this.state.governor < 1) {
      this.state.governor = Math.min(1, this.state.governor * 1.1);
      this.state.quick = 0;
    }
  }

  frame = (now) => {
    this.raf = 0;
    if (!this.visible || document.hidden || this.isDestroyed) return;
    const s = this.settings;
    const dt = this.last ? Math.min(0.05, (now - this.last) / 1000) : 1 / 60;
    if (this.last) this.tune((now - this.last) / 1000);
    this.last = now;

    const running = !s.paused && !this.reduceMotion && s.rotationSpeed !== 0;
    if (running) this.state.clock += dt * 0.96 * s.rotationSpeed;
    if (!s.intro || this.reduceMotion) this.state.intro = 1;
    else if (this.state.intro < 1) this.state.intro = Math.min(1, this.state.intro + dt / INTRO_SECONDS);

    const engaged = s.interactive && this.pointer.inside && !this.reduceMotion;
    const aim = engaged ? this.pointer.x / this.view.width - 0.5 : 0;
    const follow = 1 - Math.exp(-dt * 2.4);
    this.state.spin += (aim * 1.4 - this.state.spin) * follow;
    this.state.lean += (aim * 9 - this.state.lean) * follow;
    this.state.shift += (aim * 0.35 * (this.view.width / this.view.height) - this.state.shift) * follow;
    this.state.touch += ((engaged ? 1 : 0) - this.state.touch) * (1 - Math.exp(-dt * 3));

    for (let i = this.pulses.length - 1; i >= 0; i--) {
      this.pulses[i].age += dt;
      if (this.pulses[i].age > PULSE_LIFE * 2.2) this.pulses.splice(i, 1);
    }

    this.render();

    const settling =
      this.state.intro < 1 ||
      this.pulses.length > 0 ||
      Math.abs(aim * 1.4 - this.state.spin) > 0.0005 ||
      Math.abs((engaged ? 1 : 0) - this.state.touch) > 0.002;

    if (running || settling) this.raf = requestAnimationFrame(this.frame);
    else this.last = 0;
  };

  wake() {
    if (!this.raf && this.visible && !document.hidden && !this.isDestroyed) {
      this.raf = requestAnimationFrame(this.frame);
    }
  }

  resize() {
    if (!this.container || !this.canvas) return;
    const width = Math.max(1, this.container.clientWidth);
    const height = Math.max(1, this.container.clientHeight);
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    this.view.width = width;
    this.view.height = height;
    this.view.ratio = ratio;
    this.canvas.width = Math.max(1, Math.round(width * ratio));
    this.canvas.height = Math.max(1, Math.round(height * ratio));
    if (!this.raf) this.render();
    this.wake();
  }

  locate(event) {
    const rect = this.container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x, y, inside: x >= 0 && y >= 0 && x <= rect.width && y <= rect.height };
  }

  bindEvents() {
    this.onPointerMove = (event) => {
      const point = this.locate(event);
      this.pointer.x = point.x;
      this.pointer.y = point.y;
      this.pointer.inside = point.inside;
      this.wake();
    };

    this.onPointerDown = (event) => {
      const s = this.settings;
      if (!s.clickPulse || this.reduceMotion) return;
      const point = this.locate(event);
      if (!point.inside) return;
      const tilt = ((s.pillarRotation + this.state.lean) * Math.PI) / 180;
      this.pulses.push({ axis: this.axisAt(point.x, point.y, tilt), age: 0 });
      if (this.pulses.length > 3) this.pulses.shift();
      this.wake();
    };

    this.onPointerLeave = () => {
      this.pointer.inside = false;
      this.wake();
    };

    this.onVisibility = () => {
      this.last = 0;
      this.wake();
    };

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container);

    this.intersectionObserver = new IntersectionObserver((entries) => {
      this.visible = entries.some(entry => entry.isIntersecting);
      if (this.visible) {
        this.last = 0;
        this.wake();
      }
    });
    this.intersectionObserver.observe(this.container);

    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    window.addEventListener('pointerdown', this.onPointerDown, { passive: true });
    document.documentElement.addEventListener('pointerleave', this.onPointerLeave);
    document.addEventListener('visibilitychange', this.onVisibility);
  }

  destroy() {
    this.isDestroyed = true;
    if (this.raf) cancelAnimationFrame(this.raf);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerdown', this.onPointerDown);
    document.documentElement.removeEventListener('pointerleave', this.onPointerLeave);
    document.removeEventListener('visibilitychange', this.onVisibility);
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.intersectionObserver) this.intersectionObserver.disconnect();

    const gl = this.gl;
    if (gl) {
      if (this.texture) gl.deleteTexture(this.texture);
      if (this.framebuffer) gl.deleteFramebuffer(this.framebuffer);
      if (this.marchProgram?.program) gl.deleteProgram(this.marchProgram.program);
      if (this.compositeProgram?.program) gl.deleteProgram(this.compositeProgram.program);
      if (this.buffer) gl.deleteBuffer(this.buffer);
      if (this.vao) gl.deleteVertexArray(this.vao);
      if (!gl.isContextLost()) gl.getExtension('WEBGL_lose_context')?.loseContext();
    }
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

export function initLightPillar(container, options = {}) {
  return new LightPillar(container, options);
}

