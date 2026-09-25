import type { ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  id,
  children,
  className = "",
  rule = true,
  wide = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  rule?: boolean;
  wide?: boolean;
}) {
  return (
    <section id={id} className={`${rule ? "rule" : ""} py-20 sm:py-28 lg:py-36 ${className}`}>
      <Container wide={wide}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`t-label mb-6 ${className}`}>{children}</p>;
}

const sizes = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
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
  return <Tag className={`${sizes[size]} font-medium text-balance ${className}`}>{children}</Tag>;
}

export function Lede({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-lede text-ink-2 max-w-[38ch] text-pretty ${className}`}>{children}</p>;
}
