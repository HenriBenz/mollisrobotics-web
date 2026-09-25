"use client";

import { useEffect, useState } from "react";
import { animate, useReducedMotion } from "motion/react";

/**
 * Tweens a number towards `target` and returns the current value as React state.
 * Used to drive SVG path geometry (which cannot be CSS-transitioned).
 */
export function useAnimatedNumber(
  target: number,
  { duration = 0.8, delay = 0, initial }: { duration?: number; delay?: number; initial?: number } = {},
) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(initial ?? target);

  useEffect(() => {
    if (reduce) return;
    const controls = animate(value, target, {
      duration,
      delay,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, reduce]);

  // With reduced motion, jump straight to the target without animating.
  return reduce ? target : value;
}
