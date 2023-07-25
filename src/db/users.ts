import { getDatabase } from '@/utils/services/db';
import { InferModel, sql } from 'drizzle-orm';
import {
  bigint,
  boolean,
  date,
  integer,
  pgTable,
  unique,
  varchar,
} from 'drizzle-orm/pg-core'; // what is used to insert
import { guild } from './guildConfig';

// TODO: Upsert and abstracted functions (warn function, set birthday function, etc)

// Users

export const users = pgTable(
  'users',
  {
    // snowflakes are above 2^53 so we use bigint mode instead of number mode
    id: bigint('id', { mode: 'bigint' }).notNull(),
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
  },
  (table) => ({
    unq: unique().on(table.id, table.guild_id),
  })
);

export type User = InferModel<typeof users>; // what gets returned when queried
export type NewUser = InferModel<typeof users, 'insert'>;

export const insertUser = async (user: NewUser) => {
  const userDb = await getDatabase().insert(users).values(user).returning();
  return userDb[0];
};

/* export const updateUser = async (columns: User): Promise<User[]> => {
  return db
    .update(users)
    .set(columns)
    .where(eq(users.id, columns.id))
    .returning();
}; */

export const findUser = async (
  userId: string,
  guildId: string
): Promise<User> => {
  const db = getDatabase();
  const test = await db.select().from(guild);
  console.log(test);
  const result: User[] = await db.select().from(users);
  //  .where(
  //    and(eq(users.id, BigInt(userId)), eq(users.guild_id, BigInt(guildId)))
  //  );
  console.log(result);
  console.log('yea');
  if (result.length === 0) {
    const newUser = await insertUser({
      id: BigInt(userId),
      guild_id: BigInt(guildId),
    });
    return newUser;
  }
  return result[0];
};

export const addXpToUser = async (
  userId: string,
  guildId: string,
  xp: number
) => {
  await getDatabase()
    .insert(users)
    .values({ id: BigInt(userId), guild_id: BigInt(guildId), xp })
    .onConflictDoUpdate({
      target: [users.id, users.guild_id],
      set: {
        xp: sql`${users.xp.uniqueType} + ${xp}`,
      },
    });
};
