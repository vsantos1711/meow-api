import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.string().optional().default('3000'),
  NODE_ENV: z.string().optional().default('development'),
  DATABASE_URL: z.string().optional().default('postgresql://meow:meowpass@localhost:5432/meowhub'),
});
export type Env = z.infer<typeof envSchema>;