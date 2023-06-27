import { PermissionHandler } from "@discordx/utilities";
import { CommandInteraction, Guild, GuildMember, Role } from "discord.js";
import { Client, GuardFunction, Next, SimpleCommandMessage } from "discordx";

export function RoleGuard(
    roleID: string
): GuardFunction<PermissionHandler> {

    async function handleReply(interaction: CommandInteraction, reply: string) {
        if (interaction.replied)
            await interaction.followUp(reply);
        else if (interaction.deferred)
            await interaction.editReply(reply);
        else
            await interaction.reply(reply);
    }

    async function noPerms(arg: PermissionHandler) {
        if(arg instanceof SimpleCommandMessage)
            await arg.message.reply("You don't have permission to execute this command.");
        else
            await handleReply(arg, "You don't have permission to execute this command.");
    }

    return async function (arg: PermissionHandler, client: Client, next: Next) {
        let guild: Guild | null = null;
        let member: GuildMember | null = null;

        if (arg instanceof SimpleCommandMessage) {
            if(arg.message.inGuild()) {
                guild = arg.message.guild;
                member = arg.message.member;
            }
        } else {
            guild = arg.guild;
            if(arg.member instanceof GuildMember)
                member = arg.member;
        }

        if(!guild || !member) {
            if(arg instanceof SimpleCommandMessage)
                await arg.message.reply("Error");
            else
                handleReply(arg, "Error");
        }

        const isAllowed = member?.roles.cache.has(roleID);
        if(isAllowed)
            return next();
        else
            return noPerms(arg);
    }
}