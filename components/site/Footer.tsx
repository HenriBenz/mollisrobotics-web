import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";

/** One-line footer. */
export function Footer() {
  return (
    <footer className="mt-auto py-10">
      <Container wide>
        <div className="flex flex-col gap-6 text-[13px] text-ink-2 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.fullName}
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            {footerNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-ink">
                {item.label}
              </Link>
            ))}
            <Link href="/early-access" className="hover:text-ink">
              Early access
            </Link>
            <Link href="/imprint" className="hover:text-ink">
              Imprint
            </Link>
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
          </nav>
          <a href={`mailto:${site.email}`} className="hover:text-ink">
            {site.email}
          </a>
        </div>
      </Container>
    </footer>
  );
}
