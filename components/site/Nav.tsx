"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { CartLink } from "./CartLink";

/** Minimal navigation: logo, four words, checkout. */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation (state adjustment during render, no effect needed).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 bg-paper/70 backdrop-blur-xl">
      <Container wide>
        <div className="flex h-[72px] items-center justify-between">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[14px] tracking-tight transition-colors hover:text-ink ${active ? "text-ink" : "text-ink-2"}`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <CartLink />
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <CartLink />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                {open ? (
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
                ) : (
                  <path d="M2 6h16M2 14h16" stroke="currentColor" strokeWidth="1.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div id="mobile-nav" className="panel mb-3 p-3 md:hidden">
            <nav aria-label="Primary mobile" className="flex flex-col">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl px-4 py-3 text-lg tracking-tight hover:bg-paper-3">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
