"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { itemKey, useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";
import { reserveCart, type LeadState } from "@/app/actions/leads";
import { ProductFigure } from "./ProductFigure";
import { Arrow, Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

const field =
  "h-12 w-full border border-line bg-transparent px-4 text-[15px] text-ink placeholder:text-steel focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-signal";

const initial: LeadState = { status: "idle" };

export function Checkout() {
  const { items, count, setQty, remove, clear, hydrated } = useCart();
  const [state, action, pending] = useActionState(reserveCart, initial);
  const cleared = useRef(false);

  // Clear the cart once the reservation is stored.
  useEffect(() => {
    if (state.status === "success" && !cleared.current) {
      cleared.current = true;
      clear();
    }
  }, [state.status, clear]);

  if (state.status === "success") {
    return (
      <div className="max-w-[60ch] py-16">
        <p className="t-label mb-3">reservation received</p>
        <h1 className="text-h2 font-medium tracking-tight">Thank you. Reference {state.reference}.</h1>
        <p className="mt-6 text-[15px] leading-relaxed text-ink-2">
          We have your reservation and will confirm price and lead time by email before anything is
          charged. Nothing is binding until then. Questions:{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-4">
            {site.email}
          </a>
        </p>
        <Link href="/store" className="mt-10 inline-flex items-center gap-2 text-[15px] font-medium hover:text-signal">
          back to the store <Arrow />
        </Link>
      </div>
    );
  }

  if (!hydrated) return <div className="py-16 text-[15px] text-ink-2">loading cart</div>;

  if (items.length === 0) {
    return (
      <div className="max-w-[60ch] py-16">
        <h1 className="text-h2 font-medium tracking-tight">Your cart is empty.</h1>
        <p className="mt-6 text-[15px] text-ink-2">Reserve a kit or a single module. Reservations are free and non-binding.</p>
        <Link href="/store" className="mt-10 inline-flex items-center gap-2 text-[15px] font-medium hover:text-signal">
          go to the store <Arrow />
        </Link>
      </div>
    );
  }

  const payload = items.map((i) => {
    const p = getProduct(i.slug)!;
    return { slug: i.slug, code: p.code, name: p.name, options: i.options, qty: i.qty, price: p.price };
  });

  return (
    <div className="grid gap-12 py-10 lg:grid-cols-12 lg:gap-8">
      {/* cart table */}
      <div className="lg:col-span-7">
        <div className="flex items-baseline justify-between">
          <h1 className="text-h2 font-medium tracking-tight">checkout</h1>
          <p className="text-[14px] text-ink-2">{count} in cart</p>
        </div>
        <table className="mt-8 w-full border-collapse text-[14px]">
          <thead className="t-label">
            <tr>
              <th className="rule py-3 text-left font-normal" colSpan={2}>
                item
              </th>
              <th className="rule py-3 text-left font-normal">qty</th>
              <th className="rule py-3 text-right font-normal">price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => {
              const p = getProduct(i.slug)!;
              const key = itemKey(i);
              return (
                <tr key={key} className="align-top">
                  <td className="rule w-20 py-4 pr-4">
                    <Link href={`/store/${p.slug}`} className="block h-16 w-16 bg-paper-2 p-1.5">
                      <ProductFigure figure={p.figure} />
                    </Link>
                  </td>
                  <td className="rule py-4 pr-4">
                    <Link href={`/store/${p.slug}`} className="font-medium hover:text-signal">
                      {p.name}
                    </Link>
                    <p className="t-label mt-1">{p.code}</p>
                    {Object.entries(i.options).map(([k, v]) => (
                      <p key={k} className="mt-1 text-[13px] text-ink-2">
                        {k}: {v}
                      </p>
                    ))}
                    <button type="button" onClick={() => remove(key)} className="mt-2 text-[13px] text-ink-2 underline underline-offset-4 hover:text-signal">
                      remove
                    </button>
                  </td>
                  <td className="rule py-4 pr-4">
                    <div className="inline-flex h-9 items-center border border-line">
                      <button type="button" aria-label="decrease" onClick={() => setQty(key, i.qty - 1)} className="h-full w-8 hover:bg-paper-2">
                        −
                      </button>
                      <span className="w-8 text-center">{i.qty}</span>
                      <button type="button" aria-label="increase" onClick={() => setQty(key, i.qty + 1)} className="h-full w-8 hover:bg-paper-2">
                        +
                      </button>
                    </div>
                  </td>
                  <td className="rule py-4 text-right text-ink-2">{formatPrice(p.price)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="rule py-4 text-ink-2">
                total
              </td>
              <td className="rule py-4 text-right font-medium">to be announced</td>
            </tr>
          </tfoot>
        </table>
        <p className="mt-4 text-[13px] leading-relaxed text-ink-2">
          Prices are announced at launch. A reservation holds your place in the first production
          batch. It is free and non-binding; we confirm price, lead time and shipping with you
          before anything is charged.
        </p>
      </div>

      {/* reservation form */}
      <div className="lg:col-span-5">
        <form action={action} className="space-y-5 lg:sticky lg:top-24" noValidate>
          <input type="hidden" name="items" value={JSON.stringify(payload)} />
          <div className="absolute -left-[9999px] top-0" aria-hidden="true">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <p className="t-label">reserve</p>
          <div>
            <label htmlFor="c-email" className="t-label mb-2 block">
              email
            </label>
            <input id="c-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} aria-invalid={state.errors?.email ? true : undefined} />
            {state.errors?.email && <p className="mt-2 text-[13px] text-signal">{state.errors.email}</p>}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="c-name" className="t-label mb-2 block">
                name
              </label>
              <input id="c-name" name="name" required autoComplete="name" className={field} aria-invalid={state.errors?.name ? true : undefined} />
              {state.errors?.name && <p className="mt-2 text-[13px] text-signal">{state.errors.name}</p>}
            </div>
            <div>
              <label htmlFor="c-org" className="t-label mb-2 block">
                organization · optional
              </label>
              <input id="c-org" name="organization" autoComplete="organization" className={field} />
            </div>
          </div>
          <div>
            <label htmlFor="c-robots" className="t-label mb-2 block">
              robot it will mount on · optional
            </label>
            <input id="c-robots" name="robots" placeholder="e.g. UR5e, Franka FR3, own platform" className={field} />
          </div>
          <div>
            <label htmlFor="c-message" className="t-label mb-2 block">
              notes · optional
            </label>
            <textarea id="c-message" name="message" className={`${field} h-auto min-h-[6rem] resize-y py-3`} placeholder="objects, task, timeline" />
          </div>
          {state.message && (
            <p role="alert" className="border border-signal px-4 py-3 text-[14px]">
              {state.message}{" "}
              <a href={`mailto:${site.email}`} className="underline">
                {site.email}
              </a>
            </p>
          )}
          <Button disabled={pending} className="w-full">
            {pending ? "sending" : "place reservation"} <Arrow />
          </Button>
          <p className="text-[13px] leading-relaxed text-ink-2">
            No payment now. No account needed. We email you when prices and dates are fixed.
          </p>
        </form>
      </div>
    </div>
  );
}
