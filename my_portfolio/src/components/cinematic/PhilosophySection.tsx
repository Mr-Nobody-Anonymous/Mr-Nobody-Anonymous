import React from 'react';
import { motion } from 'motion/react';

export const PhilosophySection: React.FC = () => {
  return (
    <section
      id="philosophy"
      style={{
        position: 'relative',
        minHeight: '130vh',
        background: '#05070A',
        padding: '10rem 2rem 8rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Expanding Cyan Portal Aura */}
      <motion.div
        initial={{ scale: 0.05, opacity: 0 }}
        whileInView={{ scale: [0.05, 1.2, 1], opacity: [0, 0.4, 0.18] }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '750px',
          height: '750px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #00F5FF 0%, rgba(37, 99, 255, 0.4) 45%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(40px)'
        }}
      />

      <div style={{ maxWidth: '950px', width: '100%', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        {/* Chapter Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.35rem 1rem',
            borderRadius: '20px',
            background: 'rgba(0, 245, 255, 0.08)',
            border: '1px solid rgba(0, 245, 255, 0.25)',
            marginBottom: '3rem'
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00F5FF', boxShadow: '0 0 8px #00F5FF' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#00F5FF', letterSpacing: '0.18em' }}>
            06 // BEYOND THE CODE
          </span>
        </motion.div>

        {/* Huge Human Statement */}
        <div style={{ marginBottom: '4.5rem' }}>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2.5rem, 7.5vw, 5.8rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: '#F5F7FA',
              margin: '0 0 1.5rem 0'
            }}
          >
            TECHNOLOGY <br />
            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>ISN'T THE GOAL.</span>
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2.5rem, 7.5vw, 5.8rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #00F5FF 0%, #2563FF 50%, #8B5CF6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}
          >
            UNDERSTANDING IS.
          </motion.h2>
        </div>

        {/* 3 Core Philosophical Tenets */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem',
            textAlign: 'left'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              padding: '2rem',
              borderRadius: '12px',
              background: 'rgba(10, 15, 23, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(12px)'
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#00F5FF', marginBottom: '0.75rem' }}>
              01 // EXPLORATION
            </div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.3rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 0.5rem 0' }}>
              Curiosity drives the questions.
            </h4>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#7D8795', lineHeight: '1.6', margin: 0 }}>
              Never treating any abstraction as sacred. Digging into the lowest layers of the stack to observe how reality actually executes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              padding: '2rem',
              borderRadius: '12px',
              background: 'rgba(10, 15, 23, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(12px)'
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#2563FF', marginBottom: '0.75rem' }}>
              02 // RIGOR
            </div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.3rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 0.5rem 0' }}>
              Experimentation finds the answers.
            </h4>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#7D8795', lineHeight: '1.6', margin: 0 }}>
              Hypotheses without empirical verification are mere opinions. We instrument, measure, attack, and validate until truth emerges.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              padding: '2rem',
              borderRadius: '12px',
              background: 'rgba(10, 15, 23, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(12px)'
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#8B5CF6', marginBottom: '0.75rem' }}>
              03 // SYNTHESIS
            </div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.3rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 0.5rem 0' }}>
              Building turns ideas into systems.
            </h4>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#7D8795', lineHeight: '1.6', margin: 0 }}>
              Theory achieves its true value when translated into resilient, working architectures that run reliably in the wild.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
