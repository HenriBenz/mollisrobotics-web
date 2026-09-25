import type { FigureId } from "@/lib/products";
import { CorePart, FingersPart, HeldObject, LinkPart, RobotPart, ToolPart } from "@/components/figures/parts";

/**
 * Product shots. Each figure reuses the shared technical-drawing parts and
 * crops the viewBox to the part in question, so every product is drawn in
 * the same style and scale family.
 */
const boxes: Record<FigureId, string> = {
  "kit-grip": "-60 -20 520 620",
  "kit-soft": "-60 -20 520 620",
  "kit-research": "-60 -20 520 620",
  link: "60 -40 280 280",
  "link-blank": "60 -40 280 280",
  core: "60 78 280 280",
  grip: "60 300 280 280",
  soft: "60 300 280 280",
  hand: "60 300 280 280",
  pick: "60 300 280 280",
  "fingers-rigid": "60 330 280 280",
  "fingers-soft": "60 330 280 280",
  "fingers-blank": "60 330 280 280",
  sense: "60 78 280 280",
  cable: "0 0 400 400",
};

export function ProductFigure({ figure, className = "", withRobot = false }: { figure: FigureId; className?: string; withRobot?: boolean }) {
  return (
    <svg viewBox={boxes[figure]} className={`h-full w-full ${className}`} aria-hidden="true">
      <Figure figure={figure} withRobot={withRobot} />
    </svg>
  );
}

function Figure({ figure, withRobot }: { figure: FigureId; withRobot: boolean }) {
  switch (figure) {
    case "kit-grip":
      return (
        <>
          {withRobot && <RobotPart />}
          <LinkPart />
          <CorePart />
          <ToolPart variant="industry" />
          <HeldObject variant="industry" />
          <FingersPart variant="industry" grip={1} />
        </>
      );
    case "kit-soft":
      return (
        <>
          {withRobot && <RobotPart />}
          <LinkPart />
          <CorePart />
          <ToolPart variant="agriculture" />
          <HeldObject variant="agriculture" />
          <FingersPart variant="agriculture" grip={1} />
        </>
      );
    case "kit-research":
      return (
        <>
          {withRobot && <RobotPart />}
          <LinkPart />
          <CorePart />
          <ToolPart variant="industry" />
          <FingersPart variant="industry" grip={0.4} />
          {/* second tool module laid beside the stack */}
          <g transform="translate(300 330) scale(0.5)">
            <ToolPart variant="agriculture" />
            <FingersPart variant="agriculture" grip={0.15} />
          </g>
        </>
      );
    case "link":
      return <LinkPart />;
    case "link-blank":
      return (
        <g>
          <rect x="126" y="84" width="148" height="28" rx="4" fill="var(--alu)" />
          <rect x="126" y="84" width="148" height="5" rx="2" fill="var(--alu-3)" opacity="0.9" />
          <rect x="170" y="112" width="60" height="8" rx="1.5" fill="var(--polymer-2)" />
          <circle cx="200" cy="98" r="4" fill="none" stroke="var(--alu-2)" strokeDasharray="2 2" />
        </g>
      );
    case "core":
      return <CorePart />;
    case "grip":
      return (
        <>
          <ToolPart variant="industry" />
          <FingersPart variant="industry" grip={0.5} />
        </>
      );
    case "soft":
      return (
        <>
          <ToolPart variant="agriculture" />
          <FingersPart variant="agriculture" grip={0.35} />
        </>
      );
    case "hand":
      return (
        <>
          <ToolPart variant="humanoid" />
          <FingersPart variant="humanoid" grip={0.4} />
        </>
      );
    case "pick":
      return (
        <>
          <ToolPart variant="agriculture" />
          <HeldObject variant="agriculture" />
          <FingersPart variant="agriculture" grip={1} />
          <line x1="200" y1="456" x2="200" y2="420" stroke="var(--signal)" strokeWidth="1.5" strokeDasharray="2 3" />
        </>
      );
    case "fingers-rigid":
      return <FingersPart variant="industry" grip={0.6} />;
    case "fingers-soft":
      return <FingersPart variant="agriculture" grip={0.25} />;
    case "fingers-blank":
      return (
        <g>
          {[140, 176, 212, 248].map((x) => (
            <g key={x}>
              <rect x={x} y="380" width="14" height="60" rx="2" fill="var(--polymer)" />
              <rect x={x} y="440" width="14" height="90" rx="2" fill="none" stroke="var(--steel)" strokeDasharray="3 3" />
            </g>
          ))}
        </g>
      );
    case "sense":
      return (
        <g>
          <rect x="120" y="190" width="160" height="26" rx="6" fill="var(--polymer)" />
          <rect x="120" y="190" width="160" height="4" rx="2" fill="var(--alu-2)" />
          {[150, 200, 250].map((x) => (
            <circle key={x} cx={x} cy="205" r="3" fill="var(--signal)" opacity="0.9" />
          ))}
          <rect x="140" y="216" width="120" height="12" rx="2" fill="var(--alu-2)" />
        </g>
      );
    case "cable":
      return (
        <g fill="none" stroke="var(--polymer)" strokeWidth="10" strokeLinecap="round">
          <path d="M80,200 C80,120 200,120 200,200 S320,280 320,200" />
          <circle cx="80" cy="200" r="14" fill="var(--alu-2)" stroke="none" />
          <circle cx="320" cy="200" r="14" fill="var(--alu-2)" stroke="none" />
        </g>
      );
  }
}
