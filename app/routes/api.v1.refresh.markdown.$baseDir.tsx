import { parseMarkdown } from "@/markdown/MarkdownParser";
import { Post, prisma, upsertPost } from "@/prisma.server";
import { LoaderArgs, json } from "@remix-run/node";
import fs from "fs/promises";
import path from "path";

export const splitExt = (filename: string) => {
  const lastIndex = filename.lastIndexOf('.');
  return [filename.substring(0, lastIndex), filename.substring(lastIndex+1)];
}

export const loader = async ({ params }: LoaderArgs) => {
  const baseDir = params['baseDir'] || 'post';
  const files = await fs.readdir(`./content/${baseDir}/`);
  for (let index = 0; index < files.length; index++) {
    if (path.extname(files[index]) !== '.md')
      continue;
    const baseName = path.basename(files[index]).replace(/\.md$/, '');
    const markdownContent = await fs.readFile(`./content/${baseDir}/${files[index]}`, 'utf-8');
    const markdown = parseMarkdown(markdownContent);
    const post: Post = {
      ...markdown,
      baseDir: baseDir,
      slug: baseName,
      published: true,
    };
    await upsertPost(post);
  }
  return null;
}

export const Page = () => {
  return json({ok: true});
}
