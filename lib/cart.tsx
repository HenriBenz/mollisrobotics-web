"use client";

import { useSyncExternalStore } from "react";
import { getProduct } from "./products";

export interface CartItem {
  slug: string;
  options: Record<string, string>;
  qty: number;
}

export function itemKey(item: Pick<CartItem, "slug" | "options">) {
  const opts = Object.keys(item.options)
    .sort()
    .map((k) => `${k}=${item.options[k]}`)
    .join("&");
  return `${item.slug}?${opts}`;
}

/**
 * Tiny external cart store persisted to localStorage.
 * Read with useSyncExternalStore so server render and hydration see an
 * empty cart, and the stored cart appears right after hydration.
 */
const STORAGE = "mollis.cart.v1";
const EMPTY: CartItem[] = [];
let items: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function persist() {
  try {
    localStorage.setItem(STORAGE, JSON.stringify(items));
  } catch {
    /* storage unavailable */
  }
}

function load() {
  if (loaded) return;
  loaded = true;
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) {
      const parsed = JSON.parse(raw) as CartItem[];
      items = parsed.filter((i) => getProduct(i.slug));
    }
  } catch {
    /* storage unavailable */
  }
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  load();
  return () => {
    listeners.delete(cb);
  };
}

function set(next: CartItem[]) {
  items = next;
  persist();
  emit();
}

export const cart = {
  add(item: Omit<CartItem, "qty">, qty = 1) {
    const key = itemKey(item);
    const idx = items.findIndex((i) => itemKey(i) === key);
    if (idx === -1) return set([...items, { ...item, qty }]);
    const next = [...items];
    next[idx] = { ...next[idx], qty: Math.min(99, next[idx].qty + qty) };
    set(next);
  },
  setQty(key: string, qty: number) {
    set(items.map((i) => (itemKey(i) === key ? { ...i, qty: Math.max(1, Math.min(99, qty)) } : i)));
  },
  remove(key: string) {
    set(items.filter((i) => itemKey(i) !== key));
  },
  clear() {
    set(EMPTY);
  },
};

export function useCart() {
  const current = useSyncExternalStore(subscribe, () => items, () => EMPTY);
  const hydrated = useSyncExternalStore(subscribe, () => loaded, () => false);
  return {
    items: current,
    count: current.reduce((n, i) => n + i.qty, 0),
    hydrated,
    add: cart.add,
    setQty: cart.setQty,
    remove: cart.remove,
    clear: cart.clear,
  };
}
