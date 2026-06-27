import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  startOnView?: boolean;
}

/**
 * Animates a number from 0 to `end` using requestAnimationFrame with an
 * ease-out curve. Pair with `react-intersection-observer`'s `inView` flag
 * by passing it through `trigger`.
 */
export function useCountUp({ end, duration = 1800 }: UseCountUpOptions, trigger: boolean) {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setValue(end);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [trigger, end, duration]);

  return value;
}
