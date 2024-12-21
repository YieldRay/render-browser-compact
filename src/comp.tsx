import bcd from "@mdn/browser-compat-data" with { type: "json" };
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

function Support({ support }: { support: any }) {
  if (support.version_added)
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
  const style: CSSProperties = {
    width: cellWidth,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    borderRight: "1px solid #cdcdcd",
  };
  return (
    <Flex borderBottom="1px solid #cdcdcd">
      <Flex {...style}>
        <Chrome style={{ color: "#696969" }} />
        Chrome
      </Flex>
      <Flex {...style}>
        <Edge style={{ color: "#696969" }} />
        Edge
      </Flex>
      <Flex {...style}>
        <Firefox style={{ color: "#696969" }} />
        Firefox
      </Flex>
      <Flex {...style}>
        <Opera style={{ color: "#696969" }} />
        Opera
      </Flex>
      <Flex {...style}>
        <Safari style={{ color: "#696969" }} />
        Safari
      </Flex>
    </Flex>
  );
}

function MobileBrowsers() {
  const style: CSSProperties = {
    width: cellWidth,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRight: "1px solid #cdcdcd",
  };
  return (
    <Flex borderBottom="1px solid #cdcdcd">
      <Flex {...style}>
        <Chrome style={{ color: "#696969" }} />
        Chrome Android
      </Flex>
      <Flex {...style}>
        <Firefox style={{ color: "#696969" }} />
        Firefox Android
      </Flex>
      <Flex {...style}>
        <Opera style={{ color: "#696969" }} />
        Opera Android
      </Flex>
      <Flex {...style}>
        <Safari style={{ color: "#696969" }} />
        Safari IOS
      </Flex>
      <Flex {...style}>
        <Samsung style={{ color: "#696969" }} />
        Samsung Internet
      </Flex>
      <Flex {...style}>
        <Webview style={{ color: "#696969" }} />
        Webview Android
      </Flex>
      <Flex {...style}>
        <Safari style={{ color: "#696969" }} />
        Webview IOS
      </Flex>
    </Flex>
  );
}

function DesktopSupport({ support }: { support: any }) {
  const style: CSSProperties = {
    width: cellWidth,
    borderRight: "1px solid #cdcdcd",
    justifyContent: "center",
  };
  return (
    <Flex borderBottom="1px solid #cdcdcd">
      <Flex {...style}>
        <Support support={support.chrome} />
      </Flex>
      <Flex {...style}>
        <Support support={support.chrome} />
      </Flex>
      <Flex {...style}>
        <Support support={support.chrome} />
      </Flex>
      <Flex {...style}>
        <Support support={support.chrome} />
      </Flex>
      <Flex {...style}>
        <Support support={support.chrome} />
      </Flex>
    </Flex>
  );
}

function MobileSupport({ support }: { support: any }) {
  const style: CSSProperties = {
    width: cellWidth,
    borderRight: "1px solid #cdcdcd",
    justifyContent: "center",
  };
  return (
    <Flex borderBottom="1px solid #cdcdcd">
      <Flex {...style}>
        <Support support={support.chrome_android} />
      </Flex>
      <Flex {...style}>
        <Support support={support.firefox_android} />
      </Flex>
      <Flex {...style}>
        <Support support={support.opera_android} />
      </Flex>
      <Flex {...style}>
        <Support support={support.safari_ios} />
      </Flex>
      <Flex {...style}>
        <Support support={support.samsunginternet_android} />
      </Flex>
      <Flex {...style}>
        <Support support={support.webview_android} />
      </Flex>
      <Flex {...style}>
        <Support support={support.webview_ios} />
      </Flex>
    </Flex>
  );
}

export function App() {
  // const compact = bcd.css.properties.display.__compat!
  const name = "Promise.try";
  const compact = bcd.javascript.builtins.Promise.try.__compat;
  console.log(compact);
  //@ts-ignore
  const { support, status, tags } = compact;

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
