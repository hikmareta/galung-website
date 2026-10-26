import type { CollectionConfig } from "payload";
import { Forbidden } from "payload";
import { adminOnly, isActiveAdmin } from "../access/admin";
import { enforcePasswordPolicy } from "../access/password";

export const Users: CollectionConfig = {
  slug: "users",
  admin: { useAsTitle: "email" },
  auth: {
    tokenExpiration: 3600,
    maxLoginAttempts: 5,
    lockTime: 900000,
    cookies: {
      sameSite: "Lax",
      secure: process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://") ?? false,
    },
  },
  access: {
    admin: ({ req }) => isActiveAdmin(req.user),
    create: adminOnly,
    read: adminOnly,
    update: adminOnly,
    delete: adminOnly,
    unlock: adminOnly,
  },
  hooks: {
    beforeOperation: [
      ({ operation, args }) => {
        // Payload resetPassword writes directly, bypassing beforeChange.
        if (operation === "resetPassword" && "data" in args) {
          enforcePasswordPolicy(args.data?.password);
        }
      },
    ],
    beforeChange: [
      ({ data, operation, req, context }) => {
        // Payload first-register deliberately overrides collection access. Hooks still run.
        // This context is supplied only by trusted Local API operator/test calls.
        if (
          operation === "create" &&
          !isActiveAdmin(req.user) &&
          context.bootstrapAdmin !== true
        )
          throw new Forbidden();
        if (data.password !== undefined) enforcePasswordPolicy(data.password);
        return data;
      },
    ],
    beforeLogin: [
      ({ user }) => {
        if (!isActiveAdmin({ ...user, collection: "users" }))
          throw new Forbidden();
      },
    ],
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "super-admin",
      options: [{ label: "Super Admin", value: "super-admin" }],
      access: { update: ({ req }) => isActiveAdmin(req.user) },
    },
    {
      name: "active",
      type: "checkbox",
      required: true,
      defaultValue: true,
      access: { update: ({ req }) => isActiveAdmin(req.user) },
    },
  ],
};
