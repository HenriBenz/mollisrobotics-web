"use client";

import Link from "next/link";
import { useState } from "react";
import { CorePart, FingersPart, HeldObject, LinkPart, RobotPart, ToolPart, VIEWBOX } from "@/components/figures/parts";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import { StatusPill } from "@/components/ui/StatusPill";
import { useAnimatedNumber } from "@/components/figures/useAnimatedNumber";

type ToolId = "grip" | "soft" | "hand";
type FingerId = "fingers-rigid" | "fingers-soft" | "fingers-blank";

const links = getProduct("link-iso-50")!.options![0].values;
const tools: { id: ToolId; variant: "industry" | "agriculture" | "humanoid"; defaultFingers: FingerId }[] = [
  { id: "grip", variant: "industry", defaultFingers: "fingers-rigid" },
  { id: "soft", variant: "agriculture", defaultFingers: "fingers-soft" },
  { id: "hand", variant: "humanoid", defaultFingers: "fingers-soft" },
];
const fingers: FingerId[] = ["fingers-rigid", "fingers-soft", "fingers-blank"];

/**
 * Build your tool: choose Link, Tool and Fingers. Core is always the same.
 * The drawing updates live; the result is added to the cart as individual products.
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
  const grip = useAnimatedNumber(1, { initial: 0, duration: 1.2, delay: 0.4 });

  const addAll = () => {
    add({ slug: "link-iso-50", options: { flange: link } });
    add({ slug: "core", options: {} });
    add({ slug: tool, options: {} });
    add({ slug: finger, options: {} });
    setDone(true);
  };

  return (
    <div className="grid gap-12 py-10 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-5">
        <h1 className="text-h2 font-medium tracking-tight">build your tool</h1>
        <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-ink-2">
          Robot → Link → Core → Tool → Fingers. Choose the parts that touch your robot and your
          objects. The Core stays the same.
        </p>

        <Step n="01" title="link" hint="the robot side">
          {links.map((v) => (
            <Choice key={v} selected={link === v} onClick={() => setLink(v)} label={v} />
          ))}
        </Step>

        <Step n="02" title="core" hint="always the same">
          <div className="flex items-center justify-between border border-ink px-4 py-3 text-[14px]">
            <span className="font-medium">core · MC–01</span>
            <StatusPill status="development" />
          </div>
        </Step>

        <Step n="03" title="tool" hint="the task">
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
                disabledNote={p.availability === "coming-soon" ? "coming soon" : undefined}
              />
            );
          })}
        </Step>

        <Step n="04" title="fingers" hint="the contact">
          {fingers.map((f) => {
            const p = getProduct(f)!;
            return <Choice key={f} selected={finger === f} onClick={() => setFinger(f)} label={`${p.name} · ${p.code}`} meta={<StatusPill status={p.status} />} />;
          })}
        </Step>

        <div className="rule mt-8 pt-6">
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
              className="inline-flex h-12 w-full items-center justify-center border border-ink bg-ink px-6 text-[15px] font-medium text-paper transition-colors hover:border-signal hover:bg-signal"
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

      <div className="lg:col-span-7">
        <div className="panel relative mx-auto aspect-[4/5] w-full max-w-[520px] lg:sticky lg:top-24">
          <svg viewBox={VIEWBOX} className="absolute inset-[8%] h-[84%] w-[84%] overflow-visible" role="img" aria-label={`Configuration: ${link}, core, ${tool}, ${finger}`}>
            <RobotPart />
            <LinkPart />
            <CorePart />
            <ToolPart variant={t.variant} />
            {finger !== "fingers-blank" && <HeldObject variant={t.variant} />}
            {finger === "fingers-blank" ? (
              <g>
                {[150, 240].map((x) => (
                  <g key={x}>
                    <rect x={x} y="380" width="14" height="60" rx="2" fill="var(--polymer)" />
                    <rect x={x} y="440" width="14" height="90" rx="2" fill="none" stroke="var(--steel)" strokeDasharray="3 3" />
                  </g>
                ))}
              </g>
            ) : (
              <FingersPart variant={finger === "fingers-rigid" ? "industry" : t.variant === "humanoid" ? "humanoid" : "agriculture"} grip={grip} />
            )}
          </svg>
          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-x-4 gap-y-1">
            <span className="t-label">ML–50</span>
            <span className="t-label">MC–01</span>
            <span className="t-label">{toolProduct.code}</span>
            <span className="t-label">{fingerProduct.code}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ n, title, hint, children }: { n: string; title: string; hint: string; children: React.ReactNode }) {
  return (
    <section className="rule mt-8 pt-6">
      <div className="mb-3 flex items-baseline gap-3">
        <span className="t-label">{n}</span>
        <h2 className="text-lg font-medium tracking-tight">{title}</h2>
        <span className="text-[13px] text-ink-2">{hint}</span>
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
  disabledNote,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  meta?: React.ReactNode;
  disabledNote?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex items-center justify-between gap-4 border px-4 py-3 text-left text-[14px] transition-colors ${
        selected ? "border-ink bg-ink text-paper [&_.t-label]:text-paper/70" : "border-line hover:border-ink"
      }`}
    >
      <span className="font-medium">{label}</span>
      <span className="flex items-center gap-3">
        {disabledNote && <span className="text-[12px] opacity-70">{disabledNote}</span>}
        {meta}
      </span>
    </button>
  );
}
