"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var main_exports = {};
__export(main_exports, {
  bot: () => bot
});
module.exports = __toCommonJS(main_exports);
var import_importer = require("@discordx/importer");
var import_discord = require("discord.js");
var import_discordx = require("discordx");
var dotenv = __toESM(require("dotenv"));
var import_colorette = require("colorette");
const { gray, yellow } = (0, import_colorette.createColors)({ useColor: false });
dotenv.config();
const bot = new import_discordx.Client({
  // To use only guild command
  botGuilds: [process.env.MAIN_GUILD_ID],
  // Discord intents
  intents: [
    import_discord.IntentsBitField.Flags.Guilds,
    import_discord.IntentsBitField.Flags.GuildMembers,
    import_discord.IntentsBitField.Flags.GuildMessages,
    import_discord.IntentsBitField.Flags.GuildMessageReactions,
    import_discord.IntentsBitField.Flags.GuildVoiceStates,
    import_discord.IntentsBitField.Flags.MessageContent
  ],
  // Debug logs are disabled in silent mode
  silent: false,
  // Configuration for @SimpleCommand
  simpleCommand: {
    prefix: "!"
  }
});
bot.once("ready", async () => {
  await bot.guilds.fetch();
  await bot.initApplicationCommands();
  console.log(`Logged in as ${gray(bot.user?.tag || "adsf")}`);
});
bot.on("interactionCreate", (interaction) => {
  bot.executeInteraction(interaction);
});
bot.on("messageCreate", (message) => {
  bot.executeCommand(message);
});
async function run() {
  await (0, import_importer.importx)(__dirname + "/{events,commands}/**/*.{ts,js}");
  if (!process.env.BOT_TOKEN) {
    throw Error("Could not find BOT_TOKEN in your environment");
  }
  const date = /* @__PURE__ */ new Date();
  await bot.login(process.env.BOT_TOKEN);
  const time = (/* @__PURE__ */ new Date()).getTime() - date.getTime();
  console.log(`Bot launched in ${time}ms`);
  bot.applicationCommandSlashGroups.map((group) => {
    console.log(yellow(`\u251C\u2500 Slash group "${group.name}" loaded`));
  });
}
__name(run, "run");
run();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bot
});
//# sourceMappingURL=main.js.map