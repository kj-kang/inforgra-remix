import "@/markdown/MarkdownMarked.d";
import { Tokens } from "marked";
import TokensRenderer from "./TokensRenderer";

const H4 = ({hash, tokens}: Tokens.Heading) => {
  return (
    <h4 className="text-xl font-bold mt-4 mb-2">
      <TokensRenderer tokens={tokens} />
    </h4>
  )
}

export default H4;
