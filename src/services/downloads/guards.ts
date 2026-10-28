import { childRequest } from "../content/media-references";
import { APIError, type CollectionBeforeChangeHook } from "payload";
export const workflowCapability = Symbol("installer-workflow");
export const assetGuard: CollectionBeforeChangeHook = ({ data, req }) => {
  if (req.context.downloadWorkflow !== workflowCapability)
    throw new APIError(
      "Use the scoped installer workflow; asset metadata is immutable",
      403,
    );
  return data;
};
export const releaseGuard: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  req,
}) => {
  const next = { ...originalDoc, ...data };
  if (next._status === "published" && next.lifecycle === "draft")
    throw new APIError("Select active or retired before publishing", 400);
  if (next._status !== "published" || next.lifecycle !== "active") return data;
  if (!originalDoc?.id) throw new APIError("Save a draft first", 400);
  const product = await req.payload.findByID({
    collection: "products",
    id: typeof next.product === "object" ? next.product.id : next.product,
    depth: 0,
    req: childRequest(req),
  });
  if (product.key !== "galung")
    throw new APIError("Only Galung releases are supported", 400);
  for (const locale of ["id", "en"] as const) {
    const translated = await req.payload.findByID({
      collection: "softwareReleases",
      id: originalDoc.id,
      locale,
      fallbackLocale: false,
      draft: true,
      req: childRequest(req),
    });
    const notes = req.locale === locale ? next.changelog : translated.changelog;
    if (!notes?.trim() || !next.reviewedLocales?.includes(locale))
      throw new APIError(
        "Review release notes in ID and EN before activation",
        400,
      );
  }
  const assets = await req.payload.find({
    collection: "releaseAssets",
    where: {
      and: [
        { release: { equals: originalDoc.id } },
        ...(next.assetsToPublish?.length
          ? [
              {
                id: {
                  in: next.assetsToPublish.map(
                    (asset: number | { id: number }) =>
                      typeof asset === "object" ? asset.id : asset,
                  ),
                },
              },
            ]
          : []),
      ],
    },
    limit: 200,
    depth: 0,
    req: childRequest(req),
  });
  if (
    next.assetsToPublish?.length &&
    (assets.totalDocs !== next.assetsToPublish.length ||
      assets.docs.some(
        (asset) =>
          asset.uploadStatus !== "verified" ||
          !asset.objectVersion ||
          !asset.verifiedAt ||
          !asset.storageKey ||
          !asset.sha256 ||
          !asset.sizeBytes ||
          !asset.filename ||
          !asset.architecture,
      ))
  )
    throw new APIError(
      "Select only verified assets belonging to this release",
      400,
    );
  if (
    assets.totalDocs > 200 ||
    !["windows", "macos"].every((os) =>
      assets.docs.some(
        (asset) =>
          asset.os === os &&
          asset.uploadStatus === "verified" &&
          asset.objectVersion,
      ),
    )
  )
    throw new APIError("Verified Windows and macOS assets are required", 400);
  const verified = assets.docs.filter(
    (asset) => asset.uploadStatus === "verified" && asset.objectVersion,
  );
  const variants = verified.map((asset) => `${asset.os}:${asset.architecture}`);
  if (new Set(variants).size !== variants.length)
    throw new APIError(
      "Select one verified candidate per variant; duplicate OS/architecture",
      400,
    );
  data.approvedAssets = verified.map((asset) => asset.id);
  data.publishedAt = originalDoc.publishedAt || new Date().toISOString();
  return data;
};
