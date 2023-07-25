import runMigrate from '@/db/migrations';
import { blue, bold, yellow } from '@/utils/colors';
import config from '@/utils/config';
import db, { initializeDbConnection } from '@/utils/services/db';
import logger from '@/utils/services/logger';
import { dirname, importx } from '@discordx/importer';
import type { Interaction, Message } from 'discord.js';
import { IntentsBitField } from 'discord.js';
import { Client } from 'discordx';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const bot = new Client({
  // To use only guild command
  botGuilds: [config.misc.mainGuildId],

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

  logger.info('');
  logger.info(`Logged in as ${yellow(bot.user?.tag || '')}.`);

  const mainGuild = bot.guilds.cache.get(config.misc.mainGuildId);
  if (!mainGuild) {
    throw Error(
      `Could not find main guild with ID ${config.misc.mainGuildId}.`
    );
  }
  logger.info(
    `GIR is running in ${yellow(mainGuild.name)} with ${yellow(
      mainGuild.memberCount.toString()
    )} members!`
  );
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
  await initializeDbConnection();

  if (process.env.NODE_ENV === 'development') {
    runMigrate(db);
  }

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
  logger.info(
    `Loaded ${yellow(
      bot.applicationCommandSlashes.length.toString()
    )} application commands.`
  );
  logger.info(`Loaded ${yellow(bot.events.length.toString())} event handlers.`);
  const time = new Date().getTime() - date.getTime();
  logger.info(`Setup complete in ${yellow(`${time}ms`)}`);
};

run();
