import Link from "next/link";
import { ctas, nav, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="rule mt-auto">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-[34ch] text-[15px] leading-relaxed text-ink-2">
              Affordable, modular and adaptive end effectors for the next generation of robots.
              Engineered in {site.location}.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="t-label mb-4">Site</p>
            <ul className="space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[15px] text-ink-2 hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="t-label mb-4">Get involved</p>
            <ul className="space-y-2">
              <li>
                <Link href={ctas.primary.href} className="text-[15px] text-ink-2 hover:text-ink">
                  {ctas.primary.label}
                </Link>
              </li>
              <li>
                <Link href={ctas.secondary.href} className="text-[15px] text-ink-2 hover:text-ink">
                  Become a development partner
                </Link>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="text-[15px] text-ink-2 hover:text-ink">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule flex flex-col gap-3 py-6 text-[13px] text-ink-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/imprint" className="hover:text-ink">
              Imprint
            </Link>
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
