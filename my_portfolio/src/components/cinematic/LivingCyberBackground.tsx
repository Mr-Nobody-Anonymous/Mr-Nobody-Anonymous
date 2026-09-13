import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseVx: number;
  baseVy: number;
}

interface FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

export const LivingCyberBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const mousePos = useRef({ x: -1000, y: -1000 });
  const fireworks = useRef<FireworkParticle[]>([]);

  // Lagged mouse tracking for ambient glow
  useEffect(() => {
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleDblClick = (e: MouseEvent) => {
      // Blueprint Easter Egg: Double-click spawns firework burst of cyan/purple particles
      const colors = ['#00f0ff', '#b400ff', '#ff006e', '#ffffff'];
      for (let i = 0; i < 35; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 2;
        fireworks.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 3 + 1,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('dblclick', handleDblClick);

    const updateGlow = () => {
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      if (glowRef.current) {
        const offsetX = ((currentX - window.innerWidth / 2) / (window.innerWidth / 2)) * 25;
        const offsetY = ((currentY - window.innerHeight / 2) / (window.innerHeight / 2)) * 25;
        glowRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }

      animId = requestAnimationFrame(updateGlow);
    };

    animId = requestAnimationFrame(updateGlow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('dblclick', handleDblClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Living digital network canvas with 150px mouse force field repel
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

    const isMobile = width < 768;
    const nodeCount = isMobile ? 50 : 110;
    let nodes: NodeParticle[] = [];

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        const vx = (Math.random() - 0.5) * 0.35;
        const vy = (Math.random() - 0.5) * 0.35;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx,
          vy,
          baseVx: vx,
          baseVy: vy,
          radius: Math.random() * 2 + 0.8,
          alpha: Math.random() * 0.5 + 0.2
        });
      }
    };

    initNodes();

    const maxConnectDist = isMobile ? 85 : 140;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      // Update and draw network nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Force field repel within 150px
        const dx = n.x - mx;
        const dy = n.y - my;
        const dist = Math.hypot(dx, dy);

        if (dist < 150 && dist > 0) {
          const force = (1 - dist / 150) * 3.5;
          n.x += (dx / dist) * force;
          n.y += (dy / dist) * force;
        } else {
          // Slowly restore natural velocity
          n.vx += (n.baseVx - n.vx) * 0.05;
          n.vy += (n.baseVy - n.vy) * 0.05;
          n.x += n.vx;
          n.y += n.vy;
        }

        // Boundary wrap
        if (n.x < 0) n.x = width;
        else if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        else if (n.y > height) n.y = 0;

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${n.alpha})`;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = n.radius > 1.5 ? 6 : 0;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const cdx = n.x - n2.x;
          const cdy = n.y - n2.y;
          const cdist = Math.hypot(cdx, cdy);

          if (cdist < maxConnectDist) {
            const lineAlpha = (1 - cdist / maxConnectDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Render double-click fireworks
      if (fireworks.current.length > 0) {
        for (let i = fireworks.current.length - 1; i >= 0; i--) {
          const p = fireworks.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha *= 0.95;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;

          if (p.alpha < 0.05) {
            fireworks.current.splice(i, 1);
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [reducedMotion]);

  return (
    <div
      className="living-cyber-bg-wrapper"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: '#0a0a0a'
      }}
    >
      {/* 1. Deep Void Black Base with subtle radial vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 40%, #111116 0%, #0a0a0a 75%, #050505 100%)'
        }}
      />

      {/* 2. Lagged Ambient Cyan / Purple Aura */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '15%',
          left: '25%',
          width: '55vw',
          height: '55vw',
          maxWidth: '850px',
          maxHeight: '850px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.07) 0%, rgba(180, 0, 255, 0.04) 45%, transparent 70%)',
          filter: 'blur(75px)',
          willChange: 'transform'
        }}
      />

      {/* 3. Living Network Node Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};
