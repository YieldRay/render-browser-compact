import React from "react";
import { createRoot } from "react-dom/client";
import { RenderBrowserCompat } from "@/isomorphic.tsx";
import { ThemeProvider } from "@/theme.tsx";
import { ThemeToggle } from "@/components/ThemeToggle.tsx";
import { ThemeBodyProvider } from "@/components/ThemeBodyProvider.tsx";
import { init } from "@/web-component.ts";

const paths = ["api", "structuredClone"] as const;

const root = createRoot(document.getElementById("app")!);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ThemeBodyProvider>
        <ThemeToggle />
        {/* Test both compact and wide layouts */}
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <h3>Compact Layout:</h3>
            <RenderBrowserCompat paths={paths} compact />
          </div>
          <div>
            <h3>Wide Layout:</h3>
            <RenderBrowserCompat paths={paths} />
          </div>
        </div>
      </ThemeBodyProvider>
    </ThemeProvider>
  </React.StrictMode>,
);

await init();
const div = document.createElement("div");
div.innerHTML = `<browser-compat paths="${paths.join(".")}"></browser-compat>`;
document.body.append(div);
