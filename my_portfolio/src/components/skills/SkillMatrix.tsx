import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SKILLS, SKILL_CATEGORIES } from '../../data/skills';
import { SkillCard } from './SkillCard';
import { SectionHeading } from '../ui/SectionHeading';

export const SkillMatrix: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const filteredSkills = selectedCat === 'all'
    ? SKILLS
    : SKILLS.filter(s => s.category === selectedCat);

  return (
    <section id="skills" style={{ padding: '6rem 0', position: 'relative', zIndex: 2 }}>
      <div className="container">
        <SectionHeading
          moduleCode="/modules/arsenal"
          title="Technical Arsenal & Capabilities"
          subtitle="Offensive methodologies, defensive hardening standards, autonomous systems engineering, and low-level scripting competencies."
        />

        {/* Category selector */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            justifyContent: 'center',
            marginBottom: '2.5rem'
          }}
        >
          <button
            onClick={() => setSelectedCat('all')}
            style={{
              padding: '0.4rem 0.9rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 600,
              borderRadius: '20px',
              border: `1px solid ${selectedCat === 'all' ? 'var(--accent)' : 'var(--border-subtle)'}`,
              background: selectedCat === 'all' ? 'var(--accent-dim)' : 'rgba(255, 255, 255, 0.02)',
              color: selectedCat === 'all' ? 'var(--accent)' : 'var(--text-secondary)'
            }}
          >
            ALL CAPABILITIES
          </button>
          {SKILL_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              style={{
                padding: '0.4rem 0.9rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                borderRadius: '20px',
                border: `1px solid ${selectedCat === cat.id ? 'var(--accent)' : 'var(--border-subtle)'}`,
                background: selectedCat === cat.id ? 'var(--accent-dim)' : 'rgba(255, 255, 255, 0.02)',
                color: selectedCat === cat.id ? 'var(--accent)' : 'var(--text-secondary)'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {filteredSkills.map(skill => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
