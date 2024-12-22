import React from "react";
import { createRoot } from "react-dom/client";
import { RenderBrowserCompat } from "../src/core.tsx";

const paths = ["api", "structuredClone"] as const;

const root = createRoot(document.getElementById("app")!);
root.render(
  <React.StrictMode>
    <RenderBrowserCompat paths={paths} />
  </React.StrictMode>,
);
