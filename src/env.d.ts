// declare global {
  declare namespace NodeJS {
    export interface ProcessEnv {
      BOT_TOKEN: string;
      MAIN_GUILD_ID: string;
    }
  }
// }
