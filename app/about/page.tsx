import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Eyebrow, Headline, Lede, Section } from "@/components/ui/Section";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { ctas, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "MOLLIS Robotics is a German robotics hardware company building affordable, modular and adaptive end effectors. A softer approach to robotics.",
};

const beliefs = [
  {
    title: "Complexity is not capability.",
    copy: "Every added actuator, sensor and control loop is another thing to calibrate, break and pay for. Often the object can be handled with less.",
  },
  {
    title: "Compliance is a design tool.",
    copy: "A finger that yields makes the grasp tolerant to position error, object variation and imperfect perception. Material does part of the thinking.",
  },
  {
    title: "Modularity beats universality.",
    copy: "One hand that does everything is expensive and fragile. A set of simple tools, changed in seconds, is neither.",
  },
  {
    title: "Robots are leaving the factory.",
    copy: "Greenhouses, kitchens, warehouses, homes. Tooling has to become as accessible and adaptable as the robots that carry it.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A softer approach to robotics."
        lede="MOLLIS Robotics is an early-stage robotics hardware company based in Germany. We build the physical tooling layer between robots and the world."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Why</Eyebrow>
            <Headline>Robots got smarter. Their hands got more complicated.</Headline>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Lede>
              For decades the answer to harder manipulation has been more mechanism: more fingers,
              more joints, more sensors, more control. It works in the lab and struggles in the field.
            </Lede>
            <Lede className="mt-6">
              We think the next step is the opposite. Let materials and geometry absorb uncertainty.
              Keep the electronics in one place. Make the parts that touch the world cheap, swappable
              and specific to the task.
            </Lede>
          </div>
        </div>
      </Section>

      <Section className="bg-paper-2">
        <div className="mb-12">
          <Eyebrow>What we believe</Eyebrow>
        </div>
        <ol className="grid gap-px bg-line md:grid-cols-2">
          {beliefs.map((b, i) => (
            <li key={b.title} className="bg-paper-2 p-6 sm:p-8">
              <span className="t-label">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-4 text-2xl font-medium tracking-tight">{b.title}</h2>
              <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-ink-2">{b.copy}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>The name</Eyebrow>
            <Headline>mollis</Headline>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Lede>
              Latin for soft, pliant, flexible and yielding. It describes our approach to
              manipulation: adapt to the world instead of forcing the world to adapt to the robot.
            </Lede>
          </div>
        </div>
      </Section>

      <Section className="bg-ink text-paper">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Headline className="text-paper">Work with us.</Headline>
            <p className="mt-6 max-w-[44ch] text-lede text-paper/70">
              We are a small team of engineers in {site.location}. If you build robots, grow things,
              run a shop floor or research manipulation, we want to talk.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:col-start-9 lg:flex-col lg:pt-3">
            <ButtonLink href={ctas.secondary.href} className="border-paper bg-paper text-ink hover:border-signal hover:bg-signal hover:text-paper">
              {ctas.secondary.label} <Arrow />
            </ButtonLink>
            <ButtonLink href={ctas.primary.href} variant="secondary" className="border-paper/40 text-paper hover:bg-paper hover:text-ink">
              {ctas.primary.label}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
