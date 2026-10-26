import { notFound } from "next/navigation";
import "@/styles/globals.css";
import { isLocale } from "@/lib/i18n/locales";
import { Header } from "@/components/website/header";
import { designCopy } from "@/lib/i18n/design-copy";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return {
    title: designCopy[locale].metaTitle,
    robots: { index: false, follow: false },
  };
}
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
      <body>
        <a className="skip-link" href="#main-content">
          {designCopy[locale].skip}
        </a>
        <Header locale={locale} />
        {children}
        <footer id="about" className="site-footer">
          <div className="container">
            <p className="brand">Galung</p>
            <p>{designCopy[locale].footer}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
