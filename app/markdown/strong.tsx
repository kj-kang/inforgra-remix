import marked from "marked";

const Strong = ({type, raw, text, tokens}: marked.Tokens.Strong) => {
  return (
    <strong>{text}</strong>
  );
}

export default Strong;
