import { DownloadCenter } from "./download-center";
import { Feed } from "./feed";
import { ContactSection } from "./contact-section";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { ContentBlocks } from "./content-blocks";
import { ContentImage } from "./content-image";
import { Header } from "./header";
import {
  equivalents,
  resolvePublic,
  publicSettings,
} from "@/services/content/public";
import { isLocale } from "@/lib/i18n/locales";
import { readEnvironment } from "@/lib/env";
import type { Page, Post, PortfolioProject, Product } from "@/payload-types";

export async function publicMetadata(
  locale: string,
  path: string,
): Promise<Metadata> {
  if (!isLocale(locale)) notFound();
  const content = await resolvePublic(locale, path);
  if (!content) return { robots: { index: false, follow: false } };
  const origin = readEnvironment().origin;
  const languages = await equivalents(locale, path);
  const canonical = new URL(languages[locale]!, origin).href;
  return {
    title: content.doc.seo?.title || content.doc.title,
    description:
      content.doc.seo?.description || content.doc.excerpt || undefined,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        Object.entries(languages).map(([key, value]) => [
          key,
          new URL(value, origin).href,
        ]),
      ),
    },
    openGraph: {
      title: content.doc.seo?.title || content.doc.title,
      description:
        content.doc.seo?.description || content.doc.excerpt || undefined,
      url: canonical,
      locale: locale === "id" ? "id_ID" : "en_US",
    },
    robots: {
      index: process.env.PUBLIC_INDEXING === "true",
      follow: process.env.PUBLIC_INDEXING === "true",
    },
  };
}

export async function PublicPage({
  locale: value,
  path,
  page = 1,
  category,
}: {
  locale: string;
  path: string;
  page?: number;
  category?: number;
}) {
  if (!isLocale(value)) notFound();
  const locale = value;
  const content = await resolvePublic(locale, path);
  if (!content) notFound();
  const { doc } = content;
  const links = await equivalents(locale, path);
  const settings = await publicSettings(locale);
  const post = doc as Post;
  const project = doc as PortfolioProject;
  const product = doc as Product;
  return (
    <>
      <Header
        locale={locale}
        equivalents={links}
        navigation={settings.navigation}
      />
      {process.env.PUBLIC_INDEXING !== "true" && (
        <p className="container image-note">
          {locale === "id"
            ? "Contoh antarmuka — belum ditinjau"
            : "Sample interface copy — unreviewed"}
        </p>
      )}
      <ContentBlocks
        doc={doc as Page}
        locale={locale}
        extras={
          <>
            {path === "contact" && <ContactSection locale={locale} />}
            {path === "download" && <DownloadCenter locale={locale} />}
            {path === "about" && settings.company && (
              <section>
                {Object.entries(settings.company)
                  .filter(([, value]) => value)
                  .map(([key, value]) => (
                    <p key={key}>{value}</p>
                  ))}
              </section>
            )}
            {path === "contact" && settings.contact && (
              <section>
                {settings.contact.description && (
                  <p>{settings.contact.description}</p>
                )}
                {settings.contact.email && (
                  <p>
                    <a href={`mailto:${settings.contact.email}`}>
                      {settings.contact.email}
                    </a>
                  </p>
                )}
                {settings.contact.phone && <p>{settings.contact.phone}</p>}
                {settings.contact.address && <p>{settings.contact.address}</p>}
              </section>
            )}
            <ContentImage media={doc.heroMedia} />
            {doc.excerpt && <p className="section-intro">{doc.excerpt}</p>}
            {content.collection === "posts" && (
              <>
                {post.publishAt && (
                  <time dateTime={post.publishAt}>
                    {new Intl.DateTimeFormat(
                      locale === "id" ? "id-ID" : "en-GB",
                      { dateStyle: "long", timeZone: "Asia/Jakarta" },
                    ).format(new Date(post.publishAt))}
                  </time>
                )}
                {post.content && <RichText data={post.content} />}
              </>
            )}
            {content.collection === "portfolioProjects" && (
              <>
                {project.description && <p>{project.description}</p>}
                {project.caseStudy && <RichText data={project.caseStudy} />}
                {project.gallery?.map((item) => (
                  <ContentImage key={item.id} media={item.image} />
                ))}
              </>
            )}
            {content.collection === "products" && (
              <>
                {path === "software" && product.overview && (
                  <RichText data={product.overview} />
                )}
                <div className="card-grid">
                  {product.features?.map((item) => (
                    <article className="card card-content" key={item.id}>
                      <ContentImage media={item.media} />
                      <h2>{item.title}</h2>
                      {item.description && <p>{item.description}</p>}
                    </article>
                  ))}
                </div>
              </>
            )}
            {(path === "news" || path === "portfolio") && (
              <Feed
                locale={locale}
                section={path}
                category={category}
                page={page}
              />
            )}
          </>
        }
      />
      <footer className="site-footer">
        <div className="container">
          <p className="brand">Galung</p>
          <nav aria-label={locale === "id" ? "Tautan situs" : "Site links"}>
            {settings.footer.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            {["about", "contact", "privacy", "terms"].map((route, index) => (
              <Link key={route} href={`/${locale}/${route}`}>
                {
                  (locale === "id"
                    ? ["Tentang", "Kontak", "Privasi", "Ketentuan"]
                    : ["About", "Contact", "Privacy", "Terms"])[index]
                }
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
