/**
 * CREDENTIALS MATRIX ENGINE
 * Powered by React Bits <CircularCarousel /> (JavaScript + CSS)
 * -----------------------------------------------------------
 * Features:
 *   - Authentic obsidian cybernetic glass cards with logos, badges, and titles
 *   - Continuous 3D curved cylinder geometry with 8-slice card tiles
 *   - Interactive drag-to-spin with momentum physics & inertia
 *   - Real-time preset switching (Cylinder, Orbit, Wheel, Panorama)
 *   - Captions with rolling odometer digit reels
 *   - High-resolution modal lightbox with verification telemetry
 */

import { CircularCarousel, PRESETS } from './circular-carousel.js';

// ── Verified Certificates with Authentic Analyzed Logos & Telemetry ──
export const CERTIFICATES = [
  {
    id: 'energya-hackathon',
    title: 'Eneryia Hackathon Finalist',
    subtitle: 'SHRESHTA \'25 TECHNO-CULTURAL CONCLAVE',
    org: 'MITS Kochi · NBA Accredited',
    issuerTag: 'Muthoot Group · Indivara',
    code: 'ENR-HACK-2025-V7',
    date: 'FEB 15, 2025',
    accent: '#FF9900',
    badge: '⚡ ENERGYA',
    score: 'Active Participant',
    image: 'assets/certificates/Eneryahackathon.png',
    logos: [
      { name: 'mits', label: 'MITS' },
      { name: 'nba', label: 'NBA' }
    ]
  },
  {
    id: 'nptel-ml',
    title: 'Machine Learning (Elite 92%)',
    subtitle: 'NPTEL ONLINE CERTIFICATION · TOP 2% TOPPER',
    org: 'Indian Institute of Technology Kharagpur',
    issuerTag: 'IIT Kharagpur · SWAYAM · MoE',
    code: 'NPTEL26CS119S255301233',
    date: 'JUL-SEP 2026',
    accent: '#10B981',
    badge: '🥇 TOP 2% · 92%',
    score: 'Score: 92% (Top 2% Topper)',
    image: 'assets/certificates/Nptelmachinelearning.png',
    logos: [
      { name: 'iit-kharagpur', label: 'IIT Kharagpur' },
      { name: 'nptel', label: 'NPTEL' },
      { name: 'swayam', label: 'SWAYAM' }
    ]
  },
  {
    id: 'mern-stack',
    title: 'End-to-End MERN Lifecycle',
    subtitle: 'REACT · NODE.JS · MONGODB · EXPRESS · GIT',
    org: 'Zero Pixels Technologies Pvt Ltd',
    issuerTag: 'Full-Stack Product Lifecycle',
    code: 'ZEROPIXELS-MERN-2026',
    date: 'JUL 10, 2026',
    accent: '#38BDF8',
    badge: '🛠️ FULL-STACK',
    score: 'Course Complete',
    image: 'assets/certificates/mernstack.jpg',
    logos: [
      { name: 'zeropixels', label: 'Zero Pixels' },
      { name: 'react', label: 'React' },
      { name: 'nodejs', label: 'Node.js' }
    ]
  },
  {
    id: 'nptel',
    title: 'Python for Data Science',
    subtitle: 'ELITE NPTEL ONLINE CERTIFICATION (73%)',
    org: 'Indian Institute of Technology Madras',
    issuerTag: 'IIT Madras · SWAYAM · MoE',
    code: 'NPTEL25CS104S335000600',
    date: 'JUL-AUG 2025',
    accent: '#A855F7',
    badge: '📜 ELITE 73%',
    score: 'Score: 73% (Elite)',
    image: 'assets/certificates/nptel.png',
    logos: [
      { name: 'iit-madras', label: 'IIT Madras' },
      { name: 'nptel', label: 'NPTEL' },
      { name: 'swayam', label: 'SWAYAM' }
    ]
  },
  {
    id: 'national-hackathon',
    title: 'National AI 2nd Prize',
    subtitle: 'AI SAMASYA HACKATHON · TEAM BEYOND VISION',
    org: 'Muthoot Institute of Technology & Science',
    issuerTag: 'IHRD & Govt of Kerala',
    code: 'MITS-AI-2026-02',
    date: 'JAN 18, 2026',
    accent: '#D2FF00',
    badge: '🥈 2ND PLACE',
    score: 'National Second',
    image: 'assets/certificates/nationalhackathon.jpg',
    logos: [
      { name: 'edu-ai', label: 'edu@ai 3.0' },
      { name: 'ihrd', label: 'IHRD Kerala' },
      { name: 'mits', label: 'MITS' }
    ]
  },
  {
    id: 'isro-hackathon',
    title: 'Bharatiya Antariksh Hackathon',
    subtitle: 'NATIONAL SPACE INNOVATION CHALLENGE',
    org: 'ISRO & Hack2Skill',
    issuerTag: 'Indian Space Research Organisation',
    code: '2025H2S06BAH25-P05177',
    date: 'AUG 2025',
    accent: '#00F0FF',
    badge: '🚀 ISRO',
    score: 'Verified Participant',
    image: 'assets/certificates/isrohackathon.png',
    logos: [
      { name: 'isro', label: 'ISRO' },
      { name: 'hack2skill', label: 'Hack2Skill' }
    ]
  },
  {
    id: 'program-rep',
    title: 'Program Representative CS(AI)',
    subtitle: 'COLLEGE UNION STUDENT LEADERSHIP COUNCIL',
    org: 'MITS Kochi (Autonomous)',
    issuerTag: 'College Union 2025–2026',
    code: 'MITS-UNION-REP-CSAI',
    date: '2025–2026',
    accent: '#EC4899',
    badge: '🎓 LEADERSHIP',
    score: 'Appreciation Award',
    image: 'assets/certificates/programrep.jpg',
    logos: [
      { name: 'mits', label: 'MITS' },
      { name: 'union', label: 'College Union' }
    ]
  },
  {
    id: 'industry-immersion',
    title: 'Industrial Immersion Program',
    subtitle: 'MARIAPPS MARINE SOLUTIONS · SMARTCITY KOCHI',
    org: 'MariApps Marine Solutions Pvt Ltd',
    issuerTag: 'Enterprise Systems & Operations',
    code: 'MARIAPPS-IND-2026-ENG',
    date: 'JAN 30, 2026',
    accent: '#F59E0B',
    badge: '🏭 INDUSTRY',
    score: 'Participation Award',
    image: 'assets/certificates/industryvisit.jpeg',
    logos: [
      { name: 'mariapps', label: 'MariApps' },
      { name: 'mits', label: 'MITS' }
    ]
  },
  {
    id: 'linguaskill',
    title: 'Cambridge Linguaskill C1/B2',
    subtitle: 'INTERNATIONAL ENGLISH LANGUAGE PROFICIENCY',
    org: 'Cambridge Assessment English',
    issuerTag: 'University of Cambridge',
    code: 'CAM-LINGUA-EN-88',
    date: '2024',
    accent: '#22C55E',
    badge: '🌐 CAMBRIDGE',
    score: 'C1/B2 Proficient',
    image: 'assets/certificates/liguaskill.png',
    pdfUrl: 'assets/certificates/liguaskill.PDF',
    logos: [
      { name: 'cambridge', label: 'Cambridge' }
    ]
  }
];

