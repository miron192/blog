import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: { id: string };
}
interface Category {
  title: string;
  slug: string | null;
}

const NewsPage = async ({ params }: Props) => {
  const { id } = params;

  const posts = await client.fetch(
    groq`*[_type == "post" && "${id}" in categories[]->slug.current ] {
      _id,
      _createdAt,
      title,
      body,
      categories[]->{title,slug},
      mainImage,
     "slug":slug.current,
     shortDescription
    }
    `
  );

  return (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14 px-7">
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
              <div
                key={i}
                className="  bg-green-500 rounded-3xl px-3 py-1  text-white"
              >
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
    </div>
  );
};

export default NewsPage;
