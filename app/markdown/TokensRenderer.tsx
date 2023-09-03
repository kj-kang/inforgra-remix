import marked from "marked";
import TokenRenderer from "./TokenRenderer";

export type TokensRendererProps = {
  tokens: marked.Token[] | undefined;
}

const TokensRenderer = ({tokens}: TokensRendererProps) => {
  return (
    <>
      { tokens && tokens.map((token, index) =>
	<TokenRenderer key={index} token={token} />
      )}
    </>
  )
}

export default TokensRenderer;
