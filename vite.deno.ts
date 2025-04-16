import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const external = ["@mdn/browser-compat-data", "satori"];

// https://cn.vite.dev/guide/build#library-mode
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    lib: {
      entry: {
        main: resolve(__dirname, "dev/server.tsx"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        paths: external.reduce(
          (paths, pkg) => {
            paths[pkg] = `https://esm.sh/${pkg}`;
            return paths;
          },
          {} as Record<string, string>,
        ),
      },
      external,
    },
    target: "esnext",
    minify: "esbuild",
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
});
