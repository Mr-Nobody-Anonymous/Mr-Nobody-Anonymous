import React, { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Check, AlertCircle, ArrowUpRight } from 'lucide-react';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '../../data/portfolio';

const ease = [0.16, 1, 0.3, 1] as const;

const CHANNELS = [
  {
    id: 'email',
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: Mail
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'in/beamlak-sintayehu',
    href: LINKEDIN_URL,
    icon: ArrowUpRight
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'Mr-Nobody-Anonymous',
    href: GITHUB_URL,
    icon: ArrowUpRight
  },
  {
    id: 'tryhackme',
    label: 'TryHackMe',
    value: 'Mr.nobody.',
    href: 'https://tryhackme.com/p/Mr.nobody.',
    icon: ArrowUpRight
  }
];

interface BlueprintContactProps {
  onGlitchEasterEgg?: () => void;
}

export const BlueprintContact: React.FC<BlueprintContactProps> = ({ onGlitchEasterEgg }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setFormState('sending');

    const body = `Hi Beamlak,\n\n${message}\n\nFrom: ${name || '—'}\nEmail: ${email}`;
    window.setTimeout(() => {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('[Portfolio] Hello')}&body=${encodeURIComponent(body)}`;
      setFormState('sent');
      window.setTimeout(() => {
        setName('');
        setEmail('');
        setMessage('');
        setFormState('idle');
      }, 4200);
    }, 700);
  };

  return (
    <section id="contact" className="section contact">
      <div className="contact-halo" aria-hidden="true" />

      <div className="shell contact-inner">
        <motion.div
          className="contact-copy"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="eyebrow">Contact</p>
          <h2 className="section-title contact-title">
            Let's build something <em>worth defending</em>.
          </h2>
          <p className="lede">
            Open to security assessments, research collaborations and engineering
            work. Tell me what you're building — or what you're worried about.
          </p>

          <ul className="contact-channels">
            {CHANNELS.map((channel) => {
              const Icon = channel.icon;
              return (
                <li key={channel.id}>
                  <a
                    className="contact-channel"
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    <span className="contact-channel-icon" aria-hidden="true">
                      <Icon size={15} strokeWidth={1.7} />
                    </span>
                    <span className="contact-channel-label">{channel.label}</span>
                    <span className="contact-channel-value">{channel.value}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <p className="contact-note">
            Prefer something asynchronous? The console (⌘K) has a{' '}
            <span className="font-mono">contact</span> command.
          </p>
        </motion.div>

        <motion.div
          className="contact-form-panel"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-head">
              <span className="font-mono contact-form-kicker">New message</span>
              <span className="contact-form-dot" aria-hidden="true" />
            </div>

            <label className="contact-field">
              <span>Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
              />
            </label>

            <label className="contact-field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
            </label>

            <label className="contact-field">
              <span>Message</span>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="A sentence or two about the project…"
                required
              />
            </label>

            <button
              type="submit"
              className="btn btn--primary contact-submit"
              disabled={formState === 'sending'}
              data-cursor="Send"
            >
              {formState === 'idle' && (
                <>
                  Send message <Send size={15} strokeWidth={1.8} />
                </>
              )}
              {formState === 'sending' && <>Opening your mail client…</>}
              {formState === 'sent' && (
                <>
                  Message ready <Check size={15} strokeWidth={2} />
                </>
              )}
            </button>

            <p className="contact-form-foot">
              <AlertCircle size={12} strokeWidth={1.8} aria-hidden="true" />
              This opens your mail client — nothing is stored or sent to a server.
            </p>
          </form>
        </motion.div>
      </div>

      <button
        type="button"
        className="contact-easter"
        onMouseEnter={onGlitchEasterEgg}
        onClick={onGlitchEasterEgg}
      >
        You found me. Or did you?
      </button>

      <style>{`
        .contact {
          position: relative;
          background: var(--ink-900);
          border-top: 1px solid var(--hairline);
        }
        .contact-halo {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 50% 45% at 80% 20%, rgba(233, 162, 104, 0.10) 0%, transparent 65%),
            radial-gradient(ellipse 40% 35% at 10% 85%, rgba(159, 216, 228, 0.05) 0%, transparent 70%);
        }

        .contact-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: clamp(2.5rem, 6vw, 5rem);
          align-items: start;
        }

        .contact-title { margin: 0.9rem 0 1.1rem; max-width: 20ch; }
        .contact-copy .lede { margin-bottom: 2.25rem; }

        .contact-channels {
          list-style: none;
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--hairline);
        }
        .contact-channel {
          display: grid;
          grid-template-columns: auto 90px minmax(0, 1fr);
          align-items: center;
          gap: 0.85rem;
          padding: 0.95rem 0.25rem;
          border-bottom: 1px solid var(--hairline);
          text-decoration: none;
          color: inherit;
          transition: color var(--transition-fast), padding-left var(--transition-fast);
        }
        .contact-channel:hover { padding-left: 0.6rem; }
        .contact-channel-icon {
          display: grid;
          place-items: center;
          width: 30px; height: 30px;
          border-radius: 50%;
          border: 1px solid var(--hairline);
          color: var(--text-muted);
          transition: color var(--transition-fast), border-color var(--transition-fast);
        }
        .contact-channel:hover .contact-channel-icon {
          color: var(--ember);
          border-color: rgba(233, 162, 104, 0.4);
        }
        .contact-channel-label {
          font-family: var(--font-mono);
          font-size: 0.64rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-faint);
        }
        .contact-channel-value {
          font-size: 0.9rem;
          color: var(--text-secondary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          transition: color var(--transition-fast);
        }
        .contact-channel:hover .contact-channel-value { color: var(--text-primary); }

        .contact-note {
          margin-top: 1.5rem;
          font-size: 0.82rem;
          color: var(--text-faint);
        }
        .contact-note .font-mono { color: var(--ember); }

        /* ── Form ─────────────────────────────────────────────────── */
        .contact-form-panel {
          padding: clamp(1.5rem, 3vw, 2.25rem);
          border-radius: var(--radius-xl);
          border: 1px solid var(--hairline);
          background:
            linear-gradient(180deg, rgba(237, 232, 223, 0.04) 0%, transparent 55%),
            var(--ink-800);
          box-shadow: var(--shadow-lg);
        }

        .contact-form { display: flex; flex-direction: column; gap: 1.15rem; }
        .contact-form-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--hairline);
          margin-bottom: 0.25rem;
        }
        .contact-form-kicker {
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .contact-form-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--ember);
          box-shadow: 0 0 10px rgba(233, 162, 104, 0.8);
        }

        .contact-field { display: flex; flex-direction: column; gap: 0.45rem; }
        .contact-field span {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-faint);
        }
        .contact-field input,
        .contact-field textarea {
          width: 100%;
          padding: 0.72rem 0.85rem;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(237, 232, 223, 0.1);
          background: rgba(7, 8, 10, 0.55);
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.92rem;
          resize: vertical;
          transition: border-color var(--transition-fast), background var(--transition-fast);
        }
        .contact-field input::placeholder,
        .contact-field textarea::placeholder { color: var(--text-faint); }
        .contact-field input:focus,
        .contact-field textarea:focus {
          outline: none;
          border-color: rgba(233, 162, 104, 0.5);
          background: rgba(7, 8, 10, 0.8);
        }

        .contact-submit { margin-top: 0.35rem; width: 100%; }
        .contact-submit:disabled { opacity: 0.7; cursor: progress; }

        .contact-form-foot {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          line-height: 1.5;
          color: var(--text-faint);
        }

        .contact-easter {
          display: block;
          margin: clamp(3rem, 6vw, 4.5rem) auto 0;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(237, 232, 223, 0.12);
          transition: color var(--transition-smooth);
        }
        .contact-easter:hover { color: rgba(233, 162, 104, 0.65); }

        @media (max-width: 900px) {
          .contact-inner { grid-template-columns: 1fr; }
          .contact-title { max-width: 100%; }
        }
        @media (max-width: 480px) {
          .contact-channel { grid-template-columns: auto minmax(0, 1fr); }
          .contact-channel-label { display: none; }
        }
      `}</style>
    </section>
  );
};
