import PostsList from "@/components/PostsList";
import post from "@/sanity/schemas/post";
import { fetchPosts } from "@/utils";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await fetchPosts();
  return (
    <main>
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-8 px-7">
        <PostsList posts={posts} />
      </div>
    </main>
  );
}
