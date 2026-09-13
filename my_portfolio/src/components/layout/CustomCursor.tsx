import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [ringRender, setRingRender] = useState({ x: -100, y: -100 });
  const [angle, setAngle] = useState(0);
  const [velocity, setVelocity] = useState(0);

  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTextHover, setIsTextHover] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const nextRippleId = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let prevMouseX = -100;
    let prevMouseY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setDotPos({ x: mouseX, y: mouseY });
      if (!isVisible) setIsVisible(true);

      const dx = mouseX - prevMouseX;
      const dy = mouseY - prevMouseY;
      const speed = Math.hypot(dx, dy);
      setVelocity(Math.min(speed / 15, 1.3)); // Stretch factor
      if (speed > 1) {
        setAngle(Math.atan2(dy, dx));
      }

      prevMouseX = mouseX;
      prevMouseY = mouseY;

      // Check cursor targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute('data-cursor'));
        setIsHovered(true);
        setIsTextHover(false);
      } else if (target.closest('button, a, [role="button"], input, textarea')) {
        setCursorText(null);
        setIsHovered(true);
        setIsTextHover(false);
      } else if (target.closest('p, h1, h2, h3, h4, span, li') && !target.closest('button, a')) {
        setCursorText(null);
        setIsHovered(false);
        setIsTextHover(true);
      } else {
        setCursorText(null);
        setIsHovered(false);
        setIsTextHover(false);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      const newRipple = { id: nextRippleId.current++, x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-4), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    const onMouseUp = () => setIsClicked(false);

    // Outer ring smooth lag loop (0.15s lag)
    const updateRing = () => {
      ringPos.current.x += (mouseX - ringPos.current.x) * 0.16;
      ringPos.current.y += (mouseY - ringPos.current.y) * 0.16;
      setRingRender({ x: ringPos.current.x, y: ringPos.current.y });
      animId = requestAnimationFrame(updateRing);
    };

    animId = requestAnimationFrame(updateRing);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Click Ripple Effect */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="cursor-ripple"
          style={{
            position: 'fixed',
            left: r.x,
            top: r.y,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 99997,
            borderRadius: '50%',
            border: '1.5px solid #00f0ff',
            boxShadow: '0 0 12px rgba(0, 240, 255, 0.6)'
          }}
        />
      ))}

      {/* Outer Ring: 30px (expands to 50px on hover, stretches oval on velocity) */}
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
            transform: `translate(-50%, -50%) rotate(${angle}rad) scale(${1 + velocity * 0.25}, ${1 - velocity * 0.15})`,
            width: isClicked ? '16px' : isHovered ? '50px' : '30px',
            height: isClicked ? '16px' : isHovered ? '50px' : '30px',
            borderRadius: '50%',
            border: isTextHover ? 'none' : '1px solid #00f0ff',
            background: isHovered ? 'rgba(0, 240, 255, 0.10)' : 'transparent',
            boxShadow: isHovered ? '0 0 15px rgba(0, 240, 255, 0.4)' : '0 0 8px rgba(0, 240, 255, 0.25)',
            transition: 'width 0.18s ease-out, height 0.18s ease-out, background 0.18s ease-out, border 0.18s ease-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {cursorText && (
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.6rem',
                color: '#00f0ff',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                pointerEvents: 'none'
              }}
            >
              {cursorText}
            </span>
          )}
        </div>
      </div>

      {/* Inner Dot: 8px solid cyan (or I-beam line over selectable text) */}
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
            width: isTextHover ? '2px' : isClicked ? '4px' : '8px',
            height: isTextHover ? '16px' : isClicked ? '4px' : '8px',
            borderRadius: isTextHover ? '1px' : '50%',
            background: '#00f0ff',
            boxShadow: '0 0 10px #00f0ff, 0 0 20px rgba(0, 240, 255, 0.8)',
            transition: 'width 0.12s ease-out, height 0.12s ease-out, border-radius 0.12s ease-out'
          }}
        />
      </div>

      <style>{`
        @keyframes rippleExplode {
          0% {
            width: 8px;
            height: 8px;
            opacity: 1;
          }
          100% {
            width: 90px;
            height: 90px;
            opacity: 0;
          }
        }
        .cursor-ripple {
          animation: rippleExplode 0.55s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};
