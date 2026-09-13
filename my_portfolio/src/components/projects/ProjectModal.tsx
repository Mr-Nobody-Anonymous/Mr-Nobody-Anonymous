import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, GitFork, Star, Terminal, Layers } from 'lucide-react';
import { type Project } from '../../data/projects';
import { GlowButton } from '../ui/GlowButton';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(3, 6, 13, 0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
        />

        {/* Modal Case File Container */}
        <motion.div
          layoutId={`project-card-${project.id}`}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '720px',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: 'rgba(10, 16, 32, 0.98)',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px var(--accent-glow)',
            padding: '2rem',
            zIndex: 1001
          }}
        >
          {/* Header Bar */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.08em' }}>
                  CASE FILE // {project.codename}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    padding: '0.15rem 0.45rem',
                    background: 'var(--accent-dim)',
                    border: '1px solid var(--border-accent)',
                    borderRadius: '3px',
                    color: 'var(--accent)'
                  }}
                >
                  {project.status}
                </span>
              </div>

              <motion.h2
                layoutId={`project-title-${project.id}`}
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em'
                }}
              >
                {project.name}
              </motion.h2>
            </div>

            <button
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Close Case File"
            >
              <X size={18} />
            </button>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              Operational Overview
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
              {project.longDescription}
            </p>
          </div>

          {/* Architecture Highlights */}
          {project.architectureNotes && (
            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
                <Layers size={14} />
                Architecture & Engineering
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {project.architectureNotes.map((note, idx) => (
                  <div
                    key={idx}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      color: 'var(--text-primary)',
                      padding: '0.4rem 0.75rem',
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderLeft: '2px solid var(--accent)',
                      borderRadius: '0 4px 4px 0'
                    }}
                  >
                    {note}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Simulated Logs */}
          {project.telemetryLogs && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  <Terminal size={14} />
                  Operational Telemetry
                </h4>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-warning)' }}>
                  [SIMULATED RUNTIME LOGS]
                </span>
              </div>
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--color-cyan)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem'
                }}
              >
                {project.telemetryLogs.map((log, idx) => (
                  <div key={idx}>{log}</div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '2rem' }}>
            {project.tags.map(tag => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Modal Footer / Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '1.25rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <span>Lang: <strong style={{ color: 'var(--text-primary)' }}>{project.language}</strong></span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><Star size={14} /> {project.stars}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><GitFork size={14} /> {project.forks}</span>
            </div>

            <GlowButton
              variant="primary"
              size="md"
              asAnchor
              href={project.githubUrl}
              target="_blank"
              icon={<ExternalLink size={16} />}
            >
              VIEW REPOSITORY
            </GlowButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
