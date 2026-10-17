/**
 * CircularCarousel (Vanilla ES6 Implementation)
 * Directly based on React Bits <CircularCarousel /> (JavaScript + CSS)
 * Full 3D cylindrical multi-tile card geometry, inertia physics, autoplay,
 * captions with odometer reel digits, and keyboard/touch/mouse/wheel control.
 */

export const PRESETS = {
  cylinder: {
    axis: 'y',
    tilt: -13,
    roll: -5,
    cardRoll: -3,
    perspective: 1600,
    curve: 0.32,
    spread: 1.15,
    inward: false,
    billboard: false,
    backfaces: true,
    window: 0
  },
  orbit: {
    axis: 'y',
    tilt: -16,
    perspective: 1500,
    curve: 0,
    spread: 1.45,
    inward: false,
    billboard: true,
    backfaces: false,
    window: 0
  },
  wheel: {
    axis: 'x',
    tilt: 0,
    perspective: 1800,
    curve: 0,
    spread: 1,
    inward: false,
    billboard: false,
    backfaces: true,
    window: 1.7
  },
  panorama: {
    axis: 'y',
    tilt: 0,
    perspective: 0,
    curve: 1,
    spread: 1,
    inward: true,
    billboard: false,
    backfaces: false,
    window: 0
  }
};

const INTRO_LENGTH = { assemble: 1500, rise: 1400, spin: 1800, none: 0 };
const TILES = 16;
const OVERLAP = 2.5;
const DRAG_THRESHOLD = 5;
const SPRING = 118;
const SETTLE_SPEED = 9;
const CAPTION_SPACE = 76;
const SWAP_LENGTH = 700;
const SWAP_SPREAD = 420;
const TO_RAD = Math.PI / 180;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const wrap = degrees => ((((degrees + 180) % 360) + 360) % 360) - 180;
const easeOut = t => 1 - Math.pow(1 - t, 4);
const easeOutQuint = t => 1 - Math.pow(1 - t, 5);

const rotateX = (p, degrees) => {
  const r = degrees * TO_RAD;
  const c = Math.cos(r);
  const s = Math.sin(r);
  return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
};

const rotateY = (p, degrees) => {
  const r = degrees * TO_RAD;
  const c = Math.cos(r);
  const s = Math.sin(r);
  return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
};

export class CircularCarousel {
  constructor(mountElement, options = {}) {
    this.mount = typeof mountElement === 'string' ? document.querySelector(mountElement) : mountElement;
    if (!this.mount) {
      throw new Error('[CircularCarousel] mount element not found');
    }

    this.options = {
      items: [],
      preset: 'cylinder',
      intro: 'rise',
      cardWidth: 260,
      aspectRatio: 1.4,
      gap: 28,
      curve: undefined,
      tilt: undefined,
      roll: undefined,
      cardRoll: undefined,
      perspective: undefined,
      autoplay: 'drift',
      speed: 12,
      interval: 3.5,
      direction: 'left',
      draggable: true,
      momentum: 0.6,
      snap: true,
      pauseOnHover: true,
      focusOnClick: true,
      parallax: 0.35,
      stretch: 0.5,
      depthFade: 0.55,
      fadeColor: '#050907',
      innerShade: 0.65,
      cornerRadius: 12,
      captions: true,
      onChange: null,
      onItemClick: null,
      className: '',
      ...options
    };

    this.list = this.options.items && this.options.items.length ? [...this.options.items] : [];
    this.leaving = null;
    this.active = 0;
    this.ready = false;
    this.dragging = false;

    this.state = {
      angle: 0,
      velocity: 0,
      target: null,
      dir: 0,
      press: null,
      drag: false,
      hover: false,
      pointer: { inside: false, x: 0, y: 0 },
      yaw: 0,
      pitch: 0,
      intro: null,
      introDone: false,
      holdUntil: 0,
      stepAt: 0,
      suppressClick: false,
      wheelTimer: 0,
      fit: 1,
      shift: 0,
      drop: 0,
      last: 0
    };

    // Reduced motion preference
    this.reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches || false;

    // DOM references
    this.root = null;
    this.stage = null;
    this.camera = null;
    this.ring = null;
    this.cardElements = [];
    this.captionWrap = null;
    this.captionTitle = null;
    this.captionSubtitle = null;
    this.digitReels = [];
    this.liveRegion = null;

    // Loop & observer handles
    this.rafId = 0;
    this.isVisible = true;
    this.resizeObserver = null;
    this.intersectionObserver = null;
    this.swapTimeout = null;

    // Bound handlers
    this.frame = this.frame.bind(this);
    this.wake = this.wake.bind(this);
    this.measure = this.measure.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.releasePointer = this.releasePointer.bind(this);
    this.onPointerEnter = this.onPointerEnter.bind(this);
    this.onPointerLeave = this.onPointerLeave.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.onVisibilityChange = this.onVisibilityChange.bind(this);

    this.init();
  }

