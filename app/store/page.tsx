import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductCard, type Span, type Tone } from "@/components/store/ProductCard";
import { FlatLay } from "@/components/store/FlatLay";
import { StatusLegend } from "@/components/ui/StatusPill";
import { Arrow, ButtonLink } from "@/components/ui/Button";
import { categories, products, type Category } from "@/lib/products";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Reserve MOLLIS developer kits, Link, Core, tool modules and fingers. Free, non-binding reservations before launch.",
};

type Search = { category?: string };

/**
 * Bento pattern: first tile tall, second in ink, a wide sand tile at the seventh position.
 * Orange is reserved for functional parts in the drawings (70/20/10 rule), never for a whole tile.
 */
function layout(i: number): { span: Span; tone: Tone } {
  if (i === 0) return { span: "tall", tone: "paper" };
  if (i === 1) return { span: "normal", tone: "ink" };
  if (i === 6) return { span: "wide", tone: "sand" };
  return { span: "normal", tone: "paper" };
}

export default async function StorePage({ searchParams }: { searchParams: Promise<Search> }) {
  const { category } = await searchParams;
  const active = categories.find((c) => c.id === category)?.id as Category | undefined;
  const list = active ? products.filter((p) => p.category === active) : products;

  return (
    <Container wide>
      {/* hero panel */}
      <section className="panel mt-4 overflow-hidden">
        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-6 lg:p-14">
          <div className="lg:col-span-5">
            <h1 className="text-h1 font-medium tracking-tight">Every module is a product.</h1>
            <p className="mt-6 max-w-[36ch] text-[15px] leading-relaxed text-ink-2">
              Reserve now, pay at launch. Link, Core, tools and fingers, each on its own, all
              fitting together. Reservations are free and non-binding.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#products" className="rounded-full">
                Shop the kits <Arrow />
              </ButtonLink>
              <ButtonLink href="/store/build" variant="secondary" className="rounded-full">
                Build your tool
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <FlatLay className="max-h-[420px]" />
          </div>
        </div>
      </section>

      {/* category chips */}
      <div id="products" className="flex flex-wrap items-center gap-2 py-8">
        <Chip href="/store" label="all products" active={!active} />
        {categories.map((c) => (
          <Chip key={c.id} href={`/store?category=${c.id}`} label={c.label} active={active === c.id} />
        ))}
        <span className="mx-2 hidden h-5 w-px bg-line sm:block" />
        <Link href="/store/build" className="chip">
          build your tool →
        </Link>
        <span className="ml-auto hidden text-[13px] text-ink-2 sm:block">
          {list.length} products · prices announced at launch
        </span>
      </div>

      {/* bento grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[minmax(20rem,auto)] md:grid-cols-3 md:[grid-auto-flow:dense] xl:grid-cols-4">
        {list.map((p, i) => {
          const { span, tone } = layout(i);
          return <ProductCard key={p.slug} product={p} span={span} tone={tone} />;
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 py-10">
        <StatusLegend />
        <p className="max-w-[60ch] text-[13px] leading-relaxed text-ink-2">
          Nothing is commercially available yet. A reservation holds a place in the first batch and
          costs nothing; we confirm price and lead time before anything is charged.
        </p>
      </div>
    </Container>
  );
}

function Chip({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link href={href} className="chip" aria-current={active ? "page" : undefined}>
      {label}
    </Link>
  );
}
