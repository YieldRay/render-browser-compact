import { renderSVG } from "../src/svg.tsx";
import { lightTheme, darkTheme } from "../src/theme.ts";

const handler = async (request: Request) => {
  const url = new URL(request.url);
  const paths = ["api", "structuredClone"] as const;
  const theme = url.searchParams.get("theme") === "dark" ? darkTheme : lightTheme;
  const compact = url.searchParams.has("compact");
  
  const svg = await renderSVG(paths, compact, theme);
  return new Response(svg, { headers: { "content-type": "image/svg+xml" } });
};

declare global {
  const Deno: any;
  const Bun: any;
}

if (typeof Deno !== "undefined") {
  Deno.serve(handler);
} else if (typeof Bun !== "undefined") {
  console.log(`Listening on http://localhost:3000/`);
  Bun.serve({ fetch: handler });
} else {
  // this is a .tsx file, so nodejs does not support it for now
  console.log(`Listening on http://localhost:3001/`);
  const { serve } = await import("@hono/node-server");
  serve({ fetch: handler, port: 3001 });
}
