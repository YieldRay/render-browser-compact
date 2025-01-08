'use server'
import React from "react";
import { fetchBcdApi, type Paths } from "./api.ts"
import { RenderBrowserCompatData } from "./isomorphic.tsx";

export async function RenderBrowserCompat({ paths, compact }: { paths: Paths, compact?: boolean }) {
    const compat = (await fetchBcdApi(paths)).data.__compat!
    const name = String(paths[paths.length - 1]);
    const { support, status, tags } = compat;
    return <RenderBrowserCompatData {...{ name, support, tags, status, compact }} />

}
