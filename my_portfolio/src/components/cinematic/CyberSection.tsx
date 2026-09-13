import React, { useState } from 'react';
import { motion } from 'motion/react';

interface CyberCard {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  tools: string[];
  animationType: 'slideUp' | 'rotate2' | 'scaleUp' | 'maskReveal' | 'glitch' | 'particleBorder';
  linkProject: string;
}

const CYBER_CARDS: CyberCard[] = [
  {
    id: 'net-sec',
    num: '01',
    title: 'NETWORK SECURITY',
    subtitle: 'PROTOCOL ANALYSIS & PACKET FORENSICS',
    description: 'Understanding how systems communicate across encrypted boundaries — and where subtle protocol oversights create exploitable attack surfaces.',
    tools: ['Wireshark', 'TCP/IP', 'Nmap', 'Suricata'],
    animationType: 'slideUp',
    linkProject: 'cerberus'
  },
  {
    id: 'threat-arch',
    num: '02',
    title: 'THREAT ARCHITECTURE',
    subtitle: 'STRUCTURAL DEFENSE MODELING',
    description: 'Deconstructing infrastructure to model privilege boundaries, credential flows, and cascading risk vectors before unauthorized access can occur.',
    tools: ['STRIDE', 'MITRE ATT&CK', 'Architecture Auditing'],
    animationType: 'rotate2',
    linkProject: 'orion'
  },
  {
    id: 'linux-hard',
    num: '03',
    title: 'LINUX HARDENING',
    subtitle: 'KERNEL & DAEMON INTEGRITY',
    description: 'Configuring immutable filesystems, kernel parameter restrictions, custom systemd isolation, and zero-trust user privileges for high-threat deployments.',
    tools: ['AppArmor', 'SELinux', 'sysctl', 'Auditd'],
    animationType: 'scaleUp',
    linkProject: 'fkali'
  },
  {
    id: 'recon-osint',
    num: '04',
    title: 'OFFENSIVE RECON & OSINT',
    subtitle: 'PERIMETER FINGERPRINTING',
    description: 'Mapping attack perimeters through public intelligence feeds, ASN mapping, passive DNS telemetry, and automated certificate transparency log parsing.',
    tools: ['Shodan', 'Certificate Logs', 'Passive Recon', 'Custom Scrapers'],
    animationType: 'maskReveal',
    linkProject: 'cerberus'
  },
  {
    id: 'crypto-audit',
    num: '05',
    title: 'CRYPTOGRAPHIC PRIMITIVES',
    subtitle: 'CIPHER EVALUATION & RC4 RESEARCH',
    description: 'Analyzing legacy cipher keystream biases, state recovery weaknesses, and modern symmetric/asymmetric cryptographic implementations.',
    tools: ['RC4 Analysis', 'AES-GCM', 'Entropy Testing', 'Python'],
    animationType: 'glitch',
    linkProject: 'rc4'
  },
  {
    id: 'vuln-audit',
    num: '06',
    title: 'VULNERABILITY AUDITING',
    subtitle: 'AUTOMATED CODE & CONFIG REVIEWS',
    description: 'Static analysis and deterministic dynamic scanning pipelines engineered to surface security anomalies in production environments.',
    tools: ['SARIF Reports', 'Semgrep', 'Custom Scanners', 'CI/CD Audits'],
    animationType: 'particleBorder',
    linkProject: 'orion'
  }
];

