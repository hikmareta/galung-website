import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_contact_submissions_delivery_status" AS ENUM('pending', 'accepted', 'failed', 'unknown');
  ALTER TABLE "contact_submissions" ADD COLUMN "submission_key" varchar;
  ALTER TABLE "contact_submissions" ADD COLUMN "request_fingerprint" varchar;
  ALTER TABLE "contact_submissions" ADD COLUMN "privacy_revision" varchar;
  ALTER TABLE "contact_submissions" ADD COLUMN "delivery_status" "enum_contact_submissions_delivery_status" DEFAULT 'unknown' NOT NULL;
  ALTER TABLE "contact_submissions" ADD COLUMN "accepted_at" timestamp(3) with time zone;
  ALTER TABLE "contact_submissions" ADD COLUMN "audit_pending" boolean DEFAULT false;
  CREATE UNIQUE INDEX "contact_submissions_submission_key_idx" ON "contact_submissions" USING btree ("submission_key");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "contact_submissions_submission_key_idx";
  ALTER TABLE "contact_submissions" DROP COLUMN "submission_key";
  ALTER TABLE "contact_submissions" DROP COLUMN "request_fingerprint";
  ALTER TABLE "contact_submissions" DROP COLUMN "privacy_revision";
  ALTER TABLE "contact_submissions" DROP COLUMN "delivery_status";
  ALTER TABLE "contact_submissions" DROP COLUMN "accepted_at";
  ALTER TABLE "contact_submissions" DROP COLUMN "audit_pending";
  DROP TYPE "public"."enum_contact_submissions_delivery_status";`)
}
