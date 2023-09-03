import marked from "marked";
import H1 from "./h1";
import H2 from "./h2";
import H3 from "./h3";
import H4 from "./h4";
import H5 from "./h5";
import H6 from "./h6";

const Heading = (props: marked.Tokens.Heading) => {
  const { depth } = props;
  switch (depth) {
    case 1:
      return <H1 {...props} />;
    case 2:
      return <H2 {...props} />;
    case 3:
      return <H3 {...props} />;
    case 4:
      return <H4 {...props} />;
    case 5:
      return <H5 {...props} />;
    case 6:
      return <H6 {...props} />;
    default:
      return <></>;
  }
}

export default Heading;
