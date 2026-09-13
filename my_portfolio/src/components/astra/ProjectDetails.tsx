import { ArrowUpRight, Code2 } from 'lucide-react';
import type { Project } from '../../data/portfolio';

export default function ProjectDetails({ project }: { project: Project }) {
  return (
    <article className="project-details">
      <img className="project-detail-image" src={project.image} alt={project.imageAlt} />
      <div className="project-detail-content">
        <p className="eyebrow accent">CASE FILE {project.number} / {project.categoryLabel}</p>
        <h2 id="project-dialog-title">{project.name}<span className="accent">.</span></h2>
        <p className="project-overview">{project.overview}</p>
        <section className="project-detail-section">
          <h3>The challenge</h3>
          <p>{project.challenge}</p>
        </section>
        <section className="project-detail-section">
          <h3>Under the hood</h3>
          <ol className="architecture-list">
            {project.architecture.map((item: string, index: number) => (
              <li key={item}><span>0{index + 1}</span><p>{item}</p></li>
            ))}
          </ol>
        </section>
        <section className="project-detail-section">
          <h3>Built with</h3>
          <p className="project-stack">{project.technologies.join(' / ')}</p>
        </section>
        <a className="button button-primary project-source" href={project.repository} target="_blank" rel="noreferrer">
          <Code2 size={17} /> Explore the source <ArrowUpRight size={17} />
        </a>
        <p className="project-source-note">Open-source work. Explore the repository for the current implementation and documentation.</p>
      </div>
    </article>
  );
}