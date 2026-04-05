import React from "react";
import { createRoot } from "react-dom/client";
import bcd from "@mdn/browser-compat-data";
import type { Identifier, CompatData } from "@mdn/browser-compat-data";
import { RenderBrowserCompat } from "@/isomorphic.tsx";
import { lightTheme } from "@/theme.ts";
import type { Paths } from "@/core.tsx";
import s from "./app.module.css";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";

hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("xml", xml);

// ─── BCD helpers ─────────────────────────────────────────────────────────────

type TopKey = keyof Omit<CompatData, "__meta" | "browsers">;

const TOP_KEYS = Object.keys(bcd).filter((k) => k !== "__meta" && k !== "browsers") as TopKey[];

function getNode(path: string[]): Identifier | null {
  if (!path.length) return null;
  const [top, ...rest] = path;
  if (!(top in bcd) || top === "__meta" || top === "browsers") return null;
  let node: Identifier = (bcd as unknown as Record<string, Identifier>)[top];
  for (const seg of rest) {
    if (!(seg in node)) return null;
    node = node[seg] as Identifier;
  }
  return node;
}

function childKeys(node: Identifier): string[] {
  return Object.keys(node).filter((k) => k !== "__compat");
}

function hasCompat(node: Identifier): boolean {
  return "__compat" in node;
}

// ─── App state ───────────────────────────────────────────────────────────────

type State = { path: string[]; compact: boolean };

// ─── Top nav ─────────────────────────────────────────────────────────────────

function TopNav({ compact, onToggleCompact, onMenuClick }: { compact: boolean; onToggleCompact: () => void; onMenuClick: () => void }) {
  return (
    <nav className={s.nav}>
      <button className={s.menuBtn} onClick={onMenuClick} aria-label="Toggle menu">
        ☰
      </button>
      <a className={s.navLogo} href="#">
        <span className={s.navLogoIcon}>&lt;/&gt;</span>
        <span className={s.navLogoName}>render-browser-compat</span>
      </a>
      <div className={s.navSpacer} />
      <label className={s.navCompact}>
        <input type="checkbox" checked={compact} onChange={onToggleCompact} />
        Compact
      </label>
    </nav>
  );
}

// ─── Breadcrumb bar ───────────────────────────────────────────────────────────

