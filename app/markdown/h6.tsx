import "@/markdown/MarkdownMarked.d";
import { Tokens } from "marked";
import TokensRenderer from "./TokensRenderer";

const H6 = ({hash, tokens}: Tokens.Heading) => {
  return (
    <h6 className="text-lg mt-4 mb-2">
      <TokensRenderer tokens={tokens} />
    </h6>
  )
}

export default H6;
