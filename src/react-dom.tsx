"use client";
import React from "react";
import type { Paths } from "./core.tsx";
import { fetchBcdApi } from "./api.ts";
import { RenderBrowserCompatData } from "./isomorphic.tsx";

/**
 * @example
 * <RenderBrowserCompatClient
 *  paths={['api', 'AbortController']}
 *  fallback={<>Loading...</>}
 * />
 */
export function RenderBrowserCompatClient({ paths, compact, fallback }: { paths: Paths; compact?: boolean; fallback: React.ReactNode }) {
  const [$compat, setCompat] = React.useState<Awaited<ReturnType<typeof fetchBcdApi>>>();
  React.useEffect(() => {
    fetchBcdApi(paths).then(setCompat);
  }, [paths]);
  if (!$compat) return fallback;
  const compat = $compat.data.__compat!;
  const name = String(paths[paths.length - 1]);
  const { support, status, tags } = compat;
  return <RenderBrowserCompatData {...{ name, support, tags, status, compact }} />;
}

/**
 * @example
 * <React.Suspense fallback={<Loading />}>
 *  <RenderBrowserCompat paths={['api', 'AbortController']} />
 * </React.Suspense>
 */
export function RenderBrowserCompat({ paths, compact }: { paths: Paths; compact?: boolean }) {
  const compat = React.use(fetchBcdApi(paths)).data.__compat!;
  const name = String(paths[paths.length - 1]);
  const { support, status, tags } = compat;
  return <RenderBrowserCompatData {...{ name, support, tags, status, compact }} />;
}
