import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  // Inner dot position (instant)
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });
  // Outer ring position (lerped with smooth lag)
  const ringPos = useRef({ x: -100, y: -100 });
  const [ringRender, setRingRender] = useState({ x: -100, y: -100 });

  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable on touch devices (Section 34)
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setDotPos({ x: mouseX, y: mouseY });
      if (!isVisible) setIsVisible(true);

      // Check cursor target labels
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

    // Magnetic buttons proximity tracker (Section 5: 5-10px maximum movement toward cursor)
    const handleMagneticProximity = (e: MouseEvent) => {
      const magneticElements = document.querySelectorAll<HTMLElement>('[data-magnetic], .magnetic-btn');
      magneticElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.hypot(distX, distY);

        // Within 70px proximity, attract button by 5-10px
        if (distance < 70) {
          const intensity = (1 - distance / 70);
          const pullX = (distX / distance) * 8 * intensity;
          const pullY = (distY / distance) * 8 * intensity;
          el.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
        } else {
          el.style.transform = 'translate3d(0, 0, 0)';
        }
      });
    };

    // Outer ring smooth lag loop
    const updateRing = () => {
      ringPos.current.x += (mouseX - ringPos.current.x) * 0.18;
      ringPos.current.y += (mouseY - ringPos.current.y) * 0.18;
      setRingRender({ x: ringPos.current.x, y: ringPos.current.y });
      animId = requestAnimationFrame(updateRing);
    };

    animId = requestAnimationFrame(updateRing);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousemove', handleMagneticProximity, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousemove', handleMagneticProximity);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* 1. Outer Cyan Ring (○) with subtle delay (Section 4) */}
      <div
        className="cursor-outer-ring"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: `translate3d(${ringRender.x}px, ${ringRender.y}px, 0)`,
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform'
        }}
      >
        <div
          style={{
            transform: 'translate(-50%, -50%)',
            width: cursorText ? '60px' : isHovered ? '38px' : '26px',
            height: cursorText ? '60px' : isHovered ? '38px' : '26px',
            borderRadius: '50%',
            border: '1px solid rgba(0, 229, 255, 0.65)',
            background: cursorText ? 'rgba(0, 229, 255, 0.12)' : isHovered ? 'rgba(0, 229, 255, 0.08)' : 'transparent',
            boxShadow: isHovered ? '0 0 16px rgba(0, 229, 255, 0.35)' : 'none',
            backdropFilter: cursorText ? 'blur(4px)' : 'none',
            WebkitBackdropFilter: cursorText ? 'blur(4px)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00E5FF',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textShadow: '0 0 8px rgba(0, 229, 255, 0.8)',
            transition: 'width 0.22s cubic-bezier(0.16, 1, 0.3, 1), height 0.22s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease, border-color 0.2s ease'
          }}
        >
          {cursorText}
        </div>
      </div>

      {/* 2. Inner Dot (•) with instant position (Section 4) */}
      <div
        className="cursor-inner-dot"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`,
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform'
        }}
      >
        <div
          style={{
            transform: 'translate(-50%, -50%)',
            width: cursorText ? '3px' : '5px',
            height: cursorText ? '3px' : '5px',
            borderRadius: '50%',
            background: '#FFFFFF',
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.9), 0 0 12px rgba(0, 229, 255, 0.8)',
            transition: 'width 0.15s ease, height 0.15s ease'
          }}
        />
      </div>
    </>
  );
};
