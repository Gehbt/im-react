/// <reference types="vitest" />
import { defineConfig } from "vite";
import { resolve } from "node:path";
const pathResolve = (/** @type {string} */ dir) =>
  resolve(process.cwd(), ".", dir);
const alias = {
  "@": pathResolve("src"),
  "~core": pathResolve("core"),
};
export default defineConfig({
  define: {},
  plugins: [
    // swc.vite(),
  ],
  server: {},
  resolve: {
    alias,
  },
  build: {},
  esbuild: {
    jsxFactory: "createElement",
    jsxInject: "import { createElement } from '~core/im-react'",
    jsxImportSource: "~core/im-react",
    jsxDev: true,
  },
});
