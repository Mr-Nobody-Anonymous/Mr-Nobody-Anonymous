import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, TerminalSquare } from 'lucide-react';
import { GITHUB_URL, LINKEDIN_URL } from '../../data/portfolio';

interface BlueprintHeroProps {
  onScrollToAbout: () => void;
  onOpenTerminal?: () => void;
}

const HERO_IMAGE = `${import.meta.env.BASE_URL}images/nobody-hero.jpg`;

const META = [
  { label: 'Focus', value: 'Offensive security' },
  { label: 'Practice', value: 'TryHackMe · HackTheBox' },
  { label: 'Building', value: 'Argus · Cerberus · Ultrone' }
];

export const BlueprintHero: React.FC<BlueprintHeroProps> = ({ onScrollToAbout, onOpenTerminal }) => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ['0px', '80px']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0px', '-60px']);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section id="home" ref={containerRef} className="hero">
      {/* Atmosphere */}
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-bloom hero-bloom--ember" />
        <div className="hero-bloom hero-bloom--glacier" />
      </div>

      <div className="hero-inner">
        <motion.div className="hero-copy" style={{ y: contentY, opacity: contentOpacity }}>
          <motion.p
            className="hero-status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero-status-dot" aria-hidden="true" />
            Addis Ababa, Ethiopia
            <span className="hero-status-sep" aria-hidden="true">/</span>
            Open to security work
          </motion.p>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            Beamlak
            <br />
            Sintayehu<span className="hero-title-dot">.</span>
          </motion.h1>

          <motion.p
            className="hero-alias"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            also known as <span className="font-serif">Mr. Nobody</span>
          </motion.p>

          <motion.p
            className="hero-lede"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Cybersecurity practitioner working where <strong>offensive security</strong>,
            threat modeling and applied AI meet. I build systems that hold up under
            scrutiny — and study the ways they break.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            <button type="button" className="btn btn--primary" onClick={onScrollToAbout} data-cursor="Explore">
              Explore my work <ArrowUpRight size={16} strokeWidth={2} />
            </button>
            {onOpenTerminal && (
              <button type="button" className="btn btn--ghost" onClick={onOpenTerminal} data-cursor="Open">
                <TerminalSquare size={16} strokeWidth={1.8} />
                Open the console
                <kbd>⌘K</kbd>
              </button>
            )}
          </motion.div>

          <motion.dl
            className="hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            {META.map((item) => (
              <div key={item.label} className="hero-meta-item">
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Portrait */}
        <motion.div
          className="hero-portrait-wrap"
          style={{ y: portraitY, opacity: contentOpacity }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-portrait-frame">
            <motion.img
              src={HERO_IMAGE}
              alt="Artwork: a hooded figure lit by ember light — the Mr. Nobody identity"
              className="hero-portrait-img"
              style={{ scale: portraitScale }}
            />
            <div className="hero-portrait-veil" aria-hidden="true" />

            <div className="hero-portrait-tag hero-portrait-tag--top">
              <span className="hero-pulse" aria-hidden="true" />
              SYS.ID / 0x4E4F424F4459
            </div>

            <div className="hero-portrait-tag hero-portrait-tag--bottom">
              <span>STATUS</span>
              <strong>ACTIVE</strong>
            </div>
          </div>

          <div className="hero-portrait-caption">
            <span>Identity withheld by design</span>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight size={12} />
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={12} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        className="hero-scroll"
        onClick={onScrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        aria-label="Scroll to the about section"
      >
        <span className="hero-scroll-line" aria-hidden="true" />
        Scroll
      </motion.button>

      <style>{`
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          padding: clamp(6.5rem, 12vh, 9rem) clamp(1.25rem, 5vw, 3.5rem) clamp(4rem, 9vh, 6rem);
          overflow: hidden;
        }

        .hero-atmosphere { position: absolute; inset: 0; pointer-events: none; }
        .hero-bloom { position: absolute; border-radius: 50%; filter: blur(90px); }
        .hero-bloom--ember {
          width: min(46vw, 640px); height: min(46vw, 640px);
          right: 4%; top: -6%;
          background: radial-gradient(circle, rgba(233, 162, 104, 0.20) 0%, rgba(233, 162, 104, 0.05) 45%, transparent 72%);
        }
        .hero-bloom--glacier {
          width: min(38vw, 520px); height: min(38vw, 520px);
          left: -8%; bottom: -12%;
          background: radial-gradient(circle, rgba(159, 216, 228, 0.10) 0%, transparent 70%);
        }

        .hero-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: var(--shell-max);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.85fr);
          gap: clamp(2.5rem, 6vw, 5.5rem);
          align-items: center;
        }

        .hero-copy { max-width: 620px; }

        .hero-status {
          display: inline-flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.55rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: clamp(1.5rem, 3vw, 2.25rem);
        }
        .hero-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--ember);
          box-shadow: 0 0 0 4px rgba(233, 162, 104, 0.14);
          animation: heroPulse 2.8s ease-in-out infinite;
        }
        .hero-status-sep { color: var(--text-faint); }
        @keyframes heroPulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(233, 162, 104, 0.14); }
          50% { box-shadow: 0 0 0 7px rgba(233, 162, 104, 0.05); }
        }

        .hero-title {
          font-size: clamp(3.1rem, 8.2vw, 6.4rem);
          font-weight: 500;
          line-height: 0.94;
          letter-spacing: -0.045em;
          color: var(--text-primary);
          margin-bottom: 1.15rem;
        }
        .hero-title-dot { color: var(--ember); }

        .hero-alias {
          font-size: clamp(1rem, 1.6vw, 1.15rem);
          color: var(--text-muted);
          letter-spacing: -0.005em;
          margin-bottom: clamp(1.5rem, 3vw, 2rem);
        }
        .hero-alias .font-serif { font-size: 1.28em; color: var(--ember-soft); }

        .hero-lede {
          font-size: clamp(1rem, 1.25vw, 1.1rem);
          line-height: 1.75;
          color: var(--text-secondary);
          max-width: 46ch;
          margin-bottom: clamp(2rem, 4vw, 2.75rem);
        }
        .hero-lede strong { color: var(--text-primary); font-weight: 500; }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
          margin-bottom: clamp(2.5rem, 5vw, 3.5rem);
        }
        .hero-actions kbd {
          font-family: var(--font-mono);
          font-size: 0.66rem;
          padding: 0.15rem 0.4rem;
          margin-left: 0.2rem;
          border-radius: 4px;
          border: 1px solid rgba(237, 232, 223, 0.16);
          color: var(--text-muted);
        }

        .hero-meta {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.25rem;
          padding-top: 1.75rem;
          border-top: 1px solid var(--hairline);
        }
        .hero-meta-item dt {
          font-family: var(--font-mono);
          font-size: 0.66rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-faint);
          margin-bottom: 0.4rem;
        }
        .hero-meta-item dd {
          font-size: 0.86rem;
          line-height: 1.45;
          color: var(--text-secondary);
        }

        /* ── Portrait ─────────────────────────────────────────────── */
        .hero-portrait-wrap { position: relative; }
        .hero-portrait-frame {
          position: relative;
          aspect-ratio: 4 / 5;
          border-radius: var(--radius-xl);
          overflow: hidden;
          border: 1px solid rgba(237, 232, 223, 0.10);
          box-shadow: 0 40px 90px -40px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(233, 162, 104, 0.06);
        }
        .hero-portrait-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: 74% 26%;
          filter: saturate(0.92) contrast(1.04);
        }
        .hero-portrait-veil {
          position: absolute; inset: 0;
          background:
            linear-gradient(180deg, rgba(7, 8, 10, 0.45) 0%, transparent 30%, transparent 62%, rgba(7, 8, 10, 0.85) 100%),
            linear-gradient(90deg, rgba(7, 8, 10, 0.4) 0%, transparent 40%);
        }
        .hero-portrait-tag {
          position: absolute;
          left: 1.1rem; right: 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.66rem;
          letter-spacing: 0.12em;
          color: rgba(237, 232, 223, 0.72);
        }
        .hero-portrait-tag--top { top: 1.1rem; }
        .hero-portrait-tag--bottom {
          bottom: 1.1rem;
          justify-content: space-between;
          color: var(--text-muted);
        }
        .hero-portrait-tag--bottom strong { color: var(--ember); letter-spacing: 0.16em; }
        .hero-pulse {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--ember);
          animation: heroPulse 2.4s ease-in-out infinite;
        }

        .hero-portrait-caption {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          margin-top: 0.9rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.06em;
          color: var(--text-faint);
        }
        .hero-portrait-caption span { margin-right: auto; }
        .hero-portrait-caption a {
          display: inline-flex; align-items: center; gap: 0.25rem;
          color: var(--text-muted);
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        .hero-portrait-caption a:hover { color: var(--ember); }

        /* ── Scroll cue ───────────────────────────────────────────── */
        .hero-scroll {
          position: absolute;
          left: 50%;
          bottom: 1.75rem;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--text-faint);
          z-index: 3;
          transition: color var(--transition-fast);
        }
        .hero-scroll:hover { color: var(--ember); }
        .hero-scroll-line {
          width: 1px; height: 34px;
          background: linear-gradient(to bottom, transparent, rgba(233, 162, 104, 0.7));
          animation: heroScrollCue 2.4s ease-in-out infinite;
        }
        @keyframes heroScrollCue {
          0%, 100% { opacity: 0.35; transform: scaleY(0.7); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
        }

        @media (max-width: 980px) {
          .hero { min-height: auto; padding-top: 6rem; }
          .hero-inner { grid-template-columns: 1fr; gap: 2.75rem; }
          .hero-copy { max-width: 100%; order: 1; }
          .hero-portrait-wrap { order: 2; max-width: 420px; }
          .hero-portrait-frame { aspect-ratio: 5 / 4; }
          .hero-portrait-img { object-position: 70% 22%; }
          .hero-scroll { display: none; }
        }

        @media (max-width: 560px) {
          .hero-meta { grid-template-columns: 1fr; gap: 0.9rem; }
          .hero-actions .btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
};
