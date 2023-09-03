import { SiteCard } from "@/components/cards/SiteCard";
import { Timeline } from "@/components/cards/Timeline";
import { PostView } from "@/components/post/PostView";
import { getPost, getSites } from "@/prisma.server";
import { LoaderArgs, V2_MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import moment from "moment";
import "moment/locale/ko";

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  return [{
    title: data?.post.title,
    description: data?.post.description,
  }]
}

export const loader = async ({ params }: LoaderArgs) => {
  const post = await getPost('webtoon', 'webtoon');
  const sites = await getSites('webtoon');
  const title = post.title.concat(` (${moment(new Date()).format('LL')})`);
  return json({ post: { ...post, title: title }, sites });
}

const Page = () => {
  const { post, sites } = useLoaderData<typeof loader>();
  return (
    <main className="container max-w-3xl mx-auto px-5 mt-8">
      <PostView post={post} />
      <div className="grid grid-cols-1 gap-8 p-2 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {sites.map((site, index) => (<SiteCard key={index} site={site} rank={index + 1} />))}
      </div>
    </main>
  )
}

export default Page;
