import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BadgeCheck, ShieldCheck } from 'lucide-react';
import {
  CERTIFICATIONS,
  FOCUS_AREAS,
  LAB_PROFILES,
  LINKEDIN_CREDENTIALS_URL
} from '../../data/credentials';

const ease = [0.16, 1, 0.3, 1] as const;

export const BlueprintCredentials: React.FC = () => {
  return (
    <section id="credentials" className="section credentials">
      <div className="cred-aurora" aria-hidden="true" />

      <div className="shell credentials-inner">
        {/* ── Section header ─────────────────────────────────────────── */}
        <motion.header
          className="cred-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="eyebrow">Credentials</p>
          <h2 className="section-title">
            Verified practice, <em>documented</em>.
          </h2>
          <p className="lede">
            Certifications, platforms and hands-on labs I use to keep theory honest.
            Everything here is linked to its source — credentials live on LinkedIn,
            lab work on TryHackMe and HackTheBox.
          </p>
        </motion.header>

        <div className="cred-grid">
          {/* ── Certifications ───────────────────────────────────────── */}
          <div className="cred-list">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.article
                key={cert.id}
                className="cred-card"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: idx * 0.06, ease }}
                data-cursor={cert.credentialUrl ? 'Verify' : 'View'}
              >
                <div className="cred-card-index">{String(idx + 1).padStart(2, '0')}</div>

                <div className="cred-card-body">
                  <div className="cred-card-top">
                    <span className="cred-issuer">{cert.issuer}</span>
                    {cert.year && <span className="cred-year">{cert.year}</span>}
                  </div>

                  <h3 className="cred-card-title">{cert.title}</h3>

                  {cert.skills && cert.skills.length > 0 && (
                    <ul className="cred-skills">
                      {cert.skills.map((skill) => (
                        <li key={skill} className="chip">{skill}</li>
                      ))}
                    </ul>
                  )}

                  {cert.credentialUrl && (
                    <a
                      className="cred-verify"
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Verify credential <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>

                <BadgeCheck className="cred-card-mark" size={18} strokeWidth={1.5} aria-hidden="true" />
              </motion.article>
            ))}

            {/* The complete, continuously updated list lives on LinkedIn */}
            <motion.a
              className="cred-card cred-card--link"
              href={LINKEDIN_CREDENTIALS_URL}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: CERTIFICATIONS.length * 0.06, ease }}
              data-cursor="Open"
            >
              <div className="cred-card-index">{String(CERTIFICATIONS.length + 1).padStart(2, '0')}</div>
              <div className="cred-card-body">
                <div className="cred-card-top">
                  <span className="cred-issuer">LinkedIn</span>
                  <span className="cred-year">Always current</span>
                </div>
                <h3 className="cred-card-title">Full certification list</h3>
                <p className="cred-card-text">
                  Newer credentials are published here first. The LinkedIn record is the
                  complete, self-updating source.
                </p>
                <span className="cred-verify">
                  View all credentials <ArrowUpRight size={13} />
                </span>
              </div>
              <BadgeCheck className="cred-card-mark" size={18} strokeWidth={1.5} aria-hidden="true" />
            </motion.a>

            <motion.div
              className="cred-note"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <ShieldCheck size={15} strokeWidth={1.6} aria-hidden="true" />
              <span>
                Security work is only ever performed with explicit authorisation.
                Every assessment, lab and report follows that rule.
              </span>
            </motion.div>
          </div>

          {/* ── Hands-on platforms ───────────────────────────────────── */}
          <motion.aside
            className="cred-labs"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <div className="cred-labs-head">
              <p className="eyebrow is-muted">Hands-on</p>
              <h3>Labs, CTFs &amp; write-ups</h3>
            </div>

            <ul className="cred-lab-list">
              {LAB_PROFILES.map((lab) => (
                <li key={lab.id}>
                  <a
                    className="cred-lab"
                    href={lab.url}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="Labs"
                  >
                    <span className="cred-lab-mark" aria-hidden="true">
                      {lab.name.slice(0, 1)}
                    </span>
                    <span className="cred-lab-body">
                      <span className="cred-lab-row">
                        <strong>{lab.name}</strong>
                        <span className="cred-lab-tag">{lab.tag}</span>
                      </span>
                      <span className="cred-lab-handle">@{lab.handle}</span>
                      <span className="cred-lab-desc">{lab.description}</span>
                    </span>
                    <ArrowUpRight className="cred-lab-arrow" size={15} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="cred-focus">
              <p className="eyebrow is-muted">Focus areas</p>
              <ul className="cred-focus-list">
                {FOCUS_AREAS.map((area) => (
                  <li key={area} className="chip">{area}</li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </div>
      </div>

      <style>{`
        .credentials {
          position: relative;
          background: var(--ink-950);
          border-top: 1px solid var(--hairline);
        }

        .cred-aurora {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 55% 40% at 82% 8%, rgba(233, 162, 104, 0.09) 0%, transparent 65%),
            radial-gradient(ellipse 45% 35% at 12% 78%, rgba(159, 216, 228, 0.05) 0%, transparent 70%);
        }

        .credentials-inner { position: relative; z-index: 2; }

        .cred-head {
          max-width: 720px;
          margin-bottom: clamp(2.75rem, 5vw, 4rem);
        }
        .cred-head .section-title { margin: 0.9rem 0 1.1rem; }

        .cred-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
          gap: clamp(1.75rem, 4vw, 3rem);
          align-items: start;
        }

        .cred-list { display: flex; flex-direction: column; gap: 1rem; }

        .cred-card {
          position: relative;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 1.25rem;
          padding: 1.6rem 1.75rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--hairline);
          background:
            linear-gradient(180deg, rgba(237, 232, 223, 0.028) 0%, transparent 50%),
            var(--ink-800);
          text-decoration: none;
          color: inherit;
          transition:
            border-color var(--transition-smooth),
            transform var(--transition-smooth),
            box-shadow var(--transition-smooth);
        }
        .cred-card:hover {
          border-color: rgba(233, 162, 104, 0.32);
          transform: translateY(-2px);
          box-shadow: var(--shadow-lift);
        }

        .cred-card-index {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          color: var(--text-faint);
          padding-top: 0.35rem;
        }

        .cred-card-top {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }
        .cred-issuer {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ember);
        }
        .cred-year {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          color: var(--text-faint);
        }

        .cred-card-title {
          font-family: var(--font-heading);
          font-size: 1.12rem;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.35;
          color: var(--text-primary);
          margin-bottom: 0.65rem;
        }
        .cred-card-text {
          font-size: 0.9rem;
          line-height: 1.65;
          color: var(--text-muted);
          max-width: 52ch;
        }

        .cred-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          list-style: none;
          margin: 0.85rem 0 0;
        }

        .cred-verify {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          margin-top: 1rem;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        .cred-card:hover .cred-verify { color: var(--ember); }

        .cred-card-mark {
          position: absolute;
          right: 1.35rem;
          bottom: 1.35rem;
          color: rgba(233, 162, 104, 0.28);
        }

        .cred-note {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          padding: 0.35rem 0.25rem;
          color: var(--text-faint);
          font-size: 0.82rem;
          line-height: 1.6;
        }
        .cred-note svg { flex-shrink: 0; margin-top: 0.15rem; color: var(--ember); opacity: 0.7; }

        /* ── Labs panel ───────────────────────────────────────────── */
        .cred-labs {
          padding: clamp(1.5rem, 3vw, 2rem);
          border-radius: var(--radius-xl);
          border: 1px solid var(--hairline);
          background: linear-gradient(180deg, rgba(237, 232, 223, 0.035) 0%, transparent 60%), var(--ink-900);
          box-shadow: var(--shadow-md);
        }

        .cred-labs-head { margin-bottom: 1.5rem; }
        .cred-labs-head h3 {
          margin-top: 0.7rem;
          font-size: 1.35rem;
          font-weight: 500;
          letter-spacing: -0.028em;
        }

        .cred-lab-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }

        .cred-lab {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 0.9rem;
          align-items: start;
          padding: 1rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          color: inherit;
          border: 1px solid transparent;
          transition: background var(--transition-fast), border-color var(--transition-fast);
        }
        .cred-lab:hover {
          background: rgba(237, 232, 223, 0.03);
          border-color: rgba(233, 162, 104, 0.2);
        }

        .cred-lab-mark {
          display: grid;
          place-items: center;
          width: 34px; height: 34px;
          border-radius: 10px;
          border: 1px solid rgba(233, 162, 104, 0.28);
          background: rgba(233, 162, 104, 0.07);
          font-family: var(--font-heading);
          font-size: 0.92rem;
          color: var(--ember);
        }

        .cred-lab-body { display: flex; flex-direction: column; gap: 0.2rem; min-width: 0; }
        .cred-lab-row { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
        .cred-lab-row strong { font-size: 0.95rem; font-weight: 500; color: var(--text-primary); }
        .cred-lab-tag {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ember);
          background: rgba(233, 162, 104, 0.09);
          border-radius: var(--radius-pill);
          padding: 0.12rem 0.45rem;
        }
        .cred-lab-handle {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-faint);
        }
        .cred-lab-desc {
          font-size: 0.8rem;
          line-height: 1.55;
          color: var(--text-muted);
          margin-top: 0.25rem;
        }
        .cred-lab-arrow { color: var(--text-faint); margin-top: 0.35rem; transition: color var(--transition-fast), transform var(--transition-fast); }
        .cred-lab:hover .cred-lab-arrow { color: var(--ember); transform: translate(2px, -2px); }

        .cred-focus {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--hairline);
        }
        .cred-focus-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          list-style: none;
          margin-top: 0.85rem;
        }

        @media (max-width: 940px) {
          .cred-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 520px) {
          .cred-card { grid-template-columns: 1fr; gap: 0.5rem; padding: 1.35rem; }
          .cred-card-index { padding-top: 0; }
          .cred-card-mark { display: none; }
        }
      `}</style>
    </section>
  );
};
