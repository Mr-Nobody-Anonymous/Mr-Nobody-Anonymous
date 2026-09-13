/* ==========================================================================
   MATRIX DIGITAL RAIN CANVAS ENGINE (PRODUCTION & ACCESSIBILITY OPTIMIZED)
   ========================================================================== */

class MatrixRain {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d', { alpha: false });
    
    // Characters: Katakana, Numbers, Hex, Symbols
    this.characters = '0123456789ABCDEF01010101XYZΩΨΠΣλµ§±√≈≡≠≤≥アカサタナハマヤラワイキシチニヒミリウクスツヌフムユルエケセテネヘメレオコソトノホモヨロワン';
    
    this.fontSize = 14;
    this.columns = 0;
    this.drops = [];
    this.primaryColor = '#00ff88';
    this.glowColor = 'rgba(0, 255, 136, 0.4)';
    this.animationId = null;
    this.lastDrawTime = 0;
    this.fps = 28;
    this.isPaused = false;
    this.userDisabled = false;
    this.resizeTimeout = null;

    // Accessibility check: Reduced motion
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.reducedMotion) {
      this.isPaused = true;
    }

    this.init();
  }

  init() {
    this.resize();
    
    // Debounced resize listener
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => this.resize(), 150);
    }, { passive: true });

    // Battery / CPU preservation when tab is unfocused
    document.addEventListener('visibilitychange', () => {
      this.isPaused = document.hidden || this.userDisabled || this.reducedMotion;
    });

    // Listen for reduced-motion changes dynamically
    try {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      motionQuery.addEventListener('change', (e) => {
        this.reducedMotion = e.matches;
        this.isPaused = this.reducedMotion || this.userDisabled;
        if (!this.isPaused) this.animate();
      });
    } catch (_) {}

    if (!this.reducedMotion) {
      this.animate();
    } else {
      // Draw single faint static backdrop
      this.drawStaticBackdrop();
    }
  }

  setColor(color) {
    this.primaryColor = color;
    if (color.includes('#00f0ff') || color.includes('cyan')) {
      this.glowColor = 'rgba(0, 240, 255, 0.35)';
    } else if (color.includes('#ff3366') || color.includes('crimson')) {
      this.glowColor = 'rgba(255, 51, 102, 0.35)';
    } else {
      this.glowColor = 'rgba(0, 255, 136, 0.35)';
    }
  }

  toggle() {
    this.userDisabled = !this.userDisabled;
    this.isPaused = this.userDisabled;
    if (!this.isPaused) {
      this.animate();
    } else {
      if (this.animationId) cancelAnimationFrame(this.animationId);
      this.drawStaticBackdrop();
    }
    return !this.userDisabled;
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Mobile optimization: adjust font size and cadence
    if (width < 768) {
      this.fontSize = 16;
      this.fps = 20;
    } else {
      this.fontSize = 14;
      this.fps = 28;
    }

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.ctx.scale(dpr, dpr);

    this.columns = Math.floor(width / this.fontSize);
    this.drops = new Array(this.columns);

    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = Math.floor(Math.random() * -(height / this.fontSize));
    }
  }

  drawStaticBackdrop() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.ctx.fillStyle = '#040711';
    this.ctx.fillRect(0, 0, width, height);
  }

  draw() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Faint alpha overlay creates phosphor decay effect
    this.ctx.fillStyle = 'rgba(4, 7, 17, 0.1)';
    this.ctx.fillRect(0, 0, width, height);

    this.ctx.font = `${this.fontSize}px 'Fira Code', monospace`;

    for (let i = 0; i < this.drops.length; i++) {
      const char = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
      const x = i * this.fontSize;
      const y = this.drops[i] * this.fontSize;

      // Leading character highlight
      if (Math.random() > 0.96) {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.shadowColor = '#ffffff';
        this.ctx.shadowBlur = 6;
      } else {
        this.ctx.fillStyle = this.primaryColor;
        this.ctx.shadowColor = this.glowColor;
        this.ctx.shadowBlur = 3;
      }

      this.ctx.fillText(char, x, y);
      this.ctx.shadowBlur = 0;

      if (y > height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }

      this.drops[i]++;
    }
  }

  animate(currentTime = 0) {
    if (this.isPaused) return;

    this.animationId = requestAnimationFrame((time) => this.animate(time));

    const delta = currentTime - this.lastDrawTime;
    const interval = 1000 / this.fps;

    if (delta > interval) {
      this.lastDrawTime = currentTime - (delta % interval);
      this.draw();
    }
  }
}

window.MatrixEngine = MatrixRain;
