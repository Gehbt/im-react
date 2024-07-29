// @ts-check
import path from "node:path";
import { defineConfig } from "rolldown";

export default defineConfig({
  input: "src/main.jsx",
  plugins: [],
  output: {
    banner: "// @ts-nocheck",
    format: "esm",
    dir: "dist",
    entryFileNames: "entry-[name].js",
    chunkFileNames: "chunk-[contenthash:8].js",
    exports: "named",
  },
  external: ["react", "react-dom"],
  cwd: import.meta.dirname,
  treeshake: true,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "~core": path.resolve(import.meta.dirname, "core"),
    },
  },
});
