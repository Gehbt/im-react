// @ts-check
import path from "node:path";
import { defineConfig } from "rolldown";

export default defineConfig([
  {
    input: ["core/im-react/index.js", "core/im-react-dom/index.js"],
    plugins: [],
    output: {
      name: "im-react",
      banner: "// @ts-nocheck",
      dir: "core-bundle",
      entryFileNames: "entry-[name]-[hash].js",
      chunkFileNames: "chunk/chunk-[hash].js",
      format: "esm",
      exports: "named",
      esModule: true,
    },
    external: ["react", "react-dom"],
    cwd: import.meta.dirname,
    treeshake: false,
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
        "~core": path.resolve(import.meta.dirname, "core"),
      },
    },
    // moduleTypes: {},
  },
]);
