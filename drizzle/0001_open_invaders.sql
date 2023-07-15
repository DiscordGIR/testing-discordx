CREATE TABLE IF NOT EXISTS "giveaways" (
	"id" serial PRIMARY KEY NOT NULL,
	"prize" text NOT NULL,
	"number_winners" integer NOT NULL,
	"sponsorId" bigint NOT NULL,
	"channel" bigint NOT NULL,
	"end_time" timestamp NOT NULL,
	"entries" bigint[],
	"previous_winners" bigint[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"creator_id" bigint NOT NULL,
	"created_on" timestamp NOT NULL,
	"use_count" integer DEFAULT 0,
	"image" text,
	"button_links" text[]
);
