import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    JWT_TOKEN: z.string().min(1),
    FGA_API_URL: z.string().min(1),
    FGA_STORE_ID: z.string().min(1),
    FGA_MODEL_ID: z.string().min(1)
  },
  runtimeEnvStrict: {
    JWT_TOKEN: process.env.JWT_TOKEN,
    FGA_API_URL: process.env.FGA_API_URL,
    FGA_STORE_ID: process.env.FGA_STORE_ID,
    FGA_MODEL_ID: process.env.FGA_MODEL_ID
  },
});
