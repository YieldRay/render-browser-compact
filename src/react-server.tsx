"use server";
import React from "react";
import type { Paths } from "./core.tsx";
import { fetchBcdApi } from "./api.ts";
import { RenderBrowserCompatData } from "./isomorphic.tsx";
import type { Theme } from "./theme.ts";
import { defaultTheme } from "./theme.ts";

export async function RenderBrowserCompat({ paths, compact, theme = defaultTheme }: { paths: Paths; compact?: boolean; theme?: Theme }) {
  const compat = (await fetchBcdApi(paths)).data.__compat!;
  const name = String(paths[paths.length - 1]);
  const { support, status, tags } = compat;
  return <RenderBrowserCompatData {...{ name, support, tags, status, compact, theme }} />;
}
