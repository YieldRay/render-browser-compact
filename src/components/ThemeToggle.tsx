import React from "react";
import { useTheme } from "../theme.tsx";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "8px 12px",
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "12px",
        zIndex: 1000,
      }}
      title={`Switch to ${theme.mode === "light" ? "dark" : "light"} mode`}
    >
      {theme.mode === "light" ? "🌙" : "☀️"} {theme.mode === "light" ? "Dark" : "Light"}
    </button>
  );
}