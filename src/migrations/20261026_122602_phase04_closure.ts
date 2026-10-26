import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_image_text_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_posts_blocks_image_text_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_posts_blocks_feature_grid_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum__posts_v_blocks_image_text_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__posts_v_blocks_feature_grid_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_projects_blocks_image_text_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_projects_blocks_feature_grid_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum__projects_v_blocks_image_text_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__projects_v_blocks_feature_grid_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_products_blocks_image_text_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_products_blocks_feature_grid_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum__products_v_blocks_image_text_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__products_v_blocks_feature_grid_columns" AS ENUM('2', '3');
  CREATE TABLE "pages_blocks_media_showcase_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_media_showcase_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_stats_statistics" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_stats_statistics_locales" (
    "value" varchar,
    "label" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_gallery_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_gallery_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_faq_questions" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_faq_questions_locales" (
    "question" varchar,
    "answer" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_community_showcase_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_community_showcase_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_media_showcase_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_media_showcase_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_stats_statistics" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_stats_statistics_locales" (
    "value" varchar,
    "label" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_gallery_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_gallery_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_faq_questions" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_faq_questions_locales" (
    "question" varchar,
    "answer" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_community_showcase_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_community_showcase_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "posts_blocks_media_showcase_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "posts_blocks_media_showcase_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_stats_statistics" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "posts_blocks_stats_statistics_locales" (
    "value" varchar,
    "label" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_gallery_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "posts_blocks_gallery_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_faq_questions" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "posts_blocks_faq_questions_locales" (
    "question" varchar,
    "answer" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "posts_blocks_community_showcase_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "posts_blocks_community_showcase_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_media_showcase_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_posts_v_blocks_media_showcase_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_stats_statistics" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_posts_v_blocks_stats_statistics_locales" (
    "value" varchar,
    "label" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_gallery_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_posts_v_blocks_gallery_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_faq_questions" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_posts_v_blocks_faq_questions_locales" (
    "question" varchar,
    "answer" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_posts_v_blocks_community_showcase_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_posts_v_blocks_community_showcase_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "projects_blocks_media_showcase_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "projects_blocks_media_showcase_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_stats_statistics" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "projects_blocks_stats_statistics_locales" (
    "value" varchar,
    "label" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_gallery_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "projects_blocks_gallery_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_faq_questions" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "projects_blocks_faq_questions_locales" (
    "question" varchar,
    "answer" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_blocks_community_showcase_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "projects_blocks_community_showcase_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "projects_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "projects_gallery_locales" (
    "image_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_media_showcase_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_projects_v_blocks_media_showcase_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_stats_statistics" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_projects_v_blocks_stats_statistics_locales" (
    "value" varchar,
    "label" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_gallery_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_projects_v_blocks_gallery_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_faq_questions" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_projects_v_blocks_faq_questions_locales" (
    "question" varchar,
    "answer" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_blocks_community_showcase_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_projects_v_blocks_community_showcase_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_projects_v_version_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_projects_v_version_gallery_locales" (
    "image_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "products_blocks_media_showcase_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "products_blocks_media_showcase_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_stats_statistics" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "products_blocks_stats_statistics_locales" (
    "value" varchar,
    "label" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_gallery_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "products_blocks_gallery_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_faq_questions" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "products_blocks_faq_questions_locales" (
    "question" varchar,
    "answer" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_blocks_community_showcase_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "products_blocks_community_showcase_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "products_features" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "products_features_locales" (
    "title" varchar,
    "description" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "_products_v_blocks_media_showcase_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_products_v_blocks_media_showcase_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_stats_statistics" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_products_v_blocks_stats_statistics_locales" (
    "value" varchar,
    "label" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_gallery_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_products_v_blocks_gallery_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_faq_questions" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_products_v_blocks_faq_questions_locales" (
    "question" varchar,
    "answer" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_blocks_community_showcase_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_products_v_blocks_community_showcase_gallery_locales" (
    "image_id" integer,
    "caption" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_products_v_version_features" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_uuid" varchar
  );

  CREATE TABLE "_products_v_version_features_locales" (
    "title" varchar,
    "description" varchar,
    "media_id" integer,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  CREATE TABLE "site_settings_social_links" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "url" varchar
  );

  CREATE TABLE "site_settings_social_links_locales" (
    "label" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "_site_settings_v_version_social_links" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "url" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_site_settings_v_version_social_links_locales" (
    "label" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );

  ALTER TABLE "pages_blocks_hero_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_hero_locales" ADD COLUMN "secondary_link" varchar;
  ALTER TABLE "pages_blocks_hero_locales" ADD COLUMN "secondary_link_label" varchar;
  ALTER TABLE "pages_blocks_rich_text_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_rich_text_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "pages_blocks_image_text" ADD COLUMN "image_position" "enum_pages_blocks_image_text_image_position" DEFAULT 'left';
  ALTER TABLE "pages_blocks_image_text_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_feature_grid" ADD COLUMN "columns" "enum_pages_blocks_feature_grid_columns" DEFAULT '3';
  ALTER TABLE "pages_blocks_feature_grid_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_media_showcase_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_stats_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_gallery_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_video_embed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_video_embed_locales" ADD COLUMN "video_u_r_l" varchar;
  ALTER TABLE "pages_blocks_video_embed_locales" ADD COLUMN "poster_id" integer;
  ALTER TABLE "pages_blocks_portfolio_feed" ADD COLUMN "category_id" integer;
  ALTER TABLE "pages_blocks_portfolio_feed" ADD COLUMN "limit" numeric DEFAULT 3;
  ALTER TABLE "pages_blocks_portfolio_feed" ADD COLUMN "featured_only" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_portfolio_feed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_news_feed" ADD COLUMN "category_id" integer;
  ALTER TABLE "pages_blocks_news_feed" ADD COLUMN "limit" numeric DEFAULT 3;
  ALTER TABLE "pages_blocks_news_feed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_faq_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_call_to_action_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_call_to_action_locales" ADD COLUMN "secondary_link" varchar;
  ALTER TABLE "pages_blocks_call_to_action_locales" ADD COLUMN "secondary_link_label" varchar;
  ALTER TABLE "pages_blocks_community_showcase_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD COLUMN "secondary_link" varchar;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD COLUMN "secondary_link_label" varchar;
  ALTER TABLE "_pages_v_blocks_rich_text_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_rich_text_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "_pages_v_blocks_image_text" ADD COLUMN "image_position" "enum__pages_v_blocks_image_text_image_position" DEFAULT 'left';
  ALTER TABLE "_pages_v_blocks_image_text_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD COLUMN "columns" "enum__pages_v_blocks_feature_grid_columns" DEFAULT '3';
  ALTER TABLE "_pages_v_blocks_feature_grid_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_media_showcase_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_stats_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_gallery_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_video_embed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_video_embed_locales" ADD COLUMN "video_u_r_l" varchar;
  ALTER TABLE "_pages_v_blocks_video_embed_locales" ADD COLUMN "poster_id" integer;
  ALTER TABLE "_pages_v_blocks_portfolio_feed" ADD COLUMN "category_id" integer;
  ALTER TABLE "_pages_v_blocks_portfolio_feed" ADD COLUMN "limit" numeric DEFAULT 3;
  ALTER TABLE "_pages_v_blocks_portfolio_feed" ADD COLUMN "featured_only" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_portfolio_feed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_news_feed" ADD COLUMN "category_id" integer;
  ALTER TABLE "_pages_v_blocks_news_feed" ADD COLUMN "limit" numeric DEFAULT 3;
  ALTER TABLE "_pages_v_blocks_news_feed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_faq_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_call_to_action_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_call_to_action_locales" ADD COLUMN "secondary_link" varchar;
  ALTER TABLE "_pages_v_blocks_call_to_action_locales" ADD COLUMN "secondary_link_label" varchar;
  ALTER TABLE "_pages_v_blocks_community_showcase_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "posts_blocks_hero_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "posts_blocks_hero_locales" ADD COLUMN "secondary_link" varchar;
  ALTER TABLE "posts_blocks_hero_locales" ADD COLUMN "secondary_link_label" varchar;
  ALTER TABLE "posts_blocks_rich_text_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "posts_blocks_rich_text_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "posts_blocks_image_text" ADD COLUMN "image_position" "enum_posts_blocks_image_text_image_position" DEFAULT 'left';
  ALTER TABLE "posts_blocks_image_text_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "posts_blocks_feature_grid" ADD COLUMN "columns" "enum_posts_blocks_feature_grid_columns" DEFAULT '3';
  ALTER TABLE "posts_blocks_feature_grid_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "posts_blocks_media_showcase_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "posts_blocks_stats_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "posts_blocks_gallery_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "posts_blocks_video_embed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "posts_blocks_video_embed_locales" ADD COLUMN "video_u_r_l" varchar;
  ALTER TABLE "posts_blocks_video_embed_locales" ADD COLUMN "poster_id" integer;
  ALTER TABLE "posts_blocks_portfolio_feed" ADD COLUMN "category_id" integer;
  ALTER TABLE "posts_blocks_portfolio_feed" ADD COLUMN "limit" numeric DEFAULT 3;
  ALTER TABLE "posts_blocks_portfolio_feed" ADD COLUMN "featured_only" boolean DEFAULT false;
  ALTER TABLE "posts_blocks_portfolio_feed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "posts_blocks_news_feed" ADD COLUMN "category_id" integer;
  ALTER TABLE "posts_blocks_news_feed" ADD COLUMN "limit" numeric DEFAULT 3;
  ALTER TABLE "posts_blocks_news_feed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "posts_blocks_faq_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "posts_blocks_call_to_action_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "posts_blocks_call_to_action_locales" ADD COLUMN "secondary_link" varchar;
  ALTER TABLE "posts_blocks_call_to_action_locales" ADD COLUMN "secondary_link_label" varchar;
  ALTER TABLE "posts_blocks_community_showcase_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "posts" ADD COLUMN "publish_at" timestamp(3) with time zone;
  ALTER TABLE "posts_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "_posts_v_blocks_hero_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_posts_v_blocks_hero_locales" ADD COLUMN "secondary_link" varchar;
  ALTER TABLE "_posts_v_blocks_hero_locales" ADD COLUMN "secondary_link_label" varchar;
  ALTER TABLE "_posts_v_blocks_rich_text_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_posts_v_blocks_rich_text_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "_posts_v_blocks_image_text" ADD COLUMN "image_position" "enum__posts_v_blocks_image_text_image_position" DEFAULT 'left';
  ALTER TABLE "_posts_v_blocks_image_text_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_posts_v_blocks_feature_grid" ADD COLUMN "columns" "enum__posts_v_blocks_feature_grid_columns" DEFAULT '3';
  ALTER TABLE "_posts_v_blocks_feature_grid_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_posts_v_blocks_media_showcase_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_posts_v_blocks_stats_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_posts_v_blocks_gallery_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_posts_v_blocks_video_embed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_posts_v_blocks_video_embed_locales" ADD COLUMN "video_u_r_l" varchar;
  ALTER TABLE "_posts_v_blocks_video_embed_locales" ADD COLUMN "poster_id" integer;
  ALTER TABLE "_posts_v_blocks_portfolio_feed" ADD COLUMN "category_id" integer;
  ALTER TABLE "_posts_v_blocks_portfolio_feed" ADD COLUMN "limit" numeric DEFAULT 3;
  ALTER TABLE "_posts_v_blocks_portfolio_feed" ADD COLUMN "featured_only" boolean DEFAULT false;
  ALTER TABLE "_posts_v_blocks_portfolio_feed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_posts_v_blocks_news_feed" ADD COLUMN "category_id" integer;
  ALTER TABLE "_posts_v_blocks_news_feed" ADD COLUMN "limit" numeric DEFAULT 3;
  ALTER TABLE "_posts_v_blocks_news_feed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_posts_v_blocks_faq_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_posts_v_blocks_call_to_action_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_posts_v_blocks_call_to_action_locales" ADD COLUMN "secondary_link" varchar;
  ALTER TABLE "_posts_v_blocks_call_to_action_locales" ADD COLUMN "secondary_link_label" varchar;
  ALTER TABLE "_posts_v_blocks_community_showcase_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_publish_at" timestamp(3) with time zone;
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_content" jsonb;
  ALTER TABLE "projects_blocks_hero_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "projects_blocks_hero_locales" ADD COLUMN "secondary_link" varchar;
  ALTER TABLE "projects_blocks_hero_locales" ADD COLUMN "secondary_link_label" varchar;
  ALTER TABLE "projects_blocks_rich_text_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "projects_blocks_rich_text_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "projects_blocks_image_text" ADD COLUMN "image_position" "enum_projects_blocks_image_text_image_position" DEFAULT 'left';
  ALTER TABLE "projects_blocks_image_text_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "projects_blocks_feature_grid" ADD COLUMN "columns" "enum_projects_blocks_feature_grid_columns" DEFAULT '3';
  ALTER TABLE "projects_blocks_feature_grid_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "projects_blocks_media_showcase_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "projects_blocks_stats_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "projects_blocks_gallery_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "projects_blocks_video_embed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "projects_blocks_video_embed_locales" ADD COLUMN "video_u_r_l" varchar;
  ALTER TABLE "projects_blocks_video_embed_locales" ADD COLUMN "poster_id" integer;
  ALTER TABLE "projects_blocks_portfolio_feed" ADD COLUMN "category_id" integer;
  ALTER TABLE "projects_blocks_portfolio_feed" ADD COLUMN "limit" numeric DEFAULT 3;
  ALTER TABLE "projects_blocks_portfolio_feed" ADD COLUMN "featured_only" boolean DEFAULT false;
  ALTER TABLE "projects_blocks_portfolio_feed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "projects_blocks_news_feed" ADD COLUMN "category_id" integer;
  ALTER TABLE "projects_blocks_news_feed" ADD COLUMN "limit" numeric DEFAULT 3;
  ALTER TABLE "projects_blocks_news_feed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "projects_blocks_faq_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "projects_blocks_call_to_action_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "projects_blocks_call_to_action_locales" ADD COLUMN "secondary_link" varchar;
  ALTER TABLE "projects_blocks_call_to_action_locales" ADD COLUMN "secondary_link_label" varchar;
  ALTER TABLE "projects_blocks_community_showcase_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "projects" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "projects_locales" ADD COLUMN "description" varchar;
  ALTER TABLE "projects_locales" ADD COLUMN "case_study" jsonb;
  ALTER TABLE "_projects_v_blocks_hero_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_projects_v_blocks_hero_locales" ADD COLUMN "secondary_link" varchar;
  ALTER TABLE "_projects_v_blocks_hero_locales" ADD COLUMN "secondary_link_label" varchar;
  ALTER TABLE "_projects_v_blocks_rich_text_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_projects_v_blocks_rich_text_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "_projects_v_blocks_image_text" ADD COLUMN "image_position" "enum__projects_v_blocks_image_text_image_position" DEFAULT 'left';
  ALTER TABLE "_projects_v_blocks_image_text_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_projects_v_blocks_feature_grid" ADD COLUMN "columns" "enum__projects_v_blocks_feature_grid_columns" DEFAULT '3';
  ALTER TABLE "_projects_v_blocks_feature_grid_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_projects_v_blocks_media_showcase_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_projects_v_blocks_stats_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_projects_v_blocks_gallery_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_projects_v_blocks_video_embed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_projects_v_blocks_video_embed_locales" ADD COLUMN "video_u_r_l" varchar;
  ALTER TABLE "_projects_v_blocks_video_embed_locales" ADD COLUMN "poster_id" integer;
  ALTER TABLE "_projects_v_blocks_portfolio_feed" ADD COLUMN "category_id" integer;
  ALTER TABLE "_projects_v_blocks_portfolio_feed" ADD COLUMN "limit" numeric DEFAULT 3;
  ALTER TABLE "_projects_v_blocks_portfolio_feed" ADD COLUMN "featured_only" boolean DEFAULT false;
  ALTER TABLE "_projects_v_blocks_portfolio_feed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_projects_v_blocks_news_feed" ADD COLUMN "category_id" integer;
  ALTER TABLE "_projects_v_blocks_news_feed" ADD COLUMN "limit" numeric DEFAULT 3;
  ALTER TABLE "_projects_v_blocks_news_feed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_projects_v_blocks_faq_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_projects_v_blocks_call_to_action_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_projects_v_blocks_call_to_action_locales" ADD COLUMN "secondary_link" varchar;
  ALTER TABLE "_projects_v_blocks_call_to_action_locales" ADD COLUMN "secondary_link_label" varchar;
  ALTER TABLE "_projects_v_blocks_community_showcase_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_featured" boolean DEFAULT false;
  ALTER TABLE "_projects_v_locales" ADD COLUMN "version_description" varchar;
  ALTER TABLE "_projects_v_locales" ADD COLUMN "version_case_study" jsonb;
  ALTER TABLE "products_blocks_hero_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "products_blocks_hero_locales" ADD COLUMN "secondary_link" varchar;
  ALTER TABLE "products_blocks_hero_locales" ADD COLUMN "secondary_link_label" varchar;
  ALTER TABLE "products_blocks_rich_text_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "products_blocks_rich_text_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "products_blocks_image_text" ADD COLUMN "image_position" "enum_products_blocks_image_text_image_position" DEFAULT 'left';
  ALTER TABLE "products_blocks_image_text_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "products_blocks_feature_grid" ADD COLUMN "columns" "enum_products_blocks_feature_grid_columns" DEFAULT '3';
  ALTER TABLE "products_blocks_feature_grid_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "products_blocks_media_showcase_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "products_blocks_stats_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "products_blocks_gallery_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "products_blocks_video_embed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "products_blocks_video_embed_locales" ADD COLUMN "video_u_r_l" varchar;
  ALTER TABLE "products_blocks_video_embed_locales" ADD COLUMN "poster_id" integer;
  ALTER TABLE "products_blocks_portfolio_feed" ADD COLUMN "category_id" integer;
  ALTER TABLE "products_blocks_portfolio_feed" ADD COLUMN "limit" numeric DEFAULT 3;
  ALTER TABLE "products_blocks_portfolio_feed" ADD COLUMN "featured_only" boolean DEFAULT false;
  ALTER TABLE "products_blocks_portfolio_feed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "products_blocks_news_feed" ADD COLUMN "category_id" integer;
  ALTER TABLE "products_blocks_news_feed" ADD COLUMN "limit" numeric DEFAULT 3;
  ALTER TABLE "products_blocks_news_feed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "products_blocks_faq_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "products_blocks_call_to_action_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "products_blocks_call_to_action_locales" ADD COLUMN "secondary_link" varchar;
  ALTER TABLE "products_blocks_call_to_action_locales" ADD COLUMN "secondary_link_label" varchar;
  ALTER TABLE "products_blocks_community_showcase_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "products_locales" ADD COLUMN "overview" jsonb;
  ALTER TABLE "_products_v_blocks_hero_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_products_v_blocks_hero_locales" ADD COLUMN "secondary_link" varchar;
  ALTER TABLE "_products_v_blocks_hero_locales" ADD COLUMN "secondary_link_label" varchar;
  ALTER TABLE "_products_v_blocks_rich_text_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_products_v_blocks_rich_text_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "_products_v_blocks_image_text" ADD COLUMN "image_position" "enum__products_v_blocks_image_text_image_position" DEFAULT 'left';
  ALTER TABLE "_products_v_blocks_image_text_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_products_v_blocks_feature_grid" ADD COLUMN "columns" "enum__products_v_blocks_feature_grid_columns" DEFAULT '3';
  ALTER TABLE "_products_v_blocks_feature_grid_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_products_v_blocks_media_showcase_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_products_v_blocks_stats_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_products_v_blocks_gallery_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_products_v_blocks_video_embed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_products_v_blocks_video_embed_locales" ADD COLUMN "video_u_r_l" varchar;
  ALTER TABLE "_products_v_blocks_video_embed_locales" ADD COLUMN "poster_id" integer;
  ALTER TABLE "_products_v_blocks_portfolio_feed" ADD COLUMN "category_id" integer;
  ALTER TABLE "_products_v_blocks_portfolio_feed" ADD COLUMN "limit" numeric DEFAULT 3;
  ALTER TABLE "_products_v_blocks_portfolio_feed" ADD COLUMN "featured_only" boolean DEFAULT false;
  ALTER TABLE "_products_v_blocks_portfolio_feed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_products_v_blocks_news_feed" ADD COLUMN "category_id" integer;
  ALTER TABLE "_products_v_blocks_news_feed" ADD COLUMN "limit" numeric DEFAULT 3;
  ALTER TABLE "_products_v_blocks_news_feed_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_products_v_blocks_faq_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_products_v_blocks_call_to_action_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_products_v_blocks_call_to_action_locales" ADD COLUMN "secondary_link" varchar;
  ALTER TABLE "_products_v_blocks_call_to_action_locales" ADD COLUMN "secondary_link_label" varchar;
  ALTER TABLE "_products_v_blocks_community_showcase_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_products_v_locales" ADD COLUMN "version_overview" jsonb;
  ALTER TABLE "audit_events" ADD COLUMN "actor_id_snapshot" varchar DEFAULT 'legacy-unknown' NOT NULL;
  ALTER TABLE "audit_events" ADD COLUMN "actor_role_snapshot" varchar DEFAULT 'legacy-unknown' NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "open_graph_image_id" integer;
  ALTER TABLE "site_settings_locales" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_open_graph_image_id" integer;
  ALTER TABLE "_site_settings_v_locales" ADD COLUMN "version_seo_title" varchar;
  ALTER TABLE "_site_settings_v_locales" ADD COLUMN "version_seo_description" varchar;
  ALTER TABLE "company_profile" ADD COLUMN "phone" varchar;
  ALTER TABLE "_company_profile_v" ADD COLUMN "version_phone" varchar;
  ALTER TABLE "contact_settings" ADD COLUMN "phone" varchar;
  ALTER TABLE "contact_settings_locales" ADD COLUMN "address" varchar;
  ALTER TABLE "_contact_settings_v" ADD COLUMN "version_phone" varchar;
  ALTER TABLE "_contact_settings_v_locales" ADD COLUMN "version_address" varchar;
  ALTER TABLE "pages_blocks_media_showcase_gallery" ADD CONSTRAINT "pages_blocks_media_showcase_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_showcase_gallery_locales" ADD CONSTRAINT "pages_blocks_media_showcase_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_showcase_gallery_locales" ADD CONSTRAINT "pages_blocks_media_showcase_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_showcase_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_statistics" ADD CONSTRAINT "pages_blocks_stats_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_statistics_locales" ADD CONSTRAINT "pages_blocks_stats_statistics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_statistics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_gallery" ADD CONSTRAINT "pages_blocks_gallery_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_gallery_locales" ADD CONSTRAINT "pages_blocks_gallery_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_gallery_locales" ADD CONSTRAINT "pages_blocks_gallery_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_questions" ADD CONSTRAINT "pages_blocks_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_questions_locales" ADD CONSTRAINT "pages_blocks_faq_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_community_showcase_gallery" ADD CONSTRAINT "pages_blocks_community_showcase_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_community_showcase_gallery_locales" ADD CONSTRAINT "pages_blocks_community_showcase_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_community_showcase_gallery_locales" ADD CONSTRAINT "pages_blocks_community_showcase_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_community_showcase_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_showcase_gallery" ADD CONSTRAINT "_pages_v_blocks_media_showcase_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_showcase_gallery_locales" ADD CONSTRAINT "_pages_v_blocks_media_showcase_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_showcase_gallery_locales" ADD CONSTRAINT "_pages_v_blocks_media_showcase_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_showcase_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_statistics" ADD CONSTRAINT "_pages_v_blocks_stats_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_statistics_locales" ADD CONSTRAINT "_pages_v_blocks_stats_statistics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_statistics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_gallery_locales" ADD CONSTRAINT "_pages_v_blocks_gallery_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_gallery_locales" ADD CONSTRAINT "_pages_v_blocks_gallery_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_questions" ADD CONSTRAINT "_pages_v_blocks_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_questions_locales" ADD CONSTRAINT "_pages_v_blocks_faq_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_community_showcase_gallery" ADD CONSTRAINT "_pages_v_blocks_community_showcase_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_community_showcase_gallery_locales" ADD CONSTRAINT "_pages_v_blocks_community_showcase_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_community_showcase_gallery_locales" ADD CONSTRAINT "_pages_v_blocks_community_showcase_gallery_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_community_showcase_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_media_showcase_gallery" ADD CONSTRAINT "posts_blocks_media_showcase_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_media_showcase_gallery_locales" ADD CONSTRAINT "posts_blocks_media_showcase_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_media_showcase_gallery_locales" ADD CONSTRAINT "posts_blocks_media_showcase_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_media_showcase_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_stats_statistics" ADD CONSTRAINT "posts_blocks_stats_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_stats_statistics_locales" ADD CONSTRAINT "posts_blocks_stats_statistics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_stats_statistics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery_gallery" ADD CONSTRAINT "posts_blocks_gallery_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery_gallery_locales" ADD CONSTRAINT "posts_blocks_gallery_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery_gallery_locales" ADD CONSTRAINT "posts_blocks_gallery_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_gallery_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq_questions" ADD CONSTRAINT "posts_blocks_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq_questions_locales" ADD CONSTRAINT "posts_blocks_faq_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_faq_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_community_showcase_gallery" ADD CONSTRAINT "posts_blocks_community_showcase_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_community_showcase_gallery_locales" ADD CONSTRAINT "posts_blocks_community_showcase_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_community_showcase_gallery_locales" ADD CONSTRAINT "posts_blocks_community_showcase_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_community_showcase_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media_showcase_gallery" ADD CONSTRAINT "_posts_v_blocks_media_showcase_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media_showcase_gallery_locales" ADD CONSTRAINT "_posts_v_blocks_media_showcase_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media_showcase_gallery_locales" ADD CONSTRAINT "_posts_v_blocks_media_showcase_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_media_showcase_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_stats_statistics" ADD CONSTRAINT "_posts_v_blocks_stats_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_stats_statistics_locales" ADD CONSTRAINT "_posts_v_blocks_stats_statistics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_stats_statistics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery_gallery" ADD CONSTRAINT "_posts_v_blocks_gallery_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery_gallery_locales" ADD CONSTRAINT "_posts_v_blocks_gallery_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery_gallery_locales" ADD CONSTRAINT "_posts_v_blocks_gallery_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_gallery_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq_questions" ADD CONSTRAINT "_posts_v_blocks_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq_questions_locales" ADD CONSTRAINT "_posts_v_blocks_faq_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_faq_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_community_showcase_gallery" ADD CONSTRAINT "_posts_v_blocks_community_showcase_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_community_showcase_gallery_locales" ADD CONSTRAINT "_posts_v_blocks_community_showcase_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_community_showcase_gallery_locales" ADD CONSTRAINT "_posts_v_blocks_community_showcase_gallery_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_community_showcase_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_media_showcase_gallery" ADD CONSTRAINT "projects_blocks_media_showcase_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_media_showcase_gallery_locales" ADD CONSTRAINT "projects_blocks_media_showcase_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_media_showcase_gallery_locales" ADD CONSTRAINT "projects_blocks_media_showcase_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_media_showcase_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats_statistics" ADD CONSTRAINT "projects_blocks_stats_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats_statistics_locales" ADD CONSTRAINT "projects_blocks_stats_statistics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_stats_statistics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_gallery" ADD CONSTRAINT "projects_blocks_gallery_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_gallery_locales" ADD CONSTRAINT "projects_blocks_gallery_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_gallery_locales" ADD CONSTRAINT "projects_blocks_gallery_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_gallery_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq_questions" ADD CONSTRAINT "projects_blocks_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faq_questions_locales" ADD CONSTRAINT "projects_blocks_faq_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_faq_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_community_showcase_gallery" ADD CONSTRAINT "projects_blocks_community_showcase_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_community_showcase_gallery_locales" ADD CONSTRAINT "projects_blocks_community_showcase_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_community_showcase_gallery_locales" ADD CONSTRAINT "projects_blocks_community_showcase_gallery_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_community_showcase_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_gallery_locales" ADD CONSTRAINT "projects_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_gallery_locales" ADD CONSTRAINT "projects_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_media_showcase_gallery" ADD CONSTRAINT "_projects_v_blocks_media_showcase_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_media_showcase_gallery_locales" ADD CONSTRAINT "_projects_v_blocks_media_showcase_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_media_showcase_gallery_locales" ADD CONSTRAINT "_projects_v_blocks_media_showcase_gallery_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_media_showcase_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats_statistics" ADD CONSTRAINT "_projects_v_blocks_stats_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats_statistics_locales" ADD CONSTRAINT "_projects_v_blocks_stats_statistics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_stats_statistics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_gallery" ADD CONSTRAINT "_projects_v_blocks_gallery_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_gallery_locales" ADD CONSTRAINT "_projects_v_blocks_gallery_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_gallery_locales" ADD CONSTRAINT "_projects_v_blocks_gallery_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_gallery_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_faq_questions" ADD CONSTRAINT "_projects_v_blocks_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_faq_questions_locales" ADD CONSTRAINT "_projects_v_blocks_faq_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_faq_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_community_showcase_gallery" ADD CONSTRAINT "_projects_v_blocks_community_showcase_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_community_showcase_gallery_locales" ADD CONSTRAINT "_projects_v_blocks_community_showcase_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_community_showcase_gallery_locales" ADD CONSTRAINT "_projects_v_blocks_community_showcase_gallery_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_community_showcase_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery_locales" ADD CONSTRAINT "_projects_v_version_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery_locales" ADD CONSTRAINT "_projects_v_version_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_media_showcase_gallery" ADD CONSTRAINT "products_blocks_media_showcase_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_media_showcase_gallery_locales" ADD CONSTRAINT "products_blocks_media_showcase_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_media_showcase_gallery_locales" ADD CONSTRAINT "products_blocks_media_showcase_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_media_showcase_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_stats_statistics" ADD CONSTRAINT "products_blocks_stats_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_stats_statistics_locales" ADD CONSTRAINT "products_blocks_stats_statistics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_stats_statistics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_gallery_gallery" ADD CONSTRAINT "products_blocks_gallery_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_gallery_gallery_locales" ADD CONSTRAINT "products_blocks_gallery_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_gallery_gallery_locales" ADD CONSTRAINT "products_blocks_gallery_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_gallery_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_faq_questions" ADD CONSTRAINT "products_blocks_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_faq_questions_locales" ADD CONSTRAINT "products_blocks_faq_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_faq_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_community_showcase_gallery" ADD CONSTRAINT "products_blocks_community_showcase_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_community_showcase_gallery_locales" ADD CONSTRAINT "products_blocks_community_showcase_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_community_showcase_gallery_locales" ADD CONSTRAINT "products_blocks_community_showcase_gallery_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_community_showcase_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_features" ADD CONSTRAINT "products_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_features_locales" ADD CONSTRAINT "products_features_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_features_locales" ADD CONSTRAINT "products_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_media_showcase_gallery" ADD CONSTRAINT "_products_v_blocks_media_showcase_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_media_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_media_showcase_gallery_locales" ADD CONSTRAINT "_products_v_blocks_media_showcase_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_media_showcase_gallery_locales" ADD CONSTRAINT "_products_v_blocks_media_showcase_gallery_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_media_showcase_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_stats_statistics" ADD CONSTRAINT "_products_v_blocks_stats_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_stats_statistics_locales" ADD CONSTRAINT "_products_v_blocks_stats_statistics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_stats_statistics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_gallery_gallery" ADD CONSTRAINT "_products_v_blocks_gallery_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_gallery_gallery_locales" ADD CONSTRAINT "_products_v_blocks_gallery_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_gallery_gallery_locales" ADD CONSTRAINT "_products_v_blocks_gallery_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_gallery_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_faq_questions" ADD CONSTRAINT "_products_v_blocks_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_faq_questions_locales" ADD CONSTRAINT "_products_v_blocks_faq_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_faq_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_community_showcase_gallery" ADD CONSTRAINT "_products_v_blocks_community_showcase_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_community_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_community_showcase_gallery_locales" ADD CONSTRAINT "_products_v_blocks_community_showcase_gallery_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_community_showcase_gallery_locales" ADD CONSTRAINT "_products_v_blocks_community_showcase_gallery_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_community_showcase_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_features" ADD CONSTRAINT "_products_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_features_locales" ADD CONSTRAINT "_products_v_version_features_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_features_locales" ADD CONSTRAINT "_products_v_version_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links_locales" ADD CONSTRAINT "site_settings_social_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_social_links" ADD CONSTRAINT "_site_settings_v_version_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_social_links_locales" ADD CONSTRAINT "_site_settings_v_version_social_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v_version_social_links"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_media_showcase_gallery_order_idx" ON "pages_blocks_media_showcase_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_showcase_gallery_parent_id_idx" ON "pages_blocks_media_showcase_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_showcase_gallery_image_idx" ON "pages_blocks_media_showcase_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_media_showcase_gallery_locales_locale_parent_id" ON "pages_blocks_media_showcase_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_media_showcase_gallery_locales_parent_id_idx" ON "pages_blocks_media_showcase_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_statistics_order_idx" ON "pages_blocks_stats_statistics" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_statistics_parent_id_idx" ON "pages_blocks_stats_statistics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_stats_statistics_locales_locale_parent_id_uniqu" ON "pages_blocks_stats_statistics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stats_statistics_locales_parent_id_idx" ON "pages_blocks_stats_statistics_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_gallery_order_idx" ON "pages_blocks_gallery_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_gallery_parent_id_idx" ON "pages_blocks_gallery_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_gallery_image_idx" ON "pages_blocks_gallery_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_gallery_gallery_locales_locale_parent_id_unique" ON "pages_blocks_gallery_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gallery_gallery_locales_parent_id_idx" ON "pages_blocks_gallery_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_questions_order_idx" ON "pages_blocks_faq_questions" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_questions_parent_id_idx" ON "pages_blocks_faq_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_questions_locales_locale_parent_id_unique" ON "pages_blocks_faq_questions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_questions_locales_parent_id_idx" ON "pages_blocks_faq_questions_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_community_showcase_gallery_order_idx" ON "pages_blocks_community_showcase_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_community_showcase_gallery_parent_id_idx" ON "pages_blocks_community_showcase_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_community_showcase_gallery_image_idx" ON "pages_blocks_community_showcase_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_community_showcase_gallery_locales_locale_paren" ON "pages_blocks_community_showcase_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_community_showcase_gallery_locales_parent_i_idx" ON "pages_blocks_community_showcase_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_showcase_gallery_order_idx" ON "_pages_v_blocks_media_showcase_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_showcase_gallery_parent_id_idx" ON "_pages_v_blocks_media_showcase_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_showcase_gallery_image_idx" ON "_pages_v_blocks_media_showcase_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_media_showcase_gallery_locales_locale_parent" ON "_pages_v_blocks_media_showcase_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_media_showcase_gallery_locales_parent_id_idx" ON "_pages_v_blocks_media_showcase_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_statistics_order_idx" ON "_pages_v_blocks_stats_statistics" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_statistics_parent_id_idx" ON "_pages_v_blocks_stats_statistics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_stats_statistics_locales_locale_parent_id_un" ON "_pages_v_blocks_stats_statistics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_statistics_locales_parent_id_idx" ON "_pages_v_blocks_stats_statistics_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_gallery_order_idx" ON "_pages_v_blocks_gallery_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_gallery_parent_id_idx" ON "_pages_v_blocks_gallery_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_gallery_image_idx" ON "_pages_v_blocks_gallery_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_gallery_gallery_locales_locale_parent_id_uni" ON "_pages_v_blocks_gallery_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_gallery_locales_parent_id_idx" ON "_pages_v_blocks_gallery_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_questions_order_idx" ON "_pages_v_blocks_faq_questions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_questions_parent_id_idx" ON "_pages_v_blocks_faq_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_questions_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_faq_questions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_questions_locales_parent_id_idx" ON "_pages_v_blocks_faq_questions_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_community_showcase_gallery_order_idx" ON "_pages_v_blocks_community_showcase_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_community_showcase_gallery_parent_id_idx" ON "_pages_v_blocks_community_showcase_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_community_showcase_gallery_image_idx" ON "_pages_v_blocks_community_showcase_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_community_showcase_gallery_locales_locale_pa" ON "_pages_v_blocks_community_showcase_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_community_showcase_gallery_locales_paren_idx" ON "_pages_v_blocks_community_showcase_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_media_showcase_gallery_order_idx" ON "posts_blocks_media_showcase_gallery" USING btree ("_order");
  CREATE INDEX "posts_blocks_media_showcase_gallery_parent_id_idx" ON "posts_blocks_media_showcase_gallery" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_media_showcase_gallery_image_idx" ON "posts_blocks_media_showcase_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_media_showcase_gallery_locales_locale_parent_id" ON "posts_blocks_media_showcase_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_media_showcase_gallery_locales_parent_id_idx" ON "posts_blocks_media_showcase_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_stats_statistics_order_idx" ON "posts_blocks_stats_statistics" USING btree ("_order");
  CREATE INDEX "posts_blocks_stats_statistics_parent_id_idx" ON "posts_blocks_stats_statistics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_stats_statistics_locales_locale_parent_id_uniqu" ON "posts_blocks_stats_statistics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_stats_statistics_locales_parent_id_idx" ON "posts_blocks_stats_statistics_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_gallery_gallery_order_idx" ON "posts_blocks_gallery_gallery" USING btree ("_order");
  CREATE INDEX "posts_blocks_gallery_gallery_parent_id_idx" ON "posts_blocks_gallery_gallery" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_gallery_gallery_image_idx" ON "posts_blocks_gallery_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_gallery_gallery_locales_locale_parent_id_unique" ON "posts_blocks_gallery_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_gallery_gallery_locales_parent_id_idx" ON "posts_blocks_gallery_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_faq_questions_order_idx" ON "posts_blocks_faq_questions" USING btree ("_order");
  CREATE INDEX "posts_blocks_faq_questions_parent_id_idx" ON "posts_blocks_faq_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_faq_questions_locales_locale_parent_id_unique" ON "posts_blocks_faq_questions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_faq_questions_locales_parent_id_idx" ON "posts_blocks_faq_questions_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_community_showcase_gallery_order_idx" ON "posts_blocks_community_showcase_gallery" USING btree ("_order");
  CREATE INDEX "posts_blocks_community_showcase_gallery_parent_id_idx" ON "posts_blocks_community_showcase_gallery" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_community_showcase_gallery_image_idx" ON "posts_blocks_community_showcase_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "posts_blocks_community_showcase_gallery_locales_locale_paren" ON "posts_blocks_community_showcase_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_community_showcase_gallery_locales_parent_i_idx" ON "posts_blocks_community_showcase_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_media_showcase_gallery_order_idx" ON "_posts_v_blocks_media_showcase_gallery" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_media_showcase_gallery_parent_id_idx" ON "_posts_v_blocks_media_showcase_gallery" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_media_showcase_gallery_image_idx" ON "_posts_v_blocks_media_showcase_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_media_showcase_gallery_locales_locale_parent" ON "_posts_v_blocks_media_showcase_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_media_showcase_gallery_locales_parent_id_idx" ON "_posts_v_blocks_media_showcase_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_stats_statistics_order_idx" ON "_posts_v_blocks_stats_statistics" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_stats_statistics_parent_id_idx" ON "_posts_v_blocks_stats_statistics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_stats_statistics_locales_locale_parent_id_un" ON "_posts_v_blocks_stats_statistics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_stats_statistics_locales_parent_id_idx" ON "_posts_v_blocks_stats_statistics_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_gallery_gallery_order_idx" ON "_posts_v_blocks_gallery_gallery" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_gallery_gallery_parent_id_idx" ON "_posts_v_blocks_gallery_gallery" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_gallery_gallery_image_idx" ON "_posts_v_blocks_gallery_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_gallery_gallery_locales_locale_parent_id_uni" ON "_posts_v_blocks_gallery_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_gallery_gallery_locales_parent_id_idx" ON "_posts_v_blocks_gallery_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_questions_order_idx" ON "_posts_v_blocks_faq_questions" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_faq_questions_parent_id_idx" ON "_posts_v_blocks_faq_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_faq_questions_locales_locale_parent_id_uniqu" ON "_posts_v_blocks_faq_questions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_questions_locales_parent_id_idx" ON "_posts_v_blocks_faq_questions_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_community_showcase_gallery_order_idx" ON "_posts_v_blocks_community_showcase_gallery" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_community_showcase_gallery_parent_id_idx" ON "_posts_v_blocks_community_showcase_gallery" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_community_showcase_gallery_image_idx" ON "_posts_v_blocks_community_showcase_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_blocks_community_showcase_gallery_locales_locale_pa" ON "_posts_v_blocks_community_showcase_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_community_showcase_gallery_locales_paren_idx" ON "_posts_v_blocks_community_showcase_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_media_showcase_gallery_order_idx" ON "projects_blocks_media_showcase_gallery" USING btree ("_order");
  CREATE INDEX "projects_blocks_media_showcase_gallery_parent_id_idx" ON "projects_blocks_media_showcase_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_media_showcase_gallery_image_idx" ON "projects_blocks_media_showcase_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_media_showcase_gallery_locales_locale_parent" ON "projects_blocks_media_showcase_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_media_showcase_gallery_locales_parent_id_idx" ON "projects_blocks_media_showcase_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stats_statistics_order_idx" ON "projects_blocks_stats_statistics" USING btree ("_order");
  CREATE INDEX "projects_blocks_stats_statistics_parent_id_idx" ON "projects_blocks_stats_statistics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_stats_statistics_locales_locale_parent_id_un" ON "projects_blocks_stats_statistics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_stats_statistics_locales_parent_id_idx" ON "projects_blocks_stats_statistics_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_gallery_order_idx" ON "projects_blocks_gallery_gallery" USING btree ("_order");
  CREATE INDEX "projects_blocks_gallery_gallery_parent_id_idx" ON "projects_blocks_gallery_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_gallery_image_idx" ON "projects_blocks_gallery_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_gallery_gallery_locales_locale_parent_id_uni" ON "projects_blocks_gallery_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_gallery_gallery_locales_parent_id_idx" ON "projects_blocks_gallery_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_faq_questions_order_idx" ON "projects_blocks_faq_questions" USING btree ("_order");
  CREATE INDEX "projects_blocks_faq_questions_parent_id_idx" ON "projects_blocks_faq_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_faq_questions_locales_locale_parent_id_uniqu" ON "projects_blocks_faq_questions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_faq_questions_locales_parent_id_idx" ON "projects_blocks_faq_questions_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_community_showcase_gallery_order_idx" ON "projects_blocks_community_showcase_gallery" USING btree ("_order");
  CREATE INDEX "projects_blocks_community_showcase_gallery_parent_id_idx" ON "projects_blocks_community_showcase_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_community_showcase_gallery_image_idx" ON "projects_blocks_community_showcase_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "projects_blocks_community_showcase_gallery_locales_locale_pa" ON "projects_blocks_community_showcase_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_community_showcase_gallery_locales_paren_idx" ON "projects_blocks_community_showcase_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_gallery_order_idx" ON "projects_gallery" USING btree ("_order");
  CREATE INDEX "projects_gallery_parent_id_idx" ON "projects_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_gallery_image_idx" ON "projects_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "projects_gallery_locales_locale_parent_id_unique" ON "projects_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_gallery_locales_parent_id_idx" ON "projects_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_media_showcase_gallery_order_idx" ON "_projects_v_blocks_media_showcase_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_media_showcase_gallery_parent_id_idx" ON "_projects_v_blocks_media_showcase_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_media_showcase_gallery_image_idx" ON "_projects_v_blocks_media_showcase_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_media_showcase_gallery_locales_locale_par" ON "_projects_v_blocks_media_showcase_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_media_showcase_gallery_locales_parent_idx" ON "_projects_v_blocks_media_showcase_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_statistics_order_idx" ON "_projects_v_blocks_stats_statistics" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_stats_statistics_parent_id_idx" ON "_projects_v_blocks_stats_statistics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_stats_statistics_locales_locale_parent_id" ON "_projects_v_blocks_stats_statistics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_statistics_locales_parent_id_idx" ON "_projects_v_blocks_stats_statistics_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_gallery_order_idx" ON "_projects_v_blocks_gallery_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_gallery_gallery_parent_id_idx" ON "_projects_v_blocks_gallery_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_gallery_image_idx" ON "_projects_v_blocks_gallery_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_gallery_gallery_locales_locale_parent_id_" ON "_projects_v_blocks_gallery_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_gallery_locales_parent_id_idx" ON "_projects_v_blocks_gallery_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_faq_questions_order_idx" ON "_projects_v_blocks_faq_questions" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_faq_questions_parent_id_idx" ON "_projects_v_blocks_faq_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_faq_questions_locales_locale_parent_id_un" ON "_projects_v_blocks_faq_questions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_faq_questions_locales_parent_id_idx" ON "_projects_v_blocks_faq_questions_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_community_showcase_gallery_order_idx" ON "_projects_v_blocks_community_showcase_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_community_showcase_gallery_parent_id_idx" ON "_projects_v_blocks_community_showcase_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_community_showcase_gallery_image_idx" ON "_projects_v_blocks_community_showcase_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_blocks_community_showcase_gallery_locales_locale" ON "_projects_v_blocks_community_showcase_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_community_showcase_gallery_locales_pa_idx" ON "_projects_v_blocks_community_showcase_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_gallery_order_idx" ON "_projects_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_version_gallery_parent_id_idx" ON "_projects_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_gallery_image_idx" ON "_projects_v_version_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_version_gallery_locales_locale_parent_id_unique" ON "_projects_v_version_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_gallery_locales_parent_id_idx" ON "_projects_v_version_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_media_showcase_gallery_order_idx" ON "products_blocks_media_showcase_gallery" USING btree ("_order");
  CREATE INDEX "products_blocks_media_showcase_gallery_parent_id_idx" ON "products_blocks_media_showcase_gallery" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_media_showcase_gallery_image_idx" ON "products_blocks_media_showcase_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_media_showcase_gallery_locales_locale_parent" ON "products_blocks_media_showcase_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_media_showcase_gallery_locales_parent_id_idx" ON "products_blocks_media_showcase_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_stats_statistics_order_idx" ON "products_blocks_stats_statistics" USING btree ("_order");
  CREATE INDEX "products_blocks_stats_statistics_parent_id_idx" ON "products_blocks_stats_statistics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_blocks_stats_statistics_locales_locale_parent_id_un" ON "products_blocks_stats_statistics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_stats_statistics_locales_parent_id_idx" ON "products_blocks_stats_statistics_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_gallery_gallery_order_idx" ON "products_blocks_gallery_gallery" USING btree ("_order");
  CREATE INDEX "products_blocks_gallery_gallery_parent_id_idx" ON "products_blocks_gallery_gallery" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_gallery_gallery_image_idx" ON "products_blocks_gallery_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_gallery_gallery_locales_locale_parent_id_uni" ON "products_blocks_gallery_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_gallery_gallery_locales_parent_id_idx" ON "products_blocks_gallery_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_faq_questions_order_idx" ON "products_blocks_faq_questions" USING btree ("_order");
  CREATE INDEX "products_blocks_faq_questions_parent_id_idx" ON "products_blocks_faq_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_blocks_faq_questions_locales_locale_parent_id_uniqu" ON "products_blocks_faq_questions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_faq_questions_locales_parent_id_idx" ON "products_blocks_faq_questions_locales" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_community_showcase_gallery_order_idx" ON "products_blocks_community_showcase_gallery" USING btree ("_order");
  CREATE INDEX "products_blocks_community_showcase_gallery_parent_id_idx" ON "products_blocks_community_showcase_gallery" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_community_showcase_gallery_image_idx" ON "products_blocks_community_showcase_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "products_blocks_community_showcase_gallery_locales_locale_pa" ON "products_blocks_community_showcase_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_blocks_community_showcase_gallery_locales_paren_idx" ON "products_blocks_community_showcase_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "products_features_order_idx" ON "products_features" USING btree ("_order");
  CREATE INDEX "products_features_parent_id_idx" ON "products_features" USING btree ("_parent_id");
  CREATE INDEX "products_features_media_idx" ON "products_features_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "products_features_locales_locale_parent_id_unique" ON "products_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_features_locales_parent_id_idx" ON "products_features_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_media_showcase_gallery_order_idx" ON "_products_v_blocks_media_showcase_gallery" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_media_showcase_gallery_parent_id_idx" ON "_products_v_blocks_media_showcase_gallery" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_media_showcase_gallery_image_idx" ON "_products_v_blocks_media_showcase_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_media_showcase_gallery_locales_locale_par" ON "_products_v_blocks_media_showcase_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_media_showcase_gallery_locales_parent_idx" ON "_products_v_blocks_media_showcase_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_stats_statistics_order_idx" ON "_products_v_blocks_stats_statistics" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_stats_statistics_parent_id_idx" ON "_products_v_blocks_stats_statistics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_products_v_blocks_stats_statistics_locales_locale_parent_id" ON "_products_v_blocks_stats_statistics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_stats_statistics_locales_parent_id_idx" ON "_products_v_blocks_stats_statistics_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_gallery_gallery_order_idx" ON "_products_v_blocks_gallery_gallery" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_gallery_gallery_parent_id_idx" ON "_products_v_blocks_gallery_gallery" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_gallery_gallery_image_idx" ON "_products_v_blocks_gallery_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_gallery_gallery_locales_locale_parent_id_" ON "_products_v_blocks_gallery_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_gallery_gallery_locales_parent_id_idx" ON "_products_v_blocks_gallery_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_faq_questions_order_idx" ON "_products_v_blocks_faq_questions" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_faq_questions_parent_id_idx" ON "_products_v_blocks_faq_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_products_v_blocks_faq_questions_locales_locale_parent_id_un" ON "_products_v_blocks_faq_questions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_faq_questions_locales_parent_id_idx" ON "_products_v_blocks_faq_questions_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_community_showcase_gallery_order_idx" ON "_products_v_blocks_community_showcase_gallery" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_community_showcase_gallery_parent_id_idx" ON "_products_v_blocks_community_showcase_gallery" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_community_showcase_gallery_image_idx" ON "_products_v_blocks_community_showcase_gallery_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "_products_v_blocks_community_showcase_gallery_locales_locale" ON "_products_v_blocks_community_showcase_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_blocks_community_showcase_gallery_locales_pa_idx" ON "_products_v_blocks_community_showcase_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_features_order_idx" ON "_products_v_version_features" USING btree ("_order");
  CREATE INDEX "_products_v_version_features_parent_id_idx" ON "_products_v_version_features" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_features_media_idx" ON "_products_v_version_features_locales" USING btree ("media_id","_locale");
  CREATE UNIQUE INDEX "_products_v_version_features_locales_locale_parent_id_unique" ON "_products_v_version_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_version_features_locales_parent_id_idx" ON "_products_v_version_features_locales" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_social_links_locales_locale_parent_id_unique" ON "site_settings_social_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_social_links_locales_parent_id_idx" ON "site_settings_social_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_social_links_order_idx" ON "_site_settings_v_version_social_links" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_social_links_parent_id_idx" ON "_site_settings_v_version_social_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_site_settings_v_version_social_links_locales_locale_parent_" ON "_site_settings_v_version_social_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_version_social_links_locales_parent_id_idx" ON "_site_settings_v_version_social_links_locales" USING btree ("_parent_id");
  ALTER TABLE "pages_blocks_video_embed_locales" ADD CONSTRAINT "pages_blocks_video_embed_locales_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_feed" ADD CONSTRAINT "pages_blocks_portfolio_feed_category_id_portfolio_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."portfolio_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_feed" ADD CONSTRAINT "pages_blocks_news_feed_category_id_post_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."post_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_embed_locales" ADD CONSTRAINT "_pages_v_blocks_video_embed_locales_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_feed" ADD CONSTRAINT "_pages_v_blocks_portfolio_feed_category_id_portfolio_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."portfolio_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_news_feed" ADD CONSTRAINT "_pages_v_blocks_news_feed_category_id_post_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."post_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_video_embed_locales" ADD CONSTRAINT "posts_blocks_video_embed_locales_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_portfolio_feed" ADD CONSTRAINT "posts_blocks_portfolio_feed_category_id_portfolio_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."portfolio_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_news_feed" ADD CONSTRAINT "posts_blocks_news_feed_category_id_post_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."post_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_video_embed_locales" ADD CONSTRAINT "_posts_v_blocks_video_embed_locales_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_portfolio_feed" ADD CONSTRAINT "_posts_v_blocks_portfolio_feed_category_id_portfolio_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."portfolio_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_news_feed" ADD CONSTRAINT "_posts_v_blocks_news_feed_category_id_post_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."post_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_video_embed_locales" ADD CONSTRAINT "projects_blocks_video_embed_locales_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_portfolio_feed" ADD CONSTRAINT "projects_blocks_portfolio_feed_category_id_portfolio_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."portfolio_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_news_feed" ADD CONSTRAINT "projects_blocks_news_feed_category_id_post_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."post_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video_embed_locales" ADD CONSTRAINT "_projects_v_blocks_video_embed_locales_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_portfolio_feed" ADD CONSTRAINT "_projects_v_blocks_portfolio_feed_category_id_portfolio_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."portfolio_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_news_feed" ADD CONSTRAINT "_projects_v_blocks_news_feed_category_id_post_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."post_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_video_embed_locales" ADD CONSTRAINT "products_blocks_video_embed_locales_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_portfolio_feed" ADD CONSTRAINT "products_blocks_portfolio_feed_category_id_portfolio_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."portfolio_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_news_feed" ADD CONSTRAINT "products_blocks_news_feed_category_id_post_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."post_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_video_embed_locales" ADD CONSTRAINT "_products_v_blocks_video_embed_locales_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_portfolio_feed" ADD CONSTRAINT "_products_v_blocks_portfolio_feed_category_id_portfolio_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."portfolio_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_news_feed" ADD CONSTRAINT "_products_v_blocks_news_feed_category_id_post_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."post_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_open_graph_image_id_media_id_fk" FOREIGN KEY ("open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_video_embed_poster_idx" ON "pages_blocks_video_embed_locales" USING btree ("poster_id","_locale");
  CREATE INDEX "pages_blocks_portfolio_feed_category_idx" ON "pages_blocks_portfolio_feed" USING btree ("category_id");
  CREATE INDEX "pages_blocks_news_feed_category_idx" ON "pages_blocks_news_feed" USING btree ("category_id");
  CREATE INDEX "_pages_v_blocks_video_embed_poster_idx" ON "_pages_v_blocks_video_embed_locales" USING btree ("poster_id","_locale");
  CREATE INDEX "_pages_v_blocks_portfolio_feed_category_idx" ON "_pages_v_blocks_portfolio_feed" USING btree ("category_id");
  CREATE INDEX "_pages_v_blocks_news_feed_category_idx" ON "_pages_v_blocks_news_feed" USING btree ("category_id");
  CREATE INDEX "posts_blocks_video_embed_poster_idx" ON "posts_blocks_video_embed_locales" USING btree ("poster_id","_locale");
  CREATE INDEX "posts_blocks_portfolio_feed_category_idx" ON "posts_blocks_portfolio_feed" USING btree ("category_id");
  CREATE INDEX "posts_blocks_news_feed_category_idx" ON "posts_blocks_news_feed" USING btree ("category_id");
  CREATE INDEX "_posts_v_blocks_video_embed_poster_idx" ON "_posts_v_blocks_video_embed_locales" USING btree ("poster_id","_locale");
  CREATE INDEX "_posts_v_blocks_portfolio_feed_category_idx" ON "_posts_v_blocks_portfolio_feed" USING btree ("category_id");
  CREATE INDEX "_posts_v_blocks_news_feed_category_idx" ON "_posts_v_blocks_news_feed" USING btree ("category_id");
  CREATE INDEX "projects_blocks_video_embed_poster_idx" ON "projects_blocks_video_embed_locales" USING btree ("poster_id","_locale");
  CREATE INDEX "projects_blocks_portfolio_feed_category_idx" ON "projects_blocks_portfolio_feed" USING btree ("category_id");
  CREATE INDEX "projects_blocks_news_feed_category_idx" ON "projects_blocks_news_feed" USING btree ("category_id");
  CREATE INDEX "_projects_v_blocks_video_embed_poster_idx" ON "_projects_v_blocks_video_embed_locales" USING btree ("poster_id","_locale");
  CREATE INDEX "_projects_v_blocks_portfolio_feed_category_idx" ON "_projects_v_blocks_portfolio_feed" USING btree ("category_id");
  CREATE INDEX "_projects_v_blocks_news_feed_category_idx" ON "_projects_v_blocks_news_feed" USING btree ("category_id");
  CREATE INDEX "products_blocks_video_embed_poster_idx" ON "products_blocks_video_embed_locales" USING btree ("poster_id","_locale");
  CREATE INDEX "products_blocks_portfolio_feed_category_idx" ON "products_blocks_portfolio_feed" USING btree ("category_id");
  CREATE INDEX "products_blocks_news_feed_category_idx" ON "products_blocks_news_feed" USING btree ("category_id");
  CREATE INDEX "_products_v_blocks_video_embed_poster_idx" ON "_products_v_blocks_video_embed_locales" USING btree ("poster_id","_locale");
  CREATE INDEX "_products_v_blocks_portfolio_feed_category_idx" ON "_products_v_blocks_portfolio_feed" USING btree ("category_id");
  CREATE INDEX "_products_v_blocks_news_feed_category_idx" ON "_products_v_blocks_news_feed" USING btree ("category_id");
  CREATE INDEX "site_settings_open_graph_image_idx" ON "site_settings" USING btree ("open_graph_image_id");
  CREATE INDEX "_site_settings_v_version_version_open_graph_image_idx" ON "_site_settings_v" USING btree ("version_open_graph_image_id");
  ALTER TABLE "media" DROP COLUMN "focal_x";
  ALTER TABLE "media" DROP COLUMN "focal_y";`)
  // Preserve all actor identities still available when upgrading the existing event log.
  await db.execute(sql`UPDATE audit_events e SET actor_id_snapshot = COALESCE(e.actor_id::text, 'legacy-unknown'), actor_role_snapshot = 'legacy-unknown' WHERE e.actor_id_snapshot = 'legacy-unknown';`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_media_showcase_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_media_showcase_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats_statistics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats_statistics_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_gallery_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_gallery_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_questions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_community_showcase_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_community_showcase_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_media_showcase_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_media_showcase_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats_statistics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats_statistics_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_gallery_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_gallery_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_questions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_community_showcase_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_community_showcase_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_media_showcase_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_media_showcase_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_stats_statistics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_stats_statistics_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_gallery_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_gallery_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_faq_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_faq_questions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_community_showcase_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_community_showcase_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_media_showcase_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_media_showcase_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_stats_statistics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_stats_statistics_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_gallery_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_gallery_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_faq_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_faq_questions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_community_showcase_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_community_showcase_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_media_showcase_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_media_showcase_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_stats_statistics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_stats_statistics_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_gallery_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_gallery_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_faq_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_faq_questions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_community_showcase_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_community_showcase_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_media_showcase_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_media_showcase_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_stats_statistics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_stats_statistics_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_gallery_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_gallery_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_faq_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_faq_questions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_community_showcase_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_community_showcase_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_version_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_version_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_media_showcase_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_media_showcase_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_stats_statistics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_stats_statistics_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_gallery_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_gallery_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_faq_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_faq_questions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_community_showcase_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_community_showcase_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_media_showcase_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_media_showcase_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_stats_statistics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_stats_statistics_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_gallery_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_gallery_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_faq_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_faq_questions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_community_showcase_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_community_showcase_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_social_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v_version_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v_version_social_links_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_media_showcase_gallery" CASCADE;
  DROP TABLE "pages_blocks_media_showcase_gallery_locales" CASCADE;
  DROP TABLE "pages_blocks_stats_statistics" CASCADE;
  DROP TABLE "pages_blocks_stats_statistics_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery_gallery" CASCADE;
  DROP TABLE "pages_blocks_gallery_gallery_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_questions" CASCADE;
  DROP TABLE "pages_blocks_faq_questions_locales" CASCADE;
  DROP TABLE "pages_blocks_community_showcase_gallery" CASCADE;
  DROP TABLE "pages_blocks_community_showcase_gallery_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_media_showcase_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_media_showcase_gallery_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_statistics" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_statistics_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_gallery_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_questions" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_questions_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_community_showcase_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_community_showcase_gallery_locales" CASCADE;
  DROP TABLE "posts_blocks_media_showcase_gallery" CASCADE;
  DROP TABLE "posts_blocks_media_showcase_gallery_locales" CASCADE;
  DROP TABLE "posts_blocks_stats_statistics" CASCADE;
  DROP TABLE "posts_blocks_stats_statistics_locales" CASCADE;
  DROP TABLE "posts_blocks_gallery_gallery" CASCADE;
  DROP TABLE "posts_blocks_gallery_gallery_locales" CASCADE;
  DROP TABLE "posts_blocks_faq_questions" CASCADE;
  DROP TABLE "posts_blocks_faq_questions_locales" CASCADE;
  DROP TABLE "posts_blocks_community_showcase_gallery" CASCADE;
  DROP TABLE "posts_blocks_community_showcase_gallery_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_media_showcase_gallery" CASCADE;
  DROP TABLE "_posts_v_blocks_media_showcase_gallery_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_stats_statistics" CASCADE;
  DROP TABLE "_posts_v_blocks_stats_statistics_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_gallery_gallery" CASCADE;
  DROP TABLE "_posts_v_blocks_gallery_gallery_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_faq_questions" CASCADE;
  DROP TABLE "_posts_v_blocks_faq_questions_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_community_showcase_gallery" CASCADE;
  DROP TABLE "_posts_v_blocks_community_showcase_gallery_locales" CASCADE;
  DROP TABLE "projects_blocks_media_showcase_gallery" CASCADE;
  DROP TABLE "projects_blocks_media_showcase_gallery_locales" CASCADE;
  DROP TABLE "projects_blocks_stats_statistics" CASCADE;
  DROP TABLE "projects_blocks_stats_statistics_locales" CASCADE;
  DROP TABLE "projects_blocks_gallery_gallery" CASCADE;
  DROP TABLE "projects_blocks_gallery_gallery_locales" CASCADE;
  DROP TABLE "projects_blocks_faq_questions" CASCADE;
  DROP TABLE "projects_blocks_faq_questions_locales" CASCADE;
  DROP TABLE "projects_blocks_community_showcase_gallery" CASCADE;
  DROP TABLE "projects_blocks_community_showcase_gallery_locales" CASCADE;
  DROP TABLE "projects_gallery" CASCADE;
  DROP TABLE "projects_gallery_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_media_showcase_gallery" CASCADE;
  DROP TABLE "_projects_v_blocks_media_showcase_gallery_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_stats_statistics" CASCADE;
  DROP TABLE "_projects_v_blocks_stats_statistics_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery_gallery" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery_gallery_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_faq_questions" CASCADE;
  DROP TABLE "_projects_v_blocks_faq_questions_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_community_showcase_gallery" CASCADE;
  DROP TABLE "_projects_v_blocks_community_showcase_gallery_locales" CASCADE;
  DROP TABLE "_projects_v_version_gallery" CASCADE;
  DROP TABLE "_projects_v_version_gallery_locales" CASCADE;
  DROP TABLE "products_blocks_media_showcase_gallery" CASCADE;
  DROP TABLE "products_blocks_media_showcase_gallery_locales" CASCADE;
  DROP TABLE "products_blocks_stats_statistics" CASCADE;
  DROP TABLE "products_blocks_stats_statistics_locales" CASCADE;
  DROP TABLE "products_blocks_gallery_gallery" CASCADE;
  DROP TABLE "products_blocks_gallery_gallery_locales" CASCADE;
  DROP TABLE "products_blocks_faq_questions" CASCADE;
  DROP TABLE "products_blocks_faq_questions_locales" CASCADE;
  DROP TABLE "products_blocks_community_showcase_gallery" CASCADE;
  DROP TABLE "products_blocks_community_showcase_gallery_locales" CASCADE;
  DROP TABLE "products_features" CASCADE;
  DROP TABLE "products_features_locales" CASCADE;
  DROP TABLE "_products_v_blocks_media_showcase_gallery" CASCADE;
  DROP TABLE "_products_v_blocks_media_showcase_gallery_locales" CASCADE;
  DROP TABLE "_products_v_blocks_stats_statistics" CASCADE;
  DROP TABLE "_products_v_blocks_stats_statistics_locales" CASCADE;
  DROP TABLE "_products_v_blocks_gallery_gallery" CASCADE;
  DROP TABLE "_products_v_blocks_gallery_gallery_locales" CASCADE;
  DROP TABLE "_products_v_blocks_faq_questions" CASCADE;
  DROP TABLE "_products_v_blocks_faq_questions_locales" CASCADE;
  DROP TABLE "_products_v_blocks_community_showcase_gallery" CASCADE;
  DROP TABLE "_products_v_blocks_community_showcase_gallery_locales" CASCADE;
  DROP TABLE "_products_v_version_features" CASCADE;
  DROP TABLE "_products_v_version_features_locales" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings_social_links_locales" CASCADE;
  DROP TABLE "_site_settings_v_version_social_links" CASCADE;
  DROP TABLE "_site_settings_v_version_social_links_locales" CASCADE;
  ALTER TABLE "pages_blocks_video_embed_locales" DROP CONSTRAINT IF EXISTS "pages_blocks_video_embed_locales_poster_id_media_id_fk";

  ALTER TABLE "pages_blocks_portfolio_feed" DROP CONSTRAINT IF EXISTS "pages_blocks_portfolio_feed_category_id_portfolio_categories_id_fk";

  ALTER TABLE "pages_blocks_news_feed" DROP CONSTRAINT IF EXISTS "pages_blocks_news_feed_category_id_post_categories_id_fk";

  ALTER TABLE "_pages_v_blocks_video_embed_locales" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_video_embed_locales_poster_id_media_id_fk";

  ALTER TABLE "_pages_v_blocks_portfolio_feed" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_portfolio_feed_category_id_portfolio_categories_id_fk";

  ALTER TABLE "_pages_v_blocks_news_feed" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_news_feed_category_id_post_categories_id_fk";

  ALTER TABLE "posts_blocks_video_embed_locales" DROP CONSTRAINT IF EXISTS "posts_blocks_video_embed_locales_poster_id_media_id_fk";

  ALTER TABLE "posts_blocks_portfolio_feed" DROP CONSTRAINT IF EXISTS "posts_blocks_portfolio_feed_category_id_portfolio_categories_id_fk";

  ALTER TABLE "posts_blocks_news_feed" DROP CONSTRAINT IF EXISTS "posts_blocks_news_feed_category_id_post_categories_id_fk";

  ALTER TABLE "_posts_v_blocks_video_embed_locales" DROP CONSTRAINT IF EXISTS "_posts_v_blocks_video_embed_locales_poster_id_media_id_fk";

  ALTER TABLE "_posts_v_blocks_portfolio_feed" DROP CONSTRAINT IF EXISTS "_posts_v_blocks_portfolio_feed_category_id_portfolio_categories_id_fk";

  ALTER TABLE "_posts_v_blocks_news_feed" DROP CONSTRAINT IF EXISTS "_posts_v_blocks_news_feed_category_id_post_categories_id_fk";

  ALTER TABLE "projects_blocks_video_embed_locales" DROP CONSTRAINT IF EXISTS "projects_blocks_video_embed_locales_poster_id_media_id_fk";

  ALTER TABLE "projects_blocks_portfolio_feed" DROP CONSTRAINT IF EXISTS "projects_blocks_portfolio_feed_category_id_portfolio_categories_id_fk";

  ALTER TABLE "projects_blocks_news_feed" DROP CONSTRAINT IF EXISTS "projects_blocks_news_feed_category_id_post_categories_id_fk";

  ALTER TABLE "_projects_v_blocks_video_embed_locales" DROP CONSTRAINT IF EXISTS "_projects_v_blocks_video_embed_locales_poster_id_media_id_fk";

  ALTER TABLE "_projects_v_blocks_portfolio_feed" DROP CONSTRAINT IF EXISTS "_projects_v_blocks_portfolio_feed_category_id_portfolio_categories_id_fk";

  ALTER TABLE "_projects_v_blocks_news_feed" DROP CONSTRAINT IF EXISTS "_projects_v_blocks_news_feed_category_id_post_categories_id_fk";

  ALTER TABLE "products_blocks_video_embed_locales" DROP CONSTRAINT IF EXISTS "products_blocks_video_embed_locales_poster_id_media_id_fk";

  ALTER TABLE "products_blocks_portfolio_feed" DROP CONSTRAINT IF EXISTS "products_blocks_portfolio_feed_category_id_portfolio_categories_id_fk";

  ALTER TABLE "products_blocks_news_feed" DROP CONSTRAINT IF EXISTS "products_blocks_news_feed_category_id_post_categories_id_fk";

  ALTER TABLE "_products_v_blocks_video_embed_locales" DROP CONSTRAINT IF EXISTS "_products_v_blocks_video_embed_locales_poster_id_media_id_fk";

  ALTER TABLE "_products_v_blocks_portfolio_feed" DROP CONSTRAINT IF EXISTS "_products_v_blocks_portfolio_feed_category_id_portfolio_categories_id_fk";

  ALTER TABLE "_products_v_blocks_news_feed" DROP CONSTRAINT IF EXISTS "_products_v_blocks_news_feed_category_id_post_categories_id_fk";

  ALTER TABLE "site_settings" DROP CONSTRAINT IF EXISTS "site_settings_open_graph_image_id_media_id_fk";

  ALTER TABLE "_site_settings_v" DROP CONSTRAINT IF EXISTS "_site_settings_v_version_open_graph_image_id_media_id_fk";

  DROP INDEX "pages_blocks_video_embed_poster_idx";
  DROP INDEX "pages_blocks_portfolio_feed_category_idx";
  DROP INDEX "pages_blocks_news_feed_category_idx";
  DROP INDEX "_pages_v_blocks_video_embed_poster_idx";
  DROP INDEX "_pages_v_blocks_portfolio_feed_category_idx";
  DROP INDEX "_pages_v_blocks_news_feed_category_idx";
  DROP INDEX "posts_blocks_video_embed_poster_idx";
  DROP INDEX "posts_blocks_portfolio_feed_category_idx";
  DROP INDEX "posts_blocks_news_feed_category_idx";
  DROP INDEX "_posts_v_blocks_video_embed_poster_idx";
  DROP INDEX "_posts_v_blocks_portfolio_feed_category_idx";
  DROP INDEX "_posts_v_blocks_news_feed_category_idx";
  DROP INDEX "projects_blocks_video_embed_poster_idx";
  DROP INDEX "projects_blocks_portfolio_feed_category_idx";
  DROP INDEX "projects_blocks_news_feed_category_idx";
  DROP INDEX "_projects_v_blocks_video_embed_poster_idx";
  DROP INDEX "_projects_v_blocks_portfolio_feed_category_idx";
  DROP INDEX "_projects_v_blocks_news_feed_category_idx";
  DROP INDEX "products_blocks_video_embed_poster_idx";
  DROP INDEX "products_blocks_portfolio_feed_category_idx";
  DROP INDEX "products_blocks_news_feed_category_idx";
  DROP INDEX "_products_v_blocks_video_embed_poster_idx";
  DROP INDEX "_products_v_blocks_portfolio_feed_category_idx";
  DROP INDEX "_products_v_blocks_news_feed_category_idx";
  DROP INDEX "site_settings_open_graph_image_idx";
  DROP INDEX "_site_settings_v_version_version_open_graph_image_idx";
  ALTER TABLE "media" ADD COLUMN "focal_x" numeric;
  ALTER TABLE "media" ADD COLUMN "focal_y" numeric;
  ALTER TABLE "pages_blocks_hero_locales" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_hero_locales" DROP COLUMN "secondary_link";
  ALTER TABLE "pages_blocks_hero_locales" DROP COLUMN "secondary_link_label";
  ALTER TABLE "pages_blocks_rich_text_locales" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_rich_text_locales" DROP COLUMN "content";
  ALTER TABLE "pages_blocks_image_text" DROP COLUMN "image_position";
  ALTER TABLE "pages_blocks_image_text_locales" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_feature_grid" DROP COLUMN "columns";
  ALTER TABLE "pages_blocks_feature_grid_locales" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_media_showcase_locales" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_stats_locales" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_gallery_locales" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_video_embed_locales" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_video_embed_locales" DROP COLUMN "video_u_r_l";
  ALTER TABLE "pages_blocks_video_embed_locales" DROP COLUMN "poster_id";
  ALTER TABLE "pages_blocks_portfolio_feed" DROP COLUMN "category_id";
  ALTER TABLE "pages_blocks_portfolio_feed" DROP COLUMN "limit";
  ALTER TABLE "pages_blocks_portfolio_feed" DROP COLUMN "featured_only";
  ALTER TABLE "pages_blocks_portfolio_feed_locales" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_news_feed" DROP COLUMN "category_id";
  ALTER TABLE "pages_blocks_news_feed" DROP COLUMN "limit";
  ALTER TABLE "pages_blocks_news_feed_locales" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_faq_locales" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_call_to_action_locales" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_call_to_action_locales" DROP COLUMN "secondary_link";
  ALTER TABLE "pages_blocks_call_to_action_locales" DROP COLUMN "secondary_link_label";
  ALTER TABLE "pages_blocks_community_showcase_locales" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_hero_locales" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_hero_locales" DROP COLUMN "secondary_link";
  ALTER TABLE "_pages_v_blocks_hero_locales" DROP COLUMN "secondary_link_label";
  ALTER TABLE "_pages_v_blocks_rich_text_locales" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_rich_text_locales" DROP COLUMN "content";
  ALTER TABLE "_pages_v_blocks_image_text" DROP COLUMN "image_position";
  ALTER TABLE "_pages_v_blocks_image_text_locales" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_feature_grid" DROP COLUMN "columns";
  ALTER TABLE "_pages_v_blocks_feature_grid_locales" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_media_showcase_locales" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_stats_locales" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_gallery_locales" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_video_embed_locales" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_video_embed_locales" DROP COLUMN "video_u_r_l";
  ALTER TABLE "_pages_v_blocks_video_embed_locales" DROP COLUMN "poster_id";
  ALTER TABLE "_pages_v_blocks_portfolio_feed" DROP COLUMN "category_id";
  ALTER TABLE "_pages_v_blocks_portfolio_feed" DROP COLUMN "limit";
  ALTER TABLE "_pages_v_blocks_portfolio_feed" DROP COLUMN "featured_only";
  ALTER TABLE "_pages_v_blocks_portfolio_feed_locales" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_news_feed" DROP COLUMN "category_id";
  ALTER TABLE "_pages_v_blocks_news_feed" DROP COLUMN "limit";
  ALTER TABLE "_pages_v_blocks_news_feed_locales" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_faq_locales" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_call_to_action_locales" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_call_to_action_locales" DROP COLUMN "secondary_link";
  ALTER TABLE "_pages_v_blocks_call_to_action_locales" DROP COLUMN "secondary_link_label";
  ALTER TABLE "_pages_v_blocks_community_showcase_locales" DROP COLUMN "link_label";
  ALTER TABLE "posts_blocks_hero_locales" DROP COLUMN "link_label";
  ALTER TABLE "posts_blocks_hero_locales" DROP COLUMN "secondary_link";
  ALTER TABLE "posts_blocks_hero_locales" DROP COLUMN "secondary_link_label";
  ALTER TABLE "posts_blocks_rich_text_locales" DROP COLUMN "link_label";
  ALTER TABLE "posts_blocks_rich_text_locales" DROP COLUMN "content";
  ALTER TABLE "posts_blocks_image_text" DROP COLUMN "image_position";
  ALTER TABLE "posts_blocks_image_text_locales" DROP COLUMN "link_label";
  ALTER TABLE "posts_blocks_feature_grid" DROP COLUMN "columns";
  ALTER TABLE "posts_blocks_feature_grid_locales" DROP COLUMN "link_label";
  ALTER TABLE "posts_blocks_media_showcase_locales" DROP COLUMN "link_label";
  ALTER TABLE "posts_blocks_stats_locales" DROP COLUMN "link_label";
  ALTER TABLE "posts_blocks_gallery_locales" DROP COLUMN "link_label";
  ALTER TABLE "posts_blocks_video_embed_locales" DROP COLUMN "link_label";
  ALTER TABLE "posts_blocks_video_embed_locales" DROP COLUMN "video_u_r_l";
  ALTER TABLE "posts_blocks_video_embed_locales" DROP COLUMN "poster_id";
  ALTER TABLE "posts_blocks_portfolio_feed" DROP COLUMN "category_id";
  ALTER TABLE "posts_blocks_portfolio_feed" DROP COLUMN "limit";
  ALTER TABLE "posts_blocks_portfolio_feed" DROP COLUMN "featured_only";
  ALTER TABLE "posts_blocks_portfolio_feed_locales" DROP COLUMN "link_label";
  ALTER TABLE "posts_blocks_news_feed" DROP COLUMN "category_id";
  ALTER TABLE "posts_blocks_news_feed" DROP COLUMN "limit";
  ALTER TABLE "posts_blocks_news_feed_locales" DROP COLUMN "link_label";
  ALTER TABLE "posts_blocks_faq_locales" DROP COLUMN "link_label";
  ALTER TABLE "posts_blocks_call_to_action_locales" DROP COLUMN "link_label";
  ALTER TABLE "posts_blocks_call_to_action_locales" DROP COLUMN "secondary_link";
  ALTER TABLE "posts_blocks_call_to_action_locales" DROP COLUMN "secondary_link_label";
  ALTER TABLE "posts_blocks_community_showcase_locales" DROP COLUMN "link_label";
  ALTER TABLE "posts" DROP COLUMN "publish_at";
  ALTER TABLE "posts_locales" DROP COLUMN "content";
  ALTER TABLE "_posts_v_blocks_hero_locales" DROP COLUMN "link_label";
  ALTER TABLE "_posts_v_blocks_hero_locales" DROP COLUMN "secondary_link";
  ALTER TABLE "_posts_v_blocks_hero_locales" DROP COLUMN "secondary_link_label";
  ALTER TABLE "_posts_v_blocks_rich_text_locales" DROP COLUMN "link_label";
  ALTER TABLE "_posts_v_blocks_rich_text_locales" DROP COLUMN "content";
  ALTER TABLE "_posts_v_blocks_image_text" DROP COLUMN "image_position";
  ALTER TABLE "_posts_v_blocks_image_text_locales" DROP COLUMN "link_label";
  ALTER TABLE "_posts_v_blocks_feature_grid" DROP COLUMN "columns";
  ALTER TABLE "_posts_v_blocks_feature_grid_locales" DROP COLUMN "link_label";
  ALTER TABLE "_posts_v_blocks_media_showcase_locales" DROP COLUMN "link_label";
  ALTER TABLE "_posts_v_blocks_stats_locales" DROP COLUMN "link_label";
  ALTER TABLE "_posts_v_blocks_gallery_locales" DROP COLUMN "link_label";
  ALTER TABLE "_posts_v_blocks_video_embed_locales" DROP COLUMN "link_label";
  ALTER TABLE "_posts_v_blocks_video_embed_locales" DROP COLUMN "video_u_r_l";
  ALTER TABLE "_posts_v_blocks_video_embed_locales" DROP COLUMN "poster_id";
  ALTER TABLE "_posts_v_blocks_portfolio_feed" DROP COLUMN "category_id";
  ALTER TABLE "_posts_v_blocks_portfolio_feed" DROP COLUMN "limit";
  ALTER TABLE "_posts_v_blocks_portfolio_feed" DROP COLUMN "featured_only";
  ALTER TABLE "_posts_v_blocks_portfolio_feed_locales" DROP COLUMN "link_label";
  ALTER TABLE "_posts_v_blocks_news_feed" DROP COLUMN "category_id";
  ALTER TABLE "_posts_v_blocks_news_feed" DROP COLUMN "limit";
  ALTER TABLE "_posts_v_blocks_news_feed_locales" DROP COLUMN "link_label";
  ALTER TABLE "_posts_v_blocks_faq_locales" DROP COLUMN "link_label";
  ALTER TABLE "_posts_v_blocks_call_to_action_locales" DROP COLUMN "link_label";
  ALTER TABLE "_posts_v_blocks_call_to_action_locales" DROP COLUMN "secondary_link";
  ALTER TABLE "_posts_v_blocks_call_to_action_locales" DROP COLUMN "secondary_link_label";
  ALTER TABLE "_posts_v_blocks_community_showcase_locales" DROP COLUMN "link_label";
  ALTER TABLE "_posts_v" DROP COLUMN "version_publish_at";
  ALTER TABLE "_posts_v_locales" DROP COLUMN "version_content";
  ALTER TABLE "projects_blocks_hero_locales" DROP COLUMN "link_label";
  ALTER TABLE "projects_blocks_hero_locales" DROP COLUMN "secondary_link";
  ALTER TABLE "projects_blocks_hero_locales" DROP COLUMN "secondary_link_label";
  ALTER TABLE "projects_blocks_rich_text_locales" DROP COLUMN "link_label";
  ALTER TABLE "projects_blocks_rich_text_locales" DROP COLUMN "content";
  ALTER TABLE "projects_blocks_image_text" DROP COLUMN "image_position";
  ALTER TABLE "projects_blocks_image_text_locales" DROP COLUMN "link_label";
  ALTER TABLE "projects_blocks_feature_grid" DROP COLUMN "columns";
  ALTER TABLE "projects_blocks_feature_grid_locales" DROP COLUMN "link_label";
  ALTER TABLE "projects_blocks_media_showcase_locales" DROP COLUMN "link_label";
  ALTER TABLE "projects_blocks_stats_locales" DROP COLUMN "link_label";
  ALTER TABLE "projects_blocks_gallery_locales" DROP COLUMN "link_label";
  ALTER TABLE "projects_blocks_video_embed_locales" DROP COLUMN "link_label";
  ALTER TABLE "projects_blocks_video_embed_locales" DROP COLUMN "video_u_r_l";
  ALTER TABLE "projects_blocks_video_embed_locales" DROP COLUMN "poster_id";
  ALTER TABLE "projects_blocks_portfolio_feed" DROP COLUMN "category_id";
  ALTER TABLE "projects_blocks_portfolio_feed" DROP COLUMN "limit";
  ALTER TABLE "projects_blocks_portfolio_feed" DROP COLUMN "featured_only";
  ALTER TABLE "projects_blocks_portfolio_feed_locales" DROP COLUMN "link_label";
  ALTER TABLE "projects_blocks_news_feed" DROP COLUMN "category_id";
  ALTER TABLE "projects_blocks_news_feed" DROP COLUMN "limit";
  ALTER TABLE "projects_blocks_news_feed_locales" DROP COLUMN "link_label";
  ALTER TABLE "projects_blocks_faq_locales" DROP COLUMN "link_label";
  ALTER TABLE "projects_blocks_call_to_action_locales" DROP COLUMN "link_label";
  ALTER TABLE "projects_blocks_call_to_action_locales" DROP COLUMN "secondary_link";
  ALTER TABLE "projects_blocks_call_to_action_locales" DROP COLUMN "secondary_link_label";
  ALTER TABLE "projects_blocks_community_showcase_locales" DROP COLUMN "link_label";
  ALTER TABLE "projects" DROP COLUMN "featured";
  ALTER TABLE "projects_locales" DROP COLUMN "description";
  ALTER TABLE "projects_locales" DROP COLUMN "case_study";
  ALTER TABLE "_projects_v_blocks_hero_locales" DROP COLUMN "link_label";
  ALTER TABLE "_projects_v_blocks_hero_locales" DROP COLUMN "secondary_link";
  ALTER TABLE "_projects_v_blocks_hero_locales" DROP COLUMN "secondary_link_label";
  ALTER TABLE "_projects_v_blocks_rich_text_locales" DROP COLUMN "link_label";
  ALTER TABLE "_projects_v_blocks_rich_text_locales" DROP COLUMN "content";
  ALTER TABLE "_projects_v_blocks_image_text" DROP COLUMN "image_position";
  ALTER TABLE "_projects_v_blocks_image_text_locales" DROP COLUMN "link_label";
  ALTER TABLE "_projects_v_blocks_feature_grid" DROP COLUMN "columns";
  ALTER TABLE "_projects_v_blocks_feature_grid_locales" DROP COLUMN "link_label";
  ALTER TABLE "_projects_v_blocks_media_showcase_locales" DROP COLUMN "link_label";
  ALTER TABLE "_projects_v_blocks_stats_locales" DROP COLUMN "link_label";
  ALTER TABLE "_projects_v_blocks_gallery_locales" DROP COLUMN "link_label";
  ALTER TABLE "_projects_v_blocks_video_embed_locales" DROP COLUMN "link_label";
  ALTER TABLE "_projects_v_blocks_video_embed_locales" DROP COLUMN "video_u_r_l";
  ALTER TABLE "_projects_v_blocks_video_embed_locales" DROP COLUMN "poster_id";
  ALTER TABLE "_projects_v_blocks_portfolio_feed" DROP COLUMN "category_id";
  ALTER TABLE "_projects_v_blocks_portfolio_feed" DROP COLUMN "limit";
  ALTER TABLE "_projects_v_blocks_portfolio_feed" DROP COLUMN "featured_only";
  ALTER TABLE "_projects_v_blocks_portfolio_feed_locales" DROP COLUMN "link_label";
  ALTER TABLE "_projects_v_blocks_news_feed" DROP COLUMN "category_id";
  ALTER TABLE "_projects_v_blocks_news_feed" DROP COLUMN "limit";
  ALTER TABLE "_projects_v_blocks_news_feed_locales" DROP COLUMN "link_label";
  ALTER TABLE "_projects_v_blocks_faq_locales" DROP COLUMN "link_label";
  ALTER TABLE "_projects_v_blocks_call_to_action_locales" DROP COLUMN "link_label";
  ALTER TABLE "_projects_v_blocks_call_to_action_locales" DROP COLUMN "secondary_link";
  ALTER TABLE "_projects_v_blocks_call_to_action_locales" DROP COLUMN "secondary_link_label";
  ALTER TABLE "_projects_v_blocks_community_showcase_locales" DROP COLUMN "link_label";
  ALTER TABLE "_projects_v" DROP COLUMN "version_featured";
  ALTER TABLE "_projects_v_locales" DROP COLUMN "version_description";
  ALTER TABLE "_projects_v_locales" DROP COLUMN "version_case_study";
  ALTER TABLE "products_blocks_hero_locales" DROP COLUMN "link_label";
  ALTER TABLE "products_blocks_hero_locales" DROP COLUMN "secondary_link";
  ALTER TABLE "products_blocks_hero_locales" DROP COLUMN "secondary_link_label";
  ALTER TABLE "products_blocks_rich_text_locales" DROP COLUMN "link_label";
  ALTER TABLE "products_blocks_rich_text_locales" DROP COLUMN "content";
  ALTER TABLE "products_blocks_image_text" DROP COLUMN "image_position";
  ALTER TABLE "products_blocks_image_text_locales" DROP COLUMN "link_label";
  ALTER TABLE "products_blocks_feature_grid" DROP COLUMN "columns";
  ALTER TABLE "products_blocks_feature_grid_locales" DROP COLUMN "link_label";
  ALTER TABLE "products_blocks_media_showcase_locales" DROP COLUMN "link_label";
  ALTER TABLE "products_blocks_stats_locales" DROP COLUMN "link_label";
  ALTER TABLE "products_blocks_gallery_locales" DROP COLUMN "link_label";
  ALTER TABLE "products_blocks_video_embed_locales" DROP COLUMN "link_label";
  ALTER TABLE "products_blocks_video_embed_locales" DROP COLUMN "video_u_r_l";
  ALTER TABLE "products_blocks_video_embed_locales" DROP COLUMN "poster_id";
  ALTER TABLE "products_blocks_portfolio_feed" DROP COLUMN "category_id";
  ALTER TABLE "products_blocks_portfolio_feed" DROP COLUMN "limit";
  ALTER TABLE "products_blocks_portfolio_feed" DROP COLUMN "featured_only";
  ALTER TABLE "products_blocks_portfolio_feed_locales" DROP COLUMN "link_label";
  ALTER TABLE "products_blocks_news_feed" DROP COLUMN "category_id";
  ALTER TABLE "products_blocks_news_feed" DROP COLUMN "limit";
  ALTER TABLE "products_blocks_news_feed_locales" DROP COLUMN "link_label";
  ALTER TABLE "products_blocks_faq_locales" DROP COLUMN "link_label";
  ALTER TABLE "products_blocks_call_to_action_locales" DROP COLUMN "link_label";
  ALTER TABLE "products_blocks_call_to_action_locales" DROP COLUMN "secondary_link";
  ALTER TABLE "products_blocks_call_to_action_locales" DROP COLUMN "secondary_link_label";
  ALTER TABLE "products_blocks_community_showcase_locales" DROP COLUMN "link_label";
  ALTER TABLE "products_locales" DROP COLUMN "overview";
  ALTER TABLE "_products_v_blocks_hero_locales" DROP COLUMN "link_label";
  ALTER TABLE "_products_v_blocks_hero_locales" DROP COLUMN "secondary_link";
  ALTER TABLE "_products_v_blocks_hero_locales" DROP COLUMN "secondary_link_label";
  ALTER TABLE "_products_v_blocks_rich_text_locales" DROP COLUMN "link_label";
  ALTER TABLE "_products_v_blocks_rich_text_locales" DROP COLUMN "content";
  ALTER TABLE "_products_v_blocks_image_text" DROP COLUMN "image_position";
  ALTER TABLE "_products_v_blocks_image_text_locales" DROP COLUMN "link_label";
  ALTER TABLE "_products_v_blocks_feature_grid" DROP COLUMN "columns";
  ALTER TABLE "_products_v_blocks_feature_grid_locales" DROP COLUMN "link_label";
  ALTER TABLE "_products_v_blocks_media_showcase_locales" DROP COLUMN "link_label";
  ALTER TABLE "_products_v_blocks_stats_locales" DROP COLUMN "link_label";
  ALTER TABLE "_products_v_blocks_gallery_locales" DROP COLUMN "link_label";
  ALTER TABLE "_products_v_blocks_video_embed_locales" DROP COLUMN "link_label";
  ALTER TABLE "_products_v_blocks_video_embed_locales" DROP COLUMN "video_u_r_l";
  ALTER TABLE "_products_v_blocks_video_embed_locales" DROP COLUMN "poster_id";
  ALTER TABLE "_products_v_blocks_portfolio_feed" DROP COLUMN "category_id";
  ALTER TABLE "_products_v_blocks_portfolio_feed" DROP COLUMN "limit";
  ALTER TABLE "_products_v_blocks_portfolio_feed" DROP COLUMN "featured_only";
  ALTER TABLE "_products_v_blocks_portfolio_feed_locales" DROP COLUMN "link_label";
  ALTER TABLE "_products_v_blocks_news_feed" DROP COLUMN "category_id";
  ALTER TABLE "_products_v_blocks_news_feed" DROP COLUMN "limit";
  ALTER TABLE "_products_v_blocks_news_feed_locales" DROP COLUMN "link_label";
  ALTER TABLE "_products_v_blocks_faq_locales" DROP COLUMN "link_label";
  ALTER TABLE "_products_v_blocks_call_to_action_locales" DROP COLUMN "link_label";
  ALTER TABLE "_products_v_blocks_call_to_action_locales" DROP COLUMN "secondary_link";
  ALTER TABLE "_products_v_blocks_call_to_action_locales" DROP COLUMN "secondary_link_label";
  ALTER TABLE "_products_v_blocks_community_showcase_locales" DROP COLUMN "link_label";
  ALTER TABLE "_products_v_locales" DROP COLUMN "version_overview";
  ALTER TABLE "audit_events" DROP COLUMN "actor_id_snapshot";
  ALTER TABLE "audit_events" DROP COLUMN "actor_role_snapshot";
  ALTER TABLE "site_settings" DROP COLUMN "open_graph_image_id";
  ALTER TABLE "site_settings_locales" DROP COLUMN "seo_title";
  ALTER TABLE "site_settings_locales" DROP COLUMN "seo_description";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_open_graph_image_id";
  ALTER TABLE "_site_settings_v_locales" DROP COLUMN "version_seo_title";
  ALTER TABLE "_site_settings_v_locales" DROP COLUMN "version_seo_description";
  ALTER TABLE "company_profile" DROP COLUMN "phone";
  ALTER TABLE "_company_profile_v" DROP COLUMN "version_phone";
  ALTER TABLE "contact_settings" DROP COLUMN "phone";
  ALTER TABLE "contact_settings_locales" DROP COLUMN "address";
  ALTER TABLE "_contact_settings_v" DROP COLUMN "version_phone";
  ALTER TABLE "_contact_settings_v_locales" DROP COLUMN "version_address";
  DROP TYPE "public"."enum_pages_blocks_image_text_image_position";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_columns";
  DROP TYPE "public"."enum_posts_blocks_image_text_image_position";
  DROP TYPE "public"."enum_posts_blocks_feature_grid_columns";
  DROP TYPE "public"."enum__posts_v_blocks_image_text_image_position";
  DROP TYPE "public"."enum__posts_v_blocks_feature_grid_columns";
  DROP TYPE "public"."enum_projects_blocks_image_text_image_position";
  DROP TYPE "public"."enum_projects_blocks_feature_grid_columns";
  DROP TYPE "public"."enum__projects_v_blocks_image_text_image_position";
  DROP TYPE "public"."enum__projects_v_blocks_feature_grid_columns";
  DROP TYPE "public"."enum_products_blocks_image_text_image_position";
  DROP TYPE "public"."enum_products_blocks_feature_grid_columns";
  DROP TYPE "public"."enum__products_v_blocks_image_text_image_position";
  DROP TYPE "public"."enum__products_v_blocks_feature_grid_columns";`)
}
