'use client'
import React from "react";
import { fetchBcdApi, type Paths } from "./api.ts"
import { RenderBrowserCompatData } from "./isomorphic.tsx"


export function RenderBrowserCompatClient({ paths, compact }: { paths: Paths, compact?: boolean }) {
  const compat = React.use(fetchBcdApi(paths)).data.__compat!
  const name = String(paths[paths.length - 1]);
  const { support, status, tags } = compat;
  return <RenderBrowserCompatData {...{ name, support, tags, status, compact }} />
}

/**
 * @example
 * <React.Suspense fallback={<Loading />}>
 *  <RenderBrowserCompat paths={['api', 'AbortController']} />
 * </React.Suspense>
 */
export function RenderBrowserCompat({ paths, compact }: { paths: Paths, compact?: boolean }) {
  const compat = React.use(fetchBcdApi(paths)).data.__compat!
  const name = String(paths[paths.length - 1]);
  const { support, status, tags } = compat;
  return <RenderBrowserCompatData {...{ name, support, tags, status, compact }} />
}
