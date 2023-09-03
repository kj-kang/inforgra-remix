import { Header, TableOfContent } from "@/markdown/markdown";
import { useState } from "react";

export type UseMarkdownReturn = {
  header: Header;
  setHeader: (header: Header) => void;
  tableOfContent: TableOfContent;
  setTableOfContent: (toc: TableOfContent) => void;
}

export const useMarkdown = () => {
  const [header, setHeader] = useState<Header>({title: 'TITLE', description: 'DESCRIPTION', date: '2000-01-01', tags: ['TAG1', 'TAG2'], imags: ''} as Header);
  const [tableOfContent, setTableOfContent] = useState<TableOfContent>([]);
  return { header, setHeader, tableOfContent, setTableOfContent } as UseMarkdownReturn;
}
