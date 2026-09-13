import React, { useState } from 'react';
import { motion } from 'motion/react';

interface ToolItem {
  id: string;
  name: string;
  category: string;
  details: string;
  angle: number;
  distance: number;
  color: string;
}

const TOOLS: ToolItem[] = [
  { id: 'python', name: 'Python', category: 'CORE ARCHITECTURE', details: 'AsyncIO, OpenCV video pipelines, PyTorch inference, custom daemon development', angle: -Math.PI / 2, distance: 180, color: '#00F5FF' },
  { id: 'linux', name: 'Linux', category: 'OPERATING SYSTEM', details: 'Kernel tuning, systemd unit isolation, Bash scripting, process telemetry forensics', angle: -Math.PI / 3.5, distance: 190, color: '#2563FF' },
  { id: 'git', name: 'Git', category: 'VERSION INTEGRITY', details: 'GitHub Actions CI/CD workflows, semantic versioning, reproducible releases', angle: 0, distance: 175, color: '#8B5CF6' },
  { id: 'networking', name: 'Networking', category: 'COMMUNICATION', details: 'Wireshark, TCP/IP protocols, socket programming, encrypted tunnel routing', angle: Math.PI / 3.5, distance: 185, color: '#00F5FF' },
  { id: 'ai', name: 'AI & Agents', category: 'INTELLIGENCE', details: 'Autonomous state machines, YOLO vision inference, deterministic agent loops', angle: Math.PI / 2, distance: 195, color: '#A3FF12' },
  { id: 'automation', name: 'Automation', category: 'OPERATIONS', details: 'Scheduled cron daemons, automated SARIF vulnerability mapping, event triggers', angle: (2 * Math.PI) / 3, distance: 180, color: '#8B5CF6' },
  { id: 'web', name: 'Web & TS', category: 'INTERFACES', details: 'Modern React 19, TypeScript, motion animations, high-performance UI engineering', angle: Math.PI, distance: 175, color: '#2563FF' },
  { id: 'security', name: 'Security Auditing', category: 'VERIFICATION', details: 'Perimeter scanning, CVE correlation, static code analysis, threat modeling', angle: -(2 * Math.PI) / 3, distance: 190, color: '#00F5FF' },
  { id: 'apis', name: 'APIs & Webhooks', category: 'INTEGRATION', details: 'RESTful architectures, asynchronous webhooks, distributed event pipelines', angle: -Math.PI / 1.4, distance: 180, color: '#A3FF12' }
];

export const ToolkitConstellation: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolItem>(TOOLS[0]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const cx = 300;
  const cy = 250;

  return (
    <section
      id="toolkit"
      style={{
        position: 'relative',
        minHeight: '110vh',
        background: '#05070A',
        padding: '7rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1000px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: '#00F5FF',
            letterSpacing: '0.2em',
            fontWeight: 600
          }}
        >
          05.5 // ARSENAL
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#F5F7FA',
            margin: '0.5rem 0 1rem 0'
          }}
        >
          THE TOOLKIT
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.88rem',
            color: '#7D8795',
            maxWidth: '540px',
            margin: '0 auto 3rem auto'
          }}
        >
          An interactive operational constellation. Hover over any weapon of choice to reorganize the network connections.
        </p>

        {/* Constellation Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '600px',
            height: '500px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* SVG Connecting Lines */}
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          >
            {TOOLS.map((t) => {
              const isHovered = hoveredId === t.id;
              const isSelected = activeTool.id === t.id;
              const dist = isHovered ? t.distance + 15 : t.distance;
              const nx = cx + Math.cos(t.angle) * dist;
              const ny = cy + Math.sin(t.angle) * dist;

              return (
                <line
                  key={t.id}
                  x1={cx}
                  y1={cy}
                  x2={nx}
                  y2={ny}
                  stroke={isSelected || isHovered ? t.color : 'rgba(255, 255, 255, 0.1)'}
                  strokeWidth={isHovered ? 2.5 : isSelected ? 2 : 1}
                  strokeDasharray={isHovered ? 'none' : '3 3'}
                  style={{ transition: 'all 0.3s ease' }}
                />
              );
            })}
          </svg>

          {/* Central Hub */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(10, 15, 23, 0.95)',
              border: '2px solid #00F5FF',
              boxShadow: '0 0 35px rgba(0, 245, 255, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <span style={{ fontSize: '0.65rem', color: '#A3FF12', letterSpacing: '0.1em' }}>● ARSENAL</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.06em' }}>TOOLKIT</span>
          </div>

          {/* Orbiting Tool Nodes */}
          {TOOLS.map((t) => {
            const isHovered = hoveredId === t.id;
            const isSelected = activeTool.id === t.id;
            const dist = isHovered ? t.distance + 15 : t.distance;
            const nx = cx + Math.cos(t.angle) * dist;
            const ny = cy + Math.sin(t.angle) * dist;

            return (
              <div
                key={t.id}
                onMouseEnter={() => {
                  setHoveredId(t.id);
                  setActiveTool(t);
                }}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveTool(t)}
                data-cursor="TOOL"
                style={{
                  position: 'absolute',
                  left: `${nx}px`,
                  top: `${ny}px`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isHovered || isSelected ? 20 : 5,
                  padding: '0.4rem 0.85rem',
                  borderRadius: '20px',
                  background: isHovered || isSelected ? 'rgba(0, 245, 255, 0.15)' : 'rgba(10, 15, 23, 0.85)',
                  border: `1px solid ${isHovered || isSelected ? t.color : 'rgba(255, 255, 255, 0.12)'}`,
                  boxShadow: isHovered || isSelected ? `0 0 18px ${t.color}` : 'none',
                  color: isHovered || isSelected ? '#FFFFFF' : '#7D8795',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {t.name}
              </div>
            );
          })}
        </div>

        {/* Selected Tool Breakdown Readout */}
        <motion.div
          key={activeTool.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            maxWidth: '550px',
            margin: '2.5rem auto 0 auto',
            padding: '1.5rem 2rem',
            background: 'rgba(10, 15, 23, 0.85)',
            border: `1px solid ${activeTool.color}50`,
            borderRadius: '10px',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.72rem' }}>
            <span style={{ color: activeTool.color, fontWeight: 700 }}>{activeTool.category}</span>
            <span style={{ color: '#A3FF12' }}>VERIFIED SKILL</span>
          </div>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 0.5rem 0' }}>
            {activeTool.name}
          </h4>
          <p style={{ fontSize: '0.82rem', color: '#A0AEC0', lineHeight: '1.6', margin: 0 }}>
            {activeTool.details}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
