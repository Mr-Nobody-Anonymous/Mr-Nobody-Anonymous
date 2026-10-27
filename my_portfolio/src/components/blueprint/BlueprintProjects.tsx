import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { projects, type Project } from '../../data/portfolio';

interface BlueprintProjectsProps {
  onOpenCaseFile: (project: Project) => void;
}

const useIsCompact = () => {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 1023px)');
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return compact;
};

export const BlueprintProjects: React.FC<BlueprintProjectsProps> = ({ onOpenCaseFile }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isCompact = useIsCompact();
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const total = projects.length;
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(total - 1) * 100}%`]);

  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      const idx = Math.min(Math.floor(v * total), total - 1);
      setActiveIdx(idx);
    });
  }, [scrollYProgress, total]);

  const GalleryCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
    <article className="work-card">
      <button
        type="button"
        className="work-card-media"
        onClick={() => onOpenCaseFile(project)}
        aria-label={`Open the case file for ${project.name}`}
        data-cursor="Case file"
      >
        <img src={project.image} alt={project.imageAlt} loading={index === 0 ? 'eager' : 'lazy'} />
        <span className="work-card-cta">
          Open case file <ArrowUpRight size={14} />
        </span>
      </button>

      <div className="work-card-body">
        <div className="work-card-eyebrow">
          <span className="work-card-number">{project.number}</span>
          <span>{project.categoryLabel}</span>
        </div>

        <h3 className="work-card-title">{project.name}</h3>
        <p className="work-card-desc">{project.description}</p>

        <ul className="work-card-tech">
          {project.technologies.slice(0, 4).map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <div className="work-card-actions">
          <button type="button" className="work-link" onClick={() => onOpenCaseFile(project)}>
            Case file <ArrowRight size={14} />
          </button>
          <a
            className="work-link work-link--muted"
            href={project.repository}
            target="_blank"
            rel="noreferrer"
          >
            Source <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </article>
  );

  return (
    <div
      id="work"
      className="work"
      ref={containerRef}
      style={{ height: isCompact ? 'auto' : `${total * 100}vh` }}
    >
      <div className={`work-sticky ${isCompact ? 'is-static' : ''}`}>
        <div className="shell work-head">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="section-title work-title">
              Three systems, <em>built</em> end to end.
            </h2>
          </div>

          <div className="work-counter" aria-hidden="true">
            <span className="work-counter-current">{String(activeIdx + 1).padStart(2, '0')}</span>
            <span className="work-counter-sep">/</span>
            <span>{String(total).padStart(2, '0')}</span>
          </div>
        </div>

        {isCompact ? (
          <div className="shell work-stack">
            {projects.map((project, idx) => (
              <GalleryCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        ) : (
          <>
            <motion.div className="work-track" style={{ x }}>
              {projects.map((project, idx) => (
                <div className="work-slide" key={project.id}>
                  <div className="shell">
                    <GalleryCard project={project} index={idx} />
                  </div>
                </div>
              ))}
            </motion.div>

            <div className="shell work-dots" role="tablist" aria-label="Projects">
              {projects.map((project, idx) => (
                <button
                  key={project.id}
                  type="button"
                  role="tab"
                  aria-selected={activeIdx === idx}
                  aria-label={project.name}
                  className={`work-dot ${activeIdx === idx ? 'is-active' : ''}`}
                  onClick={() => onOpenCaseFile(projects[idx])}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        .work {
          position: relative;
          background: var(--ink-900);
          border-top: 1px solid var(--hairline);
        }
        .work-sticky {
          position: sticky;
          top: 0;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(5rem, 9vh, 7rem) 0 clamp(3rem, 6vh, 4.5rem);
          overflow: hidden;
        }
        .work-sticky.is-static {
          position: static;
          min-height: auto;
          overflow: visible;
        }

        .work-head {
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: clamp(1.75rem, 3.5vw, 2.5rem);
        }
        .work-title { margin-top: 0.9rem; }

        .work-counter {
          display: flex;
          align-items: baseline;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-faint);
          letter-spacing: 0.06em;
        }
        .work-counter-current { color: var(--ember); font-size: 1rem; }
        .work-counter-sep { color: var(--text-faint); }

        .work-track { display: flex; will-change: transform; }
        .work-slide { min-width: 100%; }

        .work-card {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
          gap: clamp(1.5rem, 3vw, 2.75rem);
          align-items: stretch;
          padding: clamp(1rem, 2vw, 1.35rem);
          border-radius: var(--radius-xl);
          border: 1px solid var(--hairline);
          background:
            linear-gradient(180deg, rgba(237, 232, 223, 0.035) 0%, transparent 55%),
            var(--ink-800);
          box-shadow: var(--shadow-lg);
        }

        .work-card-media {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--ink-850);
          border: 1px solid rgba(237, 232, 223, 0.06);
        }
        .work-card-media img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 900ms var(--ease-out-expo), filter 900ms var(--ease-out-expo);
          filter: saturate(0.9);
        }
        .work-card-media:hover img { transform: scale(1.04); filter: saturate(1.02); }
        .work-card-cta {
          position: absolute;
          left: 1rem; bottom: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.9rem;
          border-radius: var(--radius-pill);
          background: rgba(8, 9, 11, 0.72);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(237, 232, 223, 0.12);
          font-family: var(--font-mono);
          font-size: 0.66rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-primary);
          opacity: 0;
          transform: translateY(6px);
          transition: opacity var(--transition-smooth), transform var(--transition-smooth);
        }
        .work-card-media:hover .work-card-cta { opacity: 1; transform: translateY(0); }

        .work-card-body { display: flex; flex-direction: column; padding: 0.75rem 0.5rem 0.75rem 0; }
        .work-card-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-mono);
          font-size: 0.64rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-faint);
          margin-bottom: 0.9rem;
        }
        .work-card-number { color: var(--ember); }

        .work-card-title {
          font-size: clamp(1.6rem, 2.8vw, 2.35rem);
          font-weight: 500;
          letter-spacing: -0.035em;
          margin-bottom: 0.75rem;
        }
        .work-card-desc {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
          max-width: 46ch;
        }

        .work-card-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          list-style: none;
          margin-bottom: 1.5rem;
        }
        .work-card-tech li {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          border: 1px solid rgba(237, 232, 223, 0.08);
          border-radius: var(--radius-pill);
          padding: 0.24rem 0.6rem;
        }

        .work-card-actions {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--hairline);
        }
        .work-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--ember);
          text-decoration: none;
          transition: gap var(--transition-fast), color var(--transition-fast);
        }
        .work-link:hover { gap: 0.55rem; }
        .work-link--muted { color: var(--text-muted); }
        .work-link--muted:hover { color: var(--text-primary); }

        .work-dots {
          display: flex;
          gap: 0.4rem;
          margin-top: clamp(1.5rem, 3vw, 2rem);
        }
        .work-dot {
          width: 26px;
          height: 2px;
          border-radius: 99px;
          background: rgba(237, 232, 223, 0.16);
          transition: background var(--transition-smooth), width var(--transition-smooth);
        }
        .work-dot.is-active { background: var(--ember); width: 44px; }

        @media (max-width: 1023px) {
          .work-stack { display: flex; flex-direction: column; gap: 1.25rem; }
          .work-card { grid-template-columns: 1fr; gap: 1.25rem; }
          .work-card-body { padding: 0.25rem 0.35rem 0.5rem; }
        }
        @media (max-width: 560px) {
          .work-head { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .work-card-media { aspect-ratio: 4 / 3; }
        }
      `}</style>
    </div>
  );
};
