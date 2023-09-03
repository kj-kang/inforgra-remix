import { SiteCard } from "@/components/cards/SiteCard";
import { Timeline } from "@/components/cards/Timeline";
import { PostView } from "@/components/post/PostView";
import { Post, Site, getPost, getSite } from "@/prisma.server";
import { LoaderArgs, V2_MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  return [{
    title: data?.post.title,
    description: data?.post.description,
  }]
}

export const loader = async ({ params }: LoaderArgs) => {
  const post = await getPost('torrent', params['slug'] || '');
  const site = await getSite('torrent', params['slug'] || '');
  return json({ post, site });
}

const Page = () => {
  const { post, site } = useLoaderData<typeof loader>();
  return (
    <main className="container max-w-3xl mx-auto px-5 mt-8">
      <PostView post={post} />
      <div className="flex justify-center">
        <div className="w-[90%] lg:basis-1/3">
          <SiteCard site={site} />
        </div>
      </div>
      <Timeline site={site} />
    </main>
  )
}

export default Page;
