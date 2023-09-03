import { Tokens } from "marked";
import { escapeHtml } from "./Utils";

const Codespan = ({text}: Tokens.Codespan) => {
  return (
    <code className="text-[0.9rem] font-mono bg-gray-200 px-1 py-1 mx-1 rounded dark:bg-neutral-700 dark:text-gray-200">{escapeHtml(text)}</code>
  );
}

export default Codespan;
