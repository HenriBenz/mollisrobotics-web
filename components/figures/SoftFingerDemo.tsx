"use client";

import { useEffect, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { useAnimatedNumber } from "./useAnimatedNumber";

/**
 * One compliant finger closing on two different objects.
 * No sensor, no control loop. The geometry does the adapting.
 */
export function SoftFingerDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<0 | 1>(0);
  const [object, setObject] = useState<"round" | "square">("round");

  // Loop: close (1.4s) hold (1.4s) open (1.0s) swap object, repeat.
  useEffect(() => {
    if (!inView || reduce) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const cycle = () => {
      if (cancelled) return;
      setPhase(1);
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setPhase(0);
          timers.push(
            setTimeout(() => {
              if (cancelled) return;
              setObject((o) => (o === "round" ? "square" : "round"));
              timers.push(setTimeout(cycle, 500));
            }, 1100),
          );
        }, 2800),
      );
    };
    timers.push(setTimeout(cycle, 400));
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, reduce]);

  const t = useAnimatedNumber(reduce ? 1 : phase, { duration: phase === 1 ? 1.4 : 1.0, initial: 0 });
  const l = (a: number, b: number) => a + (b - a) * t;

  // Finger geometry adapts to the object: the same actuation input, a different contact shape.
  const finger =
    object === "round"
      ? `M110,60 C110,120 ${l(110, 104)},170 ${l(110, 124)},214 C${l(110, 140)},246 ${l(110, 176)},262 ${l(110, 216)},258 C${l(110, 246)},254 ${l(110, 262)},236 ${l(110, 262)},216`
      : `M110,60 C110,120 ${l(110, 108)},170 ${l(110, 118)},198 C${l(110, 124)},212 ${l(110, 176)},214 ${l(110, 246)},214 C${l(110, 262)},214 ${l(110, 262)},214 ${l(110, 262)},216`;

  return (
    <div ref={ref} className="mx-auto w-full max-w-[520px]">
      <svg viewBox="0 0 360 320" className="h-auto w-full overflow-visible" role="img" aria-label="A compliant finger closing around a round object and a square object">
        {/* mount */}
        <rect x="70" y="20" width="80" height="44" rx="6" fill="var(--alu)" />
        <rect x="70" y="20" width="80" height="3" fill="var(--alu-3)" opacity="0.9" />
        <rect x="96" y="60" width="28" height="12" rx="3" fill="var(--polymer)" />

        {/* object */}
        {object === "round" ? (
          <circle cx="220" cy="214" r="46" fill="var(--alu-3)" stroke="var(--alu-2)" strokeWidth="1.25" />
        ) : (
          <rect x="176" y="168" width="92" height="92" rx="4" fill="var(--alu-3)" stroke="var(--alu-2)" strokeWidth="1.25" />
        )}

        {/* finger */}
        <path d={finger} fill="none" stroke="var(--elastomer)" strokeWidth="22" strokeLinecap="round" />
        <path d={finger} fill="none" stroke="var(--elastomer-2)" strokeWidth="1" strokeOpacity="0.7" />

        {/* annotations */}
        <g fontFamily="var(--font-geist-mono), monospace" fontSize="10" letterSpacing="1.5" fill="var(--ink-2)">
          <text x="14" y="120">INPUT: 1 DOF</text>
          <text x="14" y="300">SENSORS: 0</text>
          <text x="236" y="120" textAnchor="start">CONTACT: {object === "round" ? "ARC" : "FLAT"}</text>
          <text x="236" y="300">{t > 0.95 ? "ADAPTED" : "CLOSING"}</text>
        </g>
        <line x1="14" y1="128" x2="80" y2="128" stroke="var(--line)" />
        <line x1="236" y1="128" x2="346" y2="128" stroke="var(--line)" />
      </svg>
    </div>
  );
}
