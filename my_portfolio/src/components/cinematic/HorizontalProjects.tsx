import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS, Project } from '../../data/projects';

interface CaseDetails {
  problem: string;
  approach: string;
  technology: string;
  result: string;
}

const CASE_DETAILS: Record<string, CaseDetails> = {
  argus: {
    problem: 'High-volume surveillance streams lack automated anomaly detection, resulting in delayed incident discovery and manual cognitive overload.',
    approach: 'Engineered an asynchronous multithreaded frame ingestion pipeline separating network transport from YOLO computer vision inference queues.',
    technology: 'Python, OpenCV, YOLO, PyTorch, Real-time Streaming Telemetry',
    result: 'Sub-15ms frame inference latency with automated webhook anomaly alerts and zero frame drops on continuous streams.'
  },
  orion: {
    problem: 'Complex institutional infrastructures suffer from fragmented policy visibility and sprawling attack surfaces across multi-cloud deployments.',
    approach: 'Designed a declarative threat modeling engine that maps architectural dependencies and continuously verifies structural compliance.',
    technology: 'Python, Architectural Security Modeling, Automated Rule Audits',
    result: 'Unified risk posture scoring with automated SARIF vulnerability mapping across 140+ institutional security policies.'
  },
  cerberus: {
    problem: 'Perimeter reconnaissance tools often operate in silos, requiring manual correlation between port scans, CVE advisories, and exposed services.',
    approach: 'Created an automated multi-vector security auditing suite that orchestrates port discovery, service fingerprinting, and CVE correlation.',
    technology: 'Python, Socket Architecture, Threat Intelligence Feeds, JSON/SARIF Reporting',
    result: 'End-to-end automated perimeter audit reports generated in under 90 seconds with prioritized vulnerability mitigation roadmaps.'
  },
  ultrone: {
    problem: 'Traditional automation scripts lack adaptable reasoning and cannot autonomously recover from unexpected runtime API failures.',
    approach: 'Architected an autonomous agent runtime featuring deterministic loop execution, memory buffers, dynamic tool calling, and self-correction.',
    technology: 'Python, State Machine Architecture, Agent Runtimes, Tool Calling Pipelines',
    result: 'Reliable multi-step goal execution with zero unhandled state deadlocks across complex operational task graphs.'
  },
  civiclens: {
    problem: 'Public civic telemetry and open datasets are notoriously fragmented, making civic intelligence inaccessible to researchers.',
    approach: 'Constructed an open-source civic data ingestion and visualization platform that aggregates municipal telemetry into clean spatial views.',
    technology: 'JavaScript, Data Pipelines, REST APIs, Spatial Visualizations',
    result: 'Indexed and normalized multi-source municipal datasets with interactive analytical dashboards and fast spatial filtering.'
  },
  fkali: {
    problem: 'Default security distributions come bloated with unused tools and insecure baseline configs unsuitable for dedicated security deployments.',
    approach: 'Engineered automated shell provisioning manifests that strip extraneous surfaces, apply kernel isolation, and establish reproducible environments.',
    technology: 'Linux, Bash, Kernel Hardening, Systemd Isolation',
    result: 'Lightweight, reproducible operating system footprint with reduced attack surfaces and deterministic provisioning.'
  },
  rc4: {
    problem: 'Legacy symmetric stream ciphers like RC4 still permeate deprecated protocols despite well-documented statistical keystream vulnerabilities.',
    approach: 'Developed cryptographic analysis scripts demonstrating the Fluhrer-Mantin-Shamir (FMS) bias and state recovery conditions.',
    technology: 'Python, Cryptographic Mathematics, Keystream Analysis',
    result: 'Rigorous empirical demonstration of statistical leakage in early keystream bytes to validate mandatory protocol modernization.'
  }
};

// 3D Tilt Card Subcomponent (Sections 18, 19, 20, 21)
interface ProjectCardProps {
  project: Project;
  idx: number;
  onOpenCase: (p: Project) => void;
}

