import React, { useState, useEffect, useRef } from 'react';

interface CinematicStoryHeroProps {
  onExploreClick?: () => void;
  onContactClick?: () => void;
}

export const CinematicStoryHero: React.FC<CinematicStoryHeroProps> = ({
  onExploreClick,
  onContactClick
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [stage, setStage] = useState<number>(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // 5-Second Choreographed Sequence (Section 37)
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 300);  // 0.3s: SYSTEM INITIALIZING
    const t2 = setTimeout(() => setStage(2), 700);  // 0.7s: cyan line
    const t3 = setTimeout(() => setStage(3), 1000); // 1.0s: MR.
    const t4 = setTimeout(() => setStage(4), 1250); // 1.25s: NOBODY
    const t5 = setTimeout(() => setStage(5), 1800); // 1.8s: Subtitle
    const t6 = setTimeout(() => setStage(6), 2300); // 2.3s: CTA buttons
    const t7 = setTimeout(() => setStage(7), 3000); // 3.0s: Scroll to enter

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, []);

  // Scroll tracking for text dispersal (Section 11)
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const totalH = heroRef.current.offsetHeight - window.innerHeight;
      if (totalH <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / totalH));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSystem = () => {
    const el = document.getElementById('about-system');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    if (onExploreClick) onExploreClick();
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('connection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    if (onContactClick) onContactClick();
  };

  // Compute text dispersal metrics (Section 11)
  // Letters spread apart: letter-spacing increases from 0em to 0.45em, word moves up, opacity fades out
  const letterSpacing = `${scrollProgress * 0.45}em`;
  const translateY = -scrollProgress * 140;
  const opacity = Math.max(0, 1 - scrollProgress * 1.5);
  const scale = 1 + scrollProgress * 0.08;

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '160vh', // Extended height for cinematic scroll dispersal
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '18vh',
        overflow: 'hidden',
        background: 'transparent'
      }}
    >
      {/* Pinned / Sticky Content Frame */}
      <div
        style={{
          position: 'sticky',
          top: '15vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
          maxWidth: '1200px',
          padding: '0 2rem',
          transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
          opacity,
          transition: 'transform 0.05s linear, opacity 0.05s linear',
          willChange: 'transform, opacity'
        }}
      >
        {/* Stage 1: System Status (0.3s) */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.3rem 0.9rem',
            borderRadius: '20px',
            background: 'rgba(0, 229, 255, 0.06)',
            border: '1px solid rgba(0, 229, 255, 0.2)',
            marginBottom: '1.75rem',
            opacity: stage >= 1 ? 1 : 0,
            transform: stage >= 1 ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.74rem',
            color: '#00E5FF',
            letterSpacing: '0.16em'
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#A3FF12',
              boxShadow: '0 0 8px #A3FF12',
              animation: 'pulseGlow 2s ease-in-out infinite'
            }}
          />
          <span>SYSTEM STATUS: ONLINE</span>
        </div>

        {/* Stage 2: Cyan Line Accent (0.7s) */}
        <div
          style={{
            width: stage >= 2 ? '120px' : '0px',
            height: '1.5px',
            background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)',
            marginBottom: '2rem',
            transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 0 10px #00E5FF'
          }}
        />

        {/* Stage 3 & 4: Giant Title (MR. NOBODY with NOBODY Dominant) */}
        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--font-heading)',
            lineHeight: 0.92,
            letterSpacing: letterSpacing,
            userSelect: 'none'
          }}
        >
          {/* MR. (1.0s entrance: y: 60px -> 0, blur: 12px -> 0) */}
          <span
            style={{
              display: 'block',
              fontSize: 'clamp(2.5rem, 7vw, 4.8rem)',
              fontWeight: 700,
              color: 'rgba(232, 247, 255, 0.45)',
              opacity: stage >= 3 ? 1 : 0,
              transform: stage >= 3 ? 'translateY(0)' : 'translateY(60px)',
              filter: stage >= 3 ? 'blur(0px)' : 'blur(12px)',
              transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.9s ease'
            }}
          >
            MR.
          </span>

          {/* NOBODY (1.25s entrance: dominant, huge Space Grotesk) */}
          <span
            style={{
              display: 'block',
              fontSize: 'clamp(4.2rem, 15vw, 11rem)',
              fontWeight: 800,
              color: '#E8F7FF',
              textShadow: '0 0 50px rgba(0, 229, 255, 0.25)',
              opacity: stage >= 4 ? 1 : 0,
              transform: stage >= 4 ? 'translateY(0)' : 'translateY(60px)',
              filter: stage >= 4 ? 'blur(0px)' : 'blur(14px)',
              transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1), filter 1s ease'
            }}
          >
            NOBODY
          </span>
        </h1>

        {/* Stage 5: Subtitle (1.8s) */}
        <div
          style={{
            marginTop: '2rem',
            marginBottom: '2.75rem',
            opacity: stage >= 5 ? 1 : 0,
            transform: stage >= 5 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.85rem, 2vw, 1.15rem)',
            color: '#7F8C9A',
            letterSpacing: '0.12em'
          }}
        >
          <span style={{ color: '#00E5FF' }}>Cybersecurity</span>
          <span style={{ margin: '0 0.75rem', color: 'rgba(255, 255, 255, 0.2)' }}>×</span>
          <span style={{ color: '#7C3AED' }}>AI Systems</span>
          <span style={{ margin: '0 0.75rem', color: 'rgba(255, 255, 255, 0.2)' }}>×</span>
          <span style={{ color: '#E8F7FF' }}>Anonymous Operative</span>
        </div>

        {/* Stage 6: Magnetic CTA Buttons (2.3s - Section 5 & 6) */}
        <div
          style={{
            display: 'flex',
            gap: '1.25rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            opacity: stage >= 6 ? 1 : 0,
            transform: stage >= 6 ? 'translateY(0)' : 'translateY(25px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}
        >
          <button
            onClick={handleScrollToSystem}
            data-cursor="EXPLORE"
            data-magnetic="true"
            className="magnetic-btn"
            style={{
              padding: '0.85rem 2rem',
              background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.15) 0%, rgba(124, 58, 237, 0.1) 100%)',
              border: '1px solid rgba(0, 229, 255, 0.5)',
              borderRadius: '8px',
              color: '#00E5FF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              cursor: 'pointer',
              boxShadow: '0 0 25px rgba(0, 229, 255, 0.2)',
              transition: 'all 0.25s ease'
            }}
          >
            [ Explore the System → ]
          </button>

          <button
            onClick={handleScrollToContact}
            data-cursor="CONTACT"
            data-magnetic="true"
            className="magnetic-btn"
            style={{
              padding: '0.85rem 2rem',
              background: 'rgba(10, 15, 20, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              color: '#E8F7FF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            [ Contact Operative ]
          </button>
        </div>

        {/* Stage 7: Scroll to Enter Cue (3.0s) */}
        <div
          style={{
            marginTop: '4rem',
            opacity: stage >= 7 ? (1 - scrollProgress * 2.5) : 0,
            transform: stage >= 7 ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#7F8C9A',
            letterSpacing: '0.2em',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            pointerEvents: 'none'
          }}
        >
          <span>↓ SCROLL TO ENTER</span>
          <div
            style={{
              width: '1px',
              height: '24px',
              background: 'linear-gradient(to bottom, #00E5FF, transparent)',
              animation: 'scrollPulse 2s ease-in-out infinite'
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes scrollPulse {
          0% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(8px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.3; }
        }
      `}</style>
    </section>
  );
};
