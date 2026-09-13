/* ==========================================================================
   MAIN APPLICATION SCRIPT - MR. NOBODY PORTFOLIO (PRODUCTION AUDITED)
   ========================================================================== */

// --- 1. Synthesized Cyber Audio Engine (Web Audio API) ---
class CyberAudio {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('cyber-audio-muted') === 'true';
  }

  initContext() {
    try {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    } catch (_) {}
  }

  playClick() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(750, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch (_) {}
  }

  playBeep(freq = 1100, duration = 0.05) {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (_) {}
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('cyber-audio-muted', this.muted);
    return this.muted;
  }
}

window.AudioEngine = new CyberAudio();

// --- 2. Accessible Typewriter Effect ---
class Typewriter {
  constructor(element, words, waitTime = 2200) {
    this.element = element;
    this.words = words;
    this.waitTime = parseInt(waitTime, 10);
    this.txt = '';
    this.wordIndex = 0;
    this.isDeleting = false;
    this.timeoutId = null;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.element.textContent = this.words[0];
      return;
    }

    this.type();
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.element.textContent = this.txt;

    let typeSpeed = 80;
    if (this.isDeleting) typeSpeed /= 2;

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.waitTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 350;
    }

    this.timeoutId = setTimeout(() => this.type(), typeSpeed);
  }
}

