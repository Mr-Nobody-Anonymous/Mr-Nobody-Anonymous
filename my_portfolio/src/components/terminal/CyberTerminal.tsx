import React, { useRef, useEffect } from 'react';
import { CornerDownLeft } from 'lucide-react';
import { useTerminal } from '../../hooks/useTerminal';
import { TerminalLine } from './TerminalLine';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';

interface CyberTerminalProps {
  setTheme?: (t: 'green' | 'cyan' | 'crimson') => void;
}

const QUICK_COMMANDS = ['help', 'whoami', 'projects', 'skills', 'status', 'scan', 'clear'];

export const CyberTerminal: React.FC<CyberTerminalProps> = ({ setTheme }) => {
  const {
    history,
    inputVal,
    suggestion,
    handleInputChange,
    handleKeyDown,
    submitCommand
  } = useTerminal(setTheme);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCommand();
  };

  return (
    <section id="terminal" style={{ padding: '5rem 0', position: 'relative', zIndex: 2 }}>
      <div className="container">
        <SectionHeading
          moduleCode="/modules/terminal-console"
          title="Security Console 2.0"
          subtitle="Interactive operational interface. Execute reconnaissance commands, inspect repository architecture, or query simulated telemetry."
        />

        <GlassCard
          onClick={handleContainerClick}
          style={{
            padding: 0,
            overflow: 'hidden',
            border: '1px solid var(--border-panel)',
            maxWidth: '960px',
            margin: '0 auto',
            background: 'rgba(5, 9, 18, 0.95)'
          }}
        >
          {/* Terminal Window Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1.25rem',
              background: 'rgba(11, 18, 35, 0.85)',
              borderBottom: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
              <span
                style={{
                  marginLeft: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)'
                }}
              >
                bash - mrnobody@security-node: ~
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--accent)',
                  background: 'var(--accent-dim)',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '3px'
                }}
              >
                TTY_01: ACTIVE
              </span>
            </div>
          </div>

          {/* Quick Command Chips */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1.25rem',
              background: 'rgba(7, 12, 24, 0.6)',
              borderBottom: '1px solid var(--border-subtle)',
              overflowX: 'auto'
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginRight: '0.3rem', whiteSpace: 'nowrap' }}>
              QUICK:
            </span>
            {QUICK_COMMANDS.map(cmd => (
              <button
                key={cmd}
                onClick={e => {
                  e.stopPropagation();
                  submitCommand(cmd);
                }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  padding: '0.2rem 0.5rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--accent)',
                  whiteSpace: 'nowrap'
                }}
              >
                ${cmd}
              </button>
            ))}
          </div>

          {/* Terminal Screen Buffer */}
          <div
            ref={scrollRef}
            style={{
              height: '380px',
              overflowY: 'auto',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {history.map(entry => (
              <TerminalLine key={entry.id} entry={entry} />
            ))}
          </div>

          {/* Input Line Form */}
          <form
            onSubmit={handleFormSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.85rem 1.25rem',
              borderTop: '1px solid var(--border-subtle)',
              background: 'rgba(7, 12, 24, 0.9)',
              gap: '0.6rem'
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600, fontSize: '0.85rem' }}>
              visitor@mrnobody:~$
            </span>

            <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={e => handleInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help' or command..."
                aria-label="Terminal Input"
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: 'var(--text-primary)'
                }}
              />
              {suggestion && (
                <span
                  style={{
                    position: 'absolute',
                    left: `${inputVal.length * 7.8 + 2}px`,
                    pointerEvents: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.3)'
                  }}
                >
                  {suggestion} [TAB]
                </span>
              )}
            </div>

            <button
              type="submit"
              style={{
                background: 'var(--accent-dim)',
                border: '1px solid var(--border-accent)',
                borderRadius: '4px',
                padding: '0.35rem 0.6rem',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Execute command"
              aria-label="Execute command"
            >
              <CornerDownLeft size={14} />
            </button>
          </form>
        </GlassCard>
      </div>
    </section>
  );
};
