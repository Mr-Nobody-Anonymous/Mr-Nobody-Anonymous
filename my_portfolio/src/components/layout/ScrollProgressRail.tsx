import React, { useEffect, useState } from 'react';

interface Chapter {
  id: string;
  label: string;
  num: string;
}

const CHAPTERS: Chapter[] = [
  { id: 'hero', label: 'BOOT', num: '00' },
  { id: 'identity', label: 'IDENTITY', num: '01' },
  { id: 'system-map', label: 'SYSTEM', num: '02' },
  { id: 'cybersecurity', label: 'SECURITY', num: '03' },
  { id: 'intelligence', label: 'AI INTEL', num: '04' },
  { id: 'operations', label: 'OPERATIONS', num: '05' },
  { id: 'philosophy', label: 'MINDSET', num: '06' },
  { id: 'final-transmission', label: 'TRANSMIT', num: '07' }
];

export const ScrollProgressRail: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<string>('hero');
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      setScrollPercent(pct);

      // Determine active chapter by element visibility
      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveChapter(CHAPTERS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Story chapter navigation"
      className="scroll-rail-container"
      style={{
        position: 'fixed',
        right: '1.75rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none'
      }}
    >
      {/* Background Track Line */}
      <div
        style={{
          position: 'absolute',
          top: '8px',
          bottom: '8px',
          width: '1.5px',
          background: 'rgba(255, 255, 255, 0.08)',
          zIndex: 1
        }}
      >
        {/* Dynamic Gradient Fill Line */}
        <div
          style={{
            width: '100%',
            height: `${scrollPercent * 100}%`,
            background: 'linear-gradient(to bottom, #00F5FF, #2563FF, #8B5CF6)',
            boxShadow: '0 0 10px rgba(0, 245, 255, 0.6)',
            transition: 'height 0.1s ease-out'
          }}
        />
      </div>

      {/* Chapter Nodes */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem'
        }}
      >
        {CHAPTERS.map((ch) => {
          const isActive = activeChapter === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => scrollToChapter(ch.id)}
              aria-label={`Jump to chapter ${ch.num} - ${ch.label}`}
              className="scroll-rail-node"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                flexDirection: 'row-reverse',
                padding: '0.2rem',
                color: isActive ? '#00F5FF' : 'rgba(255, 255, 255, 0.35)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                fontWeight: isActive ? 700 : 400,
                letterSpacing: '0.08em',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Dot */}
              <span
                style={{
                  width: isActive ? '9px' : '5px',
                  height: isActive ? '9px' : '5px',
                  borderRadius: '50%',
                  background: isActive ? '#00F5FF' : 'rgba(255, 255, 255, 0.25)',
                  boxShadow: isActive ? '0 0 10px #00F5FF, 0 0 20px rgba(0, 245, 255, 0.5)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              />

              {/* Number Label */}
              <span
                className="scroll-rail-label"
                style={{
                  opacity: isActive ? 1 : 0.45,
                  transform: isActive ? 'scale(1.05)' : 'scale(0.95)',
                  transition: 'all 0.25s ease'
                }}
              >
                {ch.num}
              </span>
            </button>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .scroll-rail-container {
            display: none !important;
          }
        }
        .scroll-rail-node:hover .scroll-rail-label {
          opacity: 1 !important;
          color: #00F5FF !important;
        }
        .scroll-rail-node:hover span:first-of-type {
          background: #00F5FF !important;
          box-shadow: 0 0 8px #00F5FF !important;
        }
      `}</style>
    </nav>
  );
};
