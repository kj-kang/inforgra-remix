import marked from "marked";
import TokensRenderer from "./TokensRenderer";

const alignFn = (align: Array<'center' | 'left' | 'right' | null>) => (index: number) => {
  switch (align[index]) {
    case 'left':
      return 'text-left';
    case 'right':
      return 'text-right';
    case 'center':
      return 'text-center';
    default:
      return 'text-left';
  }
}

const Table = ({ type, raw, align, header, rows }: marked.Tokens.Table) => {
  const textAlign = alignFn(align);
  return (
    <table className="table-auto w-full border-collapse text-gray-400 dark:text-gray-200 bg-slate-50 dark:bg-neutral-900">
      <thead>
	<tr>
	  {
	    header.map((head, index) => (
	      <th key={index} className={`${textAlign(index)} border border-slate-200 dark:border-slate-400`}>
		{head.tokens && <TokensRenderer tokens={head.tokens} />}
	      </th>
	    ))
	  }
	</tr>
      </thead>
      <tbody>
	{
	  rows.map((row, index) => (
	    <tr key={index}>
	      {
		row.map((col, index) => (
		  <td key={index} className={`${textAlign(index)} bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-200 border border-slate-200 dark:border-slate-400`}>
		    {col.tokens && <TokensRenderer tokens={col.tokens} />}
		  </td>
		))
	      }
	    </tr>
	  ))
	}
      </tbody>
    </table>
  );
}

export default Table;
