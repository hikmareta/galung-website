import { semanticVersion } from "../services/content/metadata-validation.ts";
import type { CollectionConfig } from "payload";
import { APIError } from "payload";
import { adminOnly } from "../access/admin";
import { auditChange, auditDelete } from "../hooks/editorial";
const privateAccess = {
  read: adminOnly,
  create: adminOnly,
  update: adminOnly,
  delete: adminOnly,
};
// Phase 04 defines the model only. Binary upload/verification/delivery remains Phase 06.
export const SoftwareReleases: CollectionConfig = {
  slug: "softwareReleases",
  access: { ...privateAccess, readVersions: adminOnly },
  versions: { drafts: true },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data._status === "published")
          throw new APIError(
            "Release publication is disabled until the Phase 06 verification workflow exists",
            400,
          );
        return data;
      },
    ],
    afterChange: [auditChange],
    afterDelete: [auditDelete],
  },
  fields: [
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
    },
    {
      name: "version",
      type: "text",
      required: true,
      unique: true,
      validate: semanticVersion,
    },
    {
      name: "channel",
      type: "select",
      options: ["stable", "preview"],
      defaultValue: "stable",
      required: true,
    },
    { name: "publishedAt", type: "date", admin: { readOnly: true } },
    { name: "changelog", type: "textarea", localized: true },
  ],
};
export const ReleaseAssets: CollectionConfig = {
  slug: "releaseAssets",
  access: privateAccess,
  admin: {
    description:
      "Private metadata only. Installer uploads, supported architectures, verification and activation require Phase 06.",
  },
  hooks: { afterChange: [auditChange], afterDelete: [auditDelete] },
  fields: [
    {
      name: "release",
      type: "relationship",
      relationTo: "softwareReleases",
      required: true,
    },
    {
      name: "os",
      type: "select",
      options: ["windows", "macos"],
      required: true,
    },
    {
      name: "architecture",
      type: "text",
      admin: {
        description:
          "TBD: must match actual builds before activation; no architecture list is invented.",
      },
    },
    { name: "storageKey", type: "text" },
    { name: "filename", type: "text" },
    { name: "sizeBytes", type: "number", min: 1, max: 999999999 },
    {
      name: "sha256",
      type: "text",
      validate: (value: unknown) =>
        !value ||
        (typeof value === "string" && /^[a-fA-F0-9]{64}$/.test(value)) ||
        "SHA-256 must contain 64 hex characters",
    },
    {
      name: "uploadStatus",
      type: "select",
      options: ["pending"],
      defaultValue: "pending",
      required: true,
    },
    {
      name: "visibility",
      type: "select",
      options: ["private"],
      defaultValue: "private",
      required: true,
    },
  ],
};
export const ContactSubmissions: CollectionConfig = {
  slug: "contactSubmissions",
  access: {
    read: adminOnly,
    create: () => false,
    update: adminOnly,
    delete: adminOnly,
  },
  admin: {
    description:
      "Restricted personal data. Public submission/delivery and retention policy are not enabled by this schema.",
  },
  fields: [
    { name: "name", type: "text", required: true, maxLength: 120 },
    { name: "email", type: "email", required: true },
    { name: "message", type: "textarea", required: true, maxLength: 5000 },
    { name: "locale", type: "select", options: ["id", "en"], required: true },
    {
      name: "status",
      type: "select",
      options: ["new", "handled"],
      defaultValue: "new",
      required: true,
    },
  ],
};
export const DownloadEvents: CollectionConfig = {
  slug: "downloadEvents",
  access: {
    read: adminOnly,
    create: () => false,
    update: () => false,
    delete: adminOnly,
  },
  admin: {
    description:
      "Private aggregate event model; no IP, user agent or customer identity is collected. No download recording endpoint is enabled.",
  },
  fields: [
    {
      name: "release",
      type: "relationship",
      relationTo: "softwareReleases",
      required: true,
    },
    {
      name: "asset",
      type: "relationship",
      relationTo: "releaseAssets",
      required: true,
    },
    {
      name: "os",
      type: "select",
      options: ["windows", "macos"],
      required: true,
    },
  ],
};
