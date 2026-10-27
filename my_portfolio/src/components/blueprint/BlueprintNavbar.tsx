import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';

interface BlueprintNavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const NAV_LINKS = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'skills', label: 'Skills', index: '02' },
  { id: 'work', label: 'Work', index: '03' },
  { id: 'experience', label: 'Journey', index: '04' },
  { id: 'credentials', label: 'Credentials', index: '05' },
  { id: 'contact', label: 'Contact', index: '06' }
];

export const BlueprintNavbar: React.FC<BlueprintNavbarProps> = ({ soundEnabled, onToggleSound }) => {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolledPastHero(scrollY > window.innerHeight * 0.6);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollY / docHeight : 0);

      const sections = ['home', ...NAV_LINKS.map((l) => l.id)];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 180) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Reading progress hairline */}
      <div className="nav-progress" aria-hidden="true">
        <div className="nav-progress-bar" style={{ width: `${scrollProgress * 100}%` }} />
      </div>

      {/* Compact menu trigger while the hero is on screen */}
      <AnimatePresence>
        {!scrolledPastHero && (
          <motion.button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation"
            className="nav-burger"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Menu size={18} strokeWidth={1.6} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Persistent nav bar */}
      <motion.nav
        className={`nav ${scrolledPastHero ? 'is-visible' : ''}`}
        initial={false}
        animate={{ y: scrolledPastHero ? 0 : -80, opacity: scrolledPastHero ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Primary"
      >
        <div className="nav-inner">
          <button type="button" className="nav-brand" onClick={() => scrollTo('home')}>
            <span className="nav-brand-mark" aria-hidden="true">
              <span />
            </span>
            <span className="nav-brand-name">
              Beamlak Sintayehu
              <span className="nav-brand-sub">Cybersecurity · Applied AI</span>
            </span>
          </button>

          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className={`nav-link ${activeSection === link.id ? 'is-active' : ''}`}
                aria-current={activeSection === link.id ? 'true' : undefined}
              >
                <span className="nav-link-index">{link.index}</span>
                {link.label}
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <button
              type="button"
              onClick={onToggleSound}
              className="nav-icon-btn"
              aria-label={soundEnabled ? 'Mute interface sounds' : 'Enable interface sounds'}
              aria-pressed={soundEnabled}
            >
              {soundEnabled ? <Volume2 size={16} strokeWidth={1.7} /> : <VolumeX size={16} strokeWidth={1.7} />}
            </button>

            <button type="button" className="nav-cta" onClick={() => scrollTo('contact')}>
              Get in touch
              <ArrowUpRight size={14} strokeWidth={1.8} />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="nav-icon-btn nav-icon-btn--menu"
              aria-label="Open navigation"
            >
              <Menu size={17} strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="nav-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <motion.div
              className="nav-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="nav-drawer-head">
                <span className="eyebrow">Index</span>
                <button
                  type="button"
                  className="nav-icon-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation"
                >
                  <X size={18} strokeWidth={1.7} />
                </button>
              </div>

              <nav className="nav-drawer-links" aria-label="Sections">
                {NAV_LINKS.map((link, idx) => (
                  <motion.button
                    key={link.id}
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className={`nav-drawer-link ${activeSection === link.id ? 'is-active' : ''}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + idx * 0.05, duration: 0.4 }}
                  >
                    <span className="nav-drawer-index">{link.index}</span>
                    {link.label}
                    <ArrowUpRight size={16} strokeWidth={1.5} />
                  </motion.button>
                ))}
              </nav>

              <div className="nav-drawer-foot">
                <button type="button" className="btn btn--ghost" onClick={onToggleSound}>
                  {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                  Sound {soundEnabled ? 'on' : 'off'}
                </button>
                <button type="button" className="btn btn--primary" onClick={() => scrollTo('contact')}>
                  Get in touch <ArrowUpRight size={15} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-progress {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 2px;
          z-index: 99990;
          pointer-events: none;
        }
        .nav-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, rgba(233, 162, 104, 0.35) 0%, var(--ember) 100%);
          transition: width 0.12s linear;
        }

        .nav-burger {
          position: fixed;
          top: 1.35rem; right: 1.35rem;
          z-index: 99980;
          display: grid;
          place-items: center;
          width: 42px; height: 42px;
          border-radius: 50%;
          border: 1px solid var(--hairline);
          background: rgba(10, 12, 15, 0.65);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          color: var(--text-primary);
          transition: border-color var(--transition-fast), color var(--transition-fast);
        }
        .nav-burger:hover { border-color: rgba(233, 162, 104, 0.4); color: var(--ember); }

        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 99980;
          height: 68px;
          background: rgba(8, 9, 11, 0.72);
          backdrop-filter: blur(22px) saturate(130%);
          -webkit-backdrop-filter: blur(22px) saturate(130%);
          border-bottom: 1px solid var(--hairline);
        }
        .nav.is-visible { box-shadow: 0 18px 40px -32px rgba(0, 0, 0, 0.9); }

        .nav-inner {
          height: 100%;
          max-width: var(--shell-max);
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 4vw, 2.5rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          min-width: 0;
        }
        .nav-brand-mark {
          display: grid;
          place-items: center;
          width: 30px; height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(233, 162, 104, 0.45);
          flex-shrink: 0;
        }
        .nav-brand-mark span {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--ember);
          box-shadow: 0 0 10px rgba(233, 162, 104, 0.8);
        }
        .nav-brand-name {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.1rem;
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          white-space: nowrap;
        }
        .nav-brand-sub {
          font-family: var(--font-mono);
          font-size: 0.56rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-faint);
        }

        .nav-links { display: flex; align-items: center; gap: 0.15rem; }

        .nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.45rem 0.7rem;
          border-radius: var(--radius-pill);
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 400;
          color: var(--text-muted);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .nav-link-index {
          font-family: var(--font-mono);
          font-size: 0.56rem;
          color: var(--text-faint);
          transition: color var(--transition-fast);
        }
        .nav-link:hover { color: var(--text-primary); background: rgba(237, 232, 223, 0.04); }
        .nav-link.is-active { color: var(--ember); background: rgba(233, 162, 104, 0.08); }
        .nav-link.is-active .nav-link-index { color: rgba(233, 162, 104, 0.65); }

        .nav-actions { display: flex; align-items: center; gap: 0.5rem; }

        .nav-icon-btn {
          display: grid;
          place-items: center;
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1px solid var(--hairline);
          color: var(--text-muted);
          transition: color var(--transition-fast), border-color var(--transition-fast);
        }
        .nav-icon-btn:hover { color: var(--ember); border-color: rgba(233, 162, 104, 0.36); }
        .nav-icon-btn--menu { display: none; }

        .nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-pill);
          border: 1px solid rgba(233, 162, 104, 0.32);
          background: rgba(233, 162, 104, 0.08);
          font-family: var(--font-heading);
          font-size: 0.8rem;
          color: var(--ember-soft);
          transition: background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
        }
        .nav-cta:hover {
          background: var(--gradient-ember);
          border-color: transparent;
          color: #1a1108;
        }

        /* ── Drawer ───────────────────────────────────────────────── */
        .nav-drawer {
          position: fixed;
          inset: 0;
          z-index: 99995;
          background: rgba(4, 5, 7, 0.6);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .nav-drawer-panel {
          position: absolute;
          top: 0; right: 0; bottom: 0;
          width: min(420px, 92vw);
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1.5rem 2rem;
          background: var(--ink-900);
          border-left: 1px solid var(--hairline);
          box-shadow: -30px 0 80px -40px rgba(0, 0, 0, 0.9);
        }
        .nav-drawer-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--hairline);
        }
        .nav-drawer-links {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          padding: 1.5rem 0;
          flex: 1;
        }
        .nav-drawer-link {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.85rem 0.6rem;
          border-radius: var(--radius-md);
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 400;
          letter-spacing: -0.02em;
          color: var(--text-secondary);
          text-align: left;
          transition: background var(--transition-fast), color var(--transition-fast);
        }
        .nav-drawer-link svg { margin-left: auto; opacity: 0.4; }
        .nav-drawer-link:hover { background: rgba(237, 232, 223, 0.04); color: var(--text-primary); }
        .nav-drawer-link.is-active { color: var(--ember); }
        .nav-drawer-index {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          color: var(--text-faint);
        }
        .nav-drawer-foot {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--hairline);
        }
        .nav-drawer-foot .btn { width: 100%; }

        @media (max-width: 1020px) {
          .nav-links { display: none; }
          .nav-icon-btn--menu { display: grid; }
        }
        @media (max-width: 620px) {
          .nav-brand-sub { display: none; }
          .nav-cta { display: none; }
          .nav { height: 62px; }
        }
      `}</style>
    </>
  );
};
