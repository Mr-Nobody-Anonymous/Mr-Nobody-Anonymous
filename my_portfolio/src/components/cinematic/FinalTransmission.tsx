import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FinalTransmissionProps {
  onRestartSystem: () => void;
}

export const FinalTransmission: React.FC<FinalTransmissionProps> = ({ onRestartSystem }) => {
  const [isShutdown, setIsShutdown] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const email = 'mrnobody.anonymous.01@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleTriggerShutdown = () => {
    setIsShutdown(true);
  };

  const handleReboot = () => {
    sessionStorage.removeItem('mrnobody_boot_seen');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      onRestartSystem();
    }, 500);
  };

  return (
    <section
      id="final-transmission"
      style={{
        position: 'relative',
        minHeight: '120vh',
        background: '#05070A',
        padding: '10rem 2rem 8rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <AnimatePresence>
        {isShutdown ? (
          /* Shutdown State Screen */
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: '#05070A',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              padding: '2rem'
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.03em',
                marginBottom: '1rem'
              }}
            >
              MR. NOBODY
            </h1>

            <div style={{ color: '#7D8795', fontSize: '0.85rem', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
              CONNECTION CLOSED.
            </div>
            <div style={{ color: '#00F5FF', fontSize: '0.8rem', letterSpacing: '0.2em', marginBottom: '3rem' }}>
              ...
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReboot}
              data-cursor="REBOOT"
              style={{
                padding: '0.85rem 2.2rem',
                background: 'rgba(0, 245, 255, 0.1)',
                border: '1px solid #00F5FF',
                borderRadius: '6px',
                color: '#00F5FF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                cursor: 'pointer',
                boxShadow: '0 0 25px rgba(0, 245, 255, 0.25)'
              }}
            >
              [ RESTART SYSTEM ]
            </motion.button>
          </motion.div>
        ) : (
          /* Normal Final Transmission View */
          <div style={{ maxWidth: '900px', width: '100%', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
            {/* Header Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.35rem 1rem',
                borderRadius: '20px',
                background: 'rgba(163, 255, 18, 0.08)',
                border: '1px solid rgba(163, 255, 18, 0.25)',
                marginBottom: '2.5rem'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A3FF12', boxShadow: '0 0 8px #A3FF12' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#A3FF12', letterSpacing: '0.15em' }}>
                07 // FINAL TRANSMISSION
              </span>
            </motion.div>

            {/* Giant Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2.8rem, 7.5vw, 5.5rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                color: '#F5F7FA',
                margin: '0 0 1rem 0'
              }}
            >
              THE SYSTEM <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #00F5FF 0%, #2563FF 50%, #8B5CF6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                IS STILL RUNNING.
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: '#7D8795',
                letterSpacing: '0.12em',
                marginBottom: '3rem'
              }}
            >
              ESTABLISH CONNECTION // OPEN CHANNELS
            </motion.div>

            {/* Main Action Button */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
              <a
                href={`mailto:${email}?subject=Initiating%20System%20Connection`}
                data-cursor="CONNECT"
                style={{
                  padding: '1rem 2.5rem',
                  background: 'linear-gradient(135deg, #00F5FF, #2563FF)',
                  borderRadius: '8px',
                  color: '#05070A',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                  boxShadow: '0 0 30px rgba(0, 245, 255, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem'
                }}
              >
                <span>LET'S BUILD SOMETHING</span>
                <span>→</span>
              </a>

              <button
                onClick={handleCopyEmail}
                data-cursor="COPY"
                style={{
                  padding: '1rem 1.8rem',
                  background: 'rgba(10, 15, 23, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  color: copiedEmail ? '#A3FF12' : '#F5F7FA',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {copiedEmail ? '[ EMAIL COPIED ]' : '[ COPY TRANSMISSION ADDR ]'}
              </button>
            </div>

            {/* Verified Communication Vectors */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2.5rem',
                flexWrap: 'wrap',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                marginBottom: '4.5rem'
              }}
            >
              <a
                href="https://github.com/Mr-Nobody-Anonymous"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="GITHUB"
                style={{ color: '#7D8795', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00F5FF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#7D8795')}
              >
                GITHUB // MR-NOBODY-ANONYMOUS ↗
              </a>

              <a
                href="https://www.linkedin.com/in/mr-nobody-4663a8335"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LINKEDIN"
                style={{ color: '#7D8795', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00F5FF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#7D8795')}
              >
                LINKEDIN // PROFILE ↗
              </a>

              <a
                href={`mailto:${email}`}
                data-cursor="MAIL"
                style={{ color: '#7D8795', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00F5FF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#7D8795')}
              >
                DIRECT ENCRYPTED MAIL ↗
              </a>
            </div>

            {/* Terminal Shutdown Trigger */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '2.5rem' }}>
              <button
                onClick={handleTriggerShutdown}
                data-cursor="SHUTDOWN"
                style={{
                  background: 'transparent',
                  border: '1px dashed rgba(255, 255, 255, 0.15)',
                  borderRadius: '4px',
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FF5F56';
                  e.currentTarget.style.borderColor = '#FF5F56';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                }}
              >
                [ TERMINATE SESSION & CLOSE CONNECTION ]
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
