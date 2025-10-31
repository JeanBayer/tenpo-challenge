import 'dotenv/config';
import z from 'zod';

const EnvSchema = z.object({
  PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  FRONTEND_URL: z.string().optional().default('http://localhost:5173'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

const env = EnvSchema.safeParse(process.env);

if (!env.success) {
  console.error('Invalid environment variables:', env.error.format());
  process.exit(1);
}

export const envs = env.data;