// --- 3. Main Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Matrix Canvas Engine
  window.matrixInstance = new window.MatrixEngine('matrix-canvas');

  // Initialize Cyber Terminal CLI
  new window.CyberTerminal('terminal-body', 'terminal-input');

  // Initialize Typewriter
  const typingElem = document.getElementById('typing-text');
  if (typingElem) {
    new Typewriter(typingElem, [
      'Penetration Testing & Offensive Security',
      'Security Research & Threat Modeling',
      'AI Architectures & Automation Engineering',
      'Web Application Hardening',
      'CTF Challenge Solving & Labs'
    ]);
  }

  // --- Theme Switching ---
  const themeDots = document.querySelectorAll('.theme-dot');
  window.setTheme = (themeName) => {
    document.body.classList.remove('theme-cyan', 'theme-crimson');
    themeDots.forEach(dot => dot.classList.remove('active'));

    let activeColor = '#00ff88';
    if (themeName === 'cyan') {
      document.body.classList.add('theme-cyan');
      activeColor = '#00f0ff';
      const d = document.querySelector('.theme-dot.cyan');
      if (d) d.classList.add('active');
    } else if (themeName === 'crimson') {
      document.body.classList.add('theme-crimson');
      activeColor = '#ff3366';
      const d = document.querySelector('.theme-dot.crimson');
      if (d) d.classList.add('active');
    } else {
      const d = document.querySelector('.theme-dot.green');
      if (d) d.classList.add('active');
    }

    if (window.matrixInstance) window.matrixInstance.setColor(activeColor);
    localStorage.setItem('cyber-theme', themeName);
  };

  themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const t = dot.getAttribute('data-theme');
      window.setTheme(t);
      window.AudioEngine.playClick();
    });
  });

  const savedTheme = localStorage.getItem('cyber-theme') || 'green';
  window.setTheme(savedTheme);

  // --- Matrix Toggle Button ---
  const matrixBtn = document.getElementById('matrix-toggle-btn');
  if (matrixBtn) {
    matrixBtn.addEventListener('click', () => {
      if (window.matrixInstance) {
        const isRunning = window.matrixInstance.toggle();
        showToast(isRunning ? 'Matrix Canvas: ACTIVE' : 'Matrix Canvas: PAUSED');
        matrixBtn.setAttribute('aria-pressed', String(isRunning));
        window.AudioEngine.playClick();
      }
    });
  }

  // --- Audio FX Toggle Button ---
  const audioBtn = document.getElementById('audio-toggle-btn');
  const audioIcon = document.getElementById('audio-icon');

  function updateAudioIcon(isMuted) {
    if (!audioIcon) return;
    if (isMuted) {
      audioIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />`;
      audioBtn.setAttribute('title', 'Cyber Audio: MUTED (Click to unmute)');
      audioBtn.setAttribute('aria-label', 'Unmute audio');
    } else {
      audioIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />`;
      audioBtn.setAttribute('title', 'Cyber Audio: ONLINE (Click to mute)');
      audioBtn.setAttribute('aria-label', 'Mute audio');
    }
  }

  if (audioBtn) {
    updateAudioIcon(window.AudioEngine.muted);
    audioBtn.addEventListener('click', () => {
      const isMuted = window.AudioEngine.toggleMute();
      updateAudioIcon(isMuted);
      showToast(isMuted ? 'Cyber Audio: MUTED' : 'Cyber Audio: ONLINE');
      if (!isMuted) window.AudioEngine.playBeep(880, 0.08);
    });
  }

  // --- Navigation & Scroll Indicator ---
  const nav = document.querySelector('.cyber-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    updateActiveNav();
  }, { passive: true });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 130;
      const sectionId = current.getAttribute('id');
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // --- Mobile Navigation ---
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinksList = document.getElementById('nav-links');

  if (mobileBtn && navLinksList) {
    const closeMenu = () => {
      navLinksList.classList.remove('open');
      mobileBtn.setAttribute('aria-expanded', 'false');
    };

    mobileBtn.addEventListener('click', () => {
      const isOpen = navLinksList.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', String(isOpen));
      window.AudioEngine.playClick();
    });

    navLinksList.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinksList.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // --- Project Filter ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      window.AudioEngine.playClick();
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.split(' ').includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- Skills Tabs ---
  const skillTabs = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      window.AudioEngine.playClick();
      skillTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-pressed', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-pressed', 'true');

      const tabCategory = tab.getAttribute('data-skill-tab');
      skillCards.forEach(card => {
        const cat = card.getAttribute('data-skill-cat');
        if (tabCategory === 'all' || cat === tabCategory) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- Animated Metrics Counters ---
  const counters = document.querySelectorAll('.counter-val');
  let animated = false;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target') || 0;
          const suffix = counter.getAttribute('data-suffix') || '';

          if (isReducedMotion) {
            counter.innerText = target + suffix;
            return;
          }

          let count = 0;
          const step = Math.max(1, Math.ceil(target / 40));
          const updateCount = () => {
            count += step;
            if (count < target) {
              counter.innerText = count;
              setTimeout(updateCount, 30);
            } else {
              counter.innerText = target + suffix;
            }
          };
          updateCount();
        });
      }
    });
  }, { threshold: 0.25 });

  const metricsSec = document.querySelector('.metrics-section');
  if (metricsSec) counterObserver.observe(metricsSec);

  // --- Clipboard Copy Helpers ---
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          window.AudioEngine.playBeep(1200, 0.08);
          showToast(`Copied: ${textToCopy}`);
          const original = btn.innerText;
          btn.innerText = 'COPIED!';
          setTimeout(() => { btn.innerText = original; }, 2000);
        }).catch(() => {
          showToast(`Could not copy: ${textToCopy}`);
        });
      }
    });
  });

  // --- Contact Form Handling ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.AudioEngine.playBeep(1000, 0.08);

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all fields.');
        return;
      }

      // Safe HTML construction
      const safeName = String(name).replace(/[&<>'"]/g, '');
      const subject = encodeURIComponent(`Security Inquiry from ${safeName}`);
      const body = encodeURIComponent(`Sender: ${name} (${email})\n\nMessage:\n${message}`);
      const mailtoUrl = `mailto:bmx310712@gmail.com?subject=${subject}&body=${body}`;

      formStatus.className = 'form-status success';
      formStatus.innerHTML = `
        <div style="font-weight: 700; margin-bottom: 0.5rem; color: var(--accent-primary);">
          [✓] Message prepared for dispatch!
        </div>
        <div style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
          Recipient: <code>bmx310712@gmail.com</code>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="${mailtoUrl}" class="cyber-btn cyber-btn-primary" style="padding: 0.5rem 1rem; font-size: 0.78rem;">
            Send via Email Client &rarr;
          </a>
          <button type="button" class="cyber-btn cyber-btn-outline" id="copy-msg-btn" style="padding: 0.5rem 1rem; font-size: 0.78rem;">
            Copy Formatted Message
          </button>
        </div>
      `;
      formStatus.style.display = 'block';

      const copyMsgBtn = document.getElementById('copy-msg-btn');
      if (copyMsgBtn) {
        copyMsgBtn.addEventListener('click', () => {
          const rawText = `From: ${name} (${email})\n\nMessage:\n${message}`;
          navigator.clipboard.writeText(rawText).then(() => {
            showToast('Message copied to clipboard!');
            copyMsgBtn.innerText = 'Copied!';
          });
        });
      }

      contactForm.reset();
    });
  }

  // Auditory feedback on clickable interactive controls
  document.querySelectorAll('.cyber-btn, .hero-social-link, .project-link-icon, .filter-btn, .skill-tab-btn').forEach(el => {
    el.addEventListener('click', () => window.AudioEngine.playClick());
  });
});

// Accessible Toast Notification Engine
function showToast(msg) {
  let toast = document.getElementById('cyber-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cyber-toast';
    toast.className = 'cyber-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}
