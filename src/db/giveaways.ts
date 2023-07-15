import { db } from '@/index';
import { InferModel, eq } from 'drizzle-orm';
import {
  bigint,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

// Giveaways

export const giveaways = pgTable('giveaways', {
  id: serial('id').notNull().primaryKey(),
  guild_id: bigint('guild_id', { mode: 'bigint' }).notNull(),
  prize: text('prize').notNull(),
  number_winners: integer('number_winners').notNull(),
  sponsor_id: bigint('sponsorId', { mode: 'bigint' }).notNull(),
  channel: bigint('channel', { mode: 'bigint' }).notNull(),
  end_time: timestamp('end_time').notNull(),
  entries: bigint('entries', { mode: 'bigint' }).array(),
  previous_winners: bigint('previous_winners', { mode: 'bigint' }).array(),
});

export type Giveaway = InferModel<typeof giveaways>;
export type NewGiveaway = InferModel<typeof giveaways, 'insert'>;

export const insertGiveaway = async (giveaway: NewGiveaway) => {
  await db.insert(giveaways).values(giveaway);
};

export const updateGiveaway = async (
  giveaway: Giveaway
): Promise<Giveaway[]> => {
  return db
    .update(giveaways)
    .set(giveaway)
    .where(eq(giveaways.id, giveaway.id))
    .returning();
};

export const findGiveaway = async (id: number) => {
  const result: Giveaway[] = await db
    .select()
    .from(giveaways)
    .where(eq(giveaways.id, id));
  return result[0];
};
