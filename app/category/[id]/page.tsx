import PostsList from "@/components/PostsList";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import post from "@/sanity/schemas/post";
import { Category, Post } from "@/types";
import { fetchPosts } from "@/utils";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: { id: string };
}

const NewsPage = async ({ params }: Props) => {
  const { id } = params;

  const posts: Post[] = await fetchPosts(
    `&& "${id}" in categories[]->slug.current`
  );

  return (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14 px-7">
      <PostsList posts={posts} />
    </div>
  );
};

export default NewsPage;
