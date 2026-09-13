import React, { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SignalIndicator } from './components/layout/SignalIndicator';
import { ScrollProgressRail } from './components/layout/ScrollProgressRail';
import { CustomCursor } from './components/layout/CustomCursor';
import { GrainOverlay } from './components/ui/GrainOverlay';
import { LivingCyberBackground } from './components/cinematic/LivingCyberBackground';

// All Narrative Chapters (In Full Use)
import { CinematicBoot } from './components/cinematic/CinematicBoot';
import { ParticleHero } from './components/cinematic/ParticleHero';
import { IdentityCard } from './components/cinematic/IdentityCard';
import { SystemMap } from './components/cinematic/SystemMap';
import { CyberSection } from './components/cinematic/CyberSection';
import { StoryTerminal } from './components/cinematic/StoryTerminal';
import { AiNeuralGraph } from './components/cinematic/AiNeuralGraph';
import { HorizontalProjects } from './components/cinematic/HorizontalProjects';
import { ToolkitConstellation } from './components/cinematic/ToolkitConstellation';
import { PhilosophySection } from './components/cinematic/PhilosophySection';
import { FinalTransmission } from './components/cinematic/FinalTransmission';
import { CyberEasterEggs } from './components/cinematic/CyberEasterEggs';

export const App: React.FC = () => {
  const [bootKey, setBootKey] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [systemLogOpen, setSystemLogOpen] = useState(false);

  const handleRestartSystem = () => {
    setBootKey((prev) => prev + 1);
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          background: '#05070A',
          color: '#E8F7FF',
          overflowX: 'hidden'
        }}
      >
        {/* Cinematic Boot Sequence (Logs, Glitch, and Direct System Entry) */}
        <CinematicBoot key={bootKey} onComplete={() => {}} />

        {/* 1. Living Digital Background & Giant Lagged Ambient Glow (Sections 2, 3, 32, 33) */}
        <LivingCyberBackground />

        {/* 2. Dual-Ring Magnetic Cursor (Sections 4 & 5) */}
        <CustomCursor />

        {/* 3. Subtle Film Grain Overlay (Section 1) */}
        <GrainOverlay opacity={0.035} />

        {/* 4. Dynamic Signal Telemetry HUD (Section 17) */}
        <SignalIndicator />

        {/* 5. Vertical Chapter Progress Rail (Section 22) */}
        <ScrollProgressRail />

        {/* 6. Minimal Top Bar & Fullscreen Curtain Navigation (Sections 23, 24, 25) */}
        <Navbar
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          onOpenSystemLog={() => setSystemLogOpen(true)}
        />

        {/* 7. Scroll-Driven Story Chapters (All Chapters In Full Active Use) */}
        <main id="main-content">
          {/* Chapter 00: Dissolving Particle Hero ("MR. NOBODY" to "WHO IS MR. NOBODY?") */}
          <ParticleHero />

          {/* Chapter 01: Investigation & 3D Identity Dossier ("I DON'T CHASE THE SYSTEM. I UNDERSTAND THE SYSTEM.") */}
          <IdentityCard />

          {/* Chapter 02: Interconnected System Topology (Rotating SVG Nodes & WHOOSH Zoom) */}
          <SystemMap />

          {/* Chapter 03: Differentiated Cybersecurity Capabilities (Slide, 2° Rotate, Scale, Mask, Glitch, Blur) */}
          <CyberSection />

          {/* Chapter 03.5: Scroll-Revealed Shell Terminal ($ whoami, cat /mindset.txt + Live Execution) */}
          <StoryTerminal />

          {/* Chapter 04: Real-time Neural Graph Architecture (DATA, MODELS, AGENTS, AUTOMATION, DECISION) */}
          <AiNeuralGraph />

          {/* Chapter 05: Operational Case Files (Horizontal Carousel + 3D Tilt + Scanline Dossier) */}
          <HorizontalProjects />

          {/* Chapter 05.5: The Arsenal (Interactive Constellation Toolkit) */}
          <ToolkitConstellation />

          {/* Chapter 06: Beyond The Code (Expanding Portal Aura & Philosophy) */}
          <PhilosophySection />

          {/* Chapter 07: Final Transmission & Shutdown / System Reboot */}
          <FinalTransmission onRestartSystem={handleRestartSystem} />
        </main>

        {/* 8. Ultra-Clean Footer (Section 27) */}
        <Footer />

        {/* 9. Easter Eggs, Audio Synth, System Log #017 & Hidden Terminal (Sections 28, 39, 40, 41) */}
        <CyberEasterEggs
          soundEnabled={soundEnabled}
          systemLogOpen={systemLogOpen}
          onCloseSystemLog={() => setSystemLogOpen(false)}
        />
      </div>
    </MotionConfig>
  );
};
