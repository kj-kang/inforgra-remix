import CodeMirror from "@uiw/react-codemirror";
import { langs } from '@uiw/codemirror-extensions-langs';

type MarkdownCodeMirrorProps = {
  code: string;
  lang: string;
}

const loadLanguage = (lang: string) => {
  switch(lang) {
    case 'tsx':
      return [langs.tsx()];
    case 'markdown':
      return [langs.markdown()];
    default:
      return [];
  }
}

export const MarkdownCodeMirror = ({code, lang}: MarkdownCodeMirrorProps) => {
  return (
    <CodeMirror value={code} extensions={loadLanguage(lang)} />
  )
}
