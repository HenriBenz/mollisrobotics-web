"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import { photos, type PhotoId } from "@/lib/images";
import { StatusPill } from "@/components/ui/StatusPill";
import { ProductImage } from "./ProductImage";

type ToolId = "grip" | "soft" | "hand";
type FingerId = "fingers-rigid" | "fingers-soft" | "fingers-blank";

const links = getProduct("link-iso-50")!.options![0].values;
const tools: { id: ToolId; photo: PhotoId; defaultFingers: FingerId }[] = [
  { id: "grip", photo: "grip", defaultFingers: "fingers-rigid" },
  { id: "soft", photo: "softDetail", defaultFingers: "fingers-soft" },
  { id: "hand", photo: "hand", defaultFingers: "fingers-soft" },
];
const fingers: FingerId[] = ["fingers-rigid", "fingers-soft", "fingers-blank"];

/**
 * Build your tool: choose Link, Tool and Fingers. Core is always the same.
 * The photo follows the chosen tool; the result is added to the cart as individual products.
 */
export function Builder() {
  const { add } = useCart();
  const [link, setLink] = useState(links[0]);
  const [tool, setTool] = useState<ToolId>("grip");
  const [finger, setFinger] = useState<FingerId>("fingers-rigid");
  const [done, setDone] = useState(false);

  const t = tools.find((x) => x.id === tool)!;
  const toolProduct = getProduct(tool)!;
  const fingerProduct = getProduct(finger)!;
  const reservable = toolProduct.availability === "reserve" && fingerProduct.availability === "reserve";

  const addAll = () => {
    add({ slug: "link-iso-50", options: { flange: link } });
    add({ slug: "core", options: {} });
    add({ slug: tool, options: {} });
    add({ slug: finger, options: {} });
    setDone(true);
  };

  return (
    <div className="grid gap-12 py-6 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-paper-2 sm:aspect-square lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)]">
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={t.photo}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <ProductImage photo={photos[t.photo]} sizes="(min-width: 1024px) 60vw, 100vw" priority />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
            {["ML–50", "MC–01", toolProduct.code, fingerProduct.code].map((c) => (
              <span key={c} className="rounded-full bg-paper/85 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] backdrop-blur">
                {c.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <h1 className="text-h1 font-semibold">Build your tool.</h1>
        <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-ink-2">
          Choose the parts that touch your robot and your objects. The Core stays the same.
        </p>

        <Step n="01" title="link">
          {links.map((v) => (
            <Choice key={v} selected={link === v} onClick={() => setLink(v)} label={v} />
          ))}
        </Step>

        <Step n="02" title="core">
          <div className="flex items-center justify-between rounded-2xl border border-ink px-4 py-3 text-[14px]">
            <span className="font-medium">core · MC–01</span>
            <StatusPill status="development" />
          </div>
        </Step>

        <Step n="03" title="tool">
          {tools.map((x) => {
            const p = getProduct(x.id)!;
            return (
              <Choice
                key={x.id}
                selected={tool === x.id}
                onClick={() => {
                  setTool(x.id);
                  setFinger(x.defaultFingers);
                }}
                label={`${p.name} · ${p.code}`}
                meta={<StatusPill status={p.status} />}
                note={p.availability === "coming-soon" ? "coming soon" : undefined}
              />
            );
          })}
        </Step>

        <Step n="04" title="fingers">
          {fingers.map((f) => {
            const p = getProduct(f)!;
            return <Choice key={f} selected={finger === f} onClick={() => setFinger(f)} label={`${p.name} · ${p.code}`} meta={<StatusPill status={p.status} />} />;
          })}
        </Step>

        <div className="mt-8">
          {done ? (
            <p className="text-[15px]" role="status">
              configuration added.{" "}
              <Link href="/store/checkout" className="font-medium underline underline-offset-4 hover:text-signal">
                checkout
              </Link>{" "}
              <button type="button" onClick={() => setDone(false)} className="ml-3 text-ink-2 hover:text-ink">
                build another
              </button>
            </p>
          ) : reservable ? (
            <button
              type="button"
              onClick={addAll}
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-ink bg-ink px-6 text-[15px] font-medium text-paper transition-colors hover:border-signal hover:bg-signal"
            >
              reserve this configuration
            </button>
          ) : (
            <p className="text-[14px] text-ink-2">
              This configuration includes a module that is not yet reservable. Choose another tool,
              or{" "}
              <Link href="/early-access" className="underline underline-offset-4 hover:text-signal">
                join early access
              </Link>{" "}
              to hear when it is.
            </p>
          )}
          <p className="mt-3 text-[13px] text-ink-2">Adds four products to the cart. Free and non-binding.</p>
        </div>
      </div>
    </div>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline gap-3">
        <span className="t-label">{n}</span>
        <h2 className="text-lg font-medium tracking-tight">{title}</h2>
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
}

function Choice({
  selected,
  onClick,
  label,
  meta,
  note,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  meta?: React.ReactNode;
  note?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left text-[14px] transition-colors ${
        selected ? "border-ink bg-ink text-paper [&_.t-label]:text-paper/70" : "border-line hover:border-ink"
      }`}
    >
      <span className="font-medium">{label}</span>
      <span className="flex items-center gap-3">
        {note && <span className="text-[12px] opacity-70">{note}</span>}
        {meta}
      </span>
    </button>
  );
}
