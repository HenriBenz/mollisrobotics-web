import Link from "next/link";

/**
 * Text wordmark. Replace with an SVG from public/brand/ once the logo exists.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-baseline gap-2 text-[17px] font-semibold tracking-[0.18em] ${className}`}
      aria-label="MOLLIS Robotics, home"
    >
      MOLLIS
      <span className="t-label hidden sm:inline">Robotics</span>
    </Link>
  );
}
