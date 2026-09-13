import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Check, Copy } from 'lucide-react';

export const CinematicContact: React.FC = () => {
  const [btnState, setBtnState] = useState<'idle' | 'initializing' | 'established'>('idle');
  const [copied, setCopied] = useState(false);
  const email = 'mrnobody.anonymous.01@gmail.com';

  const handleMouseEnter = () => {
    if (btnState === 'idle') {
      setBtnState('initializing');
      setTimeout(() => {
        setBtnState('established');
      }, 350);
    }
  };

  const handleMouseLeave = () => {
    // Return to idle after a gentle pause
    setTimeout(() => {
      setBtnState('idle');
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      id="connection"
      style={{
        position: 'relative',
        minHeight: '85vh',
        background: '#05070A', // Section 1: primary background #05070A
        padding: '9rem 2rem 6rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
        {/* Top Minimal Divider */}
        <div
          style={{
            width: '180px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.4), transparent)',
            margin: '0 auto 3.5rem auto'
          }}
        />

        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: '#00E5FF',
            letterSpacing: '0.2em',
            marginBottom: '1.25rem'
          }}
        >
          04 // SECURE TRANSMISSION
        </motion.div>

        {/* Giant Header: CONNECTION REQUESTED (Section 26) */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 7vw, 5.2rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#E8F7FF',
            margin: '0 0 1rem 0'
          }}
        >
          CONNECTION <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #00E5FF 0%, #7C3AED 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            REQUESTED
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
            color: '#7F8C9A',
            letterSpacing: '0.08em',
            marginBottom: '3rem'
          }}
        >
          Ready to connect with Mr. Nobody?
        </motion.p>

        {/* Interactive Magnetic Button: INITIATE CONTACT -> INITIALIZING -> CONNECTION ESTABLISHED */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <a
            href={`mailto:${email}?subject=Initiating%20Cyber%20Connection`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-cursor="TRANSMIT"
            data-magnetic="true"
            className="magnetic-btn"
            style={{
              padding: '1.1rem 3rem',
              borderRadius: '8px',
              background:
                btnState === 'established'
                  ? 'linear-gradient(135deg, #00E5FF, #7C3AED)'
                  : 'rgba(10, 15, 20, 0.85)',
              border: '1px solid rgba(0, 229, 255, 0.5)',
              color: btnState === 'established' ? '#05070A' : '#00E5FF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textDecoration: 'none',
              cursor: 'pointer',
              boxShadow:
                btnState === 'established'
                  ? '0 0 35px rgba(0, 229, 255, 0.45)'
                  : '0 0 20px rgba(0, 229, 255, 0.15)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <Mail size={16} />
            <span>
              {btnState === 'idle' && '[ INITIATE CONTACT ]'}
              {btnState === 'initializing' && 'INITIALIZING...'}
              {btnState === 'established' && 'CONNECTION ESTABLISHED →'}
            </span>
          </a>

          {/* Quick Copy Channel */}
          <button
            onClick={handleCopy}
            data-cursor="COPY"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#7F8C9A',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.76rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.4rem 0.8rem',
              borderRadius: '4px',
              transition: 'color 0.2s ease'
            }}
          >
            {copied ? (
              <>
                <Check size={14} color="#A3FF12" />
                <span style={{ color: '#A3FF12' }}>DISPATCH ADDRESS COPIED</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>{email}</span>
              </>
            )}
          </button>
        </div>

        {/* Bottom Minimal Divider */}
        <div
          style={{
            width: '180px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.4), transparent)',
            margin: '4.5rem auto 0 auto'
          }}
        />
      </div>
    </section>
  );
};
