import { renderSVG } from "../src/svg.tsx";

const handler = async () => {
  const paths = ["api", "structuredClone"] as const;
  const svg = await renderSVG(paths);
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
}
