import { Site, SiteChange, SiteError, SiteRecovery } from "@/prisma.server";
import moment from "moment";

type TimelineProps = {
  site: Site;
}

export const Timeline = ({ site }: TimelineProps) => {
  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700 mt-8">
      {site.log.map((log, index) => (
	<li key={index} className="mb-4 ml-4">
	  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
	  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{moment(log.createdAt).add(9, 'hours').format('LLLL')}</time>
	  {log.name === 'START' && <h3 className="text-base font-semibold text-gray-900 dark:text-gray-200">모니터링 시작</h3>}
	  {log.name === 'ERROR' && <>
	    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-200">접속오류</h3>
	    <p className="mb-4 text-sm font-normal text-gray-500 dark:text-gray-400">{(log as SiteError).where}</p>
	  </>}
	  {log.name === 'RECOVERY' && <>
	    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-200">접속성공</h3>
	    <p className="mb-4 text-sm font-normal text-gray-500 dark:text-gray-400">{(log as SiteRecovery).where}</p>
	  </>}

	  {log.name === 'CHANGE' && <>
	    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-200">DNS변경</h3>
	    <p className="mb-4 text-sm font-normal text-gray-500 dark:text-gray-400">
	      {(log as SiteChange).from || 'Null'}
	      <span className="material-symbols-outlined text-sm">arrow_forward</span>
	      {(log as SiteChange).to}
	    </p>
	  </>}
	</li>
      ))}
    </ol>
  )
}
