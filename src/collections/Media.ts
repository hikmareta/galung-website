import type { CollectionConfig } from "payload";
import { APIError } from "payload";
import path from "node:path";
import { adminOnly } from "../access/admin";
import { editors, canPublish, editorialUser } from "../access/editorial";
import { auditChange, auditDelete } from "../hooks/editorial";
import { validateImage } from "../services/content/media-validation";
import { childRequest, mediaUsage } from "../services/content/media-references";
const marker = process.env.GALUNG_TEST_DATABASE;
if (
  marker &&
  !/^galung_test_(integration|database|e2e)_[a-f0-9]{16}$/.test(marker)
)
  throw new Error("Unsafe test media directory");
export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "filename",
    description:
      "To replace an image, upload a new file and select it on the page. Existing images stay available to published pages and version history.",
  },
  access: {
    read: ({ req }) =>
      editorialUser(req.user) || { approved: { equals: true } },
    create: editors,
    update: ({ req }) =>
      canPublish(req.user) ||
      (editorialUser(req.user) ? { approved: { not_equals: true } } : false),
    delete: adminOnly,
  },
  upload: {
    staticDir: path.resolve("media", marker || ""),
    mimeTypes: ["image/jpeg", "image/png", "image/webp"],
    filesRequiredOnCreate: true,
    hideRemoveFile: true,
    crop: false,
    focalPoint: false,
  },
  hooks: {
    beforeOperation: [
      ({ req, operation, args }) => {
        // This runs BEFORE Payload generates, deletes or writes file bytes.
        if (operation === "update" && (req.file || req.query?.uploadEdits))
          throw new APIError(
            "Replace images by uploading a new media item, then choose it on the page.",
            403,
          );
        if (operation === "create") {
          if ("data" in args && args.data?.approved)
            throw new APIError(
              "Save ID and EN alt text before approving this image",
              400,
            );
          if (req.file) validateImage(req.file);
        }
      },
    ],
    beforeChange: [
      async ({ data, req, originalDoc }) => {
        if (originalDoc?.approved && !canPublish(req.user))
          throw new APIError("Publisher required to edit approved media", 403);
        if (!canPublish(req.user)) data.approved = false;
        if (
          originalDoc?.approved &&
          data.approved === false &&
          (await mediaUsage(originalDoc.id, req)).length
        )
          throw new APIError(
            "This image is referenced. Replace its references before withdrawing public approval.",
            409,
          );
        if (
          data.approved ||
          (originalDoc?.approved && data.approved !== false)
        ) {
          if (!originalDoc?.id)
            throw new APIError("Save both locales before approving media", 400);
          for (const locale of ["id", "en"] as const) {
            const saved = await req.payload.findByID({
              collection: "media",
              id: originalDoc.id,
              locale,
              fallbackLocale: false,
              depth: 0,
              overrideAccess: true,
              req: childRequest(req),
            });
            const alt =
              req.locale === locale ? (data.alt ?? saved.alt) : saved.alt;
            if (typeof alt !== "string" || !alt.trim())
              throw new APIError(
                `Complete ${locale} alt text before public approval`,
                400,
              );
          }
        }
        return data;
      },
    ],
    beforeDelete: [
      async ({ id, req }) => {
        const usage = await mediaUsage(Number(id), req);
        if (usage.length)
          throw new APIError(`Image is in use: ${usage.join(", ")}`, 409);
      },
    ],
    afterRead: [
      async ({ doc, req }) => {
        if (editorialUser(req.user) && !req.context.skipMediaUsage)
          doc.usage =
            (await mediaUsage(doc.id, req)).join("\n") ||
            "No content or retained version references this image.";
        return doc;
      },
    ],
    afterChange: [auditChange],
    afterDelete: [auditDelete],
  },
  fields: [
    { name: "alt", type: "text", localized: true, required: true },
    { name: "caption", type: "textarea", localized: true },
    { name: "attribution", type: "textarea", required: true },
    {
      name: "usage",
      type: "textarea",
      virtual: true,
      admin: { readOnly: true },
      access: { create: () => false, update: () => false },
    },
    {
      name: "approved",
      type: "checkbox",
      defaultValue: false,
      access: {
        create: ({ req }) => canPublish(req.user),
        update: ({ req }) => canPublish(req.user),
      },
      admin: {
        description:
          "Publisher approval requires both ID and EN alt text. Referenced approved files cannot be withdrawn.",
      },
    },
  ],
};
