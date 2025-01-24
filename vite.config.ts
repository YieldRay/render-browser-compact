import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://cn.vite.dev/guide/build#library-mode
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: {
        isomorphic: resolve(__dirname, "src/isomorphic.tsx"),
        "react-dom": resolve(__dirname, "src/react-dom.tsx"),
        "react-server": resolve(__dirname, "src/react-server.tsx"),
        svg: resolve(__dirname, "src/svg.tsx"),
      },
      name: "RenderBrowserCompat",
    },
    rollupOptions: {
      external: ["@mdn/browser-compat-data", "react", "react-dom", "satori"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
