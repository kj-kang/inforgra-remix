import marked from "marked";
import TokensRenderer from "./TokensRenderer";

const Paragraph = ({type, raw, pre, text, tokens}: marked.Tokens.Paragraph) => {
  if (tokens.length === 0) {
    return (
      <p className="py-2">{text}</p>
    )
  } else {
    return (
      <p className="py-2"><TokensRenderer tokens={tokens} /></p>
    )
  }
}

export default Paragraph;
