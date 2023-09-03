'use client'

import { ReactNode } from "react";
import { type Theme, ThemeContext } from "./ThemeContext";
import { useTheme } from "./useTheme";

export type ThemeProviderProps = {
  userTheme: Theme;
  children?: ReactNode;
}

export const ThemeProvider = ({
  userTheme,
  children,
}: ThemeProviderProps) => {
  const { theme, switchTheme } = useTheme({userTheme});
  return (<ThemeContext.Provider
    value={{ theme, switchTheme }}>
    {children}
    </ThemeContext.Provider>
  )
}
