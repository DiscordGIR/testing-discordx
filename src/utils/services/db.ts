import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import { yellow } from '../colors';
import logger from './logger';

dotenv.config();
const client = new pg.Client({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const initializeDbConnection = async () => {
  await client.connect();
  logger.info(
    `Connected to database ${yellow(
      client.database ?? 'unknown database'
    )} as ${yellow(client.user ?? 'unknown user')}@${yellow(client.host)}!`
  );
};

const db = drizzle(client);

export default db;
