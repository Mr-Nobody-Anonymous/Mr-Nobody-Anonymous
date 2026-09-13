import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  asAnchor = false,
  href,
  target,
  rel,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base'
  }[size];

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontWeight: 600,
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    borderRadius: 'var(--radius-md)',
    transition: 'all var(--transition-smooth)',
    textDecoration: 'none',
    position: 'relative',
    cursor: 'pointer',
    border: '1px solid transparent'
  };

  const getVariantStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          background: 'var(--accent)',
          color: 'var(--accent-contrast)',
          boxShadow: '0 0 16px var(--accent-glow)',
          borderColor: 'var(--accent)'
        };
      case 'secondary':
        return {
          background: 'var(--accent-dim)',
          color: 'var(--accent)',
          borderColor: 'var(--border-accent)',
          backdropFilter: 'blur(8px)'
        };
      case 'outline':
        return {
          background: 'transparent',
          color: 'var(--text-primary)',
          borderColor: 'var(--border-panel)'
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: 'var(--text-secondary)'
        };
    }
  };

  const content = (
    <>
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      <span>{children}</span>
    </>
  );

  if (asAnchor && href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={cn(sizeStyles, className)}
        style={{ ...baseStyle, ...getVariantStyle() }}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={props.type || 'button'}
      className={cn(sizeStyles, className)}
      style={{ ...baseStyle, ...getVariantStyle() }}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      {...(props as any)}
    >
      {content}
    </motion.button>
  );
};
