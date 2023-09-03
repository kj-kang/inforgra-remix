import { Tokens } from "marked";
import { MarkdownEvaluation } from "./MarkdownEvaluation";
import { MarkdownPreview } from "./MarkdownPreview";
import { MarkdownPrism } from "./MarkdownPrism";

type Config = {
  lang: string | undefined;
  view: 'default' | 'markdown-preview' | 'evaluation';
}

const parseConfig = (text: string | undefined): Config => {
  if (text === undefined)
    return { lang: undefined, view: 'default' };
  const attrs = text.split(' ');
  if (attrs[0] === 'markdown') {
    if (attrs.includes('preview')) {
      return { lang: 'markdown', view: 'markdown-preview' }
    }
    return { lang: 'markdown', view: 'default' }
  }
  if (attrs.includes('evaluation')) {
    return { lang: attrs[0], view: 'evaluation' };
  }
  return { lang: attrs[0], view: 'default' };
}

const Code = ({ type, raw, codeBlockStyle, lang, text, escaped }: Tokens.Code) => {

  const config: Config = parseConfig(lang);

  return (
    <div className="mt-4 mb-2">
      {!config.lang && config.view === 'default' && (<MarkdownPrism code={text} lang={''} />)}
      {config.lang && config.view === 'default' && (<MarkdownPrism code={text} lang={config.lang} />)}
      {config.lang && config.view === 'markdown-preview' && <MarkdownPreview text={text} lang={config.lang} />}
      {config.lang && config.view === 'evaluation' && <MarkdownEvaluation code={text} lang={config.lang} />}
    </div>
  );
}

export default Code;
