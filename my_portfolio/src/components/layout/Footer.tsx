import React from 'react';
import { Shield, ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS } from '../../data/socials';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(3, 6, 13, 0.95)',
        padding: '3.5rem 0 2rem',
        marginTop: '6rem',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}
        >
          {/* Identity */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '4px',
                  background: 'var(--accent-dim)',
                  border: '1px solid var(--border-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent)'
                }}
              >
                <Shield size={16} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                MR. NOBODY
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '320px' }}>
              Cybersecurity practitioner, offensive security researcher, and autonomous AI systems builder based on real-world verification.
            </p>
          </div>

          {/* Navigation Quick Links */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              OPERATIONS
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="#about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>&gt; About Mission</a>
              <a href="#skills" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>&gt; Technical Arsenal</a>
              <a href="#terminal" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>&gt; Security Console</a>
              <a href="#projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>&gt; Verified Repositories</a>
            </div>
          </div>

          {/* External Telemetry */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              VERIFIED CHANNELS
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.name}
                  href={s.url}
                  target={s.isEmail ? undefined : '_blank'}
                  rel={s.isEmail ? undefined : 'noopener noreferrer'}
                  style={{
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <ExternalLink size={13} color="var(--accent)" />
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* System Telemetry & Status */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              SYSTEM TELEMETRY
            </h3>
            <div
              style={{
                padding: '1rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>TELEMETRY:</span>
                <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>● NOMINAL</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>ENVIRONMENT:</span>
                <span style={{ color: 'var(--text-primary)' }}>GITHUB PAGES</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>ARCHITECTURE:</span>
                <span style={{ color: 'var(--accent)' }}>REACT + TS + MOTION</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} Bam Sintu (Mr. Nobody). Open-source security research.
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.2rem 0.6rem',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)'
            }}
          >
            <span>BUILT WITH REACT + TYPESCRIPT + MOTION</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
