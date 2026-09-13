import React from 'react';
import { type TerminalEntry } from '../../hooks/useTerminal';

interface TerminalLineProps {
  entry: TerminalEntry;
}

export const TerminalLine: React.FC<TerminalLineProps> = ({ entry }) => {
  const { command, output, timestamp } = entry;

  const getOutputColor = (type: string): string => {
    switch (type) {
      case 'success':
        return 'var(--color-success)';
      case 'warning':
        return 'var(--color-warning)';
      case 'error':
        return 'var(--color-critical)';
      case 'banner':
        return 'var(--accent)';
      case 'table':
        return 'var(--color-cyan)';
      case 'info':
      default:
        return 'var(--text-secondary)';
    }
  };

  const renderContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return content.map((line, idx) => (
        <div key={idx} style={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
          {line}
        </div>
      ));
    }
    return <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{content}</div>;
  };

  return (
    <div style={{ marginBottom: '0.85rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
      {command && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>[{timestamp}]</span>
          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>visitor@mrnobody:~$</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{command}</span>
        </div>
      )}

      <div style={{ color: getOutputColor(output.type), paddingLeft: command ? '1.5rem' : '0' }}>
        {renderContent(output.content)}
      </div>
    </div>
  );
};
