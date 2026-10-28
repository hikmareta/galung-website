import { PublicPage, publicMetadata } from "@/components/website/public-page";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  return publicMetadata((await params).locale, "");
}
export default async function Page({ params }: Props) {
  return <PublicPage locale={(await params).locale} path="" />;
}
