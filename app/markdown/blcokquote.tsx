import { Tokens } from "marked";
import TokensRenderer from "./TokensRenderer";

const Blockquote = ({tokens}: Tokens.Blockquote) => {
  return (
    <blockquote>
      <TokensRenderer tokens={tokens} />
    </blockquote>
  )
}

export default Blockquote;
