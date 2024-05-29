
import { resolve } from "node:path";
import process from "node:process";
import { defineConfig } from "vite";

const pathResolve = (dir: string) =>
  resolve(process.cwd(), ".", dir);
export const alias = {
  "@": pathResolve("src"),
  "~core": pathResolve("core"),
};
export default defineConfig({
  define: {
    withVitest: true,
  },
  plugins: [
    // swc.vite(),
  ],
  server: {},
  resolve: {
    alias,
  },
  build: {
    minify: false,
  },
  esbuild: {
    jsxFactory: "createElement",
    jsxInject: `import { createElement } from '~core/im-react'`,
    jsxImportSource: "~core/im-react",
    jsxDev: true,
  },
});
