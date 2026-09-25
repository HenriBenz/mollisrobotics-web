# MOLLIS Robotics website — handover

Living record of what this project is, the decisions behind it, what is done and what is next.
Update it whenever something changes. Newest decisions go at the top of the decision log.

## 1. What this is

The first public website for **MOLLIS Robotics**, an early-stage German robotics hardware company
building affordable, modular and adaptive end effectors. The site is a **brand launch and
early-access page**, not a product catalogue. It must:

- explain the platform idea visually: **Robot → Link → Core → Tool → Fingers**
- show the same platform reconfigured for **Humanoid, Agriculture and Industry**
- distinguish honestly between concept, in development, prototype and available
- convert to **Join early access** (primary) and **Talk to us / Become a development partner** (secondary)
- be extendable later with product pages, developer docs, CAD downloads, a store and a
  Kickstarter/production launch without a redesign

The full creative brief (project JSON and prose) was supplied in the founding session on 2026-09-25.
Its content lives in the code: copy in `lib/site.ts` and the page files, structure in `app/`.

## 2. Stack and infrastructure

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript | scaffolded with create-next-app |
| Styling | Tailwind CSS v4, tokens in `app/globals.css` | no component library |
| Motion | `motion` (Framer Motion successor), `motion/react` | used only where it explains engineering |
| Fonts | Geist (sans) + Geist Mono via `next/font` | neo-grotesk + technical mono, per brief |
| Database | Neon Postgres, project `mollisrobotics-web`, id `odd-boat-46392836`, region `aws-eu-central-1` (Frankfurt), Postgres 18 | table `leads` |
| Hosting | Vercel, project `mollisrobotics-web` on team `henribenzs-projects`, live at mollisrobotics-web.vercel.app | domains **mollyrobotics.com** and **mollyrobotics.de** added, DNS pending |
| Source | GitHub `HenriBenz/mollisrobotics-web`, branch `main` | |
| Analytics | `@vercel/analytics` mounted in the root layout | activates once deployed on Vercel |

Environment variables (see `.env.example`):

- `DATABASE_URL` — Neon pooled connection string. Set locally in `.env.local` (gitignored) and in Vercel for Production/Preview.
- `NEXT_PUBLIC_SITE_URL` — canonical site URL for metadata and sitemap. Defaults to `https://mollyrobotics.com`.

## 3. Repository map

```
app/
  layout.tsx            root layout: fonts, metadata, Nav, Footer, Analytics
  page.tsx              homepage (visually led, per brief)
  platform/             architecture, layer-by-layer, module status table, robot compatibility, open interface
  applications/         application switcher + six application categories
  developers/           roadmap of developer resources with status
  about/                philosophy, beliefs, name origin
  updates/ [slug]/      news list + detail, data from content/updates.ts
  early-access/         primary conversion form
  contact/              partner inquiry form
  imprint/  privacy/    legal skeletons (must be completed before launch)
  actions/leads.ts      server actions: validate + insert into Neon
  sitemap.ts robots.ts  SEO
components/
  figures/parts.tsx     the SVG technical drawing parts (Robot, Link, Core, Tool, Fingers, objects)
  figures/ExplodedAssembly.tsx   scroll-driven exploded view that assembles (homepage + platform)
  figures/ApplicationSwitcher.tsx same Link+Core, different Tool+Fingers per application
  figures/SoftFingerDemo.tsx     one compliant finger adapting to round and square objects
  figures/HeroFigure.tsx         assembled stack closing on a sphere
  site/                 Nav, Footer, Logo, PageHeader
  ui/                   Container, Section/Eyebrow/Headline/Lede, Button, StatusPill
forms/LeadForms.tsx     EarlyAccessForm and PartnerForm (client, useActionState)
lib/site.ts             single source of truth: nav, CTAs, architecture, modules + status, applications
lib/db.ts               Neon client and insertLead
content/updates.ts      updates as typed data (CMS-ready)
public/brand/           logos and wordmarks (add files here)
public/products/        product and lab photography (add files here)
```

## 4. Design decisions

- **Palette**: warm paper `#f4f2ed`, ink `#141414`, industrial greys, a single signal tone `#e2521f`
  used only for hover states, LEDs and the "available" status. No blue, no gradients.
- **Typography**: large editorial headlines (`text-display`, `text-h1`, `text-h2` tokens), short
  statements, generous whitespace. Technical labels use Geist Mono, uppercase, tracked (`.t-label`).
- **Imagery**: no stock photos, no renders. All product visuals are hand-drawn SVG technical
  drawings sharing one coordinate system (`components/figures/parts.tsx`). Materials are CSS
  variables (polymer, aluminium, elastomer) so drawings follow the tokens. When real photography
  exists, it goes in `public/products/` and should replace or complement the drawings.
