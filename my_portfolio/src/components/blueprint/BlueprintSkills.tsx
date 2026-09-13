import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Terminal, Cpu, Network, Lock, Code } from 'lucide-react';

interface SkillItem {
  id: string;
  name: string;
  category: string;
  percentage: number;
  icon: React.ElementType;
  iconColor: string;
  description: string;
  size: 'large' | 'medium' | 'small';
  snippet?: string;
  connectedTo?: string[];
  x?: number;
  y?: number;
}

const SKILLS_DATA: SkillItem[] = [
  {
    id: 'cybersecurity',
    name: 'Cyber Security',
    category: 'OFFENSIVE / DEFENSIVE',
    percentage: 92,
    icon: Shield,
    iconColor: '#00f0ff',
    description: 'Vulnerability mapping, threat vectors, STRIDE modeling, and packet protocol analysis.',
    size: 'large',
    snippet: `// Kernel audit & privilege boundary check\nconst boundary = verifyIsolation({\n  uid: 0,\n  capabilities: ['CAP_NET_RAW'],\n  enforceStrictSandbox: true\n});`,
    connectedTo: ['python', 'linux', 'networking'],
    x: 280,
    y: 120
  },
  {
    id: 'python',
    name: 'Python Systems',
    category: 'BACKEND & AUTOMATION',
    percentage: 88,
    icon: Terminal,
    iconColor: '#3776ab',
    description: 'AsyncIO daemons, socket transports, OpenCV video pipelines, and automated recon scripts.',
    size: 'medium',
    connectedTo: ['cybersecurity', 'ai', 'linux'],
    x: 140,
    y: 220
  },
  {
    id: 'ai',
    name: 'Autonomous AI',
    category: 'AGENTIC ARCHITECTURES',
    percentage: 85,
    icon: Cpu,
    iconColor: '#b400ff',
    description: 'Autonomous state machines, YOLO vision inference, deterministic agent tool execution loops.',
    size: 'medium',
    connectedTo: ['python', 'cybersecurity'],
    x: 440,
    y: 200
  },
  {
    id: 'linux',
    name: 'Linux Kernel & Shell',
    category: 'SYSTEMS',
    percentage: 90,
    icon: Lock,
    iconColor: '#f05032',
    description: 'Systemd units, kernel namespaces, bash automation, and low-level daemon isolation.',
    size: 'small',
    connectedTo: ['cybersecurity', 'networking', 'python'],
    x: 220,
    y: 320
  },
  {
    id: 'networking',
    name: 'Networking & TCP/IP',
    category: 'INFRASTRUCTURE',
    percentage: 86,
    icon: Network,
    iconColor: '#00f0ff',
    description: 'Wireshark packet dissection, encrypted tunnel routing, and protocol anomaly verification.',
    size: 'small',
    connectedTo: ['cybersecurity', 'linux'],
    x: 370,
    y: 330
  },
  {
    id: 'web',
    name: 'Modern Web & React',
    category: 'FRONTEND ARCHITECTURE',
    percentage: 84,
    icon: Code,
    iconColor: '#61dafb',
    description: 'High-performance React 19, TypeScript, motion orchestration, and dark mode design systems.',
    size: 'large',
    snippet: `// Motion spring transition hook\nconst { scrollYProgress } = useScroll();\nconst smoothX = useSpring(scrollYProgress, {\n  stiffness: 180,\n  damping: 28\n});`,
    connectedTo: ['python', 'cybersecurity'],
    x: 520,
    y: 110
  }
];

const CODE_RAIN_LINES = [
  'import { verifyToken, decryptStream } from "@nobody/crypto";',
  'const payload = await socket.recv({ timeout: 120, raw: true });',
  'if (packet.header.flags & SYN_ACK) establishEncryptedRoute();',
  'const yoloInference = model.predict(frameBuffer, { conf: 0.85 });',
  'systemd.isolateProcess({ cgroups: "v2", memoryLimit: "512M" });',
  'export const agentLoop = async (task: Task): Promise<Result> => {'
];

