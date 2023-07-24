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

const tags = pgTable('tags', {
  id: serial('id').notNull().primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  guild_id: bigint('guild_id', { mode: 'bigint' }).notNull(),
  creator_id: bigint('creator_id', { mode: 'bigint' }).notNull(),
  creator_tag: varchar('creator_tag', { length: 50 }).notNull(),
  created_on: timestamp('created_on').notNull(),
  use_count: integer('use_count').default(0),
  content: text('content'),
  image: text('image'),
  button_links: text('button_links').array(),
});

export default tags;
