import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowDownRight, ArrowUp, ArrowUpRight, BrainCircuit, Check, Code2, Copy, Crosshair, Maximize2, Menu, Minus, Pause, Play, Plus, Server, Terminal as TerminalIcon, X } from 'lucide-react';
import ContactForm from './ContactForm';
import Modal from './Modal';
import { Reveal, ScrollStatement } from './MotionPrimitives';
import ProjectDetails from './ProjectDetails';
import Terminal from './Terminal';
import { disciplines, EMAIL, GITHUB_URL, LINKEDIN_URL, projects, type Project, type ProjectCategory } from '../../data/portfolio';
import { copyText } from '../../utils/clipboard';

type Overlay = { type: 'project'; project: Project } | { type: 'contact' } | { type: 'terminal' } | null;

const navigation = [
  { id: 'about', label: 'About' },
  { id: 'arsenal', label: 'Arsenal' },
  { id: 'work', label: 'Work' },
  { id: 'playground', label: 'Playground' },
];

const filters: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'security', label: 'Security' },
  { id: 'ai', label: 'AI & Automation' },
];

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a href="#home" className={`brand ${footer ? 'brand-footer' : ''}`} aria-label="Mr. Nobody, back to top">
      <svg className="brand-mark" width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M10 3H3v7M22 3h7v7M29 22v7h-7M10 29H3v-7" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 23V9l12 14V9" stroke="currentColor" strokeWidth="2.2" />
      </svg>
      <span>MR. NOBODY<span className="accent">.</span></span>
    </a>
  );
}

function SectionLabel({ number, children }: { number: string; children: string }) {
  return <p className="section-label"><span>{number} /</span>{children}</p>;
}

function SystemDiagram({ active, enabled }: { active: number; enabled: boolean }) {
  const icons = [Crosshair, BrainCircuit, Code2, Server];
  const Icon = icons[active];
  const discipline = disciplines[active];

  return (
    <div className="system-diagram" aria-hidden="true">
      <div className="diagram-caption"><span>EXPLORATION MODULE</span><span>0{active + 1}</span></div>
      <svg viewBox="0 0 400 400" fill="none" className="diagram-svg">
        <path d="M200 44v312M44 200h312" stroke="#353638" strokeDasharray="3 7" />
        <circle cx="200" cy="200" r="153" stroke="#2c2e2f" />
        <circle cx="200" cy="200" r="132" stroke="#3c3531" strokeDasharray="2 7" />
        <motion.circle cx="200" cy="200" r="102" stroke="#77513c" strokeWidth="0.75" initial={enabled ? { pathLength: 0 } : false} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8 }} />
        <circle cx="200" cy="200" r="74" stroke="#303234" />
        {Array.from({ length: 32 }, (_, index) => <path key={index} d="M200 41v7" stroke={index % 8 === 0 ? '#ff683b' : '#454648'} strokeWidth={index % 8 === 0 ? 2 : 1} transform={`rotate(${index * 11.25} 200 200)`} />)}
        <path d="M126 126l148 148M274 126L126 274" stroke="#383330" />
        <rect x="159" y="159" width="82" height="82" rx="3" transform="rotate(45 200 200)" fill="#141414" stroke="#6b4938" />
        <motion.g key={active} initial={enabled ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <Icon x={175} y={175} width={50} height={50} stroke="#ff683b" strokeWidth={1.15} />
          <text x="200" y="24" textAnchor="middle">{discipline.nodes[0]}</text>
          <text x="388" y="203" textAnchor="end">{discipline.nodes[1]}</text>
          <text x="200" y="383" textAnchor="middle">{discipline.nodes[2]}</text>
          <text x="12" y="203" textAnchor="start">{discipline.nodes[3]}</text>
        </motion.g>
        <g className={enabled ? 'diagram-orbit' : ''}><circle cx="200" cy="68" r="4" fill="#ff683b" /><circle cx="200" cy="68" r="8" stroke="#ff683b" strokeOpacity="0.3" /></g>
      </svg>
      <div className="diagram-principle"><span />{discipline.principle}</div>
    </div>
  );
}

