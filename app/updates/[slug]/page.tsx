import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Headline } from "@/components/ui/Section";
import { Arrow } from "@/components/ui/Button";
import { updates } from "@/content/updates";

const fmt = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric" });

export function generateStaticParams() {
  return updates.map((u) => ({ slug: u.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const u = updates.find((x) => x.slug === slug);
  if (!u) return {};
  return { title: u.title, description: u.summary };
}

export default async function UpdatePage({ params }: Props) {
  const { slug } = await params;
  const u = updates.find((x) => x.slug === slug);
  if (!u) notFound();

  return (
    <Container>
      <article className="py-20 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow>
              <time dateTime={u.date}>{fmt.format(new Date(u.date))}</time>
            </Eyebrow>
            <Headline as="h1" size="h1">
              {u.title}
            </Headline>
          </div>
          <div className="lg:col-span-7 lg:col-start-4">
            <p className="mt-6 text-lede text-ink-2">{u.summary}</p>
            <div className="mt-10 space-y-6 text-[17px] leading-relaxed">
              {u.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Link href="/updates" className="mt-14 inline-flex items-center gap-2 text-[15px] font-medium tracking-tight hover:text-signal">
              All updates <Arrow />
            </Link>
          </div>
        </div>
      </article>
    </Container>
  );
}
