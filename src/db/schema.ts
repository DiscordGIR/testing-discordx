import { InferModel, eq } from "drizzle-orm";
import { bigint, boolean, date, integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core"
import { db } from "../main";

// TODO: Upsert and abstracted functions (warn function, set birthday function, etc)

// Users

const users = pgTable("users", {
    // snowflakes are above 2^53 so we use bigint mode instead of number mode
    id: bigint("id", { mode: "bigint" }).notNull().primaryKey(),
    isClem: boolean("is_clem").default(false),
    xpFrozen: boolean("xp_frozen").default(false),
    warnKicked: boolean("warn_kicked").default(false),
    raidVerified: boolean("raid_verified").default(false),
    xp: integer("xp").default(0),
    warnPoints: integer("warn_points").default(0),
    timezone: varchar("timezone"),
    birthday: date("birthday"),
    stickyRoles: bigint("sticky_roles", { mode: "bigint" }).array()
});

export type User = InferModel<typeof users>; // what gets returned when queried
export type NewUser = InferModel<typeof users, "insert">; // what is used to insert

export async function insertUser(user: NewUser) {
    await db.insert(users).values(user);
}

export async function updateUser(columns: User): Promise<User[]> {
    return await db.update(users).set(columns).where(eq(users.id, columns.id)).returning();
}

export async function findUser(id: bigint): Promise<User> {
    const result: User[] = await db.select().from(users).where(eq(users.id, id));
    return result[0];
}


// Cases

const cases = pgTable("cases", {
    caseId: serial("case_id").notNull().primaryKey(),
    userId: bigint("user_id", { mode: "bigint" }).notNull(),
    type: varchar("type", { length: 15, enum: ["warn", "kick", "ban", "mute"] }).notNull(),
    punishment: text("punishment"),
    date: timestamp("date").defaultNow(),
    modId: bigint("mod_id", { mode: "bigint" }).notNull(),
    reason: text("reason"),
    lifted: boolean("lifted").default(false),
    liftedByMod: bigint("lifted_by_mod", { mode: "bigint" }),
    liftedDate: timestamp("lifted_date"),
    liftedReason: text("lifted_reason")
});

export type Case = InferModel<typeof cases>;
export type NewCase = InferModel<typeof cases, "insert">;

export async function insertCase(newCase: NewCase) {
    await db.insert(cases).values(newCase);
}

export async function updateCase(updateCase: Case): Promise<Case[]> {
    return await db.update(cases).set(updateCase).where(eq(cases.caseId, updateCase.caseId)).returning();
}

export async function findCase(id: number) {
    const result: Case[] = await db.select().from(cases).where(eq(cases.caseId, id));
    return result[0];
}


// Filter words

const filterWords = pgTable("filter_words", {
    id: serial("id").notNull().primaryKey(),
    word: text("word").notNull(),
    notify: boolean("notify").default(false),
    falsePositive: boolean("false_positive").default(false),
    piracy: boolean("piracy").default(false)
});

export type FilterWord = InferModel<typeof filterWords>
export type NewFilterWord = InferModel<typeof filterWords, "insert">;

export async function insertFilterWord(word: NewFilterWord) {
    await db.insert(filterWords).values(word);
}

export async function updateFilterWord(word: FilterWord): Promise<FilterWord[]> {
    return await db.update(filterWords).set(word).where(eq(filterWords.id, word.id)).returning();
}

export async function findFilterWord(id: number) {
    const result: FilterWord[] = await db.select().from(filterWords).where(eq(filterWords.id, id));
    return result[0];
}


// Giveaways

const giveaways = pgTable("giveaways", {
    id: serial("id").notNull().primaryKey(),
    prize: text("prize").notNull(),
    numberWinners: integer("number_winners").notNull(),
    sponsorId: bigint("sponsorId", { mode: "bigint" }).notNull(),
    channel: bigint("channel", { mode: "bigint" }).notNull(),
    endTime: timestamp("end_time").notNull(),
    entries: bigint("entries", { mode: "bigint" }).array(),
    previousWinners: bigint("previous_winners", { mode: "bigint" }).array()
});

export type Giveaway = InferModel<typeof giveaways>;
export type NewGiveaway = InferModel<typeof giveaways, "insert">;

export async function insertGiveaway(giveaway: NewGiveaway) {
    await db.insert(giveaways).values(giveaway);
}

export async function updateGiveaway(giveaway: Giveaway): Promise<Giveaway[]> {
    return await db.update(giveaways).set(giveaway).where(eq(giveaways.id, giveaway.id)).returning();
}

export async function findGiveaway(id: number) {
    const result: Giveaway[] = await db.select().from(giveaways).where(eq(giveaways.id, id));
    return result[0];
}


// Tags

const tags = pgTable("tags", {
    id: serial("id").notNull().primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    creatorId: bigint("creator_id", { mode: "bigint" }).notNull(),
    createdOn: timestamp("created_on").notNull(),
    useCount: integer("use_count").default(0),
    image: text("image"),
    buttonLinks: text("button_links").array()
});
