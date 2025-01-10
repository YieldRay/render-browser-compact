import type { CompatData, Identifier } from "@mdn/browser-compat-data";

export type Paths = readonly [keyof Omit<CompatData, "__meta" | "browsers">, ...identifiers: Array<keyof Identifier>];

export async function fetchBcdApi(paths: Paths) {
  const resp: {
    browsers: unknown;
    query: string;
    data: Identifier;
  } = await fetch(`https://bcd.developer.mozilla.org/bcd/api/v0/current/${paths.join(".")}.json`).then((res) => res.json());
  return resp;
}
