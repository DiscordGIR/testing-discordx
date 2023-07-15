ALTER TABLE "cases" ADD COLUMN "guild_id" bigint NOT NULL;--> statement-breakpoint
ALTER TABLE "filter_words" ADD COLUMN "guild_id" bigint NOT NULL;--> statement-breakpoint
ALTER TABLE "giveaways" ADD COLUMN "guild_id" bigint NOT NULL;--> statement-breakpoint
ALTER TABLE "tags" ADD COLUMN "guild_id" bigint NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "guild_id" bigint NOT NULL;