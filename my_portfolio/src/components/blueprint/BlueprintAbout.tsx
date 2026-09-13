import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TECH_TAGS = ['JavaScript', 'Python', 'Cyber Security', 'Web Dev', 'Anonymity'];

export const BlueprintAbout: React.FC = () => {
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#111111',
        padding: '120px 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Blueprint Grid Pattern Background (pulsing faintly) */}
      <div className="blueprint-grid-overlay" aria-hidden="true" />

      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 3
        }}
      >
        {/* Left Column (Text: 60%) */}
        <div>
          {/* Section Tag: < ABOUT /> */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-mono, "Fira Code", monospace)',
              fontSize: '14px',
              color: '#00f0ff',
              letterSpacing: '0.1em',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>&lt; ABOUT /&gt;</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              style={{ display: 'inline-block', width: '7px', height: '14px', background: '#00f0ff' }}
            />
          </motion.div>

          {/* Heading: WHO IS MR. NOBODY? */}
          <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-heading, "Orbitron", sans-serif)',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                background: 'linear-gradient(135deg, #00f0ff 0%, #b400ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.65rem'
              }}
            >
              {['WHO', 'IS', 'MR.', 'NOBODY?'].map((word, idx) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            {/* Cyan Underline drawing from left to right */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.6, ease: 'easeOut' }}
              style={{
                height: '2px',
                background: 'linear-gradient(90deg, #00f0ff 0%, rgba(0,240,255,0) 90%)',
                marginTop: '0.75rem'
              }}
            />
          </div>

          {/* Body Text (Inter, 17px, line-height 1.8, key phrases in cyan bold) */}
          <div
            style={{
              fontFamily: 'var(--font-body, "Inter", sans-serif)',
              fontSize: '17px',
              lineHeight: 1.8,
              color: '#e0e0e0',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I build things on the internet. Sometimes useful. <span style={{ color: '#00f0ff', fontWeight: 600 }}>Sometimes just because I can.</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              I started with curiosity — a kid poking at code, wondering how screens come alive. <span style={{ color: '#00f0ff', fontWeight: 600 }}>That curiosity never died. It evolved.</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Now I create web experiences, explore the depths of <span style={{ color: '#00f0ff', fontWeight: 600 }}>cybersecurity</span>, and exist somewhere between the visible and the invisible. You can see my work. <span style={{ color: '#00f0ff', fontWeight: 600 }}>But you'll never fully see me.</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.65 }}
              style={{ fontStyle: 'italic', color: '#aaaaaa' }}
            >
              That's the point.
            </motion.p>
          </div>

          {/* Tech Tags: Pill-shaped, cascade reveal, hover fill cyan */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginTop: '2.5rem'
            }}
          >
            {TECH_TAGS.map((tag, idx) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.85, x: -15 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="blueprint-tech-pill"
                data-cursor="Tag"
                style={{
                  padding: '0.45rem 1.1rem',
                  borderRadius: '9999px',
                  border: '1px solid #00f0ff',
                  background: 'transparent',
                  color: '#00f0ff',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.22s ease'
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Right Column (Cyberpunk ID / HUD Visual: 40%) */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div
            className="hud-id-card"
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
            data-cursor="Classified"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              maxWidth: '380px',
              background: '#0e0e12',
              border: '1.5px solid #00f0ff',
              boxShadow: isCardHovered
                ? '0 0 35px rgba(0, 240, 255, 0.45), 0 0 10px rgba(180, 0, 255, 0.3)'
                : '0 0 20px rgba(0, 240, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              transform: isCardHovered ? 'rotate(0deg)' : 'rotate(3deg)',
              transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
            }}
          >
            {/* Scanline overlay */}
            <div className={`scanline-layer ${isCardHovered ? 'animating' : ''}`} />

            {/* Corner Tech Accents */}
            <div style={{ padding: '1.75rem', position: 'relative', zIndex: 3 }}>
              {/* Card Header Bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(0, 240, 255, 0.3)',
                  paddingBottom: '0.75rem',
                  marginBottom: '1.25rem'
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#00f0ff', letterSpacing: '0.1em' }}>
                  SYS.ID // 0x4E4F424F4459
                </span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }} />
              </div>

              {/* Holographic Wireframe Silhouette */}
              <div
                style={{
                  height: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0, 240, 255, 0.03)',
                  border: '1px dashed rgba(0, 240, 255, 0.2)',
                  borderRadius: '4px',
                  position: 'relative',
                  marginBottom: '1.25rem'
                }}
              >
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" style={{ filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.6))' }}>
                  {/* Wireframe head outline */}
                  <polygon points="50,15 75,28 85,55 70,82 50,90 30,82 15,55 25,28" stroke="#00f0ff" strokeWidth="1.5" fill="none" />
                  <polygon points="50,25 68,36 75,55 64,74 50,80 36,74 25,55 32,36" stroke="rgba(0,240,255,0.4)" strokeWidth="1" fill="none" />
                  <line x1="50" y1="15" x2="50" y2="90" stroke="rgba(0,240,255,0.3)" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="15" y1="55" x2="85" y2="55" stroke="rgba(0,240,255,0.3)" strokeWidth="1" strokeDasharray="2 2" />
                  {/* Glowing Eye Visor Line */}
                  <line x1="32" y1="48" x2="68" y2="48" stroke="#00f0ff" strokeWidth="2.5" />
                </svg>

                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: '#666666',
                    marginTop: '0.75rem',
                    letterSpacing: '0.1em'
                  }}
                >
                  &gt; FACE NOT FOUND
                </p>
              </div>

              {/* Data HUD Overlay (reveals on hover) */}
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.8rem',
                  lineHeight: 1.7,
                  color: isCardHovered ? '#00f0ff' : '#666666',
                  transition: 'color 0.3s ease'
                }}
              >
                <div>&gt; IDENTITY: <span style={{ color: isCardHovered ? '#ffffff' : '#888888' }}>CLASSIFIED</span></div>
                <div>&gt; LOCATION: <span style={{ color: isCardHovered ? '#ffffff' : '#888888' }}>UNKNOWN NODE</span></div>
                <div>&gt; STATUS: <span style={{ color: '#00f0ff', fontWeight: 600 }}>ACTIVE</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .blueprint-grid-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(0, 240, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 240, 255, 0.04) 1px, transparent 1px);
          animation: gridPulse 6s ease-in-out infinite;
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.8; }
        }
        .scanline-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%, 
            rgba(0, 240, 255, 0.08) 50%
          );
          background-size: 100% 4px;
          z-index: 2;
          opacity: 0.6;
        }
        .scanline-layer.animating {
          animation: scanlineMove 1.5s linear infinite;
        }
        @keyframes scanlineMove {
          0% { background-position: 0 0; }
          100% { background-position: 0 100px; }
        }
        .blueprint-tech-pill:hover {
          background: #00f0ff !important;
          color: #000000 !important;
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.6);
        }
      `}</style>
    </section>
  );
};
