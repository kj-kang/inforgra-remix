'use client'
import { SvgIcon, github, moon, sun } from "@/components/icons";
import React from "react";
import { HeaderNavbarDropdown } from "./HeaderNavbarDropdown";
import { Theme, useThemeContext } from "../theme/ThemeContext";
import { Link } from "@remix-run/react";

export const HeaderNavbar = () => {

  const { theme, switchTheme } = useThemeContext();

  const handleClick = (theme: Theme) => (event: React.MouseEvent<HTMLButtonElement>) => {
    switchTheme(theme);
  }

  return (
    <div className="relative flex items-center">
      <Link className="flex-none font-semibold text-4xl pl-4 text-neutral-700 dark:text-gray-200" to="/">Infogra</Link>
      <HeaderNavbarDropdown />
      <div className="flex border-l items-center pl-4 pr-4 border-slate-200">
	<a className="texdark:text-gray-200" href="https://github.com/inforgra" target="_blank">
	  <SvgIcon className="fill-blue-500 dark:fill-gray-200 text-2xl" icon={github} />
	</a>
	{theme === 'dark' &&
	 <button onClick={handleClick('light')}><SvgIcon className="fill-blue-500 dark:fill-gray-200 text-2xl ml-4" icon={sun} /></button>}
	{theme === 'light' &&
	 <button onClick={handleClick('dark')}><SvgIcon className="fill-blue-500 dark:fill-gray-200 text-2xl ml-4" icon={moon} /></button>}
      </div>
    </div>
  )
}
