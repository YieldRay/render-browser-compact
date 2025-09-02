# render-browser-compact

Goal of this project is to render MDN [Browser Compatibility Data](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Page_structures/Compatibility_tables) to

- SVG
- HTML
- Web Component
- React Component

with a style similar to the MDN docs page.

## Features

✅ **Theming Support**: Light and dark mode with seamless switching  
✅ **Mobile View**: Optimized compact layout for mobile devices  
✅ **Auto Sizing**: Automatic width/height adjustment for SVG output  
✅ **Data Fetching**: Built-in support for fetching compatibility data  
✅ **React Integration**: Full React component support with hooks  
✅ **Web Components**: Standard web component implementation  

## Theming

The library supports both light and dark themes. Use the `ThemeProvider` to wrap your components:

```tsx
import { ThemeProvider, RenderBrowserCompat } from 'render-browser-compact';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <RenderBrowserCompat paths={['api', 'structuredClone']} />
    </ThemeProvider>
  );
}
```

For standalone themed components:

```tsx
import { ThemedBrowserCompat } from 'render-browser-compact/themed';

function MyComponent() {
  return (
    <ThemedBrowserCompat 
      name="structuredClone"
      support={compatData}
      theme="dark"
      compact
    />
  );
}
```

## TODO

- [x] mobile view support
- [ ] support showing sub compat data
- [x] auto width/height for svg
- [ ] add a docs site, and can select compat data by ui
- [x] support theming (dark mode)
- [x] data fetching mode
- [x] support react
- [x] support web-component