function BreadcrumbBar({ path, onNav }: { path: string[]; onNav: (p: string[]) => void }) {
  if (!path.length) return null;
  const crumbs = ["BCD", ...path];
  return (
    <div className={s.breadcrumb}>
      {crumbs.map((seg, i) => {
        const isLast = i === crumbs.length - 1;
        const navPath = i === 0 ? [] : path.slice(0, i);
        return (
          <React.Fragment key={i}>
            {i > 0 && <span className={s.breadcrumbSep}>›</span>}
            {isLast ? (
              <span className={s.breadcrumbCurrent}>{seg}</span>
            ) : (
              <button className={s.breadcrumbLink} onClick={() => onNav(navPath)}>
                {seg}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar({ path, onNav, visible, onClose }: { path: string[]; onNav: (p: string[]) => void; visible: boolean; onClose: () => void }) {
  const [filter, setFilter] = React.useState("");
  const topActive = path[0] ?? "";
  const parentPath = React.useMemo(() => (path.length > 1 ? path.slice(0, -1) : []), [path]);
  const parentNode = React.useMemo(() => (parentPath.length ? getNode(parentPath) : null), [parentPath]);
  const siblings = React.useMemo(() => (parentNode ? childKeys(parentNode).filter((k) => k !== topActive) : null), [parentNode, topActive]);
  const filteredTop = filter ? TOP_KEYS.filter((k) => k.toLowerCase().includes(filter.toLowerCase())) : TOP_KEYS;

  function nav(p: string[]) {
    setFilter("");
    onNav(p);
    onClose();
  }

  return (
    <>
      {/* Overlay for mobile */}
      <div className={`${s.sidebarOverlay} ${visible ? s.sidebarOverlayVisible : ""}`} onClick={onClose} />
      <aside className={`${s.sidebar} ${visible ? s.sidebarVisible : ""}`}>
        <div className={s.sidebarFilterWrap}>
          <div className={s.sidebarFilterBox}>
            <span className={s.sidebarFilterIcon}>⌕</span>
            <input className={s.sidebarFilterInput} type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter" />
          </div>
        </div>

        <div className={s.sidebarList}>
          {filteredTop.map((cat) => {
            const isActive = cat === topActive;
            return (
              <React.Fragment key={cat}>
                <button className={`${s.sidebarItem} ${isActive ? s.sidebarItemActive : ""}`} onClick={() => nav([cat])}>
                  {cat}
                </button>

                {isActive && siblings && !filter && (
                  <div>
                    {parentPath.length > 1 && (
                      <button className={s.sidebarParentLabel} onClick={() => nav(parentPath)}>
                        {parentPath[parentPath.length - 1]}
                      </button>
                    )}
                    {siblings.map((sib) => {
                      const sibPath = [...parentPath, sib];
                      const isSibActive = path[path.length - 1] === sib && path.length === sibPath.length;
                      return (
                        <button key={sib} className={`${s.sidebarSubItem} ${isSibActive ? s.sidebarSubItemActive : ""}`} onClick={() => nav(sibPath)}>
                          {sib}
                        </button>
                      );
                    })}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </aside>
    </>
  );
}

// ─── Baseline box ─────────────────────────────────────────────────────────────

function BaselineBox({ name }: { name: string }) {
  return (
    <div className={s.baseline}>
      <span className={s.baselineIcon}>✅</span>
      <div>
        <div className={s.baselineTitle}>
          Baseline <span className={s.baselineSub}>· Widely available</span>
        </div>
        <div className={s.baselineDesc}>
          This feature is well established and works across many browsers. Showing compatibility data for <code className={s.baselineCode}>{name}</code>.
        </div>
      </div>
    </div>
  );
}

// ─── Browse page ──────────────────────────────────────────────────────────────

function BrowsePage({ path, node, compact, onNav }: { path: string[]; node: Identifier; compact: boolean; onNav: (p: string[]) => void }) {
  const [filter, setFilter] = React.useState("");
  const keys = childKeys(node);
  const filtered = filter ? keys.filter((k) => k.toLowerCase().includes(filter.toLowerCase())) : keys;

  return (
    <div>
      <p className={s.browseDesc}>
        Browse {keys.length} item{keys.length !== 1 ? "s" : ""} in <strong>{path[path.length - 1]}</strong>. Click any item to view browser compatibility data.
      </p>

      <div className={s.browseFilterWrap}>
        <span className={s.browseFilterIcon}>⌕</span>
        <input className={s.browseFilterInput} type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder={`Filter ${path[path.length - 1]}…`} />
        {filter && (
          <button className={s.browseFilterClear} onClick={() => setFilter("")}>
            ✕
          </button>
        )}
      </div>

      <div className={s.itemList}>
        {filtered.length === 0 ? (
          <div className={s.itemEmpty}>No items match "{filter}".</div>
        ) : (
          filtered.map((key) => {
            const child = node[key] as Identifier;
            const kids = childKeys(child);
            return (
              <button key={key} className={s.itemBtn} onClick={() => onNav([...path, key])}>
                <span className={`${s.itemKey} ${!hasCompat(child) ? s.itemKeyMuted : ""}`}>{key}</span>
                <span className={s.itemCount}>{kids.length > 0 ? `${kids.length} ›` : ""}</span>
              </button>
            );
          })
        )}
      </div>

      {hasCompat(node) && path.length >= 2 && (
        <div style={{ marginTop: 40 }}>
          <h2 className={s.sectionHeading}>Browser compatibility</h2>
          <div className={s.compatWrap}>
            <RenderBrowserCompat paths={path as unknown as Paths} compact={compact} theme={lightTheme} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Code block with syntax highlighting ─────────────────────────────────────

function CodeBlock({ code, lang = "typescript" }: { code: string; lang?: string }) {
  const highlighted = React.useMemo(() => hljs.highlight(code, { language: lang }).value, [code, lang]);
  return (
    <pre className={s.codeBlock}>
      <code dangerouslySetInnerHTML={{ __html: highlighted }} />
    </pre>
  );
}

// ─── Detail page ──────────────────────────────────────────────────────────────

function DetailPage({ path, compact }: { path: string[]; compact: boolean }) {
  const name = path[path.length - 1];

  const usages = React.useMemo(() => {
    const arr = JSON.stringify(path);
    const dot = path.join(".");
    return [
      {
        label: "React — isomorphic",
        lang: "typescript" as const,
        code: `import { RenderBrowserCompat } from 'render-browser-compat/isomorphic';\n\n<RenderBrowserCompat paths={${arr}} />`,
      },
      {
        label: "React — client fetch",
        lang: "typescript" as const,
        code: `import { RenderBrowserCompatClient } from 'render-browser-compat/react-dom';\n\n<RenderBrowserCompatClient\n  paths={${arr}}\n  fallback={<span>Loading…</span>}\n/>`,
      },
      {
        label: "Web Component",
        lang: "xml" as const,
        code: `import { init } from 'render-browser-compat/web-component';\nawait init();\n\n<browser-compat paths="${dot}" theme="light"></browser-compat>`,
      },
      {
        label: "SVG — server",
        lang: "typescript" as const,
        code: `import { renderSVG } from 'render-browser-compat/svg';\nimport { lightTheme } from 'render-browser-compat/theme';\n\nconst svg = await renderSVG(${arr}, false, lightTheme);`,
      },
      {
        label: "HTML — server",
        lang: "typescript" as const,
        code: `import { renderHTML } from 'render-browser-compat/html';\nimport { lightTheme } from 'render-browser-compat/theme';\n\nconst html = await renderHTML(${arr}, false, lightTheme);`,
      },
    ];
  }, [path]);

  return (
    <div>
      <BaselineBox name={name} />

      <div className={s.compatWrap}>
        <RenderBrowserCompat paths={path as unknown as Paths} compact={compact} theme={lightTheme} />
      </div>

      <h2 className={s.sectionHeading}>Usage</h2>

      {usages.map(({ label, lang, code }) => (
        <React.Fragment key={label}>
          <h3 className={s.usageH3}>{label}</h3>
          <CodeBlock code={code} lang={lang} />
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Main content ─────────────────────────────────────────────────────────────

function Content({ state, onNav }: { state: State; onNav: (p: string[]) => void }) {
  const { path, compact } = state;

  if (!path.length) {
    return (
      <main className={s.main}>
        <h1 className={s.pageTitle}>Browser Compatibility Data</h1>
        <p className={s.landingDesc}>Select a category from the sidebar to browse MDN browser compatibility data. Each entry shows which browsers and runtimes support a given web feature.</p>
      </main>
    );
  }

  const node = React.useMemo(() => getNode(path), [path]);
  if (!node) {
    return (
      <main className={s.main}>
        <p>
          Not found: <code>{path.join(".")}</code>
        </p>
      </main>
    );
  }

  const isLeaf = childKeys(node).length === 0;
  const name = path[path.length - 1];

  return (
    <main className={s.main}>
      <h1 className={s.pageTitle}>{name}</h1>
      {isLeaf ? <DetailPage path={path} compact={compact} /> : <BrowsePage path={path} node={node} compact={compact} onNav={onNav} />}
    </main>
  );
}

// ─── Hash router ─────────────────────────────────────────────────────────────

function hashToPath(hash: string): string[] {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  const trimmed = raw.startsWith("/") ? raw.slice(1) : raw;
  return trimmed ? trimmed.split(".") : [];
}

function pathToHash(path: string[]): string {
  return path.length ? "#/" + path.join(".") : "#/";
}

function useHashRouter(): [string[], (path: string[]) => void] {
  const [path, setPath] = React.useState<string[]>(() => hashToPath(window.location.hash));

  // Sync hash → state (back/forward navigation)
  React.useEffect(() => {
    function onHashChange() {
      setPath(hashToPath(window.location.hash));
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Sync state → hash
  const navigate = React.useCallback((next: string[]) => {
    window.location.hash = pathToHash(next);
    // hashchange fires and updates state via the listener above
  }, []);

  return [path, navigate];
}

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  const [path, navigate] = useHashRouter();
  const [compact, setCompact] = React.useState(true);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const state: State = { path, compact };

  const nav = (next: string[]) => {
    navigate(next);
    setMenuOpen(false);
  };

  return (
    <>
      <TopNav compact={compact} onToggleCompact={() => setCompact((v) => !v)} onMenuClick={() => setMenuOpen((v) => !v)} />
      <BreadcrumbBar path={path} onNav={nav} />
      <div className={s.shell}>
        <Sidebar path={path} onNav={nav} visible={menuOpen} onClose={() => setMenuOpen(false)} />
        <Content state={state} onNav={nav} />
      </div>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
