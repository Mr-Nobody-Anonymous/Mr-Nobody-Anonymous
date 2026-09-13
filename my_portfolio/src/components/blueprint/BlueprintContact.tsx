import React, { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, Check, AlertCircle } from 'lucide-react';
import { EMAIL, GITHUB_URL } from '../../data/portfolio';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const TwitterIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

interface BlueprintContactProps {
  onGlitchEasterEgg?: () => void;
}

export const BlueprintContact: React.FC<BlueprintContactProps> = ({ onGlitchEasterEgg }) => {
  const [orbPos, setOrbPos] = useState({ x: 400, y: 300 });

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // Heavy 2-3s delayed cursor tracking for aurora orbs
  useEffect(() => {
    let targetX = window.innerWidth / 2;
    let targetY = 400;
    let currentX = targetX;
    let currentY = targetY;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const updateOrbs = () => {
      // 0.02 lerp produces an ethereal 2-3 second lag
      currentX += (targetX - currentX) * 0.02;
      currentY += (targetY - currentY) * 0.02;
      setOrbPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(updateOrbs);
    };

    animId = requestAnimationFrame(updateOrbs);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setFormState('sending');

    setTimeout(() => {
      // Open mailto fallback and show success
      const body = `Hi Mr. Nobody,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`;
      window.location.href = `mailto:${EMAIL}?subject=[Contact]%20Transmission&body=${encodeURIComponent(body)}`;
      setFormState('sent');

      setTimeout(() => {
        setName('');
        setEmail('');
        setMessage('');
        setFormState('idle');
      }, 4000);
    }, 1200);
  };

  const contactCards = [
    {
      id: 'email',
      icon: Mail,
      label: 'Email Me',
      color: '#00f0ff',
      link: `mailto:${EMAIL}`
    },
    {
      id: 'github',
      icon: GithubIcon,
      label: 'GitHub',
      color: '#ffffff',
      link: GITHUB_URL
    },
    {
      id: 'twitter',
      icon: TwitterIcon,
      label: 'Twitter / X',
      color: '#1DA1F2',
      link: 'https://twitter.com'
    },
    {
      id: 'discord',
      icon: MessageSquare,
      label: 'Discord',
      color: '#5865F2',
      link: '#'
    }
  ];

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        minHeight: '110vh',
        background: '#0a0a0a',
        padding: '120px 2rem 140px 2rem',
        overflow: 'hidden'
      }}
    >
      {/* Animated Aurora Borealis Gradient Orbs (Lagged Cursor Tracking) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: orbPos.x,
          top: orbPos.y,
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, rgba(180, 0, 255, 0.08) 45%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div
        style={{
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 3,
          textAlign: 'center'
        }}
      >
        {/* Section Tag: < CONTACT /> */}
        <div
          style={{
            fontFamily: 'var(--font-mono, "Fira Code", monospace)',
            fontSize: '14px',
            color: '#00f0ff',
            letterSpacing: '0.1em',
            marginBottom: '0.85rem'
          }}
        >
          &lt; CONTACT /&gt;
        </div>

        {/* Title: LET'S CONNECT (Orbitron 56px with reveal blocks) */}
        <h2
          style={{
            fontFamily: 'var(--font-heading, "Orbitron", sans-serif)',
            fontSize: 'clamp(2.5rem, 6vw, 3.8rem)',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '2px',
            marginBottom: '1rem',
            position: 'relative',
            display: 'inline-block'
          }}
        >
          LET'S CONNECT
        </h2>

        {/* Thin Gradient Center Divider (transparent -> cyan -> transparent) */}
        <div
          style={{
            width: '50%',
            height: '1.5px',
            margin: '0 auto 1.75rem auto',
            background: 'linear-gradient(90deg, transparent 0%, #00f0ff 50%, transparent 100%)',
            boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)'
          }}
        />

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-body, "Inter", sans-serif)',
            fontSize: '18px',
            color: '#888888',
            lineHeight: 1.7,
            maxWidth: '650px',
            margin: '0 auto 3.5rem auto'
          }}
        >
          Have a project in mind? Want to collaborate?<br />
          Or just want to say hello to the void?
        </p>

        {/* 4 Large Interactive 3D Tilt Contact Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4.5rem'
          }}
        >
          {contactCards.map((card) => {
            const IconComponent = card.icon;

            return (
              <motion.a
                key={card.id}
                href={card.link}
                target={card.link.startsWith('http') ? '_blank' : '_self'}
                rel="noreferrer"
                data-cursor="Connect"
                whileHover={{
                  translateY: -8,
                  scale: 1.03
                }}
                className="contact-hud-card"
                style={{
                  background: 'rgba(17, 17, 17, 0.6)',
                  border: '1px solid #222222',
                  borderRadius: '16px',
                  padding: '2.5rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s, box-shadow 0.3s'
                }}
              >
                <div
                  className="contact-card-icon"
                  style={{
                    color: '#ffffff',
                    transition: 'color 0.25s, transform 0.25s'
                  }}
                >
                  <IconComponent size={44} strokeWidth={1.5} />
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-subheading, "Rajdhani")',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#e0e0e0',
                    letterSpacing: '0.05em'
                  }}
                >
                  {card.label}
                </span>
              </motion.a>
            );
          })}
        </div>

        {/* Minimal Terminal Contact Form */}
        <div
          style={{
            maxWidth: '650px',
            margin: '0 auto',
            background: '#0d0d12',
            border: '1px solid #222222',
            borderRadius: '16px',
            padding: '2.5rem',
            textAlign: 'left'
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Field 1: Name */}
            <div style={{ position: 'relative' }}>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="YOUR NAME"
                className="blueprint-input"
              />
            </div>

            {/* Field 2: Email */}
            <div style={{ position: 'relative' }}>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="YOUR EMAIL"
                className="blueprint-input"
              />
            </div>

            {/* Field 3: Message */}
            <div style={{ position: 'relative' }}>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="YOUR MESSAGE..."
                className="blueprint-input"
                style={{ resize: 'vertical' }}
              />
            </div>

            {/* Submit Button: > SEND_MESSAGE */}
            <button
              type="submit"
              disabled={formState === 'sending'}
              data-cursor="Send"
              className={`blueprint-submit-btn ${formState}`}
              style={{
                height: '52px',
                width: '220px',
                background: 'transparent',
                border: formState === 'error' ? '1px solid #ff006e' : '1px solid #00f0ff',
                color: formState === 'error' ? '#ff006e' : '#00f0ff',
                fontFamily: 'var(--font-mono, "Fira Code", monospace)',
                fontSize: '15px',
                letterSpacing: '0.06em',
                cursor: 'pointer',
                borderRadius: '4px',
                position: 'relative',
                overflow: 'hidden',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
            >
              {formState === 'idle' && (
                <>
                  &gt; SEND_MESSAGE <Send size={15} />
                </>
              )}
              {formState === 'sending' && <>&gt; SENDING...</>}
              {formState === 'sent' && (
                <>
                  &gt; SENT <Check size={16} color="#00f0ff" />
                </>
              )}
              {formState === 'error' && (
                <>
                  &gt; ERROR. TRY AGAIN. <AlertCircle size={15} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Easter Egg at very bottom (3% opacity text, triggers screen glitch on hover) */}
        <div
          onMouseEnter={onGlitchEasterEgg}
          className="contact-easter-egg"
          style={{
            marginTop: '5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'rgba(0, 240, 255, 0.05)',
            cursor: 'crosshair',
            userSelect: 'none',
            letterSpacing: '0.12em',
            transition: 'color 0.3s ease'
          }}
        >
          &gt; You found me. Or did you?
        </div>
      </div>

      <style>{`
        .contact-hud-card:hover {
          border-color: #00f0ff !important;
          box-shadow: 0 0 30px rgba(0, 240, 255, 0.4) !important;
        }
        .contact-hud-card:hover .contact-card-icon {
          color: #00f0ff !important;
          transform: scale(1.1);
        }
        .blueprint-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #444444;
          padding: 0.85rem 0;
          color: #e0e0e0;
          font-family: var(--font-body, "Inter", sans-serif);
          font-size: 16px;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .blueprint-input::placeholder {
          color: #555555;
          font-family: var(--font-mono, monospace);
          font-size: 13px;
        }
        .blueprint-input:focus {
          border-bottom-color: #00f0ff;
          box-shadow: 0 3px 15px rgba(0, 240, 255, 0.35);
        }
        .blueprint-submit-btn:hover {
          background: #00f0ff !important;
          color: #0a0a0a !important;
          box-shadow: 0 0 25px rgba(0, 240, 255, 0.7);
        }
        .contact-easter-egg:hover {
          color: #00f0ff !important;
          text-shadow: 0 0 10px #00f0ff;
        }
      `}</style>
    </section>
  );
};
