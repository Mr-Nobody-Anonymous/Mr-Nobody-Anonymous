import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch / coarse pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check target or parent for cursor directives
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute('data-cursor'));
        setIsHovered(true);
      } else if (target.closest('button, a, [role="button"]')) {
        setCursorText(null);
        setIsHovered(true);
      } else {
        setCursorText(null);
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      <div
        className="custom-cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          pointerEvents: 'none',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.04s linear, width 0.2s ease, height 0.2s ease, background 0.2s ease, border-color 0.2s ease'
        }}
      >
        <div
          style={{
            transform: 'translate(-50%, -50%)',
            width: cursorText ? '64px' : isHovered ? '36px' : '8px',
            height: cursorText ? '64px' : isHovered ? '36px' : '8px',
            borderRadius: '50%',
            background: cursorText
              ? 'rgba(0, 245, 255, 0.15)'
              : isHovered
              ? 'rgba(0, 245, 255, 0.2)'
              : '#00F5FF',
            border: cursorText || isHovered
              ? '1px solid rgba(0, 245, 255, 0.7)'
              : 'none',
            backdropFilter: cursorText ? 'blur(6px)' : 'none',
            WebkitBackdropFilter: cursorText ? 'blur(6px)' : 'none',
            boxShadow: isHovered
              ? '0 0 15px rgba(0, 245, 255, 0.4), inset 0 0 10px rgba(0, 245, 255, 0.2)'
              : '0 0 8px rgba(0, 245, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00F5FF',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textAlign: 'center',
            textShadow: '0 0 6px rgba(0, 245, 255, 0.8)',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {cursorText && (
            <span style={{ transform: 'translateY(-1px)' }}>
              {cursorText}
            </span>
          )}
        </div>
      </div>

      <style>{`
        @media (pointer: coarse) {
          .custom-cursor-dot {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
