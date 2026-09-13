import React from 'react';
import { motion } from 'motion/react';
import { Terminal, ArrowRight, Mail } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { GlowButton } from '../ui/GlowButton';
import { ThreatRadar } from './ThreatRadar';
import { SystemStatus } from './SystemStatus';
import { staggerContainer, fadeUp } from '../../lib/animations';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '6.5rem',
        paddingBottom: '4rem',
        position: 'relative',
        zIndex: 2
      }}
    >
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Mission Brief & Actions */}
          <div>
            {/* Status Label */}
            <motion.div
              variants={fadeUp}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.3rem 0.8rem',
                background: 'var(--accent-dim)',
                border: '1px solid var(--border-accent)',
                borderRadius: '30px',
                marginBottom: '1.25rem'
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  boxShadow: '0 0 10px var(--accent)'
                }}
              />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent)', letterSpacing: '0.08em', fontWeight: 600 }}>
                ● SYSTEM ONLINE // SECURE CHANNEL
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
                color: 'var(--text-primary)'
              }}
            >
              MR. NOBODY
              <span style={{ display: 'block', color: 'var(--accent)', fontSize: '0.6em', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                &lt;BAM SINTU /&gt;
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem',
                fontWeight: 500
              }}
            >
              Cybersecurity Practitioner • Security Researcher • AI Systems Builder
            </motion.div>

            {/* Concise Verified Description */}
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                maxWidth: '560px',
                marginBottom: '2rem'
              }}
            >
              Passionate about threat modeling, penetration testing methodologies, and defensive baseline hardening.
              Actively engineering autonomous AI architectures (ultrone) and real-time computer vision telemetry (Argus)
              grounded in open-source verification.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.85rem',
                marginBottom: '2rem'
              }}
            >
              <GlowButton
                variant="primary"
                size="md"
                onClick={() => scrollTo('projects')}
                icon={<ArrowRight size={16} />}
              >
                VIEW OPERATIONS
              </GlowButton>

              <GlowButton
                variant="secondary"
                size="md"
                onClick={() => scrollTo('terminal')}
                icon={<Terminal size={16} />}
              >
                OPEN TERMINAL
              </GlowButton>

              <GlowButton
                variant="outline"
                size="md"
                asAnchor
                href="https://github.com/Mr-Nobody-Anonymous"
                target="_blank"
                icon={<GithubIcon size={16} />}
              >
                GITHUB
              </GlowButton>

              <GlowButton
                variant="ghost"
                size="md"
                onClick={() => scrollTo('contact')}
                icon={<Mail size={16} />}
              >
                CONTACT
              </GlowButton>
            </motion.div>
          </div>

          {/* Right Column: Telemetry HUD & Threat Radar */}
          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              maxWidth: '480px',
              justifySelf: 'center',
              width: '100%'
            }}
          >
            <ThreatRadar />
            <SystemStatus />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
