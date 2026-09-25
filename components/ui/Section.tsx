import type { ReactNode } from "react";
import { Container } from "./Container";

type Tone = "plain" | "grey" | "ink" | "sand" | "grid";

const panelTone: Record<Exclude<Tone, "plain">, string> = {
  grey: "panel",
  ink: "panel-ink",
  sand: "panel-sand",
  grid: "panel grid-paper",
};

/**
 * Page section. `tone="plain"` is open whitespace; any other tone renders the
 * content inside a rounded panel with its own padding, so the page reads as a
 * sequence of surfaces rather than full-bleed bands.
 */
export function Section({
  id,
  children,
  className = "",
  tone = "plain",
  rule = false,
  wide = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: Tone;
  rule?: boolean;
  wide?: boolean;
}) {
  if (tone === "plain") {
    return (
      <section id={id} className={`${rule ? "rule" : ""} py-16 sm:py-24 lg:py-32 ${className}`}>
        <Container wide={wide}>{children}</Container>
      </section>
    );
  }
  return (
    <section id={id} className={`py-3 sm:py-4 ${className}`}>
      <Container wide>
        <div className={`${panelTone[tone]} px-6 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-28`}>
          <div className={wide ? "" : "mx-auto max-w-[1200px]"}>{children}</div>
        </div>
      </Container>
    </section>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`t-label mb-6 ${className}`}>{children}</p>;
}

const sizes = {
  display: "text-display font-semibold",
  h1: "text-h1 font-semibold",
  h2: "text-h2 font-medium",
} as const;

export function Headline({
  children,
  as: Tag = "h2",
  size = "h2",
  className = "",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: keyof typeof sizes;
  className?: string;
}) {
  return <Tag className={`${sizes[size]} text-balance ${className}`}>{children}</Tag>;
}

export function Lede({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-lede max-w-[38ch] text-pretty opacity-80 ${className}`}>{children}</p>;
}
