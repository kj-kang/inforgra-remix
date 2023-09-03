import { Markdown } from "./Markdown";
import { MarkdownPrism } from "./MarkdownPrism";

type MarkdownPreviewProps = {
  text: string;
  lang: string | undefined;
}

export const MarkdownPreview = ({ text, lang }: MarkdownPreviewProps) => {
  return (
    <>
      <div className="border rounded-lg p-2">
	<Markdown markdown={text} />
      </div>
      <div className="mt-2">
	<MarkdownPrism code={text} lang={lang} />
      </div>
    </>
  )
}
