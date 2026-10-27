import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Terminal, Cpu, Network, Lock, Code, Grid2X2, Share2 } from 'lucide-react';

interface SkillItem {
  id: string;
  name: string;
  category: string;
  percentage: number;
  icon: React.ElementType;
  description: string;
  span: 'half' | 'quarter';
  snippet?: string;
  connectedTo?: string[];
  x: number;
  y: number;
}

const SKILLS_DATA: SkillItem[] = [
  {
    id: 'cybersecurity',
    name: 'Security engineering',
    category: 'Offensive / Defensive',
    percentage: 92,
    icon: Shield,
    description: 'Vulnerability mapping, attack-path analysis, STRIDE threat modeling and protocol-level verification.',
    span: 'half',
    snippet: `const boundary = verifyIsolation({\n  uid: 0,\n  capabilities: ['CAP_NET_RAW'],\n  enforceStrictSandbox: true\n});`,
    connectedTo: ['python', 'linux', 'networking'],
    x: 44,
    y: 24
  },
  {
    id: 'web',
    name: 'Modern web & interfaces',
    category: 'Frontend architecture',
    percentage: 86,
    icon: Code,
    description: 'React 19, TypeScript, motion orchestration and design systems that stay fast under pressure.',
    span: 'half',
    snippet: `const { scrollYProgress } = useScroll();\nconst smoothX = useSpring(scrollYProgress, {\n  stiffness: 180, damping: 28\n});`,
    connectedTo: ['python', 'cybersecurity'],
    x: 80,
    y: 22
  },
  {
    id: 'python',
    name: 'Python systems',
    category: 'Backend & automation',
    percentage: 89,
    icon: Terminal,
    description: 'AsyncIO daemons, socket transports, OpenCV pipelines and automated reconnaissance tooling.',
    span: 'quarter',
    connectedTo: ['cybersecurity', 'ai', 'linux'],
    x: 22,
    y: 46
  },
  {
    id: 'ai',
    name: 'Autonomous AI',
    category: 'Agentic architectures',
    percentage: 84,
    icon: Cpu,
    description: 'State machines, vision inference and deterministic tool-execution loops with bounded autonomy.',
    span: 'quarter',
    connectedTo: ['python', 'cybersecurity'],
    x: 68,
    y: 46
  },
  {
    id: 'linux',
    name: 'Linux & shell',
    category: 'Systems',
    percentage: 90,
    icon: Lock,
    description: 'systemd units, kernel namespaces, bash automation and low-level process isolation.',
    span: 'quarter',
    connectedTo: ['cybersecurity', 'networking', 'python'],
    x: 34,
    y: 72
  },
  {
    id: 'networking',
    name: 'Networking & TCP/IP',
    category: 'Infrastructure',
    percentage: 87,
    icon: Network,
    description: 'Packet dissection, tunnel routing and protocol anomaly analysis on real traffic.',
    span: 'quarter',
    connectedTo: ['cybersecurity', 'linux'],
    x: 60,
    y: 76
  }
];

const ease = [0.16, 1, 0.3, 1] as const;

