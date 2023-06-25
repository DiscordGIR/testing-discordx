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
var choices_exports = {};
__export(choices_exports, {
  Example: () => Example
});
module.exports = __toCommonJS(choices_exports);
var import_discord = require("discord.js");
var import_discordx = require("discordx");
let Example = class {
  choose(what, interaction) {
    interaction.reply(what);
  }
  choose1(what, interaction) {
    interaction.reply(what);
  }
};
__name(Example, "Example");
__decorateClass([
  (0, import_discordx.Slash)({ description: "choose" }),
  __decorateParam(0, (0, import_discordx.SlashChoice)("Human", "Astronaut", "Dev")),
  __decorateParam(0, (0, import_discordx.SlashOption)({
    description: "What are you?",
    name: "what",
    required: true,
    type: import_discord.ApplicationCommandOptionType.String
  }))
], Example.prototype, "choose", 1);
__decorateClass([
  (0, import_discordx.Slash)({ description: "choose1" }),
  __decorateParam(0, (0, import_discordx.SlashChoice)({ name: "are you okay?", value: "okay" })),
  __decorateParam(0, (0, import_discordx.SlashChoice)({ name: "are you good?", value: "good" })),
  __decorateParam(0, (0, import_discordx.SlashOption)({
    description: "what1",
    name: "what1",
    required: true,
    type: import_discord.ApplicationCommandOptionType.String
  }))
], Example.prototype, "choose1", 1);
Example = __decorateClass([
  (0, import_discordx.Discord)()
], Example);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Example
});
//# sourceMappingURL=choices.js.map