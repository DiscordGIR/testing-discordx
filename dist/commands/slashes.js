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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var slashes_exports = {};
__export(slashes_exports, {
  SlashExample: () => SlashExample
});
module.exports = __toCommonJS(slashes_exports);
var import_pagination = require("@discordx/pagination");
var import_discord = require("discord.js");
var import_discordx = require("discordx");
let SlashExample = class {
  async pages(interaction) {
    const commands = import_discordx.MetadataStorage.instance.applicationCommands.map((cmd) => {
      return { description: cmd.description, name: cmd.name };
    });
    const pages = commands.map((cmd, i) => {
      const embed = new import_discord.EmbedBuilder().setFooter({ text: `Page ${i + 1} of ${commands.length}` }).setTitle("**Slash command info**").addFields({ name: "Name", value: cmd.name }).addFields({
        name: "Description",
        value: `${cmd.description.length > 0 ? cmd.description : "Description unavailable"}`
      });
      return { embeds: [embed] };
    });
    const pagination = new import_pagination.Pagination(interaction, pages);
    await pagination.send();
  }
};
__name(SlashExample, "SlashExample");
__decorateClass([
  (0, import_discordx.Slash)({
    description: "Pagination for all slash command",
    name: "all-commands"
  })
], SlashExample.prototype, "pages", 1);
SlashExample = __decorateClass([
  (0, import_discordx.Discord)()
], SlashExample);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SlashExample
});
//# sourceMappingURL=slashes.js.map