import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface BlueprintHeroProps {
  onScrollToAbout: () => void;
}

export const BlueprintHero: React.FC<BlueprintHeroProps> = ({ onScrollToAbout }) => {
  const containerRef = useRef<HTMLElement>(null);

  // Subtitle typing state
  const [subtitleText, setSubtitleText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [taglineVisible, setTaglineVisible] = useState(false);

  // Title hover glitch state
  const [titleText, setTitleText] = useState('MR. NOBODY');
  const [isTitleGlitching, setIsTitleGlitching] = useState(false);

  const fullSubtitle = 'ANONYMOUS';

  // Letter by letter typing of "ANONYMOUS"
  useEffect(() => {
    let currentIdx = 0;
    const typingInterval = setInterval(() => {
      if (currentIdx <= fullSubtitle.length) {
        setSubtitleText(fullSubtitle.slice(0, currentIdx));
        currentIdx++;
      } else {
        clearInterval(typingInterval);
        // Blink cursor 3 times then hide
        let blinks = 0;
        const blinkInterval = setInterval(() => {
          blinks++;
          setShowCursor((prev) => !prev);
          if (blinks >= 6) {
            clearInterval(blinkInterval);
            setShowCursor(false);
            // 1-second delay then fade in tagline
            setTimeout(() => setTaglineVisible(true), 1000);
          }
        }, 300);
      }
    }, 120);

    return () => clearInterval(typingInterval);
  }, []);

  // Title hover glitch scramble (!@#$%^)
  const handleTitleHover = () => {
    if (isTitleGlitching) return;
    setIsTitleGlitching(true);
    const symbols = '!@#$%^&*<>[]{}';
    const original = 'MR. NOBODY';
    let count = 0;

    const interval = setInterval(() => {
      count++;
      const scrambled = original
        .split('')
        .map((c) => (c === ' ' ? ' ' : symbols[Math.floor(Math.random() * symbols.length)]))
        .join('');
      setTitleText(scrambled);

      if (count > 6) {
        clearInterval(interval);
        setTitleText(original);
        setIsTitleGlitching(false);
      }
    }, 45);
  };

  // Parallax Dissolve Scroll Trigger (0% - 50% scroll progress)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const mrX = useTransform(scrollYProgress, [0, 0.45], ['0%', '-120%']);
  const nobodyX = useTransform(scrollYProgress, [0, 0.45], ['0%', '120%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const subtitleY = useTransform(scrollYProgress, [0, 0.45], ['0px', '90px']);
  const subtitleRotate = useTransform(scrollYProgress, [0, 0.45], [0, 12]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  const avatarScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.35]);
  const avatarY = useTransform(scrollYProgress, [0, 0.5], ['0px', '-180px']);
  const avatarOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  return (
    <section
      id="home"
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        overflow: 'hidden',
        padding: '2rem'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: 3
        }}
      >
        {/* Top Glitch Avatar / Logo (120px x 120px) */}
        <motion.div
          style={{
            scale: avatarScale,
            y: avatarY,
            opacity: avatarOpacity,
            marginBottom: '2rem'
          }}
        >
          <div className="blueprint-avatar-wrapper" style={{ width: '120px', height: '120px', position: 'relative' }}>
            {/* Double-vision glitch clone 1 (Cyan shifted 3px left) */}
            <div className="avatar-glitch-cyan" aria-hidden="true" />
            {/* Double-vision glitch clone 2 (Magenta shifted 3px right) */}
            <div className="avatar-glitch-magenta" aria-hidden="true" />
            {/* Base Logo */}
            <div className="avatar-base">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="#00f0ff" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M30,35 C30,22 70,22 70,35 C70,48 50,48 50,62" stroke="#e0e0e0" strokeWidth="4" strokeLinecap="round" />
                <circle cx="50" cy="76" r="3.5" fill="#00f0ff" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Main Title: "MR. NOBODY" (Orbitron, 80px, bold, uppercase, letter-spacing: 10px) */}
        <div
          onMouseEnter={handleTitleHover}
          style={{
            fontFamily: 'var(--font-heading, "Orbitron", sans-serif)',
            fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
            fontWeight: 800,
            letterSpacing: '10px',
            color: '#e0e0e0',
            textShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.2rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <motion.span style={{ x: mrX, opacity: titleOpacity, display: 'inline-block' }}>
            {titleText.split(' ')[0] || 'MR.'}
          </motion.span>
          <motion.span style={{ x: nobodyX, opacity: titleOpacity, display: 'inline-block' }}>
            {titleText.split(' ')[1] || 'NOBODY'}
          </motion.span>
        </div>

        {/* Subtitle: "ANONYMOUS" (Share Tech Mono, 24px, letter-spacing: 15px, Electric Cyan) */}
        <motion.div
          style={{
            y: subtitleY,
            rotate: subtitleRotate,
            opacity: subtitleOpacity,
            fontFamily: 'var(--font-tech, "Share Tech Mono", monospace)',
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            letterSpacing: '15px',
            color: '#00f0ff',
            marginTop: '1.25rem',
            textTransform: 'uppercase',
            textShadow: '0 0 12px rgba(0, 240, 255, 0.7)'
          }}
        >
          <span>{subtitleText}</span>
          {showCursor && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.4, repeat: Infinity }}
              style={{ display: 'inline-block', marginLeft: '4px', color: '#00f0ff' }}
            >
              _
            </motion.span>
          )}
        </motion.div>

        {/* Tagline: "> Developer. Creator. Digital Ghost." (Fira Code, 16px, Dim Gray) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={taglineVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-mono, "Fira Code", monospace)',
            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
            color: '#666666',
            marginTop: '1.75rem',
            letterSpacing: '0.04em'
          }}
        >
          &gt; Developer. Creator. Digital Ghost.
        </motion.div>

        {/* Pulsing Downward Chevron CTA */}
        <motion.button
          onClick={onScrollToAbout}
          data-cursor="Scroll"
          className="hero-down-chevron"
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              '0 0 10px rgba(0,240,255,0.3)',
              '0 0 25px rgba(0,240,255,0.7)',
              '0 0 10px rgba(0,240,255,0.3)'
            ]
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            marginTop: '4rem',
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: 'rgba(10, 10, 10, 0.8)',
            border: '1px solid #00f0ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#00f0ff',
            transition: 'color 0.25s, border-color 0.25s'
          }}
        >
          <ChevronDown size={22} strokeWidth={2} />
        </motion.button>
      </div>

      <style>{`
        .blueprint-avatar-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .avatar-base {
          position: relative;
          z-index: 3;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(17, 17, 17, 0.7);
          border: 1.5px solid rgba(0, 240, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.25);
        }
        .avatar-glitch-cyan,
        .avatar-glitch-magenta {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
        }
        .avatar-glitch-cyan {
          border: 1.5px solid #00f0ff;
          transform: translate(-3px, 0);
          animation: doubleVisionCyan 4.5s infinite;
        }
        .avatar-glitch-magenta {
          border: 1.5px solid #ff006e;
          transform: translate(3px, 0);
          animation: doubleVisionMagenta 4.5s infinite;
        }
        @keyframes doubleVisionCyan {
          0%, 92%, 100% { opacity: 0; transform: translate(0, 0); }
          93% { opacity: 0.8; transform: translate(-3px, 0); }
          95% { opacity: 0; }
          97% { opacity: 0.9; transform: translate(-4px, 1px); }
          99% { opacity: 0; }
        }
        @keyframes doubleVisionMagenta {
          0%, 91%, 100% { opacity: 0; transform: translate(0, 0); }
          94% { opacity: 0.85; transform: translate(3px, 0); }
          96% { opacity: 0; }
          98% { opacity: 0.8; transform: translate(4px, -1px); }
        }
        .hero-down-chevron:hover {
          color: #ff006e !important;
          border-color: #ff006e !important;
          box-shadow: 0 0 25px rgba(255, 0, 110, 0.7) !important;
        }
      `}</style>
    </section>
  );
};