export const CyberSection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const getAnimationProps = (type: CyberCard['animationType'], index: number) => {
    switch (type) {
      case 'slideUp':
        return {
          initial: { opacity: 0, y: 70 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: index * 0.1 }
        };
      case 'rotate2':
        return {
          initial: { opacity: 0, rotate: -3, y: 40 },
          whileInView: { opacity: 1, rotate: 0, y: 0 },
          transition: { duration: 0.7, delay: index * 0.1 }
        };
      case 'scaleUp':
        return {
          initial: { opacity: 0, scale: 0.88, y: 30 },
          whileInView: { opacity: 1, scale: 1, y: 0 },
          transition: { duration: 0.6, delay: index * 0.1 }
        };
      case 'maskReveal':
        return {
          initial: { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
          whileInView: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' },
          transition: { duration: 0.8, delay: index * 0.1 }
        };
      case 'glitch':
        return {
          initial: { opacity: 0, x: -20 },
          whileInView: { opacity: 1, x: [0, -6, 4, -2, 0] },
          transition: { duration: 0.6, delay: index * 0.1 }
        };
      case 'particleBorder':
      default:
        return {
          initial: { opacity: 0, filter: 'blur(8px)' },
          whileInView: { opacity: 1, filter: 'blur(0px)' },
          transition: { duration: 0.7, delay: index * 0.1 }
        };
    }
  };

  const handleExploreProject = (_projId: string) => {
    const el = document.getElementById('operations');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="cybersecurity"
      style={{
        position: 'relative',
        minHeight: '130vh',
        background: '#05070A',
        padding: '8rem 2rem 6rem 2rem',
        overflow: 'hidden'
      }}
    >
      {/* Background Cyber Ambient Light */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0, 245, 255, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '2rem'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              color: '#00F5FF',
              letterSpacing: '0.2em',
              fontWeight: 600
            }}
          >
            03 / CYBERSECURITY
          </span>
          <div style={{ height: '1px', flex: 1, background: 'rgba(0, 245, 255, 0.2)' }} />
        </motion.div>

        {/* Huge Statements */}
        <div style={{ marginBottom: '5rem' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2.5rem, 7vw, 5.2rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: '#F5F7FA',
              margin: '0 0 0.8rem 0'
            }}
          >
            SECURITY ISN'T <br />
            <span style={{ color: 'rgba(255, 255, 255, 0.35)' }}>A FEATURE.</span>
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2.5rem, 7vw, 5.2rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: '#00F5FF',
              textShadow: '0 0 35px rgba(0, 245, 255, 0.25)',
              margin: 0
            }}
          >
            IT'S A MINDSET.
          </motion.h2>
        </div>

        {/* Varied Motion Capability Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem'
          }}
        >
          {CYBER_CARDS.map((card, idx) => {
            const isHovered = hoveredCard === card.id;
            const anim = getAnimationProps(card.animationType, idx);

            return (
              <motion.div
                key={card.id}
                initial={anim.initial}
                whileInView={anim.whileInView}
                viewport={{ once: true, margin: '-50px' }}
                transition={anim.transition}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                data-cursor="EXPLORE"
                style={{
                  position: 'relative',
                  padding: '2.2rem',
                  borderRadius: '14px',
                  background: isHovered ? 'rgba(10, 15, 23, 0.95)' : 'rgba(10, 15, 23, 0.7)',
                  border: `1px solid ${isHovered ? '#00F5FF' : 'rgba(255, 255, 255, 0.08)'}`,
                  boxShadow: isHovered
                    ? '0 15px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 245, 255, 0.15)'
                    : '0 8px 24px rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, background 0.3s, box-shadow 0.3s'
                }}
                onClick={() => handleExploreProject(card.linkProject)}
              >
                {/* Glowing Travelling Border Gradient on Hover */}
                {isHovered && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '14px',
                      padding: '1px',
                      background: 'linear-gradient(135deg, #00F5FF, #2563FF, #8B5CF6)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                      pointerEvents: 'none'
                    }}
                  />
                )}

                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1.25rem'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.3rem',
                        fontWeight: 700,
                        color: isHovered ? '#00F5FF' : 'rgba(255, 255, 255, 0.3)',
                        transition: 'color 0.25s'
                      }}
                    >
                      {card.num}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.12em',
                        color: '#A3FF12',
                        background: 'rgba(163, 255, 18, 0.08)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px'
                      }}
                    >
                      OPERATIONAL
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      color: '#FFFFFF',
                      margin: '0 0 0.4rem 0'
                    }}
                  >
                    {card.title}
                  </h3>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: '#00F5FF',
                      letterSpacing: '0.08em',
                      marginBottom: '1rem'
                    }}
                  >
                    {card.subtitle}
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      lineHeight: '1.6',
                      color: '#7D8795',
                      margin: '0 0 1.5rem 0'
                    }}
                  >
                    {card.description}
                  </p>
                </div>

                <div>
                  {/* Tool Badges */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.4rem',
                      marginBottom: '1.5rem'
                    }}
                  >
                    {card.tools.map((t, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.66rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '0.2rem 0.5rem',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          borderRadius: '4px',
                          color: '#A0AEC0'
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Explore Button */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: isHovered ? '#00F5FF' : '#7D8795',
                      letterSpacing: '0.1em',
                      transition: 'color 0.25s'
                    }}
                  >
                    <span>EXPLORE CAPABILITY</span>
                    <span style={{ transform: isHovered ? 'translateX(4px)' : 'none', transition: 'transform 0.2s' }}>→</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
