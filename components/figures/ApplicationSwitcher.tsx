"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { applications, type ApplicationId } from "@/lib/site";
import { photos, type PhotoId } from "@/lib/images";
import { ProductImage } from "@/components/store/ProductImage";

const photoByApp: Record<ApplicationId, PhotoId> = {
  industry: "grip",
  agriculture: "softDetail",
  humanoid: "hand",
};

/**
 * Same Link and Core. Different Tool and Fingers.
 * Switching applications swaps the photograph and the copy.
 */
export function ApplicationSwitcher() {
  const [current, setCurrent] = useState<ApplicationId>("industry");
  const app = applications.find((a) => a.id === current)!;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-paper-2 sm:aspect-square lg:aspect-[5/4]">
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={app.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <ProductImage photo={photos[photoByApp[app.id]]} sizes="(min-width: 1024px) 60vw, 100vw" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div role="tablist" aria-label="Application" className="flex flex-wrap gap-2">
          {applications.map((a) => (
            <button key={a.id} role="tab" aria-selected={a.id === current} onClick={() => setCurrent(a.id)} className="chip" aria-current={a.id === current ? "page" : undefined}>
              {a.name.toLowerCase()}
            </button>
          ))}
        </div>

        <div className="mt-8 min-h-[9rem]" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div key={app.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              <h3 className="text-h2 font-medium text-balance">{app.headline}</h3>
              <p className="mt-4 max-w-[40ch] text-lede text-ink-2">{app.copy}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <dl className="mt-8 grid grid-cols-3 gap-4 rule pt-6">
          <Spec label="Link + Core" value="Unchanged" />
          <Spec label="Tool" value={`MOLLIS ${app.tool}`} />
          <Spec label="Fingers" value={app.fingers} />
        </dl>
      </div>
    </div>
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
