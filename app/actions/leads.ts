"use server";

import { headers } from "next/headers";
import { insertLead, type LeadKind } from "@/lib/db";
import { getProduct } from "@/lib/products";

export type LeadState = {
  status: "idle" | "success" | "error";
  message?: string;
  reference?: string;
  errors?: Partial<Record<"email" | "name" | "message", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(form: FormData, key: string, max = 500) {
  const v = form.get(key);
  if (typeof v !== "string") return undefined;
  const trimmed = v.trim();
  return trimmed ? trimmed.slice(0, max) : undefined;
}

async function submit(kind: LeadKind, form: FormData, items?: unknown): Promise<LeadState> {
  // Honeypot: real users never fill this field.
  if (text(form, "website")) return { status: "success", reference: "ok" };

  const email = text(form, "email", 254);
  const name = text(form, "name", 120);
  const message = text(form, "message", 2000);
  const errors: LeadState["errors"] = {};

  if (!email || !EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  if ((kind === "partner" || kind === "reservation") && !name) errors.name = "Tell us who you are.";
  if (kind === "partner" && !message) errors.message = "A sentence or two is enough.";
  if (Object.keys(errors).length) return { status: "error", errors };

  const h = await headers();
  try {
    const id = await insertLead({
      kind,
      email: email!,
      name,
      organization: text(form, "organization", 200),
      role: text(form, "role", 120),
      robots: text(form, "robots", 300),
      application: text(form, "application", 120),
      message,
      items,
      sourcePath: text(form, "source", 200),
      userAgent: h.get("user-agent")?.slice(0, 300) ?? undefined,
    });
    return { status: "success", reference: `M-${String(id).padStart(5, "0")}` };
  } catch (err) {
    console.error("[leads] insert failed", err);
    return {
      status: "error",
      message: "We could not save your request. Please email us directly.",
    };
  }
}

export async function joinEarlyAccess(_prev: LeadState, form: FormData): Promise<LeadState> {
  return submit("early_access", form);
}

export async function requestPartnership(_prev: LeadState, form: FormData): Promise<LeadState> {
  return submit("partner", form);
}

/**
 * Store checkout. Items arrive as JSON from the client cart and are
 * re-validated against the catalogue so only real products are stored.
 */
export async function reserveCart(_prev: LeadState, form: FormData): Promise<LeadState> {
  let items: { slug: string; code: string; name: string; options: Record<string, string>; qty: number }[] = [];
  try {
    const raw = form.get("items");
    const parsed = typeof raw === "string" ? (JSON.parse(raw) as unknown[]) : [];
    items = parsed
      .map((x) => {
        const i = x as { slug?: unknown; options?: unknown; qty?: unknown };
        const p = typeof i.slug === "string" ? getProduct(i.slug) : undefined;
        if (!p || p.availability !== "reserve") return null;
        const options: Record<string, string> = {};
        if (i.options && typeof i.options === "object") {
          for (const [k, v] of Object.entries(i.options as Record<string, unknown>)) {
            if (typeof v === "string") options[k.slice(0, 40)] = v.slice(0, 120);
          }
        }
        const qty = Math.max(1, Math.min(99, Number(i.qty) || 1));
        return { slug: p.slug, code: p.code, name: p.name, options, qty };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null)
      .slice(0, 50);
  } catch {
    items = [];
  }
  if (items.length === 0) {
    return { status: "error", message: "Your cart is empty or contains items that cannot be reserved yet." };
  }
  return submit("reservation", form, items);
}
