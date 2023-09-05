import Link from "next/link";
import { FaRegNewspaper } from "react-icons/fa";
import { Hamburger } from "./NavbarHamburger";

import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

const Navbar = async () => {
  const categoryFilters = await client.fetch(
    groq`*[_type == "category"]{
   title, slug
    }`
  );

  return (
    <div className="flex justify-around h-14 items-center  border-b-2 shadow-sm">
      <Link href="/" className="text-xl font-bold flex  items-center gap-2">
        <FaRegNewspaper />
        <div>
          Blog<span className="text-green-500">Something</span>
        </div>
      </Link>

      <div className="lg:flex gap-3 hidden font-light">
        {categoryFilters.map((item: any, i: any) => (
          <Link
            key={i}
            href={`/category/${item.slug.current.toLocaleLowerCase()}`}
          >
            {item.title}
          </Link>
        ))}
      </div>
      <Hamburger />
    </div>
  );
};

export default Navbar;
