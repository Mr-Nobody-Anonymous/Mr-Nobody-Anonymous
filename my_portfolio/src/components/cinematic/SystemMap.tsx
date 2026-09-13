import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SystemNode {
  id: string;
  name: string;
  category: string;
  angle: number; // in radians
  distance: number;
  color: string;
  subitems: string[];
}

const NODES: SystemNode[] = [
  {
    id: 'cybersecurity',
    name: 'CYBERSECURITY',
    category: 'PRIMARY NODE',
    angle: -Math.PI / 2, // Top
    distance: 220,
    color: '#00F5FF',
    subitems: ['NETWORK SECURITY', 'THREAT ANALYSIS', 'LINUX HARDENING', 'OSINT RECON', 'WEB AUDITING', 'SECURITY RESEARCH']
  },
  {
    id: 'ai',
    name: 'AI SYSTEMS',
    category: 'PRIMARY NODE',
    angle: -Math.PI / 4,
    distance: 230,
    color: '#8B5CF6',
    subitems: ['AUTONOMOUS AGENTS', 'VISION INFERENCE', 'RAG ARCHITECTURES', 'DECISION DAEMONS', 'AUTOMATION RUNTIMES']
  },
  {
    id: 'linux',
    name: 'LINUX / KERNEL',
    category: 'FOUNDATION',
    angle: 0,
    distance: 210,
    color: '#2563FF',
    subitems: ['KERNEL AUDITING', 'SYSTEM DAEMONS', 'SHELL SCRIPTING', 'PROCESS ISOLATION']
  },
  {
    id: 'networking',
    name: 'NETWORKING',
    category: 'INFRASTRUCTURE',
    angle: Math.PI / 4,
    distance: 230,
    color: '#00F5FF',
    subitems: ['PACKET INSPECTION', 'TCP/IP PROTOCOLS', 'ENCRYPTED TUNNELS', 'FIREWALL ARCHITECTURE']
  },
  {
    id: 'automation',
    name: 'AUTOMATION',
    category: 'EXECUTION',
    angle: Math.PI / 2,
    distance: 220,
    color: '#A3FF12',
    subitems: ['CI/CD PIPELINES', 'TASK RUNTIMES', 'DYNAMIC TOOL CALLING', 'DAEMON WATCHERS']
  },
  {
    id: 'programming',
    name: 'PROGRAMMING',
    category: 'SYNTAX & LOGIC',
    angle: (3 * Math.PI) / 4,
    distance: 230,
    color: '#8B5CF6',
    subitems: ['PYTHON ARCHITECTURE', 'TYPESCRIPT / REACT', 'LOW-LEVEL LOGIC', 'EVENT LOOPS']
  },
  {
    id: 'research',
    name: 'RESEARCH',
    category: 'EXPLORATION',
    angle: Math.PI,
    distance: 210,
    color: '#2563FF',
    subitems: ['CVE VULNERABILITY MAPPING', 'CRYPTOGRAPHIC PRIMITIVES', 'SECURITY POSTURE AUDITS']
  },
  {
    id: 'problem-solving',
    name: 'PROBLEM SOLVING',
    category: 'METHODOLOGY',
    angle: -(3 * Math.PI) / 4,
    distance: 230,
    color: '#00F5FF',
    subitems: ['ROOT-CAUSE FORENSICS', 'SYSTEM DECONSTRUCTION', 'RESILIENT PATTERNS']
  }
];

