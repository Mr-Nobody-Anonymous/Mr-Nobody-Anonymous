import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glowOnHover = true,
  style,
  ...props
}) => {
  return (
    <motion.div
      className={cn('cyber-glass', className)}
      style={{
        padding: '1.5rem',
        ...style
      }}
      whileHover={
        glowOnHover
          ? {
              borderColor: 'var(--border-accent-bright)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4), 0 0 15px var(--accent-glow)'
            }
          : undefined
      }
      transition={{ duration: 0.25 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
