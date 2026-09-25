import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-paper border border-ink hover:bg-signal hover:border-signal",
  secondary: "bg-transparent text-ink border border-ink/25 hover:border-ink hover:bg-ink hover:text-paper",
  ghost: "bg-transparent text-ink border border-transparent hover:bg-paper-2",
  inverse: "bg-paper text-ink border border-paper hover:bg-signal hover:border-signal hover:text-paper",
};

const base =
  "inline-flex items-center justify-center gap-2 h-12 rounded-full px-6 text-[15px] font-medium tracking-tight transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-50 disabled:pointer-events-none";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  type = "submit",
  disabled,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "submit" | "button";
  disabled?: boolean;
}) {
  return (
    <button type={type} disabled={disabled} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}

export function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
