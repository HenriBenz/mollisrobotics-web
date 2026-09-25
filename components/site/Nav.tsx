"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { CartLink } from "./CartLink";

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
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <Container wide>
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-10">
            <Logo />
            <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
              {nav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-[15px] tracking-tight transition-colors hover:text-ink ${
                      active ? "text-ink underline underline-offset-[6px]" : "text-ink-2"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/early-access" className="hidden text-[15px] tracking-tight text-ink-2 hover:text-ink md:inline">
              early access
            </Link>
            <CartLink />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center md:hidden"
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
      </Container>

      {open && (
        <div id="mobile-nav" className="border-t border-line md:hidden">
          <Container wide>
            <nav aria-label="Primary mobile" className="flex flex-col py-2">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="rule py-4 text-lg tracking-tight first:border-t-0">
                  {item.label}
                </Link>
              ))}
              <Link href="/early-access" className="rule py-4 text-lg tracking-tight">
                early access
              </Link>
              <Link href="/store/build" className="rule py-4 text-lg tracking-tight">
                build your tool
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
