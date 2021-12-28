

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."users"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "display_id" text NOT NULL, "display_name" Text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("display_name"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_users_updated_at"
BEFORE UPDATE ON "public"."users"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_users_updated_at" ON "public"."users" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."articles"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "subject" Text NOT NULL, "content" Text NOT NULL, "author_id" UUID NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "published_at" timestamptz, PRIMARY KEY ("id") , FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_articles_updated_at"
BEFORE UPDATE ON "public"."articles"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_articles_updated_at" ON "public"."articles" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TABLE "public"."reports"("id" serial NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("id"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_reports_updated_at"
BEFORE UPDATE ON "public"."reports"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_reports_updated_at" ON "public"."reports" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TABLE "public"."tasks"("id" serial NOT NULL, "reportId" integer NOT NULL, "hourId" integer NOT NULL, "target" boolean NOT NULL, "categoryId" integer NOT NULL, "project" text NOT NULL, "backlogId" text NOT NULL, "taskTitle" Text NOT NULL, "note" Text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("reportId") REFERENCES "public"."reports"("id") ON UPDATE restrict ON DELETE restrict);

CREATE TABLE "public"."hours"("id" serial NOT NULL, "hour" float8 NOT NULL, PRIMARY KEY ("id") );

CREATE TABLE "public"."categories"("id" serial NOT NULL, "category" Text NOT NULL, PRIMARY KEY ("id") );

alter table "public"."tasks"
           add constraint "tasks_hourId_fkey"
           foreign key ("hourId")
           references "public"."hours"
           ("id") on update restrict on delete restrict;

alter table "public"."tasks"
           add constraint "tasks_categoryId_fkey"
           foreign key ("categoryId")
           references "public"."categories"
           ("id") on update restrict on delete restrict;

ALTER TABLE "public"."tasks" DROP COLUMN "backlogId" CASCADE;

alter table "public"."tasks" rename column "categoryId" to "classificationId";

alter table "public"."tasks" rename column "classificationId" to "categoryId";

alter table "public"."reports" rename column "created_at" to "createdAt";

alter table "public"."reports" rename column "updated_at" to "updatedAt";

alter table "public"."tasks" rename column "taskTitle" to "ticketTitle";

ALTER TABLE "public"."reports" ADD COLUMN "date" integer NULL UNIQUE;

ALTER TABLE "public"."reports" ALTER COLUMN "updatedAt" DROP NOT NULL;