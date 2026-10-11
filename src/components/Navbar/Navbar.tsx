"use client";
import Image from "next/image";
import React, { Suspense, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import RightPanal from "./RightPanal";
import Navigation from "./Navigation";
const Navbar = () => {
  const [dropDown, setDropDown] = useState(false);
  const inputRef = useRef<HTMLDivElement | null>(null);
  return (
    <section className="sticky rel top-0 z-40 bg-[#fff4f4]  ">
      <div className="flex xl:justify-between 2xl:justify-around px-2 py-1  2xl:py-3 2xl:pt-[20px] 2xl:pb-4 xl:container xl:mx-auto lg:px-0 ">
        <aside className="lg:w-[30%] xl:w-[40%] 2xl:w-[45%] 2xl:p-3 2xl:ml-9 p-2 flex items-start md:items-center">
          <Link href={"/"}>
            <Image
              alt="Logo Image"
              src="/other/logo.svg"
              className="hidden 2xl:flex "
              width={200}
              height={50}
              layout="responsive"
            />
            <Image
              alt="Logo Image"
              src="/other/logo.svg"
              className="hidden md:flex 2xl:hidden"
              width={180}
              height={35}
            />
            <Image
              alt="Logo Image"
              src="/other/reslogo.svg"
              className="flex md:hidden "
              width={48}
              height={40}
            />
          </Link>
        </aside>
        <aside className="w-[88%] lg:w-[90%] xl:w-[95%] 2xl:w-[97%] flex lg:space-y-1.5 2xl:space-y-3 flex-col justify-center items-center  ">
          <Suspense fallback={"Loading..."}>
            <Navigation />
          </Suspense>

          <div className="pb-1 w-full">
            <Suspense fallback={"Loading..."}>
              <SearchBar
                setDropDown={setDropDown}
                inputRef={inputRef}
                dropDown={dropDown}
              />
            </Suspense>
          </div>
        </aside>
        <Suspense>
          <RightPanal />
        </Suspense>
      </div>
    </section>
  );
};

export default Navbar;
