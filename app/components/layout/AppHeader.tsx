import { HeaderNavbar } from "./HeaderNavbar";

export const AppHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-sm bg-white/90 border-b dark:bg-neutral-900/90 dark:border-neutral-600">
      <div className="max-w-6xl mx-auto p-4">
	  <HeaderNavbar />
      </div>
    </header>
  )
}
