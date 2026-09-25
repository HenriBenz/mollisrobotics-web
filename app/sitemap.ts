import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { updates } from "@/content/updates";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/store", "/store/build", "/platform", "/applications", "/developers", "/about", "/updates", "/early-access", "/contact"];
  return [
    ...pages.map((p) => ({
      url: `${site.url}${p}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : p === "/store" ? 0.9 : 0.7,
    })),
    ...products.map((p) => ({
      url: `${site.url}/store/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...updates.map((u) => ({
      url: `${site.url}/updates/${u.slug}`,
      lastModified: new Date(u.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
