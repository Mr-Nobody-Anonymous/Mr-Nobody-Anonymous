import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
}

export const ParticleHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / totalHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };
    window.addEventListener('resize', handleResize);

    // Particle Palette
    const colors = ['#00F5FF', '#2563FF', '#8B5CF6', '#FFFFFF', '#00F5FF'];
    let particles: Particle[] = [];

    const getPointsFromText = (
      textLines: string[],
      fontSize: number,
      fontFamily: string
    ) => {
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const oCtx = offscreen.getContext('2d');
      if (!oCtx) return [];

      oCtx.fillStyle = '#FFFFFF';
      oCtx.font = `800 ${fontSize}px ${fontFamily}`;
      oCtx.textAlign = 'center';
      oCtx.textBaseline = 'middle';

      const lineHeight = fontSize * 1.08;
      const startY = height / 2 - ((textLines.length - 1) * lineHeight) / 2;

      textLines.forEach((line, i) => {
        oCtx.fillText(line, width / 2, startY + i * lineHeight);
      });

      const imgData = oCtx.getImageData(0, 0, width, height).data;
      const points: { x: number; y: number }[] = [];
      const step = width < 768 ? 6 : 4; // Particle density based on screen

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const idx = (y * width + x) * 4;
          if (imgData[idx + 3] > 140) {
            points.push({ x, y });
          }
        }
      }
      return points;
    };

    const initParticles = () => {
      const fontSize = Math.min(width * 0.12, 110);
      let phase1Points = getPointsFromText(['MR. NOBODY'], fontSize, 'Space Grotesk, sans-serif');
      let phase2Points = getPointsFromText(['WHO IS', 'MR. NOBODY?'], fontSize * 0.85, 'Space Grotesk, sans-serif');

      // Fallback to system font if custom font hasn't rendered pixels yet
      if (phase1Points.length === 0) {
        phase1Points = getPointsFromText(['MR. NOBODY'], fontSize, 'Arial, sans-serif');
        phase2Points = getPointsFromText(['WHO IS', 'MR. NOBODY?'], fontSize * 0.85, 'Arial, sans-serif');
      }

      if (phase1Points.length === 0) return;

      const maxCount = Math.max(phase1Points.length, phase2Points.length);
      particles = [];

      for (let i = 0; i < maxCount; i++) {
        const p1 = phase1Points[i % phase1Points.length];
        const p2 = phase2Points[i % phase2Points.length];

        particles.push({
          x: p1.x + (Math.random() - 0.5) * 8,
          y: p1.y + (Math.random() - 0.5) * 8,
          originX: p1.x,
          originY: p1.y,
          targetX: p2.x,
          targetY: p2.y,
          vx: 0,
          vy: 0,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 2 + 1.2,
          alpha: Math.random() * 0.4 + 0.6
        });
      }
    };

    initParticles();
    if (document.fonts) {
      document.fonts.ready.then(() => {
        initParticles();
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Current progress factor
      const p = scrollProgress; // 0 to 1
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];

        // Dissolve / Interpolate
        let destX: number;
        let destY: number;

        if (p < 0.25) {
          // Phase 1: Solid "MR. NOBODY"
          destX = pt.originX;
          destY = pt.originY;
        } else if (p < 0.7) {
          // Middle transition: Vortex inward toward center with chaotic dispersion
          const midProgress = (p - 0.25) / 0.45;
          const angle = i * 0.05 + midProgress * Math.PI * 2;
          const radius = (1 - midProgress) * 200 + 40;
          destX = centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 60;
          destY = centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 60;
        } else {
          // Phase 2: Form "WHO IS MR. NOBODY?"
          const finalProgress = (p - 0.7) / 0.3;
          destX = pt.originX + (pt.targetX - pt.originX) * finalProgress;
          destY = pt.originY + (pt.targetY - pt.originY) * finalProgress;
        }

        // Smooth physics spring towards dest
        pt.x += (destX - pt.x) * 0.12;
        pt.y += (destY - pt.y) * 0.12;

        // Draw particle
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = pt.color;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollProgress, isReducedMotion]);

  return (
    <div
      ref={containerRef}
      id="hero"
      style={{
        position: 'relative',
        height: '240vh',
        background: '#05070A'
      }}
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {isReducedMotion ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #00F5FF, #2563FF, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              MR. NOBODY
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
              Cybersecurity × AI × Systems
            </p>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          />
        )}

        {/* Dynamic Scroll Hint Overlay */}
        <motion.div
          animate={{ opacity: scrollProgress < 0.15 ? 1 : 0, y: scrollProgress < 0.15 ? [0, 6, 0] : 0 }}
          transition={{ duration: 1.6, repeat: Infinity }}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            color: 'rgba(0, 245, 255, 0.7)',
            userSelect: 'none',
            pointerEvents: 'none'
          }}
        >
          <span>SCROLL TO DISSOLVE & UNLOCK</span>
          <span>↓</span>
        </motion.div>

        {/* Reorganized Section Revealed Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            opacity: scrollProgress > 0.85 ? 1 : 0,
            transition: 'opacity 0.4s ease',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#A3FF12',
            letterSpacing: '0.14em',
            textAlign: 'center'
          }}
        >
          [ NODE DECRYPTED — PROCEEDING TO IDENTITY ]
        </div>
      </div>
    </div>
  );
};
