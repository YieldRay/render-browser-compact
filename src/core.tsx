import type { SupportBlock, SupportStatement, CompatStatement } from "@mdn/browser-compat-data";
import React from "react";
import { Desktop } from "./components/Desktop.tsx";
import { Mobile } from "./components/Mobile.tsx";
import { Chrome } from "./components/Chrome.tsx";
import { Edge } from "./components/Edge.tsx";
import { Firefox } from "./components/Firefox.tsx";
import { Opera } from "./components/Opera.tsx";
import { Safari } from "./components/Safari.tsx";
import { Samsung } from "./components/Samsung.tsx";
import { Webview } from "./components/Webview.tsx";
import { Yes } from "./components/Yes.tsx";
import { No } from "./components/No.tsx";
import { Deno } from "./components/Deno.tsx";
import { Node } from "./components/Node.tsx";
import { Server } from "./components/Server.tsx";

const CELL_WIDTH = 50;
const CELL_WIDTH_PX = `${CELL_WIDTH}px`;

export function Flex({ children, ...style }: React.PropsWithChildren<React.CSSProperties>) {
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

function DesktopBrowsers({ childrenProps, ...props }: React.PropsWithChildren<React.CSSProperties & { childrenProps?: React.CSSProperties }>) {
  console.log(childrenProps);
  const browsers = {
    Chrome,
    Edge,
    Firefox,
    Opera,
    Safari,
  } as const;
  return (
    <Flex {...props}>
      {Object.entries(browsers).map(([name, Icon]) => (
        <Flex key={name} width={CELL_WIDTH_PX} flexDirection="column" alignItems="center" justifyContent="center" gap="8px" {...childrenProps}>
          <Icon style={{ color: "#696969" }} />
          {name}
        </Flex>
      ))}
    </Flex>
  );
}

function MobileBrowsers({ childrenProps, ...props }: React.PropsWithChildren<React.CSSProperties & { childrenProps?: React.CSSProperties }>) {
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
    <Flex {...props}>
      {Object.entries(browsers).map(([name, Icon]) => (
        <Flex key={name} width={CELL_WIDTH_PX} flexDirection="column" alignItems="center" justifyContent="center" {...childrenProps}>
          <Icon style={{ color: "#696969" }} />
          {name}
        </Flex>
      ))}
    </Flex>
  );
}

function ServerRuntimes({ childrenProps, ...props }: React.PropsWithChildren<React.CSSProperties & { childrenProps?: React.CSSProperties }>) {
  const runtimes = {
    Deno,
    "Node.js": Node,
  } as const;
  return (
    <Flex {...props}>
      {Object.entries(runtimes).map(([name, Icon]) => (
        <Flex key={name} width={CELL_WIDTH_PX} flexDirection="column" alignItems="center" justifyContent="center" gap="8px" {...childrenProps}>
          <Icon style={{ color: "#696969" }} />
          {name}
        </Flex>
      ))}
    </Flex>
  );
}

function DesktopSupport({ support, childrenProps, ...props }: React.PropsWithChildren<React.CSSProperties & { childrenProps?: React.CSSProperties; support: SupportBlock }>) {
  const keys = ["chrome", "edge", "firefox", "opera", "safari"] as const;
  return (
    <Flex {...props}>
      {keys.map((key) => (
        <Flex key={key} width={CELL_WIDTH_PX} justifyContent="center" {...childrenProps}>
          <Support support={support[key]} />
        </Flex>
      ))}
    </Flex>
  );
}

function MobileSupport({ support, childrenProps, ...props }: React.PropsWithChildren<React.CSSProperties & { childrenProps?: React.CSSProperties; support: SupportBlock }>) {
  const keys = ["chrome_android", "firefox_android", "opera_android", "safari_ios", "samsunginternet_android", "webview_android", "webview_ios"] as const;
  return (
    <Flex {...props}>
      {keys.map((key) => (
        <Flex key={key} width={CELL_WIDTH_PX} justifyContent="center" {...childrenProps}>
          <Support support={support[key]} />
        </Flex>
      ))}
    </Flex>
  );
}

function ServerSupport({ support, childrenProps, ...props }: React.PropsWithChildren<React.CSSProperties & { childrenProps?: React.CSSProperties; support: SupportBlock }>) {
  const keys = ["deno", "nodejs"] as const;
  return (
    <Flex {...props}>
      {keys.map((key) => (
        <Flex key={key} width={CELL_WIDTH_PX} justifyContent="center" {...childrenProps}>
          <Support support={support[key]} />
        </Flex>
      ))}
    </Flex>
  );
}

