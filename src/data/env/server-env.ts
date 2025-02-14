/* eslint-disable n/no-process-env */
import { createEnv } from "@t3-oss/env-nextjs";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config());

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"])
  },

  onValidationError: (error) => {
    console.error(
      "❌ Invalid environment variables: ",
      error?.flatMap((d) => d.message).join(", ") ?? " Unknown error"
    );
    process.exit(1);
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env
});
