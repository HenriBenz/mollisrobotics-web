import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Headline, Lede } from "@/components/ui/Section";
import { PartnerForm } from "@/components/forms/LeadForms";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Talk to us",
  description:
    "Become a MOLLIS development partner: pilot projects, robot OEM integrations, research collaborations.",
};

export default function ContactPage() {
  return (
    <Container>
      <div className="grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Eyebrow>Talk to us</Eyebrow>
          <Headline as="h1" size="h1">
            Become a development partner.
          </Headline>
          <Lede className="mt-8">
            We are looking for a small number of partners with real tasks, real objects and real
            robots. If you have a manipulation problem that a simpler tool could solve, we would like
            to hear about it.
          </Lede>
          <dl className="mt-10 space-y-4 text-[15px]">
            <div className="rule pt-4">
              <dt className="t-label">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="font-medium hover:text-signal">
                  {site.email}
                </a>
              </dd>
            </div>
            <div className="rule pt-4">
              <dt className="t-label">Location</dt>
              <dd className="mt-1 font-medium">{site.location}</dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <PartnerForm />
        </div>
      </div>
    </Container>
  );
}
