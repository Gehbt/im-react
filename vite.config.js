import { defineConfig } from "vite";

export default defineConfig({
  build: {},
  esbuild: {
    jsxFactory: "createElement",
    jsxInject: "import { createElement } from './core/im-react.js'",
  },
});
