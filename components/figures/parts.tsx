/**
 * Technical drawing parts for the MOLLIS stack.
 *
 * All parts share one coordinate system (viewBox 0 0 400 600, centre x = 200)
 * and are drawn at their assembled position. Figures wrap them in <motion.g>
 * to explode, swap or animate them. Materials come from CSS variables so the
 * drawings follow the design tokens in app/globals.css.
 */
import type { ApplicationId } from "@/lib/site";

export const VIEWBOX = "0 0 400 600";
export const CX = 200;

export type ToolVariant = ApplicationId; // industry = Grip, agriculture = Soft, humanoid = Hand

const polymer = "var(--polymer)";
const polymer2 = "var(--polymer-2)";
const alu = "var(--alu)";
const alu2 = "var(--alu-2)";
const alu3 = "var(--alu-3)";
const elastomer = "var(--elastomer)";
const elastomer2 = "var(--elastomer-2)";
const signal = "var(--signal)";

/* ------------------------------------------------------------------ */
/* 00 Robot: arm stub and ISO flange                                    */
/* ------------------------------------------------------------------ */
export function RobotPart() {
  return (
    <g data-part="robot">
      <rect x="150" y="0" width="100" height="56" rx="14" fill={alu2} />
      <rect x="160" y="6" width="4" height="44" rx="2" fill={alu3} opacity="0.7" />
      <rect x="118" y="56" width="164" height="22" rx="3" fill={alu} />
      <rect x="118" y="56" width="164" height="3" fill={alu3} opacity="0.8" />
      {[140, 180, 220, 260].map((x) => (
        <circle key={x} cx={x} cy="67" r="3" fill="none" stroke={alu2} strokeWidth="1.25" />
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* 01 Link: robot-specific adapter                                      */
/* ------------------------------------------------------------------ */
export function LinkPart() {
  return (
    <g data-part="link">
      <rect x="126" y="84" width="148" height="28" rx="4" fill={polymer} />
      <rect x="126" y="84" width="148" height="5" rx="2" fill={alu2} />
      {[146, 182, 218, 254].map((x) => (
        <circle key={x} cx={x} cy="101" r="3.5" fill={alu3} />
      ))}
      <rect x="170" y="112" width="60" height="8" rx="1.5" fill={polymer2} />
      <rect x="190" y="114" width="20" height="3" rx="1" fill={signal} opacity="0.9" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* 02 Core: actuation and electronics                                   */
/* ------------------------------------------------------------------ */
export function CorePart() {
  return (
    <g data-part="core">
      <rect x="116" y="126" width="168" height="170" rx="12" fill={polymer} />
      <rect x="120" y="130" width="160" height="6" rx="3" fill="#ffffff" opacity="0.06" />
      <line x1="116" y1="248" x2="284" y2="248" stroke="#ffffff" strokeOpacity="0.12" />
      {[166, 176, 186].map((y) => (
        <line key={y} x1="136" y1={y} x2="166" y2={y} stroke={alu2} strokeOpacity="0.55" strokeWidth="1.5" />
      ))}
      <circle cx="262" cy="150" r="3" fill={signal} />
      <text
        x="134"
        y="284"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="9"
        letterSpacing="2"
        fill={alu2}
      >
        MOLLIS CORE
      </text>
      <rect x="140" y="296" width="120" height="14" rx="2" fill={alu2} />
      <rect x="140" y="296" width="120" height="3" fill={alu3} opacity="0.9" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* 03 Tool: task module (three variants)                                */
/* ------------------------------------------------------------------ */
export function ToolPart({ variant }: { variant: ToolVariant }) {
  if (variant === "industry") {
    // Grip: parallel gripper body with linear rail and two carriages
    return (
      <g data-part="tool">
        <rect x="104" y="316" width="192" height="64" rx="8" fill={alu} />
        <rect x="104" y="316" width="192" height="3" fill={alu3} opacity="0.9" />
        <rect x="118" y="366" width="164" height="8" rx="2" fill={polymer2} />
        <rect x="126" y="360" width="38" height="20" rx="2" fill={polymer} />
        <rect x="236" y="360" width="38" height="20" rx="2" fill={polymer} />
        {[136, 154, 246, 264].map((x) => (
          <circle key={x} cx={x} cy="334" r="2.5" fill="none" stroke={alu2} strokeWidth="1.25" />
        ))}
      </g>
    );
  }
  if (variant === "agriculture") {
    // Soft: compact manifold with two compliant finger mounts
    return (
      <g data-part="tool">
        <rect x="120" y="316" width="160" height="56" rx="10" fill={alu} />
        <rect x="120" y="316" width="160" height="3" fill={alu3} opacity="0.9" />
        <rect x="132" y="372" width="40" height="16" rx="3" fill={polymer} />
        <rect x="228" y="372" width="40" height="16" rx="3" fill={polymer} />
        <circle cx="200" cy="344" r="7" fill="none" stroke={alu2} strokeWidth="1.25" />
        <circle cx="200" cy="344" r="2" fill={alu2} />
      </g>
    );
  }
  // Hand: a palm with three finger bases
  return (
    <g data-part="tool">
      <rect x="124" y="316" width="152" height="72" rx="16" fill={alu} />
      <rect x="124" y="316" width="152" height="3" fill={alu3} opacity="0.9" />
      <rect x="136" y="382" width="26" height="12" rx="3" fill={polymer} />
      <rect x="168" y="382" width="26" height="12" rx="3" fill={polymer} />
      <rect x="240" y="382" width="26" height="12" rx="3" fill={polymer} />
      <line x1="136" y1="356" x2="264" y2="356" stroke={alu2} strokeWidth="1" strokeOpacity="0.7" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* 04 Fingers: contact geometry (three variants)                        */
/* `grip` is 0 (open) to 1 (closed).                                    */
/* ------------------------------------------------------------------ */
export function FingersPart({ variant, grip = 1 }: { variant: ToolVariant; grip?: number }) {
  if (variant === "industry") {
    const dx = 14 * (1 - grip); // travel of each carriage when open
    return (
      <g data-part="fingers">
        <g transform={`translate(${-dx} 0)`}>
          <rect x="132" y="380" width="22" height="150" rx="2" fill={polymer} />
          <rect x="154" y="462" width="8" height="60" rx="1.5" fill={elastomer2} />
        </g>
        <g transform={`translate(${dx} 0)`}>
          <rect x="246" y="380" width="22" height="150" rx="2" fill={polymer} />
          <rect x="238" y="462" width="8" height="60" rx="1.5" fill={elastomer2} />
        </g>
      </g>
    );
  }
  if (variant === "agriculture") {
    return (
      <g data-part="fingers">
        <path d={softFingerPath("left", grip)} fill="none" stroke={elastomer} strokeWidth="18" strokeLinecap="round" />
        <path d={softFingerPath("right", grip)} fill="none" stroke={elastomer} strokeWidth="18" strokeLinecap="round" />
        <path d={softFingerPath("left", grip)} fill="none" stroke={elastomer2} strokeWidth="1" strokeOpacity="0.6" />
        <path d={softFingerPath("right", grip)} fill="none" stroke={elastomer2} strokeWidth="1" strokeOpacity="0.6" />
      </g>
    );
  }
  // Hand: two fingers plus an opposing thumb
  return (
    <g data-part="fingers">
      <path d={handFingerPath(149, grip)} fill="none" stroke={elastomer} strokeWidth="14" strokeLinecap="round" />
      <path d={handFingerPath(181, grip)} fill="none" stroke={elastomer} strokeWidth="14" strokeLinecap="round" />
      <path d={thumbPath(grip)} fill="none" stroke={elastomer} strokeWidth="14" strokeLinecap="round" />
    </g>
  );
}

/**
 * Compliant finger: interpolates between a straight and a wrapped path.
 * Both paths share the same command structure so they can be tweened.
 */
export function softFingerPath(side: "left" | "right", t: number) {
  const m = (x: number) => (side === "left" ? x : 400 - x);
  const l = (a: number, b: number) => a + (b - a) * t;
  // straight -> wrapped control points
  const p = [
    [152, 390, 152, 390],
    [152, 440, 148, 440],
    [152, 480, 136, 484],
    [152, 520, 158, 524],
    [152, 540, 172, 544],
    [152, 552, 180, 554],
    [152, 560, 188, 552],
  ].map(([x0, y0, x1, y1]) => [m(l(x0, x1)), l(y0, y1)]);
  return `M${p[0][0]},${p[0][1]} C${p[1][0]},${p[1][1]} ${p[2][0]},${p[2][1]} ${p[3][0]},${p[3][1]} C${p[4][0]},${p[4][1]} ${p[5][0]},${p[5][1]} ${p[6][0]},${p[6][1]}`;
}

function handFingerPath(x: number, t: number) {
  const l = (a: number, b: number) => a + (b - a) * t;
  return `M${x},396 C${x},430 ${l(x, x + 4)},460 ${l(x, x + 16)},486 C${l(x, x + 24)},506 ${l(x, x + 40)},514 ${l(x, x + 52)},512`;
}

function thumbPath(t: number) {
  const l = (a: number, b: number) => a + (b - a) * t;
  return `M253,396 C253,420 ${l(253, 250)},440 ${l(253, 240)},458 C${l(253, 232)},472 ${l(253, 222)},478 ${l(253, 212)},478`;
}

/* ------------------------------------------------------------------ */
/* Objects held by each configuration                                   */
/* ------------------------------------------------------------------ */
export function HeldObject({ variant }: { variant: ToolVariant }) {
  if (variant === "industry") {
    return (
      <g data-part="object">
        <rect x="166" y="474" width="68" height="40" rx="3" fill={alu3} stroke={alu2} strokeWidth="1.25" />
        <circle cx="200" cy="494" r="7" fill="none" stroke={alu2} strokeWidth="1.25" />
        <line x1="176" y1="484" x2="176" y2="504" stroke={alu2} strokeWidth="1" />
        <line x1="224" y1="484" x2="224" y2="504" stroke={alu2} strokeWidth="1" />
      </g>
    );
  }
  if (variant === "agriculture") {
    return (
      <g data-part="object">
        <path
          d="M200,470 C176,470 165,490 170,510 C176,532 190,548 200,556 C210,548 224,532 230,510 C235,490 224,470 200,470 Z"
          fill="#b9452f"
        />
        {[
          [188, 492],
          [206, 488],
          [196, 508],
          [214, 506],
          [186, 518],
          [204, 528],
        ].map(([x, y]) => (
          <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="1.6" ry="2.4" fill="#f0d9b0" opacity="0.85" />
        ))}
        <path d="M188,470 C192,462 198,460 200,466 C202,460 208,462 212,470 C206,472 194,472 188,470 Z" fill="#5f7a4b" />
        <line x1="200" y1="466" x2="200" y2="456" stroke="#5f7a4b" strokeWidth="2" strokeLinecap="round" />
      </g>
    );
  }
  return (
    <g data-part="object">
      <rect x="206" y="418" width="34" height="14" rx="4" fill={alu2} />
      <rect x="196" y="430" width="54" height="120" rx="10" fill={alu3} stroke={alu2} strokeWidth="1.25" />
      <rect x="206" y="470" width="34" height="34" rx="2" fill="none" stroke={alu2} strokeWidth="1" opacity="0.7" />
    </g>
  );
}

/* Small dimension line helper for technical labels */
export function Leader({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--steel)" strokeWidth="1" />
      <circle cx={x1} cy={y1} r="2" fill="var(--steel)" />
    </g>
  );
}
