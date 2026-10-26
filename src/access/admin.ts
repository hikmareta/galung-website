import type { Access } from "payload";

export function isActiveAdmin(user: unknown): boolean {
  return (
    typeof user === "object" &&
    user !== null &&
    "collection" in user &&
    user.collection === "users" &&
    "role" in user &&
    user.role === "super-admin" &&
    "active" in user &&
    user.active === true
  );
}
export const adminOnly: Access = ({ req }) => isActiveAdmin(req.user);
