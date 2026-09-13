import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CinematicBootProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  'INITIALIZING SYSTEM...',
  'LOADING IDENTITY MODULE...',
  'ACCESSING UNKNOWN NODE [45.192.88.10]...',
  'DECRYPTING KERNEL SIGNATURES...',
  'IDENTITY: MR. NOBODY',
  'STATUS: ONLINE'
];

export const CinematicBoot: React.FC<CinematicBootProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [phase, setPhase] = useState<'typing' | 'glitch' | 'reveal'>('typing');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user already saw boot this session
    if (sessionStorage.getItem('mrnobody_boot_seen') === 'true') {
      setIsVisible(false);
      onComplete();
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < BOOT_LOGS.length) {
        setLogs((prev) => [...prev, BOOT_LOGS[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        // Transition to glitch phase
        setTimeout(() => {
          setPhase('glitch');
          setTimeout(() => {
            setPhase('reveal');
          }, 350);
        }, 400);
      }
    }, 420);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleEnter = () => {
    sessionStorage.setItem('mrnobody_boot_seen', 'true');
    setIsVisible(false);
    setTimeout(onComplete, 500);
  };

  const handleSkip = () => {
    sessionStorage.setItem('mrnobody_boot_seen', 'true');
    setIsVisible(false);
    onComplete();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: 'blur(10px)' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#05070A',
          color: '#F5F7FA',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Cyber Grid Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0, 245, 255, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 255, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            opacity: 0.6,
            pointerEvents: 'none'
          }}
        />

        {/* Ambient Hex / Binary telemetry background watermark */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            fontSize: '0.65rem',
            lineHeight: '1.4',
            color: 'rgba(0, 245, 255, 0.03)',
            userSelect: 'none',
            pointerEvents: 'none',
            overflow: 'hidden',
            whiteSpace: 'pre-wrap',
            padding: '2rem'
          }}
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i}>
              0x{((i * 1337 + 42) % 65535).toString(16).padStart(4, '0')} 01101110 01101111 01100010 01101111 01100100 01111001 SEC_NODE_ALPHA_
            </span>
          ))}
        </div>

        {/* Phase 1: Typing Boot Logs */}
        {phase === 'typing' && (
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              maxWidth: '520px',
              width: '90%',
              padding: '2rem',
              background: 'rgba(10, 15, 23, 0.85)',
              border: '1px solid rgba(0, 245, 255, 0.2)',
              borderRadius: '8px',
              boxShadow: '0 0 30px rgba(0, 245, 255, 0.08)'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '0.75rem',
                marginBottom: '1rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '0.72rem',
                color: 'var(--text-secondary)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00F5FF' }} />
                <span>MR_NOBODY_SYS_KERNEL_v4.2</span>
              </div>
              <span style={{ color: '#A3FF12' }}>[BOOTING]</span>
            </div>

            <div style={{ minHeight: '140px', fontSize: '0.82rem', lineHeight: '1.8' }}>
              {logs.map((log, idx) => (
                <div key={idx} style={{ color: idx === logs.length - 1 ? '#00F5FF' : '#7D8795' }}>
                  <span style={{ color: '#8B5CF6', marginRight: '0.5rem' }}>›</span>
                  {log}
                </div>
              ))}
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '14px',
                  background: '#00F5FF',
                  marginLeft: '4px',
                  verticalAlign: 'middle',
                  animation: 'pulse 0.8s infinite'
                }}
              />
            </div>
          </div>
        )}

        {/* Phase 2: Glitch Flash */}
        {phase === 'glitch' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              background: '#00F5FF',
              mixBlendMode: 'screen',
              opacity: 0.85,
              animation: 'glitchFlash 0.35s ease'
            }}
          />
        )}

        {/* Phase 3: Giant Hero Reveal */}
        {phase === 'reveal' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center',
              padding: '0 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.2em',
                color: '#00F5FF',
                marginBottom: '1rem',
                textTransform: 'uppercase'
              }}
            >
              [ SYSTEM UNLOCKED ]
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(3rem, 10vw, 7.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                margin: '0 0 1.5rem 0',
                background: 'linear-gradient(135deg, #FFFFFF 30%, #7D8795 70%, #00F5FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(0, 245, 255, 0.25)'
              }}
            >
              MR. NOBODY
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.85rem, 2vw, 1.15rem)',
                color: 'var(--text-secondary)',
                letterSpacing: '0.12em',
                marginBottom: '2.5rem',
                textTransform: 'uppercase'
              }}
            >
              Cybersecurity <span style={{ color: '#00F5FF' }}>×</span> AI <span style={{ color: '#8B5CF6' }}>×</span> Systems
            </p>

            {/* Enter System Button */}
            <motion.button
              whileHover={{ scale: 1.05, borderColor: '#00F5FF' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEnter}
              data-cursor="ENTER"
              style={{
                padding: '0.85rem 2.2rem',
                background: 'rgba(0, 245, 255, 0.08)',
                border: '1px solid rgba(0, 245, 255, 0.5)',
                borderRadius: '6px',
                color: '#00F5FF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(0, 245, 255, 0.15)',
                transition: 'all 0.25s ease'
              }}
            >
              [ ENTER THE SYSTEM ↓ ]
            </motion.button>
          </motion.div>
        )}

        {/* Skip button in corner */}
        <button
          onClick={handleSkip}
          style={{
            position: 'absolute',
            bottom: '2rem',
            right: '2rem',
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.4)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            letterSpacing: '0.08em',
            cursor: 'pointer',
            padding: '0.5rem',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#00F5FF')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)')}
        >
          [ ESC / SKIP INTRO ]
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
