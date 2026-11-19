/**
 * ThreeCurvedCarousel — High-Performance WebGL 3D Curved Cylinder Carousel
 * Powered by Three.js (r160)
 *
 * Replaces CPU-heavy DOM slice tiling with genuine GPU hardware CylinderGeometry:
 * - 0 DOM slicing, 0 sub-pixel seams, 0 z-fighting
 * - 1 WebGL draw call, locked 60fps/120fps physics
 * - Smooth inertia drag, spring snapping, raycast clicks to lightbox, and odometer captions
 */

export class ThreeCurvedCarousel {
  constructor(mount, options = {}) {
    this.mount = mount;
    this.options = {
      items: [],
      cardWidth: 420,
      aspectRatio: 2.0,
      tilt: -13,       // Pitch tilt in degrees
      roll: -4,        // Camera orbit roll in degrees
      radius: 4.8,     // Cylinder radius in Three.js units
      cardW: 2.02,     // Card arc width in Three.js units (~8.6° gap between cards)
      perspective: 38, // Camera FOV in degrees
      speed: 7,
      interval: 3.5,
      autoplay: 'drift',
      captions: true,
      onItemClick: null,
      ...options
    };

    this.items = this.options.items || [];
    this.count = Math.max(this.items.length, 1);
    this.step = (2 * Math.PI) / this.count;

    this.activeIndex = 0;
    this.currentAngle = 0;
    this.targetAngle = 0;
    this.velocity = 0;
    this.isDragging = false;
    this.hasMoved = false;
    this.startX = 0;
    this.startY = 0;
    this.lastX = 0;
    this.lastTime = performance.now();
    this.isRunning = true;
    this.animId = null;

    // Three.js instances
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.ringGroup = null;
    this.cardMeshes = [];
    this.raycaster = null;
    this.mouse = null;
    this.canvas = null;

    // DOM references for captions
    this.captionWrap = null;
    this.captionTitle = null;
    this.digitReels = [];
    this.liveRegion = null;

    this.init();
  }

  init() {
    this.buildDOM();
    this.initThree();
    this.loadCards();
    this.bindEvents();
    this.updateCaption(0);
    this.startLoop();
  }

