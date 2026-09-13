import React, { useState } from 'react';
import { Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { ContactForm } from './ContactForm';
import { SOCIAL_LINKS } from '../../data/socials';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  return (
    <section id="contact" style={{ padding: '6rem 0', position: 'relative', zIndex: 2 }}>
      <div className="container">
        <SectionHeading
          moduleCode="/modules/secure-channel"
          title="Establish Communication"
          subtitle="Direct verified transmission channels for security inquiries, vulnerability reports, and engineering collaborations."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Direct Endpoints */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <GlassCard>
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
                  <Mail size={18} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Verified Endpoints
                </h3>
              </div>

              {/* Primary Email */}
              <div
                style={{
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)' }}>
                    PRIMARY SECURE INBOX
                  </span>
                  <button
                    onClick={() => handleCopy('bmx310712@gmail.com')}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      color: copiedEmail === 'bmx310712@gmail.com' ? 'var(--color-success)' : 'var(--text-muted)'
                    }}
                    title="Copy primary email"
                  >
                    {copiedEmail === 'bmx310712@gmail.com' ? (
                      <>
                        <Check size={13} /> COPIED
                      </>
                    ) : (
                      <>
                        <Copy size={13} /> COPY
                      </>
                    )}
                  </button>
                </div>
                <a
                  href="mailto:bmx310712@gmail.com"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontWeight: 500
                  }}
                >
                  bmx310712@gmail.com
                </a>
              </div>

              {/* Secondary Email */}
              <div
                style={{
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    SECONDARY INBOX
                  </span>
                  <button
                    onClick={() => handleCopy('bam310712@gmail.com')}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      color: copiedEmail === 'bam310712@gmail.com' ? 'var(--color-success)' : 'var(--text-muted)'
                    }}
                    title="Copy secondary email"
                  >
                    {copiedEmail === 'bam310712@gmail.com' ? (
                      <>
                        <Check size={13} /> COPIED
                      </>
                    ) : (
                      <>
                        <Copy size={13} /> COPY
                      </>
                    )}
                  </button>
                </div>
                <a
                  href="mailto:bam310712@gmail.com"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontWeight: 500
                  }}
                >
                  bam310712@gmail.com
                </a>
              </div>
            </GlassCard>

            {/* Social Channels Card */}
            <GlassCard>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.06em' }}>
                Operational Channels
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {SOCIAL_LINKS.filter(s => !s.isEmail).map(s => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem'
                    }}
                  >
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{s.name}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent)', fontSize: '0.75rem' }}>
                      CONNECT <ExternalLink size={12} />
                    </span>
                  </a>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Dispatch Composer Form */}
          <GlassCard>
            <ContactForm />
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
