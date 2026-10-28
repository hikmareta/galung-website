import { notFound } from "next/navigation";
import "@/styles/globals.css";
import { isLocale } from "@/lib/i18n/locales";
import { designCopy } from "@/lib/i18n/design-copy";
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
        {children}
      </body>
    </html>
  );
}
