import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Guard, Slash, SlashOption } from "discordx";
import { RoleGuard } from "../guards/RoleGuard";

@Discord()
export class TestCmd {
    @Slash({
        description: "Test command",
        name: "testcmd"
    })
    @Guard(RoleGuard("000000000000000000"))
    async testcmd(
        @SlashOption({
            description: "Fetch the roundtrip latency",
            name: "roundtrip",
            required: false,
            type: ApplicationCommandOptionType.Boolean
        })
        roundtrip: boolean | undefined,
        interaction: CommandInteraction): Promise<void> {
        const heartbeat = interaction.client.ws.ping;
        const reply = await interaction.reply({ content: `Ping! Websocket heartbeat: ${heartbeat}ms`, fetchReply: true });
        if(roundtrip)
            await reply.edit(`Ping! Websocket heartbeat: ${heartbeat}ms | Roundtrip latency: ${reply.createdTimestamp - interaction.createdTimestamp}ms`);
    }
}