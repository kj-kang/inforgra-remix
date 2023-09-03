import { Link } from "@remix-run/react";
import { PostSimple} from "@/prisma.server";
import moment from "moment";
import "moment/locale/ko";

type PostCardProps = {
  post: PostSimple;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link prefetch="none" className="p-0 m-0 border-1 shadow-lg transition hover:-translate-y-4 duration-500 easy-in-out dark:bg-neutral-800" to={`${post.baseDir}/${post.slug}`}>
      {post.image && <img className="object-cover w-full h-48" src={post.image} />}
      <div className="flex flex-col p-4">
	<h2 className="text-base font-bold">{post.title}</h2>
	<p className="mt-2 text-sm">{post.description}</p>
	<div className="mt-2">
	  {post.tags.map((tag, index: number) => (
	    <div key={index} className="inline-flex bg-white text-gray-700 border ml-1 mr-1 rounded-lg px-3 py-1 my-1 text-xs dark:text-gray-200 dark:bg-neutral-700 dark:border-neutral-700">{tag.name}</div>
	  ))
	  }
	</div>
	<div className="mt-2 justify-end text-sm">{moment(post.date).format('LL')}</div>
      </div>
    </Link>
  )
}
