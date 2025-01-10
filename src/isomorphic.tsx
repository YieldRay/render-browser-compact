import type { Identifier, CompatStatement } from "@mdn/browser-compat-data";
import bcd from "@mdn/browser-compat-data" with { type: "json" };
import React from "react";
import { Flex, RenderCompatSupport } from "./core.tsx";
import type { Paths } from "./api.ts";

/**
 * isomorphic, can be used in both browser and server.
 * however, as it loads all compat data, it is not recommended to use in the browser considering the bundle size.
 */
export function RenderBrowserCompat({ paths, compact }: { paths: Paths; compact?: boolean }) {
  const [keyofCompatData, ...identifiers] = paths;
  const validKeyofCompatData = new Set(Object.keys(bcd));
  validKeyofCompatData.delete("__meta");
  validKeyofCompatData.delete("browsers");
  if (!validKeyofCompatData.has(keyofCompatData)) {
    return <span>{`Error: ${keyofCompatData} is not in ${JSON.stringify(validKeyofCompatData)}`}</span>;
  }
  const identifier: Identifier = bcd[keyofCompatData];
  if (identifiers.length === 0) {
    return <span>{`Error: ${JSON.stringify(identifiers)} is empty`}</span>;
  }

  let id = identifier;
  for (const key of identifiers) {
    if (key === "__compat" || !(key in id)) {
      return <span>{`Error: ${key} is not in ${JSON.stringify(Object.keys(id))}`}</span>;
    }
    id = id[key];
  }

  const name = String(paths[paths.length - 1]);
  const compat = id.__compat!;

  const { support, status, tags } = compat;
  return <RenderBrowserCompatData {...{ name, support, tags, status, compact }} />;
}

/**
 * @internal
 */
export function RenderBrowserCompatData({ name, support, tags, status, compact }: { name: string; support: CompatStatement["support"]; tags: CompatStatement["tags"]; status: CompatStatement["status"]; compact?: boolean }) {
  return (
    <Flex flexDirection="column" padding="0px">
      <RenderCompatSupport name={name} support={support} compact={compact} />
      <Flex width={compact ? "320px" : "800px"} flexDirection={compact ? "column" : "row"} alignItems={compact ? "flex-start" : "center"} justifyContent="space-between" fontSize="11px" wordBreak="break-all">
        <span style={{ lineHeight: "85%" }}>{tags?.join(", ")}</span>
        <span style={{ lineHeight: "85%" }}>{JSON.stringify(status)}</span>
      </Flex>
    </Flex>
  );
}
