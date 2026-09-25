import Link from "next/link";
import { Arrow, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Headline, Lede, Section } from "@/components/ui/Section";
import { HeroFigure } from "@/components/figures/HeroFigure";
import { ExplodedAssembly } from "@/components/figures/ExplodedAssembly";
import { ApplicationSwitcher } from "@/components/figures/ApplicationSwitcher";
import { SoftFingerDemo } from "@/components/figures/SoftFingerDemo";
import { ctas, site } from "@/lib/site";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/store/ProductCard";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <Container wide>
          <div className="panel mt-4 grid min-h-[calc(100vh-6rem)] items-center gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-8 lg:p-16">
            <div className="lg:col-span-6">
              <Eyebrow>{site.fullName}</Eyebrow>
              <Headline as="h1" size="display">
                Tools for robots that touch the world.
              </Headline>
              <Lede className="mt-8">
                Affordable, modular and adaptive end effectors for the next generation of robots.
              </Lede>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href={ctas.store.href}>
                  {ctas.store.label} <Arrow />
                </ButtonLink>
                <ButtonLink href="/store/build" variant="secondary">
                  Build your tool
                </ButtonLink>
              </div>
              <p className="t-label mt-16">Pre-launch · reservations open · prices at launch</p>
            </div>
            <div className="lg:col-span-6">
              <HeroFigure />
            </div>
          </div>
        </Container>
      </section>

      {/* Name */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>mollis, -e · Latin</Eyebrow>
            <Headline>Soft where it matters.</Headline>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Lede>
              Soft, pliant, flexible, yielding. Materials and forms that bend, adapt and give rather
              than stay rigid. The same principle sits at the heart of compliant robotics.
            </Lede>
          </div>
        </div>
      </Section>

      {/* Problem */}
      <Section className="bg-paper-2">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Headline size="h1">Robots are changing. Their tools should too.</Headline>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-3">
            <Lede>
              Robots are becoming more capable, intelligent and accessible. End effectors remain
              expensive, proprietary and application-specific.
            </Lede>
            <p className="mt-8 text-xl font-medium tracking-tight">Less complexity. More capability.</p>
          </div>
        </div>
      </Section>

      {/* Platform: exploded assembly */}
      <Section id="platform" wide>
        <div className="mb-12 grid gap-6 lg:mb-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Platform</Eyebrow>
            <Headline size="h1">One platform. Many tools.</Headline>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-12">
            <Lede>Keep the expensive parts. Change the parts that touch the world.</Lede>
          </div>
        </div>
        <ExplodedAssembly />
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 lg:mt-0">
          <p className="t-label">Robot → Link → Core → Tool → Fingers</p>
          <Link href="/platform" className="inline-flex items-center gap-2 text-[15px] font-medium tracking-tight hover:text-signal">
            Platform details <Arrow />
          </Link>
        </div>
      </Section>

      {/* Store */}
      <Section id="store" wide>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Store</Eyebrow>
            <Headline>Reserve now. Pay at launch.</Headline>
          </div>
          <Link href="/store" className="inline-flex items-center gap-2 text-[15px] font-medium tracking-tight hover:text-signal">
            all products <Arrow />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[minmax(20rem,auto)] md:grid-cols-4 md:[grid-auto-flow:dense]">
          {products
            .filter((p) => p.featured)
            .slice(0, 4)
            .map((p, i) => (
              <ProductCard key={p.slug} product={p} span={i === 0 ? "tall" : "normal"} tone={i === 1 ? "ink" : "paper"} />
            ))}
        </div>
        <p className="mt-8 max-w-[60ch] text-[13px] leading-relaxed text-ink-2">
          Reservations are free and non-binding. Every module is a product; every product fits
          every other. We confirm price and lead time with you before anything is charged.
        </p>
      </Section>

      {/* Modularity statement */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Headline size="h1">From flange to fingertip.</Headline>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-3">
            <Lede>
              Choose your robot. Choose your tool. Choose your fingers. MOLLIS connects them through a
              common modular architecture.
            </Lede>
            <dl className="mt-10 grid grid-cols-3 gap-6 rule pt-6">
              <div>
                <dt className="t-label">Robot side</dt>
                <dd className="mt-2 text-[15px] font-medium">Any flange</dd>
              </div>
              <div>
                <dt className="t-label">Tool change</dt>
                <dd className="mt-2 text-[15px] font-medium">Seconds, no tools</dd>
              </div>
              <div>
                <dt className="t-label">Fingers</dt>
                <dd className="mt-2 text-[15px] font-medium">Printable, yours</dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      {/* Applications */}
      <Section id="applications" className="bg-paper-2">
        <div className="mb-14">
          <Eyebrow>Applications</Eyebrow>
          <Headline size="h1">Different worlds. Same interface.</Headline>
        </div>
        <ApplicationSwitcher />
        <div className="mt-14 grid gap-6 rule pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <Use name="Humanoid" copy="Simple, capable manipulation without recreating the complexity of the human hand." />
          <Use name="Industry" copy="Affordable tools for pick-and-place, machine tending, assembly and automation." />
          <Use name="Agriculture" copy="Compliant tools for delicate crops, irregular geometries and greenhouse automation." />
          <Use name="Research" copy="Open interfaces for experimentation, physical AI and robotic manipulation." />
        </div>
      </Section>

      {/* Philosophy */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Philosophy</Eyebrow>
            <Headline size="h1">Soft is smart.</Headline>
            <Lede className="mt-8">
              Not every uncertainty needs another sensor, actuator or control loop. Compliance lets
              the tool itself adapt to the object.
            </Lede>
            <p className="mt-10 font-mono text-[13px] tracking-wide text-ink-2">
              compliance + geometry + material = simpler manipulation
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SoftFingerDemo />
          </div>
        </div>
      </Section>

      {/* Open */}
      <Section className="grid-paper">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow>Developers</Eyebrow>
            <Headline size="h1">Build your tool on MOLLIS.</Headline>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-12">
            <Lede>
              Robotic tooling should be extendable. Mechanical interfaces, CAD resources and developer
              tools are designed to enable custom fingers and application-specific modules.
            </Lede>
            <Link href="/developers" className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium tracking-tight hover:text-signal">
              Developer roadmap <Arrow />
            </Link>
          </div>
        </div>
      </Section>

      {/* Future */}
      <Section>
        <div className="mx-auto max-w-[900px] text-center">
          <Headline size="h1">A toolbox instead of a hand.</Headline>
          <Lede className="mx-auto mt-8 max-w-[44ch]">
            The future robot may not need one infinitely complex hand. It may need a modular
            collection of simple, capable tools.
          </Lede>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-ink text-paper">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Headline size="h1" className="text-paper">
              Let&apos;s give robots a better grip on the world.
            </Headline>
          </div>
          <div className="lg:col-span-4 lg:pt-3">
            <p className="text-[15px] leading-relaxed text-paper/70">
              For robot developers, researchers, integrators and early partners.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink href={ctas.primary.href} className="border-paper bg-paper text-ink hover:border-signal hover:bg-signal hover:text-paper">
                {ctas.primary.label} <Arrow />
              </ButtonLink>
              <ButtonLink href={ctas.secondary.href} variant="secondary" className="border-paper/40 text-paper hover:bg-paper hover:text-ink">
                {ctas.secondary.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function Use({ name, copy }: { name: string; copy: string }) {
  return (
    <div>
      <h3 className="text-lg font-medium tracking-tight">{name}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{copy}</p>
    </div>
  );
}
