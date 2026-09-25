"use server";

import { headers } from "next/headers";
import { insertLead, type LeadKind } from "@/lib/db";

export type LeadState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"email" | "name" | "message", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(form: FormData, key: string, max = 500) {
  const v = form.get(key);
  if (typeof v !== "string") return undefined;
  const trimmed = v.trim();
  return trimmed ? trimmed.slice(0, max) : undefined;
}

async function submit(kind: LeadKind, form: FormData): Promise<LeadState> {
  // Honeypot: real users never fill this field.
  if (text(form, "website")) return { status: "success" };

  const email = text(form, "email", 254);
  const name = text(form, "name", 120);
  const message = text(form, "message", 2000);
  const errors: LeadState["errors"] = {};

  if (!email || !EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  if (kind === "partner" && !name) errors.name = "Tell us who you are.";
  if (kind === "partner" && !message) errors.message = "A sentence or two is enough.";
  if (Object.keys(errors).length) return { status: "error", errors };

  const h = await headers();
  try {
    await insertLead({
      kind,
      email: email!,
      name,
      organization: text(form, "organization", 200),
      role: text(form, "role", 120),
      robots: text(form, "robots", 300),
      application: text(form, "application", 120),
      message,
      sourcePath: text(form, "source", 200),
      userAgent: h.get("user-agent")?.slice(0, 300) ?? undefined,
    });
  } catch (err) {
    console.error("[leads] insert failed", err);
    return {
      status: "error",
      message: "We could not save your request. Please email us directly.",
    };
  }
  return { status: "success" };
}

export async function joinEarlyAccess(_prev: LeadState, form: FormData): Promise<LeadState> {
  return submit("early_access", form);
}

export async function requestPartnership(_prev: LeadState, form: FormData): Promise<LeadState> {
  return submit("partner", form);
}
