import React, { createContext, useContext, useState, type ReactNode } from "react";

export type ThemeMode = "light" | "dark";

export interface ThemeColors {
  background: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  error: string;
  iconColor: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
}

const lightTheme: ThemeColors = {
  background: "#ffffff",
  text: "#1b1b1b",
  textSecondary: "#696969",
  border: "#cdcdcd",
  success: "#007936",
  error: "#d30038",
  iconColor: "#696969",
};

const darkTheme: ThemeColors = {
  background: "#1a1a1a",
  text: "#e4e4e4",
  textSecondary: "#a0a0a0",
  border: "#444444",
  success: "#00a84f",
  error: "#ff5555",
  iconColor: "#a0a0a0",
};

export const themes: Record<ThemeMode, ThemeColors> = {
  light: lightTheme,
  dark: darkTheme,
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
}

export function ThemeProvider({ children, defaultTheme = "light" }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultTheme);

  const theme: Theme = {
    mode,
    colors: themes[mode],
  };

  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Hook to get theme colors directly
export function useThemeColors(): ThemeColors {
  const { theme } = useTheme();
  return theme.colors;
}