"use client";
import React from "react";
import type { Paths } from "./core.tsx";
import { fetchBcdApi } from "./api.ts";
import { RenderBrowserCompatData } from "./isomorphic.tsx";
import type { Theme } from "./theme.ts";
import { defaultTheme } from "./theme.ts";

/**
 * @example
 * <RenderBrowserCompatClient
 *  paths={['api', 'AbortController']}
 *  fallback={<>Loading...</>}
 * />
 */
export function RenderBrowserCompatClient({ paths, compact, fallback, theme = defaultTheme }: { paths: Paths; compact?: boolean; fallback: React.ReactNode; theme?: Theme }) {
  const [$compat, setCompat] = React.useState<Awaited<ReturnType<typeof fetchBcdApi>>>();
  React.useEffect(() => {
    fetchBcdApi(paths).then(setCompat);
  }, [paths]);
  if (!$compat) return fallback;
  const compat = $compat.data.__compat!;
  const name = String(paths[paths.length - 1]);
  const { support, status, tags } = compat;
  return <RenderBrowserCompatData {...{ name, support, tags, status, compact, theme }} />;
}

/**
 * @example
 * <React.Suspense fallback={<Loading />}>
 *  <RenderBrowserCompat paths={['api', 'AbortController']} />
 * </React.Suspense>
 */
export function RenderBrowserCompat({ paths, compact, theme = defaultTheme }: { paths: Paths; compact?: boolean; theme?: Theme }) {
  const compat = React.use(fetchBcdApi(paths)).data.__compat!;
  const name = String(paths[paths.length - 1]);
  const { support, status, tags } = compat;
  return <RenderBrowserCompatData {...{ name, support, tags, status, compact, theme }} />;
}
