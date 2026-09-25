import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductImage } from "@/components/store/ProductImage";
import { photos } from "@/lib/images";
import { categories, products, type Category } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Reserve MOLLIS developer kits, Link, Core, tool modules and fingers. Free, non-binding reservations before launch.",
};

type Search = { category?: string };

export default async function StorePage({ searchParams }: { searchParams: Promise<Search> }) {
  const { category } = await searchParams;
  const active = categories.find((c) => c.id === category)?.id as Category | undefined;
  const list = active ? products.filter((p) => p.category === active) : products;

  return (
    <Container wide>
      <section className="relative mt-2 overflow-hidden rounded-[28px] bg-paper-2">
        <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]">
          <ProductImage photo={photos.family} sizes="100vw" priority />
        </div>
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 bg-gradient-to-t from-ink/60 to-transparent p-6 text-paper sm:flex-row sm:items-end sm:justify-between sm:p-10">
          <h1 className="text-h1 font-semibold">Every module is a product.</h1>
          <p className="max-w-[32ch] text-[14px] leading-relaxed text-paper/85">Reserve now, pay at launch. Free and non-binding.</p>
        </div>
      </section>

      <div id="products" className="flex flex-wrap items-center gap-2 py-8">
        <Chip href="/store" label="all" active={!active} />
        {categories.map((c) => (
          <Chip key={c.id} href={`/store?category=${c.id}`} label={c.label} active={active === c.id} />
        ))}
        <Link href="/store/build" className="chip ml-auto">
          build your tool →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 pb-10 md:grid-cols-3 xl:grid-cols-4">
        {list.map((p, i) => (
          <ProductCard key={p.slug} product={p} priority={i < 4} />
        ))}
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
