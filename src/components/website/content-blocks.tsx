import type { Page } from "@/payload-types";
import { ContentImage } from "./content-image";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Feed } from "./feed";
export function ContentBlocks({
  doc,
  locale = "id",
  preview = false,
  extras,
}: {
  doc: Page;
  locale?: "id" | "en";
  preview?: boolean;
  extras?: React.ReactNode;
}) {
  return (
    <main
      id="main-content"
      lang={locale}
      tabIndex={-1}
      className="container section"
    >
      {preview && <p>Draft preview · {locale} · unreviewed content</p>}
      <h1>{doc.title}</h1>
      {extras}
      {doc.layout
        ?.filter((block) => block.enabled)
        .map((block) => (
          <section
            key={block.id}
            data-block={block.blockType}
            className={`section cms-block cms-block--${block.variant || "light"} cms-block--${block.blockType}${block.blockType === "featureGrid" ? ` cms-block--columns-${block.columns === "2" ? "2" : "3"}` : ""}`}
            data-columns={
              block.blockType === "featureGrid"
                ? block.columns || "3"
                : undefined
            }
            data-image-position={
              block.blockType === "imageText"
                ? block.imagePosition || "left"
                : undefined
            }
          >
            {block.blockType === "imageText" && (
              <div
                className={`cms-image-text cms-image-text--${block.imagePosition === "right" ? "right" : "left"}`}
              >
                <div className="cms-image-text__copy">
                  {block.headline && <h2>{block.headline}</h2>}
                  {block.body && (
                    <p style={{ whiteSpace: "pre-wrap" }}>{block.body}</p>
                  )}
                </div>
                <div className="cms-image-text__media">
                  <ContentImage media={block.media} />
                </div>
              </div>
            )}
            {block.blockType !== "imageText" && block.headline && (
              <h2>{block.headline}</h2>
            )}
            {block.blockType !== "imageText" && block.body && (
              <p style={{ whiteSpace: "pre-wrap" }}>{block.body}</p>
            )}
            {(block.blockType === "newsFeed" ||
              block.blockType === "portfolioFeed") &&
              !preview && (
                <Feed
                  embedded
                  locale={locale}
                  section={
                    block.blockType === "newsFeed" ? "news" : "portfolio"
                  }
                  limit={block.limit || 3}
                  category={
                    typeof block.category === "number"
                      ? block.category
                      : block.category?.id
                  }
                  featured={
                    block.blockType === "portfolioFeed" && !!block.featuredOnly
                  }
                />
              )}
            {block.blockType !== "imageText" && (
              <ContentImage media={block.media} />
            )}
            {block.blockType === "richText" && block.content && (
              <RichText data={block.content} />
            )}
            {!!block.items?.length && (
              <div className="cms-items">
                {block.items.map((item) => (
                  <article key={item.id}>
                    {item.title && <h3>{item.title}</h3>}
                    {item.body && <p>{item.body}</p>}
                    <ContentImage media={item.media} />
                  </article>
                ))}
              </div>
            )}
            {"gallery" in block &&
              block.gallery?.map((item) => (
                <figure key={item.id}>
                  <ContentImage media={item.image} />
                  {"caption" in item && item.caption && (
                    <figcaption>{item.caption}</figcaption>
                  )}
                </figure>
              ))}
            {block.blockType === "faq" &&
              block.questions?.map((item) => (
                <details key={item.id}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            {block.blockType === "stats" &&
              block.statistics?.map((item) => (
                <dl key={item.id}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </dl>
              ))}
            {block.blockType === "videoEmbed" && (
              <>
                <ContentImage media={block.poster} />
                {block.videoURL && (
                  <a href={block.videoURL}>
                    {block.headline || block.videoURL}
                  </a>
                )}
              </>
            )}
            {block.link && (block.linkLabel || block.headline) && (
              <a href={block.link}>{block.linkLabel || block.headline}</a>
            )}
            {"secondaryLink" in block &&
              block.secondaryLink &&
              block.secondaryLinkLabel && (
                <a href={block.secondaryLink}>{block.secondaryLinkLabel}</a>
              )}
          </section>
        ))}
    </main>
  );
}