  get settings() {
    const presetKey = PRESETS[this.options.preset] ? this.options.preset : 'cylinder';
    const layout = PRESETS[presetKey];
    const count = Math.max(this.list.length, 1);
    const step = 360 / count;
    const axis = layout.axis;
    const tiltValue = this.options.tilt ?? layout.tilt;
    const rollValue = this.options.roll ?? layout.roll ?? 0;
    const cardRollValue = this.options.cardRoll ?? layout.cardRoll ?? 0;
    const curveValue = layout.billboard ? 0 : clamp(this.options.curve ?? layout.curve, 0, 1);

    const cardW = Math.max(40, this.options.cardWidth);
    const cardH = cardW / clamp(this.options.aspectRatio, 0.2, 5);
    const along = axis === 'x' ? cardH : cardW;

    const n = Math.max(count, 3);
    const pitch = (along + this.options.gap) * layout.spread;
    const chord = pitch / (2 * Math.sin(Math.PI / n));
    const arc = (n * pitch) / (2 * Math.PI);
    const radius = Math.max(chord + (arc - chord) * curveValue, along * 0.6);

    return {
      count,
      step,
      radius,
      layout,
      presetKey,
      axis,
      along,
      tilt: tiltValue,
      roll: rollValue,
      cardRoll: cardRollValue,
      perspective: layout.inward ? radius : (this.options.perspective ?? layout.perspective),
      cardW,
      cardH,
      curveValue,
      intro: this.reduced ? 'none' : (this.options.intro in INTRO_LENGTH ? this.options.intro : 'rise'),
      autoplay: this.reduced ? 'off' : this.options.autoplay,
      speed: this.options.speed,
      interval: Math.max(0.5, this.options.interval),
      draggable: this.options.draggable,
      momentum: clamp(this.options.momentum, 0, 1),
      snap: this.options.snap,
      pauseOnHover: this.options.pauseOnHover,
      focusOnClick: this.options.focusOnClick,
      parallax: this.reduced ? 0 : clamp(this.options.parallax, 0, 1),
      stretch: this.reduced ? 0 : clamp(this.options.stretch, 0, 1),
      depthFade: clamp(this.options.depthFade, 0, 1),
      captions: this.options.captions,
      reduced: this.reduced
    };
  }

  buildTiles(along, axis, curveValue, inward, radius) {
    const total = curveValue > 0.001 ? TILES : 1;
    const length = along / total;
    const bend = curveValue > 0.001 ? radius / curveValue : 0;
    return Array.from({ length: total }, (_, index) => {
      const start = index * length - (index > 0 ? OVERLAP / 2 : 0);
      const end = (index + 1) * length + (index < total - 1 ? OVERLAP / 2 : 0);
      const center = (start + end) / 2 - along / 2;
      const alpha = bend ? center / bend : 0;
      const shift = bend ? bend * Math.sin(alpha) : center;
      const sink = bend ? bend * (1 - Math.cos(alpha)) : 0;
      const depth = inward ? sink : -sink;
      const turn = ((inward ? -alpha : alpha) * 180) / Math.PI;
      const move =
        axis === 'x'
          ? `translate3d(0px, ${shift}px, ${depth}px) rotateX(${-turn}deg)`
          : `translate3d(${shift}px, 0px, ${depth}px) rotateY(${turn}deg)`;
      return { index, total, start, end, size: end - start, move };
    });
  }

  init() {
    this.buildDOM();
    this.bindEvents();
    this.updateDirection();
    this.loadImages();
    this.measure();
    this.render(this.settings, performance.now());
    this.wake();
  }

