import type { SimpleCommandMessage } from 'discordx';
import { Discord, SimpleCommand } from 'discordx';
import { bot } from '../index';

@Discord()
export default class Example {
  @SimpleCommand()
  async sync(command: SimpleCommandMessage): Promise<void> {
    await bot.initApplicationCommands();
    command.message.reply(`Synced!`);
  }
}
