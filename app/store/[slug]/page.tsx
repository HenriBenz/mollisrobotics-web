import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { StatusPill } from "@/components/ui/StatusPill";
import { ProductFigure } from "@/components/store/ProductFigure";
import { ProductForm } from "@/components/store/ProductForm";
import { ProductCard } from "@/components/store/ProductCard";
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

  return (
    <Container wide>
      <nav aria-label="Breadcrumb" className="flex gap-2 py-6 text-[13px] text-ink-2">
        <Link href="/store" className="hover:text-ink">
          store
        </Link>
        <span>/</span>
        <Link href={`/store?category=${cat.id}`} className="hover:text-ink">
          {cat.label}
        </Link>
        <span>/</span>
        <span className="text-ink">{p.name}</span>
      </nav>

      <div className="grid gap-10 pb-20 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="panel relative aspect-square overflow-hidden">
            <div className="absolute inset-[10%]">
              <ProductFigure figure={p.figure} withRobot={p.category === "kits"} />
            </div>
            <span className="t-label absolute left-5 top-5">{p.code}</span>
            <span className="t-label absolute bottom-5 left-5">technical drawing · photography follows</span>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="flex items-center gap-4">
            <StatusPill status={p.status} />
            {p.availability === "reserve" ? (
              <span className="t-label">reservations open</span>
            ) : (
              <span className="t-label">not yet reservable</span>
            )}
          </div>
          <h1 className="mt-4 text-h2 font-medium tracking-tight">{p.name}</h1>
          <p className="mt-2 text-[15px] text-ink-2">{formatPrice(p.price)}</p>
          <p className="mt-6 text-[15px] leading-relaxed">{p.short}</p>

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

      <div className="rule py-14">
        <p className="t-label mb-6">also in the family</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {related.map((r) => (
            <ProductCard key={r.slug} product={r} />
          ))}
        </div>
      </div>
    </Container>
  );
}
