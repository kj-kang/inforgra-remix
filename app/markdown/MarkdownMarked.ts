import { marked, Token, TokenizerExtension } from "marked";
import { WalkTokensCallback } from "./marked-mui.d";
import { Header, TableOfContent } from "./markdown.d";
import { textToHash } from "./Utils";

export const cellOut: TokenizerExtension = {
  name: 'cellout',
  level: 'block',
  start(src) {
    const match = src.match(/:::/);
    return match ? match.index : undefined;
  },
  tokenizer(src) {
    const rule =
      /^ {0,3}(:{3,}(?=[^:\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~:]* *(?=\n|$)|$)/;
    const match = rule.exec(src);
    if (match) {
      const token = {
	type: 'cellout',
	raw: match[0],
	text: match[3].trim(),
	severity: match[2],
	tokens: [],
      };
      this.lexer.blockTokens(token.text, token.tokens);
      return token;
    }
    return undefined;
  }
}

export const markedMuiExtension: TokenizerExtension = {
  name: 'md-mui-extension',
  level: 'inline',
  tokenizer(src) {
    const rule = /^{{[^}]+}}$/
    const match = rule.exec(src);
    if (match) {
      const token = {
	type: 'md-mui-extension',
	raw: match[0],
	text: '[marked-mui extension]',
	tokens: []
      }
      return token;
    }
    return undefined;
  },
}

export const _parse2 = (markdown: string, callbacks: WalkTokensCallback[] = []) => {
  const tokens = marked.Lexer.lex(markdown) as Token[];
  walkTokens(tokens, (token: Token) => callbacks.reduce((x, callback) => callback(x), token))
  const tableOfContent = parseTableOfContents(tokens);
  return { tokens: tokens, tableOfContent: tableOfContent }
}

marked.parse2 = _parse2;

// walktokens

const walkTokens = (tokens: Token[], callback: WalkTokensCallback) => {
  return tokens.map((token) => {
    const newToken = callback(token);
    return newToken;
  })
}

// Walktokenscallback

export const addHashToHeading = (token: Token) => {
  if (token.type === 'heading') {
    token.hash = textToHash(token.text)
  }
  return token;
}

//

export const parseTableOfContents = (tokens: Token[]) => {
  const [toc] = tokens.reduceRight((acc: any, token) => {
    if (token.type === 'heading' && token.depth === 2) {
      acc[1].reverse()
      const h2 = { text: token.text, depth: token.depth, hash: token.hash, children: acc[1] };
      return [acc[0].concat(h2), [], acc[2]-1];
    } if (token.type === 'heading' && token.depth === 3) {
      const h3 = { text: token.text, depth: token.depth, hash: token.hash, children: [] };
      return [acc[0], acc[1].concat(h3), acc[2]-1];
    } else {
      return [acc[0], acc[1], acc[2]-1];
  }}, [[], [], tokens.length-1]);
  toc.reverse();
  return toc as TableOfContent;
}
