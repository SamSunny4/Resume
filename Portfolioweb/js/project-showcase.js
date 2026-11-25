import { PROJECT_NODES } from './projects.js';

// Presentation copy stays separate from the project's technical registry.
const EDITORIAL = {
  keybase: { group: 'Systems', label: 'Desktop software', status: 'Commercial deployment', headline: 'Built for the everyday business.', summary: 'Customer records, key duplication, and sales — brought together in a desktop application used in retail.', accent: '#9ce0d0', art: 'key', words: ['CAPTURE', 'FIND', 'MANAGE'] },
  sharedash: { group: 'Systems', label: 'File transfer', status: 'Native desktop + Android', headline: 'Your files. The fast way across.', summary: 'Offline file sharing that brings USB and Wi-Fi together. Built in Rust, with a native desktop interface and Android companion.', accent: '#ffae83', art: 'transfer', words: ['USB', 'WI-FI', 'OFFLINE'] },
  leadis: { group: 'AI & vision', label: 'Applied AI', status: 'AI Samasya · National 2nd prize', headline: 'Making movement meaningful.', summary: 'An AI-assisted developmental screening platform connecting pose estimation, structured assessments, and machine learning.', accent: '#d2ff00', art: 'pose', words: ['OBSERVE', 'ESTIMATE', 'ASSESS'] },
  infogrid: { group: 'Web', label: 'Digital signage', status: 'Full-stack CMS', headline: 'One screen. A connected campus.', summary: 'News, events, and announcements in one digital signage platform, with a dedicated admin panel to keep everything current.', accent: '#c4b1ff', art: 'screen', words: ['PUBLISH', 'SCHEDULE', 'DISPLAY'] },
  rainiest: { group: 'Web', label: 'Civic weather', status: 'Across 14 Kerala districts', headline: 'A little clarity on a rainy day.', summary: 'A public dashboard bringing Kerala rainfall updates and education leave declarations into one place.', accent: '#99cfff', art: 'rain', words: ['RAINFALL', 'DISTRICTS', 'UPDATES'] },
  lateloggy: { group: 'Web', label: 'Campus operations', status: 'QR-based entry verification', headline: 'Less paperwork. More class time.', summary: 'QR check-ins, dynamic student passes, and faculty alerts in a single campus late-entry workflow.', accent: '#a6e5ac', art: 'pass', words: ['SCAN', 'VERIFY', 'ENTER'] },
  fitman: { group: 'AI & vision', label: 'Computer vision', status: 'Real-time posture tracking', headline: 'Movement, measured.', summary: 'A computer vision pipeline that turns skeletal landmarks into exercise repetitions, joint angles, and posture feedback.', accent: '#f3be7b', art: 'pose', words: ['LANDMARKS', 'ANGLES', 'FEEDBACK'] },
  'threed-s': { group: 'Systems', label: 'Spatial computing', status: '3D graphics pipeline', headline: 'From points to perspective.', summary: 'Exploring spatial reconstruction through depth meshes, point clouds, and real-time 3D visualization.', accent: '#e3a6d6', art: 'spatial', words: ['POINTS', 'DEPTH', 'SPACE'] },
  fakepaste: { group: 'Systems', label: 'Windows utility', status: 'Standalone desktop application', headline: 'Typing with a human rhythm.', summary: 'A configurable typing simulator with adjustable speed, punctuation pauses, corrections, and a global stop hotkey.', accent: '#e6d68e', art: 'type', words: ['PACE', 'PAUSE', 'TYPE'] },
};
const ORDER = ['keybase', 'sharedash', 'leadis', 'infogrid', 'rainiest', 'lateloggy', 'fitman', 'threed-s', 'fakepaste'];
const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const arrow = '<span aria-hidden="true">↗</span>';