- **Motion**: slow, mechanical, explanatory. The exploded assembly is scroll-driven; tool changes
  dock from below; fingers close on objects. Everything respects `prefers-reduced-motion`.
- **Status system**: `Status` type in `lib/site.ts` (`concept | development | prototype | available`)
  and `StatusPill`. Currently nothing is marked available. Keep this honest.
- **Copy**: the brief's core lines are used as section headlines. No startup jargon.

## 5. Data and forms

- Both forms post to server actions in `app/actions/leads.ts`, which validate, apply a honeypot
  (`website` field) and insert into the Neon `leads` table.
- Schema (created 2026-09-25):
  `leads(id bigserial, kind text check in ('early_access','partner'), email, name, organization, role, robots, application, message, source_path, user_agent, created_at timestamptz)`
  plus index `leads_kind_created_idx (kind, created_at desc)`.
- One test row exists (`test-submission@example.com`, id 1) from the founding session. Delete it
  when convenient.
- To read leads: Neon console, or `SELECT * FROM leads ORDER BY created_at DESC`.
- No email notification yet. See next steps.

## 6. Decision log

- **2026-09-25** Neon chosen as backend (user decision), provisioned in Frankfurt for GDPR locality.
- **2026-09-25** Forms store to Postgres directly rather than a third-party form service, so the
  lead list is owned and can feed a CRM or newsletter tool later.
- **2026-09-25** Product visuals are SVG drawings, not placeholder photos, because no photography
  exists yet and the brief forbids stock imagery. The drawings are also what animate.
- **2026-09-25** Updates are typed data in `content/updates.ts` rather than a CMS. Swap to MDX or a
  headless CMS when volume justifies it; the page API will not change.
- **2026-09-25** Legal pages are skeletons with placeholders. They are `noindex` until completed.
- **2026-09-25** Domains stated by the user are `mollyrobotics.com` / `mollyrobotics.de` (with a "y").
  The brand is spelled MOLLIS. Confirm the domain spelling before buying or configuring DNS.

## 7. Status (2026-09-25)

Done:
- Full site: 13 routes, all statically prerendered, `npm run build` and `npm run lint` clean.
- Neon database provisioned, schema created, early-access form verified end to end.
- Pushed to GitHub `main`.
- Logo supplied as four PNGs; cropped into mark, wordmark and lockup (`scripts/crop-logo.py`),
  wired into nav and footer; favicon, Apple icon and Open Graph image generated from it.

- **Deployed on Vercel** (2026-09-25): project `mollisrobotics-web`
  (`prj_NbFhA0UVYdeh2brkqEOMcwahsvqp`) on team `henribenzs-projects`
  (`team_K9gAscKxQ9Q30nuBWa5UCa3j`, hobby plan). GitHub repo connected, so every push to
  `main` deploys to production and every branch gets a preview. Functions region `fra1`.
  Live at https://mollisrobotics-web.vercel.app. `DATABASE_URL` set for Production and
  Preview (sensitive), `NEXT_PUBLIC_SITE_URL` set for Production.
  Linked via the Vercel CLI (`vercel link`); the Vercel MCP token only had read access.
- Domains `mollyrobotics.com`, `www.mollyrobotics.com` and `mollyrobotics.de` are added to
  the project but **not yet verified**, see step 1.

Not done / next steps, in order:
1. **Point DNS at Vercel.** `mollyrobotics.com` is registered at Spaceship (nameservers
   `launch1/launch2.spaceship.net`). In the Spaceship DNS panel add
   `A  @  76.76.21.21` and `CNAME  www  cname.vercel-dns.com`, or switch the nameservers to
   `ns1.vercel-dns.com` / `ns2.vercel-dns.com`. `mollyrobotics.de` showed no nameservers at all,
   so it may not be registered yet; register it, then add the same A record. Vercel verifies
   automatically and issues certificates. Check with `vercel domains inspect mollyrobotics.com`.
2. Decide whether `.de` redirects to `.com` (site is English only; recommended: 308 redirect,
   set in Vercel project settings > Domains) or later serves a German version.
3. Add lead notifications (email on new lead, e.g. via a Vercel Marketplace email integration) and
   an export path to the newsletter/CRM tool of choice.
4. Complete `app/imprint` and `app/privacy` with the legal entity details; remove `noindex`.
5. Ask the designer for SVG versions of the mark and wordmark and swap them into `components/site/Logo.tsx`.
6. Replace or complement SVG drawings with product photography as prototypes are photographed
   (drop files in `public/products/`).
7. German language version (`/de`) if the `.de` domain should carry localized content.
8. Delete the test lead row (id 1) from Neon.

## 8. Working agreements

- Keep `lib/site.ts` the single source of truth for navigation, CTAs, architecture and module status.
- Every new module, capability or resource shown on the site carries a `Status`.
- Run `npm run lint && npm run build` before committing.
- Update this file when a decision is made or a next step is completed.
