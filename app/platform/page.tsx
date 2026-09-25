import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Eyebrow, Headline, Lede, Section } from "@/components/ui/Section";
import { StatusLegend, StatusPill } from "@/components/ui/StatusPill";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { ExplodedAssembly } from "@/components/figures/ExplodedAssembly";
import { architecture, ctas, modules } from "@/lib/site";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "The MOLLIS platform: Robot, Link, Core, Tool, Fingers. A modular architecture for robotic end effectors with open mechanical interfaces.",
};

const compatibility = [
  { family: "ISO 9409-1-50-4-M6", note: "UR, Doosan, Techman and most cobots", status: "development" },
  { family: "ISO 9409-1-31.5-4-M5", note: "Small arms and desktop robots", status: "concept" },
  { family: "Franka / FR3 flange", note: "Research platforms", status: "concept" },
  { family: "Humanoid wrist adapters", note: "Per-platform, designed with partners", status: "concept" },
  { family: "Custom Link", note: "Open mechanical spec, any flange", status: "development" },
] as const;

export default function PlatformPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="The MOLLIS platform."
        lede="Five layers. One common interface between them. Every layer can change without touching the others."
      />

      <Section id="architecture" wide>
        <div className="mb-12">
          <Eyebrow>Architecture</Eyebrow>
          <Headline>Robot → Link → Core → Tool → Fingers</Headline>
        </div>
        <ExplodedAssembly />
      </Section>

      {/* Layer by layer */}
      {architecture
        .filter((a) => a.id !== "robot")
        .map((layer) => (
          <Section key={layer.id} id={layer.id}>
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Eyebrow>
                  {layer.index} · {layer.role}
                </Eyebrow>
                <Headline>MOLLIS {layer.name}</Headline>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <Lede>{layer.detail}</Lede>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {layerFacts[layer.id].map((f) => (
                    <div key={f.label} className="rule pt-4">
                      <p className="t-label">{f.label}</p>
                      <p className="mt-2 text-[15px] font-medium">{f.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        ))}

      {/* Modules and status */}
      <Section id="modules" className="bg-paper-2">
        <div className="mb-12 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow>Module family</Eyebrow>
            <Headline>What exists, what is coming.</Headline>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-12">
            <Lede>
              MOLLIS is pre-launch. Nothing on this page is commercially available yet. The status
              of every module is shown honestly.
            </Lede>
            <div className="mt-6">
              <StatusLegend />
            </div>
          </div>
        </div>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="t-label">
              <th className="rule py-3 font-normal">Module</th>
              <th className="rule py-3 font-normal">Layer</th>
              <th className="rule hidden py-3 font-normal sm:table-cell">Role</th>
              <th className="rule py-3 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((m) => (
              <tr key={m.id}>
                <td className="rule py-4 pr-4 font-medium tracking-tight">{m.name}</td>
                <td className="rule py-4 pr-4 text-ink-2">{m.layer}</td>
                <td className="rule hidden py-4 pr-4 text-ink-2 sm:table-cell">{m.role}</td>
                <td className="rule py-4">
                  <StatusPill status={m.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Compatibility */}
      <Section id="compatibility">
        <div className="mb-12 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow>Robot compatibility</Eyebrow>
            <Headline>Any flange. One Link.</Headline>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-12">
            <Lede>
              Link is the only robot-specific part. Everything below it stays the same across arms,
              cobots, humanoids and mobile manipulators.
            </Lede>
          </div>
        </div>
        <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {compatibility.map((c) => (
            <li key={c.family} className="bg-paper p-6">
              <p className="font-mono text-[13px] tracking-wide">{c.family}</p>
              <p className="mt-2 text-[15px] text-ink-2">{c.note}</p>
              <div className="mt-4">
                <StatusPill status={c.status} />
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Open interface */}
      <Section id="open-interface" className="grid-paper">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow>Open interface</Eyebrow>
            <Headline>Documented, not locked.</Headline>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-12">
            <Lede>
              The mechanical interface between Tool and Fingers, and between Core and Tool, will be
              published. Design your own finger geometry, print it, mount it.
            </Lede>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/developers" variant="secondary">
                Developer roadmap <Arrow />
              </ButtonLink>
              <ButtonLink href={ctas.primary.href}>{ctas.primary.label}</ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

const layerFacts: Record<string, { label: string; value: string }[]> = {
  link: [
    { label: "Robot side", value: "ISO 9409-1 patterns, custom adapters" },
    { label: "MOLLIS side", value: "Common mechanical + electrical interface" },
    { label: "Power and data", value: "Passed through the flange, one cable" },
    { label: "Status", value: "In development" },
  ],
  core: [
    { label: "Actuation", value: "Single motor, backdrivable drive" },
    { label: "Electronics", value: "Controller, drive, comms in one housing" },
    { label: "Interface", value: "Industrial fieldbus and USB (planned)" },
    { label: "Status", value: "In development" },
  ],
  tool: [
    { label: "Variants", value: "Grip, Soft, Hand, Pick" },
    { label: "Change", value: "Tool-less, seconds, repeatable" },
    { label: "Mechanism", value: "Parallel, compliant or adaptive" },
    { label: "Status", value: "Prototype to concept, by variant" },
  ],
  fingers: [
    { label: "Materials", value: "Elastomer, polymer, aluminium" },
    { label: "Manufacturing", value: "Printable, moulded, machined" },
    { label: "Interface", value: "Open mechanical spec" },
    { label: "Status", value: "Reference designs in preparation" },
  ],
};