export const BlueprintSkills: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'constellation'>('grid');
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  // 3D Tilt calculation
  const [tiltMap, setTiltMap] = useState<Record<string, { rotateX: number; rotateY: number }>>({});

  const handleMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 5; // Max 5 deg
    const rotateY = (x / (rect.width / 2)) * 5;
    setTiltMap((prev) => ({ ...prev, [id]: { rotateX, rotateY } }));
  };

  const handleMouseLeave = (id: string) => {
    setTiltMap((prev) => ({ ...prev, [id]: { rotateX: 0, rotateY: 0 } }));
  };

  const titleLetters = 'WHAT I WORK WITH'.split('');

  return (
    <section
      id="skills"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#1a1a2e',
        padding: '120px 2rem',
        overflow: 'hidden'
      }}
    >
      {/* Floating horizontal code lines at 5-8% opacity */}
      <div className="code-rain-layer" aria-hidden="true">
        {CODE_RAIN_LINES.map((code, idx) => (
          <div
            key={idx}
            className="code-rain-line"
            style={{
              top: `${idx * 16 + 5}%`,
              animationDuration: `${18 + idx * 4}s`
            }}
          >
            {code}
          </div>
        ))}
      </div>

      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 3
        }}
      >
        {/* Section Tag: < SKILLS /> */}
        <div
          style={{
            fontFamily: 'var(--font-mono, "Fira Code", monospace)',
            fontSize: '14px',
            color: '#00f0ff',
            letterSpacing: '0.1em',
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>&lt; SKILLS /&gt;</span>
        </div>

        {/* Title: WHAT I WORK WITH (Letters assemble from scattered positions) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-heading, "Orbitron", sans-serif)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              color: '#ffffff',
              display: 'flex',
              flexWrap: 'wrap'
            }}
          >
            {titleLetters.map((char, idx) => (
              <motion.span
                key={idx}
                initial={{
                  opacity: 0,
                  x: (Math.random() - 0.5) * 200,
                  y: (Math.random() - 0.5) * 200,
                  scale: 0.5
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.03,
                  ease: [0.16, 1, 0.3, 1]
                }}
                style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </motion.span>
            ))}
          </h2>

          {/* View Toggle: Grid View | Constellation View */}
          <div
            style={{
              display: 'inline-flex',
              background: '#111111',
              padding: '4px',
              borderRadius: '8px',
              border: '1px solid #222222'
            }}
          >
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '0.45rem 1.1rem',
                borderRadius: '6px',
                border: 'none',
                background: viewMode === 'grid' ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
                color: viewMode === 'grid' ? '#00f0ff' : '#666666',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('constellation')}
              style={{
                padding: '0.45rem 1.1rem',
                borderRadius: '6px',
                border: 'none',
                background: viewMode === 'constellation' ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
                color: viewMode === 'constellation' ? '#00f0ff' : '#666666',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Constellation View
            </button>
          </div>
        </div>

        {/* View 1: Bento Grid */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '1.5rem'
              }}
            >
              {SKILLS_DATA.map((skill) => {
                const IconComponent = skill.icon;
                const tilt = tiltMap[skill.id] || { rotateX: 0, rotateY: 0 };
                const isHovered = hoveredSkillId === skill.id;

                const colSpan = skill.size === 'large' ? 'span 6' : skill.size === 'medium' ? 'span 3' : 'span 3';

                return (
                  <div
                    key={skill.id}
                    onMouseMove={(e) => handleMouseMove(skill.id, e)}
                    onMouseEnter={() => setHoveredSkillId(skill.id)}
                    onMouseLeave={() => {
                      handleMouseLeave(skill.id);
                      setHoveredSkillId(null);
                    }}
                    style={{
                      gridColumn: colSpan,
                      perspective: 800
                    }}
                  >
                    <motion.div
                      className="bento-skill-card"
                      style={{
                        background: '#111111',
                        border: isHovered ? '1px solid #00f0ff' : '1px solid #222222',
                        borderRadius: '12px',
                        padding: '30px',
                        height: '100%',
                        position: 'relative',
                        transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(${isHovered ? '-10px' : '0px'})`,
                        transition: 'transform 0.15s ease-out, border-color 0.25s ease, box-shadow 0.25s ease',
                        boxShadow: isHovered ? '0 15px 35px rgba(0, 240, 255, 0.25), 0 0 15px rgba(0,240,255,0.1)' : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        {/* Header: Icon + Category */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                          <div
                            style={{
                              width: '42px',
                              height: '42px',
                              borderRadius: '8px',
                              border: '1px solid rgba(255,255,255,0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: isHovered ? skill.iconColor : '#ffffff',
                              background: isHovered ? 'rgba(255,255,255,0.05)' : 'transparent',
                              transition: 'all 0.25s ease'
                            }}
                          >
                            <IconComponent size={22} strokeWidth={1.5} />
                          </div>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.7rem',
                              color: '#666666',
                              letterSpacing: '0.08em'
                            }}
                          >
                            {skill.category}
                          </span>
                        </div>

                        {/* Skill Name */}
                        <h3
                          style={{
                            fontFamily: 'var(--font-subheading, "Rajdhani", sans-serif)',
                            fontSize: '22px',
                            fontWeight: 700,
                            color: '#ffffff',
                            marginBottom: '0.5rem'
                          }}
                        >
                          {skill.name}
                        </h3>

                        {/* Description */}
                        <p
                          style={{
                            fontFamily: 'var(--font-body, "Inter", sans-serif)',
                            fontSize: '14px',
                            color: '#666666',
                            lineHeight: 1.6,
                            marginBottom: '1.5rem'
                          }}
                        >
                          {skill.description}
                        </p>

                        {/* Code Snippet for Large Cards */}
                        {skill.snippet && (
                          <div
                            style={{
                              background: '#0a0a0e',
                              border: '1px solid #1f1f2e',
                              borderRadius: '6px',
                              padding: '0.85rem',
                              fontFamily: 'var(--font-mono, monospace)',
                              fontSize: '0.75rem',
                              color: '#a0a0b0',
                              lineHeight: 1.5,
                              whiteSpace: 'pre-wrap',
                              marginBottom: '1.5rem',
                              overflowX: 'auto'
                            }}
                          >
                            {skill.snippet}
                          </div>
                        )}
                      </div>

                      {/* Proficiency Bar with Shimmer */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                          <span style={{ color: '#888888' }}>PROFICIENCY</span>
                          <span style={{ color: '#00f0ff', fontWeight: 600 }}>{skill.percentage}%</span>
                        </div>
                        <div
                          style={{
                            width: '100%',
                            height: '6px',
                            background: '#1a1a1a',
                            borderRadius: '3px',
                            overflow: 'hidden',
                            position: 'relative'
                          }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            style={{
                              height: '100%',
                              background: 'linear-gradient(90deg, #00f0ff 0%, #b400ff 100%)',
                              position: 'relative'
                            }}
                          >
                            <div className="shimmer-bar" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            /* View 2: Constellation Node-Graph */
            <motion.div
              key="constellation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                width: '100%',
                height: '520px',
                background: '#0d0d18',
                borderRadius: '16px',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* SVG Connecting lines */}
              <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                {SKILLS_DATA.map((skill) =>
                  skill.connectedTo?.map((targetId) => {
                    const target = SKILLS_DATA.find((s) => s.id === targetId);
                    if (!target || !skill.x || !skill.y || !target.x || !target.y) return null;

                    const isHighlight =
                      hoveredSkillId === skill.id || hoveredSkillId === target.id;

                    return (
                      <line
                        key={`${skill.id}-${targetId}`}
                        x1={skill.x}
                        y1={skill.y}
                        x2={target.x}
                        y2={target.y}
                        stroke={isHighlight ? '#00f0ff' : 'rgba(255,255,255,0.12)'}
                        strokeWidth={isHighlight ? 2 : 1}
                        strokeDasharray={isHighlight ? 'none' : '3 3'}
                        style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                      />
                    );
                  })
                )}
              </svg>

              {/* Interactive Draggable Skill Nodes */}
              {SKILLS_DATA.map((skill) => {
                const isHovered = hoveredSkillId === skill.id;
                const isDimmed =
                  hoveredSkillId !== null &&
                  hoveredSkillId !== skill.id &&
                  !skill.connectedTo?.includes(hoveredSkillId);

                return (
                  <motion.div
                    key={skill.id}
                    drag
                    dragConstraints={{ left: 50, right: 650, top: 50, bottom: 420 }}
                    onMouseEnter={() => setHoveredSkillId(skill.id)}
                    onMouseLeave={() => setHoveredSkillId(null)}
                    style={{
                      position: 'absolute',
                      left: skill.x,
                      top: skill.y,
                      transform: 'translate(-50%, -50%)',
                      opacity: isDimmed ? 0.25 : 1,
                      cursor: 'grab',
                      transition: 'opacity 0.3s ease',
                      zIndex: isHovered ? 10 : 5
                    }}
                  >
                    <div
                      style={{
                        padding: '0.65rem 1.25rem',
                        background: '#111111',
                        border: isHovered ? '2px solid #00f0ff' : '1px solid #333333',
                        borderRadius: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: isHovered ? '0 0 20px rgba(0, 240, 255, 0.6)' : 'none',
                        fontFamily: 'var(--font-subheading, "Rajdhani")',
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: isHovered ? '#00f0ff' : '#ffffff'
                      }}
                    >
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: skill.iconColor }} />
                      {skill.name}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .code-rain-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          opacity: 0.06;
        }
        .code-rain-line {
          position: absolute;
          left: -10%;
          font-family: var(--font-mono, monospace);
          font-size: 0.9rem;
          color: #ffffff;
          white-space: nowrap;
          animation: codeFloat linear infinite;
        }
        @keyframes codeFloat {
          0% { transform: translateX(-5%); }
          100% { transform: translateX(110%); }
        }
        .shimmer-bar {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 30px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: shimmerSweep 2.5s infinite;
        }
        @keyframes shimmerSweep {
          0% { transform: translateX(-30px); }
          100% { transform: translateX(350px); }
        }
        @media (max-width: 900px) {
          .bento-skill-card {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
};
