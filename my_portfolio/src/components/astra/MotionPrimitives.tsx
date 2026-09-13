import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

export function Reveal({ children, className = '', delay = 0, enabled = true }: { children: ReactNode; className?: string; delay?: number; enabled?: boolean }) {
  return (
    <motion.div
      className={className}
      initial={enabled ? { opacity: 0, y: 30 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -45px 0px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Word({ children, progress, range, enabled, accent }: { children: string; progress: MotionValue<number>; range: [number, number]; enabled: boolean; accent: boolean }) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  return <motion.span className={accent ? 'accent' : ''} style={{ opacity: enabled ? opacity : 1 }}>{children}{' '}</motion.span>;
}

export function ScrollStatement({ enabled }: { enabled: boolean }) {
  const element = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: element, offset: ['start 0.93', 'end 0.48'] });
  const words = "I'm Bam Sintu. A security-first technologist exploring the space between how systems are built and how they break.".split(' ');

  return (
    <p className="scroll-statement" ref={element}>
      {words.map((word, index) => <Word key={`${word}-${index}`} progress={scrollYProgress} range={[index / words.length, (index + 1) / words.length]} enabled={enabled} accent={index >= words.length - 3}>{word}</Word>)}
    </p>
  );
}