import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import { StatusPill } from "@/components/ui/StatusPill";
import { ProductFigure } from "./ProductFigure";
import { AddToCart } from "./AddToCart";

export type Tone = "paper" | "sand" | "signal" | "ink";
export type Span = "normal" | "tall" | "wide";

/**
 * Product tile. A rounded panel with the name at the top, the drawing floating
 * in the middle and price + reserve at the bottom. Tiles can span two rows or
 * two columns in a bento grid and can be tinted with the signal tone.
 */
export function ProductCard({ product, tone = "paper", span = "normal" }: { product: Product; tone?: Tone; span?: Span }) {
  const needsOptions = !!product.options?.length;
  const panel = tone === "signal" ? "panel-signal" : tone === "ink" ? "panel-ink" : tone === "sand" ? "panel-sand" : "panel";
  const light = tone === "paper" || tone === "sand"; // light surfaces use ink text
  const muted = light ? "text-ink-2" : "text-paper/70";
  const spanCls = span === "tall" ? "md:row-span-2" : span === "wide" ? "md:col-span-2" : "";
  const figureBox = span === "tall" ? "min-h-[18rem]" : "min-h-[11rem]";

  // On dark tiles the graphite housings would vanish; lift the drawing materials.
  const darkVars = light
    ? undefined
    : ({ "--polymer": "#4a4945", "--polymer-2": "#605f5a", "--alu": "#d9d9d4", "--alu-2": "#b5b3ad", "--alu-3": "#f2f1ed" } as React.CSSProperties);

  return (
    <article className={`group relative flex flex-col p-5 ${panel} ${spanCls} min-h-[20rem]`} style={darkVars}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-medium tracking-tight">
            <Link href={`/store/${product.slug}`} className="after:absolute after:inset-0 after:rounded-[24px]">
              {product.name}
            </Link>
          </h3>
          <p className={`mt-0.5 font-mono text-[11px] tracking-[0.12em] ${muted}`}>{product.code.toUpperCase()}</p>
        </div>
        <span
          aria-hidden="true"
          className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
            light ? "border-ink/30 group-hover:border-ink group-hover:bg-ink group-hover:text-paper" : "border-paper/40 group-hover:bg-paper group-hover:text-ink"
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </span>
      </div>

      <div className={`relative my-4 flex-1 ${figureBox}`}>
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:-translate-y-1">
          <ProductFigure figure={product.figure} withRobot={span === "tall"} />
        </div>
      </div>

      <div className="relative z-10 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className={`truncate text-[13px] ${muted}`}>{product.short}</p>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-[13px] font-medium">{formatPrice(product.price)}</span>
            <span className={light ? "" : "[&_.t-label]:text-paper/80"}>
              <StatusPill status={product.status} />
            </span>
          </div>
        </div>
        <div className="shrink-0">
          {needsOptions && product.availability === "reserve" ? (
            <Link
              href={`/store/${product.slug}`}
              className={`inline-flex h-9 items-center rounded-full px-3 text-[13px] font-medium transition-colors ${
                light ? "border border-ink hover:bg-ink hover:text-paper" : "border border-paper/60 hover:bg-paper hover:text-ink"
              }`}
            >
              options
            </Link>
          ) : (
            <AddToCart slug={product.slug} availability={product.availability} size="sm" className={light ? "rounded-full" : "rounded-full border-paper bg-paper text-ink hover:border-ink hover:bg-ink hover:text-paper"} />
          )}
        </div>
      </div>
    </article>
  );
}
