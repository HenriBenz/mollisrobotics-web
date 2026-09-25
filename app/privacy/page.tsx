import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Headline } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  robots: { index: false },
};

/**
 * Privacy notice skeleton (GDPR). Review with legal counsel before launch.
 * Facts stated here reflect what the site actually does today.
 */
export default function PrivacyPage() {
  return (
    <Container>
      <div className="max-w-[64ch] py-20 sm:py-28">
        <Eyebrow>Privacy · Datenschutz</Eyebrow>
        <Headline as="h1" size="h1">
          Privacy notice.
        </Headline>
        <div className="mt-12 space-y-8 text-[15px] leading-relaxed text-ink-2">
          <section className="rule pt-6">
            <h2 className="text-lg font-medium text-ink">Controller</h2>
            <p className="mt-2">
              {site.fullName}, [address], {site.location}. Contact:{" "}
              <a href={`mailto:${site.email}`} className="text-ink hover:text-signal">
                {site.email}
              </a>
              .
            </p>
          </section>
          <section className="rule pt-6">
            <h2 className="text-lg font-medium text-ink">Hosting</h2>
            <p className="mt-2">
              This site is hosted on Vercel. Server logs (IP address, user agent, requested URL,
              timestamp) are processed to deliver the site and keep it secure (Art. 6(1)(f) GDPR).
            </p>
          </section>
          <section className="rule pt-6">
            <h2 className="text-lg font-medium text-ink">Forms</h2>
            <p className="mt-2">
              When you join early access or send a partner inquiry, we store the data you enter,
              the page it was sent from and your browser user agent in a database hosted by Neon in
              the EU (Frankfurt). We use it to respond to you and to send occasional product updates
              (Art. 6(1)(a) and (b) GDPR). You can withdraw consent or request deletion at any time
              by email.
            </p>
          </section>
          <section className="rule pt-6">
            <h2 className="text-lg font-medium text-ink">Analytics</h2>
            <p className="mt-2">
              We use Vercel Web Analytics, which collects aggregated, cookie-free page view data
              without identifying individual visitors.
            </p>
          </section>
          <section className="rule pt-6">
            <h2 className="text-lg font-medium text-ink">Your rights</h2>
            <p className="mt-2">
              You have the right to access, rectify, delete and restrict processing of your data,
              to data portability and to lodge a complaint with a supervisory authority.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
