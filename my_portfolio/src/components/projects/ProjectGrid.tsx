import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROJECTS, type Project, type ProjectCategory } from '../../data/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectFilter } from './ProjectFilter';
import { ProjectModal } from './ProjectModal';
import { SectionHeading } from '../ui/SectionHeading';

export const ProjectGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="projects" style={{ padding: '6rem 0', position: 'relative', zIndex: 2 }}>
      <div className="container">
        <SectionHeading
          moduleCode="/modules/operations"
          title="Verified Operations & Tools"
          subtitle="Real repositories and technical projects engineered for vulnerability assessment, video telemetry analytics, and autonomous AI agents."
        />

        <ProjectFilter
          currentCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={setActiveProject}
            />
          ))}
        </motion.div>

        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </section>
  );
};
