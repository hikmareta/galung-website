import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_software_releases_channel" AS ENUM('stable', 'preview');
  CREATE TYPE "public"."enum_software_releases_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__software_releases_v_version_channel" AS ENUM('stable', 'preview');
  CREATE TYPE "public"."enum__software_releases_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__software_releases_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_release_assets_os" AS ENUM('windows', 'macos');
  CREATE TYPE "public"."enum_release_assets_upload_status" AS ENUM('pending');
  CREATE TYPE "public"."enum_release_assets_visibility" AS ENUM('private');
  CREATE TYPE "public"."enum_contact_submissions_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_contact_submissions_status" AS ENUM('new', 'handled');
  CREATE TYPE "public"."enum_download_events_os" AS ENUM('windows', 'macos');
  CREATE TABLE "software_releases" (
    "id" serial PRIMARY KEY NOT NULL,
    "product_id" integer,
    "version" varchar,
    "channel" "enum_software_releases_channel" DEFAULT 'stable',
    "published_at" timestamp(3) with time zone,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "_status" "enum_software_releases_status" DEFAULT 'draft'
  );

  CREATE TABLE "software_releases_locales" (
    "changelog" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_software_releases_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_product_id" integer,
    "version_version" varchar,
    "version_channel" "enum__software_releases_v_version_channel" DEFAULT 'stable',
    "version_published_at" timestamp(3) with time zone,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "enum__software_releases_v_version_status" DEFAULT 'draft',
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "snapshot" boolean,
    "published_locale" "enum__software_releases_v_published_locale",
    "latest" boolean
  );

  CREATE TABLE "_software_releases_v_locales" (
    "version_changelog" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "release_assets" (
    "id" serial PRIMARY KEY NOT NULL,
    "release_id" integer NOT NULL,
    "os" "enum_release_assets_os" NOT NULL,
    "architecture" varchar,
    "storage_key" varchar,
    "filename" varchar,
    "size_bytes" numeric,
    "sha256" varchar,
    "upload_status" "enum_release_assets_upload_status" DEFAULT 'pending' NOT NULL,
    "visibility" "enum_release_assets_visibility" DEFAULT 'private' NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "contact_submissions" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "email" varchar NOT NULL,
    "message" varchar NOT NULL,
    "locale" "enum_contact_submissions_locale" NOT NULL,
    "status" "enum_contact_submissions_status" DEFAULT 'new' NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "download_events" (
    "id" serial PRIMARY KEY NOT NULL,
    "release_id" integer NOT NULL,
    "asset_id" integer NOT NULL,
    "os" "enum_download_events_os" NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "software_releases_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "release_assets_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "contact_submissions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "download_events_id" integer;
  ALTER TABLE "software_releases" ADD CONSTRAINT "software_releases_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "software_releases_locales" ADD CONSTRAINT "software_releases_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."software_releases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_software_releases_v" ADD CONSTRAINT "_software_releases_v_parent_id_software_releases_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."software_releases"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_software_releases_v" ADD CONSTRAINT "_software_releases_v_version_product_id_products_id_fk" FOREIGN KEY ("version_product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_software_releases_v_locales" ADD CONSTRAINT "_software_releases_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_software_releases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "release_assets" ADD CONSTRAINT "release_assets_release_id_software_releases_id_fk" FOREIGN KEY ("release_id") REFERENCES "public"."software_releases"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "download_events" ADD CONSTRAINT "download_events_release_id_software_releases_id_fk" FOREIGN KEY ("release_id") REFERENCES "public"."software_releases"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "download_events" ADD CONSTRAINT "download_events_asset_id_release_assets_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."release_assets"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "software_releases_product_idx" ON "software_releases" USING btree ("product_id");
  CREATE UNIQUE INDEX "software_releases_version_idx" ON "software_releases" USING btree ("version");
  CREATE INDEX "software_releases_updated_at_idx" ON "software_releases" USING btree ("updated_at");
  CREATE INDEX "software_releases_created_at_idx" ON "software_releases" USING btree ("created_at");
  CREATE INDEX "software_releases__status_idx" ON "software_releases" USING btree ("_status");
  CREATE UNIQUE INDEX "software_releases_locales_locale_parent_id_unique" ON "software_releases_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "software_releases_locales_parent_id_idx" ON "software_releases_locales" USING btree ("_parent_id");
  CREATE INDEX "_software_releases_v_parent_idx" ON "_software_releases_v" USING btree ("parent_id");
  CREATE INDEX "_software_releases_v_version_version_product_idx" ON "_software_releases_v" USING btree ("version_product_id");
  CREATE INDEX "_software_releases_v_version_version_version_idx" ON "_software_releases_v" USING btree ("version_version");
  CREATE INDEX "_software_releases_v_version_version_updated_at_idx" ON "_software_releases_v" USING btree ("version_updated_at");
  CREATE INDEX "_software_releases_v_version_version_created_at_idx" ON "_software_releases_v" USING btree ("version_created_at");
  CREATE INDEX "_software_releases_v_version_version__status_idx" ON "_software_releases_v" USING btree ("version__status");
  CREATE INDEX "_software_releases_v_created_at_idx" ON "_software_releases_v" USING btree ("created_at");
  CREATE INDEX "_software_releases_v_updated_at_idx" ON "_software_releases_v" USING btree ("updated_at");
  CREATE INDEX "_software_releases_v_snapshot_idx" ON "_software_releases_v" USING btree ("snapshot");
  CREATE INDEX "_software_releases_v_published_locale_idx" ON "_software_releases_v" USING btree ("published_locale");
  CREATE INDEX "_software_releases_v_latest_idx" ON "_software_releases_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_software_releases_v_locales_locale_parent_id_unique" ON "_software_releases_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_software_releases_v_locales_parent_id_idx" ON "_software_releases_v_locales" USING btree ("_parent_id");
  CREATE INDEX "release_assets_release_idx" ON "release_assets" USING btree ("release_id");
  CREATE INDEX "release_assets_updated_at_idx" ON "release_assets" USING btree ("updated_at");
  CREATE INDEX "release_assets_created_at_idx" ON "release_assets" USING btree ("created_at");
  CREATE INDEX "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  CREATE INDEX "download_events_release_idx" ON "download_events" USING btree ("release_id");
  CREATE INDEX "download_events_asset_idx" ON "download_events" USING btree ("asset_id");
  CREATE INDEX "download_events_updated_at_idx" ON "download_events" USING btree ("updated_at");
  CREATE INDEX "download_events_created_at_idx" ON "download_events" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_software_releases_fk" FOREIGN KEY ("software_releases_id") REFERENCES "public"."software_releases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_release_assets_fk" FOREIGN KEY ("release_assets_id") REFERENCES "public"."release_assets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_download_events_fk" FOREIGN KEY ("download_events_id") REFERENCES "public"."download_events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_software_releases_id_idx" ON "payload_locked_documents_rels" USING btree ("software_releases_id");
  CREATE INDEX "payload_locked_documents_rels_release_assets_id_idx" ON "payload_locked_documents_rels" USING btree ("release_assets_id");
  CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_download_events_id_idx" ON "payload_locked_documents_rels" USING btree ("download_events_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "software_releases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "software_releases_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_software_releases_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_software_releases_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "release_assets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_submissions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "download_events" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "software_releases" CASCADE;
  DROP TABLE "software_releases_locales" CASCADE;
  DROP TABLE "_software_releases_v" CASCADE;
  DROP TABLE "_software_releases_v_locales" CASCADE;
  DROP TABLE "release_assets" CASCADE;
  DROP TABLE "contact_submissions" CASCADE;
  DROP TABLE "download_events" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_software_releases_fk";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_release_assets_fk";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_contact_submissions_fk";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_download_events_fk";

  DROP INDEX "payload_locked_documents_rels_software_releases_id_idx";
  DROP INDEX "payload_locked_documents_rels_release_assets_id_idx";
  DROP INDEX "payload_locked_documents_rels_contact_submissions_id_idx";
  DROP INDEX "payload_locked_documents_rels_download_events_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "software_releases_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "release_assets_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "contact_submissions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "download_events_id";
  DROP TYPE "public"."enum_software_releases_channel";
  DROP TYPE "public"."enum_software_releases_status";
  DROP TYPE "public"."enum__software_releases_v_version_channel";
  DROP TYPE "public"."enum__software_releases_v_version_status";
  DROP TYPE "public"."enum__software_releases_v_published_locale";
  DROP TYPE "public"."enum_release_assets_os";
  DROP TYPE "public"."enum_release_assets_upload_status";
  DROP TYPE "public"."enum_release_assets_visibility";
  DROP TYPE "public"."enum_contact_submissions_locale";
  DROP TYPE "public"."enum_contact_submissions_status";
  DROP TYPE "public"."enum_download_events_os";`)
}
