import PostsList from "@/components/PostsList";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <main>
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-8 px-7">
        <PostsList />
      </div>
    </main>
  );
}
