import { Tokens } from "marked";
import katex from "katex";

export const InlineKatex = (props: Tokens.Generic) => {
  const { text } = props;
  let html;
  try {
    html = katex.renderToString(text, { output: 'mathml', throwOnError: false });
  } catch (e) {
    if (e instanceof katex.ParseError) {
      html = "Error in LaTeX '" + text + "': " + e.message;
    } else {
      throw e;
    }
  }
  return (
    <code className="text-base" dangerouslySetInnerHTML={{__html: html}} />
  );
}


export const BlockKatex = (props: Tokens.Generic) => {
  const { text } = props;
  let html;
  try {
    html = katex.renderToString(text, { output: 'mathml', throwOnError: false });
  } catch (e) {
    if (e instanceof katex.ParseError) {
      html = "Error in LaTeX '" + text + "': " + e.message;
    } else {
      throw e;
    }
  }
  return (
    <div className="flex justify-center text-xl py-4" dangerouslySetInnerHTML={{__html: html}} />
  );
}
