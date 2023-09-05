import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface ImageProps {
  value: {
    _key: string;
    _type: string;
    alt: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

interface Props {
  params: { slug: string };
}

interface Category {
  title: string;
  slug: string | null;
}

// Barebones lazy-loaded image component
const SampleImageComponent = ({ value }: ImageProps) => {
  const { width, height } = getImageDimensions(value);
  return (
    <Image
      src={urlForImage(value).url()}
      alt={value.alt || " "}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: "block",
        padding: "10px",
        height: "250px",
        margin: "0 auto",
        borderRadius: "0.25rem",

        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
    />
  );
};

const components = {
  types: {
    image: SampleImageComponent,
    // Any other custom types you have in your content
    // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
  },
};

const page = async ({ params }: Props) => {
  const post = await client.fetch(
    groq`*[_type == "post"&&slug.current == "${params.slug}"][0]{
      _id,
      _createdAt,
      author->{ name},
      title,
      body,
      categories[]->{title,slug},
      mainImage,
     "slug":slug.current
    }`
  );

  return (
    <div className="max-w-screen-lg mx-auto mt-8 lg:px-0 px-5">
      <div className="mb-4 md:mb-0 w-full mx-auto relative">
        <h1 className="text-4xl font-semibold text-gray-800 leading-tight">
          {post.title}
        </h1>
        <p className="py-2 text-green-700 inline-flex items-center justify-center mb-2">
          {new Date(post._createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <div className="flex gap-3 text-gray-600 mt-auto">
          {post.categories.map((category: Category, i: number) => (
            <Link
              href={`/category/${category.title}`}
              key={i}
              className=" bg-green-500 rounded-3xl px-3 py-1 text-white"
            >
              {category.title}
            </Link>
          ))}
        </div>
      </div>
      <Image
        src={urlForImage(post.mainImage).url()}
        width={340}
        height={300}
        className="w-full object-cover lg:rounded md:h-[28em] mt-4  h-[20em]"
        alt={`${post.mainImage.alt}`}
      />
      <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full">
        <PortableText value={post.body} components={components} />
      </div>
      <div className="flex gap-3 mt-8 items-center justify-end text-gray-600">
        {post.author && <p>by: {post.author.name}</p>}
      </div>
    </div>
  );
};

export default page;