function artwork(project, meta) {
  const icon = `<img src="${escape(project.icon)}" alt="" class="work-art-icon" width="120" height="120">`;
  const pose = `<svg class="work-pose" viewBox="0 0 400 280" fill="none" aria-hidden="true"><g stroke="currentColor" stroke-width="2"><path d="M200 65 164 100 145 153 112 175M200 65 236 100 255 153 288 175M164 100 236 100 226 166 174 166Z M174 166 155 220 137 260M226 166 245 220 263 260"/><circle cx="200" cy="40" r="22"/></g><g fill="currentColor">${[[200,65],[164,100],[145,153],[112,175],[236,100],[255,153],[288,175],[174,166],[226,166],[155,220],[137,260],[245,220],[263,260]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5"/>`).join('')}</g><path d="M75 30H45V60M325 30H355V60M45 220V250H75M355 220V250H325" stroke="currentColor" opacity=".4"/></svg>`;
  const arts = {
    key: `<div class="work-key-emblem">${icon}</div><div class="work-art-orbit orbit-one"></div><div class="work-art-orbit orbit-two"></div><span class="work-art-large">KB</span>`,
    transfer: `<div class="work-device work-laptop"><span>DESKTOP</span>${icon}<i></i></div><div class="work-transfer-path"><i></i><i></i><i></i><span>DIRECT TRANSFER</span></div><div class="work-device work-phone"><span>ANDROID</span><b>↓</b><i></i></div>`,
    pose,
    screen: '<div class="work-signage"><div class="signage-top">INFOGRID <span>↗</span></div><strong>What’s<br>happening.</strong><div class="signage-lines"><i></i><i></i></div><div class="signage-bottom"><span>NEWS<br>EVENTS<br>CAMPUS</span><b>↗</b></div></div><span class="work-art-large">IG</span>',
    rain: `<div class="work-rain-lines">${Array.from({length:14},(_,i)=>`<i style="--i:${i}"></i>`).join('')}</div><div class="work-weather"><span>KERALA / WEATHER</span><strong>14</strong><span>DISTRICTS. ONE VIEW.</span></div>`,
    pass: '<div class="work-entry-pass"><span>LATELOGGY <b>↗</b></span><div class="work-pass-symbol">L<span>✓</span></div><strong>A smarter check-in.</strong><div class="work-pass-line"></div><small>SCAN / VERIFY / ENTER</small></div>',
    spatial: '<div class="work-spatial"><i></i><i></i><i></i><i></i><i></i></div><span class="work-art-large">3D</span>',
    type: '<div class="work-type"><span>FAKEPASTE / TYPING UTILITY</span><strong>Hello,<br>world<span class="work-caret">_</span></strong><div><kbd>ctrl</kbd><span>+</span><kbd>v</kbd><i>→</i><kbd>Aa</kbd></div></div>',
  };
  return `<div class="work-art work-art--${meta.art}" aria-hidden="true"><div class="work-art-grid"></div><span class="work-art-label">${escape(meta.label)} / ${String(ORDER.indexOf(project.id)+1).padStart(2,'0')}</span>${arts[meta.art]}<div class="work-art-caption">${meta.words.map(word=>`<span>${word}</span>`).join('<i> / </i>')}</div></div>`;
}

export function initProjectShowcase() {
  const root = document.getElementById('project-explorer');
  if (!root) return null;
  const projects = ORDER.map(id => PROJECT_NODES.find(p => p.id === id)).filter(Boolean);
  let category = 'All work';
  let active = projects[0].id;
  let opener = null;
  const list = root.querySelector('.work-index');
  const feature = root.querySelector('.work-feature');
  const counter = root.querySelector('.work-count');
  const announcement = root.querySelector('.work-announcement');
  const dialog = document.getElementById('work-dialog');
  const visibleProjects = () => projects.filter(p => category === 'All work' || EDITORIAL[p.id].group === category);

  function renderList() {
    list.innerHTML = visibleProjects().map(p => `<button type="button" class="work-index-item${p.id === active ? ' is-selected' : ''}" data-project="${p.id}" aria-pressed="${p.id === active}" aria-controls="work-feature"><span class="work-index-number">${String(ORDER.indexOf(p.id)+1).padStart(2,'0')}</span><span class="work-index-text"><strong>${escape(p.name)}</strong><small>${escape(EDITORIAL[p.id].label)}</small></span><span class="work-index-arrow" aria-hidden="true">↗</span></button>`).join('');
    counter.textContent = `${String(visibleProjects().length).padStart(2,'0')} projects`;
  }

  function renderFeature() {
    const p = projects.find(p => p.id === active);
    const meta = EDITORIAL[p.id];
    feature.style.setProperty('--work-accent', meta.accent);
    feature.innerHTML = `${artwork(p, meta)}<div class="work-feature-copy"><div class="work-feature-top"><span class="work-status"><i></i>${escape(meta.status)}</span><span class="work-position">${String(ORDER.indexOf(p.id)+1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}</span></div><h3>${escape(p.name)}</h3><p class="work-headline">${escape(meta.headline)}</p><p class="work-summary">${escape(meta.summary)}</p><ul class="work-stack" aria-label="Technologies">${p.tech.slice(0,4).map(t=>`<li>${escape(t)}</li>`).join('')}</ul><div class="work-actions"><button type="button" class="work-primary" data-details>Explore project <span aria-hidden="true">↗</span></button><a class="work-repo" href="${escape(p.github)}" target="_blank" rel="noopener noreferrer">Source code ${arrow}</a><div class="work-stepper"><button type="button" data-step="-1" aria-label="Previous project">←</button><button type="button" data-step="1" aria-label="Next project">→</button></div></div></div>`;
  }

  function select(id) {
    active = id;
    list.querySelectorAll('[data-project]').forEach(button => {
      const selected = button.dataset.project === active;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    renderFeature();
    announcement.textContent = `${projects.find(p => p.id === active).name} selected`;
  }

  root.addEventListener('click', event => {
    const filter = event.target.closest('[data-work-filter]');
    if (filter) {
      category = filter.dataset.workFilter;
      if (!visibleProjects().some(p => p.id === active)) active = visibleProjects()[0].id;
      root.querySelectorAll('[data-work-filter]').forEach(button => button.setAttribute('aria-pressed', String(button === filter)));
      renderList();
      renderFeature();
      announcement.textContent = `${visibleProjects().length} ${category === 'All work' ? '' : category} projects`;
    }
    const item = event.target.closest('[data-project]');
    if (item) select(item.dataset.project);
    const step = event.target.closest('[data-step]');
    if (step) {
      const visible = visibleProjects();
      select(visible[(visible.findIndex(p => p.id === active) + Number(step.dataset.step) + visible.length) % visible.length].id);
      feature.querySelector(`[data-step="${step.dataset.step}"]`).focus({ preventScroll: true });
    }
    if (event.target.closest('[data-details]')) openDetails();
  });

  // Arrow keys also work in the project index without moving the page.
  list.addEventListener('keydown', event => {
    if (!['ArrowDown','ArrowUp','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const visible = visibleProjects();
    let index = visible.findIndex(p => p.id === active);
    index = event.key === 'Home' ? 0 : event.key === 'End' ? visible.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + visible.length) % visible.length;
    select(visible[index].id);
    list.querySelector(`[data-project="${active}"]`).focus({ preventScroll: true });
  });

  function openDetails() {
    const p = projects.find(p => p.id === active);
    const meta = EDITORIAL[p.id];
    opener = document.activeElement;
    dialog.style.setProperty('--work-accent', meta.accent);
    dialog.querySelector('.work-dialog-content').innerHTML = `<span class="work-eyebrow">${escape(meta.label)} / PROJECT NOTES</span><h2 id="work-dialog-title">${escape(p.name)}</h2><p class="work-dialog-headline">${escape(meta.headline)}</p><p class="work-dialog-description">${escape(p.desc)}</p><h3>Built with</h3><ul class="work-stack">${p.tech.map(t=>`<li>${escape(t)}</li>`).join('')}</ul><h3>Inside the project</h3><ul class="work-capabilities">${p.stats.map(s=>`<li>${escape(s)}</li>`).join('')}</ul><a href="${escape(p.github)}" class="work-primary" target="_blank" rel="noopener noreferrer">View repository ${arrow}</a>`;
    dialog.showModal();
    window.AppState?.lenis?.stop();
    document.body.classList.add('work-dialog-open');
  }
  dialog.querySelector('[data-close-work]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('work-dialog-open');
    window.AppState?.lenis?.start();
    if (opener?.isConnected) opener.focus({ preventScroll: true });
  });
  renderList();
  renderFeature();
  return { triggerProjectsZoom: () => window.AppState?.techSolar?.triggerProjectsZoom() };
}
