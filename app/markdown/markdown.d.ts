export type TableOfContent = TableOfContentItem[];

export type Header = {
  title: string;
  description: string;
  tags: string;
  image: string;
  date: string;
}

type TableOfContentItem = {
  text: string,
  depth: number,
  hash: string,
  children: TableOfContent,
};
