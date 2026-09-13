import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { type ThemeName } from '../../hooks/useTheme';

interface MatrixBackgroundProps {
  theme?: ThemeName;
  opacity?: number;
}

export const MatrixBackground: React.FC<MatrixBackgroundProps> = ({
  theme = 'green',
  opacity = 0.25
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = 0;
    const fpsInterval = 1000 / 30; // 30 FPS cap for efficiency

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const chars = '01ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ98765432';

    const getColors = (t: ThemeName) => {
      switch (t) {
        case 'cyan':
          return { head: '#ffffff', body: '#00f0ff', dim: 'rgba(0, 240, 255, 0.35)' };
        case 'crimson':
          return { head: '#ffffff', body: '#ff2a55', dim: 'rgba(255, 42, 85, 0.35)' };
        case 'green':
        default:
          return { head: '#ffffff', body: '#00ff66', dim: 'rgba(0, 255, 102, 0.35)' };
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newCols = Math.floor(width / fontSize);
      drops.length = newCols;
      drops.fill(1);
    };

    window.addEventListener('resize', handleResize);

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);

      if (document.hidden) return;

      const elapsed = currentTime - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = currentTime - (elapsed % fpsInterval);

      // Semi-transparent background clear for rain trail
      ctx.fillStyle = 'rgba(3, 6, 13, 0.12)';
      ctx.fillRect(0, 0, width, height);

      const colors = getColors(theme);
      ctx.font = `${fontSize}px 'Fira Code', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head character is white, body is theme color
        ctx.fillStyle = Math.random() > 0.85 ? colors.head : colors.body;
        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme, reducedMotion]);

  if (reducedMotion) return null;

  return (
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
        zIndex: 0,
        opacity
      }}
    />
  );
};