function RenderCompatSupportWide({ name, support }: { name: string; support: CompatStatement["support"] }) {
  const fullWidth = CELL_WIDTH * 14 + 100;
  const haveServerSupport = ["deno", "nodejs"].some((key) => key in support);
  return (
    <Flex flexDirection="column" textAlign="center" fontSize="12px" lineHeight="85%" width={`${fullWidth}px`}>
      <Flex>
        <Flex width="100px" border="1px solid #cdcdcd" borderBottom="none" />
        <Flex width="100%">
          <Flex justifyContent="center" width={`${CELL_WIDTH * 5}px`} padding="4px" borderBottom="1px solid #cdcdcd" borderRight="1px solid #cdcdcd" borderTop="1px solid #cdcdcd">
            <Desktop style={{ color: "#696969" }} />
          </Flex>
          <Flex justifyContent="center" width={`${CELL_WIDTH * 7}px`} padding="4px" borderBottom="1px solid #cdcdcd" borderRight="1px solid #cdcdcd" borderTop="1px solid #cdcdcd">
            <Mobile style={{ color: "#696969" }} />
          </Flex>
          {haveServerSupport && (
            <Flex justifyContent="center" width={`${CELL_WIDTH * 2}px`} padding="4px" borderBottom="1px solid #cdcdcd" borderRight="1px solid #cdcdcd" borderTop="1px solid #cdcdcd">
              <Server style={{ color: "#696969" }} />
            </Flex>
          )}
        </Flex>
      </Flex>

      <Flex color="#1b1b1b">
        <Flex width="100px" border="1px solid #cdcdcd" borderTop="none" />
        <Flex width="100%">
          <DesktopBrowsers borderBottom="1px solid #cdcdcd" childrenProps={{ borderRight: "1px solid #cdcdcd" }} />
          <MobileBrowsers borderBottom="1px solid #cdcdcd" childrenProps={{ borderRight: "1px solid #cdcdcd" }} />
          {haveServerSupport && <ServerRuntimes borderBottom="1px solid #cdcdcd" childrenProps={{ borderRight: "1px solid #cdcdcd" }} />}
        </Flex>
      </Flex>

      <Flex>
        <Flex width="100px" border="1px solid #cdcdcd" borderTop="none">
          <Flex width="100px" alignItems="center" justifyContent="center" wordBreak="break-word" padding="0 2px">
            {name}
          </Flex>
        </Flex>
        <Flex width="100%">
          <DesktopSupport support={support} borderBottom="1px solid #cdcdcd" childrenProps={{ borderRight: "1px solid #cdcdcd" }} />
          <MobileSupport support={support} borderBottom="1px solid #cdcdcd" childrenProps={{ borderRight: "1px solid #cdcdcd" }} />
          {haveServerSupport && <ServerSupport support={support} borderBottom="1px solid #cdcdcd" childrenProps={{ borderRight: "1px solid #cdcdcd" }} />}
        </Flex>
      </Flex>
    </Flex>
  );
}

function RenderCompatSupportCompact({ name, support }: { name: string; support: CompatStatement["support"] }) {
  const fullWidth = CELL_WIDTH * 6;
  const haveServerSupport = ["deno", "nodejs"].some((key) => key in support);
  const threeCols = (
    <Flex>
      <Flex flexDirection="column" width={`${CELL_WIDTH * 2}px`}>
        <Flex height="20px" justifyContent="center" alignItems="center" border="1px solid #cdcdcd">
          <Desktop style={{ color: "#696969" }} />
        </Flex>
        <Flex>
          <DesktopBrowsers flexDirection="column" borderLeft="1px solid #cdcdcd" borderRight="1px solid #cdcdcd" childrenProps={{ borderBottom: "1px solid #cdcdcd", height: "35px" }} />
          <DesktopSupport support={support} flexDirection="column" borderRight="1px solid #cdcdcd" childrenProps={{ borderBottom: "1px solid #cdcdcd", height: "35px" }} />
        </Flex>
      </Flex>

      <Flex flexDirection="column" width={`${CELL_WIDTH * 2}px`}>
        <Flex height="20px" justifyContent="center" alignItems="center" border="1px solid #cdcdcd">
          <Mobile style={{ color: "#696969" }} />
        </Flex>
        <Flex>
          <MobileBrowsers flexDirection="column" borderLeft="1px solid #cdcdcd" borderRight="1px solid #cdcdcd" childrenProps={{ borderBottom: "1px solid #cdcdcd", height: "35px" }} />
          <MobileSupport support={support} flexDirection="column" borderRight="1px solid #cdcdcd" childrenProps={{ borderBottom: "1px solid #cdcdcd", height: "35px" }} />
        </Flex>
      </Flex>

      {haveServerSupport && (
        <Flex flexDirection="column" width={`${CELL_WIDTH * 2}px`}>
          <Flex height="20px" justifyContent="center" alignItems="center" border="1px solid #cdcdcd">
            <Server style={{ color: "#696969" }} />
          </Flex>
          <Flex>
            <ServerRuntimes flexDirection="column" borderLeft="1px solid #cdcdcd" borderRight="1px solid #cdcdcd" childrenProps={{ borderBottom: "1px solid #cdcdcd", height: "35px" }} />
            <ServerSupport support={support} flexDirection="column" borderRight="1px solid #cdcdcd" childrenProps={{ borderBottom: "1px solid #cdcdcd", height: "35px" }} />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
  return (
    <Flex width={`${fullWidth}px`} textAlign="center" fontSize="12px" lineHeight="85%" flexDirection="column">
      <Flex justifyContent="center" padding="4px">
        {name}
      </Flex>
      {threeCols}
    </Flex>
  );
}

export function RenderCompatSupport({ compact, ...props }: { name: string; support: CompatStatement["support"]; compact?: boolean }) {
  if (compact) return <RenderCompatSupportCompact {...props} />;
  else return <RenderCompatSupportWide {...props} />;
}
