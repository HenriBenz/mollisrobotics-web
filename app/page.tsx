import { Arrow, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroFigure } from "@/components/figures/HeroFigure";
import { ProductCard } from "@/components/store/ProductCard";
import { products } from "@/lib/products";

/** Homepage: one hero, then the shop. Nothing else. */
export default function HomePage() {
  return (
    <Container wide>
      <section className="panel mt-2 overflow-hidden">
        <div className="grid items-center gap-8 p-8 sm:p-12 lg:min-h-[calc(100vh-7rem)] lg:grid-cols-12 lg:p-20">
          <div className="lg:col-span-6">
            <h1 className="text-display font-semibold">Tools for robots that touch the world.</h1>
            <p className="mt-6 max-w-[36ch] text-lede text-ink-2">Modular end effectors. One core, any robot, every tool.</p>
            <div className="mt-10">
              <ButtonLink href="#shop">
                Shop <Arrow />
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-6">
            <HeroFigure />
          </div>
        </div>
      </section>

      <div id="shop" className="grid grid-cols-2 gap-3 pt-3 pb-3 md:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </Container>
  );
}
