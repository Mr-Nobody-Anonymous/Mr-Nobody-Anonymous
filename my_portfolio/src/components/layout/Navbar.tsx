import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSystemLog: () => void;
}

const MENU_ITEMS = [
  { id: 'hero', num: '00', label: 'HERO / PARTICLES' },
  { id: 'identity', num: '01', label: 'IDENTITY DOSSIER' },
  { id: 'system-map', num: '02', label: 'SYSTEM TOPOLOGY' },
  { id: 'cybersecurity', num: '03', label: 'CYBERSECURITY' },
  { id: 'terminal-section', num: '04', label: 'STORY TERMINAL' },
  { id: 'intelligence', num: '05', label: 'AI SYSTEMS' },
  { id: 'operations', num: '06', label: 'CASE FILES' },
  { id: 'toolkit', num: '07', label: 'ARSENAL TOOLKIT' },
  { id: 'philosophy', num: '08', label: 'PHILOSOPHY' },
  { id: 'final-transmission', num: '09', label: 'TRANSMISSION' }
];

export const Navbar: React.FC<NavbarProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenSystemLog
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuCursorOffset, setMenuCursorOffset] = useState<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (id: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 280);
  };

  const handleItemMouseMove = (itemId: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15; // Subtle follow: 4-8px
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    setMenuCursorOffset((prev) => ({ ...prev, [itemId]: { x, y } }));
  };

  const handleItemMouseLeave = (itemId: string) => {
    setMenuCursorOffset((prev) => ({ ...prev, [itemId]: { x: 0, y: 0 } }));
  };

  return (
    <>
      {/* Minimal Top Bar (Section 24) */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '0.8rem 2.5rem' : '1.4rem 2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: scrolled ? 'rgba(5, 7, 10, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0, 229, 255, 0.12)' : '1px solid transparent',
          transition: 'padding 0.3s ease, background 0.3s ease, border-color 0.3s ease'
        }}
      >
        {/* Left: Brand Identity */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          data-cursor="TOP"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.05rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: '#E8F7FF'
            }}
          >
            MR.NOBODY
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: '#00E5FF',
              padding: '0.15rem 0.45rem',
              background: 'rgba(0, 229, 255, 0.08)',
              border: '1px solid rgba(0, 229, 255, 0.25)',
              borderRadius: '3px'
            }}
          >
            // ANONYMOUS
          </span>
        </div>

        {/* Right Controls: Floating Status + Sound Toggle + MENU Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Section 23 & 39: Floating System Status (Breathing Dot, Clickable Easter Egg) */}
          <button
            onClick={onOpenSystemLog}
            data-cursor="LOG"
            title="Click to view System Log #017"
            style={{
              background: 'rgba(10, 15, 20, 0.75)',
              border: '1px solid rgba(0, 229, 255, 0.2)',
              borderRadius: '20px',
              padding: '0.35rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: '#CBD5E1'
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#A3FF12',
                boxShadow: '0 0 8px #A3FF12',
                animation: 'breathingDot 2.4s ease-in-out infinite'
              }}
            />
            <span style={{ letterSpacing: '0.06em' }}>SYSTEM ONLINE</span>
          </button>

          {/* Section 41: Subtle Sound Synthesis Toggle */}
          <button
            onClick={onToggleSound}
            data-cursor="AUDIO"
            title={soundEnabled ? 'Disable Cyber Audio' : 'Enable Subtle Cyber Audio'}
            style={{
              background: 'transparent',
              border: 'none',
              color: soundEnabled ? '#00E5FF' : '#7F8C9A',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0.3rem',
              transition: 'color 0.2s ease'
            }}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Minimal MENU Button (Section 24) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            data-cursor="MENU"
            data-magnetic="true"
            className="magnetic-btn"
            style={{
              background: 'rgba(0, 229, 255, 0.08)',
              border: '1px solid rgba(0, 229, 255, 0.35)',
              borderRadius: '6px',
              padding: '0.45rem 1.1rem',
              color: '#00E5FF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              cursor: 'pointer',
              boxShadow: '0 0 15px rgba(0, 229, 255, 0.15)',
              transition: 'all 0.2s ease'
            }}
          >
            MENU
          </button>
        </div>
      </motion.header>

      {/* Fullscreen Navigation Screen (Section 25) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 92% 5%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 92% 5%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 92% 5%)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(5, 7, 10, 0.98)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem'
            }}
          >
            {/* Close Button Top Right */}
            <button
              onClick={() => setIsMenuOpen(false)}
              data-cursor="CLOSE"
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2.5rem',
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
                padding: '0.5rem 1rem',
                color: '#E8F7FF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              [ CLOSE / ESC ]
            </button>

            {/* Menu Items (01 HOME, 02 ABOUT, etc. Following cursor slightly) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2.2rem',
                textAlign: 'left',
                width: '100%',
                maxWidth: '600px'
              }}
            >
              {MENU_ITEMS.map((item, idx) => {
                const offset = menuCursorOffset[item.id] || { x: 0, y: 0 };
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + idx * 0.06 }}
                    onMouseMove={(e) => handleItemMouseMove(item.id, e)}
                    onMouseLeave={() => handleItemMouseLeave(item.id)}
                    onClick={() => navigateTo(item.id)}
                    data-cursor="NAVIGATE"
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '1.5rem',
                      cursor: 'pointer',
                      transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
                      transition: 'transform 0.12s ease-out',
                      padding: '0.5rem 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1rem',
                        color: '#00E5FF',
                        fontWeight: 700
                      }}
                    >
                      {item.num}
                    </span>
                    <span
                      className="nav-fullscreen-link"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2rem, 5vw, 3.4rem)',
                        fontWeight: 800,
                        color: '#E8F7FF',
                        letterSpacing: '-0.02em',
                        transition: 'color 0.2s ease, text-shadow 0.2s ease'
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes breathingDot {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }
        .nav-fullscreen-link:hover {
          color: #00E5FF !important;
          text-shadow: 0 0 25px rgba(0, 229, 255, 0.6);
        }
      `}</style>
    </>
  );
};
