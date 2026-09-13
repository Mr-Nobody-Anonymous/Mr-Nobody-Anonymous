import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  color: string;
  size: number;
  alpha: number;
}

const BOOT_LOGS = [
  'INITIALIZING SYSTEM...',
  'LOADING IDENTITY MODULE...',
  'ACCESSING UNKNOWN NODE [45.192.88.10]...',
  'IDENTITY: MR. NOBODY',
  'STATUS: ONLINE'
];

export const HeroCinematic: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Boot sequence state
  const [bootPhase, setBootPhase] = useState<'booting' | 'glitch' | 'active'>('booting');
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Choreographed boot sequence (Sections 1 & 37)
  useEffect(() => {
    if (sessionStorage.getItem('mrnobody_boot_done') === 'true') {
      setBootPhase('active');
      return;
    }

    let idx = 0;
    const timer = setInterval(() => {
      if (idx < BOOT_LOGS.length) {
        setBootLogs((prev) => [...prev, BOOT_LOGS[idx]]);
        idx++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setBootPhase('glitch');
          setTimeout(() => {
            setBootPhase('active');
            sessionStorage.setItem('mrnobody_boot_done', 'true');
          }, 250);
        }, 300);
      }
    }, 380);

    return () => clearInterval(timer);
  }, []);

  const skipBoot = () => {
    sessionStorage.setItem('mrnobody_boot_done', 'true');
    setBootPhase('active');
  };

  // Scroll tracking across the sticky pinned hero section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalH = containerRef.current.offsetHeight - window.innerHeight;
      if (totalH <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / totalH));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Canvas particle morphing engine: "MR. NOBODY" -> "WHO IS MR. NOBODY?" (Section 2)
  useEffect(() => {
    if (isReducedMotion || bootPhase !== 'active') return;

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

    const colors = ['#00E5FF', '#2563FF', '#7C3AED', '#FFFFFF', '#00E5FF'];
    let particles: Particle[] = [];

    const getPointsFromText = (textLines: string[], fontSize: number, fontFamily: string) => {
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
      const step = width < 768 ? 6 : 4;

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
      let phase1 = getPointsFromText(['MR. NOBODY'], fontSize, 'Space Grotesk, sans-serif');
      let phase2 = getPointsFromText(['WHO IS', 'MR. NOBODY?'], fontSize * 0.85, 'Space Grotesk, sans-serif');

      if (phase1.length === 0) {
        phase1 = getPointsFromText(['MR. NOBODY'], fontSize, 'Arial, sans-serif');
        phase2 = getPointsFromText(['WHO IS', 'MR. NOBODY?'], fontSize * 0.85, 'Arial, sans-serif');
      }

      if (phase1.length === 0) return;

      const maxCount = Math.max(phase1.length, phase2.length);
      particles = [];

      for (let i = 0; i < maxCount; i++) {
        const p1 = phase1[i % phase1.length];
        const p2 = phase2[i % phase2.length];

        particles.push({
          x: p1.x + (Math.random() - 0.5) * 8,
          y: p1.y + (Math.random() - 0.5) * 8,
          originX: p1.x,
          originY: p1.y,
          targetX: p2.x,
          targetY: p2.y,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 2 + 1.2,
          alpha: Math.random() * 0.4 + 0.6
        });
      }
    };

    initParticles();
    if (document.fonts) {
      document.fonts.ready.then(() => initParticles());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const p = scrollProgress;
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        let destX: number;
        let destY: number;

        if (p < 0.2) {
          // Phase 1: Solid "MR. NOBODY"
          destX = pt.originX;
          destY = pt.originY;
        } else if (p < 0.65) {
          // Middle transition: Vortex inward toward center
          const mid = (p - 0.2) / 0.45;
          const angle = i * 0.05 + mid * Math.PI * 2;
          const radius = (1 - mid) * 200 + 40;
          destX = centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 50;
          destY = centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 50;
        } else {
          // Phase 2: Reorganize into "WHO IS MR. NOBODY?"
          const finalP = (p - 0.65) / 0.35;
          destX = pt.originX + (pt.targetX - pt.originX) * finalP;
          destY = pt.originY + (pt.targetY - pt.originY) * finalP;
        }

        pt.x += (destX - pt.x) * 0.14;
        pt.y += (destY - pt.y) * 0.14;

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
  }, [scrollProgress, isReducedMotion, bootPhase]);

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
      {/* Sticky Fullscreen Viewport */}
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
        {/* Phase 1: Typing Boot Terminal (Integrated without separate full overlay) */}
        <AnimatePresence>
          {bootPhase === 'booting' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'relative',
                zIndex: 10,
                maxWidth: '520px',
                width: '90%',
                padding: '2.5rem',
                background: 'rgba(10, 15, 20, 0.92)',
                border: '1px solid rgba(0, 229, 255, 0.3)',
                borderRadius: '12px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 229, 255, 0.12)',
                backdropFilter: 'blur(20px)',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(0, 229, 255, 0.2)',
                  paddingBottom: '0.8rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#A3FF12', boxShadow: '0 0 8px #A3FF12' }} />
                  <span style={{ fontSize: '0.78rem', color: '#E8F7FF', fontWeight: 700 }}>
                    BOOT SEQUENCE // MR. NOBODY
                  </span>
                </div>
                <button
                  onClick={skipBoot}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#00E5FF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    cursor: 'pointer'
                  }}
                >
                  [ SKIP INTRO → ]
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', minHeight: '120px' }}>
                {bootLogs.map((log, i) => (
                  <div key={i} style={{ color: log.includes('ONLINE') ? '#A3FF12' : '#00E5FF' }}>
                    &gt; {log}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 2: Glitch Flash */}
        {bootPhase === 'glitch' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 20,
              background: 'rgba(0, 229, 255, 0.18)',
              mixBlendMode: 'screen',
              animation: 'glitchFlash 0.25s steps(2) forwards'
            }}
          />
        )}

        {/* Phase 3: Active Particle Hero View */}
        {bootPhase === 'active' && (
          <>
            {isReducedMotion ? (
              <div style={{ textAlign: 'center', padding: '2rem', zIndex: 5 }}>
                <h1
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: '#E8F7FF',
                    margin: '0 0 1rem 0'
                  }}
                >
                  MR. NOBODY
                </h1>
                <p style={{ fontFamily: 'var(--font-mono)', color: '#00E5FF', letterSpacing: '0.12em' }}>
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
                  pointerEvents: 'none',
                  zIndex: 2
                }}
              />
            )}

            {/* Subtitle Telemetry (Section 1) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: scrollProgress < 0.25 ? 1 : 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                position: 'absolute',
                top: '68%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.8rem, 1.8vw, 1.05rem)',
                color: '#CBD5E1',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                pointerEvents: 'none',
                zIndex: 3
              }}
            >
              <span>Cybersecurity</span>
              <span style={{ color: '#00E5FF' }}>×</span>
              <span>AI</span>
              <span style={{ color: '#7C3AED' }}>×</span>
              <span>Systems</span>
            </motion.div>

            {/* Dynamic Scroll Cue (Section 2) */}
            <motion.div
              animate={{
                opacity: scrollProgress < 0.2 ? [0.6, 1, 0.6] : 0,
                y: scrollProgress < 0.2 ? [0, 6, 0] : 0
              }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{
                position: 'absolute',
                bottom: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                color: '#00E5FF',
                userSelect: 'none',
                pointerEvents: 'none',
                zIndex: 3
              }}
            >
              <span>[ ENTER THE SYSTEM ↓ SCROLL TO DISSOLVE ]</span>
              <span>↓</span>
            </motion.div>

            {/* Unlocked Decrypted State Cues */}
            <div
              style={{
                position: 'absolute',
                bottom: '2.5rem',
                opacity: scrollProgress > 0.82 ? 1 : 0,
                transition: 'opacity 0.4s ease',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#A3FF12',
                letterSpacing: '0.14em',
                textAlign: 'center',
                zIndex: 3,
                pointerEvents: 'none'
              }}
            >
              [ NODE DECRYPTED // PROCEEDING TO IDENTITY ]
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes glitchFlash {
          0% { opacity: 0; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
          100% { opacity: 0; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
