import { z } from 'zod';

export enum NODE_ENV {
  development,
  stage,
  production,
}

export const envSchema = z.object({
  PORT: z.string().optional().default('3003'),
  NODE_ENV: z.nativeEnum(NODE_ENV).optional().default(NODE_ENV.development),
  JWT_SECRET: z.string().optional().default('meowsecret'),
  JWT_EXPIRATION: z.string().optional().default('1d'),
  DATABASE_URL: z.string(),
});
export type Env = z.infer<typeof envSchema>;