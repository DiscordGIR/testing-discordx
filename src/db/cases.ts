import { db } from '@/index';
import { InferModel, eq } from 'drizzle-orm';

import {
  bigint,
  boolean,
  index,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

// Cases

export const cases = pgTable(
  'cases',
  {
    caseId: serial('case_id').notNull().primaryKey(),
    userId: bigint('user_id', { mode: 'bigint' }).notNull(),
    type: varchar('type', {
      length: 15,
      enum: ['warn', 'kick', 'ban', 'mute'],
    }).notNull(),
    punishment: text('punishment'),
    date: timestamp('date').defaultNow(),
    modId: bigint('mod_id', { mode: 'bigint' }).notNull(),
    reason: text('reason'),
    lifted: boolean('lifted').default(false),
    liftedByMod: bigint('lifted_by_mod', { mode: 'bigint' }),
    liftedDate: timestamp('lifted_date'),
    liftedReason: text('lifted_reason'),
  },
  (table) => {
    return {
      userIdIdx: index('user_id_idx').on(table.userId),
    };
  }
);

export type Case = InferModel<typeof cases>;
export type NewCase = InferModel<typeof cases, 'insert'>;

export const insertCase = async (newCase: NewCase) => {
  await db.insert(cases).values(newCase);
};

export const updateCase = async (caseToUpdate: Case): Promise<Case[]> => {
  return db
    .update(cases)
    .set(caseToUpdate)
    .where(eq(cases.caseId, caseToUpdate.caseId))
    .returning();
};

export const findCase = async (id: number) => {
  const result: Case[] = await db
    .select()
    .from(cases)
    .where(eq(cases.caseId, id));
  return result[0];
};
