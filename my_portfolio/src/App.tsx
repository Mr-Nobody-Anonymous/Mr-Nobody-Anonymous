import React, { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/hero/Hero';
import { MatrixBackground } from './components/hero/MatrixBackground';
import { CyberTerminal } from './components/terminal/CyberTerminal';
import { ProjectGrid } from './components/projects/ProjectGrid';
import { SkillMatrix } from './components/skills/SkillMatrix';
import { Timeline } from './components/experience/Timeline';
import { GitHubStats } from './components/stats/GitHubStats';
import { ContactSection } from './components/contact/ContactSection';
import { BootSequence } from './components/ui/BootSequence';
import { useTheme } from './hooks/useTheme';

export const App: React.FC = () => {
  const { theme, setTheme, crtEnabled, toggleCrt } = useTheme();
  const [booted, setBooted] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        {/* Boot Sequence (Under 1.2s, skippable, stored in sessionStorage) */}
        {!booted && <BootSequence onComplete={() => setBooted(true)} />}

        {/* Matrix Canvas Digital Rain Background */}
        <MatrixBackground theme={theme} opacity={0.22} />

        {/* Subtle Cyber Perspective Grid Floor */}
        <div className="cyber-grid-floor" aria-hidden="true" />

        {/* Floating Glass Navigation */}
        <Navbar
          currentTheme={theme}
          onThemeChange={setTheme}
          crtEnabled={crtEnabled}
          onToggleCrt={toggleCrt}
        />

        {/* Main Content Modules */}
        <main id="main-content">
          <Hero />
          <GitHubStats />
          <SkillMatrix />
          <CyberTerminal setTheme={setTheme} />
          <ProjectGrid />
          <Timeline />
          <ContactSection />
        </main>

        {/* Telemetry Footer */}
        <Footer />
      </div>
    </MotionConfig>
  );
};
