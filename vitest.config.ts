import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";
import { alias } from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      alias,
      globals: true, // config vitest/globals
      reporters: ["verbose"],
    },
  }),
);
