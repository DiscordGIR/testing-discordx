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

const giveaways = pgTable('giveaways', {
  id: serial('id').notNull().primaryKey(),
  prize: text('prize').notNull(),
  numberWinners: integer('number_winners').notNull(),
  sponsorId: bigint('sponsorId', { mode: 'bigint' }).notNull(),
  channel: bigint('channel', { mode: 'bigint' }).notNull(),
  endTime: timestamp('end_time').notNull(),
  entries: bigint('entries', { mode: 'bigint' }).array(),
  previousWinners: bigint('previous_winners', { mode: 'bigint' }).array(),
});

export type Giveaway = InferModel<typeof giveaways>;
export type NewGiveaway = InferModel<typeof giveaways, 'insert'>;

export async function insertGiveaway(giveaway: NewGiveaway) {
  await db.insert(giveaways).values(giveaway);
}

export async function updateGiveaway(giveaway: Giveaway): Promise<Giveaway[]> {
  return await db
    .update(giveaways)
    .set(giveaway)
    .where(eq(giveaways.id, giveaway.id))
    .returning();
}

export async function findGiveaway(id: number) {
  const result: Giveaway[] = await db
    .select()
    .from(giveaways)
    .where(eq(giveaways.id, id));
  return result[0];
}
