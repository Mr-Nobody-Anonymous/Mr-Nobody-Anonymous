import React from 'react';
import AstraApp from './components/astra/AstraApp';
import { CustomCursor } from './components/layout/CustomCursor';
import { LivingCyberBackground } from './components/cinematic/LivingCyberBackground';
import { SignalIndicator } from './components/layout/SignalIndicator';
import { GrainOverlay } from './components/ui/GrainOverlay';

export const App: React.FC = () => {
  return (
    <>
      {/* Ambient Living Digital Network Background */}
      <LivingCyberBackground />

      {/* Subtle Cinematic Film Grain */}
      <GrainOverlay opacity={0.035} />

      {/* Dual-Ring Magnetic Cyber Cursor */}
      <CustomCursor />

      {/* Dynamic Telemetry HUD */}
      <SignalIndicator />

      {/* The Unified Astra & Cinematic Cyber Experience */}
      <AstraApp />
    </>
  );
};
