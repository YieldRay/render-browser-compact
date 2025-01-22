import { renderHTML } from "./html.tsx";

export class BrowserCompat extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["paths", "compact"];
  }

  private async _rerender() {
    const paths = this.getAttribute("paths");
    if (!paths) return;
    const compact = this.hasAttribute("compact");
    const html = await renderHTML(paths.split(".") as any, compact);
    this.shadowRoot!.innerHTML = html;
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
