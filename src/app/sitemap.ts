import type { MetadataRoute } from "next";
import { readEnvironment } from "@/lib/env";
import {
  equivalents,
  publicRoutes,
  published,
  resolvePublic,
} from "@/services/content/public";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (process.env.PUBLIC_INDEXING !== "true") return [];
  const origin = readEnvironment().origin;
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of ["id", "en"] as const) {
    const paths: string[] = [...publicRoutes];
    for (const [collection, section] of [
      ["posts", "news"],
      ["portfolioProjects", "portfolio"],
    ] as const) {
      let page = 1;
      while (true) {
        const result = await published(collection, locale, {}, page, 100);
        paths.push(
          ...result.docs
            .filter((doc) => doc.title && doc.slug)
            .map((doc) => `${section}/${doc.slug}`),
        );
        if (!result.hasNextPage) break;
        page++;
      }
    }
    for (const path of paths) {
      if (!(await resolvePublic(locale, path))) continue;
      const languages = await equivalents(locale, path);
      entries.push({
        url: new URL(languages[locale]!, origin).href,
        alternates: {
          languages: Object.fromEntries(
            Object.entries(languages).map(([key, value]) => [
              key,
              new URL(value, origin).href,
            ]),
          ),
        },
      });
    }
  }
  return entries;
}
