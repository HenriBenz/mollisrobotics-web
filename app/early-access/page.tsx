import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Headline, Lede } from "@/components/ui/Section";
import { EarlyAccessForm } from "@/components/forms/LeadForms";

export const metadata: Metadata = {
  title: "Join early access",
  description:
    "Get early access to MOLLIS modular end effectors: development kits, reference fingers and pre-production units.",
};

export default function EarlyAccessPage() {
  return (
    <Container>
      <div className="grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Eyebrow>Early access</Eyebrow>
          <Headline as="h1" size="h1">
            Be first to build on MOLLIS.
          </Headline>
          <Lede className="mt-8">
            Early access members get development kits before general availability, reference finger
            designs, and a direct line to the engineers.
          </Lede>
          <ul className="mt-10 space-y-4 text-[15px] leading-relaxed text-ink-2">
            <li className="rule pt-4">
              <span className="font-medium text-ink">Development kits.</span> Link, Core and a Tool
              module of your choice, before public release.
            </li>
            <li className="rule pt-4">
              <span className="font-medium text-ink">Reference designs.</span> CAD for fingers and
              mounts, ready to adapt and print.
            </li>
            <li className="rule pt-4">
              <span className="font-medium text-ink">Influence.</span> Your robot, task and objects
              shape what gets built next.
            </li>
          </ul>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <EarlyAccessForm />
        </div>
      </div>
    </Container>
  );
}
