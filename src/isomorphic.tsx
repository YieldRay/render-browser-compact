import type { CompatData, Identifier } from "@mdn/browser-compat-data";
import bcd from "@mdn/browser-compat-data" with { type: "json" };
import React from "react";
import { Flex, RenderCompatSupport } from "./core.tsx";

export function RenderBrowserCompat({ paths }: { paths: readonly [keyof Omit<CompatData, "__meta" | "browsers">, ...identifiers: Array<keyof Identifier>] }) {
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

  const name = String(paths.at(-1)!);
  const compat = id.__compat!;

  const { support, status, tags } = compat;

  return (
    <Flex flexDirection="column" padding="0px">
      <RenderCompatSupport name={name} support={support} />
      <Flex width="800px" alignItems="center" justifyContent="space-between" fontSize="11px">
        <span>{tags?.join(", ")}</span>
        <span>{JSON.stringify(status)}</span>
      </Flex>
    </Flex>
  );
}
