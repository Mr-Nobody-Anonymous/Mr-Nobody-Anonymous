import React, { useState } from 'react';
import { motion } from 'motion/react';

interface AiBranch {
  id: string;
  name: string;
  description: string;
  tech: string;
  repo: string;
  color: string;
}

const BRANCHES: AiBranch[] = [
  {
    id: 'data',
    name: 'DATA & TELEMETRY',
    description: 'High-frequency video ingestion, OpenCV frame buffers, and real-time sensor anomaly telemetry pipelines.',
    tech: 'Argus SentinelSight, NumPy, OpenCV',
    repo: 'https://github.com/Mr-Nobody-Anonymous/Argus',
    color: '#00F5FF'
  },
  {
    id: 'models',
    name: 'MODELS & VISION',
    description: 'Deep neural networks, YOLO object detection inference, and low-latency computer vision backends.',
    tech: 'YOLO, PyTorch, TensorRT',
    repo: 'https://github.com/Mr-Nobody-Anonymous/Argus',
    color: '#2563FF'
  },
  {
    id: 'agents',
    name: 'AUTONOMOUS AGENTS',
    description: 'Lightweight agent runtimes implementing deterministic loop execution, state machines, and dynamic tool calling.',
    tech: 'ultrone Autonomous Runtime',
    repo: 'https://github.com/Mr-Nobody-Anonymous/ultrone',
    color: '#8B5CF6'
  },
  {
    id: 'automation',
    name: 'AUTOMATION DAEMONS',
    description: 'Automated policy enforcement, headless scrapers, event-driven webhooks, and continuous auditing.',
    tech: 'Python AsyncIO, Shell Daemons',
    repo: 'https://github.com/Mr-Nobody-Anonymous/All-skills',
    color: '#A3FF12'
  },
  {
    id: 'decision',
    name: 'DECISION & REASONING',
    description: 'Risk evaluation surfaces, anomaly scoring thresholds, and structured institutional intelligence engines.',
    tech: 'Orion Threat Engine, Rule Evaluators',
    repo: 'https://github.com/Mr-Nobody-Anonymous/Orion',
    color: '#00F5FF'
  }
];

export const AiNeuralGraph: React.FC = () => {
  const [activeBranch, setActiveBranch] = useState<AiBranch>(BRANCHES[2]); // default to agents

  return (
    <section
      id="intelligence"
      style={{
        position: 'relative',
        minHeight: '120vh',
        background: '#05070A',
        padding: '8rem 2rem 6rem 2rem',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Violet Ambient Glow for AI */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '10%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '2rem'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              color: '#8B5CF6',
              letterSpacing: '0.2em',
              fontWeight: 600
            }}
          >
            04 / ARTIFICIAL INTELLIGENCE
          </span>
          <div style={{ height: '1px', flex: 1, background: 'rgba(139, 92, 246, 0.25)' }} />
        </motion.div>

        {/* Huge Heading */}
        <div style={{ marginBottom: '4.5rem' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2.5rem, 7vw, 5.2rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: '#F5F7FA',
              margin: '0 0 1rem 0'
            }}
          >
            INTELLIGENCE <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #00F5FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              IS A SYSTEM.
            </span>
          </motion.h2>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem',
              letterSpacing: '0.12em',
              color: '#7D8795',
              margin: 0
            }}
          >
            AI • AUTOMATION • AGENTS • EXPERIMENTATION
          </p>
        </div>

        {/* Real-time Constructed Neural Graph Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}
          >
            {BRANCHES.map((branch, idx) => {
              const isSelected = activeBranch.id === branch.id;
              return (
                <motion.div
                  key={branch.id}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  onClick={() => setActiveBranch(branch)}
                  data-cursor="SELECT"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.25rem 1.75rem',
                    background: isSelected ? 'rgba(139, 92, 246, 0.12)' : 'rgba(10, 15, 23, 0.7)',
                    border: `1px solid ${isSelected ? branch.color : 'rgba(255, 255, 255, 0.08)'}`,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    boxShadow: isSelected ? `0 0 25px ${branch.color}33` : 'none',
                    backdropFilter: 'blur(12px)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Branch connector line icon */}
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: branch.color,
                        fontSize: '0.8rem',
                        fontWeight: 700
                      }}
                    >
                      {idx === 0 ? '┌─' : idx === BRANCHES.length - 1 ? '└─' : '├─'}
                    </span>
                    <div>
                      <h4
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '1.15rem',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          margin: '0 0 0.2rem 0'
                        }}
                      >
                        {branch.name}
                      </h4>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: branch.color
                        }}
                      >
                        {branch.tech}
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: isSelected ? branch.color : '#7D8795'
                    }}
                  >
                    {isSelected ? '[ONLINE]' : '[READY]'}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Active Branch Focus Dossier */}
          <motion.div
            key={activeBranch.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              padding: '2.5rem',
              background: 'rgba(10, 15, 23, 0.9)',
              border: `1px solid ${activeBranch.color}60`,
              borderRadius: '14px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '0.75rem',
                marginBottom: '1.25rem'
              }}
            >
              <span style={{ fontSize: '0.75rem', color: activeBranch.color, fontWeight: 700 }}>
                AI SUBSYSTEM SPECIFICATION
              </span>
              <span style={{ fontSize: '0.7rem', color: '#A3FF12' }}>ACTIVE RUNTIME</span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.8rem',
                fontWeight: 800,
                color: '#FFFFFF',
                margin: '0 0 0.75rem 0'
              }}
            >
              {activeBranch.name}
            </h3>

            <p style={{ fontSize: '0.88rem', lineHeight: '1.7', color: '#A0AEC0', marginBottom: '1.75rem' }}>
              {activeBranch.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ color: '#7D8795', fontSize: '0.68rem', display: 'block' }}>IMPLEMENTATION ENGINE</span>
                <span style={{ color: '#00F5FF', fontSize: '0.8rem', fontWeight: 600 }}>{activeBranch.tech}</span>
              </div>

              <a
                href={activeBranch.repo}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="GITHUB"
                style={{
                  padding: '0.6rem 1.4rem',
                  background: 'rgba(139, 92, 246, 0.15)',
                  border: '1px solid #8B5CF6',
                  borderRadius: '6px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 0 15px rgba(139, 92, 246, 0.25)'
                }}
              >
                <span>OPEN REPOSITORY</span>
                <span>↗</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
