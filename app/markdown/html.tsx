import { Tokens } from "marked";

const HTML = ({ type, raw, pre, text, block }: Tokens.HTML) => {

  return (
    <>
      {text.trim().endsWith('/>') && <div dangerouslySetInnerHTML={{ __html: text }} />}
    </>
  );
}

export default HTML;
