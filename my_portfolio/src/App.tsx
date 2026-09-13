import React, { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SignalIndicator } from './components/layout/SignalIndicator';
import { ScrollProgressRail } from './components/layout/ScrollProgressRail';
import { CustomCursor } from './components/layout/CustomCursor';
import { GrainOverlay } from './components/ui/GrainOverlay';
import { MatrixBackground } from './components/hero/MatrixBackground';

// Cinematic Narrative Chapters
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

import { useTheme } from './hooks/useTheme';

export const App: React.FC = () => {
  const { theme, setTheme, crtEnabled, toggleCrt } = useTheme();
  const [bootKey, setBootKey] = useState(0);

  const handleRestartSystem = () => {
    setBootKey((prev) => prev + 1);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div style={{ position: 'relative', minHeight: '100vh', background: '#05070A', color: '#F5F7FA' }}>
        {/* Cinematic Boot Sequence (3-4s typing logs, glitch flash, enter button) */}
        <CinematicBoot key={bootKey} onComplete={() => {}} />

        {/* Desktop Custom Magnetic Cursor */}
        <CustomCursor />

        {/* Film Grain Texture Overlay */}
        <GrainOverlay opacity={0.04} />

        {/* Dynamic Signal Telemetry Indicator */}
        <SignalIndicator />

        {/* Vertical Scroll Progress Chapter Rail */}
        <ScrollProgressRail />

        {/* Ambient Matrix Rain Canvas Background */}
        <MatrixBackground theme={theme} opacity={0.16} />

        {/* Subtle Cyber Grid Floor */}
        <div className="cyber-grid-floor" aria-hidden="true" />

        {/* Floating Top Navigation */}
        <Navbar
          currentTheme={theme}
          onThemeChange={setTheme}
          crtEnabled={crtEnabled}
          onToggleCrt={toggleCrt}
        />

        {/* Scroll-Driven Story Chapters */}
        <main id="main-content">
          {/* Chapter 00: Boot & Dissolving Particle Hero */}
          <ParticleHero />

          {/* Chapter 01: Investigation & Identity Dossier */}
          <IdentityCard />

          {/* Chapter 02: Interconnected System Topology */}
          <SystemMap />

          {/* Chapter 03: Multi-Directional Cybersecurity Capabilities */}
          <CyberSection />

          {/* Chapter 03.5: Scroll-Revealed Shell Terminal */}
          <StoryTerminal />

          {/* Chapter 04: Real-time Neural Graph Architecture */}
          <AiNeuralGraph />

          {/* Chapter 05: Operational Case Files (Horizontal Carousel + Scanline Modal) */}
          <HorizontalProjects />

          {/* Chapter 05.5: The Arsenal (Interactive Constellation Toolkit) */}
          <ToolkitConstellation />

          {/* Chapter 06: Beyond The Code (Expanding Portal Philosophy) */}
          <PhilosophySection />

          {/* Chapter 07: Final Transmission & Shutdown / System Reboot */}
          <FinalTransmission onRestartSystem={handleRestartSystem} />
        </main>

        {/* Institutional Telemetry Footer */}
        <Footer />
      </div>
    </MotionConfig>
  );
};
