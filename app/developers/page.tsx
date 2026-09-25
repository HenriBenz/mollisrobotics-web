import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Eyebrow, Headline, Lede, Section } from "@/components/ui/Section";
import { StatusLegend, StatusPill } from "@/components/ui/StatusPill";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { ctas, type Status } from "@/lib/site";

export const metadata: Metadata = {
  title: "Developers",
  description:
    "Build on MOLLIS: mechanical interface specification, CAD, ROS 2 packages, API and reference finger designs. Roadmap and early access.",
};

const roadmap: { name: string; copy: string; status: Status }[] = [
  { name: "Mechanical interface spec", copy: "Dimensions, tolerances and fastening for the Tool-to-Fingers and Core-to-Tool interfaces.", status: "development" },
  { name: "Reference finger designs", copy: "Printable STEP and STL files for rigid, compliant and custom fingers.", status: "development" },
  { name: "CAD models", copy: "Simplified STEP models of Link, Core and Tool modules for cell design and simulation.", status: "development" },
  { name: "Communication protocol", copy: "Command set, state reporting and error handling on the fieldbus and USB interfaces.", status: "concept" },
  { name: "ROS 2 packages", copy: "Driver, URDF and example launch files.", status: "concept" },
  { name: "API and SDK", copy: "A small Python and C++ API for direct control and integration.", status: "concept" },
  { name: "Custom module documentation", copy: "How to design, validate and register your own Tool or Finger module.", status: "concept" },
];

export default function DevelopersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Developers"
        title="Build on MOLLIS."
        lede="Everything below is on the roadmap, not yet published. Early access members get it first, and shape it."
      >
        <div className="mt-8">
          <StatusLegend />
        </div>
      </PageHeader>

      <Section>
        <ol className="grid gap-px bg-line md:grid-cols-2">
          {roadmap.map((item, i) => (
            <li key={item.name} className="bg-paper p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="t-label">{String(i + 1).padStart(2, "0")}</span>
                <StatusPill status={item.status} />
              </div>
              <h2 className="mt-4 text-xl font-medium tracking-tight">{item.name}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{item.copy}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-paper-2">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow>Principle</Eyebrow>
            <Headline>Open where it helps you. Sealed where it protects you.</Headline>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-12">
            <Lede>
              The mechanical interfaces are open so you can design fingers and modules. The Core is
              sealed so it survives the real world. Both are documented.
            </Lede>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Headline>Want the files early?</Headline>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-3">
            <Lede>Join early access and tell us which robot you are building for.</Lede>
            <div className="mt-8">
              <ButtonLink href={ctas.primary.href}>
                {ctas.primary.label} <Arrow />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
