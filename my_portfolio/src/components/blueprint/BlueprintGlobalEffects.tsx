import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlueprintGlobalEffectsProps {
  soundEnabled: boolean;
}

export const BlueprintGlobalEffects: React.FC<BlueprintGlobalEffectsProps> = ({ soundEnabled }) => {
  const [microGlitch, setMicroGlitch] = useState(false);
  const [konamiActive, setKonamiActive] = useState(false);
  const [isIdle, setIsIdle] = useState(false);

  // 1. Browser Console ASCII Art Message
  useEffect(() => {
    console.log(
      `%c
██╗   ██╗ ██████╗ ██╗   ██╗
╚██╗ ██╔╝██╔═══██╗██║   ██║
 ╚████╔╝ ██║   ██║██║   ██║
  ╚██╔╝  ██║   ██║██║   ██║
   ██║   ╚██████╔╝╚██████╔╝
   ╚═╝    ╚═════╝  ╚═════╝
FOUND THE CONSOLE. YOU'RE CURIOUS. I LIKE THAT.
— Mr. Nobody Anonymous
`,
      'color: #00f0ff; font-family: monospace; font-weight: bold; font-size: 13px; text-shadow: 0 0 5px #00f0ff;'
    );
  }, []);

  // 2. Random Micro-Glitch every 30-45 seconds
  useEffect(() => {
    const triggerMicroGlitch = () => {
      setMicroGlitch(true);
      setTimeout(() => setMicroGlitch(false), 120);

      // Schedule next random glitch (30-45 seconds)
      const nextDelay = 30000 + Math.random() * 15000;
      glitchTimer = setTimeout(triggerMicroGlitch, nextDelay);
    };

    let glitchTimer = setTimeout(triggerMicroGlitch, 32000);
    return () => clearTimeout(glitchTimer);
  }, []);

  // 3. Konami Code (↑↑↓↓←→←→BA)
  useEffect(() => {
    const sequence = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a'
    ];
    let currentIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = sequence[currentIndex].length === 1 ? sequence[currentIndex].toLowerCase() : sequence[currentIndex];

      if (key === expected) {
        currentIndex++;
        if (currentIndex === sequence.length) {
          // Trigger Konami invert
          setKonamiActive(true);
          currentIndex = 0;
          setTimeout(() => setKonamiActive(false), 5000);
        }
      } else {
        currentIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 4. Idle Detection (30 seconds of inactivity triggers TV static + "> Are you still there?")
  useEffect(() => {
    let idleTimer: number;

    const resetIdle = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        setIsIdle(true);
      }, 30000);
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((ev) => window.addEventListener(ev, resetIdle, { passive: true }));
    resetIdle();

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, resetIdle));
      clearTimeout(idleTimer);
    };
  }, []);

  // 5. Sound synthesis when enabled
  useEffect(() => {
    if (!soundEnabled) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const playClick = () => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(900, ctx.currentTime);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      };

      const handleBtnClick = (e: MouseEvent) => {
        if ((e.target as HTMLElement)?.closest('button, a, input, textarea')) {
          playClick();
        }
      };

      window.addEventListener('click', handleBtnClick, { passive: true });
      return () => window.removeEventListener('click', handleBtnClick);
    } catch {
      // Audio context policy
    }
  }, [soundEnabled]);

  return (
    <>
      {/* Micro-Glitch Horizontal Scanline Flash */}
      {microGlitch && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 99990,
            transform: 'translateX(2px)'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: `${Math.random() * 80 + 10}%`,
              left: 0,
              right: 0,
              height: '2px',
              background: '#00f0ff',
              boxShadow: '0 0 10px #00f0ff'
            }}
          />
        </div>
      )}

      {/* Konami Code Inversion Overlay (5 seconds with IDENTITY REVEALED) */}
      <AnimatePresence>
        {konamiActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              backdropFilter: 'invert(1)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-heading, "Orbitron")',
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                fontWeight: 900,
                color: '#00f0ff',
                letterSpacing: '4px',
                textShadow: '0 0 20px #00f0ff'
              }}
            >
              IDENTITY REVEALED
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Idle Screen TV Static (> Are you still there?) */}
      <AnimatePresence>
        {isIdle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.88 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99995,
              background: '#000000',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              userSelect: 'none'
            }}
          >
            {/* SVG TV Static Noise overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.35,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
              }}
            />
            <p
              style={{
                position: 'relative',
                zIndex: 2,
                fontFamily: 'var(--font-mono, "Fira Code", monospace)',
                fontSize: '1.5rem',
                color: '#00f0ff',
                letterSpacing: '0.08em',
                textShadow: '0 0 15px rgba(0, 240, 255, 0.8)'
              }}
            >
              &gt; Are you still there?
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
