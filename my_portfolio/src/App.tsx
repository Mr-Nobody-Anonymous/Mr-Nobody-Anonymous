import React, { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollProgressRail } from './components/layout/ScrollProgressRail';
import { CustomCursor } from './components/layout/CustomCursor';
import { GrainOverlay } from './components/ui/GrainOverlay';
import { LivingCyberBackground } from './components/cinematic/LivingCyberBackground';

// Core Cinematic Narrative Chapters (Section 48)
import { CinematicStoryHero } from './components/cinematic/CinematicStoryHero';
import { AboutSystemCore } from './components/cinematic/AboutSystemCore';
import { CapabilitiesDashboard } from './components/cinematic/CapabilitiesDashboard';
import { HorizontalProjects } from './components/cinematic/HorizontalProjects';
import { CinematicContact } from './components/cinematic/CinematicContact';
import { CyberEasterEggs } from './components/cinematic/CyberEasterEggs';

export const App: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [systemLogOpen, setSystemLogOpen] = useState(false);

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
        {/* 1. Living Digital Background & Giant Lagged Ambient Glow (Sections 2, 3, 32, 33) */}
        <LivingCyberBackground />

        {/* 2. Dual-Ring Magnetic Cursor (Sections 4 & 5) */}
        <CustomCursor />

        {/* 3. Subtle Film Grain Overlay (Section 1) */}
        <GrainOverlay opacity={0.035} />

        {/* 4. Vertical Chapter Progress Rail (Section 22) */}
        <ScrollProgressRail />

        {/* 5. Minimal Top Bar & Fullscreen Curtain Navigation (Sections 23, 24, 25) */}
        <Navbar
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          onOpenSystemLog={() => setSystemLogOpen(true)}
        />

        {/* 6. Main Story Chapters (Section 48 Page Structure) */}
        <main id="main-content">
          {/* Chapter 01: Hero with 5s Choreography & Scroll Text Dispersal (Sections 6-11, 37) */}
          <CinematicStoryHero />

          {/* Chapter 02: About the System with Rotating 3D Network Core & Keyword Glow (Sections 12-14) */}
          <AboutSystemCore />

          {/* Chapter 03: Capabilities Dashboard with Skill Dimming & Live Readout (Sections 15-16) */}
          <CapabilitiesDashboard />

          {/* Chapter 04: Operations & Case Files with 3D Tilt, 15% Parallax & Scanline Dossier (Sections 17-21) */}
          <HorizontalProjects />

          {/* Chapter 05: Secure Connection Requested with 3-Phase Interactive Button (Section 26) */}
          <CinematicContact />
        </main>

        {/* 7. Ultra-Clean Footer (Section 27) */}
        <Footer />

        {/* 8. Easter Eggs, Audio Synth, System Log #017 & Hidden Terminal (Sections 28, 39, 40, 41) */}
        <CyberEasterEggs
          soundEnabled={soundEnabled}
          systemLogOpen={systemLogOpen}
          onCloseSystemLog={() => setSystemLogOpen(false)}
        />
      </div>
    </MotionConfig>
  );
};
