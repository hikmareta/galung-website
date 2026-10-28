import { cache } from "react";
import { getPayload, type Where } from "payload";
import config from "@/payload.config";
import type { Locale } from "@/lib/i18n/locales";
import { isLocale } from "@/lib/i18n/locales";
import { readEnvironment } from "@/lib/env";

export const publicRoutes = [
  "",
  "about",
  "software",
  "software/features",
  "portfolio",
  "news",
  "download",
  "contact",
  "privacy",
  "terms",
] as const;
export const published = cache(
  async (
    collection: "pages" | "products" | "posts" | "portfolioProjects",
    locale: Locale,
    where: Where = {},
    page = 1,
    limit = 12,
  ) => {
    const payload = await getPayload({ config });
    return payload.find({
      collection,
      locale,
      fallbackLocale: false,
      draft: false,
      overrideAccess: false,
      depth: 1,
      page,
      limit,
      sort: "-createdAt",
      where: { and: [{ _status: { equals: "published" } }, where] },
    });
  },
);

export const resolvePublic = cache(async (locale: Locale, path: string) => {
  if (path.startsWith("news/") || path.startsWith("portfolio/")) {
    const [section, slug, extra] = path.split("/");
    if (!slug || extra) return null;
    const collection = section === "news" ? "posts" : "portfolioProjects";
    const result = await published(
      collection,
      locale,
      { slug: { equals: slug } },
      1,
      1,
    );
    const doc = result.docs[0];
    return doc?.title && doc.slug
      ? {
          collection: collection as
            "pages" | "products" | "posts" | "portfolioProjects",
          doc,
        }
      : null;
  }
  if (!publicRoutes.some((route) => route === path)) return null;
  const collection =
    path === "software" || path === "software/features" ? "products" : "pages";
  const key = collection === "products" ? "galung" : path || "home";
  const result = await published(
    collection,
    locale,
    { key: { equals: key } },
    1,
    1,
  );
  const doc = result.docs[0];
  return doc?.title && doc.slug
    ? {
        collection: collection as
          "pages" | "products" | "posts" | "portfolioProjects",
        doc,
      }
    : null;
});

export async function equivalents(locale: Locale, path: string) {
  const current = await resolvePublic(locale, path);
  if (!current) return {};
  const other: Locale = locale === "id" ? "en" : "id";
  const result = await published(
    current.collection,
    other,
    { id: { equals: current.doc.id } },
    1,
    1,
  );
  const translated = result.docs[0];
  const otherPath =
    path.startsWith("news/") || path.startsWith("portfolio/")
      ? `${path.split("/")[0]}/${translated?.slug}`
      : path;
  return {
    [locale]: `/${locale}${path ? `/${path}` : ""}`,
    ...(translated?.title && translated.slug
      ? { [other]: `/${other}${otherPath ? `/${otherPath}` : ""}` }
      : {}),
  };
}

// Internal navigation follows the same published document identity as the locale switch.
// Missing translations are omitted; never manufacture a target by rewriting a slug.
export async function localizedHref(href: string, locale: Locale) {
  const origin = readEnvironment().origin;
  let url: URL;
  try {
    url = new URL(href, origin);
  } catch {
    return null;
  }
  if (url.origin !== origin) return url.protocol === "https:" ? href : null;
  const parts = url.pathname.split("/").filter(Boolean);
  const source = isLocale(parts[0] || "")
    ? (parts.shift() as Locale)
    : undefined;
  const path = parts.join("/");
  for (const candidate of source
    ? [source]
    : ([locale, locale === "id" ? "en" : "id"] as Locale[])) {
    const routes = await equivalents(candidate, path);
    if (routes[locale]) return `${routes[locale]}${url.search}${url.hash}`;
  }
  return null;
}

// These globals remain private in REST. Only explicitly published fields are projected here.
export const publicSettings = cache(async (locale: Locale) => {
  const payload = await getPayload({ config });
  const navigation = await payload.findGlobal({
    slug: "headerNavigation",
    locale,
    fallbackLocale: false,
    draft: false,
    overrideAccess: true,
    depth: 0,
  });
  const footer = await payload.findGlobal({
    slug: "footerNavigation",
    locale,
    fallbackLocale: false,
    draft: false,
    overrideAccess: true,
    depth: 0,
  });
  const contact = await payload.findGlobal({
    slug: "contactSettings",
    locale,
    fallbackLocale: false,
    draft: false,
    overrideAccess: true,
    depth: 0,
  });
  const company = await payload.findGlobal({
    slug: "companyProfile",
    locale,
    fallbackLocale: false,
    draft: false,
    overrideAccess: true,
    depth: 0,
  });
  const links = async (doc: typeof navigation) => {
    if (doc._status !== "published") return [];
    const resolved = await Promise.all(
      (doc.links || [])
        .filter((link) => link.label && link.href)
        .map(async (link) => ({
          label: link.label,
          href: await localizedHref(link.href, locale),
        })),
    );
    return resolved.filter(
      (link): link is { label: string; href: string } => !!link.href,
    );
  };
  const [headerLinks, footerLinks] = await Promise.all([
    links(navigation),
    links(footer),
  ]);
  return {
    navigation: headerLinks,
    footer: footerLinks,
    contact:
      contact._status === "published"
        ? {
            description: contact.description,
            email: contact.email,
            phone: contact.phone,
            address: contact.address,
          }
        : null,
    company:
      company._status === "published"
        ? {
            displayName: company.displayName,
            description: company.description,
            legalName: company.legalName,
            address: company.address,
            registrationIdentifiers: company.registrationIdentifiers,
          }
        : null,
  };
});

export async function publicCategories(
  locale: Locale,
  section: "news" | "portfolio",
) {
  const ids = new Set<number>();
  let page = 1;
  while (true) {
    const result = await published(
      section === "news" ? "posts" : "portfolioProjects",
      locale,
      {},
      page,
      100,
    );
    for (const doc of result.docs)
      if ("categories" in doc && doc.title && doc.slug)
        for (const category of doc.categories || [])
          ids.add(typeof category === "number" ? category : category.id);
    if (!result.hasNextPage) break;
    page++;
  }
  if (!ids.size) return [];
  const payload = await getPayload({ config });
  // Lookup labels are exposed only when referenced by a published localized document.
  const result = await payload.find({
    collection: section === "news" ? "postCategories" : "portfolioCategories",
    locale,
    fallbackLocale: false,
    overrideAccess: true,
    depth: 0,
    pagination: false,
    where: { id: { in: [...ids] } },
  });
  return result.docs
    .filter((doc) => doc.label)
    .map((doc) => ({ id: doc.id, label: doc.label }));
}
