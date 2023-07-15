import { db } from '@/index';
import { InferModel, eq } from 'drizzle-orm';
import {
  bigint,
  boolean,
  date,
  integer,
  pgTable,
  varchar,
} from 'drizzle-orm/pg-core'; // what is used to insert

// TODO: Upsert and abstracted functions (warn function, set birthday function, etc)

// Users

export const users = pgTable('users', {
  // snowflakes are above 2^53 so we use bigint mode instead of number mode
  id: bigint('id', { mode: 'bigint' }).notNull().primaryKey(),
  guild_id: bigint('guild_id', { mode: 'bigint' }).notNull(),
  is_clem: boolean('is_clem').default(false),
  xp_frozen: boolean('xp_frozen').default(false),
  warn_kicked: boolean('warn_kicked').default(false),
  raid_verified: boolean('raid_verified').default(false),
  xp: integer('xp').default(0),
  warn_points: integer('warn_points').default(0),
  timezone: varchar('timezone'),
  birthday: date('birthday'),
  sticky_roles: bigint('sticky_roles', { mode: 'bigint' }).array(),
});

export type User = InferModel<typeof users>; // what gets returned when queried
export type NewUser = InferModel<typeof users, 'insert'>;

export const insertUser = async (user: NewUser) => {
  await db.insert(users).values(user);
};

export const updateUser = async (columns: User): Promise<User[]> => {
  return db
    .update(users)
    .set(columns)
    .where(eq(users.id, columns.id))
    .returning();
};

export const findUser = async (id: bigint): Promise<User> => {
  const result: User[] = await db.select().from(users).where(eq(users.id, id));
  return result[0];
};
