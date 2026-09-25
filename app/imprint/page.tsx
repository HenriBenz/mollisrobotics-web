import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Headline } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Imprint",
  robots: { index: false },
};

/**
 * German Impressum (§ 5 DDG). Fill in the legal entity details before launch.
 */
export default function ImprintPage() {
  return (
    <Container>
      <div className="max-w-[64ch] py-20 sm:py-28">
        <Eyebrow>Imprint · Impressum</Eyebrow>
        <Headline as="h1" size="h1">
          Legal notice.
        </Headline>
        <dl className="mt-12 space-y-6 text-[15px] leading-relaxed">
          <div className="rule pt-6">
            <dt className="t-label">Company</dt>
            <dd className="mt-1">{site.fullName} [legal form and registered name to be added]</dd>
          </div>
          <div className="rule pt-6">
            <dt className="t-label">Address</dt>
            <dd className="mt-1">[Street, postal code, city], {site.location}</dd>
          </div>
          <div className="rule pt-6">
            <dt className="t-label">Represented by</dt>
            <dd className="mt-1">[Managing director(s)]</dd>
          </div>
          <div className="rule pt-6">
            <dt className="t-label">Contact</dt>
            <dd className="mt-1">
              <a href={`mailto:${site.email}`} className="hover:text-signal">
                {site.email}
              </a>
            </dd>
          </div>
          <div className="rule pt-6">
            <dt className="t-label">Register and VAT ID</dt>
            <dd className="mt-1">[Commercial register, register number, VAT ID]</dd>
          </div>
        </dl>
      </div>
    </Container>
  );
}
