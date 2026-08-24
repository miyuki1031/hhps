CREATE TYPE "public"."roll" AS ENUM('m', 'u', 'o');--> statement-breakpoint
CREATE TABLE "resumes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_overview" varchar(255) NOT NULL,
	"phases" text[],
	"description" text,
	"achievements" text,
	"os" varchar(100)[],
	"languages" text[],
	"middlewares" text[],
	"role" varchar(100),
	"scale" varchar(100),
	"employment_period_st" date,
	"employment_period_ed" date
);
--> statement-breakpoint
CREATE TABLE "profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar,
	"learning" varchar[],
	"location" varchar,
	"location_en" varchar,
	"licenses" varchar
);
--> statement-breakpoint
CREATE TABLE "todo" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"due_date" date,
	"is_private" boolean DEFAULT true NOT NULL,
	"is_complete" boolean DEFAULT false NOT NULL,
	"is_delete" boolean DEFAULT false NOT NULL,
	"is_master_author" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar,
	"email" varchar NOT NULL,
	"roll" "roll" NOT NULL
);
