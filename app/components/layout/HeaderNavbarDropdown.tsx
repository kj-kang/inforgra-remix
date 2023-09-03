import { Link } from "@remix-run/react";
import React from "react";

export const HeaderNavbarDropdown = () => {

  const [open, setOpen] = React.useState<Boolean>(false);
  const ref = React.useRef<HTMLDivElement|null>(null);

  const handleClick = (e: MouseEvent) => {
    setOpen(false);
  }

  React.useEffect(() => {
    if (!open)
      return;
    const handleClickOutside = (event: MouseEvent) => {
      if (open && !ref.current?.contains(event.target as Node)) {
	setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () =>{
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  return (
    <div className="relative ml-auto mr-4" ref={ref}>
      <button
	className="text-sm leading-5 font-semibold flex py-1 px-3 rounded-sm text-gray-700 dark:text-gray-200 bg-neutral-200 dark:bg-neutral-700"
	type="button" area-controls={open ? 'menu' : undefined} area-haspopup="true" area-expanded="false" area-label="menu"
	onClick={() => { setOpen(!open); }}
      >
	바로가기
	<svg width="6" height="3" className="mt-2 ml-2 overflow-visible" aria-hidden="true"><path d="M0 0L3 3L6 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path></svg>
      </button>
      <div className={`absolute right-0 ${open ? '' : 'hidden'} mt-1 -py-1 w-80 top-full bg-white shadow dark:bg-neutral-700`} role="menu" tabIndex={0}>
	<Link className="block text-gray-700 font-bold px-3 py-2 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-neutral-600" to="/torrent" onClick={handleClick}>
	  토렌트 사이트 TOP 30+
	  <p className="text-xs font-thin">토렌트 사이트들의 최신 현황을 볼 수 있습니다.</p>
	</Link>
	<Link className="block text-gray-700 font-bold px-3 py-2 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-neutral-600" to="/webtoon" onClick={handleClick}>
	  무료 웹툰 사이트 TOP 30+
	  <p className="text-xs font-thin">무료 웹툰 사이트들의 최신 현황을 볼 수 있습니다.</p>
	</Link>
      </div>
    </div>
  );
}
