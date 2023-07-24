import fs from 'fs';
import { z } from 'zod';

const ConfigSchema = z.object({
  roles: z.object({
    moderator: z.string(),
    administrator: z.string(),
    subredditMod: z.string(),
    subredditNews: z.string(),
    genius: z.string(),
    developer: z.string(),
    birthday: z.string(),
    member: z.object({
      ultra: z.string(),
      one: z.string(),
      edition: z.string(),
      pro: z.string(),
      plus: z.string(),
    }),
  }),
  channels: z.object({
    reports: z.string(),
    logs: z.object({
      public: z.string(),
      private: z.string(),
    }),
    rules: z.string(),
    appleNews: z.string(),
    subredditNews: z.string(),
    commonIssues: z.string(),
    general: z.string(),
    development: z.string(),
    botCommands: z.string(),
    boosterEmojiRequests: z.string(),
  }),
  misc: z.object({
    blootoothServerId: z.string(),
  }),
});

const rawdata = fs.readFileSync('gir.config.json').toString();
const parsed = JSON.parse(rawdata);
const config = ConfigSchema.parse(parsed);

export default config;
