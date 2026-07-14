import type { MetadataRoute } from "next";
import { AGENCIES, INDUSTRIES, SERVICES } from "@/data/listings";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, priority: 1 },
    { url: `${SITE.url}/services`, lastModified: now, priority: 0.8 },
    { url: `${SITE.url}/industries`, lastModified: now, priority: 0.8 },
    { url: `${SITE.url}/get-listed`, lastModified: now, priority: 0.7 },
  ];

  const servicePages = SERVICES.map((s) => ({
    url: `${SITE.url}/services/${s.slug}`,
    lastModified: now,
    priority: 0.8,
  }));

  const industryPages = INDUSTRIES.map((i) => ({
    url: `${SITE.url}/industries/${i.slug}`,
    lastModified: now,
    priority: 0.8,
  }));

  const agencyPages = AGENCIES.map((a) => ({
    url: `${SITE.url}/agency/${a.slug}`,
    lastModified: now,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...industryPages, ...agencyPages];
}
