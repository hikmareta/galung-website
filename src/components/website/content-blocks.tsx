import type { Page, Media } from "@/payload-types";
import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";
function ContentImage({ media }: { media: number | Media | null | undefined }) {
  if (!media || typeof media !== "object" || !media.url || !media.alt)
    return null;
  const width = Math.min(media.width || 640, 640);
  const height =
    media.width && media.height
      ? Math.max(1, Math.round((width * media.height) / media.width))
      : 480;
  return (
    <Image
      unoptimized
      src={media.url}
      alt={media.alt}
      width={width}
      height={height}
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
}
export function ContentBlocks({
  doc,
  locale = "id",
  preview = false,
}: {
  doc: Page;
  locale?: "id" | "en";
  preview?: boolean;
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
      {doc.layout
        ?.filter((block) => block.enabled)
        .map((block) => (
          <section
            key={block.id}
            data-block={block.blockType}
            className="section"
          >
            {block.headline && <h2>{block.headline}</h2>}
            {block.body && (
              <p style={{ whiteSpace: "pre-wrap" }}>{block.body}</p>
            )}
            <ContentImage media={block.media} />
            {block.blockType === "richText" && block.content && (
              <RichText data={block.content} />
            )}
            {block.items?.map((item) => (
              <article key={item.id}>
                {item.title && <h3>{item.title}</h3>}
                {item.body && <p>{item.body}</p>}
                <ContentImage media={item.media} />
              </article>
            ))}
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
