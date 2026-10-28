import type { MetadataRoute } from "next";
import { readEnvironment } from "@/lib/env";
export const dynamic = "force-dynamic";
export default function robots(): MetadataRoute.Robots {
  const enabled = process.env.PUBLIC_INDEXING === "true";
  return {
    rules: {
      userAgent: "*",
      ...(enabled
        ? { allow: "/", disallow: ["/admin", "/api", "/preview"] }
        : { disallow: "/" }),
    },
    ...(enabled ? { sitemap: `${readEnvironment().origin}/sitemap.xml` } : {}),
  };
}
