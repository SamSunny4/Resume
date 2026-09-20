/**
 * Sam Sunny Portfolio - Minimalist Black Interactions
 * Inspired by 21st.dev & Magic UI:
 * - Floating dock scroll tracking & active section spy
 * - Category filter chips with seamless display toggling
 * - Clean Certificate inspection modal (certificates only display when clicked)
 * - In-place clipboard copy with instant checkmark feedback
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Certificate Data for Inspection Lightbox
  const certificates = {
    'national-hackathon': {
      title: 'National Level 2nd Prize — AI SAMASYA Hackathon',
      tag: 'ICGAIFE 3.0 • Govt. of Kerala',
      image: 'assets/certificates/nationalhackathon.jpg',
      description: 'Awarded 2nd Prize and ₹30,000 cash prize among 30 national finalist teams in a 24-hour hackathon organized by IHRD and the Dept. of Higher Education, Kerala. Led Team "Beyond Vision" to build Leadis, an AI-assisted developmental screening platform for early identification of learning disabilities.',
      specs: {
        'Award': 'National 2nd Prize (₹30,000)',
        'Event': 'AI SAMASYA / ICGAIFE 3.0',
        'Date': 'January 16–17, 2026',
        'Role': 'Team Lead (Beyond Vision)'
      }
    },
    'isro-hackathon': {
      title: 'Bharatiya Antariksh Hackathon 2025 (ISRO)',
      tag: 'ISRO × Hack2Skill',
      image: 'assets/certificates/isrohackathon.png',
      description: 'Official Certificate of Acknowledgement for submitting an innovative software architecture addressing space operations and technology challenges.',
      specs: {
        'Organizer': 'ISRO & Hack2Skill (H2S)',
        'Certificate Code': '2025H2S06BAH25–P05177',
        'Year': '2025',
        'Domain': 'Applied Space Tech'
      }
    },
    'nptel-python': {
      title: 'Python for Data Science — Elite Certificate',
      tag: 'NPTEL • IIT Madras',
      image: 'assets/certificates/nptel.png',
      description: 'Completed 12-week national certification with an Elite grade (73%). Curriculum covered NumPy, Pandas, statistical modeling, data handling, and scientific visualization.',
      specs: {
        'Grade': 'Elite (73%)',
        'Institution': 'IIT Madras / NPTEL',
        'Duration': '12 Weeks',
        'Year': '2025'
      }
    },
    'program-rep': {
      title: 'Program Representative (UG) — CSE (AI)',
      tag: 'MITS College Union & Principal',
      image: 'assets/certificates/programrep.jpg',
      description: 'Awarded Certificate of Appreciation by the Principal and Dean of Student Affairs for serving as elected Program Representative in the MITS College Union for the academic year 2025–2026.',
      specs: {
        'Body': 'MITS College Union',
        'Academic Year': '2025–2026',
        'Department': 'Computer Science (AI)',
        'Signatories': 'Principal & Dean'
      }
    },
    'mern-stack': {
      title: 'Full Stack MERN Web Development',
      tag: 'Web Architecture Certification',
      image: 'assets/certificates/mernstack.jpg',
      description: 'Certification in full-stack JavaScript architecture covering React SPA principles, Express/Node.js REST microservices, and MongoDB schema design.',
      specs: {
        'Stack': 'MongoDB, Express, React, Node.js',
        'Focus': 'REST APIs, State, Production Deployment',
        'Year': '2025'
      }
    },
    'enerya-hackathon': {
      title: 'Enerya Hackathon Achievement',
      tag: 'Enerya Tech Conclave',
      image: 'assets/certificates/Eneryahackathon.png',
      description: 'Participation and achievement in a 24-hour rapid development sprint building functional software solutions.',
      specs: {
        'Event': 'Enerya Hackathon',
        'Format': 'Rapid Software Sprint',
        'Year': '2025'
      }
    }
  };

  // 2. Lightbox Modal Handling (Certificates only display when clicked)
  const modal = document.getElementById('certModal');
  const modalClose = document.getElementById('modalClose');
  const modalImg = document.getElementById('modalImg');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalSpecs = document.getElementById('modalSpecs');

  function openModal(key) {
    const data = certificates[key];
    if (!data) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.description;

    modalSpecs.innerHTML = '';
    for (const [k, v] of Object.entries(data.specs)) {
      const cell = document.createElement('div');
      cell.className = 'spec-cell';
      cell.innerHTML = `<strong>${k}</strong><span>${v}</span>`;
      modalSpecs.appendChild(cell);
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-cert]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const key = trigger.getAttribute('data-cert');
      openModal(key);
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const key = trigger.getAttribute('data-cert');
        openModal(key);
      }
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // 3. Project Filter Chips
  const filterChips = document.querySelectorAll('.filter-chip');
  const projectCards = document.querySelectorAll('.project-card-clean');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. In-Place Clipboard Copy with Instant Feedback
  document.querySelectorAll('.copy-btn-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      const textEl = btn.querySelector('.btn-text');
      const originalText = textEl ? textEl.textContent : '';

      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          if (textEl) {
            textEl.textContent = 'Copied!';
            btn.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            setTimeout(() => {
              textEl.textContent = originalText;
              btn.style.borderColor = '';
            }, 2000);
          }
        });
      }
    });
  });

  // 5. Scroll Progress Bar & Dock Dynamics
  const progressBar = document.getElementById('scrollProgressBar');
  const floatingDock = document.querySelector('.floating-dock');
  const sections = document.querySelectorAll('header[id], section[id]');
  const dockLinks = document.querySelectorAll('.dock-link');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

  let ticking = false;

  function onScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) : 0;

    // A. Update hairline progress bar
    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress})`;
    }

    // B. Dock scrolled elevation
    if (floatingDock) {
      if (scrollY > 30) {
        floatingDock.classList.add('scrolled');
      } else {
        floatingDock.classList.remove('scrolled');
      }
    }

    // C. Dock Active Section Spy
    let current = '';
    const scrollPos = scrollY + 140;

    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop) {
        current = sec.getAttribute('id');
      }
    });

    dockLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    mobileNavItems.forEach(link => {
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--text-primary)';
        link.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
      } else {
        link.style.color = '';
        link.style.backgroundColor = '';
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  // Initial calculation
  onScroll();

  // 6. IntersectionObserver for Fluid Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // 7. Interactive Spotlight Cursor Glow on Cards (Desktop/Mouse)
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const spotlightCards = document.querySelectorAll('.case-card, .stack-group, .credential-row-clean, .timeline-row, .contact-card-box');
    spotlightCards.forEach(card => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  // 8. Mobile Navigation Drawer Controller
  const mobileToggle = document.getElementById('dockMobileToggle');
  const mobileNavPanel = document.getElementById('mobileNavPanel');

  function openMobileNav() {
    if (!mobileNavPanel || !mobileToggle) return;
    mobileNavPanel.style.display = 'block';
    mobileNavPanel.classList.add('active');
    mobileNavPanel.setAttribute('aria-hidden', 'false');
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMobileNav() {
    if (!mobileNavPanel || !mobileToggle) return;
    mobileNavPanel.classList.remove('active');
    mobileNavPanel.setAttribute('aria-hidden', 'true');
    mobileNavPanel.style.display = 'none';
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = mobileNavPanel.classList.contains('active');
      if (isActive) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  // Close mobile nav when tapping any link
  document.querySelectorAll('.mobile-nav-item, .mobile-nav-direct').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  // Close when clicking outside the panel
  document.addEventListener('click', (e) => {
    if (mobileNavPanel && mobileNavPanel.classList.contains('active')) {
      if (!mobileNavPanel.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileNav();
      }
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavPanel && mobileNavPanel.classList.contains('active')) {
      closeMobileNav();
    }
  });

});
