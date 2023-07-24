import './env.d';

import { dirname, importx } from '@discordx/importer';
import type { Interaction, Message } from 'discord.js';
import { IntentsBitField } from 'discord.js';
import { Client } from 'discordx';
import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import path from 'path';
import pg from 'pg';
import { blue, bold, yellow } from './utils/colors';
import config from './utils/config';
import logger from './utils/logger';

dotenv.config();

const client = new pg.Client({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const db = drizzle(client);

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
    prefix: '!',
  },
});

bot.once('ready', async () => {
  await bot.guilds.fetch();
  await bot.initApplicationCommands();

  logger.info(`Logged in as ${yellow(bot.user?.tag || '')}.`);
});

bot.on('interactionCreate', (interaction: Interaction) => {
  bot.executeInteraction(interaction);
  if (interaction.isCommand()) {
    logger.info(
      `[${bold(blue(interaction.user.tag))}] used command ${yellow(
        `/${interaction.commandName}`
      )}.`
    );
  }
});

bot.on('messageCreate', (message: Message) => {
  bot.executeCommand(message);
});

const run = async () => {
  // connect to database
  await client.connect();
  // await migrate(db, { migrationsFolder: 'drizzle' });

  // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
  const __dirname = dirname(import.meta.url);
  await importx(path.join(__dirname, '/{events,commands}/**/*.{ts,js}'));

  // Let's start the bot
  if (!process.env.BOT_TOKEN) {
    throw Error('Could not find BOT_TOKEN in your environment.');
  }

  // Log in with your bot token
  const date = new Date();
  await bot.login(process.env.BOT_TOKEN);
  const time = new Date().getTime() - date.getTime();
  logger.info(`Bot launched in ${yellow(`${time}ms`)}`);
  logger.info(
    `Loaded ${yellow(
      bot.applicationCommandSlashes.length.toString()
    )} application commands.`
  );
  logger.info(`Loaded ${yellow(bot.events.length.toString())} event handlers.`);
};

run();
