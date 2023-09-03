import { marked, Token } from "marked";

declare module 'marked' {
  namespace Tokens {
    interface Heading {
      type: 'heading';
      raw: string;
      depth: number;
      text: string;
      hash: string;
      tokens: Token[];
    }
  }
};

declare module 'marked' {
  namespace marked {
    var parse2: typeof _parse2;
  }
};

export type WalkTokensCallback = (token: Token) => Token;
