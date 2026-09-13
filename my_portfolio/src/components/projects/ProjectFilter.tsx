import React from 'react';
import { motion } from 'motion/react';
import { type ProjectCategory } from '../../data/projects';

interface ProjectFilterProps {
  currentCategory: ProjectCategory;
  onSelectCategory: (cat: ProjectCategory) => void;
}

const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'ALL OPERATIONS' },
  { id: 'security', label: 'OFFENSIVE / DEFENSIVE' },
  { id: 'ai', label: 'AI & VISION' },
  { id: 'tools', label: 'SYSTEM TOOLS' }
];

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  currentCategory,
  onSelectCategory
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginBottom: '2.5rem'
      }}
    >
      {CATEGORIES.map(cat => {
        const isActive = currentCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            style={{
              position: 'relative',
              padding: '0.45rem 1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
              borderRadius: '20px',
              border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border-subtle)'}`,
              background: isActive ? 'var(--accent-dim)' : 'rgba(255, 255, 255, 0.02)',
              transition: 'color var(--transition-fast)'
            }}
          >
            {cat.label}
            {isActive && (
              <motion.div
                layoutId="activeFilterPill"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '20px',
                  border: '1px solid var(--accent)',
                  boxShadow: '0 0 12px var(--accent-glow)',
                  pointerEvents: 'none'
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
