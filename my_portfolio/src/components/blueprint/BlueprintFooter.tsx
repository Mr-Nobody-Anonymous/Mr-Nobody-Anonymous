import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { GITHUB_URL, LINKEDIN_URL, EMAIL } from '../../data/portfolio';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FOOTER_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Journey', href: '#experience' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact', href: '#contact' }
];

export const BlueprintFooter: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <div className="footer-brand">
          <span className="footer-mark" aria-hidden="true">BS</span>
          <div>
            <p className="footer-name">Beamlak Sintayehu</p>
            <p className="footer-role">Cybersecurity practitioner · Applied AI</p>
          </div>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          {FOOTER_LINKS.map((link) => (
            <a key={link.label} href={link.href}>{link.label}</a>
          ))}
        </nav>

        <div className="footer-socials">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedinIcon />
          </a>
          <a href={`mailto:${EMAIL}`} aria-label="Email">
            <Mail size={16} strokeWidth={1.7} aria-hidden="true" />
          </a>
          <a href="#home" className="footer-top" aria-label="Back to top">
            <ArrowUp size={15} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="shell footer-columns">
        <p className="footer-copy">
          © {year} Beamlak Sintayehu. Built with React, TypeScript and a healthy
          distrust of defaults.
        </p>
        <p className="footer-note">
          All security work performed with explicit authorisation.
          <span className="footer-signature">Curiosity has a command line.</span>
        </p>
      </div>

      <div className="footer-hairline" aria-hidden="true" />

      <style>{`
        .footer {
          position: relative;
          background: var(--ink-950);
          border-top: 1px solid var(--hairline);
          padding: clamp(3rem, 6vw, 4.5rem) 0 2rem;
          overflow: hidden;
        }

        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .footer-brand { display: flex; align-items: center; gap: 0.8rem; }

        .footer-mark {
          display: grid;
          place-items: center;
          width: 38px; height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(233, 162, 104, 0.35);
          background: rgba(233, 162, 104, 0.06);
          font-family: var(--font-heading);
          font-size: 0.78rem;
          color: var(--ember);
        }
        .footer-name {
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 500;
          letter-spacing: -0.015em;
          color: var(--text-primary);
        }
        .footer-role {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-faint);
          margin-top: 0.2rem;
        }

        .footer-nav { display: flex; flex-wrap: wrap; gap: 1.25rem; }
        .footer-nav a {
          font-size: 0.82rem;
          color: var(--text-muted);
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        .footer-nav a:hover { color: var(--ember); }

        .footer-socials { display: flex; align-items: center; gap: 0.5rem; }
        .footer-socials a {
          display: grid;
          place-items: center;
          width: 34px; height: 34px;
          border-radius: 50%;
          border: 1px solid var(--hairline);
          color: var(--text-muted);
          transition: color var(--transition-fast), border-color var(--transition-fast);
        }
        .footer-socials a:hover { color: var(--ember); border-color: rgba(233, 162, 104, 0.36); }
        .footer-top { margin-left: 0.25rem; }

        .footer-columns {
          margin-top: 2.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--hairline);
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .footer-copy, .footer-note {
          font-size: 0.76rem;
          line-height: 1.6;
          color: var(--text-faint);
        }
        .footer-note { text-align: right; }
        .footer-signature {
          display: block;
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.95rem;
          color: rgba(233, 162, 104, 0.6);
          margin-top: 0.2rem;
        }

        .footer-hairline {
          margin-top: 2rem;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(233, 162, 104, 0.35), transparent);
          opacity: 0.5;
        }

        @media (max-width: 820px) {
          .footer-inner { flex-direction: column; align-items: flex-start; }
          .footer-columns { flex-direction: column; gap: 0.75rem; }
          .footer-note { text-align: left; }
        }
      `}</style>
    </footer>
  );
};
