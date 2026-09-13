import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

export const LivingCyberBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  // Lagged mouse tracking for giant ambient glow (10-30px lag)
  useEffect(() => {
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const updateGlow = () => {
      // Smooth lerp (lagged movement)
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      if (glowRef.current) {
        // Offset range: 10px to 30px
        const offsetX = ((currentX - window.innerWidth / 2) / (window.innerWidth / 2)) * 25;
        const offsetY = ((currentY - window.innerHeight / 2) / (window.innerHeight / 2)) * 25;
        glowRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }

      animId = requestAnimationFrame(updateGlow);
    };

    animId = requestAnimationFrame(updateGlow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Living digital network canvas
  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    // Node count: scaled for performance
    const isMobile = width < 768;
    const nodeCount = isMobile ? 45 : 95;
    let nodes: NodeParticle[] = [];

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          // Extremely slow velocity (subtle, non-distracting drift)
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          radius: Math.random() * 1.5 + 0.6,
          alpha: Math.random() * 0.45 + 0.15
        });
      }
    };

    initNodes();

    const maxConnectDist = isMobile ? 80 : 130;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw network nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        // Wrap around boundaries smoothly
        if (n.x < 0) n.x = width;
        else if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        else if (n.y > height) n.y = 0;

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${n.alpha})`;
        ctx.fill();

        // Connect nearby nodes with thin digital vectors
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * 0.16;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion]);

  return (
    <>
      {/* 1. Giant Ambient Glow (Cyan + Purple, Lagged Follow - Section 3) */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '20%',
          left: '50%',
          marginLeft: '-450px',
          width: '900px',
          height: '600px',
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform'
        }}
      >
        {/* Soft Cyan Glow */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '15%',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.16) 0%, rgba(0, 229, 255, 0) 70%)',
            filter: 'blur(70px)',
            opacity: 0.85
          }}
        />
        {/* Deep Violet Glow */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            right: '15%',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.14) 0%, rgba(124, 58, 237, 0) 70%)',
            filter: 'blur(80px)',
            opacity: 0.8
          }}
        />
      </div>

      {/* 2. Interactive Spotlight Cursor (Section 33) */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '500px',
          height: '500px',
          marginLeft: '-250px',
          marginTop: '-250px',
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.045) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'transform 0.06s ease-out',
          willChange: 'transform'
        }}
      />

      {/* 3. Living Network Nodes Canvas (Section 2) */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* 4. Subtle Interactive Cyber Grid (Section 32 - Opacity 0.04) */}
      <div
        className="cyber-living-grid"
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.045,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 229, 255, 0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 229, 255, 0.6) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </>
  );
};