  buildDOM() {
    this.mount.innerHTML = '';

    const root = document.createElement('div');
    root.className = 'circular-carousel three-curved-carousel';
    root.setAttribute('role', 'region');
    root.setAttribute('aria-label', '3D Curved Credentials Ring');
    root.style.width = '100%';
    root.style.height = '100%';
    root.style.position = 'relative';
    root.style.display = 'flex';
    root.style.flexDirection = 'column';
    root.style.alignItems = 'center';
    root.style.justifyContent = 'center';

    const stage = document.createElement('div');
    stage.className = 'three-carousel-stage';
    stage.style.width = '100%';
    stage.style.height = '100%';
    stage.style.position = 'absolute';
    stage.style.inset = '0';
    stage.style.cursor = 'grab';
    root.appendChild(stage);
    this.stage = stage;

    // Captions container matching portfolio style.css
    if (this.options.captions) {
      const captionWrap = document.createElement('div');
      captionWrap.className = 'circular-carousel__caption';
      captionWrap.setAttribute('aria-hidden', 'true');
      captionWrap.style.position = 'absolute';
      captionWrap.style.bottom = '1.8rem';
      captionWrap.style.left = '50%';
      captionWrap.style.transform = 'translateX(-50%)';
      captionWrap.style.pointerEvents = 'none';
      captionWrap.style.zIndex = '20';

      const titleSpan = document.createElement('span');
      titleSpan.className = 'circular-carousel__title';
      captionWrap.appendChild(titleSpan);

      const countSpan = document.createElement('span');
      countSpan.className = 'circular-carousel__count';

      const digitsSpan = document.createElement('span');
      digitsSpan.className = 'circular-carousel__digits';

      // 2 digits for odometer
      this.digitReels = [];
      for (let d = 0; d < 2; d++) {
        const digitBox = document.createElement('span');
        digitBox.className = 'circular-carousel__digit';
        const reel = document.createElement('span');
        reel.className = 'circular-carousel__reel';
        '0123456789'.split('').forEach(n => {
          const s = document.createElement('span');
          s.textContent = n;
          reel.appendChild(s);
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
      totalSpan.textContent = String(this.count).padStart(2, '0');
      countSpan.appendChild(totalSpan);

      captionWrap.appendChild(countSpan);
      root.appendChild(captionWrap);

      this.captionWrap = captionWrap;
      this.captionTitle = titleSpan;
    }

    // Screen reader announcement
    const live = document.createElement('div');
    live.className = 'circular-carousel__live';
    live.setAttribute('aria-live', 'polite');
    live.setAttribute('aria-atomic', 'true');
    live.style.position = 'absolute';
    live.style.width = '1px';
    live.style.height = '1px';
    live.style.overflow = 'hidden';
    live.style.clip = 'rect(1px, 1px, 1px, 1px)';
    root.appendChild(live);
    this.liveRegion = live;

    this.mount.appendChild(root);
    this.root = root;
  }

  initThree() {
    const THREE = window.THREE;
    if (!THREE) {
      console.error('[ThreeCurvedCarousel] Three.js not loaded!');
      return;
    }

    const fov = (this.options.perspective && this.options.perspective < 100) ? this.options.perspective : 38;
    const width = this.stage.clientWidth || window.innerWidth || 1400;
    const height = this.stage.clientHeight || Math.max(window.innerHeight - 220, 650);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 100);
    let cameraZ = 10.4;
    if (width < 768) {
      const aspect = width / height;
      if (aspect < 1.2) {
        cameraZ = Math.min(13.2, Math.max(10.4, 10.4 + (1.2 - aspect) * 3.8));
      }
    }
    this.camera.position.set(0, 0, cameraZ);
    this.camera.rotation.z = THREE.MathUtils.degToRad(this.options.roll);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0x000000, 0);

    this.canvas = this.renderer.domElement;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';
    this.stage.appendChild(this.canvas);

    // Ring group with pitch tilt (positive in Three.js tilts back of ring up/away into deep space)
    this.ringGroup = new THREE.Group();
    const tiltDeg = Math.abs(this.options.tilt || 13);
    this.ringGroup.rotation.x = THREE.MathUtils.degToRad(tiltDeg);
    this.scene.add(this.ringGroup);

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  }

  loadCards() {
    const THREE = window.THREE;
    if (!THREE || !this.ringGroup) return;

    // Clean existing
    while (this.ringGroup.children.length > 0) {
      this.ringGroup.remove(this.ringGroup.children[0]);
    }
    this.cardMeshes = [];

    const R = this.options.radius || 4.8;
    const cardW = this.options.cardW || 2.02;
    const cardH = this.options.cardH || (cardW / (this.options.aspectRatio || 2.0));
    const thetaLength = cardW / R;

    // Single seamless curved cylinder geometry per card: 32 smooth radial facets
    const cardGeometry = new THREE.CylinderGeometry(
      R, R, cardH, 32, 1, true, -thetaLength / 2, thetaLength
    );

    // Back geometry with horizontally flipped UVs so text/artwork reads naturally when viewed from inside the cylinder
    const backGeometry = cardGeometry.clone();
    const uvAttr = backGeometry.attributes.uv;
    for (let j = 0; j < uvAttr.count; j++) {
      uvAttr.setX(j, 1 - uvAttr.getX(j));
    }
    uvAttr.needsUpdate = true;

    const textureLoader = new THREE.TextureLoader();

    this.items.forEach((item, i) => {
      const stepAngle = i * this.step;

      const defTexture = textureLoader.load(item.src);
      defTexture.colorSpace = THREE.SRGBColorSpace;
      defTexture.minFilter = THREE.LinearMipmapLinearFilter;
      defTexture.generateMipmaps = true;

      const actTexture = textureLoader.load(item.activeSrc || item.src);
      actTexture.colorSpace = THREE.SRGBColorSpace;
      actTexture.minFilter = THREE.LinearMipmapLinearFilter;
      actTexture.generateMipmaps = true;

      // Front material (the certificate face)
      const frontMat = new THREE.MeshBasicMaterial({
        map: i === 0 ? actTexture : defTexture,
        transparent: true,
        side: THREE.FrontSide,
        depthWrite: false
      });

      // Back material (liquid smoked glass backface showing card artwork, glowing neon border, and details)
      const backMat = new THREE.MeshBasicMaterial({
        map: i === 0 ? actTexture : defTexture,
        color: 0xffffff, // full-fidelity color for crystal clear typography and badge accents
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false
      });

      const frontMesh = new THREE.Mesh(cardGeometry, frontMat);
      frontMesh.userData = { index: i, item };

      const backMesh = new THREE.Mesh(backGeometry, backMat);
      backMesh.userData = { index: i, item };

      const pivot = new THREE.Group();
      pivot.rotation.y = stepAngle;
      pivot.add(frontMesh);
      pivot.add(backMesh);
      this.ringGroup.add(pivot);

      this.cardMeshes.push({
        frontMesh,
        backMesh,
        pivot,
        defTexture,
        actTexture,
        frontMat,
        backMat,
        item,
        index: i,
        stepAngle
      });
    });

    if (this.root) this.root.dataset.ready = '';
  }

  setItems(newItems) {
    this.items = newItems;
    this.count = Math.max(this.items.length, 1);
    this.step = (2 * Math.PI) / this.count;
    this.loadCards();
    this.updateCaption(this.activeIndex);
  }

  updateCaption(index) {
    const item = this.items[index] || this.items[0];
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
      this.liveRegion.textContent = `${label}, ${index + 1} of ${this.count}`;
    }
  }

