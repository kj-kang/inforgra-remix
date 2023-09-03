import marked from "marked";
import TokensRenderer from "./TokensRenderer";

const MdMuiCallout = ({type, raw, severity, tokens}: marked.Tokens.Generic) => {
  return (
    <div>
      { tokens && <TokensRenderer tokens={tokens} /> }
    </div>
  );
}

export default MdMuiCallout;
