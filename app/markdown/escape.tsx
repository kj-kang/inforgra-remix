import { Tokens } from "marked";

const Escape = ({text}: Tokens.Escape) => {
  return (
    <>{text}</>
  );
}

export default Escape;
