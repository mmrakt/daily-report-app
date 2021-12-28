
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