export const SystemMap: React.FC = () => {
  const [activeNode, setActiveNode] = useState<SystemNode>(NODES[0]);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animId: number;
    const animate = () => {
      setRotationAngle((prev) => (prev + 0.0015) % (Math.PI * 2));
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const triggerZoomIntoCyber = () => {
    setIsZooming(true);
    setTimeout(() => {
      const el = document.getElementById('cybersecurity');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(() => setIsZooming(false), 800);
    }, 600);
  };

  return (
    <section
      id="system-map"
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '130vh',
        background: '#05070A',
        padding: '7rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Zoom Transition Overlay */}
      <AnimatePresence>
        {isZooming && (
          <motion.div
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ scale: 25, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'radial-gradient(circle, #00F5FF 0%, #05070A 80%)',
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>

      <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
        {/* Section Header */}
        <div style={{ marginBottom: '3rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: '#00F5FF',
              letterSpacing: '0.2em',
              fontWeight: 600
            }}
          >
            02 // TOPOLOGY
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#F5F7FA',
              marginTop: '0.5rem',
              marginBottom: '0.75rem'
            }}
          >
            THE SYSTEM
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              maxWidth: '560px',
              margin: '0 auto'
            }}
          >
            Interconnected nodes forming the core architecture. Hover to inspect capabilities or zoom into the security matrix.
          </p>
        </div>

        {/* Interactive Constellation Canvas / SVG Area */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '680px',
            height: '560px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Connecting Lines SVG */}
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              overflow: 'visible'
            }}
          >
            {NODES.map((node) => {
              const currentAngle = node.angle + rotationAngle;
              const cx = 340;
              const cy = 280;
              const nx = cx + Math.cos(currentAngle) * node.distance;
              const ny = cy + Math.sin(currentAngle) * node.distance;
              const isSelected = activeNode.id === node.id;

              return (
                <g key={node.id}>
                  <line
                    x1={cx}
                    y1={cy}
                    x2={nx}
                    y2={ny}
                    stroke={isSelected ? '#00F5FF' : 'rgba(255, 255, 255, 0.12)'}
                    strokeWidth={isSelected ? 2 : 1}
                    strokeDasharray={isSelected ? 'none' : '4 4'}
                    style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                  />
                  {isSelected && (
                    <circle
                      cx={nx}
                      cy={ny}
                      r={30}
                      fill="none"
                      stroke="#00F5FF"
                      strokeWidth="1"
                      opacity="0.4"
                      className="pulsing-ring"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Central MR. NOBODY Node */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              background: 'rgba(10, 15, 23, 0.95)',
              border: '2px solid #00F5FF',
              boxShadow: '0 0 35px rgba(0, 245, 255, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              color: '#FFFFFF'
            }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#A3FF12', marginBottom: '4px', boxShadow: '0 0 8px #A3FF12' }} />
            <div style={{ fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.08em' }}>MR. NOBODY</div>
            <div style={{ fontSize: '0.62rem', color: '#00F5FF', letterSpacing: '0.12em' }}>CORE RUNTIME</div>
          </div>

          {/* Surrounding Orbital Nodes */}
          {NODES.map((node) => {
            const currentAngle = node.angle + rotationAngle;
            const cx = 340;
            const cy = 280;
            const nx = cx + Math.cos(currentAngle) * node.distance;
            const ny = cy + Math.sin(currentAngle) * node.distance;
            const isSelected = activeNode.id === node.id;

            return (
              <div
                key={node.id}
                onClick={() => setActiveNode(node)}
                onMouseEnter={() => setActiveNode(node)}
                data-cursor={node.id === 'cybersecurity' ? 'ZOOM' : 'INSPECT'}
                style={{
                  position: 'absolute',
                  left: `${nx}px`,
                  top: `${ny}px`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isSelected ? 20 : 5,
                  cursor: 'pointer',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '20px',
                  background: isSelected ? 'rgba(0, 245, 255, 0.15)' : 'rgba(10, 15, 23, 0.85)',
                  border: `1px solid ${isSelected ? node.color : 'rgba(255, 255, 255, 0.15)'}`,
                  boxShadow: isSelected ? `0 0 20px ${node.color}` : 'none',
                  color: isSelected ? '#FFFFFF' : '#7D8795',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  whiteSpace: 'nowrap',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.25s ease'
                }}
              >
                {node.name}
              </div>
            );
          })}
        </div>

        {/* Selected Node Details Readout & Zoom Action */}
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            marginTop: '2.5rem',
            padding: '1.5rem 2rem',
            background: 'rgba(10, 15, 23, 0.75)',
            border: `1px solid ${activeNode.color}40`,
            borderRadius: '12px',
            maxWidth: '640px',
            margin: '2rem auto 0 auto',
            backdropFilter: 'blur(12px)',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', color: activeNode.color, fontWeight: 700 }}>
              NODE_INFO // {activeNode.category}
            </span>
            <span style={{ fontSize: '0.68rem', color: '#7D8795' }}>STATUS: NOMINAL</span>
          </div>

          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 1rem 0' }}>
            {activeNode.name}
          </h3>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
            {activeNode.subitems.map((sub, i) => (
              <span
                key={i}
                style={{
                  padding: '0.25rem 0.6rem',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  color: '#F5F7FA'
                }}
              >
                {sub}
              </span>
            ))}
          </div>

          {activeNode.id === 'cybersecurity' ? (
            <button
              onClick={triggerZoomIntoCyber}
              data-cursor="WHOOSH"
              style={{
                padding: '0.65rem 1.6rem',
                background: 'rgba(0, 245, 255, 0.12)',
                border: '1px solid #00F5FF',
                borderRadius: '6px',
                color: '#00F5FF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                boxShadow: '0 0 15px rgba(0, 245, 255, 0.2)'
              }}
            >
              [ ZOOM INTO CYBERSECURITY MATRIX → ]
            </button>
          ) : (
            <button
              onClick={() => {
                const target = document.getElementById(activeNode.id === 'ai' ? 'intelligence' : 'operations');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              data-cursor="NAVIGATE"
              style={{
                padding: '0.65rem 1.6rem',
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
                color: '#F5F7FA',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                cursor: 'pointer'
              }}
            >
              [ VIEW OPERATIONAL SPECS → ]
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};
