import React from "react";
import { Theme } from "./ThemeContext";

export type UseThemeProps = {
  userTheme: Theme;
}

export type UseThemeReturn = {
  theme: Theme;
  switchTheme: (theme: Theme) => void;
}

export const useTheme = ({ userTheme }: UseThemeProps): UseThemeReturn => {

  const [theme, setTheme] = React.useState<Theme>(userTheme);

  const switchTheme = (theme: Theme) => {
    const expire = new Date();
    expire.setFullYear(expire.getFullYear() + 10);
    switch (theme) {
      case 'light':
	setTheme(theme);
	document.documentElement.classList.remove('dark');
	document.cookie = `theme=light; path=/; SameSite=Strict; expires=${expire.toUTCString()};`;
	break;
      case 'dark':
	setTheme(theme);
	document.documentElement.classList.add('dark');
	document.cookie = `theme=dark; path=/; SameSite=Strict; expires=${expire.toUTCString()};`;
	break;
      case 'system':
	setTheme(theme);
	document.documentElement.classList.remove('dark');
	document.cookie = `theme=system; path=/; SameSite=Strict; expires=${expire.toUTCString()};`;
	break;
    }
  }

  return { theme, switchTheme };
}
