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



  // Interactive subtle 3D cartridge tilt on desktop (Matching high-end editorial feel)
  const cartridges = contactSection.querySelectorAll('.contact-cartridge');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    cartridges.forEach((cartridge) => {
      cartridge.addEventListener('mousemove', (e) => {
        const rect = cartridge.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        cartridge.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px) scale3d(1.015, 1.015, 1.015)`;
      });

      cartridge.addEventListener('mouseleave', () => {
        cartridge.style.transform = '';
      });
    });

    // Subtle cursor magnetic parallax for the monumental title
    const title = document.getElementById('contact-monumental-heading');
    if (title) {
      window.addEventListener('mousemove', (e) => {
        if (contactSection.getBoundingClientRect().top < window.innerHeight && contactSection.getBoundingClientRect().bottom > 0) {
          const normX = (e.clientX / window.innerWidth) * 2 - 1;
          const normY = (e.clientY / window.innerHeight) * 2 - 1;
          title.style.transform = `translate3d(${(normX * 6).toFixed(1)}px, ${(normY * 4).toFixed(1)}px, 0)`;
        }
      }, { passive: true });
    }
  }

  console.log('[Contact] Monumental transmission protocol initialized.');

  return {
    showToast,
    copyText
  };
}
