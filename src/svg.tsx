import React from "react";
import satori from "satori";
import type { Paths } from "./core.tsx";
import { RenderBrowserCompat } from "./isomorphic.tsx";
import type { Theme } from "./theme.ts";
import { defaultTheme } from "./theme.ts";

// TODO: use a binary font
async function loadGoogleFont(font: string, text?: string) {
  const url = new URL("https://fonts.googleapis.com/css2");
  url.searchParams.set("family", font);
  if (text) url.searchParams.set("text", text);
  const css = await fetch(url).then((res) => res.text());
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)?.[1];

  if (resource) {
    const response = await fetch(resource);
    if (response.ok) {
      return await response.arrayBuffer();
    }
  }

  throw new Error(`failed to load font data`);
}

/**
 * When we need to render SVG, this normally only happens on the
 * server side, so in this version we import the whole bcd data
 *
 * { headers: { "content-type": "image/svg+xml" } }
 */
export async function renderSVG(paths: Paths, compact?: boolean, theme: Theme = defaultTheme) {
  return satori(<RenderBrowserCompat paths={paths} compact={compact} theme={theme} />, {
    width: compact ? 260 : 800,
    height: compact ? 800 : 150,
    fonts: [
      {
        name: "Roboto",
        data: await loadGoogleFont("Roboto"),
        style: "normal",
      },
    ],
  });
}
