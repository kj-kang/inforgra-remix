import React, { createElement } from "react";
import { transform } from "sucrase";
import * as components from "@/components";
import * as fs from "fs/promises";
import * as remixRunNode from "@remix-run/node";

export const evaluate = (code) => {
  const transformCode = transform(code, { transforms: ['jsx', 'typescript', 'imports'], production: true }).code.substring(13);
  const fn = new Function("React", "require", "exports", "render", transformCode);
  const imports = {
    'react': React,
    'components': components,
    'fs/promises': fs,
    '@remix-run/node': remixRunNode,
  };
  const exports = { default: null };
  const render = (value) => {
    exports.default = value;
  };
  const importsFunc = (module) => {
    return imports[module];
  }
  const result = fn(React, importsFunc, exports, render);
  if (exports.default)
    return createElement(exports.default);
  return null;
}