export const BlueprintSkills: React.FC = () => {
  const [viewMode, setViewMode] = useState<'bento' | 'map'>('bento');
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeSkill = SKILLS_DATA.find((s) => s.id === activeId) ?? null;

  return (
    <section id="skills" className="section skills">
      <div className="skills-halo" aria-hidden="true" />

      <div className="shell skills-inner">
        <motion.header
          className="skills-head"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
        >
          <div>
            <p className="eyebrow">Capabilities</p>
            <h2 className="section-title skills-title">
              What I <em>work</em> with.
            </h2>
            <p className="lede">
              A working toolkit rather than a checklist — the systems, languages and
              safeguards I reach for when a problem needs to be understood end to end.
            </p>
          </div>

          <div className="skills-toggle" role="tablist" aria-label="Skills view">
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'bento'}
              className={viewMode === 'bento' ? 'is-active' : ''}
              onClick={() => setViewMode('bento')}
            >
              <Grid2X2 size={14} strokeWidth={1.7} />
              Bento
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'map'}
              className={viewMode === 'map' ? 'is-active' : ''}
              onClick={() => setViewMode('map')}
            >
              <Share2 size={14} strokeWidth={1.7} />
              Map
            </button>
          </div>
        </motion.header>

        <AnimatePresence mode="wait">
          {viewMode === 'bento' ? (
            <motion.div
              key="bento"
              className="skill-grid"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
            >
              {SKILLS_DATA.map((skill, idx) => {
                const Icon = skill.icon;
                return (
                  <motion.article
                    key={skill.id}
                    className={`skill-card skill-card--${skill.span}`}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: idx * 0.05, ease }}
                  >
                    <div className="skill-card-top">
                      <span className="skill-icon" aria-hidden="true">
                        <Icon size={18} strokeWidth={1.6} />
                      </span>
                      <span className="skill-category">{skill.category}</span>
                    </div>

                    <h3 className="skill-name">{skill.name}</h3>
                    <p className="skill-desc">{skill.description}</p>

                    {skill.snippet && (
                      <pre className="skill-snippet">{skill.snippet}</pre>
                    )}

                    <div className="skill-meter">
                      <div className="skill-meter-head">
                        <span>Proficiency</span>
                        <span className="skill-meter-value">{skill.percentage}%</span>
                      </div>
                      <div className="skill-meter-track">
                        <motion.div
                          className="skill-meter-fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: 0.15, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="map"
              className="skill-map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="skill-map-canvas">
                <svg className="skill-map-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  {SKILLS_DATA.flatMap((skill) =>
                    (skill.connectedTo ?? []).map((targetId) => {
                      const target = SKILLS_DATA.find((s) => s.id === targetId);
                      if (!target || skill.id > target.id) return null;
                      const highlighted =
                        activeId === skill.id || activeId === target.id;
                      return (
                        <line
                          key={`${skill.id}-${targetId}`}
                          x1={skill.x}
                          y1={skill.y}
                          x2={target.x}
                          y2={target.y}
                          className={highlighted ? 'is-active' : ''}
                          vectorEffect="non-scaling-stroke"
                        />
                      );
                    })
                  )}
                </svg>

                {SKILLS_DATA.map((skill) => {
                  const isActive = activeId === skill.id;
                  const isDimmed =
                    activeId !== null &&
                    activeId !== skill.id &&
                    !(skill.connectedTo ?? []).includes(activeId) &&
                    !(SKILLS_DATA.find((s) => s.id === activeId)?.connectedTo ?? []).includes(skill.id);

                  return (
                    <button
                      key={skill.id}
                      type="button"
                      className={`skill-node ${isActive ? 'is-active' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
                      style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
                      onMouseEnter={() => setActiveId(skill.id)}
                      onFocus={() => setActiveId(skill.id)}
                      onMouseLeave={() => setActiveId(null)}
                      onBlur={() => setActiveId(null)}
                      aria-label={`${skill.name} — ${skill.description}`}
                    >
                      <span className="skill-node-dot" aria-hidden="true" />
                      {skill.name}
                    </button>
                  );
                })}

                <div className="skill-map-caption" aria-hidden="true">
                  <span>Hover a node to trace its relationships</span>
                </div>
              </div>

              <aside className="skill-map-detail" aria-live="polite">
                <p className="eyebrow is-muted">Node detail</p>
                {activeSkill ? (
                  <>
                    <h3>{activeSkill.name}</h3>
                    <p className="skill-map-category">{activeSkill.category}</p>
                    <p className="skill-map-desc">{activeSkill.description}</p>
                    <div className="skill-map-meter">
                      <span>{activeSkill.percentage}%</span>
                      <div className="skill-meter-track">
                        <div
                          className="skill-meter-fill"
                          style={{ width: `${activeSkill.percentage}%` }}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="skill-map-empty">
                    Select any node in the graph to inspect its role, related
                    disciplines and working depth.
                  </p>
                )}
              </aside>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .skills {
          position: relative;
          background: var(--ink-950);
          border-top: 1px solid var(--hairline);
        }
        .skills-halo {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(ellipse 60% 45% at 15% 0%, rgba(159, 216, 228, 0.05) 0%, transparent 65%);
        }
        .skills-inner { position: relative; z-index: 2; }

        .skills-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
          margin-bottom: clamp(2.5rem, 5vw, 3.75rem);
        }
        .skills-title { margin: 0.9rem 0 1rem; }
        .skills-head .lede { max-width: 54ch; }

        .skills-toggle {
          display: inline-flex;
          padding: 4px;
          gap: 2px;
          border-radius: var(--radius-pill);
          border: 1px solid var(--hairline);
          background: rgba(237, 232, 223, 0.03);
        }
        .skills-toggle button {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.48rem 1rem;
          border-radius: var(--radius-pill);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .skills-toggle button:hover { color: var(--text-primary); }
        .skills-toggle button.is-active {
          background: rgba(233, 162, 104, 0.12);
          color: var(--ember);
        }

        /* ── Bento grid ───────────────────────────────────────────── */
        .skill-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1rem;
        }
        .skill-card {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: clamp(1.35rem, 2.4vw, 1.85rem);
          border-radius: var(--radius-lg);
          border: 1px solid var(--hairline);
          background:
            linear-gradient(180deg, rgba(237, 232, 223, 0.03) 0%, transparent 55%),
            var(--ink-800);
          overflow: hidden;
          transition:
            border-color var(--transition-smooth),
            transform var(--transition-smooth),
            box-shadow var(--transition-smooth);
        }
        .skill-card::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          background: radial-gradient(circle at 20% 0%, rgba(233, 162, 104, 0.10), transparent 55%);
          transition: opacity var(--transition-smooth);
        }
        .skill-card:hover {
          border-color: rgba(233, 162, 104, 0.3);
          transform: translateY(-3px);
          box-shadow: var(--shadow-lift);
        }
        .skill-card:hover::after { opacity: 1; }

        .skill-card--half { grid-column: span 2; }
        .skill-card--quarter { grid-column: span 1; }

        .skill-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 1.35rem;
        }
        .skill-icon {
          display: grid;
          place-items: center;
          width: 34px; height: 34px;
          border-radius: 10px;
          border: 1px solid rgba(233, 162, 104, 0.22);
          background: rgba(233, 162, 104, 0.06);
          color: var(--ember);
        }
        .skill-category {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-faint);
          text-align: right;
        }

        .skill-name {
          font-size: 1.12rem;
          font-weight: 500;
          letter-spacing: -0.022em;
          color: var(--text-primary);
          margin-bottom: 0.55rem;
        }
        .skill-desc {
          font-size: 0.88rem;
          line-height: 1.65;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
          max-width: 46ch;
        }

        .skill-snippet {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          line-height: 1.65;
          color: var(--text-secondary);
          background: var(--ink-850);
          border: 1px solid rgba(237, 232, 223, 0.06);
          border-radius: var(--radius-sm);
          padding: 0.85rem 0.95rem;
          margin-bottom: 1.4rem;
          overflow-x: auto;
          white-space: pre;
          tab-size: 2;
        }

        .skill-meter { margin-top: auto; }
        .skill-meter-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-faint);
        }
        .skill-meter-value { color: var(--ember); letter-spacing: 0.06em; }
        .skill-meter-track {
          position: relative;
          height: 3px;
          border-radius: 99px;
          background: rgba(237, 232, 223, 0.08);
          overflow: hidden;
        }
        .skill-meter-fill {
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(90deg, rgba(233, 162, 104, 0.55) 0%, var(--ember) 100%);
        }

        /* ── Map view ─────────────────────────────────────────────── */
        .skill-map {
          display: grid;
          grid-template-columns: minmax(0, 1.9fr) minmax(0, 1fr);
          gap: 1rem;
        }
        .skill-map-canvas {
          position: relative;
          min-height: clamp(380px, 46vw, 480px);
          border-radius: var(--radius-xl);
          border: 1px solid var(--hairline);
          background:
            radial-gradient(circle at 50% 40%, rgba(233, 162, 104, 0.05), transparent 60%),
            var(--ink-900);
          overflow: hidden;
        }
        .skill-map-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .skill-map-lines line {
          stroke: rgba(237, 232, 223, 0.13);
          stroke-width: 1;
          stroke-dasharray: 4 4;
          transition: stroke var(--transition-smooth);
        }
        .skill-map-lines line.is-active {
          stroke: var(--ember);
          stroke-dasharray: none;
        }

        .skill-node {
          position: absolute;
          transform: translate(-50%, -50%);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1rem;
          border-radius: var(--radius-pill);
          border: 1px solid var(--hairline);
          background: var(--ink-800);
          font-family: var(--font-heading);
          font-size: 0.82rem;
          color: var(--text-secondary);
          white-space: nowrap;
          transition:
            color var(--transition-fast),
            border-color var(--transition-fast),
            background var(--transition-fast),
            opacity var(--transition-fast),
            box-shadow var(--transition-fast);
        }
        .skill-node-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--text-faint);
          transition: background var(--transition-fast), box-shadow var(--transition-fast);
        }
        .skill-node:hover,
        .skill-node:focus-visible,
        .skill-node.is-active {
          color: var(--text-primary);
          border-color: rgba(233, 162, 104, 0.45);
          background: rgba(233, 162, 104, 0.09);
          outline: none;
        }
        .skill-node.is-active .skill-node-dot,
        .skill-node:hover .skill-node-dot {
          background: var(--ember);
          box-shadow: 0 0 10px rgba(233, 162, 104, 0.9);
        }
        .skill-node.is-dimmed { opacity: 0.32; }

        .skill-map-caption {
          position: absolute;
          left: 1.25rem;
          bottom: 1rem;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-faint);
        }

        .skill-map-detail {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          padding: clamp(1.35rem, 2.4vw, 1.85rem);
          border-radius: var(--radius-xl);
          border: 1px solid var(--hairline);
          background:
            linear-gradient(180deg, rgba(237, 232, 223, 0.035) 0%, transparent 55%),
            var(--ink-800);
        }
        .skill-map-detail h3 {
          font-size: 1.25rem;
          font-weight: 500;
          letter-spacing: -0.025em;
          margin-top: 0.35rem;
        }
        .skill-map-category {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ember);
        }
        .skill-map-desc {
          font-size: 0.88rem;
          line-height: 1.7;
          color: var(--text-muted);
        }
        .skill-map-empty {
          font-size: 0.88rem;
          line-height: 1.7;
          color: var(--text-muted);
          margin-top: 0.5rem;
        }
        .skill-map-meter {
          margin-top: auto;
          padding-top: 1.25rem;
          border-top: 1px solid var(--hairline);
        }
        .skill-map-meter > span {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--ember);
          margin-bottom: 0.5rem;
        }

        @media (max-width: 1080px) {
          .skill-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .skill-card--half, .skill-card--quarter { grid-column: span 2; }
          .skill-card--quarter { grid-column: span 1; }
        }
        @media (max-width: 860px) {
          .skill-map { grid-template-columns: 1fr; }
          .skill-map-canvas { min-height: 420px; }
          .skill-node { font-size: 0.72rem; padding: 0.45rem 0.75rem; }
        }
        @media (max-width: 620px) {
          .skill-grid { grid-template-columns: 1fr; }
          .skill-card--half, .skill-card--quarter { grid-column: span 1; }
          .skills-toggle { width: 100%; justify-content: space-between; }
        }
      `}</style>
    </section>
  );
};
