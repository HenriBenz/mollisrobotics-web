# MOLLIS Robotics — website

Brand launch and early-access site for MOLLIS Robotics: affordable, modular and adaptive end
effectors. Built with Next.js 16, TypeScript, Tailwind CSS v4 and `motion`. Leads are stored in
Neon Postgres. Deployed on Vercel.

Read [HANDOVER.md](./HANDOVER.md) first. It holds the brief, decisions, status and next steps.

## Develop

```bash
npm install
cp .env.example .env.local   # then fill in DATABASE_URL
npm run dev
```

Open http://localhost:3000.

## Check and build

```bash
npm run lint
npm run build
```

## Where things live

- `lib/site.ts` — navigation, CTAs, architecture, modules and their status, applications
- `app/` — routes (one folder per page), server actions in `app/actions`
- `components/figures/` — the SVG technical drawings and their animations
- `content/updates.ts` — news entries
- `public/brand/`, `public/products/` — logos and product imagery
