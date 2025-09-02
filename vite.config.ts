import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://cn.vite.dev/guide/build#library-mode
export default defineConfig({
  plugins: [react(), tsconfigPaths(), dts({ tsconfigPath: "./tsconfig.app.json" })],
  build: {
    lib: {
      entry: {
        isomorphic: resolve(__dirname, "src/isomorphic.tsx"),
        "react-dom": resolve(__dirname, "src/react-dom.tsx"),
        "react-server": resolve(__dirname, "src/react-server.tsx"),
        "web-component": resolve(__dirname, "src/web-component.ts"),
        svg: resolve(__dirname, "src/svg.tsx"),
        html: resolve(__dirname, "src/html.tsx"),
        theme: resolve(__dirname, "src/theme.ts"),
      },
      name: "RenderBrowserCompat",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["@mdn/browser-compat-data", "react", "react-dom", "react-dom/client", "react-dom/server", "react/jsx-runtime", "satori"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
