import Link from "next/link";
import { statusLabel } from "@/lib/site";
import type { Product } from "@/lib/products";
import { ProductFigure } from "./ProductFigure";
import { AddToCart } from "./AddToCart";

export type Tone = "paper" | "sand" | "ink";
export type Span = "normal" | "tall" | "wide";

/**
 * Product tile, reduced to the minimum: name and code, the drawing, status,
 * and reserve. Everything else lives on the product page.
 */
export function ProductCard({ product, tone = "paper", span = "normal" }: { product: Product; tone?: Tone; span?: Span }) {
  const needsOptions = !!product.options?.length;
  const panel = tone === "ink" ? "panel-ink" : tone === "sand" ? "panel-sand" : "panel";
  const light = tone !== "ink";
  const muted = light ? "text-ink-2" : "text-paper/60";
  const spanCls = span === "tall" ? "md:row-span-2" : span === "wide" ? "md:col-span-2" : "";
  const darkVars = light
    ? undefined
    : ({ "--polymer": "#4a4945", "--polymer-2": "#605f5a", "--alu": "#d9d9d4", "--alu-2": "#b5b3ad", "--alu-3": "#f2f1ed" } as React.CSSProperties);

  return (
    <article className={`group relative flex aspect-square flex-col p-5 ${panel} ${spanCls}`} style={darkVars}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-medium tracking-tight">
          <Link href={`/store/${product.slug}`} className="after:absolute after:inset-0 after:rounded-[24px]">
            {product.name}
          </Link>
        </h3>
        <span className={`font-mono text-[10px] tracking-[0.14em] ${muted}`}>{product.code.toUpperCase()}</span>
      </div>

      <div className="relative my-3 flex-1">
        <div className="absolute inset-[6%] transition-transform duration-500 ease-out group-hover:-translate-y-1">
          <ProductFigure figure={product.figure} withRobot={span === "tall"} />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between gap-3">
        <span className={`font-mono text-[10px] uppercase tracking-[0.14em] ${muted}`}>{statusLabel[product.status]}</span>
        {needsOptions && product.availability === "reserve" ? (
          <Link
            href={`/store/${product.slug}`}
            className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium transition-colors ${
              light ? "bg-paper text-ink hover:bg-ink hover:text-paper" : "bg-paper/10 text-paper hover:bg-paper hover:text-ink"
            }`}
          >
            reserve
          </Link>
        ) : (
          <AddToCart slug={product.slug} availability={product.availability} size="sm" look={light ? "paper" : "glass"} />
        )}
      </div>
    </article>
  );
}
