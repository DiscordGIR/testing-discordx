import logger from '@/utils/services/logger';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const runMigrate = async (db: NodePgDatabase) => {
  logger.info('Running migration...');
  await migrate(db, { migrationsFolder: 'drizzle' });
  logger.info('Migrations ran!');
};

export default runMigrate;
