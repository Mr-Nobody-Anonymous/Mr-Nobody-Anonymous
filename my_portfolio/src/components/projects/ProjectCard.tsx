import React from 'react';
import { motion } from 'motion/react';
import { GitFork, Star } from 'lucide-react';
import { type Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <motion.div
      layout
      layoutId={`project-card-${project.id}`}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={() => onSelect(project)}
      className="cyber-glass"
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        height: '100%'
      }}
    >
      <div>
        {/* Top Header Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--accent)',
                letterSpacing: '0.06em'
              }}
            >
              {project.codename}
            </span>
          </div>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              fontWeight: 600,
              padding: '0.15rem 0.5rem',
              borderRadius: '2px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)'
            }}
          >
            {project.status}
          </span>
        </div>

        {/* Project Name */}
        <motion.h3
          layoutId={`project-title-${project.id}`}
          style={{
            fontSize: '1.35rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
            letterSpacing: '-0.01em'
          }}
        >
          {project.name}
        </motion.h3>

        {/* Description */}
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            marginBottom: '1.25rem'
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.5rem' }}>
          {project.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                padding: '0.15rem 0.45rem',
                borderRadius: '3px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '0.85rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
            {project.language}
          </span>

          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Star size={13} />
            {project.stars}
          </span>

          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <GitFork size={13} />
            {project.forks}
          </span>
        </div>

        <span
          style={{
            color: 'var(--accent)',
            fontSize: '0.75rem',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
        >
          CASE FILE &gt;
        </span>
      </div>
    </motion.div>
  );
};
