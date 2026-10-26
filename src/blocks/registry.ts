import { safeLink } from "../services/content/metadata-validation.ts";
import { safeRichText } from "../services/content/rich-text.ts";
import type { Block, Field } from "payload";
export const blockNames = [
  "hero",
  "richText",
  "imageText",
  "featureGrid",
  "mediaShowcase",
  "stats",
  "gallery",
  "videoEmbed",
  "portfolioFeed",
  "newsFeed",
  "faq",
  "callToAction",
  "communityShowcase",
] as const;
// The array is deliberately NOT localized: Payload owns stable row IDs and order.
export const blocks: Block[] = blockNames.map((slug) => ({
  slug,
  admin: {
    components: {
      Label: "/components/admin/section-order#SectionOrderLabel",
    },
  },
  fields: [
    { name: "enabled", type: "checkbox", defaultValue: true },
    {
      name: "variant",
      type: "select",
      defaultValue: "light",
      options: ["light", "forest"],
    },
    { name: "headline", type: "text", localized: true },
    { name: "body", type: "textarea", localized: true },
    { name: "media", type: "upload", relationTo: "media", localized: true },
    {
      name: "items",
      type: "array",
      fields: [
        { name: "title", type: "text", localized: true, required: true },
        { name: "body", type: "textarea", localized: true },
        { name: "media", type: "upload", relationTo: "media", localized: true },
      ],
    },
    { name: "link", type: "text", localized: true, validate: safeLink },
    { name: "linkLabel", type: "text", localized: true },
    ...specializedFields(slug),
  ],
}));
export { safeLink };
export const seoFields: Field[] = [
  {
    name: "seo",
    type: "group",
    fields: [
      { name: "title", type: "text", localized: true },
      { name: "description", type: "textarea", localized: true },
    ],
  },
];

function specializedFields(slug: (typeof blockNames)[number]): Field[] {
  switch (slug) {
    case "richText":
      return [
        {
          name: "content",
          type: "richText",
          localized: true,
          validate: safeRichText,
        },
      ];
    case "imageText":
      return [
        {
          name: "imagePosition",
          type: "select",
          defaultValue: "left",
          options: ["left", "right"],
        },
      ];
    case "featureGrid":
      return [
        {
          name: "columns",
          type: "select",
          defaultValue: "3",
          options: ["2", "3"],
        },
      ];
    case "stats":
      return [
        {
          name: "statistics",
          type: "array",
          fields: [
            { name: "value", type: "text", localized: true, required: true },
            { name: "label", type: "text", localized: true, required: true },
          ],
        },
      ];
    case "gallery":
    case "mediaShowcase":
    case "communityShowcase":
      return [
        {
          name: "gallery",
          type: "array",
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              localized: true,
              required: true,
            },
            { name: "caption", type: "text", localized: true },
          ],
        },
      ];
    case "videoEmbed":
      return [
        {
          name: "videoURL",
          type: "text",
          localized: true,
          validate: (value: unknown) =>
            !value ||
            (typeof value === "string" &&
              /^https:\/\/(www\.)?(youtube\.com\/watch\?|youtu\.be\/|vimeo\.com\/)[^\s\\]+$/.test(
                value,
              )) ||
            "Use an HTTPS YouTube or Vimeo video URL",
        },
        {
          name: "poster",
          type: "upload",
          relationTo: "media",
          localized: true,
        },
      ];
    case "faq":
      return [
        {
          name: "questions",
          type: "array",
          fields: [
            { name: "question", type: "text", localized: true, required: true },
            {
              name: "answer",
              type: "textarea",
              localized: true,
              required: true,
            },
          ],
        },
      ];
    case "portfolioFeed":
      return [
        {
          name: "category",
          type: "relationship",
          relationTo: "portfolioCategories",
        },
        { name: "limit", type: "number", min: 1, max: 12, defaultValue: 3 },
        { name: "featuredOnly", type: "checkbox", defaultValue: false },
      ];
    case "newsFeed":
      return [
        {
          name: "category",
          type: "relationship",
          relationTo: "postCategories",
        },
        { name: "limit", type: "number", min: 1, max: 12, defaultValue: 3 },
      ];
    case "callToAction":
    case "hero":
      return [
        {
          name: "secondaryLink",
          type: "text",
          localized: true,
          validate: safeLink,
        },
        { name: "secondaryLinkLabel", type: "text", localized: true },
      ];
  }
}
