import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicBootProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  '> Initializing...',
  '> Loading identity...',
  '> ERROR: Identity not found.',
  '> Loading Mr. Nobody Anonymous...'
];

export const CinematicBoot: React.FC<CinematicBootProps> = ({ onComplete }) => {
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [charIdx, setCharIdx] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState('');
  const [isCracking, setIsCracking] = useState(false);
  const [isShattering, setIsShattering] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Check session storage
  useEffect(() => {
    if (sessionStorage.getItem('mrnobody_boot_seen') === 'true') {
      setIsVisible(false);
      onComplete();
      return;
    }

    const skipTimer = setTimeout(() => setShowSkip(true), 1000);
    return () => clearTimeout(skipTimer);
  }, [onComplete]);

  // Letter by letter typing
  useEffect(() => {
    if (!isVisible || isCracking || isShattering) return;

    if (currentLineIdx < BOOT_LINES.length) {
      const line = BOOT_LINES[currentLineIdx];
      if (charIdx < line.length) {
        const timer = setTimeout(() => {
          setTypedText((prev) => prev + line[charIdx]);
          setCharIdx((prev) => prev + 1);
        }, line.startsWith('> ERROR') ? 22 : 32);
        return () => clearTimeout(timer);
      } else {
        // Line finished, wait and move to next or trigger glitch
        const waitTime = currentLineIdx === BOOT_LINES.length - 1 ? 400 : 320;
        const lineTimer = setTimeout(() => {
          if (currentLineIdx === BOOT_LINES.length - 1) {
            // Trigger glitch scramble
            triggerGlitch();
          } else {
            setCurrentLineIdx((prev) => prev + 1);
            setTypedText((prev) => prev + '\n');
            setCharIdx(0);
          }
        }, waitTime);
        return () => clearTimeout(lineTimer);
      }
    }
  }, [currentLineIdx, charIdx, isVisible, isCracking, isShattering]);

  // Scramble glitch effect
  const triggerGlitch = () => {
    setIsGlitching(true);
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/01';
    const original = '> Loading Mr. Nobody Anonymous...';
    let count = 0;

    const glitchInterval = setInterval(() => {
      count++;
      const scrambled = original
        .split('')
        .map((c) => (c === ' ' || Math.random() > 0.6 ? c : chars[Math.floor(Math.random() * chars.length)]))
        .join('');
      setGlitchText(scrambled);

      if (count > 8) {
        clearInterval(glitchInterval);
        setIsGlitching(false);
        // Start cracking
        triggerCrack();
      }
    }, 55);
  };

  // Glass crack & shatter sequence
  const triggerCrack = () => {
    setIsCracking(true);
    setTimeout(() => {
      setIsShattering(true);
      runShatterCanvas();
      setTimeout(() => {
        finishBoot();
      }, 700);
    }, 450);
  };

  const runShatterCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = [];
    const colors = ['#00f0ff', '#ffffff', '#b400ff', 'rgba(0,240,255,0.7)'];

    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 4;
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 80,
        y: canvas.height / 2 + (Math.random() - 0.5) * 80,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 1.5,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let frame = 0;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha *= 0.94;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (frame < 35) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  };

  const finishBoot = () => {
    sessionStorage.setItem('mrnobody_boot_seen', 'true');
    setIsVisible(false);
    onComplete();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="preloader-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          background: '#000000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono, "Fira Code", monospace)',
          userSelect: 'none',
          overflow: 'hidden'
        }}
      >
        {/* Particle Canvas for Shatter */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 10
          }}
        />

        {/* Central Terminal Typing Display */}
        {!isShattering && (
          <div
            style={{
              maxWidth: '650px',
              width: '90%',
              padding: '2rem',
              color: '#00f0ff',
              fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
              lineHeight: 1.8,
              position: 'relative',
              zIndex: 5
            }}
          >
            <div style={{ whiteSpace: 'pre-wrap', minHeight: '130px' }}>
              {typedText.split('\n').map((line, idx) => (
                <div
                  key={idx}
                  style={{
                    color: line.includes('ERROR') ? '#ff006e' : '#00f0ff',
                    textShadow: line.includes('ERROR') ? '0 0 10px rgba(255,0,110,0.6)' : '0 0 10px rgba(0,240,255,0.4)',
                    marginBottom: '0.4rem'
                  }}
                >
                  {idx === currentLineIdx && isGlitching ? glitchText : line}
                  {idx === currentLineIdx && !isGlitching && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      style={{
                        display: 'inline-block',
                        marginLeft: '3px',
                        width: '10px',
                        height: '2px',
                        background: '#00f0ff',
                        verticalAlign: 'middle'
                      }}
                    >
                      _
                    </motion.span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Glass Crack SVG Layer */}
        {isCracking && !isShattering && (
          <svg
            viewBox="0 0 1000 1000"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 8
            }}
          >
            <defs>
              <filter id="crack-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#00f0ff" floodOpacity="0.8" />
              </filter>
            </defs>
            {/* Radiating Crack Lines */}
            <g stroke="#00f0ff" strokeWidth="2.5" filter="url(#crack-glow)" fill="none">
              <path d="M500,500 L440,380 L390,260 L320,110" />
              <path d="M500,500 L580,390 L680,310 L840,190" />
              <path d="M500,500 L620,530 L770,580 L920,620" />
              <path d="M500,500 L560,630 L630,760 L710,910" />
              <path d="M500,500 L430,620 L360,740 L280,890" />
              <path d="M500,500 L370,510 L220,520 L60,540" />
              {/* Secondary Cross Fractures */}
              <path d="M440,380 L480,330 L550,290" strokeWidth="1.5" />
              <path d="M580,390 L520,330 L450,280" strokeWidth="1.5" />
              <path d="M430,620 L480,670 L550,710" strokeWidth="1.5" />
              <path d="M370,510 L330,440 L260,390" strokeWidth="1.5" />
            </g>
            {/* Center Cyan Bleed Flash */}
            <circle cx="500" cy="500" r="45" fill="#00f0ff" opacity="0.6" filter="url(#crack-glow)" />
          </svg>
        )}

        {/* Skip button in bottom-right */}
        {showSkip && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            onClick={finishBoot}
            style={{
              position: 'absolute',
              bottom: '2rem',
              right: '2.5rem',
              background: 'transparent',
              border: '1px solid rgba(0,240,255,0.3)',
              borderRadius: '4px',
              color: '#00f0ff',
              padding: '0.4rem 1rem',
              fontSize: '0.8rem',
              letterSpacing: '0.12em',
              cursor: 'pointer',
              zIndex: 20
            }}
          >
            [ SKIP INTRO ]
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
