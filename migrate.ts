import runMigrate from '@/db/migrations';
import logger from '@/utils/services/logger';
import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

dotenv.config();

(async () => {
  const client = new pg.Client({
    connectionString: process.env.DB_CONNECTION_STRING,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();

  const db = drizzle(client);
  try {
    await runMigrate(db);
  } catch (error) {
    logger.error('Error running migrations:', error);
  } finally {
    await client.end();
  }
})();
