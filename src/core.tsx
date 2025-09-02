import type { SupportBlock, SupportStatement, CompatStatement, CompatData, Identifier } from "@mdn/browser-compat-data";
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
import type { Theme } from "./theme.ts";
import { defaultTheme } from "./theme.ts";

const CELL_WIDTH = 50;
const CELL_WIDTH_PX = `${CELL_WIDTH}px`;

export function Flex({ children, ...style }: React.PropsWithChildren<React.CSSProperties>) {
  return <div style={{ ...style, display: "flex" }}>{children}</div>;
}

function Support({ support, theme = defaultTheme }: { support: SupportStatement | undefined; theme?: Theme }) {
  if (Array.isArray(support)) {
    const version_added = support[0].version_added;
    return (
      <Flex flexDirection="column" alignItems="center" justifyContent="center" gap="6px" padding="8px 0 3px">
        <Yes style={{ color: theme.iconColor }} />
        <span style={{ color: theme.supportYesColor }}>{version_added}</span>
      </Flex>
    );
  }
  if (support?.version_added)
    return (
      <Flex flexDirection="column" alignItems="center" justifyContent="center" gap="6px" padding="8px 0 3px">
        <Yes style={{ color: theme.iconColor }} />
        <span style={{ color: theme.supportYesColor }}>{support.version_added}</span>
      </Flex>
    );

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center" gap="6px" padding="8px 0 3px">
      <No style={{ color: theme.supportNoColor }} />
      <span style={{ color: theme.supportNoColor }}>No</span>
    </Flex>
  );
}

function DesktopBrowsers({ childrenProps, theme = defaultTheme, ...props }: React.PropsWithChildren<React.CSSProperties & { childrenProps?: React.CSSProperties; theme?: Theme }>) {
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
          <Icon style={{ color: theme.iconColor }} />
          <span style={{ color: theme.textColor }}>{name}</span>
        </Flex>
      ))}
    </Flex>
  );
}

function MobileBrowsers({ childrenProps, theme = defaultTheme, ...props }: React.PropsWithChildren<React.CSSProperties & { childrenProps?: React.CSSProperties; theme?: Theme }>) {
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
          <Icon style={{ color: theme.iconColor }} />
          <span style={{ color: theme.textColor }}>{name}</span>
        </Flex>
      ))}
    </Flex>
  );
}

function ServerRuntimes({ childrenProps, theme = defaultTheme, ...props }: React.PropsWithChildren<React.CSSProperties & { childrenProps?: React.CSSProperties; theme?: Theme }>) {
  const runtimes = {
    Deno,
    "Node.js": Node,
  } as const;
  return (
    <Flex {...props}>
      {Object.entries(runtimes).map(([name, Icon]) => (
        <Flex key={name} width={CELL_WIDTH_PX} flexDirection="column" alignItems="center" justifyContent="center" gap="8px" {...childrenProps}>
          <Icon style={{ color: theme.iconColor }} />
          <span style={{ color: theme.textColor }}>{name}</span>
        </Flex>
      ))}
    </Flex>
  );
}

function DesktopSupport({ support, childrenProps, theme = defaultTheme, ...props }: React.PropsWithChildren<React.CSSProperties & { childrenProps?: React.CSSProperties; support: SupportBlock; theme?: Theme }>) {
  const keys = ["chrome", "edge", "firefox", "opera", "safari"] as const;
  return (
    <Flex {...props}>
      {keys.map((key) => (
        <Flex key={key} width={CELL_WIDTH_PX} justifyContent="center" {...childrenProps}>
          <Support support={support[key]} theme={theme} />
        </Flex>
      ))}
    </Flex>
  );
}

function MobileSupport({ support, childrenProps, theme = defaultTheme, ...props }: React.PropsWithChildren<React.CSSProperties & { childrenProps?: React.CSSProperties; support: SupportBlock; theme?: Theme }>) {
  const keys = ["chrome_android", "firefox_android", "opera_android", "safari_ios", "samsunginternet_android", "webview_android", "webview_ios"] as const;
  return (
    <Flex {...props}>
      {keys.map((key) => (
        <Flex key={key} width={CELL_WIDTH_PX} justifyContent="center" {...childrenProps}>
          <Support support={support[key]} theme={theme} />
        </Flex>
      ))}
    </Flex>
  );
}

