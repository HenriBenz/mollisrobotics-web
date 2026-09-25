import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { StatusPill } from "@/components/ui/StatusPill";
import { ProductImage } from "@/components/store/ProductImage";
import { ProductForm } from "@/components/store/ProductForm";
import { ProductCard } from "@/components/store/ProductCard";
import { galleryFor, photoFor } from "@/lib/images";
import { categories, formatPrice, getProduct, products } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: `${p.name} · ${p.code}`, description: p.short };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const cat = categories.find((c) => c.id === p.category)!;
  const related = products.filter((x) => x.slug !== p.slug && (x.category === p.category || x.featured)).slice(0, 4);
  const main = photoFor(p.slug);
  const gallery = galleryFor(p.slug);

  return (
    <Container wide>
      <nav aria-label="Breadcrumb" className="flex gap-2 py-5 text-[13px] text-ink-2">
        <Link href="/store" className="hover:text-ink">
          shop
        </Link>
        <span>/</span>
        <Link href={`/store?category=${cat.id}`} className="hover:text-ink">
          {cat.label}
        </Link>
        <span>/</span>
        <span className="text-ink">{p.name}</span>
      </nav>

      <div className="grid gap-10 pb-20 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-4 lg:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-paper-2 sm:aspect-square">
            <ProductImage photo={main} sizes="(min-width: 1024px) 60vw, 100vw" priority />
            <span className="absolute left-5 top-5 rounded-full bg-paper/85 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] backdrop-blur">
              {p.code.toUpperCase()}
            </span>
          </div>
          {gallery.length > 0 && (
            <div className={`grid gap-4 ${gallery.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
              {gallery.map((g) => (
                <div key={g.src} className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-paper-2">
                  <ProductImage photo={g} sizes="(min-width: 1024px) 30vw, 50vw" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 lg:pt-4">
          <div className="flex items-center gap-4">
            <StatusPill status={p.status} />
            <span className="t-label">{p.availability === "reserve" ? "reservations open" : "not yet reservable"}</span>
          </div>
          <h1 className="mt-4 text-h1 font-semibold">{p.name}</h1>
          <p className="mt-3 text-[15px] text-ink-2">{formatPrice(p.price)}</p>
          <p className="mt-6 text-lede text-ink">{p.short}</p>

          <div className="mt-8">
            <ProductForm product={p} />
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-ink-2">
            Reservations are free and non-binding. We confirm price and lead time with you before
            anything is charged.
          </p>

          <div className="mt-10 space-y-4 text-[15px] leading-relaxed text-ink-2">
            {p.description.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </div>

          <dl className="mt-10">
            <div className="rule py-3">
              <dt className="t-label">specifications</dt>
            </div>
            {p.specs.map(([k, v]) => (
              <div key={k} className="rule grid grid-cols-[10rem_1fr] gap-4 py-3 text-[14px]">
                <dt className="text-ink-2">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          {p.includes && (
            <div className="mt-8">
              <p className="t-label mb-3">in the box</p>
              <ul className="space-y-1 text-[14px]">
                {p.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="pb-14">
        <p className="t-label mb-6">also in the family</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {related.map((r) => (
            <ProductCard key={r.slug} product={r} />
          ))}
        </div>
      </div>
    </Container>
  );
}
