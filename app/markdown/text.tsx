import { Tokens } from "marked";
import { escapeHtml } from "./Utils";

export const Text = ({text}: Tokens.Text) => {
  return <>{ escapeHtml(text) }</>;
}

export default Text;
