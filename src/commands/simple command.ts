import type { SimpleCommandMessage } from "discordx";
import {
  Discord,
  SimpleCommand,
} from "discordx";
import { bot } from "../main";

@Discord()
export class Example {
  @SimpleCommand()
  async sync(command: SimpleCommandMessage): Promise<void> {
  await bot.initApplicationCommands();
    command.message.reply(`Synced!`);
  }
}
