import React from 'react';
import { motion } from 'motion/react';
import { fadeUp } from '../../lib/animations';

interface SectionHeadingProps {
  moduleCode: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  moduleCode,
  title,
  subtitle,
  align = 'center'
}) => {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        textAlign: align,
        marginBottom: '3rem',
        position: 'relative'
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          letterSpacing: '0.12em',
          color: 'var(--accent)',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
          background: 'var(--accent-dim)',
          padding: '0.2rem 0.75rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-accent)'
        }}
      >
        <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
        {moduleCode}
      </div>

      <h2
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          marginTop: '0.25rem'
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            maxWidth: '650px',
            margin: align === 'center' ? '0.75rem auto 0' : '0.75rem 0 0',
            lineHeight: 1.6
          }}
        >
          {subtitle}
        </p>
      )}

      <div
        style={{
          width: '60px',
          height: '2px',
          background: 'var(--accent)',
          boxShadow: '0 0 8px var(--accent-glow)',
          margin: align === 'center' ? '1.25rem auto 0' : '1.25rem 0 0',
          borderRadius: '2px'
        }}
      />
    </motion.div>
  );
};
