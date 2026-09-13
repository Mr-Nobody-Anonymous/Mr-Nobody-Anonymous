import React from 'react';

interface GrainOverlayProps {
  opacity?: number;
}

export const GrainOverlay: React.FC<GrainOverlayProps> = ({ opacity }) => {
  return (
    <div
      className="grain-overlay"
      aria-hidden="true"
      style={opacity !== undefined ? { opacity } : undefined}
    />
  );
};
