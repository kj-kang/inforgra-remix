import { Markdown } from "@/markdown/Markdown";
import { MarkdownProvider } from "@/markdown/MarkdownProvider";
import MarkdownTableOfContent from "@/markdown/MarkdownTableOfContent";
import { type Post } from "@/prisma.server";
import moment from "moment";
import "moment/locale/ko";

type PostProps = {
  post: Post;
}

export const PostView = ({ post }: PostProps) => {
  return (
    <MarkdownProvider>
      <div className="fixed top-[3.8125rem] right-[calc(50%-38rem)] hidden xl:block">
        <MarkdownTableOfContent />
      </div>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div>
        {post.tags.map((tag, index) => (
          <div key={index} className="inline-flex bg-white text-gray-700 border ml-1 mr-1 rounded-lg px-3 py-1 my-1 text-xs dark:text-gray-200 dark:bg-neutral-700 dark:border-neutral-700">{tag.name}</div>
        ))}
      </div>
      <div className="text-sm mt-2 mb-2 ml-2">
        {moment(post.date).add(9, 'hours').format('LL')}
      </div>
      <div className="relative">
        <Markdown markdown={post.content || ''} />
      </div>
    </MarkdownProvider>
  )
}
