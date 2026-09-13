import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Menu, X, Monitor } from 'lucide-react';
import { type ThemeName } from '../../hooks/useTheme';

interface NavbarProps {
  currentTheme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
}

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Arsenal' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'projects', label: 'Operations' },
  { id: 'experience', label: 'Timeline' },
  { id: 'contact', label: 'Contact' }
];

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme,
  onThemeChange,
  crtEnabled,
  onToggleCrt
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '0.6rem 0' : '1.2rem 0',
        transition: 'padding var(--transition-smooth)',
        backgroundColor: scrolled ? 'rgba(4, 7, 17, 0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand */}
        <button
          onClick={() => scrollTo('hero')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '1.05rem',
            color: 'var(--text-primary)',
            letterSpacing: '0.04em'
          }}
          aria-label="Mr. Nobody Home"
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--accent-dim)',
              border: '1px solid var(--border-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)'
            }}
          >
            <Shield size={18} />
          </div>
          <span>
            Mr.Nobody<span style={{ color: 'var(--accent)', animation: 'pulse 1s infinite' }}>_</span>
          </span>
        </button>

        {/* Desktop Links */}
        <nav
          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          className="desktop-nav"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map(item => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  position: 'relative',
                  padding: '0.4rem 0.85rem',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 500,
                  borderRadius: 'var(--radius-sm)',
                  transition: 'color var(--transition-fast)'
                }}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: '15%',
                      right: '15%',
                      height: '2px',
                      backgroundColor: 'var(--accent)',
                      boxShadow: '0 0 8px var(--accent-glow)'
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Controls: Theme & CRT & Mobile toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Theme Palette Switcher */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.25rem',
              background: 'var(--bg-surface)',
              borderRadius: '20px',
              border: '1px solid var(--border-subtle)'
            }}
            role="group"
            aria-label="Theme Selector"
          >
            <button
              onClick={() => onThemeChange('green')}
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#00FF66',
                border: currentTheme === 'green' ? '2px solid white' : 'none',
                boxShadow: currentTheme === 'green' ? '0 0 8px #00ff66' : 'none'
              }}
              title="Terminal Green Theme"
              aria-label="Emerald Green Theme"
            />
            <button
              onClick={() => onThemeChange('cyan')}
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#00F0FF',
                border: currentTheme === 'cyan' ? '2px solid white' : 'none',
                boxShadow: currentTheme === 'cyan' ? '0 0 8px #00f0ff' : 'none'
              }}
              title="Cyber Cyan Theme"
              aria-label="Cyber Cyan Theme"
            />
            <button
              onClick={() => onThemeChange('crimson')}
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#FF2A55',
                border: currentTheme === 'crimson' ? '2px solid white' : 'none',
                boxShadow: currentTheme === 'crimson' ? '0 0 8px #ff2a55' : 'none'
              }}
              title="Crimson Alert Theme"
              aria-label="Crimson Theme"
            />
          </div>

          {/* CRT Toggle Button */}
          <button
            onClick={onToggleCrt}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.35rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              background: crtEnabled ? 'var(--accent-dim)' : 'var(--bg-surface)',
              border: `1px solid ${crtEnabled ? 'var(--accent)' : 'var(--border-subtle)'}`,
              color: crtEnabled ? 'var(--accent)' : 'var(--text-muted)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)'
            }}
            title="Toggle Scanline & CRT Effect"
            aria-label="Toggle CRT Effect"
          >
            <Monitor size={14} />
            <span className="hide-mobile">CRT</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="mobile-menu-btn"
            style={{
              padding: '0.4rem',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              display: 'none'
            }}
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              backgroundColor: 'rgba(4, 7, 17, 0.96)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid var(--border-subtle)',
              overflow: 'hidden'
            }}
          >
            <div className="container" style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    textAlign: 'left',
                    padding: '0.6rem 0.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1rem',
                    color: activeSection === item.id ? 'var(--accent)' : 'var(--text-primary)',
                    fontWeight: activeSection === item.id ? 600 : 400
                  }}
                >
                  &gt; {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .hide-mobile {
            display: none;
          }
        }
      `}</style>
    </motion.header>
  );
};
