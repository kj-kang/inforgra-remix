import { Tokens } from "marked";

const Image = ({type, raw, href, title, text}: Tokens.Image) => {
  return (
    <img src={href} alt="..." />
  );
}

export default Image;