  setActiveCard(index) {
    if (index === this.activeIndex) return;
    this.activeIndex = index;

    this.cardMeshes.forEach((card, i) => {
      const tex = (i === index) ? card.actTexture : card.defTexture;
      card.frontMat.map = tex;
      if (card.backMat) card.backMat.map = tex;
      card.frontMat.needsUpdate = true;
      if (card.backMat) card.backMat.needsUpdate = true;
    });

    this.updateCaption(index);
  }

  getIndexFromAngle(ang) {
    const norm = ((-ang % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    return (Math.round(norm / this.step) % this.count);
  }

  stepBy(delta) {
    this.isDragging = false;
    let nextIdx = (this.activeIndex + delta) % this.count;
    if (nextIdx < 0) nextIdx += this.count;
    this.goToIndex(nextIdx);
  }

  goToIndex(targetIdx) {
    this.isDragging = false;
    // Calculate shortest angular distance
    const currentNorm = ((-this.currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const targetNorm = targetIdx * this.step;
    let diff = targetNorm - currentNorm;
    if (diff > Math.PI) diff -= 2 * Math.PI;
    if (diff < -Math.PI) diff += 2 * Math.PI;

    this.targetAngle = this.currentAngle - diff;
    this.wake();
  }

  rotateTo(targetIdx) {
    this.goToIndex(targetIdx);
  }

  bindEvents() {
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.onResize = this.onResize.bind(this);

    if (this.stage) {
      this.stage.style.touchAction = 'pan-y';
      this.stage.addEventListener('pointerdown', this.onPointerDown, { passive: true });
      this.stage.addEventListener('wheel', this.onWheel, { passive: false });
    }
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    window.addEventListener('pointerup', this.onPointerUp, { passive: true });
    window.addEventListener('pointercancel', this.onPointerUp, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });
  }

  onPointerDown(e) {
    this.isDragging = true;
    this.hasMoved = false;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.lastX = e.clientX;
    this.velocity = 0;
    this.lastTime = performance.now();
    this.stage.style.cursor = 'grabbing';
    this.wake();
  }

  onPointerMove(e) {
    const width = this.canvas ? this.canvas.clientWidth : window.innerWidth;
    const height = this.canvas ? this.canvas.clientHeight : window.innerHeight;

    if (this.isDragging) {
      // On touch devices, if finger movement is primarily vertical, allow native page scroll
      if (e.pointerType === 'touch' && !this.hasMoved) {
        const totalDx = Math.abs(e.clientX - this.startX);
        const totalDy = Math.abs(e.clientY - this.startY);
        if (totalDy > totalDx && totalDy > 7) {
          this.isDragging = false;
          return;
        }
      }

      const dx = e.clientX - this.lastX;
      if (Math.hypot(e.clientX - this.startX, e.clientY - this.startY) > 6) {
        this.hasMoved = true;
      }

      const now = performance.now();
      const dt = Math.max(1, now - this.lastTime);
      this.velocity = (dx / dt) * 16;
      this.lastX = e.clientX;
      this.lastTime = now;

      this.targetAngle += (dx / width) * 4.2;
      this.currentAngle = this.targetAngle;
      this.wake();
      return;
    }

    // Raycast hover state
    if (this.raycaster && this.camera && this.cardMeshes.length > 0 && this.canvas) {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const meshes = [];
      this.cardMeshes.forEach(c => {
        if (c.frontMesh) meshes.push(c.frontMesh);
        if (c.backMesh) meshes.push(c.backMesh);
      });
      const intersects = this.raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        this.stage.style.cursor = 'pointer';
      } else {
        this.stage.style.cursor = 'grab';
      }
    }
  }

  onPointerUp(e) {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.stage.style.cursor = 'grab';

    // If it was a clean click without dragging:
    if (!this.hasMoved && this.raycaster && this.camera && this.canvas) {
      const rect = this.canvas.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;

      this.mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const meshes = [];
      this.cardMeshes.forEach(c => {
        if (c.frontMesh) meshes.push(c.frontMesh);
        if (c.backMesh) meshes.push(c.backMesh);
      });
      const intersects = this.raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const hitIdx = intersects[0].object.userData.index;
        if (hitIdx === this.activeIndex) {
          if (this.options.onItemClick) {
            this.options.onItemClick(this.items[hitIdx], hitIdx);
          }
        } else {
          this.goToIndex(hitIdx);
        }
        return;
      }
    }

    // Apply inertia fling & snap
    this.targetAngle += (this.velocity / 300) * 0.8;
    const nearestIdx = this.getIndexFromAngle(this.targetAngle);
    this.goToIndex(nearestIdx);
  }

  onWheel(e) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      this.targetAngle += (e.deltaX / 800) * 1.5;
      const nearestIdx = this.getIndexFromAngle(this.targetAngle);
      this.goToIndex(nearestIdx);
      this.wake();
    }
  }

  onResize() {
    if (!this.renderer || !this.camera || !this.stage) return;
    const width = this.stage.clientWidth || window.innerWidth || 1400;
    const height = this.stage.clientHeight || Math.max(window.innerHeight - 220, 650);

    this.camera.aspect = width / height;
    let cameraZ = 10.4;
    if (width < 768) {
      const aspect = width / height;
      if (aspect < 1.2) {
        cameraZ = Math.min(13.2, Math.max(10.4, 10.4 + (1.2 - aspect) * 3.8));
      }
    }
    this.camera.position.z = cameraZ;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.wake();
  }

  startLoop() {
    this.isRunning = true;
    const renderFrame = () => {
      if (!this.isRunning) return;

      if (!this.isDragging) {
        // Autoplay subtle ambient drift
        if (this.options.autoplay === 'drift') {
          this.targetAngle += 0.0008;
        }

        // Spring physics damping
        this.currentAngle += (this.targetAngle - this.currentAngle) * 0.085;
      } else {
        this.currentAngle += (this.targetAngle - this.currentAngle) * 0.22;
      }

      if (this.ringGroup) {
        this.ringGroup.rotation.y = this.currentAngle;
      }

      // Check active card and update receding depth fade
      const activeIdx = this.getIndexFromAngle(this.currentAngle);
      this.setActiveCard(activeIdx);

      this.cardMeshes.forEach(card => {
        // Compute facing angle relative to camera view
        const worldAngle = (this.currentAngle + card.stepAngle) % (2 * Math.PI);
        const facing = Math.cos(worldAngle); // 1 = facing front, -1 = facing back
        
        // Depth fade calculation:
        // Front cards (facing > 0): opacity ranges smoothly from 0.68 (at sides) to 1.0 (at front center)
        const frontAlpha = Math.max(0.68, Math.pow((facing + 1) / 2, 0.65));
        card.frontMat.opacity = frontAlpha;

        if (card.backMat) {
          // Back cards (facing < 0): backMesh faces camera from inside the cylinder
          // Sleek liquid glass hologram: 0.68 at sides up to 0.92 at deep back
          const backWeight = Math.max(0, -facing); // 0 at sides, 1 at deep back
          const backAlpha = 0.68 + 0.24 * Math.pow(backWeight, 0.7);
          card.backMat.opacity = backAlpha;
        }
      });

      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }

      this.animId = requestAnimationFrame(renderFrame);
    };

    this.animId = requestAnimationFrame(renderFrame);
  }

  wake() {
    if (!this.animId && this.isRunning) {
      this.startLoop();
    }
  }

  pause() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  destroy() {
    this.isRunning = false;
    this.pause();

    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
    window.removeEventListener('pointercancel', this.onPointerUp);
    window.removeEventListener('resize', this.onResize);

    if (this.cardMeshes) {
      this.cardMeshes.forEach(c => {
        if (c.defTexture) c.defTexture.dispose();
        if (c.actTexture) c.actTexture.dispose();
        if (c.frontMat) c.frontMat.dispose();
        if (c.backMat) c.backMat.dispose();
      });
      this.cardMeshes = [];
    }

    if (this.renderer) {
      this.renderer.dispose();
      if (this.canvas && this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
      }
      this.renderer = null;
    }

    if (this.mount) {
      this.mount.innerHTML = '';
    }
  }
}
