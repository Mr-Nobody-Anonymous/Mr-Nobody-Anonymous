import React from 'react';
import { Mail } from 'lucide-react';
import { GITHUB_URL, LINKEDIN_URL, EMAIL } from '../../data/portfolio';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const TwitterIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const BlueprintFooter: React.FC = () => {
  return (
    <footer
      style={{
        position: 'relative',
        background: '#050505',
        padding: '3.5rem 2rem 4rem 2rem',
        overflow: 'hidden',
        borderTop: '1px solid #141414'
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          position: 'relative',
          zIndex: 3
        }}
      >
        {/* Line 1: Built by Mr. Nobody Anonymous (Fira Code, 14px, Dim Gray) */}
        <p
          style={{
            fontFamily: 'var(--font-mono, "Fira Code", monospace)',
            fontSize: '14px',
            color: '#666666',
            letterSpacing: '0.04em'
          }}
        >
          Built by Mr. Nobody Anonymous
        </p>

        {/* Line 2: Copyright notice */}
        <p
          style={{
            fontFamily: 'var(--font-mono, "Fira Code", monospace)',
            fontSize: '12px',
            color: '#333333'
          }}
        >
          &copy; {new Date().getFullYear()} — All rights reserved. Or are they?
        </p>

        {/* Line 3: Social Icons */}
        <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.5rem' }}>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="footer-social-icon github"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
            className="footer-social-icon twitter"
          >
            <TwitterIcon size={18} />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="footer-social-icon linkedin"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Email"
            className="footer-social-icon email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>

      {/* Background Detail: Faint Cyan EKG Heartbeat Line (20% opacity, continuous pulse) */}
      <div
        className="footer-ekg-wrapper"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40px',
          pointerEvents: 'none',
          opacity: 0.25
        }}
      >
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <path
            d="M0,20 L300,20 L320,10 L330,32 L340,5 L350,28 L360,20 L750,20 L770,8 L780,34 L790,4 L800,26 L810,20 L1200,20"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.2"
            className="ekg-path"
          />
        </svg>
      </div>

      <style>{`
        .footer-social-icon {
          color: #666666;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid #1f1f1f;
          transition: all 0.25s ease;
        }
        .footer-social-icon.github:hover {
          color: #ffffff;
          border-color: #ffffff;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
        }
        .footer-social-icon.twitter:hover {
          color: #1da1f2;
          border-color: #1da1f2;
          box-shadow: 0 0 12px rgba(29, 161, 242, 0.5);
        }
        .footer-social-icon.linkedin:hover {
          color: #0077b5;
          border-color: #0077b5;
          box-shadow: 0 0 12px rgba(0, 119, 181, 0.5);
        }
        .footer-social-icon.email:hover {
          color: #00f0ff;
          border-color: #00f0ff;
          box-shadow: 0 0 12px rgba(0, 240, 255, 0.5);
        }
        .ekg-path {
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          animation: ekgPulse 4s linear infinite;
        }
        @keyframes ekgPulse {
          0% { stroke-dashoffset: 1200; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </footer>
  );
};
