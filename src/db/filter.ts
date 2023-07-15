import { db } from '@/index';
import { InferModel, eq } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

// Filter words

export const filterTable = pgTable('filter_words', {
  id: serial('id').notNull().primaryKey(),
  guild_id: bigint('guild_id', { mode: 'bigint' }).notNull(),
  word: text('word').notNull(),
  notify: boolean('notify').default(false),
  false_positive: boolean('false_positive').default(false),
  piracy: boolean('piracy').default(false),
  bypass: integer('bypass').notNull(),
});

export type FilterWord = InferModel<typeof filterTable>;
export type NewFilterWord = InferModel<typeof filterTable, 'insert'>;

export const insertFilterWord = async (word: NewFilterWord) => {
  await db.insert(filterTable).values(word);
};

export const updateFilterWord = async (
  word: FilterWord
): Promise<FilterWord[]> => {
  return db
    .update(filterTable)
    .set(word)
    .where(eq(filterTable.id, word.id))
    .returning();
};

export const findFilterWord = async (id: number) => {
  const result: FilterWord[] = await db
    .select()
    .from(filterTable)
    .where(eq(filterTable.id, id));
  return result[0];
};
