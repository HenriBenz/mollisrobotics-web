import { neon } from "@neondatabase/serverless";

/**
 * Neon Postgres over HTTP. Safe to call per request on Vercel Functions.
 * Returns null when DATABASE_URL is not configured (e.g. a fresh clone) so the
 * site still renders; forms will then report a configuration error.
 */
export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

export type LeadKind = "early_access" | "partner" | "reservation";

export interface LeadInput {
  kind: LeadKind;
  email: string;
  name?: string;
  organization?: string;
  role?: string;
  robots?: string;
  application?: string;
  message?: string;
  /** Store reservations: validated cart items. Stored as JSONB. */
  items?: unknown;
  sourcePath?: string;
  userAgent?: string;
}

/** Inserts a lead and returns its id. */
export async function insertLead(lead: LeadInput): Promise<number> {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured");
  const rows = await sql`
    INSERT INTO leads (kind, email, name, organization, role, robots, application, message, items, source_path, user_agent)
    VALUES (
      ${lead.kind}, ${lead.email}, ${lead.name ?? null}, ${lead.organization ?? null},
      ${lead.role ?? null}, ${lead.robots ?? null}, ${lead.application ?? null},
      ${lead.message ?? null}, ${lead.items ? JSON.stringify(lead.items) : null}::jsonb,
      ${lead.sourcePath ?? null}, ${lead.userAgent ?? null}
    )
    RETURNING id
  `;
  return Number(rows[0].id);
}
