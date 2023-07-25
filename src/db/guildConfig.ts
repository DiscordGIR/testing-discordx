// locked_channels           = mongoengine.ListField(default=[])
// filter_excluded_channels  = mongoengine.ListField(default=[])
// filter_excluded_guilds    = mongoengine.ListField(default=[349243932447604736])
// filter_words              = mongoengine.EmbeddedDocumentListField(FilterWord, default=[])
// raid_phrases              = mongoengine.EmbeddedDocumentListField(FilterWord, default=[])
// logging_excluded_channels = mongoengine.ListField(default=[])
// nsa_guild_id              = mongoengine.IntField()
// nsa_mapping               = mongoengine.DictField(default={})
// tags                      = mongoengine.EmbeddedDocumentListField(Tag, default=[])
// memes                     = mongoengine.EmbeddedDocumentListField(Tag, default=[])
// sabbath_mode              = mongoengine.BooleanField(default=False)
// ban_today_spam_accounts   = mongoengine.BooleanField(default=False)

import { InferModel, sql } from 'drizzle-orm';
import { bigint, boolean, pgTable } from 'drizzle-orm/pg-core';

export const guild = pgTable('guild', {
  guild_id: bigint('guild_id', { mode: 'bigint' }).notNull(),
  locked_channels: bigint('locked_channels', { mode: 'bigint' }).array(),
  filter_excluded_channels: bigint('filter_excluded_channels', {
    mode: 'bigint',
  }).array(),
  filter_excluded_guilds: bigint('filter_excluded_guilds', {
    mode: 'bigint',
  })
    .array()
    .default(sql`ARRAY[349243932447604736]::bigint[]`),
  logging_excluded_channels: bigint('logging_excluded_channels', {
    mode: 'bigint',
  }).array(),
  ban_today_spam_accounts: boolean('ban_today_spam_accounts').default(false),
});

export type Guild = InferModel<typeof guild>;
