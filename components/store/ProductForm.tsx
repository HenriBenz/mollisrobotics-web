"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { AddToCart } from "./AddToCart";

const select =
  "h-11 w-full appearance-none border border-line bg-transparent px-3 text-[14px] text-ink focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-signal";

export function ProductForm({ product }: { product: Product }) {
  const [options, setOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries((product.options ?? []).map((o) => [o.name, o.values[0]])),
  );
  const [qty, setQty] = useState(1);

  return (
    <div className="space-y-5">
      {product.options?.map((o) => (
        <div key={o.name}>
          <label htmlFor={`opt-${o.name}`} className="t-label mb-2 block">
            {o.name}
          </label>
          <select
            id={`opt-${o.name}`}
            value={options[o.name]}
            onChange={(e) => setOptions((prev) => ({ ...prev, [o.name]: e.target.value }))}
            className={select}
          >
            {o.values.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      ))}
      <div className="flex items-end gap-4">
        <div>
          <label htmlFor="qty" className="t-label mb-2 block">
            quantity
          </label>
          <div className="flex h-12 items-center border border-line">
            <button type="button" aria-label="decrease" onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-full w-10 hover:bg-paper-2">
              −
            </button>
            <input
              id="qty"
              type="number"
              min={1}
              max={99}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
              className="h-full w-12 bg-transparent text-center text-[15px] focus:outline-none"
            />
            <button type="button" aria-label="increase" onClick={() => setQty((q) => Math.min(99, q + 1))} className="h-full w-10 hover:bg-paper-2">
              +
            </button>
          </div>
        </div>
        <AddToCart slug={product.slug} options={options} qty={qty} availability={product.availability} className="flex-1" />
      </div>
    </div>
  );
}
