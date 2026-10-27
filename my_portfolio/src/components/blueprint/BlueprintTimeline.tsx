import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE_TIMELINE, EDUCATION } from '../../data/experience';

const ease = [0.16, 1, 0.3, 1] as const;

export const BlueprintTimeline: React.FC = () => {
  return (
    <section id="experience" className="section timeline">
      <div className="shell timeline-inner">
        <motion.header
          className="timeline-head"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="eyebrow">Journey</p>
          <h2 className="section-title timeline-title">
            A short <em>record</em> of the work.
          </h2>
          <p className="lede">
            Four years of building, breaking and documenting — moving from systems
            fundamentals to autonomous architectures and threat modeling.
          </p>
        </motion.header>

        <ol className="timeline-list">
          {EXPERIENCE_TIMELINE.map((item, idx) => (
            <motion.li
              key={`${item.year}-${item.title}`}
              className="timeline-item"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.6, delay: idx * 0.06, ease }}
            >
              <div className="timeline-rail" aria-hidden="true">
                <span className={`timeline-node ${item.status === 'CURRENT' ? 'is-current' : ''}`} />
              </div>

              <div className="timeline-year">
                <span className="timeline-year-value">{item.year}</span>
                <span className={`timeline-status ${item.status === 'CURRENT' ? 'is-current' : ''}`}>
                  {item.status === 'CURRENT' ? 'In progress' : 'Completed'}
                </span>
              </div>

              <div className="timeline-body">
                <p className="timeline-tag">{item.tag}</p>
                <h3 className="timeline-item-title">{item.title}</h3>
                <p className="timeline-desc">{item.description}</p>
                <ul className="timeline-tech">
                  {item.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* Education — deliberately quiet: a footer, not a headline. */}
        <motion.div
          className="timeline-education"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="eyebrow">Education</p>
          <ul className="edu-list">
            {EDUCATION.map((item) => (
              <li key={item.institution} className="edu-item">
                <div className="edu-head">
                  <h3 className="edu-institution">{item.institution}</h3>
                  <span className="edu-period">{item.period}</span>
                </div>
                <p className="edu-programme">{item.programme}</p>
                <p className="edu-detail">{item.detail}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <style>{`
        .timeline {
          position: relative;
          background: var(--ink-950);
          border-top: 1px solid var(--hairline);
        }
        .timeline-inner { position: relative; z-index: 2; }

        .timeline-head {
          max-width: 660px;
          margin-bottom: clamp(2.5rem, 5vw, 4rem);
        }
        .timeline-title { margin: 0.9rem 0 1.1rem; }

        .timeline-list {
          list-style: none;
          display: flex;
          flex-direction: column;
        }

        .timeline-item {
          position: relative;
          display: grid;
          grid-template-columns: 12px 150px minmax(0, 1fr);
          gap: clamp(1rem, 2.5vw, 2rem);
          padding: 0 0 clamp(2rem, 4vw, 2.75rem);
        }
        .timeline-item:last-child { padding-bottom: 0; }

        .timeline-rail {
          position: relative;
          display: flex;
          justify-content: center;
          padding-top: 0.55rem;
        }
        .timeline-rail::before {
          content: '';
          position: absolute;
          top: 1.3rem;
          bottom: -1.2rem;
          width: 1px;
          background: linear-gradient(to bottom, rgba(237, 232, 223, 0.16), rgba(237, 232, 223, 0.04));
        }
        .timeline-item:last-child .timeline-rail::before { display: none; }

        .timeline-node {
          position: relative;
          z-index: 2;
          width: 9px; height: 9px;
          border-radius: 50%;
          background: var(--ink-950);
          border: 1px solid rgba(237, 232, 223, 0.3);
        }
        .timeline-node.is-current {
          background: var(--ember);
          border-color: var(--ember);
          box-shadow: 0 0 0 4px rgba(233, 162, 104, 0.12), 0 0 14px rgba(233, 162, 104, 0.5);
        }

        .timeline-year {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding-top: 0.15rem;
        }
        .timeline-year-value {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          letter-spacing: 0.06em;
          color: var(--text-primary);
        }
        .timeline-status {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-faint);
        }
        .timeline-status.is-current { color: var(--ember); }

        .timeline-body {
          padding-bottom: 0.25rem;
          border-bottom: 1px solid transparent;
        }
        .timeline-tag {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-faint);
          margin-bottom: 0.5rem;
        }
        .timeline-item-title {
          font-size: clamp(1.12rem, 1.9vw, 1.4rem);
          font-weight: 500;
          letter-spacing: -0.025em;
          color: var(--text-primary);
          margin-bottom: 0.6rem;
        }
        .timeline-desc {
          font-size: 0.92rem;
          line-height: 1.75;
          color: var(--text-muted);
          max-width: 62ch;
          margin-bottom: 1rem;
        }
        .timeline-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          list-style: none;
        }
        .timeline-tech li {
          font-family: var(--font-mono);
          font-size: 0.64rem;
          color: var(--text-muted);
          border: 1px solid rgba(237, 232, 223, 0.08);
          border-radius: var(--radius-pill);
          padding: 0.22rem 0.6rem;
        }

        /* ── Education ────────────────────────────────────────────── */
        .timeline-education {
          margin-top: clamp(2.75rem, 5vw, 4rem);
          padding-top: clamp(1.75rem, 3vw, 2.5rem);
          border-top: 1px solid var(--hairline);
        }
        .edu-list {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: clamp(1rem, 2.5vw, 2rem);
          margin-top: 1.15rem;
        }
        .edu-item {
          padding: 1.1rem 1.25rem;
          border: 1px solid var(--hairline);
          border-radius: var(--radius-md);
          background: rgba(237, 232, 223, 0.02);
        }
        .edu-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.75rem;
        }
        .edu-institution {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-primary);
        }
        .edu-period {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ember);
          white-space: nowrap;
        }
        .edu-programme {
          margin-top: 0.35rem;
          font-size: 0.86rem;
          color: var(--text-secondary);
        }
        .edu-detail {
          margin-top: 0.3rem;
          font-size: 0.78rem;
          line-height: 1.5;
          color: var(--text-faint);
        }

        @media (max-width: 780px) {
          .timeline-item {
            grid-template-columns: 12px minmax(0, 1fr);
            gap: 1rem;
          }
          .timeline-year {
            grid-column: 2;
            flex-direction: row;
            align-items: baseline;
            gap: 0.6rem;
            margin-bottom: 0.35rem;
          }
          .timeline-body { grid-column: 2; }
        }
      `}</style>
    </section>
  );
};
