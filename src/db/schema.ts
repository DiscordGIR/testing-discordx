import { InferModel, eq } from "drizzle-orm";
import { bigint, boolean, integer, pgTable } from "drizzle-orm/pg-core"
import { db } from "../main";

const users = pgTable("users", {
    // snowflakes are above 2^53 so we use bigint mode instead of number mode
    id: bigint("id", { mode: "bigint" }).primaryKey().notNull(),
    warnPoints: integer("warnPoints").notNull(),
    clem: boolean("clem").notNull(),
    muted: boolean("muted").notNull(),
    xp: integer("xp").notNull()
});

export type User = InferModel<typeof users>; // what gets returned when queried
export type NewUser = InferModel<typeof users, "insert">; // what is used to insert

export async function insertUser(user: NewUser) {
    return db.insert(users).values(user).returning();
}

export async function updateUser(user: User) {
    return db.update(users).set(user).returning();
}

export async function findUser(id: bigint): Promise<User> {
    const result: User[] = await db.select().from(users).where(eq(users.id, id));
    return result[0];
}
