import type { ArgsOf, Client } from "discordx";
import { Discord, On } from "discordx";

@Discord()
export class Example {
  @On()
  messageDelete([message]: ArgsOf<"messageDelete">, client: Client): void {
    console.log("Message Deleted", client.user?.username, message.content);
  }

  @On()
  messageCreate([message]: ArgsOf<"messageCreate">, client: Client): void {
    // TODO: Create user in the db if they don't exist
  }
}
