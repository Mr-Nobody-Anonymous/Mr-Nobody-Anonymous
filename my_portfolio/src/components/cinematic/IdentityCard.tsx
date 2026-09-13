import React, { useState } from 'react';
import { motion } from 'motion/react';

export const IdentityCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({
      x: -(y / rect.height) * 12,
      y: (x / rect.width) * 12
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const copyFingerprint = () => {
    navigator.clipboard.writeText('SHA256:7f01a9b2c83d4e5f67890123456789abcdef0123456789abcdef0123456789ab');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="identity"
      style={{
        position: 'relative',
        minHeight: '130vh',
        background: '#05070A',
        padding: '8rem 2rem 6rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background ambient radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0, 245, 255, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ maxWidth: '1000px', width: '100%', margin: '0 auto' }}>
        {/* Chapter Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
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
            01 / IDENTITY
          </span>
          <div style={{ height: '1px', flex: 1, background: 'rgba(0, 245, 255, 0.2)' }} />
        </motion.div>

        {/* Giant Statement */}
        <div style={{ marginBottom: '5rem' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: '#F5F7FA',
              margin: '0 0 1rem 0'
            }}
          >
            I DON'T CHASE <br />
            <span style={{ color: 'rgba(255, 255, 255, 0.35)' }}>THE SYSTEM.</span>
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #00F5FF 0%, #2563FF 50%, #8B5CF6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}
          >
            I UNDERSTAND <br />
            THE SYSTEM.
          </motion.h2>
        </div>

        {/* Minimal Futuristic Identity Card */}
        <div style={{ perspective: 1200, display: 'flex', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            data-cursor="DOSSIER"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '540px',
              padding: '2.5rem',
              borderRadius: '16px',
              background: 'rgba(10, 15, 23, 0.82)',
              border: '1px solid rgba(0, 245, 255, 0.25)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 245, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              transition: 'transform 0.12s ease-out',
              fontFamily: 'var(--font-mono)'
            }}
          >
            {/* Corner Decorative Brackets */}
            <div style={{ position: 'absolute', top: '12px', left: '12px', width: '8px', height: '8px', borderTop: '2px solid #00F5FF', borderLeft: '2px solid #00F5FF' }} />
            <div style={{ position: 'absolute', top: '12px', right: '12px', width: '8px', height: '8px', borderTop: '2px solid #00F5FF', borderRight: '2px solid #00F5FF' }} />
            <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '8px', height: '8px', borderBottom: '2px solid #00F5FF', borderLeft: '2px solid #00F5FF' }} />
            <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '8px', height: '8px', borderBottom: '2px solid #00F5FF', borderRight: '2px solid #00F5FF' }} />

            {/* Top Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '1.25rem',
                marginBottom: '2rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#A3FF12', boxShadow: '0 0 8px #A3FF12' }} />
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: '#A3FF12', fontWeight: 600 }}>IDENTITY DOSSIER</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: '#7D8795', letterSpacing: '0.1em' }}>NODE // 0x4E4F42</span>
            </div>

            {/* Identity Title */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'rgba(0, 245, 255, 0.8)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                OPERATIVE HANDLE
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '2.2rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  margin: '0 0 0.5rem 0'
                }}
              >
                MR. NOBODY
              </h3>
              <div style={{ fontSize: '0.9rem', color: '#00F5FF', letterSpacing: '0.04em' }}>
                Cybersecurity Practitioner <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span> AI Systems Explorer
              </div>
            </div>

            {/* Attributes Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.25rem',
                fontSize: '0.78rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                paddingTop: '1.5rem',
                marginBottom: '1.75rem'
              }}
            >
              <div>
                <span style={{ color: '#7D8795', display: 'block', fontSize: '0.68rem', marginBottom: '0.2rem' }}>STATUS</span>
                <span style={{ color: '#A3FF12', fontWeight: 600 }}>ACTIVE</span>
              </div>
              <div>
                <span style={{ color: '#7D8795', display: 'block', fontSize: '0.68rem', marginBottom: '0.2rem' }}>LOCATION</span>
                <span style={{ color: '#F5F7FA' }}>UNKNOWN // GLOBAL</span>
              </div>
              <div>
                <span style={{ color: '#7D8795', display: 'block', fontSize: '0.68rem', marginBottom: '0.2rem' }}>SPECIALIZATION</span>
                <span style={{ color: '#F5F7FA' }}>SECURITY × AGENTS</span>
              </div>
              <div>
                <span style={{ color: '#7D8795', display: 'block', fontSize: '0.68rem', marginBottom: '0.2rem' }}>THREAT LEVEL</span>
                <span style={{ color: '#00F5FF', fontWeight: 600 }}>███████░░ LOW</span>
              </div>
            </div>

            {/* Cryptographic Verification Hash */}
            <div
              onClick={copyFingerprint}
              style={{
                background: 'rgba(0, 0, 0, 0.45)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '6px',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                fontSize: '0.68rem',
                color: '#7D8795'
              }}
            >
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: '0.75rem' }}>
                <span style={{ color: '#8B5CF6', marginRight: '0.4rem' }}>FINGERPRINT:</span>
                SHA256:7f01a9b2...e91c
              </div>
              <span style={{ color: copied ? '#A3FF12' : '#00F5FF', flexShrink: 0 }}>
                {copied ? '[COPIED]' : '[COPY]'}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
