import { importx } from "@discordx/importer";
import type { Interaction, Message } from "discord.js";
import { IntentsBitField } from "discord.js";
import { Client } from "discordx";
import * as dotenv from 'dotenv';
import { yellow, bold, blue } from "./utils/colors";
import logger from "./utils/logger";
import { Pool } from "pg";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { D } from "drizzle-orm/query-promise.d-2e42fbc9";

dotenv.config();

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: process.env.PG_DB,
  idleTimeoutMillis: 30000, // think about this - since there's going to be frequent db requests maybe set this to a higher number?
  connectionTimeoutMillis: 2000
});

export const db: NodePgDatabase = drizzle(pool);

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
  silent: true,

  // Configuration for @SimpleCommand
  simpleCommand: {
    prefix: "!",
  },
});

bot.once("ready", async () => {
  await bot.guilds.fetch();
  await bot.initApplicationCommands();

  logger.info(`Logged in as ${yellow(bot.user?.tag || '')}.`);
});

bot.on("interactionCreate", (interaction: Interaction) => {
  bot.executeInteraction(interaction);
  if (interaction.isCommand()) {
    logger.info(`[${bold(blue(interaction.user.tag))}] used command ${yellow("/" + interaction.commandName)}.`)
  }
});

bot.on("messageCreate", (message: Message) => {
  bot.executeCommand(message);
});

async function run() {
  await importx(__dirname + "/{events,commands}/**/*.{ts,js}");

  // Let's start the bot
  if (!process.env.BOT_TOKEN) {
    throw Error("Could not find BOT_TOKEN in your environment.");
  }

  // Log in with your bot token
  const date = new Date()
  await bot.login(process.env.BOT_TOKEN);
  const time = new Date().getTime() - date.getTime()
  logger.info(`Bot launched in ${yellow(time + 'ms')}`)
  logger.info(`Loaded ${yellow(bot.applicationCommandSlashes.length.toString())} application commands.`)
  logger.info(`Loaded ${yellow(bot.events.length.toString())} event handlers.`)
}

run();
