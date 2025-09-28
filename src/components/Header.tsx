import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <section className=" bg-[#fff4f4] ">
      <div className="flex items-center justify-between  p-4 xl:container xl:mx-auto">
        <Link href={"/"} className="text-2xl font-[550] text-pink-500">
          Clinicall Seo{" "}
        </Link>
        <div className="flex space-x-6">
          <Link
            href={"/addblog"}
            className=" bg-pink-500 px-4 p-2 rounded-lg text-white"
          >
            Add Blog
          </Link>
          <Link
            href={"/allblog"}
            className=" bg-pink-500 px-4 p-2 rounded-lg text-white"
          >
            Blog List
          </Link>
          {/* <Link href={"/addblog"} className="hover:underline">Add Blog</Link> */}
        </div>
      </div>
    </section>
  );
};

export default Header;
