import { Evaluation } from "@/evaluation/Evaluation";
import { useState } from "react";
import { MarkdownPrism } from "./MarkdownPrism";

type MarkdownEvaluationProps = {
  code: string;
  lang: string;
}

export const MarkdownEvaluation = ({ code, lang }: MarkdownEvaluationProps) => {

  const [error, setError] = useState<Error | null>(null);

  return (
    <>
      <Evaluation code={code} onError={setError} />
      {error &&	<div className="text-sm font-mono max-h-64 overflow-scroll border rounded">{error && error.stack}</div>}
      <div className="mt-2">
	<MarkdownPrism code={code} lang={lang} />
      </div>
    </>
  )
}
