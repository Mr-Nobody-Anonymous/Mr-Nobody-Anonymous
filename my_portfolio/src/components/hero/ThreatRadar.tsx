import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface NodePoint {
  id: string;
  x: number;
  y: number;
  status: 'VERIFIED' | 'MONITORED' | 'ISOLATED';
  threatLevel: 'LOW' | 'NOMINAL' | 'EVALUATING';
}

const SIMULATED_NODES: NodePoint[] = [
  { id: 'NODE-ARGUS', x: 0.65, y: 0.35, status: 'VERIFIED', threatLevel: 'LOW' },
  { id: 'NODE-ORION', x: 0.3, y: 0.4, status: 'VERIFIED', threatLevel: 'NOMINAL' },
  { id: 'NODE-CERBERUS', x: 0.75, y: 0.7, status: 'VERIFIED', threatLevel: 'EVALUATING' },
  { id: 'NODE-ULTRONE', x: 0.25, y: 0.75, status: 'VERIFIED', threatLevel: 'NOMINAL' }
];

type ThemeName = 'green' | 'cyan' | 'crimson';

interface ThreatRadarProps {
  theme?: ThemeName;
}

const getRadarColors = (t: ThemeName = 'green') => {
  switch (t) {
    case 'cyan':
      return {
        beamStart: 'rgba(0, 240, 255, 0)',
        beamEnd: 'rgba(0, 240, 255, 0.35)',
        accent: '#00F0FF'
      };
    case 'crimson':
      return {
        beamStart: 'rgba(255, 42, 85, 0)',
        beamEnd: 'rgba(255, 42, 85, 0.35)',
        accent: '#FF2A55'
      };
    case 'green':
    default:
      return {
        beamStart: 'rgba(0, 255, 102, 0)',
        beamEnd: 'rgba(0, 255, 102, 0.35)',
        accent: '#00FF66'
      };
  }
};

export const ThreatRadar: React.FC<ThreatRadarProps> = ({ theme = 'green' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodePoint | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    let animationId: number;
    const size = 260;
    canvas.width = size;
    canvas.height = size;
    const center = size / 2;
    const radius = size * 0.42;
    const colors = getRadarColors(theme);

    const render = () => {
      ctx.clearRect(0, 0, size, size);

      // Radar Concentric Circles
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      [0.33, 0.66, 1.0].forEach(factor => {
        ctx.beginPath();
        ctx.arc(center, center, radius * factor, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(center - radius, center);
      ctx.lineTo(center + radius, center);
      ctx.moveTo(center, center - radius);
      ctx.lineTo(center, center + radius);
      ctx.stroke();

      // Sweeping Beam
      if (!reducedMotion) {
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(angle);

        const gradient = ctx.createLinearGradient(0, 0, radius, 0);
        gradient.addColorStop(0, colors.beamStart);
        gradient.addColorStop(1, colors.beamEnd);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, -0.4, 0);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = colors.accent;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(radius, 0);
        ctx.stroke();

        ctx.restore();
        angle += 0.035;
      }

      // Draw simulated nodes
      SIMULATED_NODES.forEach(node => {
        const nx = center + (node.x - 0.5) * (radius * 1.6);
        const ny = center + (node.y - 0.5) * (radius * 1.6);

        ctx.fillStyle = node.threatLevel === 'EVALUATING' ? '#f59e0b' : colors.accent;
        ctx.beginPath();
        ctx.arc(nx, ny, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.beginPath();
        ctx.arc(nx, ny, 8, 0, Math.PI * 2);
        ctx.stroke();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [reducedMotion, theme]);

  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '0.5rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          PERIMETER RADAR
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--color-warning)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '0.1rem 0.4rem',
            borderRadius: '2px',
            background: 'rgba(245, 158, 11, 0.08)'
          }}
        >
          [SIMULATED TELEMETRY]
        </span>
      </div>

      <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />

      {/* Node inspect selector buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.75rem', justifyContent: 'center' }}>
        {SIMULATED_NODES.map(node => (
          <button
            key={node.id}
            onClick={() => setSelectedNode(node)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              padding: '0.2rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              background: selectedNode?.id === node.id ? 'var(--accent-dim)' : 'rgba(255, 255, 255, 0.03)',
              border: `1px solid ${selectedNode?.id === node.id ? 'var(--accent)' : 'var(--border-subtle)'}`,
              color: selectedNode?.id === node.id ? 'var(--accent)' : 'var(--text-secondary)'
            }}
          >
            {node.id}
          </button>
        ))}
      </div>

      {selectedNode && (
        <div
          style={{
            marginTop: '0.75rem',
            width: '100%',
            padding: '0.5rem',
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>NODE:</span>
            <span style={{ color: 'var(--accent)' }}>{selectedNode.id}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>INTEGRITY:</span>
            <span style={{ color: 'var(--color-success)' }}>{selectedNode.status}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>THREAT STATUS:</span>
            <span style={{ color: selectedNode.threatLevel === 'EVALUATING' ? 'var(--color-warning)' : 'var(--color-cyan)' }}>
              {selectedNode.threatLevel} (SIMULATED)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
