import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export async function fetchPosts(filter: string = "") {
  const posts = await client.fetch(
    groq`*[_type == "post" ${filter}] | order(_createdAt desc)  [0...100] {title,slug,mainImage, categories[]->{title,slug}, _createdAt,shortDescription}`
  );

  if (posts.errors) throw posts.errors;

  return posts;
}
