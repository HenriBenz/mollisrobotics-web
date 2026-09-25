"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export function CartLink({ className = "" }: { className?: string }) {
  const { count, hydrated } = useCart();
  return (
    <Link href="/store/checkout" className={`inline-flex items-baseline gap-1.5 text-[15px] tracking-tight hover:text-signal ${className}`}>
      checkout
      <span className="font-mono text-[12px] text-ink-2" aria-label={`${count} items in cart`}>
        {hydrated ? count : 0}
      </span>
    </Link>
  );
}
