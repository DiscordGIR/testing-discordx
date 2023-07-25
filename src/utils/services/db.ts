import { guild } from '@/db/guildConfig';
import * as dotenv from 'dotenv';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import { yellow } from '../colors';
import config from '../config';
import logger from './logger';

dotenv.config();
const client = new pg.Client({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

const db = drizzle(client);

export const initializeDbConnection = async () => {
  await client.connect();
  logger.info(
    `Connected to database ${yellow(
      client.database ?? 'unknown database'
    )} as ${yellow(client.user ?? 'unknown user')}@${yellow(client.host)}!`
  );

  // initialize guild config for main server
  const dbGuild = await db
    .select()
    .from(guild)
    .where(eq(guild.guild_id, BigInt(config.misc.mainGuildId)));
  if (dbGuild.length === 0) {
    await db.insert(guild).values({
      guild_id: BigInt(config.misc.mainGuildId),
    });
  }
};

export default db;
