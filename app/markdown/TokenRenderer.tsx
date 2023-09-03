import marked from "marked";
import Space from "./space";
import Text from "./text";
import Heading from "./heading";
import Code from "./code";
import Table from "./table";
import Hr from "./hr";
import Blockquote from "./blcokquote";
import Paragraph from "./paragraph";
import List from "./list";
import HTML from "./html";
import Escape from "./escape";
import Link from "./link";
import Image from "./image";
import Strong from "./strong";
import Em from "./em";
import Del from "./del";
import Codespan from "./codespan";
import MdMuiExtension from "./MDMuiExtension";
import { Cellout } from "./cellout";
import { BlockKatex, InlineKatex } from "./katex";

interface TokenRendererProps {
  token: marked.Token;
}

const TokenRenderer = ({token}: TokenRendererProps) => {
  switch (token.type) {
    case "space":
      const space = token as marked.Tokens.Space;
      return <Space {...space} />;
    case "code":
      const code = token as marked.Tokens.Code;
      return <Code {...code} />;
    case "heading":
      const heading = token as marked.Tokens.Heading;
      return <Heading {...heading} />;
    case "table":
      const table = token as marked.Tokens.Table;
      return <Table {...table} />;
    case "hr":
      const hr = token as marked.Tokens.Hr;
      return <Hr {...hr} />;
    case "blockquote":
      const blockquote = token as marked.Tokens.Blockquote;
      return <Blockquote {...blockquote} />;
    case "list":
      const list = token as marked.Tokens.List;
      return <List {...list} />;
    case "paragraph":
      const paragraph = token as marked.Tokens.Paragraph;
      return <Paragraph {...paragraph} />;
    case "html":
      const html = token as marked.Tokens.HTML;
      return <HTML {...html} />;
    case "text":
      const text = token as marked.Tokens.Text;
      return <Text {...text} />;
    case "escape":
      const escape = token as marked.Tokens.Escape;
      return <Escape {...escape} />;
    case "link":
      const link = token as marked.Tokens.Link;
      return <Link {...link} />;
    case "image":
      const image = token as marked.Tokens.Image;
      return <Image {...image} />;
    case "strong":
      const strong = token as marked.Tokens.Strong;
      return <Strong {...strong} />;
    case "em":
      const em = token as marked.Tokens.Em;
      return <Em {...em} />;
    case "del":
      const del = token as marked.Tokens.Del;
      return <Del {...del} />;
    case "codespan":
      const codespan = token as marked.Tokens.Codespan;
      return <Codespan {...codespan} />;
    // @ts-ignore
    case "cellout":
      const cellout = token as marked.Tokens.Generic;
      return <Cellout {...cellout} />;
    // @ts-ignore
    case "md-mui-extension":
      const component = token as marked.Tokens.Generic;
      return <MdMuiExtension {...component} />;
    case "blockKatex":
      const blockKatex = token as marked.Tokens.Generic;
      return <BlockKatex {...blockKatex} />;
    case "inlineKatex":
      const inlineKatex = token as marked.Tokens.Generic;
      return <InlineKatex {...inlineKatex} />;
    default:
      return <></>;
  }
}

export default TokenRenderer;
