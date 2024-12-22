import bcd from "@mdn/browser-compat-data" with { type: "json" };
import type { SupportBlock, SupportStatement } from "@mdn/browser-compat-data";
import { Desktop } from "./components/Desktop";
import { Mobile } from "./components/Mobile";
import { Chrome } from "./components/Chrome";
import { Edge } from "./components/Edge";
import { Firefox } from "./components/Firefox";
import { Opera } from "./components/Opera";
import { Safari } from "./components/Safari";
import { Samsung } from "./components/Samsung";
import { Webview } from "./components/Webview";
import { Yes } from "./components/Yes";
import { No } from "./components/No";
import { CSSProperties, PropsWithChildren } from "react";

const cellW = 50;
const cellWidth = `${cellW}px`;

function Flex({ children, ...style }: PropsWithChildren<CSSProperties>) {
  return <div style={{ ...style, display: "flex" }}>{children}</div>;
}

function Support({ support }: { support: SupportStatement | undefined }) {
  if (Array.isArray(support)) {
    const version_added = support[0].version_added;
    return (
      <Flex flexDirection="column" alignItems="center" justifyContent="center" gap="6px" padding="8px 0 3px">
        <Yes style={{ color: "#696969" }} />
        <span style={{ color: "#007936" }}>{version_added}</span>
      </Flex>
    );
  }
  if (support?.version_added)
    return (
      <Flex flexDirection="column" alignItems="center" justifyContent="center" gap="6px" padding="8px 0 3px">
        <Yes style={{ color: "#696969" }} />
        <span style={{ color: "#007936" }}>{support.version_added}</span>
      </Flex>
    );

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center" gap="6px" padding="8px 0 3px">
      <No style={{ color: "#d30038" }} />
      <span style={{ color: "#d30038" }}>No</span>
    </Flex>
  );
}

function DesktopBrowsers() {
  const browsers = {
    Chrome: Chrome,
    Edge: Edge,
    Firefox: Firefox,
    Opera: Opera,
    Safari: Safari,
  } as const;
  return (
    <Flex borderBottom="1px solid #cdcdcd">
      {Object.entries(browsers).map(([name, Icon]) => (
        <Flex key={name} width={cellWidth} borderRight="1px solid #cdcdcd" flexDirection="column" alignItems="center" justifyContent="center" gap="8px">
          <Icon style={{ color: "#696969" }} />
          {name}
        </Flex>
      ))}
    </Flex>
  );
}

function MobileBrowsers() {
  const browsers = {
    "Chrome Android": Chrome,
    "Firefox Android": Firefox,
    "Opera Android": Opera,
    "Safari IOS": Safari,
    "Samsung Internet": Samsung,
    "Webview Android": Webview,
    "Webview IOS": Safari,
  } as const;
  return (
    <Flex borderBottom="1px solid #cdcdcd">
      {Object.entries(browsers).map(([name, Icon]) => (
        <Flex key={name} width={cellWidth} borderRight="1px solid #cdcdcd" flexDirection="column" alignItems="center" justifyContent="center">
          <Icon style={{ color: "#696969" }} />
          {name}
        </Flex>
      ))}
    </Flex>
  );
}

function DesktopSupport({ support }: { support: SupportBlock }) {
  const keys = ["chrome", "edge", "firefox", "opera", "safari"] as const;
  return (
    <Flex borderBottom="1px solid #cdcdcd">
      {keys.map((key) => (
        <Flex width={cellWidth} borderRight="1px solid #cdcdcd" justifyContent="center">
          <Support support={support[key]} />
        </Flex>
      ))}
    </Flex>
  );
}

function MobileSupport({ support }: { support: SupportBlock }) {
  const keys = ["chrome_android", "firefox_android", "opera_android", "safari_ios", "samsunginternet_android", "webview_android", "webview_ios"] as const;
  return (
    <Flex borderBottom="1px solid #cdcdcd">
      {keys.map((key) => (
        <Flex width={cellWidth} borderRight="1px solid #cdcdcd" justifyContent="center">
          <Support support={support[key]} />
        </Flex>
      ))}
    </Flex>
  );
}

export function App() {
  // const compact = bcd.css.properties.display.__compat!
  const name = "Promise.try";
  const compact = bcd.javascript.builtins.Promise.try.__compat;
  console.log(compact);
  //@ts-ignore
  const { support, status, tags } = compact!;

  const jsx = (
    <Flex flexDirection="column" textAlign="center" fontSize="12px" lineHeight="85%">
      <Flex>
        <Flex width="100px" border="1px solid #cdcdcd" />
        <Flex width="100%">
          <Flex justifyContent="center" width={`${cellW * 5}px`} padding="4px" borderBottom="1px solid #cdcdcd" borderRight="1px solid #cdcdcd" borderTop="1px solid #cdcdcd">
            <Desktop style={{ color: "#696969" }} />
          </Flex>
          <Flex justifyContent="center" width={`${cellW * 7}px`} padding="4px" borderBottom="1px solid #cdcdcd" borderRight="1px solid #cdcdcd" borderTop="1px solid #cdcdcd">
            <Mobile style={{ color: "#696969" }} />
          </Flex>
        </Flex>
      </Flex>

      <Flex color="#1b1b1b">
        <Flex width="100px" border="1px solid #cdcdcd" borderTop="none" />
        <Flex width="100%">
          <DesktopBrowsers />
          <MobileBrowsers />
        </Flex>
      </Flex>

      <Flex>
        <Flex width="100px" border="1px solid #cdcdcd" borderTop="none">
          <Flex width="100px" alignItems="center" justifyContent="center">
            {name}
          </Flex>
        </Flex>
        <Flex width="100%">
          <DesktopSupport support={support} />
          <MobileSupport support={support} />
        </Flex>
      </Flex>
    </Flex>
  );

  return (
    <Flex flexDirection="column" padding="2px">
      {jsx}
      <Flex width="705px" alignItems="center" justifyContent="space-between" fontSize="11px">
        <span>{tags?.join(", ")}</span>
        <span>{JSON.stringify(status)}</span>
      </Flex>
    </Flex>
  );
}
