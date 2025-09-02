import React from "react";
import { createRoot } from "react-dom/client";
import { RenderBrowserCompat } from "@/isomorphic.tsx";
import { init } from "@/web-component.ts";
import { lightTheme, darkTheme } from "@/theme.ts";

const paths = ["api", "structuredClone"] as const;

const root = createRoot(document.getElementById("app")!);
root.render(
  <React.StrictMode>
    <div style={{ padding: "20px" }}>
      <h2>Light Theme</h2>
      <RenderBrowserCompat paths={paths} compact theme={lightTheme} />
      
      <h2 style={{ marginTop: "40px" }}>Dark Theme</h2>
      <div style={{ background: darkTheme.backgroundColor, padding: "20px", borderRadius: "8px" }}>
        <RenderBrowserCompat paths={paths} compact theme={darkTheme} />
      </div>
    </div>
  </React.StrictMode>,
);

await init();
const div = document.createElement("div");
div.innerHTML = `
  <h2>Web Component - Light Theme</h2>
  <browser-compat paths="${paths.join(".")}" theme="light"></browser-compat>
  
  <h2>Web Component - Dark Theme</h2>
  <div style="background: ${darkTheme.backgroundColor}; padding: 20px; border-radius: 8px; margin-top: 20px;">
    <browser-compat paths="${paths.join(".")}" theme="dark"></browser-compat>
  </div>
`;
document.body.append(div);
