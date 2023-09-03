import marked from "marked";
import TokensRenderer from "./TokensRenderer";

const getStyle = (severity: string) => {
  switch(severity) {
    case 'error':
      return 'border-red-200';
    case 'warning':
      return 'border-orange-200';
    case 'info':
      return 'border-blue-200';
    case 'success':
      return 'border-green-200';
  }
  return '';
}

export const Cellout = ({type, raw, severity, tokens}: marked.Tokens.Generic) => {
  return (
    <span className={`flex border-l-8 ${getStyle(severity)} p-2 my-2`}>
	{ tokens && <TokensRenderer tokens={tokens} /> }
    </span>
  );
}
