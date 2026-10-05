/**
 * CONTACT & TRANSMISSION PROTOCOL ENGINE
 * ----------------------------------------------------
 * Handles interactive contact mechanisms, clipboard copy feedback,
 * telemetry status, and seamless smooth return-to-launchpad navigation.
 */

export function initContactSection() {
  const contactSection = document.getElementById('contact');
  if (!contactSection) return null;

  const toast = document.getElementById('contact-toast');
  const toastText = document.getElementById('contact-toast-text');
  let toastTimer = null;

  /**
   * Display toast notification with telemetry styling
   */
  function showToast(message) {
    if (!toast) return;
    if (toastText) toastText.textContent = message;
    toast.classList.add('is-active');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-active');
    }, 2600);
  }

  /**
   * Copy to clipboard with fallback
   */
  async function copyText(text, successMsg, triggerBtn) {
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        copied = true;
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        copied = document.execCommand('copy');
        textArea.remove();
      }
    } catch (err) {
      console.warn('[Contact] Clipboard copy error:', err);
    }

    if (copied) {
      showToast(successMsg || `COPIED: ${text}`);

      if (triggerBtn) {
        const label = triggerBtn.querySelector('.copy-label') || triggerBtn;
        const origText = label.textContent;
        label.textContent = 'COPIED ✓';
        triggerBtn.classList.add('is-copied');

        setTimeout(() => {
          label.textContent = origText;
          triggerBtn.classList.remove('is-copied');
        }, 1800);
      }
    }
  }

  // Bind all copy buttons
  const copyButtons = contactSection.querySelectorAll('.copy-btn');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = btn.dataset.copy;
      if (val) {
        const isEmail = val.includes('@');
        const msg = isEmail ? `COPIED TO CLIPBOARD: ${val}` : `PHONE NUMBER COPIED: ${val}`;
        copyText(val, msg, btn);
      }
    });
  });

  // Return to top / Launchpad handler
  const returnTopBtn = document.getElementById('contact-return-top-btn');
  if (returnTopBtn) {
    returnTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.AppState && window.AppState.lenis) {
        window.AppState.lenis.scrollTo(0, { duration: 1.4 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Interactive subtle 3D card tilt on desktop
  const cards = contactSection.querySelectorAll('.contact-card');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  console.log('[Contact] Transmission protocol initialized.');

  return {
    showToast,
    copyText
  };
}
