import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlueprintGlobalEffectsProps {
  soundEnabled: boolean;
}

/**
 * Ambient, opt-in personality for the site:
 *  - a console greeting for the curious
 *  - a Konami-code easter egg
 *  - subtle UI clicks when sound is enabled
 *
 * Deliberately no random screen glitches or idle takeovers: a portfolio should
 * never interrupt someone who is reading.
 */
export const BlueprintGlobalEffects: React.FC<BlueprintGlobalEffectsProps> = ({ soundEnabled }) => {
  const [konamiActive, setKonamiActive] = useState(false);

  // Console greeting
  useEffect(() => {
    console.log(
      `%c
  ███╗   ██╗ ██████╗ ██████╗  ██████╗ ██████╗ ██╗   ██╗
  ████╗  ██║██╔═══██╗██╔══██╗██╔═══██╗██╔══██╗╚██╗ ██╔╝
  ██╔██╗ ██║██║   ██║██████╔╝██║   ██║██║  ██║ ╚████╔╝
  ██║╚██╗██║██║   ██║██╔══██╗██║   ██║██║  ██║  ╚██╔╝
  ██║ ╚████║╚██████╔╝██████╔╝╚██████╔╝██████╔╝   ██║
  ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═════╝    ╚═╝

  You opened the console. Curious people are welcome here.
  — Beamlak Sintayehu
`,
      'color: #E9A268; font-family: monospace; font-size: 12px; line-height: 1.15;'
    );
  }, []);

  // Konami code: a short, tasteful inversion
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
    let timeout: number;

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (key === sequence[currentIndex]) {
        currentIndex += 1;
        if (currentIndex === sequence.length) {
          currentIndex = 0;
          setKonamiActive(true);
          window.clearTimeout(timeout);
          timeout = window.setTimeout(() => setKonamiActive(false), 1800);
        }
      } else {
        currentIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(timeout);
    };
  }, []);

  // Subtle click tone, only when sound is explicitly enabled
  useEffect(() => {
    if (!soundEnabled) return;

    let context: AudioContext | null = null;

    try {
      const AudioCtx =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      context = new AudioCtx();
    } catch {
      return;
    }

    const ctx = context;
    if (!ctx) return;

    const playClick = () => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = 'sine';
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.frequency.setValueAtTime(760, ctx.currentTime);
      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.06);
    };

    const handleClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement | null)?.closest('button, a, input, textarea')) {
        playClick();
      }
    };

    window.addEventListener('click', handleClick, { passive: true });
    return () => {
      window.removeEventListener('click', handleClick);
      void ctx.close().catch(() => undefined);
    };
  }, [soundEnabled]);

  return (
    <AnimatePresence>
      {konamiActive && (
        <motion.div
          className="konami-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          aria-hidden="true"
        >
          <p>Identity withheld — but acknowledged.</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
