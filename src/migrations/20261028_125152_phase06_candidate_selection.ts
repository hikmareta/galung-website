import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "software_releases_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"release_assets_id" integer
  );
  
  CREATE TABLE "_software_releases_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"release_assets_id" integer
  );
  
  ALTER TABLE "software_releases_rels" ADD CONSTRAINT "software_releases_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."software_releases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "software_releases_rels" ADD CONSTRAINT "software_releases_rels_release_assets_fk" FOREIGN KEY ("release_assets_id") REFERENCES "public"."release_assets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_software_releases_v_rels" ADD CONSTRAINT "_software_releases_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_software_releases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_software_releases_v_rels" ADD CONSTRAINT "_software_releases_v_rels_release_assets_fk" FOREIGN KEY ("release_assets_id") REFERENCES "public"."release_assets"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "software_releases_rels_order_idx" ON "software_releases_rels" USING btree ("order");
  CREATE INDEX "software_releases_rels_parent_idx" ON "software_releases_rels" USING btree ("parent_id");
  CREATE INDEX "software_releases_rels_path_idx" ON "software_releases_rels" USING btree ("path");
  CREATE INDEX "software_releases_rels_release_assets_id_idx" ON "software_releases_rels" USING btree ("release_assets_id");
  CREATE INDEX "_software_releases_v_rels_order_idx" ON "_software_releases_v_rels" USING btree ("order");
  CREATE INDEX "_software_releases_v_rels_parent_idx" ON "_software_releases_v_rels" USING btree ("parent_id");
  CREATE INDEX "_software_releases_v_rels_path_idx" ON "_software_releases_v_rels" USING btree ("path");
  CREATE INDEX "_software_releases_v_rels_release_assets_id_idx" ON "_software_releases_v_rels" USING btree ("release_assets_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "software_releases_rels" CASCADE;
  DROP TABLE "_software_releases_v_rels" CASCADE;`)
}
