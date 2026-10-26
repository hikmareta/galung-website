import Image from "next/image";

// Existing pre-encoded conceptual art only; no reference photograph is published.
export function SampleImage({
  name,
  alt = "",
  hero = false,
}: {
  name: "hero" | "laptop" | "community";
  alt?: string;
  hero?: boolean;
}) {
  const widths =
    name === "laptop"
      ? [480, 768, 1024, 1536]
      : name === "hero"
        ? [640, 960, 1280, 1860]
        : [640, 960, 1280, 1983];
  const width = widths[widths.length - 1]!;
  const height = name === "hero" ? 846 : name === "laptop" ? 1024 : 793;
  return (
    <picture className={hero ? "hero-photo" : "sample-image"}>
      <source
        type="image/webp"
        srcSet={widths
          .map((size) => `/design-samples/${name}-v3-${size}.webp ${size}w`)
          .join(", ")}
        sizes={
          hero
            ? "(max-width: 767px) 100vw, 1216px"
            : "(max-width: 639px) 100vw, (max-width: 1199px) 50vw, 400px"
        }
      />
      <Image
        src={`/design-samples/${name}-v3-${width}.webp`}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        loading={hero ? "eager" : "lazy"}
      />
    </picture>
  );
}
