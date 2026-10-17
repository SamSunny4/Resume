/**
 * CREDENTIALS MATRIX ENGINE — LIQUID GLASS RING EDITION
 * -----------------------------------------------------------
 * Redesigned to match the liquid glass circular ring aesthetic:
 *   - Compact dark glassmorphic cards with glowing liquid borders
 *   - Full visible ring of cards with dramatic depth receding
 *   - Bold monumental titles, issuer logo pills, credential IDs
 *   - Active card gets vivid accent glow border
 *   - Interactive drag-to-spin with momentum physics & inertia
 *   - Real-time preset switching & click-to-inspect lightbox
 */

import { CircularCarousel, PRESETS } from './circular-carousel.js';

// ── Verified Certificates with Authentic Analyzed Logos & Telemetry ──
export const CERTIFICATES = [
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
    pills: ['IIT Kharagpur', 'SWAYAM'],
    logos: [
      { name: 'iit-kharagpur', label: 'IIT KGP' },
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
    pills: ['React.js', 'Node.js'],
    logos: [
      { name: 'react', label: 'React' },
      { name: 'nodejs', label: 'Node.js' },
      { name: 'zeropixels', label: 'Zero Pixels' }
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
    pills: ['Python', 'IIT Madras'],
    logos: [
      { name: 'python', label: 'Python' },
      { name: 'iit-madras', label: 'IIT Madras' },
      { name: 'nptel', label: 'NPTEL' }
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
    pills: ['AI Samasya', 'Team Beyond Vision'],
    logos: [
      { name: 'edu-ai', label: 'edu@ai 3.0' },
      { name: 'mits', label: 'MITS' },
      { name: 'ihrd', label: 'IHRD Kerala' }
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
    pills: ['ISRO', 'Hack2Skill'],
    logos: [
      { name: 'isro', label: 'ISRO' },
      { name: 'hack2skill', label: 'Hack2Skill' }
    ]
  },
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
    pills: ['MITS Kochi', 'Finalist'],
    logos: [
      { name: 'mits', label: 'MITS' },
      { name: 'nba', label: 'NBA' }
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
    pills: ['College Union', 'CS(AI)'],
    logos: [
      { name: 'mits', label: 'MITS' },
      { name: 'union', label: 'Union' }
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
    pills: ['MariApps', 'SmartCity'],
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
    pills: ['Cambridge', 'C1 / B2 English'],
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
 * Generates a liquid glass credential card canvas matching the reference aesthetic:
 *   - Dark smoky frosted glass background with subtle specular top edge reflection
 *   - Clean brand logos on the top left
 *   - Monumental white typography for the title (2 lines max)
 *   - Bottom-left verified hexagonal badge emblem with date/score
 *   - Center pill badges with tech / organization tags
 *   - Clean monospace CREDENTIAL ID
 *   - Bottom-right golden/accent rosette ribbon award seal
 */
export function generateCredentialCardCanvas(cert, isActive = false) {
  const canvas = document.createElement('canvas');
  const w = 640;
  const h = 400;
  const dpr = 2; // High-DPI Retina sharpness
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  const pad = 4;
  const bX = pad;
  const bY = pad;
  const bW = w - pad * 2;
  const bH = h - pad * 2;
  const bR = 22;

  // 1. Clip card body with rounded corners
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(bX, bY, bW, bH, bR);
  ctx.clip();

  // Multi-stop translucent liquid glass gradient with dark obsidian/emerald undertones
  const bgGrad = ctx.createLinearGradient(bX, bY, bX + bW * 0.8, bY + bH);
  bgGrad.addColorStop(0, 'rgba(25, 33, 44, 0.88)');
  bgGrad.addColorStop(0.35, 'rgba(15, 21, 28, 0.92)');
  bgGrad.addColorStop(0.7, 'rgba(10, 14, 18, 0.95)');
  bgGrad.addColorStop(1, 'rgba(6, 9, 12, 0.98)');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(bX, bY, bW, bH);

  // Fine liquid frosted glass noise
  ctx.globalAlpha = 0.028;
  for (let i = 0; i < 300; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? '#FFFFFF' : '#000000';
    ctx.fillRect(
      bX + Math.random() * bW,
      bY + Math.random() * bH,
      Math.random() * 2 + 0.5,
      Math.random() * 2 + 0.5
    );
  }
  ctx.globalAlpha = 1;

  // Glass refractive diagonal wash (liquid light prism)
  const prismSweep = ctx.createLinearGradient(bX, bY, bX + bW * 0.9, bY + bH * 0.85);
  prismSweep.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
  prismSweep.addColorStop(0.22, 'rgba(255, 255, 255, 0.045)');
  prismSweep.addColorStop(0.5, 'rgba(255, 255, 255, 0.01)');
  prismSweep.addColorStop(0.78, 'rgba(255, 255, 255, 0.035)');
  prismSweep.addColorStop(1, 'transparent');
  ctx.fillStyle = prismSweep;
  ctx.fillRect(bX, bY, bW, bH);

  // Specular top-left glass reflection sheen (liquid bubble bloom)
  const bloom = ctx.createRadialGradient(bX + 90, bY + 45, 10, bX + 130, bY + 75, 340);
  bloom.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
  bloom.addColorStop(0.4, 'rgba(255, 255, 255, 0.035)');
  bloom.addColorStop(1, 'transparent');
  ctx.fillStyle = bloom;
  ctx.fillRect(bX, bY, bW, bH);

  // Curved liquid light sweep (like reflection on a curved watch crystal / curved screen)
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(bX + bW * 0.38, bY - 30, bW * 0.62, bH * 0.58, -0.18, 0, Math.PI * 2);
  const curvedGlow = ctx.createLinearGradient(bX, bY, bX + bW * 0.6, bY + bH * 0.5);
  curvedGlow.addColorStop(0, 'rgba(255, 255, 255, 0.09)');
  curvedGlow.addColorStop(0.6, 'rgba(255, 255, 255, 0.015)');
  curvedGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = curvedGlow;
  ctx.fill();
  ctx.restore();

  // Inner liquid glass bezel rim (subtle bevel reflection)
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(bX + 1.2, bY + 1.2, bW - 2.4, bH - 2.4, bR - 1);
  const rimGrad = ctx.createLinearGradient(bX, bY, bX + bW * 0.65, bY + bH);
  rimGrad.addColorStop(0, 'rgba(255, 255, 255, 0.42)');
  rimGrad.addColorStop(0.28, 'rgba(255, 255, 255, 0.16)');
  rimGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.03)');
  rimGrad.addColorStop(1, 'transparent');
  ctx.strokeStyle = rimGrad;
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.restore();

  // If active card, luminous internal liquid lime aura wash
  if (isActive) {
    const greenWash = ctx.createRadialGradient(bX + bW * 0.5, bY + bH * 0.42, 25, bX + bW * 0.5, bY + bH * 0.42, bW * 0.58);
    greenWash.addColorStop(0, 'rgba(163, 230, 53, 0.11)');
    greenWash.addColorStop(0.45, 'rgba(163, 230, 53, 0.04)');
    greenWash.addColorStop(1, 'transparent');
    ctx.fillStyle = greenWash;
    ctx.fillRect(bX, bY, bW, bH);
  }

  ctx.restore();

  // 2. TOP ROW: Brand Logos
  let curX = 38;
  const topY = 32;
  const maxLogoH = 34;

  cert.logos.forEach(logo => {
    const cachedImg = LOGO_CACHE.get(logo.name);
    const hasImage = cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0;

    if (hasImage) {
      const imgAspect = cachedImg.naturalWidth / cachedImg.naturalHeight;
      const drawH = maxLogoH;
      const drawW = Math.min(drawH * imgAspect, 80);

      ctx.save();
      ctx.drawImage(cachedImg, curX, topY + (maxLogoH - drawH) / 2, drawW, drawH);
      ctx.restore();
      curX += drawW + 16;
    } else {
      ctx.save();
      ctx.font = 'bold 12px -apple-system, sans-serif';
      const textW = ctx.measureText(logo.label || logo.name).width;
      const pillW = textW + 22;
      ctx.beginPath();
      ctx.roundRect(curX, topY + 2, pillW, 28, 8);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(logo.label || logo.name, curX + pillW / 2, topY + 16);
      ctx.restore();
      curX += pillW + 12;
    }
  });

  // 3. TITLE: Big Bold Modern White Typography (Matching Image 2)
  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 32px "Syne", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  const titleX = 38;
  const titleY = 105;
  const maxTitleW = 560;

  let words = cert.title.split(' ');
  let line1 = '';
  let line2 = '';

  for (let i = 0; i < words.length; i++) {
    let test = line1 ? line1 + ' ' + words[i] : words[i];
    if (ctx.measureText(test).width <= maxTitleW && !line2) {
      if (words.length > 3 && i >= Math.ceil(words.length / 2)) {
        line1 = line1 || test;
        line2 = words.slice(i).join(' ');
        break;
      } else {
        line1 = test;
      }
    } else {
      line2 = words.slice(i).join(' ');
      break;
    }
  }

  ctx.fillText(line1, titleX, titleY);
  if (line2) {
    ctx.fillText(line2, titleX, titleY + 40);
  }
  ctx.restore();

  // 4. BOTTOM LEFT: Hexagonal / Shield Credential Badge
  ctx.save();
  const badgeX = 38;
  const badgeY = 248;
  const badgeW = 68;
  const badgeH = 74;

  // Draw sleek hexagonal shield
  const bx = badgeX + badgeW / 2;
  const by = badgeY + badgeH / 2;
  const br = 32;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = ((i * 60 - 30) * Math.PI) / 180;
    const px = bx + br * Math.cos(angle);
    const py = by + br * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();

  // Badge fill with subtle accent glow
  const accentHex = cert.accent || '#D2FF00';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fill();
  ctx.strokeStyle = accentHex + 'aa';
  ctx.lineWidth = 1.8;
  ctx.stroke();

  // Inner emblem ring inside badge
  ctx.beginPath();
  ctx.arc(bx, by - 6, 11, 0, Math.PI * 2);
  ctx.strokeStyle = accentHex;
  ctx.lineWidth = 1.4;
  ctx.stroke();

  // Center checkmark inside emblem
  ctx.beginPath();
  ctx.moveTo(bx - 5, by - 6);
  ctx.lineTo(bx - 1, by - 2);
  ctx.lineTo(bx + 5, by - 8);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Date or label below emblem inside badge
  ctx.font = 'bold 10px monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const badgeLabel = cert.date.length > 8 ? cert.date.slice(0, 8) : cert.date;
  ctx.fillText(badgeLabel, bx, by + 16);
  ctx.restore();

  // 5. BOTTOM ROW: Glassy Pill Badges
  ctx.save();
  const pillStartX = 126;
  let pillX = pillStartX;
  const pillY = 260;
  const pills = cert.pills || [cert.org.split(' ')[0], cert.badge.replace(/[^\w\s%]/g, '').trim()];

  pills.forEach(pillText => {
    ctx.font = 'bold 13px -apple-system, sans-serif';
    const textW = ctx.measureText(pillText).width;
    const pW = textW + 28;
    const pH = 32;

    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pW, pH, 16);

    const pillGrad = ctx.createLinearGradient(pillX, pillY, pillX, pillY + pH);
    pillGrad.addColorStop(0, 'rgba(255, 255, 255, 0.14)');
    pillGrad.addColorStop(1, 'rgba(255, 255, 255, 0.04)');
    ctx.fillStyle = pillGrad;
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.26)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(pillX + 10, pillY + 1);
    ctx.lineTo(pillX + pW - 10, pillY + 1);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(pillText, pillX + pW / 2, pillY + pH / 2);

    pillX += pW + 12;
  });
  ctx.restore();

  // 6. BORDER & LIQUID GLASS EDGES (Subpixel Anti-Aliased on High-DPI Retina Canvas)
  if (isActive) {
    // A. Soft outer liquid neon halo
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(bX, bY, bW, bH, bR);
    ctx.strokeStyle = 'rgba(163, 230, 53, 0.42)';
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.restore();

    // B. Radiant primary neon lime line
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(bX, bY, bW, bH, bR);
    ctx.strokeStyle = '#a3e635';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();

    // C. Inner specular liquid core rim
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(bX + 1, bY + 1, bW - 2, bH - 2, bR - 1);
    ctx.strokeStyle = 'rgba(217, 249, 157, 0.85)';
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.restore();

    // D. Glassy top specular highlight across active neon border
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(bX + bR, bY);
    ctx.lineTo(bX + bW - bR, bY);
    const limeGlassSheen = ctx.createLinearGradient(bX + bR, bY, bX + bW - bR, bY);
    limeGlassSheen.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
    limeGlassSheen.addColorStop(0.35, 'rgba(217, 249, 157, 0.9)');
    limeGlassSheen.addColorStop(1, 'rgba(163, 230, 53, 0.25)');
    ctx.strokeStyle = limeGlassSheen;
    ctx.lineWidth = 1.6;
    ctx.stroke();
    ctx.restore();
  } else {
    // Subtle Liquid Glass Border for Inactive Cards
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(bX, bY, bW, bH, bR);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 1.6;
    ctx.stroke();

    // Top Edge Specular Highlight Line
    ctx.beginPath();
    ctx.moveTo(bX + bR, bY);
    ctx.lineTo(bX + bW - bR, bY);
    const topSheen = ctx.createLinearGradient(bX + bR, bY, bX + bW - bR, bY);
    topSheen.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
    topSheen.addColorStop(0.35, 'rgba(255, 255, 255, 0.26)');
    topSheen.addColorStop(1, 'rgba(255, 255, 255, 0.06)');
    ctx.strokeStyle = topSheen;
    ctx.lineWidth = 1.6;
    ctx.stroke();
    ctx.restore();
  }

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
          <h2 class="cylinder-title font-display">MY CERTIFICATES</h2>
        </div>

        <!-- React Bits CircularCarousel Viewport Mount -->
        <div class="cylinder-viewport" id="orbit3d-stage" role="region" aria-label="3D Certificates Ring">
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

    // Generate liquid glass cards
    const items = CERTIFICATES.map(cert => ({
      src: generateCredentialCardCanvas(cert, false),
      activeSrc: generateCredentialCardCanvas(cert, true),
      alt: `${cert.title} — ${cert.org}`,
      title: cert.title,
      subtitle: `${cert.badge} · ${cert.subtitle}`,
      cert
    }));

    this.carousel = new CircularCarousel(mount, {
      items,
      preset: 'cylinder',
      intro: 'rise',
      cardWidth: 420,
      aspectRatio: 1.6,   // 640 / 400
      gap: 26,
      curve: 0.32,
      tilt: -13,
      roll: -5,
      cardRoll: -3,
      perspective: 1600,
      autoplay: 'drift',
      speed: 7,
      interval: 3.5,
      direction: 'left',
      draggable: true,
      momentum: 0.65,
      snap: true,
      pauseOnHover: true,
      focusOnClick: true,
      parallax: 0.22,
      stretch: 0.2,
      depthFade: 0.52,
      fadeColor: '#050806',
      innerShade: 0.45,
      cornerRadius: 22,
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
      src: generateCredentialCardCanvas(cert, false),
      activeSrc: generateCredentialCardCanvas(cert, true),
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
