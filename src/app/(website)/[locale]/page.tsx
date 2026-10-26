import { publishedHome } from "@/services/content/read";
import { ContentBlocks } from "@/components/website/content-blocks";
export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { foundationCopy, isLocale } from "@/lib/i18n/locales";
import { designCopy } from "@/lib/i18n/design-copy";
import { ButtonLink, Card } from "@/components/ui/primitives";
import { SampleImage } from "@/components/ui/sample-image";
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const home = await publishedHome(locale);
  if (home) return <ContentBlocks doc={home} locale={locale} />;
  const copy = designCopy[locale];
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="container hero" aria-labelledby="hero-title">
        <SampleImage name="hero" hero />
        <div className="hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 id="hero-title">{copy.title}</h1>
          <p>{copy.intro}</p>
          <p className="image-note">{copy.imageNote}</p>
          <div className="actions">
            <ButtonLink href="#product">{copy.cta}</ButtonLink>
            <ButtonLink href="#features" variant="secondary">
              {copy.secondary}
            </ButtonLink>
          </div>
        </div>
      </section>
      <div className="container value-bar">
        <ul>
          {copy.values.map((value, index) => (
            <li key={value}>
              <span aria-hidden="true">{["♫", "♧", "◎", "✧"][index]}</span>
              {value}
            </li>
          ))}
        </ul>
      </div>
      <section
        id="product"
        className="container section"
        aria-labelledby="components-title"
      >
        <p className="eyebrow">{foundationCopy[locale].label}</p>
        <h2 id="components-title">{copy.section}</h2>
        <p className="section-intro">{copy.description}</p>
        <div className="card-grid">
          {copy.cards.map((title, index) => (
            <div
              key={title}
              id={index === 1 ? "portfolio" : index === 2 ? "news" : undefined}
            >
              <Card
                title={title}
                number={`0${index + 1}`}
                media={
                  <figure className="sample-figure">
                    <SampleImage
                      name={
                        index === 0
                          ? "laptop"
                          : index === 1
                            ? "hero"
                            : "community"
                      }
                      alt={`${title}. ${copy.imageNote}`}
                    />
                  </figure>
                }
              >
                {copy.cardBody}
              </Card>
            </div>
          ))}
        </div>
      </section>
      <section
        id="features"
        className="container section token-section"
        aria-labelledby="tokens-title"
      >
        <div>
          <p className="eyebrow">GALUNG / UI</p>
          <h2 id="tokens-title">{copy.palette}</h2>
          <p>{copy.detail}</p>
        </div>
        <div className="swatches">
          {copy.swatches.map((color, index) => (
            <div className={`swatch swatch-${index}`} key={color}>
              <span>{color}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="container section" aria-labelledby="gallery-title">
        <h2 id="gallery-title">{copy.gallery}</h2>
        <p>{copy.imageNote}</p>
        <div className="sample-gallery">
          {(["laptop", "community"] as const).map((name) => (
            <figure key={name}>
              <SampleImage name={name} alt={copy.imageNote} />
              <figcaption>{copy.imageNote}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
