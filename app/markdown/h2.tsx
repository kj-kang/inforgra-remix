import "@/markdown/MarkdownMarked.d";
import { Tokens } from "marked";
import TokensRenderer from "./TokensRenderer";
import { useState } from "react";

const H2 = ({ hash, tokens }: Tokens.Heading) => {
  const [open, setOpen] = useState(false);
  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!open)
      setOpen(true);
  }
  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    if (open)
      setOpen(false);
  }
  return (
    <div className="flex items-center mt-4 mb-2" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <h2 className="text-3xl font-bold" id={hash}><TokensRenderer tokens={tokens} /></h2>
      <a className={`${!open && 'hidden'}`} href={`#${hash}`}>
	<svg className="fill-blue-500 dark:fill-gray-300 pl-2 mt-1" height="1.0em" viewBox="0 0 12 6">
	  <path d="M8.9176 0.083252H7.1676C6.84677 0.083252 6.58427 0.345752 6.58427 0.666585C6.58427 0.987419 6.84677 1.24992 7.1676 1.24992H8.9176C9.8801 1.24992 10.6676 2.03742 10.6676 2.99992C10.6676 3.96242 9.8801 4.74992 8.9176 4.74992H7.1676C6.84677 4.74992 6.58427 5.01242 6.58427 5.33325C6.58427 5.65409 6.84677 5.91659 7.1676 5.91659H8.9176C10.5276 5.91659 11.8343 4.60992 11.8343 2.99992C11.8343 1.38992 10.5276 0.083252 8.9176 0.083252ZM3.6676 2.99992C3.6676 3.32075 3.9301 3.58325 4.25094 3.58325H7.75094C8.07177 3.58325 8.33427 3.32075 8.33427 2.99992C8.33427 2.67909 8.07177 2.41659 7.75094 2.41659H4.25094C3.9301 2.41659 3.6676 2.67909 3.6676 2.99992ZM4.83427 4.74992H3.08427C2.12177 4.74992 1.33427 3.96242 1.33427 2.99992C1.33427 2.03742 2.12177 1.24992 3.08427 1.24992H4.83427C5.1551 1.24992 5.4176 0.987419 5.4176 0.666585C5.4176 0.345752 5.1551 0.083252 4.83427 0.083252H3.08427C1.47427 0.083252 0.167603 1.38992 0.167603 2.99992C0.167603 4.60992 1.47427 5.91659 3.08427 5.91659H4.83427C5.1551 5.91659 5.4176 5.65409 5.4176 5.33325C5.4176 5.01242 5.1551 4.74992 4.83427 4.74992Z" />
	</svg>
      </a>
    </div>
  )
}

export default H2;
