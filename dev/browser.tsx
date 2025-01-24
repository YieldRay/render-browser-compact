import React from "react";
import { createRoot } from "react-dom/client";
import { RenderBrowserCompat } from "@/isomorphic.tsx";
import { init } from "@/web-component.ts";

const paths = ["api", "structuredClone"] as const;

const root = createRoot(document.getElementById("app")!);
root.render(
  <React.StrictMode>
    <RenderBrowserCompat paths={paths} compact />
  </React.StrictMode>,
);

await init();
const div = document.createElement("div");
div.innerHTML = `<browser-compat paths="${paths.join(".")}"></browser-compat>`;
document.body.append(div);
