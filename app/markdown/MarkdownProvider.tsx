'use client';
import { ReactNode } from "react";
import { MarkdownContext } from "./MarkdownContext";
import { useMarkdown } from "./useMarkdown";

export type MarkdownProviderProps = {
  children?: ReactNode,
}

export const MarkdownProvider = ({
  children,
}: MarkdownProviderProps) => {
  const props = useMarkdown();
  return (
    <MarkdownContext.Provider value={props}>
      {children}
    </MarkdownContext.Provider>
  )
}
