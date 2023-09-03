import { Tokens } from "marked";

const Del = ({text}: Tokens.Del) => {
  return (
    <del>{text}</del>
  );
}

export default Del;
