import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export const AboutSystemCore: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollRot, setScrollRot] = useState(0);

  // Track scroll position to drive 3D network core rotation & expansion (Section 12)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      setScrollRot(progress * Math.PI * 2);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3D Canvas Rotating AI Network Core (Section 12)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const size = 380;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;

    // Generate 3D sphere vertex points
    const pointCount = 36;
    const points: { x: number; y: number; z: number }[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio

    for (let i = 0; i < pointCount; i++) {
      const y = 1 - (i / (pointCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      points.push({ x: x * 105, y: y * 105, z: z * 105 });
    }

    let localAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, size, size);
      localAngle += 0.006;
      const totalAngle = localAngle + scrollRot;

      const cosA = Math.cos(totalAngle);
      const sinA = Math.sin(totalAngle);
      const cosB = Math.cos(totalAngle * 0.5);
      const sinB = Math.sin(totalAngle * 0.5);

      // Project 3D points to 2D
      const projected: { x: number; y: number; z: number }[] = [];
      points.forEach((p) => {
        // Rotate around Y
        const x1 = p.x * cosA - p.z * sinA;
        const z1 = p.x * sinA + p.z * cosA;
        // Rotate around X
        const y1 = p.y * cosB - z1 * sinB;
        const z2 = p.y * sinB + z1 * cosB;

        const fov = 260;
        const scale = fov / (fov + z2);
        projected.push({
          x: cx + x1 * scale,
          y: cy + y1 * scale,
          z: z2
        });
      });

      // Draw connecting lines
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 60) {
            const alpha = (1 - dist / 60) * 0.35;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw glowing nodes
      projected.forEach((p) => {
        const alpha = Math.max(0.2, (p.z + 105) / 210);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx.shadowColor = '#00E5FF';
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      // Central glowing core point
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#00E5FF';
      ctx.shadowBlur = 18;
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [scrollRot]);

  return (
    <section
      id="about-system"
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '120vh',
        background: '#0A0F14', // Section 1: alternating background #0A0F14
        padding: '8rem 2rem 6rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1150px', width: '100%', margin: '0 auto' }}>
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '3.5rem'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: '#00E5FF',
              letterSpacing: '0.2em',
              fontWeight: 600
            }}
          >
            01 // ABOUT THE SYSTEM
          </span>
          <div style={{ height: '1px', flex: 1, background: 'rgba(0, 229, 255, 0.2)' }} />
        </motion.div>

        {/* 2-Column Scene: Text on left, 3D Network Core on right (Section 13) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Line-by-Line Reveal Text (Section 14) */}
          <div>
            <div style={{ marginBottom: '2.5rem' }}>
              {/* Line 1 */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  fontWeight: 700,
                  color: '#E8F7FF',
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                  margin: '0 0 1.25rem 0'
                }}
              >
                <span className="glowing-keyword">Cybersecurity</span> isn't just about defending{' '}
                <span className="glowing-keyword">systems</span>.
              </motion.h2>

              {/* Line 2 */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  fontWeight: 700,
                  color: 'rgba(232, 247, 255, 0.85)',
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                  margin: '0 0 1.25rem 0'
                }}
              >
                It's about understanding how they behave under adversarial conditions.
              </motion.h2>

              {/* Line 3 */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  fontWeight: 700,
                  color: '#7C3AED',
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                  margin: 0
                }}
              >
                It's about finding what others overlook through persistent <span className="glowing-keyword">research</span> and autonomous <span className="glowing-keyword">AI</span>.
              </motion.h2>
            </div>

            {/* Subtle Identity Terminal Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                padding: '1.5rem',
                background: 'rgba(5, 7, 10, 0.85)',
                border: '1px solid rgba(0, 229, 255, 0.18)',
                borderRadius: '10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                lineHeight: 1.7,
                color: '#7F8C9A'
              }}
            >
              <div style={{ color: '#00E5FF', fontWeight: 600, marginBottom: '0.4rem' }}>
                &gt; OPERATIONAL_POSTURE
              </div>
              <div>
                Operating across Linux kernel hardening, autonomous agent telemetry, and perimeter risk modeling. Every vulnerability is a structural lesson; every architecture is an opportunity for resilient synthesis.
              </div>
            </motion.div>
          </div>

          {/* Right Column: Rotating 3D Network Core + Glass Identity Frame (Section 13) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            {/* Glass Container */}
            <div
              style={{
                position: 'relative',
                padding: '2rem',
                borderRadius: '16px',
                background: 'rgba(5, 7, 10, 0.75)',
                border: '1px solid rgba(0, 229, 255, 0.15)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 229, 255, 0.08)',
                backdropFilter: 'blur(16px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              {/* Top Header Tag */}
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: '#7F8C9A'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00E5FF', boxShadow: '0 0 8px #00E5FF' }} />
                  <span style={{ color: '#E8F7FF', fontWeight: 600 }}>3D SYSTEM CORE</span>
                </div>
                <span>NODE // AI_01</span>
              </div>

              {/* 3D Canvas Sphere */}
              <canvas
                ref={canvasRef}
                style={{
                  width: '320px',
                  height: '320px',
                  maxWidth: '100%',
                  cursor: 'grab'
                }}
                data-cursor="ROTATE"
              />

              <div
                style={{
                  marginTop: '1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: '#00E5FF',
                  letterSpacing: '0.12em',
                  textAlign: 'center'
                }}
              >
                AUTONOMOUS NETWORK MESH // SYNCHRONIZED
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .glowing-keyword {
          color: #00E5FF;
          text-shadow: 0 0 16px rgba(0, 229, 255, 0.45);
          transition: text-shadow 0.3s ease;
        }
        .glowing-keyword:hover {
          text-shadow: 0 0 24px rgba(0, 229, 255, 0.8);
        }
      `}</style>
    </section>
  );
};
