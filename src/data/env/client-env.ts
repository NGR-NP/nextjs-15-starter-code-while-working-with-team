/* eslint-disable n/no-process-env */
import { createEnv } from "@t3-oss/env-nextjs";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config());

export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z.string(),
    NEXT_PUBLIC_BASE_URL: z.string(),
    NEXT_PUBLIC_GoogleTagManager: z.string(),
    NEXT_PUBLIC_GoogleAnalytics: z.string()
  },
  onValidationError: (error) => {
    console.error(
      "❌ Invalid environment variables:",
      error?.flatMap((d) => d.message).join(", ") ?? " Unknown error"
    );
    process.exit(1);
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_GoogleTagManager: process.env.NEXT_PUBLIC_GoogleTagManager,
    NEXT_PUBLIC_GoogleAnalytics: process.env.NEXT_PUBLIC_GoogleAnalytics
  }
});
