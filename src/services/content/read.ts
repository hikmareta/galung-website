import { createHash } from "node:crypto";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@/payload.config";
export async function publishedHome(locale: "id" | "en") {
  const database = new URL(process.env.DATABASE_URL!);
  const dataset = createHash("sha256")
    .update(`${database.host}${database.pathname}`)
    .digest("hex");
  return unstable_cache(
    async () => {
      const payload = await getPayload({ config });
      const result = await payload.find({
        collection: "pages",
        locale,
        fallbackLocale: false,
        draft: false,
        overrideAccess: false,
        depth: 1,
        where: {
          and: [
            { key: { equals: "home" } },
            { _status: { equals: "published" } },
          ],
        },
        limit: 1,
      });
      return result.docs[0] ?? null;
    },
    ["published-home", dataset, locale],
    { tags: ["content-public"], revalidate: 3600 },
  )();
}