const Project3DCard: React.FC<ProjectCardProps> = ({ project, idx, onOpenCase }) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, px: 0, py: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Subtle 3D tilt: rotateX: ±4°, rotateY: ±6° (Section 19)
    const rx = Math.max(-4, Math.min(4, -(y / (rect.height / 2)) * 4));
    const ry = Math.max(-6, Math.min(6, (x / (rect.width / 2)) * 6));

    // Parallax image movement: image moves 15% of cursor movement (Section 20)
    const px = (x / (rect.width / 2)) * 12; // 15% parallax shift
    const py = (y / (rect.height / 2)) * 12;

    setTilt({ rx, ry, px, py });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, px: 0, py: 0 });
  };

  const caseNum = `CASE FILE ${String(idx + 1).padStart(3, '0')}`;

  return (
    <motion.div
      ref={cardRef}
      // Cinematic reveal: scale: 1.15 -> 1, opacity: 0 -> 1, blur: 8px -> 0 (Section 21)
      initial={{ scale: 1.12, opacity: 0, filter: 'blur(8px)' }}
      whileInView={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="CASE"
      style={{
        flex: '0 0 380px',
        scrollSnapAlign: 'start',
        background: 'rgba(10, 15, 20, 0.88)',
        border: '1px solid rgba(0, 229, 255, 0.18)',
        borderRadius: '16px',
        padding: '2.2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 25px rgba(0, 229, 255, 0.06)',
        backdropFilter: 'blur(16px)',
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: 'transform 0.12s ease-out, border-color 0.25s ease, box-shadow 0.25s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Parallax Interior Glow Surface (Section 20) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(circle at 50% 0%, rgba(0, 229, 255, 0.08) 0%, transparent 60%)',
          transform: `translate3d(${tilt.px}px, ${tilt.py}px, 0)`,
          transition: 'transform 0.12s ease-out'
        }}
      />

      {/* Card Content Top */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: '#00E5FF',
              letterSpacing: '0.12em',
              fontWeight: 700
            }}
          >
            {caseNum}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: '#A3FF12',
              background: 'rgba(163, 255, 18, 0.08)',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px'
            }}
          >
            {project.status}
          </span>
        </div>

        {/* Telemetry Barcode */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: '#7C3AED',
            letterSpacing: '0.1em',
            marginBottom: '1.25rem'
          }}
        >
          ████████████████████ 100%
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.85rem',
            fontWeight: 800,
            color: '#E8F7FF',
            margin: '0 0 0.5rem 0',
            transform: `translate3d(${tilt.px * 0.4}px, ${tilt.py * 0.4}px, 0)`,
            transition: 'transform 0.12s ease-out'
          }}
        >
          {project.name}
        </h3>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: '#00E5FF',
            letterSpacing: '0.08em',
            marginBottom: '1rem'
          }}
        >
          CLASSIFICATION: {project.category.toUpperCase()}
        </div>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            lineHeight: '1.65',
            color: '#7F8C9A',
            marginBottom: '1.5rem'
          }}
        >
          {project.description}
        </p>
      </div>

      {/* Card Content Bottom */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            marginBottom: '1.75rem'
          }}
        >
          {project.tags.slice(0, 3).map((t, i) => (
            <span
              key={i}
              style={{
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.2rem 0.5rem',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '4px',
                color: '#CBD5E1'
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <button
          onClick={() => onOpenCase(project)}
          data-cursor="OPEN"
          data-magnetic="true"
          className="magnetic-btn"
          style={{
            width: '100%',
            padding: '0.8rem 1rem',
            background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.12) 0%, rgba(124, 58, 237, 0.08) 100%)',
            border: '1px solid rgba(0, 229, 255, 0.45)',
            borderRadius: '6px',
            color: '#00E5FF',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all 0.25s ease'
          }}
        >
          <span>[ OPEN CASE ]</span>
          <span style={{ transition: 'transform 0.2s ease' }}>↗</span>
        </button>
      </div>
    </motion.div>
  );
};

export const HorizontalProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scanPhase, setScanPhase] = useState<'scanning' | 'ready'>('scanning');
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const openCase = (proj: Project) => {
    setSelectedProject(proj);
    setScanPhase('scanning');
    setTimeout(() => {
      setScanPhase('ready');
    }, 450);
  };

  const closeCase = () => {
    setSelectedProject(null);
  };

  return (
    <section
      id="operations"
      style={{
        position: 'relative',
        minHeight: '110vh',
        background: '#0A0F14', // Section 1: alternating background #0A0F14
        padding: '7rem 0',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 2rem' }}>
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              color: '#00E5FF',
              letterSpacing: '0.2em',
              fontWeight: 600
            }}
          >
            03 // OPERATIONS &amp; CASE FILES
          </span>
          <div style={{ height: '1px', flex: 1, background: 'rgba(0, 229, 255, 0.2)' }} />
        </motion.div>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#E8F7FF',
            margin: '0 0 1rem 0'
          }}
        >
          CASE FILES
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.88rem',
            color: '#7F8C9A',
            maxWidth: '600px',
            marginBottom: '3rem'
          }}
        >
          Verified operational repositories cataloged as structured intelligence dossiers. Scroll horizontally to inspect active systems.
        </p>
      </div>

      {/* Horizontal Scroll Track Container (Section 17) */}
      <div
        ref={scrollTrackRef}
        style={{
          display: 'flex',
          gap: '2.2rem',
          padding: '1.5rem 2rem 3.5rem 2rem',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {PROJECTS.map((proj, idx) => (
          <Project3DCard
            key={proj.id}
            project={proj}
            idx={idx}
            onOpenCase={openCase}
          />
        ))}
      </div>

      {/* Cinematic Fullscreen Case File Modal with Scanline Animation (Section 13 & 14) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(5, 7, 10, 0.96)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
          >
            {/* System Scanline Sweep (Section 30) */}
            {scanPhase === 'scanning' && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  zIndex: 10
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: '#00E5FF',
                    boxShadow: '0 0 20px #00E5FF',
                    animation: 'scanlinePass 0.45s ease-out forwards'
                  }}
                />
              </div>
            )}

            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              transition={{ duration: 0.3 }}
              style={{
                maxWidth: '850px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                background: 'rgba(10, 15, 20, 0.98)',
                border: '1px solid rgba(0, 229, 255, 0.4)',
                borderRadius: '16px',
                padding: '2.5rem',
                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 229, 255, 0.15)',
                fontFamily: 'var(--font-mono)',
                position: 'relative'
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingBottom: '1rem',
                  marginBottom: '1.75rem'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#00E5FF', letterSpacing: '0.15em' }}>
                    CLASSIFIED CASE DOSSIER // {selectedProject.codename}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '2rem',
                      fontWeight: 800,
                      color: '#E8F7FF',
                      margin: '0.3rem 0 0 0'
                    }}
                  >
                    {selectedProject.name}
                  </h3>
                </div>

                <button
                  onClick={closeCase}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '6px',
                    color: '#7F8C9A',
                    padding: '0.5rem 0.85rem',
                    cursor: 'pointer',
                    fontSize: '0.75rem'
                  }}
                >
                  [ ESC / CLOSE ]
                </button>
              </div>

              {/* 4 Pillars Case Study Layout (Section 14) */}
              {(() => {
                const details = CASE_DETAILS[selectedProject.id] || {
                  problem: 'Operational inefficiency and security visibility gaps across distributed system perimeters.',
                  approach: 'Deconstructed system dependencies to architect a dedicated autonomous engine.',
                  technology: selectedProject.tags.join(', '),
                  result: 'Production-ready artifact deployed with continuous telemetry and verifiable test coverage.'
                };

                return (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem', marginBottom: '2rem' }}>
                    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '8px', borderLeft: '3px solid #7C3AED' }}>
                      <div style={{ color: '#7C3AED', fontSize: '0.72rem', fontWeight: 700, marginBottom: '0.4rem' }}>01 / PROBLEM</div>
                      <p style={{ color: '#CBD5E1', fontSize: '0.82rem', lineHeight: '1.6', margin: 0 }}>{details.problem}</p>
                    </div>

                    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '8px', borderLeft: '3px solid #00E5FF' }}>
                      <div style={{ color: '#00E5FF', fontSize: '0.72rem', fontWeight: 700, marginBottom: '0.4rem' }}>02 / APPROACH</div>
                      <p style={{ color: '#CBD5E1', fontSize: '0.82rem', lineHeight: '1.6', margin: 0 }}>{details.approach}</p>
                    </div>

                    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '8px', borderLeft: '3px solid #7C3AED' }}>
                      <div style={{ color: '#7C3AED', fontSize: '0.72rem', fontWeight: 700, marginBottom: '0.4rem' }}>03 / TECHNOLOGY</div>
                      <p style={{ color: '#CBD5E1', fontSize: '0.82rem', lineHeight: '1.6', margin: 0 }}>{details.technology}</p>
                    </div>

                    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '8px', borderLeft: '3px solid #A3FF12' }}>
                      <div style={{ color: '#A3FF12', fontSize: '0.72rem', fontWeight: 700, marginBottom: '0.4rem' }}>04 / RESULT</div>
                      <p style={{ color: '#CBD5E1', fontSize: '0.82rem', lineHeight: '1.6', margin: 0 }}>{details.result}</p>
                    </div>
                  </div>
                );
              })()}

              {/* Action Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="GITHUB"
                  style={{
                    padding: '0.75rem 1.75rem',
                    background: 'linear-gradient(135deg, #00E5FF, #7C3AED)',
                    color: '#05070A',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    letterSpacing: '0.08em',
                    boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)'
                  }}
                >
                  VIEW SOURCE REPOSITORY ↗
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
