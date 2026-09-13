import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { GlowButton } from '../ui/GlowButton';

export const ContactForm: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    // Open direct mail client
    const mailtoUrl = `mailto:bmx310712@gmail.com?subject=${encodeURIComponent(
      `[SECURITY INQUIRY] ${subject}`
    )}&body=${encodeURIComponent(`From: ${senderEmail}\n\n${message}`)}`;

    window.location.href = mailtoUrl;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          DIRECT TRANSMISSION DISPATCH
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--color-cyan)' }}>
          [MAIL CLIENT INTEGRATION]
        </span>
      </div>

      <div>
        <label
          htmlFor="sender-email"
          style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}
        >
          YOUR IDENTIFIER / EMAIL:
        </label>
        <input
          id="sender-email"
          type="email"
          value={senderEmail}
          onChange={e => setSenderEmail(e.target.value)}
          placeholder="operator@domain.com"
          required
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: 'var(--text-primary)',
            outline: 'none'
          }}
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}
        >
          SUBJECT / INQUIRY VECTOR:
        </label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder="e.g. Threat Intelligence Collaboration / Security Role"
          required
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: 'var(--text-primary)',
            outline: 'none'
          }}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}
        >
          PAYLOAD / MESSAGE BODY:
        </label>
        <textarea
          id="message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Enter message details or project inquiry..."
          rows={5}
          required
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: 'var(--text-primary)',
            outline: 'none',
            resize: 'vertical'
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <GlowButton
          type="submit"
          variant="primary"
          size="md"
          icon={sent ? <Check size={16} /> : <Send size={16} />}
        >
          {sent ? 'DISPATCH LAUNCHED' : 'TRANSMIT MESSAGE'}
        </GlowButton>

        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          * Launches default system email composer
        </span>
      </div>
    </form>
  );
};
