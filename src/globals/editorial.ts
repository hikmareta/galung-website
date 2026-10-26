import { validateAuthoredContent } from "../services/content/metadata-validation.ts";
import {
  childRequest,
  validateMediaReferences,
} from "../services/content/media-references";
import type { GlobalConfig } from "payload";
import { APIError } from "payload";
import { adminOnly } from "../access/admin";
import { canPublish, editors } from "../access/editorial";
import { safeLink, seoFields } from "../blocks/registry";
const globalSlugs = [
  "siteSettings",
  "companyProfile",
  "headerNavigation",
  "footerNavigation",
  "contactSettings",
] as const;
export const editorialGlobals: GlobalConfig[] = globalSlugs.map((slug) => ({
  slug,
  access: { read: editors, readVersions: adminOnly, update: adminOnly },
  versions: { drafts: true, max: 30 },
  hooks: {
    beforeChange: [
      async ({ data, req, originalDoc }) => {
        const validation = validateAuthoredContent(data);
        if (validation !== true) throw new APIError(validation, 400);
        if (data._status === "published" && !canPublish(req.user))
          throw new APIError("Publisher required", 403);
        if (data._status === "published")
          for (const locale of ["id", "en"] as const) {
            const saved = await req.payload.findGlobal({
              slug,
              locale,
              fallbackLocale: false,
              draft: true,
              depth: 0,
              overrideAccess: false,
              user: req.user,
              req: childRequest(req),
            });
            await validateMediaReferences(
              req.locale === locale
                ? { ...originalDoc, ...saved, ...data }
                : saved,
              locale,
              req,
            );
          }
        return data;
      },
    ],
    afterChange: [
      async ({ doc, req }) => {
        await req.payload.create({
          collection: "auditEvents",
          req,
          overrideAccess: true,
          data: {
            actor: req.user?.id,
            actorIdSnapshot: req.user ? String(req.user.id) : "system",
            actorRoleSnapshot:
              req.user && "role" in req.user ? String(req.user.role) : "system",
            action: doc._status === "published" ? "publish" : "update",
            resource: slug,
            resourceId: slug,
          },
        });
        if (process.env.NEXT_RUNTIME) {
          const { revalidatePath, revalidateTag } = await import("next/cache");
          revalidateTag("content-public", { expire: 0 });
          revalidatePath("/id", "layout");
          revalidatePath("/en", "layout");
        }
        return doc;
      },
    ],
  },
  fields: slug.includes("Navigation")
    ? [
        {
          name: "links",
          type: "array",
          fields: [
            { name: "label", type: "text", localized: true, required: true },
            { name: "href", type: "text", required: true, validate: safeLink },
          ],
        },
      ]
    : [
        { name: "displayName", type: "text", localized: true },
        ...(slug === "companyProfile"
          ? ["legalName", "address", "registrationIdentifiers"].map((name) => ({
              name,
              type: "textarea" as const,
            }))
          : []),
        { name: "description", type: "textarea", localized: true },
        { name: "email", type: "email" },
        { name: "logo", type: "upload", relationTo: "media" },
        { name: "publicURL", type: "text", validate: safeLink },
        ...(slug === "siteSettings"
          ? [
              {
                name: "socialLinks",
                type: "array" as const,
                fields: [
                  {
                    name: "label",
                    type: "text" as const,
                    localized: true,
                    required: true,
                  },
                  {
                    name: "url",
                    type: "text" as const,
                    required: true,
                    validate: safeLink,
                  },
                ],
              },
              ...seoFields,
              {
                name: "openGraphImage",
                type: "upload" as const,
                relationTo: "media" as const,
              },
            ]
          : []),
        ...(slug === "companyProfile" || slug === "contactSettings"
          ? [
              { name: "phone", type: "text" as const },
              {
                name: "address",
                type: "textarea" as const,
                localized: true,
                admin: { condition: () => slug === "contactSettings" },
              },
            ].filter(
              (field) => slug === "contactSettings" || field.name !== "address",
            )
          : []),
      ],
}));
