import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { Paths } from "./core.tsx";
import { fetchBcdApi } from "./api.ts";
import { RenderBrowserCompatData } from "./isomorphic.tsx";
import type { Theme } from "./theme.ts";
import { defaultTheme } from "./theme.ts";

/**
 * when we need to render html, we expect it happens on the
 * client side (prefer svg on the server), so we load bcd
 * data from online api
 *
 * CSS: * { box-sizing: border-box; overflow: hidden; }
 */
export async function renderHTML(paths: Paths, compact?: boolean, theme: Theme = defaultTheme) {
  const $compat = await fetchBcdApi(paths);
  const compat = $compat.data.__compat!;
  const name = String(paths[paths.length - 1]);
  const { support, status, tags } = compat;
  const element = <RenderBrowserCompatData {...{ name, support, tags, status, compact, theme }} />;
  /**
   * non-interactive element, so we use `renderToStaticMarkup` here
   * we also do not use 'react-dom/static' as we not load data on
   * the react side (e.g. suspense)
   */
  const html = renderToStaticMarkup(element);
  return html;
  // TODO: we should add style to each element, then no extra styling is needed
}
