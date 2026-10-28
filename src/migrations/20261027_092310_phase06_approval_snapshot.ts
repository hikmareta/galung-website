import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "software_releases" ADD COLUMN "approved_assets" jsonb;
  ALTER TABLE "_software_releases_v" ADD COLUMN "version_approved_assets" jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   UPDATE "software_releases" SET "_status" = 'draft', "lifecycle" = 'draft';
  UPDATE "_software_releases_v" SET "version__status" = 'draft', "version_lifecycle" = 'draft';
  ALTER TABLE "software_releases" DROP COLUMN "approved_assets";
  ALTER TABLE "_software_releases_v" DROP COLUMN "version_approved_assets";`)
}
