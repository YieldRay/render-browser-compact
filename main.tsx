import React from "react";
import satori from "satori";
import { RenderBrowserCompat } from "./src/core.tsx";

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

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const path = url.pathname.slice(1);
  if (path === "favicon.ico") return new Response(null, { status: 404 });
  if (!path) {
    // TODO: improve docs
    return new Response(
      `See:\nhttps://developer.mozilla.org/docs/MDN/Writing_guidelines/Page_structures/Compatibility_tables\n
Example:
${url.origin}/api.AbortController
https://bcd.developer.mozilla.org/bcd/api/v0/current/api.AbortController.json
`,
      { status: 200 }
    );
  }

  const app = <RenderBrowserCompat paths={path.split(path.includes("/") ? "/" : ".") as any} />;
  const svg = await satori(app, {
    width: 800,
    height: 150,
    fonts: [
      {
        name: "Roboto",
        style: "normal",
        // TODO: should not load dynamically
        data: await loadGoogleFont("Roboto"),
      },
    ],
  });
  return new Response(svg, { headers: { "content-type": "image/svg+xml" } });
});
