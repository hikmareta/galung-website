import { notFound } from "next/navigation";
import "@/styles/globals.css";
import { isLocale } from "@/lib/i18n/locales";
export const metadata = {
  title: "Galung — foundation",
  robots: { index: false, follow: false },
};
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
