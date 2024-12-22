import satori from "satori";
import { createRoot } from "react-dom/client";
import { App } from "./comp";
import { StrictMode } from "react";

async function loadGoogleFont(font: string, text?: string) {
  const url = new URL("https://fonts.googleapis.com/css2");
  url.searchParams.set("family", font);
  if (text) url.searchParams.set("text", text);
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error(`failed to load font data`);
}

if (typeof Bun !== "undefined")
  Bun.serve({
    async fetch() {
      const svg = await satori(<App />, {
        width: 800,
        height: 600,
        fonts: [
          {
            name: "Roboto",
            data: await loadGoogleFont("Roboto"),
            style: "normal",
          },
        ],
      });
      return new Response(svg, { headers: { "content-type": "image/svg+xml" } });
    },
  });
else {
  const root = createRoot(document.getElementById("app")!);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
