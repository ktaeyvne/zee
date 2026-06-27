import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ApertureMark from './ApertureMark';

interface LoaderProps {
  onComplete: () => void;
}

/**
 * Full-screen intro loader. Drives a deterministic progress count so the
 * perceived load time stays consistent regardless of network speed, then
 * hands off to the main app with a shutter-style wipe transition.
 */
export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 1800;
    const stepTime = 16;
    const steps = duration / stepTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep += 1;
      const ratio = currentStep / steps;
      const eased = 1 - Math.pow(1 - ratio, 2);
      setProgress(Math.min(Math.floor(eased * 100), 100));

      if (currentStep >= steps) {
        clearInterval(interval);
        setIsExiting(true);
        setTimeout(onComplete, 700);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-900"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute inset-0 bg-radial-spot"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            <ApertureMark className="h-16 w-16 text-gold-300" animate />
            <div className="text-center">
              <p className="font-display text-2xl font-semibold tracking-[0.18em] text-bone sm:text-3xl">
                ZEEE<span className="text-gold-300">_</span>PROJECT
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-widest2 text-bone-muted">
                Video &amp; Fotografer
              </p>
            </div>

            <div className="mt-2 h-px w-48 overflow-hidden bg-white/10 sm:w-64">
              <motion.div
                className="h-full bg-gold-sheen"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <p className="font-body text-xs tabular-nums tracking-widest text-bone-muted">
              {progress.toString().padStart(2, '0')}%
            </p>
          </motion.div>

          {/* Shutter wipe on exit */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-ink-900"
            initial={{ x: 0 }}
            animate={isExiting ? { x: '-100%' } : {}}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-ink-900"
            initial={{ x: 0 }}
            animate={isExiting ? { x: '100%' } : {}}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
