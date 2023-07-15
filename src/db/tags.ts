import {
  bigint,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

// Tags

export const tags = pgTable('tags', {
  id: serial('id').notNull().primaryKey(),
  guild_id: bigint('guild_id', { mode: 'bigint' }).notNull(),
  name: varchar('name', { length: 50 }).notNull(),
  creator_id: bigint('creator_id', { mode: 'bigint' }).notNull(),
  created_on: timestamp('created_on').notNull(),
  use_count: integer('use_count').default(0),
  image: text('image'),
  button_links: text('button_links').array(),
});
