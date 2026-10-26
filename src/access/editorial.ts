import type { Access } from "payload";
export function editorialUser(user: unknown): boolean {
  return (
    !!user &&
    typeof user === "object" &&
    "collection" in user &&
    user.collection === "users" &&
    "active" in user &&
    user.active === true &&
    "role" in user &&
    ["editor", "publisher", "super-admin"].includes(String(user.role))
  );
}
export function canPublish(user: unknown): boolean {
  return (
    editorialUser(user) &&
    "role" in (user as object) &&
    ["publisher", "super-admin"].includes(
      String((user as { role: string }).role),
    )
  );
}
export const editors: Access = ({ req }) => editorialUser(req.user);
export const publishers: Access = ({ req }) => canPublish(req.user);
export const publishedRead: Access = ({ req }) =>
  editorialUser(req.user) || { _status: { equals: "published" } };
