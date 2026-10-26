import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_reviewed_locales" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_image_text_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_media_showcase_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_stats_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_gallery_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_video_embed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_portfolio_feed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_news_feed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_faq_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_call_to_action_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_community_showcase_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_reviewed_locales" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_media_showcase_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_video_embed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_portfolio_feed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_news_feed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_call_to_action_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_community_showcase_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_posts_reviewed_locales" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_posts_blocks_hero_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_posts_blocks_rich_text_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_posts_blocks_image_text_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_posts_blocks_feature_grid_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_posts_blocks_media_showcase_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_posts_blocks_stats_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_posts_blocks_gallery_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_posts_blocks_video_embed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_posts_blocks_portfolio_feed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_posts_blocks_news_feed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_posts_blocks_faq_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_posts_blocks_call_to_action_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_posts_blocks_community_showcase_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_reviewed_locales" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__posts_v_blocks_rich_text_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__posts_v_blocks_image_text_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__posts_v_blocks_feature_grid_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__posts_v_blocks_media_showcase_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__posts_v_blocks_stats_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__posts_v_blocks_gallery_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__posts_v_blocks_video_embed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__posts_v_blocks_portfolio_feed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__posts_v_blocks_news_feed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__posts_v_blocks_faq_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__posts_v_blocks_call_to_action_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__posts_v_blocks_community_showcase_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_projects_reviewed_locales" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_projects_blocks_hero_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_projects_blocks_rich_text_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_projects_blocks_image_text_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_projects_blocks_feature_grid_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_projects_blocks_media_showcase_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_projects_blocks_stats_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_projects_blocks_gallery_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_projects_blocks_video_embed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_projects_blocks_portfolio_feed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_projects_blocks_news_feed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_projects_blocks_faq_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_projects_blocks_call_to_action_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_projects_blocks_community_showcase_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_reviewed_locales" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum__projects_v_blocks_hero_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__projects_v_blocks_rich_text_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__projects_v_blocks_image_text_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__projects_v_blocks_feature_grid_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__projects_v_blocks_media_showcase_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__projects_v_blocks_stats_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__projects_v_blocks_gallery_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__projects_v_blocks_video_embed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__projects_v_blocks_portfolio_feed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__projects_v_blocks_news_feed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__projects_v_blocks_faq_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__projects_v_blocks_call_to_action_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__projects_v_blocks_community_showcase_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_products_reviewed_locales" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_products_blocks_hero_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_products_blocks_rich_text_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_products_blocks_image_text_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_products_blocks_feature_grid_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_products_blocks_media_showcase_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_products_blocks_stats_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_products_blocks_gallery_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_products_blocks_video_embed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_products_blocks_portfolio_feed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_products_blocks_news_feed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_products_blocks_faq_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_products_blocks_call_to_action_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_products_blocks_community_showcase_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_version_reviewed_locales" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum__products_v_blocks_hero_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__products_v_blocks_rich_text_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__products_v_blocks_image_text_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__products_v_blocks_feature_grid_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__products_v_blocks_media_showcase_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__products_v_blocks_stats_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__products_v_blocks_gallery_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__products_v_blocks_video_embed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__products_v_blocks_portfolio_feed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__products_v_blocks_news_feed_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__products_v_blocks_faq_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__products_v_blocks_call_to_action_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__products_v_blocks_community_showcase_variant" AS ENUM('light', 'forest');
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_site_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_settings_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_company_profile_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__company_profile_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__company_profile_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_header_navigation_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__header_navigation_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__header_navigation_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_footer_navigation_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__footer_navigation_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__footer_navigation_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_contact_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_settings_v_published_locale" AS ENUM('id', 'en');
  ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
  ALTER TABLE "users" ALTER COLUMN "role" TYPE text USING "role"::text;
  DROP TYPE "public"."enum_users_role";
  CREATE TYPE "public"."enum_users_role" AS ENUM('editor', 'publisher', 'super-admin');
  ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."enum_users_role" USING "role"::"public"."enum_users_role";
  CREATE TABLE "pages_reviewed_locales" (
    "order" integer NOT NULL,
    "parent_id" integer NOT NULL,
    "value" "enum_pages_reviewed_locales",
    "id" serial PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_hero_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_hero_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_hero" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_pages_blocks_hero_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_hero_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_rich_text_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_rich_text_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_rich_text" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_pages_blocks_rich_text_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_rich_text_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_image_text_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_image_text_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_image_text" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_pages_blocks_image_text_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_image_text_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_feature_grid_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_feature_grid_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_feature_grid" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_pages_blocks_feature_grid_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_feature_grid_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_media_showcase_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_media_showcase_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_media_showcase" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_pages_blocks_media_showcase_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_media_showcase_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_stats_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_stats_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_stats" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_pages_blocks_stats_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_stats_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_gallery_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_gallery_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_pages_blocks_gallery_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_gallery_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_video_embed_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_video_embed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_video_embed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_pages_blocks_video_embed_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_video_embed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_portfolio_feed_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_portfolio_feed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_portfolio_feed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_pages_blocks_portfolio_feed_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_portfolio_feed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_news_feed_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_news_feed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_news_feed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_pages_blocks_news_feed_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_news_feed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_faq_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_faq_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_faq" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_pages_blocks_faq_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_faq_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_call_to_action_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_call_to_action_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_call_to_action" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_pages_blocks_call_to_action_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_call_to_action_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_community_showcase_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_community_showcase_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_community_showcase" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_pages_blocks_community_showcase_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "pages_blocks_community_showcase_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "_status" "enum_pages_status" DEFAULT 'draft'
  );

  CREATE TABLE "pages_locales" (
    "title" varchar,
    "slug" varchar,
    "excerpt" varchar,
    "hero_media_id" integer,
    "seo_title" varchar,
    "seo_description" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_version_reviewed_locales" (
    "order" integer NOT NULL,
    "parent_id" integer NOT NULL,
    "value" "enum__pages_v_version_reviewed_locales",
    "id" serial PRIMARY KEY NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_hero_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_hero_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_hero" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__pages_v_blocks_hero_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_hero_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_rich_text_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_rich_text_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_rich_text" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__pages_v_blocks_rich_text_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_rich_text_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_image_text_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_image_text_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_image_text" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__pages_v_blocks_image_text_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_image_text_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_feature_grid_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_feature_grid_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_feature_grid" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__pages_v_blocks_feature_grid_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_feature_grid_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_media_showcase_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_media_showcase_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_media_showcase" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__pages_v_blocks_media_showcase_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_media_showcase_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_stats_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_stats_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_stats" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__pages_v_blocks_stats_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_stats_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_gallery_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_gallery_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__pages_v_blocks_gallery_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_gallery_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_video_embed_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_video_embed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_video_embed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__pages_v_blocks_video_embed_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_video_embed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_portfolio_feed_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_portfolio_feed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_portfolio_feed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__pages_v_blocks_portfolio_feed_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_portfolio_feed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_news_feed_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_news_feed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_news_feed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__pages_v_blocks_news_feed_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_news_feed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_faq_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_faq_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_faq" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__pages_v_blocks_faq_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_faq_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_call_to_action_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_call_to_action_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_call_to_action" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__pages_v_blocks_call_to_action_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_call_to_action_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_community_showcase_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_community_showcase_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_community_showcase" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__pages_v_blocks_community_showcase_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_community_showcase_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_key" varchar,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "enum__pages_v_version_status" DEFAULT 'draft',
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "snapshot" boolean,
    "published_locale" "enum__pages_v_published_locale",
    "latest" boolean
  );

  CREATE TABLE "_pages_v_locales" (
    "version_title" varchar,
    "version_slug" varchar,
    "version_excerpt" varchar,
    "version_hero_media_id" integer,
    "version_seo_title" varchar,
    "version_seo_description" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "posts_reviewed_locales" (
    "order" integer NOT NULL,
    "parent_id" integer NOT NULL,
    "value" "enum_posts_reviewed_locales",
    "id" serial PRIMARY KEY NOT NULL
  );

  CREATE TABLE "posts_blocks_hero_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "posts_blocks_hero_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_hero" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_posts_blocks_hero_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "posts_blocks_hero_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_rich_text_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "posts_blocks_rich_text_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_rich_text" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_posts_blocks_rich_text_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "posts_blocks_rich_text_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_image_text_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "posts_blocks_image_text_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_image_text" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_posts_blocks_image_text_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "posts_blocks_image_text_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_feature_grid_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "posts_blocks_feature_grid_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_feature_grid" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_posts_blocks_feature_grid_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "posts_blocks_feature_grid_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_media_showcase_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "posts_blocks_media_showcase_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_media_showcase" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_posts_blocks_media_showcase_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "posts_blocks_media_showcase_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_stats_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "posts_blocks_stats_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_stats" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_posts_blocks_stats_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "posts_blocks_stats_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_gallery_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "posts_blocks_gallery_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_posts_blocks_gallery_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "posts_blocks_gallery_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_video_embed_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "posts_blocks_video_embed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_video_embed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_posts_blocks_video_embed_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "posts_blocks_video_embed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_portfolio_feed_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "posts_blocks_portfolio_feed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_portfolio_feed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_posts_blocks_portfolio_feed_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "posts_blocks_portfolio_feed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_news_feed_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "posts_blocks_news_feed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_news_feed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_posts_blocks_news_feed_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "posts_blocks_news_feed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_faq_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "posts_blocks_faq_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_faq" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_posts_blocks_faq_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "posts_blocks_faq_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_call_to_action_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "posts_blocks_call_to_action_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_call_to_action" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_posts_blocks_call_to_action_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "posts_blocks_call_to_action_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_community_showcase_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "posts_blocks_community_showcase_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_community_showcase" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_posts_blocks_community_showcase_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "posts_blocks_community_showcase_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "_status" "enum_posts_status" DEFAULT 'draft'
  );

  CREATE TABLE "posts_locales" (
    "title" varchar,
    "slug" varchar,
    "excerpt" varchar,
    "hero_media_id" integer,
    "seo_title" varchar,
    "seo_description" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "posts_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "post_categories_id" integer
  );

  CREATE TABLE "_posts_v_version_reviewed_locales" (
    "order" integer NOT NULL,
    "parent_id" integer NOT NULL,
    "value" "enum__posts_v_version_reviewed_locales",
    "id" serial PRIMARY KEY NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_hero_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_posts_v_blocks_hero_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_hero" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__posts_v_blocks_hero_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_posts_v_blocks_hero_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_rich_text_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_posts_v_blocks_rich_text_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_rich_text" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__posts_v_blocks_rich_text_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_posts_v_blocks_rich_text_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_image_text_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_posts_v_blocks_image_text_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_image_text" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__posts_v_blocks_image_text_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_posts_v_blocks_image_text_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_feature_grid_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_posts_v_blocks_feature_grid_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_feature_grid" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__posts_v_blocks_feature_grid_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_posts_v_blocks_feature_grid_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_media_showcase_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_posts_v_blocks_media_showcase_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_media_showcase" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__posts_v_blocks_media_showcase_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_posts_v_blocks_media_showcase_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_stats_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_posts_v_blocks_stats_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_stats" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__posts_v_blocks_stats_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_posts_v_blocks_stats_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_gallery_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_posts_v_blocks_gallery_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__posts_v_blocks_gallery_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_posts_v_blocks_gallery_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_video_embed_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_posts_v_blocks_video_embed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_video_embed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__posts_v_blocks_video_embed_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_posts_v_blocks_video_embed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_portfolio_feed_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_posts_v_blocks_portfolio_feed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_portfolio_feed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__posts_v_blocks_portfolio_feed_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_posts_v_blocks_portfolio_feed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_news_feed_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_posts_v_blocks_news_feed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_news_feed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__posts_v_blocks_news_feed_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_posts_v_blocks_news_feed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_faq_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_posts_v_blocks_faq_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_faq" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__posts_v_blocks_faq_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_posts_v_blocks_faq_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_call_to_action_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_posts_v_blocks_call_to_action_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_call_to_action" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__posts_v_blocks_call_to_action_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_posts_v_blocks_call_to_action_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_community_showcase_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_posts_v_blocks_community_showcase_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_community_showcase" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__posts_v_blocks_community_showcase_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_posts_v_blocks_community_showcase_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_key" varchar,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "enum__posts_v_version_status" DEFAULT 'draft',
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "snapshot" boolean,
    "published_locale" "enum__posts_v_published_locale",
    "latest" boolean
  );

  CREATE TABLE "_posts_v_locales" (
    "version_title" varchar,
    "version_slug" varchar,
    "version_excerpt" varchar,
    "version_hero_media_id" integer,
    "version_seo_title" varchar,
    "version_seo_description" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "post_categories_id" integer
  );

  CREATE TABLE "projects_reviewed_locales" (
    "order" integer NOT NULL,
    "parent_id" integer NOT NULL,
    "value" "enum_projects_reviewed_locales",
    "id" serial PRIMARY KEY NOT NULL
  );

  CREATE TABLE "projects_blocks_hero_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "projects_blocks_hero_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_hero" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_projects_blocks_hero_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "projects_blocks_hero_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_rich_text_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "projects_blocks_rich_text_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_rich_text" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_projects_blocks_rich_text_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "projects_blocks_rich_text_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_image_text_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "projects_blocks_image_text_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_image_text" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_projects_blocks_image_text_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "projects_blocks_image_text_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_feature_grid_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "projects_blocks_feature_grid_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_feature_grid" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_projects_blocks_feature_grid_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "projects_blocks_feature_grid_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_media_showcase_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "projects_blocks_media_showcase_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_media_showcase" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_projects_blocks_media_showcase_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "projects_blocks_media_showcase_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_stats_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "projects_blocks_stats_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_stats" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_projects_blocks_stats_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "projects_blocks_stats_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_gallery_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "projects_blocks_gallery_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_projects_blocks_gallery_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "projects_blocks_gallery_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_video_embed_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "projects_blocks_video_embed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_video_embed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_projects_blocks_video_embed_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "projects_blocks_video_embed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_portfolio_feed_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "projects_blocks_portfolio_feed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_portfolio_feed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_projects_blocks_portfolio_feed_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "projects_blocks_portfolio_feed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_news_feed_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "projects_blocks_news_feed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_news_feed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_projects_blocks_news_feed_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "projects_blocks_news_feed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_faq_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "projects_blocks_faq_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_faq" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_projects_blocks_faq_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "projects_blocks_faq_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_call_to_action_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "projects_blocks_call_to_action_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_call_to_action" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_projects_blocks_call_to_action_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "projects_blocks_call_to_action_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_community_showcase_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "projects_blocks_community_showcase_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_community_showcase" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_projects_blocks_community_showcase_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "projects_blocks_community_showcase_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "_status" "enum_projects_status" DEFAULT 'draft'
  );

  CREATE TABLE "projects_locales" (
    "title" varchar,
    "slug" varchar,
    "excerpt" varchar,
    "hero_media_id" integer,
    "seo_title" varchar,
    "seo_description" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "projects_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "portfolio_categories_id" integer
  );

  CREATE TABLE "_projects_v_version_reviewed_locales" (
    "order" integer NOT NULL,
    "parent_id" integer NOT NULL,
    "value" "enum__projects_v_version_reviewed_locales",
    "id" serial PRIMARY KEY NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_hero_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_projects_v_blocks_hero_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_hero" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__projects_v_blocks_hero_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_projects_v_blocks_hero_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_rich_text_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_projects_v_blocks_rich_text_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_rich_text" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__projects_v_blocks_rich_text_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_projects_v_blocks_rich_text_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_image_text_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_projects_v_blocks_image_text_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_image_text" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__projects_v_blocks_image_text_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_projects_v_blocks_image_text_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_feature_grid_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_projects_v_blocks_feature_grid_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_feature_grid" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__projects_v_blocks_feature_grid_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_projects_v_blocks_feature_grid_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_media_showcase_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_projects_v_blocks_media_showcase_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_media_showcase" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__projects_v_blocks_media_showcase_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_projects_v_blocks_media_showcase_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_stats_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_projects_v_blocks_stats_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_stats" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__projects_v_blocks_stats_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_projects_v_blocks_stats_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_gallery_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_projects_v_blocks_gallery_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__projects_v_blocks_gallery_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_projects_v_blocks_gallery_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_video_embed_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_projects_v_blocks_video_embed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_video_embed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__projects_v_blocks_video_embed_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_projects_v_blocks_video_embed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_portfolio_feed_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_projects_v_blocks_portfolio_feed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_portfolio_feed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__projects_v_blocks_portfolio_feed_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_projects_v_blocks_portfolio_feed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_news_feed_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_projects_v_blocks_news_feed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_news_feed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__projects_v_blocks_news_feed_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_projects_v_blocks_news_feed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_faq_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_projects_v_blocks_faq_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_faq" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__projects_v_blocks_faq_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_projects_v_blocks_faq_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_call_to_action_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_projects_v_blocks_call_to_action_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_call_to_action" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__projects_v_blocks_call_to_action_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_projects_v_blocks_call_to_action_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_community_showcase_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_projects_v_blocks_community_showcase_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_community_showcase" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__projects_v_blocks_community_showcase_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_projects_v_blocks_community_showcase_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_key" varchar,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "enum__projects_v_version_status" DEFAULT 'draft',
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "snapshot" boolean,
    "published_locale" "enum__projects_v_published_locale",
    "latest" boolean
  );

  CREATE TABLE "_projects_v_locales" (
    "version_title" varchar,
    "version_slug" varchar,
    "version_excerpt" varchar,
    "version_hero_media_id" integer,
    "version_seo_title" varchar,
    "version_seo_description" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "portfolio_categories_id" integer
  );

  CREATE TABLE "products_reviewed_locales" (
    "order" integer NOT NULL,
    "parent_id" integer NOT NULL,
    "value" "enum_products_reviewed_locales",
    "id" serial PRIMARY KEY NOT NULL
  );

  CREATE TABLE "products_blocks_hero_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "products_blocks_hero_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_hero" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_products_blocks_hero_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "products_blocks_hero_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_rich_text_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "products_blocks_rich_text_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_rich_text" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_products_blocks_rich_text_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "products_blocks_rich_text_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_image_text_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "products_blocks_image_text_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_image_text" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_products_blocks_image_text_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "products_blocks_image_text_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_feature_grid_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "products_blocks_feature_grid_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_feature_grid" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_products_blocks_feature_grid_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "products_blocks_feature_grid_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_media_showcase_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "products_blocks_media_showcase_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_media_showcase" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_products_blocks_media_showcase_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "products_blocks_media_showcase_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_stats_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "products_blocks_stats_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_stats" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_products_blocks_stats_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "products_blocks_stats_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_gallery_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "products_blocks_gallery_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_products_blocks_gallery_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "products_blocks_gallery_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_video_embed_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "products_blocks_video_embed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_video_embed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_products_blocks_video_embed_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "products_blocks_video_embed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_portfolio_feed_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "products_blocks_portfolio_feed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_portfolio_feed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_products_blocks_portfolio_feed_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "products_blocks_portfolio_feed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_news_feed_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "products_blocks_news_feed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_news_feed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_products_blocks_news_feed_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "products_blocks_news_feed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_faq_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "products_blocks_faq_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_faq" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_products_blocks_faq_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "products_blocks_faq_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_call_to_action_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "products_blocks_call_to_action_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_call_to_action" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_products_blocks_call_to_action_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "products_blocks_call_to_action_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_community_showcase_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "products_blocks_community_showcase_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_community_showcase" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum_products_blocks_community_showcase_variant" DEFAULT 'light',
    "block_name" varchar
  );

  CREATE TABLE "products_blocks_community_showcase_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "_status" "enum_products_status" DEFAULT 'draft'
  );

  CREATE TABLE "products_locales" (
    "title" varchar,
    "slug" varchar,
    "excerpt" varchar,
    "hero_media_id" integer,
    "seo_title" varchar,
    "seo_description" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_version_reviewed_locales" (
    "order" integer NOT NULL,
    "parent_id" integer NOT NULL,
    "value" "enum__products_v_version_reviewed_locales",
    "id" serial PRIMARY KEY NOT NULL
  );

  CREATE TABLE "_products_v_blocks_hero_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_products_v_blocks_hero_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_hero" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__products_v_blocks_hero_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_products_v_blocks_hero_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_rich_text_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_products_v_blocks_rich_text_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_rich_text" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__products_v_blocks_rich_text_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_products_v_blocks_rich_text_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_image_text_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_products_v_blocks_image_text_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_image_text" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__products_v_blocks_image_text_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_products_v_blocks_image_text_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_feature_grid_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_products_v_blocks_feature_grid_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_feature_grid" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__products_v_blocks_feature_grid_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_products_v_blocks_feature_grid_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_media_showcase_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_products_v_blocks_media_showcase_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_media_showcase" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__products_v_blocks_media_showcase_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_products_v_blocks_media_showcase_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_stats_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_products_v_blocks_stats_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_stats" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__products_v_blocks_stats_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_products_v_blocks_stats_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_gallery_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_products_v_blocks_gallery_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__products_v_blocks_gallery_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_products_v_blocks_gallery_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_video_embed_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_products_v_blocks_video_embed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_video_embed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__products_v_blocks_video_embed_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_products_v_blocks_video_embed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_portfolio_feed_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_products_v_blocks_portfolio_feed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_portfolio_feed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__products_v_blocks_portfolio_feed_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_products_v_blocks_portfolio_feed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_news_feed_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_products_v_blocks_news_feed_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_news_feed" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__products_v_blocks_news_feed_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_products_v_blocks_news_feed_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_faq_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_products_v_blocks_faq_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_faq" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__products_v_blocks_faq_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_products_v_blocks_faq_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_call_to_action_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_products_v_blocks_call_to_action_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_call_to_action" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__products_v_blocks_call_to_action_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_products_v_blocks_call_to_action_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_community_showcase_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_products_v_blocks_community_showcase_items_locales" (
    "title" varchar,
    "body" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_community_showcase" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "enabled" boolean DEFAULT true,
    "variant" "enum__products_v_blocks_community_showcase_variant" DEFAULT 'light',
    "_uuid" varchar,
    "block_name" varchar
  );

  CREATE TABLE "_products_v_blocks_community_showcase_locales" (
    "headline" varchar,
    "body" varchar,
    "media_id" integer,
    "link" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_key" varchar,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "enum__products_v_version_status" DEFAULT 'draft',
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "snapshot" boolean,
    "published_locale" "enum__products_v_published_locale",
    "latest" boolean
  );

  CREATE TABLE "_products_v_locales" (
    "version_title" varchar,
    "version_slug" varchar,
    "version_excerpt" varchar,
    "version_hero_media_id" integer,
    "version_seo_title" varchar,
    "version_seo_description" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "post_categories" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "post_categories_locales" (
    "label" varchar NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "portfolio_categories" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "portfolio_categories_locales" (
    "label" varchar NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "media" (
    "id" serial PRIMARY KEY NOT NULL,
    "attribution" varchar NOT NULL,
    "approved" boolean DEFAULT false,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "url" varchar,
    "thumbnail_u_r_l" varchar,
    "filename" varchar,
    "mime_type" varchar,
    "filesize" numeric,
    "width" numeric,
    "height" numeric,
    "focal_x" numeric,
    "focal_y" numeric
  );

  CREATE TABLE "media_locales" (
    "alt" varchar NOT NULL,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "audit_events" (
    "id" serial PRIMARY KEY NOT NULL,
    "actor_id" integer,
    "action" varchar NOT NULL,
    "resource" varchar NOT NULL,
    "resource_id" varchar NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "site_settings" (
    "id" serial PRIMARY KEY NOT NULL,
    "email" varchar,
    "logo_id" integer,
    "public_u_r_l" varchar,
    "_status" "enum_site_settings_status" DEFAULT 'draft',
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  CREATE TABLE "site_settings_locales" (
    "display_name" varchar,
    "description" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_site_settings_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "version_email" varchar,
    "version_logo_id" integer,
    "version_public_u_r_l" varchar,
    "version__status" "enum__site_settings_v_version_status" DEFAULT 'draft',
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "snapshot" boolean,
    "published_locale" "enum__site_settings_v_published_locale",
    "latest" boolean
  );

  CREATE TABLE "_site_settings_v_locales" (
    "version_display_name" varchar,
    "version_description" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "company_profile" (
    "id" serial PRIMARY KEY NOT NULL,
    "legal_name" varchar,
    "address" varchar,
    "registration_identifiers" varchar,
    "email" varchar,
    "logo_id" integer,
    "public_u_r_l" varchar,
    "_status" "enum_company_profile_status" DEFAULT 'draft',
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  CREATE TABLE "company_profile_locales" (
    "display_name" varchar,
    "description" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_company_profile_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "version_legal_name" varchar,
    "version_address" varchar,
    "version_registration_identifiers" varchar,
    "version_email" varchar,
    "version_logo_id" integer,
    "version_public_u_r_l" varchar,
    "version__status" "enum__company_profile_v_version_status" DEFAULT 'draft',
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "snapshot" boolean,
    "published_locale" "enum__company_profile_v_published_locale",
    "latest" boolean
  );

  CREATE TABLE "_company_profile_v_locales" (
    "version_display_name" varchar,
    "version_description" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "header_navigation_links" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "href" varchar
  );

  CREATE TABLE "header_navigation_links_locales" (
    "label" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "header_navigation" (
    "id" serial PRIMARY KEY NOT NULL,
    "_status" "enum_header_navigation_status" DEFAULT 'draft',
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  CREATE TABLE "_header_navigation_v_version_links" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "href" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_header_navigation_v_version_links_locales" (
    "label" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_header_navigation_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "version__status" "enum__header_navigation_v_version_status" DEFAULT 'draft',
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "snapshot" boolean,
    "published_locale" "enum__header_navigation_v_published_locale",
    "latest" boolean
  );

  CREATE TABLE "footer_navigation_links" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "href" varchar
  );

  CREATE TABLE "footer_navigation_links_locales" (
    "label" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "footer_navigation" (
    "id" serial PRIMARY KEY NOT NULL,
    "_status" "enum_footer_navigation_status" DEFAULT 'draft',
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  CREATE TABLE "_footer_navigation_v_version_links" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "href" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_footer_navigation_v_version_links_locales" (
    "label" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_footer_navigation_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "version__status" "enum__footer_navigation_v_version_status" DEFAULT 'draft',
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "snapshot" boolean,
    "published_locale" "enum__footer_navigation_v_published_locale",
    "latest" boolean
  );

  CREATE TABLE "contact_settings" (
    "id" serial PRIMARY KEY NOT NULL,
    "email" varchar,
    "logo_id" integer,
    "public_u_r_l" varchar,
    "_status" "enum_contact_settings_status" DEFAULT 'draft',
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  CREATE TABLE "contact_settings_locales" (
    "display_name" varchar,
    "description" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_contact_settings_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "version_email" varchar,
    "version_logo_id" integer,
    "version_public_u_r_l" varchar,
    "version__status" "enum__contact_settings_v_version_status" DEFAULT 'draft',
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "snapshot" boolean,
    "published_locale" "enum__contact_settings_v_published_locale",
    "latest" boolean
  );

  CREATE TABLE "_contact_settings_v_locales" (
    "version_display_name" varchar,
    "version_description" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'editor';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "projects_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "post_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "portfolio_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "audit_events_id" integer;
  ALTER TABLE "pages_reviewed_locales" ADD CONSTRAINT "pages_reviewed_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_items" ADD CONSTRAINT "pages_blocks_hero_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_items_locales" ADD CONSTRAINT "pages_blocks_hero_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_items_locales" ADD CONSTRAINT "pages_blocks_hero_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_items" ADD CONSTRAINT "pages_blocks_rich_text_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_items_locales" ADD CONSTRAINT "pages_blocks_rich_text_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_items_locales" ADD CONSTRAINT "pages_blocks_rich_text_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_locales" ADD CONSTRAINT "pages_blocks_rich_text_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_locales" ADD CONSTRAINT "pages_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_items" ADD CONSTRAINT "pages_blocks_image_text_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_items_locales" ADD CONSTRAINT "pages_blocks_image_text_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_items_locales" ADD CONSTRAINT "pages_blocks_image_text_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_text_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_locales" ADD CONSTRAINT "pages_blocks_image_text_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_locales" ADD CONSTRAINT "pages_blocks_image_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_items" ADD CONSTRAINT "pages_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_items_locales" ADD CONSTRAINT "pages_blocks_feature_grid_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_items_locales" ADD CONSTRAINT "pages_blocks_feature_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid" ADD CONSTRAINT "pages_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_locales" ADD CONSTRAINT "pages_blocks_feature_grid_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_locales" ADD CONSTRAINT "pages_blocks_feature_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_showcase_items" ADD CONSTRAINT "pages_blocks_media_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_showcase_items_locales" ADD CONSTRAINT "pages_blocks_media_showcase_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_showcase_items_locales" ADD CONSTRAINT "pages_blocks_media_showcase_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_showcase_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_showcase" ADD CONSTRAINT "pages_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_showcase_locales" ADD CONSTRAINT "pages_blocks_media_showcase_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_showcase_locales" ADD CONSTRAINT "pages_blocks_media_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items_locales" ADD CONSTRAINT "pages_blocks_stats_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items_locales" ADD CONSTRAINT "pages_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_locales" ADD CONSTRAINT "pages_blocks_stats_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_locales" ADD CONSTRAINT "pages_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_items" ADD CONSTRAINT "pages_blocks_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_items_locales" ADD CONSTRAINT "pages_blocks_gallery_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_items_locales" ADD CONSTRAINT "pages_blocks_gallery_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_locales" ADD CONSTRAINT "pages_blocks_gallery_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_locales" ADD CONSTRAINT "pages_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_embed_items" ADD CONSTRAINT "pages_blocks_video_embed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_video_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_embed_items_locales" ADD CONSTRAINT "pages_blocks_video_embed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_embed_items_locales" ADD CONSTRAINT "pages_blocks_video_embed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_video_embed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_embed" ADD CONSTRAINT "pages_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_embed_locales" ADD CONSTRAINT "pages_blocks_video_embed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_embed_locales" ADD CONSTRAINT "pages_blocks_video_embed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_video_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_feed_items" ADD CONSTRAINT "pages_blocks_portfolio_feed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_portfolio_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_feed_items_locales" ADD CONSTRAINT "pages_blocks_portfolio_feed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_feed_items_locales" ADD CONSTRAINT "pages_blocks_portfolio_feed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_portfolio_feed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_feed" ADD CONSTRAINT "pages_blocks_portfolio_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_feed_locales" ADD CONSTRAINT "pages_blocks_portfolio_feed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_feed_locales" ADD CONSTRAINT "pages_blocks_portfolio_feed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_portfolio_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_feed_items" ADD CONSTRAINT "pages_blocks_news_feed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_news_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_feed_items_locales" ADD CONSTRAINT "pages_blocks_news_feed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_feed_items_locales" ADD CONSTRAINT "pages_blocks_news_feed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_news_feed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_feed" ADD CONSTRAINT "pages_blocks_news_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_feed_locales" ADD CONSTRAINT "pages_blocks_news_feed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_feed_locales" ADD CONSTRAINT "pages_blocks_news_feed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_news_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items_locales" ADD CONSTRAINT "pages_blocks_faq_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items_locales" ADD CONSTRAINT "pages_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_call_to_action_items" ADD CONSTRAINT "pages_blocks_call_to_action_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_call_to_action_items_locales" ADD CONSTRAINT "pages_blocks_call_to_action_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_call_to_action_items_locales" ADD CONSTRAINT "pages_blocks_call_to_action_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_call_to_action_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_call_to_action" ADD CONSTRAINT "pages_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_call_to_action_locales" ADD CONSTRAINT "pages_blocks_call_to_action_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_call_to_action_locales" ADD CONSTRAINT "pages_blocks_call_to_action_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_community_showcase_items" ADD CONSTRAINT "pages_blocks_community_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_community_showcase_items_locales" ADD CONSTRAINT "pages_blocks_community_showcase_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_community_showcase_items_locales" ADD CONSTRAINT "pages_blocks_community_showcase_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_community_showcase_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_community_showcase" ADD CONSTRAINT "pages_blocks_community_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_community_showcase_locales" ADD CONSTRAINT "pages_blocks_community_showcase_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_community_showcase_locales" ADD CONSTRAINT "pages_blocks_community_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_reviewed_locales" ADD CONSTRAINT "_pages_v_version_reviewed_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_items" ADD CONSTRAINT "_pages_v_blocks_hero_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_items_locales" ADD CONSTRAINT "_pages_v_blocks_hero_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_items_locales" ADD CONSTRAINT "_pages_v_blocks_hero_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD CONSTRAINT "_pages_v_blocks_hero_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD CONSTRAINT "_pages_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_items" ADD CONSTRAINT "_pages_v_blocks_rich_text_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_items_locales" ADD CONSTRAINT "_pages_v_blocks_rich_text_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_items_locales" ADD CONSTRAINT "_pages_v_blocks_rich_text_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_rich_text_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_locales" ADD CONSTRAINT "_pages_v_blocks_rich_text_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_locales" ADD CONSTRAINT "_pages_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text_items" ADD CONSTRAINT "_pages_v_blocks_image_text_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text_items_locales" ADD CONSTRAINT "_pages_v_blocks_image_text_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text_items_locales" ADD CONSTRAINT "_pages_v_blocks_image_text_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_text_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text" ADD CONSTRAINT "_pages_v_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text_locales" ADD CONSTRAINT "_pages_v_blocks_image_text_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text_locales" ADD CONSTRAINT "_pages_v_blocks_image_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_items" ADD CONSTRAINT "_pages_v_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_items_locales" ADD CONSTRAINT "_pages_v_blocks_feature_grid_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_items_locales" ADD CONSTRAINT "_pages_v_blocks_feature_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD CONSTRAINT "_pages_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_locales" ADD CONSTRAINT "_pages_v_blocks_feature_grid_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_locales" ADD CONSTRAINT "_pages_v_blocks_feature_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_showcase_items" ADD CONSTRAINT "_pages_v_blocks_media_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_showcase_items_locales" ADD CONSTRAINT "_pages_v_blocks_media_showcase_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_showcase_items_locales" ADD CONSTRAINT "_pages_v_blocks_media_showcase_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_showcase_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_showcase" ADD CONSTRAINT "_pages_v_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_showcase_locales" ADD CONSTRAINT "_pages_v_blocks_media_showcase_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_showcase_locales" ADD CONSTRAINT "_pages_v_blocks_media_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD CONSTRAINT "_pages_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items_locales" ADD CONSTRAINT "_pages_v_blocks_stats_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items_locales" ADD CONSTRAINT "_pages_v_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_locales" ADD CONSTRAINT "_pages_v_blocks_stats_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_locales" ADD CONSTRAINT "_pages_v_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_items" ADD CONSTRAINT "_pages_v_blocks_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_items_locales" ADD CONSTRAINT "_pages_v_blocks_gallery_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_items_locales" ADD CONSTRAINT "_pages_v_blocks_gallery_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_locales" ADD CONSTRAINT "_pages_v_blocks_gallery_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_locales" ADD CONSTRAINT "_pages_v_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_embed_items" ADD CONSTRAINT "_pages_v_blocks_video_embed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_video_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_embed_items_locales" ADD CONSTRAINT "_pages_v_blocks_video_embed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_embed_items_locales" ADD CONSTRAINT "_pages_v_blocks_video_embed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_video_embed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_embed" ADD CONSTRAINT "_pages_v_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_embed_locales" ADD CONSTRAINT "_pages_v_blocks_video_embed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_embed_locales" ADD CONSTRAINT "_pages_v_blocks_video_embed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_video_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_feed_items" ADD CONSTRAINT "_pages_v_blocks_portfolio_feed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_portfolio_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_feed_items_locales" ADD CONSTRAINT "_pages_v_blocks_portfolio_feed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_feed_items_locales" ADD CONSTRAINT "_pages_v_blocks_portfolio_feed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_portfolio_feed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_feed" ADD CONSTRAINT "_pages_v_blocks_portfolio_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_feed_locales" ADD CONSTRAINT "_pages_v_blocks_portfolio_feed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_feed_locales" ADD CONSTRAINT "_pages_v_blocks_portfolio_feed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_portfolio_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_news_feed_items" ADD CONSTRAINT "_pages_v_blocks_news_feed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_news_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_news_feed_items_locales" ADD CONSTRAINT "_pages_v_blocks_news_feed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_news_feed_items_locales" ADD CONSTRAINT "_pages_v_blocks_news_feed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_news_feed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_news_feed" ADD CONSTRAINT "_pages_v_blocks_news_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_news_feed_locales" ADD CONSTRAINT "_pages_v_blocks_news_feed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_news_feed_locales" ADD CONSTRAINT "_pages_v_blocks_news_feed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_news_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items_locales" ADD CONSTRAINT "_pages_v_blocks_faq_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items_locales" ADD CONSTRAINT "_pages_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_locales" ADD CONSTRAINT "_pages_v_blocks_faq_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_locales" ADD CONSTRAINT "_pages_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_call_to_action_items" ADD CONSTRAINT "_pages_v_blocks_call_to_action_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_call_to_action_items_locales" ADD CONSTRAINT "_pages_v_blocks_call_to_action_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_call_to_action_items_locales" ADD CONSTRAINT "_pages_v_blocks_call_to_action_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_call_to_action_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_call_to_action" ADD CONSTRAINT "_pages_v_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_call_to_action_locales" ADD CONSTRAINT "_pages_v_blocks_call_to_action_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_call_to_action_locales" ADD CONSTRAINT "_pages_v_blocks_call_to_action_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_community_showcase_items" ADD CONSTRAINT "_pages_v_blocks_community_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_community_showcase_items_locales" ADD CONSTRAINT "_pages_v_blocks_community_showcase_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_community_showcase_items_locales" ADD CONSTRAINT "_pages_v_blocks_community_showcase_items_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_community_showcase_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_community_showcase" ADD CONSTRAINT "_pages_v_blocks_community_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_community_showcase_locales" ADD CONSTRAINT "_pages_v_blocks_community_showcase_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_community_showcase_locales" ADD CONSTRAINT "_pages_v_blocks_community_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_reviewed_locales" ADD CONSTRAINT "posts_reviewed_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_items" ADD CONSTRAINT "posts_blocks_hero_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_items_locales" ADD CONSTRAINT "posts_blocks_hero_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_items_locales" ADD CONSTRAINT "posts_blocks_hero_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hero_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero" ADD CONSTRAINT "posts_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_locales" ADD CONSTRAINT "posts_blocks_hero_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_locales" ADD CONSTRAINT "posts_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_rich_text_items" ADD CONSTRAINT "posts_blocks_rich_text_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_rich_text_items_locales" ADD CONSTRAINT "posts_blocks_rich_text_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_rich_text_items_locales" ADD CONSTRAINT "posts_blocks_rich_text_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_rich_text_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_rich_text" ADD CONSTRAINT "posts_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_rich_text_locales" ADD CONSTRAINT "posts_blocks_rich_text_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_rich_text_locales" ADD CONSTRAINT "posts_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_image_text_items" ADD CONSTRAINT "posts_blocks_image_text_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_image_text_items_locales" ADD CONSTRAINT "posts_blocks_image_text_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_image_text_items_locales" ADD CONSTRAINT "posts_blocks_image_text_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_image_text_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_image_text" ADD CONSTRAINT "posts_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_image_text_locales" ADD CONSTRAINT "posts_blocks_image_text_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_image_text_locales" ADD CONSTRAINT "posts_blocks_image_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_feature_grid_items" ADD CONSTRAINT "posts_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_feature_grid_items_locales" ADD CONSTRAINT "posts_blocks_feature_grid_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_feature_grid_items_locales" ADD CONSTRAINT "posts_blocks_feature_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_feature_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_feature_grid" ADD CONSTRAINT "posts_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_feature_grid_locales" ADD CONSTRAINT "posts_blocks_feature_grid_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_feature_grid_locales" ADD CONSTRAINT "posts_blocks_feature_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_media_showcase_items" ADD CONSTRAINT "posts_blocks_media_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_media_showcase_items_locales" ADD CONSTRAINT "posts_blocks_media_showcase_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_media_showcase_items_locales" ADD CONSTRAINT "posts_blocks_media_showcase_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_media_showcase_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_media_showcase" ADD CONSTRAINT "posts_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_media_showcase_locales" ADD CONSTRAINT "posts_blocks_media_showcase_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_media_showcase_locales" ADD CONSTRAINT "posts_blocks_media_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_stats_items" ADD CONSTRAINT "posts_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_stats_items_locales" ADD CONSTRAINT "posts_blocks_stats_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_stats_items_locales" ADD CONSTRAINT "posts_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_stats" ADD CONSTRAINT "posts_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_stats_locales" ADD CONSTRAINT "posts_blocks_stats_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_stats_locales" ADD CONSTRAINT "posts_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery_items" ADD CONSTRAINT "posts_blocks_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery_items_locales" ADD CONSTRAINT "posts_blocks_gallery_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery_items_locales" ADD CONSTRAINT "posts_blocks_gallery_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_gallery_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery" ADD CONSTRAINT "posts_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery_locales" ADD CONSTRAINT "posts_blocks_gallery_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery_locales" ADD CONSTRAINT "posts_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_video_embed_items" ADD CONSTRAINT "posts_blocks_video_embed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_video_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_video_embed_items_locales" ADD CONSTRAINT "posts_blocks_video_embed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_video_embed_items_locales" ADD CONSTRAINT "posts_blocks_video_embed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_video_embed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_video_embed" ADD CONSTRAINT "posts_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_video_embed_locales" ADD CONSTRAINT "posts_blocks_video_embed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_video_embed_locales" ADD CONSTRAINT "posts_blocks_video_embed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_video_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_portfolio_feed_items" ADD CONSTRAINT "posts_blocks_portfolio_feed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_portfolio_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_portfolio_feed_items_locales" ADD CONSTRAINT "posts_blocks_portfolio_feed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_portfolio_feed_items_locales" ADD CONSTRAINT "posts_blocks_portfolio_feed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_portfolio_feed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_portfolio_feed" ADD CONSTRAINT "posts_blocks_portfolio_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_portfolio_feed_locales" ADD CONSTRAINT "posts_blocks_portfolio_feed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_portfolio_feed_locales" ADD CONSTRAINT "posts_blocks_portfolio_feed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_portfolio_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_news_feed_items" ADD CONSTRAINT "posts_blocks_news_feed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_news_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_news_feed_items_locales" ADD CONSTRAINT "posts_blocks_news_feed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_news_feed_items_locales" ADD CONSTRAINT "posts_blocks_news_feed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_news_feed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_news_feed" ADD CONSTRAINT "posts_blocks_news_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_news_feed_locales" ADD CONSTRAINT "posts_blocks_news_feed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_news_feed_locales" ADD CONSTRAINT "posts_blocks_news_feed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_news_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq_items" ADD CONSTRAINT "posts_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq_items_locales" ADD CONSTRAINT "posts_blocks_faq_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq_items_locales" ADD CONSTRAINT "posts_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq" ADD CONSTRAINT "posts_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq_locales" ADD CONSTRAINT "posts_blocks_faq_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq_locales" ADD CONSTRAINT "posts_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_call_to_action_items" ADD CONSTRAINT "posts_blocks_call_to_action_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_call_to_action_items_locales" ADD CONSTRAINT "posts_blocks_call_to_action_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_call_to_action_items_locales" ADD CONSTRAINT "posts_blocks_call_to_action_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_call_to_action_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_call_to_action" ADD CONSTRAINT "posts_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_call_to_action_locales" ADD CONSTRAINT "posts_blocks_call_to_action_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_call_to_action_locales" ADD CONSTRAINT "posts_blocks_call_to_action_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_community_showcase_items" ADD CONSTRAINT "posts_blocks_community_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_community_showcase_items_locales" ADD CONSTRAINT "posts_blocks_community_showcase_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_community_showcase_items_locales" ADD CONSTRAINT "posts_blocks_community_showcase_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_community_showcase_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_community_showcase" ADD CONSTRAINT "posts_blocks_community_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_community_showcase_locales" ADD CONSTRAINT "posts_blocks_community_showcase_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_community_showcase_locales" ADD CONSTRAINT "posts_blocks_community_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_post_categories_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_reviewed_locales" ADD CONSTRAINT "_posts_v_version_reviewed_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_items" ADD CONSTRAINT "_posts_v_blocks_hero_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_items_locales" ADD CONSTRAINT "_posts_v_blocks_hero_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_items_locales" ADD CONSTRAINT "_posts_v_blocks_hero_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hero_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero" ADD CONSTRAINT "_posts_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_locales" ADD CONSTRAINT "_posts_v_blocks_hero_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_locales" ADD CONSTRAINT "_posts_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_rich_text_items" ADD CONSTRAINT "_posts_v_blocks_rich_text_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_rich_text_items_locales" ADD CONSTRAINT "_posts_v_blocks_rich_text_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_rich_text_items_locales" ADD CONSTRAINT "_posts_v_blocks_rich_text_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_rich_text_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_rich_text" ADD CONSTRAINT "_posts_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_rich_text_locales" ADD CONSTRAINT "_posts_v_blocks_rich_text_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_rich_text_locales" ADD CONSTRAINT "_posts_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_image_text_items" ADD CONSTRAINT "_posts_v_blocks_image_text_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_image_text_items_locales" ADD CONSTRAINT "_posts_v_blocks_image_text_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_image_text_items_locales" ADD CONSTRAINT "_posts_v_blocks_image_text_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_image_text_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_image_text" ADD CONSTRAINT "_posts_v_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_image_text_locales" ADD CONSTRAINT "_posts_v_blocks_image_text_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_image_text_locales" ADD CONSTRAINT "_posts_v_blocks_image_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_feature_grid_items" ADD CONSTRAINT "_posts_v_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_feature_grid_items_locales" ADD CONSTRAINT "_posts_v_blocks_feature_grid_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_feature_grid_items_locales" ADD CONSTRAINT "_posts_v_blocks_feature_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_feature_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_feature_grid" ADD CONSTRAINT "_posts_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_feature_grid_locales" ADD CONSTRAINT "_posts_v_blocks_feature_grid_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_feature_grid_locales" ADD CONSTRAINT "_posts_v_blocks_feature_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media_showcase_items" ADD CONSTRAINT "_posts_v_blocks_media_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media_showcase_items_locales" ADD CONSTRAINT "_posts_v_blocks_media_showcase_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media_showcase_items_locales" ADD CONSTRAINT "_posts_v_blocks_media_showcase_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_media_showcase_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media_showcase" ADD CONSTRAINT "_posts_v_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media_showcase_locales" ADD CONSTRAINT "_posts_v_blocks_media_showcase_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media_showcase_locales" ADD CONSTRAINT "_posts_v_blocks_media_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_stats_items" ADD CONSTRAINT "_posts_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_stats_items_locales" ADD CONSTRAINT "_posts_v_blocks_stats_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_stats_items_locales" ADD CONSTRAINT "_posts_v_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_stats" ADD CONSTRAINT "_posts_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_stats_locales" ADD CONSTRAINT "_posts_v_blocks_stats_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_stats_locales" ADD CONSTRAINT "_posts_v_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery_items" ADD CONSTRAINT "_posts_v_blocks_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery_items_locales" ADD CONSTRAINT "_posts_v_blocks_gallery_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery_items_locales" ADD CONSTRAINT "_posts_v_blocks_gallery_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_gallery_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery" ADD CONSTRAINT "_posts_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery_locales" ADD CONSTRAINT "_posts_v_blocks_gallery_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery_locales" ADD CONSTRAINT "_posts_v_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_video_embed_items" ADD CONSTRAINT "_posts_v_blocks_video_embed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_video_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_video_embed_items_locales" ADD CONSTRAINT "_posts_v_blocks_video_embed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_video_embed_items_locales" ADD CONSTRAINT "_posts_v_blocks_video_embed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_video_embed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_video_embed" ADD CONSTRAINT "_posts_v_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_video_embed_locales" ADD CONSTRAINT "_posts_v_blocks_video_embed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_video_embed_locales" ADD CONSTRAINT "_posts_v_blocks_video_embed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_video_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_portfolio_feed_items" ADD CONSTRAINT "_posts_v_blocks_portfolio_feed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_portfolio_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_portfolio_feed_items_locales" ADD CONSTRAINT "_posts_v_blocks_portfolio_feed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_portfolio_feed_items_locales" ADD CONSTRAINT "_posts_v_blocks_portfolio_feed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_portfolio_feed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_portfolio_feed" ADD CONSTRAINT "_posts_v_blocks_portfolio_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_portfolio_feed_locales" ADD CONSTRAINT "_posts_v_blocks_portfolio_feed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_portfolio_feed_locales" ADD CONSTRAINT "_posts_v_blocks_portfolio_feed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_portfolio_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_news_feed_items" ADD CONSTRAINT "_posts_v_blocks_news_feed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_news_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_news_feed_items_locales" ADD CONSTRAINT "_posts_v_blocks_news_feed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_news_feed_items_locales" ADD CONSTRAINT "_posts_v_blocks_news_feed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_news_feed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_news_feed" ADD CONSTRAINT "_posts_v_blocks_news_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_news_feed_locales" ADD CONSTRAINT "_posts_v_blocks_news_feed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_news_feed_locales" ADD CONSTRAINT "_posts_v_blocks_news_feed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_news_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq_items" ADD CONSTRAINT "_posts_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq_items_locales" ADD CONSTRAINT "_posts_v_blocks_faq_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq_items_locales" ADD CONSTRAINT "_posts_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq" ADD CONSTRAINT "_posts_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq_locales" ADD CONSTRAINT "_posts_v_blocks_faq_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq_locales" ADD CONSTRAINT "_posts_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_call_to_action_items" ADD CONSTRAINT "_posts_v_blocks_call_to_action_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_call_to_action_items_locales" ADD CONSTRAINT "_posts_v_blocks_call_to_action_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_call_to_action_items_locales" ADD CONSTRAINT "_posts_v_blocks_call_to_action_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_call_to_action_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_call_to_action" ADD CONSTRAINT "_posts_v_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_call_to_action_locales" ADD CONSTRAINT "_posts_v_blocks_call_to_action_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_call_to_action_locales" ADD CONSTRAINT "_posts_v_blocks_call_to_action_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_community_showcase_items" ADD CONSTRAINT "_posts_v_blocks_community_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_community_showcase_items_locales" ADD CONSTRAINT "_posts_v_blocks_community_showcase_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_community_showcase_items_locales" ADD CONSTRAINT "_posts_v_blocks_community_showcase_items_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_community_showcase_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_community_showcase" ADD CONSTRAINT "_posts_v_blocks_community_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_community_showcase_locales" ADD CONSTRAINT "_posts_v_blocks_community_showcase_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_community_showcase_locales" ADD CONSTRAINT "_posts_v_blocks_community_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_post_categories_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_reviewed_locales" ADD CONSTRAINT "projects_reviewed_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_items" ADD CONSTRAINT "projects_blocks_hero_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_items_locales" ADD CONSTRAINT "projects_blocks_hero_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_items_locales" ADD CONSTRAINT "projects_blocks_hero_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_hero_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero" ADD CONSTRAINT "projects_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_locales" ADD CONSTRAINT "projects_blocks_hero_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_locales" ADD CONSTRAINT "projects_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_rich_text_items" ADD CONSTRAINT "projects_blocks_rich_text_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_rich_text_items_locales" ADD CONSTRAINT "projects_blocks_rich_text_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_rich_text_items_locales" ADD CONSTRAINT "projects_blocks_rich_text_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_rich_text_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_rich_text" ADD CONSTRAINT "projects_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_rich_text_locales" ADD CONSTRAINT "projects_blocks_rich_text_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_rich_text_locales" ADD CONSTRAINT "projects_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_image_text_items" ADD CONSTRAINT "projects_blocks_image_text_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_image_text_items_locales" ADD CONSTRAINT "projects_blocks_image_text_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_image_text_items_locales" ADD CONSTRAINT "projects_blocks_image_text_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_image_text_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_image_text" ADD CONSTRAINT "projects_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_image_text_locales" ADD CONSTRAINT "projects_blocks_image_text_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_image_text_locales" ADD CONSTRAINT "projects_blocks_image_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid_items" ADD CONSTRAINT "projects_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid_items_locales" ADD CONSTRAINT "projects_blocks_feature_grid_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid_items_locales" ADD CONSTRAINT "projects_blocks_feature_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_feature_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid" ADD CONSTRAINT "projects_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid_locales" ADD CONSTRAINT "projects_blocks_feature_grid_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid_locales" ADD CONSTRAINT "projects_blocks_feature_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_media_showcase_items" ADD CONSTRAINT "projects_blocks_media_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_media_showcase_items_locales" ADD CONSTRAINT "projects_blocks_media_showcase_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_media_showcase_items_locales" ADD CONSTRAINT "projects_blocks_media_showcase_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_media_showcase_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_media_showcase" ADD CONSTRAINT "projects_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_media_showcase_locales" ADD CONSTRAINT "projects_blocks_media_showcase_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_media_showcase_locales" ADD CONSTRAINT "projects_blocks_media_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats_items" ADD CONSTRAINT "projects_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats_items_locales" ADD CONSTRAINT "projects_blocks_stats_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats_items_locales" ADD CONSTRAINT "projects_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats" ADD CONSTRAINT "projects_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats_locales" ADD CONSTRAINT "projects_blocks_stats_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats_locales" ADD CONSTRAINT "projects_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_items" ADD CONSTRAINT "projects_blocks_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_items_locales" ADD CONSTRAINT "projects_blocks_gallery_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_items_locales" ADD CONSTRAINT "projects_blocks_gallery_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_gallery_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery" ADD CONSTRAINT "projects_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_locales" ADD CONSTRAINT "projects_blocks_gallery_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_locales" ADD CONSTRAINT "projects_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_video_embed_items" ADD CONSTRAINT "projects_blocks_video_embed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_video_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_video_embed_items_locales" ADD CONSTRAINT "projects_blocks_video_embed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_video_embed_items_locales" ADD CONSTRAINT "projects_blocks_video_embed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_video_embed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_video_embed" ADD CONSTRAINT "projects_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_video_embed_locales" ADD CONSTRAINT "projects_blocks_video_embed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_video_embed_locales" ADD CONSTRAINT "projects_blocks_video_embed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_video_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_portfolio_feed_items" ADD CONSTRAINT "projects_blocks_portfolio_feed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_portfolio_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_portfolio_feed_items_locales" ADD CONSTRAINT "projects_blocks_portfolio_feed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_portfolio_feed_items_locales" ADD CONSTRAINT "projects_blocks_portfolio_feed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_portfolio_feed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_portfolio_feed" ADD CONSTRAINT "projects_blocks_portfolio_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_portfolio_feed_locales" ADD CONSTRAINT "projects_blocks_portfolio_feed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_portfolio_feed_locales" ADD CONSTRAINT "projects_blocks_portfolio_feed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_portfolio_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_news_feed_items" ADD CONSTRAINT "projects_blocks_news_feed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_news_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_news_feed_items_locales" ADD CONSTRAINT "projects_blocks_news_feed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_news_feed_items_locales" ADD CONSTRAINT "projects_blocks_news_feed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_news_feed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_news_feed" ADD CONSTRAINT "projects_blocks_news_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_news_feed_locales" ADD CONSTRAINT "projects_blocks_news_feed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_news_feed_locales" ADD CONSTRAINT "projects_blocks_news_feed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_news_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq_items" ADD CONSTRAINT "projects_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq_items_locales" ADD CONSTRAINT "projects_blocks_faq_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq_items_locales" ADD CONSTRAINT "projects_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq" ADD CONSTRAINT "projects_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq_locales" ADD CONSTRAINT "projects_blocks_faq_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq_locales" ADD CONSTRAINT "projects_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_call_to_action_items" ADD CONSTRAINT "projects_blocks_call_to_action_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_call_to_action_items_locales" ADD CONSTRAINT "projects_blocks_call_to_action_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_call_to_action_items_locales" ADD CONSTRAINT "projects_blocks_call_to_action_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_call_to_action_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_call_to_action" ADD CONSTRAINT "projects_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_call_to_action_locales" ADD CONSTRAINT "projects_blocks_call_to_action_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_call_to_action_locales" ADD CONSTRAINT "projects_blocks_call_to_action_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_community_showcase_items" ADD CONSTRAINT "projects_blocks_community_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_community_showcase_items_locales" ADD CONSTRAINT "projects_blocks_community_showcase_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_community_showcase_items_locales" ADD CONSTRAINT "projects_blocks_community_showcase_items_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_community_showcase_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_community_showcase" ADD CONSTRAINT "projects_blocks_community_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_community_showcase_locales" ADD CONSTRAINT "projects_blocks_community_showcase_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_community_showcase_locales" ADD CONSTRAINT "projects_blocks_community_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_portfolio_categories_fk" FOREIGN KEY ("portfolio_categories_id") REFERENCES "public"."portfolio_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_reviewed_locales" ADD CONSTRAINT "_projects_v_version_reviewed_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero_items" ADD CONSTRAINT "_projects_v_blocks_hero_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero_items_locales" ADD CONSTRAINT "_projects_v_blocks_hero_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero_items_locales" ADD CONSTRAINT "_projects_v_blocks_hero_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_hero_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero" ADD CONSTRAINT "_projects_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero_locales" ADD CONSTRAINT "_projects_v_blocks_hero_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero_locales" ADD CONSTRAINT "_projects_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_rich_text_items" ADD CONSTRAINT "_projects_v_blocks_rich_text_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_rich_text_items_locales" ADD CONSTRAINT "_projects_v_blocks_rich_text_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_rich_text_items_locales" ADD CONSTRAINT "_projects_v_blocks_rich_text_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_rich_text_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_rich_text" ADD CONSTRAINT "_projects_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_rich_text_locales" ADD CONSTRAINT "_projects_v_blocks_rich_text_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_rich_text_locales" ADD CONSTRAINT "_projects_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_image_text_items" ADD CONSTRAINT "_projects_v_blocks_image_text_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_image_text_items_locales" ADD CONSTRAINT "_projects_v_blocks_image_text_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_image_text_items_locales" ADD CONSTRAINT "_projects_v_blocks_image_text_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_image_text_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_image_text" ADD CONSTRAINT "_projects_v_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_image_text_locales" ADD CONSTRAINT "_projects_v_blocks_image_text_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_image_text_locales" ADD CONSTRAINT "_projects_v_blocks_image_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_feature_grid_items" ADD CONSTRAINT "_projects_v_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_feature_grid_items_locales" ADD CONSTRAINT "_projects_v_blocks_feature_grid_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_feature_grid_items_locales" ADD CONSTRAINT "_projects_v_blocks_feature_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_feature_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_feature_grid" ADD CONSTRAINT "_projects_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_feature_grid_locales" ADD CONSTRAINT "_projects_v_blocks_feature_grid_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_feature_grid_locales" ADD CONSTRAINT "_projects_v_blocks_feature_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_media_showcase_items" ADD CONSTRAINT "_projects_v_blocks_media_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_media_showcase_items_locales" ADD CONSTRAINT "_projects_v_blocks_media_showcase_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_media_showcase_items_locales" ADD CONSTRAINT "_projects_v_blocks_media_showcase_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_media_showcase_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_media_showcase" ADD CONSTRAINT "_projects_v_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_media_showcase_locales" ADD CONSTRAINT "_projects_v_blocks_media_showcase_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_media_showcase_locales" ADD CONSTRAINT "_projects_v_blocks_media_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats_items" ADD CONSTRAINT "_projects_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats_items_locales" ADD CONSTRAINT "_projects_v_blocks_stats_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats_items_locales" ADD CONSTRAINT "_projects_v_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats" ADD CONSTRAINT "_projects_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats_locales" ADD CONSTRAINT "_projects_v_blocks_stats_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats_locales" ADD CONSTRAINT "_projects_v_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_items" ADD CONSTRAINT "_projects_v_blocks_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_items_locales" ADD CONSTRAINT "_projects_v_blocks_gallery_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_items_locales" ADD CONSTRAINT "_projects_v_blocks_gallery_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_gallery_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery" ADD CONSTRAINT "_projects_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_locales" ADD CONSTRAINT "_projects_v_blocks_gallery_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_locales" ADD CONSTRAINT "_projects_v_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video_embed_items" ADD CONSTRAINT "_projects_v_blocks_video_embed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_video_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video_embed_items_locales" ADD CONSTRAINT "_projects_v_blocks_video_embed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video_embed_items_locales" ADD CONSTRAINT "_projects_v_blocks_video_embed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_video_embed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video_embed" ADD CONSTRAINT "_projects_v_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video_embed_locales" ADD CONSTRAINT "_projects_v_blocks_video_embed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video_embed_locales" ADD CONSTRAINT "_projects_v_blocks_video_embed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_video_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_portfolio_feed_items" ADD CONSTRAINT "_projects_v_blocks_portfolio_feed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_portfolio_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_portfolio_feed_items_locales" ADD CONSTRAINT "_projects_v_blocks_portfolio_feed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_portfolio_feed_items_locales" ADD CONSTRAINT "_projects_v_blocks_portfolio_feed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_portfolio_feed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_portfolio_feed" ADD CONSTRAINT "_projects_v_blocks_portfolio_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_portfolio_feed_locales" ADD CONSTRAINT "_projects_v_blocks_portfolio_feed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_portfolio_feed_locales" ADD CONSTRAINT "_projects_v_blocks_portfolio_feed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_portfolio_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_news_feed_items" ADD CONSTRAINT "_projects_v_blocks_news_feed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_news_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_news_feed_items_locales" ADD CONSTRAINT "_projects_v_blocks_news_feed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_news_feed_items_locales" ADD CONSTRAINT "_projects_v_blocks_news_feed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_news_feed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_news_feed" ADD CONSTRAINT "_projects_v_blocks_news_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_news_feed_locales" ADD CONSTRAINT "_projects_v_blocks_news_feed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_news_feed_locales" ADD CONSTRAINT "_projects_v_blocks_news_feed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_news_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_faq_items" ADD CONSTRAINT "_projects_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_faq_items_locales" ADD CONSTRAINT "_projects_v_blocks_faq_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_faq_items_locales" ADD CONSTRAINT "_projects_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_faq" ADD CONSTRAINT "_projects_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_faq_locales" ADD CONSTRAINT "_projects_v_blocks_faq_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_faq_locales" ADD CONSTRAINT "_projects_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_call_to_action_items" ADD CONSTRAINT "_projects_v_blocks_call_to_action_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_call_to_action_items_locales" ADD CONSTRAINT "_projects_v_blocks_call_to_action_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_call_to_action_items_locales" ADD CONSTRAINT "_projects_v_blocks_call_to_action_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_call_to_action_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_call_to_action" ADD CONSTRAINT "_projects_v_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_call_to_action_locales" ADD CONSTRAINT "_projects_v_blocks_call_to_action_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_call_to_action_locales" ADD CONSTRAINT "_projects_v_blocks_call_to_action_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_community_showcase_items" ADD CONSTRAINT "_projects_v_blocks_community_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_community_showcase_items_locales" ADD CONSTRAINT "_projects_v_blocks_community_showcase_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_community_showcase_items_locales" ADD CONSTRAINT "_projects_v_blocks_community_showcase_items_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_community_showcase_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_community_showcase" ADD CONSTRAINT "_projects_v_blocks_community_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_community_showcase_locales" ADD CONSTRAINT "_projects_v_blocks_community_showcase_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_community_showcase_locales" ADD CONSTRAINT "_projects_v_blocks_community_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_portfolio_categories_fk" FOREIGN KEY ("portfolio_categories_id") REFERENCES "public"."portfolio_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_reviewed_locales" ADD CONSTRAINT "products_reviewed_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_hero_items" ADD CONSTRAINT "products_blocks_hero_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_hero_items_locales" ADD CONSTRAINT "products_blocks_hero_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_hero_items_locales" ADD CONSTRAINT "products_blocks_hero_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_hero_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_hero" ADD CONSTRAINT "products_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_hero_locales" ADD CONSTRAINT "products_blocks_hero_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_hero_locales" ADD CONSTRAINT "products_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_rich_text_items" ADD CONSTRAINT "products_blocks_rich_text_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_rich_text_items_locales" ADD CONSTRAINT "products_blocks_rich_text_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_rich_text_items_locales" ADD CONSTRAINT "products_blocks_rich_text_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_rich_text_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_rich_text" ADD CONSTRAINT "products_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_rich_text_locales" ADD CONSTRAINT "products_blocks_rich_text_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_rich_text_locales" ADD CONSTRAINT "products_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_image_text_items" ADD CONSTRAINT "products_blocks_image_text_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_image_text_items_locales" ADD CONSTRAINT "products_blocks_image_text_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_image_text_items_locales" ADD CONSTRAINT "products_blocks_image_text_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_image_text_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_image_text" ADD CONSTRAINT "products_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_image_text_locales" ADD CONSTRAINT "products_blocks_image_text_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_image_text_locales" ADD CONSTRAINT "products_blocks_image_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_feature_grid_items" ADD CONSTRAINT "products_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_feature_grid_items_locales" ADD CONSTRAINT "products_blocks_feature_grid_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_feature_grid_items_locales" ADD CONSTRAINT "products_blocks_feature_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_feature_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_feature_grid" ADD CONSTRAINT "products_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_feature_grid_locales" ADD CONSTRAINT "products_blocks_feature_grid_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_feature_grid_locales" ADD CONSTRAINT "products_blocks_feature_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_media_showcase_items" ADD CONSTRAINT "products_blocks_media_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_media_showcase_items_locales" ADD CONSTRAINT "products_blocks_media_showcase_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_media_showcase_items_locales" ADD CONSTRAINT "products_blocks_media_showcase_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_media_showcase_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_media_showcase" ADD CONSTRAINT "products_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_media_showcase_locales" ADD CONSTRAINT "products_blocks_media_showcase_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_media_showcase_locales" ADD CONSTRAINT "products_blocks_media_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_stats_items" ADD CONSTRAINT "products_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_stats_items_locales" ADD CONSTRAINT "products_blocks_stats_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_stats_items_locales" ADD CONSTRAINT "products_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_stats" ADD CONSTRAINT "products_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_stats_locales" ADD CONSTRAINT "products_blocks_stats_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_stats_locales" ADD CONSTRAINT "products_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_gallery_items" ADD CONSTRAINT "products_blocks_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_gallery_items_locales" ADD CONSTRAINT "products_blocks_gallery_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_gallery_items_locales" ADD CONSTRAINT "products_blocks_gallery_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_gallery_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_gallery" ADD CONSTRAINT "products_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_gallery_locales" ADD CONSTRAINT "products_blocks_gallery_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_gallery_locales" ADD CONSTRAINT "products_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_video_embed_items" ADD CONSTRAINT "products_blocks_video_embed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_video_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_video_embed_items_locales" ADD CONSTRAINT "products_blocks_video_embed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_video_embed_items_locales" ADD CONSTRAINT "products_blocks_video_embed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_video_embed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_video_embed" ADD CONSTRAINT "products_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_video_embed_locales" ADD CONSTRAINT "products_blocks_video_embed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_video_embed_locales" ADD CONSTRAINT "products_blocks_video_embed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_video_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_portfolio_feed_items" ADD CONSTRAINT "products_blocks_portfolio_feed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_portfolio_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_portfolio_feed_items_locales" ADD CONSTRAINT "products_blocks_portfolio_feed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_portfolio_feed_items_locales" ADD CONSTRAINT "products_blocks_portfolio_feed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_portfolio_feed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_portfolio_feed" ADD CONSTRAINT "products_blocks_portfolio_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_portfolio_feed_locales" ADD CONSTRAINT "products_blocks_portfolio_feed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_portfolio_feed_locales" ADD CONSTRAINT "products_blocks_portfolio_feed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_portfolio_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_news_feed_items" ADD CONSTRAINT "products_blocks_news_feed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_news_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_news_feed_items_locales" ADD CONSTRAINT "products_blocks_news_feed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_news_feed_items_locales" ADD CONSTRAINT "products_blocks_news_feed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_news_feed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_news_feed" ADD CONSTRAINT "products_blocks_news_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_news_feed_locales" ADD CONSTRAINT "products_blocks_news_feed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_news_feed_locales" ADD CONSTRAINT "products_blocks_news_feed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_news_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_faq_items" ADD CONSTRAINT "products_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_faq_items_locales" ADD CONSTRAINT "products_blocks_faq_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_faq_items_locales" ADD CONSTRAINT "products_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_faq" ADD CONSTRAINT "products_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_faq_locales" ADD CONSTRAINT "products_blocks_faq_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_faq_locales" ADD CONSTRAINT "products_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_call_to_action_items" ADD CONSTRAINT "products_blocks_call_to_action_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_call_to_action_items_locales" ADD CONSTRAINT "products_blocks_call_to_action_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_call_to_action_items_locales" ADD CONSTRAINT "products_blocks_call_to_action_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_call_to_action_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_call_to_action" ADD CONSTRAINT "products_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_call_to_action_locales" ADD CONSTRAINT "products_blocks_call_to_action_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_call_to_action_locales" ADD CONSTRAINT "products_blocks_call_to_action_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_community_showcase_items" ADD CONSTRAINT "products_blocks_community_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_community_showcase_items_locales" ADD CONSTRAINT "products_blocks_community_showcase_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_community_showcase_items_locales" ADD CONSTRAINT "products_blocks_community_showcase_items_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_community_showcase_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_community_showcase" ADD CONSTRAINT "products_blocks_community_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_community_showcase_locales" ADD CONSTRAINT "products_blocks_community_showcase_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_community_showcase_locales" ADD CONSTRAINT "products_blocks_community_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_reviewed_locales" ADD CONSTRAINT "_products_v_version_reviewed_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_hero_items" ADD CONSTRAINT "_products_v_blocks_hero_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_hero_items_locales" ADD CONSTRAINT "_products_v_blocks_hero_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_hero_items_locales" ADD CONSTRAINT "_products_v_blocks_hero_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_hero_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_hero" ADD CONSTRAINT "_products_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_hero_locales" ADD CONSTRAINT "_products_v_blocks_hero_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_hero_locales" ADD CONSTRAINT "_products_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_rich_text_items" ADD CONSTRAINT "_products_v_blocks_rich_text_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_rich_text_items_locales" ADD CONSTRAINT "_products_v_blocks_rich_text_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_rich_text_items_locales" ADD CONSTRAINT "_products_v_blocks_rich_text_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_rich_text_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_rich_text" ADD CONSTRAINT "_products_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_rich_text_locales" ADD CONSTRAINT "_products_v_blocks_rich_text_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_rich_text_locales" ADD CONSTRAINT "_products_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_image_text_items" ADD CONSTRAINT "_products_v_blocks_image_text_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_image_text_items_locales" ADD CONSTRAINT "_products_v_blocks_image_text_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_image_text_items_locales" ADD CONSTRAINT "_products_v_blocks_image_text_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_image_text_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_image_text" ADD CONSTRAINT "_products_v_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_image_text_locales" ADD CONSTRAINT "_products_v_blocks_image_text_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_image_text_locales" ADD CONSTRAINT "_products_v_blocks_image_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_feature_grid_items" ADD CONSTRAINT "_products_v_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_feature_grid_items_locales" ADD CONSTRAINT "_products_v_blocks_feature_grid_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_feature_grid_items_locales" ADD CONSTRAINT "_products_v_blocks_feature_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_feature_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_feature_grid" ADD CONSTRAINT "_products_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_feature_grid_locales" ADD CONSTRAINT "_products_v_blocks_feature_grid_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_feature_grid_locales" ADD CONSTRAINT "_products_v_blocks_feature_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_media_showcase_items" ADD CONSTRAINT "_products_v_blocks_media_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_media_showcase_items_locales" ADD CONSTRAINT "_products_v_blocks_media_showcase_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_media_showcase_items_locales" ADD CONSTRAINT "_products_v_blocks_media_showcase_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_media_showcase_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_media_showcase" ADD CONSTRAINT "_products_v_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_media_showcase_locales" ADD CONSTRAINT "_products_v_blocks_media_showcase_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_media_showcase_locales" ADD CONSTRAINT "_products_v_blocks_media_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_stats_items" ADD CONSTRAINT "_products_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_stats_items_locales" ADD CONSTRAINT "_products_v_blocks_stats_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_stats_items_locales" ADD CONSTRAINT "_products_v_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_stats" ADD CONSTRAINT "_products_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_stats_locales" ADD CONSTRAINT "_products_v_blocks_stats_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_stats_locales" ADD CONSTRAINT "_products_v_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_gallery_items" ADD CONSTRAINT "_products_v_blocks_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_gallery_items_locales" ADD CONSTRAINT "_products_v_blocks_gallery_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_gallery_items_locales" ADD CONSTRAINT "_products_v_blocks_gallery_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_gallery_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_gallery" ADD CONSTRAINT "_products_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_gallery_locales" ADD CONSTRAINT "_products_v_blocks_gallery_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_gallery_locales" ADD CONSTRAINT "_products_v_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_video_embed_items" ADD CONSTRAINT "_products_v_blocks_video_embed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_video_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_video_embed_items_locales" ADD CONSTRAINT "_products_v_blocks_video_embed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_video_embed_items_locales" ADD CONSTRAINT "_products_v_blocks_video_embed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_video_embed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_video_embed" ADD CONSTRAINT "_products_v_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_video_embed_locales" ADD CONSTRAINT "_products_v_blocks_video_embed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_video_embed_locales" ADD CONSTRAINT "_products_v_blocks_video_embed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_video_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_portfolio_feed_items" ADD CONSTRAINT "_products_v_blocks_portfolio_feed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_portfolio_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_portfolio_feed_items_locales" ADD CONSTRAINT "_products_v_blocks_portfolio_feed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_portfolio_feed_items_locales" ADD CONSTRAINT "_products_v_blocks_portfolio_feed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_portfolio_feed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_portfolio_feed" ADD CONSTRAINT "_products_v_blocks_portfolio_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_portfolio_feed_locales" ADD CONSTRAINT "_products_v_blocks_portfolio_feed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_portfolio_feed_locales" ADD CONSTRAINT "_products_v_blocks_portfolio_feed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_portfolio_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_news_feed_items" ADD CONSTRAINT "_products_v_blocks_news_feed_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_news_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_news_feed_items_locales" ADD CONSTRAINT "_products_v_blocks_news_feed_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_news_feed_items_locales" ADD CONSTRAINT "_products_v_blocks_news_feed_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_news_feed_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_news_feed" ADD CONSTRAINT "_products_v_blocks_news_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_news_feed_locales" ADD CONSTRAINT "_products_v_blocks_news_feed_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_news_feed_locales" ADD CONSTRAINT "_products_v_blocks_news_feed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_news_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_faq_items" ADD CONSTRAINT "_products_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_faq_items_locales" ADD CONSTRAINT "_products_v_blocks_faq_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_faq_items_locales" ADD CONSTRAINT "_products_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_faq" ADD CONSTRAINT "_products_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_faq_locales" ADD CONSTRAINT "_products_v_blocks_faq_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_faq_locales" ADD CONSTRAINT "_products_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_call_to_action_items" ADD CONSTRAINT "_products_v_blocks_call_to_action_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_call_to_action_items_locales" ADD CONSTRAINT "_products_v_blocks_call_to_action_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_call_to_action_items_locales" ADD CONSTRAINT "_products_v_blocks_call_to_action_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_call_to_action_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_call_to_action" ADD CONSTRAINT "_products_v_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_call_to_action_locales" ADD CONSTRAINT "_products_v_blocks_call_to_action_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_call_to_action_locales" ADD CONSTRAINT "_products_v_blocks_call_to_action_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_community_showcase_items" ADD CONSTRAINT "_products_v_blocks_community_showcase_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_community_showcase_items_locales" ADD CONSTRAINT "_products_v_blocks_community_showcase_items_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_community_showcase_items_locales" ADD CONSTRAINT "_products_v_blocks_community_showcase_items_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_community_showcase_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_community_showcase" ADD CONSTRAINT "_products_v_blocks_community_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_community_showcase_locales" ADD CONSTRAINT "_products_v_blocks_community_showcase_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_community_showcase_locales" ADD CONSTRAINT "_products_v_blocks_community_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_locales" ADD CONSTRAINT "_products_v_locales_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_locales" ADD CONSTRAINT "_products_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "post_categories_locales" ADD CONSTRAINT "post_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_categories_locales" ADD CONSTRAINT "portfolio_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "audit_events" ADD CONSTRAINT "audit_events_actor_id_users_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v_locales" ADD CONSTRAINT "_site_settings_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_profile" ADD CONSTRAINT "company_profile_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_profile_locales" ADD CONSTRAINT "company_profile_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_company_profile_v" ADD CONSTRAINT "_company_profile_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_company_profile_v_locales" ADD CONSTRAINT "_company_profile_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_company_profile_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation_links" ADD CONSTRAINT "header_navigation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation_links_locales" ADD CONSTRAINT "header_navigation_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_navigation_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_navigation_v_version_links" ADD CONSTRAINT "_header_navigation_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_navigation_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_navigation_v_version_links_locales" ADD CONSTRAINT "_header_navigation_v_version_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_navigation_v_version_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_navigation_links" ADD CONSTRAINT "footer_navigation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_navigation_links_locales" ADD CONSTRAINT "footer_navigation_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_navigation_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_navigation_v_version_links" ADD CONSTRAINT "_footer_navigation_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_navigation_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_navigation_v_version_links_locales" ADD CONSTRAINT "_footer_navigation_v_version_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_navigation_v_version_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_settings" ADD CONSTRAINT "contact_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_settings_locales" ADD CONSTRAINT "contact_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_settings_v" ADD CONSTRAINT "_contact_settings_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contact_settings_v_locales" ADD CONSTRAINT "_contact_settings_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_reviewed_locales_order_idx" ON "pages_reviewed_locales" USING btree ("order");
  CREATE INDEX "pages_reviewed_locales_parent_idx" ON "pages_reviewed_locales" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_hero_items_order_idx" ON "pages_blocks_hero_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_items_parent_id_idx" ON "pages_blocks_hero_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_items_media_idx" ON "pages_blocks_hero_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_hero_items_locales_locale_parent_id_unique" ON "pages_blocks_hero_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_items_locales_parent_id_idx" ON "pages_blocks_hero_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_media_idx" ON "pages_blocks_hero_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_locales_parent_id_idx" ON "pages_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_items_order_idx" ON "pages_blocks_rich_text_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_items_parent_id_idx" ON "pages_blocks_rich_text_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_items_media_idx" ON "pages_blocks_rich_text_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_rich_text_items_locales_locale_parent_id_unique" ON "pages_blocks_rich_text_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_rich_text_items_locales_parent_id_idx" ON "pages_blocks_rich_text_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_media_idx" ON "pages_blocks_rich_text_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_rich_text_locales_locale_parent_id_unique" ON "pages_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_rich_text_locales_parent_id_idx" ON "pages_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_items_order_idx" ON "pages_blocks_image_text_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_items_parent_id_idx" ON "pages_blocks_image_text_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_items_media_idx" ON "pages_blocks_image_text_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_image_text_items_locales_locale_parent_id_uniqu" ON "pages_blocks_image_text_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_image_text_items_locales_parent_id_idx" ON "pages_blocks_image_text_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_order_idx" ON "pages_blocks_image_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_parent_id_idx" ON "pages_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_path_idx" ON "pages_blocks_image_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_media_idx" ON "pages_blocks_image_text_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_image_text_locales_locale_parent_id_unique" ON "pages_blocks_image_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_image_text_locales_parent_id_idx" ON "pages_blocks_image_text_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_items_order_idx" ON "pages_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_items_parent_id_idx" ON "pages_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_items_media_idx" ON "pages_blocks_feature_grid_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_feature_grid_items_locales_locale_parent_id_uni" ON "pages_blocks_feature_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_items_locales_parent_id_idx" ON "pages_blocks_feature_grid_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_order_idx" ON "pages_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_parent_id_idx" ON "pages_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_path_idx" ON "pages_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_grid_media_idx" ON "pages_blocks_feature_grid_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_feature_grid_locales_locale_parent_id_unique" ON "pages_blocks_feature_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_locales_parent_id_idx" ON "pages_blocks_feature_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_showcase_items_order_idx" ON "pages_blocks_media_showcase_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_showcase_items_parent_id_idx" ON "pages_blocks_media_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_showcase_items_media_idx" ON "pages_blocks_media_showcase_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_media_showcase_items_locales_locale_parent_id_u" ON "pages_blocks_media_showcase_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_media_showcase_items_locales_parent_id_idx" ON "pages_blocks_media_showcase_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_showcase_order_idx" ON "pages_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_showcase_parent_id_idx" ON "pages_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_showcase_path_idx" ON "pages_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_showcase_media_idx" ON "pages_blocks_media_showcase_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_media_showcase_locales_locale_parent_id_unique" ON "pages_blocks_media_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_media_showcase_locales_parent_id_idx" ON "pages_blocks_media_showcase_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_items_media_idx" ON "pages_blocks_stats_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_stats_items_locales_locale_parent_id_unique" ON "pages_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stats_items_locales_parent_id_idx" ON "pages_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_media_idx" ON "pages_blocks_stats_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_stats_locales_locale_parent_id_unique" ON "pages_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stats_locales_parent_id_idx" ON "pages_blocks_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_items_order_idx" ON "pages_blocks_gallery_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_items_parent_id_idx" ON "pages_blocks_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_items_media_idx" ON "pages_blocks_gallery_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_gallery_items_locales_locale_parent_id_unique" ON "pages_blocks_gallery_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gallery_items_locales_parent_id_idx" ON "pages_blocks_gallery_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_gallery_media_idx" ON "pages_blocks_gallery_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_gallery_locales_locale_parent_id_unique" ON "pages_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gallery_locales_parent_id_idx" ON "pages_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_embed_items_order_idx" ON "pages_blocks_video_embed_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_embed_items_parent_id_idx" ON "pages_blocks_video_embed_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_embed_items_media_idx" ON "pages_blocks_video_embed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_video_embed_items_locales_locale_parent_id_uniq" ON "pages_blocks_video_embed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_video_embed_items_locales_parent_id_idx" ON "pages_blocks_video_embed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_embed_order_idx" ON "pages_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_embed_parent_id_idx" ON "pages_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_embed_path_idx" ON "pages_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_embed_media_idx" ON "pages_blocks_video_embed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_video_embed_locales_locale_parent_id_unique" ON "pages_blocks_video_embed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_video_embed_locales_parent_id_idx" ON "pages_blocks_video_embed_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_feed_items_order_idx" ON "pages_blocks_portfolio_feed_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_feed_items_parent_id_idx" ON "pages_blocks_portfolio_feed_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_feed_items_media_idx" ON "pages_blocks_portfolio_feed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_portfolio_feed_items_locales_locale_parent_id_u" ON "pages_blocks_portfolio_feed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_portfolio_feed_items_locales_parent_id_idx" ON "pages_blocks_portfolio_feed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_feed_order_idx" ON "pages_blocks_portfolio_feed" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_feed_parent_id_idx" ON "pages_blocks_portfolio_feed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_feed_path_idx" ON "pages_blocks_portfolio_feed" USING btree ("_path");
  CREATE INDEX "pages_blocks_portfolio_feed_media_idx" ON "pages_blocks_portfolio_feed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_portfolio_feed_locales_locale_parent_id_unique" ON "pages_blocks_portfolio_feed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_portfolio_feed_locales_parent_id_idx" ON "pages_blocks_portfolio_feed_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_news_feed_items_order_idx" ON "pages_blocks_news_feed_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_news_feed_items_parent_id_idx" ON "pages_blocks_news_feed_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_news_feed_items_media_idx" ON "pages_blocks_news_feed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_news_feed_items_locales_locale_parent_id_unique" ON "pages_blocks_news_feed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_news_feed_items_locales_parent_id_idx" ON "pages_blocks_news_feed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_news_feed_order_idx" ON "pages_blocks_news_feed" USING btree ("_order");
  CREATE INDEX "pages_blocks_news_feed_parent_id_idx" ON "pages_blocks_news_feed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_news_feed_path_idx" ON "pages_blocks_news_feed" USING btree ("_path");
  CREATE INDEX "pages_blocks_news_feed_media_idx" ON "pages_blocks_news_feed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_news_feed_locales_locale_parent_id_unique" ON "pages_blocks_news_feed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_news_feed_locales_parent_id_idx" ON "pages_blocks_news_feed_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_items_media_idx" ON "pages_blocks_faq_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_faq_items_locales_locale_parent_id_unique" ON "pages_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_items_locales_parent_id_idx" ON "pages_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_media_idx" ON "pages_blocks_faq_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_faq_locales_locale_parent_id_unique" ON "pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_locales_parent_id_idx" ON "pages_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_call_to_action_items_order_idx" ON "pages_blocks_call_to_action_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_call_to_action_items_parent_id_idx" ON "pages_blocks_call_to_action_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_call_to_action_items_media_idx" ON "pages_blocks_call_to_action_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_call_to_action_items_locales_locale_parent_id_u" ON "pages_blocks_call_to_action_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_call_to_action_items_locales_parent_id_idx" ON "pages_blocks_call_to_action_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_call_to_action_order_idx" ON "pages_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "pages_blocks_call_to_action_parent_id_idx" ON "pages_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_call_to_action_path_idx" ON "pages_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "pages_blocks_call_to_action_media_idx" ON "pages_blocks_call_to_action_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_call_to_action_locales_locale_parent_id_unique" ON "pages_blocks_call_to_action_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_call_to_action_locales_parent_id_idx" ON "pages_blocks_call_to_action_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_community_showcase_items_order_idx" ON "pages_blocks_community_showcase_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_community_showcase_items_parent_id_idx" ON "pages_blocks_community_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_community_showcase_items_media_idx" ON "pages_blocks_community_showcase_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_community_showcase_items_locales_locale_parent_" ON "pages_blocks_community_showcase_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_community_showcase_items_locales_parent_id_idx" ON "pages_blocks_community_showcase_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_community_showcase_order_idx" ON "pages_blocks_community_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_community_showcase_parent_id_idx" ON "pages_blocks_community_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_community_showcase_path_idx" ON "pages_blocks_community_showcase" USING btree ("_path");
  CREATE INDEX "pages_blocks_community_showcase_media_idx" ON "pages_blocks_community_showcase_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_community_showcase_locales_locale_parent_id_uni" ON "pages_blocks_community_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_community_showcase_locales_parent_id_idx" ON "pages_blocks_community_showcase_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_key_idx" ON "pages" USING btree ("key");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages_locales" USING btree ("slug","_locale");
  CREATE INDEX "pages_hero_media_idx" ON "pages_locales" USING btree ("hero_media_id","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_locales_parent_id_idx" ON "pages_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_reviewed_locales_order_idx" ON "_pages_v_version_reviewed_locales" USING btree ("order");
  CREATE INDEX "_pages_v_version_reviewed_locales_parent_idx" ON "_pages_v_version_reviewed_locales" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_hero_items_order_idx" ON "_pages_v_blocks_hero_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_items_parent_id_idx" ON "_pages_v_blocks_hero_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_items_media_idx" ON "_pages_v_blocks_hero_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_items_locales_parent_id_idx" ON "_pages_v_blocks_hero_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_media_idx" ON "_pages_v_blocks_hero_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_locales_parent_id_idx" ON "_pages_v_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_items_order_idx" ON "_pages_v_blocks_rich_text_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_items_parent_id_idx" ON "_pages_v_blocks_rich_text_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_items_media_idx" ON "_pages_v_blocks_rich_text_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_rich_text_items_locales_locale_parent_id_uni" ON "_pages_v_blocks_rich_text_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_items_locales_parent_id_idx" ON "_pages_v_blocks_rich_text_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_text_media_idx" ON "_pages_v_blocks_rich_text_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_pages_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_locales_parent_id_idx" ON "_pages_v_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_items_order_idx" ON "_pages_v_blocks_image_text_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_text_items_parent_id_idx" ON "_pages_v_blocks_image_text_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_items_media_idx" ON "_pages_v_blocks_image_text_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_image_text_items_locales_locale_parent_id_un" ON "_pages_v_blocks_image_text_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_items_locales_parent_id_idx" ON "_pages_v_blocks_image_text_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_order_idx" ON "_pages_v_blocks_image_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_text_parent_id_idx" ON "_pages_v_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_path_idx" ON "_pages_v_blocks_image_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_media_idx" ON "_pages_v_blocks_image_text_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_image_text_locales_locale_parent_id_unique" ON "_pages_v_blocks_image_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_locales_parent_id_idx" ON "_pages_v_blocks_image_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_items_order_idx" ON "_pages_v_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_items_parent_id_idx" ON "_pages_v_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_items_media_idx" ON "_pages_v_blocks_feature_grid_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_feature_grid_items_locales_locale_parent_id_" ON "_pages_v_blocks_feature_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_items_locales_parent_id_idx" ON "_pages_v_blocks_feature_grid_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_order_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_parent_id_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_path_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_grid_media_idx" ON "_pages_v_blocks_feature_grid_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_feature_grid_locales_locale_parent_id_unique" ON "_pages_v_blocks_feature_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_locales_parent_id_idx" ON "_pages_v_blocks_feature_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_showcase_items_order_idx" ON "_pages_v_blocks_media_showcase_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_showcase_items_parent_id_idx" ON "_pages_v_blocks_media_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_showcase_items_media_idx" ON "_pages_v_blocks_media_showcase_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_media_showcase_items_locales_locale_parent_i" ON "_pages_v_blocks_media_showcase_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_media_showcase_items_locales_parent_id_idx" ON "_pages_v_blocks_media_showcase_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_showcase_order_idx" ON "_pages_v_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_showcase_parent_id_idx" ON "_pages_v_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_showcase_path_idx" ON "_pages_v_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_showcase_media_idx" ON "_pages_v_blocks_media_showcase_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_media_showcase_locales_locale_parent_id_uniq" ON "_pages_v_blocks_media_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_media_showcase_locales_parent_id_idx" ON "_pages_v_blocks_media_showcase_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_items_order_idx" ON "_pages_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_items_parent_id_idx" ON "_pages_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_items_media_idx" ON "_pages_v_blocks_stats_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_stats_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_items_locales_parent_id_idx" ON "_pages_v_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_media_idx" ON "_pages_v_blocks_stats_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_stats_locales_locale_parent_id_unique" ON "_pages_v_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_locales_parent_id_idx" ON "_pages_v_blocks_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_items_order_idx" ON "_pages_v_blocks_gallery_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_items_parent_id_idx" ON "_pages_v_blocks_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_items_media_idx" ON "_pages_v_blocks_gallery_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_gallery_items_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_gallery_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_items_locales_parent_id_idx" ON "_pages_v_blocks_gallery_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_gallery_media_idx" ON "_pages_v_blocks_gallery_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_gallery_locales_locale_parent_id_unique" ON "_pages_v_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_locales_parent_id_idx" ON "_pages_v_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_embed_items_order_idx" ON "_pages_v_blocks_video_embed_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_embed_items_parent_id_idx" ON "_pages_v_blocks_video_embed_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_embed_items_media_idx" ON "_pages_v_blocks_video_embed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_video_embed_items_locales_locale_parent_id_u" ON "_pages_v_blocks_video_embed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_video_embed_items_locales_parent_id_idx" ON "_pages_v_blocks_video_embed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_embed_order_idx" ON "_pages_v_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_embed_parent_id_idx" ON "_pages_v_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_embed_path_idx" ON "_pages_v_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_embed_media_idx" ON "_pages_v_blocks_video_embed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_video_embed_locales_locale_parent_id_unique" ON "_pages_v_blocks_video_embed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_video_embed_locales_parent_id_idx" ON "_pages_v_blocks_video_embed_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_feed_items_order_idx" ON "_pages_v_blocks_portfolio_feed_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_feed_items_parent_id_idx" ON "_pages_v_blocks_portfolio_feed_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_feed_items_media_idx" ON "_pages_v_blocks_portfolio_feed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_portfolio_feed_items_locales_locale_parent_i" ON "_pages_v_blocks_portfolio_feed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_feed_items_locales_parent_id_idx" ON "_pages_v_blocks_portfolio_feed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_feed_order_idx" ON "_pages_v_blocks_portfolio_feed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_feed_parent_id_idx" ON "_pages_v_blocks_portfolio_feed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_feed_path_idx" ON "_pages_v_blocks_portfolio_feed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_portfolio_feed_media_idx" ON "_pages_v_blocks_portfolio_feed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_portfolio_feed_locales_locale_parent_id_uniq" ON "_pages_v_blocks_portfolio_feed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_feed_locales_parent_id_idx" ON "_pages_v_blocks_portfolio_feed_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_news_feed_items_order_idx" ON "_pages_v_blocks_news_feed_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_news_feed_items_parent_id_idx" ON "_pages_v_blocks_news_feed_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_news_feed_items_media_idx" ON "_pages_v_blocks_news_feed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_news_feed_items_locales_locale_parent_id_uni" ON "_pages_v_blocks_news_feed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_news_feed_items_locales_parent_id_idx" ON "_pages_v_blocks_news_feed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_news_feed_order_idx" ON "_pages_v_blocks_news_feed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_news_feed_parent_id_idx" ON "_pages_v_blocks_news_feed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_news_feed_path_idx" ON "_pages_v_blocks_news_feed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_news_feed_media_idx" ON "_pages_v_blocks_news_feed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_news_feed_locales_locale_parent_id_unique" ON "_pages_v_blocks_news_feed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_news_feed_locales_parent_id_idx" ON "_pages_v_blocks_news_feed_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_media_idx" ON "_pages_v_blocks_faq_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_locales_parent_id_idx" ON "_pages_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_media_idx" ON "_pages_v_blocks_faq_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_locales_parent_id_idx" ON "_pages_v_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_call_to_action_items_order_idx" ON "_pages_v_blocks_call_to_action_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_call_to_action_items_parent_id_idx" ON "_pages_v_blocks_call_to_action_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_call_to_action_items_media_idx" ON "_pages_v_blocks_call_to_action_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_call_to_action_items_locales_locale_parent_i" ON "_pages_v_blocks_call_to_action_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_call_to_action_items_locales_parent_id_idx" ON "_pages_v_blocks_call_to_action_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_call_to_action_order_idx" ON "_pages_v_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_call_to_action_parent_id_idx" ON "_pages_v_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_call_to_action_path_idx" ON "_pages_v_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_call_to_action_media_idx" ON "_pages_v_blocks_call_to_action_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_call_to_action_locales_locale_parent_id_uniq" ON "_pages_v_blocks_call_to_action_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_call_to_action_locales_parent_id_idx" ON "_pages_v_blocks_call_to_action_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_community_showcase_items_order_idx" ON "_pages_v_blocks_community_showcase_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_community_showcase_items_parent_id_idx" ON "_pages_v_blocks_community_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_community_showcase_items_media_idx" ON "_pages_v_blocks_community_showcase_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_community_showcase_items_locales_locale_pare" ON "_pages_v_blocks_community_showcase_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_community_showcase_items_locales_parent__idx" ON "_pages_v_blocks_community_showcase_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_community_showcase_order_idx" ON "_pages_v_blocks_community_showcase" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_community_showcase_parent_id_idx" ON "_pages_v_blocks_community_showcase" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_community_showcase_path_idx" ON "_pages_v_blocks_community_showcase" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_community_showcase_media_idx" ON "_pages_v_blocks_community_showcase_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_community_showcase_locales_locale_parent_id_" ON "_pages_v_blocks_community_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_community_showcase_locales_parent_id_idx" ON "_pages_v_blocks_community_showcase_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_key_idx" ON "_pages_v" USING btree ("version_key");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v_locales" USING btree ("version_slug","_locale");
  CREATE INDEX "_pages_v_version_version_hero_media_idx" ON "_pages_v_locales" USING btree ("version_hero_media_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_locales_parent_id_idx" ON "_pages_v_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_reviewed_locales_order_idx" ON "posts_reviewed_locales" USING btree ("order");
  CREATE INDEX "posts_reviewed_locales_parent_idx" ON "posts_reviewed_locales" USING btree ("parent_id");
  CREATE INDEX "posts_blocks_hero_items_order_idx" ON "posts_blocks_hero_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_hero_items_parent_id_idx" ON "posts_blocks_hero_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hero_items_media_idx" ON "posts_blocks_hero_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_hero_items_locales_locale_parent_id_unique" ON "posts_blocks_hero_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_hero_items_locales_parent_id_idx" ON "posts_blocks_hero_items_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hero_order_idx" ON "posts_blocks_hero" USING btree ("_order");
  CREATE INDEX "posts_blocks_hero_parent_id_idx" ON "posts_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hero_path_idx" ON "posts_blocks_hero" USING btree ("_path");
  CREATE INDEX "posts_blocks_hero_media_idx" ON "posts_blocks_hero_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_hero_locales_locale_parent_id_unique" ON "posts_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_hero_locales_parent_id_idx" ON "posts_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_rich_text_items_order_idx" ON "posts_blocks_rich_text_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_rich_text_items_parent_id_idx" ON "posts_blocks_rich_text_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_rich_text_items_media_idx" ON "posts_blocks_rich_text_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_rich_text_items_locales_locale_parent_id_unique" ON "posts_blocks_rich_text_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_rich_text_items_locales_parent_id_idx" ON "posts_blocks_rich_text_items_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_rich_text_order_idx" ON "posts_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "posts_blocks_rich_text_parent_id_idx" ON "posts_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_rich_text_path_idx" ON "posts_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "posts_blocks_rich_text_media_idx" ON "posts_blocks_rich_text_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_rich_text_locales_locale_parent_id_unique" ON "posts_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_rich_text_locales_parent_id_idx" ON "posts_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_image_text_items_order_idx" ON "posts_blocks_image_text_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_image_text_items_parent_id_idx" ON "posts_blocks_image_text_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_image_text_items_media_idx" ON "posts_blocks_image_text_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_image_text_items_locales_locale_parent_id_uniqu" ON "posts_blocks_image_text_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_image_text_items_locales_parent_id_idx" ON "posts_blocks_image_text_items_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_image_text_order_idx" ON "posts_blocks_image_text" USING btree ("_order");
  CREATE INDEX "posts_blocks_image_text_parent_id_idx" ON "posts_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_image_text_path_idx" ON "posts_blocks_image_text" USING btree ("_path");
  CREATE INDEX "posts_blocks_image_text_media_idx" ON "posts_blocks_image_text_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_image_text_locales_locale_parent_id_unique" ON "posts_blocks_image_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_image_text_locales_parent_id_idx" ON "posts_blocks_image_text_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_feature_grid_items_order_idx" ON "posts_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_feature_grid_items_parent_id_idx" ON "posts_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_feature_grid_items_media_idx" ON "posts_blocks_feature_grid_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_feature_grid_items_locales_locale_parent_id_uni" ON "posts_blocks_feature_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_feature_grid_items_locales_parent_id_idx" ON "posts_blocks_feature_grid_items_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_feature_grid_order_idx" ON "posts_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "posts_blocks_feature_grid_parent_id_idx" ON "posts_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_feature_grid_path_idx" ON "posts_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "posts_blocks_feature_grid_media_idx" ON "posts_blocks_feature_grid_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_feature_grid_locales_locale_parent_id_unique" ON "posts_blocks_feature_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_feature_grid_locales_parent_id_idx" ON "posts_blocks_feature_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_media_showcase_items_order_idx" ON "posts_blocks_media_showcase_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_media_showcase_items_parent_id_idx" ON "posts_blocks_media_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_media_showcase_items_media_idx" ON "posts_blocks_media_showcase_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_media_showcase_items_locales_locale_parent_id_u" ON "posts_blocks_media_showcase_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_media_showcase_items_locales_parent_id_idx" ON "posts_blocks_media_showcase_items_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_media_showcase_order_idx" ON "posts_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "posts_blocks_media_showcase_parent_id_idx" ON "posts_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_media_showcase_path_idx" ON "posts_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "posts_blocks_media_showcase_media_idx" ON "posts_blocks_media_showcase_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_media_showcase_locales_locale_parent_id_unique" ON "posts_blocks_media_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_media_showcase_locales_parent_id_idx" ON "posts_blocks_media_showcase_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_stats_items_order_idx" ON "posts_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_stats_items_parent_id_idx" ON "posts_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_stats_items_media_idx" ON "posts_blocks_stats_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_stats_items_locales_locale_parent_id_unique" ON "posts_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_stats_items_locales_parent_id_idx" ON "posts_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_stats_order_idx" ON "posts_blocks_stats" USING btree ("_order");
  CREATE INDEX "posts_blocks_stats_parent_id_idx" ON "posts_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_stats_path_idx" ON "posts_blocks_stats" USING btree ("_path");
  CREATE INDEX "posts_blocks_stats_media_idx" ON "posts_blocks_stats_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_stats_locales_locale_parent_id_unique" ON "posts_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_stats_locales_parent_id_idx" ON "posts_blocks_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_gallery_items_order_idx" ON "posts_blocks_gallery_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_gallery_items_parent_id_idx" ON "posts_blocks_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_gallery_items_media_idx" ON "posts_blocks_gallery_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_gallery_items_locales_locale_parent_id_unique" ON "posts_blocks_gallery_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_gallery_items_locales_parent_id_idx" ON "posts_blocks_gallery_items_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_gallery_order_idx" ON "posts_blocks_gallery" USING btree ("_order");
  CREATE INDEX "posts_blocks_gallery_parent_id_idx" ON "posts_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_gallery_path_idx" ON "posts_blocks_gallery" USING btree ("_path");
  CREATE INDEX "posts_blocks_gallery_media_idx" ON "posts_blocks_gallery_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_gallery_locales_locale_parent_id_unique" ON "posts_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_gallery_locales_parent_id_idx" ON "posts_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_video_embed_items_order_idx" ON "posts_blocks_video_embed_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_video_embed_items_parent_id_idx" ON "posts_blocks_video_embed_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_video_embed_items_media_idx" ON "posts_blocks_video_embed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_video_embed_items_locales_locale_parent_id_uniq" ON "posts_blocks_video_embed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_video_embed_items_locales_parent_id_idx" ON "posts_blocks_video_embed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_video_embed_order_idx" ON "posts_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "posts_blocks_video_embed_parent_id_idx" ON "posts_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_video_embed_path_idx" ON "posts_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "posts_blocks_video_embed_media_idx" ON "posts_blocks_video_embed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_video_embed_locales_locale_parent_id_unique" ON "posts_blocks_video_embed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_video_embed_locales_parent_id_idx" ON "posts_blocks_video_embed_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_portfolio_feed_items_order_idx" ON "posts_blocks_portfolio_feed_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_portfolio_feed_items_parent_id_idx" ON "posts_blocks_portfolio_feed_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_portfolio_feed_items_media_idx" ON "posts_blocks_portfolio_feed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_portfolio_feed_items_locales_locale_parent_id_u" ON "posts_blocks_portfolio_feed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_portfolio_feed_items_locales_parent_id_idx" ON "posts_blocks_portfolio_feed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_portfolio_feed_order_idx" ON "posts_blocks_portfolio_feed" USING btree ("_order");
  CREATE INDEX "posts_blocks_portfolio_feed_parent_id_idx" ON "posts_blocks_portfolio_feed" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_portfolio_feed_path_idx" ON "posts_blocks_portfolio_feed" USING btree ("_path");
  CREATE INDEX "posts_blocks_portfolio_feed_media_idx" ON "posts_blocks_portfolio_feed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_portfolio_feed_locales_locale_parent_id_unique" ON "posts_blocks_portfolio_feed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_portfolio_feed_locales_parent_id_idx" ON "posts_blocks_portfolio_feed_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_news_feed_items_order_idx" ON "posts_blocks_news_feed_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_news_feed_items_parent_id_idx" ON "posts_blocks_news_feed_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_news_feed_items_media_idx" ON "posts_blocks_news_feed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_news_feed_items_locales_locale_parent_id_unique" ON "posts_blocks_news_feed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_news_feed_items_locales_parent_id_idx" ON "posts_blocks_news_feed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_news_feed_order_idx" ON "posts_blocks_news_feed" USING btree ("_order");
  CREATE INDEX "posts_blocks_news_feed_parent_id_idx" ON "posts_blocks_news_feed" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_news_feed_path_idx" ON "posts_blocks_news_feed" USING btree ("_path");
  CREATE INDEX "posts_blocks_news_feed_media_idx" ON "posts_blocks_news_feed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_news_feed_locales_locale_parent_id_unique" ON "posts_blocks_news_feed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_news_feed_locales_parent_id_idx" ON "posts_blocks_news_feed_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_faq_items_order_idx" ON "posts_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_faq_items_parent_id_idx" ON "posts_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_faq_items_media_idx" ON "posts_blocks_faq_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_faq_items_locales_locale_parent_id_unique" ON "posts_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_faq_items_locales_parent_id_idx" ON "posts_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_faq_order_idx" ON "posts_blocks_faq" USING btree ("_order");
  CREATE INDEX "posts_blocks_faq_parent_id_idx" ON "posts_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_faq_path_idx" ON "posts_blocks_faq" USING btree ("_path");
  CREATE INDEX "posts_blocks_faq_media_idx" ON "posts_blocks_faq_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_faq_locales_locale_parent_id_unique" ON "posts_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_faq_locales_parent_id_idx" ON "posts_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_call_to_action_items_order_idx" ON "posts_blocks_call_to_action_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_call_to_action_items_parent_id_idx" ON "posts_blocks_call_to_action_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_call_to_action_items_media_idx" ON "posts_blocks_call_to_action_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_call_to_action_items_locales_locale_parent_id_u" ON "posts_blocks_call_to_action_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_call_to_action_items_locales_parent_id_idx" ON "posts_blocks_call_to_action_items_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_call_to_action_order_idx" ON "posts_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "posts_blocks_call_to_action_parent_id_idx" ON "posts_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_call_to_action_path_idx" ON "posts_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "posts_blocks_call_to_action_media_idx" ON "posts_blocks_call_to_action_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_call_to_action_locales_locale_parent_id_unique" ON "posts_blocks_call_to_action_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_call_to_action_locales_parent_id_idx" ON "posts_blocks_call_to_action_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_community_showcase_items_order_idx" ON "posts_blocks_community_showcase_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_community_showcase_items_parent_id_idx" ON "posts_blocks_community_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_community_showcase_items_media_idx" ON "posts_blocks_community_showcase_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_community_showcase_items_locales_locale_parent_" ON "posts_blocks_community_showcase_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_community_showcase_items_locales_parent_id_idx" ON "posts_blocks_community_showcase_items_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_community_showcase_order_idx" ON "posts_blocks_community_showcase" USING btree ("_order");
  CREATE INDEX "posts_blocks_community_showcase_parent_id_idx" ON "posts_blocks_community_showcase" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_community_showcase_path_idx" ON "posts_blocks_community_showcase" USING btree ("_path");
  CREATE INDEX "posts_blocks_community_showcase_media_idx" ON "posts_blocks_community_showcase_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_community_showcase_locales_locale_parent_id_uni" ON "posts_blocks_community_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_community_showcase_locales_parent_id_idx" ON "posts_blocks_community_showcase_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_key_idx" ON "posts" USING btree ("key");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts_locales" USING btree ("slug","_locale");
  CREATE INDEX "posts_hero_media_idx" ON "posts_locales" USING btree ("hero_media_id","_locale");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_locales_parent_id_idx" ON "posts_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_post_categories_id_idx" ON "posts_rels" USING btree ("post_categories_id");
  CREATE INDEX "_posts_v_version_reviewed_locales_order_idx" ON "_posts_v_version_reviewed_locales" USING btree ("order");
  CREATE INDEX "_posts_v_version_reviewed_locales_parent_idx" ON "_posts_v_version_reviewed_locales" USING btree ("parent_id");
  CREATE INDEX "_posts_v_blocks_hero_items_order_idx" ON "_posts_v_blocks_hero_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hero_items_parent_id_idx" ON "_posts_v_blocks_hero_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_items_media_idx" ON "_posts_v_blocks_hero_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_hero_items_locales_locale_parent_id_unique" ON "_posts_v_blocks_hero_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_items_locales_parent_id_idx" ON "_posts_v_blocks_hero_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_order_idx" ON "_posts_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hero_parent_id_idx" ON "_posts_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_path_idx" ON "_posts_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_hero_media_idx" ON "_posts_v_blocks_hero_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_hero_locales_locale_parent_id_unique" ON "_posts_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_locales_parent_id_idx" ON "_posts_v_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_rich_text_items_order_idx" ON "_posts_v_blocks_rich_text_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_rich_text_items_parent_id_idx" ON "_posts_v_blocks_rich_text_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_rich_text_items_media_idx" ON "_posts_v_blocks_rich_text_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_rich_text_items_locales_locale_parent_id_uni" ON "_posts_v_blocks_rich_text_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_rich_text_items_locales_parent_id_idx" ON "_posts_v_blocks_rich_text_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_rich_text_order_idx" ON "_posts_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_rich_text_parent_id_idx" ON "_posts_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_rich_text_path_idx" ON "_posts_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_rich_text_media_idx" ON "_posts_v_blocks_rich_text_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_posts_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_rich_text_locales_parent_id_idx" ON "_posts_v_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_image_text_items_order_idx" ON "_posts_v_blocks_image_text_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_image_text_items_parent_id_idx" ON "_posts_v_blocks_image_text_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_image_text_items_media_idx" ON "_posts_v_blocks_image_text_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_image_text_items_locales_locale_parent_id_un" ON "_posts_v_blocks_image_text_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_image_text_items_locales_parent_id_idx" ON "_posts_v_blocks_image_text_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_image_text_order_idx" ON "_posts_v_blocks_image_text" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_image_text_parent_id_idx" ON "_posts_v_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_image_text_path_idx" ON "_posts_v_blocks_image_text" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_image_text_media_idx" ON "_posts_v_blocks_image_text_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_image_text_locales_locale_parent_id_unique" ON "_posts_v_blocks_image_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_image_text_locales_parent_id_idx" ON "_posts_v_blocks_image_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_feature_grid_items_order_idx" ON "_posts_v_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_feature_grid_items_parent_id_idx" ON "_posts_v_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_feature_grid_items_media_idx" ON "_posts_v_blocks_feature_grid_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_feature_grid_items_locales_locale_parent_id_" ON "_posts_v_blocks_feature_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_feature_grid_items_locales_parent_id_idx" ON "_posts_v_blocks_feature_grid_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_feature_grid_order_idx" ON "_posts_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_feature_grid_parent_id_idx" ON "_posts_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_feature_grid_path_idx" ON "_posts_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_feature_grid_media_idx" ON "_posts_v_blocks_feature_grid_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_feature_grid_locales_locale_parent_id_unique" ON "_posts_v_blocks_feature_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_feature_grid_locales_parent_id_idx" ON "_posts_v_blocks_feature_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_media_showcase_items_order_idx" ON "_posts_v_blocks_media_showcase_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_media_showcase_items_parent_id_idx" ON "_posts_v_blocks_media_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_media_showcase_items_media_idx" ON "_posts_v_blocks_media_showcase_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_media_showcase_items_locales_locale_parent_i" ON "_posts_v_blocks_media_showcase_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_media_showcase_items_locales_parent_id_idx" ON "_posts_v_blocks_media_showcase_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_media_showcase_order_idx" ON "_posts_v_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_media_showcase_parent_id_idx" ON "_posts_v_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_media_showcase_path_idx" ON "_posts_v_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_media_showcase_media_idx" ON "_posts_v_blocks_media_showcase_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_media_showcase_locales_locale_parent_id_uniq" ON "_posts_v_blocks_media_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_media_showcase_locales_parent_id_idx" ON "_posts_v_blocks_media_showcase_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_stats_items_order_idx" ON "_posts_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_stats_items_parent_id_idx" ON "_posts_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_stats_items_media_idx" ON "_posts_v_blocks_stats_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_stats_items_locales_locale_parent_id_unique" ON "_posts_v_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_stats_items_locales_parent_id_idx" ON "_posts_v_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_stats_order_idx" ON "_posts_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_stats_parent_id_idx" ON "_posts_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_stats_path_idx" ON "_posts_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_stats_media_idx" ON "_posts_v_blocks_stats_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_stats_locales_locale_parent_id_unique" ON "_posts_v_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_stats_locales_parent_id_idx" ON "_posts_v_blocks_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_gallery_items_order_idx" ON "_posts_v_blocks_gallery_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_gallery_items_parent_id_idx" ON "_posts_v_blocks_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_gallery_items_media_idx" ON "_posts_v_blocks_gallery_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_gallery_items_locales_locale_parent_id_uniqu" ON "_posts_v_blocks_gallery_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_gallery_items_locales_parent_id_idx" ON "_posts_v_blocks_gallery_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_gallery_order_idx" ON "_posts_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_gallery_parent_id_idx" ON "_posts_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_gallery_path_idx" ON "_posts_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_gallery_media_idx" ON "_posts_v_blocks_gallery_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_gallery_locales_locale_parent_id_unique" ON "_posts_v_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_gallery_locales_parent_id_idx" ON "_posts_v_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_video_embed_items_order_idx" ON "_posts_v_blocks_video_embed_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_video_embed_items_parent_id_idx" ON "_posts_v_blocks_video_embed_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_video_embed_items_media_idx" ON "_posts_v_blocks_video_embed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_video_embed_items_locales_locale_parent_id_u" ON "_posts_v_blocks_video_embed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_video_embed_items_locales_parent_id_idx" ON "_posts_v_blocks_video_embed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_video_embed_order_idx" ON "_posts_v_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_video_embed_parent_id_idx" ON "_posts_v_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_video_embed_path_idx" ON "_posts_v_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_video_embed_media_idx" ON "_posts_v_blocks_video_embed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_video_embed_locales_locale_parent_id_unique" ON "_posts_v_blocks_video_embed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_video_embed_locales_parent_id_idx" ON "_posts_v_blocks_video_embed_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_portfolio_feed_items_order_idx" ON "_posts_v_blocks_portfolio_feed_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_portfolio_feed_items_parent_id_idx" ON "_posts_v_blocks_portfolio_feed_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_portfolio_feed_items_media_idx" ON "_posts_v_blocks_portfolio_feed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_portfolio_feed_items_locales_locale_parent_i" ON "_posts_v_blocks_portfolio_feed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_portfolio_feed_items_locales_parent_id_idx" ON "_posts_v_blocks_portfolio_feed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_portfolio_feed_order_idx" ON "_posts_v_blocks_portfolio_feed" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_portfolio_feed_parent_id_idx" ON "_posts_v_blocks_portfolio_feed" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_portfolio_feed_path_idx" ON "_posts_v_blocks_portfolio_feed" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_portfolio_feed_media_idx" ON "_posts_v_blocks_portfolio_feed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_portfolio_feed_locales_locale_parent_id_uniq" ON "_posts_v_blocks_portfolio_feed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_portfolio_feed_locales_parent_id_idx" ON "_posts_v_blocks_portfolio_feed_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_news_feed_items_order_idx" ON "_posts_v_blocks_news_feed_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_news_feed_items_parent_id_idx" ON "_posts_v_blocks_news_feed_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_news_feed_items_media_idx" ON "_posts_v_blocks_news_feed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_news_feed_items_locales_locale_parent_id_uni" ON "_posts_v_blocks_news_feed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_news_feed_items_locales_parent_id_idx" ON "_posts_v_blocks_news_feed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_news_feed_order_idx" ON "_posts_v_blocks_news_feed" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_news_feed_parent_id_idx" ON "_posts_v_blocks_news_feed" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_news_feed_path_idx" ON "_posts_v_blocks_news_feed" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_news_feed_media_idx" ON "_posts_v_blocks_news_feed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_news_feed_locales_locale_parent_id_unique" ON "_posts_v_blocks_news_feed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_news_feed_locales_parent_id_idx" ON "_posts_v_blocks_news_feed_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_items_order_idx" ON "_posts_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_faq_items_parent_id_idx" ON "_posts_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_items_media_idx" ON "_posts_v_blocks_faq_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_posts_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_items_locales_parent_id_idx" ON "_posts_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_order_idx" ON "_posts_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_faq_parent_id_idx" ON "_posts_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_path_idx" ON "_posts_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_faq_media_idx" ON "_posts_v_blocks_faq_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_faq_locales_locale_parent_id_unique" ON "_posts_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_locales_parent_id_idx" ON "_posts_v_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_call_to_action_items_order_idx" ON "_posts_v_blocks_call_to_action_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_call_to_action_items_parent_id_idx" ON "_posts_v_blocks_call_to_action_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_call_to_action_items_media_idx" ON "_posts_v_blocks_call_to_action_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_call_to_action_items_locales_locale_parent_i" ON "_posts_v_blocks_call_to_action_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_call_to_action_items_locales_parent_id_idx" ON "_posts_v_blocks_call_to_action_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_call_to_action_order_idx" ON "_posts_v_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_call_to_action_parent_id_idx" ON "_posts_v_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_call_to_action_path_idx" ON "_posts_v_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_call_to_action_media_idx" ON "_posts_v_blocks_call_to_action_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_call_to_action_locales_locale_parent_id_uniq" ON "_posts_v_blocks_call_to_action_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_call_to_action_locales_parent_id_idx" ON "_posts_v_blocks_call_to_action_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_community_showcase_items_order_idx" ON "_posts_v_blocks_community_showcase_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_community_showcase_items_parent_id_idx" ON "_posts_v_blocks_community_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_community_showcase_items_media_idx" ON "_posts_v_blocks_community_showcase_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_community_showcase_items_locales_locale_pare" ON "_posts_v_blocks_community_showcase_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_community_showcase_items_locales_parent__idx" ON "_posts_v_blocks_community_showcase_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_community_showcase_order_idx" ON "_posts_v_blocks_community_showcase" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_community_showcase_parent_id_idx" ON "_posts_v_blocks_community_showcase" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_community_showcase_path_idx" ON "_posts_v_blocks_community_showcase" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_community_showcase_media_idx" ON "_posts_v_blocks_community_showcase_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_community_showcase_locales_locale_parent_id_" ON "_posts_v_blocks_community_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_community_showcase_locales_parent_id_idx" ON "_posts_v_blocks_community_showcase_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_key_idx" ON "_posts_v" USING btree ("version_key");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v_locales" USING btree ("version_slug","_locale");
  CREATE INDEX "_posts_v_version_version_hero_media_idx" ON "_posts_v_locales" USING btree ("version_hero_media_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_locales_parent_id_idx" ON "_posts_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_post_categories_id_idx" ON "_posts_v_rels" USING btree ("post_categories_id");
  CREATE INDEX "projects_reviewed_locales_order_idx" ON "projects_reviewed_locales" USING btree ("order");
  CREATE INDEX "projects_reviewed_locales_parent_idx" ON "projects_reviewed_locales" USING btree ("parent_id");
  CREATE INDEX "projects_blocks_hero_items_order_idx" ON "projects_blocks_hero_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_hero_items_parent_id_idx" ON "projects_blocks_hero_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hero_items_media_idx" ON "projects_blocks_hero_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_hero_items_locales_locale_parent_id_unique" ON "projects_blocks_hero_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_hero_items_locales_parent_id_idx" ON "projects_blocks_hero_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hero_order_idx" ON "projects_blocks_hero" USING btree ("_order");
  CREATE INDEX "projects_blocks_hero_parent_id_idx" ON "projects_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hero_path_idx" ON "projects_blocks_hero" USING btree ("_path");
  CREATE INDEX "projects_blocks_hero_media_idx" ON "projects_blocks_hero_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_hero_locales_locale_parent_id_unique" ON "projects_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_hero_locales_parent_id_idx" ON "projects_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_rich_text_items_order_idx" ON "projects_blocks_rich_text_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_rich_text_items_parent_id_idx" ON "projects_blocks_rich_text_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_rich_text_items_media_idx" ON "projects_blocks_rich_text_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_rich_text_items_locales_locale_parent_id_uni" ON "projects_blocks_rich_text_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_rich_text_items_locales_parent_id_idx" ON "projects_blocks_rich_text_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_rich_text_order_idx" ON "projects_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "projects_blocks_rich_text_parent_id_idx" ON "projects_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_rich_text_path_idx" ON "projects_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "projects_blocks_rich_text_media_idx" ON "projects_blocks_rich_text_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_rich_text_locales_locale_parent_id_unique" ON "projects_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_rich_text_locales_parent_id_idx" ON "projects_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_image_text_items_order_idx" ON "projects_blocks_image_text_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_image_text_items_parent_id_idx" ON "projects_blocks_image_text_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_image_text_items_media_idx" ON "projects_blocks_image_text_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_image_text_items_locales_locale_parent_id_un" ON "projects_blocks_image_text_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_image_text_items_locales_parent_id_idx" ON "projects_blocks_image_text_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_image_text_order_idx" ON "projects_blocks_image_text" USING btree ("_order");
  CREATE INDEX "projects_blocks_image_text_parent_id_idx" ON "projects_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_image_text_path_idx" ON "projects_blocks_image_text" USING btree ("_path");
  CREATE INDEX "projects_blocks_image_text_media_idx" ON "projects_blocks_image_text_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_image_text_locales_locale_parent_id_unique" ON "projects_blocks_image_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_image_text_locales_parent_id_idx" ON "projects_blocks_image_text_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_feature_grid_items_order_idx" ON "projects_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_feature_grid_items_parent_id_idx" ON "projects_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_feature_grid_items_media_idx" ON "projects_blocks_feature_grid_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_feature_grid_items_locales_locale_parent_id_" ON "projects_blocks_feature_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_feature_grid_items_locales_parent_id_idx" ON "projects_blocks_feature_grid_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_feature_grid_order_idx" ON "projects_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "projects_blocks_feature_grid_parent_id_idx" ON "projects_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_feature_grid_path_idx" ON "projects_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "projects_blocks_feature_grid_media_idx" ON "projects_blocks_feature_grid_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_feature_grid_locales_locale_parent_id_unique" ON "projects_blocks_feature_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_feature_grid_locales_parent_id_idx" ON "projects_blocks_feature_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_media_showcase_items_order_idx" ON "projects_blocks_media_showcase_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_media_showcase_items_parent_id_idx" ON "projects_blocks_media_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_media_showcase_items_media_idx" ON "projects_blocks_media_showcase_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_media_showcase_items_locales_locale_parent_i" ON "projects_blocks_media_showcase_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_media_showcase_items_locales_parent_id_idx" ON "projects_blocks_media_showcase_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_media_showcase_order_idx" ON "projects_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "projects_blocks_media_showcase_parent_id_idx" ON "projects_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_media_showcase_path_idx" ON "projects_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "projects_blocks_media_showcase_media_idx" ON "projects_blocks_media_showcase_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_media_showcase_locales_locale_parent_id_uniq" ON "projects_blocks_media_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_media_showcase_locales_parent_id_idx" ON "projects_blocks_media_showcase_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stats_items_order_idx" ON "projects_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_stats_items_parent_id_idx" ON "projects_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stats_items_media_idx" ON "projects_blocks_stats_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_stats_items_locales_locale_parent_id_unique" ON "projects_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_stats_items_locales_parent_id_idx" ON "projects_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stats_order_idx" ON "projects_blocks_stats" USING btree ("_order");
  CREATE INDEX "projects_blocks_stats_parent_id_idx" ON "projects_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stats_path_idx" ON "projects_blocks_stats" USING btree ("_path");
  CREATE INDEX "projects_blocks_stats_media_idx" ON "projects_blocks_stats_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_stats_locales_locale_parent_id_unique" ON "projects_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_stats_locales_parent_id_idx" ON "projects_blocks_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_items_order_idx" ON "projects_blocks_gallery_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_gallery_items_parent_id_idx" ON "projects_blocks_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_items_media_idx" ON "projects_blocks_gallery_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_gallery_items_locales_locale_parent_id_uniqu" ON "projects_blocks_gallery_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_gallery_items_locales_parent_id_idx" ON "projects_blocks_gallery_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_order_idx" ON "projects_blocks_gallery" USING btree ("_order");
  CREATE INDEX "projects_blocks_gallery_parent_id_idx" ON "projects_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_path_idx" ON "projects_blocks_gallery" USING btree ("_path");
  CREATE INDEX "projects_blocks_gallery_media_idx" ON "projects_blocks_gallery_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_gallery_locales_locale_parent_id_unique" ON "projects_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_gallery_locales_parent_id_idx" ON "projects_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_video_embed_items_order_idx" ON "projects_blocks_video_embed_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_video_embed_items_parent_id_idx" ON "projects_blocks_video_embed_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_video_embed_items_media_idx" ON "projects_blocks_video_embed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_video_embed_items_locales_locale_parent_id_u" ON "projects_blocks_video_embed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_video_embed_items_locales_parent_id_idx" ON "projects_blocks_video_embed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_video_embed_order_idx" ON "projects_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "projects_blocks_video_embed_parent_id_idx" ON "projects_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_video_embed_path_idx" ON "projects_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "projects_blocks_video_embed_media_idx" ON "projects_blocks_video_embed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_video_embed_locales_locale_parent_id_unique" ON "projects_blocks_video_embed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_video_embed_locales_parent_id_idx" ON "projects_blocks_video_embed_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_portfolio_feed_items_order_idx" ON "projects_blocks_portfolio_feed_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_portfolio_feed_items_parent_id_idx" ON "projects_blocks_portfolio_feed_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_portfolio_feed_items_media_idx" ON "projects_blocks_portfolio_feed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_portfolio_feed_items_locales_locale_parent_i" ON "projects_blocks_portfolio_feed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_portfolio_feed_items_locales_parent_id_idx" ON "projects_blocks_portfolio_feed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_portfolio_feed_order_idx" ON "projects_blocks_portfolio_feed" USING btree ("_order");
  CREATE INDEX "projects_blocks_portfolio_feed_parent_id_idx" ON "projects_blocks_portfolio_feed" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_portfolio_feed_path_idx" ON "projects_blocks_portfolio_feed" USING btree ("_path");
  CREATE INDEX "projects_blocks_portfolio_feed_media_idx" ON "projects_blocks_portfolio_feed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_portfolio_feed_locales_locale_parent_id_uniq" ON "projects_blocks_portfolio_feed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_portfolio_feed_locales_parent_id_idx" ON "projects_blocks_portfolio_feed_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_news_feed_items_order_idx" ON "projects_blocks_news_feed_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_news_feed_items_parent_id_idx" ON "projects_blocks_news_feed_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_news_feed_items_media_idx" ON "projects_blocks_news_feed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_news_feed_items_locales_locale_parent_id_uni" ON "projects_blocks_news_feed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_news_feed_items_locales_parent_id_idx" ON "projects_blocks_news_feed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_news_feed_order_idx" ON "projects_blocks_news_feed" USING btree ("_order");
  CREATE INDEX "projects_blocks_news_feed_parent_id_idx" ON "projects_blocks_news_feed" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_news_feed_path_idx" ON "projects_blocks_news_feed" USING btree ("_path");
  CREATE INDEX "projects_blocks_news_feed_media_idx" ON "projects_blocks_news_feed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_news_feed_locales_locale_parent_id_unique" ON "projects_blocks_news_feed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_news_feed_locales_parent_id_idx" ON "projects_blocks_news_feed_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_faq_items_order_idx" ON "projects_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_faq_items_parent_id_idx" ON "projects_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_faq_items_media_idx" ON "projects_blocks_faq_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_faq_items_locales_locale_parent_id_unique" ON "projects_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_faq_items_locales_parent_id_idx" ON "projects_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_faq_order_idx" ON "projects_blocks_faq" USING btree ("_order");
  CREATE INDEX "projects_blocks_faq_parent_id_idx" ON "projects_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_faq_path_idx" ON "projects_blocks_faq" USING btree ("_path");
  CREATE INDEX "projects_blocks_faq_media_idx" ON "projects_blocks_faq_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_faq_locales_locale_parent_id_unique" ON "projects_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_faq_locales_parent_id_idx" ON "projects_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_call_to_action_items_order_idx" ON "projects_blocks_call_to_action_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_call_to_action_items_parent_id_idx" ON "projects_blocks_call_to_action_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_call_to_action_items_media_idx" ON "projects_blocks_call_to_action_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_call_to_action_items_locales_locale_parent_i" ON "projects_blocks_call_to_action_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_call_to_action_items_locales_parent_id_idx" ON "projects_blocks_call_to_action_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_call_to_action_order_idx" ON "projects_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "projects_blocks_call_to_action_parent_id_idx" ON "projects_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_call_to_action_path_idx" ON "projects_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "projects_blocks_call_to_action_media_idx" ON "projects_blocks_call_to_action_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_call_to_action_locales_locale_parent_id_uniq" ON "projects_blocks_call_to_action_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_call_to_action_locales_parent_id_idx" ON "projects_blocks_call_to_action_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_community_showcase_items_order_idx" ON "projects_blocks_community_showcase_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_community_showcase_items_parent_id_idx" ON "projects_blocks_community_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_community_showcase_items_media_idx" ON "projects_blocks_community_showcase_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_community_showcase_items_locales_locale_pare" ON "projects_blocks_community_showcase_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_community_showcase_items_locales_parent__idx" ON "projects_blocks_community_showcase_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_community_showcase_order_idx" ON "projects_blocks_community_showcase" USING btree ("_order");
  CREATE INDEX "projects_blocks_community_showcase_parent_id_idx" ON "projects_blocks_community_showcase" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_community_showcase_path_idx" ON "projects_blocks_community_showcase" USING btree ("_path");
  CREATE INDEX "projects_blocks_community_showcase_media_idx" ON "projects_blocks_community_showcase_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_community_showcase_locales_locale_parent_id_" ON "projects_blocks_community_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_community_showcase_locales_parent_id_idx" ON "projects_blocks_community_showcase_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_key_idx" ON "projects" USING btree ("key");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects_locales" USING btree ("slug","_locale");
  CREATE INDEX "projects_hero_media_idx" ON "projects_locales" USING btree ("hero_media_id","_locale");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_locales_parent_id_idx" ON "projects_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_portfolio_categories_id_idx" ON "projects_rels" USING btree ("portfolio_categories_id");
  CREATE INDEX "_projects_v_version_reviewed_locales_order_idx" ON "_projects_v_version_reviewed_locales" USING btree ("order");
  CREATE INDEX "_projects_v_version_reviewed_locales_parent_idx" ON "_projects_v_version_reviewed_locales" USING btree ("parent_id");
  CREATE INDEX "_projects_v_blocks_hero_items_order_idx" ON "_projects_v_blocks_hero_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_hero_items_parent_id_idx" ON "_projects_v_blocks_hero_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_items_media_idx" ON "_projects_v_blocks_hero_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_hero_items_locales_locale_parent_id_uniqu" ON "_projects_v_blocks_hero_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_items_locales_parent_id_idx" ON "_projects_v_blocks_hero_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_order_idx" ON "_projects_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_hero_parent_id_idx" ON "_projects_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_path_idx" ON "_projects_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_hero_media_idx" ON "_projects_v_blocks_hero_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_hero_locales_locale_parent_id_unique" ON "_projects_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_locales_parent_id_idx" ON "_projects_v_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_rich_text_items_order_idx" ON "_projects_v_blocks_rich_text_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_rich_text_items_parent_id_idx" ON "_projects_v_blocks_rich_text_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_rich_text_items_media_idx" ON "_projects_v_blocks_rich_text_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_rich_text_items_locales_locale_parent_id_" ON "_projects_v_blocks_rich_text_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_rich_text_items_locales_parent_id_idx" ON "_projects_v_blocks_rich_text_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_rich_text_order_idx" ON "_projects_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_rich_text_parent_id_idx" ON "_projects_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_rich_text_path_idx" ON "_projects_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_rich_text_media_idx" ON "_projects_v_blocks_rich_text_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_projects_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_rich_text_locales_parent_id_idx" ON "_projects_v_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_image_text_items_order_idx" ON "_projects_v_blocks_image_text_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_image_text_items_parent_id_idx" ON "_projects_v_blocks_image_text_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_image_text_items_media_idx" ON "_projects_v_blocks_image_text_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_image_text_items_locales_locale_parent_id" ON "_projects_v_blocks_image_text_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_image_text_items_locales_parent_id_idx" ON "_projects_v_blocks_image_text_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_image_text_order_idx" ON "_projects_v_blocks_image_text" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_image_text_parent_id_idx" ON "_projects_v_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_image_text_path_idx" ON "_projects_v_blocks_image_text" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_image_text_media_idx" ON "_projects_v_blocks_image_text_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_image_text_locales_locale_parent_id_uniqu" ON "_projects_v_blocks_image_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_image_text_locales_parent_id_idx" ON "_projects_v_blocks_image_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_feature_grid_items_order_idx" ON "_projects_v_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_feature_grid_items_parent_id_idx" ON "_projects_v_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_feature_grid_items_media_idx" ON "_projects_v_blocks_feature_grid_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_feature_grid_items_locales_locale_parent_" ON "_projects_v_blocks_feature_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_feature_grid_items_locales_parent_id_idx" ON "_projects_v_blocks_feature_grid_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_feature_grid_order_idx" ON "_projects_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_feature_grid_parent_id_idx" ON "_projects_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_feature_grid_path_idx" ON "_projects_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_feature_grid_media_idx" ON "_projects_v_blocks_feature_grid_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_feature_grid_locales_locale_parent_id_uni" ON "_projects_v_blocks_feature_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_feature_grid_locales_parent_id_idx" ON "_projects_v_blocks_feature_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_media_showcase_items_order_idx" ON "_projects_v_blocks_media_showcase_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_media_showcase_items_parent_id_idx" ON "_projects_v_blocks_media_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_media_showcase_items_media_idx" ON "_projects_v_blocks_media_showcase_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_media_showcase_items_locales_locale_paren" ON "_projects_v_blocks_media_showcase_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_media_showcase_items_locales_parent_i_idx" ON "_projects_v_blocks_media_showcase_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_media_showcase_order_idx" ON "_projects_v_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_media_showcase_parent_id_idx" ON "_projects_v_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_media_showcase_path_idx" ON "_projects_v_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_media_showcase_media_idx" ON "_projects_v_blocks_media_showcase_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_media_showcase_locales_locale_parent_id_u" ON "_projects_v_blocks_media_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_media_showcase_locales_parent_id_idx" ON "_projects_v_blocks_media_showcase_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_items_order_idx" ON "_projects_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_stats_items_parent_id_idx" ON "_projects_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_items_media_idx" ON "_projects_v_blocks_stats_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_stats_items_locales_locale_parent_id_uniq" ON "_projects_v_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_items_locales_parent_id_idx" ON "_projects_v_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_order_idx" ON "_projects_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_stats_parent_id_idx" ON "_projects_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_path_idx" ON "_projects_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_stats_media_idx" ON "_projects_v_blocks_stats_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_stats_locales_locale_parent_id_unique" ON "_projects_v_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_locales_parent_id_idx" ON "_projects_v_blocks_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_items_order_idx" ON "_projects_v_blocks_gallery_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_gallery_items_parent_id_idx" ON "_projects_v_blocks_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_items_media_idx" ON "_projects_v_blocks_gallery_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_gallery_items_locales_locale_parent_id_un" ON "_projects_v_blocks_gallery_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_items_locales_parent_id_idx" ON "_projects_v_blocks_gallery_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_order_idx" ON "_projects_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_gallery_parent_id_idx" ON "_projects_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_path_idx" ON "_projects_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_gallery_media_idx" ON "_projects_v_blocks_gallery_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_gallery_locales_locale_parent_id_unique" ON "_projects_v_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_locales_parent_id_idx" ON "_projects_v_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_video_embed_items_order_idx" ON "_projects_v_blocks_video_embed_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_video_embed_items_parent_id_idx" ON "_projects_v_blocks_video_embed_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_video_embed_items_media_idx" ON "_projects_v_blocks_video_embed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_video_embed_items_locales_locale_parent_i" ON "_projects_v_blocks_video_embed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_video_embed_items_locales_parent_id_idx" ON "_projects_v_blocks_video_embed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_video_embed_order_idx" ON "_projects_v_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_video_embed_parent_id_idx" ON "_projects_v_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_video_embed_path_idx" ON "_projects_v_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_video_embed_media_idx" ON "_projects_v_blocks_video_embed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_video_embed_locales_locale_parent_id_uniq" ON "_projects_v_blocks_video_embed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_video_embed_locales_parent_id_idx" ON "_projects_v_blocks_video_embed_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_portfolio_feed_items_order_idx" ON "_projects_v_blocks_portfolio_feed_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_portfolio_feed_items_parent_id_idx" ON "_projects_v_blocks_portfolio_feed_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_portfolio_feed_items_media_idx" ON "_projects_v_blocks_portfolio_feed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_portfolio_feed_items_locales_locale_paren" ON "_projects_v_blocks_portfolio_feed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_portfolio_feed_items_locales_parent_i_idx" ON "_projects_v_blocks_portfolio_feed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_portfolio_feed_order_idx" ON "_projects_v_blocks_portfolio_feed" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_portfolio_feed_parent_id_idx" ON "_projects_v_blocks_portfolio_feed" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_portfolio_feed_path_idx" ON "_projects_v_blocks_portfolio_feed" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_portfolio_feed_media_idx" ON "_projects_v_blocks_portfolio_feed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_portfolio_feed_locales_locale_parent_id_u" ON "_projects_v_blocks_portfolio_feed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_portfolio_feed_locales_parent_id_idx" ON "_projects_v_blocks_portfolio_feed_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_news_feed_items_order_idx" ON "_projects_v_blocks_news_feed_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_news_feed_items_parent_id_idx" ON "_projects_v_blocks_news_feed_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_news_feed_items_media_idx" ON "_projects_v_blocks_news_feed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_news_feed_items_locales_locale_parent_id_" ON "_projects_v_blocks_news_feed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_news_feed_items_locales_parent_id_idx" ON "_projects_v_blocks_news_feed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_news_feed_order_idx" ON "_projects_v_blocks_news_feed" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_news_feed_parent_id_idx" ON "_projects_v_blocks_news_feed" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_news_feed_path_idx" ON "_projects_v_blocks_news_feed" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_news_feed_media_idx" ON "_projects_v_blocks_news_feed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_news_feed_locales_locale_parent_id_unique" ON "_projects_v_blocks_news_feed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_news_feed_locales_parent_id_idx" ON "_projects_v_blocks_news_feed_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_faq_items_order_idx" ON "_projects_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_faq_items_parent_id_idx" ON "_projects_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_faq_items_media_idx" ON "_projects_v_blocks_faq_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_projects_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_faq_items_locales_parent_id_idx" ON "_projects_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_faq_order_idx" ON "_projects_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_faq_parent_id_idx" ON "_projects_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_faq_path_idx" ON "_projects_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_faq_media_idx" ON "_projects_v_blocks_faq_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_faq_locales_locale_parent_id_unique" ON "_projects_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_faq_locales_parent_id_idx" ON "_projects_v_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_call_to_action_items_order_idx" ON "_projects_v_blocks_call_to_action_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_call_to_action_items_parent_id_idx" ON "_projects_v_blocks_call_to_action_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_call_to_action_items_media_idx" ON "_projects_v_blocks_call_to_action_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_call_to_action_items_locales_locale_paren" ON "_projects_v_blocks_call_to_action_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_call_to_action_items_locales_parent_i_idx" ON "_projects_v_blocks_call_to_action_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_call_to_action_order_idx" ON "_projects_v_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_call_to_action_parent_id_idx" ON "_projects_v_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_call_to_action_path_idx" ON "_projects_v_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_call_to_action_media_idx" ON "_projects_v_blocks_call_to_action_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_call_to_action_locales_locale_parent_id_u" ON "_projects_v_blocks_call_to_action_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_call_to_action_locales_parent_id_idx" ON "_projects_v_blocks_call_to_action_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_community_showcase_items_order_idx" ON "_projects_v_blocks_community_showcase_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_community_showcase_items_parent_id_idx" ON "_projects_v_blocks_community_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_community_showcase_items_media_idx" ON "_projects_v_blocks_community_showcase_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_community_showcase_items_locales_locale_p" ON "_projects_v_blocks_community_showcase_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_community_showcase_items_locales_pare_idx" ON "_projects_v_blocks_community_showcase_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_community_showcase_order_idx" ON "_projects_v_blocks_community_showcase" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_community_showcase_parent_id_idx" ON "_projects_v_blocks_community_showcase" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_community_showcase_path_idx" ON "_projects_v_blocks_community_showcase" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_community_showcase_media_idx" ON "_projects_v_blocks_community_showcase_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_community_showcase_locales_locale_parent_" ON "_projects_v_blocks_community_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_community_showcase_locales_parent_id_idx" ON "_projects_v_blocks_community_showcase_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_key_idx" ON "_projects_v" USING btree ("version_key");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_snapshot_idx" ON "_projects_v" USING btree ("snapshot");
  CREATE INDEX "_projects_v_published_locale_idx" ON "_projects_v" USING btree ("published_locale");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v_locales" USING btree ("version_slug","_locale");
  CREATE INDEX "_projects_v_version_version_hero_media_idx" ON "_projects_v_locales" USING btree ("version_hero_media_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_locales_locale_parent_id_unique" ON "_projects_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_locales_parent_id_idx" ON "_projects_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_portfolio_categories_id_idx" ON "_projects_v_rels" USING btree ("portfolio_categories_id");
  CREATE INDEX "products_reviewed_locales_order_idx" ON "products_reviewed_locales" USING btree ("order");
  CREATE INDEX "products_reviewed_locales_parent_idx" ON "products_reviewed_locales" USING btree ("parent_id");
  CREATE INDEX "products_blocks_hero_items_order_idx" ON "products_blocks_hero_items" USING btree ("_order");
  CREATE INDEX "products_blocks_hero_items_parent_id_idx" ON "products_blocks_hero_items" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_hero_items_media_idx" ON "products_blocks_hero_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_hero_items_locales_locale_parent_id_unique" ON "products_blocks_hero_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_hero_items_locales_parent_id_idx" ON "products_blocks_hero_items_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_hero_order_idx" ON "products_blocks_hero" USING btree ("_order");
  CREATE INDEX "products_blocks_hero_parent_id_idx" ON "products_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_hero_path_idx" ON "products_blocks_hero" USING btree ("_path");
  CREATE INDEX "products_blocks_hero_media_idx" ON "products_blocks_hero_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_hero_locales_locale_parent_id_unique" ON "products_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_hero_locales_parent_id_idx" ON "products_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_rich_text_items_order_idx" ON "products_blocks_rich_text_items" USING btree ("_order");
  CREATE INDEX "products_blocks_rich_text_items_parent_id_idx" ON "products_blocks_rich_text_items" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_rich_text_items_media_idx" ON "products_blocks_rich_text_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_rich_text_items_locales_locale_parent_id_uni" ON "products_blocks_rich_text_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_rich_text_items_locales_parent_id_idx" ON "products_blocks_rich_text_items_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_rich_text_order_idx" ON "products_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "products_blocks_rich_text_parent_id_idx" ON "products_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_rich_text_path_idx" ON "products_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "products_blocks_rich_text_media_idx" ON "products_blocks_rich_text_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_rich_text_locales_locale_parent_id_unique" ON "products_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_rich_text_locales_parent_id_idx" ON "products_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_image_text_items_order_idx" ON "products_blocks_image_text_items" USING btree ("_order");
  CREATE INDEX "products_blocks_image_text_items_parent_id_idx" ON "products_blocks_image_text_items" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_image_text_items_media_idx" ON "products_blocks_image_text_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_image_text_items_locales_locale_parent_id_un" ON "products_blocks_image_text_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_image_text_items_locales_parent_id_idx" ON "products_blocks_image_text_items_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_image_text_order_idx" ON "products_blocks_image_text" USING btree ("_order");
  CREATE INDEX "products_blocks_image_text_parent_id_idx" ON "products_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_image_text_path_idx" ON "products_blocks_image_text" USING btree ("_path");
  CREATE INDEX "products_blocks_image_text_media_idx" ON "products_blocks_image_text_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_image_text_locales_locale_parent_id_unique" ON "products_blocks_image_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_image_text_locales_parent_id_idx" ON "products_blocks_image_text_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_feature_grid_items_order_idx" ON "products_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "products_blocks_feature_grid_items_parent_id_idx" ON "products_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_feature_grid_items_media_idx" ON "products_blocks_feature_grid_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_feature_grid_items_locales_locale_parent_id_" ON "products_blocks_feature_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_feature_grid_items_locales_parent_id_idx" ON "products_blocks_feature_grid_items_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_feature_grid_order_idx" ON "products_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "products_blocks_feature_grid_parent_id_idx" ON "products_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_feature_grid_path_idx" ON "products_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "products_blocks_feature_grid_media_idx" ON "products_blocks_feature_grid_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_feature_grid_locales_locale_parent_id_unique" ON "products_blocks_feature_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_feature_grid_locales_parent_id_idx" ON "products_blocks_feature_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_media_showcase_items_order_idx" ON "products_blocks_media_showcase_items" USING btree ("_order");
  CREATE INDEX "products_blocks_media_showcase_items_parent_id_idx" ON "products_blocks_media_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_media_showcase_items_media_idx" ON "products_blocks_media_showcase_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_media_showcase_items_locales_locale_parent_i" ON "products_blocks_media_showcase_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_media_showcase_items_locales_parent_id_idx" ON "products_blocks_media_showcase_items_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_media_showcase_order_idx" ON "products_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "products_blocks_media_showcase_parent_id_idx" ON "products_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_media_showcase_path_idx" ON "products_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "products_blocks_media_showcase_media_idx" ON "products_blocks_media_showcase_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_media_showcase_locales_locale_parent_id_uniq" ON "products_blocks_media_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_media_showcase_locales_parent_id_idx" ON "products_blocks_media_showcase_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_stats_items_order_idx" ON "products_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "products_blocks_stats_items_parent_id_idx" ON "products_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_stats_items_media_idx" ON "products_blocks_stats_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_stats_items_locales_locale_parent_id_unique" ON "products_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_stats_items_locales_parent_id_idx" ON "products_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_stats_order_idx" ON "products_blocks_stats" USING btree ("_order");
  CREATE INDEX "products_blocks_stats_parent_id_idx" ON "products_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_stats_path_idx" ON "products_blocks_stats" USING btree ("_path");
  CREATE INDEX "products_blocks_stats_media_idx" ON "products_blocks_stats_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_stats_locales_locale_parent_id_unique" ON "products_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_stats_locales_parent_id_idx" ON "products_blocks_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_gallery_items_order_idx" ON "products_blocks_gallery_items" USING btree ("_order");
  CREATE INDEX "products_blocks_gallery_items_parent_id_idx" ON "products_blocks_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_gallery_items_media_idx" ON "products_blocks_gallery_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_gallery_items_locales_locale_parent_id_uniqu" ON "products_blocks_gallery_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_gallery_items_locales_parent_id_idx" ON "products_blocks_gallery_items_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_gallery_order_idx" ON "products_blocks_gallery" USING btree ("_order");
  CREATE INDEX "products_blocks_gallery_parent_id_idx" ON "products_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_gallery_path_idx" ON "products_blocks_gallery" USING btree ("_path");
  CREATE INDEX "products_blocks_gallery_media_idx" ON "products_blocks_gallery_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_gallery_locales_locale_parent_id_unique" ON "products_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_gallery_locales_parent_id_idx" ON "products_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_video_embed_items_order_idx" ON "products_blocks_video_embed_items" USING btree ("_order");
  CREATE INDEX "products_blocks_video_embed_items_parent_id_idx" ON "products_blocks_video_embed_items" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_video_embed_items_media_idx" ON "products_blocks_video_embed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_video_embed_items_locales_locale_parent_id_u" ON "products_blocks_video_embed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_video_embed_items_locales_parent_id_idx" ON "products_blocks_video_embed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_video_embed_order_idx" ON "products_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "products_blocks_video_embed_parent_id_idx" ON "products_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_video_embed_path_idx" ON "products_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "products_blocks_video_embed_media_idx" ON "products_blocks_video_embed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_video_embed_locales_locale_parent_id_unique" ON "products_blocks_video_embed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_video_embed_locales_parent_id_idx" ON "products_blocks_video_embed_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_portfolio_feed_items_order_idx" ON "products_blocks_portfolio_feed_items" USING btree ("_order");
  CREATE INDEX "products_blocks_portfolio_feed_items_parent_id_idx" ON "products_blocks_portfolio_feed_items" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_portfolio_feed_items_media_idx" ON "products_blocks_portfolio_feed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_portfolio_feed_items_locales_locale_parent_i" ON "products_blocks_portfolio_feed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_portfolio_feed_items_locales_parent_id_idx" ON "products_blocks_portfolio_feed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_portfolio_feed_order_idx" ON "products_blocks_portfolio_feed" USING btree ("_order");
  CREATE INDEX "products_blocks_portfolio_feed_parent_id_idx" ON "products_blocks_portfolio_feed" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_portfolio_feed_path_idx" ON "products_blocks_portfolio_feed" USING btree ("_path");
  CREATE INDEX "products_blocks_portfolio_feed_media_idx" ON "products_blocks_portfolio_feed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_portfolio_feed_locales_locale_parent_id_uniq" ON "products_blocks_portfolio_feed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_portfolio_feed_locales_parent_id_idx" ON "products_blocks_portfolio_feed_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_news_feed_items_order_idx" ON "products_blocks_news_feed_items" USING btree ("_order");
  CREATE INDEX "products_blocks_news_feed_items_parent_id_idx" ON "products_blocks_news_feed_items" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_news_feed_items_media_idx" ON "products_blocks_news_feed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_news_feed_items_locales_locale_parent_id_uni" ON "products_blocks_news_feed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_news_feed_items_locales_parent_id_idx" ON "products_blocks_news_feed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_news_feed_order_idx" ON "products_blocks_news_feed" USING btree ("_order");
  CREATE INDEX "products_blocks_news_feed_parent_id_idx" ON "products_blocks_news_feed" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_news_feed_path_idx" ON "products_blocks_news_feed" USING btree ("_path");
  CREATE INDEX "products_blocks_news_feed_media_idx" ON "products_blocks_news_feed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_news_feed_locales_locale_parent_id_unique" ON "products_blocks_news_feed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_news_feed_locales_parent_id_idx" ON "products_blocks_news_feed_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_faq_items_order_idx" ON "products_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "products_blocks_faq_items_parent_id_idx" ON "products_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_faq_items_media_idx" ON "products_blocks_faq_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_faq_items_locales_locale_parent_id_unique" ON "products_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_faq_items_locales_parent_id_idx" ON "products_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_faq_order_idx" ON "products_blocks_faq" USING btree ("_order");
  CREATE INDEX "products_blocks_faq_parent_id_idx" ON "products_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_faq_path_idx" ON "products_blocks_faq" USING btree ("_path");
  CREATE INDEX "products_blocks_faq_media_idx" ON "products_blocks_faq_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_faq_locales_locale_parent_id_unique" ON "products_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_faq_locales_parent_id_idx" ON "products_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_call_to_action_items_order_idx" ON "products_blocks_call_to_action_items" USING btree ("_order");
  CREATE INDEX "products_blocks_call_to_action_items_parent_id_idx" ON "products_blocks_call_to_action_items" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_call_to_action_items_media_idx" ON "products_blocks_call_to_action_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_call_to_action_items_locales_locale_parent_i" ON "products_blocks_call_to_action_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_call_to_action_items_locales_parent_id_idx" ON "products_blocks_call_to_action_items_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_call_to_action_order_idx" ON "products_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "products_blocks_call_to_action_parent_id_idx" ON "products_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_call_to_action_path_idx" ON "products_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "products_blocks_call_to_action_media_idx" ON "products_blocks_call_to_action_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_call_to_action_locales_locale_parent_id_uniq" ON "products_blocks_call_to_action_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_call_to_action_locales_parent_id_idx" ON "products_blocks_call_to_action_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_community_showcase_items_order_idx" ON "products_blocks_community_showcase_items" USING btree ("_order");
  CREATE INDEX "products_blocks_community_showcase_items_parent_id_idx" ON "products_blocks_community_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_community_showcase_items_media_idx" ON "products_blocks_community_showcase_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_community_showcase_items_locales_locale_pare" ON "products_blocks_community_showcase_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_community_showcase_items_locales_parent__idx" ON "products_blocks_community_showcase_items_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_community_showcase_order_idx" ON "products_blocks_community_showcase" USING btree ("_order");
  CREATE INDEX "products_blocks_community_showcase_parent_id_idx" ON "products_blocks_community_showcase" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_community_showcase_path_idx" ON "products_blocks_community_showcase" USING btree ("_path");
  CREATE INDEX "products_blocks_community_showcase_media_idx" ON "products_blocks_community_showcase_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_community_showcase_locales_locale_parent_id_" ON "products_blocks_community_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_community_showcase_locales_parent_id_idx" ON "products_blocks_community_showcase_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_key_idx" ON "products" USING btree ("key");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products__status_idx" ON "products" USING btree ("_status");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products_locales" USING btree ("slug","_locale");
  CREATE INDEX "products_hero_media_idx" ON "products_locales" USING btree ("hero_media_id","_locale");
  CREATE UNIQUE INDEX "products_locales_locale_parent_id_unique" ON "products_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_locales_parent_id_idx" ON "products_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_reviewed_locales_order_idx" ON "_products_v_version_reviewed_locales" USING btree ("order");
  CREATE INDEX "_products_v_version_reviewed_locales_parent_idx" ON "_products_v_version_reviewed_locales" USING btree ("parent_id");
  CREATE INDEX "_products_v_blocks_hero_items_order_idx" ON "_products_v_blocks_hero_items" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_hero_items_parent_id_idx" ON "_products_v_blocks_hero_items" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_hero_items_media_idx" ON "_products_v_blocks_hero_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_hero_items_locales_locale_parent_id_uniqu" ON "_products_v_blocks_hero_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_hero_items_locales_parent_id_idx" ON "_products_v_blocks_hero_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_hero_order_idx" ON "_products_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_hero_parent_id_idx" ON "_products_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_hero_path_idx" ON "_products_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_hero_media_idx" ON "_products_v_blocks_hero_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_hero_locales_locale_parent_id_unique" ON "_products_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_hero_locales_parent_id_idx" ON "_products_v_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_rich_text_items_order_idx" ON "_products_v_blocks_rich_text_items" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_rich_text_items_parent_id_idx" ON "_products_v_blocks_rich_text_items" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_rich_text_items_media_idx" ON "_products_v_blocks_rich_text_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_rich_text_items_locales_locale_parent_id_" ON "_products_v_blocks_rich_text_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_rich_text_items_locales_parent_id_idx" ON "_products_v_blocks_rich_text_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_rich_text_order_idx" ON "_products_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_rich_text_parent_id_idx" ON "_products_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_rich_text_path_idx" ON "_products_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_rich_text_media_idx" ON "_products_v_blocks_rich_text_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_products_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_rich_text_locales_parent_id_idx" ON "_products_v_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_image_text_items_order_idx" ON "_products_v_blocks_image_text_items" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_image_text_items_parent_id_idx" ON "_products_v_blocks_image_text_items" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_image_text_items_media_idx" ON "_products_v_blocks_image_text_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_image_text_items_locales_locale_parent_id" ON "_products_v_blocks_image_text_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_image_text_items_locales_parent_id_idx" ON "_products_v_blocks_image_text_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_image_text_order_idx" ON "_products_v_blocks_image_text" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_image_text_parent_id_idx" ON "_products_v_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_image_text_path_idx" ON "_products_v_blocks_image_text" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_image_text_media_idx" ON "_products_v_blocks_image_text_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_image_text_locales_locale_parent_id_uniqu" ON "_products_v_blocks_image_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_image_text_locales_parent_id_idx" ON "_products_v_blocks_image_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_feature_grid_items_order_idx" ON "_products_v_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_feature_grid_items_parent_id_idx" ON "_products_v_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_feature_grid_items_media_idx" ON "_products_v_blocks_feature_grid_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_feature_grid_items_locales_locale_parent_" ON "_products_v_blocks_feature_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_feature_grid_items_locales_parent_id_idx" ON "_products_v_blocks_feature_grid_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_feature_grid_order_idx" ON "_products_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_feature_grid_parent_id_idx" ON "_products_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_feature_grid_path_idx" ON "_products_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_feature_grid_media_idx" ON "_products_v_blocks_feature_grid_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_feature_grid_locales_locale_parent_id_uni" ON "_products_v_blocks_feature_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_feature_grid_locales_parent_id_idx" ON "_products_v_blocks_feature_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_media_showcase_items_order_idx" ON "_products_v_blocks_media_showcase_items" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_media_showcase_items_parent_id_idx" ON "_products_v_blocks_media_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_media_showcase_items_media_idx" ON "_products_v_blocks_media_showcase_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_media_showcase_items_locales_locale_paren" ON "_products_v_blocks_media_showcase_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_media_showcase_items_locales_parent_i_idx" ON "_products_v_blocks_media_showcase_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_media_showcase_order_idx" ON "_products_v_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_media_showcase_parent_id_idx" ON "_products_v_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_media_showcase_path_idx" ON "_products_v_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_media_showcase_media_idx" ON "_products_v_blocks_media_showcase_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_media_showcase_locales_locale_parent_id_u" ON "_products_v_blocks_media_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_media_showcase_locales_parent_id_idx" ON "_products_v_blocks_media_showcase_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_stats_items_order_idx" ON "_products_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_stats_items_parent_id_idx" ON "_products_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_stats_items_media_idx" ON "_products_v_blocks_stats_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_stats_items_locales_locale_parent_id_uniq" ON "_products_v_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_stats_items_locales_parent_id_idx" ON "_products_v_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_stats_order_idx" ON "_products_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_stats_parent_id_idx" ON "_products_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_stats_path_idx" ON "_products_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_stats_media_idx" ON "_products_v_blocks_stats_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_stats_locales_locale_parent_id_unique" ON "_products_v_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_stats_locales_parent_id_idx" ON "_products_v_blocks_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_gallery_items_order_idx" ON "_products_v_blocks_gallery_items" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_gallery_items_parent_id_idx" ON "_products_v_blocks_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_gallery_items_media_idx" ON "_products_v_blocks_gallery_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_gallery_items_locales_locale_parent_id_un" ON "_products_v_blocks_gallery_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_gallery_items_locales_parent_id_idx" ON "_products_v_blocks_gallery_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_gallery_order_idx" ON "_products_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_gallery_parent_id_idx" ON "_products_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_gallery_path_idx" ON "_products_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_gallery_media_idx" ON "_products_v_blocks_gallery_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_gallery_locales_locale_parent_id_unique" ON "_products_v_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_gallery_locales_parent_id_idx" ON "_products_v_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_video_embed_items_order_idx" ON "_products_v_blocks_video_embed_items" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_video_embed_items_parent_id_idx" ON "_products_v_blocks_video_embed_items" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_video_embed_items_media_idx" ON "_products_v_blocks_video_embed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_video_embed_items_locales_locale_parent_i" ON "_products_v_blocks_video_embed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_video_embed_items_locales_parent_id_idx" ON "_products_v_blocks_video_embed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_video_embed_order_idx" ON "_products_v_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_video_embed_parent_id_idx" ON "_products_v_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_video_embed_path_idx" ON "_products_v_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_video_embed_media_idx" ON "_products_v_blocks_video_embed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_video_embed_locales_locale_parent_id_uniq" ON "_products_v_blocks_video_embed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_video_embed_locales_parent_id_idx" ON "_products_v_blocks_video_embed_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_portfolio_feed_items_order_idx" ON "_products_v_blocks_portfolio_feed_items" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_portfolio_feed_items_parent_id_idx" ON "_products_v_blocks_portfolio_feed_items" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_portfolio_feed_items_media_idx" ON "_products_v_blocks_portfolio_feed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_portfolio_feed_items_locales_locale_paren" ON "_products_v_blocks_portfolio_feed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_portfolio_feed_items_locales_parent_i_idx" ON "_products_v_blocks_portfolio_feed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_portfolio_feed_order_idx" ON "_products_v_blocks_portfolio_feed" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_portfolio_feed_parent_id_idx" ON "_products_v_blocks_portfolio_feed" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_portfolio_feed_path_idx" ON "_products_v_blocks_portfolio_feed" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_portfolio_feed_media_idx" ON "_products_v_blocks_portfolio_feed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_portfolio_feed_locales_locale_parent_id_u" ON "_products_v_blocks_portfolio_feed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_portfolio_feed_locales_parent_id_idx" ON "_products_v_blocks_portfolio_feed_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_news_feed_items_order_idx" ON "_products_v_blocks_news_feed_items" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_news_feed_items_parent_id_idx" ON "_products_v_blocks_news_feed_items" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_news_feed_items_media_idx" ON "_products_v_blocks_news_feed_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_news_feed_items_locales_locale_parent_id_" ON "_products_v_blocks_news_feed_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_news_feed_items_locales_parent_id_idx" ON "_products_v_blocks_news_feed_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_news_feed_order_idx" ON "_products_v_blocks_news_feed" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_news_feed_parent_id_idx" ON "_products_v_blocks_news_feed" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_news_feed_path_idx" ON "_products_v_blocks_news_feed" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_news_feed_media_idx" ON "_products_v_blocks_news_feed_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_news_feed_locales_locale_parent_id_unique" ON "_products_v_blocks_news_feed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_news_feed_locales_parent_id_idx" ON "_products_v_blocks_news_feed_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_faq_items_order_idx" ON "_products_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_faq_items_parent_id_idx" ON "_products_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_faq_items_media_idx" ON "_products_v_blocks_faq_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_products_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_faq_items_locales_parent_id_idx" ON "_products_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_faq_order_idx" ON "_products_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_faq_parent_id_idx" ON "_products_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_faq_path_idx" ON "_products_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_faq_media_idx" ON "_products_v_blocks_faq_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_faq_locales_locale_parent_id_unique" ON "_products_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_faq_locales_parent_id_idx" ON "_products_v_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_call_to_action_items_order_idx" ON "_products_v_blocks_call_to_action_items" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_call_to_action_items_parent_id_idx" ON "_products_v_blocks_call_to_action_items" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_call_to_action_items_media_idx" ON "_products_v_blocks_call_to_action_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_call_to_action_items_locales_locale_paren" ON "_products_v_blocks_call_to_action_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_call_to_action_items_locales_parent_i_idx" ON "_products_v_blocks_call_to_action_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_call_to_action_order_idx" ON "_products_v_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_call_to_action_parent_id_idx" ON "_products_v_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_call_to_action_path_idx" ON "_products_v_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_call_to_action_media_idx" ON "_products_v_blocks_call_to_action_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_call_to_action_locales_locale_parent_id_u" ON "_products_v_blocks_call_to_action_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_call_to_action_locales_parent_id_idx" ON "_products_v_blocks_call_to_action_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_community_showcase_items_order_idx" ON "_products_v_blocks_community_showcase_items" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_community_showcase_items_parent_id_idx" ON "_products_v_blocks_community_showcase_items" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_community_showcase_items_media_idx" ON "_products_v_blocks_community_showcase_items_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_community_showcase_items_locales_locale_p" ON "_products_v_blocks_community_showcase_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_community_showcase_items_locales_pare_idx" ON "_products_v_blocks_community_showcase_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_community_showcase_order_idx" ON "_products_v_blocks_community_showcase" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_community_showcase_parent_id_idx" ON "_products_v_blocks_community_showcase" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_community_showcase_path_idx" ON "_products_v_blocks_community_showcase" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_community_showcase_media_idx" ON "_products_v_blocks_community_showcase_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_community_showcase_locales_locale_parent_" ON "_products_v_blocks_community_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_community_showcase_locales_parent_id_idx" ON "_products_v_blocks_community_showcase_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_version_key_idx" ON "_products_v" USING btree ("version_key");
  CREATE INDEX "_products_v_version_version_updated_at_idx" ON "_products_v" USING btree ("version_updated_at");
  CREATE INDEX "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
  CREATE INDEX "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX "_products_v_snapshot_idx" ON "_products_v" USING btree ("snapshot");
  CREATE INDEX "_products_v_published_locale_idx" ON "_products_v" USING btree ("published_locale");
  CREATE INDEX "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
  CREATE INDEX "_products_v_version_version_slug_idx" ON "_products_v_locales" USING btree ("version_slug","_locale");
  CREATE INDEX "_products_v_version_version_hero_media_idx" ON "_products_v_locales" USING btree ("version_hero_media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_locales_locale_parent_id_unique" ON "_products_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_locales_parent_id_idx" ON "_products_v_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "post_categories_key_idx" ON "post_categories" USING btree ("key");
  CREATE INDEX "post_categories_updated_at_idx" ON "post_categories" USING btree ("updated_at");
  CREATE INDEX "post_categories_created_at_idx" ON "post_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "post_categories_locales_locale_parent_id_unique" ON "post_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "post_categories_locales_parent_id_idx" ON "post_categories_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "portfolio_categories_key_idx" ON "portfolio_categories" USING btree ("key");
  CREATE INDEX "portfolio_categories_updated_at_idx" ON "portfolio_categories" USING btree ("updated_at");
  CREATE INDEX "portfolio_categories_created_at_idx" ON "portfolio_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "portfolio_categories_locales_locale_parent_id_unique" ON "portfolio_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "portfolio_categories_locales_parent_id_idx" ON "portfolio_categories_locales" USING btree ("_parent_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE INDEX "audit_events_actor_idx" ON "audit_events" USING btree ("actor_id");
  CREATE INDEX "audit_events_updated_at_idx" ON "audit_events" USING btree ("updated_at");
  CREATE INDEX "audit_events_created_at_idx" ON "audit_events" USING btree ("created_at");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings__status_idx" ON "site_settings" USING btree ("_status");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_locales_parent_id_idx" ON "site_settings_locales" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_version_logo_idx" ON "_site_settings_v" USING btree ("version_logo_id");
  CREATE INDEX "_site_settings_v_version_version__status_idx" ON "_site_settings_v" USING btree ("version__status");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");
  CREATE INDEX "_site_settings_v_snapshot_idx" ON "_site_settings_v" USING btree ("snapshot");
  CREATE INDEX "_site_settings_v_published_locale_idx" ON "_site_settings_v" USING btree ("published_locale");
  CREATE INDEX "_site_settings_v_latest_idx" ON "_site_settings_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_site_settings_v_locales_locale_parent_id_unique" ON "_site_settings_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_locales_parent_id_idx" ON "_site_settings_v_locales" USING btree ("_parent_id");
  CREATE INDEX "company_profile_logo_idx" ON "company_profile" USING btree ("logo_id");
  CREATE INDEX "company_profile__status_idx" ON "company_profile" USING btree ("_status");
  CREATE UNIQUE INDEX "company_profile_locales_locale_parent_id_unique" ON "company_profile_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "company_profile_locales_parent_id_idx" ON "company_profile_locales" USING btree ("_parent_id");
  CREATE INDEX "_company_profile_v_version_version_logo_idx" ON "_company_profile_v" USING btree ("version_logo_id");
  CREATE INDEX "_company_profile_v_version_version__status_idx" ON "_company_profile_v" USING btree ("version__status");
  CREATE INDEX "_company_profile_v_created_at_idx" ON "_company_profile_v" USING btree ("created_at");
  CREATE INDEX "_company_profile_v_updated_at_idx" ON "_company_profile_v" USING btree ("updated_at");
  CREATE INDEX "_company_profile_v_snapshot_idx" ON "_company_profile_v" USING btree ("snapshot");
  CREATE INDEX "_company_profile_v_published_locale_idx" ON "_company_profile_v" USING btree ("published_locale");
  CREATE INDEX "_company_profile_v_latest_idx" ON "_company_profile_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_company_profile_v_locales_locale_parent_id_unique" ON "_company_profile_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_company_profile_v_locales_parent_id_idx" ON "_company_profile_v_locales" USING btree ("_parent_id");
  CREATE INDEX "header_navigation_links_order_idx" ON "header_navigation_links" USING btree ("_order");
  CREATE INDEX "header_navigation_links_parent_id_idx" ON "header_navigation_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_navigation_links_locales_locale_parent_id_unique" ON "header_navigation_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_navigation_links_locales_parent_id_idx" ON "header_navigation_links_locales" USING btree ("_parent_id");
  CREATE INDEX "header_navigation__status_idx" ON "header_navigation" USING btree ("_status");
  CREATE INDEX "_header_navigation_v_version_links_order_idx" ON "_header_navigation_v_version_links" USING btree ("_order");
  CREATE INDEX "_header_navigation_v_version_links_parent_id_idx" ON "_header_navigation_v_version_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_header_navigation_v_version_links_locales_locale_parent_id_" ON "_header_navigation_v_version_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_header_navigation_v_version_links_locales_parent_id_idx" ON "_header_navigation_v_version_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_header_navigation_v_version_version__status_idx" ON "_header_navigation_v" USING btree ("version__status");
  CREATE INDEX "_header_navigation_v_created_at_idx" ON "_header_navigation_v" USING btree ("created_at");
  CREATE INDEX "_header_navigation_v_updated_at_idx" ON "_header_navigation_v" USING btree ("updated_at");
  CREATE INDEX "_header_navigation_v_snapshot_idx" ON "_header_navigation_v" USING btree ("snapshot");
  CREATE INDEX "_header_navigation_v_published_locale_idx" ON "_header_navigation_v" USING btree ("published_locale");
  CREATE INDEX "_header_navigation_v_latest_idx" ON "_header_navigation_v" USING btree ("latest");
  CREATE INDEX "footer_navigation_links_order_idx" ON "footer_navigation_links" USING btree ("_order");
  CREATE INDEX "footer_navigation_links_parent_id_idx" ON "footer_navigation_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_navigation_links_locales_locale_parent_id_unique" ON "footer_navigation_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_navigation_links_locales_parent_id_idx" ON "footer_navigation_links_locales" USING btree ("_parent_id");
  CREATE INDEX "footer_navigation__status_idx" ON "footer_navigation" USING btree ("_status");
  CREATE INDEX "_footer_navigation_v_version_links_order_idx" ON "_footer_navigation_v_version_links" USING btree ("_order");
  CREATE INDEX "_footer_navigation_v_version_links_parent_id_idx" ON "_footer_navigation_v_version_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_footer_navigation_v_version_links_locales_locale_parent_id_" ON "_footer_navigation_v_version_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_footer_navigation_v_version_links_locales_parent_id_idx" ON "_footer_navigation_v_version_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_footer_navigation_v_version_version__status_idx" ON "_footer_navigation_v" USING btree ("version__status");
  CREATE INDEX "_footer_navigation_v_created_at_idx" ON "_footer_navigation_v" USING btree ("created_at");
  CREATE INDEX "_footer_navigation_v_updated_at_idx" ON "_footer_navigation_v" USING btree ("updated_at");
  CREATE INDEX "_footer_navigation_v_snapshot_idx" ON "_footer_navigation_v" USING btree ("snapshot");
  CREATE INDEX "_footer_navigation_v_published_locale_idx" ON "_footer_navigation_v" USING btree ("published_locale");
  CREATE INDEX "_footer_navigation_v_latest_idx" ON "_footer_navigation_v" USING btree ("latest");
  CREATE INDEX "contact_settings_logo_idx" ON "contact_settings" USING btree ("logo_id");
  CREATE INDEX "contact_settings__status_idx" ON "contact_settings" USING btree ("_status");
  CREATE UNIQUE INDEX "contact_settings_locales_locale_parent_id_unique" ON "contact_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_settings_locales_parent_id_idx" ON "contact_settings_locales" USING btree ("_parent_id");
  CREATE INDEX "_contact_settings_v_version_version_logo_idx" ON "_contact_settings_v" USING btree ("version_logo_id");
  CREATE INDEX "_contact_settings_v_version_version__status_idx" ON "_contact_settings_v" USING btree ("version__status");
  CREATE INDEX "_contact_settings_v_created_at_idx" ON "_contact_settings_v" USING btree ("created_at");
  CREATE INDEX "_contact_settings_v_updated_at_idx" ON "_contact_settings_v" USING btree ("updated_at");
  CREATE INDEX "_contact_settings_v_snapshot_idx" ON "_contact_settings_v" USING btree ("snapshot");
  CREATE INDEX "_contact_settings_v_published_locale_idx" ON "_contact_settings_v" USING btree ("published_locale");
  CREATE INDEX "_contact_settings_v_latest_idx" ON "_contact_settings_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_contact_settings_v_locales_locale_parent_id_unique" ON "_contact_settings_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contact_settings_v_locales_parent_id_idx" ON "_contact_settings_v_locales" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_portfolio_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_post_categories_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_portfolio_categories_fk" FOREIGN KEY ("portfolio_categories_id") REFERENCES "public"."portfolio_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audit_events_fk" FOREIGN KEY ("audit_events_id") REFERENCES "public"."audit_events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_post_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("post_categories_id");
  CREATE INDEX "payload_locked_documents_rels_portfolio_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("portfolio_categories_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_audit_events_id_idx" ON "payload_locked_documents_rels" USING btree ("audit_events_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_reviewed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_rich_text_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_rich_text_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_rich_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_text_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_text_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_grid_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_media_showcase_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_media_showcase_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_media_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_media_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_gallery_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_gallery_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_video_embed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_video_embed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_video_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_video_embed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_portfolio_feed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_portfolio_feed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_portfolio_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_portfolio_feed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_news_feed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_news_feed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_news_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_news_feed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_call_to_action_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_call_to_action_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_call_to_action" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_call_to_action_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_community_showcase_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_community_showcase_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_community_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_community_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_reviewed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_rich_text_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_rich_text_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_rich_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_text_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_text_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_grid_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_media_showcase_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_media_showcase_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_media_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_media_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_gallery_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_gallery_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_video_embed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_video_embed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_video_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_video_embed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_portfolio_feed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_portfolio_feed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_portfolio_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_portfolio_feed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_news_feed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_news_feed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_news_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_news_feed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_call_to_action_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_call_to_action_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_call_to_action" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_call_to_action_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_community_showcase_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_community_showcase_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_community_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_community_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_reviewed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_hero_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_hero_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_rich_text_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_rich_text_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_rich_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_image_text_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_image_text_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_image_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_feature_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_feature_grid_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_feature_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_feature_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_media_showcase_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_media_showcase_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_media_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_media_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_stats_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_gallery_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_gallery_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_video_embed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_video_embed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_video_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_video_embed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_portfolio_feed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_portfolio_feed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_portfolio_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_portfolio_feed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_news_feed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_news_feed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_news_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_news_feed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_call_to_action_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_call_to_action_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_call_to_action" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_call_to_action_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_community_showcase_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_community_showcase_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_community_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_community_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_reviewed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_hero_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_hero_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_rich_text_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_rich_text_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_rich_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_image_text_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_image_text_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_image_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_feature_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_feature_grid_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_feature_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_feature_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_media_showcase_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_media_showcase_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_media_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_media_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_stats_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_gallery_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_gallery_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_video_embed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_video_embed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_video_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_video_embed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_portfolio_feed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_portfolio_feed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_portfolio_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_portfolio_feed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_news_feed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_news_feed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_news_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_news_feed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_call_to_action_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_call_to_action_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_call_to_action" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_call_to_action_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_community_showcase_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_community_showcase_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_community_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_community_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_reviewed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_hero_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_hero_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_rich_text_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_rich_text_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_rich_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_image_text_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_image_text_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_image_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_feature_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_feature_grid_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_feature_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_feature_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_media_showcase_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_media_showcase_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_media_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_media_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_stats_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_gallery_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_gallery_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_video_embed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_video_embed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_video_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_video_embed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_portfolio_feed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_portfolio_feed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_portfolio_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_portfolio_feed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_news_feed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_news_feed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_news_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_news_feed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_call_to_action_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_call_to_action_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_call_to_action" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_call_to_action_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_community_showcase_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_community_showcase_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_community_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_community_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_version_reviewed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_hero_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_hero_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_rich_text_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_rich_text_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_rich_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_image_text_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_image_text_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_image_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_feature_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_feature_grid_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_feature_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_feature_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_media_showcase_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_media_showcase_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_media_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_media_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_stats_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_gallery_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_gallery_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_video_embed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_video_embed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_video_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_video_embed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_portfolio_feed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_portfolio_feed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_portfolio_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_portfolio_feed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_news_feed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_news_feed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_news_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_news_feed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_call_to_action_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_call_to_action_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_call_to_action" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_call_to_action_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_community_showcase_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_community_showcase_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_community_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_community_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_reviewed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_hero_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_hero_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_rich_text_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_rich_text_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_rich_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_image_text_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_image_text_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_image_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_feature_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_feature_grid_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_feature_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_feature_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_media_showcase_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_media_showcase_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_media_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_media_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_stats_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_gallery_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_gallery_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_video_embed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_video_embed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_video_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_video_embed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_portfolio_feed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_portfolio_feed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_portfolio_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_portfolio_feed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_news_feed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_news_feed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_news_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_news_feed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_call_to_action_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_call_to_action_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_call_to_action" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_call_to_action_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_community_showcase_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_community_showcase_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_community_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_community_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_reviewed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_hero_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_hero_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_rich_text_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_rich_text_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_rich_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_image_text_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_image_text_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_image_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_feature_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_feature_grid_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_feature_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_feature_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_media_showcase_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_media_showcase_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_media_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_media_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_stats_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_gallery_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_gallery_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_video_embed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_video_embed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_video_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_video_embed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_portfolio_feed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_portfolio_feed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_portfolio_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_portfolio_feed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_news_feed_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_news_feed_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_news_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_news_feed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_call_to_action_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_call_to_action_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_call_to_action" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_call_to_action_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_community_showcase_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_community_showcase_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_community_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_community_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "post_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "post_categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "portfolio_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "portfolio_categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "audit_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "company_profile" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "company_profile_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_company_profile_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_company_profile_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_navigation_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_navigation_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_header_navigation_v_version_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_header_navigation_v_version_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_header_navigation_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_navigation_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_navigation_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_navigation_v_version_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_navigation_v_version_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_navigation_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_settings_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contact_settings_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contact_settings_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_reviewed_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_items" CASCADE;
  DROP TABLE "pages_blocks_hero_items_locales" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_rich_text_items" CASCADE;
  DROP TABLE "pages_blocks_rich_text_items_locales" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_rich_text_locales" CASCADE;
  DROP TABLE "pages_blocks_image_text_items" CASCADE;
  DROP TABLE "pages_blocks_image_text_items_locales" CASCADE;
  DROP TABLE "pages_blocks_image_text" CASCADE;
  DROP TABLE "pages_blocks_image_text_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_items" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_items_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_grid" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_media_showcase_items" CASCADE;
  DROP TABLE "pages_blocks_media_showcase_items_locales" CASCADE;
  DROP TABLE "pages_blocks_media_showcase" CASCADE;
  DROP TABLE "pages_blocks_media_showcase_locales" CASCADE;
  DROP TABLE "pages_blocks_stats_items" CASCADE;
  DROP TABLE "pages_blocks_stats_items_locales" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery_items" CASCADE;
  DROP TABLE "pages_blocks_gallery_items_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_gallery_locales" CASCADE;
  DROP TABLE "pages_blocks_video_embed_items" CASCADE;
  DROP TABLE "pages_blocks_video_embed_items_locales" CASCADE;
  DROP TABLE "pages_blocks_video_embed" CASCADE;
  DROP TABLE "pages_blocks_video_embed_locales" CASCADE;
  DROP TABLE "pages_blocks_portfolio_feed_items" CASCADE;
  DROP TABLE "pages_blocks_portfolio_feed_items_locales" CASCADE;
  DROP TABLE "pages_blocks_portfolio_feed" CASCADE;
  DROP TABLE "pages_blocks_portfolio_feed_locales" CASCADE;
  DROP TABLE "pages_blocks_news_feed_items" CASCADE;
  DROP TABLE "pages_blocks_news_feed_items_locales" CASCADE;
  DROP TABLE "pages_blocks_news_feed" CASCADE;
  DROP TABLE "pages_blocks_news_feed_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq_items_locales" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_faq_locales" CASCADE;
  DROP TABLE "pages_blocks_call_to_action_items" CASCADE;
  DROP TABLE "pages_blocks_call_to_action_items_locales" CASCADE;
  DROP TABLE "pages_blocks_call_to_action" CASCADE;
  DROP TABLE "pages_blocks_call_to_action_locales" CASCADE;
  DROP TABLE "pages_blocks_community_showcase_items" CASCADE;
  DROP TABLE "pages_blocks_community_showcase_items_locales" CASCADE;
  DROP TABLE "pages_blocks_community_showcase" CASCADE;
  DROP TABLE "pages_blocks_community_showcase_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v_version_reviewed_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_items" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_items" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text_items" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_media_showcase_items" CASCADE;
  DROP TABLE "_pages_v_blocks_media_showcase_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_media_showcase" CASCADE;
  DROP TABLE "_pages_v_blocks_media_showcase_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_items" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_video_embed_items" CASCADE;
  DROP TABLE "_pages_v_blocks_video_embed_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_video_embed" CASCADE;
  DROP TABLE "_pages_v_blocks_video_embed_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_portfolio_feed_items" CASCADE;
  DROP TABLE "_pages_v_blocks_portfolio_feed_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_portfolio_feed" CASCADE;
  DROP TABLE "_pages_v_blocks_portfolio_feed_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_news_feed_items" CASCADE;
  DROP TABLE "_pages_v_blocks_news_feed_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_news_feed" CASCADE;
  DROP TABLE "_pages_v_blocks_news_feed_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_action_items" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_action_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_action" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_action_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_community_showcase_items" CASCADE;
  DROP TABLE "_pages_v_blocks_community_showcase_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_community_showcase" CASCADE;
  DROP TABLE "_pages_v_blocks_community_showcase_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "posts_reviewed_locales" CASCADE;
  DROP TABLE "posts_blocks_hero_items" CASCADE;
  DROP TABLE "posts_blocks_hero_items_locales" CASCADE;
  DROP TABLE "posts_blocks_hero" CASCADE;
  DROP TABLE "posts_blocks_hero_locales" CASCADE;
  DROP TABLE "posts_blocks_rich_text_items" CASCADE;
  DROP TABLE "posts_blocks_rich_text_items_locales" CASCADE;
  DROP TABLE "posts_blocks_rich_text" CASCADE;
  DROP TABLE "posts_blocks_rich_text_locales" CASCADE;
  DROP TABLE "posts_blocks_image_text_items" CASCADE;
  DROP TABLE "posts_blocks_image_text_items_locales" CASCADE;
  DROP TABLE "posts_blocks_image_text" CASCADE;
  DROP TABLE "posts_blocks_image_text_locales" CASCADE;
  DROP TABLE "posts_blocks_feature_grid_items" CASCADE;
  DROP TABLE "posts_blocks_feature_grid_items_locales" CASCADE;
  DROP TABLE "posts_blocks_feature_grid" CASCADE;
  DROP TABLE "posts_blocks_feature_grid_locales" CASCADE;
  DROP TABLE "posts_blocks_media_showcase_items" CASCADE;
  DROP TABLE "posts_blocks_media_showcase_items_locales" CASCADE;
  DROP TABLE "posts_blocks_media_showcase" CASCADE;
  DROP TABLE "posts_blocks_media_showcase_locales" CASCADE;
  DROP TABLE "posts_blocks_stats_items" CASCADE;
  DROP TABLE "posts_blocks_stats_items_locales" CASCADE;
  DROP TABLE "posts_blocks_stats" CASCADE;
  DROP TABLE "posts_blocks_stats_locales" CASCADE;
  DROP TABLE "posts_blocks_gallery_items" CASCADE;
  DROP TABLE "posts_blocks_gallery_items_locales" CASCADE;
  DROP TABLE "posts_blocks_gallery" CASCADE;
  DROP TABLE "posts_blocks_gallery_locales" CASCADE;
  DROP TABLE "posts_blocks_video_embed_items" CASCADE;
  DROP TABLE "posts_blocks_video_embed_items_locales" CASCADE;
  DROP TABLE "posts_blocks_video_embed" CASCADE;
  DROP TABLE "posts_blocks_video_embed_locales" CASCADE;
  DROP TABLE "posts_blocks_portfolio_feed_items" CASCADE;
  DROP TABLE "posts_blocks_portfolio_feed_items_locales" CASCADE;
  DROP TABLE "posts_blocks_portfolio_feed" CASCADE;
  DROP TABLE "posts_blocks_portfolio_feed_locales" CASCADE;
  DROP TABLE "posts_blocks_news_feed_items" CASCADE;
  DROP TABLE "posts_blocks_news_feed_items_locales" CASCADE;
  DROP TABLE "posts_blocks_news_feed" CASCADE;
  DROP TABLE "posts_blocks_news_feed_locales" CASCADE;
  DROP TABLE "posts_blocks_faq_items" CASCADE;
  DROP TABLE "posts_blocks_faq_items_locales" CASCADE;
  DROP TABLE "posts_blocks_faq" CASCADE;
  DROP TABLE "posts_blocks_faq_locales" CASCADE;
  DROP TABLE "posts_blocks_call_to_action_items" CASCADE;
  DROP TABLE "posts_blocks_call_to_action_items_locales" CASCADE;
  DROP TABLE "posts_blocks_call_to_action" CASCADE;
  DROP TABLE "posts_blocks_call_to_action_locales" CASCADE;
  DROP TABLE "posts_blocks_community_showcase_items" CASCADE;
  DROP TABLE "posts_blocks_community_showcase_items_locales" CASCADE;
  DROP TABLE "posts_blocks_community_showcase" CASCADE;
  DROP TABLE "posts_blocks_community_showcase_locales" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_version_reviewed_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_hero_items" CASCADE;
  DROP TABLE "_posts_v_blocks_hero_items_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_hero" CASCADE;
  DROP TABLE "_posts_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_rich_text_items" CASCADE;
  DROP TABLE "_posts_v_blocks_rich_text_items_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_rich_text" CASCADE;
  DROP TABLE "_posts_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_image_text_items" CASCADE;
  DROP TABLE "_posts_v_blocks_image_text_items_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_image_text" CASCADE;
  DROP TABLE "_posts_v_blocks_image_text_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_feature_grid_items" CASCADE;
  DROP TABLE "_posts_v_blocks_feature_grid_items_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_posts_v_blocks_feature_grid_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_media_showcase_items" CASCADE;
  DROP TABLE "_posts_v_blocks_media_showcase_items_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_media_showcase" CASCADE;
  DROP TABLE "_posts_v_blocks_media_showcase_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_stats_items" CASCADE;
  DROP TABLE "_posts_v_blocks_stats_items_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_stats" CASCADE;
  DROP TABLE "_posts_v_blocks_stats_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_gallery_items" CASCADE;
  DROP TABLE "_posts_v_blocks_gallery_items_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_gallery" CASCADE;
  DROP TABLE "_posts_v_blocks_gallery_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_video_embed_items" CASCADE;
  DROP TABLE "_posts_v_blocks_video_embed_items_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_video_embed" CASCADE;
  DROP TABLE "_posts_v_blocks_video_embed_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_portfolio_feed_items" CASCADE;
  DROP TABLE "_posts_v_blocks_portfolio_feed_items_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_portfolio_feed" CASCADE;
  DROP TABLE "_posts_v_blocks_portfolio_feed_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_news_feed_items" CASCADE;
  DROP TABLE "_posts_v_blocks_news_feed_items_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_news_feed" CASCADE;
  DROP TABLE "_posts_v_blocks_news_feed_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_faq_items" CASCADE;
  DROP TABLE "_posts_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_faq" CASCADE;
  DROP TABLE "_posts_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_call_to_action_items" CASCADE;
  DROP TABLE "_posts_v_blocks_call_to_action_items_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_call_to_action" CASCADE;
  DROP TABLE "_posts_v_blocks_call_to_action_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_community_showcase_items" CASCADE;
  DROP TABLE "_posts_v_blocks_community_showcase_items_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_community_showcase" CASCADE;
  DROP TABLE "_posts_v_blocks_community_showcase_locales" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "projects_reviewed_locales" CASCADE;
  DROP TABLE "projects_blocks_hero_items" CASCADE;
  DROP TABLE "projects_blocks_hero_items_locales" CASCADE;
  DROP TABLE "projects_blocks_hero" CASCADE;
  DROP TABLE "projects_blocks_hero_locales" CASCADE;
  DROP TABLE "projects_blocks_rich_text_items" CASCADE;
  DROP TABLE "projects_blocks_rich_text_items_locales" CASCADE;
  DROP TABLE "projects_blocks_rich_text" CASCADE;
  DROP TABLE "projects_blocks_rich_text_locales" CASCADE;
  DROP TABLE "projects_blocks_image_text_items" CASCADE;
  DROP TABLE "projects_blocks_image_text_items_locales" CASCADE;
  DROP TABLE "projects_blocks_image_text" CASCADE;
  DROP TABLE "projects_blocks_image_text_locales" CASCADE;
  DROP TABLE "projects_blocks_feature_grid_items" CASCADE;
  DROP TABLE "projects_blocks_feature_grid_items_locales" CASCADE;
  DROP TABLE "projects_blocks_feature_grid" CASCADE;
  DROP TABLE "projects_blocks_feature_grid_locales" CASCADE;
  DROP TABLE "projects_blocks_media_showcase_items" CASCADE;
  DROP TABLE "projects_blocks_media_showcase_items_locales" CASCADE;
  DROP TABLE "projects_blocks_media_showcase" CASCADE;
  DROP TABLE "projects_blocks_media_showcase_locales" CASCADE;
  DROP TABLE "projects_blocks_stats_items" CASCADE;
  DROP TABLE "projects_blocks_stats_items_locales" CASCADE;
  DROP TABLE "projects_blocks_stats" CASCADE;
  DROP TABLE "projects_blocks_stats_locales" CASCADE;
  DROP TABLE "projects_blocks_gallery_items" CASCADE;
  DROP TABLE "projects_blocks_gallery_items_locales" CASCADE;
  DROP TABLE "projects_blocks_gallery" CASCADE;
  DROP TABLE "projects_blocks_gallery_locales" CASCADE;
  DROP TABLE "projects_blocks_video_embed_items" CASCADE;
  DROP TABLE "projects_blocks_video_embed_items_locales" CASCADE;
  DROP TABLE "projects_blocks_video_embed" CASCADE;
  DROP TABLE "projects_blocks_video_embed_locales" CASCADE;
  DROP TABLE "projects_blocks_portfolio_feed_items" CASCADE;
  DROP TABLE "projects_blocks_portfolio_feed_items_locales" CASCADE;
  DROP TABLE "projects_blocks_portfolio_feed" CASCADE;
  DROP TABLE "projects_blocks_portfolio_feed_locales" CASCADE;
  DROP TABLE "projects_blocks_news_feed_items" CASCADE;
  DROP TABLE "projects_blocks_news_feed_items_locales" CASCADE;
  DROP TABLE "projects_blocks_news_feed" CASCADE;
  DROP TABLE "projects_blocks_news_feed_locales" CASCADE;
  DROP TABLE "projects_blocks_faq_items" CASCADE;
  DROP TABLE "projects_blocks_faq_items_locales" CASCADE;
  DROP TABLE "projects_blocks_faq" CASCADE;
  DROP TABLE "projects_blocks_faq_locales" CASCADE;
  DROP TABLE "projects_blocks_call_to_action_items" CASCADE;
  DROP TABLE "projects_blocks_call_to_action_items_locales" CASCADE;
  DROP TABLE "projects_blocks_call_to_action" CASCADE;
  DROP TABLE "projects_blocks_call_to_action_locales" CASCADE;
  DROP TABLE "projects_blocks_community_showcase_items" CASCADE;
  DROP TABLE "projects_blocks_community_showcase_items_locales" CASCADE;
  DROP TABLE "projects_blocks_community_showcase" CASCADE;
  DROP TABLE "projects_blocks_community_showcase_locales" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_reviewed_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_hero_items" CASCADE;
  DROP TABLE "_projects_v_blocks_hero_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_hero" CASCADE;
  DROP TABLE "_projects_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_rich_text_items" CASCADE;
  DROP TABLE "_projects_v_blocks_rich_text_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_rich_text" CASCADE;
  DROP TABLE "_projects_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_image_text_items" CASCADE;
  DROP TABLE "_projects_v_blocks_image_text_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_image_text" CASCADE;
  DROP TABLE "_projects_v_blocks_image_text_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_feature_grid_items" CASCADE;
  DROP TABLE "_projects_v_blocks_feature_grid_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_projects_v_blocks_feature_grid_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_media_showcase_items" CASCADE;
  DROP TABLE "_projects_v_blocks_media_showcase_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_media_showcase" CASCADE;
  DROP TABLE "_projects_v_blocks_media_showcase_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_stats_items" CASCADE;
  DROP TABLE "_projects_v_blocks_stats_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_stats" CASCADE;
  DROP TABLE "_projects_v_blocks_stats_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery_items" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_video_embed_items" CASCADE;
  DROP TABLE "_projects_v_blocks_video_embed_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_video_embed" CASCADE;
  DROP TABLE "_projects_v_blocks_video_embed_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_portfolio_feed_items" CASCADE;
  DROP TABLE "_projects_v_blocks_portfolio_feed_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_portfolio_feed" CASCADE;
  DROP TABLE "_projects_v_blocks_portfolio_feed_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_news_feed_items" CASCADE;
  DROP TABLE "_projects_v_blocks_news_feed_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_news_feed" CASCADE;
  DROP TABLE "_projects_v_blocks_news_feed_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_faq_items" CASCADE;
  DROP TABLE "_projects_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_faq" CASCADE;
  DROP TABLE "_projects_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_call_to_action_items" CASCADE;
  DROP TABLE "_projects_v_blocks_call_to_action_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_call_to_action" CASCADE;
  DROP TABLE "_projects_v_blocks_call_to_action_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_community_showcase_items" CASCADE;
  DROP TABLE "_projects_v_blocks_community_showcase_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_community_showcase" CASCADE;
  DROP TABLE "_projects_v_blocks_community_showcase_locales" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_locales" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "products_reviewed_locales" CASCADE;
  DROP TABLE "products_blocks_hero_items" CASCADE;
  DROP TABLE "products_blocks_hero_items_locales" CASCADE;
  DROP TABLE "products_blocks_hero" CASCADE;
  DROP TABLE "products_blocks_hero_locales" CASCADE;
  DROP TABLE "products_blocks_rich_text_items" CASCADE;
  DROP TABLE "products_blocks_rich_text_items_locales" CASCADE;
  DROP TABLE "products_blocks_rich_text" CASCADE;
  DROP TABLE "products_blocks_rich_text_locales" CASCADE;
  DROP TABLE "products_blocks_image_text_items" CASCADE;
  DROP TABLE "products_blocks_image_text_items_locales" CASCADE;
  DROP TABLE "products_blocks_image_text" CASCADE;
  DROP TABLE "products_blocks_image_text_locales" CASCADE;
  DROP TABLE "products_blocks_feature_grid_items" CASCADE;
  DROP TABLE "products_blocks_feature_grid_items_locales" CASCADE;
  DROP TABLE "products_blocks_feature_grid" CASCADE;
  DROP TABLE "products_blocks_feature_grid_locales" CASCADE;
  DROP TABLE "products_blocks_media_showcase_items" CASCADE;
  DROP TABLE "products_blocks_media_showcase_items_locales" CASCADE;
  DROP TABLE "products_blocks_media_showcase" CASCADE;
  DROP TABLE "products_blocks_media_showcase_locales" CASCADE;
  DROP TABLE "products_blocks_stats_items" CASCADE;
  DROP TABLE "products_blocks_stats_items_locales" CASCADE;
  DROP TABLE "products_blocks_stats" CASCADE;
  DROP TABLE "products_blocks_stats_locales" CASCADE;
  DROP TABLE "products_blocks_gallery_items" CASCADE;
  DROP TABLE "products_blocks_gallery_items_locales" CASCADE;
  DROP TABLE "products_blocks_gallery" CASCADE;
  DROP TABLE "products_blocks_gallery_locales" CASCADE;
  DROP TABLE "products_blocks_video_embed_items" CASCADE;
  DROP TABLE "products_blocks_video_embed_items_locales" CASCADE;
  DROP TABLE "products_blocks_video_embed" CASCADE;
  DROP TABLE "products_blocks_video_embed_locales" CASCADE;
  DROP TABLE "products_blocks_portfolio_feed_items" CASCADE;
  DROP TABLE "products_blocks_portfolio_feed_items_locales" CASCADE;
  DROP TABLE "products_blocks_portfolio_feed" CASCADE;
  DROP TABLE "products_blocks_portfolio_feed_locales" CASCADE;
  DROP TABLE "products_blocks_news_feed_items" CASCADE;
  DROP TABLE "products_blocks_news_feed_items_locales" CASCADE;
  DROP TABLE "products_blocks_news_feed" CASCADE;
  DROP TABLE "products_blocks_news_feed_locales" CASCADE;
  DROP TABLE "products_blocks_faq_items" CASCADE;
  DROP TABLE "products_blocks_faq_items_locales" CASCADE;
  DROP TABLE "products_blocks_faq" CASCADE;
  DROP TABLE "products_blocks_faq_locales" CASCADE;
  DROP TABLE "products_blocks_call_to_action_items" CASCADE;
  DROP TABLE "products_blocks_call_to_action_items_locales" CASCADE;
  DROP TABLE "products_blocks_call_to_action" CASCADE;
  DROP TABLE "products_blocks_call_to_action_locales" CASCADE;
  DROP TABLE "products_blocks_community_showcase_items" CASCADE;
  DROP TABLE "products_blocks_community_showcase_items_locales" CASCADE;
  DROP TABLE "products_blocks_community_showcase" CASCADE;
  DROP TABLE "products_blocks_community_showcase_locales" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_locales" CASCADE;
  DROP TABLE "_products_v_version_reviewed_locales" CASCADE;
  DROP TABLE "_products_v_blocks_hero_items" CASCADE;
  DROP TABLE "_products_v_blocks_hero_items_locales" CASCADE;
  DROP TABLE "_products_v_blocks_hero" CASCADE;
  DROP TABLE "_products_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_products_v_blocks_rich_text_items" CASCADE;
  DROP TABLE "_products_v_blocks_rich_text_items_locales" CASCADE;
  DROP TABLE "_products_v_blocks_rich_text" CASCADE;
  DROP TABLE "_products_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_products_v_blocks_image_text_items" CASCADE;
  DROP TABLE "_products_v_blocks_image_text_items_locales" CASCADE;
  DROP TABLE "_products_v_blocks_image_text" CASCADE;
  DROP TABLE "_products_v_blocks_image_text_locales" CASCADE;
  DROP TABLE "_products_v_blocks_feature_grid_items" CASCADE;
  DROP TABLE "_products_v_blocks_feature_grid_items_locales" CASCADE;
  DROP TABLE "_products_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_products_v_blocks_feature_grid_locales" CASCADE;
  DROP TABLE "_products_v_blocks_media_showcase_items" CASCADE;
  DROP TABLE "_products_v_blocks_media_showcase_items_locales" CASCADE;
  DROP TABLE "_products_v_blocks_media_showcase" CASCADE;
  DROP TABLE "_products_v_blocks_media_showcase_locales" CASCADE;
  DROP TABLE "_products_v_blocks_stats_items" CASCADE;
  DROP TABLE "_products_v_blocks_stats_items_locales" CASCADE;
  DROP TABLE "_products_v_blocks_stats" CASCADE;
  DROP TABLE "_products_v_blocks_stats_locales" CASCADE;
  DROP TABLE "_products_v_blocks_gallery_items" CASCADE;
  DROP TABLE "_products_v_blocks_gallery_items_locales" CASCADE;
  DROP TABLE "_products_v_blocks_gallery" CASCADE;
  DROP TABLE "_products_v_blocks_gallery_locales" CASCADE;
  DROP TABLE "_products_v_blocks_video_embed_items" CASCADE;
  DROP TABLE "_products_v_blocks_video_embed_items_locales" CASCADE;
  DROP TABLE "_products_v_blocks_video_embed" CASCADE;
  DROP TABLE "_products_v_blocks_video_embed_locales" CASCADE;
  DROP TABLE "_products_v_blocks_portfolio_feed_items" CASCADE;
  DROP TABLE "_products_v_blocks_portfolio_feed_items_locales" CASCADE;
  DROP TABLE "_products_v_blocks_portfolio_feed" CASCADE;
  DROP TABLE "_products_v_blocks_portfolio_feed_locales" CASCADE;
  DROP TABLE "_products_v_blocks_news_feed_items" CASCADE;
  DROP TABLE "_products_v_blocks_news_feed_items_locales" CASCADE;
  DROP TABLE "_products_v_blocks_news_feed" CASCADE;
  DROP TABLE "_products_v_blocks_news_feed_locales" CASCADE;
  DROP TABLE "_products_v_blocks_faq_items" CASCADE;
  DROP TABLE "_products_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_products_v_blocks_faq" CASCADE;
  DROP TABLE "_products_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_products_v_blocks_call_to_action_items" CASCADE;
  DROP TABLE "_products_v_blocks_call_to_action_items_locales" CASCADE;
  DROP TABLE "_products_v_blocks_call_to_action" CASCADE;
  DROP TABLE "_products_v_blocks_call_to_action_locales" CASCADE;
  DROP TABLE "_products_v_blocks_community_showcase_items" CASCADE;
  DROP TABLE "_products_v_blocks_community_showcase_items_locales" CASCADE;
  DROP TABLE "_products_v_blocks_community_showcase" CASCADE;
  DROP TABLE "_products_v_blocks_community_showcase_locales" CASCADE;
  DROP TABLE "_products_v" CASCADE;
  DROP TABLE "_products_v_locales" CASCADE;
  DROP TABLE "post_categories" CASCADE;
  DROP TABLE "post_categories_locales" CASCADE;
  DROP TABLE "portfolio_categories" CASCADE;
  DROP TABLE "portfolio_categories_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "audit_events" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TABLE "_site_settings_v_locales" CASCADE;
  DROP TABLE "company_profile" CASCADE;
  DROP TABLE "company_profile_locales" CASCADE;
  DROP TABLE "_company_profile_v" CASCADE;
  DROP TABLE "_company_profile_v_locales" CASCADE;
  DROP TABLE "header_navigation_links" CASCADE;
  DROP TABLE "header_navigation_links_locales" CASCADE;
  DROP TABLE "header_navigation" CASCADE;
  DROP TABLE "_header_navigation_v_version_links" CASCADE;
  DROP TABLE "_header_navigation_v_version_links_locales" CASCADE;
  DROP TABLE "_header_navigation_v" CASCADE;
  DROP TABLE "footer_navigation_links" CASCADE;
  DROP TABLE "footer_navigation_links_locales" CASCADE;
  DROP TABLE "footer_navigation" CASCADE;
  DROP TABLE "_footer_navigation_v_version_links" CASCADE;
  DROP TABLE "_footer_navigation_v_version_links_locales" CASCADE;
  DROP TABLE "_footer_navigation_v" CASCADE;
  DROP TABLE "contact_settings" CASCADE;
  DROP TABLE "contact_settings_locales" CASCADE;
  DROP TABLE "_contact_settings_v" CASCADE;
  DROP TABLE "_contact_settings_v_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_pages_fk";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_posts_fk";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_portfolio_projects_fk";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_products_fk";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_post_categories_fk";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_portfolio_categories_fk";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_media_fk";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_audit_events_fk";

  ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE text;
  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'super-admin'::text;
  DROP TYPE "public"."enum_users_role";
  CREATE TYPE "public"."enum_users_role" AS ENUM('super-admin');
  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'super-admin'::"public"."enum_users_role";
  ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE "public"."enum_users_role" USING "role"::"public"."enum_users_role";
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  DROP INDEX "payload_locked_documents_rels_posts_id_idx";
  DROP INDEX "payload_locked_documents_rels_projects_id_idx";
  DROP INDEX "payload_locked_documents_rels_products_id_idx";
  DROP INDEX "payload_locked_documents_rels_post_categories_id_idx";
  DROP INDEX "payload_locked_documents_rels_portfolio_categories_id_idx";
  DROP INDEX "payload_locked_documents_rels_media_id_idx";
  DROP INDEX "payload_locked_documents_rels_audit_events_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "posts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "projects_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "products_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "post_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "portfolio_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "media_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "audit_events_id";
  DROP TYPE "public"."enum_pages_reviewed_locales";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_rich_text_variant";
  DROP TYPE "public"."enum_pages_blocks_image_text_variant";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_variant";
  DROP TYPE "public"."enum_pages_blocks_media_showcase_variant";
  DROP TYPE "public"."enum_pages_blocks_stats_variant";
  DROP TYPE "public"."enum_pages_blocks_gallery_variant";
  DROP TYPE "public"."enum_pages_blocks_video_embed_variant";
  DROP TYPE "public"."enum_pages_blocks_portfolio_feed_variant";
  DROP TYPE "public"."enum_pages_blocks_news_feed_variant";
  DROP TYPE "public"."enum_pages_blocks_faq_variant";
  DROP TYPE "public"."enum_pages_blocks_call_to_action_variant";
  DROP TYPE "public"."enum_pages_blocks_community_showcase_variant";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_reviewed_locales";
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_variant";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_variant";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_variant";
  DROP TYPE "public"."enum__pages_v_blocks_media_showcase_variant";
  DROP TYPE "public"."enum__pages_v_blocks_stats_variant";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_variant";
  DROP TYPE "public"."enum__pages_v_blocks_video_embed_variant";
  DROP TYPE "public"."enum__pages_v_blocks_portfolio_feed_variant";
  DROP TYPE "public"."enum__pages_v_blocks_news_feed_variant";
  DROP TYPE "public"."enum__pages_v_blocks_faq_variant";
  DROP TYPE "public"."enum__pages_v_blocks_call_to_action_variant";
  DROP TYPE "public"."enum__pages_v_blocks_community_showcase_variant";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_posts_reviewed_locales";
  DROP TYPE "public"."enum_posts_blocks_hero_variant";
  DROP TYPE "public"."enum_posts_blocks_rich_text_variant";
  DROP TYPE "public"."enum_posts_blocks_image_text_variant";
  DROP TYPE "public"."enum_posts_blocks_feature_grid_variant";
  DROP TYPE "public"."enum_posts_blocks_media_showcase_variant";
  DROP TYPE "public"."enum_posts_blocks_stats_variant";
  DROP TYPE "public"."enum_posts_blocks_gallery_variant";
  DROP TYPE "public"."enum_posts_blocks_video_embed_variant";
  DROP TYPE "public"."enum_posts_blocks_portfolio_feed_variant";
  DROP TYPE "public"."enum_posts_blocks_news_feed_variant";
  DROP TYPE "public"."enum_posts_blocks_faq_variant";
  DROP TYPE "public"."enum_posts_blocks_call_to_action_variant";
  DROP TYPE "public"."enum_posts_blocks_community_showcase_variant";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_reviewed_locales";
  DROP TYPE "public"."enum__posts_v_blocks_hero_variant";
  DROP TYPE "public"."enum__posts_v_blocks_rich_text_variant";
  DROP TYPE "public"."enum__posts_v_blocks_image_text_variant";
  DROP TYPE "public"."enum__posts_v_blocks_feature_grid_variant";
  DROP TYPE "public"."enum__posts_v_blocks_media_showcase_variant";
  DROP TYPE "public"."enum__posts_v_blocks_stats_variant";
  DROP TYPE "public"."enum__posts_v_blocks_gallery_variant";
  DROP TYPE "public"."enum__posts_v_blocks_video_embed_variant";
  DROP TYPE "public"."enum__posts_v_blocks_portfolio_feed_variant";
  DROP TYPE "public"."enum__posts_v_blocks_news_feed_variant";
  DROP TYPE "public"."enum__posts_v_blocks_faq_variant";
  DROP TYPE "public"."enum__posts_v_blocks_call_to_action_variant";
  DROP TYPE "public"."enum__posts_v_blocks_community_showcase_variant";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_published_locale";
  DROP TYPE "public"."enum_projects_reviewed_locales";
  DROP TYPE "public"."enum_projects_blocks_hero_variant";
  DROP TYPE "public"."enum_projects_blocks_rich_text_variant";
  DROP TYPE "public"."enum_projects_blocks_image_text_variant";
  DROP TYPE "public"."enum_projects_blocks_feature_grid_variant";
  DROP TYPE "public"."enum_projects_blocks_media_showcase_variant";
  DROP TYPE "public"."enum_projects_blocks_stats_variant";
  DROP TYPE "public"."enum_projects_blocks_gallery_variant";
  DROP TYPE "public"."enum_projects_blocks_video_embed_variant";
  DROP TYPE "public"."enum_projects_blocks_portfolio_feed_variant";
  DROP TYPE "public"."enum_projects_blocks_news_feed_variant";
  DROP TYPE "public"."enum_projects_blocks_faq_variant";
  DROP TYPE "public"."enum_projects_blocks_call_to_action_variant";
  DROP TYPE "public"."enum_projects_blocks_community_showcase_variant";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_reviewed_locales";
  DROP TYPE "public"."enum__projects_v_blocks_hero_variant";
  DROP TYPE "public"."enum__projects_v_blocks_rich_text_variant";
  DROP TYPE "public"."enum__projects_v_blocks_image_text_variant";
  DROP TYPE "public"."enum__projects_v_blocks_feature_grid_variant";
  DROP TYPE "public"."enum__projects_v_blocks_media_showcase_variant";
  DROP TYPE "public"."enum__projects_v_blocks_stats_variant";
  DROP TYPE "public"."enum__projects_v_blocks_gallery_variant";
  DROP TYPE "public"."enum__projects_v_blocks_video_embed_variant";
  DROP TYPE "public"."enum__projects_v_blocks_portfolio_feed_variant";
  DROP TYPE "public"."enum__projects_v_blocks_news_feed_variant";
  DROP TYPE "public"."enum__projects_v_blocks_faq_variant";
  DROP TYPE "public"."enum__projects_v_blocks_call_to_action_variant";
  DROP TYPE "public"."enum__projects_v_blocks_community_showcase_variant";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum__projects_v_published_locale";
  DROP TYPE "public"."enum_products_reviewed_locales";
  DROP TYPE "public"."enum_products_blocks_hero_variant";
  DROP TYPE "public"."enum_products_blocks_rich_text_variant";
  DROP TYPE "public"."enum_products_blocks_image_text_variant";
  DROP TYPE "public"."enum_products_blocks_feature_grid_variant";
  DROP TYPE "public"."enum_products_blocks_media_showcase_variant";
  DROP TYPE "public"."enum_products_blocks_stats_variant";
  DROP TYPE "public"."enum_products_blocks_gallery_variant";
  DROP TYPE "public"."enum_products_blocks_video_embed_variant";
  DROP TYPE "public"."enum_products_blocks_portfolio_feed_variant";
  DROP TYPE "public"."enum_products_blocks_news_feed_variant";
  DROP TYPE "public"."enum_products_blocks_faq_variant";
  DROP TYPE "public"."enum_products_blocks_call_to_action_variant";
  DROP TYPE "public"."enum_products_blocks_community_showcase_variant";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum__products_v_version_reviewed_locales";
  DROP TYPE "public"."enum__products_v_blocks_hero_variant";
  DROP TYPE "public"."enum__products_v_blocks_rich_text_variant";
  DROP TYPE "public"."enum__products_v_blocks_image_text_variant";
  DROP TYPE "public"."enum__products_v_blocks_feature_grid_variant";
  DROP TYPE "public"."enum__products_v_blocks_media_showcase_variant";
  DROP TYPE "public"."enum__products_v_blocks_stats_variant";
  DROP TYPE "public"."enum__products_v_blocks_gallery_variant";
  DROP TYPE "public"."enum__products_v_blocks_video_embed_variant";
  DROP TYPE "public"."enum__products_v_blocks_portfolio_feed_variant";
  DROP TYPE "public"."enum__products_v_blocks_news_feed_variant";
  DROP TYPE "public"."enum__products_v_blocks_faq_variant";
  DROP TYPE "public"."enum__products_v_blocks_call_to_action_variant";
  DROP TYPE "public"."enum__products_v_blocks_community_showcase_variant";
  DROP TYPE "public"."enum__products_v_version_status";
  DROP TYPE "public"."enum__products_v_published_locale";
  DROP TYPE "public"."enum_site_settings_status";
  DROP TYPE "public"."enum__site_settings_v_version_status";
  DROP TYPE "public"."enum__site_settings_v_published_locale";
  DROP TYPE "public"."enum_company_profile_status";
  DROP TYPE "public"."enum__company_profile_v_version_status";
  DROP TYPE "public"."enum__company_profile_v_published_locale";
  DROP TYPE "public"."enum_header_navigation_status";
  DROP TYPE "public"."enum__header_navigation_v_version_status";
  DROP TYPE "public"."enum__header_navigation_v_published_locale";
  DROP TYPE "public"."enum_footer_navigation_status";
  DROP TYPE "public"."enum__footer_navigation_v_version_status";
  DROP TYPE "public"."enum__footer_navigation_v_published_locale";
  DROP TYPE "public"."enum_contact_settings_status";
  DROP TYPE "public"."enum__contact_settings_v_version_status";
  DROP TYPE "public"."enum__contact_settings_v_published_locale";`)
}
