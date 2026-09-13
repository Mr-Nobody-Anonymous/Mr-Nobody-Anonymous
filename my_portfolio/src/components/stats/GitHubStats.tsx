import React from 'react';
import { Shield, Award, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { GlassCard } from '../ui/GlassCard';
import { GlowButton } from '../ui/GlowButton';
import { SectionHeading } from '../ui/SectionHeading';

export const GitHubStats: React.FC = () => {
  return (
    <section id="about" style={{ padding: '6rem 0', position: 'relative', zIndex: 2 }}>
      <div className="container">
        <SectionHeading
          moduleCode="/modules/identity"
          title="Security Profile & Intelligence"
          subtitle="Grounded in real-world experimentation, CTF challenge solving, and automated software development."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch'
          }}
        >
          {/* Mission & Background Panel */}
          <GlassCard style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--accent-dim)',
                    border: '1px solid var(--border-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent)'
                  }}
                >
                  <Shield size={18} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Core Philosophy
                </h3>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                True defensive capability requires deeply understanding offensive attack chains. Every tool and architecture created in this portfolio emphasizes least privilege, verifiable logic, and resilient automation.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--accent)' }}>▶</span> Threat Modeling & Attack Surface Reduction
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--accent)' }}>▶</span> Real-time Video Telemetry & Anomaly Processing
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--accent)' }}>▶</span> Autonomous Agent Frameworks with Context Isolation
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <GlowButton
                variant="secondary"
                size="sm"
                asAnchor
                href="https://github.com/Mr-Nobody-Anonymous"
                target="_blank"
                icon={<GithubIcon size={15} />}
              >
                OPEN GITHUB PROFILE
              </GlowButton>
            </div>
          </GlassCard>

          {/* Verified External Platforms Panel */}
          <GlassCard style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--accent-dim)',
                    border: '1px solid var(--border-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent)'
                  }}
                >
                  <Award size={18} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Verified Security Profiles
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {/* TryHackMe Card */}
                <a
                  href="https://tryhackme.com/p/Nobody001"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    transition: 'border-color var(--transition-smooth)'
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      TryHackMe
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Handle: Nobody001
                    </div>
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)' }}>
                    VERIFIED <ExternalLink size={13} />
                  </span>
                </a>

                {/* Hack The Box Card */}
                <a
                  href="https://app.hackthebox.com/users/2355243"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    transition: 'border-color var(--transition-smooth)'
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      Hack The Box
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      ID: 2355243
                    </div>
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-cyan)' }}>
                    VERIFIED <ExternalLink size={13} />
                  </span>
                </a>

                {/* GitHub Public Frameworks */}
                <a
                  href="https://github.com/Mr-Nobody-Anonymous?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    transition: 'border-color var(--transition-smooth)'
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      GitHub Open Source
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      8 Repositories Indexed
                    </div>
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)' }}>
                    ACTIVE <ExternalLink size={13} />
                  </span>
                </a>
              </div>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                TELEMETRY: ALL PROFILES INDEPENDENTLY RESOLVABLE
              </span>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
