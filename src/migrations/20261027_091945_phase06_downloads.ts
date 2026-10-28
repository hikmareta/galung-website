import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_software_releases_reviewed_locales" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_software_releases_lifecycle" AS ENUM('draft', 'active', 'retired');
  CREATE TYPE "public"."enum__software_releases_v_version_reviewed_locales" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum__software_releases_v_version_lifecycle" AS ENUM('draft', 'active', 'retired');
  ALTER TYPE "public"."enum_release_assets_upload_status" ADD VALUE 'uploaded';
  ALTER TYPE "public"."enum_release_assets_upload_status" ADD VALUE 'verified';
  ALTER TYPE "public"."enum_release_assets_upload_status" ADD VALUE 'failed';
  ALTER TYPE "public"."enum_release_assets_upload_status" ADD VALUE 'aborted';
  CREATE TABLE "software_releases_reviewed_locales" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_software_releases_reviewed_locales",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_software_releases_v_version_reviewed_locales" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__software_releases_v_version_reviewed_locales",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "software_releases" ADD COLUMN "lifecycle" "enum_software_releases_lifecycle" DEFAULT 'draft';
  ALTER TABLE "_software_releases_v" ADD COLUMN "version_lifecycle" "enum__software_releases_v_version_lifecycle" DEFAULT 'draft';
  ALTER TABLE "release_assets" ADD COLUMN "upload_id" varchar;
  ALTER TABLE "release_assets" ADD COLUMN "upload_owner" numeric;
  ALTER TABLE "release_assets" ADD COLUMN "upload_expires_at" timestamp(3) with time zone;
  ALTER TABLE "release_assets" ADD COLUMN "object_version" varchar;
  ALTER TABLE "release_assets" ADD COLUMN "verified_at" timestamp(3) with time zone;
  ALTER TABLE "release_assets" ADD COLUMN "failure" varchar;
  ALTER TABLE "software_releases_reviewed_locales" ADD CONSTRAINT "software_releases_reviewed_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."software_releases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_software_releases_v_version_reviewed_locales" ADD CONSTRAINT "_software_releases_v_version_reviewed_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_software_releases_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "software_releases_reviewed_locales_order_idx" ON "software_releases_reviewed_locales" USING btree ("order");
  CREATE INDEX "software_releases_reviewed_locales_parent_idx" ON "software_releases_reviewed_locales" USING btree ("parent_id");
  CREATE INDEX "_software_releases_v_version_reviewed_locales_order_idx" ON "_software_releases_v_version_reviewed_locales" USING btree ("order");
  CREATE INDEX "_software_releases_v_version_reviewed_locales_parent_idx" ON "_software_releases_v_version_reviewed_locales" USING btree ("parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "software_releases_reviewed_locales" CASCADE;
  DROP TABLE "_software_releases_v_version_reviewed_locales" CASCADE;
  ALTER TABLE "release_assets" ALTER COLUMN "upload_status" SET DATA TYPE text;
  UPDATE "release_assets" SET "upload_status" = 'pending';
  ALTER TABLE "release_assets" ALTER COLUMN "upload_status" SET DEFAULT 'pending'::text;
  DROP TYPE "public"."enum_release_assets_upload_status";
  CREATE TYPE "public"."enum_release_assets_upload_status" AS ENUM('pending');
  ALTER TABLE "release_assets" ALTER COLUMN "upload_status" SET DEFAULT 'pending'::"public"."enum_release_assets_upload_status";
  ALTER TABLE "release_assets" ALTER COLUMN "upload_status" SET DATA TYPE "public"."enum_release_assets_upload_status" USING "upload_status"::"public"."enum_release_assets_upload_status";
  ALTER TABLE "software_releases" DROP COLUMN "lifecycle";
  ALTER TABLE "_software_releases_v" DROP COLUMN "version_lifecycle";
  ALTER TABLE "release_assets" DROP COLUMN "upload_id";
  ALTER TABLE "release_assets" DROP COLUMN "upload_owner";
  ALTER TABLE "release_assets" DROP COLUMN "upload_expires_at";
  ALTER TABLE "release_assets" DROP COLUMN "object_version";
  ALTER TABLE "release_assets" DROP COLUMN "verified_at";
  ALTER TABLE "release_assets" DROP COLUMN "failure";
  DROP TYPE "public"."enum_software_releases_reviewed_locales";
  DROP TYPE "public"."enum_software_releases_lifecycle";
  DROP TYPE "public"."enum__software_releases_v_version_reviewed_locales";
  DROP TYPE "public"."enum__software_releases_v_version_lifecycle";`)
}
