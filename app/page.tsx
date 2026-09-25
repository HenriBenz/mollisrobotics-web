import { Arrow, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductImage } from "@/components/store/ProductImage";
import { photos } from "@/lib/images";
import { products } from "@/lib/products";

/** Homepage: one hero, then the shop. Nothing else. */
export default function HomePage() {
  return (
    <Container wide>
      <section className="mt-2 grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="order-2 px-2 lg:order-1 lg:col-span-5 lg:px-6">
          <h1 className="text-display font-semibold">Tools for robots that touch the world.</h1>
          <p className="mt-6 max-w-[34ch] text-lede text-ink-2">Modular end effectors. One core, any robot, every tool.</p>
          <div className="mt-10">
            <ButtonLink href="#shop">
              Shop <Arrow />
            </ButtonLink>
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-7">
          <div className="relative aspect-square overflow-hidden rounded-[28px] bg-paper-2 lg:aspect-[5/4] lg:max-h-[calc(100vh-7rem)]">
            <ProductImage photo={photos.soft} sizes="(min-width: 1024px) 60vw, 100vw" priority />
          </div>
        </div>
      </section>

      <div id="shop" className="grid grid-cols-2 gap-x-4 gap-y-10 pt-20 pb-10 md:grid-cols-3 xl:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p.slug} product={p} priority={i < 4} />
        ))}
      </div>
    </Container>
  );
}
