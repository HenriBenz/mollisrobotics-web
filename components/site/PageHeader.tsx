import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Headline, Lede } from "@/components/ui/Section";

export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <header className="py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Headline as="h1" size="h1">
              {title}
            </Headline>
          </div>
          {(lede || children) && (
            <div className="lg:col-span-4 lg:col-start-9 lg:pt-12">
              {lede && <Lede>{lede}</Lede>}
              {children}
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
