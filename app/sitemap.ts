import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { updates } from "@/content/updates";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/platform", "/applications", "/developers", "/about", "/updates", "/early-access", "/contact"];
  return [
    ...pages.map((p) => ({
      url: `${site.url}${p}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
    })),
    ...updates.map((u) => ({
      url: `${site.url}/updates/${u.slug}`,
      lastModified: new Date(u.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
