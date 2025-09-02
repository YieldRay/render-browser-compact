import { renderHTML } from "./html.tsx";
import type { Theme } from "./theme.ts";
import { defaultTheme, darkTheme } from "./theme.ts";

export class BrowserCompat extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styleSheet = new CSSStyleSheet();
    styleSheet.replace(/*css*/ `* { box-sizing: border-box; overflow: hidden; }`);
    shadowRoot.adoptedStyleSheets = [styleSheet];
  }

  static get observedAttributes() {
    return ["paths", "compact", "theme"];
  }

  private async _rerender() {
    const paths = this.getAttribute("paths");
    if (!paths) return;
    const compact = this.hasAttribute("compact");
    const themeAttr = this.getAttribute("theme");
    let theme: Theme = defaultTheme;
    if (themeAttr === "dark") {
      theme = darkTheme;
    } else if (themeAttr === "light") {
      theme = defaultTheme;
    }
    try {
      this.setAttribute("state", "loading");
      const html = await renderHTML(paths.split(".") as any, compact, theme);
      this.shadowRoot!.innerHTML = html;
      this.setAttribute("state", "ok");
    } catch {
      this.setAttribute("state", "error");
    }
  }

  connectedCallback() {
    this._rerender();
  }

  attributeChangedCallback(_name: string, _oldValue: string, _newValue: string) {
    this._rerender();
  }
}

export function init(name = "browser-compat") {
  window.customElements.define(name, BrowserCompat);
  return window.customElements.whenDefined(name);
}
