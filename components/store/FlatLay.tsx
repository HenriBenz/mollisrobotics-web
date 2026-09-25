import { CorePart, FingersPart, LinkPart, ToolPart } from "@/components/figures/parts";

/**
 * Knolled module family on an engineering grid. Store header image.
 * Each module is drawn with the shared parts, scaled and placed on a 4x2 grid.
 */
export function FlatLay({ className = "" }: { className?: string }) {
  const cells: { label: string; x: number; y: number; node: React.ReactNode; box: [number, number, number, number] }[] = [
    { label: "ML–50 link", x: 0, y: 0, box: [60, -40, 280, 280], node: <LinkPart /> },
    { label: "MC–01 core", x: 1, y: 0, box: [60, 78, 280, 280], node: <CorePart /> },
    {
      label: "MT–G1 grip",
      x: 2,
      y: 0,
      box: [60, 300, 280, 280],
      node: (
        <>
          <ToolPart variant="industry" />
          <FingersPart variant="industry" grip={0.5} />
        </>
      ),
    },
    {
      label: "MT–S1 soft",
      x: 3,
      y: 0,
      box: [60, 300, 280, 280],
      node: (
        <>
          <ToolPart variant="agriculture" />
          <FingersPart variant="agriculture" grip={0.3} />
        </>
      ),
    },
    {
      label: "MT–H1 hand",
      x: 0,
      y: 1,
      box: [60, 300, 280, 280],
      node: (
        <>
          <ToolPart variant="humanoid" />
          <FingersPart variant="humanoid" grip={0.4} />
        </>
      ),
    },
    { label: "MF–R1 rigid", x: 1, y: 1, box: [60, 330, 280, 280], node: <FingersPart variant="industry" grip={0.6} /> },
    { label: "MF–S1 compliant", x: 2, y: 1, box: [60, 330, 280, 280], node: <FingersPart variant="agriculture" grip={0.25} /> },
    {
      label: "MF–00 blanks",
      x: 3,
      y: 1,
      box: [60, 330, 280, 280],
      node: (
        <g>
          {[140, 176, 212, 248].map((x) => (
            <g key={x}>
              <rect x={x} y="380" width="14" height="60" rx="2" fill="var(--polymer)" />
              <rect x={x} y="440" width="14" height="90" rx="2" fill="none" stroke="var(--steel)" strokeDasharray="3 3" />
            </g>
          ))}
        </g>
      ),
    },
  ];

  const cell = 200;
  const W = cell * 4;
  const H = cell * 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`h-auto w-full ${className}`} role="img" aria-label="The MOLLIS module family laid out on a grid">
      {/* grid */}
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={`v${i}`} x1={i * cell} y1="0" x2={i * cell} y2={H} stroke="var(--line)" />
      ))}
      {Array.from({ length: 3 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * cell} x2={W} y2={i * cell} stroke="var(--line)" />
      ))}
      {cells.map((c) => {
        const [bx, by, bw, bh] = c.box;
        const pad = 28;
        const s = (cell - pad * 2) / Math.max(bw, bh);
        const tx = c.x * cell + pad - bx * s + ((cell - pad * 2) - bw * s) / 2;
        const ty = c.y * cell + pad - by * s + ((cell - pad * 2) - bh * s) / 2;
        return (
          <g key={c.label}>
            <g transform={`translate(${tx} ${ty}) scale(${s})`}>{c.node}</g>
            <text
              x={c.x * cell + 12}
              y={c.y * cell + cell - 12}
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="9"
              letterSpacing="1.5"
              fill="var(--ink-2)"
            >
              {c.label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
