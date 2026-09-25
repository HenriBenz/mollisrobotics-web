import Link from "next/link";
import { statusLabel } from "@/lib/site";
import type { Product } from "@/lib/products";
import { photoFor } from "@/lib/images";
import { ProductImage } from "./ProductImage";
import { AddToCart } from "./AddToCart";

/**
 * Product tile: photograph, then name, status and reserve on white.
 */
export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const needsOptions = !!product.options?.length;
  const photo = photoFor(product.slug);

  return (
    <article className="group relative flex flex-col">
      <Link href={`/store/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden rounded-[20px] bg-paper-2" aria-label={product.name}>
        <ProductImage photo={photo} priority={priority} className="transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
        <span className="absolute left-4 top-4 rounded-full bg-paper/85 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-ink backdrop-blur">
          {product.code.toUpperCase()}
        </span>
      </Link>
      <div className="flex items-center justify-between gap-3 px-1 pt-4">
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-medium tracking-tight">
            <Link href={`/store/${product.slug}`} className="hover:text-signal">
              {product.name}
            </Link>
          </h3>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-2">{statusLabel[product.status]}</p>
        </div>
        {needsOptions && product.availability === "reserve" ? (
          <Link href={`/store/${product.slug}`} className="inline-flex h-9 shrink-0 items-center rounded-full border border-ink/20 px-3.5 text-[13px] font-medium transition-colors hover:border-ink hover:bg-ink hover:text-paper">
            reserve
          </Link>
        ) : (
          <AddToCart slug={product.slug} availability={product.availability} size="sm" look="outline" />
        )}
      </div>
    </article>
  );
}
