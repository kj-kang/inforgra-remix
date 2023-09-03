import { getPosts } from "@/prisma.server";
import { json } from "@remix-run/node";

export const loader = async () => {
  const posts = await getPosts();
  return json({ posts });
}
