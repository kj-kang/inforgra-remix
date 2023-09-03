import "@/markdown/MarkdownMarked.d";
import { Tokens } from "marked";
import TokensRenderer from "./TokensRenderer";

const H5 = ({hash, tokens}: Tokens.Heading) => {
  return (
    <h5 className="text-lg font-bold mt-4 mb-2">
      <TokensRenderer tokens={tokens} />
    </h5>
  )
}

export default H5;
