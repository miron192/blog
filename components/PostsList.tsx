import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity//lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { groq } from "next-sanity";

const PostsList = async () => {
  const posts = await client.fetch(
    groq`*[_type == "post" ] | order(_createdAt desc)  [0...100] {title,slug,mainImage, categories[]->{title,slug}, _createdAt,shortDescription, body}`
  );
  if (posts.errors) throw posts.errors;

  type Category = { title: string; slug: string | null };

  return (
    <>
      {posts.map((post: any, i: number) => (
        <Link
          href={`/post/${post.slug.current}`}
          className=" mx-auto flex flex-col p-6 justify-center items-start text-black-100 border hover:bg-white hover:shadow-md rounded-2xl "
          key={i}
        >
          <Image
            src={urlForImage(post.mainImage).url()}
            width={340}
            height={300}
            className="h-[12rem]"
            alt={`${post.mainImage.alt}`}
          />
          <div className="flex flex-col max-w-sm flex-wrap my-6 gap-3">
            <h1 className="text-2xl">{post.title}</h1>
            <p>{post.shortDescription}</p>
          </div>
          <div className="flex gap-3 text-gray-600 mt-auto">
            {post.categories.map((category: Category, i: number) => (
              <div className="  bg-green-500 rounded-3xl px-3 py-1  text-white">
                {category.title}{" "}
              </div>
            ))}
          </div>
          <p className="text-gray-600 mt-5 text-right w-full">
            {new Date(post._createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </Link>
      ))}
    </>
  );
};
export default PostsList;
