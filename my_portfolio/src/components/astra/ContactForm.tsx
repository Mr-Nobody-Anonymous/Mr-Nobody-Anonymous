import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { EMAIL } from '../../data/portfolio';
import { copyText } from '../../utils/clipboard';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Project collaboration');
  const [message, setMessage] = useState('');
  const [draftReady, setDraftReady] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const body = `Hi Bam,\n\n${message}\n\nFrom: ${name}\nReply to: ${email}`;
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(`[Portfolio] ${subject}`)}&body=${encodeURIComponent(body)}`;

  useEffect(() => {
    if (draftReady) heading.current?.focus({ preventScroll: true });
    else document.getElementById('contact-name')?.focus({ preventScroll: true });
  }, [draftReady]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDraftReady(true);
    window.location.href = mailto;
  }

  async function handleCopy() {
    const success = await copyText(`To: ${EMAIL}\nSubject: ${subject}\n\n${body}`);
    setCopyStatus(success ? 'Message copied' : 'Select the draft below to copy it manually.');
  }

  return (
    <div className="contact-form-content">
      <p className="eyebrow accent">A GOOD CONVERSATION STARTS HERE</p>
      <h2 id="contact-dialog-title" ref={heading} tabIndex={-1}>{draftReady ? 'Your draft is ready.' : "Let's connect."}</h2>
      {draftReady ? (
        <div className="draft-ready">
          <p>Your email app should open with your message. Nothing has been sent yet. Review your draft there, or copy it below.</p>
          <label className="field-label" htmlFor="message-draft">YOUR MESSAGE</label>
          <textarea id="message-draft" className="message-draft" value={body} readOnly rows={8} />
          <a href={mailto} className="button button-primary"><Mail size={16} /> Open email draft <ArrowUpRight size={16} /></a>
          <div className="draft-actions">
            <button onClick={handleCopy} className="text-link">{copyStatus === 'Message copied' ? <Check size={15} /> : <Copy size={15} />} Copy message</button>
            <button onClick={() => setDraftReady(false)} className="text-link">Edit message</button>
          </div>
          <p className="form-status" role="status">{copyStatus}</p>
        </div>
      ) : (
        <>
          <p className="contact-form-intro">An interesting challenge, a collaboration, or a simple hello. I'm listening.</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div>
                <label className="field-label" htmlFor="contact-name">YOUR NAME</label>
                <input id="contact-name" name="name" autoComplete="name" data-autofocus required minLength={2} maxLength={80} value={name} onChange={(event) => setName(event.target.value)} placeholder="What should I call you?" />
              </div>
              <div>
                <label className="field-label" htmlFor="contact-email">YOUR EMAIL</label>
                <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
              </div>
            </div>
            <label className="field-label" htmlFor="contact-subject">WHAT'S ON YOUR MIND?</label>
            <select id="contact-subject" name="subject" value={subject} onChange={(event) => setSubject(event.target.value)}>
              <option>Project collaboration</option>
              <option>Security research</option>
              <option>AI & automation</option>
              <option>Just saying hello</option>
            </select>
            <label className="field-label" htmlFor="contact-message">A LITTLE CONTEXT</label>
            <textarea id="contact-message" name="message" required minLength={10} maxLength={3000} rows={4} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Tell me about your idea, your challenge, or what brought you here." />
            <button className="button button-primary form-submit" type="submit">Create email draft <ArrowUpRight size={17} /></button>
            <p className="form-note">Opens your email app with a prepared draft. Your details are not stored or sent by this website.</p>
          </form>
        </>
      )}
      <div className="contact-direct"><Mail size={14} /><span>Or go direct: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></span></div>
    </div>
  );
}