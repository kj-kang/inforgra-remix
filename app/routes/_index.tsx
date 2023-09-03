import { PostCard } from "@/components";
import { getPosts } from "@/prisma.server";
import { json, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Inforgra" },
    { name: "description", content: "Welcome to Inforgra" },
  ];
};

export const loader = async () => {
  const posts = await getPosts('post');
  return json({ posts });
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <main className="container max-w-4xl mx-auto px-5 mt-8">
      <div className="grid grid-cols-1 gap-8 p-2 md:grid-cols-2 lg:grid-cols-3">
	{posts.map((post, index) => (<PostCard key={index} post={post} />))}
      </div>
    </main>
  )
}
