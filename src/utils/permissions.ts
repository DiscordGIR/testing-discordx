import { GuildMember } from 'discord.js';
import config from './config';

export enum PermissionLevel {
  EVERYONE,
  MEMBER_PLUS,
  MEMBER_PRO,
  MEMBER_EDITION,
  GENIUS,
  MODERATOR,
  ADMINISTRATOR,
  GUILD_OWNER,
  BOT_OWNER,
}

export class Permissions {
  permissionNames = {
    0: 'Everyone and up',
    1: 'Member Plus and up',
    2: 'Member Pro and up',
    3: 'Member Edition and up',
    4: 'Genius and up',
    5: 'Moderator and up',
    6: 'Administrator and up',
    7: 'Guild owner (Aaron) and up',
    8: 'Bot owner',
  };

  static permissionIds = {
    [PermissionLevel.MEMBER_PLUS]: config.roles.member.plus,
    [PermissionLevel.MEMBER_PRO]: config.roles.member.pro,
    [PermissionLevel.MEMBER_EDITION]: config.roles.member.edition,
    [PermissionLevel.GENIUS]: config.roles.genius,
    [PermissionLevel.MODERATOR]: config.roles.moderator,
    [PermissionLevel.ADMINISTRATOR]: config.roles.administrator,
    [PermissionLevel.GUILD_OWNER]: config.misc.mainGuildOwnerId,
    [PermissionLevel.BOT_OWNER]: config.misc.botOwnerId,
  };

  static has(member: GuildMember, level: PermissionLevel): boolean {
    switch (level) {
      case 0:
        return true;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return (
          Permissions.has(member, level + 1) ||
          member.roles.cache.has(Permissions.permissionIds[level])
        );
      case 7:
        return (
          Permissions.has(member, level + 1) ||
          member.id === Permissions.permissionIds[level]
        );
      case 8:
        return member.id === Permissions.permissionIds[level];
      default:
        return false;
    }
  }
}