function ServerSupport({ support, childrenProps, theme = defaultTheme, ...props }: React.PropsWithChildren<React.CSSProperties & { childrenProps?: React.CSSProperties; support: SupportBlock; theme?: Theme }>) {
  const keys = ["deno", "nodejs"] as const;
  return (
    <Flex {...props}>
      {keys.map((key) => (
        <Flex key={key} width={CELL_WIDTH_PX} justifyContent="center" {...childrenProps}>
          <Support support={support[key]} theme={theme} />
        </Flex>
      ))}
    </Flex>
  );
}

function RenderCompatSupportWide({ name, support, theme = defaultTheme }: { name: string; support: CompatStatement["support"]; theme?: Theme }) {
  const fullWidth = CELL_WIDTH * 14 + 100;
  const haveServerSupport = ["deno", "nodejs"].some((key) => key in support);
  return (
    <Flex flexDirection="column" textAlign="center" fontSize="12px" lineHeight="85%" width={`${fullWidth}px`} background={theme.backgroundColor} color={theme.textColor}>
      <Flex>
        <Flex width="100px" border={`1px solid ${theme.borderColor}`} borderBottom="none" />
        <Flex width="100%">
          <Flex justifyContent="center" width={`${CELL_WIDTH * 5}px`} padding="4px" borderBottom={`1px solid ${theme.borderColor}`} borderRight={`1px solid ${theme.borderColor}`} borderTop={`1px solid ${theme.borderColor}`}>
            <Desktop style={{ color: theme.iconColor }} />
          </Flex>
          <Flex justifyContent="center" width={`${CELL_WIDTH * 7}px`} padding="4px" borderBottom={`1px solid ${theme.borderColor}`} borderRight={`1px solid ${theme.borderColor}`} borderTop={`1px solid ${theme.borderColor}`}>
            <Mobile style={{ color: theme.iconColor }} />
          </Flex>
          {haveServerSupport && (
            <Flex justifyContent="center" width={`${CELL_WIDTH * 2}px`} padding="4px" borderBottom={`1px solid ${theme.borderColor}`} borderRight={`1px solid ${theme.borderColor}`} borderTop={`1px solid ${theme.borderColor}`}>
              <Server style={{ color: theme.iconColor }} />
            </Flex>
          )}
        </Flex>
      </Flex>

      <Flex color={theme.textColor}>
        <Flex width="100px" border={`1px solid ${theme.borderColor}`} borderTop="none" />
        <Flex width="100%">
          <DesktopBrowsers borderBottom={`1px solid ${theme.borderColor}`} childrenProps={{ borderRight: `1px solid ${theme.borderColor}` }} theme={theme} />
          <MobileBrowsers borderBottom={`1px solid ${theme.borderColor}`} childrenProps={{ borderRight: `1px solid ${theme.borderColor}` }} theme={theme} />
          {haveServerSupport && <ServerRuntimes borderBottom={`1px solid ${theme.borderColor}`} childrenProps={{ borderRight: `1px solid ${theme.borderColor}` }} theme={theme} />}
        </Flex>
      </Flex>

      <Flex>
        <Flex width="100px" border={`1px solid ${theme.borderColor}`} borderTop="none">
          <Flex width="100px" alignItems="center" justifyContent="center" wordBreak="break-word" padding="0 2px" color={theme.textColor}>
            {name}
          </Flex>
        </Flex>
        <Flex width="100%">
          <DesktopSupport support={support} borderBottom={`1px solid ${theme.borderColor}`} childrenProps={{ borderRight: `1px solid ${theme.borderColor}` }} theme={theme} />
          <MobileSupport support={support} borderBottom={`1px solid ${theme.borderColor}`} childrenProps={{ borderRight: `1px solid ${theme.borderColor}` }} theme={theme} />
          {haveServerSupport && <ServerSupport support={support} borderBottom={`1px solid ${theme.borderColor}`} childrenProps={{ borderRight: `1px solid ${theme.borderColor}` }} theme={theme} />}
        </Flex>
      </Flex>
    </Flex>
  );
}

