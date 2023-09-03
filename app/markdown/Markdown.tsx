import { addHashToHeading, blockKatex, cellOut, inlineKatex, katex, katex2, markedMuiExtension } from "@/markdown/MarkdownMarked";
import TokensRenderer from "@/markdown/TokensRenderer";
import { TableOfContent } from "@/markdown/markdown.d";
import { marked } from "marked";
import { useEffect } from "react";
import { useMarkdownContext } from "./MarkdownContext";

export type MarkdownProps = {
  markdown: string;
  setTableOfContent?: (tableOfContent: TableOfContent) => void;
}

export const Markdown = ({ markdown }: MarkdownProps) => {

  const { setHeader, setTableOfContent } = useMarkdownContext();

  marked.use({ gfm: true, headerIds: false, mangle: false})
  marked.use({ extensions: [ cellOut, blockKatex, inlineKatex, markedMuiExtension ] })

  const { header, tokens, tableOfContent } = marked.parse2(markdown, [addHashToHeading]);

  useEffect(() => {
    setHeader(header);
    setTableOfContent(tableOfContent);
  }, []);

  return (
    <TokensRenderer tokens={tokens} />
  );
}
