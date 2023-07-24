# GIR.ts

## Development
```
pnpm i
```

set up `.env` file
```
BOT_TOKEN=""
MAIN_GUILD_ID=""
DB_CONNECTION_STRING=""
```

set up `gir.config.json` based on `gir.config.example.json`


```
pnpm dev
```

## Migrations
When you make a change to the database schema, you need to generate a migration file. To do this, run the following command:
```
pnpm generate
```

Migrations are run on development every time you start the bot. On production, you can run the following command, but ideally have this as a build step:

```
pnpm migrate
```