// Preloaded brand logo cache
const LOGO_CACHE = new Map();

function preloadLogo(logoName) {
  if (LOGO_CACHE.has(logoName)) return LOGO_CACHE.get(logoName);
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = `assets/credential-logos/${logoName}.svg`;
  LOGO_CACHE.set(logoName, img);
  return img;
}

// Immediately initiate logo preloading
CERTIFICATES.forEach(cert => {
  cert.logos.forEach(l => preloadLogo(l.name));
});

/**
 * Generates an authentic high-resolution cybernetic obsidian card
 * with brand logos, status badge, monumental title, subtitle, shield score,
 * verification seal, and telemetry ID.
 */
export function generateCredentialCardCanvas(cert) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  // Card Background Rounded Rectangle
  const x = 16, y = 16, w = 992, h = 608, r = 38;
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.clip();

  // Deep Obsidian Graphite Glass Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 640);
  bgGrad.addColorStop(0, '#121b20');
  bgGrad.addColorStop(0.5, '#0a1114');
  bgGrad.addColorStop(1, '#05090b');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(x, y, w, h);

  // Curved Inset Edge Shadows (lateral cylindrical curvature)
  const leftShadow = ctx.createLinearGradient(x, 0, x + 150, 0);
  leftShadow.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
  leftShadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = leftShadow;
  ctx.fillRect(x, y, 150, h);

  const rightShadow = ctx.createLinearGradient(x + w - 150, 0, x + w, 0);
  rightShadow.addColorStop(0, 'rgba(0, 0, 0, 0)');
  rightShadow.addColorStop(1, 'rgba(0, 0, 0, 0.85)');
  ctx.fillStyle = rightShadow;
  ctx.fillRect(x + w - 150, y, 150, h);

  // Top Amber / Accent Rim Highlight
  const topRim = ctx.createLinearGradient(0, y, 0, y + 26);
  topRim.addColorStop(0, 'rgba(255, 170, 0, 0.5)');
  topRim.addColorStop(1, 'rgba(255, 170, 0, 0)');
  ctx.fillStyle = topRim;
  ctx.fillRect(x, y, w, 26);

  // Bottom Cyan Rim Highlight
  const bottomRim = ctx.createLinearGradient(0, y + h - 26, 0, y + h);
  bottomRim.addColorStop(0, 'rgba(0, 240, 255, 0)');
  bottomRim.addColorStop(1, 'rgba(0, 240, 255, 0.5)');
  ctx.fillStyle = bottomRim;
  ctx.fillRect(x, y + h - 26, w, 26);

  ctx.restore();

  // Outer Stroke Border
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();

  // ── TOP ROW: Brand Logos & Status Tag ──
  let curX = 60;
  const topY = 65;

  cert.logos.forEach(logo => {
    const cachedImg = LOGO_CACHE.get(logo.name);
    const pillW = (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) ? 92 : 82;
    const pillH = 46;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(curX, topY, pillW, pillH, 12);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();

    if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
      ctx.drawImage(cachedImg, curX + 11, topY + 8, pillW - 22, pillH - 16);
    } else {
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 18px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(logo.label || logo.name, curX + pillW / 2, topY + pillH / 2);
    }
    ctx.restore();

    curX += pillW + 14;
  });

  // Accent Status Pill (Right)
  ctx.save();
  ctx.font = 'bold 20px monospace';
  const badgeText = cert.badge;
  const badgeTextW = ctx.measureText(badgeText).width;
  const badgePillW = badgeTextW + 36;
  const badgePillX = 964 - badgePillW;

  ctx.beginPath();
  ctx.roundRect(badgePillX, topY, badgePillW, 46, 12);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.fill();
  ctx.strokeStyle = cert.accent;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = cert.accent;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(badgeText, badgePillX + badgePillW / 2, topY + 23);
  ctx.restore();

  // ── TITLE & SUBTITLE ──
  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 46px "Syne", -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  let titleText = cert.title;
  if (ctx.measureText(titleText).width > 880) {
    while (ctx.measureText(titleText + '...').width > 880 && titleText.length > 5) {
      titleText = titleText.slice(0, -1);
    }
    titleText += '...';
  }
  ctx.fillText(titleText, 60, 155);

  ctx.fillStyle = cert.accent;
  ctx.font = 'bold 22px monospace';
  let subText = cert.subtitle;
  if (ctx.measureText(subText).width > 880) {
    while (ctx.measureText(subText + '...').width > 880 && subText.length > 5) {
      subText = subText.slice(0, -1);
    }
    subText += '...';
  }
  ctx.fillText(subText, 60, 225);
  ctx.restore();

  // ── MIDDLE ROW: Shield Score & Circular Checkmark Seal ──
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(60, 305);
  ctx.lineTo(964, 305);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // Shield Icon
  ctx.save();
  const sX = 60, sY = 340;
  ctx.fillStyle = cert.accent;
  ctx.strokeStyle = cert.accent;
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(sX + 16, sY);
  ctx.lineTo(sX + 32, sY + 8);
  ctx.lineTo(sX + 32, sY + 26);
  ctx.bezierCurveTo(sX + 32, sY + 38, sX + 16, sY + 46, sX + 16, sY + 48);
  ctx.bezierCurveTo(sX + 16, sY + 46, sX, sY + 38, sX, sY + 26);
  ctx.lineTo(sX, sY + 8);
  ctx.closePath();
  ctx.globalAlpha = 0.25;
  ctx.fill();
  ctx.globalAlpha = 1.0;
  ctx.stroke();

  // Checkmark inside shield
  ctx.beginPath();
  ctx.moveTo(sX + 8, sY + 24);
  ctx.lineTo(sX + 14, sY + 30);
  ctx.lineTo(sX + 24, sY + 18);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3.5;
  ctx.stroke();
  ctx.restore();

  // Score text & issuer
  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 28px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(cert.score, 110, 335);

  ctx.fillStyle = '#8E9EA4';
  ctx.font = '20px monospace';
  ctx.fillText(cert.issuerTag, 110, 375);
  ctx.restore();

  // Glowing Circular Seal Badge Stamp (Right)
  ctx.save();
  const sealX = 910, sealY = 365, sealR = 36;
  ctx.strokeStyle = cert.accent;

  // Outer dashed circle
  ctx.beginPath();
  ctx.arc(sealX, sealY, sealR, 0, Math.PI * 2);
  ctx.setLineDash([6, 4]);
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Inner solid circle
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.arc(sealX, sealY, sealR - 8, 0, Math.PI * 2);
  ctx.lineWidth = 2.5;
  ctx.fillStyle = cert.accent;
  ctx.globalAlpha = 0.2;
  ctx.fill();
  ctx.globalAlpha = 1.0;
  ctx.stroke();

  // Seal Checkmark
  ctx.beginPath();
  ctx.moveTo(sealX - 12, sealY);
  ctx.lineTo(sealX - 4, sealY + 8);
  ctx.lineTo(sealX + 12, sealY - 8);
  ctx.lineWidth = 3.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
  ctx.restore();

  // ── BOTTOM ROW: Telemetry ID & Date ──
  ctx.save();
  ctx.fillStyle = '#7B8C92';
  ctx.font = 'bold 20px monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';
  ctx.fillText(`ID: ${cert.code}`, 60, 580);

  ctx.fillStyle = '#6C7D83';
  ctx.textAlign = 'right';
  ctx.fillText(cert.date, 964, 580);
  ctx.restore();

  return canvas.toDataURL('image/png');
}

