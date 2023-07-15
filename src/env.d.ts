declare namespace NodeJS {
  export interface ProcessEnv {
    BOT_TOKEN: string;
    MAIN_GUILD_ID: string;
    PG_HOST: string;
    PG_USER: string;
    PG_PASS: string;
    PG_DB: string;
    NEON_URL: string;
  }
}
