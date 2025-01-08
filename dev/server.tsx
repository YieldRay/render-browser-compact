import React from "react";
import satori from "satori";
import { RenderBrowserCompat } from "../src/isomorphic.tsx";

// TODO: use a binary
async function loadGoogleFont(font: string, text?: string) {
  const url = new URL("https://fonts.googleapis.com/css2");
  url.searchParams.set("family", font);
  if (text) url.searchParams.set("text", text);
  const css = await fetch(url).then(res => res.text());
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)?.[1];

  if (resource) {
    const response = await fetch(resource);
    if (response.ok) {
      return await response.arrayBuffer();
    }
  }

  throw new Error(`failed to load font data`);
}

const paths = ["api", "structuredClone"] as const;
const handler = async () => {
  const svg = await satori(<RenderBrowserCompat paths={paths} />, {
    width: 800,
    height: 150,
    fonts: [
      {
        name: "Roboto",
        data: await loadGoogleFont("Roboto"),
        style: "normal",
      },
    ],
  });
  return new Response(svg, { headers: { "content-type": "image/svg+xml" } });
};

declare global {
  const Bun: any;
}

if (typeof Deno !== "undefined") {
  Deno.serve(handler);
} else if (typeof Bun !== "undefined") {
  console.log(`Listening on http://localhost:3000/`);
  Bun.serve({ fetch: handler });
}
