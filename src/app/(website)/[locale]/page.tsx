import { notFound } from "next/navigation";
import Link from "next/link";
import { foundationCopy, isLocale } from "@/lib/i18n/locales";
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = foundationCopy[locale];
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <p>{copy.label}</p>
      <h1 className="my-6 text-4xl font-bold">Galung</h1>
      <p>{copy.body}</p>
      <nav
        aria-label={locale === "id" ? "Bahasa" : "Language"}
        className="mt-8 flex gap-6"
      >
        <Link href="/id" lang="id" hrefLang="id">
          Bahasa Indonesia
        </Link>
        <Link href="/en" lang="en" hrefLang="en">
          English
        </Link>
      </nav>
    </main>
  );
}
