import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Dot, ArrowUpRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

const TECH_TAGS = ['React', 'TypeScript', 'Python', 'PyTorch', 'OpenCV', 'Flutter', 'Linux', 'Security research'];

const PROFILE_ROWS = [
  { label: 'Role', value: 'Cybersecurity practitioner' },
  { label: 'Based in', value: 'Addis Ababa, Ethiopia' },
  { label: 'Focus', value: 'Offensive security · Threat modeling' },
  { label: 'Currently', value: 'Autonomous AI architecture' },
  { label: 'Availability', value: 'Open to collaboration', accent: true }
];

export const BlueprintAbout: React.FC = () => {
  return (
    <section id="about" className="section about">
      <div className="dot-grid" aria-hidden="true" />

      <div className="shell about-inner">
        {/* ── Copy ─────────────────────────────────────────────────── */}
        <div className="about-copy">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About
          </motion.p>

          <motion.h2
            className="section-title about-title"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05, ease }}
          >
            Curiosity, turned into <em>craft</em>.
          </motion.h2>

          <div className="about-body">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
            >
              I build things on the internet — sometimes useful,{' '}
              <strong>sometimes just because I can</strong>. I started as a kid poking
              at code, wondering how screens come alive. That curiosity never died;
              it evolved into a discipline.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25, ease }}
            >
              Today I work across <strong>offensive security</strong>, threat modeling
              and applied AI — designing web experiences and autonomous systems, then
              taking them apart to see where they fail. Understanding the attack is how
              you earn the defence.
            </motion.p>

            <motion.p
              className="about-quiet"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              You can see my work. But you'll never fully see me.
              <span> That's the point.</span>
            </motion.p>
          </div>

          <motion.ul
            className="about-tags"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {TECH_TAGS.map((tag) => (
              <li key={tag} className="chip">{tag}</li>
            ))}
          </motion.ul>
        </div>

        {/* ── Profile card ─────────────────────────────────────────── */}
        <motion.aside
          className="about-card"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          <div className="about-card-head">
            <div className="about-card-id">
              <span className="about-monogram" aria-hidden="true">BS</span>
              <div>
                <p className="about-card-name">Beamlak Sintayehu</p>
                <p className="about-card-alias">mr. nobody — security research</p>
              </div>
            </div>
            <span className="about-card-live">
              <Dot size={22} strokeWidth={4} aria-hidden="true" />
              live
            </span>
          </div>

          <dl className="about-rows">
            {PROFILE_ROWS.map((row) => (
              <div key={row.label} className="about-row">
                <dt>{row.label}</dt>
                <dd className={row.accent ? 'is-accent' : ''}>{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="about-card-foot">
            <span className="about-loc">
              <MapPin size={13} strokeWidth={1.7} aria-hidden="true" />
              9.03° N, 38.74° E
            </span>
            <a
              className="about-link"
              href="https://github.com/Mr-Nobody-Anonymous"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Decorative scanline, extremely subtle */}
          <div className="about-card-glow" aria-hidden="true" />
        </motion.aside>
      </div>

      <style>{`
        .about {
          position: relative;
          background: var(--ink-900);
          border-top: 1px solid var(--hairline);
        }

        .about-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
          gap: clamp(2.5rem, 6vw, 5rem);
          align-items: center;
        }

        .about-title { margin: 1rem 0 1.75rem; max-width: 18ch; }

        .about-body {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          max-width: 56ch;
        }
        .about-body p {
          font-size: clamp(0.98rem, 1.1vw, 1.05rem);
          line-height: 1.8;
          color: var(--text-secondary);
        }
        .about-body strong { color: var(--text-primary); font-weight: 500; }

        .about-quiet {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.22rem !important;
          color: var(--ember-soft) !important;
          padding-left: 1.1rem;
          border-left: 1px solid rgba(233, 162, 104, 0.35);
        }
        .about-quiet span { color: var(--text-muted); font-style: normal; font-size: 0.95rem; }

        .about-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          list-style: none;
          margin-top: 2rem;
        }

        /* ── Card ─────────────────────────────────────────────────── */
        .about-card {
          position: relative;
          padding: clamp(1.5rem, 3vw, 2rem);
          border-radius: var(--radius-xl);
          border: 1px solid var(--hairline);
          background:
            linear-gradient(180deg, rgba(237, 232, 223, 0.04) 0%, transparent 55%),
            var(--ink-800);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
        }

        .about-card-glow {
          position: absolute;
          width: 260px; height: 260px;
          right: -90px; top: -110px;
          background: radial-gradient(circle, rgba(233, 162, 104, 0.16), transparent 70%);
          filter: blur(20px);
          pointer-events: none;
        }

        .about-card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--hairline);
        }

        .about-card-id { display: flex; align-items: center; gap: 0.8rem; }

        .about-monogram {
          display: grid;
          place-items: center;
          width: 42px; height: 42px;
          border-radius: 50%;
          border: 1px solid rgba(233, 162, 104, 0.4);
          background: rgba(233, 162, 104, 0.07);
          font-family: var(--font-heading);
          font-size: 0.85rem;
          letter-spacing: 0.02em;
          color: var(--ember);
        }

        .about-card-name {
          font-family: var(--font-heading);
          font-size: 0.98rem;
          font-weight: 500;
          letter-spacing: -0.015em;
          color: var(--text-primary);
        }
        .about-card-alias {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-faint);
          margin-top: 0.2rem;
        }

        .about-card-live {
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ember);
        }
        .about-card-live svg { color: var(--ember); animation: liveBlink 2.4s ease-in-out infinite; }
        @keyframes liveBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }

        .about-rows {
          display: flex;
          flex-direction: column;
          padding: 0.5rem 0;
        }
        .about-row {
          display: grid;
          grid-template-columns: 96px 1fr;
          gap: 1rem;
          padding: 0.72rem 0;
          border-bottom: 1px solid rgba(237, 232, 223, 0.05);
        }
        .about-row:last-child { border-bottom: 0; }
        .about-row dt {
          font-family: var(--font-mono);
          font-size: 0.64rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-faint);
          padding-top: 0.15rem;
        }
        .about-row dd {
          font-size: 0.88rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }
        .about-row dd.is-accent { color: var(--ember); }

        .about-card-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--hairline);
        }
        .about-loc {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.64rem;
          letter-spacing: 0.08em;
          color: var(--text-faint);
        }
        .about-link {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        .about-link:hover { color: var(--ember); }

        @media (max-width: 940px) {
          .about-inner { grid-template-columns: 1fr; }
          .about-card { max-width: 520px; }
        }
        @media (max-width: 480px) {
          .about-row { grid-template-columns: 1fr; gap: 0.25rem; }
        }
      `}</style>
    </section>
  );
};
