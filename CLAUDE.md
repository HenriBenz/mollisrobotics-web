@AGENTS.md

# Project notes

- Read HANDOVER.md before starting work. It holds the brief, decisions, status and next steps. Update it when a decision is made or a step is completed.
- lib/site.ts is the single source of truth for navigation, CTAs, architecture, modules and their status.
- Every module or resource shown on the site carries a Status (concept, development, prototype, available). Nothing is available yet. Keep it honest.
- Product visuals are SVG technical drawings in components/figures/parts.tsx sharing one coordinate system. No stock imagery, no gradients, no blue.
- Motion is slow and mechanical and must respect prefers-reduced-motion.
- Run npm run lint and npm run build before committing.
