import Link from "next/link";
import type { Locale } from "@/lib/i18n/locales";
import { published, publicCategories } from "@/services/content/public";
import { ContentImage } from "./content-image";
export async function Feed({
  locale,
  section,
  category,
  page = 1,
  limit = 12,
  featured = false,
  embedded = false,
}: {
  locale: Locale;
  section: "news" | "portfolio";
  category?: number;
  page?: number;
  limit?: number;
  featured?: boolean;
  embedded?: boolean;
}) {
  const Heading = embedded ? "h3" : "h2";
  const result = await published(
    section === "news" ? "posts" : "portfolioProjects",
    locale,
    {
      ...(category ? { categories: { in: [category] } } : {}),
      ...(featured ? { featured: { equals: true } } : {}),
    },
    page,
    limit,
  );
  const categories = await publicCategories(locale, section);
  return (
    <>
      {!!categories.length && (
        <nav
          aria-label={locale === "id" ? "Kategori" : "Categories"}
          className="actions"
        >
          <Link href={`/${locale}/${section}`}>
            {locale === "id" ? "Semua" : "All"}
          </Link>
          {categories.map((item) => (
            <Link
              key={item.id}
              href={`/${locale}/${section}?category=${item.id}`}
              aria-current={item.id === category ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
      {!result.docs.length && (
        <p>
          {locale === "id"
            ? "Belum ada konten yang diterbitkan."
            : "No published content yet."}
        </p>
      )}
      <div className="card-grid">
        {result.docs
          .filter((doc) => doc.title && doc.slug)
          .map((doc) => (
            <article className="card" key={doc.id}>
              <ContentImage media={doc.heroMedia} />
              <div className="card-content">
                <Heading>
                  <Link href={`/${locale}/${section}/${doc.slug}`}>
                    {doc.title}
                  </Link>
                </Heading>
                {doc.excerpt && <p>{doc.excerpt}</p>}
                {"publishAt" in doc && doc.publishAt && (
                  <time dateTime={doc.publishAt}>
                    {new Intl.DateTimeFormat(
                      locale === "id" ? "id-ID" : "en-GB",
                      { dateStyle: "long", timeZone: "Asia/Jakarta" },
                    ).format(new Date(doc.publishAt))}
                  </time>
                )}
              </div>
            </article>
          ))}
      </div>
      {result.hasNextPage && (
        <Link
          className="button"
          href={`/${locale}/${section}?page=${page + 1}${category ? `&category=${category}` : ""}`}
        >
          {locale === "id" ? "Berikutnya" : "Next"}
        </Link>
      )}
      {page > 1 && (
        <Link
          className="button"
          href={`/${locale}/${section}?page=${page - 1}${category ? `&category=${category}` : ""}`}
        >
          {locale === "id" ? "Sebelumnya" : "Previous"}
        </Link>
      )}
    </>
  );
}
