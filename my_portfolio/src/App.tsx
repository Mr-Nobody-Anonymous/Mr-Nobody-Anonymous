import React, { useState, useEffect } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';

// Global System Elements
import { CinematicBoot } from './components/cinematic/CinematicBoot';
import { LivingCyberBackground } from './components/cinematic/LivingCyberBackground';
import { CustomCursor } from './components/layout/CustomCursor';
import { GrainOverlay } from './components/ui/GrainOverlay';
import { SignalIndicator } from './components/layout/SignalIndicator';

// Blueprint Sections
import { BlueprintNavbar } from './components/blueprint/BlueprintNavbar';
import { BlueprintHero } from './components/blueprint/BlueprintHero';
import { BlueprintAbout } from './components/blueprint/BlueprintAbout';
import { BlueprintSkills } from './components/blueprint/BlueprintSkills';
import { BlueprintProjects } from './components/blueprint/BlueprintProjects';
import { BlueprintTimeline } from './components/blueprint/BlueprintTimeline';
import { BlueprintContact } from './components/blueprint/BlueprintContact';
import { BlueprintFooter } from './components/blueprint/BlueprintFooter';
import { BlueprintGlobalEffects } from './components/blueprint/BlueprintGlobalEffects';

// Modals & Case Details
import Modal from './components/astra/Modal';
import ProjectDetails from './components/astra/ProjectDetails';
import Terminal from './components/astra/Terminal';
import type { Project } from './data/portfolio';

export const App: React.FC = () => {
  const [, setBootDone] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [overlay, setOverlay] = useState<{ type: 'project'; project: Project } | { type: 'terminal' } | null>(null);
  const [screenGlitch, setScreenGlitch] = useState(false);

  // Keyboard shortcut for terminal: Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOverlay((prev) => (prev?.type === 'terminal' ? null : { type: 'terminal' }));
      }
      if (e.key === 'Escape') {
        setOverlay(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleScrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGlitchEasterEgg = () => {
    setScreenGlitch(true);
    setTimeout(() => setScreenGlitch(false), 260);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className={`site-master-wrapper ${screenGlitch ? 'screen-glitch-active' : ''}`}>
        {/* SECTION 0: PRELOADER / INTRO SCREEN */}
        <CinematicBoot onComplete={() => setBootDone(true)} />

        {/* Global Background Particles & Force Field */}
        <LivingCyberBackground />

        {/* Subtle Film Grain Texture */}
        <GrainOverlay opacity={0.035} />

        {/* Global Dual-Ring Custom Cursor */}
        <CustomCursor />

        {/* Telemetry Signal Indicator */}
        <SignalIndicator />

        {/* Global Page-Wide Effects: Micro-Glitches, Konami Code, TV Static Idle, Audio Synth */}
        <BlueprintGlobalEffects soundEnabled={soundEnabled} />

        {/* Navigation Bar: Top Scroll Indicator, Fixed Frosted Nav, Sound Toggle, Mobile Menu */}
        <BlueprintNavbar
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((prev) => !prev)}
        />

        <main id="main-blueprint-content" tabIndex={-1}>
          {/* SECTION 1: HERO / LANDING */}
          <BlueprintHero onScrollToAbout={handleScrollToAbout} />

          {/* SECTION 2: ABOUT ME */}
          <BlueprintAbout />

          {/* SECTION 3: SKILLS & TECHNOLOGIES */}
          <BlueprintSkills />

          {/* SECTION 4: PROJECTS / PORTFOLIO */}
          <BlueprintProjects onOpenCaseFile={(project) => setOverlay({ type: 'project', project })} />

          {/* SECTION 5: EXPERIENCE / JOURNEY TIMELINE */}
          <BlueprintTimeline />

          {/* SECTION 6: CONTACT / GET IN TOUCH */}
          <BlueprintContact onGlitchEasterEgg={handleGlitchEasterEgg} />
        </main>

        {/* SECTION 7: FOOTER */}
        <BlueprintFooter />

        {/* Project Case File & Terminal Overlay Dialogs */}
        <AnimatePresence>
          {overlay && (
            <Modal
              key={overlay.type}
              titleId={overlay.type === 'project' ? 'project-dialog-title' : 'terminal-dialog-title'}
              onClose={() => setOverlay(null)}
              className={overlay.type === 'terminal' ? 'terminal-modal' : 'project-modal'}
            >
              {overlay.type === 'project' && <ProjectDetails project={overlay.project} />}
              {overlay.type === 'terminal' && (
                <>
                  <div className="terminal-modal-heading" style={{ marginBottom: '1.5rem' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#00f0ff', letterSpacing: '0.1em' }}>
                      WELCOME TO THE OTHER SIDE
                    </p>
                    <h2 id="terminal-dialog-title" style={{ fontFamily: 'var(--font-heading)', color: '#ffffff', fontSize: '1.6rem', marginTop: '0.25rem' }}>
                      Curiosity has a command line.
                    </h2>
                  </div>
                  <Terminal
                    onOpenProject={(p) => setOverlay({ type: 'project', project: p })}
                    onContact={() => {
                      setOverlay(null);
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onToggleMotion={() => {}}
                    motionEnabled={true}
                    onExit={() => setOverlay(null)}
                    autofocus
                  />
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#666666', marginTop: '1rem' }}>
                    A local portfolio sandbox. No commands run on your device. Press Esc to return.
                  </p>
                </>
              )}
            </Modal>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .screen-glitch-active {
          animation: pageGlitchShake 0.26s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          filter: invert(0.9) hue-rotate(180deg);
        }
        @keyframes pageGlitchShake {
          0% { transform: translate(0); }
          20% { transform: translate(-3px, 3px); }
          40% { transform: translate(-3px, -3px); }
          60% { transform: translate(3px, 3px); }
          80% { transform: translate(3px, -3px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </MotionConfig>
  );
};

export default App;
