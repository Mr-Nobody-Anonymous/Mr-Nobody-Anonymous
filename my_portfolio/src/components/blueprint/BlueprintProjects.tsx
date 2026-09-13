import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import { projects, type Project } from '../../data/portfolio';

interface BlueprintProjectsProps {
  onOpenCaseFile: (project: Project) => void;
}

export const BlueprintProjects: React.FC<BlueprintProjectsProps> = ({ onOpenCaseFile }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Horizontal scroll linked to vertical scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const totalProjects = projects.length;
  // Calculate horizontal translation
  const xTranslate = useTransform(scrollYProgress, [0, 1], ['0%', `-${(totalProjects - 1) * 78}%`]);

  // Update active counter on scroll
  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      const idx = Math.min(Math.floor(v * totalProjects), totalProjects - 1);
      setActiveProjectIdx(idx);
    });
  }, [scrollYProgress, totalProjects]);

  return (
    <div
      ref={containerRef}
      id="work"
      style={{
        position: 'relative',
        height: `${totalProjects * 100}vh`, // Height allows natural scroll distance
        background: '#0a0a0a',
        overflow: 'visible'
      }}
    >
      {/* Sticky Fullscreen Container */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        {/* Subtle Dark Purple Gradient Fog */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40vh',
            background: 'linear-gradient(to top, rgba(180, 0, 255, 0.08) 0%, transparent 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Fixed Header Bar: Title + Rolling Counter */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '5%',
            right: '5%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 10
          }}
        >
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#00f0ff', letterSpacing: '0.1em' }}>
              &lt; PROJECTS /&gt;
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-heading, "Orbitron", sans-serif)',
                fontSize: 'clamp(1.75rem, 4vw, 2.6rem)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '2px',
                marginTop: '0.2rem'
              }}
            >
              MY PROJECTS
            </h2>
          </div>

          {/* Odometer Project Counter: 01 / 03 */}
          <div
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '1.5rem',
              color: '#00f0ff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.4rem 1rem',
              background: '#111111',
              borderRadius: '8px',
              border: '1px solid #222222'
            }}
          >
            <span style={{ fontWeight: 700 }}>0{activeProjectIdx + 1}</span>
            <span style={{ color: '#555555' }}>/</span>
            <span style={{ color: '#888888' }}>0{totalProjects}</span>
          </div>
        </div>

        {/* Horizontal Slides Wrapper */}
        <motion.div
          style={{
            display: 'flex',
            gap: '5vw',
            paddingLeft: '10vw',
            x: xTranslate,
            alignItems: 'center',
            height: '75vh',
            willChange: 'transform'
          }}
        >
          {projects.map((project) => {
            const isHovered = hoveredProject === project.id;

            return (
              <motion.div
                key={project.id}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  minWidth: '78vw',
                  maxWidth: '1080px',
                  background: '#111111',
                  border: isHovered ? '1.5px solid #00f0ff' : '1px solid #222222',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  boxShadow: isHovered
                    ? '0 25px 60px rgba(0, 240, 255, 0.25), 0 0 25px rgba(0, 240, 255, 0.15)'
                    : '0 10px 40px rgba(0, 0, 0, 0.5)',
                  transform: isHovered
                    ? 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.02) translateZ(20px)'
                    : 'perspective(1000px) rotateY(4deg) rotateX(1deg) scale(0.98)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative'
                }}
              >
                {/* Screenshot & Mockup Frame (60%) */}
                <div
                  style={{
                    background: '#0a0a0e',
                    borderRight: '1px solid #1c1c24',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Browser Mockup Top Bar with 3 Colored Dots */}
                  <div
                    style={{
                      height: '36px',
                      background: '#15151c',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 1rem',
                      gap: '8px',
                      borderBottom: '1px solid #222222'
                    }}
                  >
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                    <span
                      style={{
                        marginLeft: 'auto',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: '#666666'
                      }}
                    >
                      https://mr-nobody.sys/{project.id}
                    </span>
                  </div>

                  {/* Artwork Image Container with Vertical Scroll on Hover */}
                  <div
                    style={{
                      height: '380px',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}
                    onClick={() => onOpenCaseFile(project)}
                  >
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 0.6s ease'
                      }}
                    />
                    {/* Glass Reflection at Top */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '50%',
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)',
                        pointerEvents: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Right Details Panel */}
                <div
                  style={{
                    padding: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    {/* Category Tag: Magenta border and text */}
                    <div style={{ marginBottom: '1rem' }}>
                      <span
                        style={{
                          padding: '0.3rem 0.85rem',
                          borderRadius: '9999px',
                          border: '1px solid #ff006e',
                          color: '#ff006e',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase'
                        }}
                      >
                        {project.categoryLabel}
                      </span>
                    </div>

                    {/* Project Name with Glitch Hover */}
                    <h3
                      className={isHovered ? 'project-title-glitch' : ''}
                      style={{
                        fontFamily: 'var(--font-heading, "Orbitron", sans-serif)',
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: '#ffffff',
                        marginBottom: '1rem',
                        letterSpacing: '1px'
                      }}
                    >
                      {project.name}
                    </h3>

                    {/* Description: 2-3 lines max, Inter 16px */}
                    <p
                      style={{
                        fontFamily: 'var(--font-body, "Inter", sans-serif)',
                        fontSize: '16px',
                        color: '#e0e0e0',
                        lineHeight: 1.7,
                        marginBottom: '1.5rem'
                      }}
                    >
                      {project.overview}
                    </p>

                    {/* Tech Stack Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: '#888888',
                            background: '#1a1a24',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '4px'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions: View Live / Case File & Source Code */}
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => onOpenCaseFile(project)}
                      data-cursor="Open"
                      style={{
                        padding: '0.75rem 1.6rem',
                        borderRadius: '6px',
                        border: 'none',
                        background: '#00f0ff',
                        color: '#0a0a0a',
                        fontFamily: 'var(--font-heading, "Orbitron")',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 0 15px rgba(0, 240, 255, 0.4)'
                      }}
                      className="view-live-btn"
                    >
                      Case File <ExternalLink size={16} />
                    </button>

                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="Code"
                      style={{
                        padding: '0.75rem 1.6rem',
                        borderRadius: '6px',
                        border: '1px solid #00f0ff',
                        background: 'transparent',
                        color: '#00f0ff',
                        fontFamily: 'var(--font-heading, "Orbitron")',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.25s ease'
                      }}
                      className="source-code-btn"
                    >
                      <Code size={16} /> Source Code
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Dot Indicators */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '12px',
            zIndex: 10
          }}
        >
          {projects.map((_, i) => (
            <div
              key={i}
              style={{
                width: activeProjectIdx === i ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: activeProjectIdx === i ? '#00f0ff' : '#444444',
                boxShadow: activeProjectIdx === i ? '0 0 10px #00f0ff' : 'none',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        .view-live-btn:hover {
          background: linear-gradient(135deg, #00f0ff 0%, #b400ff 100%) !important;
          box-shadow: 0 0 25px rgba(0, 240, 255, 0.8) !important;
        }
        .source-code-btn:hover {
          background: #00f0ff !important;
          color: #0a0a0a !important;
        }
        .project-title-glitch {
          animation: textGlitch 0.3s infinite;
        }
        @keyframes textGlitch {
          0% { transform: translate(0, 0); }
          30% { transform: translate(-2px, 1px); color: #00f0ff; }
          70% { transform: translate(2px, -1px); color: #ff006e; }
          100% { transform: translate(0, 0); color: #ffffff; }
        }
      `}</style>
    </div>
  );
};
