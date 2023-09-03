import { Tokens } from "marked";

const Em = ({text}: Tokens.Em) => {
  return (
    <em>{text}</em>
  );
}

export default Em;
