import { architecture } from "@/lib/site";
import { photos } from "@/lib/images";
import { ProductImage } from "@/components/store/ProductImage";

/**
 * The architecture: Robot -> Link -> Core -> Tool -> Fingers, as a photograph
 * of the Core with the finger family, and the five layers beside it.
 */
export function Architecture() {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-paper-2 sm:aspect-[4/3]">
          <ProductImage photo={photos.family} sizes="(min-width: 1024px) 60vw, 100vw" />
        </div>
      </div>
      <ol className="lg:col-span-5 lg:self-center">
        {architecture.map((part) => (
          <li key={part.id} className="rule grid grid-cols-[3rem_1fr] gap-4 py-5">
            <span className="t-label pt-1">{part.index}</span>
            <div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-xl font-medium tracking-tight">{part.name}</h3>
                <span className="t-label">{part.role}</span>
              </div>
              <p className="mt-2 max-w-[42ch] text-[15px] leading-relaxed text-ink-2">{part.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
