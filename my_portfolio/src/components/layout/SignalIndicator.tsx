import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const SignalIndicator: React.FC = () => {
  const [signalText, setSignalText] = useState('87% // UNKNOWN NODE DETECTED');
  const [signalStatus, setSignalStatus] = useState<'detected' | 'analyzing' | 'connected' | 'nominal'>('detected');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

      if (progress < 0.18) {
        setSignalText('87% // NODE DETECTED');
        setSignalStatus('detected');
      } else if (progress < 0.45) {
        setSignalText('94% // SYSTEM ANALYZING');
        setSignalStatus('analyzing');
      } else if (progress < 0.78) {
        setSignalText('100% // LINK ESTABLISHED');
        setSignalStatus('connected');
      } else {
        setSignalText('NOMINAL // FINAL TRANSMISSION');
        setSignalStatus('nominal');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getStatusColor = () => {
    switch (signalStatus) {
      case 'nominal':
      case 'connected':
        return '#A3FF12'; // Acid green
      case 'analyzing':
        return '#00F5FF'; // Cyan
      case 'detected':
      default:
        return '#8B5CF6'; // Violet
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{
        position: 'fixed',
        top: '1.25rem',
        right: '6rem',
        zIndex: 90,
        pointerEvents: 'none'
      }}
      className="signal-indicator-wrapper"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.25rem 0.65rem',
          background: 'rgba(10, 15, 23, 0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          letterSpacing: '0.06em',
          color: 'var(--text-secondary)'
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: getStatusColor(),
            boxShadow: `0 0 8px ${getStatusColor()}`
          }}
        />
        <span>SIGNAL:</span>
        <span style={{ color: getStatusColor(), fontWeight: 600 }}>{signalText}</span>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .signal-indicator-wrapper {
            display: none !important;
          }
        }
      `}</style>
    </motion.div>
  );
};
