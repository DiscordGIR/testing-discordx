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
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
var slash_group_exports = {};
__export(slash_group_exports, {
  GroupExample: () => GroupExample
});
module.exports = __toCommonJS(slash_group_exports);
var import_discord = require("discord.js");
var import_discordx = require("discordx");
let GroupExample = class {
  add(x, y, interaction) {
    interaction.reply(String(x + y));
  }
  multiply(x, y, interaction) {
    interaction.reply(String(x * y));
  }
  root(text, interaction) {
    interaction.reply(text);
  }
};
__name(GroupExample, "GroupExample");
__decorateClass([
  (0, import_discordx.Slash)({ description: "add" }),
  (0, import_discordx.SlashGroup)("maths", "testing"),
  __decorateParam(0, (0, import_discordx.SlashOption)({
    description: "x value",
    name: "x",
    required: true,
    type: import_discord.ApplicationCommandOptionType.Number
  })),
  __decorateParam(1, (0, import_discordx.SlashOption)({
    description: "y value",
    name: "y",
    required: true,
    type: import_discord.ApplicationCommandOptionType.Number
  }))
], GroupExample.prototype, "add", 1);
__decorateClass([
  (0, import_discordx.Slash)({ description: "multiply" }),
  (0, import_discordx.SlashGroup)("maths", "testing"),
  __decorateParam(0, (0, import_discordx.SlashOption)({
    description: "x value",
    name: "x",
    required: true,
    type: import_discord.ApplicationCommandOptionType.Number
  })),
  __decorateParam(1, (0, import_discordx.SlashOption)({
    description: "y value",
    name: "y",
    required: true,
    type: import_discord.ApplicationCommandOptionType.Number
  }))
], GroupExample.prototype, "multiply", 1);
__decorateClass([
  (0, import_discordx.Slash)({ description: "root" }),
  (0, import_discordx.SlashGroup)("testing"),
  __decorateParam(0, (0, import_discordx.SlashOption)({
    description: "text",
    name: "text",
    required: true,
    type: import_discord.ApplicationCommandOptionType.String
  }))
], GroupExample.prototype, "root", 1);
GroupExample = __decorateClass([
  (0, import_discordx.Discord)(),
  (0, import_discordx.SlashGroup)({ description: "testing", name: "testing" }),
  (0, import_discordx.SlashGroup)({ description: "maths", name: "maths", root: "testing" })
], GroupExample);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupExample
});
//# sourceMappingURL=slash group.js.map