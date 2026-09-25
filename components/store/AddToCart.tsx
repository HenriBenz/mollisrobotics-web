"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Availability } from "@/lib/products";

const looks = {
  ink: "border-ink bg-ink text-paper hover:border-signal hover:bg-signal",
  paper: "border-paper bg-paper text-ink hover:border-ink hover:bg-ink hover:text-paper",
  glass: "border-transparent bg-paper/10 text-paper hover:bg-paper hover:text-ink",
  outline: "border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper",
} as const;

export function AddToCart({
  slug,
  options = {},
  availability,
  qty = 1,
  size = "md",
  look = "ink",
  className = "",
}: {
  slug: string;
  options?: Record<string, string>;
  availability: Availability;
  qty?: number;
  size?: "sm" | "md";
  look?: keyof typeof looks;
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const base =
    size === "sm"
      ? "h-9 rounded-full px-3.5 text-[13px]"
      : "h-12 rounded-full px-6 text-[15px]";

  if (availability === "coming-soon") {
    return (
      <span className={`inline-flex items-center border border-line text-ink-2 ${base} ${className}`} aria-disabled="true">
        coming soon
      </span>
    );
  }

  if (added) {
    return (
      <span className={`inline-flex items-center gap-3 ${size === "sm" ? "text-[13px]" : "text-[15px]"} ${className}`} role="status">
        <span className="text-ink-2">added</span>
        <Link href="/store/checkout" className="font-medium underline underline-offset-4 hover:text-signal">
          checkout
        </Link>
        <button type="button" onClick={() => setAdded(false)} className="text-ink-2 hover:text-ink">
          add another
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        add({ slug, options }, qty);
        setAdded(true);
      }}
      className={`inline-flex items-center justify-center border font-medium tracking-tight transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${looks[look]} ${base} ${className}`}
    >
      reserve
    </button>
  );
}
