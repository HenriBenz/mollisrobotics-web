"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { architecture } from "@/lib/site";
import { CorePart, FingersPart, HeldObject, LinkPart, RobotPart, ToolPart, VIEWBOX } from "./parts";

/** Exploded offsets (px in SVG units) per part. */
const OFFSETS = { robot: -140, link: -84, core: -24, tool: 44, fingers: 116 } as const;

/**
 * The architecture figure. Scrolling through the section assembles the
 * exploded stack: Robot -> Link -> Core -> Tool -> Fingers. Labels activate as
 * their part arrives. With reduced motion the assembled state is shown at once.
 */
export function ExplodedAssembly() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Assembly happens over the first 80% of the scroll, the grip closes at the end.
  const assemble = useTransform(scrollYProgress, [0.05, 0.8], [0, 1]);
  const yRobot = useTransform(assemble, [0, 1], [OFFSETS.robot, 0]);
  const yLink = useTransform(assemble, [0, 1], [OFFSETS.link, 0]);
  const yCore = useTransform(assemble, [0, 1], [OFFSETS.core, 0]);
  const yTool = useTransform(assemble, [0, 1], [OFFSETS.tool, 0]);
  const yFingers = useTransform(assemble, [0, 1], [OFFSETS.fingers, 0]);
  const gapOpacity = useTransform(assemble, [0, 0.9], [1, 0]);
  const objectOpacity = useTransform(assemble, [0.85, 1], [0, 1]);

  const [active, setActive] = useState(0);
  const [grip, setGrip] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(architecture.length - 1, Math.floor(p * 1.25 * architecture.length));
    setActive(idx);
    setGrip(Math.max(0, Math.min(1, (p - 0.82) / 0.16)));
  });

  const assembled = reduce === true;

  return (
    <div ref={ref} className={assembled ? "" : "lg:h-[320vh]"}>
      <div className={assembled ? "" : "lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center"}>
        <div className="grid w-full gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Labels */}
          <ol className="order-2 lg:order-1 lg:col-span-5 lg:self-center">
            {architecture.map((part, i) => {
              const on = assembled || i <= active;
              return (
                <li
                  key={part.id}
                  className={`rule grid grid-cols-[3rem_1fr] gap-4 py-5 transition-opacity duration-500 ${on ? "opacity-100" : "opacity-30"}`}
                >
                  <span className="t-label pt-1">{part.index}</span>
                  <div>
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-xl font-medium tracking-tight">{part.name}</h3>
                      <span className="t-label">{part.role}</span>
                    </div>
                    <p className="mt-2 max-w-[42ch] text-[15px] leading-relaxed text-ink-2">{part.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Figure */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px] lg:max-w-none lg:h-[82vh] lg:aspect-auto">
              <svg
                viewBox={VIEWBOX}
                className="h-full w-full overflow-visible"
                role="img"
                aria-label="Exploded view of the MOLLIS stack: robot flange, Link, Core, Tool and Fingers"
              >
                {/* centre axis */}
                <motion.line
                  x1="200"
                  y1="-40"
                  x2="200"
                  y2="620"
                  stroke="var(--line)"
                  strokeDasharray="2 6"
                  style={{ opacity: assembled ? 0 : gapOpacity }}
                />
                <motion.g style={{ y: assembled ? 0 : yRobot }}>
                  <RobotPart />
                </motion.g>
                <motion.g style={{ y: assembled ? 0 : yLink }}>
                  <LinkPart />
                </motion.g>
                <motion.g style={{ y: assembled ? 0 : yCore }}>
                  <CorePart />
                </motion.g>
                <motion.g style={{ y: assembled ? 0 : yTool }}>
                  <ToolPart variant="agriculture" />
                </motion.g>
                <motion.g style={{ y: assembled ? 0 : yFingers }}>
                  <FingersPart variant="agriculture" grip={assembled ? 1 : grip} />
                </motion.g>
                <motion.g style={{ opacity: assembled ? 1 : objectOpacity }}>
                  <HeldObject variant="agriculture" />
                </motion.g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
