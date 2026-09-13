import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCE_TIMELINE } from '../../data/experience';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { fadeUp } from '../../lib/animations';

export const Timeline: React.FC = () => {
  return (
    <section id="experience" style={{ padding: '6rem 0', position: 'relative', zIndex: 2 }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <SectionHeading
          moduleCode="/modules/timeline"
          title="Milestones & Engineering Progression"
          subtitle="Chronological roadmap tracing low-level cryptographic analysis to computer vision stream processing and autonomous AI agent architectures."
        />

        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          {/* Vertical Glowing Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '7px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--accent), var(--color-cyan), transparent)',
              boxShadow: '0 0 10px var(--accent-glow)'
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {EXPERIENCE_TIMELINE.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                style={{ position: 'relative' }}
              >
                {/* Timeline Node Point */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-2rem',
                    top: '4px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: item.status === 'CURRENT' ? 'var(--accent)' : 'var(--bg-deep)',
                    border: `2px solid ${item.status === 'CURRENT' ? 'white' : 'var(--accent)'}`,
                    boxShadow: item.status === 'CURRENT' ? '0 0 12px var(--accent)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                />

                <GlassCard style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: 'var(--accent)'
                        }}
                      >
                        {item.year}
                      </span>
                      <span style={{ color: 'var(--text-muted)' }}>•</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: 'var(--text-muted)',
                          letterSpacing: '0.06em'
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '3px',
                        background: item.status === 'CURRENT' ? 'var(--accent-dim)' : 'rgba(255, 255, 255, 0.03)',
                        border: `1px solid ${item.status === 'CURRENT' ? 'var(--border-accent)' : 'var(--border-subtle)'}`,
                        color: item.status === 'CURRENT' ? 'var(--accent)' : 'var(--text-muted)'
                      }}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {item.technologies.map(tech => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '3px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
