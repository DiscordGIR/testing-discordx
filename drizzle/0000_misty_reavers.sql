CREATE TABLE IF NOT EXISTS "cases" (
	"case_id" serial PRIMARY KEY NOT NULL,
	"user_id" bigint NOT NULL,
	"type" varchar(15) NOT NULL,
	"punishment" text,
	"date" timestamp DEFAULT now(),
	"mod_id" bigint NOT NULL,
	"reason" text,
	"lifted" boolean DEFAULT false,
	"lifted_by_mod" bigint,
	"lifted_date" timestamp,
	"lifted_reason" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "filter_words" (
	"id" serial PRIMARY KEY NOT NULL,
	"word" text NOT NULL,
	"notify" boolean DEFAULT false,
	"false_positive" boolean DEFAULT false,
	"piracy" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" bigint PRIMARY KEY NOT NULL,
	"is_clem" boolean DEFAULT false,
	"xp_frozen" boolean DEFAULT false,
	"warn_kicked" boolean DEFAULT false,
	"raid_verified" boolean DEFAULT false,
	"xp" integer DEFAULT 0,
	"warn_points" integer DEFAULT 0,
	"timezone" varchar,
	"birthday" date,
	"sticky_roles" bigint[]
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "cases" ("user_id");