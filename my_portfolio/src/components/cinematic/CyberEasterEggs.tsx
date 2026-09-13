import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, EyeOff, X } from 'lucide-react';

interface CyberEasterEggsProps {
  soundEnabled: boolean;
  systemLogOpen: boolean;
  onCloseSystemLog: () => void;
}

export const CyberEasterEggs: React.FC<CyberEasterEggsProps> = ({
  soundEnabled,
  systemLogOpen,
  onCloseSystemLog
}) => {
  const [nobodyMode, setNobodyMode] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'MR. NOBODY KERNEL v4.19.0-26-amd64',
    "Type 'help' for available root directives."
  ]);

  // Web Audio Synth for subtle cyber interactions (Section 41)
  const playCyberSound = (type: 'beep' | 'scan' | 'click') => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      } else if (type === 'beep') {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'scan') {
        osc.frequency.setValueAtTime(350, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch {
      // Ignore audio context block if user hasn't interacted
    }
  };

  // Keyboard shortcut listener: 'N' for NOBODY MODE, '~' or '`' for hidden terminal (Section 39 & 40)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'n' || e.key === 'N') {
        setNobodyMode((prev) => {
          const next = !prev;
          playCyberSound('beep');
          return next;
        });
      } else if (e.key === '`' || e.key === '~') {
        setTerminalOpen((prev) => {
          const next = !prev;
          playCyberSound('scan');
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [soundEnabled]);

  // Section 28: Scroll velocity effect (subtle vertical stretch on fast scroll)
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    let timeoutId: number;

    const onScroll = () => {
      const now = Date.now();
      const deltaY = Math.abs(window.scrollY - lastScrollY);
      const deltaTime = Math.max(1, now - lastTime);
      const velocity = deltaY / deltaTime; // px per ms

      if (velocity > 1.8) {
        document.body.classList.add('fast-scroll-stretch');
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          document.body.classList.remove('fast-scroll-stretch');
        }, 120);
      }

      lastScrollY = window.scrollY;
      lastTime = now;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    playCyberSound('click');
    const newHist = [...terminalHistory, `> ${terminalInput}`];

    if (cmd === 'help') {
      newHist.push('DIRECTIVES: whoami, locate, identity, status, clear, exit');
    } else if (cmd === 'whoami') {
      newHist.push('mr_nobody');
    } else if (cmd === 'locate') {
      newHist.push('[ACCESS DENIED] // ENCRYPTED PROXY CHAIN');
    } else if (cmd === 'identity') {
      newHist.push('UNKNOWN // SHADOW OPERATIVE');
    } else if (cmd === 'status') {
      newHist.push('KERNEL: NOMINAL // THREAT LEVEL: LOW // AGENTS: 05 ACTIVE');
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (cmd === 'exit') {
      setTerminalOpen(false);
      setTerminalInput('');
      return;
    } else {
      newHist.push(`bash: ${cmd}: command not recognized. Type 'help'.`);
    }

    setTerminalHistory(newHist);
    setTerminalInput('');
  };

  return (
    <>
      {/* 1. NOBODY MODE Filter Overlay (Section 39) */}
      <AnimatePresence>
        {nobodyMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: '1.25rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 99999,
              padding: '0.45rem 1.2rem',
              background: 'rgba(5, 7, 10, 0.92)',
              border: '1px solid #00E5FF',
              borderRadius: '20px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: '#00E5FF',
              boxShadow: '0 0 25px rgba(0, 229, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <EyeOff size={14} />
            <span>NOBODY MODE ACTIVE [PRESS 'N' TO EXIT]</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. System Log #017 Modal (Section 39) */}
      <AnimatePresence>
        {systemLogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              background: 'rgba(5, 7, 10, 0.92)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{
                maxWidth: '520px',
                width: '100%',
                background: 'rgba(10, 15, 20, 0.98)',
                border: '1px solid #00E5FF',
                borderRadius: '12px',
                padding: '2rem',
                fontFamily: 'var(--font-mono)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 229, 255, 0.2)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00E5FF', fontSize: '0.8rem', fontWeight: 700 }}>
                  <Shield size={16} />
                  <span>SYSTEM LOG #017</span>
                </div>
                <button
                  onClick={onCloseSystemLog}
                  style={{ background: 'transparent', border: 'none', color: '#7F8C9A', cursor: 'pointer' }}
                >
                  <X size={18} />
                </button>
              </div>

              <div style={{ fontSize: '0.84rem', lineHeight: '1.8', color: '#CBD5E1', marginBottom: '1.5rem' }}>
                <p style={{ margin: '0 0 0.5rem 0', color: '#A3FF12' }}>USER DETECTED.</p>
                <p style={{ margin: '0 0 0.5rem 0' }}>IDENTITY: <span style={{ color: '#00E5FF' }}>UNKNOWN.</span></p>
                <p style={{ margin: '0 0 0.5rem 0' }}>LOCATION: ENCRYPTED (0x4E4F424F4459).</p>
                <p style={{ margin: '0 0 0.5rem 0', color: '#7F8C9A' }}>&gt; Observation channel open. Autonomous telemetry monitoring perimeter status.</p>
              </div>

              <button
                onClick={onCloseSystemLog}
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  background: 'rgba(0, 229, 255, 0.1)',
                  border: '1px solid #00E5FF',
                  borderRadius: '6px',
                  color: '#00E5FF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                [ ACKNOWLEDGE LOG ]
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Hidden Interactive Terminal Overlay (Section 40) */}
      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              zIndex: 99990,
              width: '440px',
              maxWidth: 'calc(100vw - 4rem)',
              background: 'rgba(5, 7, 10, 0.96)',
              border: '1px solid rgba(0, 229, 255, 0.45)',
              borderRadius: '10px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 229, 255, 0.15)',
              fontFamily: 'var(--font-mono)',
              overflow: 'hidden'
            }}
          >
            {/* Terminal Header */}
            <div
              style={{
                padding: '0.6rem 1rem',
                background: 'rgba(0, 229, 255, 0.06)',
                borderBottom: '1px solid rgba(0, 229, 255, 0.2)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.72rem',
                color: '#00E5FF'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={14} />
                <span>ROOT SHELL // HIDDEN CONSOLE</span>
              </div>
              <button
                onClick={() => setTerminalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#7F8C9A', cursor: 'pointer' }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Terminal History */}
            <div
              style={{
                padding: '1rem',
                maxHeight: '220px',
                overflowY: 'auto',
                fontSize: '0.75rem',
                lineHeight: '1.6',
                color: '#CBD5E1'
              }}
            >
              {terminalHistory.map((line, i) => (
                <div key={i} style={{ color: line.startsWith('>') ? '#00E5FF' : '#7F8C9A' }}>
                  {line}
                </div>
              ))}
            </div>

            {/* Command Input Form */}
            <form
              onSubmit={handleTerminalSubmit}
              style={{
                padding: '0.6rem 1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span style={{ color: '#00E5FF', fontSize: '0.75rem' }}>&gt;</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type command (e.g. whoami, locate)..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#E8F7FF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem'
                }}
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .fast-scroll-stretch {
          transform: scaleY(1.008);
          transition: transform 0.1s ease-out;
        }
      `}</style>
    </>
  );
};
