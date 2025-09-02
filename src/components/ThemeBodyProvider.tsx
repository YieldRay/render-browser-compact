import React, { useEffect } from "react";
import { useTheme } from "../theme.tsx";

export function ThemeBodyProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    // Apply theme colors to CSS variables on the body
    document.documentElement.style.setProperty("--bg-color", theme.colors.background);
    document.documentElement.style.setProperty("--text-color", theme.colors.text);
    document.body.style.backgroundColor = theme.colors.background;
    document.body.style.color = theme.colors.text;
  }, [theme]);

  return <>{children}</>;
}