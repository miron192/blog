import Link from "next/link";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  const date = new Date();

  return (
    <div className="flex lg:flex-row flex-col justify-center lg:justify-around items-center h-16 gap-3 p-3 border-t-2 shadow-t-sm w-full mt-6">
      <div>© {date.getFullYear()} BlogSometging, Inc. All rights reserved.</div>
      <div className="flex gap-7">
        <Link
          target="blank"
          href="https://www.instagram.com/ccccccccccccccccccccc_cccccccc/"
        >
          <BsInstagram />
        </Link>
        <Link
          target="blank"
          href="https://www.linkedin.com/in/catalin-miron-3a7845208/"
        >
          <BsLinkedin />
        </Link>
        <Link target="blank" href="https://github.com/miron192">
          <BsGithub />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
