CREATE TABLE IF NOT EXISTS "guild" (
	"guild_id" bigint NOT NULL,
	"locked_channels" bigint[],
	"filter_excluded_channels" bigint[],
	"filter_excluded_guilds" bigint[] DEFAULT ARRAY[349243932447604736]::bigint[],
	"logging_excluded_channels" bigint[],
	"ban_today_spam_accounts" boolean DEFAULT false
);
