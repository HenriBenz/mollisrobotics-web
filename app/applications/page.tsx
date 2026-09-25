import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Eyebrow, Headline, Lede, Section } from "@/components/ui/Section";
import { ApplicationSwitcher } from "@/components/figures/ApplicationSwitcher";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { ctas } from "@/lib/site";

export const metadata: Metadata = {
  title: "Applications",
  description:
    "MOLLIS end effectors for humanoid robotics, industrial automation, agriculture, food handling, mobile manipulation and research.",
};

const categories = [
  {
    name: "Humanoid robotics",
    tool: "Hand",
    copy: "A simple adaptive hand instead of an anthropomorphic one. Fewer actuators, more reliable grasps, easier to learn for physical AI.",
    tasks: ["Household objects", "Tool use", "Bimanual handover"],
  },
  {
    name: "Industrial automation",
    tool: "Grip",
    copy: "A robust general-purpose gripper at a price that makes sense for SMEs. Machine tending, pick-and-place, assembly.",
    tasks: ["Machine tending", "Pick and place", "Kitting"],
  },
  {
    name: "Agriculture",
    tool: "Soft · Pick",
    copy: "Compliant fingers for irregular, delicate and variable crops. Greenhouse automation without bruising.",
    tasks: ["Strawberry harvest", "Tomato and pepper", "Seedling handling"],
  },
  {
    name: "Food handling",
    tool: "Soft",
    copy: "Hygienic, replaceable contact surfaces for bakery, produce and packaged goods.",
    tasks: ["Produce packing", "Bakery", "Portioning"],
  },
  {
    name: "Mobile manipulation",
    tool: "Grip · Hand",
    copy: "Light, low-power tools for mobile platforms that need to open doors, move totes and pick from shelves.",
    tasks: ["Logistics", "Retail", "Facilities"],
  },
  {
    name: "Research and education",
    tool: "All",
    copy: "Open interfaces, printable fingers and an affordable Core. Built for labs that iterate.",
    tasks: ["Grasp learning", "Tactile sensing", "Teaching"],
  },
];

export default function ApplicationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Applications"
        title="Built to adapt."
        lede="The same Link and Core. A different Tool and Fingers for each world. This is the difference between a platform and a gripper."
      />

      <Section rule={false} className="pt-0 sm:pt-0 lg:pt-0">
        <ApplicationSwitcher />
      </Section>

      <Section className="bg-paper-2">
        <div className="mb-12">
          <Eyebrow>Where MOLLIS goes</Eyebrow>
          <Headline>Six worlds. One interface.</Headline>
        </div>
        <ul className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c.name} className="flex flex-col bg-paper-2 p-6 sm:p-8">
              <p className="t-label">Tool: {c.tool}</p>
              <h3 className="mt-3 text-2xl font-medium tracking-tight">{c.name}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{c.copy}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {c.tasks.map((t) => (
                  <li key={t} className="border border-line px-2.5 py-1 font-mono text-[11px] tracking-wide text-ink-2">
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Headline>Have a task in mind?</Headline>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-3">
            <Lede>
              We are selecting a small number of development partners per application. Bring the
              object, the robot and the environment.
            </Lede>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={ctas.secondary.href}>
                {ctas.secondary.label} <Arrow />
              </ButtonLink>
              <ButtonLink href={ctas.primary.href} variant="secondary">
                {ctas.primary.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
