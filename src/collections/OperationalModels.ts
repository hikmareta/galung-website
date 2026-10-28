import { semanticVersion } from "../services/content/metadata-validation.ts";
import type { CollectionConfig, Where } from "payload";
import { assetGuard, releaseGuard } from "../services/downloads/guards";
import { adminOnly } from "../access/admin";
import { auditChange, auditDelete } from "../hooks/editorial";
const privateAccess = {
  read: adminOnly,
  create: adminOnly,
  update: adminOnly,
  delete: adminOnly,
};
// Private models; public downloads use verified projections.
export const SoftwareReleases: CollectionConfig = {
  slug: "softwareReleases",
  access: { ...privateAccess, delete: () => false, readVersions: adminOnly },
  versions: { drafts: true },
  hooks: {
    beforeChange: [releaseGuard],
    afterChange: [auditChange],
    afterDelete: [auditDelete],
  },
  fields: [
    {
      name: "installerUpload",
      type: "ui",
      admin: {
        components: {
          Field: "/components/admin/installer-upload#InstallerUpload",
        },
      },
    },
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
    {
      name: "assetsToPublish",
      type: "relationship",
      relationTo: "releaseAssets",
      hasMany: true,
      maxRows: 200,
      admin: {
        className: "galung-installer-candidates",
        description:
          "Select verified candidates for this release. Empty selects all verified assets; select explicitly to resolve duplicate builds. Sample copy — unreviewed.",
      },
      filterOptions: ({ id }): Where => ({
        and: [
          { release: { equals: id || 0 } },
          { uploadStatus: { equals: "verified" } },
        ],
      }),
    },
    {
      name: "approvedAssets",
      type: "json",
      access: { create: () => false, update: () => false },
      admin: { readOnly: true },
    },
    {
      name: "lifecycle",
      type: "select",
      options: ["draft", "active", "retired"],
      defaultValue: "draft",
      required: true,
    },
    {
      name: "reviewedLocales",
      type: "select",
      hasMany: true,
      options: ["id", "en"],
    },
    {
      name: "publishedAt",
      type: "date",
      access: { create: () => false, update: () => false },
      admin: { readOnly: true },
    },
    { name: "changelog", type: "textarea", localized: true },
  ],
};
export const ReleaseAssets: CollectionConfig = {
  slug: "releaseAssets",
  access: {
    ...privateAccess,
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  admin: {
    description:
      "Immutable installer records. Use Upload installer on a saved release draft. Verification runs separately.",
  },
  hooks: {
    beforeChange: [assetGuard],
    afterChange: [auditChange],
    afterDelete: [auditDelete],
  },
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
      options: ["pending", "uploaded", "verified", "failed", "aborted"],
      defaultValue: "pending",
      required: true,
    },
    { name: "uploadId", type: "text", admin: { hidden: true } },
    { name: "uploadOwner", type: "number", admin: { readOnly: true } },
    { name: "uploadExpiresAt", type: "date", admin: { readOnly: true } },
    { name: "objectVersion", type: "text", admin: { readOnly: true } },
    { name: "verifiedAt", type: "date", admin: { readOnly: true } },
    { name: "failure", type: "text", admin: { readOnly: true } },
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
    read: (args) =>
      adminOnly(args)
        ? {
            createdAt: {
              greater_than: new Date(Date.now() - 30 * 86400000).toISOString(),
            },
          }
        : false,
    create: () => false,
    update: adminOnly,
    delete: adminOnly,
  },
  admin: {
    description:
      "Private website copies, retained for 30 days. Public REST create stays closed; the validated contact endpoint controls submission and SMTP delivery. Email-inbox retention is separate.",
  },
  fields: [
    { name: "name", type: "text", required: true, maxLength: 120 },
    { name: "email", type: "email", required: true },
    { name: "message", type: "textarea", required: true, maxLength: 5000 },
    { name: "locale", type: "select", options: ["id", "en"], required: true },
    {
      name: "submissionKey",
      type: "text",
      unique: true,
      access: { update: () => false },
      admin: { readOnly: true },
    },
    {
      name: "requestFingerprint",
      type: "text",
      access: { update: () => false },
      admin: { readOnly: true },
    },
    {
      name: "privacyRevision",
      type: "text",
      access: { update: () => false },
      admin: { readOnly: true },
    },
    {
      name: "deliveryStatus",
      type: "select",
      options: ["pending", "accepted", "failed", "unknown"],
      required: true,
      defaultValue: "unknown",
      access: { update: () => false },
      admin: {
        readOnly: true,
        description:
          "SMTP acceptance is not confirmation of inbox delivery. Unknown/pending messages are never automatically resent.",
      },
    },
    {
      name: "acceptedAt",
      type: "date",
      access: { update: () => false },
      admin: { readOnly: true },
    },
    {
      name: "auditPending",
      type: "checkbox",
      defaultValue: false,
      access: { update: () => false },
      admin: { readOnly: true },
    },
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
