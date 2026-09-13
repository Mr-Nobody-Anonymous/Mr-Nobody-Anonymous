import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: '#05070A',
        padding: '5rem 2rem 3.5rem 2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: '600px', width: '100%' }}>
        {/* Title (Section 27) */}
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.4rem',
            fontWeight: 800,
            color: '#E8F7FF',
            letterSpacing: '0.08em',
            margin: '0 0 0.4rem 0'
          }}
        >
          MR. NOBODY
        </h3>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '0.78rem',
            color: '#00E5FF',
            letterSpacing: '0.18em',
            marginBottom: '2rem'
          }}
        >
          CYBERSECURITY × AI
        </div>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'rgba(255, 255, 255, 0.08)',
            marginBottom: '2rem'
          }}
        />

        {/* Primary Channels */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2.5rem',
            marginBottom: '2.5rem',
            fontSize: '0.85rem'
          }}
        >
          <a
            href="https://github.com/Mr-Nobody-Anonymous"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="GITHUB"
            style={{
              color: '#CBD5E1',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            className="footer-clean-link"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/bam-sintu"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="LINKEDIN"
            style={{
              color: '#CBD5E1',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            className="footer-clean-link"
          >
            LinkedIn
          </a>
          <a
            href="mailto:mrnobody.anonymous.01@gmail.com"
            data-cursor="EMAIL"
            style={{
              color: '#CBD5E1',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            className="footer-clean-link"
          >
            Email
          </a>
        </div>

        {/* Copyright */}
        <div style={{ fontSize: '0.75rem', color: '#7F8C9A', letterSpacing: '0.06em' }}>
          © 2026 MR. NOBODY. All systems operational.
        </div>
      </div>

      <style>{`
        .footer-clean-link:hover {
          color: #00E5FF !important;
          text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
        }
      `}</style>
    </footer>
  );
};
