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
  creatorId: bigint('creator_id', { mode: 'bigint' }).notNull(),
  createdOn: timestamp('created_on').notNull(),
  useCount: integer('use_count').default(0),
  image: text('image'),
  buttonLinks: text('button_links').array(),
});
