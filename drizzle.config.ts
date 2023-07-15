import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';

dotenv.config();

export default {
  schema: './src/db/*',
  out: './drizzle',
  driver: 'pg',
} satisfies Config;
