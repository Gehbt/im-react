
import { resolve } from "node:path";
import { defineConfig } from "vite";
import inspect from 'vite-plugin-inspect';

const pathResolve = (dir: string) =>
  resolve(import.meta.dirname, ".", dir);
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
    inspect({
      build: true,
      outputDir: './node_modules/.cache/.vite-inspect',
    }),
  ],
  server: {
    port: 4389,
  },
  resolve: {
    alias,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    assetsInlineLimit: 4096,
    minify: false,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/chunk/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },

    },
  },
  esbuild: {
    jsxFragment: "Fragment",
    jsxInject: `import {createElement,Fragment} from '~core/im-react'`,
    jsxFactory: "createElement",
    // jsxImportSource: "~core/im-react",
    jsxDev: true,
  },
});
// [ [1,2,3],
//   [4,5,6],
//   [7,8,9]]
