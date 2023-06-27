import { importx } from "@discordx/importer";
import type { Interaction, Message } from "discord.js";
import { IntentsBitField } from "discord.js";
import { Client } from "discordx";
import * as dotenv from 'dotenv';
import { gray, yellow, bold } from 'colorette'
import logger from "./utils/logger";

dotenv.config();

export const bot = new Client({
  // To use only guild command
  botGuilds: [process.env.MAIN_GUILD_ID],

  // Discord intents
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.MessageContent,
  ],

  // Debug logs are disabled in silent mode
  silent: false,

  // Configuration for @SimpleCommand
  simpleCommand: {
    prefix: "!",
  },
});

bot.once("ready", async () => {
  // Make sure all guilds are cached
  await bot.guilds.fetch();

  // Synchronize applications commands with Discord
  // await bot.clearApplicationCommands();
  await bot.initApplicationCommands();

  // To clear all guild commands, uncomment this line,
  // This is useful when moving from guild commands to global commands
  // It must only be executed once
  //
  //  await bot.clearApplicationCommands(
  //    ...bot.guilds.cache.map((g) => g.id)
  //  );
  logger.info(`Logged in as ${yellow(bot.user?.tag || '')}`);
});

bot.on("interactionCreate", (interaction: Interaction) => {
  bot.executeInteraction(interaction);
  if (interaction.isCommand()) {
    logger.info(`[${bold(gray(interaction.user.tag))}] used command ${yellow("/" + interaction.commandName)}`)
  }
});

bot.on("messageCreate", (message: Message) => {
  bot.executeCommand(message);
});

async function run() {
  await importx(__dirname + "/{events,commands}/**/*.{ts,js}");

  // Let's start the bot
  if (!process.env.BOT_TOKEN) {
    throw Error("Could not find BOT_TOKEN in your environment");
  }

  // Log in with your bot token
  const date = new Date()
  await bot.login(process.env.BOT_TOKEN);
  const time = new Date().getTime() - date.getTime()
  logger.info(`Bot launched in ${yellow(time + 'ms')}`)
  // bot.applicationCommandSlashGroups.map(group => {
  //   // ├─
  //   // └─
  // })
  logger.info(`Loaded ${yellow(bot.applicationCommandSlashes.length)} application commands!`)
}

run();
