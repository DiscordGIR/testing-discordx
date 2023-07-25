import { addXpToUser, findUser } from '@/db/users';
import config from '@/utils/config';
import type { ArgsOf } from 'discordx';
import { Discord, On } from 'discordx';

@Discord()
export default class Xp {
  @On()
  async messageCreate([message]: ArgsOf<'messageCreate'>): Promise<void> {
    if (message.author.bot) return;
    if (message.guildId !== config.misc.mainGuildId) return;
    if (message.channelId === config.channels.botCommands) return;

    // random number between 1 and 10
    const xpToAdd = Math.floor(Math.random() * 10) + 1;
    console.log(await findUser(message.author.id, message.guildId));
    addXpToUser(message.author.id, message.guildId, xpToAdd);
    console.log(await findUser(message.author.id, message.guildId));

    // TODO: Create user in the db if they don't exist
  }
}
