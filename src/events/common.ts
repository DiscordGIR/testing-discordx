import logger from '@/utils/services/logger';
import type { ArgsOf, Client } from 'discordx';
import { Discord, On } from 'discordx';

@Discord()
export default class Example {
  @On()
  messageDelete([message]: ArgsOf<'messageDelete'>, client: Client): void {
    logger.info('Message Deleted', client.user?.username, message.content);
  }

  /*
  @On()
  messageCreate([message]: ArgsOf<'messageCreate'>, client: Client): void {
    // TODO: Create user in the db if they don't exist
  }
  */
}
