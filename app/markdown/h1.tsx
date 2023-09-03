import "@/markdown/MarkdownMarked.d";
import { Tokens } from "marked";
import TokensRenderer from "./TokensRenderer";

const H1 = ({ hash, tokens }: Tokens.Heading) => {
  return (
    <h1 className="text-4xl font-bold mt-4 mb-2">
      <TokensRenderer tokens={tokens} />
    </h1>
  )
}

export default H1;