export default function App() {
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeDiscipline, setActiveDiscipline] = useState(0);
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [motionEnabled, setMotionEnabled] = useState(() => {
    try {
      const stored = localStorage.getItem('nobody-motion');
      return stored ? stored === 'on' : !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  });
  const hero = useRef<HTMLElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const { scrollYProgress: heroProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroProgress, [0, 0.72], [1, 0.12]);
  const visibleProjects = projects.filter((project) => filter === 'all' || project.category === filter);

  const rememberFocus = useCallback(() => {
    const focused = document.activeElement;
    if (focused instanceof HTMLElement && focused !== document.body && !focused.closest('[role="dialog"]')) returnFocus.current = focused;
  }, []);
  const closeOverlay = useCallback(() => setOverlay(null), []);
  const openContact = useCallback(() => { rememberFocus(); setMobileOpen(false); setOverlay({ type: 'contact' }); }, [rememberFocus]);
  const openTerminal = useCallback(() => { rememberFocus(); setMobileOpen(false); setOverlay({ type: 'terminal' }); }, [rememberFocus]);
  const openProject = useCallback((project: Project) => { rememberFocus(); setOverlay({ type: 'project', project }); }, [rememberFocus]);
  const toggleMotion = useCallback(() => setMotionEnabled((previous) => !previous), []);

  useEffect(() => {
    document.documentElement.dataset.motion = motionEnabled ? 'on' : 'off';
    try { localStorage.setItem('nobody-motion', motionEnabled ? 'on' : 'off'); } catch { /* Preferences remain usable without local storage. */ }
  }, [motionEnabled]);

  useEffect(() => {
    const handleKey = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        rememberFocus();
        setMobileOpen(false);
        setOverlay((current) => current?.type === 'terminal' ? null : { type: 'terminal' });
      }
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [rememberFocus]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id);
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    ['home', ...navigation.map((item) => item.id), 'contact'].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (copyStatus === 'idle') return;
    const timeout = window.setTimeout(() => setCopyStatus('idle'), 3500);
    return () => window.clearTimeout(timeout);
  }, [copyStatus]);

  async function copyEmail() {
    const copied = await copyText(EMAIL);
    setCopyStatus(copied ? 'copied' : 'failed');
  }

  const terminalProps = { onOpenProject: openProject, onContact: openContact, onToggleMotion: toggleMotion, motionEnabled };

  return (
    <MotionConfig reducedMotion={motionEnabled ? 'never' : 'always'}>
      <div className="site-shell" inert={overlay ? true : undefined}>
        <a className="skip-link" href="#main">Skip to content</a>
        <motion.div className="scroll-progress" style={{ scaleX: motionEnabled ? smoothProgress : scrollYProgress }} aria-hidden="true" />

        <header className="site-header">
          <div className="container header-inner">
            <Brand />
            <nav className="desktop-nav" aria-label="Main navigation">
              {navigation.map((item) => <a key={item.id} className={`nav-link ${activeSection === item.id ? 'active' : ''}`} href={`#${item.id}`} aria-current={activeSection === item.id ? 'location' : undefined}>{item.label}</a>)}
            </nav>
            <div className="header-actions">
              <button className="terminal-trigger" onClick={openTerminal} aria-label="Open command terminal" title="Open terminal (Ctrl / Cmd + K)"><TerminalIcon size={19} strokeWidth={1.5} /></button>
              <button className="header-contact" onClick={openContact}>LET'S TALK <ArrowUpRight size={14} /></button>
              <button className="menu-toggle" onClick={() => setMobileOpen((previous) => !previous)} aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} aria-controls="mobile-navigation">{mobileOpen ? <X size={23} /> : <Menu size={23} />}</button>
            </div>
          </div>
          <AnimatePresence>
            {mobileOpen && <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="container mobile-nav-inner">{navigation.map((item, index) => <a href={`#${item.id}`} key={item.id} onClick={() => setMobileOpen(false)}><span>0{index + 1}</span>{item.label}<ArrowUpRight size={19} /></a>)}<button onClick={openContact}><span>05</span>Let's connect<ArrowUpRight size={19} /></button></div>
            </motion.nav>}
          </AnimatePresence>
        </header>

        <main id="main" tabIndex={-1}>
          <section className="hero" id="home" ref={hero} aria-labelledby="hero-title">
            <motion.div className="hero-visual" style={{ y: motionEnabled ? heroY : 0 }}>
              <motion.img src={`${import.meta.env.BASE_URL}images/nobody-hero.jpg`} alt="A cinematic anonymous figure in a black technical hood, illuminated by signal-orange light" fetchPriority="high" initial={motionEnabled ? { scale: 1.07, opacity: 0.5 } : false} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }} />
            </motion.div>
            <div className="hero-shade" aria-hidden="true" />
            <div className="container hero-container">
              <motion.div className="hero-copy" style={{ opacity: motionEnabled ? heroOpacity : 1 }}>
                <motion.p className="hero-eyebrow" initial={motionEnabled ? { opacity: 0, y: 10 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}><span />NOT EVERYONE NEEDS TO KNOW YOUR NAME.</motion.p>
                <h1 id="hero-title" aria-label="Mr. Nobody.">
                  <span className="title-line"><motion.span initial={motionEnabled ? { y: '110%' } : false} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}>MR.</motion.span></span>
                  <span className="title-line"><motion.span initial={motionEnabled ? { y: '110%' } : false} animate={{ y: 0 }} transition={{ duration: 0.95, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>NOBODY<span className="accent">.</span></motion.span></span>
                </h1>
                <motion.div initial={motionEnabled ? { opacity: 0, y: 20 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65 }}>
                  <p className="hero-tagline">Breaking systems. Building possibilities.</p>
                  <p className="hero-description">Cybersecurity practitioner & AI systems explorer.<br />A curious mind on the other side of the screen.</p>
                  <div className="hero-ctas">
                    <a className="button button-primary" href="#work">Explore my work <ArrowUpRight size={17} /></a>
                    <a className="button button-text" href="#about">Meet the mind <ArrowDownRight size={17} /></a>
                  </div>
                </motion.div>
              </motion.div>
              <a className="hero-scroll" href="#about"><span className="scroll-line"><ArrowDown size={15} strokeWidth={1.3} /></span><span>SCROLL TO DISCOVER</span></a>
            </div>
          </section>

          <div className="discipline-marquee" aria-label="Ethical hacking, autonomous agents, security research, creative engineering">
            <div className="marquee-track" aria-hidden="true">{[0, 1].map((copy) => <div className="marquee-group" key={copy}>{['ETHICAL HACKING', 'AUTONOMOUS AGENTS', 'SECURITY RESEARCH', 'CREATIVE ENGINEERING'].map((item) => <span key={item}><span className="marquee-star">+</span>{item}</span>)}</div>)}</div>
          </div>

          <section className="section about-section" id="about" aria-labelledby="about-title">
            <div className="container">
              <Reveal enabled={motionEnabled}><SectionLabel number="01">BEHIND THE HANDLE</SectionLabel></Reveal>
              <div className="about-grid">
                <Reveal enabled={motionEnabled}>
                  <h2 id="about-title">Not a name.<br /><span className="muted-heading">A mindset.</span></h2>
                  <div className="about-signature"><span className="signature-line" /><span>THE PERSON. NOT THE PERSONA.</span></div>
                </Reveal>
                <div className="about-story">
                  <ScrollStatement enabled={motionEnabled} />
                  <Reveal enabled={motionEnabled} delay={0.12}>
                    <p className="about-description">I learn by taking things apart. Through security labs, code, and a healthy amount of "what if?", I turn curiosity into tools that make a difference. No inflated titles. Just real work and a relentless drive to get better.</p>
                    <div className="about-foot"><a className="text-link" href={GITHUB_URL} target="_blank" rel="noreferrer">Building in public <ArrowUpRight size={16} /></a><span>STAY CURIOUS. STAY ETHICAL.</span></div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>

          <section className="section arsenal-section" id="arsenal" aria-labelledby="arsenal-title">
            <div className="container">
              <Reveal enabled={motionEnabled}>
                <SectionLabel number="02">THE ARSENAL</SectionLabel>
                <div className="section-heading"><h2 id="arsenal-title">Different tools.<br />Same restless curiosity.</h2><p>A toolkit built through doing, not collecting.<br />Pick a discipline. Look under the hood.</p></div>
              </Reveal>
              <div className="arsenal-grid">
                <Reveal enabled={motionEnabled} className="discipline-list">
                  {disciplines.map((discipline, index) => <div className={`discipline-item ${activeDiscipline === index ? 'is-open' : ''}`} key={discipline.title}>
                    <button className="discipline-button" onClick={() => setActiveDiscipline((previous) => previous === index ? -1 : index)} aria-expanded={activeDiscipline === index} aria-controls={`discipline-${index}`}><span className="discipline-number">0{index + 1}</span><span>{discipline.title}</span>{activeDiscipline === index ? <Minus size={19} strokeWidth={1.5} /> : <Plus size={19} strokeWidth={1.5} />}</button>
                    <AnimatePresence initial={false}>{activeDiscipline === index && <motion.div id={`discipline-${index}`} className="discipline-panel" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}><div className="discipline-panel-inner"><p>{discipline.description}</p><div className="discipline-tools"><span>IN THE TOOLKIT</span><p>{discipline.tools.join(' / ')}</p></div></div></motion.div>}</AnimatePresence>
                  </div>)}
                </Reveal>
                <Reveal enabled={motionEnabled} delay={0.15} className="diagram-container"><SystemDiagram active={Math.max(activeDiscipline, 0)} enabled={motionEnabled} /></Reveal>
              </div>
            </div>
          </section>

          <section className="section work-section" id="work" aria-labelledby="work-title">
            <div className="container">
              <Reveal enabled={motionEnabled}>
                <SectionLabel number="03">SELECTED OPERATIONS</SectionLabel>
                <div className="section-heading work-heading"><h2 id="work-title">Less talk. More build<span className="accent">.</span></h2><a className="text-link" href={`${GITHUB_URL}?tab=repositories`} target="_blank" rel="noreferrer">All repositories <ArrowUpRight size={16} /></a></div>
                <p className="work-intro">Ideas taken out of the notebook and into the real world.</p>
              </Reveal>
              <Reveal enabled={motionEnabled}>
                <div className="project-filters" role="group" aria-label="Filter projects">{filters.map((item) => <button key={item.id} onClick={() => setFilter(item.id)} aria-pressed={filter === item.id} aria-controls="project-grid" className={filter === item.id ? 'selected' : ''}>{item.label}<span>{String(item.id === 'all' ? projects.length : projects.filter((project) => project.category === item.id).length).padStart(2, '0')}</span>{filter === item.id && <motion.span className="filter-underline" layoutId="filter-underline" transition={{ type: 'spring', stiffness: 350, damping: 32 }} />}</button>)}</div>
              </Reveal>
              <p className="sr-only" role="status">Showing {visibleProjects.length} {filter === 'all' ? '' : filter === 'ai' ? 'AI and automation' : 'security'} projects.</p>
              <motion.div className="project-grid" id="project-grid" layout>
                <AnimatePresence mode="popLayout">
                  {visibleProjects.map((project, index) => <motion.button className="project-card" key={project.id} layout initial={motionEnabled ? { opacity: 0, y: 28 } : false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -30px 0px' }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }} onClick={() => openProject(project)} aria-label={`Explore ${project.name} project details`} aria-haspopup="dialog">
                    <span className="project-image"><img src={project.image} alt={project.imageAlt} loading="lazy" /><span className="project-image-reveal"><span>EXPLORE CASE FILE <ArrowUpRight size={15} /></span></span></span>
                    <span className="project-heading"><span className="project-name" role="heading" aria-level={3}>{project.name}</span><span className="project-arrow"><ArrowUpRight size={19} strokeWidth={1.5} /></span></span>
                    <span className="project-category">{project.categoryLabel}</span>
                    <span className="project-description">{project.description}</span>
                  </motion.button>)}
                </AnimatePresence>
              </motion.div>
              <p className="work-footnote"><span /> OPEN SOURCE. OPEN MIND. ALWAYS EVOLVING.</p>
            </div>
          </section>

          <section className="section playground-section" id="playground" aria-labelledby="playground-title">
            <div className="container playground-grid">
              <Reveal enabled={motionEnabled} className="playground-copy">
                <SectionLabel number="04">A DIFFERENT WAY IN</SectionLabel>
                <h2 id="playground-title">For the<br />curious ones<span className="accent">.</span></h2>
                <p>Some people read portfolios.<br />Others would rather run a command.<br />You're welcome either way.</p>
                <button className="text-link terminal-launch" onClick={openTerminal}>Open the terminal <Maximize2 size={14} /></button>
                <span className="terminal-shortcut">OR PRESS CTRL / CMD + K</span>
              </Reveal>
              <Reveal enabled={motionEnabled} delay={0.15}><Terminal {...terminalProps} /></Reveal>
            </div>
          </section>

          <section className="section contact-section" id="contact" aria-labelledby="contact-title">
            <div className="container">
              <Reveal enabled={motionEnabled}><SectionLabel number="05">OPEN A CHANNEL</SectionLabel></Reveal>
              <Reveal enabled={motionEnabled} className="contact-headline">
                <h2 id="contact-title">STAY CURIOUS.<br />LET'S CONNECT.</h2>
                <button className="contact-big-arrow" onClick={openContact} aria-label="Start a conversation"><ArrowUpRight strokeWidth={1} /></button>
              </Reveal>
              <Reveal enabled={motionEnabled} delay={0.12} className="contact-bottom">
                <p>Got a challenge, a wild idea, or just a good question?<br />Let's make something that matters.</p>
                <div className="contact-actions"><button className="button button-dark" onClick={openContact}>Start a conversation <ArrowUpRight size={17} /></button><button className="copy-email" onClick={copyEmail} title="Copy email address">{copyStatus === 'copied' ? <Check size={14} /> : <Copy size={14} />}<span>{copyStatus === 'copied' ? 'Email copied' : EMAIL}</span></button><span className="sr-only" role="status">{copyStatus === 'copied' ? 'Email address copied to clipboard.' : copyStatus === 'failed' ? `Copy unavailable. Email: ${EMAIL}` : ''}</span></div>
              </Reveal>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="container">
            <div className="footer-top"><Brand footer /><div className="footer-socials"><a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a><a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a><a href={`mailto:${EMAIL}`}>Email <ArrowUpRight size={13} /></a></div><a className="back-to-top" href="#home">BACK TO TOP <ArrowUp size={13} /></a></div>
            <div className="footer-bottom"><span>&copy; {new Date().getFullYear()} BAM SINTU / MR. NOBODY</span><span className="footer-philosophy">BUILT WITH CURIOSITY. SECURED BY DESIGN.</span><button className="motion-toggle" onClick={toggleMotion} aria-pressed={!motionEnabled} aria-label="Pause ambient motion" title={motionEnabled ? 'Pause motion' : 'Resume motion'}>{motionEnabled ? <Pause size={11} /> : <Play size={11} />} MOTION {motionEnabled ? 'ON' : 'OFF'}</button></div>
          </div>
        </footer>
      </div>

      <AnimatePresence mode="wait" onExitComplete={() => {
        if (!overlay) requestAnimationFrame(() => {
          const target = returnFocus.current?.isConnected ? returnFocus.current : document.querySelector<HTMLElement>('.brand');
          target?.focus({ preventScroll: true });
        });
      }}>
        {overlay && <Modal key={overlay.type} titleId={overlay.type === 'project' ? 'project-dialog-title' : overlay.type === 'contact' ? 'contact-dialog-title' : 'terminal-dialog-title'} onClose={closeOverlay} className={overlay.type === 'terminal' ? 'terminal-modal' : overlay.type === 'contact' ? 'contact-modal' : 'project-modal'}>
          {overlay.type === 'project' && <ProjectDetails project={overlay.project} />}
          {overlay.type === 'contact' && <ContactForm />}
          {overlay.type === 'terminal' && <><div className="terminal-modal-heading"><p className="eyebrow accent">WELCOME TO THE OTHER SIDE</p><h2 id="terminal-dialog-title">Curiosity has a command line.</h2></div><Terminal {...terminalProps} onExit={closeOverlay} autofocus /><p className="terminal-modal-note">A local portfolio sandbox. No commands run on your device. Press Esc to return.</p></>}
        </Modal>}
      </AnimatePresence>
    </MotionConfig>
  );
}
