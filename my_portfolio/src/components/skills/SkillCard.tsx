import React from 'react';
import { type Skill } from '../../data/skills';

interface SkillCardProps {
  skill: Skill;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const getProficiencyColor = (level: string) => {
    switch (level) {
      case 'CORE':
        return 'var(--accent)';
      case 'ADVANCED':
        return 'var(--color-cyan)';
      case 'EXPLORING':
      default:
        return 'var(--text-muted)';
    }
  };

  return (
    <div
      style={{
        padding: '1.2rem',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '0.75rem',
        transition: 'border-color var(--transition-smooth)'
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {skill.name}
          </h4>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              fontWeight: 600,
              padding: '0.15rem 0.45rem',
              borderRadius: '2px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              color: getProficiencyColor(skill.proficiency)
            }}
          >
            {skill.proficiency}
          </span>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.5 }}>
          {skill.description}
        </p>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
          <span>WORKFLOW FREQUENCY</span>
          <span style={{ color: 'var(--text-secondary)' }}>{skill.usageScore}%</span>
        </div>

        {/* Telemetry Bar */}
        <div
          style={{
            height: '4px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${skill.usageScore}%`,
              background: getProficiencyColor(skill.proficiency),
              boxShadow: `0 0 8px ${getProficiencyColor(skill.proficiency)}`
            }}
          />
        </div>
      </div>
    </div>
  );
};
