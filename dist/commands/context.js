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
var context_exports = {};
__export(context_exports, {
  Example: () => Example
});
module.exports = __toCommonJS(context_exports);
var import_discord = require("discord.js");
var import_discordx = require("discordx");
let Example = class {
  messageHandler(interaction) {
    interaction.reply("I am user context handler");
  }
  userHandler(interaction) {
    interaction.reply("I am user context handler");
  }
};
__name(Example, "Example");
__decorateClass([
  (0, import_discordx.ContextMenu)({
    name: "message context",
    type: import_discord.ApplicationCommandType.Message
  })
], Example.prototype, "messageHandler", 1);
__decorateClass([
  (0, import_discordx.ContextMenu)({ name: "user context", type: import_discord.ApplicationCommandType.User })
], Example.prototype, "userHandler", 1);
Example = __decorateClass([
  (0, import_discordx.Discord)()
], Example);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Example
});
//# sourceMappingURL=context.js.map