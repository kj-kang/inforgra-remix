import copy from "copy-to-clipboard";
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-java";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-python";
import "prismjs/components/prism-shell-session";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import { useState } from "react";

Prism.disableWorkerMessageHandler = true;

if (typeof window !== 'undefined') {
  window.Prism = window.Prism || {};
  Prism.disableWorkerMessageHandler = true;
  Prism.manual = true;
}

type Token = string | Prism.Token

type RenderTokenProps = {
  token: Token;
}

const RenderToken = ({ token }: RenderTokenProps) => {
  if (typeof token === 'string') {
    return <span>{token}</span>;
  } else {
    switch (token.type) {
      case 'comment':
      case 'block-comment':
      case 'prolog':
      case 'cdata':
	return <span className="text-[#999]">{token.content}</span>;
      case 'punctuation': // markdown
	return <span className="text-[#e2777a]">{token.content}</span>;
      case 'tag':
      case 'attr-name':
      case 'namespace':
      case 'deleted':
      case 'list': // markdown
      case 'operator': // markdown
	return <span className="text-[#e2777a]">{token.content}</span>;
      case 'function-name':
	return <span className="text-[#6196cc]">{token.content}</span>;
      case 'boolean':
      case 'number':
      case 'function':
      case 'function-variable':
	return <span className="text-[#f08d49]">{token.content}</span>;
      case 'property':
      case 'class-name':
      case 'constant':
      case 'symbol':
      case 'selector':
      case 'important':
      case 'atrule':
      case 'keyword':
      case 'builtin':
	return <span className="text-[#cc99cd]">{token.content}</span>;
      case 'string':
      case 'char':
      case 'attr-value':
      case 'regex':
      case 'variable':
	return <span className="text-[#67cdcc]">{token.content}</span>;
      case 'url':
	return <span className="text-[#51afef]">{token.content}</span>;
      default:
	return <span>{token.content}</span>;
    }
  }
}

type RenderTokensProps = {
  tokens: Token[];
}
const RenderTokens = ({ tokens }: RenderTokensProps) => {
  return tokens.map((token, index) => {
    if (typeof token === 'object') {
      if (Array.isArray(token.content)) {
	return <RenderTokens key={index} tokens={token.content} />
      }
    }
    return <RenderToken key={index} token={token} />
  })
}

type MarkdownPrismProps = {
  code: string;
  lang: string;
}

export const MarkdownPrism = ({ code, lang }: MarkdownPrismProps) => {

  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    copy(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 500);
  }

  let tokens;
  try {
    tokens = Prism.tokenize(code, Prism.languages[lang]);
  } catch {
  }

  return (
    <div className="relative overflow-auto">
      <pre className="bg-[#2d2d2d] text-sm text-[#ccc] whitespace-pre rounded-lg p-2">
	<code className={`language-${lang}`}>
	  {tokens === undefined
	    ? code
	    : (!lang || !Prism.languages[lang]) ? code : <RenderTokens tokens={tokens} />}
	</code>
      </pre>
      <button className="absolute top-0 right-0 mt-2 mr-2" onClick={handleClick}>
	{!isCopied
	  ? <svg className="fill-gray-100" height="18" width="18" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>
	  : <svg className="fill-gray-100" height="18" width="18" viewBox="0 0 24 24"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.24 11.28L9.69 11.2c-.38-.39-.38-1.01 0-1.4.39-.39 1.02-.39 1.41 0l1.36 1.37 4.42-4.46c.39-.39 1.02-.39 1.41 0 .38.39.38 1.01 0 1.4l-5.13 5.17c-.37.4-1.01.4-1.4 0zM3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1z" /></svg>}
      </button>
    </div>
  );
}
