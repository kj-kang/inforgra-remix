import marked from "marked";
import TokensRenderer from "./TokensRenderer";

const Link = ({type, raw, href, title, text, tokens}: marked.Tokens.Link) => {
  return ( <a className="text-blue-500 dark:text-blue-300" href={href}><TokensRenderer tokens={tokens} /></a> )
}

export default Link;
