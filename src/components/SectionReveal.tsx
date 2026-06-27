import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface SectionRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'none';
}

const directionOffsets: Record<NonNullable<SectionRevealProps['direction']>, { x: number; y: number }> = {
  up: { x: 0, y: 32 },
  left: { x: -32, y: 0 },
  right: { x: 32, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Fades + slides children into place once they enter the viewport.
 * Respects prefers-reduced-motion via Framer Motion's built-in handling.
 */
export default function SectionReveal({
  children,
  delay = 0,
  className,
  direction = 'up',
}: SectionRevealProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const offset = directionOffsets[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
