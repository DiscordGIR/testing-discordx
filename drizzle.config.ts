import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';

dotenv.config();

export default {
  schema: './src/db/*',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB,
  },
} satisfies Config;