  buildDOM() {
    this.mount.innerHTML = '';

    const s = this.settings;
    const root = document.createElement('div');
    root.className = `circular-carousel ${this.options.className}`.trim();
    root.setAttribute('role', 'region');
    root.setAttribute('aria-roledescription', 'carousel');
    root.setAttribute('aria-label', 'Certificates and Credentials Carousel');
    root.tabIndex = 0;
    root.dataset.axis = s.axis;
    root.dataset.shape = s.presetKey;
    if (s.draggable) root.dataset.draggable = '';

    root.style.setProperty('--cc-fade', this.options.fadeColor);
    root.style.setProperty('--cc-radius', `${Math.max(0, this.options.cornerRadius)}px`);
    root.style.setProperty('--cc-inner', (1 - clamp(this.options.innerShade, 0, 1)).toFixed(3));

    const view = document.createElement('div');
    view.className = 'circular-carousel__view';

    const stage = document.createElement('div');
    stage.className = 'circular-carousel__stage';

    const camera = document.createElement('div');
    camera.className = 'circular-carousel__camera';

    const ring = document.createElement('div');
    ring.className = 'circular-carousel__ring';

    this.cardElements = [];
    const tiles = this.buildTiles(s.along, s.axis, s.curveValue, s.layout.inward, s.radius);

    this.list.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'circular-carousel__card';
      card.dataset.ccIndex = index;
      card.setAttribute('role', 'group');
      card.setAttribute('aria-roledescription', 'slide');
      card.setAttribute('aria-label', `${item.title || item.alt || `Item ${index + 1}`}, ${index + 1} of ${s.count}`);

      // Front faces
      tiles.forEach(tile => {
        card.appendChild(this.createTileElement(item, tile, false, index, s));
      });

      // Back faces
      if (s.layout.backfaces) {
        tiles.forEach(tile => {
          card.appendChild(this.createTileElement(item, tile, true, index, s));
        });
      }

      ring.appendChild(card);
      this.cardElements.push(card);
    });

    camera.appendChild(ring);
    stage.appendChild(camera);
    view.appendChild(stage);
    root.appendChild(view);

    // Captions container
    if (s.captions) {
      const captionWrap = document.createElement('div');
      captionWrap.className = 'circular-carousel__caption';
      captionWrap.setAttribute('aria-hidden', 'true');

      const titleSpan = document.createElement('span');
      titleSpan.className = 'circular-carousel__title';
      captionWrap.appendChild(titleSpan);

      const countSpan = document.createElement('span');
      countSpan.className = 'circular-carousel__count';

      const digitsSpan = document.createElement('span');
      digitsSpan.className = 'circular-carousel__digits';

      // 2 digits
      this.digitReels = [];
      for (let d = 0; d < 2; d++) {
        const digitBox = document.createElement('span');
        digitBox.className = 'circular-carousel__digit';
        const reel = document.createElement('span');
        reel.className = 'circular-carousel__reel';
        '0123456789'.split('').forEach(n => {
          const span = document.createElement('span');
          span.textContent = n;
          reel.appendChild(span);
        });
        digitBox.appendChild(reel);
        digitsSpan.appendChild(digitBox);
        this.digitReels.push(reel);
      }

      countSpan.appendChild(digitsSpan);

      const slashSpan = document.createElement('span');
      slashSpan.className = 'circular-carousel__slash';
      slashSpan.textContent = '/';
      countSpan.appendChild(slashSpan);

      const totalSpan = document.createElement('span');
      totalSpan.textContent = String(s.count).padStart(2, '0');
      countSpan.appendChild(totalSpan);

      captionWrap.appendChild(countSpan);
      root.appendChild(captionWrap);

      this.captionWrap = captionWrap;
      this.captionTitle = titleSpan;
    }

    // Screen reader live status
    const live = document.createElement('div');
    live.className = 'circular-carousel__live';
    live.setAttribute('aria-live', 'polite');
    live.setAttribute('aria-atomic', 'true');
    root.appendChild(live);
    this.liveRegion = live;

    this.mount.appendChild(root);

    this.root = root;
    this.stage = stage;
    this.camera = camera;
    this.ring = ring;

    this.updateCaption(this.active);
  }

  createTileElement(item, tile, back, index, s) {
    const strip = back ? tile.total - 1 - tile.index : tile.index;
    const first = strip === 0;
    const last = strip === tile.total - 1;
    const r = 'var(--cc-radius)';
    const frameRadius =
      s.axis === 'x'
        ? `${first ? r : 0} ${first ? r : 0} ${last ? r : 0} ${last ? r : 0}`
        : `${first ? r : 0} ${last ? r : 0} ${last ? r : 0} ${first ? r : 0}`;

    const offset = back ? s.along - tile.end : tile.start;
    const size = tile.size;
    const flip = s.axis === 'x' ? ' rotateX(180deg)' : ' rotateY(180deg)';

    const tileEl = document.createElement('div');
    tileEl.className = 'circular-carousel__tile';
    tileEl.setAttribute('aria-hidden', 'true');

    if (s.axis === 'x') {
      tileEl.style.left = `${-s.cardW / 2}px`;
      tileEl.style.top = `${-size / 2}px`;
      tileEl.style.width = `${s.cardW}px`;
      tileEl.style.height = `${size}px`;
    } else {
      tileEl.style.left = `${-size / 2}px`;
      tileEl.style.top = `${-s.cardH / 2}px`;
      tileEl.style.width = `${size}px`;
      tileEl.style.height = `${s.cardH}px`;
    }
    tileEl.style.transform = tile.move + (back ? flip : '');

    const frame = document.createElement('div');
    frame.className = 'circular-carousel__frame';
    frame.style.height = `${s.axis === 'x' ? size : s.cardH}px`;
    frame.style.borderRadius = frameRadius;

    if (tile.total > 1) {
      tileEl.dataset.tilePos = first ? 'first' : (last ? 'last' : 'mid');
    }

    const photoDefault = document.createElement('img');
    photoDefault.className = 'circular-carousel__photo photo--default';
    photoDefault.src = item.src;
    photoDefault.alt = '';
    photoDefault.draggable = false;
    photoDefault.decoding = 'async';

    const photoActive = document.createElement('img');
    photoActive.className = 'circular-carousel__photo photo--active';
    photoActive.src = item.activeSrc || item.src;
    photoActive.alt = '';
    photoActive.draggable = false;
    photoActive.decoding = 'async';

    if (s.axis === 'x') {
      [photoDefault, photoActive].forEach(photo => {
        photo.style.left = '0px';
        photo.style.top = `${-offset}px`;
        photo.style.width = `${s.cardW}px`;
        photo.style.height = `${s.cardH}px`;
      });
    } else {
      [photoDefault, photoActive].forEach(photo => {
        photo.style.left = `${-offset}px`;
        photo.style.top = '0px';
        photo.style.width = `${s.cardW}px`;
        photo.style.height = `${s.cardH}px`;
      });
    }

    frame.appendChild(photoDefault);
    frame.appendChild(photoActive);

    if (back) {
      const inner = document.createElement('div');
      inner.className = 'circular-carousel__inner';
      frame.appendChild(inner);
    }

    const shade = document.createElement('div');
    shade.className = 'circular-carousel__shade';
    frame.appendChild(shade);

    tileEl.appendChild(frame);
    return tileEl;
  }

  updateCaption(index) {
    const item = this.list[index] || this.list[0];
    if (!item) return;

    if (this.captionTitle) {
      this.captionTitle.innerHTML = `
        <span>${item.title || item.alt || ''}</span>
        ${item.subtitle ? `<span class="circular-carousel__subtitle">${item.subtitle}</span>` : ''}
      `;
    }

    if (this.digitReels && this.digitReels.length === 2) {
      const formatted = String(index + 1).padStart(2, '0');
      const d1 = Number(formatted[0]);
      const d2 = Number(formatted[1]);
      this.digitReels[0].style.transform = `translateY(${-d1 * 10}%)`;
      this.digitReels[1].style.transform = `translateY(${-d2 * 10}%)`;
    }

    if (this.liveRegion) {
      const label = item.title || item.alt || `Item ${index + 1}`;
      this.liveRegion.textContent = `${label}, ${index + 1} of ${this.list.length}`;
    }
  }

  updateDirection() {
    const s = this.settings;
    const dragSign = s.layout.inward ? -1 : 1;
    const directionSign = (this.options.direction === 'right' ? 1 : -1) * dragSign;
    this.state.dir = directionSign;
    this.wake();
  }

  loadImages() {
    const sources = [];
    this.list.slice(0, 16).forEach(item => {
      if (item.src) sources.push(item.src);
      if (item.activeSrc) sources.push(item.activeSrc);
    });
    const loadOne = src =>
      new Promise(resolve => {
        const image = new Image();
        image.decoding = 'async';
        image.onload = () => (image.decode ? image.decode().then(resolve, resolve) : resolve());
        image.onerror = resolve;
        image.src = src;
      });

    const timeout = new Promise(resolve => setTimeout(resolve, 2400));
    Promise.race([Promise.all(sources.map(loadOne)), timeout]).then(() => {
      this.ready = true;
      if (this.root) this.root.dataset.ready = '';
      this.state.introDone = false;
      this.state.intro = null;
      this.wake();
    });
  }

  measure() {
    if (!this.root || !this.stage) return;
    const s = this.settings;
    const rect = this.root.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const room = s.captions ? CAPTION_SPACE : 0;
    const width = rect.width * 0.94;
    const height = (rect.height - room) * 0.92;
    const P = s.perspective;

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    if (s.layout.inward) {
      minX = -width / 2;
      maxX = width / 2;
      minY = -s.cardH / 2;
      maxY = s.cardH / 2;
    } else {
      const corners = [
        [-s.cardW / 2, -s.cardH / 2],
        [s.cardW / 2, -s.cardH / 2],
        [-s.cardW / 2, s.cardH / 2],
        [s.cardW / 2, s.cardH / 2]
      ];
      const limit = s.layout.window ? s.layout.window * s.step : 180;
      for (let a = -limit; a <= limit; a += limit / 24) {
        for (const [cx, cy] of corners) {
          let p;
          if (s.axis === 'x') {
            p = rotateY(rotateX([cx, cy, s.radius], -a), s.tilt);
          } else if (s.layout.billboard) {
            const c = rotateY([0, 0, s.radius], a);
            p = rotateX([c[0] + cx, cy, c[2]], s.tilt);
          } else {
            p = rotateX(rotateY([cx, cy, s.radius], a), s.tilt);
          }
          p = [p[0], p[1], p[2] - s.radius];
          if (p[2] >= P * 0.95) continue;
          const k = P / (P - p[2]);
          minX = Math.min(minX, p[0] * k);
          maxX = Math.max(maxX, p[0] * k);
          minY = Math.min(minY, p[1] * k);
          maxY = Math.max(maxY, p[1] * k);
        }
      }
    }

    const spanX = Math.max(maxX - minX, 1);
    const spanY = Math.max(maxY - minY, 1);
    const fit = Math.max(0.75, Math.min(1.05, width / spanX, (height * 1.35) / spanY));

    this.state.fit = fit;
    this.state.shift = -((minY + maxY) / 2) * fit + 20;
    this.state.drop = s.axis === 'x' ? (rect.width / fit) * 0.55 + s.cardW : (rect.height / fit) * 0.55 + s.cardH;

    this.stage.style.perspective = `${P}px`;
    this.stage.style.transform = `translate3d(0, ${this.state.shift}px, 0) scale(${fit})`;
  }

  introCard(elapsed, landing) {
    if (!this.state.intro) return { radius: 1, lift: 0 };
    const type = this.state.intro.type;
    const reach = Math.abs(wrap(landing + this.state.angle));
    if (type === 'assemble') {
      const delay = (reach / 180) * 420;
      const p = easeOut(clamp((elapsed - delay) / 1080, 0, 1));
      return { radius: 1 + 0.6 * (1 - p), lift: 0 };
    }
    if (type === 'rise') {
      const delay = (reach / 180) * 480;
      const p = easeOutQuint(clamp((elapsed - delay) / 900, 0, 1));
      return { radius: 1, lift: (1 - p) * this.state.drop };
    }
    if (type === 'spin') {
      const p = easeOut(clamp(elapsed / INTRO_LENGTH.spin, 0, 1));
      return { radius: 1 + 0.28 * (1 - p), lift: 0 };
    }
    return { radius: 1, lift: 0 };
  }

  advance(s, dt, now) {
    const state = this.state;
    if (!state.introDone && this.ready) {
      if (!state.intro) {
        if (s.intro === 'none') state.introDone = true;
        else state.intro = { type: s.intro, start: now };
      }
      if (state.intro && now - state.intro.start >= INTRO_LENGTH[state.intro.type]) {
        state.intro = null;
        state.introDone = true;
      }
    }

    const paused = (s.pauseOnHover && state.hover) || state.drag || now < state.holdUntil;
    const cruise = s.autoplay === 'drift' && !paused && !state.intro ? s.speed * state.dir : 0;
    let busy = Boolean(state.intro) || state.drag;

    if (state.drag || state.intro) {
      state.velocity = state.drag ? state.velocity : 0;
    } else if (state.target !== null) {
      let remaining = dt;
      const damping = 2 * Math.sqrt(SPRING);
      while (remaining > 0) {
        const h = Math.min(remaining, 1 / 240);
        const accel = SPRING * (state.target - state.angle) - damping * state.velocity;
        state.velocity += accel * h;
        state.angle += state.velocity * h;
        remaining -= h;
      }
      if (Math.abs(state.target - state.angle) < 0.004 && Math.abs(state.velocity) < 0.03) {
        state.angle = state.target;
        state.velocity = 0;
        state.target = null;
      }
      busy = true;
    } else {
      const tau = 0.18 + s.momentum * 1.5;
      state.velocity += (cruise - state.velocity) * (1 - Math.exp(-dt / tau));
      state.angle += state.velocity * dt;
      if (cruise === 0 && s.snap && Math.abs(state.velocity) < SETTLE_SPEED) {
        state.target = Math.round(state.angle / s.step) * s.step;
      }
      busy = busy || cruise !== 0 || Math.abs(state.velocity) > 0.01 || state.target !== null;
    }

    if (s.autoplay === 'step' && !paused && !state.intro && state.introDone) {
      if (!state.stepAt) state.stepAt = now + s.interval * 1000;
      if (now >= state.stepAt) {
        const base = state.target ?? Math.round(state.angle / s.step) * s.step;
        state.target = base + s.step * state.dir;
        state.stepAt = now + s.interval * 1000;
      }
      busy = true;
    } else {
      state.stepAt = 0;
    }

    if (now < state.holdUntil) busy = true;

    const ease = 1 - Math.exp(-dt / 0.35);
    const aimYaw = state.pointer.inside ? state.pointer.x * s.parallax * 9 : 0;
    const aimPitch = state.pointer.inside ? -state.pointer.y * s.parallax * 6 : 0;
    state.yaw += (aimYaw - state.yaw) * ease;
    state.pitch += (aimPitch - state.pitch) * ease;
    if (Math.abs(aimYaw - state.yaw) > 0.01 || Math.abs(aimPitch - state.pitch) > 0.01) busy = true;

    return busy;
  }

  render(s, now) {
    if (!this.camera || !this.ring) return;
    const state = this.state;
    const elapsed = state.intro ? now - state.intro.start : 0;
    const swell = 1 + s.stretch * 0.12 * Math.min(1, Math.abs(state.velocity) / 420);

    let spinOffset = 0;
    if (state.intro?.type === 'spin') {
      const p = easeOut(clamp(elapsed / INTRO_LENGTH.spin, 0, 1));
      spinOffset = -300 * state.dir * (1 - p);
    } else if (state.intro?.type === 'assemble') {
      const p = easeOut(clamp(elapsed / INTRO_LENGTH.assemble, 0, 1));
      spinOffset = -32 * state.dir * (1 - p);
    }

    const angle = state.angle + spinOffset;
    const R = s.radius * swell;

    if (s.axis === 'x') {
      this.camera.style.transform = `translate3d(0, 0, ${-R}px) rotateY(${s.tilt + state.yaw}deg) rotateX(${state.pitch}deg)`;
      this.ring.style.transform = `rotateX(${-angle}deg)`;
    } else if (s.layout.inward) {
      this.camera.style.transform = `translate3d(0, 0, ${s.perspective - 1}px) rotateX(${s.tilt + state.pitch}deg) rotateY(${state.yaw}deg)`;
      this.ring.style.transform = `rotateY(${angle}deg)`;
    } else {
      const roll = s.roll || 0;
      this.camera.style.transform = `translate3d(0, 0, ${-R}px) rotateZ(${roll}deg) rotateX(${s.tilt + state.pitch}deg) rotateY(${state.yaw}deg)`;
      this.ring.style.transform = `rotateY(${angle}deg)`;
    }

    for (let index = 0; index < s.count; index++) {
      const card = this.cardElements[index];
      if (!card) continue;
      const base = index * s.step;
      const mod = this.introCard(elapsed, base);
      const r = R * mod.radius;
      let transform;
      if (s.axis === 'x') {
        transform = `rotateX(${-base}deg) translateZ(${r}px)`;
      } else if (s.layout.inward) {
        transform = `rotateY(${base}deg) translateZ(${-r}px)`;
      } else {
        transform = `rotateY(${base}deg) translateZ(${r}px)`;
        if (s.layout.billboard) transform += ` rotateY(${-(base + angle)}deg)`;
      }
      if (s.cardRoll) transform += ` rotateZ(${s.cardRoll}deg)`;
      if (mod.lift) transform += s.axis === 'x' ? ` translateX(${mod.lift}px)` : ` translateY(${mod.lift}px)`;
      card.style.transform = transform;

      const world = wrap(base + angle);
      const facing = Math.cos(world * TO_RAD);
      if (s.layout.inward) card.style.visibility = Math.abs(world) > 86 ? 'hidden' : '';
      const fade = s.depthFade * Math.pow((1 - facing) / 2, 1.25);
      card.style.setProperty('--cc-depth', fade.toFixed(3));
    }

    const index = ((Math.round(-state.angle / s.step) % s.count) + s.count) % s.count || 0;
    for (let i = 0; i < s.count; i++) {
      const c = this.cardElements[i];
      if (c) {
        if (i === index) {
          if (!c.classList.contains('is-active')) c.classList.add('is-active');
        } else {
          if (c.classList.contains('is-active')) c.classList.remove('is-active');
        }
      }
    }
    if (index !== this.active) {
      this.active = index;
      this.updateCaption(index);
      if (typeof this.options.onChange === 'function') {
        this.options.onChange(index);
      }
    }
  }

  frame(now) {
    this.rafId = 0;
    const s = this.settings;
    const dt = this.state.last ? Math.min((now - this.state.last) / 1000, 0.05) : 1 / 60;
    this.state.last = now;
    const busy = this.advance(s, dt, now);
    this.render(s, now);
    if (busy && this.isVisible && !document.hidden) {
      this.rafId = requestAnimationFrame(this.frame);
    } else {
      this.state.last = 0;
    }
  }

  wake() {
    if (!this.rafId && this.isVisible && !document.hidden) {
      this.rafId = requestAnimationFrame(this.frame);
    }
  }

  focusIndex(index) {
    const s = this.settings;
    let target = -index * s.step;
    target += 360 * Math.round((this.state.angle - target) / 360);
    this.state.target = target;
    this.state.holdUntil = performance.now() + 2800;
    this.wake();
  }

  stepBy(delta) {
    const s = this.settings;
    const base = this.state.target ?? Math.round(this.state.angle / s.step) * s.step;
    this.state.target = base - delta * s.step * (s.layout.inward ? -1 : 1);
    this.state.holdUntil = performance.now() + 2800;
    this.wake();
  }

  setPreset(preset) {
    if (!PRESETS[preset]) return;
    this.options.preset = preset;
    if (this.root) {
      this.root.dataset.shape = preset;
      this.root.dataset.axis = PRESETS[preset].axis;
    }
    this.buildDOM();
    this.measure();
    this.wake();
  }

  setItems(newItems) {
    this.options.items = newItems;
    this.list = [...newItems];
    this.active = 0;
    this.buildDOM();
    this.loadImages();
    this.measure();
    this.wake();
  }

  updatePointer(event) {
    if (!this.root) return;
    const rect = this.root.getBoundingClientRect();
    this.state.pointer.x = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
    this.state.pointer.y = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
  }

  onPointerDown(event) {
    this.state.suppressClick = false;
    if (!this.options.draggable || event.button !== 0) return;
    this.state.press = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      angle: this.state.angle,
      moved: false,
      origin: 0,
      samples: [{ time: performance.now(), angle: this.state.angle }]
    };
  }

  onPointerMove(event) {
    if (event.pointerType === 'mouse') {
      this.state.pointer.inside = true;
      this.updatePointer(event);
    }
    const press = this.state.press;
    if (!press || press.id !== event.pointerId) {
      this.wake();
      return;
    }
    const s = this.settings;
    const delta = s.axis === 'x' ? event.clientY - press.y : event.clientX - press.x;
    const cross = s.axis === 'x' ? event.clientX - press.x : event.clientY - press.y;

    if (!press.moved) {
      if (Math.abs(delta) < DRAG_THRESHOLD) return;
      if (Math.abs(cross) > Math.abs(delta) * 1.2 && event.pointerType !== 'mouse') {
        this.state.press = null;
        return;
      }
      press.moved = true;
      press.origin = delta;
      this.state.drag = true;
      this.state.target = null;
      this.state.velocity = 0;
      this.dragging = true;
      if (this.root) this.root.dataset.dragging = '';
      try {
        this.root.setPointerCapture(event.pointerId);
      } catch {}
    }

    const perPixel = 180 / (Math.PI * s.radius * this.state.fit);
    this.state.angle = press.angle + (delta - press.origin) * perPixel * (s.layout.inward ? -1 : 1);
    const now = performance.now();
    press.samples.push({ time: now, angle: this.state.angle });
    while (press.samples.length > 2 && now - press.samples[0].time > 110) {
      press.samples.shift();
    }
    this.wake();
  }

  releasePointer(event) {
    const press = this.state.press;
    if (!press || press.id !== event.pointerId) return;
    this.state.press = null;
    if (!press.moved) return;

    this.state.drag = false;
    this.dragging = false;
    if (this.root) delete this.root.dataset.dragging;
    this.state.suppressClick = true;

    const s = this.settings;
    const first = press.samples[0];
    const last = press.samples[press.samples.length - 1];
    const span = (last.time - first.time) / 1000;
    const velocity = span > 0.008 ? clamp((last.angle - first.angle) / span, -1400, 1400) : 0;
    this.state.velocity = velocity;

    if (Math.abs(velocity) > 60) this.state.dir = Math.sign(velocity);
    const coasting = s.autoplay === 'drift' && !(s.pauseOnHover && this.state.hover && event.pointerType === 'mouse');
    if (s.snap && !coasting) {
      const tau = 0.18 + s.momentum * 1.5;
      this.state.target = Math.round((this.state.angle + velocity * tau * 0.55) / s.step) * s.step;
    }
    this.wake();
  }

  onPointerEnter(event) {
    if (event.pointerType !== 'mouse') return;
    this.state.hover = true;
    this.wake();
  }

  onPointerLeave(event) {
    if (event.pointerType === 'mouse') {
      this.state.hover = false;
      this.state.pointer.inside = false;
    }
    this.wake();
  }

  onClick(event) {
    if (this.state.suppressClick) {
      this.state.suppressClick = false;
      return;
    }
    const card = event.target.closest?.('[data-cc-index]');
    if (!card) return;
    const index = Number(card.getAttribute('data-cc-index'));
    if (this.options.focusOnClick) {
      this.focusIndex(index);
    }
    if (typeof this.options.onItemClick === 'function') {
      this.options.onItemClick(this.list[index], index);
    }
  }

  onKeyDown(event) {
    const s = this.settings;
    const forward = s.axis === 'x' ? 'ArrowDown' : 'ArrowRight';
    const backward = s.axis === 'x' ? 'ArrowUp' : 'ArrowLeft';

    if (event.key === forward) this.stepBy(1);
    else if (event.key === backward) this.stepBy(-1);
    else if (event.key === 'Home') this.focusIndex(0);
    else if (event.key === 'End') this.focusIndex(s.count - 1);
    else if (event.key === 'Enter' || event.key === ' ') {
      if (typeof this.options.onItemClick === 'function') {
        this.options.onItemClick(this.list[this.active], this.active);
      }
    } else {
      return;
    }
    event.preventDefault();
  }

  onWheel(event) {
    const s = this.settings;
    if (!s.draggable) return;
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : 0;
    if (!delta) return;
    event.preventDefault();

    const perPixel = 180 / (Math.PI * s.radius * this.state.fit);
    this.state.target = null;
    this.state.angle -= delta * perPixel * (s.layout.inward ? -1 : 1);
    this.state.velocity = -delta * perPixel * (s.layout.inward ? -1 : 1) * 30;
    this.state.holdUntil = performance.now() + 1600;

    clearTimeout(this.state.wheelTimer);
    this.state.wheelTimer = setTimeout(() => {
      if (this.settings.snap) {
        this.state.target = Math.round((this.state.angle + this.state.velocity * 0.12) / s.step) * s.step;
      }
      this.wake();
    }, 140);
    this.wake();
  }

  onVisibilityChange() {
    if (document.hidden) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
      this.state.last = 0;
    } else {
      this.wake();
    }
  }

  bindEvents() {
    if (!this.root) return;

    this.root.addEventListener('pointerdown', this.onPointerDown);
    this.root.addEventListener('pointermove', this.onPointerMove);
    this.root.addEventListener('pointerup', this.releasePointer);
    this.root.addEventListener('pointercancel', this.releasePointer);
    this.root.addEventListener('pointerenter', this.onPointerEnter);
    this.root.addEventListener('pointerleave', this.onPointerLeave);
    this.root.addEventListener('click', this.onClick);
    this.root.addEventListener('keydown', this.onKeyDown);
    this.root.addEventListener('wheel', this.onWheel, { passive: false });
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    this.resizeObserver = new ResizeObserver(() => {
      this.measure();
      this.wake();
    });
    this.resizeObserver.observe(this.root);

    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      this.isVisible = entry.isIntersecting;
      if (this.isVisible) this.wake();
      else {
        cancelAnimationFrame(this.rafId);
        this.rafId = 0;
        this.state.last = 0;
      }
    });
    this.intersectionObserver.observe(this.root);
  }

  destroy() {
    cancelAnimationFrame(this.rafId);
    clearTimeout(this.state.wheelTimer);
    clearTimeout(this.swapTimeout);

    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.intersectionObserver) this.intersectionObserver.disconnect();

    if (this.root) {
      this.root.removeEventListener('pointerdown', this.onPointerDown);
      this.root.removeEventListener('pointermove', this.onPointerMove);
      this.root.removeEventListener('pointerup', this.releasePointer);
      this.root.removeEventListener('pointercancel', this.releasePointer);
      this.root.removeEventListener('pointerenter', this.onPointerEnter);
      this.root.removeEventListener('pointerleave', this.onPointerLeave);
      this.root.removeEventListener('click', this.onClick);
      this.root.removeEventListener('keydown', this.onKeyDown);
      this.root.removeEventListener('wheel', this.onWheel);
    }
    document.removeEventListener('visibilitychange', this.onVisibilityChange);

    if (this.mount) {
      this.mount.innerHTML = '';
    }
  }
}
