import { validateAuthoredContent } from "./metadata-validation.ts";
import { sql, type PostgresAdapter } from "@payloadcms/db-postgres";
import { APIError, type PayloadRequest } from "payload";
const mediaFields = new Set([
  "media",
  "heroMedia",
  "image",
  "logo",
  "poster",
  "openGraphImage",
]);
export function mediaReferences(
  value: unknown,
  prefix = "content",
): { id: number; path: string }[] {
  const result: { id: number; path: string }[] = [];
  function ids(v: unknown, p: string) {
    if (typeof v === "number") result.push({ id: v, path: p });
    else if (typeof v === "string" && /^\d+$/.test(v))
      result.push({ id: Number(v), path: p });
    else if (v && typeof v === "object") {
      const obj = v as Record<string, unknown>;
      if (typeof obj.id === "number" && !("en" in obj))
        result.push({ id: obj.id, path: p });
      else
        for (const [k, child] of Object.entries(obj)) ids(child, `${p}.${k}`);
    }
  }
  function walk(v: unknown, p: string) {
    if (!v || typeof v !== "object") return;
    for (const [key, child] of Object.entries(v)) {
      if (mediaFields.has(key)) ids(child, `${p}.${key}`);
      else walk(child, `${p}.${key}`);
    }
  }
  walk(value, prefix);
  return result;
}
export function childRequest(req: PayloadRequest): Partial<PayloadRequest> {
  // The loader closes over its owning request. Sharing it can mutate the write locale during relation population.
  return {
    ...req,
    payloadDataLoader: undefined,
    query: { ...req.query },
    context: { ...req.context, skipMediaUsage: true },
  };
}
export async function validateMediaReferences(
  value: unknown,
  locale: "id" | "en",
  req: PayloadRequest,
) {
  const contentValidation = validateAuthoredContent(value);
  if (contentValidation !== true)
    throw new APIError(`${locale}: ${contentValidation}`, 400);
  validateLocalizedStructure(value, locale);
  for (const reference of mediaReferences(value)) {
    let media;
    try {
      media = await req.payload.findByID({
        collection: "media",
        id: reference.id,
        locale,
        fallbackLocale: false,
        depth: 0,
        overrideAccess: false,
        user: req.user,
        req: childRequest(req),
      });
    } catch {
      throw new APIError(
        `${locale}: unavailable image at ${reference.path}`,
        400,
      );
    }
    if (!media.approved || !media.url || !media.alt?.trim())
      throw new APIError(
        `${locale}: approve image and complete its localized alt text at ${reference.path}`,
        400,
      );
  }
}
// Query actual media foreign keys through the existing Payload PostgreSQL adapter.
// Full version hydration joins every block table and is unsuitable for a media-library read.
const referenceCatalog = new WeakMap<
  object,
  Promise<{ table_name: string; column_name: string }[]>
>();
const resources = {
  pages: "Pages",
  posts: "News",
  projects: "Portfolio",
  products: "Product",
  site_settings: "Site settings",
  company_profile: "Company identity",
  header_navigation: "Header navigation",
  footer_navigation: "Footer navigation",
  contact_settings: "Contact settings",
};
function resourceLabel(table: string) {
  for (const [key, label] of Object.entries(resources)) {
    if (table === key || table.startsWith(`${key}_`))
      return `${label} (current content)`;
    if (table === `_${key}_v` || table.startsWith(`_${key}_v_`))
      return `${label} (retained versions)`;
  }
  return undefined;
}
export async function mediaUsage(
  id: number,
  req: PayloadRequest,
): Promise<string[]> {
  const adapter = req.payload.db as unknown as Pick<
    PostgresAdapter,
    "drizzle" | "sessions" | "schemaName"
  >;
  const schema = adapter.schemaName || "public";
  const transactionId = req.transactionID
    ? String(await req.transactionID)
    : undefined;
  const db = transactionId
    ? (adapter.sessions[transactionId]?.db as
        PostgresAdapter["drizzle"] | undefined) || adapter.drizzle
    : adapter.drizzle;
  let catalog = referenceCatalog.get(adapter);
  if (!catalog) {
    catalog = db
      .execute(
        sql`SELECT source.relname AS table_name, attribute.attname AS column_name
      FROM pg_catalog.pg_constraint constraint_row
      JOIN pg_catalog.pg_class source ON source.oid=constraint_row.conrelid
      JOIN pg_catalog.pg_namespace source_schema ON source_schema.oid=source.relnamespace
      JOIN pg_catalog.pg_class target ON target.oid=constraint_row.confrelid
      JOIN pg_catalog.pg_namespace target_schema ON target_schema.oid=target.relnamespace
      JOIN pg_catalog.pg_attribute attribute ON attribute.attrelid=source.oid AND attribute.attnum=constraint_row.conkey[1]
      WHERE constraint_row.contype='f' AND source_schema.nspname=${schema}
        AND target_schema.nspname=${schema} AND target.relname='media' AND cardinality(constraint_row.conkey)=1`,
      )
      .then(
        (result) =>
          result.rows as { table_name: string; column_name: string }[],
      );
    referenceCatalog.set(adapter, catalog);
  }
  const references = (await catalog).filter((ref) =>
    resourceLabel(ref.table_name),
  );
  if (!references.length) return [];
  const query = sql.join(
    references.map(
      (ref) =>
        sql`SELECT ${ref.table_name} AS resource, count(*)::int AS count FROM ${sql.identifier(schema)}.${sql.identifier(ref.table_name)} WHERE ${sql.identifier(ref.column_name)}=${id} HAVING count(*) > 0`,
    ),
    sql` UNION ALL `,
  );
  const rows = (await db.execute(query)).rows as {
    resource: string;
    count: number;
  }[];
  const counts = new Map<string, number>();
  for (const row of rows) {
    const label = resourceLabel(row.resource)!;
    counts.set(label, (counts.get(label) || 0) + Number(row.count));
  }
  return [...counts].map(([label, count]) => `${label}: ${count} reference(s)`);
}
function validateLocalizedStructure(
  value: unknown,
  locale: string,
  path = "content",
) {
  if (!value || typeof value !== "object") return;
  const object = value as Record<string, unknown>;
  if (object.link && !String(object.linkLabel || object.headline || "").trim())
    throw new APIError(`${locale}: add a visible link label at ${path}`, 400);
  if (object.secondaryLink && !String(object.secondaryLinkLabel || "").trim())
    throw new APIError(`${locale}: add a secondary link label at ${path}`, 400);
  const required: Record<string, string[]> = {
    items: ["title"],
    features: ["title"],
    questions: ["question", "answer"],
    statistics: ["label", "value"],
    gallery: ["image"],
    links: ["label", "href"],
    socialLinks: ["label", "url"],
  };
  for (const [key, child] of Object.entries(object)) {
    if (Array.isArray(child) && required[key])
      for (const [index, row] of child.entries())
        for (const field of required[key]) {
          if (
            !row ||
            typeof row !== "object" ||
            !(field in row) ||
            row[field] == null ||
            (typeof row[field] === "string" && !row[field].trim())
          )
            throw new APIError(
              `${locale}: complete ${path}.${key}.${index}.${field}`,
              400,
            );
        }
    validateLocalizedStructure(child, locale, `${path}.${key}`);
  }
}
