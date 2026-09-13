import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE_TIMELINE } from '../../data/experience';

export const BlueprintTimeline: React.FC = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#111111',
        padding: '120px 2rem',
        overflow: 'hidden'
      }}
    >
      {/* Circuit board pattern background */}
      <div className="circuit-board-layer" aria-hidden="true" />

      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 3
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#00f0ff', letterSpacing: '0.1em' }}>
            &lt; TIMELINE /&gt;
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-heading, "Orbitron", sans-serif)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              color: '#ffffff',
              marginTop: '0.5rem',
              letterSpacing: '2px'
            }}
          >
            JOURNEY &amp; MILESTONES
          </h2>
        </div>

        {/* Vertical Timeline Container */}
        <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto', minHeight: '600px' }}>
          {/* Center Glowing Cyan Line */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              background: 'linear-gradient(to bottom, #00f0ff, #b400ff, #00f0ff)',
              boxShadow: '0 0 12px rgba(0, 240, 255, 0.7)',
              zIndex: 1
            }}
          />

          {/* Alternating Events */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {EXPERIENCE_TIMELINE.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isExpanded = expandedIdx === idx;

              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isEven ? 'flex-start' : 'flex-end',
                    position: 'relative',
                    width: '100%'
                  }}
                >
                  {/* Center Node Dot (12px cyan fill with pulsing ring) */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: '#00f0ff',
                      boxShadow: '0 0 15px #00f0ff, 0 0 25px rgba(0,240,255,0.8)',
                      zIndex: 5
                    }}
                  >
                    <span className="pulsing-node-ring" />
                  </motion.div>

                  {/* Connecting Horizontal Line to Center */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: isEven ? '45%' : '50%',
                      width: '5%',
                      height: '1.5px',
                      background: 'rgba(0, 240, 255, 0.4)',
                      zIndex: 2
                    }}
                  />

                  {/* Event Card (45% width, backdrop-blur, 3px cyan border on timeline side) */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: isEven ? -100 : 100,
                      rotate: isEven ? -3 : 3
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      rotate: 0
                    }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ translateY: -5 }}
                    onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                    data-cursor="Expand"
                    className="timeline-glass-card"
                    style={{
                      width: '45%',
                      background: 'rgba(17, 17, 17, 0.85)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid #222222',
                      borderLeft: isEven ? '1px solid #222222' : '3px solid #00f0ff',
                      borderRight: isEven ? '3px solid #00f0ff' : '1px solid #222222',
                      borderRadius: '8px',
                      padding: '25px',
                      cursor: 'pointer',
                      position: 'relative',
                      zIndex: 3,
                      transition: 'border-color 0.25s, box-shadow 0.25s'
                    }}
                  >
                    {/* Date Badge: Orbitron, 16px, Cyan */}
                    <div
                      style={{
                        fontFamily: 'var(--font-heading, "Orbitron")',
                        fontSize: '15px',
                        color: '#00f0ff',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        marginBottom: '0.4rem'
                      }}
                    >
                      {item.year}
                    </div>

                    {/* Title: Rajdhani, 24px, Bold White */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-subheading, "Rajdhani")',
                        fontSize: '24px',
                        fontWeight: 700,
                        color: '#ffffff',
                        marginBottom: '0.25rem'
                      }}
                    >
                      {item.title}
                    </h3>

                    {/* Organization / Context Tag: Inter, 14px, Dim Gray */}
                    <div
                      style={{
                        fontFamily: 'var(--font-body, "Inter")',
                        fontSize: '14px',
                        color: '#888888',
                        marginBottom: '0.85rem'
                      }}
                    >
                      {item.tag}
                    </div>

                    {/* Description: Inter, 15px, Ghost White */}
                    <p
                      style={{
                        fontFamily: 'var(--font-body, "Inter")',
                        fontSize: '15px',
                        color: '#e0e0e0',
                        lineHeight: 1.6,
                        marginBottom: '1rem'
                      }}
                    >
                      {item.description}
                    </p>

                    {/* Tech Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {item.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: '#00f0ff',
                            background: 'rgba(0, 240, 255, 0.08)',
                            border: '1px solid rgba(0, 240, 255, 0.25)',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '9999px'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Expandable Extra Details */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                          marginTop: '1rem',
                          paddingTop: '1rem',
                          borderTop: '1px dashed #333333',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          color: '#aaaaaa'
                        }}
                      >
                        <div>&gt; STATUS: {item.status}</div>
                        <div>&gt; VERIFIED COMMIT: 0x7F4B92</div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .circuit-board-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.04;
          background-image: radial-gradient(#00f0ff 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .pulsing-node-ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px solid #00f0ff;
          animation: nodePulse 2s infinite;
        }
        @keyframes nodePulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .timeline-glass-card:hover {
          box-shadow: 0 0 25px rgba(0, 240, 255, 0.35) !important;
        }
        @media (max-width: 768px) {
          .timeline-glass-card {
            width: 85% !important;
            border-left: 3px solid #00f0ff !important;
            border-right: 1px solid #222222 !important;
          }
        }
      `}</style>
    </section>
  );
};
