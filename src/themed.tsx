import React from "react";
import { ThemeProvider, type ThemeMode } from "./theme.tsx";
import { RenderBrowserCompatData } from "./isomorphic.tsx";
import type { CompatStatement } from "@mdn/browser-compat-data";

export interface ThemedBrowserCompatProps {
  name: string;
  support: CompatStatement["support"];
  tags?: CompatStatement["tags"];
  status?: CompatStatement["status"];
  compact?: boolean;
  theme?: ThemeMode;
}

/**
 * Themed version of the browser compatibility component
 * Automatically provides theming context if not already available
 */
export function ThemedBrowserCompat({ 
  name, 
  support, 
  tags, 
  status, 
  compact, 
  theme = "light" 
}: ThemedBrowserCompatProps) {
  return (
    <ThemeProvider defaultTheme={theme}>
      <RenderBrowserCompatData 
        name={name} 
        support={support} 
        tags={tags} 
        status={status} 
        compact={compact} 
      />
    </ThemeProvider>
  );
}

/**
 * Hook to use the themed browser compatibility component
 * Use this when you already have a theme provider in your app
 */
export { RenderBrowserCompatData as ThemedBrowserCompatData } from "./isomorphic.tsx";