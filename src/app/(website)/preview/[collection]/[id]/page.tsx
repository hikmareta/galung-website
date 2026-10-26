import { ContentBlocks } from "@/components/website/content-blocks";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import { editorialUser } from "@/access/editorial";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Editorial preview",
  robots: { index: false, follow: false },
};
export default async function Preview({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string; id: string }>;
  searchParams: Promise<{ locale?: string }>;
}) {
  const { collection, id } = await params;
  if (!["pages", "posts", "portfolioProjects", "products"].includes(collection))
    notFound();
  const locale = (await searchParams).locale;
  if (locale !== "id" && locale !== "en") notFound();
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: await headers() });
  if (!editorialUser(user)) notFound();
  const doc = await payload.findByID({
    collection: collection as "pages",
    id,
    locale,
    fallbackLocale: false,
    draft: true,
    overrideAccess: false,
    user,
    depth: 1,
  });
  return <ContentBlocks doc={doc} locale={locale} preview />;
}
