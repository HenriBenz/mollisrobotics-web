"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { applications, type ApplicationId } from "@/lib/site";
import { CorePart, FingersPart, HeldObject, LinkPart, RobotPart, ToolPart, VIEWBOX } from "./parts";
import { useAnimatedNumber } from "./useAnimatedNumber";

/**
 * Same Robot, Link and Core. Different Tool and Fingers.
 * Switching configurations swaps only the lower half of the stack.
 */
export function ApplicationSwitcher() {
  const [current, setCurrent] = useState<ApplicationId>("industry");
  const app = applications.find((a) => a.id === current)!;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-5">
        <div role="tablist" aria-label="Application" className="flex flex-wrap gap-2">
          {applications.map((a) => {
            const selected = a.id === current;
            return (
              <button
                key={a.id}
                role="tab"
                aria-selected={selected}
                onClick={() => setCurrent(a.id)}
                className={`h-11 border px-5 text-[15px] font-medium tracking-tight transition-colors ${
                  selected
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-transparent text-ink hover:border-ink"
                }`}
              >
                {a.name}
              </button>
            );
          })}
        </div>

        <div className="mt-10 min-h-[9rem]" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-h2 font-medium tracking-tight text-balance">{app.headline}</h3>
              <p className="mt-4 max-w-[40ch] text-lede text-ink-2">{app.copy}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <dl className="mt-10 grid grid-cols-3 gap-4 rule pt-6">
          <Spec label="Link + Core" value="Unchanged" />
          <Spec label="Tool" value={`MOLLIS ${app.tool}`} />
          <Spec label="Fingers" value={app.fingers} />
        </dl>
      </div>

      <div className="lg:col-span-7">
        <div className="mx-auto aspect-[4/5] w-full max-w-[520px] lg:max-w-[600px]">
          <svg
            viewBox={VIEWBOX}
            className="h-full w-full overflow-visible"
            role="img"
            aria-label={`MOLLIS configured for ${app.name}: ${app.tool} tool with ${app.fingers.toLowerCase()} holding a ${app.object.toLowerCase()}`}
          >
            <RobotPart />
            <LinkPart />
            <CorePart />
            <AnimatePresence mode="wait" initial={false}>
              <Lower key={app.id} variant={app.id} />
            </AnimatePresence>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Lower({ variant }: { variant: ApplicationId }) {
  // Tool docks from below, then the fingers close on the object.
  const grip = useAnimatedNumber(1, { initial: 0, duration: 0.9, delay: 0.55 });
  return (
    <motion.g
      initial={{ y: 48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 48, opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
    >
      <ToolPart variant={variant} />
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <HeldObject variant={variant} />
      </motion.g>
      <FingersPart variant={variant} grip={grip} />
    </motion.g>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="t-label">{label}</dt>
      <dd className="mt-2 text-[15px] font-medium tracking-tight">{value}</dd>
    </div>
  );
}
