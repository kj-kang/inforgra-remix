import marked, { lexer } from "marked";
import TokensRenderer from "./TokensRenderer";

const ListItem = ({ type, raw, task, checked, loose, text, tokens }: marked.Tokens.ListItem) => {
  const subTokens = lexer(text);
  return (
    <li className="ml-6">
      <TokensRenderer tokens={subTokens[0].tokens} />
    </li>
  );
}

const List = ({ type, raw, ordered, start, loose, items }: marked.Tokens.List) => {
  if (ordered) {
    return (
      <ol className="list-decimal">
	{items.map((item, index) => <ListItem key={index} {...item}/>)}
      </ol>);
  } else {
    return (
      <ul className="list-disc">
	{items.map((item, index) => <ListItem key={index} {...item} />)}
      </ul>);
  }
}

export default List;
