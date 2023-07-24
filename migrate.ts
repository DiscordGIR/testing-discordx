import runMigrate from '@/db/migrations';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

(async () => {
  const client = new pg.Client({
    connectionString: process.env.DB_CONNECTION_STRING,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  const db = drizzle(client);
  await runMigrate(db);
  await client.end();
})();
