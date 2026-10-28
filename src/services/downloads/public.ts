import type { Payload } from "payload";
import type { Locale } from "../../lib/i18n/locales";
import type { InstallerStorage } from "./storage";
export async function publicInstallers(payload: Payload, locale: Locale) {
  const releases = await payload.find({
    collection: "softwareReleases",
    overrideAccess: true,
    draft: false,
    depth: 0,
    locale,
    fallbackLocale: false,
    limit: 100,
    sort: "-publishedAt",
    where: {
      and: [
        { _status: { equals: "published" } },
        { lifecycle: { equals: "active" } },
        { channel: { equals: "stable" } },
      ],
    },
  });
  const seen = new Set<string>();
  const cards = [];
  for (const release of releases.docs) {
    if (
      !Array.isArray(release.approvedAssets) ||
      !release.approvedAssets.length
    )
      continue;
    if (!release.changelog || !release.reviewedLocales?.includes(locale))
      continue;
    const assets = await payload.find({
      collection: "releaseAssets",
      overrideAccess: true,
      depth: 0,
      limit: 200,
      where: {
        and: [
          { release: { equals: release.id } },
          {
            id: {
              in: release.approvedAssets.filter(
                (id): id is number => typeof id === "number",
              ),
            },
          },
          { uploadStatus: { equals: "verified" } },
        ],
      },
    });
    for (const asset of assets.docs) {
      const variant = `${asset.os}:${asset.architecture}`;
      if (
        !Array.isArray(release.approvedAssets) ||
        !release.approvedAssets.includes(asset.id)
      )
        continue;
      if (
        seen.has(variant) ||
        !asset.objectVersion ||
        !asset.verifiedAt ||
        !asset.sha256 ||
        !asset.sizeBytes ||
        !asset.filename ||
        !asset.architecture
      )
        continue;
      seen.add(variant);
      cards.push({
        id: asset.id,
        os: asset.os,
        architecture: asset.architecture,
        version: release.version,
        sizeBytes: asset.sizeBytes,
        sha256: asset.sha256,
        filename: asset.filename,
        changelog: release.changelog,
      });
    }
  }
  return cards;
}
export async function downloadTarget(
  payload: Payload,
  storage: InstallerStorage,
  id: number,
  locale: Locale,
) {
  const approved = (await publicInstallers(payload, locale)).find(
    (card) => card.id === id,
  );
  if (!approved) return null;
  const asset = await payload.findByID({
    collection: "releaseAssets",
    id,
    depth: 0,
  });
  if (!asset.storageKey || !asset.objectVersion) return null;
  const head = await storage.head(asset.storageKey, asset.objectVersion);
  if (head.size !== approved.sizeBytes)
    throw new Error("Stored installer missing or changed");
  return storage.download(
    asset.storageKey,
    asset.objectVersion,
    approved.filename,
  );
}
