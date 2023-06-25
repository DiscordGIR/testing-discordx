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
var slash_button_exports = {};
__export(slash_button_exports, {
  Example: () => Example
});
module.exports = __toCommonJS(slash_button_exports);
var import_discord = require("discord.js");
var import_discordx = require("discordx");
let Example = class {
  async hello(user, interaction) {
    await interaction.deferReply();
    const helloBtn = new import_discord.ButtonBuilder().setLabel("Hello").setEmoji("\u{1F44B}").setStyle(import_discord.ButtonStyle.Primary).setCustomId("hello-btn");
    const row = new import_discord.ActionRowBuilder().addComponents(
      helloBtn
    );
    interaction.editReply({
      components: [row],
      content: `${user}, Say hello to bot`
    });
  }
  helloBtn(interaction) {
    interaction.reply(`\u{1F44B} ${interaction.member}`);
  }
};
__name(Example, "Example");
__decorateClass([
  (0, import_discordx.Slash)({ description: "hello", name: "hello-btn" }),
  __decorateParam(0, (0, import_discordx.SlashOption)({
    description: "user",
    name: "user",
    required: true,
    type: import_discord.ApplicationCommandOptionType.User
  }))
], Example.prototype, "hello", 1);
__decorateClass([
  (0, import_discordx.ButtonComponent)({ id: "hello-btn" })
], Example.prototype, "helloBtn", 1);
Example = __decorateClass([
  (0, import_discordx.Discord)()
], Example);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Example
});
//# sourceMappingURL=slash + button.js.map