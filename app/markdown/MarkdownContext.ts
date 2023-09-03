"use client";
import { createContext, useContext } from "react";
import { Header, TableOfContent } from "./markdown.d";

export type MarkdownContextProps = {
  header: Header;
  setHeader: (header: Header) => void;
  tableOfContent: TableOfContent;
  setTableOfContent: (toc: TableOfContent) => void;
}

export const MarkdownContext = createContext<MarkdownContextProps>({} as MarkdownContextProps);

export const useMarkdownContext = () => useContext(MarkdownContext);