function RenderCompatSupportCompact({ name, support, theme = defaultTheme }: { name: string; support: CompatStatement["support"]; theme?: Theme }) {
  const fullWidth = CELL_WIDTH * 6;
  const haveServerSupport = ["deno", "nodejs"].some((key) => key in support);
  const threeCols = (
    <Flex background={theme.backgroundColor} color={theme.textColor}>
      <Flex flexDirection="column" width={`${CELL_WIDTH * 2}px`}>
        <Flex height="20px" justifyContent="center" alignItems="center" border={`1px solid ${theme.borderColor}`}>
          <Desktop style={{ color: theme.iconColor }} />
        </Flex>
        <Flex>
          <DesktopBrowsers flexDirection="column" borderLeft={`1px solid ${theme.borderColor}`} borderRight={`1px solid ${theme.borderColor}`} childrenProps={{ borderBottom: `1px solid ${theme.borderColor}`, height: "35px" }} theme={theme} />
          <DesktopSupport support={support} flexDirection="column" borderRight={`1px solid ${theme.borderColor}`} childrenProps={{ borderBottom: `1px solid ${theme.borderColor}`, height: "35px" }} theme={theme} />
        </Flex>
      </Flex>

      <Flex flexDirection="column" width={`${CELL_WIDTH * 2}px`}>
        <Flex height="20px" justifyContent="center" alignItems="center" border={`1px solid ${theme.borderColor}`}>
          <Mobile style={{ color: theme.iconColor }} />
        </Flex>
        <Flex>
          <MobileBrowsers flexDirection="column" borderLeft={`1px solid ${theme.borderColor}`} borderRight={`1px solid ${theme.borderColor}`} childrenProps={{ borderBottom: `1px solid ${theme.borderColor}`, height: "35px" }} theme={theme} />
          <MobileSupport support={support} flexDirection="column" borderRight={`1px solid ${theme.borderColor}`} childrenProps={{ borderBottom: `1px solid ${theme.borderColor}`, height: "35px" }} theme={theme} />
        </Flex>
      </Flex>

      {haveServerSupport && (
        <Flex flexDirection="column" width={`${CELL_WIDTH * 2}px`}>
          <Flex height="20px" justifyContent="center" alignItems="center" border={`1px solid ${theme.borderColor}`}>
            <Server style={{ color: theme.iconColor }} />
          </Flex>
          <Flex>
            <ServerRuntimes flexDirection="column" borderLeft={`1px solid ${theme.borderColor}`} borderRight={`1px solid ${theme.borderColor}`} childrenProps={{ borderBottom: `1px solid ${theme.borderColor}`, height: "35px" }} theme={theme} />
            <ServerSupport support={support} flexDirection="column" borderRight={`1px solid ${theme.borderColor}`} childrenProps={{ borderBottom: `1px solid ${theme.borderColor}`, height: "35px" }} theme={theme} />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
  return (
    <Flex width={`${fullWidth}px`} textAlign="center" fontSize="12px" lineHeight="85%" flexDirection="column">
      <Flex justifyContent="center" padding="4px" color={theme.textColor}>
        {name}
      </Flex>
      {threeCols}
    </Flex>
  );
}

export function RenderCompatSupport({ compact, theme = defaultTheme, ...props }: { name: string; support: CompatStatement["support"]; compact?: boolean; theme?: Theme }) {
  if (compact) return <RenderCompatSupportCompact {...props} theme={theme} />;
  // wide: 800px
  // compact: 260px
  else return <RenderCompatSupportWide {...props} theme={theme} />;
}

export type Paths = readonly [keyof Omit<CompatData, "__meta" | "browsers">, ...identifiers: Array<keyof Identifier>];
