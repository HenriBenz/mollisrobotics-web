"use client";

import { motion } from "motion/react";
import { CorePart, FingersPart, LinkPart, RobotPart, ToolPart, VIEWBOX } from "./parts";
import { useAnimatedNumber } from "./useAnimatedNumber";

/**
 * Hero: the assembled MOLLIS stack, compliant fingers closing on a plain sphere.
 * One slow, mechanical movement on load. Nothing else moves.
 */
export function HeroFigure() {
  const grip = useAnimatedNumber(1, { initial: 0, duration: 1.6, delay: 0.9 });

  return (
    <motion.div
      className="relative mx-auto aspect-[4/5] w-full max-w-[420px] lg:max-w-none lg:h-[72vh] lg:aspect-auto"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
    >
      <svg
        viewBox={VIEWBOX}
        className="h-full w-full overflow-visible"
        role="img"
        aria-label="A MOLLIS end effector with compliant fingers gently holding a sphere"
      >
        <RobotPart />
        <LinkPart />
        <CorePart />
        <ToolPart variant="agriculture" />
        <circle cx="200" cy="512" r="42" fill="var(--alu-3)" stroke="var(--alu-2)" strokeWidth="1.25" />
        <FingersPart variant="agriculture" grip={grip} />

        {/* dimension callouts */}
        <g fontFamily="var(--font-geist-mono), monospace" fontSize="9" letterSpacing="2" fill="var(--steel)">
          <line x1="300" y1="84" x2="340" y2="84" stroke="var(--line)" />
          <text x="346" y="87">LINK</text>
          <line x1="300" y1="210" x2="340" y2="210" stroke="var(--line)" />
          <text x="346" y="213">CORE</text>
          <line x1="300" y1="344" x2="340" y2="344" stroke="var(--line)" />
          <text x="346" y="347">TOOL</text>
          <line x1="300" y1="470" x2="340" y2="470" stroke="var(--line)" />
          <text x="346" y="473">FINGERS</text>
        </g>
      </svg>
    </motion.div>
  );
}
