import { validateAuthoredContent } from "../services/content/metadata-validation.ts";
import {
  childRequest,
  validateMediaReferences,
} from "../services/content/media-references";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeChangeHook,
} from "payload";
import { APIError } from "payload";
import { canPublish } from "../access/editorial";
export const publicationGuard: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  req,
  collection,
}) => {
  if (collection.slug === "products" && data.key && data.key !== "galung")
    throw new APIError("Only the Galung product is supported", 400);
  const validation = validateAuthoredContent(data);
  if (validation !== true) throw new APIError(validation, 400);
  if (
    (data._status === "published" ||
      (originalDoc?._status === "published" && data._status !== "draft")) &&
    !canPublish(req.user)
  )
    throw new APIError("Publisher approval required", 403);
  if (data._status === "published") {
    if (!originalDoc?.id)
      throw new APIError("Save both locale drafts before publishing", 400);
    for (const locale of ["id", "en"] as const) {
      const translated = await req.payload.findByID({
        collection: collection.slug as "pages",
        id: originalDoc.id,
        locale,
        fallbackLocale: false,
        draft: true,
        overrideAccess: false,
        user: req.user,
        req: childRequest(req),
      });
      await validateMediaReferences(
        req.locale === locale ? { ...translated, ...data } : translated,
        locale,
        req,
      );
      const title =
        req.locale === locale
          ? (data.title ?? translated.title)
          : translated.title;
      const slug =
        req.locale === locale
          ? (data.slug ?? translated.slug)
          : translated.slug;
      if (!title || !slug)
        throw new APIError(
          `Complete ${locale} title and slug before publishing`,
          400,
        );
    }
    // Explicit review of both locales is required; no automatic translation/fallback.
    if (
      !(data.reviewedLocales ?? originalDoc?.reviewedLocales)?.includes("id") ||
      !(data.reviewedLocales ?? originalDoc?.reviewedLocales)?.includes("en")
    )
      throw new APIError("Review ID and EN before shared publication", 400);
  }
  return data;
};
export const auditChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
  collection,
  operation,
}) => {
  await req.payload.create({
    collection: "auditEvents",
    req,
    overrideAccess: true,
    data: {
      actor: req.user?.id,
      actorIdSnapshot: req.user ? String(req.user.id) : "system",
      actorRoleSnapshot:
        req.user && "role" in req.user ? String(req.user.role) : "system",
      action: doc._status === "published" ? "publish" : operation,
      resource: collection.slug,
      resourceId: String(doc.id),
    },
  });
  if (
    doc._status === "published" ||
    previousDoc?._status === "published" ||
    (collection.slug === "media" && (doc.approved || previousDoc?.approved))
  )
    await invalidate(collection.slug);
  return doc;
};
export const auditDelete: CollectionAfterDeleteHook = async ({
  doc,
  req,
  collection,
}) => {
  await req.payload.create({
    collection: "auditEvents",
    req,
    overrideAccess: true,
    data: {
      actor: req.user?.id,
      actorIdSnapshot: req.user ? String(req.user.id) : "system",
      actorRoleSnapshot:
        req.user && "role" in req.user ? String(req.user.role) : "system",
      action: "delete",
      resource: collection.slug,
      resourceId: String(doc.id),
    },
  });
  await invalidate(collection.slug);
  return doc;
};
async function invalidate(resource: string) {
  // Local API CLI calls have no Next request cache. HTTP publication always invalidates.
  if (process.env.NEXT_RUNTIME) {
    const { revalidatePath, revalidateTag } = await import("next/cache");
    revalidateTag("content-public", { expire: 0 });
    revalidatePath("/id", "layout");
    revalidatePath("/en", "layout");
  }
  void resource;
}
