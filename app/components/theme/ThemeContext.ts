'use client'

import React, { useContext } from "react";

export type Theme = 'light' | 'dark' | 'system';

export type ThemeContextProps = {
  theme: Theme;
  switchTheme: (theme: Theme) => void;
}

export const ThemeContext = React.createContext<ThemeContextProps>(
  {} as ThemeContextProps
)

export const useThemeContext = () => useContext(ThemeContext)
