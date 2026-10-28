import Image from "next/image";
import type { Media } from "@/payload-types";
export function ContentImage({
  media,
}: {
  media: number | Media | null | undefined;
}) {
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
