"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var RoleGuard_exports = {};
__export(RoleGuard_exports, {
  RoleGuard: () => RoleGuard
});
module.exports = __toCommonJS(RoleGuard_exports);
var import_discord = require("discord.js");
var import_discordx = require("discordx");
function RoleGuard(roleID) {
  async function handleReply(interaction, reply) {
    if (interaction.replied)
      await interaction.followUp(reply);
    else if (interaction.deferred)
      await interaction.editReply(reply);
    else
      await interaction.reply(reply);
  }
  __name(handleReply, "handleReply");
  async function noPerms(arg) {
    if (arg instanceof import_discordx.SimpleCommandMessage)
      await arg.message.reply("You don't have permission to execute this command.");
    else
      await handleReply(arg, "You don't have permission to execute this command.");
  }
  __name(noPerms, "noPerms");
  return async function(arg, client, next) {
    let guild = null;
    let member = null;
    if (arg instanceof import_discordx.SimpleCommandMessage) {
      if (arg.message.inGuild()) {
        guild = arg.message.guild;
        member = arg.message.member;
      }
    } else {
      guild = arg.guild;
      if (arg.member instanceof import_discord.GuildMember)
        member = arg.member;
    }
    if (!guild || !member) {
      if (arg instanceof import_discordx.SimpleCommandMessage)
        await arg.message.reply("Error");
      else
        handleReply(arg, "Error");
    }
    const isAllowed = member?.roles.cache.has(roleID);
    if (isAllowed)
      return next();
    else
      return noPerms(arg);
  };
}
__name(RoleGuard, "RoleGuard");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RoleGuard
});
//# sourceMappingURL=RoleGuard.js.map