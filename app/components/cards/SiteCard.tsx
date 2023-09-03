import { Site } from "@/prisma.server";
import { Link } from "@remix-run/react";
import moment from "moment-timezone";

export type SiteCardProps = {
  site: Site;
  rank?: number;
}

export const SiteCard = ({ site, rank }: SiteCardProps) => {
  return (
    <div className="py-2 px-2 m-0 border-1 rounded shadow-md hover:shadow-2xl bg-white dark:bg-neutral-800 transition hover:-translate-y-2 duration-500 easy-in-out">
      {site.logo ? <img className="object-contain w-full h-20 dark:bg-neutral-500 rounded p-1" src={site.logo} /> : <div className="h-20" />}
      <div className="flex flex-row mt-2">
        {site.state === 'red' && <span className="material-symbols-outlined text-red-500 text-3xl">error_outline</span>}
        {site.state === 'yellow' && <span className="material-symbols-outlined text-yellow-500 text-3xl">check_circle_outline</span>}
        {site.state === 'green' && <span className="material-symbols-outlined text-green-500 text-3xl">check_circle_outline</span>}
        {site.more.type === 'torrent' && site.more.supportMagnet && <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 448 512" className="fill-red-500 mt-[6px] ml-1">
	  <path d="M0 160v96C0 379.7 100.3 480 224 480s224-100.3 224-224V160H320v96c0 53-43 96-96 96s-96-43-96-96V160H0zm0-32H128V64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64v64zm320 0H448V64c0-17.7-14.3-32-32-32H352c-17.7 0-32 14.3-32 32v64z" />
	</svg>}
        {site.more?.type === 'torrent' && site.more.supportStreaming && <span className="material-symbols-outlined text-blue-500 text-3xl ml-1">play_circle</span>}
      </div>
      <h3 className="text-base font-bold py-2">{rank && `#${rank}. `}{site.hname}</h3>
      <div className="flex flex-col py-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">로딩속도: {site.pageSpeed || '- '}(초)</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">확인시간: {site.lastCheckedAt ? moment(site.lastCheckedAt).add(9, 'hours').startOf('minutes').fromNow() : '-'}</span>
      </div>
      <div className="flex flex-row justify-center p-1">
	{site.state === 'red'
	? <a className="bg-white dark:bg-slate-600 text-slate-500 dark:text-slate-300 py-2 px-4 rounded text-sm font-bold" target="_blank">바로가기</a>
        : <a className="bg-white hover:bg-blue-100 dark:bg-neutral-600 dark:hover:bg-neutral-500 text-blue-500 dark:text-gray-200 py-2 px-4 rounded text-sm font-bold" href={site.state !== 'red' && site.link || undefined} target="_blank">바로가기</a>}
        {site.type === 'torrent' && <Link className="bg-white hover:bg-blue-100 dark:bg-neutral-600 dark:hover:bg-neutral-500 text-blue-500 dark:text-gray-200 py-2 px-4 rounded text-sm font-bold ml-2" to={`/torrent/${site.name}`}>더보기</Link>}
        {site.type === 'webtoon' && <Link className="bg-white hover:bg-blue-100 dark:bg-neutral-600 dark:hover:bg-neutral-500 text-blue-500 dark:text-gray-200 py-2 px-4 rounded text-sm font-bold ml-2" to={`/webtoon/${site.name}`}>더보기</Link>}
      </div>
    </div>
  )
}
