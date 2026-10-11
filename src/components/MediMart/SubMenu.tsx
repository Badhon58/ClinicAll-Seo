"use client";
import React, { useState } from "react";
import { ParentCategory } from "./Interface";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaChevronRight } from "react-icons/fa6";
// bg-[#FFF4F4]
const SubMenu = ({
  item,
  setIsMenuOpen,
  isMenuOpen,
}: {
  item: ParentCategory;
  setIsMenuOpen: any;
  isMenuOpen: boolean;
}) => {
  const [according, setAccording] = useState(false);
  const [parentsCatagoryname, setParentsCatagoryname] = useState<string>(
    item.parent_category_name
  );
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setAccording(!according);
  };
  const handleNavigate = (
    e: React.MouseEvent<HTMLButtonElement>,
    link: string
  ) => {
    e.preventDefault();
    router.replace(`/mediMart/${parentsCatagoryname}/${link}/catagorylist`);
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <aside className="p-1 group ml-2">
      <div
        className="flex justify-between items-center p-2 rounded-md cursor-pointer 2xl:px-5 xl:px-4 lg:px-3 hover:bg-pink-200"
        onClick={handleClick}
      >
        <p className="text-base 2xl:text-lg text-[#16020B] font-medium ">
          {item.parent_category_name}
        </p>

        <FaChevronRight
          className={`transition ${according ? "rotate-90" : ""}`}
          size={14}
        />
      </div>
      <hr />
      <div
        className={`grid overflow-hidden transition-all duration-300  ease-in-out ${
          according
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div
          className={`overflow-hidden  ${
            according ? "" : "transition-all duration-300 ease-in-out"
          }`}
        >
          {item?.categories?.map((data, index) => (
            <button
              className=" pl-8 py-2 text-start text-base capitalize 2xl:text-lg border-b font-[450] line-clamp-1 hover:bg-pink-200 rounded-md w-full"
              key={index}
              onClick={(e) => handleNavigate(e, data.category_name)}
            >
              {data.category_name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SubMenu;
