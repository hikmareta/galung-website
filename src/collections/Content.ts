import { safeRichText } from "../services/content/rich-text";
import type { CollectionConfig } from "payload";
import { adminOnly } from "../access/admin";
import { editors, publishedRead } from "../access/editorial";
import { blocks, seoFields } from "../blocks/registry";
import { auditChange, auditDelete, publicationGuard } from "../hooks/editorial";
const lifecycle = {
  beforeChange: [publicationGuard],
  afterChange: [auditChange],
  afterDelete: [auditDelete],
};
export const contentCollections: CollectionConfig[] = [
  "pages",
  "posts",
  "portfolioProjects",
  "products",
].map((slug) => ({
  slug,
  dbName: slug === "portfolioProjects" ? "projects" : undefined,
  admin: {
    useAsTitle: "title",
    preview: (doc, { locale }) => `/preview/${slug}/${doc.id}?locale=${locale}`,
  },
  access: {
    read: publishedRead,
    readVersions: editors,
    create: editors,
    update: editors,
    delete: adminOnly,
  },
  versions: { drafts: true, maxPerDoc: 30 },
  hooks: lifecycle,
  fields: [
    {
      name: "key",
      type: "text",
      required: true,
      unique: true,
      ...(slug === "products"
        ? {
            validate: (value: unknown) =>
              value === "galung" || "Only the Galung product is supported",
          }
        : {}),
    },
    { name: "title", type: "text", localized: true, required: true },
    {
      name: "slug",
      type: "text",
      localized: true,
      required: true,
      unique: true,
      validate: (value: unknown) =>
        (typeof value === "string" &&
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) ||
        "Use a lowercase route slug",
    },
    {
      name: "reviewedLocales",
      type: "select",
      hasMany: true,
      options: ["id", "en"],
      admin: {
        description:
          "Publisher must explicitly review both translations; shared block order publishes together.",
      },
    },
    { name: "excerpt", type: "textarea", localized: true },
    { name: "heroMedia", type: "upload", relationTo: "media", localized: true },
    { name: "layout", type: "blocks", blocks },
    ...(slug === "posts" || slug === "portfolioProjects"
      ? [
          {
            name: "categories",
            type: "relationship" as const,
            hasMany: true,
            relationTo:
              slug === "posts"
                ? ("postCategories" as const)
                : ("portfolioCategories" as const),
          },
        ]
      : []),
    ...(slug === "posts"
      ? [
          {
            name: "publishAt",
            type: "date" as const,
            admin: {
              description:
                "Editorial publication date only; automatic scheduled publishing is disabled.",
            },
          },
          {
            name: "content",
            type: "richText" as const,
            localized: true,
            validate: safeRichText,
          },
        ]
      : []),
    ...(slug === "portfolioProjects"
      ? [
          { name: "featured", type: "checkbox" as const, defaultValue: false },
          { name: "description", type: "textarea" as const, localized: true },
          {
            name: "caseStudy",
            type: "richText" as const,
            localized: true,
            validate: safeRichText,
          },
          {
            name: "gallery",
            type: "array" as const,
            fields: [
              {
                name: "image",
                type: "upload" as const,
                relationTo: "media" as const,
                localized: true,
                required: true,
              },
            ],
          },
        ]
      : []),
    ...(slug === "products"
      ? [
          {
            name: "overview",
            type: "richText" as const,
            localized: true,
            validate: safeRichText,
          },
          {
            name: "features",
            type: "array" as const,
            fields: [
              {
                name: "title",
                type: "text" as const,
                localized: true,
                required: true,
              },
              {
                name: "description",
                type: "textarea" as const,
                localized: true,
              },
              {
                name: "media",
                type: "upload" as const,
                localized: true,
                relationTo: "media" as const,
              },
            ],
          },
        ]
      : []),
    ...seoFields,
  ],
}));
export const categories: CollectionConfig[] = [
  "postCategories",
  "portfolioCategories",
].map((slug) => ({
  slug,
  access: {
    read: editors,
    create: editors,
    update: editors,
    delete: adminOnly,
  },
  fields: [
    { name: "key", type: "text", required: true, unique: true },
    { name: "label", type: "text", localized: true, required: true },
  ],
}));
export const AuditEvents: CollectionConfig = {
  slug: "auditEvents",
  admin: {
    defaultColumns: [
      "createdAt",
      "actorIdSnapshot",
      "actorRoleSnapshot",
      "action",
      "resource",
      "resourceId",
    ],
    description:
      "Activity history. Staff IDs and roles remain recorded when an account is removed. Older unknown entries are labelled explicitly.",
  },
  access: {
    read: adminOnly,
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: "actor", type: "relationship", relationTo: "users" },
    {
      name: "actorIdSnapshot",
      type: "text",
      required: true,
      defaultValue: "legacy-unknown",
      admin: { readOnly: true },
    },
    {
      name: "actorRoleSnapshot",
      type: "text",
      required: true,
      defaultValue: "legacy-unknown",
      admin: { readOnly: true },
    },
    { name: "action", type: "text", required: true },
    { name: "resource", type: "text", required: true },
    { name: "resourceId", type: "text", required: true },
  ],
};
