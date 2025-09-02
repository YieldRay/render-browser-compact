import type { Identifier, CompatStatement } from "@mdn/browser-compat-data";
import bcd from "@mdn/browser-compat-data";
import { Flex, RenderCompatSupport, type Paths } from "./core.tsx";
import type { Theme } from "./theme.ts";
import { defaultTheme } from "./theme.ts";

/**
 * isomorphic, can be used in both browser and server.
 * however, as it loads all compat data, it is not recommended to use in the browser considering the bundle size.
 */
export function RenderBrowserCompat({ paths, compact, theme = defaultTheme }: { paths: Paths; compact?: boolean; theme?: Theme }) {
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
  return <RenderBrowserCompatData {...{ name, support, tags, status, compact, theme }} />;
}

/**
 * @internal
 */
export function RenderBrowserCompatData({ name, support, tags, status, compact, theme = defaultTheme }: { name: string; support: CompatStatement["support"]; tags: CompatStatement["tags"]; status: CompatStatement["status"]; compact?: boolean; theme?: Theme }) {
  return (
    <Flex flexDirection="column" padding="0px">
      <RenderCompatSupport name={name} support={support} compact={compact} theme={theme} />
      <Flex width={compact ? "320px" : "800px"} flexDirection={compact ? "column" : "row"} alignItems={compact ? "flex-start" : "center"} justifyContent="space-between" fontSize="11px" wordBreak="break-all" background={theme.backgroundColor} color={theme.textColor}>
        <span style={{ lineHeight: "85%", color: theme.textColor }}>{tags?.join(", ")}</span>
        <span style={{ lineHeight: "85%", color: theme.textColor }}>{JSON.stringify(status)}</span>
      </Flex>
    </Flex>
  );
}
