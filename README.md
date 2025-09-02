# render-browser-compact

Goal of this project is to render MDN [Browser Compatibility Data](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Page_structures/Compatibility_tables) to

- SVG
- HTML
- Web Component
- React Component

with a style similar to the MDN docs page.

## TODO

- [x] mobile view support
- [ ] support showing sub compat data
- [x] auto width/height for svg
- [ ] add a docs site, and can select compat data by ui
- [x] support theming (dark mode)
- [x] data fetching mode
- [x] support react
- [x] support web-component

## Theming Support

This library supports light and dark themes through a prop-based theme system that works across all rendering targets (SVG, HTML, React components, Web components) without requiring hooks or context, making it fully SSR compatible.

### Theme Interface

```typescript
interface Theme {
  iconColor: string;        // Color for browser icons and generic icons
  supportYesColor: string;  // Color for "Yes" support indicators  
  supportNoColor: string;   // Color for "No" support indicators
  textColor: string;        // Primary text color
  borderColor: string;      // Border color for table elements
  backgroundColor: string;  // Background color
}
```

### Built-in Themes

```typescript
import { lightTheme, darkTheme } from 'render-browser-compat/theme';

// Light theme (default)
const light = lightTheme;

// Dark theme  
const dark = darkTheme;
```

### Usage Examples

#### React Components

```tsx
import { RenderBrowserCompat } from 'render-browser-compat/isomorphic';
import { darkTheme } from 'render-browser-compat/theme';

// With dark theme
<RenderBrowserCompat paths={['api', 'fetch']} theme={darkTheme} />

// Light theme (default)
<RenderBrowserCompat paths={['api', 'fetch']} />
```

#### Web Components

```html
<!-- Light theme (default) -->
<browser-compat paths="api.fetch"></browser-compat>

<!-- Dark theme -->
<browser-compat paths="api.fetch" theme="dark"></browser-compat>
```

#### SVG Rendering

```typescript
import { renderSVG } from 'render-browser-compat/svg';
import { darkTheme } from 'render-browser-compat/theme';

const svg = await renderSVG(['api', 'fetch'], false, darkTheme);
```

#### HTML Rendering

```typescript
import { renderHTML } from 'render-browser-compat/html';
import { darkTheme } from 'render-browser-compat/theme';

const html = await renderHTML(['api', 'fetch'], false, darkTheme);
```

#### Custom Themes

```typescript
const customTheme = {
  iconColor: "#8b5cf6",
  supportYesColor: "#10b981", 
  supportNoColor: "#ef4444",
  textColor: "#1f2937",
  borderColor: "#d1d5db",
  backgroundColor: "#ffffff",
};

<RenderBrowserCompat paths={['api', 'fetch']} theme={customTheme} />
```
