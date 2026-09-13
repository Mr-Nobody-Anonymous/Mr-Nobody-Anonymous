import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Check sessionStorage
    if (sessionStorage.getItem('mr_nobody_booted') === 'true') {
      onComplete();
      setIsFinished(true);
      return;
    }

    const bootLogs = [
      'INITIALIZING SECURITY KERNEL...',
      'CHECKING SYSTEM INTEGRITY: OK',
      'LOADING CYBER PROTOCOLS & TELEMETRY...',
      'MOUNTING REPOSITORIES & CASE FILES...',
      'PORTFOLIO CONSOLE READY.'
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < bootLogs.length) {
        setLines(prev => [...prev, bootLogs[current]]);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          sessionStorage.setItem('mr_nobody_booted', 'true');
          setIsFinished(true);
          onComplete();
        }, 200);
      }
    }, 180);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        clearInterval(interval);
        sessionStorage.setItem('mr_nobody_booted', 'true');
        setIsFinished(true);
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKey);
    };
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#03060d',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'var(--font-mono)'
        }}
      >
        <div style={{ maxWidth: '500px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>
              BOOT DIAGNOSTICS // MR. NOBODY
            </span>
          </div>

          <div style={{ minHeight: '140px', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {lines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ fontSize: '0.85rem', color: idx === lines.length - 1 ? 'var(--accent)' : 'var(--text-muted)' }}
              >
                &gt; {line}
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Press [ESC] to skip
            </span>
            <button
              onClick={() => {
                sessionStorage.setItem('mr_nobody_booted', 'true');
                setIsFinished(true);
                onComplete();
              }}
              style={{
                fontSize: '0.75rem',
                color: 'var(--accent)',
                padding: '0.2rem 0.5rem',
                border: '1px solid var(--border-accent)',
                borderRadius: '4px',
                background: 'var(--accent-dim)'
              }}
            >
              SKIP
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
