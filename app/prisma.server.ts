import { PrismaClient, Site as PrismaSite, Log as PrismaLog } from "@prisma/client";
import { Markdown } from "./markdown/MarkdownParser";

export const prisma = new PrismaClient();

export type Post = Markdown & {
  id?: number;
  baseDir: string;
  slug: string;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type PostSimple = Pick<Post, 'baseDir' | 'slug' | 'title' | 'description' | 'image' | 'tags' | 'date'>;

export const getPost = async (baseDir: string, slug: string): Promise<Post> => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      baseDir_slug: { baseDir: baseDir, slug: slug },
    },
    include: {
      tags: true,
    }
  });
  return post;
}

export const getPosts = async (baseDir: string): Promise<PostSimple[]> => {
  const posts = await prisma.post.findMany({
    where: {
      baseDir: baseDir,
      published: true,
    },
    select: {
      baseDir: true,
      slug: true,
      title: true,
      description: true,
      image: true,
      tags: true,
      date: true,
    },
    orderBy: {
      date: 'desc'
    }
  });
  return posts;
}

export const upsertPost = async (post: Post) => {
  try {
    await resetPostTags(post);
  } catch (err) {
  }
  await prisma.post.upsert({
    where: { baseDir_slug: { baseDir: post.baseDir, slug: post.slug } },
    create: {
      baseDir: post.baseDir,
      slug: post.slug,
      title: post.title,
      description: post.description,
      image: post.image,
      tags: { connectOrCreate: post.tags.map((tag) => ({ where: tag, create: tag })) },
      date: post.date || '',
      content: post.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    update: {
      title: post.title,
      description: post.description,
      image: post.image,
      tags: { connectOrCreate: post.tags.map((tag) => ({ where: tag, create: tag })) },
      date: post.date || '',
      content: post.content,
      updatedAt: new Date(),
    },
  })
}

export const resetPostTags = async (post: Post) => {
  await prisma.post.update({
    where: { baseDir_slug: { baseDir: post.baseDir, slug: post.slug } },
    data: {
      tags: { deleteMany: {} },
    },
    include: {
      tags: true,
    }
  });
}

export type Site = {
  id: number;
  type: string;
  name: string;
  hname: string;
  logo: string|null;
  state: string;
  link: string;
  pageSpeed: number;
  pageSize: number;
  lastCheckedAt: Date;
  lastSuccessedAt: Date;
  lastFailedAt: Date;
  more: SiteMore;
  createdAt: Date;
  updatedAt: Date;
  log: Log[];
}

export type SiteMore = MoreTorrent | MoreWebtoon;

export type MoreTorrent = {
  type: "torrent";
  supportMagnet: boolean;
  supportStreaming: boolean;
}

export type MoreWebtoon = {
  type: "webtoon";
}

export type Log = SiteStart | SiteError | SiteRecovery | SiteChange;

export type SiteStart = {
  id?: number;
  name: string;
  createdAt: Date;
}

export type SiteError = {
  id?: number;
  name: string;
  where: string;
  createdAt: Date;
}

export type SiteRecovery = {
  id?: number;
  name: string;
  where: string;
  createdAt: Date;
}

export type SiteChange = {
  id?: number;
  name: string;
  from: string;
  to: string;
  createdAt: Date;
}

const moreType = (more: string): SiteMore | undefined => {
  const moreJson = JSON.parse(more);
  switch (moreJson.type) {
    case 'torrent':
      return moreJson as MoreTorrent;
    case 'webtoon':
      return moreJson as MoreWebtoon;
  }
}

const logType = (log: PrismaLog): Log | undefined => {
  let attrsJson;
  switch (log.name) {
    case 'START':
      return { id: log.id, name: log.name, createdAt: log.createdAt } as SiteStart;
    case 'ERROR':
      attrsJson = JSON.parse(log.attrs || '');
      return { id: log.id, name: log.name, createdAt: log.createdAt, where: attrsJson['where'] } as SiteError;
    case 'RECOVERY':
      attrsJson = JSON.parse(log.attrs || '');
      return { id: log.id, name: log.name, createdAt: log.createdAt, where: attrsJson['where'] } as SiteError;
    case 'CHANGE':
      attrsJson = JSON.parse(log.attrs || '');
      return { id: log.id, name: log.name, createdAt: log.createdAt, from: attrsJson['from'], to: attrsJson['to'] } as SiteChange;
  }
}

export const getSites = async (type: string) => {
  const sites = await prisma.$queryRaw<PrismaSite[]>`SELECT * FROM Site WHERE type = ${type} ORDER BY lastCheckedAt DESC`
  return sites.map((site) => {
    return { ...site, more: moreType(site.more) }
  })
}

export const getSite = async (type: string, name: string) => {
  const site = await prisma.site.findFirstOrThrow({
    where: {
      type: type,
      name: name
    },
    include: {
      log: {
	orderBy: {
	  createdAt: 'desc',
	},
      },
    },
  })
  return { ...site, more: moreType(site.more), log: site.log.map((log) => logType(log)) }
}