export class CredentialsMobiusEngine {
  constructor() {
    this.section = document.getElementById('credentials');
    if (!this.section) return;

    this.carousel = null;
    this.currentPreset = 'cylinder';
    this.isTriggered = false;

    // Lightbox DOM references
    this.lightbox = null;
    this.lightboxImg = null;
    this.lightboxPdfNotice = null;
    this.lightboxTitle = null;
    this.lightboxBadge = null;
    this.lightboxOrg = null;
    this.lightboxCode = null;
    this.lightboxBackdrop = null;
    this.lightboxClose = null;

    this.init();
  }

  async init() {
    this.buildDOM();
    await this.preloadLogos();
    this.initCarousel();
    this.setupListeners();
  }

  async preloadLogos() {
    const promises = [];
    CERTIFICATES.forEach(cert => {
      cert.logos.forEach(l => {
        const img = LOGO_CACHE.get(l.name);
        if (img && !img.complete) {
          promises.push(new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
          }));
        }
      });
    });
    if (promises.length > 0) {
      await Promise.race([
        Promise.all(promises),
        new Promise(resolve => setTimeout(resolve, 500))
      ]);
    }
  }

  buildDOM() {
    this.section.innerHTML = `
      <div class="cylinder-stage-wrap" id="orbit3d-wrapper">
        <!-- Section Header -->
        <div class="cylinder-header">
          <span class="font-mono text-lime cylinder-tag">// VERIFIED CREDENTIALS &amp; AWARDS</span>
          <h2 class="cylinder-title font-display">CREDENTIALS MATRIX</h2>
          <p class="font-mono text-muted cylinder-sub">09 VERIFIED ARTIFACTS ON REACT BITS 3D CYLINDER · DRAG TO SPIN · CLICK TO INSPECT</p>

          <!-- 3D Preset Mode Switcher -->
          <div class="cred-preset-bar font-mono" role="group" aria-label="3D Carousel Preset Modes">
            <span class="cred-preset-label">PRESET:</span>
            <button class="cred-preset-btn is-active" data-preset="cylinder" title="Outward facing curved cylinder">CYLINDER</button>
            <button class="cred-preset-btn" data-preset="orbit" title="Cards billboard facing camera">ORBIT</button>
            <button class="cred-preset-btn" data-preset="wheel" title="Vertical rotating Ferris wheel">WHEEL</button>
            <button class="cred-preset-btn" data-preset="panorama" title="Camera inside inward ring">PANORAMA</button>
          </div>
        </div>

        <!-- React Bits CircularCarousel Viewport Mount -->
        <div class="cylinder-viewport" id="orbit3d-stage" role="region" aria-label="3D Credentials Curved Carousel">
          <div class="cylinder-glow-backdrop" aria-hidden="true"></div>
          
          <!-- Mounting point for CircularCarousel -->
          <div id="circular-carousel-mount" class="circular-carousel-mount"></div>

          <!-- Quick Step Arrows -->
          <button class="cred-step-btn cred-step-prev" id="cred-step-prev" aria-label="Previous Certificate" title="Previous Certificate">❮</button>
          <button class="cred-step-btn cred-step-next" id="cred-step-next" aria-label="Next Certificate" title="Next Certificate">❯</button>
        </div>

        <!-- Navigation HUD -->
        <div class="stage-nav-hud">
          <button id="cred-return-projects-btn" class="stage-nav-btn font-mono" title="Return to flagship projects">⤾ RETURN TO PROJECTS</button>
          <button id="cred-to-contact-btn" class="stage-nav-btn font-mono text-lime" title="Zoom warp to Contact">WARP TO TRANSMISSION MATRIX ↯</button>
        </div>
      </div>

      <!-- High-Resolution Lightbox Modal -->
      <div class="orbit3d-lightbox" id="orbit3d-lightbox" aria-hidden="true">
        <div class="orbit3d-lightbox-backdrop" id="orbit3d-lightbox-backdrop"></div>
        <div class="orbit3d-lightbox-content" id="orbit3d-lightbox-content">
          <div class="orbit3d-lightbox-header font-mono">
            <span class="orbit3d-lightbox-badge" id="orbit3d-lightbox-badge"></span>
            <h3 class="orbit3d-lightbox-title font-display" id="orbit3d-lightbox-title">Certificate</h3>
          </div>
          <div class="orbit3d-lightbox-media-wrap" id="orbit3d-lightbox-media-wrap">
            <img src="" alt="" class="orbit3d-lightbox-img" id="orbit3d-lightbox-img" />
            <div class="orbit3d-lightbox-pdf-notice" id="orbit3d-lightbox-pdf-notice" style="display: none;">
              <span class="font-mono text-lime" style="font-size: 1.05rem; display: block; margin-bottom: 0.8rem;">📄 VERIFIED PDF CREDENTIAL</span>
              <a href="#" target="_blank" id="orbit3d-lightbox-pdf-link" class="btn-primary" style="font-size: 0.78rem;">OPEN OFFICIAL PDF DOCUMENT ↗</a>
            </div>
          </div>
          <div class="orbit3d-lightbox-footer">
            <div class="orbit3d-lightbox-meta font-mono">
              <span class="orbit3d-lightbox-org text-muted" id="orbit3d-lightbox-org">Verification Telemetry</span>
              <span class="orbit3d-lightbox-code text-lime" id="orbit3d-lightbox-code"></span>
            </div>
            <button class="orbit3d-lightbox-close font-mono" id="orbit3d-lightbox-close">✕ CLOSE [ESC]</button>
          </div>
        </div>
      </div>
    `;

    // Cache Lightbox references
    this.lightbox          = document.getElementById('orbit3d-lightbox');
    this.lightboxImg       = document.getElementById('orbit3d-lightbox-img');
    this.lightboxPdfNotice = document.getElementById('orbit3d-lightbox-pdf-notice');
    this.lightboxTitle     = document.getElementById('orbit3d-lightbox-title');
    this.lightboxBadge     = document.getElementById('orbit3d-lightbox-badge');
    this.lightboxOrg       = document.getElementById('orbit3d-lightbox-org');
    this.lightboxCode      = document.getElementById('orbit3d-lightbox-code');
    this.lightboxBackdrop  = document.getElementById('orbit3d-lightbox-backdrop');
    this.lightboxClose     = document.getElementById('orbit3d-lightbox-close');
  }

  initCarousel() {
    const mount = document.getElementById('circular-carousel-mount');
    if (!mount) return;

    // Generate authentic obsidian cards with logo, title, badge, shield score
    const items = CERTIFICATES.map(cert => ({
      src: generateCredentialCardCanvas(cert),
      alt: `${cert.title} — ${cert.org}`,
      title: cert.title,
      subtitle: `${cert.badge} · ${cert.subtitle}`,
      cert
    }));

    this.carousel = new CircularCarousel(mount, {
      items,
      preset: 'cylinder',
      intro: 'rise',
      cardWidth: 440,
      aspectRatio: 1.6, // 1024 / 640
      gap: 28,
      curve: 1,
      tilt: -8,
      perspective: 1800,
      autoplay: 'drift',
      speed: 12,
      interval: 3.5,
      direction: 'left',
      draggable: true,
      momentum: 0.65,
      snap: true,
      pauseOnHover: true,
      focusOnClick: true,
      parallax: 0.35,
      stretch: 0.5,
      depthFade: 0.55,
      fadeColor: '#050907',
      innerShade: 0.65,
      cornerRadius: 14,
      captions: true,
      onItemClick: (item, index) => {
        if (item && item.cert) {
          this.openLightbox(item.cert);
        }
      }
    });

    // If any logos were still loading, re-render cards smoothly once ready
    let hasPendingLogos = false;
    CERTIFICATES.forEach(cert => {
      cert.logos.forEach(l => {
        const img = LOGO_CACHE.get(l.name);
        if (img && !img.complete) {
          hasPendingLogos = true;
          img.onload = () => {
            this.refreshCardCanvas();
          };
        }
      });
    });
  }

  refreshCardCanvas() {
    if (!this.carousel) return;
    const updatedItems = CERTIFICATES.map(cert => ({
      src: generateCredentialCardCanvas(cert),
      alt: `${cert.title} — ${cert.org}`,
      title: cert.title,
      subtitle: `${cert.badge} · ${cert.subtitle}`,
      cert
    }));
    this.carousel.setItems(updatedItems);
  }

  setupListeners() {
    // Preset Mode Switching Buttons
    const presetBtns = document.querySelectorAll('.cred-preset-btn');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const preset = btn.dataset.preset;
        if (!preset || !PRESETS[preset] || !this.carousel) return;

        presetBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        this.currentPreset = preset;
        this.carousel.setPreset(preset);
      });
    });

    // Step Arrow Buttons
    const prevBtn = document.getElementById('cred-step-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.carousel) this.carousel.stepBy(-1);
      });
    }

    const nextBtn = document.getElementById('cred-step-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.carousel) this.carousel.stepBy(1);
      });
    }

    // Navigation HUD Buttons
    const returnBtn = document.getElementById('cred-return-projects-btn');
    if (returnBtn) {
      returnBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.AppState?.techSolar) window.AppState.techSolar.triggerProjectsZoom();
        else if (window.AppState?.projectSolar) window.AppState.projectSolar.triggerProjectsZoom();
      });
    }

    const contactBtn = document.getElementById('cred-to-contact-btn');
    if (contactBtn) {
      contactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.AppState?.techSolar) {
          window.AppState.techSolar.triggerContactZoom();
        } else {
          const cs = document.getElementById('contact');
          if (cs) cs.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Lightbox Controls
    if (this.lightboxClose) {
      this.lightboxClose.addEventListener('click', () => this.closeLightbox());
    }
    if (this.lightboxBackdrop) {
      this.lightboxBackdrop.addEventListener('click', () => this.closeLightbox());
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.lightbox?.classList.contains('is-open')) {
        this.closeLightbox();
      }
    });
  }

  /* ================================================================
   *  LIGHTBOX: CLICK TO REVEAL FULL RESOLUTION CERTIFICATE DOCUMENT
   * ================================================================ */

  openLightbox(cert) {
    if (!this.lightbox) return;

    const isPDF = Boolean(cert.pdfUrl) || cert.image.toLowerCase().endsWith('.pdf');

    if (this.lightboxImg && this.lightboxPdfNotice) {
      this.lightboxImg.src = cert.image;
      this.lightboxImg.alt = cert.title;
      this.lightboxImg.style.display = 'block';

      if (isPDF) {
        this.lightboxPdfNotice.style.display = 'flex';
        this.lightboxPdfNotice.style.flexDirection = 'column';
        this.lightboxPdfNotice.style.alignItems = 'center';
        this.lightboxPdfNotice.style.padding = '1.2rem 2rem';
        const pdfLink = document.getElementById('orbit3d-lightbox-pdf-link');
        if (pdfLink) pdfLink.href = cert.pdfUrl || cert.image;
      } else {
        this.lightboxPdfNotice.style.display = 'none';
      }
    }

    if (this.lightboxTitle) this.lightboxTitle.textContent = cert.title;
    if (this.lightboxBadge) {
      this.lightboxBadge.textContent = cert.badge;
      this.lightboxBadge.style.color = cert.accent;
      this.lightboxBadge.style.borderColor = cert.accent;
    }
    if (this.lightboxOrg) this.lightboxOrg.textContent = `${cert.subtitle} · ${cert.org}`;
    if (this.lightboxCode) this.lightboxCode.textContent = `ID: ${cert.code}`;

    this.lightbox.classList.add('is-open');
    this.lightbox.setAttribute('aria-hidden', 'false');
  }

  closeLightbox() {
    if (!this.lightbox) return;
    this.lightbox.classList.remove('is-open');
    this.lightbox.setAttribute('aria-hidden', 'true');
  }

  trigger(immediate = false) {
    this.isTriggered = true;
    if (this.carousel) {
      this.carousel.wake();
    }
  }

  destroy() {
    if (this.carousel) {
      this.carousel.destroy();
      this.carousel = null;
    }
  }
}

export function initCredentialsStones() {
  return new CredentialsMobiusEngine();
}
