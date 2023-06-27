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
var testcmd_exports = {};
__export(testcmd_exports, {
  TestCmd: () => TestCmd
});
module.exports = __toCommonJS(testcmd_exports);
var import_discord = require("discord.js");
var import_discordx = require("discordx");
var import_RoleGuard = require("../guards/RoleGuard");
let TestCmd = class {
  async testcmd(roundtrip, interaction) {
    const heartbeat = interaction.client.ws.ping;
    const reply = await interaction.reply({ content: `Ping! Websocket heartbeat: ${heartbeat}ms`, fetchReply: true });
    if (roundtrip)
      await reply.edit(`Ping! Websocket heartbeat: ${heartbeat}ms | Roundtrip latency: ${reply.createdTimestamp - interaction.createdTimestamp}ms`);
  }
};
__name(TestCmd, "TestCmd");
__decorateClass([
  (0, import_discordx.Slash)({
    description: "Test command",
    name: "testcmd"
  }),
  (0, import_discordx.Guard)((0, import_RoleGuard.RoleGuard)("526283000871124992")),
  __decorateParam(0, (0, import_discordx.SlashOption)({
    description: "Fetch the roundtrip latency",
    name: "roundtrip",
    required: false,
    type: import_discord.ApplicationCommandOptionType.Boolean
  }))
], TestCmd.prototype, "testcmd", 1);
TestCmd = __decorateClass([
  (0, import_discordx.Discord)()
], TestCmd);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TestCmd
});
//# sourceMappingURL=testcmd.js.map