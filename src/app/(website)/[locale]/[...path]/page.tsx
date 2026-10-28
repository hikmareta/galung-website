import { PublicPage, publicMetadata } from "@/components/website/public-page";
export const dynamic = "force-dynamic";
type Props = {
  params: Promise<{ locale: string; path: string[] }>;
  searchParams: Promise<{ page?: string; category?: string }>;
};
export async function generateMetadata({ params }: Props) {
  const { locale, path } = await params;
  return publicMetadata(locale, path.join("/"));
}
export default async function Page({ params, searchParams }: Props) {
  const { locale, path } = await params;
  const query = await searchParams;
  const page = Number(query.page || 1);
  const category = Number(query.category);
  return (
    <PublicPage
      locale={locale}
      path={path.join("/")}
      page={Number.isSafeInteger(page) && page > 0 && page <= 10000 ? page : 1}
      category={
        Number.isSafeInteger(category) && category > 0 ? category : undefined
      }
    />
  );
}
