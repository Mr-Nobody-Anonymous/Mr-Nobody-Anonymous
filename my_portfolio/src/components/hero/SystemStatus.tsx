import React from 'react';
import { Activity, ShieldCheck, Cpu, Code2 } from 'lucide-react';

export const SystemStatus: React.FC = () => {
  const metrics = [
    { label: 'SYSTEM POSTURE', value: 'ONLINE', status: 'optimal', icon: <Activity size={16} /> },
    { label: 'THREAT LEVEL', value: 'NOMINAL', status: 'optimal', icon: <ShieldCheck size={16} /> },
    { label: 'ARCHITECTURE', value: 'REACT 19 + TS', status: 'optimal', icon: <Cpu size={16} /> },
    { label: 'INDEXED REPOS', value: '08 PUBLIC', status: 'optimal', icon: <Code2 size={16} /> }
  ];

  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          SYSTEM TELEMETRY HUD
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--color-cyan)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            padding: '0.1rem 0.4rem',
            borderRadius: '2px',
            background: 'rgba(0, 240, 255, 0.08)'
          }}
        >
          [SIMULATION / PORTFOLIO HUD]
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.75rem'
        }}
      >
        {metrics.map((m, idx) => (
          <div
            key={idx}
            style={{
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>
              {m.icon}
              <span>{m.label}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--accent)' }}>
              {m.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
