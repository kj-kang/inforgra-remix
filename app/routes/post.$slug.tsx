import { PostView } from "@/components/post/PostView";
import { getPost } from "@/prisma.server";
import { LoaderArgs, V2_MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import "moment/locale/ko";

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  return [{
    title: data?.post.title,
    description: data?.post.description,
  }]
}

export const loader = async ({ params }: LoaderArgs) => {
  const post = await getPost('post', params['slug'] || '');
  return json({ post });
}

const Page = () => {
  const { post } = useLoaderData<typeof loader>();
  return (
    <main className="container max-w-3xl mx-auto px-5 mt-8">
      <PostView post={post} />
    </main>
  )
}

export default Page;
