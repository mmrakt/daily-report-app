

DROP TABLE public.reports CASCADE;

create table reports
(date integer not null,
createdAt timestamp not null,
updatedAt timestamp,
primary key (date)
);

alter table "public"."tasks" rename column "reportId" to "reportDate";

alter table "public"."tasks"
           add constraint "tasks_reportDate_fkey"
           foreign key ("reportDate")
           references "public"."reports"
           ("date") on update restrict on delete restrict;

ALTER TABLE "public"."reports" ALTER COLUMN "createdat" TYPE timestamp without time zone;
alter table "public"."reports" rename column "createdat" to "createdAt";

alter table "public"."reports" rename column "updatedat" to "updatedAt";

ALTER TABLE "public"."reports" ADD COLUMN "dateText" text NULL UNIQUE;

alter table "public"."tasks" drop constraint "tasks_reportDate_fkey";

ALTER TABLE "public"."tasks" ADD COLUMN "reportDateText" text NULL UNIQUE;

alter table "public"."tasks"
           add constraint "tasks_reportDateText_fkey"
           foreign key ("reportDateText")
           references "public"."reports"
           ("dateText") on update restrict on delete restrict;

ALTER TABLE "public"."tasks" DROP COLUMN "reportDate" CASCADE;

ALTER TABLE "public"."reports" ALTER COLUMN "date" TYPE integer;
alter table "public"."reports" rename column "date" to "id";

alter table "public"."reports" rename column "id" to "ids";

ALTER TABLE "public"."reports" ADD COLUMN "id" serial NOT NULL UNIQUE;

alter table "public"."reports" drop constraint "reports_pkey";
alter table "public"."reports"
    add constraint "reports_pkey" 
    primary key ( "id" );

ALTER TABLE "public"."reports" DROP COLUMN "ids" CASCADE;

DROP TABLE "public"."tasks";

DROP TABLE "public"."reports";

DROP TABLE "public"."articles";

DROP TABLE "public"."users";

DROP TABLE "public"."categories";

DROP TABLE "public"."hours";



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

DROP TABLE public.reports CASCADE;

create table reports
(date integer not null,
createdAt timestamp not null,
updatedAt timestamp,
primary key (date)
);


alter table "public"."tasks" rename column "reportId" to "reportDate";

alter table "public"."tasks"
           add constraint "tasks_reportDate_fkey"
           foreign key ("reportDate")
           references "public"."reports"
           ("date") on update restrict on delete restrict;

ALTER TABLE "public"."reports" ALTER COLUMN "createdat" TYPE timestamp without time zone;
alter table "public"."reports" rename column "createdat" to "createdAt";

alter table "public"."reports" rename column "updatedat" to "updatedAt";

ALTER TABLE "public"."reports" ADD COLUMN "dateText" text NULL UNIQUE;

alter table "public"."tasks" drop constraint "tasks_reportDate_fkey";

ALTER TABLE "public"."tasks" ADD COLUMN "reportDateText" text NULL UNIQUE;

alter table "public"."tasks"
           add constraint "tasks_reportDateText_fkey"
           foreign key ("reportDateText")
           references "public"."reports"
           ("dateText") on update restrict on delete restrict;

ALTER TABLE "public"."tasks" DROP COLUMN "reportDate" CASCADE;

ALTER TABLE "public"."reports" ALTER COLUMN "date" TYPE integer;
alter table "public"."reports" rename column "date" to "id";

alter table "public"."reports" rename column "id" to "ids";

ALTER TABLE "public"."reports" ADD COLUMN "id" serial NOT NULL UNIQUE;

alter table "public"."reports" drop constraint "reports_pkey";
alter table "public"."reports"
    add constraint "reports_pkey" 
    primary key ( "id" );

ALTER TABLE "public"."reports" DROP COLUMN "ids" CASCADE;

ALTER TABLE "public"."tasks" DROP CONSTRAINT "tasks_reportDateText_key";


DROP TABLE "public"."tasks";

DROP TABLE "public"."reports";

DROP TABLE "public"."articles";

DROP TABLE "public"."users";

DROP TABLE "public"."categories";

DROP TABLE "public"."hours";


CREATE TABLE "public"."reports"("dateText" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz DEFAULT now(), PRIMARY KEY ("dateText") , UNIQUE ("dateText"));
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

CREATE TABLE "public"."hours"("id" serial NOT NULL, "hours" integer NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));

CREATE TABLE "public"."categories"("id" serial NOT NULL, "category" text NOT NULL, PRIMARY KEY ("id") );

CREATE TABLE "public"."tasks"("id" serial NOT NULL, "reportDateText" text NOT NULL, "hourId" integer NOT NULL, "categoryId" integer NOT NULL, "target" boolean NOT NULL, "project" text NOT NULL, "ticketTitle" text NOT NULL, "note" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("reportDateText") REFERENCES "public"."reports"("dateText") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("hourId") REFERENCES "public"."hours"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"));

ALTER TABLE "public"."hours" ALTER COLUMN "hours" TYPE float8;

CREATE TABLE "public"."users"("id" serial NOT NULL, "display_id" text NOT NULL, "display_name" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("display_name"));
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

alter table "public"."users" rename column "display_id" to "displayId";

alter table "public"."users" rename column "displayId" to "display_id";

CREATE TABLE "public"."articles"("id" serial NOT NULL, "subject" text NOT NULL, "content" text NOT NULL, "author_id" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "published_at" timestamptz NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
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

alter table "public"."users" rename column "id" to "ids";

ALTER TABLE "public"."users" ADD COLUMN "id" uuid NOT NULL UNIQUE;

alter table "public"."users" drop constraint "users_pkey";
alter table "public"."users"
    add constraint "users_pkey" 
    primary key ( "id" );

ALTER TABLE "public"."users" DROP COLUMN "ids" CASCADE;

alter table "public"."articles"
           add constraint "articles_author_id_fkey"
           foreign key ("author_id")
           references "public"."users"
           ("id") on update restrict on delete restrict;

alter table "public"."articles" rename column "id" to "ids";

ALTER TABLE "public"."articles" ADD COLUMN "id" uuid NOT NULL UNIQUE;

alter table "public"."articles" drop constraint "articles_pkey";
alter table "public"."articles"
    add constraint "articles_pkey" 
    primary key ( "id" );

ALTER TABLE "public"."articles" DROP COLUMN "ids" CASCADE;

ALTER TABLE "public"."reports" ADD COLUMN "id" serial NOT NULL UNIQUE;

alter table "public"."tasks" drop constraint "tasks_reportDateText_fkey";

alter table "public"."reports" drop constraint "reports_pkey";
alter table "public"."reports"
    add constraint "reports_pkey" 
    primary key ( "id" );

ALTER TABLE "public"."reports" ALTER COLUMN "created_at" TYPE timestamp;

ALTER TABLE "public"."reports" ALTER COLUMN "updated_at" TYPE timestamp;

ALTER TABLE "public"."reports" ALTER COLUMN "dateText" DROP NOT NULL;
ALTER TABLE "public"."reports" ADD CONSTRAINT "reports_dateText_key" UNIQUE ("dateText");

alter table "public"."tasks"
           add constraint "tasks_reportDateText_fkey"
           foreign key ("reportDateText")
           references "public"."reports"
           ("dateText") on update restrict on delete restrict;

alter table "public"."reports" rename column "created_at" to "createdAt";

alter table "public"."reports" rename column "updated_at" to "updatedAt";



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