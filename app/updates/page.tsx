import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/ui/Section";
import { Arrow } from "@/components/ui/Button";
import { updates } from "@/content/updates";

export const metadata: Metadata = {
  title: "Updates",
  description: "Progress, prototypes and announcements from MOLLIS Robotics.",
};

const fmt = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export default function UpdatesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Updates"
        title="Progress, not press releases."
        lede="Occasional notes as modules move from concept to prototype to production."
      />
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <ol>
          {updates.map((u) => (
            <li key={u.slug} className="rule grid gap-4 py-10 lg:grid-cols-12">
              <time dateTime={u.date} className="t-label lg:col-span-2">
                {fmt.format(new Date(u.date))}
              </time>
              <div className="lg:col-span-8">
                <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
                  <Link href={`/updates/${u.slug}`} className="hover:text-signal">
                    {u.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-ink-2">{u.summary}</p>
                <Link href={`/updates/${u.slug}`} className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium tracking-tight hover:text-signal">
                  Read <Arrow />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
