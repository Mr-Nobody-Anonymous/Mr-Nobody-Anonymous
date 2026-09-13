import React from 'react';
import AstraApp from './components/astra/AstraApp';
import { CustomCursor } from './components/layout/CustomCursor';
import { LivingCyberBackground } from './components/cinematic/LivingCyberBackground';
import { SignalIndicator } from './components/layout/SignalIndicator';

export const App: React.FC = () => {
  return (
    <>
      {/* Ambient Living Digital Network Background */}
      <LivingCyberBackground />

      {/* Dual-Ring Magnetic Cyber Cursor */}
      <CustomCursor />

      {/* Dynamic Telemetry HUD */}
      <SignalIndicator />

      {/* The Complete Astra Experience */}
      <AstraApp />
    </>
  );
};
