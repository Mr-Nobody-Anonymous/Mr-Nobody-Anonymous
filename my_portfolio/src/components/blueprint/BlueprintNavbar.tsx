import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';

interface BlueprintNavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Projects' },
  { id: 'experience', label: 'Timeline' },
  { id: 'contact', label: 'Contact' }
];

export const BlueprintNavbar: React.FC<BlueprintNavbarProps> = ({ soundEnabled, onToggleSound }) => {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.75;
      setScrolledPastHero(scrollY > heroHeight);

      // Scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      setScrollProgress(progress);

      // Active section calculation
      const sections = ['home', 'about', 'skills', 'work', 'experience', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top 2px Cyan -> Purple Scroll Progress Bar */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          zIndex: 99990,
          pointerEvents: 'none'
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${scrollProgress * 100}%`,
            background: 'linear-gradient(90deg, #00f0ff 0%, #b400ff 100%)',
            boxShadow: '0 0 8px rgba(0, 240, 255, 0.8)',
            transition: 'width 0.1s ease-out'
          }}
        />
      </div>

      {/* Hero-Only Top Right Hamburger Icon */}
      {!scrolledPastHero && (
        <button
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
          className="hero-hamburger-btn"
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            background: 'rgba(10, 10, 10, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            borderRadius: '8px',
            padding: '8px 12px',
            color: '#00f0ff',
            cursor: 'pointer',
            zIndex: 99980,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Menu size={20} />
        </button>
      )}

      {/* Fixed Sticky Nav (Slides down past hero) */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: scrolledPastHero ? 0 : -80 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          background: 'rgba(10, 10, 10, 0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #1a1a1a',
          zIndex: 99980,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 2rem'
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {/* Left Side: Avatar + "MR. NOBODY" */}
          <button
            onClick={() => scrollTo('home')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <div
              className="navbar-avatar-pulse"
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                border: '1.5px solid #00f0ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00f0ff' }} />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-heading, "Orbitron", sans-serif)',
                fontSize: '16px',
                fontWeight: 700,
                color: '#00f0ff',
                letterSpacing: '1px'
              }}
            >
              MR. NOBODY
            </span>
          </button>

          {/* Right Side: Desktop Links + Sound Toggle */}
          <div className="desktop-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  data-cursor="Jump"
                  className={`blueprint-nav-link ${isActive ? 'active' : ''}`}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-subheading, "Rajdhani")',
                    fontSize: '15px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: isActive ? '#00f0ff' : '#e0e0e0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '6px 0',
                    position: 'relative',
                    transition: 'color 0.2s ease'
                  }}
                >
                  <span>{link.label}</span>
                  {/* Active/Hover Dot */}
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#00f0ff',
                      marginTop: '3px',
                      opacity: isActive ? 1 : 0,
                      boxShadow: '0 0 6px #00f0ff',
                      transition: 'opacity 0.2s ease'
                    }}
                  />
                </button>
              );
            })}

            {/* Sound Toggle Button */}
            <button
              onClick={onToggleSound}
              aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
              title={soundEnabled ? 'Audio synthesis active' : 'Audio synthesis muted'}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                borderRadius: '6px',
                padding: '6px',
                color: soundEnabled ? '#00f0ff' : '#666666',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="mobile-nav-toggle"
            aria-label="Open navigation"
            style={{
              background: 'none',
              border: 'none',
              color: '#00f0ff',
              cursor: 'pointer',
              display: 'none'
            }}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Full-Screen Mobile Overlay Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#000000',
              zIndex: 99999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem'
            }}
          >
            {/* Close Button X (rotates 90deg on hover) */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-close-btn"
              style={{
                position: 'absolute',
                top: '28px',
                right: '28px',
                background: 'none',
                border: 'none',
                color: '#00f0ff',
                cursor: 'pointer'
              }}
            >
              <X size={32} />
            </button>

            {/* Large Stacked Nav Links (32px, slide in from right) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'center' }}>
              {NAV_LINKS.map((link, idx) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  onClick={() => scrollTo(link.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--font-heading, "Orbitron")',
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#e0e0e0',
                    cursor: 'pointer',
                    letterSpacing: '2px',
                    transition: 'color 0.2s ease'
                  }}
                  className="mobile-link"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar-avatar-pulse {
          animation: avatarGlow 3s ease-in-out infinite;
        }
        @keyframes avatarGlow {
          0%, 100% { box-shadow: 0 0 6px rgba(0, 240, 255, 0.3); }
          50% { box-shadow: 0 0 16px rgba(0, 240, 255, 0.8); }
        }
        .blueprint-nav-link:hover {
          color: #00f0ff !important;
        }
        .blueprint-nav-link:hover span:last-child {
          opacity: 1 !important;
        }
        .mobile-close-btn:hover {
          transform: rotate(90deg);
          transition: transform 0.25s ease;
        }
        .mobile-link:hover {
          color: #00f0ff !important;
        }
        @media (max-width: 850px) {
          .desktop-nav-links {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};
