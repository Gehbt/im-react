import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      root: import.meta.dirname,
      environment: "jsdom",
      exclude: ["**/node_modules/**"],
      globals: true, // config types: "vitest/globals"
      reporters: ["verbose"],
      coverage: {
        include: ["src/**/*.jsx", "src/**/*.js", "core/**/*.js"],
        exclude: ["./src/trash"],
        provider: "v8",
        reporter: ["text", "html"],
      },
    },
  }),
);
